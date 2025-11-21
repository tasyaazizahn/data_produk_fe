import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Modal from "../components/Modal";
// import Button from "../components/Button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Produk from "./pages/Produk";
import ProdukEdit from "./pages/ProdukEdit";
import './App.css'

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Produk/>}/>
          <Route path="/produk/:id" element={<ProdukEdit/>}/>
        </Routes>
      </div>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App
