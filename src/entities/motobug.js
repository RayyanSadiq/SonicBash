import kaplay from "../kaplayContext";

export function makeMotobug(pos) {
    return kaplay.add([
        kaplay.sprite("motobug"),
        kaplay.area({ shape: new kaplay.Rect(kaplay.vec2(-8, 0), 24, 22) }),
        kaplay.scale(4),
        kaplay.anchor("center"),
        kaplay.pos(pos),
        kaplay.offscreen(),
        "enemy",
        {
            setEvents() {
                this.on("destroy", () => {
                    kaplay.play("explosion", { volume: 0.5 })
                    this.play("explode")
                })
            }
        }
    ])
}