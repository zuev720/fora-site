'use client';

/**
 * HeroCarousel — главный баннер на основе Swiper v12
 *
 * Особенности реализации:
 * - 'use client' только для этого компонента; page.tsx остаётся Server Component
 * - Swiper инициализируется только на клиенте (dynamic import с ssr:false не нужен,
 *   т.к. мы управляем монтированием через useEffect + флаг isMounted)
 * - SEO: весь текст всех слайдов присутствует в DOM при SSR через «SEO-fallback» разметку
 *   (visually-hidden список), которая скрывается CSS после hydration
 * - Swiper CSS импортируется только здесь — не засоряет глобальный бандл
 * - Полностью адаптивный (mobile-first)
 * - Доступность: aria-label на секции, aria-label / aria-current на кнопках пагинации
 */

import { useEffect, useRef, useState } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import type { Swiper as SwiperClass } from 'swiper';

/* ───────── данные слайдов ───────── */

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof faIndustry;
  primaryButton: { text: string; href: string; icon: typeof faDownload };
  secondaryButton: { text: string; href: string; icon: typeof faComments };
}

const slides: SlideData[] = [
  {
    id: 1,
    image: '/engineering-banner-proffesion.webp',
    title: 'Индивидуальные решения',
    subtitle: 'Изготовление по вашим чертежам',
    description:
      'Нестандартные радиусы R40-R70, любые размеры, порошковая окраска в любой цвет RAL.',
    icon: faDraftingCompass,
    primaryButton: { text: 'Заказать по чертежам', href: '/custom-orders', icon: faDraftingCompass },
    secondaryButton: { text: 'Перейти в каталог', href: '/catalog', icon: faComments },
  },
  {
    id: 2,
    image: '/banner-manufacturing.webp',
    title: 'Производство полного цикла',
    subtitle: 'От отливки до порошковой окраски',
    description:
      'Собственное производство на современных станках с ЧПУ. Точность обработки, контроль качества на каждом этапе.',
    icon: faIndustry,
    primaryButton: { text: 'Смотреть производство', href: '/production', icon: faIndustry },
    secondaryButton: { text: 'Получить консультацию', href: '/contacts', icon: faComments },
  },
  {
    id: 3,
    image: '/banner-cleanroom.webp',
    title: 'Для чистых помещений',
    subtitle: 'Соответствие стандартам GMP и ISO',
    description:
      'Соединительные элементы для фармацевтики, медицины, пищевой промышленности. Класс чистоты ISO 5-8.',
    icon: faShieldAlt,
    primaryButton: { text: 'Скачать каталог PDF', href: '/documents/fora-catalog.pdf', icon: faDownload },
    secondaryButton: { text: 'Рассчитать заказ', href: '/calculator', icon: faCalculator },
  },
];

/* ───────── компонент ───────── */

