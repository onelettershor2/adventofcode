import fs from 'fs';

var input = ""

fs.readFile('input.txt', (err, data) => {
    if (err) throw err;
    input = data.toString();
    solve()
})

let test = "10 13 16 21 30 45"

function solve() {

    let totalValues = 0

    var lines = input.split("\n");

    lines.forEach(line => {
        let lineArray = parseLine(line)
        let calculatedSequences = breakdown(lineArray)
        let extrapolatedValue = parseInt(extrapolate(calculatedSequences))
        // To reverse replace lineArray[0] and find the last item and add instead of subtract
        let nextSequence = parseInt(lineArray[0]) - parseInt(extrapolatedValue)
        totalValues += nextSequence
    })

    console.log(totalValues)
}

function breakdown(line) {

    let previousArray = line

    let masterArray = []

    let breakdownArray = []

    let i = 0

    while (i < 100) {
        previousArray.forEach((number, j) => {
            if (j == 0) {
                return
            }
            let nextNumber = previousArray[j - 1]
            breakdownArray.push(number - nextNumber)
        })

        masterArray.push(breakdownArray)

        if (breakdownArray.every( (val, i, arr) => val === arr[0]) && breakdownArray[0] == 0) {
            break
        }

        previousArray = breakdownArray

        breakdownArray = []
        i++;
    }

    return masterArray

}

function extrapolate(sequences) {

    sequences = sequences.reverse()

    // sequences.forEach((sequence, i) => {
    //     if (i == 0) { return }
    //     let previousSequence = sequences[i - 1][sequences[i - 1].length - 1]
    //     let last = sequence[sequence.length - 1]
    //     sequence.push(last + previousSequence)
    // })

    sequences.forEach((sequence, i) => {
        if (i == 0) { return }
        let previousSequence = sequences[i - 1][0]
        let first = sequence[0]
        sequence.unshift(first - previousSequence)
    })

    return sequences[sequences.length - 1][0]

}

function parseLine(line) {
    return line.split(" ").map(x => parseInt(x))
}

