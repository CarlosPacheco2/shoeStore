<template>
  <q-card class="card-product">
    <q-card-section class="img-card">
      <q-img :src="imagePath" :id="product.id">
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
import { ref, onMounted } from "vue";

const props = defineProps({
  product: Object,
});

let myInterval;
let countImage = 1;
let imagePath = ref(props.product.imagesURL.find((url) => url.match(/1.jpg/)));

onMounted(() => {
  document
    .getElementById(props.product.id)
    .addEventListener("mouseenter", (event) => {
      myInterval = setInterval(changeImage, 4500);
    });

  document
    .getElementById(props.product.id)
    .addEventListener("mouseleave", (event) => {
      clearInterval(myInterval);
    });
});

function changeImage() {
  countImage < 3 ? countImage++ : (countImage = 1);
  imagePath.value = props.product.imagesURL.find((url) =>
    url.match(new RegExp(countImage + ".jpg"))
  );
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Secular+One&display=swap");
.card-product {
  border-bottom: 12px solid #ffffff;
  border-radius: 40px 40px 30px 30px;
}
.product-details-container {
  opacity: 0.3;
  transition: 0.5s;
}
.img-card {
  transform: translateY(63px);
  transition: 0.3s;
}

.product-detail {
  transition: 0.1s;
  opacity: 0;
}
.card-product:hover {
  border-bottom: 12px groove #d202e9;
  border-radius: 0px 0px 30px 30px;
}
.card-product:hover .img-card {
  transform: translateY(0px);
}
.card-product:hover .product-detail {
  transform: translateY(5px);
  opacity: 1;
}

.card-product:hover .product-details-container {
  background-color: rgba(72, 70, 109, 0.899);
  opacity: 1;
}
</style>
