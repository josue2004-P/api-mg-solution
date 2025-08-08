#!/bin/bash

echo "⏳ Esperando a que MySQL esté disponible en bd_mysql_mvp..."
until mysqladmin ping -h bd_mysql_mvp -P 3306 --silent; do
  echo "❌ MySQL no disponible aún, esperando..."
  sleep 2
done

echo "✅ MySQL disponible. Ejecutando migraciones..."
npx prisma migrate deploy

echo "🚀 Iniciando la aplicación..."
exec npm run dev