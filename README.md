# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# если используешь npm

npm install react-markdown

# Устанавливаем ESLint 8.32 (без Flat Config) и Airbnb

npm install --save-dev eslint@8.32.0 --legacy-peer-deps
npm install --save-dev eslint-config-airbnb eslint-plugin-import@^2.26.0 eslint-plugin-jsx-a11y@^6.7.1 eslint-plugin-react@^7.33.2 eslint-plugin-react-hooks@^4.6.0 --legacy-peer-deps

# Устанавливаем Prettier

npm install --save-dev prettier --legacy-peer-deps

# Проверка ESLint

npm run lint

# Автоисправление ESLint

npm run lint:fix

# Форматирование Prettier

npm run format
