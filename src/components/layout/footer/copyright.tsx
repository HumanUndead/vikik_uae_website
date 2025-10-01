import Container from "@components/ui/container";
import { useTranslation } from "next-i18next";
import { AiOutlineArrowUp } from "react-icons/ai";
import cn from "classnames";
import Link from "@components/ui/link";
import Image from "next/image";

interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
  variant?: "contemporary";
}

const Copyright: React.FC<CopyrightProps> = ({ payment, variant }) => {
  const { t } = useTranslation("footer");
  return (
    <div className="pt-5 pb-16 mb-2 border-t border-gray-300 sm:pb-20 md:pb-5 sm:mb-0">
      <Container
        className={cn(
          "flex flex-col-reverse md:flex-row text-center md:justify-between",
          {
            "items-center": variant === "contemporary",
          }
        )}
      >
        <p
          className={cn("text-body text-xs lg:text-sm leading-6", {
            "p-0 m-0": variant === "contemporary",
          })}
        >
          Powerd By &nbsp;
          <a
            href="https://www.kensoftware.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            title={t("link-ken-software")}
          >
            <Image
              src="/assets/images/ken.png"
              alt="Ken Software - Web Development & Software Solutions"
              width={130}
              height={130}
              priority
              className="object-contain inline-block cursor-pointer hover:opacity-80 transition-opacity"
            />
          </a>
        </p>

        {payment && (
          <ul className="flex-wrap items-center justify-center hidden mx-auto mb-1 md:flex gap-x-4 xs:gap-x-5 lg:gap-x-7 md:mb-0 md:mx-0">
            {payment?.map((item) => (
              <li
                className="mb-2 transition md:mb-0 hover:opacity-80"
                key={`payment-list--key${item.id}`}
              >
                <a href={item.path ? item.path : "/#"} target="_blank">
                  <img
                    src={item.image}
                    alt={t(`${item.name}`)}
                    height={item.height}
                    width={item.width}
                  />
                </a>
              </li>
            ))}
          </ul>
        )}

        {variant === "contemporary" && (
          <p className="text-sm font-semibold leading-[19px] text-[#212121] cursor-pointer">
            <Link href="#siteHeader">Scroll to top</Link>

            <AiOutlineArrowUp className="inline ltr:ml-3 rtl:mr-3" />
          </p>
        )}
      </Container>
    </div>
  );
};

export default Copyright;
