import http from "../http-common";

// class BarangCategoriesDataService 
class BarangCategoriesDataService {
    // getAll()
    getAll(name = null, perPage = null, page = null) {
        return http.get("/barang-category", {
            params: {
                name,
                perPage,
                page
            }
        });
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
    findByName(name, perPage = null, page = null) {
        return http.get(`/barang-category`, {
            params: {
                name,
                perPage,
                page
            }
        });
    }
}

export default new BarangCategoriesDataService();