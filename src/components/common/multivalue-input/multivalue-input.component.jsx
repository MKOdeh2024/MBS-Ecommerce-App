import { useState } from 'react';
import Input from '../input/input.component';
import './multivalue-input.css';

/**
 * Renders an input component and a list of values.
 * @param {{
 *  label?: string;
 *  value: string[];
 *  onChange: (value: string[]) => void;
 * }} props 
 */
const MultivalueInput = props => {
  const [newItemValue, setNewItemValue] = useState('');

  const addItem = () => {
    if (newItemValue.trim().length > 0 && !props.value.includes(newItemValue)) {
      const valueAfterAddition = [...props.value, newItemValue];
      props.onChange(valueAfterAddition);
      setNewItemValue('');
    }
  };

  return (
    <div className="multivalueInputWrapper">
      <div className="controls">
        <Input
          label={props.label}
          value={newItemValue}
          onChange={e => setNewItemValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              // e.stopPropagation();
              e.preventDefault();
              addItem();
            }
          }}
        />
        <button
          className="nemo-button"
          type="button"
          onClick={addItem}
        >
          Add
        </button>
      </div>
      {
        props.value.length > 0 && (
          <ul>
            {props.value.map(item => {
              return (
                <li key={item} >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const valueAfterRemoval = props.value.filter(element => element !== item);
                      props.onChange(valueAfterRemoval);
                    }}
                  >&times;</button>
                </li>
              );
            })}
          </ul>
        )
      }
    </div>
  );
};

export default MultivalueInput;