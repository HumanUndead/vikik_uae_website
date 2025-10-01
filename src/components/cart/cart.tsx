import Scrollbar from "@components/common/scrollbar";
import { useCart } from "@contexts/cart/cart.context";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";
import { IoClose } from "react-icons/io5";
import CartItem from "./cart-item";
import EmptyCart from "./empty-cart";
import { ROUTES } from "@utils/routes";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Cart() {
  const { setModalView, openModal } = useUI();
  const { t } = useTranslation("common");
  const userId = Cookies.get("userId");
  const { closeCart } = useUI();
  const router = useRouter();
  const { items, total, isEmpty } = useCart();
  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode: "JOD",
  });

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }
  const notifyfill = () =>
    toast.warning(t("common:please-fill-cart"), {
      position: "top-right",
      className: "!bg-white",
      autoClose: 1400,
    });

  const notifylogin = () =>
    toast.warning(t("common:please-login"), {
      position: "top-right",
      className: "!bg-white",
      autoClose: 1400,
    });

  const handelPress = () => {
    if (isEmpty == false) {
      if (userId) {
        router.push(ROUTES.CHECKOUT);
        setTimeout(() => {
          closeCart();
        }, 2400);
      } else {
        notifylogin();
        setTimeout(() => {
          closeCart();
          handleLogin();
        }, 2400);
      }
    } else {
      notifyfill();
    }
  };
  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="w-full flex justify-between items-center relative ltr:pl-5 ltr:md:pl-7 rtl:pr-5 rtl:md:pr-7 py-0.5 border-b border-gray-100">
          <h2 className="m-0 text-xl font-bold md:text-2xl text-heading">
            {/* @ts-ignore */}
            {t("text-shopping-cart")}
          </h2>
          <button
            className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60"
            onClick={closeCart}
            aria-label="close"
          >
            <IoClose className="text-black mt-1 md:mt-0.5" />
          </button>
        </div>
        {!isEmpty ? (
          <Scrollbar className="flex-grow w-full cart-scrollbar">
            <div className="w-full px-5 md:px-7">
              {items?.map((item) => (
                <CartItem item={item} key={item.ID} />
              ))}
            </div>
          </Scrollbar>
        ) : (
          <motion.div
            layout
            initial="from"
            animate="to"
            exit="from"
            variants={fadeInOut(0.25)}
            className="flex flex-col items-center justify-center px-5 pt-8 pb-5 md:px-7"
          >
            <EmptyCart />
            <h3 className="pt-8 text-lg font-bold text-heading">
              {/* @ts-ignore */}
              {t("text-empty-cart")}
            </h3>
          </motion.div>
        )}

        <div className="flex flex-col px-5 pt-2 pb-5 md:px-7 md:pb-7">
          <div
            onClick={() => handelPress()}
            className={cn(
              "w-full px-5 py-3 md:py-4 flex items-center justify-center rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300 ",
              isEmpty
                ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400"
                : "bg-heading hover:bg-gray-600 cursor-pointer"
            )}
          >
            <span className="w-full ltr:pr-5 rtl:pl-5 -mt-0.5 py-0.5">
              {t("text-proceed-to-checkout")}
            </span>
            <span className="rtl:mr-auto ltr:ml-auto flex-shrink-0 -mt-0.5 py-0.5 flex">
              <span className="ltr:border-l rtl:border-r border-white ltr:pr-5 rtl:pl-5 py-0.5" />
              {cartTotal}
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
