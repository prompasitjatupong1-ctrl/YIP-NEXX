// Class definition
var KTAllScript = function () {
    var tippytooltips = function () {
        // tippy-tooltip พร้อม option
        tippy('[data-tippy-content]', {
            placement: 'top',          // top | bottom | left | right
            theme: 'light-border',     // ต้องมี css theme ที่โหลดไว้
            allowHTML: true,           // อนุญาตให้ tooltip แสดง html ได้
            animation: 'shift-away',   // (optional) เอฟเฟกต์ตอนแสดง
            delay: [120, 0],           // หน่วงเวลา 0.12 วินาทีก่อนแสดง
            touch: ['hold', 500],      // รองรับ mobile
        });
    }

    var sortable = function () {
        $('.sortable').each(function () {
            var $this = $(this);
            $this.append($this.find('.score').get().sort(function (a, b) {
                return $(a).data('index') - $(b).data('index');
            }));
        });
    }

    // Public functions
    return {
        init: function () {
            tippytooltips();
            sortable();
        }
    };
}();

// Initialization
$(function () {
    KTAllScript.init();
});
