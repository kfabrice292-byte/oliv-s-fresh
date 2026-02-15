// Oliv's Fresh - Script v2.1 (Performance & Fixed Redirects)
console.log("🚀 Oliv's Fresh Script v2.1 Loaded");

// --- HELPERS ---
window.formatPrice = (p) => {
    if (p === undefined || p === null || isNaN(p)) return "0 FCFA";
    return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
};

window.getProductTag = (cat) => {
    const tags = {
        'fruit': 'Fruits',
        'vegetable': 'Légumes',
        'aromatic': 'Herbes & Épices',
        'tuber': 'Tubercules',
        'processed': 'Transformés',
        'box': 'Paniers',
        'subscription': 'Abonnements'
    };
    return tags[cat] || cat;
};

const PRODUCTS_DATA = [];
const BLOG_DATA = [];


// --- APP STATE ---
window.products = []; // Start empty to ensure no old data shows up
window.blogPosts = [];
window.cart = JSON.parse(localStorage.getItem('olivs_cart')) || [];

// --- DATA INITIALIZATION (FIREBASE SYNC) ---
window.initializeData = async function () {
    try {
        if (!window.firebaseService) return;

        let fbProducts = [];
        let fbBlog = [];

        try {
            fbProducts = await window.firebaseService.getProducts() || [];
        } catch (err) {
            console.warn("Could not load Firebase products:", err);
        }

        try {
            fbBlog = await window.firebaseService.getBlogPosts() || [];
        } catch (err) {
            console.warn("Could not load Firebase blog posts:", err);
        }

        // Use Firebase data exclusively
        if (Array.isArray(fbProducts)) {
            window.products = fbProducts.filter(p => {
                if (!p || !p.name) return false;
                return true;
            });
        }

        if (Array.isArray(fbBlog)) {
            window.blogPosts = fbBlog.filter(b => b && b.title);
        }


    } catch (e) {
        console.error("Data Sync Error:", e);
    }
};

// --- UTILITIES ---
// Helpers are now at the top of the file to prevent duplication

