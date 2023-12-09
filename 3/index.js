import fs from 'fs';

var input = ""

fs.readFile('test.txt', (err, data) => {
    if (err) throw err
    input = data.toString()
    solve()
})

const RANK = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

function getStrength(card) {
    return RANK.length - RANK.indexOf(card)
}

function solve() {
    let raw = input.split("\n")
    let hands = raw.map(hand => new Hand(hand))
    console.log(hands)
}

class Hand {
    constructor(hand) {
        this.cards = hand.split(" ")[0]
        this.bid = parseInt(hand.split(" ")[1])
        this.type = undefined
        this.sortHand()
        this.typeOfHand()
    }

    sortHand() {
        let split = this.cards.split("")
        this.cards = split.sort((a, b) => { return getStrength(a) - getStrength(b) }).join("")
    }

    typeOfHand() {
        
        const FLUSH_REGEX = /^([\d\D])\1{0,4}$/
        const FOUR_REGEX = /^(?:.*?(.)(?=(?:.*?\1){3})){4}.*$/
        
        
        console.log(this.cards)

        console.log(this.cards.match(FOUR_REGEX))

    }

    // occurences() {
    //     for (let card in this.cards) {
    //         console.log(card)
    //     }
    // }
}



