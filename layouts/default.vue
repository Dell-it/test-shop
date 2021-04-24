<template>
  <div class="layout">
    <div class="main">
      <Nuxt />
    </div>
  </div>
</template>

<script>

export default {
  components: { },

  mounted() {

  },

  methods: {

  },
};
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex-grow: 1;
  min-height: 100vh;

  &__bg {
    position: fixed;
    bottom: 0;
    left: calc(50% - 500px);
    z-index: -1;

    width: 1000px;
    height: 800px;

    fill: #f8f8f8;
  }
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex-grow: 1;
}
</style>
