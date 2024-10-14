import kaplay from "../kaplayContext"

 

export default function gameOver(citySfx) {
    citySfx.paused = true
    let bestScore = kaplay.getData("best-score")
    const currentScore = kaplay.getData("current-score")

    const rankGrades = ["F", "E", "D", "C", "B", "A", "S"]
    const rankValues = [50, 80, 110, 200, 300, 400, 500]

    let currentRank = "F"
    let bestRank = "F"

    for (let i = 0; i < rankValues.length; i++) {
        if (currentScore >= rankValues[i]) {
            currentRank = rankGrades[i]
        }

        if (bestScore >= rankValues[i]) {
            bestRank = rankGrades[i]
        }
    }

    if (bestScore < currentScore) {
        kaplay.setData("best-score", currentScore)
        bestScore = currentScore
        bestRank = currentRank
    }

    kaplay.add([
        kaplay.text("GAME OVER", { font: "mania", size: 96 }),
        kaplay.anchor("center"),
        kaplay.pos(kaplay.center().x, kaplay.center().y - 300),
    ]);
    kaplay.add([
        kaplay.text(`BEST SCORE : ${bestScore}`, {
            font: "mania",
            size: 64,
        }),
        kaplay.anchor("center"),
        kaplay.pos(kaplay.center().x - 400, kaplay.center().y - 200),
    ]);
    kaplay.add([
        kaplay.text(`CURRENT SCORE : ${currentScore}`, {
            font: "mania",
            size: 64,
        }),
        kaplay.anchor("center"),
        kaplay.pos(kaplay.center().x + 400, kaplay.center().y - 200),
    ]);

    const bestRankBox = kaplay.add([
        kaplay.rect(400, 400, { radius: 4 }),
        kaplay.color(0, 0, 0),
        kaplay.area(),
        kaplay.anchor("center"),
        kaplay.outline(6, kaplay.Color.fromArray([255, 255, 255])),
        kaplay.pos(kaplay.center().x - 400, kaplay.center().y + 50),
    ]);

    bestRankBox.add([
        kaplay.text(bestRank, { font: "mania", size: 100 }),
        kaplay.anchor("center"),
    ]);

    const currentRankBox = kaplay.add([
        kaplay.rect(400, 400, { radius: 4 }),
        kaplay.color(0, 0, 0),
        kaplay.area(),
        kaplay.anchor("center"),
        kaplay.outline(6, kaplay.Color.fromArray([255, 255, 255])),
        kaplay.pos(kaplay.center().x + 400, kaplay.center().y + 50),
    ]);

    currentRankBox.add([
        kaplay.text(currentRank, { font: "mania", size: 100 }),
        kaplay.anchor("center"),
    ]);

    kaplay.wait(1, () => {
        kaplay.add([
            kaplay.text("Press Space/Click/Touch to Play Again", {
                font: "mania",
                size: 64,
            }),
            kaplay.anchor("center"),
            kaplay.pos(kaplay.center().x, kaplay.center().y + 350),
        ]);
        kaplay.onButtonPress("jump", () => kaplay.go("game"));
    });



}