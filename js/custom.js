jQuery(document).ready(function() {

  displaySubscribe()

  jQuery(window).scroll(function (event) {
    displaySubscribe()
  });

  function displaySubscribe() {
    var windowHeight = jQuery(window).height()
    var document = jQuery(document)
    var documentHeight = document.height()
    var scroll = jQuery(window).scrollTop()
    var articleHeight = jQuery('.post-content').height()
    var distanceToArticle = jQuery('.post-content').offset().top;
    var readPercentage = scroll / (articleHeight + distanceToArticle)

    var hasBeenDismissed = jQuery('.widget-subscribe-facebook').hasClass('widget-subscribe-dismissed')

    if (readPercentage > .60 && !hasBeenDismissed) {
      jQuery('.widget-subscribe-facebook').addClass('widget-subscribe-facebook-fixed')
    }
  }

  jQuery(document).on('click', '.subscribe-widget-mobile-controls-dismiss', function(){
    jQuery('.widget-subscribe-facebook').removeClass('widget-subscribe-facebook-fixed').addClass('widget-subscribe-dismissed')
    jQuery('#bunyad-widget-subscribe-2').removeClass('widget-subscribe-emails-fixed').addClass('widget-subscribe-dismissed')
  })

  jQuery(document).on('click', '.subscribe-widget-mobile-controls-show-emails', function(){
    jQuery('#bunyad-widget-subscribe-2').addClass('widget-subscribe-emails-fixed')
  })

  // Back to Facebook
  jQuery(document).on('click', '.subscribe-widget-mobile-controls-hide-emails', function(){
    jQuery('#bunyad-widget-subscribe-2').removeClass('widget-subscribe-emails-fixed')
  })

  jQuery('.test').on('click', function(){
    alert('test')
  })
  // Puts additional controls for dismissal etc in the default email widget
  jQuery('#bunyad-widget-subscribe-2').append(
    '<div class="sidebar-widget-mobile-controls row">' +
      '<div class="sidebar-widget-mobile-controls-left">' +
        '<a class="subscribe-widget-mobile-controls-hide-emails">Or, subscribe to Facebook</a>' +
      '</div>' +
      '<div class="sidebar-widget-mobile-controls-right">' +
        '<a class="subscribe-widget-mobile-controls-dismiss">Dismiss</a>' +
      '</div>' +
    '</div>'
  )

})