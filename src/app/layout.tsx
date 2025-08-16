import '../index.css'
import '../App.css';


export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
          {children}
        </div>
      </body>
    </html>

  )
}