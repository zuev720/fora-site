import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCompassDrafting, faRulerCombined, faCircleDot, faShapes,
  faPalette, faPuzzlePiece, faFileUpload, faSearch, faHandshake,
  faIndustry, faBoxes, faClock, faRubleSign, faPaperPlane, faCloudUploadAlt
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Индивидуальные заказы | ООО "Фора" - Изготовление по чертежам',
  description: 'Изготовление соединительных элементов по вашим чертежам. Нестандартные радиусы, индивидуальные размеры, любые цвета RAL.',
  keywords: ['индивидуальные заказы', 'изготовление по чертежам', 'нестандартные радиусы', 'RAL', 'чистые помещения'],
  alternates: {
    canonical: '/custom-orders',
  },
  openGraph: {
    title: 'Индивидуальные заказы | ООО Фора',
    description: 'Изготовление соединительных элементов по вашим чертежам',
    url: '/custom-orders',
  },
};

const capabilities = [
  { icon: faCompassDrafting, title: 'Нестандартные радиусы', description: 'Любые значения радиуса, не только стандартные R50/R70. Изготовление по вашим требованиям.' },
  { icon: faRulerCombined, title: 'Индивидуальные размеры', description: 'Монтажные пластины любых размеров, нестандартная длина и ширина элементов.' },
  { icon: faCircleDot, title: 'Крепежные отверстия', description: 'Нестандартное количество и расположение отверстий под крепеж по вашим чертежам.' },
  { icon: faShapes, title: 'Специальные формы', description: 'Изготовление элементов под конкретные профильные системы и нестандартные конфигурации.' },
  { icon: faPalette, title: 'Любой цвет RAL', description: 'Порошковая окраска в любой цвет по каталогу RAL. Полная палитра на выбор.' },
  { icon: faPuzzlePiece, title: 'Комплектующие', description: 'Специальные комплектующие элементы по вашему техническому заданию.' }
];

const processSteps = [
  { icon: faFileUpload, number: 1, title: 'Отправьте чертежи', description: 'Позвоните нам или загрузите файлы, опишите задачу, укажите количество' },
  { icon: faSearch, number: 2, title: 'Техническая проработка', description: 'Анализ возможности, предложение решений, расчет стоимости' },
  { icon: faHandshake, number: 3, title: 'Согласование', description: 'Получите счет, утвердите чертежи' },
  { icon: faIndustry, number: 4, title: 'Производство', description: 'Опытный образец (опционально), серийное производство' }
];

const ralColors = [
  { code: 'RAL 9003', name: 'Белый сигнальный', color: '#f4f4f4' },
  { code: 'RAL 7035', name: 'Светло-серый', color: '#d7d7d7' },
  { code: 'RAL 9006', name: 'Серебристый', color: '#a5a5a5' },
  { code: 'RAL 1015', name: 'Светлая слоновая кость', color: '#e6d690' },
  { code: 'RAL 7001', name: 'Серебристо-серый', color: '#9da1aa' },
  { code: 'RAL 9010', name: 'Чистый белый', color: '#ffffff' },
  { code: 'RAL 7038', name: 'Агатовый серый', color: '#b8b8b8' },
  { code: 'RAL 5010', name: 'Горечавково-синий', color: '#1e5387' }
];

const terms = [
  { icon: faBoxes, title: 'Минимальная партия', content: 'От <strong>10 штук</strong> для стандартных позиций<br/>От <strong>50 штук</strong> для нестандартных изделий' },
  { icon: faClock, title: 'Сроки изготовления', content: '<strong>Опытный образец:</strong> 5-7 рабочих дней<br/><strong>Мелкая серия (до 100 шт):</strong> 10-14 дней<br/><strong>Крупная серия:</strong> по согласованию' },
  { icon: faRubleSign, title: 'Стоимость', content: 'Рассчитывается индивидуально в зависимости от сложности, объема и сроков' }
];

