const express = require('express')
const path = require('path')
const app = express()
//env.PORT specified here for future deployment
const PORT = 3000 || process.env.PORT
// Set static folder for UI
app.use(express.static(path.join(__dirname, 'UI')))

// run server
app.listen(PORT, () => console.log(`Server running at ${PORT}`))