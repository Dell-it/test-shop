<template>
  <div class="cart">
    <div class="cart__title">
      Корзина
    </div>

    <template v-if="products.length">
      <ul class="cart__list">
        <li v-for="product of products"
            :key="product.id"
            class="cart__item"
        >
          <button class="cart__itemRemove"
                  type="button"
                  title="Удалить"
                  @click="remove(product.id)"
          >
            ×
          </button>

          <div class="cart__itemName">
            {{ product.name }}
          </div>

          <div class="cart__itemBottom">
            <div class="cart__itemPrice">
              <span class="cart__itemPriceValue">
                {{ product.price }}
              </span>
              руб/шт
            </div>

            <label class="cart__itemCounterLabel">
              <input type="number"
                     min="1"
                     :max="product.stock"
                     class="cart__itemCounter"
                     :value="product.count"
                     @input="input($event, product)"
              >

              <span v-if="product.stock === product.count"
                    class="cart__itemCounterMax"
              >
                Максимум
              </span>
              шт
            </label>
          </div>
        </li>
      </ul>

      <div class="cart__bottom">
        <div class="cart__totalPrice">
          Общая стоимость:

          <div class="cart__totalPriceValue">
            {{ totalPrice }}
          </div>
          руб
        </div>
      </div>
    </template>

    <div v-else
         class="cart__empty"
    >
      Корзина пуста
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopCart',

  computed: {
    products() {
      return this.$store.getters.getProducts;
    },

    totalPrice() {
      /*
      * Общая стоимость корзины
      */
      return this.products.reduce((acc, product) => {
        return acc + (product.price * product.count);
      }, 0);
    },
  },

  methods: {
    async changeCount(count, product) {
      /*
      * Обновление количества товара в корзине
      * */
      let newCount = parseInt(count) || 1;

      newCount = newCount > product.stock ? product.stock : newCount;

      if (isNaN(newCount) === false && newCount > 0 && newCount !== product.count) {
        await this.$store.dispatch('setCount', {
          productId: product.id,
          count: newCount,
        });
      }
    },

    async input(e, product) {
      const newCount = e.target.value;
      await this.changeCount(newCount, product);
      e.target.value = product.count;
    },

    remove(id) {
      this.$store.dispatch('removeProduct', id);
    },
  },
};
</script>

<style lang="scss">
.cart {
  width: 360px;

  background: $colorWhite;
  border-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(#000000, .3);

  &__title {
    padding: 15px;

    border-bottom: 1px solid $colorGrayL;
    font-size: $fz-lg;
    font-weight: 700;
  }

  &__list {
    padding: 5px 15px;
    list-style: none;
  }

  &__item {
    position: relative;
    padding: 15px 0;

    border-bottom: 1px solid $colorGrayL;

    &:last-child {
      margin: 0;
      border-bottom: none;
    }
  }

  &__itemRemove {
    position: absolute;
    right: 0;
    top: 5px;

    font-size: $fz-xl;
    color: $colorRed;
  }

  &__itemName {
    padding: 0 20px 0 0;
    margin: 0 0 10px;
  }

  &__itemBottom {
    display: flex;
    align-items: center;
  }

  &__itemPrice {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin-right: auto;

    white-space: nowrap;
  }

  &__itemPriceValue {
    margin: 0 5px 0 0;

    font-size: $fz-h-sxs;
    font-weight: 700;
    line-height: 1;
  }

  &__itemCounterLabel {
    position: relative;

    display: flex;
    align-items: center;
  }

  &__itemCounterMax {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;

    color: $colorRed;
    font-size: $fz-xs;
    text-align: left;
  }

  &__itemCounter {
    width: 80px;
    padding: 0 0 0 15px;
    margin: 0 5px 0 0;

    border: 1px solid $colorGrayL;
    text-align: center;
    line-height: 36px;;
  }

  &__empty {
    padding: 15px;

    color: $colorGray;
  }

  &__bottom {
    border-top: 1px solid $colorGrayL;
  }

  &__totalPrice {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 15px;

    color: $colorGray;
  }

  &__totalPriceValue {
    margin: 0 5px 0 auto;

    color: $colorBlack;
    font-size: $fz-h-xs;
    font-weight: 700;
  }
}
</style>
