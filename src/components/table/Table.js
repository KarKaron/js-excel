import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(30);
  }

  // onClick() {
  //   console.log('click')
  // }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }

  // onMousemove() {
  //   console.log('onmousemove')
  // }

  // onMouseup() {
  //   console.log('onmouseup')
  // }
}