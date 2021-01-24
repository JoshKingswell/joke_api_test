import * as React from 'react';

interface ICheckBoxProps {
  checked: boolean;
  category: string;
  onChange: (category: string) => void;
}

const Checkbox: React.FC<ICheckBoxProps> = (props: ICheckBoxProps) => {
  return (
    <label>
      {props.category}
      <input type="checkbox" checked={props.checked} onChange={() => props.onChange(props.category)} />
    </label>
  );
};

export default Checkbox;
