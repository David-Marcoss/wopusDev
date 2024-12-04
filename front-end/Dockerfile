# Use a imagem oficial do Node.js como base
FROM node:18 AS builder

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install --force

# Copie o restante do código da aplicação para o contêiner
COPY . .

# Execute o build da aplicação
RUN npm run build

# Exponha a porta que o Next.js usará para rodar
EXPOSE 3000

COPY .env .env

# Defina o comando padrão para rodar o servidor Next.js
CMD ["npm", "start"]
