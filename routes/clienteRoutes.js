const {PrismaClient} = require("@prisma/client")
const prisma =new PrismaClient();

const { req, res} = require("express");
const express =require("express")
const clienteRoutes=express.Router()

clienteRoutes.get("/cliente",async(req, res)=>{
       // console.log(req.body)
       const cliente = await prisma.cliente.findMany()    
 
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
  
        clienteRoutes.get("/clienteFiltrar", async (req, res) => {
          try {
            // Verifica se há parâmetros de consulta na URL
            let { nome, email, telefone } = req.query;
            let filtro = {};
        
            // Converte os parâmetros para minúsculas
            nome = nome ? nome.toLowerCase() : nome;
            email = email ? email.toLowerCase() : email;
            telefone = telefone ? telefone.toLowerCase() : telefone;
        
            // Constrói o objeto de filtro com base nos parâmetros fornecidos
            if (nome) filtro.nome = { contains: nome };
            if (email) filtro.email = { contains: email };
            if (telefone) filtro.telefone = { contains: telefone };
        
            // Faz a consulta ao banco de dados com base no filtro
            const clientes = await prisma.cliente.findMany({
              where: filtro,
            });
        
            return res.status(200).json(clientes);
          } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }
        });
        
module.exports=clienteRoutes;