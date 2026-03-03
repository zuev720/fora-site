'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPhone } from '@fortawesome/free-solid-svg-icons';

const navLinks = [
  { href: '/catalog', label: 'Каталог продукции' },
  { href: '/production', label: 'Производство' },
  { href: '/custom-orders', label: 'Индивидуальные заказы' },
  { href: '/documentation', label: 'Документация' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <>
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <Link href="/" onClick={onClose} className="mobile-menu-logo-link">
            <Image
              src="/logo.svg"
              alt="ФОРА"
              width={180}
              height={45}
              className="mobile-menu-logo"
            />
          </Link>
          <button className="mobile-menu-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <nav className="mobile-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={onClose}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a href="tel:+79092974144" className="mobile-phone">
          <FontAwesomeIcon icon={faPhone} /> +7 (909) 297-41-44
        </a>
      </div>
      <div 
        className={`mobile-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
      />
    </>
  );
}
