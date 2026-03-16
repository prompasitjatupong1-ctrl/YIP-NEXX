function donutChartLabelTemplate(context) {
    //return context.category + "\n" + numberWithCommas(context.value) + " - (" + round(context.percentage * 100, 1) + "%)";
    //return context.category + " - " + round(context.percentage * 100, 1) + "%";
    return round(context.percentage * 100, 1) + "%";
}

// From https://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
