import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../pages/home";

const Router = () => {

  return (
    <>
      <Routes>
        <Route exact path='/' element={ <Home /> }  />
      </Routes>
    </>
  );
};

export default Router;
