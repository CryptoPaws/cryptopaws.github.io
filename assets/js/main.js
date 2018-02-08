/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

(function ($) {

    // Use this variable to set up the common and page specific functions. If you
    // rename this variable, you will also need to rename the namespace below.
    var Sage = {
        // All pages
        'common': {
            init    : function () {
                // JavaScript to be fired on all pages
                $('.faq-item p').readmore({
                    speed          : 350,
                    collapsedHeight: 50,
                    heightMargin   : 16,
                    moreLink       : '<a href="#" class="readmore"></a>',
                    lessLink       : '<a href="#" class="readless"></a>'
                });
            },
            finalize: function () {
                FastClick.attach(document.body);
                $.scrollUp({
                    scrollText : '<i class="fa fa-chevron-up"></i>', // Text for element, can contain HTML
                    scrollTitle: false
                });
                //var initAudio = function (w) {
                //    var player = new MediaElementPlayer('audio', {
                //        audioWidth: w
                //    });
                //    player.play();
                //};
                //var setupAudio = function (width) {
                //    if (width >= 1024) {
                //        initAudio(600);
                //    } else if (width >= 768) {
                //        initAudio(407);
                //    } else {
                //        initAudio(290);
                //    }
                //};
                //setupAudio($(window).width());
            }
        },
        // Home page
        'home'  : {
            finalize: function () {

                // SCROLL TO 60% SHOW MODAL
                var $webpage        = $('body'),
                    $webpage_height = $webpage.height(),
                    $trigger_height = $webpage_height * 0.6,// 60%
                    $subscribe_modal = $('#subscribe-modal');

                var checkPosition = function () {
                    if ($(window).scrollTop() > $trigger_height) {
                        var subscribe = getCookie('subscribe'),
                            open_subscribe_modal = sessionStorage.getItem('open_subscribe_modal');
                        if(!(subscribe || open_subscribe_modal || $subscribe_modal.hasClass('in'))){
                            $subscribe_modal.modal('show');
                        }
                    }
                };
                checkPosition();
                $(window).scroll(checkPosition);

                /**
                 * SET FLAG WHEN USER CLOSE MODAL
                 */
                $subscribe_modal.on('hidden.bs.modal', function (e) {
                    sessionStorage.setItem('open_subscribe_modal', true);
                });

                /**
                 * SUBSCRIBE (HOMEPAGE)
                 */
                $('#modal-subscribe-form').on('submit',function (e) {
                    e.preventDefault();
                    var $form = $(this),
                        $message = $('#subscribe-result');

                    $form.find('.btn').prop('disabled', true);
                    $.post(ajax_login_object.ajaxurl, $form.serialize())
                    .done(function(res){
                        if(undefined !== res.data.message){
                            $message.html(res.data.message);
                        }
                        if(res.success){
                            setCookie('subscribe', true, 365);
                            $message.attr('class', 'text-success').show();
                            setTimeout(function(){
                                $subscribe_modal.modal('hide');
                                $message.hide();
                            },5000); // 3 seconds
                        } else{
                            $message.attr('class', 'text-danger').show();
                        }
                    }).always(function () {
                        $form.find('.btn').prop('disabled', false);
                    });
                    return false;
                });

                $('.playvideo').magnificPopup({
                    type        : 'iframe',
                    mainClass   : 'mfp-fade',
                    removalDelay: 160,
                    preloader   : false
                });

                var index = 0;

                var testimonial = $('.testimonial .owl-carousel');

                function doTestimonial() {
                    testimonial.owlCarousel({
                        items             : 1,
                        loop              : false,
                        dots              : false,
                        nav               : true,
                        navText           : ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                        //autoHeight:true,
                        //autoplay: true,
                        startPosition     : index,
                        autoplay          : false,
                        autoplayTimeout   : 10000,
                        autoplayHoverPause: false
                    });
                }

                doTestimonial();
                testimonial.on('changed.owl.carousel', function (event) {
                    index = event.item.index;
                });
                $('.testimonial blockquote p')
                .append('<a class="test-more">Read more</a>')
                .on('click', '.test-more', function (event) {
                    event.preventDefault();
                    testimonial.trigger('destroy.owl.carousel');
                    testimonial.trigger('refresh.owl.carousel');
                    var parent = $(this).closest('div');
                    if (parent.hasClass('less')) {
                        parent.removeClass('less').find('p').html(parent.data('full-text') + '<a class="test-more">Read less</a>');
                        parent.closest('blockquote').css({'top': '0'});
                        //setTimeout(function() {testimonial.trigger('refresh.owl.carousel')}, 200);
                        doTestimonial();
                    } else {
                        //console.log(parent.data('short-text'));
                        parent.addClass('less').find('p').html(parent.data('short-text') + '<a class="test-more">Read more</a>');
                        parent.closest('blockquote').css({'top': '56px'});
                        //setTimeout(function() {testimonial.trigger('refresh.owl.carousel')}, 200);
                        doTestimonial();
                    }
                });

                $('#partner-logo .owl-carousel').owlCarousel({
                    items             : 4,
                    loop              : true,
                    dots              : false,
                    nav               : false,
                    navText           : ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                    //autoHeight:true,
                    //autoplay: true,
                    //autoWidth: true,
                    autoplay          : true,
                    autoplayTimeout   : 4000,
                    autoplayHoverPause: false,
                    responsive        : {
                        // breakpoint from 0 up
                        0  : {
                            items: 1
                        },
                        // breakpoint from 768 up
                        768: {
                            items: 3
                        },
                        // breakpoint from 992 up
                        992: {
                            items: 4
                        }
                    }
                });
            }
        }
    };

    // The routing fires all common scripts, followed by the page specific scripts.
    // Add additional events for more control over timing e.g. a finalize event
    var UTIL = {
        fire      : function (func, funcname, args) {
            var fire;
            var namespace = Sage;
            funcname      = (funcname === undefined) ? 'init' : funcname;
            fire          = func !== '';
            fire          = fire && namespace[func];
            fire          = fire && typeof namespace[func][funcname] === 'function';

            if (fire) {
                namespace[func][funcname](args);
            }
        },
        loadEvents: function () {
            // Fire common init JS
            UTIL.fire('common');

            // Fire page-specific init JS, and then finalize JS
            $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
                UTIL.fire(classnm);
                UTIL.fire(classnm, 'finalize');
            });

            // Fire common finalize JS
            UTIL.fire('common', 'finalize');
        }
    };

    // Load Events
    $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.