(function(env) {
    "use strict";

    env.ddg_spice_manga = function(api_result) {

        if (!api_result || api_result.length === 0) {
            return Spice.failed("manga");
        }

        var script = $('[src*="/js/spice/manga/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/manga\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query);

        Spice.add({
            id: 'manga',
            name: 'Manga',
            data: api_result,
            meta: {
                sourceName: 'aniSearch',
                sourceUrl: "http://playground.seiji.li/aniapi/?search=" + query,
                sourceIconUrl: DDG.get_asset_path('manga','anisearch.png')
            },
            normalize: function(item) {
                var image = '';
                if (item.image) {
                    image = DDG.toHTTP(item.image);
                }

                return {
                    img: image,
                    image: image,
                    img_m: image,
                    heading: item.title,
                    title: item.title,
                    abstract: item.description,
                    rating: item.rating,
                    url: item.url
                };
            },
            templates: {
                group: 'movies',
                options: {
                    subtitle_content: Spice.manga.subtitle_content,
                    rating: true,
                    buy: Spice.manga.buy,
                    hideReviewText: true
                }
            }
        });
    };
}(this));

