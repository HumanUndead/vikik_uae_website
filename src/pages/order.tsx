import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import PageHeader from "@components/ui/page-header";
import OrderInformation from "@components/order/order-information";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

export default function Order({ order }: any) {
  return (
    <>
      <PageHeader pageHeader="text-page-order" />
      <Container>
        <OrderInformation orderId={order} />
      </Container>
    </>
  );
}

Order.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { locale, query } = props;

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      order: query.order,
    },
  };
};
