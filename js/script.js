const PRODUCTS_DATA = [
    // --- 1. FRUITS LOCAUX ---
    { id: 'f1', name: 'Mangue', price: 1000, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/mangue.jpg', tag: 'Local' },
    { id: 'f2', name: 'Banane', price: 800, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/bananne.jpg', tag: 'Local' },
    { id: 'f3', name: 'Orange', price: 1200, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Orange.jpg', tag: 'Local' },
    { id: 'f4', name: 'Mandarine', price: 1500, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Mandarine.jpg' },
    { id: 'f5', name: 'Citron', price: 1000, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/citron.jpg' },
    { id: 'f6', name: 'Ananas', price: 1500, unit: 'unité', category: 'fruit', image: 'img/produits/fruits/Ananas.jpg' },
    { id: 'f7', name: 'Papaye', price: 1200, unit: 'unité', category: 'fruit', image: 'img/produits/fruits/Papaye.jpg' },
    { id: 'f8', name: 'Pastèque', price: 2000, unit: 'unité', category: 'fruit', image: 'img/produits/fruits/Pastèque.jpg' },
    { id: 'f9', name: 'Melon', price: 1800, unit: 'unité', category: 'fruit', image: 'img/produits/fruits/Melon.jpg' },
    { id: 'f10', name: 'Goyave', price: 1200, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Goyave.jpg' },
    { id: 'f11', name: 'Avocat', price: 500, unit: 'unité', category: 'fruit', image: 'img/produits/fruits/Avocat.jpg' },
    { id: 'f12', name: 'Noix de coco', price: 800, unit: 'unité', category: 'fruit', image: 'img/produits/fruits/Noix de coco.jpg' },
    { id: 'f13', name: 'Pommes de cajou', price: 1000, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Pommes de cajou.jpg', tag: 'Saison' },
    { id: 'f14', name: 'Tamarin', price: 500, unit: 'sachet', category: 'fruit', image: 'img/produits/fruits/Tamarin.jpg', tag: 'Saison' },
    { id: 'f15', name: 'Jujube', price: 500, unit: 'sachet', category: 'fruit', image: 'img/produits/fruits/Jujube.jpg', tag: 'Saison' },
    { id: 'f16', name: 'Baobab (Pain de singe)', price: 1000, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Baobab ou pain de singe.jpg', tag: 'Saison' },
    { id: 'f17', name: 'Grenade', price: 2500, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Grenade.jpg' },
    { id: 'f18', name: 'Pomme cannelle', price: 1500, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Pomme cannelle.jpg' },
    { id: 'f19', name: 'Fraise', price: 3000, unit: 'barquette', category: 'fruit', image: 'img/produits/fruits/Fraise.jpg', tag: 'Saison' },
    { id: 'f20', name: 'Karité', price: 1200, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Karité.jpg', tag: 'Saison' },

    // --- 2. FRUITS IMPORTÉS ---
    { id: 'fi1', name: 'Pomme', price: 2500, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Pomme.jpg', tag: 'Import' },
    { id: 'fi2', name: 'Poire', price: 3000, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Poire.jpg', tag: 'Import' },
    { id: 'fi3', name: 'Raisin', price: 3500, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Raisin.jpg', tag: 'Import' },
    { id: 'fi4', name: 'Kiwi', price: 1500, unit: 'barquette', category: 'fruit', image: 'img/produits/fruits/Kiwi.jpg', tag: 'Import' },
    { id: 'fi5', name: 'Pêche', price: 3500, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Pêche.jpg', tag: 'Import' },
    { id: 'fi6', name: 'Nectarine', price: 3500, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Nectarine.jpg', tag: 'Import' },
    { id: 'fi7', name: 'Cerise', price: 5000, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Cerise.jpg', tag: 'Import' },
    { id: 'fi8', name: 'Prune européenne', price: 3000, unit: 'kg', category: 'fruit', image: 'img/produits/fruits/Prune européenne.jpg', tag: 'Import' },
    { id: 'fi9', name: 'Myrtille', price: 4000, unit: 'barquette', category: 'fruit', image: 'img/produits/fruits/Myrtille.jpg', tag: 'Import' },
    { id: 'fi10', name: 'Framboise', price: 4500, unit: 'barquette', category: 'fruit', image: 'img/produits/fruits/Framboise.jpg', tag: 'Import' },

    // --- 3. LÉGUMES ---
    { id: 'l1', name: 'Tomate', price: 1500, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Tomate.jpg' },
    { id: 'l2', name: 'Oignon', price: 1000, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Oignon.jpg' },
    { id: 'l3', name: 'Ail', price: 2000, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Ail.jpg' },
    { id: 'l4', name: 'Carotte', price: 1000, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/carotte.png' },
    { id: 'l5', name: 'Chou Blanc', price: 800, unit: 'unité', category: 'vegetable', image: 'img/produits/legumes/Chou blanc.jpg' },
    { id: 'l6', name: 'Chou Rouge', price: 1200, unit: 'unité', category: 'vegetable', image: 'img/produits/legumes/Chou rouge.jpg' },
    { id: 'l7', name: 'Poivron Vert', price: 1800, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Poivron vert.jpg' },
    { id: 'l8', name: 'Poivron Rouge', price: 2000, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Poivron rouge.jpg' },
    { id: 'l9', name: 'Poivron Jaune', price: 2000, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Poivron jaune.jpg' },
    { id: 'l10', name: 'Concombre', price: 1000, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Concombre.jpg' },
    { id: 'l11', name: 'Aubergine Violette', price: 800, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Aubergine violette.jpg' },
    { id: 'l12', name: 'Aubergine Locale', price: 600, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Aubergine locale.jpg' },
    { id: 'l13', name: 'Courgette', price: 1500, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Courgette.jpg' },
    { id: 'l14', name: 'Haricot vert', price: 1200, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Haricot vert.jpg' },
    { id: 'l15', name: 'Maïs frais', price: 500, unit: 'unité', category: 'vegetable', image: 'img/produits/legumes/Maïs frais.jpg' },
    { id: 'l16', name: 'Petit pois', price: 1500, unit: 'kg', category: 'vegetable', image: 'img/produits/legumes/Petit pois.jpg' },

    // --- 4. ARÔMES & TUBERCULES ---
    { id: 'e1', name: 'Persil', price: 200, unit: 'botte', category: 'aromatic', image: 'img/salad.png' },
    { id: 'e2', name: 'Céleri', price: 300, unit: 'botte', category: 'aromatic', image: 'img/salad.png' },
    { id: 'e3', name: 'Menthe', price: 200, unit: 'botte', category: 'aromatic', image: 'img/produits/fruits/citron.jpg' },
    { id: 't1', name: 'Pomme de terre', price: 1200, unit: 'kg', category: 'tuber', image: 'img/onion.png' },
    { id: 't2', name: 'Patate douce', price: 800, unit: 'kg', category: 'tuber', image: 'img/onion.png' },
    { id: 't3', name: 'Manioc', price: 700, unit: 'kg', category: 'tuber', image: 'img/onion.png' },
    { id: 't4', name: 'Igname', price: 1500, unit: 'kg', category: 'tuber', image: 'img/onion.png' },
    { id: 't5', name: 'Gingembre', price: 2000, unit: 'kg', category: 'tuber', image: 'img/produits/legumes/Ail.jpg' },

    // --- 5. PRODUITS TRANSFORMÉS ---
    { id: 'tr1', name: 'Salade de fruits', price: 2500, unit: 'bol', category: 'processed', image: 'img/blog-fruits.jpg', tag: 'Prêt' },
    { id: 'tr2', name: 'Ananas découpé', price: 1500, unit: 'barquette', category: 'processed', image: 'img/blog-fruits.jpg', tag: 'Prêt' },
    { id: 'tr3', name: 'Jus Frais Ananas', price: 1500, unit: '1L', category: 'processed', image: 'img/blog-juice.jpg', tag: 'Frais' },
    { id: 'tr4', name: 'Tedoo au lait', price: 2000, unit: '1L', category: 'processed', image: 'img/blog-juice.jpg', tag: 'Spécial' }
];

const BLOG_DATA = [
    {
        id: 'b1',
        title: 'Booster son immunité naturellement',
        desc: 'Comment les agrumes et les légumes verts peuvent vous aider à rester en pleine forme toute l\'année.',
        tag: 'Santé',
        image: 'img/blog-juice.jpg',
        date: '2026-01-25',
        content: `
            <p class="lead">L'hiver approche ou la fatigue se fait sentir ? Il est temps de miser sur l'alimentation pour renforcer vos défenses naturelles.</p>
            
            <h3>Les agrumes : vos meilleurs alliés</h3>
            <p>Riches en vitamine C, les oranges, citrons et pamplemousses sont essentiels pour stimuler la production de globules blancs. Un verre de jus pressé frais chaque matin est un excellent réflexe santé.</p>
            
            <h3>Les légumes verts ne comptent pas pour des prunes</h3>
            <p>Épinards, brocolis et choux sont gorgés d'antioxydants et de fibres. Ils aident à nettoyer l'organisme et apportent les minéraux nécessaires (magnésium, fer) pour lutter contre la fatigue.</p>
            
            <blockquote>
                "Que ton aliment soit ta seule médecine." - Hippocrate
            </blockquote>

            <h3>Le gingembre et le curcuma</h3>
            <p>N'hésitez pas à ajouter ces racines à vos jus ou plats. Leurs propriétés anti-inflammatoires sont reconnues depuis des millénaires pour booster l'immunité.</p>
        `
    },
    {
        id: 'b2',
        title: 'Recette : Salade Créative Sucrée-Salée',
        desc: 'Marre de la laitue standard ? Essayez notre mélange avec pommes, noix et vinaigrette au miel.',
        tag: 'Recette',
        image: 'img/blog-salad.jpg',
        date: '2026-01-18',
        content: `
            <p class="lead">Réinventez votre pause déjeuner avec cette salade pleine de peps et de croquant. Prête en 10 minutes chrono !</p>

            <h3>Ingrédients (pour 2 personnes)</h3>
            <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 20px;">
                <li>Une poignée de jeunes pousses d'épinards ou de roquette</li>
                <li>1 pomme Granny Smith (pour l'acidité)</li>
                <li>Une poignée de noix ou noisettes concassées</li>
                <li>50g de feta émiettée</li>
                <li>Quelques tomates cerises</li>
            </ul>

            <h3>La vinaigrette magique</h3>
            <p>Mélangez 3 c.à.s d'huile d'olive, 1 c.à.s de vinaigre de cidre, 1 c.à.c de moutarde à l'ancienne et une touche de miel. Salez, poivrez.</p>

            <h3>Préparation</h3>
            <p>Lavez les légumes. Coupez la pomme en fines lamelles (gardez la peau pour les vitamines !). Mélangez tous les ingrédients dans un grand saladier et versez la vinaigrette juste avant de servir pour garder le croquant.</p>
        `
    },
    {
        id: 'b3',
        title: 'Les secrets d\'un fruit mûr',
        desc: 'Apprenez à choisir vos fruits comme un pro : toucher, odeur et couleur, on vous dit tout.',
        tag: 'Astuce',
        image: 'img/blog-fruits.jpg',
        date: '2026-01-10',
        content: `
            <p class="lead">Rien de plus décevant qu'un avocat dur comme de la pierre ou une poire farineuse. Voici comment ne plus jamais se tromper.</p>

            <h3>L'odeur ne trompe pas</h3>
            <p>Pour les melons, ananas et fruits à noyau, fiez-vous à votre nez. Un fruit mûr dégage un parfum sucré et agréable au niveau du pédoncule. Si ça ne sent rien, c'est qu'il n'est pas prêt.</p>

            <h3>Le poids est un bon indicateur</h3>
            <p>Un agrume (orange, citron, pomelo) doit être lourd pour sa taille. Cela signifie qu'il est gorgé de jus. S'il est léger, il risque d'être sec.</p>

            <h3>La couleur et le toucher</h3>
            <p>Pour les bananes, attendez les petites taches brunes : c'est là qu'elles sont les meilleures ! Pour les avocats, une légère pression du doigt doit laisser une petite marque, mais sans s'enfoncer.</p>
        `
    }
];

// --- APP STATE ---
window.products = PRODUCTS_DATA;
window.blogPosts = BLOG_DATA;
window.cart = JSON.parse(localStorage.getItem('olivs_cart')) || [];

// --- UTILITIES ---
window.getProductTag = function (cat) {
    const tags = {
        'fruit': 'Fruits',
        'vegetable': 'Légumes',
        'aromatic': 'Épices & Feuilles',
        'tuber': 'Tubercules',
        'processed': 'Transformés',
        'box': 'Paniers'
    };
    return tags[cat] || cat || '';
};

window.formatPrice = function (price) {
    if (price === undefined || price === null || isNaN(price)) return "0 FCFA";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
};

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

window.addToCart = function (id) {
    const product = window.products.find(p => p.id === id);
    if (!product) return;

    const existing = window.cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        window.cart.push({ ...product, qty: 1 });
    }

    window.saveCart();
    window.showToast(`${product.name} ajouté au panier !`);
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
        // Animation pop on change
        countEl.style.transform = 'scale(1.2)';
        setTimeout(() => countEl.style.transform = 'scale(1)', 200);
    }

    // Update Total
    const total = window.cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    if (totalEl) totalEl.textContent = window.formatPrice(total);

    // Update List
    if (container) {
        if (window.cart.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:3rem 1rem; color:#888;">
                    <i class="ri-shopping-basket-2-line" style="font-size:3rem; margin-bottom:1rem; display:block; opacity:0.3;"></i>
                    <p>Votre panier est vide.</p>
                    <button onclick="document.querySelector('.close-modal').click();" class="btn-secondary" style="margin-top:1rem; font-size:0.9rem;">Retourner à la boutique</button>
                </div>`;
        } else {
            container.innerHTML = window.cart.map(item => `
                <div class="cart-item">
                    <div style="flex:1;">
                        <h4 style="margin:0; font-size:1rem;">${item.name}</h4>
                        <div style="color:#666; font-size:0.85rem; margin-top:4px;">
                            ${window.formatPrice(item.price)} x ${item.qty} = 
                            <strong style="color:var(--primary-color);">${window.formatPrice(item.price * item.qty)}</strong>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <button onclick="window.updateQty('${item.id}', -1)" style="width:28px; height:28px; border-radius:50%; border:1px solid #eee; background:white; color:#555; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:0.2s;">
                            <i class="ri-subtract-line"></i>
                        </button>
                        <span style="font-weight:600; min-width:20px; text-align:center;">${item.qty}</span>
                        <button onclick="window.updateQty('${item.id}', 1)" style="width:28px; height:28px; border-radius:50%; border:1px solid #eee; background:white; color:var(--primary-color); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:0.2s;">
                            <i class="ri-add-line"></i>
                        </button>
                    </div>
                    <button onclick="window.removeFromCart('${item.id}')" style="margin-left:10px; border:none; background:none; color:#ff5252; cursor:pointer; font-size:1.1rem;">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            `).join('');
        }
    }
};

// --- RENDERING ---
window.renderProducts = function (container, category, limit = null) {
    if (!container) return;
    container.innerHTML = '';

    let list = category === 'all'
        ? window.products
        : window.products.filter(p => p.category === category);

    if (limit && limit > 0) list = list.slice(0, limit);

    if (list.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1; text-align:center; padding:3rem; color:#888;">Aucun produit disponible pour le moment.</p>';
        return;
    }

    list.forEach((p, idx) => {
        const div = document.createElement('div');
        div.className = 'product-card';
        // Add AOS only if not limited (to avoid weirdness in small lists) or tune delay
        div.setAttribute('data-aos', 'fade-up');
        div.setAttribute('data-aos-delay', (idx % 4) * 100);

        // Use a placeholder if image fails
        const imgUrl = p.image || 'img/oli_logo.png';
        const badge = p.tag ? `<span class="product-badge" style="position:absolute; top:12px; left:12px; background:var(--accent-color); color:var(--text-dark); padding:2px 10px; border-radius:12px; font-size:0.7rem; font-weight:700; z-index:10; box-shadow:0 2px 5px rgba(0,0,0,0.1);">${p.tag}</span>` : '';

        div.innerHTML = `
            ${badge}
            <div class="product-image">
                <img src="${imgUrl}" alt="${p.name}" loading="lazy" style="object-fit: cover; width: 100%; height: 100%;" onerror="this.onerror=null; this.src='img/oli_logo.png';">
            </div>
            <div class="product-info">
                <span class="product-tag">${window.getProductTag(p.category)}</span>
                <h3 class="product-title">${p.name}</h3>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem;">
                    <div class="product-price">
                        ${window.formatPrice(p.price)}
                        <small style="font-weight:400; color:#888; font-size:0.8rem;">/ ${p.unit}</small>
                    </div>
                </div>
                <button class="btn-primary" onclick="window.addToCart('${p.id}')" style="width:100%; margin-top:1rem; border-radius:12px; display:flex; justify-content:center; align-items:center; gap:8px;">
                    <i class="ri-shopping-cart-2-line"></i> Ajouter
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
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Render
    const prodCont = document.getElementById('products-container');
    const featCont = document.getElementById('featured-products-container');
    const blogCont = document.querySelector('.blog-grid');
    const filters = document.querySelectorAll('.filter-btn');

    // Only render if container exists
    if (prodCont) window.renderProducts(prodCont, 'all');
    if (featCont) {
        // Show a diverse selection on homepage (IDs: f1, l1, fi1, tr3)
        const diverseIds = ['f1', 'l1', 'fi1', 'tr3'];
        const diverseProducts = window.products.filter(p => diverseIds.includes(p.id));
        // Use a small custom render or just render all as a trick
        const originalProducts = window.products;
        window.products = diverseProducts;
        window.renderProducts(featCont, 'all');
        window.products = originalProducts;
    }
    if (blogCont) window.renderBlog(blogCont, featCont ? 3 : null);

    // Check for blog detail page
    if (document.getElementById('blog-post-content')) {
        window.renderBlogPost();
    }

    // 2. Filter Listeners
    filters.forEach(btn => {
        btn.onclick = () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.filter;
            if (prodCont) window.renderProducts(prodCont, category);
        };
    });

    // 3. Cart Modal Logic
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-modal');

    // Make sure we can open/close
    const toggleModal = (show) => {
        if (!cartModal) return;
        if (show) {
            cartModal.classList.add('active');
            window.updateCartUI();
        } else {
            cartModal.classList.remove('active');
        }
    };

    if (cartBtn) cartBtn.addEventListener('click', () => toggleModal(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleModal(false));

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (cartModal && e.target === cartModal) toggleModal(false);
    });

    // 4. WhatsApp Checkout
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
                msg += `▪️ ${i.name} (x${i.qty}) : ${window.formatPrice(lineTotal)}\n`;
                total += lineTotal;
            });

            msg += `\n*💰 TOTAL : ${window.formatPrice(total)}*`;
            msg += `\n\n📍 _Merci de me confirmer la livraison._`;

            const phone = "22677973958"; // The number from the HTML
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

            window.open(url, '_blank');
        };
    }

    // 5. Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');
    if (menuBtn && nav) {
        menuBtn.onclick = () => {
            nav.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (nav.classList.contains('active')) {
                    icon.classList.remove('ri-menu-4-line');
                    icon.classList.add('ri-close-line');
                } else {
                    icon.classList.remove('ri-close-line');
                    icon.classList.add('ri-menu-4-line');
                }
            }
        };
        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('ri-close-line');
                    icon.classList.add('ri-menu-4-line');
                }
            });
        });
    }

    // 6. Navigation Active State
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === 'index.html' && href === '#accueil')) {
            link.classList.add('active');
        } else {
            // Remove active just in case
            // link.classList.remove('active');
        }
    });

    // 7. Initialize
    window.updateCartUI();

    // 8. Robust Loader Removal
    const removeLoader = () => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.transition = 'opacity 0.5s ease';
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) loader.remove();
                document.body.style.overflow = 'visible';
            }, 500);
        }
    };

    // Force remove after 2s anyway as a fallback
    setTimeout(removeLoader, 2000);

    // Initial remove
    setTimeout(removeLoader, 500);

    // Init AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }
});
