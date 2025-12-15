import Footer from './components/Footer/Footer';
import './globals.css';

export const metadata = {
  title: 'Les Petits Plats',
  description: 'Découvrez nos recettes du quotidien, simples et délicieuses',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}