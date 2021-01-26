import * as React from 'react';
import jokeApi from '../util/api/jokeApi';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Jokes, { IJoke } from './Jokes/Jokes';
import { IJokeResponse } from './types/types';
import '../scss/styles.scss';

interface IAppProps {
  searchValue: string;
  category: string;
  dispatch: any;
}

const App: React.FC<IAppProps> = (props: IAppProps) => {
  const [jokes, setJokes] = React.useState<IJoke[]>([]);
  const [noJoke, setNoJokes] = React.useState<{ noJokes: boolean; message: string; causedBy: string }>({
    noJokes: false,
    message: '',
    causedBy: '',
  });

  React.useEffect(() => {
    jokeApi.getCategories().then((response) => {
      console.log('Category respone: ' + response.categories);
      const categories = response.categories;
      props.dispatch({ type: 'SET_INITIAL_CATEGORIES', payload: categories });
    });
    // This is componentDidMount.  Poor TS type passing for redux likely causes eslint to expect props to be a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const searchValue: string = props.searchValue;
    jokeApi
      .getJokes(props.category, searchValue)
      .then((response) => {
        const temporaryJokes: IJoke[] = [];

        if (response.jokes) {
          response.jokes.forEach((element: IJokeResponse) => {
            if (element.type === 'single') {
              temporaryJokes.push({ category: element.category, type: element.type, joke: element.joke as string });
            } else {
              temporaryJokes.push({
                category: element.category,
                type: element.type,
                joke: { setup: element.setup as string, delivery: element.delivery as string },
              });
            }
          });
          setNoJokes({ noJokes: false, message: '', causedBy: '' });
          setJokes(temporaryJokes as IJoke[]);
        } else {
          setNoJokes({ noJokes: true, message: response.message, causedBy: response.causedBy[0] });
        }
      })
      .catch((error) => console.log(error));
  }, [props.category, props.searchValue]);

  return (
    <div className="container-fluid">
      <Header />
      <Jokes jokes={jokes} noJoke={noJoke} />
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
