<script setup lang="ts">
import ButtonCommon from "./Button.vue";

interface IModalEmits {
  (e: "close"): void;
  (e: "submit"): void;
}

interface IModalProps {
  isClose?: boolean;
  classCustom?: string;
}

defineProps<IModalProps>();

const emits = defineEmits<IModalEmits>();

const handleCancel = () => {
  emits("close");
};

const handleSubmit = () => {
  emits("submit");
};
</script>

<template>
  <div class="overlay">
    <div :class="['modal', classCustom]">
      <button v-if="isClose" class="modal__close" @click="emits('close')">
        x
      </button>
      <div class="modal__content">
        <slot></slot>
      </div>
      <div class="modal__footer">
        <ButtonCommon
          v-if="!isClose"
          class="btn-cancel"
          text="Cancel"
          @click="handleCancel"
        ></ButtonCommon>
        <ButtonCommon
          class="btn-submit"
          text="Ok"
          @click="handleSubmit"
        ></ButtonCommon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba($text-dark, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  .modal {
    min-width: 25rem;
    min-height: 10rem;
    background-color: $text-light;
    border-radius: 1rem;
    box-shadow: 0px 0px 3px $text-dark;
    position: relative;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    &__close {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      border-radius: 999px;
      background-color: rgba($color-border, 0.5);
      color: $text-light;
      transform: translate(30%, -20%);
      cursor: pointer;
    }

    &__content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      :deep(> p) {
        font-size: 1rem;
        font-weight: 700;
        white-space: pre-line;
      }
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      > button {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
