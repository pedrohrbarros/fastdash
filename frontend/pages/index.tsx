import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Login() {

  const { t } = useTranslation('login')

  return (
    <main>
      <h1>{t('Test')}</h1>
    </main>
  )
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'login',
      ])),
      // Will be passed to the page component as props
    },
  }
}