function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `;
  return `
    <div 
      class="button${button.active ? " active" : ""}"
      ${meta}
    >
      <i 
        class="material-icons"
        ${meta}
      >${button.icon}</i>
    </div>
  `;
}

export function createToolbar(st) {
  const buttons = [
    {
      icon: "format_align_left",
      active: st["textAlign"] === "left",
      value: { textAlign: "left" },
    },
    {
      icon: "format_align_center",
      active: st["textAlign"] === "center",
      value: { textAlign: "center" },
    },
    {
      icon: "format_align_right",
      active: st["textAlign"] === "right",
      value: { textAlign: "right" },
    },
    {
      icon: "format_bold",
      active: st["fontWeight"] === "bold",
      value: {
        fontWeight: st["fontWeight"] === "bold" ? "normal" : "bold"
      },
    },
    {
      icon: "format_italic",
      active: st["fontStyle"] === "italic",
      value: {
        fontStyle: st["fontStyle"] === "italic" ? "normal" : "italic"
      },
    },
    {
      icon: "format_underlined",
      active: st["textDecoration"] === "underline",
      value: {
        textDecoration: st["textDecoration"] === "underline" 
        ? "none" 
        : "underline"
      },
    },
  ];
  return buttons.map(toButton).join("");
}
