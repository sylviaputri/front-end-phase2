<template>
    <div class="px-4">
        <h4 class="font-weight-bold">PERINGKAT & ULASAN</h4>
        <div class="m-auto text-center">
            <h3 class="orangeColor font-weight-bold mt-3">3.5 / 5.0</h3>
            <star-rating v-bind:increment="0.5" v-bind:max-rating="5"  inactive-color="white" active-color="#D43300"
                v-bind:star-size="25" rating="3.5" read-only="true" border-width="2" border-color="#D43300"
                glow="3" glow-color="#D43300"></star-rating>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>
html{
  background: url('./../assets/background_images/rating_review.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.vue-star-rating{
    margin:auto
}
.vue-star-rating-rating-text{
    display: none
}
</style>
