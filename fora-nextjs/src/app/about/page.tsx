import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, faCogs, faSprayCan, faExpandArrowsAlt, faStar,
  faGem, faHandshake, faLightbulb, faUsers, faShieldAlt, faChartLine,
  faCertificate, faAward, faClipboardCheck, faFlask,
  faPills, faHospital, faMicrochip, faUtensils,
  faPhone, faThLarge, faBuilding, faIndustry, faDownload
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'О компании | ООО "Фора" - 15 лет на рынке чистых помещений',
  description: 'ООО Фора - производитель алюминиевых соединительных элементов для чистых помещений. 15 лет опыта, собственное производство, 500+ реализованных проектов.',
  keywords: ['о компании', 'производство', 'чистые помещения', 'алюминиевые элементы', 'фармацевтика'],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'О компании | ООО Фора',
    description: '10 лет производим решения для чистых помещений',
    url: '/about',
  },
};

const stats = [
  { value: 10, suffix: '+', label: 'лет на рынке' },
  { value: 500, suffix: '+', label: 'реализованных проектов' },
  { value: 10, suffix: '', label: 'специалистов в команде' },
  { value: 100, suffix: '%', label: 'собственное производство' }
];

const history = [
  { year: '2016', icon: faRocket, title: 'Основание компании', desc: 'Начало деятельности в сфере производства комплектующих для чистых помещений. Первые заказы для местных фармацевтических предприятий.' },
  { year: '2017', icon: faCogs, title: 'Модернизация производства', desc: 'Приобретение первых станков с ЧПУ. Расширение номенклатуры продукции, выход на региональный рынок.' },
  { year: '2018', icon: faSprayCan, title: 'Собственная линия окраски', desc: 'Запуск собственного цеха порошковой окраски. Полный контроль качества на всех этапах производства.' },
  { year: '2019', icon: faExpandArrowsAlt, title: 'Расширение мощностей', desc: 'Увеличение производственных площадей до 1000 м². Закупка дополнительного оборудования с ЧПУ.' },
  { year: '2026', icon: faStar, title: 'Сегодня', desc: 'Более 500 реализованных проектов. Поставки по всей России. Признанный лидер в производстве соединительных элементов для чистых помещений.' }
];

const values = [
  { icon: faGem, title: 'Качество', desc: 'Многоуровневый контроль качества на каждом этапе производства. Соответствие международным стандартам.' },
  { icon: faHandshake, title: 'Надежность', desc: 'Выполнение обязательств в срок. Долгосрочные партнерские отношения с клиентами.' },
  { icon: faLightbulb, title: 'Инновации', desc: 'Постоянное совершенствование технологий и расширение продуктовой линейки.' },
  { icon: faUsers, title: 'Клиентоориентированность', desc: 'Индивидуальный подход к каждому заказчику. Техническая поддержка на всех этапах.' },
  { icon: faShieldAlt, title: 'Ответственность', desc: 'Гарантия качества продукции. Прозрачность во всех бизнес-процессах.' },
  { icon: faChartLine, title: 'Развитие', desc: 'Инвестиции в оборудование и обучение персонала. Непрерывное улучшение.' }
];

const certificates = [
  { icon: faCertificate, title: 'ISO 9001:2015', desc: 'Система менеджмента качества' },
  { icon: faAward, title: 'ГОСТ Р', desc: 'Сертификат соответствия' },
  { icon: faClipboardCheck, title: 'СЭЗ', desc: 'Санитарно-эпидемиологическое заключение' },
  { icon: faFlask, title: 'Протоколы испытаний', desc: 'Лабораторные исследования' }
];

