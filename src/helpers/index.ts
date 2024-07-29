export const handleResizeLayout = () => {
  try {
    const width = window.innerWidth;
    const html = document.getElementsByTagName("html")[0];
    if (width >= 1200) {
      html.style.removeProperty("font-size");
    } else if (width > 768) {
      html.style.fontSize = `${(width / 1200) * 16}px`;
    } else {
      html.style.fontSize = `${(width / 768) * 16}px`;
    }
  } catch (_error) {
    const html = document.getElementsByTagName("html")[0];
    html.style.removeProperty("font-size");
  }
};
