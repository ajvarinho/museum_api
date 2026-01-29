import type { Metadata } from "next";
import { ImagesProvider } from '@/app/provider/ImageProvider';
import { Montserrat } from "next/font/google";
import "../globals.css";


const montserrat = Montserrat({
    variable: "--font-montserrat",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Metropolitan Museum",
  description: "Explore the works from Metropolitan Museum of Art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <ImagesProvider>
          {children}
        </ImagesProvider>
      </body>
    </html>
  );
}
