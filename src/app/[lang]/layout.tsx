import { NextIntlClientProvider } from 'next-intl';
import { Header } from "../../features/site-header/Header";
// import { Flyout } from "../../widgets/selected-items-flyout/Flyout";


export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rick & Morty</title>
      </head>
      <body className="dark flex min-h-screen min-w-[320px] items-center m-0">
        <div id="root" className="max-w-[1280px] mx-auto p-8 w-full text-center">
          <div className="min-h-screen bg-bg text-text-primary">
            <NextIntlClientProvider>
               <Header />
            {children}
            {/* <Flyout /> */}
            </NextIntlClientProvider>
          </div>
        </div>
      </body>
    </html>

  );
}
