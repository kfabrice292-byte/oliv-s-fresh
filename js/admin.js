// --- AUTH LOGIC ---
const loginBtn = document.getElementById('login-btn');
const emailInp = document.getElementById('admin-email');
const passInp = document.getElementById('admin-password');
const errorEl = document.getElementById('login-error');

function login() {
    const email = emailInp.value;
    const pass = passInp.value;

    if (!email || !pass) return;

    loginBtn.disabled = true;
    loginBtn.textContent = "Connexion...";

    window.firebaseService.auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            errorEl.style.display = 'none';
        })
        .catch((err) => {
            console.error("Auth Error:", err);
            errorEl.style.display = 'block';
            loginBtn.disabled = false;
            loginBtn.textContent = "Connexion";
        });
}

function logout() {
    window.firebaseService.auth.signOut().then(() => {
        location.reload();
    });
}

// Global exposure
window.login = login;
window.logout = logout;

// --- DASHBOARD CORE ---
window.firebaseService.auth.onAuthStateChanged((user) => {
    const authScreen = document.getElementById('auth-screen');
    const dashboard = document.getElementById('dashboard');
    document.body.style.opacity = '1';

    if (user) {
        if (authScreen) authScreen.style.display = 'none';
        if (dashboard) dashboard.style.display = 'flex';
        renderAdminTables();
    } else {
        if (authScreen) authScreen.style.display = 'flex';
        if (dashboard) dashboard.style.display = 'none';
    }
});

