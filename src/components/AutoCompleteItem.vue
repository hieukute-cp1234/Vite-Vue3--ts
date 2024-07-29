<script setup lang="ts">
import { ref } from "vue";
import Autocomplete from "./common/AutoComplete.vue";
import ButtonCommon from "./common/Button.vue";
import { IOption, IDataItem } from "../interfaces";
import { dataOption } from "../constants";

export interface ISelectItemProps {
  isLastItem?: boolean;
  valueItemInGroup: number[];
  disabled?: boolean;
  option?: IOption | {};
}

interface ISelectItemEmits {
  (e: "addItem", data: IDataItem | null): void;
  (e: "removeItem"): void;
  (e: "changeOption", option: IOption): void;
}

const { isLastItem } = defineProps<ISelectItemProps>();
const emits = defineEmits<ISelectItemEmits>();

const dataItem = ref<IDataItem | null>(null);

const handleAddOrRemoveSelection = () => {
  if (isLastItem) {
    emits("addItem", dataItem.value);
    return;
  }

  emits("removeItem");
};

const handleChangeOption = (option: IOption) => {
  dataItem.value = { ...option };
  emits("changeOption", option);
};
</script>

<template>
  <div class="select-item">
    <Autocomplete
      :disabled="disabled"
      :validate="valueItemInGroup"
      :options="dataOption"
      :dataOption="option"
      @change="handleChangeOption"
    />
    <ButtonCommon
      :class="{ 'btn-add': isLastItem, 'btn-remove': !isLastItem }"
      :text="isLastItem ? '+' : '-'"
      @click="handleAddOrRemoveSelection"
    />
  </div>
</template>

<style lang="scss" scoped>
.select-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
</style>
