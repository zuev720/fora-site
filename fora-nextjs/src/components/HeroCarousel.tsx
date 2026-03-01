'use client';

import { useState, useEffect, useCallback } from 'react';
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
  faCalculator
} from '@fortawesome/free-solid-svg-icons';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof faIndustry;
  primaryButton: {
    text: string;
    href: string;
    icon: typeof faDownload;
  };
  secondaryButton: {
    text: string;
    href: string;
    icon: typeof faComments;
  };
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
      href: '/documents/fora-catalog.pdf',
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="hero-carousel">

      {/* Background Images */}
      <div className="carousel-backgrounds">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`carousel-bg ${index === currentSlide ? 'active' : ''}`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={index === 0}
              quality={90}
              style={{ objectFit: 'cover' }}
            />
            <div className="carousel-overlay" />
          </div>
        ))}
      </div>

      {/* All slide contents rendered simultaneously, switched via CSS */}
      <div className="carousel-slides-wrapper">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`carousel-slide-content ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="container">
              <div className="carousel-content">
                <div className="carousel-badge">
                  <FontAwesomeIcon icon={s.icon} />
                  <span>{s.subtitle}</span>
                </div>

                <h1 className="carousel-title">{s.title}</h1>

                <p className="carousel-description">{s.description}</p>

                <div className="carousel-buttons">
                  <Link href={s.primaryButton.href} className="btn btn-primary btn-lg">
                    <FontAwesomeIcon icon={s.primaryButton.icon} />
                    {s.primaryButton.text}
                  </Link>
                  <Link href={s.secondaryButton.href} className="btn btn-outline btn-lg btn-light">
                    <FontAwesomeIcon icon={s.secondaryButton.icon} />
                    {s.secondaryButton.text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="container carousel-controls-container">
        <div className="carousel-nav">
          <button
            className="carousel-arrow carousel-prev"
            onClick={prevSlide}
            aria-label="Предыдущий слайд"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Слайд ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="carousel-arrow carousel-next"
            onClick={nextSlide}
            aria-label="Следующий слайд"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="carousel-counter">
          <span className="current">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="separator">/</span>
          <span className="total">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>

    </section>
  );
}
