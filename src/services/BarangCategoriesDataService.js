import http from "../http-common";

// class BarangCategoriesDataService 
class BarangCategoriesDataService {
    // getAll()
    getAll() {
        return http.get("/barang-category");
    }
    // get(id)
    get(id) {
        return http.get(`/barang-category/${id}`);
    }
    // create(data)
    create(data) {
        return http.post("/barang-category", data);
    }
    // update(id, data)
    update(id, data) {
        return http.put(`/barang-category/${id}`, data);
    }
    // delete(id)
    delete(id) {
        return http.delete(`/barang-category/${id}`);
    }
    // findByName(name)
    findByName(name) {
        return http.get(`/barang-category?name=${name}`);
    }
}

export default new BarangCategoriesDataService();