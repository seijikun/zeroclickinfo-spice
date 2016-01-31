package DDG::Spice::Manga;

use strict;
use DDG::Spice;

spice proxy_cache_valid => "200 30d";
spice to => 'http://playground.seiji.li/aniapi/?search=$1';

triggers startend => 'manga';
spice wrap_jsonp_callback => 1;

my @stops = ("wallpaper", "girl", "freak", "eye", "game", "news", "network",
    "character", "couple", "cat", "cosplay", "chibi", "creator", "art",
    "avatar", "picture", "currently airing");
my $stops_qr = join "|", @stops;

handle remainder => sub {
    return if $_ =~ m/^($stops_qr)s?$/g;

    return $_ if $_;
    return;
};

1;
