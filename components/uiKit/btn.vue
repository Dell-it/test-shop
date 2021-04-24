<template>
  <component v-bind="componentProps"
             class="btn"
             @click="to ? '' : $emit('click') "
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'Btn',

  props: {
    to: {
      type: [Object, String],
      default: null,
    },
  },

  computed: {
    componentProps() {
      if (this.to) {
        if (typeof this.to === 'string' && this.to.match(/^(http(s)?|ftp):\/\//)) {
          return {
            is: 'a',
            href: this.to,
            target: '_blank',
            rel: 'noopener nofollow',
          };
        }

        return {
          is: 'n-link',
          to: this.to
        };
      }

      return {
        is: 'button'
      };
    }
  },

  methods: {},
};
</script>

<style lang="scss">
    .btn {
        position: relative;

        padding: 7px 18px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        min-height: 46px;

        font-family: $fontPrimary;
        font-weight: 400;
        font-size: $fz-sm;
        line-height: 1.1;
        color: $colorWhite;
        background-color: $colorBlack;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 2px;
        text-decoration: none;
        text-align: center;
        user-select: none;

        transition: background-color 0.12s ease, color 0.12s ease, border-color 0.12s ease;

        &:hover,
        &:focus {
            background-color: lighten($colorBlack, 12%);
            color: $colorWhite;
        }

        &:disabled {
            background-color: $colorGray;
            cursor: no-drop;
            transition-delay: 0.1s;
        }

      &--transparent {
        background-color: transparent;
        border-color: $colorBlack;
        color: $colorBlack;

        &:hover,
        &:focus {
          background-color: $colorBlack;
          color: $colorWhite;
        }
      }
    }
</style>
