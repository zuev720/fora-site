import { Metadata } from 'next';
import Link from 'next/link';
import CatalogContent from './CatalogContent';

export const metadata: Metadata = {
  title: 'Каталог продукции',
  description: 'Каталог алюминиевых соединительных элементов для чистых помещений. Угловые соединители R40-R70, заглушки торцевые. Фильтрация по типу и радиусу.',
  keywords: ['каталог', 'угловые соединители', 'заглушки', 'R50', 'R70', 'чистые помещения'],
  alternates: {
    canonical: '/catalog',
  },
  openGraph: {
    title: 'Каталог продукции | ООО Фора',
    description: 'Каталог алюминиевых соединительных элементов для чистых помещений. Угловые соединители, заглушки.',
    url: '/catalog',
  },
};

export default function CatalogPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Главная</Link>
            <span>/</span>
            <span>Каталог продукции</span>
          </div>
          <h1>Каталог продукции</h1>
          <p className="page-description">
            Алюминиевые соединительные элементы для систем ограждения чистых помещений
          </p>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="catalog-section">
        <div className="container">
          <CatalogContent />
        </div>
      </section>
    </>
  );
}
