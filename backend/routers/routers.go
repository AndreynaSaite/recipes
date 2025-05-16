package routers

import (
	"net/http"

	"github.com/AndreynaSaite/recipes/backend/controllers"
	"github.com/gorilla/mux"
)

func SetupRouter() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/recipes", controllers.GetRecipes).Methods("GET")
	r.HandleFunc("/recipes", controllers.CreateRecipe).Methods("POST")

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("../frontend/dist/")))

	return r
}
