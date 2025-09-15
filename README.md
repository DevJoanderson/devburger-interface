# DevBurger Interface (Frontend)

Interface web do **DevBurger** desenvolvida em **React + Vite**, com **React Router**, **Styled-Components**, **React Hook Form + Yup**, **Axios** e **React-Toastify**. Integra com o backend DevBurger (Express/Sequelize/Stripe).

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&labelColor=20232a" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&labelColor=20232a" />
  <img alt="Styled Components" src="https://img.shields.io/badge/Styled--Components-5-DB7093?logo=styledcomponents&labelColor=20232a" />
  <img alt="React Router" src="https://img.shields.io/badge/Router-6-CA4245?logo=reactrouter&labelColor=20232a" />
  <img alt="Hook Form" src="https://img.shields.io/badge/Hook%20Form-^7-EC5990?labelColor=20232a" />
  <img alt="Yup" src="https://img.shields.io/badge/Yup-Validation-2E7D32?labelColor=20232a" />
  <img alt="Axios" src="https://img.shields.io/badge/Axios-HTTP-5A29E4?labelColor=20232a" />
  <img alt="Toastify" src="https://img.shields.io/badge/Toastify-UI%20Feedback-FF9100?labelColor=20232a" />
</p>

---

## ✨ Funcionalidades

* Autenticação: **Login** e **Cadastro** com validação e feedbacks
* Fluxo do cliente: **Home**, **Cardápio**, **Carrinho**, **Checkout** e **Confirmação de pagamento**
* Painel Admin: **Pedidos**, **Produtos** (CRUD), **Novo Produto**, **Editar Produto**, **Ver Produto**
* Integração com **Stripe** (checkout/pagamento)
* Upload e exibição de **imagens** de produtos
* **Contexts** para estado global (usuário e carrinho)
* **Proteção de rotas** por layout/admin
* **Formatadores** de preço/data e mensagens via toast
* **Responsivo** pensado para notebook/desktop e ajustes mobile

---

## 🗺️ Rotas principais

### Público

* `/` → Home
* `/cardapio` → Menu
* `/carrinho` → Cart
* `/checkout` → Checkout
* `/complete` → CompletePayment
* `/login` → Login
* `/cadastro` → Register

### Admin

* `/admin` → Orders
* `/admin/produtos` → Products
* `/admin/novo-produto` → NewProduct
* `/admin/editar-produto` → EditProduct
* `/admin/ver-produto` → ViewProduct

**Proteção de rota (exemplo):**

```jsx
// dentro do AdminLayout
if (!user || !user.isAdmin) return <Navigate to="/login" replace />;
return <Outlet />;
```

---

## 📦 Requisitos

* Node.js 18+
* Yarn ou npm
* Backend DevBurger em execução (URL da API)

---

## ⚙️ Variáveis de ambiente

Arquivo `.env` (use o prefixo `VITE_`):

```env
# Backend DevBurger
VITE_API_BASE_URL=http://localhost:3001

# Stripe (se o front inicializa os elementos)
VITE_STRIPE_PUBLIC_KEY=

# Outras chaves que seu app utiliza
# VITE_APP_NAME=DevBurger
```

Arquivo `src/services/api.js` (exemplo de Axios base):

```js
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export function attachToken(token) {
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
}
```

---

## 🚀 Como rodar localmente

```bash
git clone <URL_DO_REPO_FRONT>
cd devburger-interface

yarn
# ou npm i

cp .env.example .env
# Edite VITE_API_BASE_URL e VITE_STRIPE_PUBLIC_KEY

# Desenvolvimento
yarn dev

# Build de produção
yarn build

# Preview do build
yarn preview
```

**Com o backend**

* Inicie a API em `http://localhost:3001`
* Garanta CORS habilitado no backend
* Faça login/cadastro no front para obter o token e persistir no contexto

---

## 🗂️ Estrutura de pastas

```
src/
  assets/
  components/
  containers/
    Home/
    Menu/
    Cart/
    Checkout/
    CompletePayment/
    Admin/
      Orders/
      Products/
      NewProduct/
      EditProduct/
      ViewProduct/
  layouts/
    UserLayouts/
    AdminLayout/
  hooks/
    UserContext.jsx
    CartContext.jsx
  routes/
    index.jsx
  services/
    api.js
  styles/
    globalStyles.js
  utils/
    formatPrice.js
    formatDate.js
main.jsx
index.html
```

**Contexts (resumo):**

* `UserContext` — guarda `user`, `token`, funções de login/logout
* `CartContext` — itens, totais, adicionar/remover, limpar carrinho

---

## 🔗 Integração com a API

* Autenticação: `POST /users`, `POST /session`
* Produtos: `GET /products`, `POST /products`, `PUT /products/:id`
* Categorias: `GET /categories`
* Pedidos: `GET /orders`, `POST /orders`
* Stripe: `POST /create-payment-intent`

**Fluxo de checkout (alto nível):**

1. Usuário revisa carrinho → vai para `/checkout`
2. Front solicita `create-payment-intent` no backend com total calculado (ou itens)
3. Stripe Elements confirma o pagamento
4. Backend atualiza pedido e front redireciona para `/complete`

---

## ✅ Formulários e validação

* **React Hook Form + Yup** nos formulários (login/cadastro/CRUD produtos)
* Erros por campo e toasts de sucesso/erro
* Máscaras/formatadores via `utils/formatPrice` e `utils/formatDate`

---

## 🧰 Qualidade

* **Styled-Components** para estilos e `globalStyles`
* **React Toastify** para notificações
* **Phosphor Icons** para ícones
* ESLint/Prettier ou Biome (opcional) para padronização

---

## 🧪 Testes

* **Vitest + React Testing Library** sugeridos para componentes críticos (Cart, Checkout)
* Testes de integração simulando contexto e rotas

---

## 🖼️ Screenshots / GIFs

* Fluxo recomendado: Home → Cardápio → Carrinho → Checkout → Sucesso
* Também adicione imagens do painel Admin

---

## 💬 Contribuição

Sinta-se à vontade para contribuir com melhorias, abrir issue ou enviar pull requests.

---

## 📄 Licença

Projeto com fins educacionais — por **DevBurger** 🍔
