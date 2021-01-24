import * as React from 'react';
import jokeApi from '../util/api/jokeApi';

const App: React.FC<unknown> = () => {
  React.useEffect(() => {
    jokeApi.getJokes();
  }, []);

  return <div>Hello world</div>;
};

export default App;
