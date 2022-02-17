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
