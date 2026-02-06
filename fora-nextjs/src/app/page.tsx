import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faComments,
  faCalculator,
  faIndustry,
  faCogs,
  faPalette,
  faDraftingCompass,
  faFire,
  faSyncAlt,
  faCog,
  faCut,
  faSprayCan,
  faCheckCircle,
  faBox,
  faPills,
  faHospital,
  faMicrochip,
  faUtensils,
  faFilePdf,
  faCube,
  faListAlt,
  faBook,
  faCertificate,
  faArrowRight,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Производство алюминиевых соединительных элементов для чистых помещений',
  description: 'Производство алюминиевых соединительных элементов для чистых помещений. Угловые соединители R50/R70, заглушки. Полный цикл от отливки до порошковой окраски.',
  alternates: {
    canonical: '/',
  },
};

const categories = [
  {
    href: '/catalog?category=corner-inner',
    image: '/Create_a_professional_product_photography_composit-1769874922647.png',
    alt: 'Угловые соединители для скругляющего профиля R50/R70 для внутренних углов',
    title: 'Соединители для внутренних углов',
    description: 'Угловые соединители для скругляющего профиля R50/R70',
  },
  {
    href: '/catalog?category=caps',
    image: '/plug50.png',
    alt: 'Торцевые заглушки для профилей R50 и R70',
    title: 'Заглушки торцевые',
    description: 'Торцевые заглушки для профилей R50 и R70',
  },
  {
    href: '/catalog?category=corner-outer',
    image: '/outer-corner70.png',
    alt: 'Угловые соединители для скругляющего профиля R50/R70 для внешних углов',
    title: 'Соединители для внешних углов',
    description: 'Угловые соединители для скругляющего профиля R50/R70',
  },
  {
    href: '/catalog?category=linoleum',
    image: '/internal-angle70.png',
    alt: 'Угловой соединитель внутренний R70',
    title: 'Соединители с заведением линолеума',
    description: 'Для профилей R50/R70',
  },
];

const advantages = [
  {
    icon: faIndustry,
    title: 'Собственное производство',
    description: 'Полный цикл от отливки до упаковки на собственных мощностях',
  },
  {
    icon: faCogs,
    title: 'Точность ЧПУ',
    description: 'Токарная и фрезерная обработка на современных станках с ЧПУ',
  },
  {
    icon: faPalette,
    title: 'Любые цвета RAL',
    description: 'Порошковая окраска в заводских условиях по каталогу RAL',
  },
  {
    icon: faDraftingCompass,
    title: 'Индивидуальные размеры',
    description: 'Работа по чертежам заказчика, нестандартные радиусы',
  },
];

const processSteps = [
  { number: 1, icon: faFire, title: 'Отливка', description: 'Литье алюминиевых заготовок' },
  { number: 2, icon: faSyncAlt, title: 'Токарная обработка', description: 'Обработка на станках ЧПУ' },
  { number: 3, icon: faCog, title: 'Фрезеровка', description: 'Создание радиусных форм' },
  { number: 4, icon: faCut, title: 'Нарезка', description: 'Подгонка размеров' },
  { number: 5, icon: faSprayCan, title: 'Окраска', description: 'Порошковое покрытие' },
  { number: 6, icon: faCheckCircle, title: 'Контроль', description: 'Проверка качества' },
  { number: 7, icon: faBox, title: 'Упаковка', description: 'Готово к отгрузке' },
];

const industries = [
  {
    icon: faPills,
    title: 'Фармацевтика',
    description: 'Чистые помещения для производства лекарственных препаратов, соответствие стандартам GMP',
  },
  {
    icon: faHospital,
    title: 'Медицина',
    description: 'Операционные блоки, процедурные кабинеты, стерильные зоны медицинских учреждений',
  },
  {
    icon: faMicrochip,
    title: 'Микроэлектроника',
    description: 'Производственные помещения для выпуска электронных компонентов и микросхем',
  },
  {
    icon: faUtensils,
    title: 'Пищевая промышленность',
    description: 'Цеха для производства продуктов питания с повышенными требованиями к гигиене',
  },
];

