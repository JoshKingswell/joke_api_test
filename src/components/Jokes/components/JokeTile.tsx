import * as React from 'react';

interface IJokeTileProps {
  type: string;
  category: string;
  body: string | { delivery: string; setup: string };
}

const JokeTile: React.FC<IJokeTileProps> = (props: IJokeTileProps) => {
  const returnJokeBody = () => {
    if (typeof props.body === 'string') {
      return <p>{props.body}</p>;
    } else {
      return (
        <div className="flex-column">
          <p>{props.body.setup}</p>
          <p>{props.body.delivery}</p>
        </div>
      );
    }
  };

  return (
    <div className="joke-tile flex-column">
      <div className="joke-tile--header flex-row">
        <h3>{props.category}</h3>
        <h3>{props.type}</h3>
      </div>
      <div className="joke-tile--content">{returnJokeBody()}</div>
    </div>
  );
};

export default JokeTile;
