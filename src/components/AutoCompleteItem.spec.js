import AutoCompleteItem from "./AutoCompleteItem.vue";
import { mount } from "@vue/test-utils";

describe("AutoCompleteItem.vue", () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, {
      NODE_ICU_DATA: "node_modules/full-icu",
    });
  });
  const wrapperAutoCompleteItem = mount(AutoCompleteItem, {
    props: {
      isLastItem: false,
      valueItemInGroup: [],
      disabled: false,
      option: {},
    },
  });

  it("test add and remove autocomplete item", async () => {
    await wrapperAutoCompleteItem.setProps({ isLastItem: true });
    const buttonAdd = wrapperAutoCompleteItem.find(".btn-add");
    await buttonAdd.trigger("click");
    wrapperAutoCompleteItem.vm.$emit("addItem");

    expect(wrapperAutoCompleteItem.emitted().addItem).toBeTruthy();
    expect(wrapperAutoCompleteItem.emitted().addItem).toHaveLength(1);
    expect(wrapperAutoCompleteItem.emitted().addItem[0]).toEqual([]);

    await wrapperAutoCompleteItem.setProps({ isLastItem: false });
    const buttonRemove = wrapperAutoCompleteItem.find(".btn-remove");
    await buttonRemove.trigger("click");

    expect(wrapperAutoCompleteItem.emitted().removeItem).toBeTruthy();
  });

  it("test change option", async () => {
    wrapperAutoCompleteItem.vm.handleChangeOption();
    expect(wrapperAutoCompleteItem.emitted().changeOption).toBeTruthy();
    expect(wrapperAutoCompleteItem.emitted().changeOption).toHaveLength(1);
    expect(wrapperAutoCompleteItem.emitted().changeOption[0]).toEqual([]);
  });
});
