import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "../views/index/Index";
import GetAll from "../views/clientes/GetAll";
import GetByUUID from "../views/clientes/GetByUUID";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index></Index>}></Route>
        <Route path="/clientes" element={<GetAll></GetAll>}></Route>
        <Route path="/clientes/getcliente" element={<GetByUUID></GetByUUID>}></Route>
      </Routes>
    </Router>
  );
}

export default Routing;