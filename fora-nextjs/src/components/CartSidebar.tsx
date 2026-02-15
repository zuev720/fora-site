'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faTimes, faPaperPlane, faSave, faTrash, faPlus, faMinus, faInbox, faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { formatPrice } from '@/data/products';

export interface CartItem {
  id: string;
  name: string;
  specs: string;
  quantity: number;
  basePrice: number;
  hasPowderCoating: boolean;
  unitPrice: number; // Цена за единицу с учётом покрытия
  totalPrice: number; // Итоговая цена (unitPrice * quantity)
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
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    comment: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalSum = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Введите корректный телефон';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quote_request',
          customer: formData,
          items: items.map(item => ({
            name: item.name,
            specs: item.specs,
            quantity: item.quantity,
            hasPowderCoating: item.hasPowderCoating,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
          totalSum,
        }),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClear();
          setShowForm(false);
          setIsSuccess(false);
          setFormData({ name: '', company: '', email: '', phone: '', comment: '' });
          onClose();
        }, 3000);
      } else {
        alert('Произошла ошибка при отправке. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Произошла ошибка при отправке. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveSpec = () => {
    if (items.length === 0) return;
    
    let content = 'СПЕЦИФИКАЦИЯ - ООО "ФОРА"\n';
    content += '================================\n';
    content += `Дата: ${new Date().toLocaleDateString('ru-RU')}\n\n`;
    
    items.forEach((item, index) => {
      content += `${index + 1}. ${item.name}\n`;
      content += `   Характеристики: ${item.specs}\n`;
      content += `   Покрытие: ${item.hasPowderCoating ? 'Порошковая окраска' : 'Без покрытия'}\n`;
      content += `   Цена за шт.: ${formatPrice(item.unitPrice)}\n`;
      content += `   Количество: ${item.quantity} шт.\n`;
      content += `   Сумма: ${formatPrice(item.totalPrice)}\n\n`;
    });
    
    content += '================================\n';
    content += `Всего позиций: ${items.length}\n`;
    content += `Общее количество: ${totalItems} шт.\n`;
    content += `ИТОГО: ${formatPrice(totalSum)}\n\n`;
    content += 'Для получения коммерческого предложения\n';
    content += 'свяжитесь с нами:\n';
    content += 'Телефон: +7 (909) 297-41-44\n';
    content += 'Email: zuev720@mail.ru\n';
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'specification_fora.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isSuccess) {
    return (
      <>
        <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
          <div className="cart-success-message">
            <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
            <h3>Запрос отправлен!</h3>
            <p>Мы свяжемся с вами в ближайшее время</p>
          </div>
        </div>
        <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      </>
    );
  }

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

        {!showForm ? (
          <>
            <div className="cart-items">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <FontAwesomeIcon icon={faInbox} />
                  <p>Добавьте товары в запрос</p>
                  <p>
                    <Link className="btn btn-outline btn-sm" href="/catalog" onClick={onClose}>
                      Перейти в каталог
                    </Link>
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-specs">
                        {item.specs} | {item.hasPowderCoating ? 'Порошковая окраска' : 'Без покрытия'}
                      </div>
                      <div className="cart-item-price">
                        {formatPrice(item.unitPrice)} × {item.quantity} = <strong>{formatPrice(item.totalPrice)}</strong>
                      </div>
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
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 4000}
                        >
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
                <span>{totalItems} шт.</span>
              </div>
              <div className="cart-total cart-total-sum">
                <span>Итого:</span>
                <span>{formatPrice(totalSum)}</span>
              </div>
              <button 
                className="btn btn-primary btn-block" 
                disabled={items.length === 0}
                onClick={() => setShowForm(true)}
              >
                <FontAwesomeIcon icon={faPaperPlane} /> Отправить запрос КП
              </button>
              <button 
                className="btn btn-outline btn-block" 
                disabled={items.length === 0}
                onClick={handleSaveSpec}
              >
                <FontAwesomeIcon icon={faSave} /> Сохранить спецификацию
              </button>
            </div>
          </>
        ) : (
          <form className="cart-form" onSubmit={handleSubmit}>
            <div className="cart-form-header">
              <h4>Контактные данные</h4>
              <button type="button" className="btn-back" onClick={() => setShowForm(false)}>
                ← Назад к списку
              </button>
            </div>
            
            <div className="form-group">
              <input
                type="text"
                placeholder="Ваше имя *"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <input
                type="text"
                placeholder="Компания"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <input
                type="tel"
                placeholder="Телефон *"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <textarea
                placeholder="Комментарий к заказу"
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="cart-form-summary">
              <div>Позиций: {items.length}</div>
              <div>Количество: {totalItems} шт.</div>
              <div><strong>Итого: {formatPrice(totalSum)}</strong></div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><FontAwesomeIcon icon={faSpinner} spin /> Отправка...</>
              ) : (
                <><FontAwesomeIcon icon={faPaperPlane} /> Отправить запрос КП</>
              )}
            </button>
          </form>
        )}
      </div>
      <div 
        className={`cart-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
      />
    </>
  );
}
