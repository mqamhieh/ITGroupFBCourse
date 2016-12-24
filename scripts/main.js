/**
 * Created by Mohamed on 11/26/2016.
 */
$(document).ready(function () {
    $(".slider").slick({
        dots: true,
        prevArrow: '<i class="fa fa-chevron-left arrow-left"></i>',
        nextArrow: '<i class="fa fa-chevron-right arrow-right"></i>'
    });

    $("[type='checkbox']").on('change', function () {
        if ($(this).is(":checked")) {
            $(this).parents(".checkbox").addClass("checked");
        }
        else {
            $(this).parents(".checkbox").removeClass("checked");
        }
    });
});