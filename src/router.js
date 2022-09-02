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

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;