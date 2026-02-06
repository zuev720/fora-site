'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileInvoice, faComments, faPhone } from '@fortawesome/free-solid-svg-icons';

interface StickyPanelProps {
  cartCount?: number;
  onCartOpen?: () => void;
  onCallbackOpen?: () => void;
}

export default function StickyPanel({ cartCount = 0, onCartOpen, onCallbackOpen }: StickyPanelProps) {
  return (
    <div className="sticky-panel">
      <button className="sticky-btn" title="Скачать каталог">
        <FontAwesomeIcon icon={faDownload} />
      </button>
      <button className="sticky-btn" title="Запрос КП" onClick={onCartOpen}>
        <FontAwesomeIcon icon={faFileInvoice} />
        {cartCount > 0 && <span className="sticky-count">{cartCount}</span>}
      </button>
      <button className="sticky-btn" title="Онлайн-чат">
        <FontAwesomeIcon icon={faComments} />
      </button>
      <button className="sticky-btn" title="Заказать звонок" onClick={onCallbackOpen}>
        <FontAwesomeIcon icon={faPhone} />
      </button>
    </div>
  );
}
