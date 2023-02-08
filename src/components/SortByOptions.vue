<template>
  <q-btn-dropdown
    transition-show="scale"
    color="purple-13"
    :menu-offset="[0, 30]"
    dense
    fab-mini
    dropdown-icon="expand_more"
    auto-close
  >
    <q-list style="width: 200px">
      <q-item
        clickable
        @click="sortBy('desc')"
        v-ripple
        :active="activeMethod === 'desc'"
        active-class="my-menu-link"
      >
        <q-item-section>
          <strong>Precio:</strong> Mayor a menor
        </q-item-section>
      </q-item>
      <q-item
        clickable
        @click="sortBy('asc')"
        v-ripple
        :active="activeMethod === 'asc'"
        active-class="my-menu-link"
      >
        <q-item-section>
          <strong>Precio:</strong> Menor a mayor
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { ref } from "vue";
import { useDataStore } from "stores/dataStore";

const store = useDataStore();
let activeMethod = ref(store.sortBy);

function sortBy(type) {
  activeMethod.value = type;
  store.sortBy = type;
}
</script>

<style scoped>
.my-menu-link {
  color: white;
  background-color: rgba(72, 70, 109, 0.899);
}
</style>