async function renderAdminTables() {
    const pBody = document.getElementById('products-table-body');
    const bBody = document.getElementById('blog-table-body');

    if (pBody) pBody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 2rem;"><i class="ri-loader-4-line ri-spin"></i> Chargement...</td></tr>';

    await window.initializeData();
    updateStats();

    if (pBody) {
        const validProducts = window.products.filter(p => p && p.name);
        renderProductRows(validProducts);
    }

    if (bBody) {
        if (window.blogPosts.length === 0) {
            bBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:2rem;">Aucun article.</td></tr>';
        } else {
            bBody.innerHTML = window.blogPosts.map(b => `
                <tr>
                    <td><img src="${b.image || 'img/oli_logo.png'}" style="width:40px; height:40px; border-radius:10px; object-fit:cover;" onerror="this.src='img/oli_logo.png'"></td>
                    <td style="font-weight:600;">${b.title}</td>
                    <td><span style="background:#f1f5f9; padding:4px 10px; border-radius:6px; font-size:0.8rem;">${b.tag}</span></td>
                    <td>
                        <button class="action-btn edit-btn" onclick="openBlogEdit('${b.id}')"><i class="ri-edit-line"></i></button>
                        <button class="action-btn delete-btn" onclick="deleteBlogPost('${b.id}')"><i class="ri-delete-bin-line"></i></button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

function renderProductRows(list) {
    const pBody = document.getElementById('products-table-body');
    if (!pBody) return;

    if (list.length === 0) {
        pBody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:2rem;">Aucun résultat trouvé.</td></tr>';
        return;
    }

    pBody.innerHTML = list.map(p => `
        <tr>
            <td><input type="checkbox" class="promo-select" value="${p.id}"></td>
            <td><img src="${p.image || 'img/oli_logo.png'}" style="width:50px; height:50px; border-radius:12px; object-fit:cover; border:1px solid #eee;" onerror="this.src='img/oli_logo.png'"></td>
            <td>
                <div style="font-weight:700;">${p.name}</div>
                ${p.tag ? `<span style="font-size:0.7rem; background:var(--accent); color:var(--primary-dark); padding:2px 6px; border-radius:4px; font-weight:700;">${p.tag}</span>` : ''}
            </td>
            <td><span style="font-size:0.85rem; color:#64748b;">${window.getProductTag ? window.getProductTag(p.category) : p.category}</span></td>
            <td>
                <div style="display:flex; align-items:center; gap:5px;">
                    <input type="number" value="${p.price || 0}" id="price-${p.id}" style="width:90px; padding:8px; border:1px solid #e2e8f0; border-radius:8px; font-weight:600;">
                </div>
            </td>
            <td>
                <select id="unit-${p.id}" style="padding:8px; border:1px solid #e2e8f0; border-radius:8px; width:90px;">
                    <option value="kg" ${p.unit === 'kg' ? 'selected' : ''}>kg</option>
                    <option value="unité" ${p.unit === 'unité' ? 'selected' : ''}>unité</option>
                    <option value="botte" ${p.unit === 'botte' ? 'selected' : ''}>botte</option>
                    <option value="barquette" ${p.unit === 'barquette' ? 'selected' : ''}>barquette</option>
                    <option value="1L" ${p.unit === '1L' ? 'selected' : ''}>1L</option>
                    <option value="bol" ${p.unit === 'bol' ? 'selected' : ''}>bol</option>
                    <option value="sachet" ${p.unit === 'sachet' ? 'selected' : ''}>sachet</option>
                </select>
            </td>
            <td>
                <div class="badge-status ${p.active !== false ? 'badge-active' : 'badge-inactive'}" 
                     onclick="toggleProductStatus('${p.id}', ${p.active !== false})" style="cursor:pointer;">
                    <i class="${p.active !== false ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'}"></i>
                    ${p.active !== false ? 'En ligne' : 'Hors-ligne'}
                </div>
            </td>
            <td style="white-space:nowrap;">
                <button class="action-btn" title="Sauvegarde Rapide" onclick="quickUpdate('${p.id}')">
                    <i class="ri-save-fill" style="color:var(--primary);"></i>
                </button>
                <button class="action-btn" title="Modifier" onclick="openProductEdit('${p.id}')">
                    <i class="ri-pencil-line" style="color:#64748b;"></i>
                </button>
                <button class="action-btn delete-btn" title="Supprimer" onclick="deleteProduct('${p.id}')">
                    <i class="ri-delete-bin-7-line"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// --- STATS LOGIC ---
function updateStats() {
    if (!window.products) return;
    const total = window.products.length;
    const inactive = window.products.filter(p => !p.active || p.active === false).length;
    const blog = window.blogPosts ? window.blogPosts.length : 0;

    const elTotal = document.getElementById('stat-total-products');
    const elInactive = document.getElementById('stat-inactive-products');
    const elBlog = document.getElementById('stat-total-blog');

    if (elTotal) elTotal.textContent = total;
    if (elInactive) elInactive.textContent = inactive;
    if (elBlog) elBlog.textContent = blog;
}

// --- SEARCH & FILTER ---
window.filterAdminProducts = function () {
    const term = document.getElementById('product-search').value.toLowerCase();
    const filtered = window.products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        (p.category && p.category.toLowerCase().includes(term)) ||
        (p.tag && p.tag.toLowerCase().includes(term))
    );
    renderProductRows(filtered);
};

// --- UTILS ---
window.toggleAllCheckboxes = function (source) {
    const checkboxes = document.querySelectorAll('.promo-select');
    checkboxes.forEach(cb => cb.checked = source.checked);
};

// --- WHATSAPP GENERATOR PRO ---
window.openWhatsAppModal = function () {
    const selectedIds = Array.from(document.querySelectorAll('.promo-select:checked')).map(cb => cb.value);

    if (selectedIds.length === 0) {
        return alert("Veuillez cocher au moins un produit dans la liste pour générer la promo !");
    }

    const intro = document.getElementById('wa-intro').value;
    const selectedProducts = window.products.filter(p => selectedIds.includes(p.id));

    const categoryEmojis = {
        'fruit': '🍎',
        'vegetable': '🥬',
        'aromatic': '🌿',
        'tuber': '🥔',
        'processed': '🥤',
        'subscription': '📦'
    };

    let message = `*${intro.toUpperCase()}* 🌿✨\n\n`;

    // Group by category
    const grouped = {};
    selectedProducts.forEach(p => {
        if (!grouped[p.category]) grouped[p.category] = [];
        grouped[p.category].push(p);
    });

    for (const [cat, items] of Object.entries(grouped)) {
        const emoji = categoryEmojis[cat] || '📍';
        const catName = window.getProductTag ? window.getProductTag(cat) : cat;

        message += `${emoji} *${catName.toUpperCase()}*\n`;
        items.forEach(p => {
            message += `• ${p.name} : *${p.price}F*/${p.unit}\n`;
        });
        message += `\n`;
    }

    message += `--- \n`;
    message += `🛵 *Livraison rapide sur Ouagadougou !*\n`;
    message += ` *Commander ici :* wa.me/22677973958\n`;
    message += `✨ _Oliv's Fresh : Le champ dans votre cuisine._`;

    document.getElementById('wa-preview').innerText = message;
    document.getElementById('whatsapp-modal').classList.add('active');
};

window.copyWhatsAppPromo = function () {
    const text = document.getElementById('wa-preview').innerText;
    navigator.clipboard.writeText(text).then(() => {
        if (window.showToast) window.showToast("Message copié !");
        else alert("Message copié dans le presse-papier !");
    });
};

// --- EXPORT JSON ---
window.exportDataToJSON = function () {
    const data = {
        products: window.products,
        blog: window.blogPosts,
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `olivs_fresh_backup_${new Date().toLocaleDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
};

// --- SCHEMA ENFORCEMENT ---
function prepareProductData(raw) {
    return {
        name: String(raw.name || "").trim(),
        category: String(raw.category || "fruit"),
        price: Number(raw.price) || 0,
        oldPrice: (raw.oldPrice && !isNaN(raw.oldPrice)) ? Number(raw.oldPrice) : null,
        tag: String(raw.tag || "").trim(),
        antiGaspiReason: String(raw.antiGaspiReason || "").trim(),
        unit: String(raw.unit || "kg"),
        image: String(raw.image || "img/oli_logo.png"),
        active: raw.active !== false, // defaults to true
        updatedAt: new Date().toISOString()
    };
}

// --- CRUD & OTHERS (Existing updated) ---
window.switchTab = function (tab) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    if (window.event && window.event.currentTarget) window.event.currentTarget.classList.add('active');

    document.querySelectorAll('.tab-view').forEach(v => v.style.display = 'none');
    const view = document.getElementById(`view-${tab}`);
    if (view) view.style.display = 'block';
};

window.quickUpdate = async function (id) {
    const priceInp = document.getElementById(`price-${id}`);
    const unitInp = document.getElementById(`unit-${id}`);
    const price = parseInt(priceInp.value);
    const unit = unitInp.value;

    if (isNaN(price)) return alert("Prix invalide");

    const btn = window.event ? window.event.currentTarget : null;
    const originalContent = btn ? btn.innerHTML : '';
    if (btn) btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i>';

    try {
        const existing = window.products.find(p => p.id === id);
        if (!existing) throw new Error("Produit non trouvé");

        // Merge and enforce schema
        const productObj = prepareProductData({ ...existing, price, unit });

        await window.dataService.updateProduct(id, productObj);
        await renderAdminTables();

        if (window.showToast) window.showToast("⚡ Mise à jour réussie !");
    } catch (e) {
        console.error("QuickUpdate Error:", e);
        alert("Erreur: " + e.message);
    } finally {
        if (btn) btn.innerHTML = originalContent;
    }
};

window.toggleProductStatus = async function (id, currentStatus) {
    try {
        const existing = window.products.find(p => p.id === id);
        if (!existing) return;

        const productObj = prepareProductData({ ...existing, active: !currentStatus });
        await window.dataService.updateProduct(id, productObj);
        await renderAdminTables();
    } catch (e) { alert(e.message); }
};

window.deleteProduct = async function (id) {
    if (confirm("Supprimer ce produit ?")) {
        await window.dataService.deleteProduct(id);
        renderAdminTables();
    }
};

window.deleteBlogPost = async function (id) {
    if (confirm("Supprimer cet article ?")) {
        await window.dataService.deleteBlogPost(id);
        renderAdminTables();
    }
};

window.openProductModal = function () {
    resetProductForm();
    document.getElementById('product-modal').classList.add('active');
};

window.openBlogModal = function () {
    resetBlogForm();
    document.getElementById('blog-modal').classList.add('active');
};

window.openProductEdit = function (id) {
    const p = window.products.find(x => x.id === id);
    if (!p) return;
    document.getElementById('p-id').value = p.id;
    document.getElementById('p-name').value = p.name;
    document.getElementById('p-category').value = p.category;
    document.getElementById('p-price').value = p.price;
    document.getElementById('p-old-price').value = p.oldPrice || '';
    document.getElementById('p-tag').value = p.tag || '';
    document.getElementById('p-anti-gaspi-reason').value = p.antiGaspiReason || '';
    document.getElementById('p-unit').value = p.unit;
    document.getElementById('p-image').value = p.image;
    document.getElementById('product-modal').classList.add('active');
};

window.openBlogEdit = function (id) {
    const b = window.blogPosts.find(x => x.id === id);
    if (!b) return;
    document.getElementById('b-id').value = b.id;
    document.getElementById('b-title').value = b.title;
    document.getElementById('b-tag').value = b.tag;
    document.getElementById('b-desc').value = b.desc;
    document.getElementById('b-image').value = b.image;
    document.getElementById('blog-modal').classList.add('active');
};

function closeModals() {
    document.querySelectorAll('.admin-modal').forEach(m => m.classList.remove('active'));
}
window.closeModals = closeModals;

function resetProductForm() {
    document.getElementById('p-id').value = '';
    document.getElementById('p-name').value = '';
    document.getElementById('p-price').value = '';
    document.getElementById('p-old-price').value = '';
    document.getElementById('p-tag').value = '';
    document.getElementById('p-anti-gaspi-reason').value = '';
    document.getElementById('p-image').value = '';
    document.getElementById('p-file').value = '';
}

// --- IMAGE COMPRESSION (FREE ALTERNATIVE TO STORAGE) ---
const compressImage = (file, maxWidth = 600, quality = 0.6) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to compressed JPG string
                const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                console.log("Image compressée avec succès. Taille :", Math.round(compressedBase64.length / 1024), "KB");
                resolve(compressedBase64);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
};

// --- IMAGE UPLOAD (ImgBB FREE HOSTING) ---
const IMGBB_API_KEY = 'e44673c8dfef7aea14c8b47dae4c5f0b';

const uploadToImgBB = async (file) => {
    try {
        // Step 1: Compress locally first to be fast
        const compressedBase64 = await compressImage(file);
        // Remove the data:image/jpeg;base64, prefix for ImgBB
        const base64Data = compressedBase64.split(',')[1];

        const formData = new FormData();
        formData.append('image', base64Data);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            return result.data.url;
        } else {
            throw new Error(result.error.message || "Erreur ImgBB");
        }
    } catch (e) {
        console.error("ImgBB Upload Error:", e);
        throw new Error("Échec de l'hébergement de l'image. Vérifiez votre connexion.");
    }
};

window.saveProduct = async function () {
    const nameInp = document.getElementById('p-name');
    const priceInp = document.getElementById('p-price');
    const name = nameInp.value;
    const category = document.getElementById('p-category').value;
    const price = parseInt(priceInp.value);
    const oldPrice = parseInt(document.getElementById('p-old-price').value) || null;
    const tag = document.getElementById('p-tag').value;
    const antiGaspiReason = document.getElementById('p-anti-gaspi-reason').value;
    const unit = document.getElementById('p-unit').value;
    const image = document.getElementById('p-image').value;
    const fileInput = document.getElementById('p-file');
    const file = fileInput.files[0];
    const id = document.getElementById('p-id').value;

    if (!name || isNaN(price)) return alert("Nom et Prix requis");

    const btn = document.querySelector('#product-modal .btn-admin:not([style*="background"])');
    const originalText = btn ? btn.textContent : "Enregistrer";

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Envoi image...';
    }

    try {
        let imageUrl = image || 'img/oli_logo.png';

        if (file) {
            imageUrl = await uploadToImgBB(file);
        }

        const productObj = prepareProductData({
            name, category, price, oldPrice, tag, antiGaspiReason, unit,
            image: imageUrl, active: true
        });

        if (id) await window.dataService.updateProduct(id, productObj);
        else await window.dataService.addProduct(productObj);

        if (window.showToast) window.showToast("✅ Produit enregistré !");
        closeModals();
        await renderAdminTables();
    } catch (e) {
        console.error("Save Error:", e);
        alert("🚨 Erreur : " + e.message);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    }
};

function resetBlogForm() {
    document.getElementById('b-id').value = '';
    document.getElementById('b-title').value = '';
    document.getElementById('b-tag').value = '';
    document.getElementById('b-desc').value = '';
    document.getElementById('b-image').value = '';
    document.getElementById('b-file').value = '';
}

window.saveBlogPost = async function () {
    const title = document.getElementById('b-title').value;
    const tag = document.getElementById('b-tag').value;
    const desc = document.getElementById('b-desc').value;
    const id = document.getElementById('b-id').value;
    const url = document.getElementById('b-image').value;
    const file = document.getElementById('b-file').files[0];

    if (!title) return alert("Titre requis");

    const btn = document.querySelector('#blog-modal .btn-admin:not([style*="background"])');
    const originalText = btn ? btn.textContent : "Enregistrer";

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Envoi...';
    }

    try {
        let img = url || 'img/oli_logo.png';
        if (file) {
            img = await uploadToImgBB(file);
        }

        const postObj = {
            title, tag, desc, image: img,
            date: new Date().toLocaleDateString('fr-FR'),
            updatedAt: new Date().toISOString()
        };

        if (id) await window.dataService.updateBlogPost(id, postObj);
        else await window.dataService.addBlogPost(postObj);

        if (window.showToast) window.showToast("✅ Article enregistré !");
        closeModals();
        await renderAdminTables();
    } catch (e) {
        console.error("Blog Save Error:", e);
        alert("Erreur: " + e.message);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    }
};

window.migrateLocalData = async function () {
    if (!confirm("Voulez-vous migrer tous les produits locaux vers Firebase ?")) return;
    try {
        for (const p of PRODUCTS_DATA) {
            const { id, ...data } = p;
            const productObj = prepareProductData({ ...data, active: true });
            await window.firebaseService.addProduct(productObj);
        }
        alert("Migration terminée !");
        location.reload();
    } catch (e) { alert(e.message); }
};

window.sanitizeDatabase = async function () {
    if (!confirm("⚠️ Action irréversible : Tous les produits corrompus seront supprimés, les DOUBLONS fusionnés et les ANCIENNES DONNÉES DE TEST effacées définitivement. Continuer ?")) return;

    const btn = window.event ? window.event.currentTarget : null;
    const original = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Nettoyage...';
    }

    try {
        const pList = await window.firebaseService.getProducts();
        const bList = await window.firebaseService.getBlogPosts();

        let deletedGhost = 0;
        let deletedDup = 0;
        let deletedLegacy = 0;
        let fixed = 0;

        const seenNames = new Map();

        // 1. Clean Products
        for (const p of pList) {
            // Check for legacy IDs (f1, l2, fi1, sub1, etc.)
            const isLegacyId = p.id && /^(f|l|e|t|tr|fi|sub)\d+$/.test(p.id);

            if (isLegacyId) {
                await window.firebaseService.deleteProduct(p.id);
                deletedLegacy++;
                continue;
            }

            if (!p || !p.name || typeof p.name !== 'string' || p.name.trim() === "") {
                await window.firebaseService.deleteProduct(p.id);
                deletedGhost++;
                continue;
            }

            const cleanName = p.name.trim().toLowerCase();
            const existing = seenNames.get(cleanName);

            if (!existing) {
                seenNames.set(cleanName, p);
            } else {
                const existingDate = existing.updatedAt || "";
                const currentDate = p.updatedAt || "";
                if (currentDate > existingDate) {
                    await window.firebaseService.deleteProduct(existing.id);
                    seenNames.set(cleanName, p);
                    deletedDup++;
                } else {
                    await window.firebaseService.deleteProduct(p.id);
                    deletedDup++;
                }
            }
        }

        // 2. Clean Blog Posts (Legacy b1, b2, b3)
        for (const b of bList) {
            const isLegacyBlogId = b.id && /^b\d+$/.test(b.id);
            if (isLegacyBlogId) {
                await window.firebaseService.deleteBlogPost(b.id);
                deletedLegacy++;
            }
        }

        // 3. Final format of survivors
        for (const [name, p] of seenNames) {
            const cleanData = prepareProductData(p);
            await window.firebaseService.updateProduct(p.id, cleanData);
            fixed++;
        }

        alert(`✅ Nettoyage terminé !\n- Données de test supprimées : ${deletedLegacy}\n- Produits corrompus supprimés : ${deletedGhost}\n- Doublons fusionnés : ${deletedDup}\n- Produits sains restants : ${fixed}`);
        location.reload();
    } catch (e) {
        console.error("Sanitize Error:", e);
        alert("Erreur lors du nettoyage : " + e.message);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = original;
        }
    }
};

