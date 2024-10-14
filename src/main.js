import kaplay from "./kaplayContext";
import disclaimer from "./scenes/disclaimer";
import game from "./scenes/game";
import gameOver from "./scenes/gameOver";
import mainMenu from "./scenes/mainMenu";

kaplay.loadSprite("chemical-bg", "graphics/chemical-bg.png")
kaplay.loadSprite("platform", "graphics/platforms.png")

kaplay.loadSprite("sonic", "graphics/sonic.png", {
    sliceX: 8,
    sliceY: 2,
    anims: {
        run: {
            from: 0,
            to: 7,
            loop: true,
            speed: 30
             
        },
        jump: {
            from: 8,
            to: 15,
            loop: true,
            speed: 90
        }
    }
})

kaplay.loadSprite("motobug", "graphics/motobug.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
        run: {
            from: 0,
            to: 4,
            loop: true,
            speed: 8
             
        },
    }
})

kaplay.loadSprite("ring", "graphics/ring.png", {
    sliceX: 16,
    sliceY: 1, 
    anims: {
        spin: {
            from: 0,
            to: 15,
            loop: true,
            speed: 30
        }
    }

})

kaplay.loadFont("mania", "fonts/mania.ttf")

kaplay.loadSound("city", "sounds/city.mp3")
kaplay.loadSound("jump", "sounds/Jump.wav")
kaplay.loadSound("ring", "sounds/Ring.wav")
kaplay.loadSound("destroy", "sounds/Destroy.wav")
kaplay.loadSound("hurt", "sounds/Hurt.wav")
kaplay.loadSound("hyper-ring", "sounds/HyperRing.wav")

kaplay.scene("disclaimer", disclaimer)
kaplay.scene("menu", mainMenu)
kaplay.scene("game", game)
kaplay.scene("game-over", gameOver)

kaplay.go("disclaimer")

