import kaplay from "../kaplayContext";



export default function disclaimer() {
    kaplay.add([
        kaplay.text("DISCLAIMER", { font: "mania", size: 96 }),
        kaplay.anchor("center"),
        kaplay.pos(kaplay.center().x, kaplay.center().y - 300),
    ]);
    kaplay.add([
        kaplay.text("This game is a fan-made game and is not affiliated with SEGA.", {
            font: "mania",
            size: 64,
        }),
        kaplay.anchor("center"),
        kaplay.pos(kaplay.center().x, kaplay.center().y - 200),
    ]);
    kaplay.add([
        kaplay.text("This game is a fangame made by Droid7X using assets from Sonic Mania.", {
            font: "mania",
            size: 32,
        }),
        kaplay.anchor("center"),
        kaplay.pos(kaplay.center().x, kaplay.center().y - 100),
    ]);

    kaplay.add([
        kaplay.text("Press Start/Jump/Touch to continue", {
            font: "mania",
            size: 64,
        }),
        kaplay.anchor("center"),
        kaplay.pos(kaplay.center().x, kaplay.center().y + 300),
    ]);
 
    kaplay.onButtonPress("jump", () => kaplay.go("main-menu"));
}