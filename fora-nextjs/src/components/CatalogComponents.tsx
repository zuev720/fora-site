'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Product, filterOptions } from '@/data/products';
import { useCart } from '@/components/LayoutWrapper';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      specs: product.specs,
    });
  };

  return (
    <div className="product-card" data-type={product.type} data-radius={product.radius}>
      <div className="product-image">
        <Image
          src={product.image}
          alt={product.name}
          width={180}
          height={180}
          style={{ objectFit: 'contain' }}
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">
          <Link href={`/catalog/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className="product-specs">
          <span>{product.specs}</span>
        </div>
        <div className="product-actions">
          <button className="btn btn-primary btn-sm" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faPlus} /> В запрос КП
          </button>
          <Link href={`/catalog/${product.slug}`} className="btn btn-outline btn-sm">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
}

interface CatalogFiltersProps {
  selectedTypes: string[];
  selectedRadii: string[];
  onTypeChange: (types: string[]) => void;
  onRadiusChange: (radii: string[]) => void;
  onReset: () => void;
}

export function CatalogFilters({
  selectedTypes,
  selectedRadii,
  onTypeChange,
  onRadiusChange,
  onReset,
}: CatalogFiltersProps) {
  const [typeExpanded, setTypeExpanded] = useState(true);
  const [radiusExpanded, setRadiusExpanded] = useState(true);

  const handleTypeToggle = (typeId: string) => {
    if (selectedTypes.includes(typeId)) {
      onTypeChange(selectedTypes.filter((t) => t !== typeId));
    } else {
      onTypeChange([...selectedTypes, typeId]);
    }
  };

  const handleRadiusToggle = (radiusId: string) => {
    if (selectedRadii.includes(radiusId)) {
      onRadiusChange(selectedRadii.filter((r) => r !== radiusId));
    } else {
      onRadiusChange([...selectedRadii, radiusId]);
    }
  };

  const hasFilters = selectedTypes.length > 0 || selectedRadii.length > 0;

  return (
    <aside className="filters-sidebar">
      <div className="filters-header">
        <h3><FontAwesomeIcon icon={faFilter} /> Фильтры</h3>
        {hasFilters && (
          <button className="filters-reset" onClick={onReset}>
            <FontAwesomeIcon icon={faTimes} /> Сбросить
          </button>
        )}
      </div>

      <div className="filter-group">
        <div 
          className="filter-group-header" 
          onClick={() => setTypeExpanded(!typeExpanded)}
        >
          <h4>По типу элемента</h4>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={typeExpanded ? 'expanded' : ''} 
          />
        </div>
        {typeExpanded && (
          <div className="filter-options">
            {filterOptions.types.map((type) => (
              <label key={type.id} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => handleTypeToggle(type.id)}
                />
                <span className="checkmark"></span>
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-group">
        <div 
          className="filter-group-header" 
          onClick={() => setRadiusExpanded(!radiusExpanded)}
        >
          <h4>По радиусу профиля</h4>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={radiusExpanded ? 'expanded' : ''} 
          />
        </div>
        {radiusExpanded && (
          <div className="filter-options">
            {filterOptions.radii.map((radius) => (
              <label key={radius.id} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedRadii.includes(radius.id)}
                  onChange={() => handleRadiusToggle(radius.id)}
                />
                <span className="checkmark"></span>
                <span>{radius.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-cta">
        <p>Не нашли нужный элемент?</p>
        <Link href="/custom-orders" className="btn btn-outline btn-sm btn-block">
          Заказать по чертежам
        </Link>
      </div>
    </aside>
  );
}
