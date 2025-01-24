import './globals.css';
import NavBar from './Components/NavBar';
import Carousel from './Components/Carousel';

export const metadata = {
  title: 'ART Music',
  description: 'Your one-stop shop for Rock CDs and Vinyls!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const featuredImages = [
    '/images/rock-album-1.jpg', // Ensure these paths are correct
    '/images/rock-album-2.jpg',
    '/images/rock-album-3.jpg',
  ];

  return (
    <html lang="en">
      <body>
        {/* NavBar */}
        <NavBar />
        {/* Carousel */}
        <Carousel images={featuredImages} />
        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
