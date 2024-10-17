import { makeEliteMotobug } from "../entities/EliteMotobug";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";
import { makeSonic } from "../entities/Sonic";
import kaplay from "../kaplayContext";
import { makeRingCollectUI, makeScoreText } from "./utils/UIUtils";

export default function game() {
    kaplay.setGravity(3100)
    // store looped sounds in consts otherwise it plays outside of secens
    const citySfx = kaplay.play("city", { volume: 0.3, loop: true })

    // game variables
    let score = 0;
    let scoreMultiplier = 0;
    let gameSpeed = 300
    let energy = 3

    // UI elements
    const scoreText = makeScoreText(score)
    scoreText.onUpdate(() => {
        scoreText.text = `Score: ${score}`
    })

    const crosshair = kaplay.add([
        kaplay.sprite("crosshair"),
        kaplay.anchor("center"),
        kaplay.scale(12),
        kaplay.z(100),
        kaplay.pos(0, 0)
    ])

    const EnergyBar = kaplay.add([
        kaplay.sprite("energy-icon"),
        kaplay.anchor("center"),
        kaplay.scale(4),
        kaplay.pos(40, 130),
        kaplay.z(101),
        {

            energyCells : [],
            bg: null,

            setComponents() {
                const sprites = [
                    { sprite: "energy-bg-begin", offset: 0 },
                    { sprite: "energy-bg", offset: 0 },
                    { sprite: "energy-bg-end", offset: 1 }
                ];

                for (let i = 0; i < energy; i++) {
                    let bgSprite;
                    if (i === 0) {
                        bgSprite = sprites[0];
                    } else if (i === energy - 1) {
                        bgSprite = sprites[2];
                    } else {
                        bgSprite = sprites[1];
                    }

                    const bgPos = kaplay.vec2(58 + ((11 * 4 * i) + (bgSprite.offset * 2)), 130);

                    this.bg = kaplay.add([
                        kaplay.sprite(bgSprite.sprite),
                        kaplay.anchor("center"),
                        kaplay.area(),
                        kaplay.scale(4),
                        kaplay.pos(bgPos),
                        kaplay.z(99),
                        kaplay.opacity(0.4)

                    ]);

                    this.energyCells.push(kaplay.add([
                        kaplay.sprite("energy-cell-full"),
                        kaplay.anchor("center"),
                        kaplay.area(),
                        kaplay.scale(4),
                        kaplay.pos(70 + (9 * 4 * i), bgPos.y + 0.5 * 4),
                        kaplay.z(100)
                    ]));
                }
            },

            setEvents() {
                this.onUpdate(() => {

                    this.energyCells.forEach((cell, i) => {
                        
                        if (i < sonic.energy) {
                            cell.hidden = false;
                        } else {
                            cell.hidden = true;
                        }
                    });

                 
                })
            },
        }
    ])

    EnergyBar.setComponents()
    EnergyBar.setEvents()

    // player creation
    const sonic = makeSonic(kaplay.vec2(300, 640 + 24 * 4), gameSpeed, energy)
    sonic.setControls()
    sonic.setEvents()
    sonic.onCollide("enemy", (enemy) => {
        if (sonic.isGrounded()) {
            kaplay.setData("current-score", score)
            kaplay.go("game-over", citySfx)
        }
    })

    sonic.on("hit", (enemy) => {
        scoreMultiplier += 1
        score += 10 * scoreMultiplier
        ringCollectUI.text = scoreMultiplier > 1 ? 'x' + scoreMultiplier : `+${10 * scoreMultiplier}`
        kaplay.wait(0.5, () => {
            ringCollectUI.text = ""
        })
        crosshair.hidden = true
    })
 

    const ringCollectUI = makeRingCollectUI(sonic)
    ringCollectUI.setEvents()

    // background and platform creation
    const bgPieceWidth = 1920
    const platformWidth = 1280
    const bgPieces = [
        kaplay.add([
            kaplay.sprite("chemical-bg"),
            kaplay.pos(0, 0),
            kaplay.scale(2),
            kaplay.z(-1),
            kaplay.opacity(0.8)
        ]),
        kaplay.add([
            kaplay.sprite("chemical-bg"),
            kaplay.pos(bgPieceWidth * 2, 0),
            kaplay.scale(2),
            kaplay.z(-1),
            kaplay.opacity(0.8)
        ])
    ]

    const platforms = [
        kaplay.add([
            kaplay.sprite("platform"),
            kaplay.pos(0, 828),
            kaplay.area(),
            kaplay.body({ isStatic: true }),
            kaplay.scale(4)
        ]),
        kaplay.add([
            kaplay.sprite("platform"),
            kaplay.pos(platformWidth * 4, 828),
            kaplay.area(),
            kaplay.body({ isStatic: true }),
            kaplay.scale(4)
        ])
    ]

    sonic.onCollide("ring", (ring) => {
        score++
        ringCollectUI.text = "+1"
        kaplay.wait(0.5, () => {
            ringCollectUI.text = ""
        })
    })

    const spawnMotobug = () => {
        let enemyMap = {}
        if (gameSpeed < 700) {
            enemyMap = {
                'motobug': makeMotobug
            }
        } else {
            enemyMap = {
                'motobug': makeMotobug,
                'elite-motobug': makeEliteMotobug
            }
        }
    
        // randomly select motobug type
        const motobug = enemyMap[kaplay.choose(Object.keys(enemyMap))](kaplay.vec2(1950, 773))
        motobug.setEvents()

        motobug.onUpdate(() => {
            motobug.move(-(gameSpeed + motobug.speed), 0)
        })

        let waitTime = 1

        if (gameSpeed < 1000) {
            waitTime = kaplay.rand(1.1, 2.8)
        } else {
            waitTime = kaplay.rand(0.7, 1.6)
        }
        
    
        kaplay.wait(waitTime, () => {
            spawnMotobug()
        })
    }
    spawnMotobug()

    const spawnRing = () => {
        const ring = makeRing(kaplay.vec2(1950, 745))
        ring.setEvents()
        ring.onUpdate(() => {
            ring.move(-gameSpeed, 0)
        })
        let  waitTime = kaplay.rand(0.5, 3)
        kaplay.wait(waitTime, () => {
            spawnRing()
        })
    }
    spawnRing()

    kaplay.loop(1, () => {
        if (gameSpeed < 1500) {
            gameSpeed += 20
            sonic.speed = gameSpeed
        }

    })

   

    kaplay.onUpdate(() => {

        console.log(gameSpeed)

        if (sonic.isFocusedEnemy && sonic.energy > 0) {
            crosshair.hidden = false
            crosshair.pos = sonic.focusedEnemy.pos
        } else {
            crosshair.hidden = true
        }

        if (sonic.isGrounded()) {
            scoreMultiplier = 0
        }
        // background movement logic
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-gameSpeed / 4, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

        // platform movement logic
        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 828);
            platforms.push(platforms.shift());
        }

        platforms[0].move(-gameSpeed, 0);
        platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 828);

        bgPieces[0].moveTo(bgPieces[0].pos.x, (sonic.pos.y / 740) * -100);
        bgPieces[1].moveTo(bgPieces[1].pos.x, (sonic.pos.y / 740) * -100);

    })
}
