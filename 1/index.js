import fs from 'fs';

var input = ""

fs.readFile('case1.txt', (err, data) => {
    if (err) throw err;
    input = data.toString();
    solve()
})

let dictionary = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
}

function replacer(match) {
    console.log(`MATCH ${match}`)
    return dictionary[match];
}

function solve() {
    
    var amount = 0

    let lines = input.split("\n")

    var numbersArray = []

    let replace = /one|two|three|four|five|six|seven|eight|nine/g

    lines.forEach(line => {
        line = line.replace(replace, replacer)
        console.log(line)
        let regex = /[1-9]/g
        let numbers = line.match(regex)
        console.log(numbers)
        numbersArray.push(numbers)
    })

    numbersArray.forEach(numbers => {
        var amt = 0
        if (numbers.length == 1) {
            amt = numbers[0] + numbers[0]
        } else {
            amt = numbers[0] + numbers[numbers.length - 1]
            console.log(amt)
        }
        amount += parseInt(amt)
    })

    console.log(amount)

}