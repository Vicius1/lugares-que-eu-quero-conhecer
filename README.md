#  Lugares que eu quero conhecer
   Esse projeto consiste em um sistema que permita o CRUD de lugares para se conhecer ao redor do mundo. 

## Funcionalidades
- Adicionar um novo lugar com país, local e meta (mês/ano).
- Editar o local e a meta de um card existente.
- Excluir um card.
- Listagem dos lugares adicionados, exibindo a bandeira do país e os dados informados.

## Tecnologias Utilizadas
- **React** com **TypeScript**
- **React Hooks**
- **react-input-mask** para formatação do campo de data
- **Rest Countries API** para obter a lista de países e suas bandeiras
- **json-server** para simular uma API REST e persistência dos dados
- **Jest** e **Testing Library** para testes automatizados
- **concurrently** para maior praticidade na hora de executar o projeto

## Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/Vicius1/lugares-que-eu-quero-conhecer.git
cd lugares-que-eu-quero-conhecer
```
### 2. Instalar Dependências
```bash
npm install
````
### 3. Rodar o Projeto
#### Rodando tudo com um único comando
O projeto utiliza `json-server` para simular uma API REST. Para facilitar a execução do frontend e do backend ao mesmo tempo, foi configurado um script no `package.json` que usa `concurrently`.
Para iniciar tudo com um único comando, basta rodar:
```bash
npm run dev
```
Esse comando executará simultaneamente:
- O json-server na porta 5000.
- O React na porta 3000.
#### Rodando os serviços separadamente
Caso prefira iniciar os serviços manualmente, abra dois terminais e execute:
Terminal 1: Iniciar o servidor JSON

```bash
npm run server  
```
Terminal 2: Iniciar o frontend

```bash
npm start
```
*Independentemente da forma escolhida para rodar o projeto:*
- A aplicação estará disponível em http://localhost:3000/.
- Os dados cadastrados podem ser acessados em formato JSON em http://localhost:5000/places.
