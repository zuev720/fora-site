'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPhone, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    time: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь будет отправка на сервер
    console.log('Callback request:', formData);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', phone: '', time: '' });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {isSuccess ? (
          <div className="modal-success">
            <div className="success-icon">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <h3>Спасибо за заявку!</h3>
            <p>Мы свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <>
            <h3>Заказать обратный звонок</h3>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Телефон"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                >
                  <option value="">Удобное время для звонка</option>
                  <option value="asap">Как можно скорее</option>
                  <option value="morning">Утром (9:00-12:00)</option>
                  <option value="day">Днём (12:00-17:00)</option>
                  <option value="evening">Вечером (17:00-19:00)</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                <FontAwesomeIcon icon={faPhone} /> Перезвоните мне
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
