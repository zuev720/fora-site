'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import CartSidebar, { CartItem } from './CartSidebar';
import StickyPanel from './StickyPanel';
import CallbackModal from './CallbackModal';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('foraCart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('foraCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartContext: CartContextType = {
    items: cartItems,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
  };

  return (
    <CartContext.Provider value={cartContext}>
      <Header
        onCartOpen={() => setIsCartOpen(true)}
        onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
        cartCount={totalItems}
      />
      
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onClear={clearCart}
      />
      
      <main>{children}</main>
      
      <Footer />
      
      <StickyPanel
        cartCount={totalItems}
        onCartOpen={() => setIsCartOpen(true)}
        onCallbackOpen={() => setIsCallbackOpen(true)}
      />
      
      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />
    </CartContext.Provider>
  );
}
