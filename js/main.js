/*Slider height ajusting*/
window.onload = $(function codeAddress() {

    $("#main-window").css("min-height", function(){ 
        return $(window).height()-$('.top').height()-$('footer').height();
    });

});
$(window).resize(function() {
    $("#main-window").css("min-height", function(){ 
        return $(window).height()-$('.top').height()-$('footer').height();
    });
});  

    

////////////// Table Slider /////////////////////   
$(function(){
    $('.view-source .hide-block').hide();
    $a = $('.view-source a');
    $a.on('click', function(event) {
      event.preventDefault();
      $a.not(this).next().slideUp(500);
      $(this).next().slideToggle(500);
    });
});