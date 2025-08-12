import '../scss/style.scss'; 
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata = {
  title: 'Amber'
};

interface LayoutProps {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {

  const res = await fetch('http://localhost:3001/categories');
  const categories = await res.json();

  return (
    <html lang="en">

      <body>
        <Header categories={categories} />
          <main>{children}</main>
        <Footer categories={categories}/>
      </body>
    </html>
  );
};
