import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsappButton from './components/WhatsappButton';
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "Tejo Surya Foundation",
  description: "Empowering girls and women through menstrual health education and community support.",
  keywords: [
    "Tejo Surya Foundation",
    "NGO",
    "Non-profit",
    "Menstrual Health",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Tejo Surya Foundation",
    description: "Empowering girls and women through menstrual health education and community support.",
    url: "https://devtoolboxvvsg.vercel.app/",
    siteName: "Tejo Surya Foundation",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "DevToolbox"
      }
    ],
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning={true}>
      <body className="min-h-screen flex flex-col">
          <Navbar /> {/* Assuming Navbar is imported in the layout file */}
          <main className="flex-grow">{children}</main>
          <Footer /> {/* Assuming Footer is imported in the layout file */}
          <WhatsappButton/>
      </body>
    </html>
  );
}