const industries = [
  { icon: faPills, title: 'Фармацевтика', desc: 'Производители лекарственных препаратов и медицинских изделий' },
  { icon: faHospital, title: 'Медицина', desc: 'Клиники, больницы, медицинские центры' },
  { icon: faMicrochip, title: 'Электроника', desc: 'Производители микросхем и электронных компонентов' },
  { icon: faUtensils, title: 'Пищевая промышленность', desc: 'Производители продуктов питания и напитков' }
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Главная</Link>
            <span>/</span>
            <span>О компании</span>
          </div>
          <h1 className="page-title">О компании ООО &quot;Фора&quot;</h1>
          <p className="page-subtitle">10 лет производим решения для чистых помещений</p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="content-section">
        <div className="container">
          <div className="about-intro-grid">
            <div>
              <h2>Надежный партнер в сфере чистых помещений</h2>
              <p className="about-text">
                ООО &quot;Фора&quot; — российский производитель алюминиевых соединительных элементов для скругляющих профилей в чистых помещениях. 
                С 2016 года мы специализируемся на разработке и производстве угловых соединителей, профильных элементов 
                и заглушек для фармацевтической, медицинской, пищевой промышленности и микроэлектроники.
              </p>
              <p className="about-text">
                Наше производство расположено в городе Павлово Нижегородской области. Полный производственный цикл 
                — от литья алюминиевых заготовок до порошковой окраски готовых изделий — позволяет нам гарантировать 
                высокое качество и оперативные сроки изготовления.
              </p>
              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <Link href="/production" className="btn btn-primary">
                  <FontAwesomeIcon icon={faIndustry} /> Наше производство
                </Link>
                <Link href="/contacts" className="btn btn-outline">
                  <FontAwesomeIcon icon={faPhone} /> Связаться с нами
                </Link>
              </div>
            </div>
            <div className="about-image-placeholder">
              <FontAwesomeIcon icon={faBuilding} />
              <p>Фото производственной площадки</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-suffix">{stat.suffix}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="content-section alt-bg">
        <div className="container">
          <div className="section-header">
            <h2>История и экспертиза</h2>
            <p>Путь от небольшого производства к лидерству в отрасли</p>
          </div>

          <div className="timeline">
            {history.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">{item.year}</div>
                <div className="timeline-content">
                  <h3>
                    <FontAwesomeIcon icon={item.icon} /> {item.title}
                  </h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Наши ценности</h2>
            <p>Принципы, которыми мы руководствуемся в работе</p>
          </div>

          <div className="cards-grid">
            {values.map((value, index) => (
              <div key={index} className="info-card">
                <div className="info-card-icon">
                  <FontAwesomeIcon icon={value.icon} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="content-section alt-bg">
        <div className="container">
          <div className="section-header">
            <h2>Сертификаты и лицензии</h2>
            <p>Наша продукция соответствует российским и международным стандартам</p>
          </div>

          <div className="certificates-grid">
            {certificates.map((cert, index) => (
              <div key={index} className="info-card" style={{ textAlign: 'center' }}>
                <div className="cert-icon-wrapper">
                  <FontAwesomeIcon icon={cert.icon} />
                </div>
                <h4>{cert.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}>{cert.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/documentation" className="btn btn-primary">
              <FontAwesomeIcon icon={faDownload} /> Скачать сертификаты
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Нам доверяют</h2>
            <p>Наши клиенты — ведущие компании в своих отраслях</p>
          </div>

          <div className="industries-grid">
            {industries.map((industry, index) => (
              <div key={index} className="industry-card">
                <div className="industry-icon">
                  <FontAwesomeIcon icon={industry.icon} />
                </div>
                <h3>{industry.title}</h3>
                <p>{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="quick-request">
        <div className="container">
          <div className="request-content">
            <div className="request-text">
              <h2>Готовы к сотрудничеству?</h2>
              <p>Свяжитесь с нами для обсуждения вашего проекта</p>
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <Link href="/contacts" className="btn btn-primary">
                <FontAwesomeIcon icon={faPhone} /> Связаться с нами
              </Link>
              <Link href="/catalog" className="btn btn-outline">
                <FontAwesomeIcon icon={faThLarge} /> Посмотреть каталог
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
