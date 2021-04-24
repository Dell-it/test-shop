<template>
  <section v-if="groupProducts.length"
           class="shop__group group"
  >
    <h4 v-if="group.name"
        class="group__name"
    >
      {{ group.name }}
    </h4>

    <product-table :products="groupProducts" />
  </section>
</template>

<script>
import ProductTable from '~/components/productTable/index';

export default {
  name: 'SectionGroup',

  components: { ProductTable },

  props: {
    products: {
      type: Array,
      default() {
        return [];
      }
    },

    group: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  computed: {
    groupProducts() {
      return this.products.filter(product => product.group === this.group.id);
    }
  }
};
</script>

<style scoped>

</style>
