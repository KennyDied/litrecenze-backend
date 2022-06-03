# образ для development
FROM node:16.13.2-alpine AS development

# Создать директорию внутри контейнера
WORKDIR ./app

# Установить зависимости
COPY package*.json ./
RUN npm i -g @nestjs/cli
RUN npm install

# Скопировать приложение из текущей директории в WORKDIR-директорию
COPY . .

# Скомпилировать приложение
RUN npm run build