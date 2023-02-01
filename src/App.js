import "./App.css";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import CardDeatils from "./Components/CardDeatils";
import Cards from '../src/Components/Cards'
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cards/>}/>
        <Route path="/cart/:id" element={<CardDeatils/>}/>
      </Routes>
    </>
  );
}

export default App;
