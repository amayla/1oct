var express = require('express')
var bodyParser = require ('body-parser')
var cors = require ('cors')
var addProduct = require('./routers/authRouter')

const app = express()
const port = 1101
var multer = require('multer')
const Authrouter = require('./routers/Authrouter')

app.use(bodyParser.json())
app.use(cors())
app.use('/files', express.static('uploads'))
app.use (Authrouter)
app.get('/', (req, res) => {
    res.send('hehe')
})

let multerStorageConfig = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, './uploads')
    },

    filename : (req,file,cb) => {
        cb(null, `prd-${Date.now()}.${file.mimetype.split('/')[1]}`)
        
    }
    
})



let filterConfig = (req, file,cb) => {
    if(file.mimetype.split('/')[1] == 'jpeg' || file.mimetype.split('/')[1] == 'png'){
        cb(null, true)
    }else{
        req.validation = {error : true, msg : 'File must be a .jpg/.png extension '}
        cb(null, false)
    }
        
}

let upload = multer({
    storage: multerStorageConfig,
    fileFilter: filterConfig
})
module.exports = upload

app.use('/auth', Authrouter)
// app.post('/uploadimage', upload.single('check'), (req,res) => {
//     console.log(req)
//     res.send('success')
// })

app.post('/addproduct',addProduct)

app.listen(port, () => console.log("Server up in port " + port))

