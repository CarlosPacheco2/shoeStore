<template>
  <q-page>
    <div class="row q-px-lg q-py-xl justify-between" id="products">
      <div class="col-xs-12 col-md-6">
        <div
          class="row"
          :class="{
            ' q-gutter-x-md': $q.platform.is.mobile,
          }"
        >
          <div class="col-xs-3 col-md-4">
            <img src="../assets/logo_text_desktop.png" class="desktop-only" />
            <img src="../assets/logo_text_mobile.png" class="mobile-only" />
          </div>
          <div
            class="col-xs-6 col-md-5"
            :class="{
              ' q-py-lg': $q.platform.is.desktop,
              ' q-py-xl': $q.platform.is.mobile,
            }"
          >
            <span
              class="text"
              :class="{
                'text-h1 ': $q.platform.is.desktop,
                'text-h3': $q.platform.is.mobile,
              }"
              >Catálogo</span
            >
          </div>
        </div>
      </div>
      <div
        class="col-auto q-mr-xl"
        :class="{
          'q-mt-lg': $q.platform.is.mobile,
        }"
      >
        <span class="q-mr-md text text-h6">Filtrar</span>
        <FilterOptions @filter-by="filterProducts" />
        <span class="q-ml-lg q-mr-md text text-h6">Ordenar por</span>
        <SortByOptions />
      </div>
    </div>
    <div class="row q-gutter-y-lg q-mt-md">
      <div
        class="col-4 q-px-md desktop-only q-mb-md"
        v-for="product in ComputedProducts"
        :key="product.id"
      >
        <ProductCardDesktop :product="product" />
      </div>
      <div
        class="col-12 q-px-md mobile-only"
        v-for="product in ComputedProducts"
        :key="product.id"
      >
        <ProductCardMobile :product="product" />
      </div>
    </div>
    <div class="q-mt-xl q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        :max="maxPages"
        direction-links
        color="purple-13"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed, watch, onMounted } from "vue";
import { useDataStore } from "stores/dataStore";
import ProductCardDesktop from "src/components/ProductCardDesktop.vue";
import ProductCardMobile from "src/components/ProductCardMobile.vue";
import FilterOptions from "src/components/FilterOptions.vue";
import SortByOptions from "src/components/SortByOptions.vue";

const $q = useQuasar();
let PRODUCTS_POR_PAGE = 0;
let currentPage = ref(1);
let LProducts = ref([]);
const store = useDataStore();

const maxPages = computed(() => {
  return Math.ceil(LProducts.value.length / PRODUCTS_POR_PAGE);
});

const ComputedProducts = computed(() => {
  return LProducts.value.slice(
    PRODUCTS_POR_PAGE * currentPage.value - PRODUCTS_POR_PAGE,
    PRODUCTS_POR_PAGE * currentPage.value
  );
});

if ($q.platform.is.desktop) {
  PRODUCTS_POR_PAGE = 6;
} else {
  PRODUCTS_POR_PAGE = 4;
}

function filterProducts(brands) {
  if (brands.length) {
    LProducts.value = sortBy(
      store.getProductsStore.filter((product) => {
        return brands.includes(product.brand);
      })
    );
  } else {
    LProducts.value = sortBy(store.getProductsStore);
  }

  currentPage.value = 1;
  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
  });
}

function sortBy(array) {
  if (store.sortBy === "asc") {
    return array.sort((a, b) => a.price - b.price);
  } else {
    return array.sort((a, b) => b.price - a.price);
  }
}

watch(
  () => store.isFullied,
  (value) => {
    LProducts.value = sortBy(store.getProductsStore);
  }
);

watch(
  () => store.sortBy,
  (newValue) => {
    LProducts.value = sortBy(LProducts.value);
  }
);

watch(
  () => currentPage.value,
  () => {
    document.getElementById("products").scrollIntoView({
      behavior: "smooth",
    });
  }
);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&family=Secular+One&display=swap");
.text {
  font-family: "Poppins", sans-serif;
}

.title {
  font-family: "Secular One", sans-serif;
}
</style>
