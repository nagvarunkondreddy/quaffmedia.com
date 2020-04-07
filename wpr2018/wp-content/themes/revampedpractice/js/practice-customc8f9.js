//jQuery IIFE
(function($){
  //jquery "plugin" function
  $.hoverSlider = function($sliderWrapper, settings) {
    var $sliderWrapper = $($sliderWrapper),
        $slider = $sliderWrapper.children("div"),
        $slides = $slider.children("div"),
        $wrapperWidth = $sliderWrapper.outerWidth(),
        $sliderWidth = 0,
        $tallestElementHeight = 0;

    //mouse watchers
    var watchers = function() {
      //set our timeout vars
      var mouseMoveTimeout, mouseOutTimeout;

      //mousemove watcher -- the gutz of the plugin
      $sliderWrapper.mousemove(function(event) {
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(function() {
          /*---------------------------------------
          Padding percentage:
          Take the percent we defined, turn it into a decimal, and divide it by two to share it on both sides
          Multiply it by the wrapper width to find the percent of the wrapper width

          Left Val:
          Find the mouse position, less the padding and offset
          Divide it by the wrapper width less the percentage, doubled.
          Then make it negative to move in the opposite direction, and multiply it by the actual slider width to get our px val
          ---------------------------------------*/
          var paddingPercentage = ((parseInt(settings.mouseMovePaddingPercent) / Math.pow(10, 2)) / 2) * $wrapperWidth,
              leftVal = $sliderWidth * (((event.pageX - ($sliderWrapper.offset().left + paddingPercentage)) / ($wrapperWidth - (paddingPercentage * 2))) * -1);

          //if we go less than zero, or greater than the slider width, cap them out
          if(leftVal * -1 <= 0) {
            leftVal = 0;
          } else if(leftVal * -1 >= $sliderWidth) {
            leftVal = $sliderWidth * -1;
          }

          //old way; its jittery
          //$slider.css({ left: leftVal + "px)" });

          //new way; not jittery; hardware accelerated, and hella prefixed
          $slider.css({
            '-webkit-transform' : 'translate3d(' + leftVal + 'px, 0, 0)',
            '-moz-transform'    : 'translate3d(' + leftVal + 'px, 0, 0)',
            '-ms-transform'     : 'translate3d(' + leftVal + 'px, 0, 0)',
            '-o-transform'      : 'translate3d(' + leftVal + 'px, 0, 0)',
            'transform'         : 'translate3d(' + leftVal + 'px, 0, 0)'
          });
        }, 10);
      })

      //mouseout
      //only call if we send the parameter
      if(settings.resetOnMouseout) {
        $sliderWrapper.mouseout(function(event) {
          clearTimeout(mouseOutTimeout);
          mouseOutTimeout = setTimeout(function() {
            //reset the position on mouseout
            $slider.css({
            '-webkit-transform' : 'translate3d(0, 0, 0)',
            '-moz-transform'    : 'translate3d(0, 0, 0)',
            '-ms-transform'     : 'translate3d(0, 0, 0)',
            '-o-transform'      : 'translate3d(0, 0, 0)',
            'transform'         : 'translate3d(0, 0, 0)'
          });
          }, 10);
        })
      };

      $(window).resize(function() {
        //re-set the widths
        $wrapperWidth = $sliderWrapper.outerWidth();
        $sliderWidth = $slider.width() - $wrapperWidth;
      });
    };

    //INITIALIZE FUNCTION
    var init = function() {
      //first we find out the height of the slider
      //based on the tallest slide
      $.each($slides, function(i, slide) {
        if($(slide).outerHeight() > $tallestElementHeight) {
          $tallestElementHeight = $(slide).outerHeight();
        }
      })

      //set the REQUIRED parameters for the slider to function
      //on the parent wrapper
      $sliderWrapper.css({
        position: "relative",
        overflow: "hidden",
        "white-space": "nowrap",
        height: $tallestElementHeight
      });

      //on the child slider wrapper
      $slider.css({
        position: "absolute",
        left: "0",
        top: "0",
        transition: "all " + settings.transitionSpeed + " ease-out"
      });

      $slides.css({
        "vertical-align": settings.verticalAlignSlides
      })

      //set sliderwidth after we add our CSS
      //this is due to positioned element being absolute
      $sliderWidth = $slider.width() - $wrapperWidth;

      //lastly, start watchers
      watchers();
    }(); //immediately invoke our init funciton
  };

  //jQuery plugin init on all
  //elements with the plugin bound to them
  $.fn.hoverSlider = function(options) {
    var settings = $.extend({
      //these are the default settings
      //they can be overrode in the instantiation
      //just like jQuery or similar
      resetOnMouseout: false,
      verticalAlignSlides: "middle",
      mouseMovePaddingPercent: "20%",
      transitionSpeed: "0.35s"
    }, options);

    return this.each(function() {
      (new $.hoverSlider(this, settings));
    });
  };
  // add active class on programs tab on solutions page
  $('.proGrams .tabs li').first().addClass('active');

})(jQuery);

