import { CategoryFilter } from "./category-filter";
import { SizeFilter } from "./brand-filter";
import { FilteredItem } from "./filtered-item";
import { ColorFilter } from "./color-filter";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "next-i18next";

export const ShopFilters: React.FC = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { t } = useTranslation("common");

  const filteredQuery = Object.keys(query)
    .filter((key) => key !== "page")
    .reduce((acc, key) => {
      acc[key] = query[key];
      return acc;
    }, {} as Record<string, any>);

  return (
    <div className="pt-1">
      <div className="block border-b border-gray-300 pb-7 mb-7">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-semibold text-heading text-xl md:text-2xl">
            {t("text-filters")}
          </h2>
          <button
            className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading "
            aria-label="Clear All"
            onClick={() => {
              router.push(pathname);
            }}
          >
            {t("text-clear-all")}
          </button>
        </div>
        <div className="flex flex-wrap -m-1.5 pt-2">
          {!isEmpty(filteredQuery) &&
            Object.values(filteredQuery)
              .join(",")
              .split(",")
              .map((v, idx) => {
                const key = Object.keys(filteredQuery).find((k) => {
                  const values = String(filteredQuery[k]).split(",");
                  return values.some((item) => item == v);
                });

                return <FilteredItem itemKey={key!} itemValue={v} key={idx} />;
              })}
        </div>
      </div>

      <CategoryFilter />
      <SizeFilter />
      <ColorFilter />
    </div>
  );
};
