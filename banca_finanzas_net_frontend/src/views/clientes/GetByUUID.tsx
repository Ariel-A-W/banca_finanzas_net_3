import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../../components/Loading";
import Link from '../../components/Link';

const API_URL = "https://localhost:7061/api/Clientes";

const GetAll = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchUuid, setSearchUuid] = useState("");
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [startOne, setStartOne] = useState(false)

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setClientes(response.data);
          //setFilteredClientes(response.data);
        } else {
          console.error("Error: Los datos recibidos no son un array", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (searchUuid.trim() === "") {
      setFilteredClientes(clientes);
    } else {
      setStartOne(true);
      const filtered = clientes.filter(cliente =>
        cliente.cliente_UUID?.toLowerCase().includes(searchUuid.toLowerCase())
      );      
      setFilteredClientes(filtered);        
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div className="p-4" style={{ background: "#3a75c4" }}>
        <h3 style={{ color: "white" }}>Clientes</h3>
        <Link classLink="btn btn-success" hrefLink="/" textLink="Retornar" />

        <div className="my-3">
          <input
            type="text"
            placeholder="Buscar por cliente UUID"
            className="form-control"
            value={searchUuid}
            onChange={(e) => setSearchUuid(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleSearch}>Buscar</button>
        </div>
        
        {filteredClientes.length > 0 ? filteredClientes.map((cliente, index) => (
              <div key={cliente.cliente_UUID || index} className="border rounded" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", background: "#ffffff" }}>
              <h5>Nro. Cliente: {cliente.cliente_UUID}</h5>
              <h5>{cliente.nombres} {cliente.apellidos}</h5>
                <p><b>Email:</b> {cliente.email}</p>
                <h4>Caja de Ahorro</h4>
                {cliente.cajaAhorros?.length > 0 ? (
                  <ul>
                    <p><b>Movimientos:</b></p>
                    {cliente.cajaAhorros.map((ca, idx) => (
                      <li key={idx}>{ca.movimiento} - ${ca.debe || ca.haber} - Saldo: ${ca.saldo}</li>
                    ))}
                  </ul>
                ) : <p>No tiene caja de ahorro</p>}
                <h4>Cuentas Corrientes</h4>
                {cliente.cuentasCorrientes?.length > 0 ? (
                  <ul>
                    {cliente.cuentasCorrientes.map((cc, idx) => (
                      <li key={idx}>{cc.estado}: ${cc.debe || cc.haber} = Saldo: ${cc.saldo}</li>
                    ))}
                  </ul>
                ) : <p>No tiene cuentas corrientes</p>}
                <h4>Plazos Fijos</h4>
                {cliente.plazosFijos?.length > 0 ? (
                  <ul>
                    {cliente.plazosFijos.map((pf, idx) => (
                      <div key={idx}>
                        <p><b>Cuenta:</b> {pf.nrocuenta}</p>
                        <p><b>Monto:</b> $ {pf.monto.toFixed(2)}</p>
                        <p><b>Plazo:</b> {pf.plazo} d&iacute;as</p>
                        <p><b>Capital:</b> $ {pf.capital?.toFixed(2)}</p>
                      </div>
                    ))}
                  </ul>
                ) : <p>No tiene plazos fijos</p>}
              </div>
        )) : startOne === true ? <p style={{ color: "white" }}>No se encontraron clientes</p> : <p></p>
        } 
      </div>
    </div>
  );
};

export default GetAll;

// https://localhost:7061/api/Clientes/getcliente?Cliente_UUID=bcbeba23-8fa6-4f48-a93f-e211ac58701c

// https://localhost:7061/api/Clientes/getcliente?Cliente_UUID=d692c455-5a4b-4ded-99ee-b2866d4fc71b