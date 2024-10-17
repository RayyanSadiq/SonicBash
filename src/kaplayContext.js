import kaplayContext from "kaplay";

const kaplay = kaplayContext ({
    width: 1920,
    height: 1080,
    letterbox: true,
    background: [0, 0, 0],
    global: false,
    touchToMouse: true,
    buttons: {
        jump: {
            keyboard: ["space"],
            mouse: "left"
        },
        leftk: {
            keyboard: ["a", "left"],
        },
        rightk: {
            keyboard: ["d", "right"],
        }
    },
    debugKey: "y",
    debug: true // set it to false when publishing

});

export default kaplay;

