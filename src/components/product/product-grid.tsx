import ProductCard from "@components/product/product-card";
import { useEffect, useState, useRef, type FC } from "react";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { prdoucstWithpages, Product } from "src/api/type";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

interface ProductGridProps {
  className?: string;
  data: prdoucstWithpages;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "", data }) => {
  const router = useRouter();
  const path = usePathname();
  const { query } = router;
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState<number>(Number(query.page) || 1);
  const [load, setLoad] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (query.page) {
      setPageSize(Number(query.page));
    }
  }, [query.page]);

  useEffect(() => {
    if (load) {
      setAllProducts((prevProducts) => [
        ...prevProducts,
        ...(data?.products ?? []),
      ]);
      setLoad(false);
    } else {
      setAllProducts(data?.products ?? []);
    }
  }, [data?.products]);

  const totalPages = Math.ceil(data?.pages / 20);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pageSize < totalPages && !load) {
          setLoad(true);
          router.replace(
            {
              pathname: `/${path}`,
              query: {
                ...query,
                page: pageSize + 1,
              },
            },
            undefined,
            { scroll: false }
          );
        }
      },
      {
        root: null,
        threshold: 0.0,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [pageSize, totalPages, load, query, router, path]);

  return (
    <>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
        {!allProducts?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          allProducts?.map((product) => (
            <ProductCard
              key={`product--key${product.ID}`}
              product={product}
              variant="grid"
            />
          ))
        )}
      </div>

      <div ref={loadMoreRef} className="h-10"></div>
    </>
  );
};
