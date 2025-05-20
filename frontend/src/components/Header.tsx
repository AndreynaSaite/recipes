import './Header.scss';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal'; // Импортируем модальное окно

interface HeaderProps {
  onAddClick: () => void;
}

export const Header = ({ onAddClick }: HeaderProps) => {
  const {  user, isAuthenticated, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setShowAuthModal(true); // Показываем модальное окно
    }
  };

  return (
    <header className="headerD">
      <div className="logo"></div>
      <div className="Name">Персональная кулинарная книга рецептов</div>
      <div className="header-actions">
        {isAuthenticated && user?.name && (
           <>
           <button className="add-btn" onClick={onAddClick}>
             Добавить рецепт
           </button>
         </>
        )}
        
        <button 
          className={`auth-btn ${isAuthenticated ? 'logged-in' : ''}`}
          onClick={handleAuthClick}
        >
          {isAuthenticated ? 'Выйти' : 'Войти'}
        </button>
      </div>

      {/* Модальное окно авторизации */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </header>
  );
};