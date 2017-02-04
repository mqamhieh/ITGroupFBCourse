/**
 * Created by Mohamed on 11/26/2016.
 */

$(document).ready(function () {
    shoppingCart.updateCartCount();

    window.onContactUsSubmit = function (event) {
        var form = $(event.target);
        var message = form.find("[name='message']").val();

        if (!message) {
            var isConfirmed = confirm("Are you sure you want to send without a message?");
            return isConfirmed;
        }
        return true;
    };

    $(".accordion").attr("tabindex", "0");
    $(".accordion").on("keydown", function (e) {
        switch (e.keyCode) {
            case 13: // Enter
                openAccordion($(this));
                break;
            case 27: // Esc
                closeAccordion($(this));
                break;
            case 40: // Down Arrow
                closeAccordion($(this));
                openAccordion($(this).next(".accordion"));
                event.stopPropagation();
                event.preventDefault();
                break;
            case 38: // Up Arrow
                closeAccordion($(this));
                openAccordion($(this).prev(".accordion"));
                event.stopPropagation();
                event.preventDefault();
                break;
        }

    });

    $.get("products.json", function (products) {
        var html = nunjucks.render(
            "templates/products.html",
            { 'products': products }
        );

        $("#products_search_list").html(html);

        $(".product.double").off("mousemove").on("mousemove", function () {
            var $self = $(this);
            var $content = $self.find(".product_content");

            if (!$self.data("isAnimating")) {
                $content.addClass("flipped");

                setTimeout(function() {
                    $content.find(".card_front").addClass("hidden");
                    $content.find(".card_back").removeClass("hidden");
                    $content.removeClass("flipped");
                }, 200);
            }

            $self.data("isAnimating", true);
            $self.data("canClose", false);
        });

        $(".product.double").off("mousemove").on("mouseout", function () {
            var $self = $(this);
            var $content = $self.find(".product_content");

            $self.data("canClose", true);

            setTimeout(function () {
                if ($self.data("canClose")) {
                    setTimeout(function () {
                        $content.addClass("flipped");

                        setTimeout(function() {
                            $content.find(".card_front").removeClass("hidden");
                            $content.find(".card_back").addClass("hidden");
                            $content.removeClass("flipped");
                            setTimeout(function () {
                                $self.data("isAnimating", false);
                            }, 200);
                        }, 200);
                    }, 100);
                }
            }, 200);
        });
    });

    $(".slider").slick({
        dots: true,
        prevArrow: '<i class="fa fa-chevron-left arrow-left"></i>',
        nextArrow: '<i class="fa fa-chevron-right arrow-right"></i>'
    });

    $(".customers-list ul").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $(".best-seller-section .search-items").slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    var checkboxInputHandler = function () {
        if ($(this).is(":checked")) {
            $(this).parents(".checkbox").addClass("checked");
        }
        else {
            $(this).parents(".checkbox").removeClass("checked");
        }
    };

    $("[type='checkbox']").on('change', checkboxInputHandler);

    var radioInputHandler = function () {
        var fieldName = $(this).attr('name');

        $("[type='radio'][name='" + fieldName + "']")
            .parents(".radio_input.selected")
            .removeClass("selected");

        $(this)
            .parents(".radio_input")
            .addClass("selected");
    };

    $("[type='radio']").on('change', radioInputHandler);

    radioInputHandler.apply($("[type='radio']:checked"));
    checkboxInputHandler.apply($("[type='checkbox']:checked"));

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
        accordion.addClass("open")
        accordion.focus();
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