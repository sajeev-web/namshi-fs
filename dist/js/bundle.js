/* ---- Main js ----- */

;(function()
{
    "use strict";

    var Main = (function()
    {
        var CONSTANTS = 
        {
            ID_SELECTORS:
            {
                "castDetails": "#cast-folio"
            },
            CLASS_SELECTORS:
            {
               "tabs": ".nav-item",
               "moviePics":  ".movie-pics",
               "cast": ".card",
               "share": ".share-it",
               "home": ".go-back"
            },
            URLS:
            {
                "search": ".search-form"
            }
        }

        var currentSearch = "";

        return {
            main: function()
            {
                this.handleEvents();
                this.shareIt();
                if ($(CONSTANTS.ID_SELECTORS.castDetails).length) {
                    this.initialiseSlider();
                }
            },
            handleEvents: function()
            {
                var $this = this;
                $(CONSTANTS.URLS.search).on("submit", function(e)
                {
                    e.preventDefault();
                    var searchText = $(this).find("input").val();
                    currentSearch = searchText;

                    sessionStorage.setItem("searchText", searchText);
                    $this.loadMovie(searchText);

                    $(this).find("input").val("").focus();
                });

                let searchText = sessionStorage.getItem("searchText");
                if ($.trim(searchText).length > 0 && searchText != null && searchText != undefined && $(CONSTANTS.URLS.search).length > 0) {
                     $this.loadMovie(searchText);
                }
            },
            loadMovie: function(searchText) {
                var $this = this;
                axios.get("http://www.omdbapi.com/?apikey=8778835e&plot=full&t=" + searchText)
                .then((response) => {
                    $(".title-block, nav").removeClass("d-none");

                   // Ratings
                    let ratings = response.data.Ratings;
                    let output = "";
                    $.each(ratings, (index, rating) => {
                        output += `
                            <div class="col-4 ratings border d-flex align-items-center">
                                <div class="row m-0 w-100">
                                    <div class="col-12 px-0 pt-3">${rating.Value}</div>
                                    <div class="col-12 info-text text-truncate px-0 pb-3 ">${rating.Source}</div>
                                </div>
                            </div>

                        `;
                    });
                    $(".ratings-block").html(output);

                    // Title
                    var outputTitle = "";
                    outputTitle = `
                        <div class="col-10">${response.data.Title}
                        <br>${response.data.Title} . ${response.data.Genre} . ${response.data.Runtime}</div>
                        <div class="col-2 text-right share-it"><i class="fa fa-ellipsis-v"></i></div>
                        <div class="share-popup d-none">
                            <div class="col-12 p-0 pb-2"><i class="fa fa-share-alt"></i>&nbsp;&nbsp;<span>Share</span></div>
                            <div class="col-12 p-0"><i class="fa fa-comment"></i>&nbsp;&nbsp;<span>Send feedback</span></div>
                        </div>
                    `;
                    $(".title-block").html(outputTitle);
                    $(".desc-block").html(response.data.Plot);

                    var outputMisc = `
                        <p class="">Initial Release: ${response.data.Released}</p>
                        <p class="">Director: ${response.data.Director}</p>
                        <p class="">Box office: ${response.data.BoxOffice}</p>
                        <p class="">Production: ${response.data.Production}</p>
                    `;
                    $(".misc-block").html(outputMisc);

                    var outputPosters = `
                        <div class="movie-pics">
                            <div><img src="${response.data.Poster}" />
                            </div>
                            <div><img src="${response.data.Poster}" />
                            </div>
                            <div><img src="${response.data.Poster}" />
                            </div>
                            <div><img src="${response.data.Poster}" />
                            </div>
                        </div>
                    `;

                    $(".movie-block").html(outputPosters);
                    $this.initialiseSlider();

                })
                .catch((error) => {
                    console.log(error);
                });
            },
            initialiseSlider: function() {
                $('.movie-pics').slick({
                    dots: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    arrows: false,
                    responsive: [{
                        breakpoint: 600,
                        settings: {
                            slidesToShow:3,
                            slidesToScroll: 1
                        }
                    },
                    {
                       breakpoint: 400,
                       settings: {
                            arrows: false,
                            slidesToShow: 2,
                            slidesToScroll: 1
                       }
                    }]
                });
           },
           shareIt: function() {
                $(".title-block").delegate(".share-it", "click", function() {
                    $(".share-popup").toggleClass("d-none");
                });
           }
        }
    })();
    
    Main.main();
})();

