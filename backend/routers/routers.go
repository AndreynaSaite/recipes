package routers

import (
	"net/http"

	"github.com/AndreynaSaite/recipes/backend/controllers"
	"github.com/gorilla/mux"
)

func withCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Разрешаем запросы с фронта
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		h.ServeHTTP(w, r)
	})
}

func SetupRouter() http.Handler {
	r := mux.NewRouter()

	r.HandleFunc("/recipes", controllers.GetRecipes).Methods("GET")
	r.HandleFunc("/recipes", controllers.CreateRecipe).Methods("POST")

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("../frontend/dist/")))

	return withCORS(r)
}
