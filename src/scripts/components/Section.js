export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(elements) {
        elements.forEach(this._renderer)
    }
    addItemFromArray(element) {
        this._container.append(element)
    }
    addNewItem(element) {
        this._container.prepend(element)
    }
}