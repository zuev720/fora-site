import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCube, faLayerGroup, faStop, faStopCircle, faMinusSquare,
  faFilePdf, faDownload, faChevronDown, faTable, faListAlt,
  faBook, faTools, faAward, faCertificate, faClipboardCheck, faShieldAlt, faArchive
} from '@fortawesome/free-solid-svg-icons';
import DocumentAccordion from './DocumentAccordion';

export const metadata: Metadata = {
  title: 'Техническая документация | ООО "Фора" - Чертежи, 3D-модели, спецификации',
  description: 'Техническая документация для соединительных элементов. Чертежи PDF/DWG, 3D-модели STEP, спецификации, монтажные инструкции.',
  keywords: ['техническая документация', 'чертежи', '3D-модели', 'STEP', 'DWG', 'монтажные инструкции'],
  alternates: {
    canonical: '/documentation',
  },
  openGraph: {
    title: 'Техническая документация | ООО Фора',
    description: 'Чертежи, 3D-модели, спецификации и инструкции для специалистов',
    url: '/documentation',
  },
};

const documentCategories = [
  {
    title: 'Угловые соединители (внутренний угол)',
    icon: faCube,
    documents: [
      { name: 'Угловой соединитель R40 (внутренний угол)', size: '220 КБ', date: '15.01.2026' },
      { name: 'Угловой соединитель R50 (внутренний угол)', size: '245 КБ', date: '15.01.2026' },
      { name: 'Угловой соединитель R55 (внутренний угол)', size: '250 КБ', date: '15.01.2026' },
      { name: 'Угловой соединитель R70 (внутренний угол)', size: '260 КБ', date: '15.01.2026' }
    ]
  },
  {
    title: 'Угловые соединители (внешний угол)',
    icon: faCube,
    documents: [
      { name: 'Угловой соединитель R40 (внешний угол)', size: '225 КБ', date: '15.01.2026' },
      { name: 'Угловой соединитель R50 (внешний угол)', size: '230 КБ', date: '15.01.2026' },
      { name: 'Угловой соединитель R55 (внешний угол)', size: '248 КБ', date: '15.01.2026' },
      { name: 'Угловой соединитель R65 (внешний угол)', size: '255 КБ', date: '15.01.2026' },
      { name: 'Угловой соединитель R70 (внешний угол)', size: '265 КБ', date: '15.01.2026' }
    ]
  },
  {
    title: 'Угловые соединители с заводом под линолеум',
    icon: faLayerGroup,
    documents: [
      { name: 'Угловой соединитель R50 (внутренний угол) под линолеум', size: '280 КБ', date: '15.01.2026' },
      { name: 'Угловой соединитель R50 (внешний угол) под линолеум', size: '275 КБ', date: '15.01.2026' },
      { name: 'Угловой соединитель R70 (внутренний угол) под линолеум', size: '295 КБ', date: '15.01.2026' },
      { name: 'Угловой соединитель R70 (внешний угол) под линолеум', size: '290 КБ', date: '15.01.2026' }
    ]
  },
  {
    title: 'Заглушки торцевые',
    icon: faStop,
    documents: [
      { name: 'Заглушка торцевая R40', size: '135 КБ', date: '15.01.2026' },
      { name: 'Заглушка торцевая R50', size: '145 КБ', date: '15.01.2026' },
      { name: 'Заглушка торцевая R55', size: '150 КБ', date: '15.01.2026' },
      { name: 'Заглушка торцевая R70', size: '155 КБ', date: '15.01.2026' }
    ]
  },
  {
    title: 'Заглушки торцевые с заводом под линолеум',
    icon: faStop,
    documents: [
      { name: 'Заглушка торцевая R50 под линолеум', size: '165 КБ', date: '15.01.2026' },
      { name: 'Заглушка торцевая R70 под линолеум', size: '175 КБ', date: '15.01.2026' }
    ]
  },
  {
    title: 'Заглушки торцевые тупоконечные',
    icon: faStopCircle,
    documents: [
      { name: 'Заглушка торцевая тупоконечная R50', size: '140 КБ', date: '15.01.2026' },
      { name: 'Заглушка торцевая тупоконечная R70', size: '150 КБ', date: '15.01.2026' }
    ]
  },
  {
    title: 'Заглушки торцевые плоские',
    icon: faMinusSquare,
    documents: [
      { name: 'Заглушка торцевая плоская R40', size: '125 КБ', date: '15.01.2026' },
      { name: 'Заглушка торцевая плоская R50', size: '130 КБ', date: '15.01.2026' }
    ]
  }
];

const models3D = [
  { icon: faCube, title: 'Угловые соединители R40', desc: 'Комплект 3D-моделей внутренних и внешних углов R40' },
  { icon: faCube, title: 'Угловые соединители R50', desc: 'Комплект 3D-моделей внутренних и внешних углов R50' },
  { icon: faCube, title: 'Угловые соединители R55', desc: 'Комплект 3D-моделей внутренних и внешних углов R55' },
  { icon: faCube, title: 'Угловые соединители R65', desc: '3D-модель внешнего угла R65' },
  { icon: faCube, title: 'Угловые соединители R70', desc: 'Комплект 3D-моделей внутренних и внешних углов R70' },
  { icon: faLayerGroup, title: 'Угловые соединители под линолеум', desc: '3D-модели угловых соединителей R50 и R70 под линолеум' },
  { icon: faStop, title: 'Заглушки торцевые', desc: '3D-модели заглушек R40, R50, R55, R70' },
  { icon: faStop, title: 'Заглушки под линолеум', desc: '3D-модели заглушек R50 и R70 под линолеум' },
  { icon: faStopCircle, title: 'Заглушки тупоконечные', desc: '3D-модели тупоконечных заглушек R50 и R70' },
  { icon: faMinusSquare, title: 'Заглушки плоские', desc: '3D-модели плоских заглушек R40 и R50' }
];

