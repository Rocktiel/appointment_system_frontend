import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/ReduxProvider";
import Script from "next/script";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Randevu Sistemi | İşletmeler İçin Online Randevu",
  description:
    "İşletmeniz için kolay ve hızlı online randevu sistemi. Müşterilerinize 7/24 randevu alma imkanı sunun.",
};
// export const metadata: Metadata = {
//   title: {
//     default: "Randevu Sistemi | İşletmeler İçin Online Randevu", // Varsayılan başlık
//     template: "%s | Randevu Sistemi", // Dinamik sayfa başlıkları için şablon
//   },
//   description:
//     "İşletmeniz için kolay ve hızlı online randevu sistemi. Müşterilerinize 7/24 randevu alma imkanı sunun.",

//   keywords: [
//     "randevu",
//     "online randevu",
//     "işletme randevu",
//     "randevu sistemi",
//     "hizmet randevusu",
//   ],
//   authors: [{ name: "Şirket Adı", url: "https://site.com" }],
//   metadataBase: new URL("https://site.com"),
//   openGraph: {
//     title: "Randevu Sistemi | İşletmeler İçin Online Randevu",
//     description:
//       "İşletmeniz için kolay ve hızlı online randevu sistemi. Müşterilerinize 7/24 randevu alma imkanı sunun.",
//     url: "https://www.sizinuygulamaniz.com", // Kendi domain'iniz
//     siteName: "Randevu Sistemi",
//     images: [
//       {
//         url: "https://www.sizinuygulamaniz.com/og-image.jpg", // Paylaşılacak görsel
//         width: 1200,
//         height: 630,
//         alt: "Randevu Sistemi",
//       },
//     ],
//     locale: "tr_TR",
//     type: "website",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_Maps_API_KEY}&v=weekly&libraries=marker,places`}
          strategy="beforeInteractive"
        />
        {/* <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'"
        />

        {/* XSS Koruma */}
        {/* <meta httpEquiv="X-XSS-Protection" content="1; mode=block" /> */}

        {/* Clickjacking Koruma */}
        {/* <meta httpEquiv="X-Frame-Options" content="DENY" /> */}

        {/* <meta name="application-name" content="Uygulama Adı" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Uygulama Adı" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />  */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Toaster position="top-right" richColors closeButton />
          {/* <NextTopLoader color="#29D" height={3} showSpinner={false} /> */}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
