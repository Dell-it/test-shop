<template>
  <table v-if="products.length"
         class="productTable"
  >
    <thead>
      <tr>
        <th class="productTable__th">
          Название
        </th>
        <th class="productTable__th productTable__th--stock">
          В наличии, шт
        </th>
        <th class="productTable__th productTable__th--price">
          Цена, руб
        </th>
        <th class="productTable__th productTable__th--buy" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="product of products"
          :key="product.id"
          class="productTable__tr"
      >
        <td class="productTable__td">
          {{ product.name }}
        </td>
        <td class="productTable__td productTable__td--stock">
          {{ product.stock }}
        </td>

        <td-price class="productTable__td productTable__td--price"
                  :value="product.price"
        />
        <td class="productTable__td productTable__th--buy">
          <btn class="productTable__buy btn--transparent"
               @click="addToCart(product)"
          >
            В корзину
          </btn>
        </td>
      </tr>
    </tbody>
  </table>

  <div v-else
       class="productTable__empty"
  >
    Список пуст
  </div>
</template>

<script>
import Btn from '~/components/uiKit/btn';
import TdPrice from '~/components/productTable/tdPrice';

export default {
  name: 'ProductTable',

  components: { TdPrice, Btn },

  props: {
    products: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  methods: {
    addToCart(product) {
      this.$store.dispatch('addProduct', product);
    }
  }
};
</script>

<style lang="scss">
.productTable {
  width: 100%;

  &__tr:nth-child(even) {
    background-color: $colorGrayEL;
  }

  &__th {
    padding: 10px 20px;

    background-color: $colorGrayL;
    text-align: left;
  }

  &__td {
    padding: 5px 20px;
  }

  &__th,
  &__td {
    &--stock {
      width: 160px;
    }
    &--price {
      width: 120px;

      text-align: right;
    }
    &--buy {
      width: 160px;

      text-align: right;
    }
  }

  &__buy {
    width: 100%;
  }

  &__empty {
    padding: 10px 20px;
    text-align: center;
  }
}
</style>