//-------------------------------------------------------------

$(function() {
  //base slider
  $(".slider-one").hoverSlider();


});


/*
  Navigation  styling
*/
$( "#menu-primary > li > a" ).each(function(j) {
		//var words = $(this).text().split(" ");
		var wordscount = $(this).text().split(" ").length;
		//$(this).empty();
//		if(wordscount > 1){
			var words = $(this).text().split(" ");
			$(this).empty();
			$.each(words, function(i, v) {
				$( "#menu-primary > li > a" ).eq(j).append($("<span>").text(v));
			});
//		} else {
      // $(this).append($('<span>'))
//    }
	});

/*
  Page hedline styling
*/
$(document).ready(function(){
//	$('.taxContainer h1.casestudiesh1').each(function(){
//     var self = $(this);
//     var p = self.text().split(' ');
//     var html = self.html().replace(p[0], '<span>'+ p[0] +'</span>');
//     self.html(html);
//});
//});
//$(document).ready(function() {
//
//$('.taxContainer h1.casestudiesh1').each(function(j){
//  var wordscount1 = $(this).text().split(" ").length;
//  if(wordscount1 > 1){
//    var words1 = $(this).text().split(" ");
//    $(this).empty();
//    $.each(words1, function(i, v) {
//      $('.taxContainer h1.casestudiesh1').eq(j).append($("<span>").text(v));
//    });
//    } else {
//       $(this).append($('<span>'))
//    }
//});
//});

// $( ".taxContainer h1.casestudiesh1" ).each(function(j) {
// 		//var words = $(this).text().split(" ");
// 		var wordscount = $(this).text().split(" ").length;
// 		//$(this).empty();
// //		if(wordscount > 1){
// 			var words = $(this).text().split(" ");
// 			$(this).empty();
// 			$.each(words, function(i, v) {
// 				$( ".taxContainer h1.casestudiesh1" ).eq(j).append($("<span>").text(v));
// 			});
// //		} else {
//       // $(this).append($('<span>'))
// //    }
// 	});
	});

//STICKY NAVBAR
$(window).scroll(function() {
  var sticky = $('.topNavSec'),
    scroll = $(window).scrollTop();

  if (scroll >= 40) sticky.addClass('fixed');
  else sticky.removeClass('fixed');
});


//HOME TAB AND ACCORDIAN
$(document).ready(function() {
 $('#homeTab').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            tabidentify: 'hor_1', // The tab groups identifier
            activate: function(event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#nested-tabInfo');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });
    //Vertical Tab
        $('#winners').easyResponsiveTabs({
            type: 'vertical', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            closed: 'accordion', // Start closed if in accordion view
            tabidentify: 'hor_1', // The tab groups identifier
            activate: function(event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#nested-tabInfo2');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });
        });




//VIEWPOINT CAROUSEL
$(document).ready(function() {
              $('.view-owl-carousel').owlCarousel({
                nav: !0,
                loop: !0,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 2,
                    nav: true
                  },
                  1000: {
                    items: 4,
                    nav: true,
                    loop: false,
                    margin: 20
                  }
                },
                  autoplay: !0,
        navText: ['<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-left-arrow.png"/>', '<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-right-arrow.png"/>']
              });
            });

//PERFORMANCE EXCELLANCE CAROUSEL
$(document).ready(function() {
              $('.pe-owl-carousel').owlCarousel({
                nav: !0,
                loop: !0,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    autoplay:true,
                    nav: false
                  },
                  600: {
                    items: 1,
                    nav: false,
                    autoplay:true,
                  },
                  1000: {
                    items: 3,
                    nav: true,
                    loop: true,
                    dots:false,
                    autoplay:false,
                    margin: 20
                  }
                },
                  autoplay: false,
        navText: ['<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-left-arrow.png"/>', '<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-right-arrow.png"/>']
              });
            });


