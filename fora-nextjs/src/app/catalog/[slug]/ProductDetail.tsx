'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileInvoice,
  faPhone,
  faCheckCircle,
  faFire,
  faCheck,
  faTruck,
  faBox,
  faCertificate,
  faInfoCircle,
  faListAlt,
  faIndustry,
  faTools,
  faFileDownload,
  faSearchPlus,
  faFilePdf,
  faBook,
  faCube,
  faWrench,
  faBroom,
  faPills,
  faHospital,
  faUtensils,
  faMicrochip,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { Product, POWDER_COATING_PRICE, formatPrice } from '@/data/products';
import { useCart } from '@/components/LayoutWrapper';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const tabs = [
  { id: 'description', label: 'Описание', icon: faInfoCircle },
  { id: 'specifications', label: 'Характеристики', icon: faListAlt },
  { id: 'application', label: 'Применение', icon: faIndustry },
  { id: 'mounting', label: 'Монтаж', icon: faTools },
  { id: 'documents', label: 'Документация', icon: faFileDownload },
];

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState('description');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [hasPowderCoating, setHasPowderCoating] = useState(false);
  const { addItem } = useCart();

  const unitPrice = hasPowderCoating ? product.basePrice + POWDER_COATING_PRICE : product.basePrice;
  const totalPrice = unitPrice * quantity;

  const handleQuantityChange = (value: number) => {
    const newQty = Math.min(Math.max(value, 1), 4000);
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      specs: product.specs,
      quantity,
      basePrice: product.basePrice,
      hasPowderCoating,
    });
    // Reset form
    setQuantity(1);
    setHasPowderCoating(false);
  };

  return (
    <section className="product-detail-section">
      <div className="container">
        <div className="product-detail-grid">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="gallery-main-image">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                style={{ objectFit: 'contain' }}
                priority
              />
              <button 
                className="gallery-zoom-btn" 
                title="Увеличить"
                onClick={() => setIsLightboxOpen(true)}
              >
                <FontAwesomeIcon icon={faSearchPlus} />
              </button>
            </div>
            <button className="btn btn-outline btn-sm" style={{ marginTop: '20px', width: '100%' }}>
              <FontAwesomeIcon icon={faFilePdf} /> Скачать техчертеж (PDF)
            </button>
          </div>

          {/* Product Info */}
          <div className="product-info-detail">
            <div className="product-badges">
              <span className="badge badge-success">
                <FontAwesomeIcon icon={faCheckCircle} /> В наличии
              </span>
              {product.badge && (
                <span className="badge badge-primary">
                  <FontAwesomeIcon icon={faFire} /> {product.badge}
                </span>
              )}
            </div>

            <h1>{product.name}</h1>

            <div className="product-meta">
              <span className="product-sku">Артикул: <strong>{product.sku}</strong></span>
            </div>

            <p className="product-short-desc">{product.description}</p>

            <div className="product-key-specs">
              <h4>Ключевые характеристики:</h4>
              <ul>
                <li><FontAwesomeIcon icon={faCheck} /> Радиус скругления: <strong>{product.radiusValue} мм</strong></li>
                <li><FontAwesomeIcon icon={faCheck} /> Материал: <strong>{product.material}</strong></li>
                <li><FontAwesomeIcon icon={faCheck} /> Класс чистоты: <strong>ISO 5-8 (GMP A-D)</strong></li>
              </ul>
            </div>

            {/* Coating Toggle */}
            <div className="product-coating-detail">
              <span className="coating-label">Покрытие:</span>
              <div className="coating-toggle">
                <button 
                  className={`coating-btn ${!hasPowderCoating ? 'active' : ''}`}
                  onClick={() => setHasPowderCoating(false)}
                  type="button"
                >
                  Без покрытия
                </button>
                <button 
                  className={`coating-btn ${hasPowderCoating ? 'active' : ''}`}
                  onClick={() => setHasPowderCoating(true)}
                  type="button"
                >
                  Порошковая окраска (+{POWDER_COATING_PRICE}₽)
                </button>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="product-quantity-detail">
              <span className="qty-label">Количество:</span>
              <div className="qty-input-group">
                <button 
                  className="qty-btn"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  type="button"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min="1"
                  max="4000"
                  className="qty-input"
                />
                <button 
                  className="qty-btn"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 4000}
                  type="button"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <span className="qty-max">(макс. 4000 шт.)</span>
            </div>

            {/* Price Block */}
            <div className="product-price-block">
              <div className="price-row">
                <span className="price-label">Цена за шт.:</span>
                <span className="price-value">{formatPrice(unitPrice)}</span>
              </div>
              <div className="price-row price-total">
                <span className="price-label">Итого:</span>
                <span className="price-value total">{formatPrice(totalPrice)}</span>
              </div>
              <div className="price-note">
                {hasPowderCoating && <span className="coating-note">Включая порошковую окраску RAL 9016</span>}
              </div>
            </div>

            <div className="product-actions-detail">
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                <FontAwesomeIcon icon={faFileInvoice} /> В запрос КП
              </button>
              <Link href="/contacts" className="btn btn-outline btn-lg">
                <FontAwesomeIcon icon={faPhone} /> Получить консультацию
              </Link>
            </div>

            <div className="product-delivery-info">
              <div className="delivery-item">
                <FontAwesomeIcon icon={faTruck} />
                <div>
                  <strong>Доставка по России</strong>
                  <span>Транспортными компаниями</span>
                </div>
              </div>
              <div className="delivery-item">
                <FontAwesomeIcon icon={faBox} />
                <div>
                  <strong>Со склада</strong>
                  <span>Отгрузка в течение 24ч</span>
                </div>
              </div>
              <div className="delivery-item">
                <FontAwesomeIcon icon={faCertificate} />
                <div>
                  <strong>Гарантия качества</strong>
                  <span>Сертифицированная продукция</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="product-tabs">
          <div className="tabs-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <FontAwesomeIcon icon={tab.icon} /> {tab.label}
              </button>
            ))}
          </div>

          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-content active">
                <div className="tab-content-inner">
                  <p>
                    {product.name} предназначен для создания гигиеничных скругленных углов 
                    в системах ограждения чистых помещений. Радиус скругления соответствует международным 
                    стандартам проектирования cleanroom-помещений и требованиям GMP.
                  </p>
                  <p>
                    Изготовлен из высококачественного алюминиевого сплава с белым матовым порошковым покрытием, 
                    устойчивым к регулярной дезинфекции агрессивными химическими средствами.
                  </p>
                  <h3>Ключевые преимущества:</h3>
                  <ul className="features-list">
                    <li><FontAwesomeIcon icon={faCheckCircle} /> Соответствие стандартам GMP и ISO для чистых помещений</li>
                    <li><FontAwesomeIcon icon={faCheckCircle} /> Отсутствие застойных зон и легкая санитарная обработка</li>
                    <li><FontAwesomeIcon icon={faCheckCircle} /> Надежное скрытое крепление к несущему каркасу</li>
                    <li><FontAwesomeIcon icon={faCheckCircle} /> Устойчивость к дезинфицирующим средствам</li>
                    <li><FontAwesomeIcon icon={faCheckCircle} /> Точная геометрия для плотного прилегания панелей</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-content active">
                <div className="tab-content-inner">
                  <table className="specs-table">
                    <tbody>
                      <tr><td>Тип изделия</td><td>{product.type === 'inner-corner' ? 'Угловой соединитель (внутренний угол)' : product.type === 'outer-corner' ? 'Угловой соединитель (внешний угол)' : 'Заглушка торцевая'}</td></tr>
                      <tr><td>Радиус скругления</td><td>{product.radiusValue} мм (±0,5 мм)</td></tr>
                      <tr><td>Материал основы</td><td>{product.material}</td></tr>
                      <tr><td>Покрытие</td><td>Порошковая полимерная окраска (опционально)</td></tr>
                      <tr><td>Цвет покрытия</td><td>Белый матовый (RAL 9016)</td></tr>
                      <tr><td>Толщина стенки</td><td>1,5 мм</td></tr>
                      <tr><td>Монтажные отверстия</td><td>2 шт., диаметр 6 мм</td></tr>
                      <tr><td>Температурный диапазон</td><td>от -20°C до +80°C</td></tr>
                      <tr><td>Класс чистоты помещений</td><td>ISO 5-8 (GMP класс A-D)</td></tr>
                      <tr><td>Вес</td><td>0,12 кг</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'application' && (
              <div className="tab-content active">
                <div className="tab-content-inner">
                  <div className="application-grid">
                    <div className="application-card">
                      <div className="application-icon"><FontAwesomeIcon icon={faPills} /></div>
                      <h4>Фармацевтическая промышленность</h4>
                      <p>Производственные помещения для изготовления стерильных препаратов, упаковки инъекций.</p>
                    </div>
                    <div className="application-card">
                      <div className="application-icon"><FontAwesomeIcon icon={faHospital} /></div>
                      <h4>Медицинские учреждения</h4>
                      <p>Операционные, реанимация, родзалы, лаборатории.</p>
                    </div>
                    <div className="application-card">
                      <div className="application-icon"><FontAwesomeIcon icon={faUtensils} /></div>
                      <h4>Пищевая промышленность</h4>
                      <p>Цеха детского питания, молочной продукции, мясных полуфабрикатов.</p>
                    </div>
                    <div className="application-card">
                      <div className="application-icon"><FontAwesomeIcon icon={faMicrochip} /></div>
                      <h4>Микроэлектроника</h4>
                      <p>Чистые зоны производства полупроводников, точных приборов.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mounting' && (
              <div className="tab-content active">
                <div className="tab-content-inner">
                  <div className="mounting-section">
                    <h3><FontAwesomeIcon icon={faWrench} /> Установка</h3>
                    <ol className="mounting-steps">
                      <li>Соединитель крепится к вертикальным стойкам каркаса болтами М6 через монтажные отверстия</li>
                      <li>Рекомендуется использовать нержавеющий крепеж</li>
                      <li>Зазоры герметизируются силиконовым герметиком для cleanroom</li>
                      <li>Контроль плотности прилегания к панелям</li>
                    </ol>
                  </div>
                  <div className="mounting-section">
                    <h3><FontAwesomeIcon icon={faBroom} /> Обслуживание</h3>
                    <ul className="mounting-list">
                      <li><FontAwesomeIcon icon={faCheck} /> Регулярная влажная уборка неабразивными средствами</li>
                      <li><FontAwesomeIcon icon={faCheck} /> Дезинфекция изопропиловым спиртом, перекисью водорода</li>
                      <li><FontAwesomeIcon icon={faCheck} /> Устойчивость к четвертичным аммониевым соединениям</li>
                      <li><FontAwesomeIcon icon={faCheck} /> Не требует специального обслуживания</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="tab-content active">
                <div className="tab-content-inner">
                  <div className="documents-download-list">
                    <a href="/documents/fora-catalog.pdf" download className="document-download-item">
                      <div className="document-icon"><FontAwesomeIcon icon={faFilePdf} /></div>
                      <div className="document-info">
                        <div className="document-name">Технический паспорт</div>
                        <div className="document-meta">PDF, 1.2 МБ</div>
                      </div>
                      <div className="document-action"><FontAwesomeIcon icon={faFileDownload} /></div>
                    </a>
                    <a href="/documents/fora-catalog.pdf" download className="document-download-item">
                      <div className="document-icon"><FontAwesomeIcon icon={faCertificate} /></div>
                      <div className="document-info">
                        <div className="document-name">Сертификат соответствия</div>
                        <div className="document-meta">PDF, 0.8 МБ</div>
                      </div>
                      <div className="document-action"><FontAwesomeIcon icon={faFileDownload} /></div>
                    </a>
                    <a href="/documents/fora-catalog.pdf" download className="document-download-item">
                      <div className="document-icon"><FontAwesomeIcon icon={faCube} /></div>
                      <div className="document-info">
                        <div className="document-name">3D-модель STEP</div>
                        <div className="document-meta">ZIP, 2.1 МБ</div>
                      </div>
                      <div className="document-action"><FontAwesomeIcon icon={faFileDownload} /></div>
                    </a>
                    <a href="/documents/fora-catalog.pdf" download className="document-download-item">
                      <div className="document-icon"><FontAwesomeIcon icon={faBook} /></div>
                      <div className="document-info">
                        <div className="document-name">Инструкция по монтажу</div>
                        <div className="document-meta">PDF, 0.5 МБ</div>
                      </div>
                      <div className="document-action"><FontAwesomeIcon icon={faFileDownload} /></div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="section-title">Сопутствующие товары</h2>
            <div className="products-grid related-products-grid">
              {relatedProducts.map((relProduct) => (
                <div key={relProduct.id} className="product-card product-card-mini">
                  <div className="product-image">
                    <Link href={`/catalog/${relProduct.slug}`}>
                      <Image
                        src={relProduct.image}
                        alt={relProduct.name}
                        width={180}
                        height={180}
                        style={{ objectFit: 'contain' }}
                      />
                    </Link>
                  </div>
                  <div className="product-info">
                    <div className="product-category">{relProduct.category}</div>
                    <h3 className="product-name">
                      <Link href={`/catalog/${relProduct.slug}`}>{relProduct.name}</Link>
                    </h3>
                    <div className="product-specs"><span>{relProduct.specs}</span></div>
                    <div className="product-price-row">
                      <span className="price-label">От:</span>
                      <span className="price-value">{formatPrice(relProduct.basePrice)}</span>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => addItem({ 
                          id: relProduct.id, 
                          name: relProduct.name, 
                          specs: relProduct.specs,
                          basePrice: relProduct.basePrice,
                          hasPowderCoating: false,
                        })}
                      >
                        <FontAwesomeIcon icon={faPlus} /> В запрос КП
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Block */}
        <div className="product-cta-block">
          <div className="cta-content">
            <h2>Остались вопросы?</h2>
            <p>Наши специалисты помогут подобрать оптимальное решение для вашего проекта</p>
          </div>
          <div className="cta-actions">
            <Link href="/contacts" className="btn btn-primary btn-lg">
              <FontAwesomeIcon icon={faPhone} /> Получить консультацию
            </Link>
            <a href="tel:+79092974144" className="cta-phone">
              <FontAwesomeIcon icon={faPhone} /> +7 (909) 297-41-44
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="lightbox active" onClick={() => setIsLightboxOpen(false)}>
          <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>×</button>
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}
    </section>
  );
}
