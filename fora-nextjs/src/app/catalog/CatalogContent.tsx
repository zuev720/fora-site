'use client';

import { useState, useMemo } from 'react';
import { products, filterProducts } from '@/data/products';
import { ProductCard, CatalogFilters } from '@/components/CatalogComponents';

export default function CatalogContent() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRadii, setSelectedRadii] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return filterProducts(selectedTypes, selectedRadii);
  }, [selectedTypes, selectedRadii]);

  const handleReset = () => {
    setSelectedTypes([]);
    setSelectedRadii([]);
  };

  return (
    <div className="catalog-layout">
      <CatalogFilters
        selectedTypes={selectedTypes}
        selectedRadii={selectedRadii}
        onTypeChange={setSelectedTypes}
        onRadiusChange={setSelectedRadii}
        onReset={handleReset}
      />

      <div className="catalog-main">
        <div className="catalog-header">
          <div className="catalog-count">
            Найдено <strong>{filteredProducts.length}</strong> товаров
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="catalog-empty">
            <p>По выбранным фильтрам товары не найдены.</p>
            <button className="btn btn-outline" onClick={handleReset}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
