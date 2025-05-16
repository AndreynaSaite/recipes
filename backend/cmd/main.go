package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/AndreynaSaite/recipes/backend/config"
	"github.com/AndreynaSaite/recipes/backend/db"
	"github.com/AndreynaSaite/recipes/backend/routers"
)

func main() {
	config.LoadConfig()
	fmt.Print("Starting backend service...")
	db.Connect()

	r := routers.SetupRouter()

	log.Println("Server started on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
