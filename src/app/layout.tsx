import '@shared/styles/styles-config.scss'; 
import Header from '@widgets/layouts/header/Header';
import Footer from '@widgets/layouts/footer/Footer';
import { getCategories } from '@entities/category/getCategories';




export const metadata = {
  title: 'Amber'
};


export default async function RootLayout({ children }: {children: React.ReactNode}) {

const categories = await getCategories();

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
