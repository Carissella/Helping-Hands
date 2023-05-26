import React, { useEffect, useState } from "react";
import backgroundImg from "../assest/charity.png";
import AllProduct from "../components/Allproduct";
import { Typography } from "@mui/material";

const Home = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
      const resData = await res.json();
      setProductData(resData);
    })();
  }, []);
  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            Transforming Lives{" "}
            <span className="text-red-600 text-">Through Giving</span>
          </h2>
          <Typography
            gutterBottom
            variant="p"
            component="p"
            color="text.secondary"
          >
           The digital hub where giving meets needs. Here, you can effortlessly support a 
           range of causes, from education to health, and many more. Yet, we're more than 
           just a giving platform - we're a community that empowers you to share your own 
           needs, connecting those who give with those who are in need. Our aim is simple: 
           to make giving and receiving help seamless, transparent, and meaningful. Dive 
           in today, and join a compassionate community that's making a real difference, 
           one click at a time.
          </Typography>
          <a href="#donate">
            <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
              Donate Now
            </button>
          </a>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          <img src={backgroundImg} alt="charity" className="w-1/2" />
        </div>
      </div>

      <AllProduct productData={productData} heading={"Choose For Donation"} />
    </div>
  );
};

export default Home;
