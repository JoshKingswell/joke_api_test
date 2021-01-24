import * as React from 'react';
import { connect } from 'react-redux';

const SearchBar = (props) => {
  return (
    <label>
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
