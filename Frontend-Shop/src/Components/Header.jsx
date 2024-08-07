import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useWishListContext } from "../Features/WishListContext";
import Wrapper from "./Wrapper";

import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { IoMdHeartEmpty } from "react-icons/io";
import { LuUserCircle } from "react-icons/lu";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

import "react-toastify/dist/ReactToastify.css";
import { useCartContext } from "../Features/CartContext";

export default function Header() {
  const { wishListItems } = useWishListContext();
  const { cartItems } = useCartContext();

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = [
      { id: 1, name: "Jordan", product_count: 11 },
      { id: 2, name: "Sneakers", product_count: 8 },
      { id: 3, name: "Running shoes", product_count: 64 },
      { id: 4, name: "Football shoes", product_count: 107 },
    ];
    setCategories(data);
  };

  return (
    <header
      className={`w-full h-[60px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link to="/">
          <img src="/logo.svg" className="w-[60px]" alt="logo" />
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
          <Link to="/account">
            <div className="w-12 h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <LuUserCircle className="text-[20px]" />
            </div>
          </Link>
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