//HISTORY & AWARDS CAROUSEL
$(document).ready(function() {
              $('.award-owl-carousel').owlCarousel({
                loop: false,
                margin: 10,
                responsive: {
                  0: {
                    items: 2,
                    nav: false,
                    autoplay: true,
                  },
                  600: {
                    items: 4,
                    nav: false,
                    autoplay: true,
                  },
                  1000: {
                    items: 6,
                    nav: true,
                  }
                },
                autoplay: false,
                autoplayHoverPause: true,
                navText: ['<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-left-arrow.png"/>', '<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-right-arrow.png"/>'],
              });
            });

//OTHER PROGRAMM
$(document).ready(function() {
              $('.other-program-owl-carousel').owlCarousel({
                loop: false,
                margin: 10,
                responsive: {
                  0: {
                    items: 1,
                    nav: false,
                    autoplay: true
                  },
                  600: {
                    items: 2,
                    nav: false,
                    autoplay: true
                  },
                  1000: {
                    items: 3,
                    nav: true,
                  }
                },
                autoplay: false,
                autoplayHoverPause: true,
        navText: ['<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-left-arrow.png"/>', '<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-right-arrow.png"/>']
              });
            });


//SOLUTION CAROUSEL

$(window).on('load', function() {
              $('.solutions-carousel').owlCarousel({
                loop: false,
                margin: 10,
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 2,
                    nav: true
                  },
                  1000: {
                    items: 3,
                    nav: false,
                    loop: false,
                    margin: 0
                  }
                },
                  autoplay: false,
                  dots: false,
        navText: ['<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-left-arrow.png"/>', '<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-right-arrow.png"/>']
              });
            });
$(document).ready(function() {
              $('.solutions-carousel').owlCarousel({
                nav: !0,
                loop: !0,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 2,
                    nav: true
                  },
                  1000: {
                    items: 3,
                    nav: false,
                    loop: false,
                    margin: 0
                  }
                },
                  autoplay: false,
                  dots: false,
        navText: ['<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-left-arrow.png"/>', '<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-right-arrow.png"/>']
              });
            });


//INTERNAL AWARDS CULTURE PAGE
$(document).ready(function() {
              $('.internal-award-owl-carousel').owlCarousel({
                nav: !0,
                loop: !0,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 1,
                    nav: false
                  },
                  1000: {
                    items: 3,
                    nav: false,
                    loop: false,
                    margin: 20
                  }
                },
                  autoplay: !0,
        navText: ['<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-left-arrow.png"/>', '<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-right-arrow.png"/>']
              });
            });



//HOME PAGE JOB OPENING CAROUSEL
$(document).ready(function() {
              $('.job-opening-owl-carousel').owlCarousel({
                nav: !0,
                loop: !0,
                margin: 10,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                smartSpeed:450,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                      loop: true,
                    nav: true
                  },
                  600: {
                    items: 1,
                    loop: true,
                    nav: false
                  },
                  1000: {
                    items: 1,
                    nav: false,
                    loop: true,
                    margin: 20
                  }
                },
                  autoplay: !0,
        navText: ['<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-left-arrow.png"/>', '<img src="https://the-practice.net/wpr2018/wp-content/themes/revampedpractice/images/gray-right-arrow.png"/>']
              });
            });

$(window).on("load",function(){
				$(".teamModal").mCustomScrollbar({
					theme:"light-3"
				});

			});

const playercontact = new Plyr('#playercontact',{
    "autoplay": true,
    "loop":{ active: true },
    "clickToPlay":false,
    "hideControls":true,
    "clickToPlay":false,
    "quality":{ default: 'default', options: 'hd720' }
});



