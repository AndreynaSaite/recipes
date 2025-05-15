import './Header.scss';

interface HeaderProps {
  onAddClick: () => void;
}

export const Header = ({ onAddClick }: HeaderProps) => {
  return (
    <header className="header">
      <div className="logo">🍽 Мои рецепты</div>
      <button className="add-btn" onClick={onAddClick}>
        Добавить рецепт
      </button>
    </header>
  );
};
