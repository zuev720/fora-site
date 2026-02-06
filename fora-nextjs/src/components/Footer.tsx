import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <span className="logo-icon">
                <FontAwesomeIcon icon={faCube} />
              </span>
              <span className="logo-text">ФОРА</span>
            </div>
            <p>
              Производство алюминиевых соединительных элементов для чистых помещений с 2009 года
            </p>
            <div className="footer-contacts">
              <a href="tel:+79092974144">
                <FontAwesomeIcon icon={faPhone} /> +7 (909) 297-41-44
              </a>
              <a href="mailto:zuev621@mail.ru">
                <FontAwesomeIcon icon={faEnvelope} /> zuev621@mail.ru
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Каталог</h4>
            <ul>
              <li><Link href="/catalog?category=corner">Угловые соединители</Link></li>
              <li><Link href="/catalog?category=caps">Заглушки торцевые</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Информация</h4>
            <ul>
              <li><Link href="/production">Производство</Link></li>
              <li><Link href="/custom-orders">Индивидуальные заказы</Link></li>
              <li><Link href="/documentation">Техническая документация</Link></li>
              <li><Link href="/about">О компании</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Контакты</h4>
            <ul>
              <li><Link href="/contacts">Отдел продаж</Link></li>
              <li><Link href="/contacts">Технический отдел</Link></li>
              <li><Link href="/contacts">Реквизиты компании</Link></li>
            </ul>
            <div className="footer-address">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>606100, Нижегородская обл., г. Павлово, ул. Коммунистическая, д. 10</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ООО "Фора". Все права защищены.</p>
          <div className="footer-links">
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/terms">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
