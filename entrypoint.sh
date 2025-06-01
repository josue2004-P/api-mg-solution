#!/bin/bash

echo "⏳ Esperando a que MySQL esté disponible en db_bp..."
until mysqladmin ping -h db_bp -P 3306 --silent; do
  echo "❌ MySQL no disponible aún, esperando..."
  sleep 2
done

echo "✅ MySQL disponible. Ejecutando migraciones..."
npx prisma migrate deploy

echo "🚀 Iniciando la aplicación..."
exec node src/index.js
