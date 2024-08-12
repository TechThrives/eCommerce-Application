import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { MdDashboard, MdClose, MdReviews } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import { RiMenuFill } from "react-icons/ri";

export default function UserLayout() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const pathnames = location.pathname.split("/").filter((x) => x);

  const navLinks = [
    {
      name: "Dashboard",
      path: "/account",
      icon: <MdDashboard />,
    },
    {
      name: "Orders",
      path: "/account/orders",
      icon: <FaFileInvoice />,
    },
    {
      name: "Reviews",
      path: "/account/reviews",
      icon: <MdReviews />,
    },
    {
      name: "Profile",
      path: "/account/profile",
      icon: <FaGear />,
    },
  ];
  return (
    <>
      <div className="w-full py-2 relative">
        <Wrapper>
          <div className="mx-4 my-2 relative">
            <div className="grid grid-cols-1">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl leading-normal font-semibold">
                  Account
                </h3>
                <RiMenuFill
                  className="ml-4 text-lg cursor-pointer hover:bg-gray-300 justify-end md:hidden"
                  onClick={() => setShowMenu(true)}
                />
              </div>
            </div>

            <div className="relative mt-3">
              <ul className="tracking-[0.5px] mb-0 inline-block">
                {pathnames.map((pathname, index) => {
                  const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

                  const isLast = index === pathnames.length - 1;

                  return (
                    <span key={index}>
                      {isLast ? (
                        <li
                          className="inline-block uppercase text-[13px] font-bold text-orange-500"
                          aria-current="page"
                        >
                          {pathname}
                        </li>
                      ) : (
                        <>
                          <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500">
                            <Link to={routeTo}>{pathname}</Link>
                          </li>
                          <li className="inline-block text-base text-slate-950 mx-0.5">
                            <FaChevronRight className="text-[14px]" />
                          </li>
                        </>
                      )}
                    </span>
                  );
                })}
              </ul>
            </div>
          </div>

          {showMenu && (
            <div
              className="fixed inset-0 bg-black opacity-40 z-10"
              onClick={() => setShowMenu(false)}
            ></div>
          )}

          <div
            className={`absolute z-[15] top-0 left-0 w-72 h-full bg-white text-black ${
              showMenu ? "block" : "hidden"
            } md:hidden`}
          >
            <div className="sticky top-16 px-4">
              <div className="flex w-full justify-between">
                <h5 className="text-xl font-medium">Menus</h5>
                <MdClose
                  className="mr-1 text-lg cursor-pointer hover:bg-gray-300"
                  onClick={() => setShowMenu(false)}
                />
              </div>
              <ul className="space-y-2 font-medium">
                {navLinks.map((navLink, index) => (
                  <li key={index}>
                    <Link
                      to={navLink.path}
                      className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                    >
                      {navLink.icon}
                      <span className="ms-3">{navLink.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
            <div className="md:col-span-3 mb-14 hidden md:block">
              <div className="rounded p-2 sticky top-20">
                <h5 className="text-xl font-medium">Menus</h5>
                <ul className="space-y-2 font-medium">
                  {navLinks.map((navLink, index) => (
                    <li key={index}>
                      <Link
                        to={navLink.path}
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                      >
                        {navLink.icon}
                        <span className="ms-3">{navLink.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-9 mx-2">{<Outlet />}</div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
