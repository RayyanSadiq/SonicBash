import kaplay from "../kaplayContext";

export function makeMotobug(pos) {
    return kaplay.add([
        kaplay.sprite("motobug", {anim: "run"}),
        kaplay.area({ shape: new kaplay.Rect(kaplay.vec2(-6, 0), 28, 22) }),
        kaplay.scale(4),
        kaplay.anchor("center"),
        kaplay.pos(pos),
        kaplay.offscreen(),
        kaplay.health(1),
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