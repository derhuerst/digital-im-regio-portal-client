'use strict'

const {inspect} = require('util')
const fetchStatus = require('.')

fetchStatus()
.then((status) => {
	console.log(inspect(status, {depth: null, colors: true}))
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
