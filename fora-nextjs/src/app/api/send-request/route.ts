import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Конфигурация транспортера для отправки email
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'zuev720@mail.ru',
    pass: process.env.SMTP_PASS || '',
  },
});

const RECIPIENT_EMAIL = 'zuev720@mail.ru';

interface CartItemData {
  name: string;
  specs: string;
  quantity: number;
  hasPowderCoating: boolean;
  unitPrice: number;
  totalPrice: number;
}

interface CustomerData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  comment?: string;
}

function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU') + ' ₽';
}

function generateQuoteRequestEmail(customer: CustomerData, items: CartItemData[], totalSum: number): string {
  const itemsList = items.map((item, index) => `
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">${index + 1}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.specs}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.hasPowderCoating ? 'Порошковая окраска' : 'Без покрытия'}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${formatPrice(item.unitPrice)}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity} шт.</td>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>${formatPrice(item.totalPrice)}</strong></td>
    </tr>
  `).join('');

  return `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h2 style="color: #0056b3;">Новый запрос коммерческого предложения</h2>
        
        <h3 style="color: #333;">Контактные данные:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; background: #f5f5f5; width: 150px;"><strong>Имя:</strong></td>
            <td style="padding: 8px;">${customer.name}</td>
          </tr>
          ${customer.company ? `
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Компания:</strong></td>
            <td style="padding: 8px;">${customer.company}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Email:</strong></td>
            <td style="padding: 8px;"><a href="mailto:${customer.email}">${customer.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Телефон:</strong></td>
            <td style="padding: 8px;"><a href="tel:${customer.phone}">${customer.phone}</a></td>
          </tr>
          ${customer.comment ? `
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Комментарий:</strong></td>
            <td style="padding: 8px;">${customer.comment}</td>
          </tr>
          ` : ''}
        </table>
        
        <h3 style="color: #333;">Список товаров:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #0056b3; color: white;">
              <th style="padding: 10px; border: 1px solid #0056b3;">№</th>
              <th style="padding: 10px; border: 1px solid #0056b3;">Наименование</th>
              <th style="padding: 10px; border: 1px solid #0056b3;">Характеристики</th>
              <th style="padding: 10px; border: 1px solid #0056b3;">Покрытие</th>
              <th style="padding: 10px; border: 1px solid #0056b3;">Цена за шт.</th>
              <th style="padding: 10px; border: 1px solid #0056b3;">Кол-во</th>
              <th style="padding: 10px; border: 1px solid #0056b3;">Сумма</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
          <tfoot>
            <tr style="background: #f0f0f0;">
              <td colspan="6" style="padding: 10px; border: 1px solid #ddd; text-align: right;"><strong>ИТОГО:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong style="color: #0056b3; font-size: 18px;">${formatPrice(totalSum)}</strong></td>
            </tr>
          </tfoot>
        </table>
        
        <p style="color: #666; font-size: 12px;">
          Дата запроса: ${new Date().toLocaleString('ru-RU')}<br>
          Отправлено с сайта ООО "Фора"
        </p>
      </body>
    </html>
  `;
}

function generateCallbackEmail(data: { name: string; phone: string; time?: string }): string {
  const timeLabels: Record<string, string> = {
    'asap': 'Как можно скорее',
    'morning': 'Утром (9:00-12:00)',
    'day': 'Днём (12:00-17:00)',
    'evening': 'Вечером (17:00-19:00)',
  };

  return `
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h2 style="color: #0056b3;">Заказ обратного звонка</h2>
        <table style="border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Имя:</strong></td>
            <td style="padding: 8px;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Телефон:</strong></td>
            <td style="padding: 8px;"><a href="tel:${data.phone}">${data.phone}</a></td>
          </tr>
          ${data.time ? `
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Удобное время:</strong></td>
            <td style="padding: 8px;">${timeLabels[data.time] || data.time}</td>
          </tr>
          ` : ''}
        </table>
        <p style="color: #666; font-size: 12px;">
          Дата: ${new Date().toLocaleString('ru-RU')}<br>
          Отправлено с сайта ООО "Фора"
        </p>
      </body>
    </html>
  `;
}

function generateQuickQuoteEmail(data: { name: string; email: string; phone: string; product?: string; comment?: string }): string {
  return `
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h2 style="color: #0056b3;">Запрос КП в течение 2 часов</h2>
        <table style="border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Имя:</strong></td>
            <td style="padding: 8px;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Email:</strong></td>
            <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Телефон:</strong></td>
            <td style="padding: 8px;"><a href="tel:${data.phone}">${data.phone}</a></td>
          </tr>
          ${data.product ? `
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Интересующий товар:</strong></td>
            <td style="padding: 8px;">${data.product}</td>
          </tr>
          ` : ''}
          ${data.comment ? `
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Комментарий:</strong></td>
            <td style="padding: 8px;">${data.comment}</td>
          </tr>
          ` : ''}
        </table>
        <p style="color: #666; font-size: 12px;">
          Дата: ${new Date().toLocaleString('ru-RU')}<br>
          Отправлено с сайта ООО "Фора"
        </p>
      </body>
    </html>
  `;
}

function generateExcursionEmail(data: { name: string; company?: string; email: string; phone: string }): string {
  return `
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h2 style="color: #0056b3;">Заявка на экскурсию по производству</h2>
        <table style="border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Имя:</strong></td>
            <td style="padding: 8px;">${data.name}</td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Компания:</strong></td>
            <td style="padding: 8px;">${data.company}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Email:</strong></td>
            <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Телефон:</strong></td>
            <td style="padding: 8px;"><a href="tel:${data.phone}">${data.phone}</a></td>
          </tr>
        </table>
        <p style="color: #666; font-size: 12px;">
          Дата: ${new Date().toLocaleString('ru-RU')}<br>
          Отправлено с сайта ООО "Фора"
        </p>
      </body>
    </html>
  `;
}

function generateTechnicalRequestEmail(data: {
  name: string;
  company?: string;
  email: string;
  phone: string;
  projectDescription: string;
  requirements?: string;
  drawings?: string;
}): string {
  return `
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h2 style="color: #0056b3;">Технический запрос на индивидуальное изготовление</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 8px; background: #f5f5f5; width: 200px;"><strong>Имя:</strong></td>
            <td style="padding: 8px;">${data.name}</td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Компания:</strong></td>
            <td style="padding: 8px;">${data.company}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Email:</strong></td>
            <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Телефон:</strong></td>
            <td style="padding: 8px;"><a href="tel:${data.phone}">${data.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Описание проекта:</strong></td>
            <td style="padding: 8px;">${data.projectDescription}</td>
          </tr>
          ${data.requirements ? `
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Требования:</strong></td>
            <td style="padding: 8px;">${data.requirements}</td>
          </tr>
          ` : ''}
          ${data.drawings ? `
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Информация о чертежах:</strong></td>
            <td style="padding: 8px;">${data.drawings}</td>
          </tr>
          ` : ''}
        </table>
        <p style="color: #666; font-size: 12px;">
          Дата: ${new Date().toLocaleString('ru-RU')}<br>
          Отправлено с сайта ООО "Фора"
        </p>
      </body>
    </html>
  `;
}

function generateContactFormEmail(data: {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}): string {
  return `
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h2 style="color: #0056b3;">Сообщение с формы обратной связи</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 8px; background: #f5f5f5; width: 150px;"><strong>Имя:</strong></td>
            <td style="padding: 8px;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Email:</strong></td>
            <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Телефон:</strong></td>
            <td style="padding: 8px;"><a href="tel:${data.phone}">${data.phone}</a></td>
          </tr>
          ${data.subject ? `
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Тема:</strong></td>
            <td style="padding: 8px;">${data.subject}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Сообщение:</strong></td>
            <td style="padding: 8px;">${data.message}</td>
          </tr>
        </table>
        <p style="color: #666; font-size: 12px;">
          Дата: ${new Date().toLocaleString('ru-RU')}<br>
          Отправлено с сайта ООО "Фора"
        </p>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    let subject = '';
    let html = '';

    switch (type) {
      case 'quote_request':
        subject = `Запрос КП от ${body.customer.name}`;
        html = generateQuoteRequestEmail(body.customer, body.items, body.totalSum);
        break;
        
      case 'callback':
        subject = `Заказ звонка от ${body.name}`;
        html = generateCallbackEmail(body);
        break;
        
      case 'quick_quote':
        subject = `Срочный запрос КП от ${body.name}`;
        html = generateQuickQuoteEmail(body);
        break;
        
      case 'excursion':
        subject = `Заявка на экскурсию от ${body.name}`;
        html = generateExcursionEmail(body);
        break;
        
      case 'technical_request':
        subject = `Технический запрос от ${body.name}`;
        html = generateTechnicalRequestEmail(body);
        break;
        
      case 'contact_form':
        subject = `Сообщение с сайта от ${body.name}`;
        html = generateContactFormEmail(body);
        break;
        
      default:
        return NextResponse.json({ error: 'Unknown request type' }, { status: 400 });
    }

    // Отправка email
    // В продакшене раскомментировать после настройки SMTP
    // await transporter.sendMail({
    //   from: process.env.SMTP_USER || 'zuev720@mail.ru',
    //   to: RECIPIENT_EMAIL,
    //   subject,
    //   html,
    // });

    // Для отладки - логируем в консоль
    console.log('='.repeat(50));
    console.log('EMAIL WOULD BE SENT:');
    console.log('To:', RECIPIENT_EMAIL);
    console.log('Subject:', subject);
    console.log('Type:', type);
    console.log('Body:', JSON.stringify(body, null, 2));
    console.log('='.repeat(50));

    return NextResponse.json({ success: true, message: 'Request received' });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
