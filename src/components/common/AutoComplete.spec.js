import AutoComplete from "./AutoComplete.vue";
import { mount } from "@vue/test-utils";
import { dataOption } from "../../constants";

describe("AutoComplete.vue", () => {
  const wrapperAutoComplete = mount(AutoComplete, {
    props: {
      options: [],
      validate: [],
      disabled: false,
      dataOption: {},
    },
  });

  it("test show list option", async () => {
    await wrapperAutoComplete.setProps({
      options: [
        {
          id: 0,
          value: 0,
          text: "none",
          disabled: false,
        },
        {
          id: 1,
          value: 1,
          text: "this is option",
          disabled: false,
        },
      ],
      disabled: true,
    });

    const autocomplete = wrapperAutoComplete.find(".autocomplete");
    await autocomplete.trigger("click");
    wrapperAutoComplete.vm.handleToggleList();

    expect(wrapperAutoComplete.vm.mapOptionsByKey[1].text).toBe(
      "this is option",
    );
  });

  it("test change option", async () => {
    await wrapperAutoComplete.setProps({
      options: dataOption,
      disabled: true,
    });

    wrapperAutoComplete.vm.handleChangeOption();

    expect(wrapperAutoComplete.emitted().change).toBeTruthy();
  });

  it("test change option", async () => {
    await wrapperAutoComplete.setProps({
      options: dataOption,
    });

    const input = wrapperAutoComplete.find(".autocomplete__select");
    input.element.value = "option 1";
    await input.trigger("click");
    const options = wrapperAutoComplete.vm.mapOptionsByKey.map(
      (item) => item.text,
    );
    await wrapperAutoComplete.vm.handleChange();
    const isValue = options.includes("option 1");

    expect(isValue).toBe(true);
  });
});
