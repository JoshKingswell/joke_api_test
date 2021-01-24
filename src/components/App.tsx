import * as React from 'react';
import jokeApi from '../util/api/jokeApi';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Jokes from './Jokes/Jokes';

const App: React.FC<unknown> = (props) => {
  const [jokes, setJokes] = React.useState([]);

  React.useEffect(() => {
    jokeApi.getCategories().then((response) => {
      console.log('Category respone: ' + response.categories);
      const categories = response.categories;
      props.dispatch({ type: 'SET_INITIAL_CATEGORIES', payload: categories });
    });
  }, []);

  React.useEffect(() => {
    const searchValue = props.searchValue;
    jokeApi.getJokes(props.category, searchValue).then((response) => {
      const temporaryJokes = [];

      response.jokes.forEach((element) => {
        console.log(element);
        if (element.type === 'single') {
          temporaryJokes.push({ category: element.category, type: element.type, joke: element.joke });
        } else {
          temporaryJokes.push({
            category: element.category,
            type: element.type,
            joke: { setup: element.setup, delivery: element.delivery },
          });
        }
      });
      setJokes(temporaryJokes);
    });
  }, [props.category, props.searchValue]);

  return (
    <div className="container-fluid">
      <Header />
      <Jokes jokes={jokes} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { category: state.category, searchValue: state.searchValue };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
