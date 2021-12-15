const express = require('express')
const app = express()
//env.PORT specified here for future deployment
const PORT = 3000 || process.env.PORT

// run server
app.listen(PORT, () => console.log(`Server running at ${PORT}`))