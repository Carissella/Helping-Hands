import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { MenuItem, Select } from "@mui/material";

const CartProduct = ({
  id,
  name,
  image,
  description,
  setCartData,
  cartData,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const removeItemFromCart = (id) => {
    const updatedCart = cartData.filter((item) => item._id !== id);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleOptionChange = (event) => {
    const selected = cartData.map((item) => {
      if (item._id === id) {
        return { ...item, selectedOptions: event.target.value };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(selected));
    setSelectedOptions(event.target.value);
  };
  return (
    <div className="bg-white p-2 flex gap-4 rounded border border-slate-300">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover " />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-500"
            onClick={() => removeItemFromCart(id)}
          >
            <DeleteIcon />
          </div>
        </div>
        <p className=" text-base">
          <span>{description}</span>
        </p>
        <Select multiple value={selectedOptions} onChange={handleOptionChange}>
          <MenuItem value="Pencils">Pencils</MenuItem>
          <MenuItem value="Books">
            Books
          </MenuItem>
          <MenuItem value="Paper">
            Paper
          </MenuItem>
          <MenuItem value="Shoes">
            Shoes
          </MenuItem>
          <MenuItem value="Backpacks">
            Backpacks
          </MenuItem>
          <MenuItem value="Lunch Bags">
            Lunch Bags
          </MenuItem>
          <MenuItem value="After School Care">
            After School Care
          </MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default CartProduct;
