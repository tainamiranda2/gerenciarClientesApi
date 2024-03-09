# Sistema de Gerenciamento de Clientes

API para um Sistema de Gerenciamento de Clientes fictícios. Esta API permite cadastrar clientes e obter informações sobre eles, incluindo a capacidade de calcular uma rota ótima com base em suas coordenadas.

## Dependências

- Node.js
- Express
- Nodemon (opcional, para ambiente de desenvolvimento)
- Cors
- Prisma

## Configuração do Banco de Dados

Este projeto utiliza o Prisma como ORM para interagir com o banco de dados. Certifique-se de configurar as credenciais do banco de dados no arquivo `schema.prisma` e executar as migrações necessárias com o seguinte comando:


## Como Executar

1. Clone este repositório:

2. Instale as dependências:

3. Execute o servidor:


## Endpoints

### POST /cliente

Este endpoint é responsável por cadastrar um novo cliente. Envie uma requisição POST com os seguintes parâmetros no corpo da solicitação:

- `nome`: Nome do cliente
- `email`: E-mail do cliente
- `telefone`: Número de telefone do cliente
- `coordenada_x`: Coordenada X do cliente
- `coordenada_y`: Coordenada Y do cliente

Exemplo de requisição:

```json
{
  "nome": "Exemplo",
  "email": "exemplo@email.com",
  "telefone": "123456789",
  "coordenada_x": 10.0,
  "coordenada_y": 20.0
}
GET /cliente
Este endpoint retorna uma lista de todos os clientes cadastrados no banco de dados.

GET /clienteFiltrar
Este endpoint permite filtrar os clientes com base nos seguintes parâmetros de consulta na URL:

nome: Filtra os clientes pelo nome
email: Filtra os clientes pelo e-mail
telefone: Filtra os clientes pelo número de telefone
GET /calcularRotaOtima
Este endpoint calcula a rota ótima com base nas coordenadas dos clientes cadastrados. Retorna a rota ótima como JSON.

