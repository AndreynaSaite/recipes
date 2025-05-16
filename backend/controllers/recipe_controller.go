package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/AndreynaSaite/recipes/backend/db"
	"github.com/AndreynaSaite/recipes/backend/models"
	"github.com/lib/pq"
)

func GetRecipes(w http.ResponseWriter, r *http.Request) {
	rows, err := db.DB.Query("SELECT id, title, description, image, category, cuisine, ingredients FROM recipes")
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer rows.Close()

	var recipes []models.Recipe
	for rows.Next() {
		var rec models.Recipe
		var image, category, cuisine *string
		var ingredients pq.StringArray

		err := rows.Scan(&rec.ID, &rec.Title, &rec.Description, &image, &category, &cuisine, &ingredients)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		rec.Image = image
		rec.Category = category
		rec.Cuisine = cuisine
		rec.Ingredients = []string(ingredients)

		recipes = append(recipes, rec)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(recipes)
}

func CreateRecipe(w http.ResponseWriter, r *http.Request) {
	var rec models.Recipe
	if err := json.NewDecoder(r.Body).Decode(&rec); err != nil {
		http.Error(w, "Invalid request", 400)
		return
	}

	err := db.DB.QueryRow(
		`INSERT INTO recipes (title, description, image, category, cuisine, ingredients) 
		 VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
		rec.Title,
		rec.Description,
		rec.Image,
		rec.Category,
		rec.Cuisine,
		pq.Array(rec.Ingredients),
	).Scan(&rec.ID)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rec)
}
