'use strict'

function generateEvenNumbers(max) {
    let tab = []
    let k = 0
    for (let i = 2; i <= max ;i++) {
        if (i % 2 == 0) {
            tab[k] = i
            k++
        }
    }
    return tab
}

module.exports = {
    generateEvenNumbers
}
