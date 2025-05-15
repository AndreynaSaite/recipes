package db

import (
    "database/sql"
    "fmt"
    _ "github.com/lib/pq"
    "log"
)

var DB *sql.DB

func Connect() {
    connStr := "user=postgres password=postgres dbname=hackaton sslmode=disable"
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal(err)
    }
    if err := db.Ping(); err != nil {
        log.Fatal(err)
    }
    DB = db
    fmt.Println("Database connected")
}
