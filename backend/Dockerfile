# --------------------------------------------------------------------------------
# Stage 1: Build Environment (Установка зависимостей)
FROM python:3.11-slim as builder

# Установка системных зависимостей, если они нужны для сборки пакетов
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Установка рабочей директории в контейнере
WORKDIR /app

# Копируем файл зависимостей
COPY backend/requirements.txt /app/

# Установка Python зависимостей
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# --------------------------------------------------------------------------------
# Stage 2: Final Image (Финальный образ для запуска)
FROM python:3.11-slim

# Установка рабочей директории
WORKDIR /app

# Создание непривилегированного пользователя
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app

# Копирование установленных зависимостей из этапа builder
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Копирование исходного кода проекта
# Копируем содержимое backend/ в /app
COPY backend/. /app/

# Предоставление доступа к порту
EXPOSE 8000

# Переключение на непривилегированного пользователя
USER appuser

# Команда для запуска сервера разработки Django
# Запуск на 0.0.0.0:8000 для доступа извне контейнера
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
