'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faPhone, faFileInvoice, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const navLinks = [
  { href: '/catalog', label: 'Каталог продукции' },
  { href: '/production', label: 'Производство' },
  { href: '/custom-orders', label: 'Индивидуальные заказы' },
  { href: '/documentation', label: 'Документация' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
];

interface HeaderProps {
  onCartOpen?: () => void;
  onMobileMenuOpen?: () => void;
  cartCount?: number;
}

export default function Header({ onCartOpen, onMobileMenuOpen, cartCount = 0 }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <span className="logo-icon">
              <FontAwesomeIcon icon={faCube} />
            </span>
            <span className="logo-text">ФОРА</span>
          </Link>

          <nav className="main-nav">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={pathname === link.href || pathname.startsWith(link.href + '/') ? 'active' : ''}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <button className="btn-cart" onClick={onCartOpen}>
              <FontAwesomeIcon icon={faFileInvoice} />
              <span>Запрос КП</span>
              <span className="cart-count">{cartCount}</span>
            </button>
            <a href="tel:+79092974144" className="header-phone">
              <FontAwesomeIcon icon={faPhone} />
              <span>+7 (909) 297-41-44</span>
            </a>
          </div>

          <button className="mobile-menu-btn" onClick={onMobileMenuOpen}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </header>
  );
}
