import * as React from 'react';
import JokeTile from './components/JokeTile';

interface IJoke {
  category: string;
  type: string;
  joke: string | { setup: string; delivery: string };
}

interface IJokesProps {
  jokes: IJoke[];
}

const Jokes: React.FC<IJokesProps> = (props: IJokesProps) => {
  const renderJokes = () => {
    console.log('Rendering jokes');
    console.log(props.jokes);
    return props.jokes.map((joke, index) => {
      return <JokeTile key={index} category={joke.category} type={joke.type} body={joke.joke} />;
    });
  };
  return <div className="jokes-container flex-column">{renderJokes()}</div>;
};

export default Jokes;
