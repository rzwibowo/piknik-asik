$(window).load(function() {
    $('#loading').hide();
    $('#content-outer').show();

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
        //change for content-iner
        /*$(window).on('scroll', function() {
            if ($window.scrollTop() + $window.height() > $document.height() - 100) {
                $('#obrollan').hide();
                $('#obrollan-user').hide();
            } else {
                $('#obrollan').show();
            }
        });*/



        function custom_map(response_2) {

            var mapDiv = document.getElementById('map');
            var options = {
                zoom: 3,
                center: new google.maps.LatLng(37.09, -95.71),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };

            //initiate the map
            var map = new google.maps.Map(mapDiv, options);
            var bounds = new google.maps.LatLngBounds();
            var cities = [];

            var infowindow;

            /* initiate the json */
            var response_3 = JSON.parse(response_2);
            $.each(response_3, function(index_, el_) {
                var img_object = {};
                var img_array = [];

                map.active_window = false;

                cities.push(new google.maps.LatLng(el_.latitude, el_.longitude));
                //create the MARKERS remember the S
                var marker = new google.maps.Marker({
                    position: cities[index_],
                    map: map,
                    title: "City Number " + index_

                });
                //console.log(el_.latitude + " " + el_.longitude);

                $.each(el_.image_array, function(index, el) {
                    if (index == 0) {
                        img_array.push('<img class="img_width" src="' + this.img + '" alt="' + el_.judul + '">');
                        console.log(index);
                    }
                    img_array.push('<img class="img_width" src="' + this.img + '" alt="' + el_.judul + '" style="display: none;">');
                });

                var template_infobox = '<div class="outer_infobox"><div class="img_box">' + img_array + '</div><div class="arrowright"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></div><div class="arrowleft"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></div><div id="outer_desc_box"><div class="userbox"><p>' + el_.username + '</p></div><div class="desc_box"><p class="title">' + el_.judul + '</p><div class="like"><i class="fa fa-star star"></i><i>' + el_.like + '</i></div></div></div></div>';
                var template_infobox_cust = template_infobox.replace(/,/g, "");
                var myOptions = {
                    content: template_infobox_cust,
                    disableAutoPan: false,
                    maxWidth: 0,
                    pixelOffset: new google.maps.Size(-140, 0),
                    zIndex: null,
                    boxStyle: {
                        opacity: 1.0,
                        width: "240px"
                    },
                    closeBoxURL: "",
                    infoBoxClearance: new google.maps.Size(1, 1),
                    isHidden: false,
                    pane: "floatPane",
                    enableEventPropagation: false
                };

                var ib = new InfoBox(myOptions);

                (function(index_, marker) {
                    //create even listeners (closures at work)

                    google.maps.event.addListener(marker, 'click', function() {
                        map.setCenter(marker.getPosition());
                        if (map.active_window != false) {
                            map.active_window.ib.close(map, map.active_window.marker);
                        }
                        ib.open(map, marker);
                        map.active_window = { ib: ib, marker: marker };

                    });
                })(index_, marker);
                //extend our bounds here
                bounds.extend(cities[index_]);
                map.fitBounds(bounds);

            });
        }

        $('#map').on('click', '.arrowright', function() {
            // do something
            console.log("asadada");
        });

        /*$("#dataTable tbody").on("click", "tr", function() {
            console.log($(this).text());
        });*/

        var apiURL = "api/destinasi.json";
        var demo = new Vue({
            el: '#item-container',
            data: {
                items: null
            },
            created: function() {
                this.fetchData()
            },
            methods: {
                fetchData: function() {
                    var self = this;
                    $.ajax({
                            url: 'api/destinasi.json',
                            type: 'get',
                            dataType: 'json',

                        })
                        .done(function(response) {
                            self.items = response;
                            custom_map(JSON.stringify(response));
                            console.log("sasadwa");
                            //Initiate  maosnry
                            $container = $('#item-container');
                            $container.imagesLoaded(function() {
                                $container.masonry({
                                    itemSelector: '.item'
                                });
                            });
                        })
                        .fail(function() {
                            console.log("error");
                        })
                        .always(function() {});

                }
            }
        })


        /*$container.imagesLoaded(function() {
                if (typeof($container.masonry) !== 'undefined') $container.masonry();
                if (typeof($container.ccb_ajaxbind) !== 'undefined') $container.ccb_ajaxbind();
        });*/
        // $(document).ajaxStop(function() {
        //     console.log("complete");
        //     var $container = $('#item-container');
        //     $container.imagesLoaded(function() {
        //         $container.masonry();
        //     });
        //     $(".arrowright").on("click", '.arrowright', function() {
        //         console.log('huhuhuh');
        //     });
        //     $(".log").text("Triggered ajaxStop handler.");
        // });
    });
});
