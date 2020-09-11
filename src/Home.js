import React from "react";
import "./Home.css";
import Product from "./Product";
import jsonData from "./products.json";

function Home() {
  // var data = JSON.parse(jsonData);
  //

  const loadData = [...jsonData];

  const getProduct = () => {
    var i = Math.floor(Math.random() * Math.floor(loadData.length));
    return (
      <Product
        key={Math.floor(Math.random() * Math.floor(12000))}
        {...loadData[i]}
      />
    );
  };

  return (
    <div className="home">
      <div>
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
      </div>
      <div className="home__row">
        <Product {...loadData[2]}/>
        <Product {...loadData[1]}/>
        <Product {...loadData[3]}/>
      </div>

      <div className="home__row">
       <Product {...loadData[4]}/>
      </div>

      <div className="home__row">
        <Product {...loadData[6]}/>
      </div>

      <div className="home__row">
      <Product {...loadData[5]}/>
      <Product {...loadData[0]}/>
      <Product {...loadData[9]}/>

      </div>

      <div className="home__row">
        <Product {...loadData[7]}/>
      </div>
    </div>
  );
}

export default Home;
