package models

type Recipe struct {
	ID          int      `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Image       *string  `json:"image,omitempty"`
	Category    *string  `json:"category,omitempty"`
	Cuisine     *string  `json:"cuisine,omitempty"`
	Ingredients []string `json:"ingredients"`
	Recipet     string   `json:"Recipet"`
}
