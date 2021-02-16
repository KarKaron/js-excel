import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@/core/dom';
import {TableSelection} from '@/components/table/TableSelection';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {
  shouldResize, 
  isCell, 
  matrix, 
  nextSelector
} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown']
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

  onKeydown(event) {
    const keys = [
        'Enter',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown'
      ],
      {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true),
        $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next)
    }
  }
}