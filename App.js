import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./screens/header";
import Landingpage from "./screens/landingpage";
import Product from "./screens/product";
import ProductStep from "./screens/productstep";

 
export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Landingpage />} />
        <Route exact path="/products/:id" element={<Product />} />
        <Route exact path="/step" element={<ProductStep />}></Route>
        
      </Routes>
    </Router>
  );
}
