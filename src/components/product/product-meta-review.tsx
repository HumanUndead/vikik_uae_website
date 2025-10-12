import { useState } from "react";
import { Collapse } from "@components/common/accordion";
import ReviewForm from "@components/common/form/review-form";
import Cookies from "js-cookie";

interface Props {
  data: any;
  productId: number;
}

const ProductMetaReview: React.FC<Props> = ({ data, productId }) => {
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <>
      {data?.map((item: any, index: any) => (
        <Collapse
          i={index}
          key={item.title}
          title={"Review"}
          translatorNS="review"
          content={item}
          expanded={expanded}
          setExpanded={setExpanded}
          variant="transparent"
        />
      ))}
      <ReviewForm productId={productId} />
    </>
  );
};

export default ProductMetaReview;
