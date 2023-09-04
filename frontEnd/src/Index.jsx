import "./Index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContex  from "./utils/AuthContext";
import Login from "./page/Login";
import ProtectedWrapper from "./utils/ProtectedWrapper";
import { useEffect, useState } from "react";
import Dashboard from './page/Dashboard'
import Layout from "./components/Layout";
import {decodeToken} from "./utils/DecodeToken";
import Request from './page/Request';
import Product from './page/Product';
import User from './page/User';
import Region from "./page/Region";
import Departement from "./page/Departement";
import ProductList from "./page/ProductList";
import Suppliers from "./page/Suppliers";
import RequestList from "./page/RequestList";

function Index() {

  const [user,setUser]= useState("");
  const [userRole,setUserRole]=useState("");
  const [loader,setLoader] = useState(true);
  const [userId,setUserId] = useState();

  let myLoginUser = localStorage.getItem("token");
  // console.log('token',myLoginUser)
  const decode = decodeToken(myLoginUser)
  console.log('token decoded',decode)
  useEffect(()=>{
    if (decode) {
      setUser(decode.name);
      setLoader(false);
      setUserRole(decode.role)
      setUserId(decode.id)
      // console.log("inside effect", myLoginUser)import React from "react";

    } else {
      setUser("");
      setLoader(false);
    
    }
  },[decode])
  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const id = userId;

  let value = { user, signin, signout,userRole,id};
  if(loader){
      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>LOADING...</h1>
        </div>
    )
  }


  return (
    <AuthContex.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedWrapper>
                <Layout />
              </ProtectedWrapper>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/products" element={<Product/>}/>
            <Route path="/products/list" element={<ProductList/>}/>
            <Route path="/requests" element={<Request/>}/>
            <Route path="/requests/list" element={<RequestList/>}/>
            <Route path="/users" element={<User/>}/>
            <Route path="/departments" element={<Departement/>}/>
            <Route path="/regions" element={<Region/>}/>
            <Route path="/suppliers" element={<Suppliers/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContex.Provider>
  );
}

export default Index;
