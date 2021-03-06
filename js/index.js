// buttons
$(".button-fill").hover(function () {
    $(this).children(".button-inside").addClass('full');
}, function () {
    $(this).children(".button-inside").removeClass('full');
});

// start inifinte marquee
$('#maindiv').width($('#div1').width());

var $input;

function onInputFocus(event) {
    var $target = $(event.target);
    var $parent = $target.parent();
    $parent.addClass('input--filled');
};

function onInputBlur(event) {
    var $target = $(event.target);
    var $parent = $target.parent();

    if (event.target.value.trim() === '') {
        $parent.removeClass('input--filled');
    }
};

$(document).ready(function () {
    $input = $('.input__field');

    // in case there is any value already
    $input.each(function () {
        if ($input.val().trim() !== '') {
            var $parent = $input.parent();
            $parent.addClass('input--filled');
        }
    });

    $input.on('focus', onInputFocus);
    $input.on('blur', onInputBlur);
});

$(document).on('click', '#register', function () {
    var firstname = document.getElementById('input-1').value;
    var lastname = document.getElementById('input-2').value;
    var email = document.getElementById('input-3').value;
    var password = document.getElementById('input-4').value;
    var phone = document.getElementById('input-5').value;

    var request = new Object();
    request['firstname'] = firstname;
    request['lastname'] = lastname;
    request['phone'] = phone;
    request['email'] = email;
    request['password'] = password;

    registerUser(JSON.stringify(request));
});

$(document).on('click', '#login', function() {
	var email = document.getElementById('input-1').value;
	var password = document.getElementById('input-2').value;

    var request = new Object();
    request['email'] = email;
    request['password'] = password;

    loginUser(JSON.stringify(request));
});

$(document).on('click', '#debate', function() {
    var user = $.jStorage.get('user');
    if(user == null) {
        window.open('./login.html', '_self');
    } else {
        window.open('./debateroom.html', '_self');
    }
});

$(document).on('click', '#room', function() {
	var topic = document.getElementById('input-1').value;
    var user = $.jStorage.get('user');
    var request = new Object();
    request['email'] = user.email;
    request['topic'] = topic;

    debate(JSON.stringify(request));
});

$(document).on('click', '#logout', function() {
    $.jStorage.deleteKey('user');
    window.open('./index.html', '_self');
});

