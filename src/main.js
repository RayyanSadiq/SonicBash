import kaplay from "./kaplayContext";
import disclaimer from "./scenes/disclaimer";
import game from "./scenes/game";
import gameOver from "./scenes/gameOver";
import mainMenu from "./scenes/mainMenu";

kaplay.loadSprite("chemical-bg", "graphics/chemical-bg.png")
kaplay.loadSprite("platform", "graphics/platforms.png")

kaplay.loadSpriteAtlas(  "graphics/UI.png", {
    "energy-icon": { x: 0, y: 0, width: 16, height: 16, sliceX: 1, sliceY: 1 },
    "energy-bg-begin": { x: 18, y: 0, width: 11, height: 16, sliceX: 1, sliceY: 1 },
    "energy-bg": { x: 34, y: 0, width: 11, height: 16, sliceX: 1, sliceY: 1 },
    "energy-bg-end": { x: 50, y: 0, width: 12, height: 16, sliceX: 1, sliceY: 1 },
    "energy-cell-full": { x: 4, y: 21, width: 9, height: 5, sliceX: 1, sliceY: 1 },
    "energy-cell-empty": { x: 20, y: 21, width: 9, height: 5, sliceX: 1, sliceY: 1 },
    "crosshair": { x: 0, y: 32, width: 16, height: 16, sliceX: 1, sliceY: 1 },

})

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

kaplay.loadSprite("elite-motobug", "graphics/EliteMotobug.png", {
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
kaplay.loadSound("spin", "sounds/Spin.wav")
kaplay.loadSound("hyper-ring", "sounds/HyperRing.wav")

kaplay.scene("disclaimer", disclaimer)
kaplay.scene("menu", mainMenu)
kaplay.scene("game", game)
kaplay.scene("game-over", gameOver)

kaplay.go("disclaimer")

