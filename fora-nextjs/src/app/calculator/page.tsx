import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import CalculatorForm from './CalculatorForm';

export const metadata: Metadata = {
  title: 'Калькулятор материалов | ООО "Фора" - Расчет потребности',
  description: 'Калькулятор расчета потребности материалов для чистых помещений. Рассчитайте количество соединительных элементов онлайн.',
  keywords: ['калькулятор', 'расчет материалов', 'соединительные элементы', 'чистые помещения'],
  alternates: {
    canonical: '/calculator',
  },
  openGraph: {
    title: 'Калькулятор материалов | ООО Фора',
    description: 'Рассчитайте количество соединительных элементов для вашего помещения',
    url: '/calculator',
  },
};

export default function CalculatorPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Главная</Link>
            <span>/</span>
            <span>Калькулятор материалов</span>
          </div>
          <h1 className="page-title">Калькулятор материалов</h1>
          <p className="page-subtitle">
            Рассчитайте количество соединительных элементов для вашего помещения
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="calculator-section">
        <div className="container">
          <div className="calculator-container">
            <div className="calculator-header">
              <h2>
                <FontAwesomeIcon icon={faCalculator} /> Калькулятор расчета
              </h2>
              <p>Введите параметры помещения для расчета потребности в материалах</p>
            </div>
            
            <CalculatorForm />
          </div>

          {/* Info Box */}
          <div className="info-box" style={{ maxWidth: '900px', margin: '40px auto 0' }}>
            <p>
              <strong><FontAwesomeIcon icon={faInfoCircle} /> Обратите внимание:</strong>
            </p>
            <p>
              Данный калькулятор предоставляет приблизительный расчет для стандартного прямоугольного помещения. 
              Для помещений сложной конфигурации или при наличии дополнительных требований рекомендуем 
              обратиться к нашим специалистам для точного расчета.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