export default function CustomOrdersPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Главная</Link>
            <span>/</span>
            <span>Индивидуальные заказы</span>
          </div>
          <h1 className="page-title">Изготовим по вашим чертежам</h1>
          <p className="page-subtitle">
            Нестандартные радиусы, индивидуальные размеры, любые цвета RAL
          </p>
        </div>
      </section>

      {/* What We Can Make */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Что мы можем изготовить</h2>
            <p>Наши возможности позволяют выполнить практически любой индивидуальный заказ</p>
          </div>

          <div className="cards-grid">
            {capabilities.map((item, index) => (
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

      {/* Order Process */}
      <section className="content-section alt-bg order-process">
        <div className="container">
          <div className="section-header">
            <h2>Процесс заказа</h2>
            <p>Четыре простых шага от идеи до готового продукта</p>
          </div>

          <div className="process-timeline" style={{ marginBottom: 0 }}>
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
        </div>
      </section>

      {/* Order Form */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Форма технического запроса</h2>
            <p>Заполните форму и мы ответим в течение 4 рабочих часов</p>
          </div>

          <div className="contact-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form id="customOrderForm">
              <div className="form-row">
                <div className="form-group">
                  <label>Ваше имя *</label>
                  <input type="text" name="name" required />
                </div>
                <div className="form-group">
                  <label>Компания</label>
                  <input type="text" name="company" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" required />
                </div>
                <div className="form-group">
                  <label>Телефон *</label>
                  <input type="tel" name="phone" required />
                </div>
              </div>
              <div className="form-group">
                <label>Описание задачи *</label>
                <textarea 
                  name="description" 
                  rows={4} 
                  placeholder="Опишите, какие элементы вам нужны, особенности конструкции, область применения..." 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Прикрепить файлы</label>
                <div className="file-upload">
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                  <p>Перетащите файлы сюда или нажмите для выбора</p>
                  <p style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                    Поддерживаемые форматы: PDF, DWG, DXF, STEP, IGS, JPEG, PNG
                  </p>
                  <input 
                    type="file" 
                    name="files" 
                    multiple 
                    accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.jpg,.jpeg,.png" 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Количество (шт)</label>
                  <input type="number" name="quantity" min={1} placeholder="Укажите количество" />
                </div>
                <div className="form-group">
                  <label>Желаемый срок</label>
                  <input type="text" name="deadline" placeholder="Например: 2 недели" />
                </div>
              </div>
              <div className="form-group">
                <label>Дополнительные требования</label>
                <div className="checkbox-group">
                  <div className="checkbox-item">
                    <input type="checkbox" id="consultation" name="requirements[]" value="consultation" />
                    <label htmlFor="consultation">Нужна техническая консультация</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                <FontAwesomeIcon icon={faPaperPlane} /> Отправить запрос
              </button>
              <p className="form-note">
                Нажимая кнопку, вы соглашаетесь с <a href="#">политикой конфиденциальности</a>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* RAL Palette */}
      <section className="content-section alt-bg">
        <div className="container">
          <div className="section-header">
            <h2>Палитра цветов RAL</h2>
            <p>Популярные цвета для чистых помещений. По запросу доступна полная палитра RAL.</p>
          </div>

          <div className="ral-palette">
            {ralColors.map((ral, index) => (
              <div key={index} className="ral-color">
                <div className="color-swatch" style={{ background: ral.color }} />
                <span>{ral.code}</span>
                <small>{ral.name}</small>
              </div>
            ))}
          </div>

          <div className="info-box" style={{ maxWidth: '600px', margin: '40px auto 0' }}>
            <p><strong>Стандартный цвет:</strong> RAL 9003 (белый сигнальный) — наиболее востребован для чистых помещений</p>
            <p style={{ marginBottom: 0 }}><strong>Под заказ:</strong> любой цвет по каталогу RAL без ограничений</p>
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Условия изготовления</h2>
          </div>

          <div className="cards-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {terms.map((term, index) => (
              <div key={index} className="info-card">
                <div className="info-card-icon">
                  <FontAwesomeIcon icon={term.icon} />
                </div>
                <h3>{term.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: term.content }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
