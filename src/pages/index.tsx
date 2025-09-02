import Container from "@components/ui/container";
import CategoryBlock from "@containers/category-block";
import Layout from "@components/layout/layout";
import Divider from "@components/ui/divider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { GetCategory } from "src/api/routs";
import { getLocaleId } from "@utils/locale-mapping";
import IconsHome from "@containers/icons-home";
import Head from "next/head";
import { useTranslation } from "react-i18next";

export default function Home({ category }: { category: any }) {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("text-vikik")}</title>
        <meta
          name="description"
          content="Shop the latest dresses, tops, and abayas at Vikik. Enjoy exclusive offers, loyalty points, and fast delivery across Jordan from our online fashion store"
        />
      </Head>
      <Container>
        <CategoryBlock
          sectionHeading="text-shop-by-category"
          type="rounded"
          data={category}
        />
        <IconsHome />
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const localeId = getLocaleId(locale);
  const category = await GetCategory(localeId);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      category,
    },
  };
};
