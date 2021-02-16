import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@/core/dom';
import {TableSelection} from '@/components/table/TableSelection';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, isCell, matrix} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(30);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const cell = this.$root.find('[data-id="0:0"]')
    this.selection.select(cell);
  }

  // onClick() {
  //   console.log('click')
  // }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) { // event.ctrlKey и т.д.
        const target = $target.id(true),
          current = this.selection.current.id(true),
          $cells = matrix(target, current)
              .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  // onMousemove() {
  //   console.log('onmousemove')
  // }

  // onMouseup() {
  //   console.log('onmouseup')
  // }
}