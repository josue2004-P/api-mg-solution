FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Instala cliente mysql (netcat no es necesario para mysql ping)
RUN apt-get update && apt-get install -y default-mysql-client

COPY . .

RUN npx prisma generate

# Copia el script y dale permisos
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "/app/entrypoint.sh"]
