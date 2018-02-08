// @codekit-append "../js/theme.js";
// @codekit-append "../library/prism/prism.js";


var theme = {};

(function ($) {

  /*
  *  Helpers
  *
  *  description
  *
  *  @type	function
  *  @date	7/07/13
  *
  *  @param	{int}	$post_id
  *  @return	{int}	$post_id
  */

  $.fn.exists = function () {

    return $(this).length > 0;

  };

  $.fn.reverse = function () {

    return this.pushStack(this.get().reverse(), arguments);

  };


  /*
  *  model
  *
  *  This model acts as a scafold for action.event driven modules
  *
  *  @type	object
  *  @date	8/09/2014
  *  @since	5.0.0
  *
  *  @param	(object)
  *  @return	(object)
  */

  var model = {

    // vars
    actions: {},
    filters: {},
    events: {},

    extend: function (args) {

      // extend
      var model = $.extend({}, this, args);


      // setup actions
      $.each(model.actions, function (name, callback) {

        model._add_action(name, callback);

      });


      // setup filters
      $.each(model.filters, function (name, callback) {

        model._add_filter(name, callback);

      });


      // setup events
      $.each(model.events, function (name, callback) {

        model._add_event(name, callback);

      });


      // return
      return model;

    },

    _add_action: function (name, callback) {

      // split
      var model = this,
        data = name.split(' ');


      // add missing priority
      var name = data[0] || '',
        priority = data[1] || 10;


      // add action
      acf.add_action(name, model[callback], priority, model);

    },

    _add_filter: function (name, callback) {

      // split
      var model = this,
        data = name.split(' ');


      // add missing priority
      var name = data[0] || '',
        priority = data[1] || 10;


      // add action
      acf.add_filter(name, model[callback], priority, model);

    },

    _add_event: function (name, callback) {

      // vars
      var model = this,
        split = name.split(' ', 1),
        event = split[0] || '',
        selector = split[1] || '',
        context = document;


      // window
      if (event == 'resize' || event == 'scroll' || event == 'load') {

        context = window;

      }


      // add event
      $(context).on(event, selector, function (e) {

        // append $el to event object
        e.$el = $(this);


        // event
        if (typeof model.event === 'function') {

          e = model.event(e);

        }


        // callback
        model[callback].apply(model, [e]);

      });

    }

  };


  /*
  *  theme
  *
  *  description
  *
  *  @type	function
  *  @date	9/09/2015
  *  @since	5.2.3
  *
  *  @param	$post_id (int)
  *  @return	$post_id (int)
  */

  theme = model.extend({

    events: {
      'ready': 'ready',
      'load': 'load',
    },

    is_mobile: function () {

      return ($(window).width() <= 640);

    },

    ready: function () {

      // resize


    },

    load: function () {

      // resize


    },

  });


  /*
  *  fade
  *
  *  description
  *
  *  @type	function
  *  @date	9/09/2015
  *  @since	5.2.3
  *
  *  @param	$post_id (int)
  *  @return	$post_id (int)
  */

  theme.fade = model.extend({

    $posts: null,
    $active: null,
    $stem: null,

    active: false,

    events: {
      'ready': 'ready',
      'scroll': 'scroll',
    },

    ready: function () {

      // vars
      this.$posts = $('.post');
      this.$stem = $('#stem');


      // allow scroll event
      this.active = true;


      // event
      this.scroll();

    },

    scroll: function () {

      // bail early if not ready
      if (!this.active) {

        return;

      }


      // reset
      this.$active = null;
      this.$stem.removeClass('alt');
      this.$posts.addClass('fade-post');


      // reference
      var self = this;


      // vars
      var scroll = $(window).scrollTop(),
        middle = $(window).height() / 2;


      // find active
      this.$posts.each(function () {

        var offset = $(this).offset().top;

        if ((offset - scroll) <= middle) {

          self.$active = $(this);

        }

      });


      // bail early if no $active
      if (!this.$active) {

        return false;

      }


      // remove class
      this.$active.removeClass('fade-post');


      // alt stem color
      if (this.$active.hasClass('alt')) {

        $('#stem').addClass('alt');

      }


    }

  });


  theme.twitter = model.extend({

    events: {
      'ready': 'ready',
    },

    ready: function () {

      // vars
      var $posts = $('.post-tweet');


      // bail early if no $posts
      if (!$posts.exists()) {

        return false;

      }


      // vars
      var username = "elliotcondon",
        count = $posts.length + 1;


      // load tweets
      // $.getJSON('https://www.elliotcondon.com/json/tweets/?count=' + count, function (json) {
      //
      //   // validate
      //   if (!json || !json.status) {
      //
      //     return false;
      //
      //   }
      //
      //
      //   $posts.each(function (i) {
      //
      //     // vars
      //     var tweet = ify.clean(json.tweets[i].text);
      //
      //
      //     // updaet html
      //     $(this).find('p').html(tweet);
      //
      //   });
      //
      //
      // });
      var json = {
        "status": 1,
        "tweets": [{
          "created_at": "Fri Feb 02 23:10:48 +0000 2018",
          "id": 959564788245315586,
          "id_str": "959564788245315586",
          "text": "@wppp_io Thanks for the kind words!",
          "truncated": false,
          "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [{
              "screen_name": "wppp_io",
              "name": "WP Plus Plus",
              "id": 855709595922255872,
              "id_str": "855709595922255872",
              "indices": [0, 8]
            }],
            "urls": []
          },
          "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
          "in_reply_to_status_id": 959429797758857218,
          "in_reply_to_status_id_str": "959429797758857218",
          "in_reply_to_user_id": 855709595922255872,
          "in_reply_to_user_id_str": "855709595922255872",
          "in_reply_to_screen_name": "wppp_io",
          "user": {
            "id": 28234947,
            "id_str": "28234947",
            "name": "elliot condon",
            "screen_name": "elliotcondon",
            "location": "melbourne, Australia",
            "description": "Web developer specializing in UI & WordPress. Author of the Advanced Custom Fields plugin.",
            "url": "http:\/\/t.co\/KJxHIDNxC2",
            "entities": {
              "url": {
                "urls": [{
                  "url": "http:\/\/t.co\/KJxHIDNxC2",
                  "expanded_url": "http:\/\/www.elliotcondon.com",
                  "display_url": "elliotcondon.com",
                  "indices": [0, 22]
                }]
              }, "description": {"urls": []}
            },
            "protected": false,
            "followers_count": 5376,
            "friends_count": 176,
            "listed_count": 259,
            "created_at": "Thu Apr 02 00:17:19 +0000 2009",
            "favourites_count": 724,
            "utc_offset": -36000,
            "time_zone": "Hawaii",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 3113,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_image_url_https": "https:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_tile": false,
            "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/28234947\/1376825540",
            "profile_link_color": "359ABC",
            "profile_sidebar_border_color": "DEDEDE",
            "profile_sidebar_fill_color": "F0F0F0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": false,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "is_quote_status": false,
          "retweet_count": 1,
          "favorite_count": 3,
          "favorited": false,
          "retweeted": false,
          "lang": "en"
        }, {
          "created_at": "Sun Jan 28 22:28:50 +0000 2018",
          "id": 957742291594047488,
          "id_str": "957742291594047488",
          "text": "RT @Maximebj: Fun fact : #ACF is already #gutenberg compatible. I can see my custom fields and it's already perfectly integrated (even the\u2026",
          "truncated": false,
          "entities": {
            "hashtags": [{"text": "ACF", "indices": [25, 29]}, {"text": "gutenberg", "indices": [41, 51]}],
            "symbols": [],
            "user_mentions": [{
              "screen_name": "Maximebj",
              "name": "Max \u24cc CapitaineWP",
              "id": 16484026,
              "id_str": "16484026",
              "indices": [3, 12]
            }],
            "urls": []
          },
          "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
          "in_reply_to_status_id": null,
          "in_reply_to_status_id_str": null,
          "in_reply_to_user_id": null,
          "in_reply_to_user_id_str": null,
          "in_reply_to_screen_name": null,
          "user": {
            "id": 28234947,
            "id_str": "28234947",
            "name": "elliot condon",
            "screen_name": "elliotcondon",
            "location": "melbourne, Australia",
            "description": "Web developer specializing in UI & WordPress. Author of the Advanced Custom Fields plugin.",
            "url": "http:\/\/t.co\/KJxHIDNxC2",
            "entities": {
              "url": {
                "urls": [{
                  "url": "http:\/\/t.co\/KJxHIDNxC2",
                  "expanded_url": "http:\/\/www.elliotcondon.com",
                  "display_url": "elliotcondon.com",
                  "indices": [0, 22]
                }]
              }, "description": {"urls": []}
            },
            "protected": false,
            "followers_count": 5376,
            "friends_count": 176,
            "listed_count": 259,
            "created_at": "Thu Apr 02 00:17:19 +0000 2009",
            "favourites_count": 724,
            "utc_offset": -36000,
            "time_zone": "Hawaii",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 3113,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_image_url_https": "https:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_tile": false,
            "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/28234947\/1376825540",
            "profile_link_color": "359ABC",
            "profile_sidebar_border_color": "DEDEDE",
            "profile_sidebar_fill_color": "F0F0F0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": false,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "retweeted_status": {
            "created_at": "Sun Jan 28 11:25:04 +0000 2018",
            "id": 957575248911663104,
            "id_str": "957575248911663104",
            "text": "Fun fact : #ACF is already #gutenberg compatible. I can see my custom fields and it's already perfectly integrated\u2026 https:\/\/t.co\/YKhSn817Ow",
            "truncated": true,
            "entities": {
              "hashtags": [{"text": "ACF", "indices": [11, 15]}, {"text": "gutenberg", "indices": [27, 37]}],
              "symbols": [],
              "user_mentions": [],
              "urls": [{
                "url": "https:\/\/t.co\/YKhSn817Ow",
                "expanded_url": "https:\/\/twitter.com\/i\/web\/status\/957575248911663104",
                "display_url": "twitter.com\/i\/web\/status\/9\u2026",
                "indices": [116, 139]
              }]
            },
            "source": "<a href=\"http:\/\/twitter.com\" rel=\"nofollow\">Twitter Web Client<\/a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
              "id": 16484026,
              "id_str": "16484026",
              "name": "Max \u24cc CapitaineWP",
              "screen_name": "Maximebj",
              "location": "Grenoble (France)",
              "description": "Entrepreneur #WP. Projets https:\/\/t.co\/x3X9pCkQUW \/\/ @delipressio \/\/ @wpchef_ \/\/ @WPInAlps \/\/ https:\/\/t.co\/q7y4tt38AB \/\/ Me https:\/\/t.co\/GL3b52iOCA",
              "url": "https:\/\/t.co\/suS3wOtuAF",
              "entities": {
                "url": {
                  "urls": [{
                    "url": "https:\/\/t.co\/suS3wOtuAF",
                    "expanded_url": "https:\/\/capitainewp.io",
                    "display_url": "capitainewp.io",
                    "indices": [0, 23]
                  }]
                },
                "description": {
                  "urls": [{
                    "url": "https:\/\/t.co\/x3X9pCkQUW",
                    "expanded_url": "http:\/\/www.capitainewp.io",
                    "display_url": "capitainewp.io",
                    "indices": [26, 49]
                  }, {
                    "url": "https:\/\/t.co\/q7y4tt38AB",
                    "expanded_url": "http:\/\/www.xyoos.fr",
                    "display_url": "xyoos.fr",
                    "indices": [94, 117]
                  }, {
                    "url": "https:\/\/t.co\/GL3b52iOCA",
                    "expanded_url": "http:\/\/www.dysign.fr",
                    "display_url": "dysign.fr",
                    "indices": [124, 147]
                  }]
                }
              },
              "protected": false,
              "followers_count": 2419,
              "friends_count": 495,
              "listed_count": 231,
              "created_at": "Sat Sep 27 09:06:58 +0000 2008",
              "favourites_count": 3091,
              "utc_offset": 3600,
              "time_zone": "Paris",
              "geo_enabled": true,
              "verified": false,
              "statuses_count": 7092,
              "lang": "fr",
              "contributors_enabled": false,
              "is_translator": false,
              "is_translation_enabled": false,
              "profile_background_color": "000000",
              "profile_background_image_url": "http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_image_url_https": "https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_tile": false,
              "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/922462608929812480\/vJu-Rmm6_normal.jpg",
              "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/922462608929812480\/vJu-Rmm6_normal.jpg",
              "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/16484026\/1486653903",
              "profile_link_color": "1B95E0",
              "profile_sidebar_border_color": "000000",
              "profile_sidebar_fill_color": "000000",
              "profile_text_color": "000000",
              "profile_use_background_image": false,
              "has_extended_profile": true,
              "default_profile": false,
              "default_profile_image": false,
              "following": false,
              "follow_request_sent": false,
              "notifications": false,
              "translator_type": "none"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 40,
            "favorite_count": 119,
            "favorited": true,
            "retweeted": true,
            "possibly_sensitive": false,
            "lang": "en"
          },
          "is_quote_status": false,
          "retweet_count": 40,
          "favorite_count": 0,
          "favorited": true,
          "retweeted": true,
          "lang": "en"
        }, {
          "created_at": "Tue Jan 23 23:05:43 +0000 2018",
          "id": 955939632968945666,
          "id_str": "955939632968945666",
          "text": "@Joey_Farruggio Sounds like a great idea!",
          "truncated": false,
          "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [{
              "screen_name": "Joey_Farruggio",
              "name": "Joseph Farruggio",
              "id": 2432387185,
              "id_str": "2432387185",
              "indices": [0, 15]
            }],
            "urls": []
          },
          "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
          "in_reply_to_status_id": 955194215067156481,
          "in_reply_to_status_id_str": "955194215067156481",
          "in_reply_to_user_id": 2432387185,
          "in_reply_to_user_id_str": "2432387185",
          "in_reply_to_screen_name": "Joey_Farruggio",
          "user": {
            "id": 28234947,
            "id_str": "28234947",
            "name": "elliot condon",
            "screen_name": "elliotcondon",
            "location": "melbourne, Australia",
            "description": "Web developer specializing in UI & WordPress. Author of the Advanced Custom Fields plugin.",
            "url": "http:\/\/t.co\/KJxHIDNxC2",
            "entities": {
              "url": {
                "urls": [{
                  "url": "http:\/\/t.co\/KJxHIDNxC2",
                  "expanded_url": "http:\/\/www.elliotcondon.com",
                  "display_url": "elliotcondon.com",
                  "indices": [0, 22]
                }]
              }, "description": {"urls": []}
            },
            "protected": false,
            "followers_count": 5376,
            "friends_count": 176,
            "listed_count": 259,
            "created_at": "Thu Apr 02 00:17:19 +0000 2009",
            "favourites_count": 724,
            "utc_offset": -36000,
            "time_zone": "Hawaii",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 3113,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_image_url_https": "https:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_tile": false,
            "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/28234947\/1376825540",
            "profile_link_color": "359ABC",
            "profile_sidebar_border_color": "DEDEDE",
            "profile_sidebar_fill_color": "F0F0F0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": false,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "is_quote_status": false,
          "retweet_count": 0,
          "favorite_count": 0,
          "favorited": false,
          "retweeted": false,
          "lang": "en"
        }, {
          "created_at": "Fri Jan 05 22:53:39 +0000 2018",
          "id": 949413612858228736,
          "id_str": "949413612858228736",
          "text": "@Joey_Farruggio @sarah_edo @vuejs @mor10 @WordPress @wp_acf @jeffrey_way @laracasts @adamwathan @tailwindcss Thanks mate! \ud83c\udf89",
          "truncated": false,
          "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [{
              "screen_name": "Joey_Farruggio",
              "name": "Joseph Farruggio",
              "id": 2432387185,
              "id_str": "2432387185",
              "indices": [0, 15]
            }, {
              "screen_name": "sarah_edo",
              "name": "Sarah Drasner",
              "id": 813333008,
              "id_str": "813333008",
              "indices": [16, 26]
            }, {
              "screen_name": "vuejs",
              "name": "Vue.js",
              "id": 2292889800,
              "id_str": "2292889800",
              "indices": [27, 33]
            }, {
              "screen_name": "mor10",
              "name": "Morten Rand-Hendriksen",
              "id": 14611891,
              "id_str": "14611891",
              "indices": [34, 40]
            }, {
              "screen_name": "WordPress",
              "name": "WordPress",
              "id": 685513,
              "id_str": "685513",
              "indices": [41, 51]
            }, {
              "screen_name": "wp_acf",
              "name": "Advanced Custom Fields",
              "id": 818260039219625985,
              "id_str": "818260039219625985",
              "indices": [52, 59]
            }, {
              "screen_name": "jeffrey_way",
              "name": "Jeffrey Way",
              "id": 99858582,
              "id_str": "99858582",
              "indices": [60, 72]
            }, {
              "screen_name": "laracasts",
              "name": "Laracasts",
              "id": 1333339974,
              "id_str": "1333339974",
              "indices": [73, 83]
            }, {
              "screen_name": "adamwathan",
              "name": "Adam Wathan",
              "id": 716933677,
              "id_str": "716933677",
              "indices": [84, 95]
            }, {
              "screen_name": "tailwindcss",
              "name": "Tailwind CSS",
              "id": 895273477711769600,
              "id_str": "895273477711769600",
              "indices": [96, 108]
            }],
            "urls": []
          },
          "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
          "in_reply_to_status_id": 949355617302601728,
          "in_reply_to_status_id_str": "949355617302601728",
          "in_reply_to_user_id": 2432387185,
          "in_reply_to_user_id_str": "2432387185",
          "in_reply_to_screen_name": "Joey_Farruggio",
          "user": {
            "id": 28234947,
            "id_str": "28234947",
            "name": "elliot condon",
            "screen_name": "elliotcondon",
            "location": "melbourne, Australia",
            "description": "Web developer specializing in UI & WordPress. Author of the Advanced Custom Fields plugin.",
            "url": "http:\/\/t.co\/KJxHIDNxC2",
            "entities": {
              "url": {
                "urls": [{
                  "url": "http:\/\/t.co\/KJxHIDNxC2",
                  "expanded_url": "http:\/\/www.elliotcondon.com",
                  "display_url": "elliotcondon.com",
                  "indices": [0, 22]
                }]
              }, "description": {"urls": []}
            },
            "protected": false,
            "followers_count": 5376,
            "friends_count": 176,
            "listed_count": 259,
            "created_at": "Thu Apr 02 00:17:19 +0000 2009",
            "favourites_count": 724,
            "utc_offset": -36000,
            "time_zone": "Hawaii",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 3113,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_image_url_https": "https:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_tile": false,
            "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/28234947\/1376825540",
            "profile_link_color": "359ABC",
            "profile_sidebar_border_color": "DEDEDE",
            "profile_sidebar_fill_color": "F0F0F0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": false,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "is_quote_status": false,
          "retweet_count": 0,
          "favorite_count": 0,
          "favorited": false,
          "retweeted": false,
          "lang": "en"
        }, {
          "created_at": "Thu Dec 28 04:44:40 +0000 2017",
          "id": 946240459717750785,
          "id_str": "946240459717750785",
          "text": "Wishing you all a very Merry Christmas and happy new year! Here\u2019s a recap of our year at ACF \ud83d\udc40 https:\/\/t.co\/AkZdRkSkwx",
          "truncated": false,
          "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [{
              "url": "https:\/\/t.co\/AkZdRkSkwx",
              "expanded_url": "https:\/\/twitter.com\/wp_acf\/status\/946239894594056192",
              "display_url": "twitter.com\/wp_acf\/status\/\u2026",
              "indices": [95, 118]
            }]
          },
          "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
          "in_reply_to_status_id": null,
          "in_reply_to_status_id_str": null,
          "in_reply_to_user_id": null,
          "in_reply_to_user_id_str": null,
          "in_reply_to_screen_name": null,
          "user": {
            "id": 28234947,
            "id_str": "28234947",
            "name": "elliot condon",
            "screen_name": "elliotcondon",
            "location": "melbourne, Australia",
            "description": "Web developer specializing in UI & WordPress. Author of the Advanced Custom Fields plugin.",
            "url": "http:\/\/t.co\/KJxHIDNxC2",
            "entities": {
              "url": {
                "urls": [{
                  "url": "http:\/\/t.co\/KJxHIDNxC2",
                  "expanded_url": "http:\/\/www.elliotcondon.com",
                  "display_url": "elliotcondon.com",
                  "indices": [0, 22]
                }]
              }, "description": {"urls": []}
            },
            "protected": false,
            "followers_count": 5376,
            "friends_count": 176,
            "listed_count": 259,
            "created_at": "Thu Apr 02 00:17:19 +0000 2009",
            "favourites_count": 724,
            "utc_offset": -36000,
            "time_zone": "Hawaii",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 3113,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_image_url_https": "https:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_tile": false,
            "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/28234947\/1376825540",
            "profile_link_color": "359ABC",
            "profile_sidebar_border_color": "DEDEDE",
            "profile_sidebar_fill_color": "F0F0F0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": false,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "is_quote_status": true,
          "quoted_status_id": 946239894594056192,
          "quoted_status_id_str": "946239894594056192",
          "quoted_status": {
            "created_at": "Thu Dec 28 04:42:25 +0000 2017",
            "id": 946239894594056192,
            "id_str": "946239894594056192",
            "text": "Content, Gutenberg, UI and UX. The ACF Year in Review: Looking back at 2017 and ahead to 2018 with @elliotcondon \ud83c\udf89\ud83c\udf84\ud83d\ude4c https:\/\/t.co\/WK09IFiCyG",
            "truncated": false,
            "entities": {
              "hashtags": [],
              "symbols": [],
              "user_mentions": [{
                "screen_name": "elliotcondon",
                "name": "elliot condon",
                "id": 28234947,
                "id_str": "28234947",
                "indices": [99, 112]
              }],
              "urls": [{
                "url": "https:\/\/t.co\/WK09IFiCyG",
                "expanded_url": "https:\/\/www.advancedcustomfields.com\/blog\/acf-year-review-2017\/",
                "display_url": "advancedcustomfields.com\/blog\/acf-year-\u2026",
                "indices": [117, 140]
              }]
            },
            "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
              "id": 818260039219625985,
              "id_str": "818260039219625985",
              "name": "Advanced Custom Fields",
              "screen_name": "wp_acf",
              "location": "Melbourne, Victoria",
              "description": "A powerful plugin for WordPress developers allowing full control of your content through custom fields.",
              "url": "https:\/\/t.co\/tcAUOAYggi",
              "entities": {
                "url": {
                  "urls": [{
                    "url": "https:\/\/t.co\/tcAUOAYggi",
                    "expanded_url": "https:\/\/www.advancedcustomfields.com\/",
                    "display_url": "advancedcustomfields.com",
                    "indices": [0, 23]
                  }]
                }, "description": {"urls": []}
              },
              "protected": false,
              "followers_count": 1797,
              "friends_count": 58,
              "listed_count": 41,
              "created_at": "Mon Jan 09 00:56:10 +0000 2017",
              "favourites_count": 498,
              "utc_offset": -28800,
              "time_zone": "Pacific Time (US & Canada)",
              "geo_enabled": false,
              "verified": false,
              "statuses_count": 211,
              "lang": "en",
              "contributors_enabled": false,
              "is_translator": false,
              "is_translation_enabled": false,
              "profile_background_color": "000000",
              "profile_background_image_url": "http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_image_url_https": "https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_tile": false,
              "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/950509004479803393\/MCwyxHE6_normal.jpg",
              "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/950509004479803393\/MCwyxHE6_normal.jpg",
              "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/818260039219625985\/1515454098",
              "profile_link_color": "1B95E0",
              "profile_sidebar_border_color": "000000",
              "profile_sidebar_fill_color": "000000",
              "profile_text_color": "000000",
              "profile_use_background_image": false,
              "has_extended_profile": false,
              "default_profile": false,
              "default_profile_image": false,
              "following": true,
              "follow_request_sent": false,
              "notifications": false,
              "translator_type": "none"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 42,
            "favorite_count": 82,
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "lang": "en"
          },
          "retweet_count": 1,
          "favorite_count": 22,
          "favorited": false,
          "retweeted": false,
          "possibly_sensitive": false,
          "lang": "en"
        }, {
          "created_at": "Wed Dec 20 06:08:46 +0000 2017",
          "id": 943362519728455680,
          "id_str": "943362519728455680",
          "text": "RT @wp_acf: New post! \ud83d\ude4c \ud83d\udcdaOrganizing Custom Fields Inside of WordPress with ACF https:\/\/t.co\/dvb4RGOsNc",
          "truncated": false,
          "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [{
              "screen_name": "wp_acf",
              "name": "Advanced Custom Fields",
              "id": 818260039219625985,
              "id_str": "818260039219625985",
              "indices": [3, 10]
            }],
            "urls": [{
              "url": "https:\/\/t.co\/dvb4RGOsNc",
              "expanded_url": "https:\/\/www.advancedcustomfields.com\/blog\/organizing-custom-fields-inside-wordpress-acf\/",
              "display_url": "advancedcustomfields.com\/blog\/organizin\u2026",
              "indices": [79, 102]
            }]
          },
          "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
          "in_reply_to_status_id": null,
          "in_reply_to_status_id_str": null,
          "in_reply_to_user_id": null,
          "in_reply_to_user_id_str": null,
          "in_reply_to_screen_name": null,
          "user": {
            "id": 28234947,
            "id_str": "28234947",
            "name": "elliot condon",
            "screen_name": "elliotcondon",
            "location": "melbourne, Australia",
            "description": "Web developer specializing in UI & WordPress. Author of the Advanced Custom Fields plugin.",
            "url": "http:\/\/t.co\/KJxHIDNxC2",
            "entities": {
              "url": {
                "urls": [{
                  "url": "http:\/\/t.co\/KJxHIDNxC2",
                  "expanded_url": "http:\/\/www.elliotcondon.com",
                  "display_url": "elliotcondon.com",
                  "indices": [0, 22]
                }]
              }, "description": {"urls": []}
            },
            "protected": false,
            "followers_count": 5376,
            "friends_count": 176,
            "listed_count": 259,
            "created_at": "Thu Apr 02 00:17:19 +0000 2009",
            "favourites_count": 724,
            "utc_offset": -36000,
            "time_zone": "Hawaii",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 3113,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_image_url_https": "https:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_tile": false,
            "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/28234947\/1376825540",
            "profile_link_color": "359ABC",
            "profile_sidebar_border_color": "DEDEDE",
            "profile_sidebar_fill_color": "F0F0F0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": false,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "retweeted_status": {
            "created_at": "Wed Dec 20 05:27:10 +0000 2017",
            "id": 943352051135844352,
            "id_str": "943352051135844352",
            "text": "New post! \ud83d\ude4c \ud83d\udcdaOrganizing Custom Fields Inside of WordPress with ACF https:\/\/t.co\/dvb4RGOsNc",
            "truncated": false,
            "entities": {
              "hashtags": [],
              "symbols": [],
              "user_mentions": [],
              "urls": [{
                "url": "https:\/\/t.co\/dvb4RGOsNc",
                "expanded_url": "https:\/\/www.advancedcustomfields.com\/blog\/organizing-custom-fields-inside-wordpress-acf\/",
                "display_url": "advancedcustomfields.com\/blog\/organizin\u2026",
                "indices": [67, 90]
              }]
            },
            "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
              "id": 818260039219625985,
              "id_str": "818260039219625985",
              "name": "Advanced Custom Fields",
              "screen_name": "wp_acf",
              "location": "Melbourne, Victoria",
              "description": "A powerful plugin for WordPress developers allowing full control of your content through custom fields.",
              "url": "https:\/\/t.co\/tcAUOAYggi",
              "entities": {
                "url": {
                  "urls": [{
                    "url": "https:\/\/t.co\/tcAUOAYggi",
                    "expanded_url": "https:\/\/www.advancedcustomfields.com\/",
                    "display_url": "advancedcustomfields.com",
                    "indices": [0, 23]
                  }]
                }, "description": {"urls": []}
              },
              "protected": false,
              "followers_count": 1797,
              "friends_count": 58,
              "listed_count": 41,
              "created_at": "Mon Jan 09 00:56:10 +0000 2017",
              "favourites_count": 498,
              "utc_offset": -28800,
              "time_zone": "Pacific Time (US & Canada)",
              "geo_enabled": false,
              "verified": false,
              "statuses_count": 211,
              "lang": "en",
              "contributors_enabled": false,
              "is_translator": false,
              "is_translation_enabled": false,
              "profile_background_color": "000000",
              "profile_background_image_url": "http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_image_url_https": "https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_tile": false,
              "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/950509004479803393\/MCwyxHE6_normal.jpg",
              "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/950509004479803393\/MCwyxHE6_normal.jpg",
              "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/818260039219625985\/1515454098",
              "profile_link_color": "1B95E0",
              "profile_sidebar_border_color": "000000",
              "profile_sidebar_fill_color": "000000",
              "profile_text_color": "000000",
              "profile_use_background_image": false,
              "has_extended_profile": false,
              "default_profile": false,
              "default_profile_image": false,
              "following": true,
              "follow_request_sent": false,
              "notifications": false,
              "translator_type": "none"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 14,
            "favorite_count": 42,
            "favorited": true,
            "retweeted": true,
            "possibly_sensitive": false,
            "lang": "en"
          },
          "is_quote_status": false,
          "retweet_count": 14,
          "favorite_count": 0,
          "favorited": true,
          "retweeted": true,
          "possibly_sensitive": false,
          "lang": "en"
        }, {
          "created_at": "Fri Dec 08 01:38:21 +0000 2017",
          "id": 938945815413891073,
          "id_str": "938945815413891073",
          "text": "Can\u2019t wait for next year! \ud83d\ude00 Release ACF5 (free) and smash out new features! https:\/\/t.co\/yrgi5VOaSn",
          "truncated": false,
          "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [{
              "url": "https:\/\/t.co\/yrgi5VOaSn",
              "expanded_url": "https:\/\/twitter.com\/wp_acf\/status\/938945241045860358",
              "display_url": "twitter.com\/wp_acf\/status\/\u2026",
              "indices": [76, 99]
            }]
          },
          "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
          "in_reply_to_status_id": null,
          "in_reply_to_status_id_str": null,
          "in_reply_to_user_id": null,
          "in_reply_to_user_id_str": null,
          "in_reply_to_screen_name": null,
          "user": {
            "id": 28234947,
            "id_str": "28234947",
            "name": "elliot condon",
            "screen_name": "elliotcondon",
            "location": "melbourne, Australia",
            "description": "Web developer specializing in UI & WordPress. Author of the Advanced Custom Fields plugin.",
            "url": "http:\/\/t.co\/KJxHIDNxC2",
            "entities": {
              "url": {
                "urls": [{
                  "url": "http:\/\/t.co\/KJxHIDNxC2",
                  "expanded_url": "http:\/\/www.elliotcondon.com",
                  "display_url": "elliotcondon.com",
                  "indices": [0, 22]
                }]
              }, "description": {"urls": []}
            },
            "protected": false,
            "followers_count": 5376,
            "friends_count": 176,
            "listed_count": 259,
            "created_at": "Thu Apr 02 00:17:19 +0000 2009",
            "favourites_count": 724,
            "utc_offset": -36000,
            "time_zone": "Hawaii",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 3113,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_image_url_https": "https:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_tile": false,
            "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/28234947\/1376825540",
            "profile_link_color": "359ABC",
            "profile_sidebar_border_color": "DEDEDE",
            "profile_sidebar_fill_color": "F0F0F0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": false,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "is_quote_status": true,
          "quoted_status_id": 938945241045860358,
          "quoted_status_id_str": "938945241045860358",
          "quoted_status": {
            "created_at": "Fri Dec 08 01:36:04 +0000 2017",
            "id": 938945241045860358,
            "id_str": "938945241045860358",
            "text": "Woo! \ud83c\udf89 In just over 2 months, 50% of websites have updated their ACF add-ons to v2.0.0! Prep for ACF5 (free) is looking good!",
            "truncated": false,
            "entities": {"hashtags": [], "symbols": [], "user_mentions": [], "urls": []},
            "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
              "id": 818260039219625985,
              "id_str": "818260039219625985",
              "name": "Advanced Custom Fields",
              "screen_name": "wp_acf",
              "location": "Melbourne, Victoria",
              "description": "A powerful plugin for WordPress developers allowing full control of your content through custom fields.",
              "url": "https:\/\/t.co\/tcAUOAYggi",
              "entities": {
                "url": {
                  "urls": [{
                    "url": "https:\/\/t.co\/tcAUOAYggi",
                    "expanded_url": "https:\/\/www.advancedcustomfields.com\/",
                    "display_url": "advancedcustomfields.com",
                    "indices": [0, 23]
                  }]
                }, "description": {"urls": []}
              },
              "protected": false,
              "followers_count": 1797,
              "friends_count": 58,
              "listed_count": 41,
              "created_at": "Mon Jan 09 00:56:10 +0000 2017",
              "favourites_count": 498,
              "utc_offset": -28800,
              "time_zone": "Pacific Time (US & Canada)",
              "geo_enabled": false,
              "verified": false,
              "statuses_count": 211,
              "lang": "en",
              "contributors_enabled": false,
              "is_translator": false,
              "is_translation_enabled": false,
              "profile_background_color": "000000",
              "profile_background_image_url": "http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_image_url_https": "https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_tile": false,
              "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/950509004479803393\/MCwyxHE6_normal.jpg",
              "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/950509004479803393\/MCwyxHE6_normal.jpg",
              "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/818260039219625985\/1515454098",
              "profile_link_color": "1B95E0",
              "profile_sidebar_border_color": "000000",
              "profile_sidebar_fill_color": "000000",
              "profile_text_color": "000000",
              "profile_use_background_image": false,
              "has_extended_profile": false,
              "default_profile": false,
              "default_profile_image": false,
              "following": true,
              "follow_request_sent": false,
              "notifications": false,
              "translator_type": "none"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 0,
            "favorite_count": 26,
            "favorited": false,
            "retweeted": false,
            "lang": "en"
          },
          "retweet_count": 0,
          "favorite_count": 19,
          "favorited": false,
          "retweeted": false,
          "possibly_sensitive": false,
          "lang": "en"
        }, {
          "created_at": "Tue Dec 05 03:59:33 +0000 2017",
          "id": 937894183171264512,
          "id_str": "937894183171264512",
          "text": "RT @wp_acf: If you haven\u2019t yet tried ACF, this one is for you! \ud83c\udf81 A Beginner\u2019s Guide to Advanced Custom Fields https:\/\/t.co\/dv6mdwFoHR",
          "truncated": false,
          "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [{
              "screen_name": "wp_acf",
              "name": "Advanced Custom Fields",
              "id": 818260039219625985,
              "id_str": "818260039219625985",
              "indices": [3, 10]
            }],
            "urls": [{
              "url": "https:\/\/t.co\/dv6mdwFoHR",
              "expanded_url": "https:\/\/www.advancedcustomfields.com\/blog\/beginners-guide-advanced-custom-fields\/",
              "display_url": "advancedcustomfields.com\/blog\/beginners\u2026",
              "indices": [110, 133]
            }]
          },
          "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
          "in_reply_to_status_id": null,
          "in_reply_to_status_id_str": null,
          "in_reply_to_user_id": null,
          "in_reply_to_user_id_str": null,
          "in_reply_to_screen_name": null,
          "user": {
            "id": 28234947,
            "id_str": "28234947",
            "name": "elliot condon",
            "screen_name": "elliotcondon",
            "location": "melbourne, Australia",
            "description": "Web developer specializing in UI & WordPress. Author of the Advanced Custom Fields plugin.",
            "url": "http:\/\/t.co\/KJxHIDNxC2",
            "entities": {
              "url": {
                "urls": [{
                  "url": "http:\/\/t.co\/KJxHIDNxC2",
                  "expanded_url": "http:\/\/www.elliotcondon.com",
                  "display_url": "elliotcondon.com",
                  "indices": [0, 22]
                }]
              }, "description": {"urls": []}
            },
            "protected": false,
            "followers_count": 5376,
            "friends_count": 176,
            "listed_count": 259,
            "created_at": "Thu Apr 02 00:17:19 +0000 2009",
            "favourites_count": 724,
            "utc_offset": -36000,
            "time_zone": "Hawaii",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 3113,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_image_url_https": "https:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_tile": false,
            "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/28234947\/1376825540",
            "profile_link_color": "359ABC",
            "profile_sidebar_border_color": "DEDEDE",
            "profile_sidebar_fill_color": "F0F0F0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": false,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "retweeted_status": {
            "created_at": "Tue Dec 05 03:56:40 +0000 2017",
            "id": 937893460253667334,
            "id_str": "937893460253667334",
            "text": "If you haven\u2019t yet tried ACF, this one is for you! \ud83c\udf81 A Beginner\u2019s Guide to Advanced Custom Fields https:\/\/t.co\/dv6mdwFoHR",
            "truncated": false,
            "entities": {
              "hashtags": [],
              "symbols": [],
              "user_mentions": [],
              "urls": [{
                "url": "https:\/\/t.co\/dv6mdwFoHR",
                "expanded_url": "https:\/\/www.advancedcustomfields.com\/blog\/beginners-guide-advanced-custom-fields\/",
                "display_url": "advancedcustomfields.com\/blog\/beginners\u2026",
                "indices": [98, 121]
              }]
            },
            "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
              "id": 818260039219625985,
              "id_str": "818260039219625985",
              "name": "Advanced Custom Fields",
              "screen_name": "wp_acf",
              "location": "Melbourne, Victoria",
              "description": "A powerful plugin for WordPress developers allowing full control of your content through custom fields.",
              "url": "https:\/\/t.co\/tcAUOAYggi",
              "entities": {
                "url": {
                  "urls": [{
                    "url": "https:\/\/t.co\/tcAUOAYggi",
                    "expanded_url": "https:\/\/www.advancedcustomfields.com\/",
                    "display_url": "advancedcustomfields.com",
                    "indices": [0, 23]
                  }]
                }, "description": {"urls": []}
              },
              "protected": false,
              "followers_count": 1797,
              "friends_count": 58,
              "listed_count": 41,
              "created_at": "Mon Jan 09 00:56:10 +0000 2017",
              "favourites_count": 498,
              "utc_offset": -28800,
              "time_zone": "Pacific Time (US & Canada)",
              "geo_enabled": false,
              "verified": false,
              "statuses_count": 211,
              "lang": "en",
              "contributors_enabled": false,
              "is_translator": false,
              "is_translation_enabled": false,
              "profile_background_color": "000000",
              "profile_background_image_url": "http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_image_url_https": "https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_tile": false,
              "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/950509004479803393\/MCwyxHE6_normal.jpg",
              "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/950509004479803393\/MCwyxHE6_normal.jpg",
              "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/818260039219625985\/1515454098",
              "profile_link_color": "1B95E0",
              "profile_sidebar_border_color": "000000",
              "profile_sidebar_fill_color": "000000",
              "profile_text_color": "000000",
              "profile_use_background_image": false,
              "has_extended_profile": false,
              "default_profile": false,
              "default_profile_image": false,
              "following": true,
              "follow_request_sent": false,
              "notifications": false,
              "translator_type": "none"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 11,
            "favorite_count": 33,
            "favorited": true,
            "retweeted": true,
            "possibly_sensitive": false,
            "lang": "en"
          },
          "is_quote_status": false,
          "retweet_count": 11,
          "favorite_count": 0,
          "favorited": true,
          "retweeted": true,
          "possibly_sensitive": false,
          "lang": "en"
        }, {
          "created_at": "Mon Dec 04 01:26:32 +0000 2017",
          "id": 937493290416345088,
          "id_str": "937493290416345088",
          "text": "RT @wp_acf: New Release! \ud83d\udc1e\ud83d\udc1e\ud83d\udd28 ACF PRO 5.6.7 fixed an assortment of bugs found in 5.6.6 https:\/\/t.co\/kdRoW6QZxH",
          "truncated": false,
          "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [{
              "screen_name": "wp_acf",
              "name": "Advanced Custom Fields",
              "id": 818260039219625985,
              "id_str": "818260039219625985",
              "indices": [3, 10]
            }],
            "urls": [{
              "url": "https:\/\/t.co\/kdRoW6QZxH",
              "expanded_url": "https:\/\/www.advancedcustomfields.com\/blog\/acf-pro-5-6-7-update\/",
              "display_url": "advancedcustomfields.com\/blog\/acf-pro-5\u2026",
              "indices": [86, 109]
            }]
          },
          "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
          "in_reply_to_status_id": null,
          "in_reply_to_status_id_str": null,
          "in_reply_to_user_id": null,
          "in_reply_to_user_id_str": null,
          "in_reply_to_screen_name": null,
          "user": {
            "id": 28234947,
            "id_str": "28234947",
            "name": "elliot condon",
            "screen_name": "elliotcondon",
            "location": "melbourne, Australia",
            "description": "Web developer specializing in UI & WordPress. Author of the Advanced Custom Fields plugin.",
            "url": "http:\/\/t.co\/KJxHIDNxC2",
            "entities": {
              "url": {
                "urls": [{
                  "url": "http:\/\/t.co\/KJxHIDNxC2",
                  "expanded_url": "http:\/\/www.elliotcondon.com",
                  "display_url": "elliotcondon.com",
                  "indices": [0, 22]
                }]
              }, "description": {"urls": []}
            },
            "protected": false,
            "followers_count": 5376,
            "friends_count": 176,
            "listed_count": 259,
            "created_at": "Thu Apr 02 00:17:19 +0000 2009",
            "favourites_count": 724,
            "utc_offset": -36000,
            "time_zone": "Hawaii",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 3113,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_image_url_https": "https:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_tile": false,
            "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/28234947\/1376825540",
            "profile_link_color": "359ABC",
            "profile_sidebar_border_color": "DEDEDE",
            "profile_sidebar_fill_color": "F0F0F0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": false,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "retweeted_status": {
            "created_at": "Mon Dec 04 01:11:15 +0000 2017",
            "id": 937489441853018112,
            "id_str": "937489441853018112",
            "text": "New Release! \ud83d\udc1e\ud83d\udc1e\ud83d\udd28 ACF PRO 5.6.7 fixed an assortment of bugs found in 5.6.6 https:\/\/t.co\/kdRoW6QZxH",
            "truncated": false,
            "entities": {
              "hashtags": [],
              "symbols": [],
              "user_mentions": [],
              "urls": [{
                "url": "https:\/\/t.co\/kdRoW6QZxH",
                "expanded_url": "https:\/\/www.advancedcustomfields.com\/blog\/acf-pro-5-6-7-update\/",
                "display_url": "advancedcustomfields.com\/blog\/acf-pro-5\u2026",
                "indices": [74, 97]
              }]
            },
            "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
              "id": 818260039219625985,
              "id_str": "818260039219625985",
              "name": "Advanced Custom Fields",
              "screen_name": "wp_acf",
              "location": "Melbourne, Victoria",
              "description": "A powerful plugin for WordPress developers allowing full control of your content through custom fields.",
              "url": "https:\/\/t.co\/tcAUOAYggi",
              "entities": {
                "url": {
                  "urls": [{
                    "url": "https:\/\/t.co\/tcAUOAYggi",
                    "expanded_url": "https:\/\/www.advancedcustomfields.com\/",
                    "display_url": "advancedcustomfields.com",
                    "indices": [0, 23]
                  }]
                }, "description": {"urls": []}
              },
              "protected": false,
              "followers_count": 1797,
              "friends_count": 58,
              "listed_count": 41,
              "created_at": "Mon Jan 09 00:56:10 +0000 2017",
              "favourites_count": 498,
              "utc_offset": -28800,
              "time_zone": "Pacific Time (US & Canada)",
              "geo_enabled": false,
              "verified": false,
              "statuses_count": 211,
              "lang": "en",
              "contributors_enabled": false,
              "is_translator": false,
              "is_translation_enabled": false,
              "profile_background_color": "000000",
              "profile_background_image_url": "http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_image_url_https": "https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
              "profile_background_tile": false,
              "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/950509004479803393\/MCwyxHE6_normal.jpg",
              "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/950509004479803393\/MCwyxHE6_normal.jpg",
              "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/818260039219625985\/1515454098",
              "profile_link_color": "1B95E0",
              "profile_sidebar_border_color": "000000",
              "profile_sidebar_fill_color": "000000",
              "profile_text_color": "000000",
              "profile_use_background_image": false,
              "has_extended_profile": false,
              "default_profile": false,
              "default_profile_image": false,
              "following": true,
              "follow_request_sent": false,
              "notifications": false,
              "translator_type": "none"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 7,
            "favorite_count": 19,
            "favorited": true,
            "retweeted": true,
            "possibly_sensitive": false,
            "lang": "en"
          },
          "is_quote_status": false,
          "retweet_count": 7,
          "favorite_count": 0,
          "favorited": true,
          "retweeted": true,
          "possibly_sensitive": false,
          "lang": "en"
        }, {
          "created_at": "Thu Nov 30 21:55:29 +0000 2017",
          "id": 936353011248513024,
          "id_str": "936353011248513024",
          "text": "@elliottmangham @wp_acf Hi Elliot. Checkout the Button Group docs for a screenshot showing the icon HTML choices https:\/\/t.co\/11riISNxj0 \ud83d\udc4d",
          "truncated": false,
          "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [{
              "screen_name": "elliottmangham",
              "name": "Elliott Mangham",
              "id": 118424010,
              "id_str": "118424010",
              "indices": [0, 15]
            }, {
              "screen_name": "wp_acf",
              "name": "Advanced Custom Fields",
              "id": 818260039219625985,
              "id_str": "818260039219625985",
              "indices": [16, 23]
            }],
            "urls": [{
              "url": "https:\/\/t.co\/11riISNxj0",
              "expanded_url": "https:\/\/www.advancedcustomfields.com\/resources\/button-group\/",
              "display_url": "advancedcustomfields.com\/resources\/butt\u2026",
              "indices": [113, 136]
            }]
          },
          "source": "<a href=\"http:\/\/itunes.apple.com\/us\/app\/twitter\/id409789998?mt=12\" rel=\"nofollow\">Twitter for Mac<\/a>",
          "in_reply_to_status_id": 936161793063505921,
          "in_reply_to_status_id_str": "936161793063505921",
          "in_reply_to_user_id": 118424010,
          "in_reply_to_user_id_str": "118424010",
          "in_reply_to_screen_name": "elliottmangham",
          "user": {
            "id": 28234947,
            "id_str": "28234947",
            "name": "elliot condon",
            "screen_name": "elliotcondon",
            "location": "melbourne, Australia",
            "description": "Web developer specializing in UI & WordPress. Author of the Advanced Custom Fields plugin.",
            "url": "http:\/\/t.co\/KJxHIDNxC2",
            "entities": {
              "url": {
                "urls": [{
                  "url": "http:\/\/t.co\/KJxHIDNxC2",
                  "expanded_url": "http:\/\/www.elliotcondon.com",
                  "display_url": "elliotcondon.com",
                  "indices": [0, 22]
                }]
              }, "description": {"urls": []}
            },
            "protected": false,
            "followers_count": 5376,
            "friends_count": 176,
            "listed_count": 259,
            "created_at": "Thu Apr 02 00:17:19 +0000 2009",
            "favourites_count": 724,
            "utc_offset": -36000,
            "time_zone": "Hawaii",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 3113,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "131516",
            "profile_background_image_url": "http:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_image_url_https": "https:\/\/pbs.twimg.com\/profile_background_images\/581268568\/nvnjlw8oybev426drlyu.jpeg",
            "profile_background_tile": false,
            "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/476516720463446016\/cg5AyxHm_normal.png",
            "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/28234947\/1376825540",
            "profile_link_color": "359ABC",
            "profile_sidebar_border_color": "DEDEDE",
            "profile_sidebar_fill_color": "F0F0F0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": false,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "none"
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "is_quote_status": false,
          "retweet_count": 0,
          "favorite_count": 0,
          "favorited": false,
          "retweeted": false,
          "possibly_sensitive": false,
          "lang": "en"
        },
        ]
      };
      // $posts.each(function (i) {
      //
      //   // vars
      //   if (!json.tweets[i]) {
      //     $(this).hide();
      //     return;
      //   }
      //   var tweet = ify.clean(json.tweets[i].text);
      //
      //
      //   // updaet html
      //   $(this).find('p').html(tweet);
      //
      // });


    }

  });


  /**
   * The Twitalinkahashifyer!
   * http://www.dustindiaz.com/basement/ify.html
   * Eg:
   * ify.clean('your tweet text');
   */

  var ify = {
    link: function (tweet) {
      return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function (link, m1, m2, m3, m4) {
        var http = m2.match(/w/) ? 'http://' : '';
        return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
      });
    },

    at: function (tweet) {
      return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function (m, username) {
        return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
      });
    },

    list: function (tweet) {
      return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function (m, userlist) {
        return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
      });
    },

    hash: function (tweet) {
      return tweet.replace(/(^|\s+)#(\w+)/gi, function (m, before, hash) {
        return before + '<a target="_blank" class="tag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
      });
    },

    clean: function (tweet) {
      return this.hash(this.at(this.list(this.link(tweet))));
    }
  } // ify


  /*
*  prism
*
*  This model sets up all related functionlaity
*
*  @type	model
*  @date	10/02/2015
*  @since	5.1.5
*
*  @param	n/a
*  @return	n/a
*/

  theme.prism = model.extend({

    // events
    events: {
      'ready': 'ready',
      'click .pre-title': 'toggle'
    },

    toggle: function (e) {

      // vars
      $code = e.$el.parent();


      // classes
      if ($code.hasClass('closed')) {

        $code.removeClass('closed');

      } else {

        $code.addClass('closed');

      }

    },

    ready: function () {

      // prism
      $('pre code').each(function () {

        // vars
        var lang = 'default',
          html = $(this).html();


        // trim (removes odd blank line)
        html = html.trim();


        // update
        $(this).html(html);


        // detect language
        if (html.indexOf('php') !== false) {

          lang = 'php';

        }


        // add class for prism
        $(this).addClass('language-' + lang);

      });

    }

  });

})(jQuery);

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+php */
self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
var Prism = function () {
  var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i, t = self.Prism = {
    util: {
      encode: function (e) {
        return e instanceof n ? new n(e.type, t.util.encode(e.content)) : "Array" === t.util.type(e) ? e.map(t.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
      }, type: function (e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
      }, clone: function (e) {
        var n = t.util.type(e);
        switch (n) {
          case"Object":
            var r = {};
            for (var a in e) e.hasOwnProperty(a) && (r[a] = t.util.clone(e[a]));
            return r;
          case"Array":
            return e.slice()
        }
        return e
      }
    }, languages: {
      extend: function (e, n) {
        var r = t.util.clone(t.languages[e]);
        for (var a in n) r[a] = n[a];
        return r
      }, insertBefore: function (e, n, r, a) {
        a = a || t.languages;
        var i = a[e], o = {};
        for (var l in i) if (i.hasOwnProperty(l)) {
          if (l == n) for (var s in r) r.hasOwnProperty(s) && (o[s] = r[s]);
          o[l] = i[l]
        }
        return a[e] = o
      }, DFS: function (e, n) {
        for (var r in e) n.call(e, r, e[r]), "Object" === t.util.type(e) && t.languages.DFS(e[r], n)
      }
    }, highlightAll: function (e, n) {
      for (var r, a = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; r = a[i++];) t.highlightElement(r, e === !0, n)
    }, highlightElement: function (r, a, i) {
      for (var o, l, s = r; s && !e.test(s.className);) s = s.parentNode;
      if (s && (o = (s.className.match(e) || [, ""])[1], l = t.languages[o]), l) {
        r.className = r.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o, s = r.parentNode, /pre/i.test(s.nodeName) && (s.className = s.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o);
        var c = r.textContent;
        if (c) {
          var g = {element: r, language: o, grammar: l, code: c};
          if (t.hooks.run("before-highlight", g), a && self.Worker) {
            var u = new Worker(t.filename);
            u.onmessage = function (e) {
              g.highlightedCode = n.stringify(JSON.parse(e.data), o), t.hooks.run("before-insert", g), g.element.innerHTML = g.highlightedCode, i && i.call(g.element), t.hooks.run("after-highlight", g)
            }, u.postMessage(JSON.stringify({language: g.language, code: g.code}))
          } else g.highlightedCode = t.highlight(g.code, g.grammar, g.language), t.hooks.run("before-insert", g), g.element.innerHTML = g.highlightedCode, i && i.call(r), t.hooks.run("after-highlight", g)
        }
      }
    }, highlight: function (e, r, a) {
      var i = t.tokenize(e, r);
      return n.stringify(t.util.encode(i), a)
    }, tokenize: function (e, n) {
      var r = t.Token, a = [e], i = n.rest;
      if (i) {
        for (var o in i) n[o] = i[o];
        delete n.rest
      }
      e:for (var o in n) if (n.hasOwnProperty(o) && n[o]) {
        var l = n[o], s = l.inside, c = !!l.lookbehind, g = 0;
        l = l.pattern || l;
        for (var u = 0; u < a.length; u++) {
          var f = a[u];
          if (a.length > e.length) break e;
          if (!(f instanceof r)) {
            l.lastIndex = 0;
            var h = l.exec(f);
            if (h) {
              c && (g = h[1].length);
              var d = h.index - 1 + g, h = h[0].slice(g), p = h.length, m = d + p, v = f.slice(0, d + 1),
                y = f.slice(m + 1), k = [u, 1];
              v && k.push(v);
              var b = new r(o.split("#")[0], s ? t.tokenize(h, s) : h);
              k.push(b), y && k.push(y), Array.prototype.splice.apply(a, k)
            }
          }
        }
      }
      return a
    }, hooks: {
      all: {}, add: function (e, n) {
        var r = t.hooks.all;
        r[e] = r[e] || [], r[e].push(n)
      }, run: function (e, n) {
        var r = t.hooks.all[e];
        if (r && r.length) for (var a, i = 0; a = r[i++];) a(n)
      }
    }
  }, n = t.Token = function (e, t) {
    this.type = e, this.content = t
  };
  if (n.stringify = function (e, r, a) {
      if ("string" == typeof e) return e;
      if ("[object Array]" == Object.prototype.toString.call(e)) return e.map(function (t) {
        return n.stringify(t, r, e)
      }).join("");
      var i = {
        type: e.type,
        content: n.stringify(e.content, r, a),
        tag: "span",
        classes: ["token", e.type],
        attributes: {},
        language: r,
        parent: a
      };
      "comment" == i.type && (i.attributes.spellcheck = "true"), t.hooks.run("wrap", i);
      var o = "";
      for (var l in i.attributes) o += l + '="' + (i.attributes[l] || "") + '"';
      return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + o + ">" + i.content + "</" + i.tag + ">"
    }, !self.document) return self.addEventListener ? (self.addEventListener("message", function (e) {
    var n = JSON.parse(e.data), r = n.language, a = n.code;
    self.postMessage(JSON.stringify(t.tokenize(a, t.languages[r]))), self.close()
  }, !1), self.Prism) : self.Prism;
  var r = document.getElementsByTagName("script");
  return r = r[r.length - 1], r && (t.filename = r.src, document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)), self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism);
