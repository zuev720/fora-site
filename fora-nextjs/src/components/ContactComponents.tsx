'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner, faCheckCircle, faDownload } from '@fortawesome/free-solid-svg-icons';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
          type: 'contact_form',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || undefined,
          message: formData.message || 'Без сообщения',
        }),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ 
            name: '', 
            company: '', 
            email: '', 
            phone: '', 
            subject: '',
            message: '',
          });
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
        <h3>Сообщение отправлено!</h3>
        <p>Мы свяжемся с вами в ближайшее время</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Ваше имя *</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Компания</label>
          <input 
            type="text" 
            name="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Email *</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Телефон *</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
      </div>
      <div className="form-group">
        <label>Тема обращения</label>
        <select 
          name="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        >
          <option value="">Выберите тему</option>
          <option value="Запрос коммерческого предложения">Запрос коммерческого предложения</option>
          <option value="Техническая консультация">Техническая консультация</option>
          <option value="Индивидуальный заказ">Индивидуальный заказ</option>
          <option value="Партнерство">Партнерство</option>
          <option value="Другое">Другое</option>
        </select>
      </div>
      <div className="form-group">
        <label>Сообщение</label>
        <textarea 
          name="message" 
          rows={4} 
          placeholder="Опишите ваш вопрос или задачу..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
        {isSubmitting ? (
          <><FontAwesomeIcon icon={faSpinner} spin /> Отправка...</>
        ) : (
          <><FontAwesomeIcon icon={faPaperPlane} /> Отправить сообщение</>
        )}
      </button>
      <p className="form-note">
        Нажимая кнопку, вы соглашаетесь с <a href="/privacy">политикой конфиденциальности</a>
      </p>
    </form>
  );
}

export function CompanyCardButton() {
  const handleDownload = () => {
    // Создаём текстовый файл с реквизитами
    const content = `КАРТОЧКА КОМПАНИИ
===================

Полное наименование: Общество с ограниченной ответственностью "Фора"
Краткое наименование: ООО "Фора"

РЕКВИЗИТЫ:
ИНН: 5252012345
КПП: 525201001
ОГРН: 1095252001234

АДРЕС:
Юридический адрес: 606100, Нижегородская обл., г. Павлово, ул. Коммунистическая, д. 10
Фактический адрес: 606100, Нижегородская обл., г. Павлово, ул. Коммунистическая, д. 10

БАНКОВСКИЕ РЕКВИЗИТЫ:
Расчетный счет: 40702810100000012345
Банк: ПАО Сбербанк, г. Нижний Новгород
БИК: 042202603
Корр. счет: 30101810200000000603

КОНТАКТЫ:
Телефон: +7 (909) 297-41-44
Email: zuev720@mail.ru
Сайт: www.fora-cleanroom.ru

ДИРЕКТОР:
Генеральный директор - Зуев Алексей Владимирович
(действует на основании Устава)

===================
Дата формирования: ${new Date().toLocaleDateString('ru-RU')}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FORA_Company_Card.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} className="btn btn-outline" style={{ marginTop: '20px' }}>
      <FontAwesomeIcon icon={faDownload} /> Скачать карточку компании
    </button>
  );
}
