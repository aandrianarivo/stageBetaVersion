import "bootstrap/dist/css/bootstrap.min.css";
import "./Products.css"; // Assure-toi d'avoir importé le fichier de styles personnalisés
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddProduct from "../components/ADD/AddProduct";
import CardsProducts from "../components/CardsProctucts";
import Loading from "../components/Loading";
import Badge from "../components/Badge";
import AuhtContext from "../utils/AuthContext";
// import image from '../assets/avatars/avatar-alcides-antonio.png'

// Importe les images pour les produits
// import productImage2 from './product-images/product2.jpg';
// const productImage2 = "HAHa";

// Ajoute d'autres images pour les autres produits ici

function Product() {
  const [showBadge, setShowBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const listAttributes = [
    "product_ref",
    "product_name",
    "product_unitprice",
    "product_availableQuantity",
    "supplier_name",
  ];

  useEffect(() => {
    setIsLoading(false);
    axios
      .get("http://localhost:5000/api/product/list-product")
      .then(function (response) {
        setProducts(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  const { userRole } = useContext(AuhtContext);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between">
            <div>
              <h1 className="mt-4">List of products</h1>
            </div>
            <div>
              {userRole == "admin" ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary btn-sm mt-4 "
                >
                  <i className="fa-solid fa-plus"></i>
                  NEW
                </button>
              ) : null}
            </div>
          </div>
          <form className="d-flex mx-2 mb-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Rechercher"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark" type="submit">
              Rechercher
            </button>
          </form>
          {isLoading ? <Loading /> : <>{showBadge && <Badge />}</>}

          {showForm && (
            <AddProduct
              setProducts={setProducts}
              setIsLoading={setIsLoading}
              setShowForm={setShowForm}
              setShowBadge={setShowBadge}
            />
          )}

          {
            <CardsProducts
              datas={products}
              attributes={listAttributes}
              setProducts={setProducts}
              setIsLoading={setIsLoading}
              setShowBadge={setShowBadge}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default Product;
