import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emmiter = options.emmiter;
    this.unsubscribers = [];
    // Универсальный метод подготовки до реализации шаблона
    this.prepare();
  }

  // Достраиваем компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emmiter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emmiter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  // Инициализируем компонент
  // Добавляем слушателей
  init() {
    this.initDOMListeners();
  }

  // Удаляем компонент
  // Удаляем слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}