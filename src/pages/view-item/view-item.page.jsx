import './view-item.css';
import { fetchItem } from '../../services/items.service';
import { getCartQuantity } from '../../utils/cart';

import Slider from "react-slick";
import Spinner from '../../components/core/spinner/spinner.component';
import PriceBar from '../../components/view/price-bar/price-bar.component';
import { CartContext } from '../../components/providers/cart-provider.component';

import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoPlay: true
};

const ViewItemPage = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    fetchItem(params.id)
      .then(item => {
        if (item === null) {
          navigate("/404", { replace: true });
        } else {
          setCurrentItem(item);
        }
      });
    setLoading(false);
  }, []);

  return (
    <div className="view-item-page">
      {loading || currentItem == null
        ? <Spinner />
        : <div className="item-details">
          <h1>{currentItem.name}</h1>
          <div className="img">
            <Slider {...settings}>
              <div>
                <img src={currentItem.image} alt="food" />
              </div>
              <div>
                <img src={currentItem.image} alt="food" />
              </div>
              <div>
                <img src={currentItem.image} alt="food" />
              </div>
              <div>
                <img src={currentItem.image} alt="food" />
              </div>
            </Slider>
          </div>
          <div className="info">
            <p><b>Item Description: </b> {currentItem.description}</p>
            <p className="ingredients"><b>Ingredients:</b>
              <br />{currentItem.ingredients.join(", ")}</p>
          </div>
          <PriceBar
            item={currentItem}
            dispatch={cartContext.dispatch}
            cartQuantity={getCartQuantity(currentItem.id, cartContext.cart)}
          />
        </div>
      }
    </div>
  );
};

export default ViewItemPage;