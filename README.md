# SoundCircle — Frontend

Aplicação React para o SoundCircle, uma rede social de descoberta e avaliação musical.

**Deploy:** http://100.48.20.219/

---

## Stack

- **React 19**
- **React Router 6**
- **Axios** (comunicação com API)
- **Create React App 5.0.1**

---

## Pré-requisitos

- Node.js 18+ (recomendado 20+)
- npm ou yarn
- Backend do SoundCircle rodando em `http://100.48.20.219/`

---

## Instalação

```bash
cd client
npm install
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `client/`:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

Se não definida, o fallback é `http://localhost:5000`.

---

## Scripts Disponíveis

No diretório `client/`, você pode executar:

### `npm start`

Roda a aplicação em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

A página recarrega automaticamente quando você faz alterações.\
Você também verá erros de lint no console.

### `npm test`

Inicia o executor de testes em modo interativo (watch mode).\
Veja a seção sobre [execução de testes](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build`

Gera a versão de produção na pasta `build`.\
Empacota corretamente o React em modo de produção e otimiza o build para o melhor desempenho.

O build é minificado e os nomes dos arquivos incluem os hashes.\
Sua aplicação está pronta para ser implantada!

Veja a seção sobre [implantação](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

### `npm run eject`

**Atenção: esta é uma operação sem volta. Uma vez que você executa `eject`, não pode voltar atrás!**

Se você não estiver satisfeito com as escolhas de ferramentas e configuração do build, pode executar `eject` a qualquer momento. Este comando removerá a única dependência de build do seu projeto.

Em vez disso, ele copiará todos os arquivos de configuração e as dependências transitivas (webpack, Babel, ESLint, etc.) diretamente para o seu projeto, para que você tenha controle total sobre elas. Todos os comandos, exceto `eject`, continuarão funcionando, mas apontarão para os scripts copiados, para que você possa ajustá-los. A partir deste ponto, você estará por sua conta.

Você não precisa usar `eject`. O conjunto de recursos selecionados é adequado para implantações pequenas e médias, e você não deve se sentir obrigado a usar este recurso. No entanto, entendemos que esta ferramenta não seria útil se você não pudesse customizá-la quando estiver pronto para isso.

---

## Estrutura de Diretórios

```
client/
├── public/
├── src/
│   ├── api/                   # Configuração e chamadas de API
│   │   ├── axiosConfig.js     # Instância Axios (baseURL, cookies, interceptor 401)
│   │   ├── authApi.js         # Autenticação
│   │   ├── feedApi.js         # Feed, ratings, comentários, sentimento
│   │   ├── friendsApi.js      # Amizades
│   │   └── userApi.js         # Perfil e músicas avaliadas
│   ├── components/            # Componentes reutilizáveis
│   │   ├── common/
│   │   │   └── Logo.jsx       # SVG do logo
│   │   ├── layout/
│   │   │   ├── Navbar.jsx     # Barra de navegação
│   │   │   └── ProtectedRoute.jsx  # Guarda de rotas protegidas
│   │   ├── FeedView.js        # Container de lista de músicas
│   │   ├── MusicCard.jsx      # Card de música completo
│   │   ├── PromoteModal.jsx   # Modal de impulsionamento
│   │   └── StarRating.jsx     # Componente de 5 estrelas
│   ├── context/
│   │   └── AuthContext.jsx    # Contexto global de autenticação
│   ├── pages/                 # Páginas da aplicação
│   │   ├── Feed.js            # Feed principal (diário/semanal/mensal)
│   │   ├── LoginPage.jsx      # Tela de login
│   │   ├── RegisterPage.jsx   # Tela de cadastro
│   │   ├── ProfilePage.jsx    # Perfil do usuário
│   │   ├── RatedTracksPage.jsx # Músicas avaliadas
│   │   ├── FriendsPage.jsx    # Gerenciamento de amigos
│   │   └── FriendFeedPage.jsx # Avaliações de um amigo
│   ├── App.js                 # Rotas e providers
│   ├── index.css              # Estilos globais
│   └── index.js               # Entry point
├── package.json
└── README.md
```

---

## Rotas

| Rota | Protegida | Descrição |
|------|-----------|-----------|
| `/login` | Não | Tela de login |
| `/register` | Não | Tela de cadastro |
| `/` | **Sim** | Feed principal com busca e filtros |
| `/profile` | **Sim** | Perfil e edição de nome |
| `/avaliadas` | **Sim** | Suas avaliações |
| `/amigos` | **Sim** | Gerenciar amizades |
| `/amigos/:friendId/avaliacoes` | **Sim** | Ver avaliações de um amigo |

---

## Autenticação

- Sessão gerenciada via **cookie HttpOnly** entregue pelo backend.
- O frontend **não manipula tokens JWT** diretamente.
- Interceptor Axios: em qualquer resposta **401**, redireciona para `/login`.
- `AuthContext` restaura a sessão ao montar a aplicação (`GET /api/auth/me`).
- `ProtectedRoute` bloqueia acesso a rotas protegidas enquanto não autenticado.

---

## Testes

```bash
# Rodar todos os testes (modo CI)
npm test -- --watchAll=false

# Rodar em modo interativo
npm test
```

---

## Decisões de Design

- **Estilização 100% inline** (objetos `style`) — sem CSS Modules, Tailwind ou bibliotecas de UI externas.
- **React 19** — versão mais recente do React.
- **Sem testes E2E** configurados — apenas testes de unidade com React Testing Library.
