// Class definition

var KTFlatpickr = function () {
    // Private functions
    var baseDemos = function () {
        // date picker
        $('.kt_datepicker').flatpickr({
            dateFormat: "Y-m-d"
        });
    }

    return {
        // Public functions
        init: function () {
            baseDemos();
        }
    };
}();

jQuery(document).ready(function () {
    KTFlatpickr.init();
});