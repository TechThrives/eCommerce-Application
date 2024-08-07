import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MenuItem = ({ item }) => {
  const location = useLocation();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    if (item["menu-item"] && item["menu-item"]["sub-menu"]) {
      e.preventDefault();
      setIsSubMenuOpen(!isSubMenuOpen);
    }
  };

  const isActiveMenuItem = (href) => {
    return (
      location.pathname === href ||
      (href === "dashboard" && location.pathname === "/")
    );
  };

  useEffect(() => {
    if (item["menu-item"]) {
      if (item["menu-item"]["sub-menu"]) {
        const activeSubMenu = item["menu-item"]["sub-menu"].some((subItem) =>
          isActiveMenuItem(subItem["menu-item"].href)
        );
        setIsSubMenuOpen(activeSubMenu);
        setIsActive(activeSubMenu || isActiveMenuItem(item["menu-item"].href));
      } else {
        setIsActive(isActiveMenuItem(item["menu-item"].href));
      }
    }
  }, [location.pathname, item]);

  if (item["menu-title"]) {
    return <li className="menu-title">{item["menu-title"]}</li>;
  } else if (item["menu-item"]) {
    const menuItem = item["menu-item"];

    if (menuItem["sub-menu"]) {
      return (
        <li className="menu-item">
          <a
            href={menuItem.href}
            className={`menu-link ${isActive ? "active" : ""}`}
            onClick={handleClick}
          >
            <span className="menu-icon">
              <i className={menuItem["menu-icon"]}></i>
            </span>
            <span className="menu-text">{menuItem["menu-text"]}</span>
            <span
              className={`menu-arrow ${isSubMenuOpen ? "rotate-90" : ""}`}
            ></span>
          </a>
          <ul className={`sub-menu ${isSubMenuOpen ? "" : "hidden"}`}>
            {menuItem["sub-menu"].map((subItem, index) => (
              <MenuItem key={index} item={subItem} />
            ))}
          </ul>
        </li>
      );
    } else {
      return (
        <li className="menu-item">
          <Link
            to={menuItem.href}
            className={`menu-link ${isActive ? "active" : ""}`}
          >
            <span className="menu-icon">
              <i className={menuItem["menu-icon"]}></i>
            </span>
            <span className="menu-text">{menuItem["menu-text"]}</span>
            {menuItem.badge && (
              <span className={`badge ${menuItem.badge.color} rounded ms-auto`}>
                {menuItem.badge.text}
              </span>
            )}
          </Link>
        </li>
      );
    }
  }
  return null;
};

export default MenuItem;
