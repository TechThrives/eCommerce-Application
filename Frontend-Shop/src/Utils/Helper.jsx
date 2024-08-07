import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getDiscountedPricePercentage = (
  originalPrice,
  discountedPrice
) => {
  const discount = originalPrice - discountedPrice;
  const discountPercentage = (discount / originalPrice) * 100;
  return discountPercentage.toFixed(2);
};

export const notify = (msg, type) => {
  switch (type) {
    case "error":
      toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;
    case "success":
      toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;
    default:
      break;
  }
};
