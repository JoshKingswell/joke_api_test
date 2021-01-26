import * as React from 'react';
import RingLoader from 'react-spinners/RingLoader';
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
  const [initialLoadDone, setInitialLoadDone] = React.useState<boolean>(false);
  const [jokes, setJokes] = React.useState<IJoke[]>([]);
  const [noJoke, setNoJokes] = React.useState<{ noJokes: boolean; message: string; causedBy: string }>({
    noJokes: false,
    message: '',
    causedBy: '',
  });

  React.useEffect(() => {
    const getCategories = async () => {
      await jokeApi
        .getCategories()
        .then((response) => {
          const categories = response.categories;
          props.dispatch({ type: 'SET_INITIAL_CATEGORIES', payload: categories });
          setInitialLoadDone(true);
        })
        .catch((error) => console.log(error));
    };
    getCategories();
    // This is componentDidMount.  Poor TS type passing for redux likely causes eslint to expect props to be a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const searchValue: string = props.searchValue;
    const getJokes = async () => {
      await jokeApi
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
    };
    getJokes();
  }, [props.category, props.searchValue]);

  const render = (): JSX.Element => {
    if (initialLoadDone) {
      return (
        <>
          <Header />
          <Jokes jokes={jokes} noJoke={noJoke} />
        </>
      );
    } else {
      return (
        <div className="loading-spinner">
          <RingLoader loading={true} />
        </div>
      );
    }
  };

  return <div className="container-fluid">{render()}</div>;
};

const mapStateToProps = (state) => {
  return { category: state.category, searchValue: state.searchValue };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
