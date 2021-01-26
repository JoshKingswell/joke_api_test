import * as React from 'react';
import CategoryList from './components/CategoryList/CategoryList';
import SearchBar from './components/SearchBar';

const Header: React.FC<unknown> = () => {
  return (
    <div className="flex-row header-container">
      <SearchBar />
      <CategoryList />
    </div>
  );
};

export default Header;
