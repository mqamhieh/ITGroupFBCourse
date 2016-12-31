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

    $("[type='radio']").on('change', function () {
        var fieldName = $(this).attr('name');

        $("[type='radio'][name='" + fieldName + "']")
            .parents(".radio_input.selected")
            .removeClass("selected");

        $(this)
            .parents(".radio_input")
            .addClass("selected");
    });

    $(".accordion .accordion-body").hide();

    $(".accordion .title").on("click", function () {
        var thisAccordion = $(this).parents(".accordion");
        var wasOpen = thisAccordion.hasClass('open');
        closeAccordion($(".accordion.open"));

        if (!wasOpen) {
            openAccordion(thisAccordion);
        }
    });

    var openAccordion = function(accordion) {
        accordion.addClass("open");
        accordion.find(".accordion-body").stop().slideDown(400);
    };

    var closeAccordion = function(accordion) {
        accordion.removeClass("open");
        accordion.find(".accordion-body").stop().slideUp(400);
    };
});

window.selectAllCheckbox = function (event) {
    $(event.target)
        .parents(".filters")
        .find("[type='checkbox']:not(:checked)")
        .click();
};