import type { Metadata } from "next";
import { ThemeProvider } from '~/common/providers/theme-provider';
import { Calistoga, Lexend } from "next/font/google";
import "./globals.css";
import Header from "~/common/components/header";
import Footer from "~/common/components/footer";
import FloatingDockNavbar from "~/common/components/floating-dock-navbar";



export const metadata: Metadata = {
  metadataBase: new URL('https://aayushmaan-soni.me'),
  title: {
    default: "Aayushmaan Soni | Full Stack Web Developer",
    template: "Aayushmaan Soni | %s",
  },
  description: "Hi, I'm Aayushmaan Soni, a passionate Full Stack Web Developer specializing in modern JavaScript frameworks and creating innovative web applications. Explore my projects, skills, and journey in web development.",
  icons: {
    icon: '/memoji.ico',
  },
  openGraph: {
    title: "Aayushmaan Soni | Full Stack Web Developer",
    description: "Explore my portfolio to learn more about my web development skills and projects.",
    images: ['og-image.png'],
  },
  keywords: ['Full Stack Developer', 'Web Development', 'Portfolio', 'MERN', 'Next.js'],
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${lexend.className}
          ${lexend.variable} ${calistoga.variable}
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
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingDockNavbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
