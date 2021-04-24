<template>
  <div class="notFound">
    <div class="notFound__container container">
      <div class="notFound__head">
        404
      </div>

      <div class="notFound__title">
        Страница не найдена :(
      </div>

      <n-link :to="{name:'index'}"
              class="notFound__btn"
      >
        Вернуться на главную
      </n-link>
      <div />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Error',

  components: {},

  asyncData({ res }) {
    if (res !== undefined) {
      res.statusCode = 404;
    }
  },

  head() {
    return {
      title: '404 ошибка',
      meta: [
        { hid: 'description', name: 'description', content: '' },
        { name: 'og:title', content: '' },
        { name: 'og:description', content: '' },
        { name: 'og:image', content: '' },
      ],
    };
  },
};
</script>
<style lang="scss">
.notFound {
  padding: 80px 0;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    text-align: center;
  }

  &__head {
    margin-bottom: 30px;

    color: $colorBlack;
    font-size: 200px;
    font-weight: 800;
    line-height: 1;
  }

  &__title {
    margin-bottom: 30px;

    color: $colorBlack;
    font-size: $fz-h-md;
  }

  &__btn {
    width: 360px;
    max-width: 100%;
    margin-top: 60px;
  }
}
</style>
