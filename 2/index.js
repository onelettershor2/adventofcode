import fs from 'fs';

var input = ""

const MAX_RED=12
const MAX_GREEN=13
const MAX_BLUE=14

fs.readFile('input.txt', (err, data) => {
    if (err) throw err;
    input = data.toString();
    solve()
})

function solve() {

    let inputs = input.split("\n");

    let possibleGamesTotal = 0
    let powerTotal = 0

    inputs.forEach(input => {
        let game = parser(input)
        if (game.possible) {
            possibleGamesTotal += game.id
        }
        powerTotal += game.fewestCubesPossiblePower()
    });

    console.log("Possible games: " + possibleGamesTotal)
    console.log("Power total: " + powerTotal)

}

function parser(line) {

    let splits = line.split(":")
    let id = parseInt(splits[0].split(" ")[1])
    let sets = splits[1].split(";")
    sets = sets.map((set) => set.replace(" ", ""))

    sets = sets.map((set) => {

        let totalRed = 0
        let totalGreen = 0
        let totalBlue = 0    

        let colors = set.split(",")

        colors.forEach(color => {
            if (color.includes(" red")) {
                totalRed += parseInt(color.replace(" red", ""))
            } else if (color.includes(" green")) {
                totalGreen += parseInt(color.replace(" green", ""))
            } else if (color.includes(" blue")) {
                totalBlue += parseInt(color.replace(" blue", ""))
            }
        })

        return new GameSet(totalRed, totalGreen, totalBlue)
    })

    return new Game(id, sets)

}

class Game {
    constructor(id, sets) {
        this.id = id;
        this.sets = sets;
        this.possible = true
        this.isGamePossible()
    }

    isGamePossible() {
        if (this.possible === false) {
            return
        }

        let possibilities = this.sets.map((set) => {
            return set.red <= MAX_RED && set.green <= MAX_GREEN && set.blue <= MAX_BLUE
        })

        this.possible = possibilities.includes(false) ? false : true
    }

    fewestCubesPossiblePower() {

        let fewestRed = 0
        let fewestGreen = 0
        let fewestBlue = 0

        this.sets.forEach((set) => {
            if (set.red > fewestRed) {
                fewestRed = set.red
            } 
            if (set.green > fewestGreen) {
                fewestGreen = set.green
            } 
            if (set.blue > fewestBlue) {
                fewestBlue = set.blue
            }
        })

        return fewestRed * fewestGreen * fewestBlue

    }
}

class GameSet {
    constructor(red, green, blue) {
        this.red = red
        this.green = green
        this.blue = blue
    }
}