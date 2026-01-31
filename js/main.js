// ===================================
// FORA Corporate Website - Main JavaScript
// ===================================

// Cart Management
const cart = {
    items: JSON.parse(localStorage.getItem('foraCart')) || [],
    
    add(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.items.push({
                ...product,
                quantity: product.quantity || 1
            });
        }
        this.save();
        this.updateUI();
        this.showNotification('Товар добавлен в запрос КП');
    },
    
    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
    },
    
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity) || 1;
            this.save();
            this.updateUI();
        }
    },
    
    clear() {
        this.items = [];
        this.save();
        this.updateUI();
    },
    
    save() {
        localStorage.setItem('foraCart', JSON.stringify(this.items));
    },
    
    getTotal() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    updateUI() {
        // Update cart counts
        const cartCount = document.getElementById('cartCount');
        const stickyCartCount = document.getElementById('stickyCartCount');
        const cartTotal = document.getElementById('cartTotal');
        const total = this.getTotal();
        
        if (cartCount) cartCount.textContent = total;
        if (stickyCartCount) stickyCartCount.textContent = total;
        if (cartTotal) cartTotal.textContent = total;
        
        // Update cart items display
        const cartItems = document.getElementById('cartItems');
        if (cartItems) {
            if (this.items.length === 0) {
                cartItems.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-inbox"></i>
                        <p>Добавьте товары в запрос</p>
                        <a href="catalog.html" class="btn btn-outline btn-sm">Перейти в каталог</a>
                    </div>
                `;
            } else {
                cartItems.innerHTML = this.items.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-image">
                            <i class="fas fa-cube"></i>
                        </div>
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-details">${item.specs || ''}</div>
                            <div class="cart-item-actions">
                                <div class="cart-item-qty">
                                    <label>Кол-во:</label>
                                    <input type="number" value="${item.quantity}" min="1" 
                                           onchange="cart.updateQuantity('${item.id}', this.value)">
                                </div>
                                <button class="cart-item-remove" onclick="cart.remove('${item.id}')">
                                    <i class="fas fa-trash"></i> Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }
        
        // Update buttons state
        const sendRequestBtn = document.getElementById('sendRequestBtn');
        const saveSpecBtn = document.getElementById('saveSpecBtn');
        if (sendRequestBtn) sendRequestBtn.disabled = this.items.length === 0;
        if (saveSpecBtn) saveSpecBtn.disabled = this.items.length === 0;
    },
    
    showNotification(message) {
        // Remove existing notifications
        const existing = document.querySelector('.cart-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart UI
    cart.updateUI();
    
    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Cart Sidebar
    const cartBtn = document.getElementById('cartBtn');
    const stickyCart = document.getElementById('stickyCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    
    function openCart() {
        if (cartSidebar) cartSidebar.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeCart() {
        if (cartSidebar) cartSidebar.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (stickyCart) stickyCart.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    
    // Callback Modal
    const stickyCall = document.getElementById('stickyCall');
    const callbackModal = document.getElementById('callbackModal');
    const modalClose = document.getElementById('modalClose');
    
    if (stickyCall && callbackModal) {
        stickyCall.addEventListener('click', () => {
            callbackModal.classList.add('active');
        });
    }
    
    if (modalClose && callbackModal) {
        modalClose.addEventListener('click', () => {
            callbackModal.classList.remove('active');
        });
    }
    
    // Close modal on outside click
    if (callbackModal) {
        callbackModal.addEventListener('click', (e) => {
            if (e.target === callbackModal) {
                callbackModal.classList.remove('active');
            }
        });
    }
    
    // Success Modal
    const successModal = document.getElementById('successModal');
    const successClose = document.getElementById('successClose');
    
    if (successClose && successModal) {
        successClose.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }
    
    function showSuccessModal() {
        if (successModal) {
            successModal.classList.add('active');
        }
    }
    
    // Form Submissions
    const quickRequestForm = document.getElementById('quickRequestForm');
    const callbackForm = document.getElementById('callbackForm');
    
    if (quickRequestForm) {
        quickRequestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission
            showSuccessModal();
            quickRequestForm.reset();
        });
    }
    
    if (callbackForm) {
        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            callbackModal.classList.remove('active');
            showSuccessModal();
            callbackForm.reset();
        });
    }
    
    // Send Request Button
    const sendRequestBtn = document.getElementById('sendRequestBtn');
    if (sendRequestBtn) {
        sendRequestBtn.addEventListener('click', () => {
            if (cart.items.length > 0) {
                closeCart();
                showSuccessModal();
                cart.clear();
            }
        });
    }
    
    // Save Specification Button
    const saveSpecBtn = document.getElementById('saveSpecBtn');
    if (saveSpecBtn) {
        saveSpecBtn.addEventListener('click', () => {
            if (cart.items.length > 0) {
                // Generate specification text
                let spec = 'Спецификация запроса КП\n';
                spec += '========================\n\n';
                cart.items.forEach((item, index) => {
                    spec += `${index + 1}. ${item.name}\n`;
                    spec += `   Количество: ${item.quantity} шт.\n`;
                    if (item.specs) spec += `   ${item.specs}\n`;
                    spec += '\n';
                });
                
                // Download as text file
                const blob = new Blob([spec], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'specification_fora.txt';
                a.click();
                URL.revokeObjectURL(url);
                
                cart.showNotification('Спецификация сохранена');
            }
        });
    }
    
    // Download Catalog Button
    const downloadCatalogBtn = document.getElementById('downloadCatalogBtn');
    const stickyDownload = document.getElementById('stickyDownload');
    
    function downloadCatalog() {
        cart.showNotification('Каталог будет загружен');
        // In production, this would link to actual PDF file
    }
    
    if (downloadCatalogBtn) downloadCatalogBtn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadCatalog();
    });
    
    if (stickyDownload) stickyDownload.addEventListener('click', downloadCatalog);
    
    // Chat Button
    const stickyChat = document.getElementById('stickyChat');
    if (stickyChat) {
        stickyChat.addEventListener('click', () => {
            cart.showNotification('Онлайн-чат скоро будет доступен');
        });
    }
    
    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();
            
            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * easeOut);
                
                stat.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            }
            
            requestAnimationFrame(updateNumber);
        });
    }
    
    // Intersection Observer for stats animation
    const statsSection = document.querySelector('.stats');
    if (statsSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Product Showcase Interaction
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
        item.addEventListener('click', () => {
            showcaseItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                accordionItems.forEach(i => i.classList.remove('active'));
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Filter group collapse
    const filterHeaders = document.querySelectorAll('.filter-header');
    filterHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const group = header.parentElement;
            group.classList.toggle('collapsed');
        });
    });
    
    // Add to cart functionality for product cards
    document.addEventListener('click', (e) => {
        const addToCartBtn = e.target.closest('.add-to-cart');
        if (addToCartBtn) {
            e.preventDefault();
            const productCard = addToCartBtn.closest('.product-card') || addToCartBtn.closest('.product-details');
            
            if (productCard) {
                const productData = {
                    id: productCard.dataset.productId || 'product-' + Date.now(),
                    name: productCard.querySelector('.product-name')?.textContent || 
                          productCard.querySelector('h1')?.textContent || 'Товар',
                    specs: productCard.querySelector('.product-specs')?.textContent || 
                           productCard.querySelector('.product-code')?.textContent || '',
                    quantity: parseInt(productCard.querySelector('.qty-input input')?.value) || 1
                };
                
                cart.add(productData);
            }
        }
    });
    
    // Calculator functionality
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateMaterials);
    }
    
    function calculateMaterials() {
        const length = parseFloat(document.getElementById('roomLength')?.value) || 0;
        const width = parseFloat(document.getElementById('roomWidth')?.value) || 0;
        const height = parseFloat(document.getElementById('roomHeight')?.value) || 0;
        
        const profileType = document.querySelector('input[name="profileType"]:checked')?.value || 'r50';
        
        const includeCorners = document.getElementById('includeCorners')?.checked || false;
        const includeWallFloor = document.getElementById('includeWallFloor')?.checked || false;
        const includeWallCeiling = document.getElementById('includeWallCeiling')?.checked || false;
        const includeCaps = document.getElementById('includeCaps')?.checked || false;
        
        // Simple calculation logic
        const perimeter = 2 * (length + width);
        
        let corners = 0;
        let wallFloor = 0;
        let wallCeiling = 0;
        let caps = 0;
        
        if (includeCorners) {
            corners = 4; // 4 corners for a room
        }
        
        if (includeWallFloor) {
            // One connector every 0.5m
            wallFloor = Math.ceil(perimeter / 0.5);
        }
        
        if (includeWallCeiling) {
            wallCeiling = Math.ceil(perimeter / 0.5);
        }
        
        if (includeCaps) {
            caps = 8; // Typical amount
        }
        
        // Update results
        const resultsSection = document.querySelector('.calc-results');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            
            document.getElementById('resultCorners').textContent = corners + ' шт.';
            document.getElementById('resultWallFloor').textContent = wallFloor + ' шт.';
            document.getElementById('resultWallCeiling').textContent = wallCeiling + ' шт.';
            document.getElementById('resultCaps').textContent = caps + ' шт.';
        }
    }
    
    // Add results to cart button
    const addResultsToCart = document.getElementById('addResultsToCart');
    if (addResultsToCart) {
        addResultsToCart.addEventListener('click', () => {
            const profileType = document.querySelector('input[name="profileType"]:checked')?.value || 'R50';
            
            const items = [];
            
            const corners = document.getElementById('resultCorners')?.textContent;
            if (corners && parseInt(corners) > 0) {
                items.push({
                    id: 'calc-corners-' + Date.now(),
                    name: `Угловые соединители ${profileType.toUpperCase()}`,
                    specs: 'Рассчитано калькулятором',
                    quantity: parseInt(corners)
                });
            }
            
            const wallFloor = document.getElementById('resultWallFloor')?.textContent;
            if (wallFloor && parseInt(wallFloor) > 0) {
                items.push({
                    id: 'calc-wallfloor-' + Date.now(),
                    name: `Соединители стена-пол ${profileType.toUpperCase()}`,
                    specs: 'Рассчитано калькулятором',
                    quantity: parseInt(wallFloor)
                });
            }
            
            const wallCeiling = document.getElementById('resultWallCeiling')?.textContent;
            if (wallCeiling && parseInt(wallCeiling) > 0) {
                items.push({
                    id: 'calc-wallceiling-' + Date.now(),
                    name: `Соединители стена-потолок ${profileType.toUpperCase()}`,
                    specs: 'Рассчитано калькулятором',
                    quantity: parseInt(wallCeiling)
                });
            }
            
            const caps = document.getElementById('resultCaps')?.textContent;
            if (caps && parseInt(caps) > 0) {
                items.push({
                    id: 'calc-caps-' + Date.now(),
                    name: `Заглушки торцевые ${profileType.toUpperCase()}`,
                    specs: 'Рассчитано калькулятором',
                    quantity: parseInt(caps)
                });
            }
            
            items.forEach(item => cart.add(item));
        });
    }
    
    // File upload preview
    const fileUploads = document.querySelectorAll('.file-upload');
    fileUploads.forEach(upload => {
        const input = upload.querySelector('input[type="file"]');
        if (input) {
            upload.addEventListener('click', () => input.click());
            
            input.addEventListener('change', () => {
                const files = Array.from(input.files);
                if (files.length > 0) {
                    const fileNames = files.map(f => f.name).join(', ');
                    const text = upload.querySelector('p');
                    if (text) {
                        text.textContent = `Выбрано: ${fileNames}`;
                    }
                }
            });
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Gallery functionality for product detail page
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    const galleryMain = document.querySelector('.gallery-main');
    
    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            galleryThumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            // In production, this would update the main image
        });
    });
    
    // Catalog filters
    const filterOptions = document.querySelectorAll('.filter-option input');
    filterOptions.forEach(option => {
        option.addEventListener('change', () => {
            // In production, this would filter products
            console.log('Filter changed:', option.value, option.checked);
        });
    });
    
    // Product sorting
    const sortSelect = document.querySelector('.products-sort select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            // In production, this would sort products
            console.log('Sort by:', sortSelect.value);
        });
    }
});

// Utility functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export cart for global access
window.cart = cart;
