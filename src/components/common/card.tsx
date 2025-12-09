import Link from "@components/ui/link";
import Image from "next/image";
import Text from "@components/ui/text";
import { FaLink } from "react-icons/fa";
import { LinkProps } from "next/link";
import { useTranslation } from "next-i18next";

interface Props {
  item?: any;
  variant?: "rounded" | "circle";
  size?: "small" | "medium";
  imgSize?: "large";
  effectActive?: boolean;
  href?: LinkProps["href"];
  showName?: boolean;
  disableBorderRadius?: boolean;
}

const Card: React.FC<Props> = ({
  item,
  variant = "rounded",
  size = "small",
  effectActive = false,
  href,
  showName = true,
  imgSize,
  disableBorderRadius = false,
}) => {
  const { name, FullImagePath } = item ?? {};

  const { t } = useTranslation("common");
  return (
    <Link
      href={href}
      className="group flex justify-center text-center flex-col "
    >
      <div
        className={`relative inline-flex mb-3.5 md:mb-4 lg:mb-5 xl:mb-6 mx-auto rounded-full w-full`}
      >
        <div className="flex w-full h-[400px] md:h-[450px] min-[1600px]:h-[580px] ">
          <Image
            src={
              process.env.NEXT_PUBLIC_BASE_API_URL +
              FullImagePath +
              "_450X530.webp"
            }
            alt={name || t("text-card-thumbnail")}
            fill
            quality={100}
            unoptimized
            className={` bg-gray-300 object-cover ${
              !disableBorderRadius &&
              (variant === "rounded" ? "rounded-md" : "rounded-full")
            }`}
          />
        </div>
        {effectActive === true && (
          <>
            <div
              className={`absolute top left bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 ${
                !disableBorderRadius &&
                (variant === "rounded" ? "rounded-md" : "rounded-full")
              }`}
            />
            <div className="absolute top left h-full w-full flex items-center justify-center">
              <FaLink className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
            </div>
          </>
        )}
      </div>
      {!!showName !== false && (
        <Text variant="heading" className="capitalize">
          {name}
        </Text>
      )}
    </Link>
  );
};

export default Card;
