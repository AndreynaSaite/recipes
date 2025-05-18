import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import RecipeModal from './components/RecipeModal';
import { AuthProvider } from './context/AuthContext';
import { fetchRecipes } from './api/recipes';
import type { Recipe } from './interfaces/Recipe';
import { Footer } from './components/Footer';
import './styles/main.scss';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const load = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };
    load();
  }, []);

  const handleRecipeAdded = (newRecipe: Recipe) => {
    setRecipes(prev => [...prev, newRecipe]);
  };

  return (
    <AuthProvider>
      <div className="app-layout">
        <Header onAddClick={openModal} />
        <main className="app-main">
          <Home recipes={recipes} />
        </main>
        {showModal && (
          <RecipeModal onClose={closeModal} onRecipeAdded={handleRecipeAdded} />
        )}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
