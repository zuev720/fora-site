'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDraftingCompass, faPlus, faFilter, faTimes, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Product, filterOptions, POWDER_COATING_PRICE, formatPrice } from '@/data/products';
import { useCart } from '@/components/LayoutWrapper';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [hasPowderCoating, setHasPowderCoating] = useState(false);
  
  const unitPrice = hasPowderCoating ? product.basePrice + POWDER_COATING_PRICE : product.basePrice;
  const totalPrice = unitPrice * quantity;

  const handleQuantityChange = (value: number) => {
    const newQty = Math.min(Math.max(value, 1), 4000);
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      specs: product.specs,
      quantity,
      basePrice: product.basePrice,
      hasPowderCoating,
    });
    // Reset form
    setQuantity(1);
    setHasPowderCoating(false);
  };

  return (
    <div className="product-card" data-type={product.type} data-radius={product.radius}>
      <div className="product-image">
        <Link href={`/catalog/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={258}
            height={194}
            quality={100}
            style={{ objectFit: 'cover' }}
          />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">
          <Link href={`/catalog/${product.slug}`}>{product.name}</Link>
        </h3>
        
        <div className="product-specs-list">
          <div className="spec-row">
            <span className="spec-label">Радиус:</span>
            <span className="spec-value">{product.radiusValue} мм</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Материал:</span>
            <span className="spec-value">{product.material}</span>
          </div>
        </div>
        
        <div className="product-coating">
          <span className="coating-label">Покрытие:</span>
          <div className="coating-toggle">
            <button 
              className={`coating-btn ${!hasPowderCoating ? 'active' : ''}`}
              onClick={() => setHasPowderCoating(false)}
              type="button"
            >
              Без покрытия
            </button>
            <button 
              className={`coating-btn ${hasPowderCoating ? 'active' : ''}`}
              onClick={() => setHasPowderCoating(true)}
              type="button"
            >
              Порошковая окраска (+{POWDER_COATING_PRICE}₽)
            </button>
          </div>
        </div>
        
        <div className="product-price-row">
          <span className="price-label">Цена:</span>
          <span className="price-value">{formatPrice(unitPrice)}</span>
        </div>
        
        <div className="product-quantity">
          <span className="qty-label">Количество:</span>
          <div className="qty-input-group">
            <button 
              className="qty-btn"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              type="button"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min="1"
              max="4000"
              className="qty-input"
            />
            <button 
              className="qty-btn"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 4000}
              type="button"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <span className="qty-max">(макс. 4000 шт.)</span>
        </div>
        
        <div className="product-total">
          <span className="total-label">Итого:</span>
          <span className="total-value">{formatPrice(totalPrice)}</span>
        </div>
        
        <div className="product-actions">
          <button className="btn btn-primary" onClick={handleAddToCart}>
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

  return (
    <aside className="filters-sidebar">
      <div className="filters-header">
        <h3><FontAwesomeIcon icon={faFilter} /> Фильтры</h3>
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

      <div className="filter-btn">
        <button className="btn btn-outline" onClick={onReset}>
          <FontAwesomeIcon icon={faTimes} />
          Сбросить фильтры
        </button>
      </div>
      <div className="filter-cta">
        <p>Не нашли нужный элемент?</p>
        <Link href="/custom-orders" className="btn btn-outline btn-sm btn-block">
          <FontAwesomeIcon icon={faDraftingCompass}></FontAwesomeIcon> Заказать по чертежам
        </Link>
      </div>
    </aside>
  );
}
