import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import PageHeader from "@components/ui/page-header";
import ContactForm from "@components/common/form/contact-form";
import ContactInfoBlock from "@containers/contact-info";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { GetPages } from "src/api/routs";
import { getLocaleId } from "@utils/locale-mapping";
import Head from "next/head";

export default function ContactUsPage({ res }: any) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{res?.Label}</title>
      </Head>
      <PageHeader pageHeader="text-page-contact-us" />
      <Container>
        <div className="my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
          <div className="md:w-full lg:w-2/5 2xl:w-2/6 flex flex-col h-full">
            <ContactInfoBlock res={res} />
          </div>
          <div className="md:w-full lg:w-3/5 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7">
            <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
              <h4 className="text-2xl 2xl:text-3xl font-bold text-heading">
                {t("text-get-in-touch")}
              </h4>
            </div>
            <ContactForm />
          </div>
        </div>
        <Subscription />
      </Container>
    </>
  );
}

ContactUsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const lang = getLocaleId(locale);
  const res = await GetPages("10015", lang);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      res: res,
    },
  };
};