window.showToast = function (msg) {
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.style.cssText = `
        position: fixed; 
        bottom: 100px; 
        left: 50%; 
        transform: translateX(-50%); 
        background: rgba(27, 94, 32, 0.95); 
        color: white; 
        padding: 12px 24px; 
        border-radius: 50px; 
        z-index: 3000; 
        font-size: 0.95rem; 
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    toast.innerHTML = `<i class="ri-check-line" style="vertical-align:middle; margin-right:5px;"></i> ${msg}`;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => toast.style.opacity = '1');

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
};

// --- CART SYSTEM ---
window.saveCart = function () {
    localStorage.setItem('olivs_cart', JSON.stringify(window.cart));
    window.updateCartUI();
};

window.addToCart = function (id, event) {
    const product = window.products.find(p => p.id === id);
    if (!product) return;

    const existing = window.cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        window.cart.push({ ...product, qty: 1 });
    }

    window.saveCart();

    // FLY ANIMATION
    if (event) {
        const btn = event.currentTarget;
        const cartBtn = document.getElementById('cart-btn');
        if (btn && cartBtn) {
            const btnRect = btn.getBoundingClientRect();
            const cartRect = cartBtn.getBoundingClientRect();

            const flyer = document.createElement('div');
            flyer.className = 'cart-flyer';
            flyer.style.left = `${btnRect.left + btnRect.width / 2}px`;
            flyer.style.top = `${btnRect.top + btnRect.height / 2}px`;
            flyer.innerHTML = `<i class="ri-shopping-basket-fill"></i>`;
            document.body.appendChild(flyer);

            // Trigger animation
            requestAnimationFrame(() => {
                flyer.style.left = `${cartRect.left + cartRect.width / 2}px`;
                flyer.style.top = `${cartRect.top + cartRect.height / 2}px`;
                flyer.style.transform = 'translate(-50%, -50%) scale(0.2) rotate(360deg)';
                flyer.style.opacity = '0';
            });

            setTimeout(() => {
                flyer.remove();
                cartBtn.classList.add('cart-bump');
                setTimeout(() => cartBtn.classList.remove('cart-bump'), 300);
            }, 800);
        }
    }

    window.showToast(`${product.name} ajouté !`);
};

window.updateQty = function (id, change) {
    const item = window.cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            window.cart = window.cart.filter(i => i.id !== id);
        }
        window.saveCart();
    }
};

window.removeFromCart = function (id) {
    window.cart = window.cart.filter(i => i.id !== id);
    window.saveCart();
};

window.updateCartUI = function () {
    const countEl = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total-price');
    const container = document.getElementById('cart-items');

    // Update Badge
    const totalQty = window.cart.reduce((acc, i) => acc + i.qty, 0);
    if (countEl) {
        countEl.textContent = totalQty;
    }

    // Update Total
    const total = window.cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    if (totalEl) totalEl.textContent = window.formatPrice(total);

    // Update List
    if (container) {
        if (window.cart.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:3rem 1rem; color:#888;">
                    <div class="empty-cart-icon">
                        <i class="ri-shopping-basket-2-line"></i>
                    </div>
                    <p style="margin-top:1rem; font-weight:500;">Votre panier est encore vide</p>
                    <p style="font-size:0.85rem; opacity:0.7;">Découvrez nos produits frais du jour !</p>
                    <button onclick="window.closeCartModal();" class="btn-primary" style="margin-top:2rem; font-size:0.9rem; padding:10px 25px; border-radius:50px;">Commencer mes courses</button>
                </div>`;
        } else {
            container.innerHTML = window.cart.map(item => `
                <div class="cart-item-premium">
                    <div class="cart-item-img">
                        <img src="${item.image || 'img/oli_logo.png'}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <div class="cart-item-price-info">
                            <span class="unit-price">${window.formatPrice(item.price)}</span>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="qty-control">
                            <button onclick="window.updateQty('${item.id}', -1)"><i class="ri-subtract-line"></i></button>
                            <span>${item.qty}</span>
                            <button onclick="window.updateQty('${item.id}', 1)"><i class="ri-add-line"></i></button>
                        </div>
                        <button class="remove-btn" onclick="window.removeFromCart('${item.id}')" title="Supprimer">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
};

// --- RENDERING ---
window.showProductsSkeleton = function (container, count = 4) {
    if (!container) return;
    container.innerHTML = Array(count).fill(0).map(() => `
        <div class="product-card skeleton">
            <div class="product-image skeleton-box"></div>
            <div class="product-info">
                <div class="skeleton-line" style="width:30%;"></div>
                <div class="skeleton-line" style="width:70%; height:1.2rem; margin:10px 0;"></div>
                <div class="skeleton-line" style="width:50%;"></div>
                <div class="skeleton-line" style="width:100%; height:40px; margin-top:15px; border-radius:12px;"></div>
            </div>
        </div>
    `).join('');
};

window.renderProducts = (container, category = 'all', limit = null, searchTerm = '') => {
    if (!container) return;

    let list = window.products || [];
    if (category !== 'all') {
        list = list.filter(p => p.category === category);
    }

    // Filter out inactive products
    list = list.filter(p => p.active !== false);

    if (searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        list = list.filter(p => {
            const nameMatch = p.name && typeof p.name === 'string' && p.name.toLowerCase().includes(term);
            const catMatch = p.category && typeof p.category === 'string' && p.category.toLowerCase().includes(term);
            const tagMatch = p.tag && typeof p.tag === 'string' && p.tag.toLowerCase().includes(term);
            return nameMatch || catMatch || tagMatch;
        });
    }

    if (limit) list = list.slice(0, limit);

    if (list.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:#888;">
            <i class="ri-search-2-line" style="font-size:3rem; margin-bottom:1rem; display:block; opacity:0.3;"></i>
            <p>Aucun produit ne correspond à votre recherche "${searchTerm}".</p>
        </div>`;
        return;
    }

    container.innerHTML = '';

    // For automatic left-to-right infinite marquee, we duplicate the list
    let displayList = list;
    if (container.id === 'featured-products-container') {
        displayList = [...list, ...list];
    }

    displayList.forEach((p, idx) => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.setAttribute('data-aos', 'fade-up');
        div.setAttribute('data-aos-delay', (idx % list.length) * 100);

        // Use a placeholder if image fails
        const imgUrl = p.image || 'img/oli_logo.png';
        const oldPriceHtml = p.oldPrice ? `<span style="text-decoration:line-through; color:#999; font-size:0.9rem; margin-right:8px;">${window.formatPrice(p.oldPrice)}</span>` : '';
        const isAntiGaspi = p.tag && p.tag.toUpperCase() === 'ANTI-GASPI';
        const badgeBg = isAntiGaspi ? '#ff6b6b' : 'var(--accent-color)';
        const badgeColor = isAntiGaspi ? 'white' : 'var(--text-dark)';
        const badgeIcon = isAntiGaspi ? '<i class="ri-leaf-line" style="margin-right:4px;"></i>' : '';
        const badge = p.tag ? `<span class="product-badge" style="position:absolute; top:12px; left:12px; background:${badgeBg}; color:${badgeColor}; padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:700; z-index:10; box-shadow:0 2px 8px rgba(0,0,0,0.15); border:1px solid rgba(255,255,255,0.3); display:flex; align-items:center;">${badgeIcon}${p.tag.toUpperCase()}</span>` : '';

        // Anti-gaspi explanation
        const reasonHtml = (isAntiGaspi && p.antiGaspiReason) ? `<div style="background:#fff5f5; color:#d63031; font-size:0.75rem; padding:5px 10px; border-radius:8px; margin-top:8px; border:1px dashed #fab1a0; display:flex; align-items:center; gap:5px;"><i class="ri-information-line"></i> ${p.antiGaspiReason}</div>` : '';

        div.innerHTML = `
            ${badge}
            <div class="product-image">
                <img src="${imgUrl}" alt="${p.name}" loading="lazy" style="object-fit: cover; width: 100%; height: 100%;" onerror="this.onerror=null; this.src='img/oli_logo.png';">
            </div>
            <div class="product-info">
                <span class="product-tag">${window.getProductTag(p.category)}</span>
                <h3 class="product-title">${p.name}</h3>
                ${reasonHtml}
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem;">
                    <div class="product-price">
                        ${oldPriceHtml}
                        <span>${window.formatPrice(p.price)}</span>
                        <small style="font-weight:400; color:#888; font-size:0.8rem;">/ ${p.unit}</small>
                    </div>
                </div>
                <button class="btn-primary" onclick="window.addToCart('${p.id}', event)" style="width:100%; margin-top:1rem; border-radius:12px; display:flex; justify-content:center; align-items:center; gap:8px;">
                    <i class="ri-shopping-cart-2-line"></i> Ajouter
                </button>
            </div>
        `;
        container.appendChild(div);
    });
};

