<script setup lang="ts">
interface IButtonProps {
  text?: String;
  isIcon?: Boolean;
}

interface IButtonEmits {
  (e: "click", event: MouseEvent, text?: String): void;
}

const { text, isIcon } = defineProps<IButtonProps>();

const emits = defineEmits<IButtonEmits>();

const handleChange = (e: MouseEvent) => {
  emits("click", e);
};
</script>

<template>
  <button :class="['btn-base', { 'btn-icon': isIcon }]" @click="handleChange">
    {{ text }}
    <slot name="icon"></slot>
  </button>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.btn-base {
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &.btn-icon {
    border: 1px solid $text-dark;
    border-radius: 5px;
    width: 2rem;
    height: 2rem;

    :deep(> img) {
      cursor: pointer;
      width: 100%;
      height: 100%;
    }
  }

  &.btn-add {
    border-radius: 999px;
    border: none;
    color: $text-light;
    font-weight: 900;
    background-color: $color-sub1;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.btn-add-group {
    background-color: $color-main;
    color: $text-light;
    border-radius: 5px;
    border-bottom: 1px solid $color-border;
    margin-top: 0.5rem;
    padding: 0.5rem;
    min-width: 5rem;
  }

  &.btn-remove-group {
    color: $color-sub2;
    border: 1px solid $color-sub2;
    border-radius: 5px;
    min-width: 5rem;
    padding: 0.5rem;
  }

  &.btn-remove {
    @extend .btn-add;
    background-color: $color-sub2;
  }

  &.btn-cancel {
    background-color: $color-border;
    color: $text-light;
    border-radius: 5px;
    padding: 0.5rem;
    min-width: 5rem;
  }

  &.btn-submit {
    background-color: orange;
    color: #fff;
    border-radius: 5px;
    padding: 0.5rem;
    min-width: 5rem;
  }
}
</style>
