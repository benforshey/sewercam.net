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

var readyWrap = function () {
    var address = document.getElementsByClassName('inspection_address');
    var contactInfo = document.getElementsByClassName('inspection_contactInfo');
    var customerName = document.getElementsByClassName('inspection_customerName');
    var feedbackContainer = document.getElementsByClassName('form_feedback');
    var inputs = document.getElementsByTagName('input');
    var inspectionForm = document.getElementsByClassName('inspection_form');
    var security = document.getElementsByClassName('form_security');
    var time = document.getElementsByClassName('inspection_time');



    function inputWidthController (target) {
        var base = 25;  // base size for all inputs
        var chars = target.value.length;
        var size = target.size;
        if (chars > size) {  // if the input needs to expand (-5 char offset for UI)
            return target.size = target.value.length;  // expand it (-5 char offset for UI)
        } else if (chars < size && chars > base) {  // if the input contains less than its width and still has more than 15 characters
            return target.size = target.value.length;  // shrink it
        } else {  // otherwise
            return target.size = base;  // set to the base width
        }

    }

    function sendReport () {
        var AJAX = new XMLHttpRequest();
        var feedback = document.createElement('p');
        var message = {
            address: address[0].value,
            contactInfo: contactInfo[0].value,
            customerName: customerName[0].value,
            time: time[0].value
        };
        var email = {
            'key': 'a3fQuy-kRF_7jvlhm-wkUA',
            'message': {
                'from_email': 'no-reply@hydro-physics.co',
                'from_name': message.customerName,
                'subject': 'From SewerCam: ' + message.customerName,
                'html': '<p>Site: ' + message.address + '</p><p>Time: ' + message.time + '</p><p>Customer Name: ' + message.customerName + '</p><p>Customer Contact Info: ' + message.contactInfo + '</p>',
                'to': [
                    {
                        'email': 'hello@benforshey.com',  // todo: change back to 'clayton@hydro-physics.co'
                        'name': 'Clayton Ashley',
                        'type': 'to'
                    }]
            }
        };

        if (security[0].value) {  // if the security input has a value, it's been filled
            feedback.className = "feedback_error";
            feedback.innerHTML = "Sorry for the inconvenience, but you somehow triggered our anti-spam protection. Please use the contact information at the <a href='#footer'>bottom of the page</a> to reach us.";
            feedbackContainer[0].appendChild(feedback);
        } else {
            AJAX.addEventListener('load', function (e) {

                if (e.target.status === 200) {  // if the message was sent
                    feedback.className = "feedback_success";
                    feedback.innerHTML = "Your message was sent!";
                    feedbackContainer[0].appendChild(feedback);

                    for (var i = 0; i < inputs.length; i ++) {  // empty the form on success
                        inputs[i].value = '';
                    }
                } else {  // something nonspecific has gone wrong
                    feedback.className = "feedback_warning";
                    feedback.innerHTML = "Sorry for the inconvenience, but your message may have not sent. You can try sending it again or use the contact information at the <a href='#footer'>bottom of the page</a> to reach us."
                    feedbackContainer[0].appendChild(feedback);
                }
            });

            AJAX.open('POST', 'https://mandrillapp.com/api/1.0/messages/send.json', true);
            AJAX.send(JSON.stringify(email));
        }



    }


    /* event listeners & function calls */

    if (inputs.length) {

        for (var i = 0; i < inputs.length; i ++) {
            inputs[i].addEventListener('input', function(e) {
                inputWidthController(e.target);
            });
        }

        inspectionForm[0].addEventListener('submit', function (e) {
            e.preventDefault();
            sendReport();
        });
    }

    if (typeof smoothScroll !== 'undefined') {  // check if smoothScroll script is present
        smoothScroll.init({  // init smooth scroll
            easing: 'easeInOutQuad',
            speed: 500
        });
    }


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