window.slideFeatured = function (dir) {
    const scroller = document.querySelector('.featured-scroll-container');
    if (!scroller) return;
    const scrollAmount = scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
};

window.scrollToItem = function (index) {
    const scroller = document.querySelector('.featured-scroll-container');
    const items = scroller.querySelectorAll('.product-card');
    if (items[index]) {
        items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
};

window.renderAntiGaspi = function (container) {
    if (!container) return;
    const antiGaspiList = window.products.filter(p => (p.tag && p.tag.toUpperCase() === 'ANTI-GASPI') && p.active !== false);

    if (antiGaspiList.length === 0) {
        const section = container.closest('.section');
        if (section) section.style.display = 'none';
        return;
    }

    container.innerHTML = '';
    antiGaspiList.forEach((p, idx) => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.setAttribute('data-aos', 'fade-up');
        div.setAttribute('data-aos-delay', idx * 100);

        const imgUrl = p.image || 'img/oli_logo.png';
        const oldPriceHtml = p.oldPrice ? `<span style="text-decoration:line-through; font-size:0.9rem; color:#999; margin-right:8px;">${window.formatPrice(p.oldPrice)}</span>` : '';

        div.innerHTML = `
            <span class="product-badge" style="position:absolute; top:12px; left:12px; background:#ff6b6b; color:white; padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:700; z-index:10; box-shadow:0 2px 8px rgba(0,0,0,0.15); border:1px solid rgba(255,255,255,0.3); display:flex; align-items:center;">
                <i class="ri-leaf-line" style="margin-right:4px;"></i> ANTI-GASPI
            </span>
            <div class="product-image">
                <img src="${imgUrl}" alt="${p.name}" loading="lazy" style="object-fit: cover; width: 100%; height: 100%;" onerror="this.onerror=null; this.src='img/oli_logo.png';">
            </div>
            <div class="product-info">
                <span class="product-tag">${window.getProductTag(p.category)}</span>
                <h3 class="product-title" style="font-size:1.1rem;">${p.name}</h3>
                <div style="background:#fff5f5; color:#d63031; font-size:0.75rem; padding:5px 10px; border-radius:8px; margin-top:8px; border:1px dashed #fab1a0; display:flex; align-items:center; gap:5px;">
                    <i class="ri-history-line"></i> ${p.antiGaspiReason || 'Offre de sauvetage'}
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem;">
                    <div class="product-price" style="font-size:1.2rem; color:#d63031;">
                        ${oldPriceHtml}
                        <span>${window.formatPrice(p.price)}</span>
                    </div>
                </div>
                <button class="btn-primary" onclick="window.addToCart('${p.id}', event)" style="width:100%; margin-top:1rem; border-radius:12px; background:#ff6b6b; border-color:#ff6b6b;">
                    Je sauve ce produit !
                </button>
            </div>
        `;
        container.appendChild(div);
    });
};