;
Prism.languages.markup = {
  comment: /<!--[\w\W]*?-->/g,
  prolog: /<\?.+?\?>/,
  doctype: /<!DOCTYPE.+?>/,
  cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
  tag: {
    pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
    inside: {
      tag: {pattern: /^<\/?[\w:-]+/i, inside: {punctuation: /^<\/?/, namespace: /^[\w-]+?:/}},
      "attr-value": {pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi, inside: {punctuation: /=|>|"/g}},
      punctuation: /\/?>/g,
      "attr-name": {pattern: /[\w:-]+/g, inside: {namespace: /^[\w-]+?:/}}
    }
  },
  entity: /\&#?[\da-z]{1,8};/gi
}, Prism.hooks.add("wrap", function (t) {
  "entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"))
});
;
Prism.languages.css = {
  comment: /\/\*[\w\W]*?\*\//g,
  atrule: {pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi, inside: {punctuation: /[;:]/g}},
  url: /url\((["']?).*?\1\)/gi,
  selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
  property: /(\b|\B)[\w-]+(?=\s*:)/gi,
  string: /("|')(\\?.)*?\1/g,
  important: /\B!important\b/gi,
  punctuation: /[\{\};:]/g,
  "function": /[-a-z0-9]+(?=\()/gi
}, Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
  style: {
    pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
    inside: {
      tag: {pattern: /<style[\w\W]*?>|<\/style>/gi, inside: Prism.languages.markup.tag.inside},
      rest: Prism.languages.css
    }
  }
});
;
Prism.languages.clike = {
  comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g, lookbehind: !0},
  string: /("|')(\\?.)*?\1/g,
  "class-name": {
    pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
    lookbehind: !0,
    inside: {punctuation: /(\.|\\)/}
  },
  keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
  "boolean": /\b(true|false)\b/g,
  "function": {pattern: /[a-z0-9_]+\(/gi, inside: {punctuation: /\(/}},
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
  operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
  ignore: /&(lt|gt|amp);/gi,
  punctuation: /[{}[\];(),.:]/g
};
;
Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
}), Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: !0
  }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
  script: {
    pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi,
    inside: {
      tag: {pattern: /<script[\w\W]*?>|<\/script>/gi, inside: Prism.languages.markup.tag.inside},
      rest: Prism.languages.javascript
    }
  }
});
;
Prism.languages.php = Prism.languages.extend("clike", {
  keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi,
  constant: /\b[A-Z0-9_]{2,}\b/g,
  comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g, lookbehind: !0}
}), Prism.languages.insertBefore("php", "keyword", {
  delimiter: /(\?>|<\?php|<\?)/gi,
  variable: /(\$\w+)\b/gi,
  "package": {pattern: /(\\|namespace\s+|use\s+)[\w\\]+/g, lookbehind: !0, inside: {punctuation: /\\/}}
}), Prism.languages.insertBefore("php", "operator", {
  property: {
    pattern: /(->)[\w]+/g,
    lookbehind: !0
  }
}), Prism.languages.markup && (Prism.hooks.add("before-highlight", function (e) {
  "php" === e.language && (e.tokenStack = [], e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function (n) {
    return e.tokenStack.push(n), "{{{PHP" + e.tokenStack.length + "}}}"
  }))
}), Prism.hooks.add("after-highlight", function (e) {
  if ("php" === e.language) {
    for (var n, a = 0; n = e.tokenStack[a]; a++) e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (a + 1) + "}}}", Prism.highlight(n, e.grammar, "php"));
    e.element.innerHTML = e.highlightedCode
  }
}), Prism.hooks.add("wrap", function (e) {
  "php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'))
}), Prism.languages.insertBefore("php", "comment", {
  markup: {
    pattern: /<[^?]\/?(.*?)>/g,
    inside: Prism.languages.markup
  }, php: /\{\{\{PHP[0-9]+\}\}\}/g
}));
;


