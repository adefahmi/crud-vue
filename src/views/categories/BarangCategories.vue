<template>
    <div class="row">
        <div class="col-md-12">
            <h1>Barang Categories</h1>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4>Barang Categories</h4>
                </div>
                <div class="card-body">
                    <!-- add form -->
                    <div class="row ">
                        <div class="form-group col mb-3">
                            <div v-if="!barangCategory.id">
                                <input type="text" v-model="barangCategory.name" class="form-control" @change="saveBarangCategory" placeholder="Enter name to add">
                            </div>
                            <div v-else>
                                <input type="text" v-model="barangCategory.name" class="form-control" @change="updateBarangCategory" placeholder="Enter name to add">
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-12">
                            <!-- search -->
                            <div class="form-group">
                                <input type="text" v-model="name" class="form-control" placeholder="Search Name" @keyup.enter="searchBarangCategory">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="perPage">Per Page</label>
                                <select v-model="perPage" class="form-control" @change="refreshList">
                                    <option>5</option>
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!-- per page option -->
                        <div class="col">
                            <b-table-simple hover caption-top responsive id="my-table">
                                <b-thead>
                                    <b-tr>
                                        <b-th>No</b-th>
                                        <b-th>Name</b-th>
                                        <b-th>Action</b-th>
                                    </b-tr>
                                </b-thead>
                                <b-tbody>
                                    <b-tr v-for="(item, index) in barangCategories">
                                        <b-td style="width: 50px;">{{ index + from }}</b-td>
                                        <b-td>{{ item.name }}</b-td>
                                        <b-td style="width: 200px;">
                                            <button class="btn btn-primary me-2" @click="getBarangCategory(item.id)">Edit</button> 
                                            <button class="btn btn-danger" @click="deleteBarangCategory(item.id)">Delete</button>
                                        </b-td>
                                    </b-tr>
                                </b-tbody>
                            </b-table-simple>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <b-pagination
                                v-model="currentPage"
                                :total-rows="total"
                                :per-page="perPage"
                                first-text="First"
                                prev-text="Prev"
                                next-text="Next"
                                last-text="Last"
                                @update:model-value="refreshList()"
                            ></b-pagination>
                        </div>
                        <div class="col-md-4">
                            Total Data : {{ total }} - Current Page : {{ currentPage }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BarangCategoriesDataService from '../../services/BarangCategoriesDataService'

export default {
    name: "barang-categoies",
    data() {
        return {
            barangCategories: [],
            currentBarangCategory: null,
            currentBarangCategoryIndex: -1,
            name: '',  
            barangCategory: {
                id: null,
                name: '',
            },
            perPage: 10,
            currentPage: 1,
            total: 0,
            from: 1
        };
    },   
    methods: {
        retriveBarangCategories(name, perPage, currentPage) {
            BarangCategoriesDataService.getAll(name, perPage, currentPage).then(
                response => {
                    this.barangCategories = response.data.data;
                    this.handlePageChange(response.data.pagination);    
                    console.log(response.data);
                })
                .catch(
                    error => {
                        console.log(error);
                    }
                );
        },
        // refresh list
        refreshList() {
            this.retriveBarangCategories(this.name, this.perPage, this.currentPage);
            this.currentBarangCategory = null;
            this.currentBarangCategoryIndex = -1;
        },
        // set active
        setActiveBarangCategory(barangCategory, index) {
            this.currentBarangCategory = barangCategory;
            this.currentBarangCategoryIndex = index;
        },
        // search
        searchBarangCategory() {
            this.currentPage = 1;
            BarangCategoriesDataService.findByName(this.name, this.perPage, this.currentPage)
                .then(response => {
                    this.barangCategories = response.data.data;
                    this.handlePageChange(response.data.pagination);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        // delete
        deleteBarangCategory(id) {
            BarangCategoriesDataService.delete(id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        saveBarangCategory() {
            BarangCategoriesDataService.create(this.barangCategory)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                    this.newBarangCategory();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        newBarangCategory() {
            this.barangCategory = {
                id: null,
                name: '',
            };
        },
        // get barangCategory
        getBarangCategory(id) {
            BarangCategoriesDataService.get(id)
                .then(response => {
                    this.barangCategory = response.data.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        // update barangCategory
        updateBarangCategory() {
            BarangCategoriesDataService.update(this.barangCategory.id, this.barangCategory)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                    this.newBarangCategory();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        // handel page
        handlePageChange(pagination) {
            this.perPage = Number(pagination.per_page);
            this.currentPage = pagination.current_page;
            this.total = pagination.total_data;
            this.from = pagination.from;
        },
    },
    mounted() {
        this.retriveBarangCategories(this.name, this.perPage, this.currentPage);
    } 
}
</script>

<style>

</style>