import ButtonCommon from "./Button.vue";
import { mount } from "@vue/test-utils";

describe("Button.vue", () => {
  const wrapperButton = mount(ButtonCommon, {
    props: { text: "Hello Jest", isIcon: true },
    slots: {
      icon: "<img src='../assets/icons/arrow-up.svg' />",
    },
  });

  it("test text in button", () => {
    expect(wrapperButton.text()).toContain("Hello Jest");
  });

  it("test icon in button", () => {
    expect(wrapperButton.classes()).toContain("btn-icon");
  });

  it("trigger user click button", async () => {
    wrapperButton.vm.$emit("click");
    await wrapperButton.trigger("click");
    await wrapperButton.vm.$nextTick();

    expect(wrapperButton.emitted().click).toBeTruthy();
  });

  it("test slot in button", () => {
    expect(wrapperButton.html()).toContain(
      '<img src="../assets/icons/arrow-up.svg">',
    );
  });
});
