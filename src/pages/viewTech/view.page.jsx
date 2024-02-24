import { useEffect, useState, useContext } from 'react';
import './view.css';
import Spinner from '../../components/core/spinner/spinner.component';
import FilterBar from '../../components/view/filter-bar/filter-bar.component';
import Item from '../../components/view/item/item.component';
import { getCartQuantity } from '../../utils/cart';
import { CartContext } from '../../components/providers/cart-provider.component';
import { fetchItems } from '../../services/items.service';
import useFilterItems from '../../hooks/filter-items.hook';
import useToggle from '../../hooks/common/toggle.hook';

/**
 * @type {Array<{
 * id: number;
 * name: string;
 * description: string;
 * ingredients: string[];
 * price: number;
 * category: string;
 * image: string;
 * }>}
 */
const initialItems = [];

const ViewTechPage = () => {
  const [menuItems, setMenuItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [isTourist, toggleIsTourist] = useToggle(false);

  const cartContext = useContext(CartContext);

  const getMenuItems = async () => {
    setLoading(true);
    const items = await fetchItems(2);
    setMenuItems(items);
    setLoading(false);
  };

  useEffect(() => { getMenuItems(); }, []);

  const filteredItems = useFilterItems(menuItems, isTourist);  

  return (
    <div className="view-page">
      <h1>View Menu Items</h1>
      <FilterBar isTourist={isTourist} toggleIsTourist={toggleIsTourist} />
      {
        loading
          ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Spinner /></div>
          : (
            <div className="items-container">
              {
                filteredItems.length
                  ? filteredItems.map((item, index) => (
                    <Item
                      data={item}
                      key={item.name + index}
                      dispatch={cartContext.dispatch}
                      cartQuantity={getCartQuantity(item.id, cartContext.cart)}
                    />
                  ))
                  : (
                    <div className="no-results">
                      <img src="./frustrated-realistic.png" alt="No results" />
                      <p>No results found</p>
                    </div>
                  )
              }
            </div>
          )
      }
    </div>
  );
};

export default ViewTechPage;