export default function HeroCarousel() {
  const swiperElRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  /* Инициализируем Swiper только на клиенте */
  useEffect(() => {
    setIsMounted(true);

    let swiperInstance: SwiperClass | null = null;

    const init = async () => {
      const [{ Swiper }, { Autoplay, EffectFade, A11y, Keyboard }] = await Promise.all([
        import('swiper'),
        import('swiper/modules'),
      ]);

      // Импортируем CSS только один раз — при первом монтировании
      await Promise.all([
        import('swiper/css'),
        import('swiper/css/effect-fade'),
        import('swiper/css/autoplay'),
        import('swiper/css/a11y'),
      ]);

      if (!swiperElRef.current) return;

      swiperInstance = new Swiper(swiperElRef.current, {
        modules: [Autoplay, EffectFade, A11y, Keyboard],
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 800,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        keyboard: { enabled: true },
        a11y: {
          prevSlideMessage: 'Предыдущий слайд',
          nextSlideMessage: 'Следующий слайд',
          paginationBulletMessage: 'Перейти к слайду {{index}}',
        },
        on: {
          slideChange(swiper) {
            setActiveIndex(swiper.realIndex);
          },
        },
      });

      swiperInstanceRef.current = swiperInstance;
    };

    init();

    return () => {
      swiperInstance?.destroy(true, true);
    };
  }, []);

  const prevSlide = () => swiperInstanceRef.current?.slidePrev();
  const nextSlide = () => swiperInstanceRef.current?.slideNext();
  const goToSlide = (index: number) => {
    const swiper = swiperInstanceRef.current;
    if (!swiper) return;
    swiper.slideToLoop(index);
    swiper.autoplay.stop();
    setTimeout(() => swiper.autoplay.start(), 10000);
  };

  return (
    <section className="hero-carousel" aria-label="Главный баннер">

      {/*
        ── SEO-fallback ──────────────────────────────────────────────────────
        Этот блок виден только поисковым роботам (и до гидратации).
        После монтирования он скрывается классом hero-carousel--mounted.
        Весь текст всех слайдов индексируется без JS.
      */}
      <div className="hc-seo-fallback" aria-hidden="true">
        {slides.map((s) => (
          <div key={s.id}>
            <h1>{s.title}</h1>
            <p>{s.subtitle}</p>
            <p>{s.description}</p>
          </div>
        ))}
      </div>

      {/*
        ── Swiper container ──────────────────────────────────────────────────
        Инициализируется через useEffect; до монтирования показывает
        первый слайд без анимации (CSS-fallback через :not(.swiper-initialized)).
      */}
      <div
        ref={swiperElRef}
        className={`swiper hc-swiper${isMounted ? ' hc-swiper--active' : ''}`}
      >
        <div className="swiper-wrapper">
          {slides.map((s, index) => (
            <div key={s.id} className="swiper-slide hc-slide">

              {/* Фоновое изображение */}
              <div className="hc-slide__bg">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  priority={index === 0}
                  quality={100}
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className="hc-slide__overlay" />
              </div>

              {/* Контент слайда */}
              <div className="container hc-slide__body">
                <div className="hc-content">
                  <div className="hc-badge">
                    <FontAwesomeIcon icon={s.icon} aria-hidden="true" />
                    <span>{s.subtitle}</span>
                  </div>

                  {/* h1 только у первого слайда; остальные — p с визуальным стилем h1 */}
                  {index === 0 ? (
                    <h1 className="hc-title">{s.title}</h1>
                  ) : (
                    <p className="hc-title" role="heading" aria-level={2}>{s.title}</p>
                  )}

                  <p className="hc-description">{s.description}</p>

                  <div className="hc-buttons">
                    <Link href={s.primaryButton.href} className="btn btn-primary btn-lg">
                      <FontAwesomeIcon icon={s.primaryButton.icon} aria-hidden="true" />
                      {s.primaryButton.text}
                    </Link>
                    <Link href={s.secondaryButton.href} className="btn btn-outline btn-lg btn-light">
                      <FontAwesomeIcon icon={s.secondaryButton.icon} aria-hidden="true" />
                      {s.secondaryButton.text}
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ── Управление (стрелки + точки + счётчик) ─────────────────────── */}
      <div className="container hc-controls">

        <nav className="hc-nav" aria-label="Навигация по слайдам">
          <button
            className="hc-arrow hc-arrow--prev"
            onClick={prevSlide}
            aria-label="Предыдущий слайд"
          >
            <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
          </button>

          <div className="hc-dots" role="tablist" aria-label="Слайды">
            {slides.map((s, index) => (
              <button
                key={s.id}
                role="tab"
                className={`hc-dot${activeIndex === index ? ' hc-dot--active' : ''}`}
                aria-label={`Слайд ${index + 1}: ${s.title}`}
                aria-selected={activeIndex === index}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          <button
            className="hc-arrow hc-arrow--next"
            onClick={nextSlide}
            aria-label="Следующий слайд"
          >
            <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          </button>
        </nav>

        <div className="hc-counter" aria-hidden="true">
          <span className="hc-counter__current">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="hc-counter__sep">/</span>
          <span className="hc-counter__total">{String(slides.length).padStart(2, '0')}</span>
        </div>

      </div>
    </section>
  );
}
