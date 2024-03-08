const express = require("express")
const app = express()
const cors=require("cors")
app.use(cors())
//var router = require("./routes/routes")

const clienteRoutes=require("./routes/clienteRoutes")

//const Routes=require("./routes/ArquitetoRoutes")

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json())


app.use(clienteRoutes)

//app.use("/",router);
//conexão com o banco de dados

app.listen(1700,()=>{
    console.log("Aqui funcionou")
})
