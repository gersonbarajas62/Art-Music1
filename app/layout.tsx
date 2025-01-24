import './globals.css';
import Header from './Components/Header';
import Hero from './Components/Hero';
import Features from './Components/Features';
import Recommendations from './Components/Recommendations';
import GenresAndVinyls from './Components/GenresAndVinyls';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

export const metadata = {
  title: 'ART Music',
  description: 'Your one-stop shop for Rock CDs and Vinyls!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Hero />
        <Features />
        <Recommendations />
        <GenresAndVinyls />
        <Contact />
        <Footer />
        <main>{children}</main>
      </body>
    </html>
  );
}
