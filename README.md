## Consultar Veiculos Frontend
- Este projeto é o frontend de um sistema de reconhecimento de placas de veículos, consumindo uma API em Python. Ele permite que os usuários consultem, adicionem veículos e façam login utilizando uma interface construída com React e Vite. O design é estilizado com Tailwind CSS, e a autenticação é gerenciada com JWT.
- Deploy do projeto para teste: https://vehicle-consultation.vercel.app

## Funcionalidades
- Consulta de Placas: Permite aos usuários buscar veículos cadastrados no sistema.
- Adicionar Veículos: Oferece um formulário para o cadastro de novos veículos.
- Autenticação de Usuários: Login de usuários utilizando JWT, com decodificação do token para gestão de sessão.
- Responsividade: A interface foi projetada para ser responsiva, adaptando-se bem a diferentes dispositivos.
  
## Tecnologias e Bibliotecas
- React + Vite: Framework e ambiente de desenvolvimento para a criação da interface de usuário.
- Tailwind CSS: Framework CSS utilitário para a estilização.
- React Router DOM: Gerenciamento de rotas na aplicação React.
- JWT Decode: Decodifica tokens JWT para autenticação e autorização.
  
##Estrutura do Projeto
- A estrutura do projeto segue o padrão do React, com algumas modificações na pasta src:
````
├── src/
│   ├── styles/              # Arquivos de estilização com Tailwind CSS
│   ├── services/            # Serviços para consumo da API
│   ├── pages/               # Páginas da aplicação (Login, Home, etc.)
│   ├── components/          # Componentes reutilizáveis
│   ├── assets/              # Imagens e outros assets estáticos
│   ├── main.jsx             # Arquivo principal de inicialização do React
│   ├── app.jsx              # Arquivo principal de inicialização do app
│   ├── router               # Arquivo principal de que trata as rotas
├── index.html               # Arquivo HTML principal
````

## Instalação e Execução
- Pré-requisitos
1 - Node.js (versão 14 ou superior)
2 - Gerenciador de pacotes npm ou yarn
  
## Passos
- Clone o repositório:
````
git clone https://github.com/albertverso/Vehicle_Consultation.git
cd Vehicle_Consultation
````
## Instale as dependências:
````
npm install
````
## Configurações de Ambiente: Crie um arquivo .env na raiz do projeto com as variáveis necessárias, como a URL da API:
````
VITE_API=https:(https://github.com/albertverso/API_Gemini_IA_Recognition)
````
## Execute o servidor de desenvolvimento:
````
npm run dev
````
- Acesse a aplicação: A aplicação estará disponível em http://localhost:5173.

## Rotas da Aplicação
- /login: Página de login do usuário adm.
- /home: Página inicial, onde o usuário pode consultar placas de veículos.
- /Vehicle: Formulário para adicionar novos veículos ao sistema.

## Contribuição
- Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
