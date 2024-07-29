import { walk } from "vue/compiler-sfc";
import App from "./App.vue";
import { mount } from "@vue/test-utils";

describe("Button.vue", () => {
  const wrapperApp = mount(App, {});

  it("test add and remove group", async () => {
    expect(wrapperApp.vm.sortListGroup.length).toBe(1);
    expect(wrapperApp.vm.sortListGroup[0].id).toBe(0);

    const buttonAdd = wrapperApp.find(".btn-add-group");

    await buttonAdd.trigger("click");
    await buttonAdd.trigger("click");

    const numberItemDisplayAfterAdd = wrapperApp.findAll(".group-item").length;

    expect(wrapperApp.vm.sortListGroup.length).toBe(3);
    expect(wrapperApp.vm.sortListGroup[2].id).toBe(2);
    expect(numberItemDisplayAfterAdd).toBe(3);

    const groupItem = { id: 2, name: "group 2", index: 2, selections: [] };

    await wrapperApp.vm.handleRemoveGroup(groupItem);
    const numberItemDisplayAfterRemove =
      wrapperApp.findAll(".group-item").length;

    const idInGroupList = wrapperApp.vm.sortListGroup.map((item) => item.id);

    expect(wrapperApp.vm.sortListGroup.length).toBe(2);
    expect(numberItemDisplayAfterRemove).toBe(2);
    expect(idInGroupList.includes(2)).toBe(false);
  });

  it("test move down group", async () => {
    const buttonAdd = wrapperApp.find(".btn-add-group");
    await buttonAdd.trigger("click");

    const numberItemDisplayAfterAdd = wrapperApp.findAll(".group-item").length;
    expect(numberItemDisplayAfterAdd).toBe(3);

    const allGroupList = wrapperApp.findAll(".group-item__move");
    await allGroupList[0].trigger("click");
    await wrapperApp.vm.handleMoveDownGroup(0);
    await wrapperApp.vm.$nextTick();

    const groupId1 = wrapperApp.vm.sortListGroup.find((item) => item.id === 0);
    expect(groupId1.index).toBe(1);
  });

  it("test move up group", async () => {
    const buttonAdd = wrapperApp.find(".btn-add-group");
    await buttonAdd.trigger("click");

    const numberItemDisplayAfterAdd = wrapperApp.findAll(".group-item").length;
    expect(numberItemDisplayAfterAdd).toBe(4);

    const allGroupList = wrapperApp.findAll(".group-item__move");
    await allGroupList[3].trigger("click");
    await wrapperApp.vm.handleMoveUpGroup(3);
    await wrapperApp.vm.$nextTick();

    const groupId1 = wrapperApp.vm.sortListGroup.find((item) => item.id === 3);
    expect(groupId1.index).toBe(3);
  });
});
