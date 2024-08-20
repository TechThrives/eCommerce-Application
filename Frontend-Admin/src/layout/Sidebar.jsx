import React from "react";
import MenuItem from "../components/MenuItem";

export default function Sidebar() {
  const menuData = [
    {
      "menu-title": "Menu",
    },
    {
      "menu-item": {
        href: "/dashboard",
        "menu-icon": "uil uil-estate",
        "menu-text": "Dashboard",
        badge: {
          color: "bg-primary",
          text: "01",
        },
      },
    },
    {
      "menu-title": "Management",
    },
    {
      "menu-item": {
        href: "#",
        "menu-icon": "uil uil-apps",
        "menu-text": "Products",
        "sub-menu": [
          {
            "menu-item": {
              href: "/product-list",
              "menu-text": "Product List",
              "menu-icon": "uil uil-paragraph",
            },
          },
        ],
      },
    },
    {
      "menu-item": {
        href: "#",
        "menu-icon": "uil uil-layer-group",
        "menu-text": "Categories",
        "sub-menu": [
          {
            "menu-item": {
              href: "/category-list",
              "menu-text": "Category List",
              "menu-icon": "uil uil-paragraph",
            },
          },
        ],
      },
    },
    {
      "menu-item": {
        href: "#",
        "menu-icon": "uil uil-users-alt",
        "menu-text": "Users",
        "sub-menu": [
          {
            "menu-item": {
              href: "/user-list",
              "menu-text": "User List",
              "menu-icon": "uil uil-paragraph",
            },
          },
        ],
      },
    },
    {
      "menu-item": {
        href: "#",
        "menu-icon": "uil uil-comment-alt-lines",
        "menu-text": "Reviews",
        "sub-menu": [
          {
            "menu-item": {
              href: "/review-list",
              "menu-text": "Review List",
              "menu-icon": "uil uil-paragraph",
            },
          },
        ],
      },
    },
    {
      "menu-item": {
        href: "#",
        "menu-icon": "uil uil-file-alt",
        "menu-text": "Invoices",
        "sub-menu": [
          {
            "menu-item": {
              href: "/invoice-list",
              "menu-text": "Invoice List",
              "menu-icon": "uil uil-paragraph",
            },
          },
        ],
      },
    },
    {
      "menu-item": {
        href: "#",
        "menu-icon": "uil uil-user",
        "menu-text": "Profile",
        "sub-menu": [
          {
            "menu-item": {
              href: "/settings",
              "menu-text": "Settings",
              "menu-icon": "uil uil-paragraph",
            },
          },
        ],
      },
    },
  ];
  return (
    <>
      <div className="app-menu">
        <a href="dashboard" className="logo-box">
          <div className="flex flex-row items-center">
            <img
              className="logo-dark h-10"
              src={`${process.env.PUBLIC_URL}/assets/images/Logo.svg`}
              alt=""
            />

            <h1 className="text-lg md:text-xl font-semibold text-black">
              Digital Shop
            </h1>
          </div>
        </a>

        <div data-simplebar>
          <ul className="menu">
            {menuData.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
