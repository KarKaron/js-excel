import { $ } from "@core/dom";

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target),
      $parent = $resizer.parent(`[data-type="resize"]`),
      cords = $parent.getCords(),
      type = $resizer.data.resize,
      sideProp = type === "row" ? "bottom" : "right",
      sideProp1 = type === "col" ? "bottom" : "right";
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: "-5000px",
      [sideProp1]: "-5000px",
    });

    document.onmousemove = (e) => {
      if (type === "col") {
        const delta = e.pageX - cords.right;
        value = cords.width + delta;
        $resizer.css({ right: -delta + "px" });
      } else {
        const delta = e.pageY - cords.bottom;
        value = cords.height + delta;
        $resizer.css({ bottom: -delta + "px" });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === "col") {
        $parent.css({ width: value + "px" });
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((el) => (el.style.width = value + "px"));
      } else {
        $parent.css({ height: value + "px" });
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      });

      $resizer.css({
        opacity: 0,
        [sideProp]: 0,
        [sideProp1]: 0,
      });
    };
  });
}
