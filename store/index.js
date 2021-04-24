export const state = () => ({
  products: [],
});

export const getters = {
  getProducts(state) {
    return state.products;
  },
};

export const mutations = {
  addProduct(state, product) {
    state.products.push({
      ...product,
      count: 1,
    });
  },

  setCount(state, payload) {
    if (
      Object.prototype.hasOwnProperty.call(payload, 'productId') &&
      Object.prototype.hasOwnProperty.call(payload, 'count')
    ) {
      const updateProduct = state.products.find(product => product.id === payload.productId);
      const newCount = parseInt(payload.count);

      if (updateProduct) {
        if (newCount > updateProduct.stock) {
          updateProduct.count = updateProduct.stock;
        } else if (newCount < 0) {
          updateProduct.count = 0;
        } else {
          updateProduct.count = newCount;
        }
      }
    }
  },

  removeProduct(state, productId) {
    const deleteIndex = state.products.findIndex(product => product.id === productId);

    if (deleteIndex >= 0) {
      state.products.splice(deleteIndex, 1);
    }
  },
};

export const actions = {
  addProduct({ state, commit }, product) {
    const updateProduct = state.products.find(stateProduct => stateProduct.id === product.id);

    /*
     * Добавление довара в корзину, либо увеличение его количества
     * */
    if (updateProduct) {
      commit('setCount', { productId: updateProduct.id, count: updateProduct.count + 1 });
    } else {
      commit('addProduct', product);
    }
  },

  setCount({ commit }, payload) {
    commit('setCount', payload);
  },

  removeProduct({ commit }, productId) {
    commit('removeProduct', productId);
  },
};
