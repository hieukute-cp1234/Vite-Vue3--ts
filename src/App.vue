<script setup lang="ts">
import { ref, computed } from "vue";
import { IDataItem } from "./interfaces";
import Layout from "./layouts/Layout.vue";
import GroupItem from "./components/GroupItem.vue";
import ButtonCommom from "./components/common/Button.vue";
import "./assets/scss/global.scss";

interface IGroupItem {
  id: number;
  name: string;
  index: number;
  selections: IDataItem[];
}

const idGroup = ref<number>(0);
const groupList = ref<IGroupItem[]>([
  {
    id: idGroup.value,
    name: `Group ${idGroup.value}`,
    index: idGroup.value,
    selections: [],
  },
]);

const sortListGroup = computed(() => {
  return groupList.value.sort((a, b) => a.index - b.index);
});

const handleAddGroup = () => {
  const newId = (idGroup.value = idGroup.value + 1);
  const newGroup: IGroupItem = {
    id: newId,
    name: `Group ${newId}`,
    index: newId,
    selections: [],
  };
  groupList.value.push(newGroup);
  groupList.value = groupList.value.map((group, index) => ({
    ...group,
    index,
  }));
};

const handleRemoveGroup = (group: IGroupItem) => {
  groupList.value = groupList.value
    .filter((item) => item.index !== group.index)
    .map((item, index) => ({
      ...item,
      index,
    }));
};

const handleMoveUpGroup = (index: number) => {
  groupList.value = groupList.value.map((item) => {
    if (item.index === index - 1)
      return {
        ...item,
        index,
      };

    if (item.index === index)
      return {
        ...item,
        index: index - 1,
      };

    return item;
  });
};

const handleMoveDownGroup = (index: number) => {
  groupList.value = groupList.value.map((item) => {
    if (item.index === index)
      return {
        ...item,
        index: index + 1,
      };

    if (item.index === index + 1)
      return {
        ...item,
        index: index,
      };

    return item;
  });
};
</script>

<template>
  <Layout>
    <template #content>
      <div class="content">
        <div class="group-list">
          <GroupItem
            v-for="(group, index) in sortListGroup"
            :selections="group.selections"
            :key="index"
            :position="{
              first: index === 0,
              last: index === sortListGroup.length - 1,
            }"
            @removeGroup="() => handleRemoveGroup(group)"
            @moveUp="() => handleMoveUpGroup(index)"
            @moveDown="() => handleMoveDownGroup(index)"
            @add:selections="(selection) => group.selections.push(selection)"
            @remove:selections="
              (selection) =>
                (group.selections = group.selections.filter(
                  (item) => item.id !== selection.id,
                ))
            "
            @change:selections="
              (selection, option) => {
                group.selections = group.selections.map((item) => {
                  if (selection.id === item.id) {
                    return { ...item, value: option?.value || 0 };
                  }
                  return item;
                });
              }
            "
          />
        </div>
        <ButtonCommom
          class="btn-add-group"
          text="+ Add Group"
          @click="handleAddGroup"
        ></ButtonCommom>
      </div>
    </template>
  </Layout>
</template>

<style lang="scss" scoped>
.content {
  padding: 1rem;
}
</style>
