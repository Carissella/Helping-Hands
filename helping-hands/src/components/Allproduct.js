import React, { useEffect, useState } from "react";
import CardFeature from "./CardFeature";

const AllProduct = ({ productData, heading }) => {
  //filter data display
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const loadingArrayFeature = new Array(3).fill(null);

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>
      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  description={el.description}
                  price={el.price}
                />
              );
            })
          : loadingArrayFeature.map((el, index) => (
              <CardFeature key={index + "allProduct"} />
            ))}
      </div>
    </div>
  );
};

export default AllProduct;
