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

// Global exposure for HTML onclicks
window.login = login;
window.logout = logout;

// --- DASHBOARD CORE ---
window.firebaseService.auth.onAuthStateChanged((user) => {
    const authScreen = document.getElementById('auth-screen');
    const dashboard = document.getElementById('dashboard');

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

    if (pBody) pBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Chargement...</td></tr>';

    // Refresh global data
    await window.initializeData();

    // Products Table
    if (pBody) {
        if (window.products.length === 0) {
            pBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:2rem;">Aucun produit.</td></tr>';
        } else {
            pBody.innerHTML = window.products.map(p => `
                <tr>
                    <td><img src="${p.image || 'img/oli_logo.png'}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;" onerror="this.src='img/oli_logo.png'"></td>
                    <td>${p.name}</td>
                    <td>${window.getProductTag(p.category)}</td>
                    <td>${window.formatPrice(p.price)}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="openProductEdit('${p.id}')"><i class="ri-edit-line"></i></button>
                        <button class="action-btn delete-btn" onclick="deleteProduct('${p.id}')"><i class="ri-delete-bin-line"></i></button>
                    </td>
                </tr>
            `).join('');
        }
    }

    // Blog Table
    if (bBody) {
        if (window.blogPosts.length === 0) {
            bBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:2rem;">Aucun article.</td></tr>';
        } else {
            bBody.innerHTML = window.blogPosts.map(b => `
                <tr>
                    <td><img src="${b.image || 'img/oli_logo.png'}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;" onerror="this.src='img/oli_logo.png'"></td>
                    <td>${b.title}</td>
                    <td>${b.tag}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="openBlogEdit('${b.id}')"><i class="ri-edit-line"></i></button>
                        <button class="action-btn delete-btn" onclick="deleteBlogPost('${b.id}')"><i class="ri-delete-bin-line"></i></button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// --- TAB SWITCHING ---
window.switchTab = function (tab) {
    const items = document.querySelectorAll('.nav-item');
    items.forEach(i => i.classList.remove('active'));

    // Add active to the clicked one if event exists
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }

    document.getElementById('view-products').style.display = (tab === 'products') ? 'block' : 'none';
    document.getElementById('view-blog').style.display = (tab === 'blog') ? 'block' : 'none';
};

// --- CRUD OPS ---
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

// --- FORM HANDLING ---
function getProductFormData() {
    return {
        id: document.getElementById('p-id').value,
        name: document.getElementById('p-name').value,
        category: document.getElementById('p-category').value,
        price: parseInt(document.getElementById('p-price').value),
        unit: document.getElementById('p-unit').value,
        image: document.getElementById('p-image').value,
        file: document.getElementById('p-file').files[0]
    };
}

window.saveProduct = async function () {
    const data = getProductFormData();
    if (!data.name || isNaN(data.price)) return alert("Nom et Prix requis");

    const btn = window.event ? window.event.target : null;
    if (btn) { btn.disabled = true; btn.textContent = "..."; }

    try {
        let imageUrl = data.image || 'img/oli_logo.png';

        if (data.file) {
            const path = `products/${Date.now()}_${data.file.name}`;
            imageUrl = await window.firebaseService.uploadFile(data.file, path);
        }

        const productObj = {
            name: data.name,
            category: data.category,
            price: data.price,
            unit: data.unit,
            image: imageUrl
        };

        if (data.id) {
            await window.dataService.updateProduct(data.id, productObj);
        } else {
            await window.dataService.saveProduct(productObj);
        }

        closeModals();
        renderAdminTables();
    } catch (e) {
        alert("Erreur: " + e.message);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = "Enregistrer"; }
    }
};

window.saveBlogPost = async function () {
    const title = document.getElementById('b-title').value;
    const tag = document.getElementById('b-tag').value;
    const desc = document.getElementById('b-desc').value;
    const id = document.getElementById('b-id').value;
    const url = document.getElementById('b-image').value;
    const file = document.getElementById('b-file').files[0];

    if (!title) return alert("Titre requis");

    const btn = window.event ? window.event.target : null;
    if (btn) { btn.disabled = true; btn.textContent = "..."; }

    try {
        let img = url || 'img/oli_logo.png';
        if (file) {
            const path = `blog/${Date.now()}_${file.name}`;
            img = await window.firebaseService.uploadFile(file, path);
        }

        const postObj = { title, tag, desc, image: img };

        if (id) {
            await window.dataService.updateBlogPost(id, postObj);
        } else {
            await window.dataService.saveBlogPost(postObj);
        }

        closeModals();
        renderAdminTables();
    } catch (e) {
        alert("Erreur: " + e.message);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = "Enregistrer"; }
    }
};

// --- MODALS ---
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
    document.getElementById('p-image').value = '';
    document.getElementById('p-file').value = '';
}

function resetBlogForm() {
    document.getElementById('b-id').value = '';
    document.getElementById('b-title').value = '';
    document.getElementById('b-tag').value = '';
    document.getElementById('b-desc').value = '';
    document.getElementById('b-image').value = '';
    document.getElementById('b-file').value = '';
}
