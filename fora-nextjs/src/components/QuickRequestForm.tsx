'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function QuickRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
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
    
    if (formData.phone && !/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Введите корректный телефон';
    }
    
    if (!formData.interest) {
      newErrors.interest = 'Выберите интересующий раздел';
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
          type: 'quick_quote',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Не указан',
          product: formData.interest,
          comment: formData.company ? `Компания: ${formData.company}` : undefined,
        }),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', company: '', email: '', phone: '', interest: '' });
          setErrors({});
        }, 5000);
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

  if (isSuccess) {
    return (
      <div className="request-success">
        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
        <h3>Запрос отправлен!</h3>
        <p>Мы свяжемся с вами в течение 2 часов</p>
      </div>
    );
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <input 
            type="text" 
            name="name" 
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
            name="company" 
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
            name="email" 
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
            name="phone" 
            placeholder="Телефон" 
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <select 
            name="interest" 
            value={formData.interest}
            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
            className={errors.interest ? 'error' : ''}
          >
            <option value="">Что вас интересует? *</option>
            <option value="Угловые соединители R50">Угловые соединители R50</option>
            <option value="Угловые соединители R70">Угловые соединители R70</option>
            <option value="Соединители стена-пол">Соединители стена-пол</option>
            <option value="Соединители стена-потолок">Соединители стена-потолок</option>
            <option value="Заглушки торцевые">Заглушки торцевые</option>
            <option value="Индивидуальный заказ">Индивидуальный заказ</option>
            <option value="Консультация">Консультация</option>
          </select>
          {errors.interest && <span className="error-text">{errors.interest}</span>}
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
        {isSubmitting ? (
          <><FontAwesomeIcon icon={faSpinner} spin /> Отправка...</>
        ) : (
          <><FontAwesomeIcon icon={faPaperPlane} /> Получить КП в течение 2 часов</>
        )}
      </button>
      <p className="form-note">
        Нажимая кнопку, вы соглашаетесь с <Link href="/privacy">политикой конфиденциальности</Link>
      </p>
    </form>
  );
}
