<template>
    <div>
        <div id="detailModule1" class="whiteColor py-5">
            <div id="detailModule1Left" class="float-left text-center">
                <h2 class="mt-5">Machine Learning V.3</h2>
                <h5 class="mt-5">Peringkat & Ulasan</h5>
                <div class="row m-auto fitContent pt-2">
                    <h2 class="mr-4">4.2 / 5.0</h2>
                    <b-button id="btnToRatingReview" variant="primary" class="border border-2">Lihat detail</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>
div#detailModule1 {
    height: 500px;
    background: url('./../assets/background_images/module_1.jpg') no-repeat;
    background-size: cover;
    margin-top: -10px;
}
div#detailModule1 #detailModule1Left{
    width: 50%;
}
button#btnToRatingReview{
    height: 40px;
}
</style>
