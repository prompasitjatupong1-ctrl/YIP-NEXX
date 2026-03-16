// Class definition
var KTSelect2 = function () {
    // Private functions
    var demos = function () {
        // Format options
        var optionFormat = function (item) {
            if (!item.id) {
                return item.text;
            }

            var span = document.createElement('span');
            var imgUrl = item.element.getAttribute('data-kt-select2-icon');
            var template = '';

            /*template += '<img src="' + imgUrl + '" class="rounded-circle h-20px me-2" alt="image"/>';*/
            template += '<i class="ki-duotone ki-' + imgUrl + ' fs-1 text-dark me-2"><i class="path1"></i><i class="path2"></i><i class="path3"></i><i class="path4"></i><i class="path5"></i><i class="path6"></i></i>';

            template += item.text;

            span.innerHTML = template;

            return $(span);
        }

        // Init Select2 --- more info: https://select2.org/
        $('.kt_select2_icon_create').select2({
            templateSelection: optionFormat,
            templateResult: optionFormat,
            dropdownParent: $('#PopupModalCreate')
        }).on('select2:select', function (e) {
            // Call dispatchEvent from common.js
            mutateDOM(this, this.value);
        });

        // Init Select2 --- more info: https://select2.org/
        $('.kt_select2_icon_edit').select2({
            templateSelection: optionFormat,
            templateResult: optionFormat,
            dropdownParent: $('#PopupModalEdit')
        }).on('select2:select', function (e) {
            // Call dispatchEvent from common.js
            mutateDOM(this, this.value);
        });

        // Init Select2 --- more info: https://select2.org/
        $('.kt_select2').select2().on('select2:select', function (e) {
            // Call dispatchEvent from common.js
            mutateDOM(this, this.value);
        });
    }

    // Public functions
    return {
        init: function () {
            demos();
        }
    };
}();

// Initialization
$(function () {
    KTSelect2.init();
});
