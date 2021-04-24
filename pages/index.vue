<template>
  <div class="containerWide">
    <div>
      <h1 class="title pageTitle">
        Test-shop
      </h1>

      <div class="shop">
        <div class="shop__catalog">
          <template v-for="group of groups">
            <section-group :key="group.id"
                           :group="group"
                           :products="products"
            />
          </template>
        </div>

        <div class="shop__side">
          <shop-cart class="shop__cart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopCart from '~/components/cart/index';
import SectionGroup from '~/components/sectionGroup/index';

/*
* Проверка на объкт
*/
const isPlainObject = obj => {
  return ((obj === null) || Array.isArray(obj) || typeof obj === 'function')
    ? false
    : (typeof obj === 'object');
};

/*
* Маппинг групп
*/
const mapGroups = names => {
  const groups = [];

  if (isPlainObject(names)) {
    for (const key in names) {
      if (Object.prototype.hasOwnProperty.call(names, key)) {
        groups.push({
          id: parseInt(key),
          name: names[key]?.G,
        });
      }
    }
  }

  return groups;
};

/*
* Маппинг продуктов
*/
const mapProducts = (names, data) => {
  const products = [];

  if (Array.isArray(data) && isPlainObject(names)) {
    data.forEach(product => {
      const newProduct = {};

      newProduct.id = product.T;
      newProduct.name = names[product.G]?.B?.[product.T]?.N;
      newProduct.group = product?.G;
      newProduct.price = Math.floor(product?.C * (Math.random() * (80 - 20)) + 20);
      newProduct.stock = product?.P;

      products.push(newProduct);
    });
  }

  return products;
};

export default {
  name: 'Index',

  components: {
    SectionGroup,
    ShopCart,
  },

  data() {
    return {
      groups: [],
      products: [],
    };
  },

  async fetch() {
    /*
    * Получение данных
    */
    const promiseList = [];
    let data = null;
    let names = null;

    const getData = async () =>
      await this.$axios.$get('/data.json', { progress: false }).then(res => {
        data = res?.Value?.Goods || [];
      });
    promiseList.push(getData());

    const getNames = async () =>
      await this.$axios.$get('/names.json', { progress: false }).then(res => {
        names = res || [];
      });
    promiseList.push(getNames());

    await Promise.all(promiseList).then(() => {
      this.groups = mapGroups(names);
      this.products = mapProducts(names, data);
    });
  },

  mounted() {
    /*
    * Обновление раз в 15 секунд
    */
    setInterval(() => {
      this.$fetch();
    }, 15000);
  },
};
</script>

<style lang="scss">
.shop {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;

  &__catalog {
    flex: 1 1 auto;
  }

  &__side {
    margin-left: 40px;
  }

  &__cart {
    position: sticky;
    top: 10px;
  }
}

.group {
  padding: 20px;
  margin: 0 0 30px;

  background: $colorWhite;
  border-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(#000000, .3);

  &__name {
    margin: 0 0 20px;
  }
}
</style>
