var LastElementDOM;
var LastValueDOM;

function mutateDOM(ElementDOM, value) {
    if (LastElementDOM == ElementDOM && LastValueDOM == value)
        return false;

    LastElementDOM = ElementDOM;
    LastValueDOM = value;

    var event = new Event('change');
    ElementDOM.dispatchEvent(event);
}

function selectChange(_this) {
    mutateDOM(_this, _this.value);
}