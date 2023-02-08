<template>
  <q-card class="card-product">
    <q-card-section class="img-card">
      <q-img :src="product.imagesURL[0]">
        <div class="absolute-bottom">
          <div class="text-weight-thin text-h4">
            {{ product.brand + " " + product.name }}
          </div>
        </div>
      </q-img>
    </q-card-section>
    <q-card-section class="product-details-container">
      <div class="text-weight-medium text-h4 text-white product-detail">
        $ {{ product.price }}
      </div>
      <div class="text-weight-thin text-h6 text-white product-detail">
        Talla {{ product.size }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  product: Object,
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Secular+One&display=swap");
.card-product {
  border-radius: 40px 30px 22px 22px;
  border-bottom: 12px groove #d202e9;
}

.product-detail {
  transform: translateY(10px);
}

.product-details-container {
  background-color: rgba(72, 70, 109, 0.899);
}
</style>
