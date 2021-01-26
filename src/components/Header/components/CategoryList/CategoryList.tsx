import * as React from 'react';
import Checkbox from '../../../common/Checkbox';
import { connect } from 'react-redux';

interface ICategoryListProps {
  category: string;
  categories: string[];
  dispatch: ({ type, payload }: { type: string; payload: string }) => void;
}

const CategoryList: React.FC<ICategoryListProps> = (props: ICategoryListProps) => {
  return (
    <div className="category-list flex-row">
      {props.categories.map((element, index) => {
        return (
          <Checkbox
            key={index}
            checked={element === props.category}
            category={element}
            onChange={() => props.dispatch({ type: 'SET_CATEGORY', payload: element })}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { categories: state.categories, category: state.category };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
