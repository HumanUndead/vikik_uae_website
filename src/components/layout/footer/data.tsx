import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoLogoLinkedin,
} from "react-icons/io5";
import { SiGmail } from "react-icons/si";

export const footer = {
  widgets: [
    {
      id: 1,
      widgetTitle: "widget-title-social",
      lists: [
        {
          id: 1,
          title: "link-instagram",
          path: "https://www.instagram.com/vikikfashion/?hl=en",
          icon: <IoLogoInstagram />,
        },
        {
          id: 2,
          title: "link-linkedin",
          path: "https://www.linkedin.com/company/vikikfashion/",
          icon: <IoLogoLinkedin />,
        },
        {
          id: 3,
          title: "link-facebook",
          path: "https://m.facebook.com/VikikFashion/",
          icon: <IoLogoFacebook />,
        },
      ],
    },
    {
      id: 2,
      widgetTitle: "widget-title-contact",
      lists: [
        {
          id: 1,
          title: "link-number",
          path: "/contact-us",
          icon: <FaPhoneAlt />,
        },
        {
          id: 2,
          title: "link-number",
          path: "https://wa.me/971506886449",
          icon: <FaWhatsapp />,
        },
        {
          id: 3,
          title: "info@vikikfashion.com",
          path: "",
          icon: <SiGmail />,
        },
      ],
    },
    {
      id: 3,
      widgetTitle: "widget-title-about",
      lists: [
        {
          id: 1,
          title: "link-privacy",
          path: "/privacypolicy",
        },
        {
          id: 2,
          title: "link-terms",
          path: "/terms",
        },
        {
          id: 1,
          title: "common:text-delete-account",
          path: "/requestdelete",
        },
      ],
    },
  ],
  payment: [
    {
      id: 1,
      path: "/",
      image: "/assets/images/payment/mastercard.svg",
      name: "payment-master-card",
      width: 34,
      height: 20,
    },
    {
      id: 2,
      path: "/",
      image: "/assets/images/payment/visa.svg",
      name: "payment-visa",
      width: 50,
      height: 20,
    },
  ],
};
