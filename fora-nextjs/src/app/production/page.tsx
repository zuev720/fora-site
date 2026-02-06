import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFire, faSyncAlt, faCog, faCut, faSprayCan, faCheckCircle, faBox,
  faCheck, faFireAlt, faCogs, faMicroscope, faAward, faCertificate,
  faClipboardCheck, faFilePdf, faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Производство | ООО "Фора" - Полный цикл от отливки до готового элемента',
  description: 'Производство полного цикла алюминиевых соединительных элементов. Собственный литейный цех, ЧПУ обработка, порошковая окраска.',
  keywords: ['производство', 'алюминиевое литье', 'ЧПУ обработка', 'порошковая окраска', 'чистые помещения'],
  alternates: {
    canonical: '/production',
  },
  openGraph: {
    title: 'Производство | ООО Фора',
    description: 'Производство полного цикла алюминиевых соединительных элементов для чистых помещений',
    url: '/production',
  },
};

const timelineStages = [
  {
    number: 1,
    icon: faFire,
    title: 'Отливка алюминиевых заготовок',
    description: 'Литье осуществляется на современном оборудовании с использованием качественного алюминиевого сплава марки АД31.',
    features: [
      'Плавильная печь для алюминия',
      'Литье под давлением',
      'Контроль химического состава сплава',
      'Охлаждение и первичная обработка'
    ]
  },
  {
    number: 2,
    icon: faSyncAlt,
    title: 'Токарная обработка на станках с ЧПУ',
    description: 'Высокоточная обработка на современных токарных станках с числовым программным управлением.',
    features: [
      'Точность обработки до 0,01 мм',
      'Программирование под чертежи заказчика',
      'Создание сложных радиусных форм',
      'Контроль геометрии в процессе обработки'
    ]
  },
  {
    number: 3,
    icon: faCog,
    title: 'Фрезерная обработка',
    description: 'Создание сложных радиусных форм и обработка монтажных элементов на многокоординатных фрезерных центрах.',
    features: [
      'Обработка монтажных отверстий',
      'Снятие фасок и финишная обработка',
      'Многокоординатные фрезерные центры',
      'Автоматическая смена инструментов'
    ]
  },
  {
    number: 4,
    icon: faCut,
    title: 'Нарезка и подгонка размеров',
    description: 'Высокоточная резка по заданным размерам и калибровка элементов согласно чертежам.',
    features: [
      'Высокоточная резка по размерам',
      'Калибровка элементов',
      'Проверка соответствия чертежам'
    ]
  },
  {
    number: 5,
    icon: faSprayCan,
    title: 'Порошковая окраска',
    description: 'Собственный цех порошковой окраски с полной подготовкой поверхности и полимеризацией покрытия.',
    features: [
      'Подготовка поверхности (обезжиривание, фосфатирование)',
      'Окрасочная камера с рекуперацией порошка',
      'Полимеризация в печи при 180-200°C',
      'Толщина покрытия: 60-100 мкм',
      'Любой цвет по каталогу RAL'
    ]
  },
  {
    number: 6,
    icon: faCheckCircle,
    title: 'Контроль качества',
    description: 'Многоэтапный контроль качества на всех этапах производства, включая финальную проверку.',
    features: [
      'Проверка геометрических размеров',
      'Контроль качества покрытия',
      'Испытание на прочность крепления',
      'Проверка комплектности'
    ]
  },
  {
    number: 7,
    icon: faBox,
    title: 'Упаковка и логистика',
    description: 'Индивидуальная защитная упаковка и оперативная отгрузка транспортными компаниями по всей России.',
    features: [
      'Индивидуальная защитная упаковка',
      'Маркировка партий',
      'Комплектация заказов',
      'Отгрузка транспортными компаниями'
    ]
  }
];

const stats = [
  { value: 1000, suffix: 'м²', label: 'площадь производства' },
  { value: 5, suffix: '', label: 'станков с ЧПУ' },
  { value: 4000, suffix: '+', label: 'элементов/месяц' },
  { value: 10, suffix: '', label: 'специалистов' }
];

