const {PrismaClient} = require("@prisma/client")
const prisma =new PrismaClient();

const { req, res} = require("express");
const express =require("express")
const clienteRoutes=express.Router()

clienteRoutes.get("/cliente",async(req, res)=>{
       // console.log(req.body)
       const cliente = await prisma.arquiteto.findMany()    
 
  return res.status(200).json(cliente)
    
})

clienteRoutes.post("/cliente" ,async(req, res)=>{
      var {nome ,email ,  telefone, coordenada_x, coordenada_y }=req.body

       if(nome == undefined || nome ===''){
           return res.status(400).json("nome vazio")
         }
                    
  
        if(email == undefined || email ===''){
          return  res.status(400).json("email vazio")
                    }
            
        if(telefone == undefined || telefone ===''){
         return   res.status(400).json("telefone vazio")
                    
      }
// por equanto sem validação

      const cliente= await prisma.cliente.create({
        data:{
          nome ,email ,  telefone , coordenada_x, coordenada_y
        },
      })

      return res.status(200).json(cliente)
    
  
    })
  
        //res.send("Pegando o corpo da requisicao")
  
  
module.exports=clienteRoutes;