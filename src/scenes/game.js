import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";
import { makeSonic } from "../entities/Sonic";
import kaplay from "../kaplayContext";

export default function game() {
    kaplay.setGravity(3100)
    // store looped sounds in consts otherwise it plays outside of secens
    const citySfx = kaplay.play("city", { volume: 0.3, loop: true })

    let score = 0;
    let scoreMultiplier = 0;
    const scoreText = kaplay.add([
        kaplay.text("SCORE: " + score, { font: "mania", size: 72 }),
        kaplay.pos(20, 20),
        {
            update() {
                this.text = "SCORE: " + score
            }
        }
    ])
     

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


    let gameSpeed = 300

    // entity creation
    const sonic = makeSonic(kaplay.vec2(300, 640 + 24 * 4), gameSpeed)
    sonic.setControls()
    sonic.setEvents()
    sonic.onCollide("enemy", (enemy) => {
        if (!sonic.isGrounded()) {
            kaplay.play("destroy", { volume: 0.5 })
            kaplay.play("hyper-ring", { volume: 0.5 })
            kaplay.destroy(enemy)
            sonic.play("jump")
            sonic.jump()
            scoreMultiplier += 1
            score += 10 * scoreMultiplier
            ringCollectUI.text = scoreMultiplier > 1 ? 'x'+ scoreMultiplier :  `+${10 * scoreMultiplier}`
            kaplay.wait(0.5, () => {
                ringCollectUI.text = ""
            })
    
        }
        else {
            kaplay.destroy(sonic)
            kaplay.destroy(enemy)
            kaplay.play("hurt", { volume: 0.5 })
            kaplay.setData("current-score", score)
            kaplay.go("game-over", citySfx)



        }
    })

    const ringCollectUI = kaplay.add([
        kaplay.text("", { font: "mania", size: 24 }),
        kaplay.color(255,255, 0),
        kaplay.anchor("center"),
        kaplay.scale(4),
        kaplay.pos(sonic.pos.x + 120, sonic.pos.y - 40),
        kaplay.z(100),
        {
            update() {
                this.pos.x = sonic.pos.x + 120
                this.pos.y = sonic.pos.y - 40
            }
        }

    ])

    sonic.onCollide("ring", (ring) => {
        kaplay.play("ring", { volume: 0.5 })
        kaplay.destroy(ring)
        score++
        ringCollectUI.text = "+1"
        kaplay.wait(0.5, () => {
            ringCollectUI.text = ""
        })
    })

    const spawnMotobug = () => {
        const motobug = makeMotobug(kaplay.vec2(1950, 773))

        motobug.onUpdate(() => {
            if (gameSpeed < 3000) {
                motobug.move(-(gameSpeed + 300), 0)
            }
            else {
                motobug.move(-gameSpeed, 0)
            }
        })

        motobug.onExitScreen(() => {
            if (motobug.pos.x < 0) {
                kaplay.destroy(motobug)
            }

        })

        const waitTime = kaplay.rand(0.8, 2.3)
        kaplay.wait(waitTime, () => {
            spawnMotobug()
        })
    }
    spawnMotobug()

    const spawnRing = () => {
        const ring = makeRing(kaplay.vec2(1950, 745))
        ring.onUpdate(() => {
            ring.move(-gameSpeed, 0)
        })
        ring.onExitScreen(() => {
            if (ring.pos.x < 0) {
                kaplay.destroy(ring)
            }
        })
        const waitTime = kaplay.rand(0.5, 3)
        kaplay.wait(waitTime, () => {
            spawnRing()
        })

    }
    spawnRing()




    kaplay.loop(1, () => {
        gameSpeed += 30
        sonic.speed = gameSpeed
    })



    kaplay.onUpdate(() => {

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