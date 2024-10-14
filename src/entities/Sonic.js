import kaplay from "../kaplayContext";

export function makeSonic(pos, gameSpeed) {
    return kaplay.add([
        kaplay.sprite("sonic", {anim: "run"}),
        kaplay.pos(pos),
        kaplay.scale(4),
        kaplay.anchor('center'),
        kaplay.area(),
        kaplay.body( { jumpForce: 1600 }),
        "player",
        {

            speed: gameSpeed,

            setControls() {
                kaplay.onButtonPress("jump", () => {
                    if (this.isGrounded()) {
                        this.jump()
                    
                        this.play("jump")
                        kaplay.play("jump", { volume: 0.5 })

                    }
                })
            },

            setEvents() {

                this.onUpdate(() => {
                    if (this.isGrounded()) {
                        this.move(this.speed, 0)
                    }
                })

                this.onGround(() => {
                    this.play("run")
                })
             
                
            }
        }
    ])
}