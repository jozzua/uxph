$(document).ready(function(){
	$('.slicknav_menu, #header').sticky();	
  // $('.bxslider').bxSlider();
  $('#nav ul').slicknav({
  	prependTo: '#header .inline-content',
  	label: 'MENU',
    init: setOverlayHeight
  });

  function setOverlayHeight(){
    var stickyHeight = $("#header-sticky-wrapper").height();
    $("#noise").css("top",stickyHeight+"px");  
  }

  $('#logo').click(function (){
    $('html').animate({scrollTop:0}, 'slow');//IE, FF
    $('body').animate({scrollTop:0}, 'slow');
  });

    if($(window).width() <= 684){
      $(".mobile-hide").hide();
      $(".mobile-show").show();
    }else{
      $(".mobile-hide").show();
      $(".mobile-show").hide();
    }

    // replace the span to div to make the background full
    if($(window).width() <= 568){
      $('.register-wrap-label').replaceWith($('<div class="register-wrap-label">Register</div>'));
    }

  function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  $('.slicknav_nav a.not, #nav li a.not').on('click',function(e) {
  	e.preventDefault();
  	scrollToAnchor($(e.target).attr('data-anchor'));

    if($(this).attr('href') === '#sponsors'){
      $('.sponsor-form-wrap').show();
      $('.callout-wrapper').hide();       
    }

  });	

  $('.sponsor-form-wrap').hide();

  $('.callout a').on('click', function(e){
    e.preventDefault();
    $('.sponsor-form-wrap').show('slow');
    $(this).parent().hide('slow');
  });

  $('.sponsor-form-wrap a').on('click', function(e){
    e.preventDefault();
    $(this).parent().hide('slow');
    $('.callout').show("slow");
  });

  $('#form').submit(function(event) {  
    event.preventDefault();  
    var url = $(this).attr('action');  
    var datos = $(this).serialize();  
    
    var sponsorName = $.trim($('#sponsor-name').val());
    var sponsorEmail = $('#sponsor-email').val();
    var sponsorOrg = $.trim($('#sponsor-org').val());

    console.log(sponsorName+' '+sponsorEmail+' '+sponsorOrg);
    $('.sponsor-form-wrap a, .sponsor-form-wrap input, .sponsor-form-wrap button').hide();
    $('.loader-wrap').show();
    console.log(sponsorEmail);

    if(sponsorEmail === ""){
      $('.sponsor-form-wrap .error-notice').show(function(){
           $('.sponsor-form-wrap .error-notice h2').text('Please complete all the fields');
          }).delay(5000).fadeOut('fast');
      $('.sponsor-form-wrap a, .sponsor-form-wrap input, .sponsor-form-wrap button').show();
      $('.loader-wrap').hide();
    }else{
      if(validateEmail(sponsorEmail)){
      $.get(url, datos, function(resultado) {  
        if(resultado == 'error'){
           $('.loader-wrap').hide();

          $('.sponsor-form-wrap .error-notice').show(function(){
           $('.sponsor-form-wrap .error-notice h2').text('Please complete all the fields');
          }).delay(5000).fadeOut('fast');
          $('.sponsor-form-wrap a, .sponsor-form-wrap input, .sponsor-form-wrap button').show();
        }else{
          $('.loader-wrap').hide();
          $('.success-notice').show();
          $('.success-notice p').text(resultado);
          $('.sponsor-info').hide();
        }
      });
    }else{
      $('.sponsor-form-wrap .error-notice').show(function(){
           $('.sponsor-form-wrap .error-notice h2').text('Oops, Invalid Email');
          }).delay(5000).fadeOut('fast');
      $('.sponsor-form-wrap a, .sponsor-form-wrap input, .sponsor-form-wrap button').show();
      $('.loader-wrap').hide();
    }
  }
    
  });


  $('#subscribe').on('click', function(event){
    event.preventDefault();
    var form = $('#subscribe-form'); 

    var email = $('#subscribe-form input[name=email]').val();
    
    var data = form.serialize(); 
    var url = form.attr('action');

    data += '&subscribe=yes';

    if(email == ""){
        $('.success-notice-subscribe').html("Oops, I think you missed a field");
        $('.success-notice-subscribe').css({'display':'block', width:'264px', 'color':'#f2534d', 'text-align':'center'});
      }
      else{
        if(validateEmail(email)){
          $.get(url, data, function(result) {  
            if(result){
              $('.success-notice-subscribe').show(function(){
                $('.success-notice-subscribe h2').text(result);
              }).delay(5000).fadeOut('fast');
              
            }
            $('#subscribe-form').prop('disabled', false);
            $('.success-notice-subscribe').html(result);
            $('.success-notice-subscribe').fadeIn('slow').css({'display':'block', 'color':'#22CED3', 'text-align':'center'});
            
            $('#subscribe-form input[name=email]').val('');
          });  
        }else{
          $('.success-notice-subscribe').html("Oops, Invalid Email");
          $('.success-notice-subscribe').css({'display':'block', width:'264px', 'color':'#f2534d', 'text-align':'center'});
        }
      }
  });  


$(window).load(function(){
  function clockInput(time)
  {
    
    var eventDate = new Date(2014,10,15,8,0,0);
    var now = new Date();
    var diff = eventDate - now;
    diff = diff/1000;
    var days = Math.floor(diff / 86400);
    var hours = Math.floor(diff / 3600) % 24;
    var minutes = Math.floor(diff / 60) % 60;
    var seconds = Math.floor(diff % 60);



    if(minutes < 10)
      minutes = "0"+minutes;

    if(seconds < 10)
      seconds = "0"+seconds;

    if(hours < 10)
      hours = "0"+hours;

    if(days < 10)
      days = "0"+days;
    
    
    return [days.toString(),hours.toString(),minutes.toString(),seconds.toString()];
  }

  var now = new Date();
  var clock = $("#counter").splitflap({
          glyphSet:
            {
              ".days": $.splitflap.days,
              ".hours.twentyfour": $.splitflap.twentyfour,
              ".minutes": $.splitflap.minutes,
              ".seconds": $.splitflap.seconds
            },
          initial: clockInput(now)
          });

  function updateClock() {
    var now = new Date();
  setTimeout(updateClock, 1000);
    $("#counter").splitflap("value", clockInput(now));
    
  }

  setTimeout(updateClock, 1000);


});

$('#readmore-link, .readmore-img').click(function(e){
    e.preventDefault();
    $('html,body').animate({scrollTop: $('#about').offset().top - 50},'slow');
  });



function scrollToAnchor(aid){	
  var aTag = $("div[id='"+ aid +"']");

  $('html,body').animate({scrollTop: aTag.offset().top - 50},'slow');
  if(aid == "contact"){
    console.log("adding class");
      topMenu.find("a").closest('li').removeClass('activelink');
      $("#contactlink").closest('li').addClass("activelink");
  }
}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function sortCustom(a,b){
    console.log("sort a"+a);
    console.log("sort b"+b);
    return a.dataset.order > b.dataset.order ? 1 : -1;
}

// Cache selectors
var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a").sort(sortCustom),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

console.log(menuItems);

// // Bind click handler to menu items
// // so we can get a fancy scroll animation
// menuItems.click(function(e){
//   var href = $(this).attr("href"),
//       offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
//   $('html, body').stop().animate({ 
//       scrollTop: offsetTop
//   }, 300);
//   e.preventDefault();
// });


  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop()+70;
     
     // Get id of current scroll item
     var cur = scrollItems.map(function(){

      //detect reached bottom of page
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        return scrollItems[scrollItems.length - 1];
      }

       if ($(this).offset().top < fromTop ){
         return this;
       }
     });

     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";
     if (!$('body').is(':animated')) { // id it is not animated it wont do the highlight through each menu
        if (lastId !== id) {
         lastId = id;
         // Set/remove active class
         menuItems
           .parent().removeClass("activelink").removeClass("active")
           .end().filter("[href=#"+id+"]").parent().addClass("activelink");
        }      
      }
               
  });

});

