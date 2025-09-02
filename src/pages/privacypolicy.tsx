import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { privacyPolicy } from "@settings/privacy-settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { getLocaleId } from "@utils/locale-mapping";
import { GetPages } from "src/api/routs";
import Head from "next/head";
import { stripHTML } from "@utils/convertHtml";

export default function PrivacyPage({ privacy }: any) {
  const { t } = useTranslation("privacy");
  return (
    <>
      <Head>
        <title>{privacy?.Label}</title>
        <meta name="description" content={stripHTML(privacy?.Text)} />
      </Head>
      <PageHeader pageHeader="text-page-privacy-policy" />
      <div className="px-4 mt-12 border-b border-gray-300 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
        <Container>
          <div className="flex flex-col md:flex-row">
            <div className="pt-0 md:w-9/12 ltr:md:pl-8 rtl:md:pr-8 lg:pt-2">
              <Element className="mb-10">
                <div
                  className="text-sm leading-7 text-heading lg:text-base lg:leading-loose"
                  dangerouslySetInnerHTML={{
                    __html: t(`${privacy?.Text}`),
                  }}
                />
              </Element>
            </div>
            {/* End of content */}
          </div>
        </Container>
      </div>
    </>
  );
}

PrivacyPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const lang = getLocaleId(locale);
  const privacy = await GetPages("10013", lang);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "privacy",
        "footer",
      ])),
      privacy: privacy,
    },
  };
};
