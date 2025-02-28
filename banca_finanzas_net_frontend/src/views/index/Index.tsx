import Link from '../../components/Link';

const Index = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>Bienvenidos a la Banca NET</h4>
            <ul>
              <div>
                <Link
                  classLink="link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-0 -hover"
                  hrefLink="/clientes"
                  textLink="- Listado de Clientes" />
              </div>
              <div>
                <Link
                  classLink="link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-0 -hover"
                  hrefLink="/clientes/getcliente"
                  textLink="- Datos del Cliente" />
              </div>
            </ul>            
          </div>
         </div>
       </div>
    </>
  );
}

export default Index;