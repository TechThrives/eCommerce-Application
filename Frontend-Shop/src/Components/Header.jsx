import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../Features/AppContext";
import { useCartContext } from "../Features/CartContext";
import { useWishListContext } from "../Features/WishListContext";
import Wrapper from "./Wrapper";
import axiosConfig from "../Utils/axiosConfig";
import { notify } from "../Utils/Helper";
import Logo from "../Components/Images/Logo.svg";

import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { IoMdHeartEmpty } from "react-icons/io";
import { LuLogOut, LuUserCircle } from "react-icons/lu";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const { user, setUser, setIsLoading } = useAppContext();
  const { wishListItems } = useWishListContext();
  const { cartItems } = useCartContext();

  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState([]);

  const controlNavbar = useCallback(() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY, mobileMenu]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [controlNavbar]);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.get(`/api/auth/sign-out`);
      if (response) {
        notify("Sign out successful.", "success");
        setUser(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        navigate("/sign-in");
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.details && Array.isArray(data.details) && data.message) {
          notify(data.message || "An unexpected error occurred.", "error");
        }
      } else {
        notify("An unexpected error occurred.", "error");
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosConfig.get(`/api/categories/all`);
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data.details && Array.isArray(data.details) && data.message) {
            notify(data.message || "An unexpected error occurred.", "error");
          }
        } else {
          notify("An unexpected error occurred.", "error");
        }
      }
    };
    fetchCategories();
  }, []);

  return (
    <header
      className={`w-full h-[60px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link to="/">
          <img src={Logo} className="w-[40px]" alt="logo" />
        </Link>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        <div className="flex items-center gap-2 text-black">
          {/* Icon start */}
          <Link to="/wishlist">
            <div className="w-12 h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <IoMdHeartEmpty className="text-[22px]" />
              {wishListItems.itemCount > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-2 left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {wishListItems.itemCount}
                </div>
              )}
            </div>
          </Link>
          {/* Icon end */}

          {/* Icon start */}
          <Link to="/cart">
            <div className="w-12 h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[20px]" />
              {cartItems.itemCount > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-2 left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems.itemCount}
                </div>
              )}
            </div>
          </Link>
          {/* Icon end */}

          {/* Icon start */}
          {user ? (
            <>
            <Link to="/account">
              <div className="w-12 h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                <LuUserCircle className="text-[20px]" />
              </div>
            </Link>
            <div className="w-12 h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative"
            onClick={handleSignOut}>
              <LuLogOut className="text-[20px]" />
            </div>
          </>
          ) : (
            <Link to="/sign-in">
              <div className="w-12 h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                <LuUserCircle className="text-[20px]" />
              </div>
            </Link>
          )}
          {/* Icon end */}

          {/* Mobile icon start */}
          <div className="w-12 h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[20px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[22px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile icon end */}
        </div>
      </Wrapper>
    </header>
  );
}