const equipment = [
  { icon: faFireAlt, title: 'Литейный участок', description: 'Плавильные печи для алюминия, оборудование для литья под давлением, системы контроля состава сплава' },
  { icon: faSyncAlt, title: 'Токарные станки ЧПУ', description: 'Современные токарные центры с числовым программным управлением, точность обработки до 0,01 мм' },
  { icon: faCogs, title: 'Фрезерные центры', description: 'Многокоординатные фрезерные станки для создания сложных радиусных форм и обработки поверхностей' },
  { icon: faCut, title: 'Участок резки', description: 'Высокоточное оборудование для резки и калибровки элементов по заданным размерам' },
  { icon: faSprayCan, title: 'Линия окраски', description: 'Камера порошковой окраски с рекуперацией, печь полимеризации, участок подготовки поверхности' },
  { icon: faMicroscope, title: 'Лаборатория ОТК', description: 'Измерительное оборудование для контроля геометрии, толщины покрытия и качества продукции' }
];

const certificates = [
  { icon: faAward, title: 'ISO 9001:2015', description: 'Система менеджмента качества сертифицирована по международному стандарту ISO 9001:2015' },
  { icon: faCertificate, title: 'ГОСТ Р', description: 'Продукция соответствует требованиям российских государственных стандартов' },
  { icon: faClipboardCheck, title: 'Протоколы испытаний', description: 'Регулярные лабораторные испытания материалов и готовой продукции' }
];

export default function ProductionPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Главная</Link>
            <span>/</span>
            <span>Производство</span>
          </div>
          <h1 className="page-title">Производство полного цикла</h1>
          <p className="page-subtitle">
            От литья заготовки до готового элемента. Собственный литейный цех, токарно-фрезерный участок и цех порошковой окраски.
          </p>
        </div>
      </section>

      {/* Production Timeline */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Технологический цикл</h2>
            <p>Полный контроль качества на каждом этапе производства</p>
          </div>

          <div className="timeline">
            {timelineStages.map((stage) => (
              <div key={stage.number} className="timeline-item">
                <div className="timeline-marker">{stage.number}</div>
                <div className="timeline-content">
                  <h3>
                    <FontAwesomeIcon icon={stage.icon} /> {stage.title}
                  </h3>
                  <p>{stage.description}</p>
                  <ul>
                    {stage.features.map((feature, idx) => (
                      <li key={idx}>
                        <FontAwesomeIcon icon={faCheck} /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Stats */}
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

      {/* Equipment */}
      <section className="content-section alt-bg">
        <div className="container">
          <div className="section-header">
            <h2>Оборудование и станки</h2>
            <p>Современное оборудование для высокоточного производства</p>
          </div>

          <div className="cards-grid">
            {equipment.map((item, index) => (
              <div key={index} className="info-card">
                <div className="info-card-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Certificates */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Сертификаты и стандарты</h2>
            <p>Производство соответствует российским и международным стандартам качества</p>
          </div>

          <div className="cards-grid">
            {certificates.map((cert, index) => (
              <div key={index} className="info-card">
                <div className="info-card-icon">
                  <FontAwesomeIcon icon={cert.icon} />
                </div>
                <h3>{cert.title}</h3>
                <p>{cert.description}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/documentation" className="btn btn-primary">
              <FontAwesomeIcon icon={faFilePdf} /> Скачать сертификаты
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="quick-request">
        <div className="container">
          <div className="request-content">
            <div className="request-text">
              <h2>Посетите наше производство</h2>
              <p>Мы проводим экскурсии по производству для потенциальных клиентов и партнеров</p>
            </div>
            <form className="request-form" id="visitForm">
              <div className="form-row">
                <div className="form-group">
                  <input type="text" name="name" placeholder="Ваше имя" required />
                </div>
                <div className="form-group">
                  <input type="text" name="company" placeholder="Компания" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="email" name="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <input type="tel" name="phone" placeholder="Телефон" required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                <FontAwesomeIcon icon={faCalendarCheck} /> Записаться на экскурсию
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
