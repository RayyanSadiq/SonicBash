import kaplay from "../../kaplayContext"

export function makeScoreText(score) {
    return kaplay.add([
        kaplay.text("SCORE: " + score, { font: "mania", size: 72 }),
        kaplay.pos(20, 20),
        kaplay.z(100),
        {

        }
    ])
}

export function makeRingCollectUI(sonic) {
    return kaplay.add([
        kaplay.text("", { font: "mania", size: 24 }),
        kaplay.color(255, 255, 0),
        kaplay.anchor("center"),
        kaplay.scale(4),
        kaplay.pos(sonic.pos.x + 120, sonic.pos.y - 40),
        kaplay.z(100),
        {

            setEvents() {
                this.onUpdate = () => {
                    this.pos.x = sonic.pos.x + 120
                    this.pos.y = sonic.pos.y - 40
                }

            }
        }

    ])
}