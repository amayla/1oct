var express = require('express')
var bodyParser = require ('body-parser')
var cors = require ('cors')
const db = require('./database/index')

const app = express()
const port = 1101
var multer = require('multer')
var urlapi = 'http://localhost:1101/'


app.use(bodyParser.json())
app.use(cors())
app.use('/files', express.static('uploads')) //untuk akses ke folder uploads

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



app.post('/uploadimage', upload.single('check'), (req,res) => {
    db.query(`insert into pictable (id,name,image) values (0,'test', '${urlapi}${req.file.path.replace('uploads','files')}')`, (err,result)=>{
    console.log(req)
    res.send(result)
})
})


app.listen(port, () => console.log("Server up in port " + port))

