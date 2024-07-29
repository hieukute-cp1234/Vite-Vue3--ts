import GroupItem from "./GroupItem.vue";
import { mount } from "@vue/test-utils";

describe("Button.vue", () => {
  const wrapperGroupItem = mount(GroupItem, {
    props: { position: { last: true, first: true }, selections: [] },
  });

  it("test move up group", async () => {
    await wrapperGroupItem.setProps({ position: { last: true, first: false } });
    const buttonUp = wrapperGroupItem.find(".group-item__move button");
    await buttonUp.trigger("click");
    expect(wrapperGroupItem.emitted().moveUp).toBeTruthy();
    expect(wrapperGroupItem.emitted().moveUp).toHaveLength(1);
  });

  it("test move down group", async () => {
    await wrapperGroupItem.setProps({ position: { last: false, first: true } });
    const buttonUp = wrapperGroupItem.find(".group-item__move button");
    await buttonUp.trigger("click");
    expect(wrapperGroupItem.emitted().moveDown).toBeTruthy();
    expect(wrapperGroupItem.emitted().moveDown).toHaveLength(1);
  });

  it("test remove group", async () => {
    const buttonRemote = wrapperGroupItem.find(".btn-remove-group");
    await buttonRemote.trigger("click");

    const modal = wrapperGroupItem.find(".overlay");

    expect(modal.text()).toContain(
      "Are you sure you want to delete this group",
    );

    const buttonSubmit = modal.find(".btn-submit");
    await buttonSubmit.trigger("click");

    expect(wrapperGroupItem.emitted().removeGroup).toBeTruthy();
    expect(wrapperGroupItem.emitted().removeGroup).toHaveLength(1);
  });

  it("test emit remove selections", async () => {
    await wrapperGroupItem.vm.handleRemoveSelection();

    expect(wrapperGroupItem.emitted()["remove:selections"]).toBeTruthy();
    expect(wrapperGroupItem.emitted()["remove:selections"]).toHaveLength(1);

    const listSelection = wrapperGroupItem.find(".group-item__selection");
    expect(listSelection.text()).toContain("+");
  });

  it("test emit add selections", async () => {
    await wrapperGroupItem.vm.handleAddSelection();

    expect(wrapperGroupItem.emitted()["add:selections"]).toBeTruthy();
    expect(wrapperGroupItem.emitted()["add:selections"]).toHaveLength(1);

    await wrapperGroupItem.setProps({
      selections: [{ id: 1, value: 1, text: "item 1" }],
    });

    const listSelection = wrapperGroupItem.find(".group-item__selection");
    expect(listSelection.html()).toContain(
      '<input class="autocomplete__select" value="option 1">',
    );
  });

  it("test emit change selections", async () => {
    await wrapperGroupItem.setProps({
      selections: [{ id: 1, value: 1, text: "item 1" }],
    });

    const listSelection = wrapperGroupItem.find(".group-item__selection");
    expect(listSelection.html()).toContain(
      '<input class="autocomplete__select" value="option 1">',
    );
    await wrapperGroupItem.vm.handleChangeOption();

    expect(wrapperGroupItem.emitted()["change:selections"]).toBeTruthy();
    expect(wrapperGroupItem.emitted()["change:selections"]).toHaveLength(1);

    await wrapperGroupItem.setProps({
      selections: [{ id: 1, value: 3, text: "item 1" }],
    });

    const afterUpdate = wrapperGroupItem.find(".group-item__selection");
    expect(afterUpdate.html()).toContain(
      '<input class="autocomplete__select" value="option 3">',
    );
  });
});
