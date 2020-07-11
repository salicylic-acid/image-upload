const express = require('express')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads'))
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
}).single('uploadImage')

const ejs   = require('ejs')
const path  = require('path')
const PORT  = process.env.PORT || 3000
const app   = express()


app.set('view engine', 'ejs')

//Static Asset Folder
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => res.render('index.ejs'))

app.post('/upload', (req, res) => {

  upload(req, res, err => {
    if(err){
      res.render('index', {msg: err})
    } else {
      res.send('else')
    }
  })

})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
