import fs from 'fs';

var input = ""

const MAX_RED=12
const MAX_GREEN=13
const MAX_BLUE=14

fs.readFile('test.txt', (err, data) => {
    if (err) throw err;
    input = data.toString();
    solve()
})

function solve() {

    let inputs = input.split("\n");

    inputs.forEach(input => {
        console.log(input);
        parser(input)
    });

}

function parser(line) {

    let splits = line.split(":")
    let id = splits[0].split(" ")[1]
    let sets = splits[1].split(";")
    sets = sets.map((set) => set.replace(" ", ""))
    console.log(sets)

    sets = sets.map((set) => {

        let totalRed = 0
        let totalGreen = 0
        let totalBlue = 0    

        let colors = set.split(",")
        // need to parse out the colors here now. It is only splitting at the commas... 

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

    console.log(sets)
}

class Game {
    constructor(id, sets) {
        this.id = id;
        this.sets = sets;
        this.possible = true
    }

    isGamePossible() {
        if (this.possible === false) {
            return
        }

        this.possible = this.sets.forEach((set) => {
            return set.red < MAX_RED && set.green < MAX_GREEN && set.blue < MAX_BLUE
        })
    }
}

class GameSet {
    constructor(red, green, blue) {
        this.red = red
        this.green = green
        this.blue = blue
    }
}