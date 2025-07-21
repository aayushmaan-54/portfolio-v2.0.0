import type { Metadata } from "next";
import { ThemeProvider } from '~/common/providers/theme-provider';
import { Calistoga, Geist_Mono, Lexend } from "next/font/google";
import "./globals.css";
import Header from "~/common/components/header";
import Footer from "~/common/components/footer";
import FloatingDockNavbar from "~/common/components/floating-dock-navbar";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"



export const metadata: Metadata = {
  metadataBase: new URL("https://www.aayushmaan.me"),
  title: {
    default: "Aayushmaan Soni | Full Stack Web Developer",
    template: "%s | Aayushmaan Soni",
  },
  description:
    "Hi, I'm Aayushmaan Soni, a passionate Full Stack Web Developer specializing in modern JavaScript frameworks and creating innovative web applications. Explore my projects, skills, and journey in web development.",
  icons: {
    icon: "/memoji.ico",
  },
  openGraph: {
    title: "Aayushmaan Soni | Full Stack Web Developer",
    description:
      "Hi, I'm Aayushmaan Soni, a passionate Full Stack Web Developer specializing in modern JavaScript frameworks and creating innovative web applications. Explore my projects, skills, and journey in web development.",
    url: "https://www.aayushmaan.me",
    siteName: "Aayushmaan Soni",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aayushmaan Soni Portfolio",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayushmaan Soni | Full Stack Web Developer",
    description:
      "Hi, I'm Aayushmaan Soni, a passionate Full Stack Web Developer specializing in modern JavaScript frameworks and creating innovative web applications. Explore my projects, skills, and journey in web development.",
    images: ["/og-image.png"],
    creator: "@aayushmaan5oni",
    site: "@aayushmaan5oni",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
    yandex: "",
  },
  alternates: {
    canonical: "https://www.aayushmaan.me",
  },
  authors: [{ name: "Aayushmaan Soni", url: "https://www.aayushmaan.me" }],
  keywords: [
    "Full Stack Developer",
    "Web Development",
    "Portfolio",
    "MERN",
    "Next.js",
    "React",
    "JavaScript",
    "Freelancer",
    "Software Engineer",
  ],
};


const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-lexend',
});

const calistoga = Calistoga({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-calistoga',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-geist-mono',
})


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${lexend.className}
          ${lexend.variable} ${calistoga.variable} ${geistMono.variable}
          antialiased bg-primary-1 text-accent-3 transition-all ease-in-out
          flex flex-col min-h-screen
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          <Toaster position="top-center" />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingDockNavbar />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
