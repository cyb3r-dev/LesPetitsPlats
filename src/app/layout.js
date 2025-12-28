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
      </body>
    </html>
  );
}