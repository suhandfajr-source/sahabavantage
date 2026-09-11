import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import WhatsAppAdvisor from '@/components/ui/WhatsAppAdvisor';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sahabavantage.com'),
  title: 'Sahaba Vantage Estates | Live Better — Architectural Luxury Real Estate',
  description: 'Sahaba Vantage Estates crafts timeless, architectural sanctuaries and sustainable hillside residences across Bogor, Bandung, and South Jakarta.',
  keywords: [
    'Sahaba Vantage Estates',
    'Luxury Real Estate Indonesia',
    'Vantage Residence Bogor',
    'Vantage Sanctuary Bandung',
    'The Grand Vantage Jakarta',
    'Architectural Homes',
    'Quiet Luxury'
  ],
  authors: [{ name: 'Sahaba Vantage Estates' }],
  openGraph: {
    title: 'Sahaba Vantage Estates | The Vantage Journey',
    description: 'A digital walk through better living. Discover timeless architectural estates designed for life in balance.',
    url: 'https://sahabavantage.com',
    siteName: 'Sahaba Vantage Estates',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="bg-[#F8F6F1] text-[#0B1D3A] antialiased selection:bg-[#0B1D3A] selection:text-[#C7A66A]">
        {/* Custom Architectural Follower Cursor */}
        <CustomCursor />

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Main Application Container */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Floating Concierge / WhatsApp Advisor */}
        <WhatsAppAdvisor />

        {/* Global Editorial Footer */}
        <Footer />
      </body>
    </html>
  );
}
