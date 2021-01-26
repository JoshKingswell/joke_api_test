import * as React from 'react';
import JokeTile from './components/JokeTile';

export interface IJoke {
  category: string;
  type: string;
  joke: string | { setup: string; delivery: string };
}

interface IJokesProps {
  jokes: IJoke[];
  noJoke: { noJokes: boolean; message: string; causedBy: string };
}

const Jokes: React.FC<IJokesProps> = (props: IJokesProps) => {
  const renderJokes = () => {
    if (!props.noJoke.noJokes) {
      return props.jokes.map((joke, index) => {
        return <JokeTile key={index} category={joke.category} type={joke.type} body={joke.joke} />;
      });
    } else {
      return (
        <div className="flex-column jokes-container--error-message">
          <h3>{props.noJoke.message}</h3>
          <h4>{props.noJoke.causedBy}</h4>
        </div>
      );
    }
  };
  return <div className="jokes-container flex-column">{renderJokes()}</div>;
};

export default Jokes;
