import React from "react";
import "./App.css";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Header from "./component/layout/header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js"

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: { families: ["Roboto", "Droid Sans"] },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
      <Route exact path="/" Component={Home} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
