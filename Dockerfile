FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Instala netcat (nc) para esperar a la base de datos
RUN apt-get update && apt-get install -y default-mysql-client

COPY . .

RUN npx prisma generate

# Copia el script y dale permisos
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

# Usa el script como punto de entrada
CMD ["./entrypoint.sh"]
