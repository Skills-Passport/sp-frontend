import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Skills Passport',
  description: 'Generated by create next app',
}

export default async function RootLayout({children, params: {locale}}: {children: React.ReactNode, params: {locale: string};}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${nunito.className} text-gray-900 antialiased`}>
         <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}