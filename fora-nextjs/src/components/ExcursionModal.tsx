'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner, faCheckCircle, faIndustry } from '@fortawesome/free-solid-svg-icons';

interface ExcursionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExcursionModal({ isOpen, onClose }: ExcursionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    preferredDate: '',
    participants: '',
    comment: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
          type: 'excursion',
          name: formData.name,
          company: formData.company || undefined,
          email: formData.email,
          phone: formData.phone,
          preferredDate: formData.preferredDate || 'Не указана',
          participants: formData.participants || 'Не указано',
          comment: formData.comment || undefined,
        }),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', company: '', email: '', phone: '', preferredDate: '', participants: '', comment: '' });
          setErrors({});
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

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {isSuccess ? (
          <div className="modal-success">
            <div className="success-icon">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <h3>Заявка отправлена!</h3>
            <p>Мы свяжемся с вами для согласования даты экскурсии</p>
          </div>
        ) : (
          <>
            <h3><FontAwesomeIcon icon={faIndustry} /> Записаться на экскурсию</h3>
            <p className="modal-desc">Посетите наше производство и убедитесь в качестве продукции</p>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Ваше имя *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Компания"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Телефон *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="date"
                    placeholder="Предпочтительная дата"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <select
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                  >
                    <option value="">Количество участников</option>
                    <option value="1-2">1-2 человека</option>
                    <option value="3-5">3-5 человек</option>
                    <option value="6-10">6-10 человек</option>
                    <option value="more">Более 10 человек</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Комментарий (интересующие вопросы)"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows={3}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><FontAwesomeIcon icon={faSpinner} spin /> Отправка...</>
                ) : (
                  <><FontAwesomeIcon icon={faIndustry} /> Записаться на экскурсию</>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
