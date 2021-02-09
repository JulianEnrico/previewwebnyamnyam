(function ($) {
	"use strict";
	
	var nurzenApp = {
		/* ---------------------------------------------
		    ## Content Loading
		--------------------------------------------- */	
		contentLoading: function() {
			$("body").imagesLoaded( function() {
				$('.preloader').delay(2000).fadeOut('slow');
				setTimeout(function() {
				    //After 2s, the no-scroll class of the body will be removed
				    $('body').removeClass('no-scroll');
					$("body").addClass("loading-done");
				}, 2000); //Here you can change preloader time
			});
		},	
        
        /* ---------------------------------------------
            ## Scroll top
        --------------------------------------------- */
        scroll_top: function () {
            $("body").append("<a href='#top' id='scroll-top' class='topbutton btn-hide'><span class='fa fa-angle-double-up'></span></a>");
            var $scrolltop = $('#scroll-top');
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > $(this).height()) {
                    $scrolltop
                        .addClass('btn-show')
                        .removeClass('btn-hide');
                } else {
                    $scrolltop
                        .addClass('btn-hide')
                        .removeClass('btn-show');
                }
            });
            $("a[href='#top']").on('click', function () {
                $("html, body").animate({
                    scrollTop: 0
                }, "normal");
                return false;
            });
        },
        
		/* ---------------------------------------------
            ## Mobile Menu
        --------------------------------------------- */
        mobile_menu: function () {
            var mobilesearch = $('.site-header .navigation-area .header-navigation-right').clone().appendTo('.mobile-menu');
            // mobile Menu
            //-------------------------------
            $('.site-navigation .mainmenu-area nav').meanmenu({
                meanMenuClose: "<i class='fas fa-times'></i>",
                meanMenuCloseSize: '18px',
                meanScreenWidth: '1199',
                meanExpandableChildren: true,
                meanMenuContainer: '.mobile-menu-area .mobile-menu'
            });
        },	

        /*-------------------------------------------
            ## Sticky Header
        --------------------------------------------- */
        sticky_header: function() {
            if ($('#sticky-header').length) {
                $('.site-header .site-navigation').clone().appendTo('#sticky-header');
                $(window).on('scroll', function() {
                    var w = $(window).width();
                    if (w > 1199) {
                        if ($(this).scrollTop() > 350) {
                            $('#sticky-header').slideDown(500);
                        } else {
                            $('#sticky-header').slideUp(500);
                        }
                    }
                });
            } 
        },

        /* ---------------------------------------------
            ## Search
        --------------------------------------------- */
        search: function () {
            $('.search-wrap .search-btn').on('click', function(){
                if($(this).siblings('.search-form').hasClass('active')){

                    $(this).siblings('.search-form').removeClass('active').slideUp();
                    $(this).removeClass('active');
                }
                else{
                    $(this).siblings('.search-form').removeClass('active').slideUp();
                    $(this).siblings('.search-form').removeClass('active');
                    $(this).addClass('active');
                    $(this).siblings('.search-form').addClass('active').slideDown();
                }
            });
        },
        
        /*-------------------------------------------
            ## Initialize Plugin
        --------------------------------------------- */
        initialize_plugin: function () {
            // Page Animation Script
            $("[data-animate]").scrolla({
                mobile: true,
                once: true
            });

            // Nice Select for select input type
            if ($('.select-custom').length) {
                $('.select-custom').niceSelect();
            }

            //Faq
            $('.checkout-form-wrapper .form-title').on('click', function (e) {
                var element = $(this).parent('.form-item');
                if (element.hasClass('open')) {
                    element.removeClass('open');
                    element.find('.form-content-area').removeClass('open');
                    element.find('.form-content-area').slideUp(300);
                } else {
                    element.addClass('open');
                    element.children('.form-content-area').slideDown(300);
                    element.siblings('.form-item').children('.form-content-area').slideUp(300);
                    element.siblings('.form-item').removeClass('open');
                    element.siblings('.form-item').find('.form-title').removeClass('open');
                    element.siblings('.form-item').find('.form-content-area').slideUp(300);
                }
            });

            // Spinner
            var options_number = {
                maxValue: 100,
                minValue: 0
            }
            $(".input-spinner.product-no").WanSpinner(options_number);

            // Light Box for ( gallery, video )
            $('a[data-rel^=lightcase]').lightcase();

            // Privacy Scroll menu
            $('.privacy-menu .dropdown-content a').on('click', function(e){
                var anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $(anchor.attr('href')).offset().top - 130
                }, 800);
                e.preventDefault();
            });

            $('.privacy-menu .dropdown-trigger a').each(function() {
				var $self = $(this);
				$self.on("click", function(e) {
				    $self.siblings(".dropdown-content").slideToggle(400);
				});
			});
        },
            
		/* ---------------------------------------------
		    ## Pop Up Scripts
		 --------------------------------------------- */
		popupscript: function() {	
			function getScrollBarWidth () {
			    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
			    $outer.remove();
			    return 100 - widthWithScroll;
			}

			// Image Pop up
			var $popupImage = $(".popup-image");
			if ( $popupImage.length > 0 ) {
			    $popupImage.magnificPopup({
			        type:'image',
			        fixedContentPos: false,
			        gallery: { enabled:true },
			        removalDelay: 300,
			        mainClass: 'mfp-fade',
			        callbacks: {
			            // This prevenpt pushing the entire page to the right after opening Magnific popup image
			            open: function() {
			                $(".page-wrapper, .navbar-nav").css("margin-right", getScrollBarWidth());
			            },
			            close: function() {
			                $(".page-wrapper, .navbar-nav").css("margin-right", 0);
			            }
			        }
			    });
			}
        },

        /* ---------------------------------------------
		    ## Isotope Activation
		--------------------------------------------- */
		isotope_activation: function() {
			var IsoGriddoload = $('.gallery-grid');
			IsoGriddoload.isotope({
			    itemSelector: '.item',
			    percentPosition: true,
			    layoutMode: 'packery',
			});

			var ProjMli = $('.gallery-filter li a');
			var ProjGrid = $('.gallery-grid');
			ProjMli.on('click', function(e) {
				e.preventDefault();
			    ProjMli.removeClass("active");
			    $(this).addClass("active");
			    var selector = $(this).attr('data-filter');
			    ProjGrid.isotope({
			        filter: selector,
			        animationOptions: {
			            duration: 750,
			            easing: 'linear',
			            queue: false,
			        }
			    });
			});
        },
        
        /* ---------------------------------------------
            ## Count Down
        --------------------------------------------- */
        count_down: function() {
            if ($('.countdown').length) {
                $('.countdown').syotimer({
                    year: 2021,
                    month: 12,
                    day: 9,
                    hour: 20,
                    minute: 30
                }); 
            }
        },

        /* ---------------------------------------------
            ## Product Carousel
        --------------------------------------------- */
        product_carousel: function() {
            if ($('.featured-product-carousel').length) {
                var items = 3;
                $('.featured-product-carousel').owlCarousel({
                    center: false,
                    items: items,
                    autoplay: false,
                    autoplayTimeout: 5000,
                    smartSpeed: 700,
                    margin: 0,
                    singleItem: false,
                    loop: true,
                    dots: false,
                    nav: true,
                    navText: ["<span class='fa fa-angle-left'></span>", "<span class='fa fa-angle-right'></span>"],
                    responsive: {
                        280: {
                            items: 1
                        },
                        500: {
                            items: 1
                        },
                        768: {
                            items: 2
                        },
                        992: {
                            items: 3
                        },
                        1200: {
                            items: items
                        }
                    }
                });  
            }
        },

        /* ---------------------------------------------
            ## Teachers Carousel
        --------------------------------------------- */
        teachers_carousel: function() {
            if ($('.teachers-carousel').length) {
                var items = 3;
                $('.teachers-carousel').owlCarousel({
                    center: false,
                    items: items,
                    autoplay: false,
                    autoplayTimeout: 5000,
                    smartSpeed: 700,
                    margin: 30,
                    singleItem: false,
                    loop: true,
                    dots: false,
                    nav: true,
                    navText: ["<span class='fa fa-angle-left'></span>", "<span class='fa fa-angle-right'></span>"],
                    responsive: {
                        280: {
                            items: 1
                        },
                        500: {
                            items: 1
                        },
                        768: {
                            items: 2
                        },
                        992: {
                            items: 3
                        },
                        1200: {
                            items: items
                        }
                    }
                });  
            }
        },
        
        /* ---------------------------------------------
		    ## Testimonial Carousel
		 --------------------------------------------- */
		testimonial_carousel: function() {
            if ($('#testimonail-carousel').length) {
                var items = 1;
                $('#testimonail-carousel').owlCarousel({
                    center: false,
                    items: items,
                    autoplay: false,
                    autoplayTimeout: 5000,
                    smartSpeed: 700,
                    margin: 0,
                    singleItem: false,
                    loop: true,
                    nav: false,
                    dots: false
                });  
            }
        },
        
		/* ---------------------------------------------
		    ## Sidebar Script
		--------------------------------------------- */
		sidebarScript: function() {
			if ($('.sidebar-items').length) {
                $('.sidebar-items').theiaStickySidebar({
                    'containerSelector': '.blog-page-block, .privacy-policy-block',
                    'additionalMarginTop': 0,
                    'minWidth': 992,
                });
            } 
		},	
		/* ---------------------------------------------
		 function initializ
		 --------------------------------------------- */
		initializ: function() {
			nurzenApp.scroll_top();
			nurzenApp.mobile_menu();
			nurzenApp.sticky_header();
			nurzenApp.search();
			nurzenApp.initialize_plugin();
            nurzenApp.popupscript();
            nurzenApp.count_down();
            nurzenApp.teachers_carousel();
            nurzenApp.product_carousel();
            nurzenApp.testimonial_carousel();
            nurzenApp.sidebarScript();
		}
	};
	/* ---------------------------------------------
	 Document ready function
	 --------------------------------------------- */
	$(function() {
		nurzenApp.initializ();
	});

	$(window).on('load', function() {
		nurzenApp.contentLoading();
		nurzenApp.isotope_activation();
	});
})(jQuery);