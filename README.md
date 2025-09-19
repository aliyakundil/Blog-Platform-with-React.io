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

# React Hook Form

npm install react-hook-form

# Создать новую ветку

git checkout -b bugfix/review_feedbacks

# Отправить ветку на удалённый репозиторий

git push -u origin bugfix/review_feedbacks

# Переключение между ветками

git checkout main # вернуться на main
git checkout bugfix/review_feedbacks # снова на созданную ветку

# Примеры названий веток

1. feature/

Для разработки новых функций.

Пример: feature/user-auth, feature/todo-list.

2. bugfix/ или fix/

Исправление багов.

Пример: bugfix/login-error, fix/profile-api.

3. hotfix/

Срочные исправления ошибок на продакшне.

Пример: hotfix/crash-on-start, hotfix/payment-bug.

4. chore/

Для технических задач, которые не меняют функционал.

Пример: обновление зависимостей, настройка CI/CD.

chore/update-dependencies, chore/lint-fix.

5. refactor/

Изменение кода без добавления новых функций, только улучшение структуры.

Пример: refactor/profile-component, refactor/api-service.

6. test/

Добавление или исправление тестов.

Пример: test/add-user-tests, test/fix-login-tests.

7. docs/

Изменение документации.

Пример: docs/readme-update, docs/api-docs.

8. style/

Изменения только в стиле кода (форматирование, отступы).

Пример: style/fix-indents, style/css-cleanup.

9. release/

Подготовка версии к релизу.

Пример: release/v1.2.0, release/v2.0.0-beta.
