'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faIndustry, 
  faShieldAlt, 
  faDraftingCompass,
  faDownload,
  faComments,
  faCalculator,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

interface SlideButton {
  text: string;
  href: string;
  icon: IconDefinition;
}

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  icon: IconDefinition;
  primaryButton: SlideButton;
  secondaryButton: SlideButton;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/engineering-banner-proffesion.webp',
    title: 'Индивидуальные решения',
    subtitle: 'Изготовление по вашим чертежам',
    description: 'Нестандартные радиусы R40-R70, любые размеры, порошковая окраска в любой цвет RAL.',
    icon: faDraftingCompass,
    primaryButton: {
      text: 'Заказать по чертежам',
      href: '/custom-orders',
      icon: faDraftingCompass,
    },
    secondaryButton: {
      text: 'Перейти в каталог',
      href: '/catalog',
      icon: faComments,
    },
  },
  {
    id: 2,
    image: '/banner-manufacturing.webp',
    title: 'Производство полного цикла',
    subtitle: 'От отливки до порошковой окраски',
    description: 'Собственное производство на современных станках с ЧПУ. Точность обработки, контроль качества на каждом этапе.',
    icon: faIndustry,
    primaryButton: {
      text: 'Смотреть производство',
      href: '/production',
      icon: faIndustry,
    },
    secondaryButton: {
      text: 'Получить консультацию',
      href: '/contacts',
      icon: faComments,
    },
  },
  {
    id: 3,
    image: '/banner-cleanroom.webp',
    title: 'Для чистых помещений',
    subtitle: 'Соответствие стандартам GMP и ISO',
    description: 'Соединительные элементы для фармацевтики, медицины, пищевой промышленности. Класс чистоты ISO 5-8.',
    icon: faShieldAlt,
    primaryButton: {
      text: 'Скачать каталог PDF',
      href: '/api/generate-catalog',
      icon: faDownload,
    },
    secondaryButton: {
      text: 'Рассчитать заказ',
      href: '/calculator',
      icon: faCalculator,
    },
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Memoize counter display
  const slideCounter = useMemo(() => ({
    current: String(currentSlide + 1).padStart(2, '0'),
    total: String(slides.length).padStart(2, '0'),
  }), [currentSlide]);

  return (
    <section className="hero-carousel" aria-label="Баннер карусель">
      {/* Background Images Layer */}
      <div className="carousel-backgrounds" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-bg ${index === currentSlide ? 'active' : ''}`}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              quality={85}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="carousel-overlay" />
          </div>
        ))}
      </div>

      {/* Main Content Layer */}
      <div className="carousel-wrapper">
        <div className="container">
          <div className="carousel-layout">
            {/* Content Area - Fixed Height Container */}
            <div className="carousel-content-area">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                  aria-hidden={index !== currentSlide}
                >
                  <span className="carousel-badge">
                    <FontAwesomeIcon icon={slide.icon} />
                    <span>{slide.subtitle}</span>
                  </span>
                  
                  <h1 className="carousel-title">{slide.title}</h1>
                  
                  <p className="carousel-description">{slide.description}</p>
                  
                  <div className="carousel-buttons">
                    <Link 
                      href={slide.primaryButton.href} 
                      className="btn btn-primary btn-lg"
                      tabIndex={index === currentSlide ? 0 : -1}
                    >
                      <FontAwesomeIcon icon={slide.primaryButton.icon} />
                      {slide.primaryButton.text}
                    </Link>
                    <Link 
                      href={slide.secondaryButton.href} 
                      className="btn btn-outline btn-lg btn-light"
                      tabIndex={index === currentSlide ? 0 : -1}
                    >
                      <FontAwesomeIcon icon={slide.secondaryButton.icon} />
                      {slide.secondaryButton.text}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="carousel-controls">
              <nav className="carousel-nav" aria-label="Навигация карусели">
                <button 
                  className="carousel-arrow carousel-prev" 
                  onClick={prevSlide}
                  aria-label="Предыдущий слайд"
                  type="button"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                
                <div className="carousel-dots" role="tablist">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Слайд ${index + 1}`}
                      aria-selected={index === currentSlide}
                      role="tab"
                      type="button"
                    />
                  ))}
                </div>
                
                <button 
                  className="carousel-arrow carousel-next" 
                  onClick={nextSlide}
                  aria-label="Следующий слайд"
                  type="button"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </nav>

              {/* Slide Counter */}
              <div className="carousel-counter" aria-live="polite">
                <span className="current">{slideCounter.current}</span>
                <span className="separator">/</span>
                <span className="total">{slideCounter.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
