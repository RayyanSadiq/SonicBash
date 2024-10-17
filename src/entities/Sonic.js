import kaplay from "../kaplayContext";

export function makeSonic(pos, gameSpeed, energy) {
    return kaplay.add([
        kaplay.sprite("sonic", { anim: "run" }),
        kaplay.pos(pos),
        kaplay.scale(4),
        kaplay.anchor('center'),
        kaplay.area(),
        kaplay.body({ jumpForce: 1400 }),
        "player",
        {

            isFocusedEnemy: false,
            focusedEnemy: null,
            isAttackingFocused: false,
            
            energy: energy,
            energyMax: energy,
            energyRechargeTime: 5,
            energyRechargeTimer: 0,
            cooldownTime: 0.5,
            cooldownTimer: 0,
            speed: gameSpeed,


            setControls() {
                kaplay.onButtonPress("jump", () => {
                    if (this.isGrounded() && !this.isFocusedEnemy && !this.focusedEnemy) {
                        this.jump()

                        this.play("jump")
                        kaplay.play("jump", { volume: 0.5 })

                    }

                    if (this.cooldownTimer <= 0 && this.isFocusedEnemy) {
                        if (this.energy > 0) {
                            this.energy--

                            kaplay.tween(this.pos, kaplay.vec2(this.focusedEnemy.pos.x, this.focusedEnemy.pos.y - this.focusedEnemy.height * 3), 0.13  , (p) => this.pos = p, kaplay.easings.linear)
                            this.isAttackingFocused = true
                            kaplay.wait(0.13 , () => {
                                this.isAttackingFocused = false
                            })
                            this.isFocusedEnemy = false
                            this.jumpForce = 1750
                            kaplay.play("spin", { volume: 0.5 })
                            this.trigger("hit", this.focusedEnemy, 2)
                        }

                    }
                })

                
            },

            setEvents() {

                this.onUpdate(() => {
                    
                        let directionSpeed = 0
                        if (kaplay.isButtonDown("leftk") && !this.isAttackingFocused) {
                            directionSpeed = -500    
                        }
                        if (kaplay.isButtonDown("rightk")&& !this.isAttackingFocused) {
                           directionSpeed = 500  
                        }
                        console.log (directionSpeed)
                         
                        this.move(this.isGrounded() ? this.speed + directionSpeed : 0  + directionSpeed, 0)
                         
                        
                         
                   

                    let enemies = kaplay.get("enemy")
                    enemies.forEach(enemy => {
                        if (!this.isGrounded() && this.pos.dist(enemy.pos) <= 500 && this.pos.y < enemy.pos.y - 256) {
                            console.log("focused")
                            this.isFocusedEnemy = true
                            this.focusedEnemy = enemy
                        }
                    })

                    if (!this.focusedEnemy || this.pos.dist(this.focusedEnemy.pos) > 500 || this.pos.y > this.focusedEnemy.pos.y - 256) {
                        this.isFocusedEnemy = false
                        this.focusedEnemy = null
                    }

                    if (this.cooldownTimer > 0) {
                        this.cooldownTimer -= kaplay.dt()
                    }

                    if (this.energy < this.energyMax) {

                        if (this.energyRechargeTimer <= 0) {
                            this.energy++
                            this.energyRechargeTimer = this.energyRechargeTime
                        }
                        else {
                            this.energyRechargeTimer -= kaplay.dt()
                        }

                    } else if (this.energy === this.energyMax) {
                        this.energyRechargeTimer = this.energyRechargeTime
                    }


                  
                })

                this.onGround(() => {
                    this.isFocusedEnemy = false
                    this.focusedEnemy = null
                    this.play("run")

                })

                this.onCollide("enemy", (enemy) => {
                    if (!this.isGrounded()) {
                         
                        if (this.isAttackingFocused) {
                            this.isFocusedEnemy = false
                            this.focusedEnemy = null
                        } else {
                            this.trigger("hit", enemy, 1)
                        }
                    }
                    else {
                        kaplay.destroy(this)
                        kaplay.destroy(enemy)
                        kaplay.play("hurt", { volume: 0.5 })
                    }
                })

                this.on("hit", (enemy, damage) => {
                    
                    kaplay.play("hyper-ring", { volume: 0.5 })
                    enemy.hurt(damage)
                    this.play("jump")
                    this.jump()
                    this.jumpForce = 1400
                    this.cooldownTimer = this.cooldownTime
                })

                this.onCollide("ring", (ring) => {
                    kaplay.play("ring", { volume: 0.5 })
                    kaplay.destroy(ring)
                })


            }
        }
    ])
}