import Modal from "./Modal.vue";
import { mount } from "@vue/test-utils";

describe("Modal.vue", () => {
  const wrapperModal = mount(Modal, {
    props: { isClose: true, classCustom: "custom-modal" },
    slots: {
      default: "Can you sure?",
    },
  });

  it("test button close in modal", () => {
    expect(wrapperModal.text()).toContain("x");
  });

  it("test class custom in modal", () => {
    expect(wrapperModal.find(".modal").classes()).toContain("custom-modal");
  });

  it("test user click button cancel in modal", async () => {
    await wrapperModal.setProps({ isClose: false });
    const buttonSubmit = wrapperModal.find(".btn-cancel");
    await buttonSubmit.trigger("click");
    expect(wrapperModal.emitted().close).toBeTruthy();
  });

  it("test user click button submit in modal", async () => {
    const buttonSubmit = wrapperModal.find(".btn-submit");
    await buttonSubmit.trigger("click");
    expect(wrapperModal.emitted().submit).toBeTruthy();
  });

  it("test slot in modal", () => {
    expect(wrapperModal.text()).toContain("Can you");
  });
});
