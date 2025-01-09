// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'ART Music - E-commerce',
  description: 'The best place for music enthusiasts to find CDs and Vinyls.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="container">
          <h1>ART Music</h1>
        </header>
        <main>{children}</main>
        <footer className="container">
          <p>&copy; 2025 ART Music. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
