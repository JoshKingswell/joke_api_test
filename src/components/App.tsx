import * as React from 'react';
import { getJokes } from '../util/api/jokeApi';

const App: React.FC<unknown> = () => {
  React.useEffect(() => {
    getJokes();
  }, []);

  return <div>Hello world</div>;
};

export default App;
