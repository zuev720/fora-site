// Данные о товарах для каталога
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  type: 'inner-corner' | 'outer-corner' | 'caps';
  radius: 'r40' | 'r50' | 'r55' | 'r65' | 'r70';
  radiusValue: number; // Числовое значение радиуса в мм
  image: string;
  badge?: string;
  specs: string;
  description: string;
  sku: string;
  basePrice: number; // Базовая цена в рублях (без покрытия)
  material: string; // Материал
}

// Надбавка за порошковую окраску
export const POWDER_COATING_PRICE = 40;

export const products: Product[] = [
  {
    id: 'corner-r50-inner',
    name: 'Угловой соединитель R50 (внутренний угол)',
    slug: 'uglovoy-soedinitel-r50',
    category: 'Угловые соединители',
    categorySlug: 'corner',
    type: 'inner-corner',
    radius: 'r50',
    radiusValue: 50,
    image: '/internal-angle50.png',
    badge: 'Хит продаж',
    specs: 'R50',
    description: 'Алюминиевый угловой соединитель для создания гигиеничных скругленных внутренних углов в системах ограждения чистых помещений.',
    sku: 'R50-USC-INT',
    basePrice: 350,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r50-outer',
    name: 'Угловой соединитель R50 (внешний угол)',
    slug: 'uglovoy-soedinitel-r50-outer',
    category: 'Угловые соединители',
    categorySlug: 'corner',
    type: 'outer-corner',
    radius: 'r50',
    radiusValue: 50,
    image: '/outer-corner70.png',
    specs: 'R50',
    description: 'Алюминиевый угловой соединитель для создания гигиеничных скругленных внешних углов.',
    sku: 'R50-USC-EXT',
    basePrice: 380,
    material: 'Алюминий АД31',
  },
  {
    id: 'cap-r50',
    name: 'Заглушка торцевая R50',
    slug: 'zaglushka-r50',
    category: 'Заглушки торцевые',
    categorySlug: 'caps',
    type: 'caps',
    radius: 'r50',
    radiusValue: 50,
    image: '/plug50.png',
    specs: 'R50',
    description: 'Торцевая заглушка для профилей R50. Обеспечивает герметичное закрытие торцов профилей.',
    sku: 'R50-CAP',
    basePrice: 120,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r70-inner',
    name: 'Угловой соединитель R70 (внутренний угол)',
    slug: 'uglovoy-soedinitel-r70',
    category: 'Угловые соединители',
    categorySlug: 'corner',
    type: 'inner-corner',
    radius: 'r70',
    radiusValue: 70,
    image: '/internal-angle70.png',
    badge: 'Хит продаж',
    specs: 'R70',
    description: 'Алюминиевый угловой соединитель R70 для создания гигиеничных скругленных внутренних углов.',
    sku: 'R70-USC-INT',
    basePrice: 420,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r70-outer',
    name: 'Угловой соединитель R70 (внешний угол)',
    slug: 'uglovoy-soedinitel-r70-outer',
    category: 'Угловые соединители',
    categorySlug: 'corner',
    type: 'outer-corner',
    radius: 'r70',
    radiusValue: 70,
    image: '/Remove_all_metal_mounting_brackets_and_plates_from-1769858407435.png',
    specs: 'R70',
    description: 'Алюминиевый угловой соединитель R70 для создания гигиеничных скругленных внешних углов.',
    sku: 'R70-USC-EXT',
    basePrice: 450,
    material: 'Алюминий АД31',
  },
  {
    id: 'cap-r70',
    name: 'Заглушка торцевая R70',
    slug: 'zaglushka-r70',
    category: 'Заглушки торцевые',
    categorySlug: 'caps',
    type: 'caps',
    radius: 'r70',
    radiusValue: 70,
    image: '/plug50.png',
    specs: 'R70',
    description: 'Торцевая заглушка для профилей R70.',
    sku: 'R70-CAP',
    basePrice: 150,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r40-inner',
    name: 'Угловой соединитель R40 (внутренний угол)',
    slug: 'uglovoy-soedinitel-r40',
    category: 'Угловые соединители',
    categorySlug: 'corner',
    type: 'inner-corner',
    radius: 'r40',
    radiusValue: 40,
    image: '/internal-angle50.png',
    specs: 'R40',
    description: 'Компактный угловой соединитель R40 для внутренних углов.',
    sku: 'R40-USC-INT',
    basePrice: 300,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r40-outer',
    name: 'Угловой соединитель R40 (внешний угол)',
    slug: 'uglovoy-soedinitel-r40-outer',
    category: 'Угловые соединители',
    categorySlug: 'corner',
    type: 'outer-corner',
    radius: 'r40',
    radiusValue: 40,
    image: '/outer-corner70.png',
    specs: 'R40',
    description: 'Компактный угловой соединитель R40 для внешних углов.',
    sku: 'R40-USC-EXT',
    basePrice: 320,
    material: 'Алюминий АД31',
  },
  {
    id: 'cap-r40',
    name: 'Заглушка торцевая R40',
    slug: 'zaglushka-r40',
    category: 'Заглушки торцевые',
    categorySlug: 'caps',
    type: 'caps',
    radius: 'r40',
    radiusValue: 40,
    image: '/plug50.png',
    specs: 'R40',
    description: 'Торцевая заглушка для профилей R40.',
    sku: 'R40-CAP',
    basePrice: 100,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r55-inner',
    name: 'Угловой соединитель R55 (внутренний угол)',
    slug: 'uglovoy-soedinitel-r55',
    category: 'Угловые соединители',
    categorySlug: 'corner',
    type: 'inner-corner',
    radius: 'r55',
    radiusValue: 55,
    image: '/internal-angle50.png',
    specs: 'R55',
    description: 'Угловой соединитель R55 для внутренних углов.',
    sku: 'R55-USC-INT',
    basePrice: 370,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r55-outer',
    name: 'Угловой соединитель R55 (внешний угол)',
    slug: 'uglovoy-soedinitel-r55-outer',
    category: 'Угловые соединители',
    categorySlug: 'corner',
    type: 'outer-corner',
    radius: 'r55',
    radiusValue: 55,
    image: '/outer-corner70.png',
    specs: 'R55',
    description: 'Угловой соединитель R55 для внешних углов.',
    sku: 'R55-USC-EXT',
    basePrice: 400,
    material: 'Алюминий АД31',
  },
  {
    id: 'cap-r55',
    name: 'Заглушка торцевая R55',
    slug: 'zaglushka-r55',
    category: 'Заглушки торцевые',
    categorySlug: 'caps',
    type: 'caps',
    radius: 'r55',
    radiusValue: 55,
    image: '/plug50.png',
    specs: 'R55',
    description: 'Торцевая заглушка для профилей R55.',
    sku: 'R55-CAP',
    basePrice: 130,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r65-outer',
    name: 'Угловой соединитель R65 (внешний угол)',
    slug: 'uglovoy-soedinitel-r65-outer',
    category: 'Угловые соединители',
    categorySlug: 'corner',
    type: 'outer-corner',
    radius: 'r65',
    radiusValue: 65,
    image: '/outer-corner70.png',
    specs: 'R65',
    description: 'Угловой соединитель R65 для внешних углов.',
    sku: 'R65-USC-EXT',
    basePrice: 430,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r50-inner-linoleum',
    name: 'Угловой соединитель R50 (внутренний угол) под линолеум',
    slug: 'uglovoy-soedinitel-r50-linoleum',
    category: 'Угловые соединители с заводом под линолеум',
    categorySlug: 'linoleum',
    type: 'inner-corner',
    radius: 'r50',
    radiusValue: 50,
    image: '/internal-angle50.png',
    badge: 'Новинка',
    specs: 'R50',
    description: 'Угловой соединитель R50 с заводом под линолеум для внутренних углов.',
    sku: 'R50-USC-INT-LIN',
    basePrice: 400,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r50-outer-linoleum',
    name: 'Угловой соединитель R50 (внешний угол) под линолеум',
    slug: 'uglovoy-soedinitel-r50-outer-linoleum',
    category: 'Угловые соединители с заводом под линолеум',
    categorySlug: 'linoleum',
    type: 'outer-corner',
    radius: 'r50',
    radiusValue: 50,
    image: '/outer-corner70.png',
    specs: 'R50',
    description: 'Угловой соединитель R50 с заводом под линолеум для внешних углов.',
    sku: 'R50-USC-EXT-LIN',
    basePrice: 430,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r70-inner-linoleum',
    name: 'Угловой соединитель R70 (внутренний угол) под линолеум',
    slug: 'uglovoy-soedinitel-r70-linoleum',
    category: 'Угловые соединители с заводом под линолеум',
    categorySlug: 'linoleum',
    type: 'inner-corner',
    radius: 'r70',
    radiusValue: 70,
    image: '/internal-angle70.png',
    specs: 'R70',
    description: 'Угловой соединитель R70 с заводом под линолеум для внутренних углов.',
    sku: 'R70-USC-INT-LIN',
    basePrice: 470,
    material: 'Алюминий АД31',
  },
  {
    id: 'corner-r70-outer-linoleum',
    name: 'Угловой соединитель R70 (внешний угол) под линолеум',
    slug: 'uglovoy-soedinitel-r70-outer-linoleum',
    category: 'Угловые соединители с заводом под линолеум',
    categorySlug: 'linoleum',
    type: 'outer-corner',
    radius: 'r70',
    radiusValue: 70,
    image: '/Remove_all_metal_mounting_brackets_and_plates_from-1769858407435.png',
    specs: 'R70',
    description: 'Угловой соединитель R70 с заводом под линолеум для внешних углов.',
    sku: 'R70-USC-EXT-LIN',
    basePrice: 500,
    material: 'Алюминий АД31',
  },
  {
    id: 'cap-r50-linoleum',
    name: 'Заглушка торцевая R50 под линолеум',
    slug: 'zaglushka-r50-linoleum',
    category: 'Заглушки торцевые',
    categorySlug: 'caps',
    type: 'caps',
    radius: 'r50',
    radiusValue: 50,
    image: '/plug50.png',
    specs: 'R50',
    description: 'Заглушка торцевая R50 с заводом под линолеум.',
    sku: 'R50-CAP-LIN',
    basePrice: 150,
    material: 'Алюминий АД31',
  },
  {
    id: 'cap-r70-linoleum',
    name: 'Заглушка торцевая R70 под линолеум',
    slug: 'zaglushka-r70-linoleum',
    category: 'Заглушки торцевые',
    categorySlug: 'caps',
    type: 'caps',
    radius: 'r70',
    radiusValue: 70,
    image: '/plug50.png',
    specs: 'R70',
    description: 'Заглушка торцевая R70 с заводом под линолеум.',
    sku: 'R70-CAP-LIN',
    basePrice: 180,
    material: 'Алюминий АД31',
  },
];

export const filterOptions = {
  types: [
    { id: 'inner-corner', label: 'Внутренний угол' },
    { id: 'outer-corner', label: 'Внешний угол' },
    { id: 'caps', label: 'Заглушки торцевые' },
  ],
  radii: [
    { id: 'r40', label: 'R40' },
    { id: 'r50', label: 'R50' },
    { id: 'r55', label: 'R55' },
    { id: 'r65', label: 'R65' },
    { id: 'r70', label: 'R70' },
  ],
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function filterProducts(
  typeFilters: string[],
  radiusFilters: string[]
): Product[] {
  return products.filter((product) => {
    const typeMatch =
      typeFilters.length === 0 || typeFilters.includes(product.type);
    const radiusMatch =
      radiusFilters.length === 0 || radiusFilters.includes(product.radius);
    return typeMatch && radiusMatch;
  });
}

// Функция расчёта цены с учётом покрытия
export function calculatePrice(basePrice: number, hasPowderCoating: boolean): number {
  return hasPowderCoating ? basePrice + POWDER_COATING_PRICE : basePrice;
}

// Функция форматирования цены
export function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU') + ' ₽';
}
