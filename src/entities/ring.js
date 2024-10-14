import kaplay from "../kaplayContext"

export function makeRing(pos) {
    return kaplay.add([
        kaplay.sprite("ring", {anim: "spin"}),
        kaplay.pos(pos),
        kaplay.scale(4),
        kaplay.area(),
        kaplay.anchor('center'), 
        // play with the offscreen property to see how it affects the game
        kaplay.offscreen(),
        "ring",
        {
            setEvents() {
                 
            }
        }
    ])

}