'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileInvoice, faComments, faPhone } from '@fortawesome/free-solid-svg-icons';

interface StickyPanelProps {
  cartCount?: number;
  onCartOpen?: () => void;
  onCallbackOpen?: () => void;
  onChatOpen?: () => void;
}

export default function StickyPanel({ 
  cartCount = 0, 
  onCartOpen, 
  onCallbackOpen,
  onChatOpen,
}: StickyPanelProps) {
  const handleDownloadCatalog = () => {
    // Trigger download from API endpoint
    window.location.href = '/api/generate-catalog';
  };

  return (
    <div className="sticky-panel">
      <button className="sticky-btn" title="Скачать каталог" onClick={handleDownloadCatalog}>
        <FontAwesomeIcon icon={faDownload} />
      </button>
      <button className="sticky-btn" title="Запрос КП" onClick={onCartOpen}>
        <FontAwesomeIcon icon={faFileInvoice} />
        {cartCount > 0 && <span className="sticky-count">{cartCount}</span>}
      </button>
      <button className="sticky-btn" title="Онлайн-чат" onClick={onChatOpen}>
        <FontAwesomeIcon icon={faComments} />
      </button>
      <button className="sticky-btn" title="Заказать звонок" onClick={onCallbackOpen}>
        <FontAwesomeIcon icon={faPhone} />
      </button>
    </div>
  );
}
