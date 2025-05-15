# Этап сборки
FROM node:20 AS build

# Установка рабочей директории
WORKDIR /app

# Копирование зависимостей
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование всех файлов проекта
COPY . .

# Сборка фронтенда
RUN npm run build

# Этап запуска
FROM nginx:stable-alpine

# Удаление стандартной страницы Nginx
RUN rm -rf /usr/share/nginx/html/*

# Копирование собранного фронтенда в Nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
