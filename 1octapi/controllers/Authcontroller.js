const db = require('../database/index.js')


module.exports={
    addProduct:  (req,res) =>{
        db.query(`insert into pictable (id,name,image) values (0, '${req.body.name}',null)`, (err,result)=>{
            if(err) throw err
            res.send(result)
        })
}

}