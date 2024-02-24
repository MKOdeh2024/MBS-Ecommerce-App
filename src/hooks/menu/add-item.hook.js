import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../../services/items.service';

const useAddItem = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  /**
 * Handler function for the form onSubmit event.
 * @param {React.FormEvent<HTMLFormElement>} e Event object.
 */
  const submitHandler = async e => {
    e.preventDefault();

    const description = e.target.description.value;
    const image = e.target.image.value;
    const price = Number(e.target.price.value);
    const category = e.target.category.value;
    const token = e.target.token.value;
    const uid = e.target.uid.value;
    const store = e.target.store.value;
    const menuItem = {
      // id: Date.now(),
      name: name,
      image,
      description: description,
      price: price.toString(),
      category: category,
      ingredients: ingredients,
      token: token,
      uid:uid,
      store:store
    };

    const res = await createItem(menuItem);

    if (res) {
      alert("Item added successfully");
      navigate('/');
    } else {
      alert("Error adding the item!");
    }
  };

  /**
   * Handles on change events on the name field.
   * @param {React.ChangeEvent<HTMLInputElement>} e On change event object.
   */
  const onNameChange = (e) => {
    let value = e.target.value;

    if (value.includes('.')) {
      alert('. character is not allowed');
      value = value.replace('.', '');
    }

    if (/find/ig.test(value)) {
      value = value.replace(/find/ig, 'fry');
    }

    setName(value);
  };

  return {
    name: {
      value: name,
      onChange: onNameChange
    },
    ingredients: {
      value: ingredients,
      setValue: setIngredients
    },
    submit: submitHandler
  };
};

export default useAddItem;