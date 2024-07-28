<script setup lang="ts">
import { ref, computed, watch, toRefs, onMounted, onUnmounted } from "vue";
import { IOption } from "../../interfaces";

interface IAutocomplateProps {
  options: IOption[];
  validate: number[];
  disabled?: boolean;
  dataOption?: any;
}

interface IAutocompleteEmits {
  (e: "change", option: IOption): void;
}

const props = defineProps<IAutocomplateProps>();
const isShowListItem = ref<boolean>(false);
const keySearch = ref<string>("");

const { disabled, validate, options, dataOption } =
  toRefs<IAutocomplateProps>(props);

onMounted(() => {
  window.addEventListener("click", handleCloseOptions);
});

onUnmounted(() => {
  window.removeEventListener("click", handleCloseOptions);
});

const handleCloseOptions = (event: any) => {
  const inputClass = event.target.classList.value;
  if (inputClass !== "autocomplete__select" && isShowListItem.value) {
    isShowListItem.value = false;
  }
};

const emits = defineEmits<IAutocompleteEmits>();

watch(isShowListItem, () => {
  keySearch.value = "";
});

const mapOptionsByKey = computed(() => {
  return options.value.filter((option: IOption) =>
    option.text.includes(keySearch.value),
  );
});

const currentValue = computed(() => {
  const currentOption = options.value.find(
    (item) => dataOption?.value?.value === item.value,
  );
  if (keySearch.value) return keySearch.value;
  return currentOption?.text || "";
});

const handleChangeOption = (option: IOption) => {
  if (validate.value.includes(option.value)) return;
  isShowListItem.value = false;
  emits("change", option);
};

const handleToggleList = (e: any) => {
  if (disabled?.value) return;
  const isOption = e.target?.attributes?.option;
  if (isOption) return;
  isShowListItem.value = true;
};

const handleChange = (e: any) => {
  const value = e.target.value;
  if (value === "") {
    keySearch.value = "";
  }
  keySearch.value = value;
};
</script>

<template>
  <div class="autocomplete" @click="handleToggleList">
    <input
      :value="currentValue"
      :readonly="disabled"
      class="autocomplete__select"
      @input="handleChange"
    />
    <img
      v-if="!isShowListItem"
      class="autocomplete__icon"
      src="../../assets/icons/arrow-down.svg"
    />
    <img
      v-else
      class="autocomplete__icon"
      src="../../assets/icons/arrow-up.svg"
    />
    <div
      v-if="isShowListItem && mapOptionsByKey.length"
      class="autocomplete__list"
    >
      <div
        v-for="(option, index) in mapOptionsByKey"
        :key="index"
        :class="[
          'autocomplete__list__option',
          { disable: validate.includes(option.value) },
        ]"
        option="option-item"
        @click="handleChangeOption(option)"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.autocomplete {
  position: relative;
  width: 80%;

  &__select {
    width: -webkit-fill-available;
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    outline: none;
    border-radius: 5px;
    border: 1px solid $color-border;
  }

  &__icon {
    position: absolute;
    width: 0.75rem;
    height: 0.75rem;
    z-index: 1;
    right: 0;
    top: 50%;
    transform: translate(-100%, -50%);
    cursor: pointer;
  }

  &__list {
    background-color: $text-light;
    border: 1px solid $color-border;
    position: absolute;
    width: 100%;
    z-index: 2;
    outline: none;
    max-height: 10rem;
    overflow: auto;
    border-radius: 5px;

    &__option {
      padding: 0.25rem;

      &:hover {
        background-color: rgba($text-dark, 0.05);
      }

      &.disable {
        cursor: no-drop;
        background-color: $color-border;
        color: $text-light;

        &:hover {
          background-color: $color-border;
        }
      }
    }
  }
}
</style>
