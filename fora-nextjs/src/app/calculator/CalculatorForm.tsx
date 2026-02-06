'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRulerCombined, faSlidersH, faCheckSquare, faCalculator,
  faClipboardList, faPlus, faDownload, faPhone
} from '@fortawesome/free-solid-svg-icons';

interface CalculationResults {
  corners: number;
  wallFloor: number;
  wallCeiling: number;
  caps: number;
}

export default function CalculatorForm() {
  const [roomLength, setRoomLength] = useState<number>(10);
  const [roomWidth, setRoomWidth] = useState<number>(6);
  const [roomHeight, setRoomHeight] = useState<number>(3);
  const [profileType, setProfileType] = useState<string>('r50');
  const [includeCorners, setIncludeCorners] = useState<boolean>(true);
  const [includeWallFloor, setIncludeWallFloor] = useState<boolean>(true);
  const [includeWallCeiling, setIncludeWallCeiling] = useState<boolean>(true);
  const [includeCaps, setIncludeCaps] = useState<boolean>(true);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleCalculate = () => {
    const perimeter = 2 * (roomLength + roomWidth);
    const elementLength = 0.5;

    let corners = 0;
    let wallFloor = 0;
    let wallCeiling = 0;
    let caps = 0;

    if (includeCorners) {
      corners = 4;
    }

    if (includeWallFloor) {
      wallFloor = Math.ceil(perimeter / elementLength);
    }

    if (includeWallCeiling) {
      wallCeiling = Math.ceil(perimeter / elementLength);
    }

    if (includeCaps) {
      caps = Math.ceil(perimeter / 5) * 2;
      if (caps < 4) caps = 4;
    }

    setResults({ corners, wallFloor, wallCeiling, caps });
    setShowResults(true);
  };

  const handleDownloadSpec = () => {
    if (!results) return;

    let spec = '=== СПЕЦИФИКАЦИЯ МАТЕРИАЛОВ ===\n';
    spec += 'ООО "Фора"\n';
    spec += 'www.fora-clean.ru\n\n';
    spec += 'Параметры помещения:\n';
    spec += `- Длина: ${roomLength} м\n`;
    spec += `- Ширина: ${roomWidth} м\n`;
    spec += `- Высота: ${roomHeight} м\n`;
    spec += `- Тип профиля: ${profileType.toUpperCase()}\n\n`;
    spec += 'Расчет материалов:\n';
    spec += `- Угловые соединители ${profileType.toUpperCase()}: ${results.corners} шт.\n`;
    spec += `- Соединители стена-пол ${profileType.toUpperCase()}: ${results.wallFloor} шт.\n`;
    spec += `- Соединители стена-потолок ${profileType.toUpperCase()}: ${results.wallCeiling} шт.\n`;
    spec += `- Заглушки торцевые ${profileType.toUpperCase()}: ${results.caps} шт.\n\n`;
    spec += 'Для получения коммерческого предложения\n';
    spec += 'свяжитесь с нами:\n';
    spec += 'Тел: +7 (909) 297-41-44\n';
    spec += 'Email: zuev621@mail.ru\n';

    const blob = new Blob([spec], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'specification_fora.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="calculator-body">
      {/* Room Parameters */}
      <div className="calc-section">
        <h4><FontAwesomeIcon icon={faRulerCombined} /> Параметры помещения</h4>
        <div className="calc-inputs">
          <div className="calc-input">
            <label>Длина стен (м)</label>
            <input 
              type="number" 
              min={0} 
              step={0.1} 
              value={roomLength}
              onChange={(e) => setRoomLength(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="calc-input">
            <label>Ширина стен (м)</label>
            <input 
              type="number" 
              min={0} 
              step={0.1} 
              value={roomWidth}
              onChange={(e) => setRoomWidth(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="calc-input">
            <label>Высота (м)</label>
            <input 
              type="number" 
              min={0} 
              step={0.1} 
              value={roomHeight}
              onChange={(e) => setRoomHeight(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      {/* Profile Type */}
      <div className="calc-section">
        <h4><FontAwesomeIcon icon={faSlidersH} /> Тип профиля</h4>
        <div className="calc-radio-group">
          <div className="calc-radio">
            <input 
              type="radio" 
              id="profileR50" 
              name="profileType" 
              value="r50" 
              checked={profileType === 'r50'}
              onChange={(e) => setProfileType(e.target.value)}
            />
            <label htmlFor="profileR50">R50 (радиус 50 мм)</label>
          </div>
          <div className="calc-radio">
            <input 
              type="radio" 
              id="profileR70" 
              name="profileType" 
              value="r70"
              checked={profileType === 'r70'}
              onChange={(e) => setProfileType(e.target.value)}
            />
            <label htmlFor="profileR70">R70 (радиус 70 мм)</label>
          </div>
        </div>
      </div>

      {/* Elements to Calculate */}
      <div className="calc-section">
        <h4><FontAwesomeIcon icon={faCheckSquare} /> Элементы для расчета</h4>
        <div className="calc-checkboxes">
          <div className="calc-checkbox">
            <input 
              type="checkbox" 
              id="includeCorners" 
              checked={includeCorners}
              onChange={(e) => setIncludeCorners(e.target.checked)}
            />
            <label htmlFor="includeCorners">
              <strong>Угловые соединители</strong>
              <small>Внутренние углы стена-стена</small>
            </label>
          </div>
          <div className="calc-checkbox">
            <input 
              type="checkbox" 
              id="includeWallFloor" 
              checked={includeWallFloor}
              onChange={(e) => setIncludeWallFloor(e.target.checked)}
            />
            <label htmlFor="includeWallFloor">
              <strong>Соединители стена-пол</strong>
              <small>По периметру пола</small>
            </label>
          </div>
          <div className="calc-checkbox">
            <input 
              type="checkbox" 
              id="includeWallCeiling" 
              checked={includeWallCeiling}
              onChange={(e) => setIncludeWallCeiling(e.target.checked)}
            />
            <label htmlFor="includeWallCeiling">
              <strong>Соединители стена-потолок</strong>
              <small>По периметру потолка</small>
            </label>
          </div>
          <div className="calc-checkbox">
            <input 
              type="checkbox" 
              id="includeCaps" 
              checked={includeCaps}
              onChange={(e) => setIncludeCaps(e.target.checked)}
            />
            <label htmlFor="includeCaps">
              <strong>Заглушки торцевые</strong>
              <small>Для окончаний профилей</small>
            </label>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <button className="btn btn-primary btn-block" onClick={handleCalculate}>
        <FontAwesomeIcon icon={faCalculator} /> Рассчитать
      </button>

      {/* Results */}
      {showResults && results && (
        <div className="calc-results">
          <h4><FontAwesomeIcon icon={faClipboardList} /> Результаты расчета</h4>
          <div className="results-grid">
            <div className="result-item">
              <span className="result-label">Угловые соединители</span>
              <span className="result-value">{results.corners} шт.</span>
            </div>
            <div className="result-item">
              <span className="result-label">Соединители стена-пол</span>
              <span className="result-value">{results.wallFloor} шт.</span>
            </div>
            <div className="result-item">
              <span className="result-label">Соединители стена-потолок</span>
              <span className="result-value">{results.wallCeiling} шт.</span>
            </div>
            <div className="result-item">
              <span className="result-label">Заглушки торцевые</span>
              <span className="result-value">{results.caps} шт.</span>
            </div>
          </div>
          <div className="calc-actions">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} /> Добавить в запрос КП
            </button>
            <button className="btn btn-outline" onClick={handleDownloadSpec}>
              <FontAwesomeIcon icon={faDownload} /> Скачать спецификацию
            </button>
            <Link href="/contacts" className="btn btn-outline">
              <FontAwesomeIcon icon={faPhone} /> Получить консультацию
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
