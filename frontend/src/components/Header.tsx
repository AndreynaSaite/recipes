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
    <header className="header">
      <div className="logo">🍽 Мои рецепты</div>
      
      <div className="header-actions">
        {isAuthenticated && user?.name && (
           <>
            <div className="user-greeting">
              <span className="welcome">Привет, </span>
              <span className="user-name">{user.name}</span>
            </div>
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