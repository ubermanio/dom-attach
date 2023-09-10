export class Controller {
  constructor(public element: HTMLElement) {
    //   console.log(this.constructor.name, 'registered to', this.element)
    (this.element as HTMLElement & { [name: string]: Controller })[
      this.constructor.name
    ] = this;
    this.connect();
  }

  connect() {}

  destroy() {}

  /**
   * Query the element for a selector
   * @param selector the query selector
   * @returns
   */
  query(selector: string) {
    return this.element.querySelector(selector);
  }

  /**
   * Query the element for a selector
   * @param selector the query selector
   * @returns
   */
  queryAll(selector: string) {
    return this.element.querySelectorAll(selector);
  }

  /**
   * Add an event listener to the element
   * @param event
   * @param callback
   */
  on(event: string, callback: EventListener) {
    this.element.addEventListener(event, callback);
  }

  /**
   * Remove an event listener from the element
   * @param event
   * @param callback
   */
  off(event: string, callback: EventListener) {
    this.element.removeEventListener(event, callback);
  }

  /**
   * Dispatch an event from the element
   * @param event
   * @param detail
   */
  dispatch(event: string, detail: any) {
    this.element.dispatchEvent(new CustomEvent(event, { detail }));
  }
}
