import React, {  useContext } from 'react';
import { CATEGORIES } from '../../../data/constants';
import { UserContext } from '../../providers/user-provider.component';
import './form.css';

import Input from '../../common/input/input.component';
import MultivalueInput from '../../common/multivalue-input/multivalue-input.component';
import Select from '../../common/select/select.component';
import Textarea from '../../common/textarea/textarea.component';
import useAddItem from '../../../hooks/menu/add-item.hook';

const Form = (props) => {
  const userContext = useContext(UserContext);
  const addItem = useAddItem();

  return (
    <form className="addForm" onSubmit={addItem.submit}>
      <Input
        label="Name"
        value={addItem.name.value}
        onChange={addItem.name.onChange}
        required
      />
      <input type="hidden" name="token" value={userContext.user?.token} />
      <input type="hidden" name="uid" value={userContext.user?.id} />
      <Textarea
        name="description"
        label="Description (Add your description here. Customers will be able to read it)"
      />
      <Input
        label="Image"
        name="image"
        type="url"
        required
      />
      <Input
        name="price"
        label="Price"
        type="number"
        min={0}
        required
      />
      <Select name="category" label="Category" required>
        {CATEGORIES.map(item => {
          return <option key={item} value={item}>{item}</option>;
        })}
      </Select>
      <Select name="store" label="Store" required>
        <option key={1} value="1">Groceries</option>
        <option key={2} value="2">Tech</option>
      
      </Select>
      <MultivalueInput
        label="Ingredients"
        value={addItem.ingredients.value}
        onChange={newIngredients => addItem.ingredients.setValue(newIngredients)}
      />
      <div className="addFormButtons">
        <button
          className="nemo-button"
          type="submit"
          disabled={userContext.user?.role !== 'ADMIN'}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default Form;