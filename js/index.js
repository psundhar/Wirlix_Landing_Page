// buttons
 $(".button-fill").hover(function () {
    $(this).children(".button-inside").addClass('full');
}, function() {
  $(this).children(".button-inside").removeClass('full');
});

// start inifinte marquee
$('#maindiv').width($('#div1').width());
