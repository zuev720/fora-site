'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import CartSidebar, { CartItem } from './CartSidebar';
import StickyPanel from './StickyPanel';
import CallbackModal from './CallbackModal';
import ExcursionModal from './ExcursionModal';
import ChatWidget from './ChatWidget';
import { POWDER_COATING_PRICE } from '@/data/products';

interface CartContextType {
  items: CartItem[];
  addItem: (item: {
    id: string;
    name: string;
    specs: string;
    quantity?: number;
    basePrice: number;
    hasPowderCoating: boolean;
  }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateCoating: (id: string, hasPowderCoating: boolean) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalSum: number;
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

// Функция для расчёта цен товара
function calculateItemPrices(basePrice: number, hasPowderCoating: boolean, quantity: number): {
  unitPrice: number;
  totalPrice: number;
} {
  const unitPrice = hasPowderCoating ? basePrice + POWDER_COATING_PRICE : basePrice;
  return {
    unitPrice,
    totalPrice: unitPrice * quantity,
  };
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isExcursionOpen, setIsExcursionOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
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

  const addItem = (item: {
    id: string;
    name: string;
    specs: string;
    quantity?: number;
    basePrice: number;
    hasPowderCoating: boolean;
  }) => {
    const quantity = Math.min(Math.max(item.quantity || 1, 1), 4000);
    const prices = calculateItemPrices(item.basePrice, item.hasPowderCoating, quantity);
    
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.hasPowderCoating === item.hasPowderCoating);
      if (existing) {
        const newQuantity = Math.min(existing.quantity + quantity, 4000);
        const newPrices = calculateItemPrices(item.basePrice, item.hasPowderCoating, newQuantity);
        return prev.map((i) =>
          i.id === item.id && i.hasPowderCoating === item.hasPowderCoating
            ? { ...i, quantity: newQuantity, ...newPrices }
            : i
        );
      }
      return [...prev, { 
        id: item.id,
        name: item.name,
        specs: item.specs,
        quantity,
        basePrice: item.basePrice,
        hasPowderCoating: item.hasPowderCoating,
        ...prices,
      }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    const newQuantity = Math.min(Math.max(quantity, 1), 4000);
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const prices = calculateItemPrices(item.basePrice, item.hasPowderCoating, newQuantity);
          return { ...item, quantity: newQuantity, ...prices };
        }
        return item;
      })
    );
  };

  const updateCoating = (id: string, hasPowderCoating: boolean) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const prices = calculateItemPrices(item.basePrice, hasPowderCoating, item.quantity);
          return { ...item, hasPowderCoating, ...prices };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalSum = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const cartContext: CartContextType = {
    items: cartItems,
    addItem,
    updateQuantity,
    updateCoating,
    removeItem,
    clearCart,
    totalItems,
    totalSum,
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
        onChatOpen={() => setIsChatOpen(true)}
      />
      
      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />
      
      <ExcursionModal
        isOpen={isExcursionOpen}
        onClose={() => setIsExcursionOpen(false)}
      />
      
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </CartContext.Provider>
  );
}
