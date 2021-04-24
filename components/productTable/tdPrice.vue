<template>
  <td class="TdPrice"
      :class="highlightClass"
  >
    {{ value }}
  </td>
</template>

<script>
export default {
  name: 'TdPrice',

  props: {
    value: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      curValue: null,
      highlightClass: null,
    };
  },

  watch: {
    value(newVal, oldVal) {
      if (newVal < oldVal) {
        this.highlightClass = 'TdPrice--down';
      } else if (newVal > oldVal) {
        this.highlightClass = 'TdPrice--up';
      } else {
        this.highlightClass = '';
      }
    }
  },
};
</script>

<style lang="scss">
.TdPrice {
  animation-duration: 2s;
  animation-fill-mode: forwards;

  &--up {
    animation-name: up;
  }
  &--down {
    animation-name: down;
  }

  @keyframes up {
    0% {
      background: rgba($colorRed, .1);
    }
    5% {
      background: rgba($colorRed, .25);
    }
    100% {
      background: rgba($colorRed, .1);
    }
  }

  @keyframes down {
    0% {
      background: rgba($colorGreen, .1);
    }
    5% {
      background: rgba($colorGreen, .25);
    }
    100% {
      background: rgba($colorGreen, .1);
    }
  }
}

</style>
