import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, getProductBySlug } from '@/data/products';
import ProductDetail from './ProductDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Товар не найден',
    };
  }

  return {
    title: `${product.name} для чистых помещений - купить в ООО Фора`,
    description: `${product.description} Артикул: ${product.sku}. Порошковое покрытие, соответствие GMP. Производство и доставка по РФ.`,
    keywords: [product.name, product.specs, 'чистые помещения', 'GMP', 'cleanroom'],
    alternates: {
      canonical: `/catalog/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ООО Фора`,
      description: product.description,
      url: `/catalog/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products (same category or radius)
  const relatedProducts = products
    .filter((p) => 
      p.id !== product.id && 
      (p.categorySlug === product.categorySlug || p.radius === product.radius)
    )
    .slice(0, 4);

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Главная</Link>
            <span>/</span>
            <Link href="/catalog">Каталог продукции</Link>
            <span>/</span>
            <Link href={`/catalog?category=${product.categorySlug}`}>{product.category}</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </>
  );
}
