import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./screens/header";
import Landingpage from "./screens/landingpage";
import Product from "./screens/product";
import Cart from "./screens/cart";
import Loading from "./screens/loading";
import ProductStep from "./screens/productstep";
// import Header from "./components/layouts/Header";
import Register from "./screens/accounts/Register";
import Login from "./screens/accounts/Login";
 

export default function App() {
  const [isloading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Landingpage />} />
            <Route exact path="/products/:id" element={<Product />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/step" element={<ProductStep />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
          </Routes>
        </Router>
       )} 
    </>
  );
}
