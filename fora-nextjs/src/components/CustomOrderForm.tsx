'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner, faCheckCircle, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

export default function CustomOrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    description: '',
    quantity: '',
    deadline: '',
    consultation: false,
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
    
    if (!formData.description.trim()) {
      newErrors.description = 'Опишите вашу задачу';
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
          type: 'technical_request',
          name: formData.name,
          company: formData.company || undefined,
          email: formData.email,
          phone: formData.phone,
          projectDescription: formData.description,
          requirements: formData.consultation ? 'Требуется техническая консультация' : undefined,
          drawings: formData.quantity || formData.deadline 
            ? `Количество: ${formData.quantity || 'Не указано'}, Срок: ${formData.deadline || 'Не указан'}`
            : undefined,
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
            description: '',
            quantity: '',
            deadline: '',
            consultation: false,
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
        <h3>Запрос отправлен!</h3>
        <p>Мы ответим в течение 4 рабочих часов</p>
      </div>
    );
  }

  return (
    <form className="custom-order-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Ваше имя *</label>
          <input 
            id="name" 
            type="text" 
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="company">Компания</label>
          <input 
            id="company" 
            type="text" 
            name="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input 
            id="email" 
            type="email" 
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Телефон *</label>
          <input 
            id="phone" 
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
        <label htmlFor="description">Описание задачи *</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Опишите, какие элементы вам нужны, особенности конструкции, область применения..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>
      <div className="form-group" style={{ marginTop: 20 }}>
        <label htmlFor="files">Прикрепить файлы</label>
        <div className="file-upload">
          <FontAwesomeIcon icon={faCloudUploadAlt} />
          <p>Перетащите файлы сюда или нажмите для выбора</p>
          <p style={{ fontSize: '0.85rem', color: '#6c757d' }}>
            Поддерживаемые форматы: PDF, DWG, DXF, STEP, IGS, JPEG, PNG
          </p>
          <input
            id="files"
            type="file"
            name="files"
            multiple
            accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.jpg,.jpeg,.png"
          />
        </div>
      </div>
      <div className="form-row" style={{ marginTop: 20 }}>
        <div className="form-group">
          <label htmlFor="quantity">Количество (шт)</label>
          <input 
            id="quantity" 
            type="number" 
            name="quantity" 
            min={1} 
            placeholder="Укажите количество"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Желаемый срок</label>
          <input 
            id="deadline" 
            type="text" 
            name="deadline" 
            placeholder="Например: 2 недели"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          />
        </div>
      </div>
      <div className="form-group" style={{ marginTop: 40 }}>
        <p>Дополнительные требования</p>
        <div className="checkbox-group">
          <div className="checkbox-item custom-order-checkbox">
            <input 
              type="checkbox" 
              id="consultation" 
              name="requirements[]" 
              value="consultation"
              checked={formData.consultation}
              onChange={(e) => setFormData({ ...formData, consultation: e.target.checked })}
            />
            <label htmlFor="consultation">Нужна техническая консультация</label>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
        {isSubmitting ? (
          <><FontAwesomeIcon icon={faSpinner} spin /> Отправка...</>
        ) : (
          <><FontAwesomeIcon icon={faPaperPlane} /> Отправить запрос</>
        )}
      </button>
      <p className="form-note">
        Нажимая кнопку, вы соглашаетесь с <a href="/privacy">политикой конфиденциальности</a>
      </p>
    </form>
  );
}