$('.plyr').on('ready', function(event) {

    $(this).addClass('plyr--init-hide-controls');

});
//CAREER JOB FILTERATION CODE
$('.filterButtons .filterBtn').on('click', function(){
  var button = $(this);
  $('.filterButtons .filterBtn').removeClass('active');
  button.toggleClass('active');
  var id = button.attr('id');
  if(id == 'all'){
    $('.archiveGrid .post').show();
  } else {
    var showId = '.archiveGrid .' + id;
    $('.archiveGrid .post').hide();
    $(showId).show();
  }
});

//IMAGE MAPPING RESPONSIVE
$(document).ready(function(e) {
	$('img[usemap]').rwdImageMaps();


});



$(document).ready(function(jQuery) {
    // alert(111);
    if ($("#player > .html5-video-player").hasClass("unstarted-mode")) {
        alert(111);
        $(this).addClass('abc');
    } else {
        $(".h2Abs").removeClass('abc');
    }
});


////////////////////////////////////////////////// culture page popup video////////////////


/*
 * Carousel setup
 */
(function(){
    // setup your carousels as you normally would using JS
    // or via data attributes according to the documentation
    // https://getbootstrap.com/javascript/#carousel
    $('#video-carousel').carousel({ interval: false });                 //Disable auto-slide
}());



