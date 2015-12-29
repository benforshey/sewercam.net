function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState != 'loading')
                fn();
        });
    }
}

var readyWrap = function() {
    // requestAnimationFrame shim from http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    (function initMap() {
        var center = new google.maps.LatLng(47.379999, -122.252049);
        var federalWay = new google.maps.LatLng(47.322302, -122.315142);
        var auburn = new google.maps.LatLng(47.307731, -122.230300);
        var kent = new google.maps.LatLng(47.381680, -122.235277);
        var desMoines = new google.maps.LatLng(47.402149, -122.321329);
        var seaTac = new google.maps.LatLng(47.443651, -122.296536);
        var burien = new google.maps.LatLng(47.471032, -122.345776);
        var mapOptions = {
            zoom: 11,
            center: center
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var marker1 = new google.maps.Marker({
            position: federalWay,
            map: map,
            title: "Federal Way"
        });
        var marker2 = new google.maps.Marker({
            position: auburn,
            map: map,
            title: 'Auburn'
        });
        var marker3 = new google.maps.Marker({
            position: kent,
            map: map,
            title: 'Kent'
        });
        var marker4 = new google.maps.Marker({
            position: desMoines,
            map: map,
            title: 'Des Moines'
        });
        var marker5 = new google.maps.Marker({
            position: seaTac,
            map: map,
            title: 'SeaTac'
        });
        var marker6 = new google.maps.Marker({
            position: burien,
            map: map,
            title: 'Burien'
        });
    })();
    // modified from http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation#answer-26808520
    function scrollToY(scrollTargetY, speed) {  // scrollTargetY: the target scrollY property of the window; speed: time in pixels per second

        var scrollY = window.scrollY,
            currentTime = 0;

        if (!scrollTargetY) {
            scrollTargetY = 0;  // scrollY of target
        }
        if (!speed) {
            speed = 2000;  // pixels per second
        }

        function easingEquation(pos) { // easeInOutQuint easing equation from https://github.com/danro/easing-js/blob/master/easing.js
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow((pos - 2), 5) + 2);
        }

        (function tick() {  // the animation loop engine; self invoking
            currentTime += 1 / 60;
            var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8)),  // min time 0.1, max time 0.8 seconds
                p = currentTime / time,
                t = easingEquation(p);
            if (p < 1) {
                window.requestAnimFrame(tick);
                window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
            } else {
                window.scrollTo(0, scrollTargetY);
            }
        })();
    }
    var smoothScroll = document.querySelector('.smoothScroll');
    smoothScroll.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.target && e.target.nodeName === 'A') {
            var id = e.target.hash.replace('#', '');
            var yVal = document.getElementById(id).getBoundingClientRect().top;
            scrollToY(yVal, 2500);
        }
    });


};

ready(readyWrap);


//// self-executing function for function-level variable scope
//(function(){
//    // declare my variables
//    var honeypot = document.getElementById('altMessage');
//    var form = document.getElementById('contact');
//    // define anonymous function
//    var botCheck = function(event){
//        // halt submission while checking
//        event.preventDefault();
//        // give feedback for wait time
//        $('.status').addClass('summary').text('Sending your message...'); // show success message
//        // check for entry in honeypot field
//        if (honeypot.value !== ''){
//            $('.status').toggleClass('summary').addClass('warning').text('Sorry for the inconvenience, but you somehow triggered our anti-spam protection. Please use the contact information at the bottom of the page to reach us.'); // show anti-spam message
//            return false;
//        } else {
//            var name = $("#name").val(); // get name field value
//            var email = $("#email").val(); // get email field value
//            var message = $("#message").val(); // get message field value
//            $.ajax({
//                    type: "POST",
//                    url: "https://mandrillapp.com/api/1.0/messages/send.json",
//                    data: {
//                        'key': 'a3fQuy-kRF_7jvlhm-wkUA',
//                        'message': {
//                            'from_email': 'no-reply@hydro-physics.co',
//                            'from_name': name,
//                            'headers': {
//                                'Reply-To': email
//                            },
//                            'subject': 'From Your Website: ' + email,
//                            'text': message,
//                            'to': [
//                                {
//                                    'email': 'clayton@hydro-physics.co',
//                                    'name': 'Clayton Ashley',
//                                    'type': 'to'
//                                }]
//                        }
//                    }
//                })
//                .done(function(response) {
//                    $('.status').text('Your message has been successfully sent. Thank you!'); // show success message
//                    $("#name").val(''); // reset field after successful submission
//                    $("#email").val(''); // reset field after successful submission
//                    $("#message").val(''); // reset field after successful submission
//                })
//                .fail(function(response) {
//                    $('.status').toggleClass('summary').addClass('warning').text('Sorry for the inconvenience, but something went wrong on our end. Please use the contact information at the bottom of the page to reach us.'); // show error message
//                });
//            return false; // prevent page refresh
//        }
//    }; // end bot check
//    // event listener for form submission
//    form.addEventListener('submit', botCheck);
//
//})(); // end self-executing function
