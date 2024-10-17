import kaplay from "../kaplayContext";

export function makeEliteMotobug(pos) {
    return kaplay.add([
        kaplay.sprite("elite-motobug", {anim: "run"}),
        kaplay.area({ shape: new kaplay.Rect(kaplay.vec2(-6, 0), 28, 22) }),
        kaplay.scale(4),
        kaplay.anchor("center"),
        kaplay.pos(pos),
        kaplay.offscreen(),
        kaplay.health(2),
        "enemy",
        
        {
         
            speed: 100,
            setEvents() {
               
                this.onExitScreen(() => {
                    if (this.pos.x < 0) {
                        kaplay.destroy(this)
                    }
                })

                this.on("hurt", () => {   
                    if (this.hp() <= 0) {
                        kaplay.play("destroy", { volume: 0.5 })
                        kaplay.destroy(this)
                    }
                })
                 


               
            }
        }
    ])
}