<template>
  <q-btn-dropdown
    transition-show="scale"
    color="purple-13"
    :menu-offset="[0, 30]"
    dense
    fab-mini
    dropdown-icon="filter_alt"
    no-icon-animation
    auto-close
  >
    <q-list style="width: 200px">
      <q-item v-for="(brand, index) in LBrands" :key="index" clickable>
        <q-item-section>
          <q-checkbox
            :val="brand.name"
            right-label
            v-model="brand.active"
            @update:model-value="filterBy(brand.name)"
            :label="brand.name"
            checked-icon="task_alt"
            color="teal"
            unchecked-icon="radio_button_unchecked"
          >
            <q-badge color="positive" align="top" class="q-ml-sm" rounded>{{
              brand.count
            }}</q-badge>
          </q-checkbox>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { useDataStore } from "src/stores/dataStore";
import { ref } from "vue";

const selectedBrands = [];
const emit = defineEmits(["filterBy"]);

function filterBy(brand) {
  selectedBrands.includes(brand)
    ? selectedBrands.splice(selectedBrands.indexOf(brand), 1)
    : selectedBrands.push(brand);

  emit("filterBy", selectedBrands);
}

const LBrands = ref(useDataStore().brands);
</script>
