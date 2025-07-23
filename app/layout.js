import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col">
          <Navbar /> {/* Assuming Navbar is imported in the layout file */}
          <main className="flex-grow">{children}</main>
          <Footer /> {/* Assuming Footer is imported in the layout file */}
      </body>
    </html>
  );
}