window.renderBlog = function (container, limit = null) {
    if (!container) return;
    container.innerHTML = '';

    let list = limit ? window.blogPosts.slice(0, limit) : window.blogPosts;

    list.forEach((b, idx) => {
        const art = document.createElement('article');
        art.className = 'blog-card';
        art.setAttribute('data-aos', 'fade-up');
        art.setAttribute('data-aos-delay', idx * 100);

        art.innerHTML = `
            <div class="blog-image" style="background-image: url('${b.image}'), url('img/oli_logo.png');"></div>
            <div class="blog-content">
                <span class="blog-tag">${b.tag}</span>
                <h3>${b.title}</h3>
                <p style="color:#666; font-size:0.9rem; line-height:1.5; margin-bottom:1rem;">${b.desc}</p>
                <a href="blog-details.html?id=${b.id}" class="read-more">Lire la suite <i class="ri-arrow-right-line"></i></a>
            </div>
        `;
        container.appendChild(art);
    });
};

window.renderBlogPost = function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('blog-post-content');

    if (!container) return;

    const post = window.blogPosts.find(p => p.id === id);

    if (!post) {
        container.innerHTML = '<div style="text-align:center; padding: 5rem 0;"><h2>Article non trouvé 😕</h2><a href="blog.html" class="btn-primary" style="margin-top:1rem;">Retour au blog</a></div>';
        return;
    }

    container.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto;">
            <a href="blog.html" style="display:inline-flex; align-items:center; color:#666; margin-bottom:1rem;"><i class="ri-arrow-left-line"></i> Retour aux articles</a>
            <div class="blog-header" style="text-align:center; margin-bottom:3rem;">
                <span class="blog-tag" style="margin-bottom:1rem; display:inline-block;">${post.tag}</span>
                <h1 style="font-size:2.5rem; margin-bottom:1rem;">${post.title}</h1>
                <p style="color:#888;"><i class="ri-calendar-line"></i> ${post.date}</p>
            </div>
            <div style="width:100%; height:400px; background-image:url('${post.image}'); background-size:cover; background-position:center; border-radius:24px; margin-bottom:3rem; box-shadow:0 10px 30px rgba(0,0,0,0.1);"></div>
            <div class="blog-body" style="font-size:1.1rem; line-height:1.8; color:#333;">
                ${post.content}
            </div>
            <div style="margin-top:4rem; text-align:center; padding-top:3rem; border-top:1px solid #eee;">
                <h3>Cet article vous a plu ?</h3>
                <div style="margin-top:1.5rem;">
                    <a href="boutique.html" class="btn-primary">Découvrir nos produits frais</a>
                </div>
            </div>
        </div>
    `;
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    // 0. Hero Title Animation (Premium Phase-Based Reveal)
    const cycleLabel = document.getElementById('cycle-label');
    const cycleIcon = document.getElementById('cycle-icon');
    const h1 = document.querySelector('.hero-title-premium');

    const items = [
        { text: 'Fruits', icon: 'ri-leaf-line', theme: 'theme-fruit' },
        { text: 'Légumes', icon: 'ri-leaf-fill', theme: 'theme-veggie' },
        { text: 'Paniers', icon: 'ri-shopping-basket-fill', theme: 'theme-box' }
    ];

    if (cycleLabel && cycleIcon && h1) {
        let idx = 0;
        h1.classList.add(items[0].theme);
        cycleLabel.classList.add('reveal-up');

        setInterval(async () => {
            cycleLabel.classList.remove('reveal-up');
            cycleLabel.classList.add('exit-up');

            await new Promise(r => setTimeout(r, 500));

            h1.classList.remove(items[idx].theme);
            idx = (idx + 1) % items.length;
            h1.classList.add(items[idx].theme);

            cycleLabel.textContent = items[idx].text;
            cycleIcon.innerHTML = `<i class="${items[idx].icon}"></i>`;

            cycleLabel.classList.remove('exit-up');
            void cycleLabel.offsetWidth;
            cycleLabel.classList.add('reveal-up');
        }, 3500);
    }

    // 1. Identify Elements
    const prodCont = document.getElementById('products-container');
    const featuredCont = document.getElementById('featured-products-container');
    const antigraspiCont = document.getElementById('antigaspi-container');
    const blogCont = document.querySelector('.blog-grid');
    const filters = document.querySelectorAll('.filter-btn');

    // 2. Show Skeletons UI while loading
    if (prodCont) window.showProductsSkeleton(prodCont, 8);
    if (featuredCont) window.showProductsSkeleton(featuredCont, 5);

    // 3. Sync with Firebase
    await window.initializeData();

    // 4. Final Render with smooth transition
    setTimeout(() => {
        // Shop Page
        if (prodCont) window.renderProducts(prodCont, 'all');

        // Home Page
        // Home Page - Fluid Render of first 5 active products
        if (featuredCont) {
            // Filter active first, then slice 5 to ensure we always show 5 if they exist
            const activeProducts = window.products.filter(p => p.active !== false);
            const featuredList = activeProducts.slice(0, 5);

            const originalProducts = window.products;
            window.products = featuredList;
            window.renderProducts(featuredCont, 'all');
            window.products = originalProducts;
        }

        if (antigraspiCont && typeof window.renderAntiGaspi === 'function') {
            window.renderAntiGaspi(antigraspiCont);
        }

        if (blogCont && typeof window.renderBlog === 'function') {
            window.renderBlog(blogCont, featuredCont ? 3 : null);
        }

        // Blog detail page
        if (document.getElementById('blog-post-content')) {
            window.renderBlogPost();
        }
    }, 400);

    // 5. Setup Listeners
    filters.forEach(btn => {
        btn.onclick = () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.filter;
            if (prodCont) window.renderProducts(prodCont, category);
        };
    });

    // 6. Modal Logic
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-modal');

    window.closeCartModal = () => {
        if (cartModal) cartModal.classList.remove('active');
        document.body.style.overflow = 'visible';
    };

    if (cartBtn && cartModal) {
        cartBtn.onclick = () => {
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            window.updateCartUI();
        };
    }
    if (closeBtn) closeBtn.onclick = window.closeCartModal;
    window.onclick = (e) => { if (e.target === cartModal) window.closeCartModal(); };

    // 7. WhatsApp Checkout
    const checkBtn = document.getElementById('checkout-btn');
    if (checkBtn) {
        checkBtn.onclick = () => {
            if (window.cart.length === 0) {
                window.showToast("Votre panier est vide !");
                return;
            }

            let msg = "*👋 Bonjour, je souhaite passer commande chez Oliv's Fresh :*\n\n";
            let total = 0;
            window.cart.forEach(i => {
                const lineTotal = i.price * i.qty;
                msg += `▪️ ${i.name} (x${i.qty}) : ${window.formatPrice(lineTotal)} \n`;
                total += lineTotal;
            });
            msg += `\n *💰 TOTAL: ${window.formatPrice(total)}* `;
            msg += `\n\n📍 _Merci de me confirmer la livraison._`;

            const phone = "22677973958";
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        };
    }

    // 8. Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');
    if (menuBtn && nav) {
        menuBtn.onclick = () => {
            nav.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.className = nav.classList.contains('active') ? 'ri-close-line' : 'ri-menu-4-line';
            }
        };
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) icon.className = 'ri-menu-4-line';
            });
        });
    }

    // 9. Navigation Active State (Strict and Folder-aware)
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        const isActive = href === currentPath ||
            (currentPath === 'index.html' && (href === './' || href === 'index.html')) ||
            (currentPath === '' && href === './');
        if (isActive) link.classList.add('active');
    });

    // 10. Search
    const searchInput = document.getElementById('product-search');
    if (searchInput && prodCont) {
        searchInput.oninput = (e) => window.renderProducts(prodCont, 'all', null, e.target.value);
    }

    // 11. Scroll Effects
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const navBar = document.querySelector('.navbar');
        if (navBar) {
            if (winScroll > 50) {
                navBar.style.padding = '0.5rem 0';
                navBar.style.boxShadow = 'var(--shadow-md)';
                navBar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navBar.style.padding = '1rem 0';
                navBar.style.boxShadow = 'none';
                navBar.style.background = 'var(--glass-bg)';
            }
        }
    });

    // 12. Loader
    const removeLoader = () => {
        const l = document.getElementById('loader');
        if (l) {
            l.style.opacity = '0';
            setTimeout(() => { if (l.parentNode) l.remove(); document.body.style.overflow = 'visible'; }, 800);
        }
    };
    setTimeout(removeLoader, 1000);

    // 13. AOS
    if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true });
});

// 14. Mobile VH Fix (Anti-jump)
const setVh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setVh();
window.addEventListener('resize', setVh);
