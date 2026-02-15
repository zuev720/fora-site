'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const faqItems = [
  {
    question: 'Как быстро вы ответите на запрос?',
    answer: 'В рабочие дни мы отвечаем на запросы в течение 2 часов. Коммерческие предложения готовятся в течение 4-8 рабочих часов в зависимости от сложности запроса.'
  },
  {
    question: 'Можно ли посетить ваше производство?',
    answer: 'Да, мы проводим экскурсии по производству для потенциальных клиентов и партнеров. Для записи на экскурсию свяжитесь с нами по телефону или заполните форму на сайте.'
  },
  {
    question: 'Какая минимальная партия заказа?',
    answer: 'Минимальная партия для стандартных позиций — от 10 штук. Для нестандартных изделий — от 50 штук. Возможно изготовление опытных образцов для тестирования.'
  },
  {
    question: 'Какие сроки изготовления?',
    answer: 'Стандартная продукция со склада — отгрузка в течение 24 часов. Изготовление под заказ: мелкая серия — 10-14 дней, крупная серия — по согласованию.'
  },
  {
    question: 'Осуществляете ли вы доставку?',
    answer: 'Да, мы организуем доставку по всей России транспортными компаниями. Также возможен самовывоз со склада в г. Павлово. Стоимость доставки рассчитывается индивидуально.'
  }
];

export default function ContactFAQ() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="accordion" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {faqItems.map((item, index) => (
        <div key={index} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(index)}>
            <span>{item.question}</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className="accordion-content" style={{ display: activeIndex === index ? 'block' : 'none' }}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
