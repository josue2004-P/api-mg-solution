#!/bin/bash

# ===============================
# Función para imprimir un cuadro
# ===============================
print_big_box() {
  local lines=("$@")
  local max_len=0

  # Calcular la línea más larga
  for line in "${lines[@]}"; do
    [ ${#line} -gt $max_len ] && max_len=${#line}
  done

  local border=$(printf '─%.0s' $(seq 1 $((max_len+2))))

  echo "┌$border┐"
  for line in "${lines[@]}"; do
    printf "│ %-*s │\n" $max_len "$line"
  done
  echo "└$border┘"
}

# ===============================
# Inicio del script
# ===============================
messages=(
  "🚀 The container has started successfully"
  "⏳ Waiting for MySQL to be available at bd_mysql_mg..."
)

print_big_box "${messages[@]}"

until mysqladmin ping -h bd_mysql_mg -P 3306 --silent; do
  print_big_box "❌ MySQL is not available yet, waiting..."
  sleep 2
done

print_big_box "✅ MySQL is available. Running migrations..."
npx prisma migrate deploy

if [ "$NODE_ENV" = "development" ]; then
  print_big_box "🌱 Development environment detected. Running: npm run dev"
  exec npm run dev
else
  print_big_box "🏭 Production environment detected. Running: npm run start"
  exec npm run start
fi
