import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/barang-categories",
        alias: "/barang-categories",
        name: "barang-categories",
        component: () => import("./views/categories/BarangCategories.vue")
    },
    // details
    {
        path: "/barang-categories/:id",
        name: "barang-categories-details",
        component: () => import("./views/categories/BarangCategoriesDetail.vue")
    },
    // create
    {
        path: "/barang-categories/create",
        name: "barang-categories-create",
        component: () => import("./views/categories/BarangCategoriesCreate.vue")
    },
    // home
    {
        path: "/",
        name: "home",
        component: () => import("./views/Home.vue")
    },
    // login
    {
        path: "/login",
        name: "login",
        component: () => import("./views/auth/Login.vue")
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        return next('/login');
    } else {
        next();
    }
});

export default router;