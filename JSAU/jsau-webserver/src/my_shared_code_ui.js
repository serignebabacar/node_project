'use strict'
let my_shared_code_headless = require('./my_shared_code_headless')

function writeContent() {
    console.log('TODO: Replace this by actual code')
    console.log('Write the 20 first even numbers,')
    console.log('one per second')
    let numbers = my_shared_code_headless.generateEvenNumbers(20)
    console.log(numbers)
}

module.exports = {
    writeContent
}
