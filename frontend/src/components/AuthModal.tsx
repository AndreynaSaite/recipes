import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.scss'; // Стили для модального окна

export const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // true - вход, false - регистрация
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      onClose(); // Закрываем модальное окно после успешной авторизации
    } catch (err) {
      setError('Ошибка авторизации. Проверьте данные.');
      console.error(err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
        <input
  type="text"
  placeholder="Ваше имя"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
  minLength={2}
  maxLength={30}
  pattern="[A-Za-zА-Яа-яЁё\s]+"
  title="Имя может содержать только буквы и пробелы"
  className="auth-input" // Общий класс для стилизации
/>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button type="submit" className="submit-btn">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="switch-btn"
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>

        <button onClick={onClose} className="close-btn">
          Закрыть
        </button>
      </div>
    </div>
  );
};