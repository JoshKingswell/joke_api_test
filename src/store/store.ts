import { createStore } from 'redux';

const initialState = {
  categories: [],
  category: 'Any',
};

const reducer = (state = initialState, action: { type: string; payload: any }) => {
  if (action.type === 'SET_INITIAL_CATEGORIES') {
    return Object.assign({}, state, {
      categories: state.categories.concat(action.payload),
    });
  }
  if (action.type === 'SET_CATEGORY') {
    console.log(action.payload);
    return Object.assign({}, state, {
      category: action.payload,
    });
  }
  return state;
};

const store = createStore(reducer);

export default store;
