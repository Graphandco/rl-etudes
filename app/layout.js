import { Noto_Sans, Epilogue } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import Footer from "@/components/footer/Footer";
import MatomoAnalytics from "@/components/MatomoAnalytics";
import { Suspense } from "react";
import { getWordpressContent } from "@/actions/getWordpressContent";

const notoSans = Noto_Sans({
   variable: "--font-noto-sans",
   subsets: ["latin"],
});

const epilogue = Epilogue({
   variable: "--font-epilogue",
   subsets: ["latin"],
});

export async function generateMetadata() {
   const data = await getWordpressContent({ id: 2, type: "page" });

   const cleanDescription = (
      data.seo.metaDesc || "RL Études - Bureau d'études près de Colmar"
   )
      .replace(/[#*]/g, "")
      .slice(0, 160);

   return {
      title: data.seo.title || `${data.title} - RL Études`,
      description: cleanDescription,
      openGraph: {
         title: data.seo.title || `${data.title} - RL Études`,
         description: cleanDescription,
         url: "https://rletudes.fr",
         type: "website",
         siteName: "RL Études",
      },
   };
}

export default function RootLayout({ children }) {
   return (
      <html lang="fr">
         <body
            className={`${notoSans.variable} ${epilogue.variable} antialiased`}
            suppressHydrationWarning={true}
         >
            <ViewTransitions>
               <HeaderWrapper />
               <main style={{ viewTransitionName: "main" }}>{children}</main>
               <Footer style={{ viewTransitionName: "footer" }} />
            </ViewTransitions>
            <Suspense fallback={null}>
               <MatomoAnalytics />
            </Suspense>
         </body>
      </html>
   );
}
