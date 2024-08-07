import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="footer h-16 flex items-center px-6 border-t border-gray-200 mt-auto">
        <div className="flex md:justify-between justify-center w-full gap-4">
          <div>
            <p className="text-sm font-medium">
              <script>{new Date().getFullYear()}</script> &copy;
              DigitalShop
            </p>
          </div>
          <div className="md:flex hidden gap-2 item-center md:justify-end">
            <p className="text-sm font-medium">
              Design &amp; Develop by{" "}
              <a href="#" className="text-primary">
              DigitalShop
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
