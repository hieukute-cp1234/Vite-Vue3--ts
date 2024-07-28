<script setup lang="ts">
import { ref } from "vue";
import AutoCompleteItem from "./AutoCompleteItem.vue";
import ButtonCommon from "./common/Button.vue";
import Modal from "./common/Modal.vue";
import { STATUS, MOVE_TYPES } from "../constants";
import { IOption, IDataItem } from "../interfaces";

interface IGroupItemProps {
  position: { first: boolean; last: boolean };
  text: String;
  selections: IDataItem[];
}

interface IGroupItemEmits {
  (e: "removeGroup"): void;
  (e: "moveUp"): void;
  (e: "moveDown"): void;
  (e: "add:selections", selection: IDataItem): void;
  (e: "remove:selections", selection: IDataItem): void;
  (
    e: "change:selections",
    selection: IDataItem,
    oldSelection: IDataItem | null,
  ): void;
}

defineProps<IGroupItemProps>();

const isActive = ref<Boolean>(true);
const isShowModalConfirm = ref<boolean>(false);
const startId = ref<number>(0);

const handleAddSelection = () => {
  const newId = (startId.value = startId.value + 1);
  const newData = {
    id: newId,
    value: 0,
    text: `item ${newId}`,
  };
  emits("add:selections", newData);
};

const handleConfirmRemoveGroup = () => {
  isShowModalConfirm.value = true;
};

const handleRemoveSelection = (data: IDataItem) => {
  emits("remove:selections", data);
};

const emits = defineEmits<IGroupItemEmits>();

const toggleStatus = (type: string) => {
  if (type === STATUS.ACTIVE) {
    isActive.value = true;
    return;
  }
  isActive.value = false;
};

const handleMoveGroup = (_e: Event, key: String) => {
  if (key === MOVE_TYPES.UP) {
    emits("moveUp");
    return;
  }
  emits("moveDown");
};

const handleSubmitRemove = () => {
  emits("removeGroup");
  isShowModalConfirm.value = false;
};

const handleCancelModal = () => {
  isShowModalConfirm.value = false;
};

const handleChangeOption = (selection: any, option: IOption) => {
  if (option.value === 0) return;
  emits("change:selections", selection, option);
};
</script>

<template>
  <div class="group-item">
    <div class="group-item__move">
      <ButtonCommon
        v-if="!position.first"
        :isIcon="true"
        @click="(e) => handleMoveGroup(e, MOVE_TYPES.UP)"
      >
        <template #icon>
          <img src="../assets/icons/arrow-up.svg" />
        </template>
      </ButtonCommon>
      <ButtonCommon
        v-if="!position.last"
        :isIcon="true"
        @click="(e) => handleMoveGroup(e, MOVE_TYPES.DOWN)"
      >
        <template #icon>
          <img src="../assets/icons/arrow-down.svg" />
        </template>
      </ButtonCommon>
    </div>
    <div class="group-item__feature">
      <select :value="1">
        <option :value="1">Type1</option>
        <option :value="1">Type2</option>
      </select>
      <input />
      <div class="wrapper-actions">
        <div class="switch">
          <button
            :class="['switch__active', { selected: isActive }]"
            @click="toggleStatus(STATUS.ACTIVE)"
          >
            Active
          </button>
          <button
            :class="['switch__inactive', { selected: !isActive }]"
            @click="toggleStatus(STATUS.IN_ACTIVE)"
          >
            Inactive
          </button>
        </div>
        <ButtonCommon
          class="btn-remove-group"
          text="remove"
          @click="handleConfirmRemoveGroup"
        ></ButtonCommon>
      </div>
    </div>
    <div class="group-item__selection">
      <AutoCompleteItem
        v-for="(item, index) in selections"
        :valueItemInGroup="
          selections.map((item) => item.value).filter((item) => item)
        "
        :key="index"
        :option="item"
        @changeOption="(option) => handleChangeOption(item, option)"
        @removeItem="() => handleRemoveSelection(item)"
      />
      <AutoCompleteItem
        :valueItemInGroup="[]"
        :disabled="true"
        :isLastItem="true"
        :option="{}"
        @addItem="handleAddSelection"
      />
    </div>
  </div>
  <Modal
    v-if="isShowModalConfirm"
    @submit="handleSubmitRemove"
    @close="handleCancelModal"
  >
    <p>
      {{ "Are you sure you want to delete this group?\nIt cannot be undone!" }}
    </p>
  </Modal>
</template>

<style lang="scss" scoped>
@import "..//assets/scss/variables.scss";

.group-item {
  border: 1px solid $color-border;
  display: grid;
  grid-template-columns: 10% 25% 60%;

  &:not(:first-child) {
    border-top: none;
  }

  &__move {
    border-color: $color-border;
    border-width: 0 1px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid $color-border;

    > button:nth-child(2n) {
      margin-top: 1rem;
    }
  }

  &__feature {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border-right: 1px solid $color-border;

    > select {
      padding: 0.5rem 0.75rem;
      outline: none;
      margin-bottom: 0.5rem;
      border: 1px solid $color-border;
      border-radius: 5px;
    }

    > input {
      padding: 0.5rem 0.75rem;
      margin-bottom: 0.5rem;
    }
  }

  &__selection {
    padding: 0.5rem;
  }
}

.wrapper-actions {
  display: flex;
  justify-content: space-between;

  .switch {
    border: 1px solid $color-border;
    border-radius: 999px;
    display: flex;
    padding: 0.1rem;
    width: fit-content;

    & > * {
      cursor: pointer;
    }

    &__active {
      border-radius: 999px;
      border: none;
      padding: 0.25rem;
      min-width: 5rem;
      background-color: transparent;

      &.selected {
        background-color: $color-main;
        color: $text-light;
      }
    }

    &__inactive {
      border-radius: 999px;
      border: none;
      background-color: transparent;
      padding: 0.25rem;
      min-width: 6rem;

      &.selected {
        background-color: $color-border;
        color: $text-light;
      }
    }
  }
}
</style>
