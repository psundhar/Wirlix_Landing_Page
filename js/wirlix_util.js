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

$(document).ready(function() {
  $input = $('.input__field');

  // in case there is any value already
  $input.each(function(){
    if ($input.val().trim() !== '') {
      var $parent = $input.parent();
      $parent.addClass('input--filled');
    }
  });

  $input.on('focus', onInputFocus);
  $input.on('blur', onInputBlur);
});

$(document).on('click', '#send-button', function() {
	var firstname = document.getElementById('input-1').value;
	var lastname = document.getElementById('input-2').value;
	var phone = document.getElementById('input-3').value;
	var email = document.getElementById('input-4').value;
	var topic = document.getElementById('input-5').value;

    var request = new Object();
    request['firstname'] = firstname;
    request['lastname'] = lastname;
    request['phone'] = phone;
    request['email'] = email;
    request['topic'] = topic;

    postUser(JSON.stringify(request));
});
