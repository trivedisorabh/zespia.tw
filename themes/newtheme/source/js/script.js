(function($){
  var $nav = $('#main-nav'),
    $searchInput = $('.search-form-input'),
    $window = $(window),
    $body = $('body'),
    bannerHeight = $('#banner').height();

  var throttle = function(fn, delay){
    var running = false;

    return function(){
      if (running) return;

      running = true;

      fn.apply(this, arguments);

      setTimeout(function(){
        running = false;
      }, delay);
    }
  };

  var fixMainNav = function(){
    var scrollTop = $window.scrollTop();

    if (scrollTop > bannerHeight){
      $nav.addClass('fixed');
    } else {
      $nav.removeClass('fixed');
    }
  };

  fixMainNav();

  $('#main-nav-menu-btn').on('click', function(e){
    e.stopPropagation();

    if ($nav.hasClass('menu')){
      $nav.removeClass('menu');
    } else {
      $nav.removeClass('search').addClass('menu');
    }
  });

  $('#main-nav-search-btn').on('click', function(e){
    e.stopPropagation();

    if (!$nav.hasClass('search')){
      $nav.removeClass('menu').addClass('search');
      $searchInput.focus();
    }
  });

  $body.on('click', function(e){
    if ($(e.target).is('.main-nav-link')) return;

    $nav.removeClass('menu');
  });

  $searchInput.on('blur', function(){
    $nav.removeClass('search');
  });

  $window.on('scroll', throttle(fixMainNav, 50));

  $('#main-nav').on('click', function(e){
    if ($(e.target).is('a, input')) return;

    $body.animate({
      scrollTop: 0
    }, 500);
  });
})(jQuery);