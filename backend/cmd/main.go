package main

import (
	"log"
	"net/http"

	"github.com/AndreynaSaite/recipes/config"
	"github.com/AndreynaSaite/recipes/db"
	"github.com/AndreynaSaite/recipes/routes" 
)

func main() {
	config.LoadConfig()
	db.Connect() 
	r := routes.SetupRouter()
	log.Println("Server started on :8080")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		log.Fatal(err)
	}
}
