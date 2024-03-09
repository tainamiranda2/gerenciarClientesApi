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
        
       
    

// Função para calcular a distância entre dois pontos (euclidiana)
clienteRoutes.get('/calcularRotaOtima', async (req, res) => {
function calcularDistancia(ponto1, ponto2) {
  const dx = ponto2.x - ponto1.x;
  const dy = ponto2.y - ponto1.y;
  return Math.sqrt(dx * dx + dy * dy); // Distância euclidiana
}

const clientes= await prisma.cliente.findMany(); 

  const pontos = clientes.map(cliente => ({
    nome: cliente.nome,
    x: parseFloat(cliente.coordenada_x),
    y: parseFloat(cliente.coordenada_y)
  }));
  
/*const pontos = [
  { nome: "Empresa", x: 0, y: 0 }, // Empresa
  { nome: "Pajuçara", x: -9.6601, y: -35.7125 },
  { nome: "Pontal da Barra", x: -9.6540, y: -35.7138 },
  { nome: "Jaraguá", x: -9.6701, y: -35.7285 },
  { nome: "Jatiúca", x: -9.6555, y: -35.7272 },
  { nome: "Cruz das Almas", x: -9.6209, y: -35.7219 },
  { nome: "Farol", x: -9.6574, y: -35.7096 },
  { nome: "Ponta Verde", x: -9.6603, y: -35.7060 }
];
*/
// Função para calcular a rota ótima usando força bruta
function calcularRotaOtima(pontos) {
  let melhorRota = []; // Inicializa a melhor rota encontrada
  let menorDistancia = Infinity; // Inicializa a menor distância como infinito
  
  // Função recursiva para gerar todas as permutações dos pontos
  function permutacoes(atual, disponiveis) {
    if (disponiveis.length === 0) {
      // Se todos os pontos foram visitados, calcule a distância total da rota
      let distanciaTotal = 0;
      for (let i = 0; i < atual.length - 1; i++) {
        distanciaTotal += calcularDistancia(atual[i], atual[i + 1]);
      }
      // Adicione a distância de volta ao ponto inicial
      distanciaTotal += calcularDistancia(atual[atual.length - 1], atual[0]);
      
      // Verifica se a nova rota é melhor que a atual
      if (distanciaTotal < menorDistancia) {
        menorDistancia = distanciaTotal;
        melhorRota = atual.slice(); // Atualiza a melhor rota
      }
    } else {
      // Para cada ponto disponível, gere novas rotas
      for (let i = 0; i < disponiveis.length; i++) {
        const novoAtual = atual.concat(disponiveis[i]); // Adiciona um novo ponto à rota atual
        const novosDisponiveis = disponiveis.slice(0, i).concat(disponiveis.slice(i + 1)); // Remove o ponto usado dos disponíveis
        permutacoes(novoAtual, novosDisponiveis); // Chamada recursiva para gerar novas permutações
      }
    }
  }
  
  // Inicia o processo de permutação com uma rota vazia e todos os pontos disponíveis
  permutacoes([pontos[0]], pontos.slice(1)); // Começa da empresa (ponto 0)
  
  // Adiciona o ponto inicial no final da rota
  melhorRota.push(pontos[0]);
  
  return melhorRota; // Retorna a melhor rota encontrada
}
try {


  const rotaOtima =  calcularRotaOtima(pontos);
 /// console.log("Rota ótima calculada:", rotaOtima);
  
  res.json({ rotaOtima });
} catch (error) {
  //console.error("Erro ao calcular rota ótima:", error);
  res.status(500).json({ error: "Erro interno do servidor ao calcular a rota ótima" });
}
const rotaOtima = calcularRotaOtima(pontos);
//console.log("Rota ótima:", rotaOtima);

})

module.exports=clienteRoutes;