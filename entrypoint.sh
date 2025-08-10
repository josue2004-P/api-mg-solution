#!/bin/bash
echo "🚀 El contenedor se ha iniciado correctamente"
echo "⏳ Esperando a que MySQL esté disponible en bd_mysql_mvp..."

until mysqladmin ping -h bd_mysql_mvp -P 3306 --silent; do
  echo "❌ MySQL no disponible aún, esperando..."
  sleep 2
done

echo "✅ MySQL disponible. Ejecutando migraciones..."
npx prisma migrate deploy

# Verifica entorno y ejecuta el comando correcto
if [ "$NODE_ENV" = "development" ]; then
  echo "🌱 Entorno de desarrollo detectado. Ejecutando: npm run dev"
  exec npm run dev
else
  echo "🏭 Entorno de producción detectado. Ejecutando: npm run start"
  exec npm run start
fi