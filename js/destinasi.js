$(document).ready(function() {
    var $window = $(window);
    var $document = $(document);
    $('#obrollan').click(function() {
        $("#obrollan-content").toggle();
    });
    $('.obrollan-item-parent').click(function() {
        $("#obrollan-user").css('display','block');
    });
    $('#obrollan-user-content').click(function() {
        $(this).toggle();
    });

    $("#obrollan-user").click(function() { $("#obrollan-user").toggle() });

    $(window).on('scroll', function() {
        if ($window.scrollTop() + $window.height() > $document.height() - 100) {
            $('#obrollan').hide();
            $('#obrollan-user').hide();
        } else {
            $('#obrollan').show();
        }
    });
});
