// Firebase Compat Version
const firebaseConfig = {
    apiKey: "AIzaSyDBwxpaWojCmDNm2hCjGo5uxkeRFmXC5T0",
    authDomain: "olivsfresh.firebaseapp.com",
    projectId: "olivsfresh",
    storageBucket: "olivsfresh.firebasestorage.app",
    messagingSenderId: "1051912698826",
    appId: "1:1051912698826:web:cab8fc06d75aadeed1ad33",
    measurementId: "G-TRZVMQBW60"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Service Object
window.firebaseService = {
    auth: auth,
    storage: storage,

    async uploadFile(file, path) {
        try {
            const ref = storage.ref().child(path);
            const snapshot = await ref.put(file);
            return await snapshot.ref.getDownloadURL();
        } catch (e) {
            console.error("Storage Error:", e);
            throw e;
        }
    },

    async getProducts() {
        try {
            const snapshot = await db.collection("products").get();
            if (snapshot.empty) return [];
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (e) {
            console.error("Firestore Error (Products):", e);
            return [];
        }
    },

    async addProduct(product) {
        try {
            await db.collection("products").add(product);
        } catch (e) {
            console.error("Firestore Error (Add Product):", e);
            alert("Erreur lors de l'ajout. Vérifiez vos règles Firestore.");
        }
    },

    async deleteProduct(id) {
        try {
            await db.collection("products").doc(id).delete();
        } catch (e) {
            console.error("Firestore Error (Delete Product):", e);
        }
    },

    async updateProduct(id, product) {
        try {
            const { id: _, ...data } = product;
            await db.collection("products").doc(id).update(data);
        } catch (e) {
            console.error("Firestore Error (Update Product):", e);
        }
    },

    async getBlogPosts() {
        try {
            const snapshot = await db.collection("blog").get();
            if (snapshot.empty) return [];
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (e) {
            console.error("Firestore Error (Blog):", e);
            return [];
        }
    },

    async addBlogPost(post) {
        try {
            await db.collection("blog").add(post);
        } catch (e) {
            console.error("Firestore Error (Add Blog):", e);
        }
    },

    async deleteBlogPost(id) {
        try {
            await db.collection("blog").doc(id).delete();
        } catch (e) {
            console.error("Firestore Error (Delete Blog):", e);
        }
    },

    async updateBlogPost(id, post) {
        try {
            const { id: _, ...data } = post;
            await db.collection("blog").doc(id).update(data);
        } catch (e) {
            console.error("Firestore Error (Update Blog):", e);
        }
    }
};

console.log("Firebase Service (Storage Enabled) Ready");
