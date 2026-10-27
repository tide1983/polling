# RxJS Polling App (Обязательная задача)

Домашнее задание по теме "11. RxJS". Реализация виджета непрочитанных сообщений с использованием периодического опроса сервера (polling).

## 🚀 Демо (GitHub Pages)
[Открыть приложение](https://tide1983.github.io/polling/)

*(Примечание: для появления новых сообщений на GitHub Pages требуется запущенный сервер. Если сервер не запущен, приложение корректно обрабатывает ошибку и не ломается).*

## 🛠️ Стек технологий
*   JavaScript (ES6+)
*   RxJS (операторы `interval`, `switchMap`, `ajax`, `catchError`, `map`, `filter`)
*   Webpack
*   Babel

## ⚙️ Как запустить локально
1. Установите зависимости: `npm install`
2. Запустите фейковый сервер: `node server.js`
3. В другом терминале запустите клиент: `npm start`
4. Откройте `http://localhost:3000`

## 📦 Сборка
Статус автоматической сборки и деплоя на GitHub Pages:
[![Deploy to GitHub Pages](https://github.com/tide1983/polling/actions/workflows/deploy.yml/badge.svg)](https://github.com/tide1983/polling/actions/workflows/deploy.yml)
