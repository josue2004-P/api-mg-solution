#!/bin/bash
echo "🚀 The container has started successfully"
echo "⏳ Waiting for MySQL to be available at bd_mysql_mvp..."

until mysqladmin ping -h bd_mysql_mvp -P 3306 --silent; do
  echo "❌ MySQL is not available yet, waiting..."
  sleep 2
done

echo "✅ MySQL is available. Running migrations..."
npx prisma migrate deploy

# Check environment and run the correct command
if [ "$NODE_ENV" = "development" ]; then
  echo "🌱 Development environment detected. Running: npm run dev"
  exec npm run dev
else
  echo "🏭 Production environment detected. Running: npm run start"
  exec npm run start
fi
