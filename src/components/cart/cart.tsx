import Scrollbar from "@components/common/scrollbar";
import { useCart } from "@contexts/cart/cart.context";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";
import { IoClose } from "react-icons/io5";
import CartItem from "./cart-item";
import EmptyCart from "./empty-cart";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import cn from "classnames";
import { useTranslation } from "next-i18next";

export default function Cart() {
  const { t } = useTranslation("common");
  const { closeCart } = useUI();
  const { items, total, isEmpty } = useCart();
  const price = process.env.NEXT_PUBLIC_CURRENCY || "AED";
  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode: price,
  });

  return (
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

      <div
        className="flex flex-col px-5 pt-2 pb-5 md:px-7 md:pb-7"
        onClick={closeCart}
      >
        <Link
          href={isEmpty === false ? ROUTES.CHECKOUT : "/"}
          onClick={() => {
            console.log("first");
          }}
          className={cn(
            "w-full px-5 py-3 md:py-4 flex items-center justify-center rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300 ",
            isEmpty
              ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400"
              : "bg-heading hover:bg-gray-600"
          )}
        >
          <span className="w-full ltr:pr-5 rtl:pl-5 -mt-0.5 py-0.5">
            {/* @ts-ignore */}
            {t("text-proceed-to-checkout")}
          </span>
          <span className="rtl:mr-auto ltr:ml-auto flex-shrink-0 -mt-0.5 py-0.5 flex">
            <span className="ltr:border-l rtl:border-r border-white ltr:pr-5 rtl:pl-5 py-0.5" />
            {cartTotal}
          </span>
        </Link>
      </div>
    </div>
  );
}

// <image width="64" height="64" resizeMode="Transparent" anchor="Center" imageFormat="png" baseImage="~/images/base_64x64.png"/>
// <image width="350" height="350" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_350x350.jpg"/>
// <image width="400" height="400" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_400x400.jpg" />
// <image width="500" height="500" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_500x500.jpg"/>
// <image width="600" height="600" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_600x600.jpg"/>
// <image width="700" height="700" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_700x700.jpg"/>
// <image width="800" height="800" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_800x800.jpg" />
// <image width="200" height="200" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_200x200.jpg" />
// <image width="760" height="400" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_760x400.jpg"/>
// <image width="1000" height="400" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_1000x400.jpg" />
// <image width="1440" height="768" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_1440x768.jpg" />
// <image width="293" height="123" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_293x123.jpg"/>
// <image width="1280" height="290" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_1280x290.jpg"/>
// <image width="1920" height="250" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_1920x250.jpg"/>
// <image width="1920" height="1280" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_1920x1280.jpg" />
// <image width="800" height="800" resizeMode="Transparent" anchor="Center" imageFormat="png" baseImage="~/images/base_800x800.png" />
// <image width="435" height="574" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_435x574.jpg"/>
// <image width="800" height="400" resizeMode="Transparent" anchor="Center" imageFormat="jpg" baseImage="~/images/base_800x400.jpg" />
// <image width="432" height="200" resizeMode="Transparent" anchor="Center" imageFormat="jpg" />
// <image width="467" height="619" resizeMode="Transparent" anchor="Center" imageFormat="jpg" />
// <image width="432" height="200" resizeMode="Transparent" anchor="Center" imageFormat="png" baseImage="~/images/base_432x200.png" />
// <image width="500" height="250" resizeMode="Transparent" anchor="Center" imageFormat="jpg" />
// <image width="800" height="400" resizeMode="Transparent" anchor="Center" imageFormat="png" />
// <image width="1920" height="1280" resizeMode="Transparent" anchor="Center" imageFormat="png" />
// <image width="520" height="450" resizeMode="Transparent" anchor="Center" imageFormat="png" />
// <image width="300" height="360" resizeMode="Transparent" anchor="Center" imageFormat="png" />
