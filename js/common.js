$(function () {
   $('.header-menu-item--more').click(function () {
      $(this).toggleClass('header-menu-item--more-active')
   });
});

$('.header-button, .header-menu__button, .promo-item__order-button, .mortgage__callback-button, .sales-offices__callback-button, .header__phone-icon').click(function () {
    $('.callback-popup')
        .addClass('callback-popup--visible')
        .fadeIn(200);
    $('.under-layer').addClass('under-layer--visible');
    callbackPopupMobile();
})

$('.callback-popup .close, .callback-popup-close-mobile').click(function () {
    $('.callback-popup')
        .removeClass('callback-popup--visible')
        .fadeOut(200, function () {
            $('.callback-popup .callback-popup__content').css({
                'display' : 'block'
            });
            $('.callback-popup .thanks').css({
                'display' : 'none'
            });
        });
    callbackPopupMobile();
    $('.under-layer').removeClass('under-layer--visible');

});

$('.callback-popup__button').click(function () {
    $('.callback-popup .callback-popup__content').slideUp();
    $('.callback-popup .thanks').slideDown();
});

// скролл при нажатии на якорную ссылку с учетом высоты шапки

function anchorA(config){
    var regex = /#([^\/#]+)$/;
    if(regex.test(config.href)){
        if(config.event) {
            config.event.preventDefault();
        }
        var href = config.href;
        var hash = href.match(regex);

        if(hash != null){
            var id = hash[0];
            var missing_element = $(id);
            if(missing_element.length > 0) {
                var missing_element_top_position = missing_element.offset().top;
                var header_height = $('.header').outerHeight();
                var final_scroll_position = missing_element_top_position - header_height;

                $('html, body').animate({
                    scrollTop: final_scroll_position
                }, 200);
            }
        }
    }
}

$(document).on('click', 'a', function(event){
    anchorA({
        href: $(this).attr('href'),
        event: event
    });
})
window.onload = function(){
    anchorA({
        href: document.URL
    });
}

// плавный слайдинг доп. контента в ипотеке

function mortgageHide() {
    if ( !$(".mortgage-order-list-mobile").hasClass( "mortgage-order-list-mobile--with-opened-items" ) && $(window).width() <= 999) {
        $(".mortgage-order-list-mobile__item").each(function () {
            if ( $(this).is( ":hidden" ) ) {
                $(this).addClass('mortgage-order-list-mobile__item--hidden');
            } else {
                $(this).removeClass('mortgage-order-list-mobile__item--hidden');
            }
        });
    }
}

$(window).resize(mortgageHide);
mortgageHide();

$('.mortgage-order-list-mobile__more-button').click(function () {
    if ( !$(".mortgage-order-list-mobile").hasClass( "mortgage-order-list-mobile--with-opened-items" ) ) {
        $(".mortgage-order-list-mobile").addClass( "mortgage-order-list-mobile--with-opened-items" )
        $(".mortgage-order-list-mobile__item").show( "slow" );
        $('.mortgage-order-list-mobile__more-button-content').text('Скрыть');
    } else {
        $(".mortgage-order-list-mobile").removeClass( "mortgage-order-list-mobile--with-opened-items" )
        $(".mortgage-order-list-mobile__item--hidden").slideUp();
        $('.mortgage-order-list-mobile__more-button-content').text('Показать еще');
    }
});

function aboutBlockDescrHiding() {
    if($(window).width() <=999) {
        $('.about-block--hidden .about-block__description').css('display', 'none');
    } else{
        $('.about-block--hidden .about-block__description').css('display', 'block');
    }
}

$(document).ready(aboutBlockDescrHiding);
$(window).resize(aboutBlockDescrHiding);

$('.about-block h3').click(function () {
    if($(window).width() <=999) {
        var $parent = $(this).parent('.about-block');
        var $description = $parent.find('.about-block__description');
        $parent.toggleClass('about-block--hidden');
        $description.slideToggle();
    }
});

// появление поп-апа "Стадия строительства"

$(document).on('mouseover', '.promo-item-progress__bar, .promo-item-progress__hint span', function() {
    $(this).closest('.promo-item-progress').find('.promo-item-progress__popup-hint').addClass('promo-item-progress__popup-hint--visible');
});
$(document).on('mouseleave', '.promo-item-progress__bar, .promo-item-progress__hint span', function() {
    $(this).closest('.promo-item-progress').find('.promo-item-progress__popup-hint').removeClass('promo-item-progress__popup-hint--visible');
});

function callbackPopupMobile() {
    if($(window).width() <= 999 && $('.callback-popup').hasClass('callback-popup--visible')) {
        $('body').addClass('body--mobile-popup-visible');
        $('body').removeClass('body--header-menu-visible');
    } else {
        $('body').removeClass('body--mobile-popup-visible');
    }
}

$(document).ready(callbackPopupMobile);
$(window).resize(callbackPopupMobile);

$(function () {
    $('.privacy-policy-link').click(function (e) {
        if($(window).width() <= 999) {
            e.preventDefault();
            $('body').addClass('body--privacy-policy-visible');
            $('body').animate({
                'scrollTop' : 0
            });
        }
    });
    $('.privacy-policy__close').click(function (e) {
        $('body').removeClass('body--privacy-policy-visible');
    });
});
$(function () {
    $('.header__sandwich-icon').click(function (e) {
        $('body').addClass('body--header-menu-visible');
    });
});
$(function () {
    $('.header-menu-close-mobile').click(function () {
        $('body').removeClass('body--header-menu-visible');
    });
});

$(document).on('mouseover', '.promo-item-image-checker__item', function () {
    $(this).parent('.promo-item-image-checker').find('.promo-item-image-checker__item').removeClass('promo-item-image-checker__item--active');
    $(this).addClass('promo-item-image-checker__item--active');
    var image = $(this).attr('data-src');
    $(this).closest('.promo-item-image').css({
        'background-image': 'url(' + image + ')'
    })
})
