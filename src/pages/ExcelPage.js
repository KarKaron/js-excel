import { Page } from "@core/Page";
import { createStore } from "@core/createStore";
import { storage, debounce } from "@core/utils";
import { normalizeState } from "@/redux/initialState";
import { rootReducer } from "@/redux/rootReduсer";
import { Excel } from "@/components/excel/Excel";
import { Header } from "@/components/header/Header";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { Formula } from "@/components/formula/Formula";
import { Table } from "@/components/table/Table";

function storageName(param) {
  return `excel:${param}`;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString(),
      state = storage(storageName(params)),
      store = createStore(rootReducer, normalizeState(state)),
      stateListener = debounce(state => {
        storage(storageName(params), state);
      }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
