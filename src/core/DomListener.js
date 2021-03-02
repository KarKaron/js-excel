import { capitalize } from "@core/utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided in DomListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        const name = this.name || "";
        throw new Error(`
          Method ${method} is'nt implemented in ${name} Component
        `);
      }
      this[method] = this[method].bind(this);
      // Дублирование функционала addEventListener
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      // Дублирование функционала removeEventListener
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return "on" + capitalize(eventName);
}
