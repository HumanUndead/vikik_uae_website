import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import DeletedAccount from "@components/my-account/account-deleted";

export default function AccountDetailsPage() {
  return <DeletedAccount />;
}

AccountDetailsPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
