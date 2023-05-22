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
// import Landing from "./components/layouts/Landing";
// import Recipes from "./components/recipe/Recipes";
// import RecipeDetail from "./components/recipe/RecipeDetail";
// import RecipeCreate from "./components/recipe/RecipeCreate";
// import RecipeEdit from "./components/recipe/RecipeEdit";
// import WithPrivateRoute from "./utils/WithPrivateRoute";
// import Dashboard from "./components/layouts/Dashboard";

// import Profile from "./components/accounts/Profile";
// import MyRecipes from "./components/recipe/MyRecipes";
// import SavedRecipes from "./components/recipe/SavedRecipes";

// import ErrorDiv from "./components/layouts/ErrorDiv";

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
