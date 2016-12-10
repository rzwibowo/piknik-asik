$(document).ready(function() {
	var $window = $(window);
	var $document = $(document);
	$('#obrollan').click(function() {
		$("#obrollan-content").toggle();
	});
	$(window).on('scroll',function(){
		if($window.scrollTop() + $window.height() > $document.height() - 100) {
			$('#obrollan').hide();
		}
		else{
			$('#obrollan').show();			
		}
	});
});