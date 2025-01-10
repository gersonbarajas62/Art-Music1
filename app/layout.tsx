import './globals.css';
import NavBar from "./Components/NavBar";

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
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
