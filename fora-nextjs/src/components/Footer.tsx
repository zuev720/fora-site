import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="footer-logo-link">
              <Image
                src="/logo-white.svg"
                alt="ФОРА — Соединительные элементы"
                width={240}
                height={60}
                className="footer-logo-img"
              />
            </Link>
            <p>
              Производство алюминиевых соединительных элементов для скругляющих профилей в чистых помещениях с 2019 года
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
              <li><Link href="/catalog?category=corner">Соединители внутренние</Link></li>
              <li><Link href="/catalog?category=wall-floor">Соединители внешние</Link></li>
              <li><Link href="/catalog?category=wall-ceiling">Соединители под ленолеум</Link></li>
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
              <span>606100, Нижегородская обл., г. Павлово, ул. Коммунистическая, 10</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ООО &quot;Фора&quot;. Все права защищены.</p>
          <div className="footer-links">
            <Link href="#">Политика конфиденциальности</Link>
            <Link href="#">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
