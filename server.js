// require Express.js
const express = require('express')
const app = express()


// take an arbitrary port number as a command line argument 
// Default: 5000
const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || 5000



// start app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
})

//Define base endpoint
app.get('/app/', (req, res) => {
    res.statusCode=200 //respond with status 200
    res.statusMessage='OK' //respond with status message "OK"
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'})
    res.end(res.statusCode + ' ' + res.statusMessage)
})

// unless specified :varaible will be anyinput
app.get('/app/echo/:number',  (req, res) => {
    res.status(200).json({ 'message': req.params.number})
})

// /app/flip/ will be used to tesst single flip without import coin.mjs
app.get('/app/flip/', (req, res) => {
    const flip = coinFlip()
    res.status(200).json({ 'flip': flip})
})

// /app/flips/:number is many flips 
app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number)
    res.status(200).json({'raw': flips, 'summary': countFlips(flips)})
})

// /app/flip/call/heads filp a coing with a call to heads
app.get('/app/flip/call/heads', (req, res) => {
    const str = 'heads'
    const flip = coinFlip()
    const result = win(flip, str)
    res.status(200).json({ 'call': str, 'flip': flip, 'result': result})
})

// /app/flip/call/tails filp a coing with a call to tails
app.get('/app/flip/call/tails', (req, res) => {
  const str = 'tails'
  const flip = coinFlip()
  const result = win(flip, str)
  res.status(200).json({ 'call': str, 'flip': flip, 'result': result})
})

//Define default endpoint
//default response for any other request
app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND')
})



// Functions

function coinFlip() {
    let x = Math.random()
    if(x >= 0.5) {
      return 'heads'
    } else {
      return 'tails'
    }
  }

  function coinFlips(number) {
    let tosses = []
    if(number == null) {
      number = 1;
    }
    for (var i = 0; i < number; i++) {
      tosses[i] = coinFlip()
    }
    return tosses
  }

  function countFlips(array) {
    let count_tails = 0
    let count_heads = 0
    for(let i = 0; i < array.length; i++) {
      if(array[i] == 'tails') {
        count_tails++;
      } else if(array[i] == 'heads') {
        count_heads++;
      }
    }
  
    if(count_tails == 0) {
      return('{ heads: ' + count_heads + ' }')
    } else if (count_heads == 0) {
      return('{ tails: ' + count_tails + ' }')
    } else {
    return('{ heads: ' + count_heads + ', tails: ' + count_tails + ' }')
    }
  }
  
  /** Flip a coin!
   * 
   * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
   * 
   * @param {string} call 
   * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
   * 
   * example: flipACoin('tails')
   * returns: { call: 'tails', flip: 'heads', result: 'lose' }
   */
  
  function flipACoin(call) {
    if(call == null) {
      return('Error: no input') //return error no input
    }
    if(call == 'heads' || call == 'tails') {
      let flip = coinFlip()
      let result = 'lose'
      if(flip == call) {
        result = 'win'
      }
      return("{ call: '" + call + "', flip: '" + flip + "', result: '" + result + "' }")
    } else {
      return('Usage: node guess-flip.js --call= [heads | tails]')
  
    }
    
  }

  function win(flip, call) {
    let result = 'lose'
    if(flip == call) {
      result = 'win'
    }
    return(result)
  }
  