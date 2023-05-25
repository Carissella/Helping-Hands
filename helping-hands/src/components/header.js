import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-hot-toast";
import { Avatar, Typography } from "@mui/material";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [productData, setProductData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const user = localStorage.getItem("user");
      setUserData(JSON.parse(user));
    }
  }, []);
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast("Logout successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <Typography variant="h5" gutterBottom>
            HelpingHands
          </Typography>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <ShoppingCartIcon />
              {/* <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center ">
                {productData?.length}
              </div> */}
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div>
              {userData?.user?.image ? (
                <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
                  <img src={userData?.user?.image} className="h-full w-full" />
                </div>
              ) : (
                <Avatar src="/broken-image.jpg" />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col gap-2 min-w-[120px] text-center p-2">
                {userData?.token ? (
                  <>
                    <Link
                      to={"newproduct"}
                      className="whitespace-nowrap cursor-pointer px-2"
                    >
                      New product
                    </Link>

                    <p className="cursor-pointer" onClick={handleLogout}>
                      Logout ({userData?.user?.firstName}){" "}
                    </p>
                  </>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
