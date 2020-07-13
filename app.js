const express = require('express')
const ejs = require('ejs')
const path = require('path')
const PORT = process.env.PORT || 3000
const app = express()

const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}).single('uploadImage')

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  mimetype && extname ? cb(null, true) : cb('Error: Images Only!')
}

app.set('view engine', 'ejs')

//Static Asset Folder
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => res.render('index.ejs'))

app.post('/upload', (req, res) => {

  upload(req, res, err => {
    if (err) {
      res.render('index', {
        msg: err
      })
    } else {
      if (req.file == undefined) {
        res.render('index', {msg: 'Error: No File Selected'})
      } else {
        res.render('index', {msg: 'File Uploaded!', file: `uploads/${req.file.filename}`})
      }
    
    }
  })

})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
