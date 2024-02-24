import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/core/header/header.component";
import AddPage from "./pages/add/add.page";
import ViewPage from "./pages/view/view.page";
import ViewItemPage from "./pages/view-item/view-item.page";
import NotFoundPage from "./pages/not-found/not-found.page";
import CartPage from "./pages/cart/cart.page";
import LoginPage from "./pages/login/login.page";
import SignupPage from "./pages/signup/signup.page";
import UserProvider from "./components/providers/user-provider.component";
import Guard from "./components/core/guard/guard.component";
import CartProvider from "./components/providers/cart-provider.component";
import Shops from './pages/shops/index'
import ViewTech from "./pages/viewTech/view.page"
import VerifyPage from "./pages/verify/verify.page"
function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/shops" replace />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/viewtech" element={<ViewTech />} />
            <Route path="/view" element={<ViewPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/add" element={<Guard permittedRoles={['ADMIN']}><AddPage /></Guard>} />
            <Route path="/verify" element={<Guard permittedRoles={['user']}><VerifyPage /></Guard>} />

            <Route path="/view-details/:id" element={<ViewItemPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
