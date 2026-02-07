'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faTimes, faPaperPlane, faSave, faTrash, faPlus, faMinus, faInbox } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export interface CartItem {
  id: string;
  name: string;
  specs: string;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onClear,
}: CartSidebarProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSaveSpec = () => {
    if (items.length === 0) return;
    
    let content = 'СПЕЦИФИКАЦИЯ - ООО "ФОРА"\n';
    content += '================================\n';
    content += `Дата: ${new Date().toLocaleDateString('ru-RU')}\n\n`;
    
    items.forEach((item, index) => {
      content += `${index + 1}. ${item.name}\n`;
      content += `   Характеристики: ${item.specs}\n`;
      content += `   Количество: ${item.quantity} шт.\n\n`;
    });
    
    content += '================================\n';
    content += `Всего позиций: ${items.length}\n`;
    content += `Общее количество: ${totalItems} шт.\n\n`;
    content += 'Для получения коммерческого предложения\n';
    content += 'свяжитесь с нами:\n';
    content += 'Телефон: +7 (909) 297-41-44\n';
    content += 'Email: zuev621@mail.ru\n';
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'specification_fora.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>
            <FontAwesomeIcon icon={faFileInvoice} /> Ваш запрос КП
          </h3>
          <button className="cart-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
                <FontAwesomeIcon icon={faInbox} />
                <p>Добавьте товары в запрос</p>
              <p>
                <Link className="btn btn-outline btn-sm" href="/catalog" onClick={onClose}>
                  Добавьте товары из каталога
                </Link>
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-specs">{item.specs}</div>
                </div>
                <div className="cart-item-controls">
                  <div className="qty-controls">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <button className="cart-item-remove" onClick={() => onRemove(item.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Всего позиций:</span>
            <span>{totalItems}</span>
          </div>
          <button 
            className="btn btn-primary btn-block" 
            disabled={items.length === 0}
          >
            <FontAwesomeIcon icon={faPaperPlane} /> Отправить запрос КП
          </button>
          <button 
            className="btn btn-outline btn-block" 
            disabled={items.length === 0}
            onClick={handleSaveSpec}
            style={{ marginTop: '10px' }}
          >
            <FontAwesomeIcon icon={faSave} /> Сохранить спецификацию
          </button>
        </div>
      </div>
      <div 
        className={`cart-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
      />
    </>
  );
}
