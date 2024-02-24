import React, { useContext } from 'react';
import './header.css';
import logo from '../../../assets/nemo.svg';
import { ShoppingCart, SignOut } from 'phosphor-react';
import { UserContext } from '../../providers/user-provider.component';
import { CartContext } from '../../providers/cart-provider.component';

import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);

  let totalCartQuantity = 0;

  for (let i = 0; i < cartContext.cart.length; i++) {
    totalCartQuantity += cartContext.cart[i].quantity;
  }

  return (
    <header className="websiteHeader">
      <div className="left">
        <h1>
          <img src={logo} alt="MBS" />
          MBS
        </h1>
      </div>
      <div className="right">
        <nav>
          {console.log(userContext.user?.ver)}
          {
            userContext.user ? (userContext.user?.role=='ADMIN'? (
              <Link to="/add" className={location.pathname === "/add" ? 'current' : ''}>
                Add
              </Link>
            ):userContext.user?.ver=="1"?null:
            <Link  to="/verify" className={location.pathname === "/verify" ? 'current' : 'warning_link'}>
                Verify
              </Link>
            ) : (
              <>
              <Link to="/login" className={location.pathname === "/login" ? 'current' : ''}>
                Login
              </Link>
              <Link to="/signup" className={location.pathname === "/signup" ? 'current' : ''}>
                Signup
              </Link>
              </>
            )
          }
          <Link to="/view" className={location.pathname === "/view" ? 'current' : ''}>
            Groceries
          </Link>
          <Link to="/viewtech" className={location.pathname === "/viewtech" ? 'current' : ''}>
            Tech
          </Link>
        </nav>
        <Link className="cart" to="cart">
          {/* <img src={cartIcon} alt="cart icon" /> */}
          <ShoppingCart size={30} color="#be441d" />
          <span className="count">{totalCartQuantity}</span>
        </Link>
        {
          userContext.user &&
          <span className="user-badge">
            <img src={userContext.user.imageUrl} alt="user logo" width={30} height={30} />
            {userContext.user.fullName}
            <button
              onClick={() => {
                userContext.setUser(null);
                navigate('/login');
              }}
            >
              <SignOut size={24} color="#be441d" weight="fill" />
            </button>
          </span>
        }
      </div>
    </header>
  );
};

export default Header;