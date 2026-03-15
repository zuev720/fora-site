import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, faCogs, faMapMarkerAlt,
  faPhone, faEnvelope, faClock, faRoute,
  faMapMarkedAlt, faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import ContactFAQ from './ContactFAQ';
import { ContactForm } from '@/components/ContactComponents';

export const metadata: Metadata = {
  title: 'Контакты | ООО "Фора" - Свяжитесь с нами',
  description: 'Контакты ООО Фора. Отдел продаж, технический отдел, реквизиты компании. Адрес: Нижегородская обл., г. Павлово.',
  keywords: ['контакты', 'телефон', 'адрес', 'Павлово', 'Нижегородская область'],
  alternates: {
    canonical: '/contacts',
  },
  openGraph: {
    title: 'Контакты | ООО Фора',
    description: 'Свяжитесь с нами удобным для вас способом',
    url: '/contacts',
  },
};

const contactCards = [
  {
    icon: faShoppingCart,
    title: 'Отдел продаж',
    description: 'Консультации по продукции, расчет стоимости, оформление заказов',
    phones: ['+7 (909) 297-41-44', '+7 (920) 057-10-12'],
    email: 'zuev621@mail.ru',
    hours: 'Пн-Пт: 9:00 - 18:00 (МСК)'
  },
  {
    icon: faCogs,
    title: 'Технический отдел',
    description: 'Технические консультации, помощь с чертежами, индивидуальные заказы',
    phones: ['+7 (909) 297-41-44', '+7 (920) 057-10-12'],
    email: 'zuev720@mail.ru',
    hours: 'Пн-Пт: 9:00 - 17:00 (МСК)'
  },
];

export default function ContactsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Главная</Link>
            <span>/</span>
            <span>Контакты</span>
          </div>
          <h1 className="page-title">Контакты</h1>
          <p className="page-subtitle">Свяжитесь с нами удобным для вас способом</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="content-section">
        <div className="container">
          <div className="contact-cards">
            {contactCards.map((card, index) => (
              <div key={index} className="contact-card">
                <h4>
                  <FontAwesomeIcon icon={card.icon} /> {card.title}
                </h4>
                <p>{card.description}</p>
                {card.phones.map((phone, phoneIndex) => (
                  <a key={phoneIndex} href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
                    <FontAwesomeIcon icon={faPhone} /> {phone}
                  </a>
                ))}
                <a href={`mailto:${card.email}`}>
                  <FontAwesomeIcon icon={faEnvelope} /> {card.email}
                </a>
                <p className="contacts-note">
                  <FontAwesomeIcon icon={faClock} /> {card.hours}
                </p>
              </div>
            ))}
            <div className="contact-card">
              <h4>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Адрес
              </h4>
              <p><strong>Производство:</strong></p>
              <p>606100, Нижегородская область,<br />г. Павлово, ул. Коммунистическая, д. 10</p>
              <a 
                href="https://yandex.ru/maps/?rtext=~55.959958,43.066417&rtt=auto" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contacts-email-link"
              >
                <FontAwesomeIcon icon={faRoute} /> Построить маршрут
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Company Details */}
      <section className="content-section alt-bg">
        <div className="container">
          <div className="contacts-grid">
            <div>
              <h2>Форма быстрого запроса</h2>
              <p className="contacts-section-desc">
                Заполните форму и мы свяжемся с вами в течение 2 часов в рабочее время
              </p>
              
              <div className="contact-form">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="map-section">
            <h2>
              <FontAwesomeIcon icon={faMapMarkedAlt} className="text-primary mr-10" />
              Карта расположения
            </h2>
            <p>
              606100, Нижегородская обл., г. Павлово, ул. Коммунистическая, д. 10
            </p>
            <div className="map-container">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=43.066417%2C55.959958&z=16&pt=43.066417%2C55.959958%2Cpm2rdm"
                width="100%" 
                height="450" 
                loading="lazy"
              />
            </div>
            <div className="map-actions">
              <a 
                href="https://yandex.ru/maps/?pt=43.066417,55.959958&z=16&l=map" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} /> Открыть в Яндекс.Картах
              </a>
              <a 
                href="https://yandex.ru/maps/?rtext=~55.959958,43.066417&rtt=auto" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <FontAwesomeIcon icon={faRoute} /> Построить маршрут
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2>Часто задаваемые вопросы</h2>
          </div>

          <ContactFAQ />
        </div>
      </section>
    </>
  );
}
