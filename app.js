const express = require('express')
const upload  = require('multer')({dest: `./uploads`})
const path    = require('path')
const PORT    = 3000
const app     = express()

//Static Asset Folder
app.use(express.static(path.join(__dirname, 'public')))

//app.use('/image/upload', require('./'))

app.listen(PORT, () => console.log(`Server running on: ${PORT}`))