const specifications = [
  { icon: faTable, name: 'Таблица размеров всех соединительных элементов', meta: 'PDF • 620 КБ • Сводная таблица размеров R40, R50, R55, R65, R70' },
  { icon: faListAlt, name: 'Технические характеристики продукции', meta: 'PDF • 480 КБ • Допуски, материалы, покрытия' },
  { icon: faBook, name: 'Инструкция по монтажу угловых соединителей', meta: 'PDF • 1.2 МБ • Пошаговое руководство с иллюстрациями' },
  { icon: faBook, name: 'Инструкция по монтажу соединителей под линолеум', meta: 'PDF • 1.1 МБ • Пошаговое руководство с иллюстрациями' },
  { icon: faBook, name: 'Инструкция по установке заглушек', meta: 'PDF • 850 КБ • Руководство для всех типов заглушек' },
  { icon: faTools, name: 'Рекомендации по выбору крепежа', meta: 'PDF • 450 КБ • Типы крепежа и рекомендации по применению' }
];

const certificates = [
  { icon: faAward, name: 'Сертификат ISO 9001:2015', meta: 'PDF • 1.5 МБ • Действителен до 12.2027' },
  { icon: faCertificate, name: 'Сертификат соответствия ГОСТ Р', meta: 'PDF • 890 КБ • Действителен до 06.2027' },
  { icon: faClipboardCheck, name: 'Протоколы испытаний материалов', meta: 'PDF • 720 КБ • Лабораторные испытания алюминиевого сплава' },
  { icon: faShieldAlt, name: 'Санитарно-эпидемиологическое заключение', meta: 'PDF • 1.1 МБ • Применение в чистых помещениях' }
];

export default function DocumentationPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Главная</Link>
            <span>/</span>
            <span>Техническая документация</span>
          </div>
          <h1 className="page-title">Техническая документация</h1>
          <p className="page-subtitle">
            Чертежи, 3D-модели, спецификации и инструкции для специалистов
          </p>
        </div>
      </section>

      {/* Full Catalog Download */}
      <section className="content-section">
        <div className="container">
          <div className="catalog-download-banner">
            <div>
              <h2 style={{ color: 'white', marginBottom: '10px' }}>Полный каталог продукции 2026</h2>
              <p style={{ margin: 0, opacity: 0.9 }}>Вся линейка продукции, технические характеристики, таблицы размеров</p>
            </div>
            <a href="#" className="btn" style={{ background: 'white', color: 'var(--primary-color)' }}>
              <FontAwesomeIcon icon={faDownload} /> Скачать PDF (12 МБ)
            </a>
          </div>
        </div>
      </section>

      {/* Documents by Category */}
      <section className="content-section alt-bg">
        <div className="container">
          <div className="section-header">
            <h2>Чертежи продукции</h2>
            <p>Чертежи в форматах PDF и DWG для всех типов соединительных элементов</p>
          </div>

          <DocumentAccordion categories={documentCategories} />
        </div>
      </section>

      {/* 3D Models */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>3D-модели</h2>
            <p>Модели в форматах STEP и IGES для интеграции в ваши проекты</p>
          </div>

          <div className="cards-grid">
            {models3D.map((model, index) => (
              <div key={index} className="info-card">
                <div className="info-card-icon">
                  <FontAwesomeIcon icon={model.icon} />
                </div>
                <h3>{model.title}</h3>
                <p>{model.desc}</p>
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                  <a href="#" className="btn btn-outline btn-sm">
                    <FontAwesomeIcon icon={faDownload} /> STEP
                  </a>
                  <a href="#" className="btn btn-outline btn-sm">
                    <FontAwesomeIcon icon={faDownload} /> IGES
                  </a>
                </div>
              </div>
            ))}
            <div className="info-card">
              <div className="info-card-icon">
                <FontAwesomeIcon icon={faArchive} />
              </div>
              <h3>Полный архив 3D</h3>
              <p>Все 3D-модели в одном архиве</p>
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <a href="#" className="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={faDownload} /> Скачать всё (58 МБ)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications & Instructions */}
      <section className="content-section alt-bg">
        <div className="container">
          <div className="section-header">
            <h2>Спецификации и инструкции</h2>
          </div>

          <div className="documents-list" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {specifications.map((spec, index) => (
              <div key={index} className="document-item">
                <div className="document-icon">
                  <FontAwesomeIcon icon={spec.icon} />
                </div>
                <div className="document-info">
                  <div className="document-name">{spec.name}</div>
                  <div className="document-meta">{spec.meta}</div>
                </div>
                <a href="#" className="document-download">
                  <FontAwesomeIcon icon={faDownload} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Сертификаты и разрешительные документы</h2>
          </div>

          <div className="documents-list" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {certificates.map((cert, index) => (
              <div key={index} className="document-item">
                <div className="document-icon" style={{ background: '#e8f5e9', color: '#28a745' }}>
                  <FontAwesomeIcon icon={cert.icon} />
                </div>
                <div className="document-info">
                  <div className="document-name">{cert.name}</div>
                  <div className="document-meta">{cert.meta}</div>
                </div>
                <a href="#" className="document-download">
                  <FontAwesomeIcon icon={faDownload} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
