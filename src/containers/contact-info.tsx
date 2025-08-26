import { FC } from "react";
import { IoLocationSharp, IoMail, IoCallSharp } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import mapImage from "@public/assets/images/map-image.jpg";
import Image from "next/image";
import { page } from "src/api/type";

const data = [
  {
    id: 1,
    slug: "/",
    icon: <IoLocationSharp />,
    name: "text-address",
  },
  {
    id: 2,
    slug: "/",
    icon: <IoMail />,
    name: "text-email",
  },
  {
    id: 3,
    slug: "/",
    icon: <IoCallSharp />,
    name: "text-phone",
  },
];
interface Props {
  res?: page;
}
const ContactInfoBlock: FC<Props> = ({ res }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
      <h4 className="text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1">
        {t("common:text-find-us-here")}
      </h4>
      <div className="flex pb-7">
        <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
          {data[0]?.icon}
        </div>
        <div className="flex flex-col ltr:pl-3 rtl:pr-3 ltr:2xl:pl-4 rtl:2xl:pr-4">
          <h5 className="text-sm font-bold text-heading">
            {t(`common:${data[0]?.name}`)}
          </h5>
          <span
            style={{ unicodeBidi: "bidi-override" }}
            className="text-sm mt-0"
          >
            {res?.Keywords}
          </span>
        </div>
      </div>
      <div className="flex pb-7">
        <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
          {data[1]?.icon}
        </div>
        <div className="flex flex-col ltr:pl-3 rtl:pr-3 ltr:2xl:pl-4 rtl:2xl:pr-4">
          <h5 className="text-sm font-bold text-heading">
            {t(`common:${data[1]?.name}`)}
          </h5>
          <span
            style={{ unicodeBidi: "bidi-override" }}
            className="text-sm mt-0"
          >
            {res?.Name}
          </span>
        </div>
      </div>
      <div className="flex pb-7">
        <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
          {data[2]?.icon}
        </div>
        <div className="flex flex-col ltr:pl-3 rtl:pr-3 ltr:2xl:pl-4 rtl:2xl:pr-4">
          <h5 className="text-sm font-bold text-heading">
            {t(`common:${data[2]?.name}`)}
          </h5>
          <span
            style={{ unicodeBidi: "bidi-override" }}
            className="text-sm mt-0"
          >
            {res?.Title}
          </span>
        </div>
      </div>
      <Image
        src={mapImage}
        alt={t("text-map")}
        className="rounded-md"
        unoptimized
      />
    </div>
  );
};

export default ContactInfoBlock;
