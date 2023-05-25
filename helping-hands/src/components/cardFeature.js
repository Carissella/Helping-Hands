import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const cardFeature = ({ image, name, id, description }) => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleAddCartProduct = (product) => {
    setCartData((prevCart) => {
      // Check if product is already in cart
      const existingProduct = prevCart.find((item) => item._id === product._id);

      if (existingProduct) {
        // If product is already in cart, don't add it again
        localStorage.setItem("cart", JSON.stringify(prevCart));
        return prevCart;
      } else {
        // If product isn't in cart, add it
        localStorage.setItem("cart", JSON.stringify([...prevCart, product]));
        return [...prevCart, product];
      }
    });
    navigate("/cart");
  };
  return (
    <div className="w-full min-w-[250px] max-w-[250px] p-2 cursor-pointer flex flex-col ">
      {image ? (
        <>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 160 }} image={image} title={name} />
            <CardContent>
              <Typography gutterBottom variant="p" component="span">
                {name}
              </Typography>
              <Typography
                variant="body2"
                className="truncate"
                color="text.secondary"
              >
                {description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                endIcon={<ShoppingCartIcon />}
                className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full"
                onClick={() =>
                  handleAddCartProduct({
                    _id: id,
                    image,
                    name,
                    description,
                  })
                }
              >
                Donate
              </Button>
            </CardActions>
          </Card>
        </>
      ) : (
        <div className="min-h-[150px] bg-white flex justify-center items-center">
          <Avatar src="/broken-image.jpg" />
        </div>
      )}
    </div>
  );
};

export default cardFeature;