/*
 * Video carousel - Dynamically load in YouTube videos based on 'data-id'
 */
    //Load the YouTube Iframe API
    var tag = document.createElement('script');

    tag.src = "//www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    //This will be the object name for interacting with the videos in the rest of this code
    var playerPopup;
    var videoArray = new Array();
    var internvideoArray = new Array();



    //Function: onYouTubePlayerAPIReady - Run when API is ready
    function onYouTubePlayerAPIReady() {
        playerPopup = new YT.Player('lifeAtPractice', {
            playerVars:{
                'rel': 0,
                'showinfo': 0,
                'controls': 1,
                'modestbranding': 0,
                'iv_load_policy': 3
                },
                events: {
                  // call this function when player is ready to use
                  'onReady': onPlayerReady
                }
            });




        ///////////////////////////////for employee and client testimonial//////////////////////////////
        //Look for video 'data-id' in the '.youtube-video' div
        var videos = document.querySelectorAll('#PR_video_testimonial .youtube-video');


        //Loop through each div found
        for (var i = 0; i < videos.length; i++) {

            //Create an array to hold the video IDs from 'data-id'
            dataset = videos[i].dataset.id;

            //This will be the variable name for inserting videos into the HTML divs
            var divID = 'vid-' + i.toString();

            //Setup video object, configure how videos should be presented
            videoArray[i] = new YT.Player(divID, {
                height: '100%',
                width: '100%',
                playerVars: {
                    'autoplay': 0,
                    'controls': 1,
                    'modestbranding': 0,
                    'rel': 0,
                    'showinfo': 0,
                    'loop': 1,
                   // 'iv_load_policy': 3
                },
                videoId: dataset, //Uses current looped ID from array
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });


        }

       ///////////////////////////////internship testimonials//////////////////////////////
        //Look for video 'data-id' in the '.youtube-video' div
        var internvideos = document.querySelectorAll('#intern-owl-carousel .internyoutube-video');


        //Loop through each div found
        for (var i = 0; i < internvideos.length; i++) {

            //Create an array to hold the video IDs from 'data-id'
            dataset = internvideos[i].dataset.id;

            //This will be the variable name for inserting videos into the HTML divs
            var interndivID = 'internvid-' + i.toString();

            //Setup video object, configure how videos should be presented
            internvideoArray[i] = new YT.Player(interndivID, {
                height: '100%',
                width: '100%',
                playerVars: {
                    'autoplay': 0,
                    'controls': 1,
                    'modestbranding': 0,
                    'rel': 0,
                    'showinfo': 0,
                    'loop': 1,
                    'iv_load_policy': 3
                },
                videoId: dataset, //Uses current looped ID from array
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });


        }

    }



    //Function: onPlayerReady - Run when video player is ready
    function onPlayerReady(event) {
       //////////////////////////////////// all employee testimonial and client testimonials ////////////////////////////////////
        //When the Bootstrap Carousel moves
        $('#PR_video_testimonial').on('slide.bs.carousel', function () {

            //Find each Iframe within '#video-carousel'
            $(this).find('iframe').each(function(){

                //Pause all YouTube videos
                event.target.pauseVideo();

            });


            //Show custom video button
            $('.play-button-wrapper .btn-video').show();

        });
        //////////////////////////////////// internship testimonials ////////////////////////////////////
        //When the Bootstrap Carousel moves
        $('#intern-owl-carousel').on('slide.bs.carousel', function () {

            //Find each Iframe within '#video-carousel'
            $(this).find('iframe').each(function(){

                //Pause all YouTube videos
                event.target.pauseVideo();

            });


            //Show custom video button
            $('.internplay-button-wrapper .btn-video').show();

        });

         //////////////////////////////////// bind events culture popup //////////////////////////////////////////////////////

          $(document).ready(function(){
             var playButton = $("#videobtn");
          playButton.on("click", function() {
            playerPopup.playVideo();
          });
          var pauseButton = $("#closeVideo");
          pauseButton.on("click", function() {
            playerPopup.pauseVideo();
          });
          });
          $('#cultureVideModal').on('hide.bs.modal', function (e) {
            playerPopup.pauseVideo();
          });



    }



    //Function: onPlayerStateChange - Run when a videos state has changed
    function onPlayerStateChange(event) {
//////////////////////////////////// all employee testimonial and client testimonials ////////////////////////////////////
        //Find all custom video buttons within '#video-carousel'
        $("#PR_video_testimonial").find('.play-button-wrapper .btn-video').each(function(){

            //If video has Ended
            if (event.data == YT.PlayerState.ENDED) {
                $(this).fadeIn("Slow");//Fade out
                $(this).find('i').attr("class", "fa fa-play");
            }

            //If video is Playing
            if (event.data == YT.PlayerState.PLAYING) {
                $(this).find('i').attr("class", "fa fa-pause");//Change icon
                $(this).fadeOut("Slow");//Fade out
            }

            //If video is Paused
            if (event.data == YT.PlayerState.PAUSED) {
                $(this).fadeIn("Slow");//Fade out
                $(this).find('i').attr("class", "fa fa-play");
            }

            //If video is Buffering
            if (event.data == YT.PlayerState.BUFFERING) {
                $(this).find('i').attr("class", "fa fa-circle-o-notch fa-spin fa-fw");
            }

        });
        //////////////////////////////////// internship testimonials ////////////////////////////////////
        //Find all custom video buttons within '#video-carousel'
        $("#intern-owl-carousel").find('.internplay-button-wrapper .btn-video').each(function(){

            //If video has Ended
            if (event.data == YT.PlayerState.ENDED) {
                $(this).fadeIn("Slow");//Fade out
                $(this).find('i').attr("class", "fa fa-play");
            }

            //If video is Playing
            if (event.data == YT.PlayerState.PLAYING) {
                $(this).find('i').attr("class", "fa fa-pause");//Change icon
                $(this).fadeOut("Slow");//Fade out
            }

            //If video is Paused
            if (event.data == YT.PlayerState.PAUSED) {
                $(this).fadeIn("Slow");//Fade out
                $(this).find('i').attr("class", "fa fa-play");
            }

            //If video is Buffering
            if (event.data == YT.PlayerState.BUFFERING) {
                $(this).find('i').attr("class", "fa fa-circle-o-notch fa-spin fa-fw");
            }

        });


    }



    //Bind Click and Touchstart events to the custom video button
    $( ".play-button-wrapper" ).bind("click touchstart", function() {
//////////////////////////////////// all employee testimonial and client testimonials ////////////////////////////////////
        //Find the active carousel slide and target the Iframe within it
        $("#PR_video_testimonial").find('.active iframe').each(function(){

            //Find the integer from the div ID and split - Use objectID[1] to output the integer
            var objectID = $(this).attr('id').split('-');


            //If the active slide's video is Playing
            if (videoArray[ objectID[1] ].getPlayerState() == 1) {
                videoArray[ objectID[1] ].pauseVideo();     //Pause video on click

            //If the active slide's video is Paused
            } else if (videoArray[ objectID[1] ].getPlayerState() == 2) {
                videoArray[ objectID[1] ].playVideo();      //Play video on click

            //If the video is doing anything else
            } else {
                videoArray[ objectID[1] ].playVideo();      //Play video on click
            }

        });
         });
        //////////////////////////////////// intern testimonials ////////////////////////////////////
    $( ".internplay-button-wrapper" ).bind("click touchstart", function() {
        $("#intern-owl-carousel").find('.active iframe').each(function(){

            //Find the integer from the div ID and split - Use objectID[1] to output the integer
            var objectID = $(this).attr('id').split('-');


            //If the active slide's video is Playing
            if (internvideoArray[ objectID[1] ].getPlayerState() == 1) {
                internvideoArray[ objectID[1] ].pauseVideo();     //Pause video on click

            //If the active slide's video is Paused
            } else if (internvideoArray[ objectID[1] ].getPlayerState() == 2) {
                internvideoArray[ objectID[1] ].playVideo();      //Play video on click

            //If the video is doing anything else
            } else {
                internvideoArray[ objectID[1] ].playVideo();      //Play video on click
            }

        });
        });
        jQuery(document).ready(function($){
          $('#internshipForm').on('submit', function(e){
            e.preventDefault();
            let fUrl = $('#internshipForm').attr('action');
            let email = $('#email').val();
            let name = $('#name').val();
            let mobile = $('#mobile').val();
            let university = $('#university').val();
            let location = $('#locations').val();
            let file = $('#uploadCV').prop('files')[0];
            let form_data = new FormData();
            form_data.append('file', file);
            if(!email || !name || !mobile || !university){
              $('.fillAllField').show();
              $('.mobileNumber, .success-message').hide();
            } else {
              if(isNaN(mobile)){
                $('.mobileNumber').show();
                $('.fillAllField, .success-message').hide();
              } else {
                  $('#loadingmessage').show();
                $.ajax({
                    url: fUrl,
                    type: 'post',
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    data: form_data,
                    beforeSend: function(xhr){
                      // $('#uploadFile').text('Uploading..').attr('disabled', 'disable');
                    },
                    success: function (data) {
                      console.log('Success');

                    },
                    error: function (err) {
                      // console.log(err.responseText);
                      let subject = 'New submission for the PRactice Internship by '+name;
                      let body = '<table>\
                        <tr>\
                          <td><strong>Name</strong></td>\
                          <td>'+name+'</td>\
                        </tr>\
                        <tr>\
                          <td><strong>Email id</strong></td>\
                          <td>'+email+'</td>\
                        </tr>\
                        <tr>\
                          <td><strong>Mobile</strong></td>\
                          <td>'+mobile+'</td>\
                        </tr>\
                        <tr>\
                          <td><strong>University</strong></td>\
                          <td>'+university+'</td>\
                        </tr>\
                        <tr>\
                          <td><strong>Location</strong></td>\
                          <td>'+location+'</td>\
                        </tr>\
                        <tr>\
                          <td><strong>Resume</strong></td>\
                          <td>'+err.responseText+'</td>\
                        </tr>\
                          </table>';
                      let send_to = 'careers@the-practice.net';
                      $.ajax({
                        url: 'https://the-practice.net/wpr2018/send_email.php',
                        data: { 'send_to': send_to, 'subject': subject, 'message': body, 'applicant_email': email, 'applicant_name': name },
                        type: 'POST',
                        beforeSend:function(xhr){
                        },
                        error: function(err){
                          console.log(err.responseText);
                        },
                        success:function(data){
                            $('#internshipForm')[0].reset();
                          $('.fillAllField, .mobileNumber').hide();
                            $('#loadingmessage').hide();
                                $('.success-message').show().fadeOut(10000, function() { $('.success-message'); });
//                            $('.success-message').hide().fadeOut(5000, function() { $('.success-message'); });
                        }
                      });
                    }
                });
              }
            }
          });
        });
//banner mousemove perspective
VanillaTilt.init(document.querySelector('.c-tilt'), {
  max: 25,
  perspective: 700,
  speed: 400
});


//footer form
//$( "#letstalkClick" ).click(function() {
//  $( '.letsTalkForm' ).toggleClass( "highlight" );
//});