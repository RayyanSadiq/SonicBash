import { makeSonic } from "../entities/Sonic"
import kaplay from "../kaplayContext"

export default function mainMenu() {

    if (!kaplay.getData("high-score")) {
        kaplay.setData("high-score", 0)
    }
    kaplay.onButtonPress("jump", () => kaplay.go("game"))

    kaplay.add([
        kaplay.text("SONIC BASH", { font: "mania", size: 96 }),
        kaplay.pos(kaplay.center().x, 200),
        kaplay.anchor("center"),
        kaplay.z(1),
    ])


    kaplay.add([
        kaplay.text("Press Space/Click/Touch to Play", { font: "mania", size: 32 }),
        kaplay.pos(kaplay.center().x, kaplay.center().y - 200),
        kaplay.anchor("center"),
        kaplay.z(1),
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
            kaplay.pos(0,  828),
            kaplay.layer("game"),
            kaplay.scale(4)
        ]),
        kaplay.add([
            kaplay.sprite("platform"),
            kaplay.pos(platformWidth * 4,828),
            kaplay.layer("game"),
            kaplay.scale(4)
        ])
    ]

    kaplay.onUpdate(() => {
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 828);
            platforms.push(platforms.shift());
        }

        platforms[0].move(-1200, 0);
        platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 828);

    })


    const sonic = makeSonic(kaplay.vec2(300, 640 + 24 * 4))

}