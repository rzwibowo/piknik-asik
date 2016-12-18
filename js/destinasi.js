$(document).ready(function() {

    var $window = $(window);
    var $document = $(document);
    $('#obrollan').click(function() {
        $("#obrollan-content").toggle();
    });
    $('.obrollan-item-parent').click(function() {
        $("#obrollan-user").css('display', 'block');
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

    var apiURL = "api/destinasi.json";
    var demo = new Vue({

        el: '.item-container',

        data: {
            items: null
        },

        created: function() {
            this.fetchData()
        },

        methods: {
            fetchData: function() {
                /*var xhr = new XMLHttpRequest()
                var self = this
                xhr.open('GET', apiURL)
                xhr.onload = function() {
                    self.items = JSON.parse(xhr.responseText)
                    console.log(self.items[0].judul)
                }
                xhr.send()*/
                var self = this;
                $.ajax({
                        url: 'api/destinasi.json',
                        type: 'get',
                        dataType: 'json',

                    })
                    .done(function(response) {
                        self.items = response;
                        console.log(response);
                        /*$('.item-container').imagesLoaded(function() {
                            $('.item-container').masonry({
                                columnWidth: '.item',
                                itemSelector: '.item'
                            });
                        });*/
                        $('.item-container').imagesLoaded()

                        .done(function(instance) {
                            $('.item-container').masonry({
                                columnWidth: '.item',
                                itemSelector: '.item'
                            });
                        })
                        .progress(function(instance) {
                            $('.item-container').masonry({
                                columnWidth: '.item',
                                itemSelector: '.item'
                            });
                        })
                        .always(function(instance) {
                            $('.item-container').masonry({
                                columnWidth: '.item',
                                itemSelector: '.item'
                            });
                        })
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });

            }
        }
    })
});
