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
                        <div class="form-group col">
                            <div v-if="!barangCategory.id">
                                <input type="text" v-model="barangCategory.name" class="form-control" @change="saveBarangCategory" placeholder="Enter name to add">
                            </div>
                            <div v-else>
                                <input type="text" v-model="barangCategory.name" class="form-control" @change="updateBarangCategory" placeholder="Enter name to add">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <!-- search -->
                            <div class="form-group">
                                <input type="text" v-model="name" class="form-control" placeholder="Search Name" @keyup.enter="searchBarangCategory">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in barangCategories">
                                        <td style="width: 20px;">{{ index + 1 }}</td>
                                        <td>{{ item.name }}</td>
                                        <td style="width: 200px;">
                                            <button class="btn btn-primary" @click="getBarangCategory(item.id)">Edit</button> 
                                            <button class="btn btn-danger" @click="deleteBarangCategory(item.id)">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
        };
    },   
    methods: {
        retriveBarangCategories() {
            BarangCategoriesDataService.getAll().then(
                response => {
                    this.barangCategories = response.data.data;
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
            this.retriveBarangCategories();
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
            BarangCategoriesDataService.findByName(this.name)
                .then(response => {
                    this.barangCategories = response.data.data;
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
    },
    mounted() {
        this.retriveBarangCategories();
    } 
}
</script>

<style>

</style>