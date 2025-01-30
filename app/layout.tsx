import "./globals.css";
import SharedLayout from "../app/components/sharedLayout";

export const metadata = {
  title: "ART Music",
  description: "Your one-stop shop for Rock CDs and Vinyls!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SharedLayout>{children}</SharedLayout>
      </body>
    </html>
  );
}
