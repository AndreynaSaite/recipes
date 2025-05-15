FROM golang:1.24

WORKDIR /app

# Копируем go.mod и go.sum для загрузки зависимостей
COPY go.mod go.sum ./
RUN go mod download

# Копируем всё содержимое проекта
COPY . .

# Собираем бинарник из cmd/main.go
RUN go build -o server ./cmd/main.go

EXPOSE 8080

CMD ["./server"]
