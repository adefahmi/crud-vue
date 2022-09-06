<template>
    <div class="row">
        <div class="col-md-12">
          <h1>Hello Vue</h1>
          <p>API URL = {{ api_url }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            api_url: import.meta.env.VITE_API_ENDPOINT
        };
    }
}
console.log(import.meta.env.VITE_API_ENDPOINT);
let user = JSON.parse(localStorage.getItem("user"));
console.log(user);
</script>

<style>

</style>