const stats = [
  { value: '7+', label: 'лет на рынке' },
  { value: '500+', label: 'реализованных проектов' },
  { value: '100%', label: 'собственное производство' },
  { value: '1 неделя', label: 'типовой срок изготовления' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Производство алюминиевых соединительных элементов для скругляющих профилей в чистых помещениях</h1>
              <p className="hero-subtitle">
                Полный цикл от отливки до порошковой окраски. Угловые соединители, заглушки и индивидуальные
                решения для фармацевтики, медицины, пищевой промышленности.
              </p>
              <div className="hero-buttons">
                <Link href="#" className="btn btn-primary">
                  <FontAwesomeIcon icon={faDownload} /> Скачать каталог PDF
                </Link>
                <Link href="/contacts" className="btn btn-outline">
                  <FontAwesomeIcon icon={faComments} /> Получить консультацию
                </Link>
                <Link href="/calculator" className="btn btn-outline">
                  <FontAwesomeIcon icon={faCalculator} /> Рассчитать заказ
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bg-decoration" />
      </section>

      {/* Advantages Section */}
      <section className="advantages-section">
        <div className="container">
          <h2 className="section-title">Наши преимущества</h2>
          <div className="advantages-grid">
            {advantages.map((adv, index) => (
              <div key={index} className="advantage-card">
                <div className="advantage-icon">
                  <FontAwesomeIcon icon={adv.icon} />
                </div>
                <h3>{adv.title}</h3>
                <p>{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Популярные категории продукции</h2>
          <div className="categories-grid">
            {categories.map((cat, index) => (
              <Link key={index} href={cat.href} className="category-card">
                <div className="category-icon">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    width={100}
                    height={100}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="category-info">
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <ul className="category-features">
                    <li><FontAwesomeIcon icon={faCheck} /> Для R50 / R70</li>
                    <li><FontAwesomeIcon icon={faCheck} /> Алюминий АД31</li>
                    <li><FontAwesomeIcon icon={faCheck} /> Порошковая окраска</li>
                  </ul>
                  <span className="category-link">
                    Перейти в каталог <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="production-process">
        <div className="container">
          <h2 className="section-title">Производственный цикл</h2>
          <div className="process-timeline">
            {processSteps.map((step) => (
              <div key={step.number} className="process-step">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          <div className="process-cta">
            <Link href="/production" className="btn btn-primary">
              <FontAwesomeIcon icon={faIndustry} /> Подробнее о производстве
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="industries-section">
        <div className="container">
          <h2 className="section-title">Для кого мы производим</h2>
          <div className="industries-grid">
            {industries.map((ind, index) => (
              <div key={index} className="industry-card">
                <div className="industry-icon">
                  <FontAwesomeIcon icon={ind.icon} />
                </div>
                <h3>{ind.title}</h3>
                <p>{ind.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Preview */}
      <section className="documentation-preview">
        <div className="container">
          <div className="doc-content">
            <div className="doc-text">
              <h2>Техническая документация доступна</h2>
              <ul className="doc-list">
                <li><FontAwesomeIcon icon={faFilePdf} /> Чертежи в PDF и DWG</li>
                <li><FontAwesomeIcon icon={faCube} /> 3D-модели в STEP</li>
                <li><FontAwesomeIcon icon={faListAlt} /> Спецификации и ТХ</li>
                <li><FontAwesomeIcon icon={faBook} /> Монтажные инструкции</li>
                <li><FontAwesomeIcon icon={faCertificate} /> Сертификаты соответствия</li>
              </ul>
              <Link href="/documentation" className="btn btn-primary">
                <FontAwesomeIcon icon={faDownload} /> Скачать технические файлы
              </Link>
            </div>
            <div className="doc-visual">
              <div className="doc-preview-card">
                <FontAwesomeIcon icon={faFilePdf} />
                <span>Каталог 2026</span>
              </div>
              <div className="doc-preview-card">
                <FontAwesomeIcon icon={faDraftingCompass} />
                <span>Чертежи DWG</span>
              </div>
              <div className="doc-preview-card">
                <FontAwesomeIcon icon={faCube} />
                <span>3D модели</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Request */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Быстрый запрос коммерческого предложения</h2>
            <p>Заполните форму и получите КП в течение 2 часов</p>
            <div className="cta-buttons">
              <Link href="/contacts" className="btn btn-primary">
                Оставить заявку
              </Link>
              <Link href="/catalog" className="btn btn-outline">
                Перейти в каталог
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
