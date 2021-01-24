import * as React from 'react';
import CategoryList from './components/CategoryList/CategoryList';
import SearchBar from './components/SearchBar';

const Header = (props) => {
  return (
    <div>
      <SearchBar />
      <CategoryList />;
    </div>
  );
};

export default Header;
