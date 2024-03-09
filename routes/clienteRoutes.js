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
        
       /* clienteRoutes.get("/clienteRota", async (req, res) => {
          try {
            // Função para calcular a distância entre dois pontos (euclidiana)
            function calcularDistancia(ponto1, ponto2) {
              if (!ponto1.coordenada_x || !ponto1.coordenada_y || !ponto2.coordenada_x || !ponto2.coordenada_y) {
                // Se uma das coordenadas estiver faltando, retorne Infinity para indicar uma distância impossível
                return Infinity;
              }
              const x1 = parseFloat(ponto1.coordenada_x);
              const y1 = parseFloat(ponto1.coordenada_y);
              const x2 = parseFloat(ponto2.coordenada_x);
              const y2 = parseFloat(ponto2.coordenada_y);
              return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            }
            
            
            // Função para calcular a rota ótima usando força bruta
            function calcularRotaOtima(clientes) {
              let melhorRota = [];
              let menorDistancia = Infinity;
            
              // Função para gerar todas as permutações dos clientes
              function permutacoes(atual, disponiveis) {
                if (disponiveis.length === 0) {
                  let distanciaTotal = 0;
                  for (let i = 0; i < atual.length - 1; i++) {
                    distanciaTotal += calcularDistancia(atual[i], atual[i + 1]);
                  }
                  distanciaTotal += calcularDistancia(atual[atual.length - 1], atual[0]);
            
                  if (distanciaTotal < menorDistancia) {
                    menorDistancia = distanciaTotal;
                    melhorRota = atual.slice();
                  }
                } else {
                  for (let i = 0; i < disponiveis.length; i++) {
                    const novoAtual = atual.concat(disponiveis[i]);
                    const novosDisponiveis = disponiveis.slice(0, i).concat(disponiveis.slice(i + 1));
                    permutacoes(novoAtual, novosDisponiveis);
                  }
                }
              }
            
              // Iniciar o processo de permutação
              permutacoes([], clientes);
            
              return melhorRota;
            }
                         
            
            // Supondo que você já tenha a lista de clientes disponíveis no banco de dados
            const clientes = await prisma.cliente.findMany();
            console.log("Clientes:", clientes)
            const rotaOtima = calcularRotaOtima(clientes);
            console.log("Rota ótima:", rotaOtima)
            // Retorne a rota ótima como resposta
            return res.status(200).json(rotaOtima);
         
          } catch (error) {
            console.error("Erro ao calcular rota ótima:", error);
            return res.status(500).json({ error: "Erro interno do servidor ao calcular a rota ótima" });
          }
        });
        */
        function calcularDistancia(ponto1, ponto2) {
          return Math.sqrt(Math.pow(ponto2.coordenada_x - ponto1.coordenada_x, 2) + Math.pow(ponto2.coordenada_y - ponto1.coordenada_y, 2));
        }
        
        // Função para calcular a rota ótima usando força bruta
        async function calcularRotaOtima(cliente) {
          let melhorRota = [];
          let menorDistancia = Infinity;
        
          // Função para gerar todas as permutações das cliente
          function permutacoes(atual, disponiveis) {
            if (disponiveis.length === 0) {
              let distanciaTotal = 0;
              for (let i = 0; i < atual.length - 1; i++) {
                distanciaTotal += calcularDistancia(atual[i], atual[i + 1]);
              }
              distanciaTotal += calcularDistancia(atual[atual.length - 1], atual[0]);
        
              if (distanciaTotal < menorDistancia) {
                menorDistancia = distanciaTotal;
                melhorRota = atual.slice();
              }
            } else {
              for (let i = 0; i < disponiveis.length; i++) {
                const novoAtual = atual.concat(disponiveis[i]);
                const novosDisponiveis = disponiveis.slice(0, i).concat(disponiveis.slice(i + 1));
                permutacoes(novoAtual, novosDisponiveis);
              }
            }
          }
        
          // Iniciar o processo de permutação
          permutacoes([], cliente);
        
          return melhorRota;
        }
        
        // Rota API para calcular a rota ótima
        clienteRoutes.get('/calcularRotaOtima', async (req, res) => {
          try {
            const cliente = await prisma.cliente.findMany(); // Obtém os dados do banco de dados
            const rotaOtima = await calcularRotaOtima(cliente); // Calcula a rota ótima
            res.json({ rota_otima: rotaOtima });
          } catch (error) {
            console.error("Erro ao calcular rota ótima:", error);
            res.status(500).json({ error: "Erro interno do servidor ao calcular a rota ótima" });
          }
        });
        
module.exports=clienteRoutes;