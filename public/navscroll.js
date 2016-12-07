(function() {
  var previousScroll = 0;
  var navbar = document.getElementById('category-bar');
  navClasses = navbar.classList;

  // var navbar = document.getElementsByClassName('list-wrapper')[0];
  // navClasses = navbar.classList;



  window.addEventListener('scroll', function(e) {
    var currentScroll = window.scrollY;
    var isDown = currentScroll > previousScroll;

    if (isDown && !navClasses.contains('scrolled')) {
      navClasses.add('scrolled');
    } else if (!isDown) {
      navClasses.remove('scrolled');
    }

    previousScroll = currentScroll;
  });
}());
