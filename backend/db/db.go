package db

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/AndreynaSaite/recipes/backend/config"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func Connect() {
	cfg := config.LoadConfig()

	connStr := fmt.Sprintf(
		"user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		cfg.DBUser,
		cfg.DBPassword,
		cfg.DBName,
		cfg.DBHost,
		cfg.DBPort,
	)
	log.Printf("DB Config: host=%s port=%s user=%s password=%s dbname=%s\n",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName)

	log.Println(connStr)
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
