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
    jokeApi.getJokes(props.category).then((response) => {
      console.log(response);
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
      console.log(temporaryJokes);
      setJokes(temporaryJokes);
    });
  }, [props.category]);

  return (
    <div className="container-fluid">
      <Header />
      <Jokes jokes={jokes} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { category: state.category };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
