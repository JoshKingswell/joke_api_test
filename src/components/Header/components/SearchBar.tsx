import * as React from 'react';
import { connect } from 'react-redux';

interface ISearchBarProps {
  searchValue: string;
  dispatch: ({ type, payload }: { type: string; payload: any }) => void;
}

const SearchBar: React.FC<ISearchBarProps> = (props: ISearchBarProps) => {
  return (
    <label className="searchbar">
      Search{' '}
      <input
        type="text"
        value={props.searchValue}
        onChange={(event) => {
          props.dispatch({ type: 'SET_SEARCH_VALUE', payload: event.target.value });
        }}
      />
    </label>
  );
};

const mapStateToProps = (state) => {
  return { searchValue: state.searchValue };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
