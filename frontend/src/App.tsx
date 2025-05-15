import { useState } from 'react';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { RecipeModal } from './components/RecipeModal';
import './styles/main.scss';

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Header onAddClick={openModal} />
      <button className="floating-add" onClick={openModal}>+</button>
      <Home />
      {showModal && <RecipeModal onClose={closeModal} />}
    </>
  );
}

export default App;
