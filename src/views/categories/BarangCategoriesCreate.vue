<template>
    <div v-if="!submitted">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Create Barang Categories</h3>
            </div>
            <div class="card-body">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" v-model="barangCategory.name" class="form-control" placeholder="Enter name">
                    </div>
                    <button @click="saveBarangCategory" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
    <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newBarangCategory">Add</button>
    </div>
</template>

<script>
import BarangCategoriesDataService from '../../services/BarangCategoriesDataService';

export default {
    name: "barang-categories-create",
    data() {
        return {
            barangCategory: {
                id: null,
                name: '',
            },
            submitted: false,
        };
    },
    methods: {
        saveBarangCategory() {
            var data = {
                name: this.barangCategory.name,
            };

            BarangCategoriesDataService.create(data)
                .then(response => {
                    this.barangCategory.id = response.data.data.id;
                    this.submitted = true;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        newBarangCategory() {
            this.submitted = false;
            this.barangCategory = {
                id: null,
                name: '',
            };
        }
    }

}
</script>

<style>

</style>