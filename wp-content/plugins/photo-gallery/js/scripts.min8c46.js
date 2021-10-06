var bwg_current_filmstrip_pos,
  total_thumbnail_count,
  key,
  startPoint,
  endPoint,
  bwg_image_info_pos,
  filmstrip_width,
  preloadCount,
  filmstrip_thumbnail_width,
  filmstrip_thumbnail_height,
  addthis_share,
  lightbox_comment_pos,
  bwg_transition_duration,
  bwg_playInterval,
  isPopUpOpened = !1,
  bwg_overflow_initial_value = !1,
  bwg_overflow_x_initial_value = !1,
  bwg_overflow_y_initial_value = !1;
function gallery_box_ready() {
  (filmstrip_thumbnail_width = jQuery(".bwg_filmstrip_thumbnail").width()),
    (filmstrip_thumbnail_height = jQuery(".bwg_filmstrip_thumbnail").height()),
    1 == gallery_box_data.open_with_fullscreen
      ? ((filmstrip_width = jQuery(window).width()),
        (filmstrip_height = jQuery(window).height()))
      : ((filmstrip_width = jQuery(".bwg_filmstrip_container").width()),
        (filmstrip_height = jQuery(".bwg_filmstrip_container").height())),
    (preloadCount =
      "horizontal" == gallery_box_data.filmstrip_direction
        ? parseInt(filmstrip_width / filmstrip_thumbnail_width) +
          gallery_box_data.preload_images_count
        : parseInt(filmstrip_height / filmstrip_thumbnail_height) +
          gallery_box_data.preload_images_count),
    (total_thumbnail_count = jQuery(".bwg_filmstrip_thumbnail").length),
    (key = parseInt(jQuery("#bwg_current_image_key").val())),
    (startPoint = 0),
    (endPoint = key + preloadCount),
    jQuery(function () {
      bwg_load_visible_images(key, preloadCount, total_thumbnail_count),
        jQuery(".pge_tabs li a").on("click", function () {
          return (
            jQuery(".pge_tabs_container > div").hide(),
            jQuery(".pge_tabs li").removeClass("pge_active"),
            jQuery(jQuery(this).attr("href")).show(),
            jQuery(this).closest("li").addClass("pge_active"),
            jQuery("[name=type]").val(jQuery(this).attr("href").substr(1)),
            !1
          );
        });
      var e = jQuery("#bwg_rated").attr("data-params");
      bwg_rating(
        (e = JSON.parse(e)).current_rate,
        e.current_rate_count,
        e.current_avg_rating,
        e.current_image_key
      );
    }),
    1 == gallery_box_data.is_pro &&
      1 == gallery_box_data.enable_addthis &&
      gallery_box_data.addthis_profile_id &&
      (addthis_share = { url: gallery_box_data.share_url }),
    (lightbox_comment_pos = gallery_box_data.lightbox_comment_pos),
    (bwg_image_info_pos = jQuery(".bwg_ctrl_btn_container").length
      ? jQuery(".bwg_ctrl_btn_container").height()
      : 0),
    (bwg_transition_duration =
      gallery_box_data.slideshow_interval <
        4 * gallery_box_data.slideshow_effect_duration &&
      0 != gallery_box_data.slideshow_interval
        ? (1e3 * gallery_box_data.slideshow_interval) / 4
        : 1e3 * gallery_box_data.slideshow_effect_duration),
    (gallery_box_data.bwg_transition_duration = bwg_transition_duration),
    (gallery_box_data.bwg_trans_in_progress = !1),
    (jQuery("#spider_popup_wrap").width() >= jQuery(window).width() ||
      jQuery("#spider_popup_wrap").height() >= jQuery(window).height()) &&
      jQuery(".spider_popup_close").attr(
        "class",
        "bwg_ctrl_btn spider_popup_close_fullscreen"
      ),
    window.clearInterval(bwg_playInterval),
    (bwg_current_filmstrip_pos = gallery_box_data.current_pos),
    jQuery(document).on("keydown", function (e) {
      jQuery("#bwg_name").is(":focus") ||
        jQuery("#bwg_email").is(":focus") ||
        jQuery("#bwg_comment").is(":focus") ||
        jQuery("#bwg_captcha_input").is(":focus") ||
        ("ArrowRight" == e.key
          ? parseInt(jQuery("#bwg_current_image_key").val()) ==
            gallery_box_data.data.length - 1
            ? bwg_change_image(
                parseInt(jQuery("#bwg_current_image_key").val()),
                0
              )
            : bwg_change_image(
                parseInt(jQuery("#bwg_current_image_key").val()),
                parseInt(jQuery("#bwg_current_image_key").val()) + 1
              )
          : "ArrowLeft" == e.key
          ? 0 == parseInt(jQuery("#bwg_current_image_key").val())
            ? bwg_change_image(
                parseInt(jQuery("#bwg_current_image_key").val()),
                gallery_box_data.data.length - 1
              )
            : bwg_change_image(
                parseInt(jQuery("#bwg_current_image_key").val()),
                parseInt(jQuery("#bwg_current_image_key").val()) - 1
              )
          : "Escape" == e.key
          ? spider_destroypopup(1e3)
          : "Space" == e.key && jQuery(".bwg_play_pause").trigger("click"));
    }),
    jQuery(window).resize(function () {
      void 0 !== jQuery().fullscreen &&
        jQuery.isFunction(jQuery().fullscreen) &&
        (jQuery.fullscreen.isFullScreen() || bwg_popup_resize());
    });
  var r = gallery_box_data.image_width,
    _ = gallery_box_data.image_height;
  if (1 == gallery_box_data.is_pro) {
    1 == gallery_box_data.enable_addthis &&
      gallery_box_data.addthis_profile_id &&
      jQuery(".at4-share-outer").show(),
      spider_set_input_value("rate_ajax_task", "save_hit_count"),
      spider_rate_ajax_save("bwg_rate_form");
    var e = gallery_box_data.data,
      t = gallery_box_data.current_image_key;
    jQuery(".bwg_image_hits span").html(++e[t].hit_count);
    var i = window.location.hash;
    (i && "-1" != i.indexOf("bwg")) ||
      (location.replace(
        "#bwg" +
          gallery_box_data.gallery_id +
          "/" +
          gallery_box_data.current_image_id
      ),
      history.replaceState(
        void 0,
        void 0,
        "#bwg" +
          gallery_box_data.gallery_id +
          "/" +
          gallery_box_data.current_image_id
      ));
  }
  1 == gallery_box_data.image_right_click &&
    (jQuery(".bwg_image_wrap").bind("contextmenu", function (e) {
      return !1;
    }),
    jQuery(".bwg_image_wrap").css("webkitTouchCallout", "none")),
    jQuery("#spider_popup_wrap").bind("touchmove", function (e) {
      e.preventDefault();
    }),
    void 0 !== jQuery().swiperight &&
      jQuery.isFunction(jQuery().swiperight) &&
      jQuery("#spider_popup_wrap .bwg_image_wrap").swiperight(function () {
        return (
          bwg_change_image(
            parseInt(jQuery("#bwg_current_image_key").val()),
            (parseInt(jQuery("#bwg_current_image_key").val()) +
              gallery_box_data.data.length -
              1) %
              gallery_box_data.data.length
          ),
          !1
        );
      }),
    void 0 !== jQuery().swipeleft &&
      jQuery.isFunction(jQuery().swipeleft) &&
      jQuery("#spider_popup_wrap .bwg_image_wrap").swipeleft(function () {
        return (
          bwg_change_image(
            parseInt(jQuery("#bwg_current_image_key").val()),
            (parseInt(jQuery("#bwg_current_image_key").val()) + 1) %
              gallery_box_data.data.length
          ),
          !1
        );
      }),
    bwg_reset_zoom();
  var a = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase()
  )
    ? "touchend"
    : "click";
  jQuery("#spider_popup_left").on(a, function () {
    return (
      bwg_change_image(
        parseInt(jQuery("#bwg_current_image_key").val()),
        (parseInt(jQuery("#bwg_current_image_key").val()) +
          gallery_box_data.data.length -
          1) %
          gallery_box_data.data.length
      ),
      !1
    );
  }),
    jQuery("#spider_popup_right").on(a, function () {
      return (
        bwg_change_image(
          parseInt(jQuery("#bwg_current_image_key").val()),
          (parseInt(jQuery("#bwg_current_image_key").val()) + 1) %
            gallery_box_data.data.length
        ),
        !1
      );
    }),
    -1 != navigator.appVersion.indexOf("MSIE 10") ||
    -1 != navigator.appVersion.indexOf("MSIE 9")
      ? setTimeout(function () {
          bwg_popup_resize();
        }, 1)
      : bwg_popup_resize(),
    jQuery(".bwg_watermark").css({ display: "none" }),
    setTimeout(function () {
      bwg_change_watermark_container();
    }, 500),
    void 0 !== jQuery().fullscreen &&
      jQuery.isFunction(jQuery().fullscreen) &&
      (jQuery.fullscreen.isNativelySupported() ||
        jQuery(".bwg_fullscreen").hide()),
    "horizontal" == gallery_box_data.filmstrip_direction
      ? (jQuery(".bwg_image_container").height(
          jQuery(".bwg_image_wrap").height() -
            gallery_box_data.image_filmstrip_height
        ),
        jQuery(".bwg_image_container").width(jQuery(".bwg_image_wrap").width()))
      : (jQuery(".bwg_image_container").height(
          jQuery(".bwg_image_wrap").height()
        ),
        jQuery(".bwg_image_container").width(
          jQuery(".bwg_image_wrap").width() -
            gallery_box_data.image_filmstrip_width
        )),
    void 0 !== jQuery().mCustomScrollbar &&
      jQuery.isFunction(jQuery().mCustomScrollbar) &&
      jQuery(
        ".bwg_comments,.bwg_ecommerce_panel, .bwg_image_info"
      ).mCustomScrollbar({
        scrollInertia: 150,
        advanced: { updateOnContentResize: !0 },
      });
  var s = /Firefox/i.test(navigator.userAgent)
    ? "DOMMouseScroll"
    : "mousewheel";
  jQuery(".bwg_filmstrip").on(s, function (e) {
    var t = window.event || e,
      i = (t = t.originalEvent ? t.originalEvent : t).detail
        ? -40 * t.detail
        : t.wheelDelta,
      a = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent.toLowerCase()
      );
    0 < i
      ? jQuery(".bwg_filmstrip_left").trigger(a ? "touchend" : "click")
      : jQuery(".bwg_filmstrip_right").trigger(a ? "touchend" : "click");
  }),
    jQuery(".bwg_filmstrip_right").on(a, function () {
      jQuery(".bwg_filmstrip_thumbnails").stop(!0, !1),
        "left" == gallery_box_data.left_or_top
          ? "width" == gallery_box_data.width_or_height
            ? (jQuery(".bwg_filmstrip_thumbnails").position().left >=
                -(
                  jQuery(".bwg_filmstrip_thumbnails").width() -
                  jQuery(".bwg_filmstrip").width()
                ) &&
                (jQuery(".bwg_filmstrip_left").css({ opacity: 1 }),
                jQuery(".bwg_filmstrip_thumbnails").position().left <
                -(
                  jQuery(".bwg_filmstrip_thumbnails").width() -
                  jQuery(".bwg_filmstrip").width() -
                  (gallery_box_data.filmstrip_thumb_right_left_space +
                    gallery_box_data.image_filmstrip_width +
                    gallery_box_data.all_images_right_left_space)
                )
                  ? jQuery(".bwg_filmstrip_thumbnails").animate(
                      {
                        left: -(
                          jQuery(".bwg_filmstrip_thumbnails").width() -
                          jQuery(".bwg_filmstrip").width() -
                          gallery_box_data.all_images_right_left_space
                        ),
                      },
                      500,
                      "linear"
                    )
                  : jQuery(".bwg_filmstrip_thumbnails").animate(
                      {
                        left:
                          jQuery(".bwg_filmstrip_thumbnails").position().left -
                          (gallery_box_data.filmstrip_thumb_right_left_space +
                            gallery_box_data.image_filmstrip_width),
                      },
                      500,
                      "linear"
                    )),
              window.setTimeout(function () {
                jQuery(".bwg_filmstrip_thumbnails").position().left ==
                  -(
                    jQuery(".bwg_filmstrip_thumbnails").width() -
                    jQuery(".bwg_filmstrip").width()
                  ) && jQuery(".bwg_filmstrip_right").css({ opacity: 0.3 });
              }, 500))
            : (jQuery(".bwg_filmstrip_thumbnails").position().left >=
                -(
                  jQuery(".bwg_filmstrip_thumbnails").height() -
                  jQuery(".bwg_filmstrip").height()
                ) &&
                (jQuery(".bwg_filmstrip_left").css({ opacity: 1 }),
                jQuery(".bwg_filmstrip_thumbnails").position().left <
                -(
                  jQuery(".bwg_filmstrip_thumbnails").height() -
                  jQuery(".bwg_filmstrip").height() -
                  (gallery_box_data.filmstrip_thumb_right_left_space +
                    gallery_box_data.image_filmstrip_width +
                    gallery_box_data.all_images_right_left_space)
                )
                  ? jQuery(".bwg_filmstrip_thumbnails").animate(
                      {
                        left: -(
                          jQuery(".bwg_filmstrip_thumbnails").height() -
                          jQuery(".bwg_filmstrip").height() -
                          gallery_box_data.all_images_right_left_space
                        ),
                      },
                      500,
                      "linear"
                    )
                  : jQuery(".bwg_filmstrip_thumbnails").animate(
                      {
                        left:
                          jQuery(".bwg_filmstrip_thumbnails").position().left -
                          (gallery_box_data.filmstrip_thumb_right_left_space +
                            gallery_box_data.image_filmstrip_width),
                      },
                      500,
                      "linear"
                    )),
              window.setTimeout(function () {
                jQuery(".bwg_filmstrip_thumbnails").position().left ==
                  -(
                    jQuery(".bwg_filmstrip_thumbnails").height() -
                    jQuery(".bwg_filmstrip").height()
                  ) && jQuery(".bwg_filmstrip_right").css({ opacity: 0.3 });
              }, 500))
          : "width" == gallery_box_data.width_or_height
          ? (jQuery(".bwg_filmstrip_thumbnails").position().top >=
              -(
                jQuery(".bwg_filmstrip_thumbnails").width() -
                jQuery(".bwg_filmstrip").width()
              ) &&
              (jQuery(".bwg_filmstrip_left").css({ opacity: 1 }),
              jQuery(".bwg_filmstrip_thumbnails").position().top <
              -(
                jQuery(".bwg_filmstrip_thumbnails").width() -
                jQuery(".bwg_filmstrip").width() -
                (gallery_box_data.filmstrip_thumb_right_left_space +
                  gallery_box_data.image_filmstrip_width +
                  gallery_box_data.all_images_right_left_space)
              )
                ? jQuery(".bwg_filmstrip_thumbnails").animate(
                    {
                      left: -(
                        jQuery(".bwg_filmstrip_thumbnails").width() -
                        jQuery(".bwg_filmstrip").width() -
                        gallery_box_data.all_images_right_left_space
                      ),
                    },
                    500,
                    "linear"
                  )
                : jQuery(".bwg_filmstrip_thumbnails").animate(
                    {
                      left:
                        jQuery(".bwg_filmstrip_thumbnails").position().top -
                        (gallery_box_data.filmstrip_thumb_right_left_space +
                          gallery_box_data.image_filmstrip_width),
                    },
                    500,
                    "linear"
                  )),
            window.setTimeout(function () {
              jQuery(".bwg_filmstrip_thumbnails").position().left ==
                -(
                  jQuery(".bwg_filmstrip_thumbnails").width() -
                  jQuery(".bwg_filmstrip").width()
                ) && jQuery(".bwg_filmstrip_right").css({ opacity: 0.3 });
            }, 500))
          : (jQuery(".bwg_filmstrip_thumbnails").position().top >=
              -(
                jQuery(".bwg_filmstrip_thumbnails").height() -
                jQuery(".bwg_filmstrip").height()
              ) &&
              (jQuery(".bwg_filmstrip_left").css({ opacity: 1 }),
              jQuery(".bwg_filmstrip_thumbnails").position().top <
              -(
                jQuery(".bwg_filmstrip_thumbnails").height() -
                jQuery(".bwg_filmstrip").height() -
                (gallery_box_data.filmstrip_thumb_right_left_space +
                  gallery_box_data.image_filmstrip_width +
                  gallery_box_data.all_images_right_left_space)
              )
                ? jQuery(".bwg_filmstrip_thumbnails").animate(
                    {
                      top: -(
                        jQuery(".bwg_filmstrip_thumbnails").height() -
                        jQuery(".bwg_filmstrip").height() -
                        gallery_box_data.all_images_right_left_space
                      ),
                    },
                    500,
                    "linear"
                  )
                : jQuery(".bwg_filmstrip_thumbnails").animate(
                    {
                      top:
                        jQuery(".bwg_filmstrip_thumbnails").position().top -
                        (gallery_box_data.filmstrip_thumb_right_left_space +
                          gallery_box_data.image_filmstrip_width),
                    },
                    500,
                    "linear"
                  )),
            window.setTimeout(function () {
              jQuery(".bwg_filmstrip_thumbnails").position().left ==
                -(
                  jQuery(".bwg_filmstrip_thumbnails").height() -
                  jQuery(".bwg_filmstrip").height()
                ) && jQuery(".bwg_filmstrip_right").css({ opacity: 0.3 });
            }, 500));
    }),
    "left" == gallery_box_data.left_or_top
      ? jQuery(".bwg_filmstrip_left").on(a, function () {
          jQuery(".bwg_filmstrip_thumbnails").stop(!0, !1),
            jQuery(".bwg_filmstrip_thumbnails").position().left < 0 &&
              (jQuery(".bwg_filmstrip_right").css({ opacity: 1 }),
              jQuery(".bwg_filmstrip_thumbnails").position().left >
              -(
                gallery_box_data.filmstrip_thumb_right_left_space +
                gallery_box_data.image_filmstrip_width
              )
                ? jQuery(".bwg_filmstrip_thumbnails").animate(
                    { left: 0 },
                    500,
                    "linear"
                  )
                : jQuery(".bwg_filmstrip_thumbnails").animate(
                    {
                      left:
                        jQuery(".bwg_filmstrip_thumbnails").position().left +
                        gallery_box_data.image_filmstrip_width +
                        gallery_box_data.filmstrip_thumb_right_left_space,
                    },
                    500,
                    "linear"
                  )),
            window.setTimeout(function () {
              0 == jQuery(".bwg_filmstrip_thumbnails").position().left &&
                jQuery(".bwg_filmstrip_left").css({ opacity: 0.3 });
            }, 500);
        })
      : jQuery(".bwg_filmstrip_left").on(a, function () {
          jQuery(".bwg_filmstrip_thumbnails").stop(!0, !1),
            jQuery(".bwg_filmstrip_thumbnails").position().top < 0 &&
              (jQuery(".bwg_filmstrip_right").css({ opacity: 1 }),
              jQuery(".bwg_filmstrip_thumbnails").position().top >
              -(
                gallery_box_data.filmstrip_thumb_right_left_space +
                gallery_box_data.image_filmstrip_width
              )
                ? jQuery(".bwg_filmstrip_thumbnails").animate(
                    { top: 0 },
                    500,
                    "linear"
                  )
                : jQuery(".bwg_filmstrip_thumbnails").animate(
                    {
                      top:
                        jQuery(".bwg_filmstrip_thumbnails").position().top +
                        gallery_box_data.image_filmstrip_width +
                        gallery_box_data.filmstrip_thumb_right_left_space,
                    },
                    500,
                    "linear"
                  )),
            window.setTimeout(function () {
              0 == jQuery(".bwg_filmstrip_thumbnails").position().top &&
                jQuery(".bwg_filmstrip_left").css({ opacity: 0.3 });
            }, 500);
        }),
    "width" == gallery_box_data.width_or_height
      ? bwg_set_filmstrip_pos(
          jQuery(".bwg_filmstrip").width(),
          "",
          gallery_box_data
        )
      : bwg_set_filmstrip_pos(
          jQuery(".bwg_filmstrip").height(),
          "",
          gallery_box_data
        ),
    jQuery(".bwg_info").on(a, function () {
      if ("none" == jQuery(".bwg_image_info_container1").css("display")) {
        jQuery(".bwg_image_info_container1").css("display", "table-cell"),
          jQuery(".bwg_info").attr("title", bwg_objectsL10n.bwg_hide_info);
        jQuery(".bwg_ctrl_btn_container").length &&
          jQuery(".bwg_ctrl_btn_container").height();
        jQuery(".bwg_image_info").css("height", "auto"), bwg_info_height_set();
      } else jQuery(".bwg_image_info_container1").css("display", "none"), jQuery(".bwg_info").attr("title", bwg_objectsL10n.bwg_show_info);
    }),
    jQuery(".bwg_rate").on(a, function () {
      "none" == jQuery(".bwg_image_rate_container1").css("display")
        ? (jQuery(".bwg_image_rate_container1").css("display", "table-cell"),
          jQuery(".bwg_rate").attr("title", bwg_objectsL10n.bwg_hide_rating))
        : (jQuery(".bwg_image_rate_container1").css("display", "none"),
          jQuery(".bwg_rate").attr("title", bwg_objectsL10n.bwg_show_rating));
    }),
    jQuery(".bwg_comment, .bwg_comments_close_btn").on(a, function () {
      bwg_comment();
    }),
    jQuery(".bwg_ecommerce, .bwg_ecommerce_close_btn").on(a, function () {
      bwg_ecommerce();
    }),
    jQuery(".bwg_toggle_container").on(a, function () {
      var e =
          "top" == gallery_box_data.lightbox_ctrl_btn_pos
            ? "bwg-icon-caret-up"
            : "bwg-icon-caret-down",
        t =
          "top" == gallery_box_data.lightbox_ctrl_btn_pos
            ? "bwg-icon-caret-down"
            : "bwg-icon-caret-up";
      jQuery(".bwg_toggle_container i").hasClass(e)
        ? ((gallery_box_data.enable_image_filmstrip &&
            "bottom" == gallery_box_data.lightbox_filmstrip_pos) ||
          "bottom" != gallery_box_data.lightbox_ctrl_btn_pos ||
          "bottom" != gallery_box_data.lightbox_rate_pos
            ? (gallery_box_data.enable_image_filmstrip &&
                "top" == gallery_box_data.lightbox_filmstrip_pos) ||
              "top" != gallery_box_data.lightbox_ctrl_btn_pos ||
              "top" != gallery_box_data.lightbox_rate_pos ||
              jQuery(".bwg_image_rate").animate({ top: 0 }, 500)
            : jQuery(".bwg_image_rate").animate({ bottom: 0 }, 500),
          (gallery_box_data.enable_image_filmstrip &&
            "bottom" == gallery_box_data.lightbox_filmstrip_pos) ||
          "bottom" != gallery_box_data.lightbox_ctrl_btn_pos ||
          "bottom" != gallery_box_data.lightbox_hit_pos
            ? (gallery_box_data.enable_image_filmstrip &&
                "top" == gallery_box_data.lightbox_filmstrip_pos) ||
              "top" != gallery_box_data.lightbox_ctrl_btn_pos ||
              "top" != gallery_box_data.lightbox_hit_pos ||
              jQuery(".bwg_image_hit").animate({ top: 0 }, 500)
            : jQuery(".bwg_image_hit").animate({ bottom: 0 }, 500),
          "bottom" == gallery_box_data.lightbox_ctrl_btn_pos
            ? (jQuery(".bwg_ctrl_btn_container")
                .animate(
                  { bottom: "-" + jQuery(".bwg_ctrl_btn_container").height() },
                  500
                )
                .addClass("closed"),
              jQuery(".bwg_toggle_container").animate(
                { bottom: 0 },
                {
                  duration: 500,
                  complete: function () {
                    jQuery(".bwg_toggle_container i").attr(
                      "class",
                      "bwg_toggle_btn " + t
                    );
                  },
                }
              ))
            : (jQuery(".bwg_ctrl_btn_container")
                .animate(
                  { top: "-" + jQuery(".bwg_ctrl_btn_container").height() },
                  500
                )
                .addClass("closed"),
              jQuery(".bwg_toggle_container").animate(
                { top: 0 },
                {
                  duration: 500,
                  complete: function () {
                    jQuery(".bwg_toggle_container i").attr(
                      "class",
                      "bwg_toggle_btn " + t
                    );
                  },
                }
              )))
        : ((gallery_box_data.enable_image_filmstrip &&
            "bottom" == gallery_box_data.lightbox_filmstrip_pos) ||
          "bottom" != gallery_box_data.lightbox_ctrl_btn_pos ||
          "bottom" != gallery_box_data.lightbox_rate_pos
            ? (gallery_box_data.enable_image_filmstrip &&
                "top" == gallery_box_data.lightbox_filmstrip_pos) ||
              "top" != gallery_box_data.lightbox_ctrl_btn_pos ||
              "top" != gallery_box_data.lightbox_rate_pos ||
              jQuery(".bwg_image_rate").animate(
                { top: jQuery(".bwg_ctrl_btn_container").height() },
                500
              )
            : jQuery(".bwg_image_rate").animate(
                { bottom: jQuery(".bwg_ctrl_btn_container").height() },
                500
              ),
          (gallery_box_data.enable_image_filmstrip &&
            "bottom" == gallery_box_data.lightbox_filmstrip_pos) ||
          "bottom" != gallery_box_data.lightbox_ctrl_btn_pos ||
          "bottom" != gallery_box_data.lightbox_hit_pos
            ? (gallery_box_data.enable_image_filmstrip &&
                "top" == gallery_box_data.lightbox_filmstrip_pos) ||
              "top" != gallery_box_data.lightbox_ctrl_btn_pos ||
              "top" != gallery_box_data.lightbox_hit_pos ||
              jQuery(".bwg_image_hit").animate(
                { top: jQuery(".bwg_ctrl_btn_container").height() },
                500
              )
            : jQuery(".bwg_image_hit").animate(
                { bottom: jQuery(".bwg_ctrl_btn_container").height() },
                500
              ),
          "bottom" == gallery_box_data.lightbox_ctrl_btn_pos
            ? (jQuery(".bwg_ctrl_btn_container")
                .animate({ bottom: 0 }, 500)
                .removeClass("closed"),
              jQuery(".bwg_toggle_container").animate(
                { bottom: jQuery(".bwg_ctrl_btn_container").height() },
                {
                  duration: 500,
                  complete: function () {
                    jQuery(".bwg_toggle_container i").attr(
                      "class",
                      "bwg_toggle_btn " + e
                    );
                  },
                }
              ))
            : (jQuery(".bwg_ctrl_btn_container")
                .animate({ top: 0 }, 500)
                .removeClass("closed"),
              jQuery(".bwg_toggle_container").animate(
                { top: jQuery(".bwg_ctrl_btn_container").height() },
                {
                  duration: 500,
                  complete: function () {
                    jQuery(".bwg_toggle_container i").attr(
                      "class",
                      "bwg_toggle_btn " + e
                    );
                  },
                }
              ))),
        bwg_info_position(!0);
    });
  var o = window.innerHeight;
  jQuery(".bwg_resize-full").on(a, function () {
    bwg_resize_full();
  }),
    jQuery(".bwg_fullscreen").on(a, function () {
      jQuery(".bwg_watermark").css({ display: "none" });
      var e,
        t = 0;
      if (
        ((jQuery(".bwg_comment_container").hasClass("bwg_open") ||
          jQuery(".bwg_ecommerce_container").hasClass("bwg_open")) &&
          (t =
            jQuery(".bwg_comment_container").width() ||
            jQuery(".bwg_ecommerce_container").width()),
        void 0 !== jQuery().fullscreen &&
          jQuery.isFunction(jQuery().fullscreen))
      )
        if (jQuery.fullscreen.isFullScreen())
          jQuery.fullscreen.exit(),
            (e = o),
            jQuery(window).width() > gallery_box_data.image_width &&
              (r = gallery_box_data.image_width),
            window.innerHeight > gallery_box_data.image_height &&
              (_ = gallery_box_data.image_height),
            gallery_box_data.open_with_fullscreen &&
              ((r = jQuery(window).width()), (_ = e)),
            jQuery("#spider_popup_wrap").on("fscreenclose", function () {
              jQuery("#spider_popup_wrap").css({
                width: r,
                height: _,
                left: "50%",
                top: "50%",
                marginLeft: -r / 2,
                marginTop: -_ / 2,
                zIndex: 1e5,
              }),
                jQuery(".bwg_image_wrap").css({ width: r - t }),
                jQuery(".bwg_image_container").css({
                  height:
                    _ -
                    ("horizontal" == gallery_box_data.filmstrip_direction
                      ? gallery_box_data.image_filmstrip_height
                      : 0),
                  width:
                    r -
                    t -
                    ("vertical" == gallery_box_data.filmstrip_direction
                      ? gallery_box_data.image_filmstrip_width
                      : 0),
                }),
                jQuery(".bwg_image_info").css("height", "auto"),
                bwg_info_height_set(),
                jQuery(".bwg_popup_image").css({
                  maxWidth:
                    r -
                    t -
                    ("vertical" == gallery_box_data.filmstrip_direction
                      ? gallery_box_data.image_filmstrip_width
                      : 0),
                  maxHeight:
                    _ -
                    ("horizontal" == gallery_box_data.filmstrip_direction
                      ? gallery_box_data.image_filmstrip_height
                      : 0),
                }),
                jQuery(
                  ".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video"
                ).css({
                  maxWidth:
                    r -
                    t -
                    ("vertical" == gallery_box_data.filmstrip_direction
                      ? gallery_box_data.image_filmstrip_width
                      : 0),
                  maxHeight:
                    _ -
                    ("horizontal" == gallery_box_data.filmstrip_direction
                      ? gallery_box_data.image_filmstrip_height
                      : 0),
                }),
                bwg_resize_instagram_post(),
                bwg_change_watermark_container(),
                "width" == gallery_box_data.width_or_height
                  ? (jQuery(".bwg_filmstrip_container").css({
                      width:
                        r -
                        ("horizontal" == gallery_box_data.filmstrip_direction
                          ? "comment_container_width"
                          : 0),
                    }),
                    jQuery(".bwg_filmstrip").css({
                      width:
                        r -
                        ("horizontal" == gallery_box_data.filmstrip_direction
                          ? "comment_container_width"
                          : 0) -
                        2 *
                          ("horizontal" == gallery_box_data.filmstrip_direction
                            ? jQuery(".bwg_filmstrip_right").width()
                            : jQuery(".bwg_filmstrip_right").height()),
                    }),
                    bwg_set_filmstrip_pos(
                      r -
                        2 *
                          ("horizontal" == gallery_box_data.filmstrip_direction
                            ? jQuery(".bwg_filmstrip_right").width()
                            : jQuery(".bwg_filmstrip_right").height()),
                      "",
                      gallery_box_data
                    ))
                  : (jQuery(".bwg_filmstrip_container").css({
                      height:
                        _ -
                        ("horizontal" == gallery_box_data.filmstrip_direction
                          ? "comment_container_width"
                          : 0),
                    }),
                    jQuery(".bwg_filmstrip").css({
                      height:
                        _ -
                        ("horizontal" == gallery_box_data.filmstrip_direction
                          ? "comment_container_width"
                          : 0) -
                        2 *
                          ("horizontal" == gallery_box_data.filmstrip_direction
                            ? jQuery(".bwg_filmstrip_right").width()
                            : jQuery(".bwg_filmstrip_right").height()),
                    }),
                    bwg_set_filmstrip_pos(
                      _ -
                        2 *
                          ("horizontal" == gallery_box_data.filmstrip_direction
                            ? jQuery(".bwg_filmstrip_right").width()
                            : jQuery(".bwg_filmstrip_right").height()),
                      "",
                      gallery_box_data
                    ),
                    "horizontal" != gallery_box_data.filmstrip_direction &&
                      jQuery(".bwg_filmstrip_right").css({
                        top: _ - jQuery(".bwg_filmstrip_right").height(),
                      })),
                jQuery(".bwg_resize-full").show(),
                jQuery(".bwg_resize-full").attr(
                  "class",
                  "bwg-icon-expand bwg_ctrl_btn bwg_resize-full"
                ),
                jQuery(".bwg_resize-full").attr(
                  "title",
                  bwg_objectsL10n.bwg_maximize
                ),
                jQuery(".bwg_fullscreen").attr(
                  "class",
                  "bwg-icon-arrows-out bwg_ctrl_btn bwg_fullscreen"
                ),
                jQuery(".bwg_fullscreen").attr(
                  "title",
                  bwg_objectsL10n.bwg_fullscreen
                ),
                jQuery("#spider_popup_wrap").width() < jQuery(window).width() &&
                  jQuery("#spider_popup_wrap").height() < window.innerHeight &&
                  jQuery(".spider_popup_close_fullscreen").attr(
                    "class",
                    "spider_popup_close"
                  );
            });
        else {
          jQuery("#spider_popup_wrap").fullscreen();
          var i = screen.width,
            a = screen.height;
          jQuery("#spider_popup_wrap").css({
            width: i,
            height: a,
            left: 0,
            top: 0,
            margin: 0,
            zIndex: 1e5,
          }),
            jQuery(".bwg_image_wrap").css({ width: i - t }),
            jQuery(".bwg_image_container").css({
              height:
                a -
                ("horizontal" == gallery_box_data.filmstrip_direction
                  ? gallery_box_data.image_filmstrip_height
                  : 0),
              width:
                i -
                t -
                ("vertical" == gallery_box_data.filmstrip_direction
                  ? gallery_box_data.image_filmstrip_width
                  : 0),
            }),
            jQuery(".bwg_image_info").css("height", "auto"),
            bwg_info_height_set(),
            jQuery(".bwg_popup_image").css({
              maxWidth:
                i -
                t -
                ("vertical" == gallery_box_data.filmstrip_direction
                  ? gallery_box_data.image_filmstrip_width
                  : 0),
              maxHeight:
                a -
                ("horizontal" == gallery_box_data.filmstrip_direction
                  ? gallery_box_data.image_filmstrip_height
                  : 0),
            }),
            jQuery(
              ".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video"
            ).css({
              maxWidth:
                i -
                t -
                ("vertical" == gallery_box_data.filmstrip_direction
                  ? gallery_box_data.image_filmstrip_width
                  : 0),
              maxHeight:
                a -
                ("horizontal" == gallery_box_data.filmstrip_direction
                  ? gallery_box_data.image_filmstrip_height
                  : 0),
            }),
            bwg_resize_instagram_post(),
            bwg_change_watermark_container(),
            "width" == gallery_box_data.width_or_height
              ? (jQuery(".bwg_filmstrip_container").css(
                  {
                    width:
                      i -
                      ("horizontal" == gallery_box_data.filmstrip_direction
                        ? t
                        : 0),
                  },
                  500
                ),
                jQuery(".bwg_filmstrip").css(
                  {
                    width:
                      i -
                      ("horizontal" == gallery_box_data.filmstrip_direction
                        ? t
                        : 0) -
                      2 *
                        ("horizontal" == gallery_box_data.filmstrip_direction
                          ? jQuery(".bwg_filmstrip_right").width()
                          : jQuery(".bwg_filmstrip_right").height()),
                  },
                  500
                ),
                bwg_set_filmstrip_pos(
                  i -
                    ("horizontal" == gallery_box_data.filmstrip_direction
                      ? t
                      : 0) -
                    2 *
                      ("horizontal" == gallery_box_data.filmstrip_direction
                        ? jQuery(".bwg_filmstrip_right").width()
                        : jQuery(".bwg_filmstrip_right").height()),
                  "",
                  gallery_box_data
                ))
              : (jQuery(".bwg_filmstrip_container").css({
                  height:
                    a - ("horizontal" == gallery_box_data.filmstrip_direction)
                      ? "comment_container_width"
                      : 0,
                }),
                jQuery(".bwg_filmstrip").css({
                  height:
                    a -
                    ("horizontal" == gallery_box_data.filmstrip_direction
                      ? "comment_container_width"
                      : 0) -
                    2 *
                      ("horizontal" == gallery_box_data.filmstrip_direction
                        ? jQuery(".bwg_filmstrip_right").width()
                        : jQuery(".bwg_filmstrip_right").height()),
                }),
                bwg_set_filmstrip_pos(
                  a -
                    ("horizontal" == gallery_box_data.filmstrip_direction
                      ? "comment_container_width"
                      : 0) -
                    2 *
                      ("horizontal" == gallery_box_data.filmstrip_direction
                        ? jQuery(".bwg_filmstrip_right").width()
                        : jQuery(".bwg_filmstrip_right").height()),
                  "",
                  gallery_box_data
                ),
                "horizontal" != gallery_box_data.filmstrip_direction &&
                  jQuery(".bwg_filmstrip_right").css({
                    top: a - jQuery(".bwg_filmstrip_right").height(),
                  })),
            jQuery(".bwg_resize-full").hide(),
            jQuery(".bwg_fullscreen").attr(
              "class",
              "bwg-icon-compress bwg_ctrl_btn bwg_fullscreen"
            ),
            jQuery(".bwg_fullscreen").attr(
              "title",
              bwg_objectsL10n.bwg_exit_fullscreen
            ),
            jQuery(".spider_popup_close").attr(
              "class",
              "bwg_ctrl_btn spider_popup_close_fullscreen"
            );
        }
      return !1;
    }),
    jQuery(".bwg_play_pause").on(a, function () {
      jQuery(".bwg_play_pause").length &&
      jQuery(".bwg_play_pause").hasClass("bwg-icon-play") &&
      !jQuery(".bwg_comment_container").hasClass("bwg_open")
        ? (bwg_play(gallery_box_data.data),
          jQuery(".bwg_play_pause").attr("title", bwg_objectsL10n.bwg_pause),
          jQuery(".bwg_play_pause").attr(
            "class",
            "bwg-icon-pause bwg_ctrl_btn bwg_play_pause"
          ))
        : (window.clearInterval(bwg_playInterval),
          jQuery(".bwg_play_pause").attr("title", bwg_objectsL10n.bwg_play),
          jQuery(".bwg_play_pause").attr(
            "class",
            "bwg-icon-play bwg_ctrl_btn bwg_play_pause"
          ));
    }),
    gallery_box_data.open_with_autoplay &&
      (bwg_play(gallery_box_data.data),
      jQuery(".bwg_play_pause").attr("title", bwg_objectsL10n.bwg_pause),
      jQuery(".bwg_play_pause").attr(
        "class",
        "bwg-icon-pause bwg_ctrl_btn bwg_play_pause"
      )),
    gallery_box_data.open_with_fullscreen && bwg_open_with_fullscreen(),
    jQuery(".bwg_popup_image").removeAttr("width"),
    jQuery(".bwg_popup_image").removeAttr("height"),
    jQuery(window).focus(function () {
      jQuery(".bwg_play_pause").length &&
        !jQuery(".bwg_play_pause").hasClass("bwg-icon-play") &&
        bwg_play(gallery_box_data.data);
    }),
    jQuery(window).blur(function () {
      (event_stack = []), window.clearInterval(bwg_playInterval);
    });
  gallery_box_data.lightbox_ctrl_btn_pos;
  1 == gallery_box_data.open_ecommerce &&
    setTimeout(function () {
      bwg_ecommerce();
    }, 400),
    1 == gallery_box_data.open_comment && bwg_comment();
}
function spider_createpopup(e, t, i, a, r, _, s, o) {
  (e = e.replace(/&#038;/g, "&")),
    isPopUpOpened ||
      ((isPopUpOpened = !0),
      spider_isunsupporteduseragent() ||
        ((bwg_overflow_initial_value = jQuery("html").css("overflow")),
        (bwg_overflow_x_initial_value = jQuery("html").css("overflow-x")),
        (bwg_overflow_y_initial_value = jQuery("html").css("overflow-y")),
        jQuery("html").attr("style", "overflow:hidden !important;"),
        jQuery("#bwg_spider_popup_loading_" + t).show(),
        jQuery("#spider_popup_overlay_" + t).css({ display: "block" }),
        jQuery.ajax({
          type: "GET",
          url: e,
          success: function (e) {
            var t = jQuery(
              '<div id="spider_popup_wrap" class="spider_popup_wrap" style=" width:' +
                i +
                "px; height:" +
                a +
                "px; margin-top:-" +
                a / 2 +
                "px; margin-left: -" +
                i / 2 +
                'px; ">' +
                e +
                "</div>"
            )
              .hide()
              .appendTo("body");
            gallery_box_ready(), spider_showpopup(_, s, t, r, o);
          },
          beforeSend: function () {},
          complete: function () {},
        })));
}
function spider_showpopup(e, t, i, a, r) {
  var _ = gallery_box_data.data,
    s = parseInt(jQuery("#bwg_current_image_key").val());
  void 0 !== _[s] &&
    ((isPopUpOpened = !0),
    -1 < _[s].filetype.indexOf("EMBED_")
      ? bwg_first_image_load(i, r)
      : jQuery("#spider_popup_wrap .bwg_popup_image_spun img").prop("complete")
      ? bwg_first_image_load(i, r)
      : jQuery("#spider_popup_wrap .bwg_popup_image_spun img").on(
          "load error",
          function () {
            bwg_first_image_load(i, r);
          }
        ),
    "EMBED_OEMBED_INSTAGRAM_POST" == _[s].filetype &&
      "undefined" != typeof instgrm &&
      void 0 !== instgrm.Embeds &&
      instgrm.Embeds.process());
}
function bwg_first_image_load(e, t) {
  e.show();
  var i = jQuery(".bwg_ctrl_btn_container").height();
  "bottom" == t
    ? jQuery(".bwg_toggle_container").css("bottom", i + "px")
    : "top" == t && jQuery(".bwg_toggle_container").css("top", i + "px"),
    jQuery(".bwg_spider_popup_loading").hide(),
    1 == gallery_box_data.preload_images &&
      bwg_preload_images(parseInt(jQuery("#bwg_current_image_key").val())),
    bwg_load_filmstrip(),
    bwg_info_height_set();
}
function spider_isunsupporteduseragent() {
  return !window.XMLHttpRequest;
}
function spider_destroypopup(e) {
  null != document.getElementById("spider_popup_wrap") &&
    (void 0 !== jQuery().fullscreen &&
      jQuery.isFunction(jQuery().fullscreen) &&
      jQuery.fullscreen.isFullScreen() &&
      jQuery.fullscreen.exit(),
    "undefined" != typeof enable_addthis &&
      enable_addthis &&
      jQuery(".at4-share-outer").hide(),
    setTimeout(function () {
      jQuery(".spider_popup_wrap").remove(),
        jQuery(".bwg_spider_popup_loading").css({ display: "none" }),
        jQuery(".spider_popup_overlay").css({ display: "none" }),
        jQuery(document).off("keydown"),
        !1 !== bwg_overflow_initial_value &&
          jQuery("html").css("overflow", bwg_overflow_initial_value),
        !1 !== bwg_overflow_x_initial_value &&
          jQuery("html").css("overflow-x", bwg_overflow_x_initial_value),
        !1 !== bwg_overflow_y_initial_value &&
          jQuery("html").css("overflow-y", bwg_overflow_y_initial_value);
    }, 20)),
    (isPopUpOpened = !1);
  var t = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent.toLowerCase()
    ),
    i = document.querySelector('meta[name="viewport"]');
  t && i && (i.content = "width=device-width, initial-scale=1");
  var a = jQuery(document).scrollTop();
  bwg_objectsL10n.is_pro && location.replace("#"),
    jQuery(document).scrollTop(a),
    void 0 !== gallery_box_data.bwg_playInterval &&
      clearInterval(gallery_box_data.bwg_playInterval);
}
function get_ajax_pricelist() {
  var e = {};
  return (
    jQuery(".add_to_cart_msg").html(""),
    (e.ajax_task = "display"),
    (e.image_id = jQuery("#bwg_popup_image").attr("image_id")),
    jQuery("#ecommerce_ajax_loading").css(
      "height",
      jQuery(".bwg_ecommerce_panel").css("height")
    ),
    jQuery("#ecommerce_opacity_div").css(
      "width",
      jQuery(".bwg_ecommerce_panel").css("width")
    ),
    jQuery("#ecommerce_opacity_div").css(
      "height",
      jQuery(".bwg_ecommerce_panel").css("height")
    ),
    jQuery("#ecommerce_loading_div").css(
      "width",
      jQuery(".bwg_ecommerce_panel").css("width")
    ),
    jQuery("#ecommerce_loading_div").css(
      "height",
      jQuery(".bwg_ecommerce_panel").css("height")
    ),
    jQuery("#ecommerce_opacity_div").css("display", "block"),
    jQuery("#ecommerce_loading_div").css("display", "table-cell"),
    jQuery.ajax({
      type: "POST",
      url: jQuery("#bwg_ecommerce_form").attr("action"),
      data: e,
      success: function (e) {
        jQuery(".pge_tabs li a").on("click", function () {
          return (
            jQuery(".pge_tabs_container > div").hide(),
            jQuery(".pge_tabs li").removeClass("pge_active"),
            jQuery(jQuery(this).attr("href")).show(),
            jQuery(this).closest("li").addClass("pge_active"),
            jQuery("[name=type]").val(jQuery(this).attr("href").substr(1)),
            !1
          );
        });
        var t = jQuery(e).find(".manual").html();
        jQuery(".manual").html(t);
        var i = jQuery(e).find(".downloads").html();
        jQuery(".downloads").html(i);
        var a = jQuery(e).find(".pge_options").html();
        jQuery(".pge_options").html(a);
        var r = jQuery(e).find(".pge_add_to_cart").html();
        jQuery(".pge_add_to_cart").html(r);
      },
      beforeSend: function () {},
      complete: function () {
        jQuery("#ecommerce_opacity_div").css("display", "none"),
          jQuery("#ecommerce_loading_div").css("display", "none");
      },
    }),
    !1
  );
}
function spider_ajax_save(e) {
  var t = {};
  return (
    (t.bwg_name = jQuery("#bwg_name").val()),
    (t.bwg_comment = jQuery("#bwg_comment").val()),
    (t.bwg_email = jQuery("#bwg_email").val()),
    (t.bwg_captcha_input = jQuery("#bwg_captcha_input").val()),
    (t.ajax_task = jQuery("#ajax_task").val()),
    (t.image_id = jQuery("#image_id").val()),
    (t.comment_id = jQuery("#comment_id").val()),
    jQuery("#ajax_loading").css(
      "height",
      jQuery(".bwg_comments").css("height")
    ),
    jQuery("#opacity_div").css("width", jQuery(".bwg_comments").css("width")),
    jQuery("#opacity_div").css("height", jQuery(".bwg_comments").css("height")),
    jQuery("#loading_div").css("width", jQuery(".bwg_comments").css("width")),
    jQuery("#loading_div").css("height", jQuery(".bwg_comments").css("height")),
    (document.getElementById("opacity_div").style.display = ""),
    (document.getElementById("loading_div").style.display = "table-cell"),
    jQuery.ajax({
      type: "POST",
      url: jQuery("#" + e).attr("action"),
      data: t,
      success: function (e) {
        var t = jQuery(e).find(".bwg_comments").html();
        jQuery(".bwg_comments").html(t);
      },
      beforeSend: function () {},
      complete: function () {
        (document.getElementById("opacity_div").style.display = "none"),
          (document.getElementById("loading_div").style.display = "none"),
          jQuery(".bwg_comments").mCustomScrollbar({
            scrollInertia: 150,
            advanced: { updateOnContentResize: !0 },
          }),
          jQuery(".bwg_comments_close_btn").click(bwg_comment),
          bwg_captcha_refresh("bwg_captcha");
      },
    }),
    !1
  );
}
function spider_rate_ajax_save(i) {
  var e = {};
  return (
    (e.image_id = jQuery("#" + i + " input[name='image_id']").val()),
    (e.rate = jQuery("#" + i + " input[name='score']").val()),
    (e.ajax_task = jQuery("#rate_ajax_task").val()),
    jQuery.ajax({
      type: "POST",
      url: jQuery("#" + i).attr("action"),
      data: e,
      success: function (e) {
        var t = jQuery(e)
          .find("#" + i)
          .html();
        jQuery("#" + i).html(t);
      },
      beforeSend: function () {},
      complete: function () {},
    })
  );
}
function spider_set_input_value(e, t) {
  document.getElementById(e) && (document.getElementById(e).value = t);
}
function spider_form_submit(e, t) {
  document.getElementById(t) && document.getElementById(t).submit(),
    e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
}
function spider_check_required(e, t) {
  return (
    "" == jQuery("#" + e).val() &&
    (alert(t + " " + bwg_objectsL10n.bwg_field_required),
    jQuery("#" + e).attr("style", "border-color: #FF0000;"),
    jQuery("#" + e).focus(),
    !0)
  );
}
function comment_check_privacy_policy() {
  var e = jQuery("#bwg_submit");
  e.removeClass("bwg-submit-disabled"),
    e.removeAttr("disabled"),
    jQuery("#bwg_comment_privacy_policy").is(":checked") ||
      (e.addClass("bwg-submit-disabled"), e.attr("disabled", "disabled"));
}
function spider_check_email(e) {
  if ("" != jQuery("#" + e).val())
    return (
      -1 ==
        jQuery("#" + e)
          .val()
          .replace(/^\s+|\s+$/g, "")
          .search(
            /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
          ) && (alert(bwg_objectsL10n.bwg_mail_validation), !0)
    );
}
function bwg_captcha_refresh(e) {
  document.getElementById(e + "_img") &&
    document.getElementById(e + "_input") &&
    ((srcArr = document.getElementById(e + "_img").src.split("&r=")),
    (document.getElementById(e + "_img").src =
      srcArr[0] + "&r=" + Math.floor(100 * Math.random())),
    (document.getElementById(e + "_img").style.display = "inline-block"),
    (document.getElementById(e + "_input").value = ""));
}
function bwg_play_instagram_video(e, t) {
  jQuery(e)
    .parent()
    .find("video")
    .each(function () {
      jQuery(this).get(0).paused
        ? (jQuery(this).get(0).play(), jQuery(e).children().hide())
        : (jQuery(this).get(0).pause(), jQuery(e).children().show());
    });
}
function bwg_add_comment() {
  var t = jQuery("#bwg_comment_form"),
    e = t.attr("action"),
    i = { ajax_task: "add_comment" };
  return (
    (i.comment_name = t.find("#bwg_name").val()),
    (i.comment_email = t.find("#bwg_email").val()),
    (i.comment_text = t.find("#bwg_comment").val()),
    (i.comment_captcha = t.find("#bwg_captcha_input").val()),
    (i.popup_enable_captcha = t.find("#bwg_popup_enable_captcha").val()),
    (i.privacy_policy = t.find("#bwg_comment_privacy_policy").is(":checked")
      ? 1
      : 0),
    (i.comment_image_id = jQuery("#bwg_popup_image").attr("image_id")),
    (i.comment_moderation = t.find("#bwg_comment_moderation").val()),
    jQuery(".bwg_spider_ajax_loading").hide(),
    jQuery.ajax({
      url: e,
      type: "POST",
      dataType: "json",
      data: i,
      success: function (e) {
        jQuery(".bwg_comment_error").text(""),
          1 == e.error
            ? jQuery.each(e.error_messages, function (e, t) {
                t && jQuery(".bwg_comment_" + e + "_error").text(t);
              })
            : (t.find("#bwg_comment").val(""),
              jQuery(".bwg_comment_waiting_message").hide(),
              0 == e.published && jQuery(".bwg_comment_waiting_message").show(),
              "" != e.html_comments_block &&
                jQuery("#bwg_added_comments")
                  .html(e.html_comments_block)
                  .show());
      },
      beforeSend: function () {
        jQuery(".bwg_spider_ajax_loading").show();
      },
      complete: function () {
        0 < t.find("#bwg_comment_privacy_policy").length &&
          (t.find("#bwg_comment_privacy_policy").prop("checked", !1),
          comment_check_privacy_policy()),
          bwg_captcha_refresh("bwg_captcha"),
          jQuery(".bwg_spider_ajax_loading").hide();
      },
      error: function () {},
    }),
    !1
  );
}
function bwg_remove_comment(t) {
  var e = jQuery("#bwg_comment_form").attr("action"),
    i = { ajax_task: "delete_comment" };
  return (
    (i.id_image = jQuery("#bwg_popup_image").attr("image_id")),
    (i.id_comment = t),
    jQuery.ajax({
      url: e,
      type: "POST",
      dataType: "json",
      data: i,
      success: function (e) {
        0 == e.error &&
          jQuery("#bwg_comment_block_" + t)
            .fadeOut("slow")
            .remove();
      },
      beforeSend: function () {},
      complete: function () {},
      error: function () {},
    }),
    !1
  );
}
function bwg_gallery_box(e, t, i, a) {
  jQuery(".bwg-validate").each(function () {
    jQuery(this).on("keypress change", function () {
      jQuery(this).parent().next().find(".bwg_comment_error").html("");
    });
  }),
    void 0 === i && (i = !1);
  var r,
    _ = t.data("bwg");
  r = t.find(".bwg-container").data("lightbox-url")
    ? t.find(".bwg-container").data("lightbox-url")
    : t.data("lightbox-url");
  var s = t.find(".cur_gal_id").val(),
    o = jQuery("#bwg_tag_id_" + s).val();
  o = o || 0;
  var l = 1 == i ? "&open_ecommerce=1" : "",
    n = jQuery("#bwg_search_input_" + _).val(),
    g = jQuery("#bwg_order_" + _).val()
      ? "&filtersortby=" + jQuery("#bwg_order_" + _).val()
      : "";
  (n = n || ""), void 0 !== a && (r += "&gallery_id=" + a);
  var w = "",
    b = jQuery("#bwg_blog_style_share_buttons_" + e).attr("data-open-comment");
  void 0 !== b && !1 !== b && (w = "&open_comment=1"),
    spider_createpopup(
      r +
        "&bwg_random_seed=" +
        jQuery("#bwg_random_seed_" + _).val() +
        "&image_id=" +
        e +
        "&filter_tag=" +
        o +
        l +
        w +
        "&filter_search_name=" +
        n +
        g,
      _,
      t.data("popup-width"),
      t.data("popup-height"),
      1,
      "testpopup",
      5,
      t.data("buttons-position")
    );
}
function bwg_change_image_lightbox(e, a, r, t) {
  if (
    (jQuery("#bwg_rate_form input[name='image_id']").val(r[a].id),
    (bwg_current_key = gallery_box_data.bwg_current_key),
    jQuery(".bwg_image_info").css("height", "auto"),
    setTimeout(function () {
      bwg_info_height_set(),
        jQuery(".bwg_image_description").height() >
          jQuery(".bwg_image_info").height() &&
          jQuery(".mCSB_container").hasClass("mCS_no_scrollbar") &&
          jQuery(".bwg_image_info").mCustomScrollbar("destroy"),
        jQuery(".bwg_image_info").hasClass("mCustomScrollbar") ||
          (void 0 !== jQuery().mCustomScrollbar &&
            jQuery.isFunction(jQuery().mCustomScrollbar) &&
            jQuery(".bwg_image_info").mCustomScrollbar({
              scrollInertia: 150,
              advanced: { updateOnContentResize: !0 },
            }));
    }, 200),
    jQuery("#spider_popup_left").show(),
    jQuery("#spider_popup_right").show(),
    jQuery(".bwg_image_info").hide(),
    0 == gallery_box_data.enable_loop &&
      (a == parseInt(r.length) - 1 && jQuery("#spider_popup_right").hide(),
      0 == a && jQuery("#spider_popup_left").hide()),
    1 == gallery_box_data.ecommerceACtive &&
      1 == gallery_box_data.enable_image_ecommerce)
  )
    if (0 == gallery_box_data.data[a].pricelist)
      jQuery(".bwg_ecommerce").hide();
    else {
      jQuery(".bwg_ecommerce").show(),
        jQuery(".pge_tabs li").hide(),
        jQuery("#downloads").hide(),
        jQuery("#manual").hide();
      var i = gallery_box_data.data[a].pricelist_sections.split(",");
      if (i)
        if (
          (jQuery("#" + i[0]).show(),
          jQuery("[name=type]").val(i[0]),
          1 < i.length)
        )
          for (jQuery(".pge_tabs").show(), k = 0; k < i.length; k++)
            jQuery("#" + i[k] + "_li").show();
        else jQuery(".pge_tabs").hide();
      else jQuery("[name=type]").val("");
    }
  if (
    (jQuery("#bwg_image_container")
      .find("iframe")
      .each(function () {
        jQuery(this)[0].contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        ),
          jQuery(this)[0].contentWindow.postMessage(
            '{ "method": "pause" }',
            "*"
          ),
          jQuery(this)[0].contentWindow.postMessage("pause", "*");
      }),
    jQuery("#bwg_image_container")
      .find("video")
      .each(function () {
        jQuery(this).trigger("pause");
      }),
    void 0 === r && (r = gallery_box_data.data),
    void 0 !== r[a] && void 0 !== r[e])
  ) {
    if (
      (jQuery(".bwg_play_pause").length &&
        !jQuery(".bwg_play_pause").hasClass("bwg-icon-play") &&
        bwg_play(r),
      t || jQuery("#bwg_current_image_key").val(a),
      gallery_box_data.bwg_trans_in_progress)
    )
      return void gallery_box_data.event_stack.push(e + "-" + a);
    var _ = "right";
    if (bwg_current_key > a) _ = "left";
    else if (bwg_current_key == a) return;
    jQuery(".bwg_image_count").html(r[a].number),
      jQuery(".bwg_watermark").css({ display: "none" }),
      "width" == gallery_box_data.width_or_height
        ? (bwg_current_filmstrip_pos =
            a *
            (jQuery(".bwg_filmstrip_thumbnail").width() +
              2 +
              2 * gallery_box_data.lightbox_filmstrip_thumb_border_width))
        : "height" == gallery_box_data.width_or_height &&
          (bwg_current_filmstrip_pos =
            a *
            (jQuery(".bwg_filmstrip_thumbnail").height() +
              2 +
              2 * gallery_box_data.lightbox_filmstrip_thumb_border_width)),
      (gallery_box_data.bwg_current_key = a),
      bwg_objectsL10n.is_pro &&
        (location.replace("#bwg" + gallery_box_data.gallery_id + "/" + r[a].id),
        history.replaceState(
          void 0,
          void 0,
          "#bwg" + gallery_box_data.gallery_id + "/" + r[a].id
        )),
      jQuery("#bwg_rate_form input[name='image_id']").val(r[a].id),
      gallery_box_data.popup_enable_rate &&
        (jQuery("#bwg_star").attr("data-score", r[a].avg_rating),
        jQuery("#bwg_star").removeAttr("title"),
        (r[a].cur_key = a),
        bwg_rating(r[a].rate, r[a].rate_count, r[a].avg_rating, a)),
      spider_set_input_value("rate_ajax_task", "save_hit_count"),
      spider_rate_ajax_save("bwg_rate_form"),
      jQuery(".bwg_image_hits span").html(++r[a].hit_count),
      jQuery("#bwg_popup_image").attr("image_id", r[a].id),
      jQuery(".bwg_image_title").html(jQuery("<span />").html(r[a].alt).text()),
      jQuery(".bwg_image_description").html(
        jQuery("<span />").html(r[a].description).text()
      ),
      jQuery(".bwg_filmstrip_thumbnail")
        .removeClass("bwg_thumb_active")
        .addClass("bwg_thumb_deactive"),
      jQuery("#bwg_filmstrip_thumbnail_" + a)
        .removeClass("bwg_thumb_deactive")
        .addClass("bwg_thumb_active"),
      jQuery(".bwg_image_info").css("opacity", 1),
      "" == r[a].alt.trim() &&
        "" == r[a].description.trim() &&
        jQuery(".bwg_image_info").css("opacity", 0),
      "none" != jQuery(".bwg_image_info_container1").css("display")
        ? jQuery(".bwg_image_info_container1").css("display", "table-cell")
        : jQuery(".bwg_image_info_container1").css("display", "none"),
      "none" != jQuery(".bwg_image_rate_container1").css("display")
        ? jQuery(".bwg_image_rate_container1").css("display", "table-cell")
        : jQuery(".bwg_image_rate_container1").css("display", "none");
    var s =
        2 == jQuery(".bwg_popup_image_spun").css("zIndex")
          ? ".bwg_popup_image_spun"
          : ".bwg_popup_image_second_spun",
      o =
        ".bwg_popup_image_second_spun" == s
          ? ".bwg_popup_image_spun"
          : ".bwg_popup_image_second_spun",
      l = -1 < r[a].filetype.indexOf("EMBED_"),
      n = -1 < r[a].filetype.indexOf("INSTAGRAM_POST"),
      g = -1 < r[a].filetype.indexOf("INSTAGRAM_VIDEO"),
      w =
        -1 !==
        jQuery.inArray(r[a].filetype, [
          "EMBED_OEMBED_YOUTUBE_VIDEO",
          "EMBED_OEMBED_VIMEO_VIDEO",
          "EMBED_OEMBED_FACEBOOK_VIDEO",
          "EMBED_OEMBED_DAILYMOTION_VIDEO",
        ]),
      b = jQuery(s).height(),
      u = jQuery(s).width(),
      d =
        '<span class="bwg_popup_image_spun1" style="display: ' +
        (l ? "block" : "table") +
        '; width: inherit; height: inherit;"><span class="bwg_popup_image_spun2" style="display:' +
        (l ? "block" : "table-cell") +
        '; vertical-align: middle;text-align: center;height: 100%;">';
    if (l) {
      if (
        (jQuery("#bwg_download").addClass("bwg-hidden"),
        (d +=
          '<span class="bwg_popup_embed bwg_popup_watermark" style="display: ' +
          (w ? "block" : "table") +
          '; table-layout: fixed; height: 100%;">' +
          (g
            ? '<div class="bwg_inst_play_btn_cont" onclick="bwg_play_instagram_video(this)" ><div class="bwg_inst_play"></div></div>'
            : " ")),
        n)
      ) {
        var h = 0,
          m = 0;
        b < u + 88 ? (h = (m = b) - 88) : (m = (h = u) + 88),
          (d += spider_display_embed(
            r[a].filetype,
            r[a].image_url,
            r[a].filename,
            {
              class: "bwg_embed_frame",
              "data-width": r[a].image_width,
              "data-height": r[a].image_height,
              frameborder: "0",
              allowfullscreen: "allowfullscreen",
              style:
                "width:" +
                h +
                "px; height:" +
                m +
                "px; vertical-align:middle; display:inline-block; position:relative;",
            }
          ));
      } else
        d += spider_display_embed(
          r[a].filetype,
          r[a].image_url,
          r[a].filename,
          {
            class: "bwg_embed_frame",
            frameborder: "0",
            allowfullscreen: "allowfullscreen",
            style:
              "display:" +
              (w ? "block" : "table-cell") +
              "; width:inherit; height:inherit; vertical-align:middle;",
          }
        );
      d += "</span>";
    } else
      jQuery(".bwg-loading").removeClass("bwg-hidden"),
        jQuery("#bwg_download").removeClass("bwg-hidden"),
        (d +=
          '<img style="max-height: ' +
          b +
          "px; max-width: " +
          u +
          'px;" class="bwg_popup_image bwg_popup_watermark" src="' +
          gallery_box_data.site_url +
          jQuery("<span />").html(decodeURIComponent(r[a].image_url)).text() +
          '" alt="' +
          r[a].alt +
          '" />');
    function p() {
      gallery_box_data.preload_images && bwg_preload_images(a),
        window["bwg_" + gallery_box_data.bwg_image_effect](s, o, _),
        jQuery(s)
          .find(".bwg_fb_video")
          .each(function () {
            jQuery(this).attr("src", "");
          }),
        l
          ? jQuery("#bwg_fullsize_image").attr(
              "href",
              decodeURIComponent(r[a].image_url)
            )
          : (jQuery("#bwg_fullsize_image").attr(
              "href",
              gallery_box_data.site_url + decodeURIComponent(r[a].image_url)
            ),
            jQuery("#bwg_download").attr(
              "href",
              gallery_box_data.site_url +
                decodeURIComponent(r[a].thumb_url).replace(
                  "/thumb/",
                  "/.original/"
                )
            ));
      var e = decodeURIComponent(r[a].image_url).split("/");
      jQuery("#bwg_download").attr(
        "download",
        e[e.length - 1].replace(/\?bwg=(\d+)$/, "")
      );
      var t =
        encodeURIComponent(gallery_box_data.bwg_share_url) +
        "=" +
        r[a].id +
        encodeURIComponent("#bwg" + gallery_box_data.gallery_id + "/") +
        r[a].id;
      if (l) var i = encodeURIComponent(r[a].thumb_url);
      else
        i =
          gallery_box_data.bwg_share_image_url +
          encodeURIComponent(encodeURIComponent(r[a].pure_image_url));
      (i = i.replace(/%252F|%25252F/g, "%2F")),
        void 0 !== addthis_share && (addthis_share.url = t),
        jQuery("#bwg_facebook_a").attr(
          "href",
          "https://www.facebook.com/sharer/sharer.php?u=" + t
        ),
        jQuery("#bwg_twitter_a").attr(
          "href",
          "https://twitter.com/share?url=" + t
        ),
        jQuery("#bwg_pinterest_a").attr(
          "href",
          "https://pinterest.com/pin/create/button/?s=100&url=" +
            t +
            "&media=" +
            i +
            "&description=" +
            r[a].alt +
            "%0A" +
            r[a].description
        ),
        jQuery("#bwg_tumblr_a").attr(
          "href",
          "https://www.tumblr.com/share/photo?source=" +
            i +
            "&caption=" +
            r[a].alt +
            "&clickthru=" +
            t
        ),
        jQuery(".bwg_comment_container").hasClass("bwg_open") &&
          (jQuery(".bwg_comments .mCSB_container").css("top", "0"),
          jQuery("#bwg_added_comments").show(),
          spider_set_input_value("ajax_task", "display"),
          spider_set_input_value(
            "image_id",
            jQuery("#bwg_popup_image").attr("image_id")
          ),
          spider_ajax_save("bwg_comment_form")),
        jQuery(".bwg_ecommerce_container").hasClass("bwg_open") &&
          (0 == r[a].pricelist
            ? (bwg_popup_sidebar_close(jQuery(".bwg_ecommerce_container")),
              bwg_animate_image_box_for_hide_sidebar(),
              jQuery(".bwg_ecommerce_container").attr(
                "class",
                "bwg_ecommerce_container bwg_close"
              ),
              jQuery(".bwg_ecommerce").attr(
                "title",
                bwg_objectsL10n.bwg_show_ecommerce
              ),
              jQuery(".spider_popup_close_fullscreen").show())
            : get_ajax_pricelist()),
        void 0 !== jQuery().mCustomScrollbar &&
          jQuery.isFunction(jQuery().mCustomScrollbar) &&
          jQuery(".bwg_comments").mCustomScrollbar({
            advanced: { updateOnContentResize: !0 },
          }),
        jQuery(".bwg_comments .mCSB_scrollTools").hide(),
        gallery_box_data.enable_image_filmstrip && bwg_move_filmstrip(),
        bwg_resize_instagram_post();
    }
    if (
      ((d += "</span></span>"),
      jQuery(o).html(d),
      jQuery(o)
        .find("img")
        .on("load error", function () {
          jQuery(".bwg-loading").addClass("bwg-hidden");
        }),
      jQuery(
        ".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video"
      ).css({ maxWidth: u, maxHeight: b, height: "auto" }),
      l)
    )
      p();
    else
      jQuery(o)
        .find("img")
        .one("load", function () {
          p();
        })
        .each(function () {
          this.complete && jQuery(this).load();
        });
    "undefined" != typeof instgrm &&
      void 0 !== instgrm.Embeds &&
      instgrm.Embeds.process();
  }
}
function bwg_preload_images_lightbox(e) {
  for (
    var t = gallery_box_data.data,
      i = t.length,
      a =
        0 == gallery_box_data.preload_images_count ||
        gallery_box_data.preload_images_count >= i
          ? i
          : gallery_box_data.preload_images_count,
      r = 0,
      _ = 1;
    r < a;
    _++
  ) {
    var s = 1;
    do {
      var o = (e + _ * s + i) % i;
      if (void 0 !== t[o])
        -1 < t[o].filetype.indexOf("EMBED_") ||
          jQuery("<img/>").attr(
            "src",
            gallery_box_data.site_url +
              jQuery("<span />").html(decodeURIComponent(t[o].image_url)).text()
          );
      (s *= -1), r++;
    } while (1 != s);
  }
}
function bwg_popup_sidebar_open(e) {
  var t = gallery_box_data.lightbox_comment_width,
    i = gallery_box_data.lightbox_comment_pos;
  if (t > jQuery(window).width()) {
    if (
      ((t = jQuery(window).width()),
      e.css({ width: t }),
      jQuery(".spider_popup_close_fullscreen").hide(),
      jQuery(".spider_popup_close").hide(),
      jQuery(".bwg_ctrl_btn").hasClass("bwg-icon-pause"))
    ) {
      var a =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          navigator.userAgent.toLowerCase()
        );
      jQuery(".bwg_play_pause").trigger(a ? "touchend" : "click");
    }
  } else jQuery(".spider_popup_close_fullscreen").show();
  "left" == i ? e.animate({ left: 0 }, 100) : e.animate({ right: 0 }, 100);
}
function bwg_comment() {
  if (
    (jQuery(".bwg_watermark").css({ display: "none" }),
    jQuery(".bwg_ecommerce_wrap").css("z-index", "-1"),
    jQuery(".bwg_comment_wrap").css("z-index", "25"),
    jQuery(".bwg_ecommerce_container").hasClass("bwg_open") &&
      (bwg_popup_sidebar_close(jQuery(".bwg_ecommerce_container")),
      jQuery(".bwg_ecommerce_container").attr(
        "class",
        "bwg_ecommerce_container bwg_close"
      ),
      jQuery(".bwg_ecommerce").attr(
        "title",
        bwg_objectsL10n.bwg_show_ecommerce
      )),
    jQuery(".bwg_comment_container").hasClass("bwg_open"))
  )
    "1" == jQuery(".bwg_comment_container").attr("data-play-status") &&
      jQuery(".bwg_ctrl_btn.bwg_play_pause")
        .removeClass("bwg-icon-play")
        .addClass("bwg-icon-pause")
        .attr("title", bwg_objectsL10n.bwg_pause),
      bwg_popup_sidebar_close(jQuery(".bwg_comment_container")),
      bwg_animate_image_box_for_hide_sidebar(),
      jQuery(".bwg_comment_wrap").css("z-index", "-1"),
      jQuery(".bwg_comment_container").attr(
        "class",
        "bwg_comment_container bwg_close"
      ),
      jQuery(".bwg_comment").attr("title", bwg_objectsL10n.bwg_show_comments),
      jQuery(".spider_popup_close_fullscreen").show();
  else {
    jQuery(".bwg_play_pause").hasClass("bwg-icon-pause")
      ? jQuery(".bwg_comment_container").attr("data-play-status", "1")
      : jQuery(".bwg_comment_container").attr("data-play-status", "0"),
      jQuery(".bwg_ctrl_btn.bwg_play_pause")
        .removeClass("bwg-icon-pause")
        .addClass("bwg-icon-play")
        .attr("title", bwg_objectsL10n.bwg_play),
      bwg_popup_sidebar_open(jQuery(".bwg_comment_container")),
      bwg_animate_image_box_for_show_sidebar(),
      jQuery(".bwg_comment_container").attr(
        "class",
        "bwg_comment_container bwg_open"
      ),
      jQuery(".bwg_comment").attr("title", bwg_objectsL10n.bwg_hide_comments);
    var e = parseInt(jQuery("#bwg_current_image_key").val());
    void 0 !== gallery_box_data.current_image_key &&
      0 != gallery_box_data.data[e].comment_count &&
      (jQuery("#bwg_added_comments").show(),
      spider_set_input_value("ajax_task", "display"),
      spider_set_input_value(
        "image_id",
        jQuery("#bwg_popup_image").attr("image_id")
      ),
      spider_ajax_save("bwg_comment_form"));
  }
  jQuery(".bwg_comments").mCustomScrollbar("update", {
    scrollInertia: 150,
    advanced: { updateOnContentResize: !0 },
  });
}
function bwg_ecommerce() {
  jQuery(".bwg_watermark").css({ display: "none" }),
    jQuery(".bwg_ecommerce_wrap").css("z-index", "25"),
    jQuery(".bwg_comment_wrap").css("z-index", "-1"),
    jQuery(".bwg_comment_container").hasClass("bwg_open") &&
      (bwg_popup_sidebar_close(jQuery(".bwg_comment_container")),
      jQuery(".bwg_comment_container").attr(
        "class",
        "bwg_comment_container bwg_close"
      ),
      jQuery(".bwg_comment").attr("title", bwg_objectsL10n.bwg_show_comments)),
    jQuery(".bwg_ecommerce_container").hasClass("bwg_open")
      ? (bwg_popup_sidebar_close(jQuery(".bwg_ecommerce_container")),
        bwg_animate_image_box_for_hide_sidebar(),
        jQuery(".bwg_ecommerce_container").attr(
          "class",
          "bwg_ecommerce_container bwg_close"
        ),
        jQuery(".bwg_ecommerce").attr(
          "title",
          bwg_objectsL10n.bwg_show_ecommerce
        ))
      : (bwg_popup_sidebar_open(jQuery(".bwg_ecommerce_container")),
        bwg_animate_image_box_for_show_sidebar(),
        jQuery(".bwg_ecommerce_container").attr(
          "class",
          "bwg_ecommerce_container bwg_open"
        ),
        jQuery(".bwg_ecommerce").attr(
          "title",
          bwg_objectsL10n.bwg_hide_ecommerce
        ),
        get_ajax_pricelist());
}
function bwg_popup_sidebar_close(e) {
  var t = parseInt(e.css("borderRightWidth"));
  t || (t = 0),
    "left" == lightbox_comment_pos
      ? e.animate({ left: -e.width() - t }, 100)
      : "right" == lightbox_comment_pos &&
        e.animate({ right: -e.width() - t }, 100);
}
function bwg_animate_image_box_for_hide_sidebar() {
  "left" == lightbox_comment_pos
    ? jQuery(".bwg_image_wrap").animate(
        { left: 0, width: jQuery("#spider_popup_wrap").width() },
        100
      )
    : "right" == lightbox_comment_pos &&
      jQuery(".bwg_image_wrap").animate(
        { right: 0, width: jQuery("#spider_popup_wrap").width() },
        100
      ),
    jQuery(".bwg_image_container").animate(
      {
        width:
          jQuery("#spider_popup_wrap").width() -
          ("vertical" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_width
            : 0),
      },
      100
    ),
    jQuery(".bwg_popup_image").animate(
      {
        maxWidth:
          jQuery("#spider_popup_wrap").width() -
          ("vertical" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_width
            : 0),
      },
      {
        duration: 100,
        complete: function () {
          bwg_change_watermark_container();
        },
      }
    ),
    jQuery(".bwg_popup_embed").animate(
      {
        width:
          jQuery("#spider_popup_wrap").width() -
          ("vertical" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_width
            : 0),
      },
      {
        duration: 100,
        complete: function () {
          bwg_resize_instagram_post(), bwg_change_watermark_container();
        },
      }
    ),
    "width" == gallery_box_data.width_or_height
      ? (jQuery(".bwg_filmstrip_container").animate(
          { width: jQuery(".spider_popup_wrap").width() },
          100
        ),
        jQuery(".bwg_filmstrip").animate(
          {
            width:
              jQuery(".spider_popup_wrap").width() -
              2 *
                ("horizontal" == gallery_box_data.filmstrip_direction
                  ? jQuery(".bwg_filmstrip_right").width()
                  : jQuery(".bwg_filmstrip_right").height()),
          },
          100
        ))
      : "height" == gallery_box_data.width_or_height &&
        (jQuery(".bwg_filmstrip_container").animate(
          { height: jQuery(".spider_popup_wrap").width() },
          100
        ),
        jQuery(".bwg_filmstrip").animate(
          {
            height:
              jQuery(".spider_popup_wrap").width() -
              2 *
                ("horizontal" == gallery_box_data.filmstrip_direction
                  ? jQuery(".bwg_filmstrip_right").width()
                  : jQuery(".bwg_filmstrip_right").height()),
          },
          100
        )),
    bwg_set_filmstrip_pos(
      jQuery(".spider_popup_wrap").width() -
        2 *
          ("horizontal" == gallery_box_data.filmstrip_direction
            ? jQuery(".bwg_filmstrip_right").width()
            : jQuery(".bwg_filmstrip_right").height()),
      "",
      gallery_box_data
    ),
    jQuery(".spider_popup_close_fullscreen").show(100);
}
function bwg_animate_image_box_for_show_sidebar() {
  var e =
    jQuery(".bwg_comment_container").width() ||
    jQuery(".bwg_ecommerce_container").width();
  "left" == lightbox_comment_pos
    ? jQuery(".bwg_image_wrap").animate(
        { left: e, width: jQuery("#spider_popup_wrap").width() - e },
        100
      )
    : "right" == lightbox_comment_pos &&
      jQuery(".bwg_image_wrap").animate(
        { right: e, width: jQuery("#spider_popup_wrap").width() - e },
        100
      ),
    jQuery(".bwg_image_container").animate(
      {
        width:
          jQuery("#spider_popup_wrap").width() -
          ("vertical" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_width
            : 0) -
          e,
      },
      100
    ),
    jQuery(".bwg_popup_image").animate(
      {
        maxWidth:
          jQuery("#spider_popup_wrap").width() -
          e -
          ("vertical" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_width
            : 0),
      },
      {
        duration: 100,
        complete: function () {
          bwg_change_watermark_container();
        },
      }
    ),
    jQuery(
      ".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video"
    ).animate(
      {
        maxWidth:
          jQuery("#spider_popup_wrap").width() -
          e -
          ("vertical" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_width
            : 0),
      },
      {
        duration: 100,
        complete: function () {
          bwg_resize_instagram_post(), bwg_change_watermark_container();
        },
      }
    ),
    "width" == gallery_box_data.width_or_height &&
      (jQuery(".bwg_filmstrip_container").css({
        width:
          jQuery("#spider_popup_wrap").width() -
          ("vertical" == gallery_box_data.filmstrip_direction ? 0 : e),
      }),
      jQuery(".bwg_filmstrip").animate(
        {
          width:
            jQuery(".bwg_filmstrip_container").width() -
            2 *
              ("horizontal" == gallery_box_data.filmstrip_direction
                ? jQuery(".bwg_filmstrip_right").width()
                : jQuery(".bwg_filmstrip_right").height()),
        },
        100
      ),
      bwg_set_filmstrip_pos(
        jQuery(".bwg_filmstrip_container").width() -
          2 *
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? jQuery(".bwg_filmstrip_right").width()
              : jQuery(".bwg_filmstrip_right").height()),
        "",
        gallery_box_data
      ));
}
function bwg_reset_zoom() {
  var e = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent.toLowerCase()
    ),
    t = document.querySelector('meta[name="viewport"]');
  e &&
    t &&
    (t.content =
      "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0");
}
function bwg_open_with_fullscreen() {
  jQuery(".bwg_watermark").css({ display: "none" });
  var e = 0;
  (jQuery(".bwg_comment_container").hasClass("bwg_open") ||
    jQuery(".bwg_ecommerce_container").hasClass("bwg_open")) &&
    (e =
      jQuery(".bwg_comment_container").width() ||
      jQuery(".bwg_ecommerce_container").width()),
    (bwg_popup_current_width = jQuery(window).width()),
    (bwg_popup_current_height = window.innerHeight),
    jQuery("#spider_popup_wrap").css({
      width: jQuery(window).width(),
      height: window.innerHeight,
      left: 0,
      top: 0,
      margin: 0,
      zIndex: 100002,
    }),
    jQuery(".bwg_image_wrap").css({ width: jQuery(window).width() - e }),
    jQuery(".bwg_image_container").css({
      height:
        bwg_popup_current_height -
        ("horizontal" == gallery_box_data.filmstrip_direction
          ? gallery_box_data.image_filmstrip_height
          : 0),
      width:
        bwg_popup_current_width -
        e -
        ("vertical" == gallery_box_data.filmstrip_direction
          ? gallery_box_data.image_filmstrip_width
          : 0),
    }),
    jQuery(".bwg_popup_image").css(
      {
        maxWidth:
          jQuery(window).width() -
          e -
          ("vertical" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_width
            : 0),
        maxHeight:
          window.innerHeight -
          ("horizontal" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_height
            : 0),
      },
      {
        complete: function () {
          bwg_change_watermark_container();
        },
      }
    ),
    jQuery(".bwg_popup_video").css(
      {
        width:
          jQuery(window).width() -
          e -
          ("vertical" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_width
            : 0),
        height:
          window.innerHeight -
          ("horizontal" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_height
            : 0),
      },
      {
        complete: function () {
          bwg_change_watermark_container();
        },
      }
    ),
    jQuery(
      ".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video"
    ).css(
      {
        maxWidth:
          jQuery(window).width() -
          e -
          ("vertical" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_width
            : 0),
        maxHeight:
          window.innerHeight -
          ("horizontal" == gallery_box_data.filmstrip_direction
            ? gallery_box_data.image_filmstrip_height
            : 0),
      },
      {
        complete: function () {
          bwg_resize_instagram_post(), bwg_change_watermark_container();
        },
      }
    ),
    "width" == gallery_box_data.width_or_height
      ? (jQuery(".bwg_filmstrip_container").css({
          width:
            jQuery(window).width() -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? "comment_container_width"
              : 0),
        }),
        jQuery(".bwg_filmstrip").css({
          width:
            jQuery(window).width() -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? "comment_container_width"
              : 0) -
            2 *
              ("horizontal" == gallery_box_data.filmstrip_direction
                ? jQuery(".bwg_filmstrip_right").width()
                : jQuery(".bwg_filmstrip_right").height()),
        }),
        bwg_set_filmstrip_pos(
          jQuery(window).width() -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? "comment_container_width"
              : 0) -
            2 *
              ("horizontal" == gallery_box_data.filmstrip_direction
                ? jQuery(".bwg_filmstrip_right").width()
                : jQuery(".bwg_filmstrip_right").height()),
          "",
          gallery_box_data
        ))
      : (jQuery(".bwg_filmstrip_container").css({
          height:
            window.innerHeight -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? "comment_container_width"
              : 0),
        }),
        jQuery(".bwg_filmstrip").css({
          height:
            window.innerHeight -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? "comment_container_width"
              : 0) -
            2 *
              ("horizontal" == gallery_box_data.filmstrip_direction
                ? jQuery(".bwg_filmstrip_right").width()
                : jQuery(".bwg_filmstrip_right").height()),
        }),
        bwg_set_filmstrip_pos(
          window.innerHeight -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? "comment_container_width"
              : 0) -
            2 *
              ("horizontal" == gallery_box_data.filmstrip_direction
                ? jQuery(".bwg_filmstrip_right").width()
                : jQuery(".bwg_filmstrip_right").height()),
          "",
          gallery_box_data
        )),
    jQuery(".bwg_resize-full").attr(
      "class",
      "bwg-icon-compress bwg_ctrl_btn bwg_resize-full"
    ),
    jQuery(".bwg_resize-full").attr("title", bwg_objectsL10n.bwg_restore),
    jQuery(".spider_popup_close").attr(
      "class",
      "bwg_ctrl_btn spider_popup_close_fullscreen"
    );
}
function bwg_resize_full() {
  jQuery(".bwg_watermark").css({ display: "none" });
  var e = 0;
  (jQuery(".bwg_comment_container").hasClass("bwg_open") ||
    jQuery(".bwg_ecommerce_container").hasClass("bwg_open")) &&
    (e =
      jQuery(".bwg_comment_container").width() ||
      jQuery(".bwg_ecommerce_container").width()),
    jQuery(".bwg_resize-full").hasClass("bwg-icon-compress")
      ? (jQuery(window).width() > gallery_box_data.image_width &&
          (bwg_popup_current_width = gallery_box_data.image_width),
        window.innerHeight > gallery_box_data.image_height &&
          (bwg_popup_current_height = gallery_box_data.image_height),
        jQuery("#spider_popup_wrap").animate(
          {
            width: bwg_popup_current_width,
            height: bwg_popup_current_height,
            left: "50%",
            top: "50%",
            marginLeft: -bwg_popup_current_width / 2,
            marginTop: -bwg_popup_current_height / 2,
            zIndex: 100002,
          },
          500
        ),
        jQuery(".bwg_image_wrap").animate(
          { width: bwg_popup_current_width - e },
          500
        ),
        jQuery(".bwg_image_container").animate(
          {
            height:
              bwg_popup_current_height -
              ("horizontal" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_height
                : 0),
            width:
              bwg_popup_current_width -
              e -
              ("vertical" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_width
                : 0),
          },
          500
        ),
        jQuery(".bwg_popup_image").animate(
          {
            maxWidth:
              bwg_popup_current_width -
              e -
              ("vertical" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_width
                : 0),
            maxHeight:
              bwg_popup_current_height -
              ("horizontal" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_height
                : 0),
          },
          {
            duration: 500,
            complete: function () {
              bwg_change_watermark_container(),
                jQuery("#spider_popup_wrap").width() < jQuery(window).width() &&
                  jQuery("#spider_popup_wrap").height() < window.innerHeight &&
                  jQuery(".spider_popup_close_fullscreen").attr(
                    "class",
                    "spider_popup_close"
                  );
            },
          }
        ),
        jQuery(
          ".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video"
        ).animate(
          {
            maxWidth:
              bwg_popup_current_width -
              e -
              ("vertical" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_width
                : 0),
            maxHeight:
              bwg_popup_current_height -
              ("horizontal" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_height
                : 0),
          },
          {
            duration: 500,
            complete: function () {
              bwg_resize_instagram_post(),
                bwg_change_watermark_container(),
                jQuery("#spider_popup_wrap").width() < jQuery(window).width() &&
                  jQuery("#spider_popup_wrap").height() < window.innerHeight &&
                  jQuery(".spider_popup_close_fullscreen").attr(
                    "class",
                    "spider_popup_close"
                  );
            },
          }
        ),
        "width" == gallery_box_data.width_or_height
          ? (jQuery(".bwg_filmstrip_container").animate(
              {
                width:
                  bwg_popup_current_width -
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? e
                    : 0),
              },
              500
            ),
            jQuery(".bwg_filmstrip").animate(
              {
                width:
                  bwg_popup_current_width -
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? e
                    : 0) -
                  2 *
                    ("horizontal" == gallery_box_data.filmstrip_direction
                      ? jQuery(".bwg_filmstrip_right").width()
                      : jQuery(".bwg_filmstrip_right").height()),
              },
              500
            ),
            bwg_set_filmstrip_pos(
              bwg_popup_current_width -
                2 *
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? jQuery(".bwg_filmstrip_right").width()
                    : jQuery(".bwg_filmstrip_right").height()),
              "",
              gallery_box_data
            ))
          : (jQuery(".bwg_filmstrip_container").animate(
              {
                height:
                  bwg_popup_current_height -
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? e
                    : 0),
              },
              500
            ),
            jQuery(".bwg_filmstrip").animate(
              {
                height:
                  bwg_popup_current_height -
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? e
                    : 0) -
                  2 *
                    ("horizontal" == gallery_box_data.filmstrip_direction
                      ? jQuery(".bwg_filmstrip_right").width()
                      : jQuery(".bwg_filmstrip_right").height()),
              },
              500
            ),
            bwg_set_filmstrip_pos(
              bwg_popup_current_height -
                2 *
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? jQuery(".bwg_filmstrip_right").width()
                    : jQuery(".bwg_filmstrip_right").height()),
              "",
              gallery_box_data
            ),
            "horizontal" != gallery_box_data.filmstrip_direction &&
              jQuery(".bwg_filmstrip_right").css({
                top:
                  bwg_popup_current_height -
                  jQuery(".bwg_filmstrip_right").height(),
              })),
        jQuery(".bwg_resize-full").attr(
          "class",
          "bwg-icon-expand bwg_ctrl_btn bwg_resize-full"
        ),
        jQuery(".bwg_resize-full").attr("title", bwg_objectsL10n.bwg_maximize),
        setTimeout(function () {
          bwg_info_height_set();
        }, 500))
      : ((bwg_popup_current_width = jQuery(window).width()),
        (bwg_popup_current_height = window.innerHeight),
        jQuery("#spider_popup_wrap").animate(
          {
            width: jQuery(window).width(),
            height: window.innerHeight,
            left: 0,
            top: 0,
            margin: 0,
            zIndex: 100002,
          },
          500
        ),
        jQuery(".bwg_image_wrap").animate(
          { width: jQuery(window).width() - e },
          500
        ),
        jQuery(".bwg_image_container").animate(
          {
            height:
              bwg_popup_current_height -
              ("horizontal" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_height
                : 0),
            width:
              bwg_popup_current_width -
              e -
              ("vertical" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_width
                : 0),
          },
          500
        ),
        jQuery(".bwg_popup_image").animate(
          {
            maxWidth:
              jQuery(window).width() -
              e -
              ("vertical" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_width
                : 0),
            maxHeight:
              window.innerHeight -
              ("horizontal" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_height
                : 0),
          },
          {
            duration: 500,
            complete: function () {
              bwg_change_watermark_container();
            },
          }
        ),
        jQuery(
          ".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video"
        ).animate(
          {
            maxWidth:
              jQuery(window).width() -
              e -
              ("vertical" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_width
                : 0),
            maxHeight:
              window.innerHeight -
              ("horizontal" == gallery_box_data.filmstrip_direction
                ? gallery_box_data.image_filmstrip_height
                : 0),
          },
          {
            duration: 500,
            complete: function () {
              bwg_resize_instagram_post(), bwg_change_watermark_container();
            },
          }
        ),
        "width" == gallery_box_data.width_or_height
          ? (jQuery(".bwg_filmstrip_container").animate(
              {
                width:
                  jQuery(window).width() -
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? e
                    : 0),
              },
              500
            ),
            jQuery(".bwg_filmstrip").animate(
              {
                width:
                  jQuery(window).width() -
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? e
                    : 0) -
                  2 *
                    ("horizontal" == gallery_box_data.filmstrip_direction
                      ? jQuery(".bwg_filmstrip_right").width()
                      : jQuery(".bwg_filmstrip_right").height()),
              },
              500
            ),
            bwg_set_filmstrip_pos(
              jQuery(window).width() -
                ("horizontal" == gallery_box_data.filmstrip_direction ? e : 0) -
                2 *
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? jQuery(".bwg_filmstrip_right").width()
                    : jQuery(".bwg_filmstrip_right").height()),
              "",
              gallery_box_data
            ))
          : (jQuery(".bwg_filmstrip_container").animate(
              {
                height:
                  window.innerHeight -
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? e
                    : 0),
              },
              500
            ),
            jQuery(".bwg_filmstrip").animate(
              {
                height:
                  window.innerHeight -
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? e
                    : 0) -
                  2 *
                    ("horizontal" == gallery_box_data.filmstrip_direction
                      ? jQuery(".bwg_filmstrip_right").width()
                      : jQuery(".bwg_filmstrip_right").height()),
              },
              500
            ),
            bwg_set_filmstrip_pos(
              window.innerHeight -
                ("horizontal" == gallery_box_data.filmstrip_direction ? e : 0) -
                2 *
                  ("horizontal" == gallery_box_data.filmstrip_direction
                    ? jQuery(".bwg_filmstrip_right").width()
                    : jQuery(".bwg_filmstrip_right").height()),
              "",
              gallery_box_data
            ),
            "horizontal" != gallery_box_data.filmstrip_direction &&
              jQuery(".bwg_filmstrip_right").css({
                top:
                  window.innerHeight - jQuery(".bwg_filmstrip_right").height(),
              })),
        jQuery(".bwg_resize-full").attr(
          "class",
          "bwg-icon-compress bwg_ctrl_btn bwg_resize-full"
        ),
        jQuery(".bwg_resize-full").attr("title", bwg_objectsL10n.bwg_restore),
        jQuery(".spider_popup_close").attr(
          "class",
          "bwg_ctrl_btn spider_popup_close_fullscreen"
        )),
    setTimeout(function () {
      bwg_info_height_set();
    }, 500);
}
function bwg_popup_resize_lightbox() {
  void 0 !== jQuery().fullscreen &&
    jQuery.isFunction(jQuery().fullscreen) &&
    (jQuery.fullscreen.isFullScreen() ||
      (jQuery(".bwg_resize-full").show(),
      jQuery(".bwg_resize-full").hasClass("bwg-icon-compress") ||
        jQuery(".bwg_resize-full").attr(
          "class",
          "bwg-icon-expand bwg_ctrl_btn bwg_resize-full"
        ),
      jQuery(".bwg_resize-full").attr("title", bwg_objectsL10n.bwg_maximize),
      jQuery(".bwg_fullscreen").attr(
        "class",
        "bwg-icon-arrows-out bwg_ctrl_btn bwg_fullscreen"
      ),
      jQuery(".bwg_fullscreen").attr("title", bwg_objectsL10n.fullscreen)));
  var e = 0;
  (jQuery(".bwg_comment_container").hasClass("bwg_open") ||
    jQuery(".bwg_ecommerce_container").hasClass("bwg_open")) &&
    (e = gallery_box_data.lightbox_comment_width),
    e > jQuery(window).width()
      ? ((e = jQuery(window).width()),
        jQuery(".bwg_comment_container").css({ width: e }),
        jQuery(".bwg_ecommerce_container").css({ width: e }),
        jQuery(".spider_popup_close_fullscreen").hide())
      : jQuery(".spider_popup_close_fullscreen").show(),
    window.innerHeight > gallery_box_data.image_height &&
    1 != gallery_box_data.open_with_fullscreen &&
    !jQuery(".bwg_resize-full").hasClass("bwg-icon-compress")
      ? (jQuery("#spider_popup_wrap").css({
          height: gallery_box_data.image_height,
          top: "50%",
          marginTop: -gallery_box_data.image_height / 2,
          zIndex: 100002,
        }),
        jQuery(".bwg_image_container").css({
          height:
            gallery_box_data.image_height -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_height
              : 0),
        }),
        jQuery(".bwg_image_info").css("height", "auto"),
        bwg_info_height_set(),
        jQuery(".bwg_popup_image").css({
          maxHeight:
            gallery_box_data.image_height -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_height
              : 0),
        }),
        jQuery(
          ".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video"
        ).css({
          maxHeight:
            gallery_box_data.image_height -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_height
              : 0),
        }),
        "vertical" == gallery_box_data.filmstrip_direction &&
          (jQuery(".bwg_filmstrip_container").css({
            height: gallery_box_data.image_height,
          }),
          jQuery(".bwg_filmstrip").css({
            height:
              gallery_box_data.image_height -
              2 *
                ("horizontal" == gallery_box_data.filmstrip_direction
                  ? jQuery(".bwg_filmstrip_right").width()
                  : jQuery(".bwg_filmstrip_right").height()),
          })),
        (bwg_popup_current_height = gallery_box_data.image_height))
      : (jQuery("#spider_popup_wrap").css({
          height: window.innerHeight,
          top: 0,
          marginTop: 0,
          zIndex: 100002,
        }),
        jQuery(".bwg_image_container").css({
          height:
            window.innerHeight -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_height
              : 0),
        }),
        jQuery(".bwg_image_info").css("height", "auto"),
        bwg_info_height_set(),
        jQuery(".bwg_popup_image").css({
          maxHeight:
            window.innerHeight -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_height
              : 0),
        }),
        jQuery(
          ".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video"
        ).css({
          maxHeight:
            window.innerHeight -
            ("horizontal" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_height
              : 0),
        }),
        "vertical" == gallery_box_data.filmstrip_direction &&
          (jQuery(".bwg_filmstrip_container").css({
            height: window.innerHeight,
          }),
          jQuery(".bwg_filmstrip").css({
            height:
              window.innerHeight -
              2 *
                ("horizontal" == gallery_box_data.filmstrip_direction
                  ? jQuery(".bwg_filmstrip_right").width()
                  : jQuery(".bwg_filmstrip_right").height()),
          })),
        (bwg_popup_current_height = window.innerHeight)),
    jQuery(window).width() >= gallery_box_data.image_width &&
    1 != gallery_box_data.open_with_fullscreen
      ? (jQuery("#spider_popup_wrap").css({
          width: gallery_box_data.image_width,
          left: "50%",
          marginLeft: -gallery_box_data.image_width / 2,
          zIndex: 100002,
        }),
        jQuery(".bwg_image_wrap").css({
          width: gallery_box_data.image_width - e,
        }),
        jQuery(".bwg_image_container").css({
          width:
            gallery_box_data.image_width -
            ("vertical" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_width
              : 0) -
            e,
        }),
        jQuery(".bwg_image_info").css("height", "auto"),
        bwg_info_height_set(),
        jQuery(".bwg_popup_image").css({
          maxWidth:
            gallery_box_data.image_width -
            ("vertical" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_width
              : 0) -
            e,
        }),
        jQuery(
          ".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video"
        ).css({
          maxWidth:
            gallery_box_data.image_width -
            ("vertical" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_width
              : 0) -
            e,
        }),
        "horizontal" == gallery_box_data.filmstrip_direction &&
          (jQuery(".bwg_filmstrip_container").css({
            width: gallery_box_data.image_width - e,
          }),
          jQuery(".bwg_filmstrip").css({
            width:
              gallery_box_data.image_width -
              e -
              2 *
                ("horizontal" == gallery_box_data.filmstrip_direction
                  ? jQuery(".bwg_filmstrip_right").width()
                  : jQuery(".bwg_filmstrip_right").height()),
          })),
        (bwg_popup_current_width = gallery_box_data.image_width))
      : (jQuery("#spider_popup_wrap").css({
          width: jQuery(window).width(),
          left: 0,
          marginLeft: 0,
          zIndex: 100002,
        }),
        jQuery(".bwg_image_wrap").css({ width: jQuery(window).width() - e }),
        jQuery(".bwg_image_container").css({
          width:
            jQuery(window).width() -
            ("vertical" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_width
              : 0) -
            e,
        }),
        jQuery(".bwg_popup_image").css({
          maxWidth:
            jQuery(window).width() -
            ("vertical" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_width
              : 0) -
            e,
        }),
        jQuery(
          ".bwg_popup_embed > .bwg_embed_frame > img, .bwg_popup_embed > .bwg_embed_frame > video"
        ).css({
          maxWidth:
            jQuery(window).width() -
            ("vertical" == gallery_box_data.filmstrip_direction
              ? gallery_box_data.image_filmstrip_width
              : 0) -
            e,
        }),
        "horizontal" == gallery_box_data.filmstrip_direction &&
          (jQuery(".bwg_filmstrip_container").css({
            width: jQuery(window).width() - e,
          }),
          jQuery(".bwg_filmstrip").css({
            width:
              jQuery(window).width() -
              e -
              2 *
                ("horizontal" == gallery_box_data.filmstrip_direction
                  ? jQuery(".bwg_filmstrip_right").width()
                  : jQuery(".bwg_filmstrip_right").height()),
          })),
        (bwg_popup_current_width = jQuery(window).width())),
    bwg_resize_instagram_post(),
    bwg_change_watermark_container(),
    window.innerHeight >
      gallery_box_data.image_height -
        2 * gallery_box_data.lightbox_close_btn_top &&
    jQuery(window).width() >=
      gallery_box_data.image_width -
        2 * gallery_box_data.lightbox_close_btn_right &&
    1 != gallery_box_data.open_with_fullscreen
      ? jQuery(".spider_popup_close_fullscreen").attr(
          "class",
          "spider_popup_close"
        )
      : jQuery("#spider_popup_wrap").width() < jQuery(window).width() &&
        jQuery("#spider_popup_wrap").height() < jQuery(window).height() &&
        jQuery(".spider_popup_close").attr(
          "class",
          "bwg_ctrl_btn spider_popup_close_fullscreen"
        );
  var t = jQuery(".bwg_ctrl_btn_container").height();
  "bottom" == gallery_box_data.lightbox_ctrl_btn_pos &&
    jQuery(".bwg_toggle_container i").hasClass("bwg-icon-caret-down") &&
    jQuery(".bwg_toggle_container").css("bottom", t + "px"),
    "top" == gallery_box_data.lightbox_ctrl_btn_pos &&
      jQuery(".bwg_toggle_container i").hasClass("bwg-icon-caret-up") &&
      jQuery(".bwg_toggle_container").css("top", t + "px");
}
function bwg_rating(e, t, i, a) {
  (lightbox_rate_stars_count = gallery_box_data.lightbox_rate_stars_count),
    (lightbox_rate_size = gallery_box_data.lightbox_rate_size),
    (lightbox_rate_icon = gallery_box_data.lightbox_rate_icon);
  var r = "Not rated yet.";
  0 != i && "" != i && (r = parseFloat(i).toFixed(1) + "\n Votes: " + t),
    void 0 !== jQuery().raty &&
      jQuery.isFunction(jQuery().raty) &&
      jQuery("#bwg_star").raty({
        score: function () {
          return jQuery(this).attr("data-score");
        },
        starType: "i",
        number: lightbox_rate_stars_count,
        size: lightbox_rate_size,
        readOnly: function () {
          return !!e;
        },
        noRatedMsg: "Not rated yet.",
        click: function (t, e) {
          jQuery("#bwg_star").hide(),
            jQuery("#bwg_rated").show(),
            spider_set_input_value("rate_ajax_task", "save_rate"),
            jQuery
              .when(spider_rate_ajax_save("bwg_rate_form"))
              .then(function () {
                (gallery_box_data.data[a].rate = t),
                  ++gallery_box_data.data[a].rate_count;
                var e = parseFloat(jQuery("#bwg_star").attr("data-score"));
                (gallery_box_data.data[a].avg_rating = e
                  ? ((e + t) / 2).toFixed(1)
                  : t.toFixed(1)),
                  bwg_rating(
                    gallery_box_data.data[a].rate,
                    gallery_box_data.data[a].rate_count,
                    gallery_box_data.data[a].avg_rating,
                    gallery_box_data.current_image_key
                  );
              });
        },
        starHalf:
          "bwg-icon-" +
          lightbox_rate_icon +
          ("star" == lightbox_rate_icon ? "-half" : "") +
          "-o",
        starOff: "bwg-icon-" + lightbox_rate_icon + "-o",
        starOn: "bwg-icon-" + lightbox_rate_icon,
        cancelOff: "bwg-icon-minus-square-o",
        cancelOn: "bwg-icon-minus-square-o",
        cancel: !1,
        cancelHint: "Cancel your rating.",
        hints: [r, r, r, r, r],
        alreadyRatedMsg:
          parseFloat(i).toFixed(1) + "\nYou have already rated.\nVotes: " + t,
      });
}
function changeDownloadsTotal(e) {
  var t = 0;
  0 == jQuery("[name=option_show_digital_items_count]").val()
    ? jQuery("[name=selected_download_item]:checked").each(function () {
        t += Number(jQuery(this).closest("tr").attr("data-price"));
      })
    : jQuery(".digital_image_count").each(function () {
        0 != Number(jQuery(this).val()) &&
          (t +=
            Number(jQuery(this).closest("tr").attr("data-price")) *
            Number(jQuery(this).val()));
      }),
    (t = t
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")),
    jQuery(".product_downloads_price").html(t);
}
function changeMenualTotal(e) {
  Number(jQuery(e).val()) <= 0 && jQuery(e).val("1");
  var t = Number(jQuery(e).val()),
    i = Number(jQuery(".product_manual_price").attr("data-actual-price"));
  (i = (i *= t)
    .toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")),
    jQuery(".product_manual_price").html(i);
}
function onSelectableParametersChange(e) {
  var t = 0,
    i = gallery_box_data.data[jQuery("#bwg_current_image_key").val()]
      .pricelist_manual_price
      ? gallery_box_data.data[jQuery("#bwg_current_image_key").val()]
          .pricelist_manual_price
      : "0";
  i = parseFloat(i.replace(",", ""));
  var a = jQuery(e)
      .closest(".image_selected_parameter")
      .attr("data-parameter-type"),
    r = jQuery(e).val();
  r = r.split("*");
  var _ = parseFloat(r[1]),
    s = r[0],
    o = Number(
      jQuery(e)
        .closest(".image_selected_parameter")
        .find(".already_selected_values")
        .val()
    );
  if ("4" == a || "5" == a) {
    var l = parseFloat(s + _);
    jQuery(e)
      .closest(".image_selected_parameter")
      .find(".already_selected_values")
      .val(l);
  } else if ("6" == a) {
    if (0 == jQuery(e).is(":checked")) var n = o - parseFloat(s + _);
    else n = o + parseFloat(s + _);
    jQuery(e)
      .closest(".image_selected_parameter")
      .find(".already_selected_values")
      .val(n);
  }
  jQuery(".already_selected_values").each(function () {
    t += Number(jQuery(this).val());
  }),
    (i += t),
    jQuery(".product_manual_price").attr("data-actual-price", i),
    (i = (i *=
      Number(jQuery(".image_count").val()) <= 0
        ? 1
        : Number(jQuery(".image_count").val()))
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")),
    jQuery(".product_manual_price").html(i);
}
function onBtnClickAddToCart() {
  var e = jQuery("[name=type]").val();
  if ("" != e) {
    var t = {};
    if ("manual" == e) {
      var i = jQuery(".image_count").val(),
        a = {};
      jQuery(".manual")
        .find(".image_selected_parameter")
        .each(function () {
          var e = jQuery(this).attr("data-parameter-id"),
            t = "";
          switch (jQuery(this).attr("data-parameter-type")) {
            case "2":
              t = jQuery(this).find("input").val();
              break;
            case "3":
              t = jQuery(this).find("textarea").val();
              break;
            case "4":
              t = jQuery(this).find("select :selected").val();
              break;
            case "5":
              t = jQuery(this).find("[type=radio]:checked").val();
              break;
            case "6":
              var i = [];
              jQuery(this)
                .find("[type=checkbox]:checked")
                .each(function () {
                  i.push(jQuery(this).val());
                }),
                (t = i);
          }
          a[e] = t;
        }),
        (t.count = i),
        (t.parameters = a),
        (t.price = jQuery(".product_manual_price")
          .attr("data-price")
          .replace(",", ""));
    } else {
      var r = [];
      if (0 == jQuery("[name=option_show_digital_items_count]").val()) {
        if (0 == jQuery("[name=selected_download_item]:checked").length)
          return void jQuery(".add_to_cart_msg").html(
            "You must select at least one item."
          );
        jQuery("[name=selected_download_item]:checked").each(function () {
          var e = {};
          (e.id = jQuery(this).val()),
            (e.count = 1),
            (e.price = jQuery(this).closest("tr").attr("data-price")),
            r.push(e);
        });
      } else
        jQuery(".digital_image_count").each(function () {
          var e = {};
          0 < jQuery(this).val() &&
            ((e.id = jQuery(this).closest("tr").attr("data-id")),
            (e.price = jQuery(this).closest("tr").attr("data-price")),
            (e.count = jQuery(this).val()),
            r.push(e));
        });
      if (0 == (t.downloadItems = r).length)
        return void jQuery(".add_to_cart_msg").html(
          "Please select at least one item"
        );
    }
    var _ = jQuery("#ajax_url").val(),
      s = {
        action: "add_cart",
        task: "add_cart",
        controller: "checkout",
        image_id: jQuery("#bwg_popup_image").attr("image_id"),
        type: e,
        data: JSON.stringify(t),
      };
    jQuery.ajax({
      type: "POST",
      url: _,
      data: s,
      success: function (e) {
        (responseData = JSON.parse(e)),
          jQuery(".add_to_cart_msg").html(responseData.msg),
          jQuery(".products_in_cart").html(responseData.products_in_cart),
          1 == responseData.redirect &&
            (window.location.href =
              "<?php echo get_permalink($options->checkout_page);?>");
      },
      beforeSend: function () {},
      complete: function () {},
    });
  } else
    jQuery(".add_to_cart_msg").html(
      "Please select Prints and products or Downloads"
    );
}
function onBtnViewCart() {
  var e = jQuery("[name=option_checkout_page]").val();
  jQuery("#bwg_ecommerce_form").attr("action", e),
    jQuery("#bwg_ecommerce_form").submit();
}
function bwg_load_visible_images(e, t, i) {
  0 <= e - t && (startPoint = e - t), i < e + t && (endPoint = i);
  for (var a = startPoint; a <= endPoint; a++) {
    var r = jQuery("#bwg_filmstrip_thumbnail_" + a + " img");
    r.removeClass("bwg-hidden"), r.attr("src", r.data("url"));
  }
}
function bwg_load_filmstrip() {
  for (var e = 1; e <= total_thumbnail_count; e++) {
    var t;
    if (
      ((leftIndex = startPoint - e),
      (rightIndex = endPoint + e),
      rightIndex < total_thumbnail_count)
    )
      (t = jQuery(
        "#bwg_filmstrip_thumbnail_" + rightIndex + " img"
      )).removeClass("bwg-hidden"),
        t.attr("src", t.data("url"));
    if (0 <= leftIndex)
      (t = jQuery(
        "#bwg_filmstrip_thumbnail_" + leftIndex + " img"
      )).removeClass("bwg-hidden"),
        t.attr("src", t.data("url"));
  }
  jQuery(".bwg_filmstrip_thumbnail").each(function () {
    var e = jQuery(this).find("img");
    void 0 === e.attr("style") &&
      (0 == e.width()
        ? e.on("load", function () {
            jQuery(this).find(".bwg_filmstrip_thumbnail_img_wrap"),
              bwg_filmstrip_thumb_view(e);
          })
        : (jQuery(this).find(".bwg_filmstrip_thumbnail_img_wrap"),
          bwg_filmstrip_thumb_view(e)));
  });
}
function bwg_filmstrip_thumb_view(e) {
  var t = gallery_box_data.image_filmstrip_height,
    i = gallery_box_data.image_filmstrip_width,
    a = i - gallery_box_data.filmstrip_thumb_right_left_space,
    r = t,
    _ = Math.max(i / e.width(), t / e.height()),
    s = e.width() * _,
    o = e.height() * _;
  e.css({
    width: s,
    height: o,
    marginLeft: (a - s) / 2,
    marginTop: (r - o) / 2,
  });
}
function bwg_info_height_set() {
  bwg_info_position(!1),
    jQuery(".mCustomScrollBox").length &&
      jQuery(".bwg_image_info_container1").height() <
        jQuery(".mCustomScrollBox").height() +
          jQuery(".bwg_toggle_container").height() +
          bwg_image_info_pos +
          2 * parseInt(gallery_box_data.lightbox_info_margin) &&
      jQuery(".bwg_image_info").css({
        height:
          jQuery(".bwg_image_info_container1").height() -
          jQuery(".bwg_toggle_container").height() -
          bwg_image_info_pos -
          2 * parseInt(gallery_box_data.lightbox_info_margin),
      });
}
function bwg_info_position(e) {
  var t = 0,
    i = "none";
  "top" == gallery_box_data.lightbox_ctrl_btn_pos
    ? "top" == gallery_box_data.lightbox_info_pos && (i = "top")
    : "bottom" == gallery_box_data.lightbox_info_pos && (i = "bottom"),
    jQuery(".bwg_ctrl_btn_container").hasClass("closed") ||
      ("top" == gallery_box_data.lightbox_ctrl_btn_pos
        ? "top" == gallery_box_data.lightbox_info_pos &&
          (t = jQuery(".bwg_ctrl_btn_container").height())
        : "bottom" == gallery_box_data.lightbox_info_pos &&
          (t = jQuery(".bwg_ctrl_btn_container").height())),
    "top" == i
      ? 0 == e
        ? jQuery(".bwg_image_info").css("top", t)
        : jQuery(".bwg_image_info").animate({ top: t + "px" }, 500)
      : "bottom" == i &&
        (0 == e
          ? jQuery(".bwg_image_info").css("bottom", t)
          : jQuery(".bwg_image_info").animate({ bottom: t + "px" }, 500));
}
function spider_display_embed(e, t, i, a) {
  var r = "";
  switch (e) {
    case "EMBED_OEMBED_YOUTUBE_VIDEO":
      var _ = "<iframe ";
      for (attr in ("" != i &&
        (_ +=
          ' src="//www.youtube.com/embed/' +
          i +
          '?enablejsapi=1&wmode=transparent"'),
      a))
        /src/i.test(attr) ||
          ("" != attr &&
            "" != a[attr] &&
            (_ += " " + attr + '="' + a[attr] + '"'));
      r += _ += " ></iframe>";
      break;
    case "EMBED_OEMBED_VIMEO_VIDEO":
      var s = "<iframe ";
      for (attr in ("" != i &&
        (s += ' src="//player.vimeo.com/video/' + i + '?enablejsapi=1"'),
      a))
        /src/i.test(attr) ||
          ("" != attr &&
            "" != a[attr] &&
            (s += " " + attr + '="' + a[attr] + '"'));
      r += s += " ></iframe>";
      break;
    case "EMBED_OEMBED_FLICKR_IMAGE":
      var o = "<div ";
      for (attr in a)
        /src/i.test(attr) ||
          ("" != attr &&
            "" != a[attr] &&
            (o += " " + attr + '="' + a[attr] + '"'));
      (o += " >"),
        "" != i &&
          (o +=
            '<img src="' +
            i +
            '" style="max-width:100% !important; max-height:100% !important; width:auto !important; height:auto !important;">'),
        (r += o += "</div>");
      break;
    case "EMBED_OEMBED_FLICKR_VIDEO":
      break;
    case "EMBED_OEMBED_INSTAGRAM_VIDEO":
      var l = "<div ";
      for (attr in a)
        /src/i.test(attr) ||
          ("" != attr &&
            "" != a[attr] &&
            (l += " " + attr + '="' + a[attr] + '"'));
      (l += " >"),
        "" != t &&
          (l +=
            '<video style="width:auto !important; height:auto !important; max-width:100% !important; max-height:100% !important; margin:0 !important;" controls><source src="' +
            decodeURIComponent(t) +
            '" type="video/mp4"> Your browser does not support the video tag. </video>'),
        (r += l += "</div>");
      break;
    case "EMBED_OEMBED_INSTAGRAM_IMAGE":
      l = "<div ";
      for (attr in a)
        /src/i.test(attr) ||
          ("" != attr &&
            "" != a[attr] &&
            (l += " " + attr + '="' + a[attr] + '"'));
      (l += " >"),
        "" != t &&
          (l +=
            '<img src="' +
            decodeURIComponent(t) +
            '" style=" max-width:100% !important; max-height:100% !important; width:auto; height:auto;">'),
        (r += l += "</div>");
      break;
    case "EMBED_OEMBED_INSTAGRAM_POST":
      l = "<div ";
      for (attr in a)
        /src/i.test(attr) ||
          ("" != attr &&
            "" != a[attr] &&
            ((l += " " + attr + '="' + a[attr] + '"'),
            ("CLASS" != attr && "class" != attr && "Class" != attr) ||
              (obj_class = a[attr])));
      (l += ">"),
        "" != t &&
          (l +=
            '<div class="inner_instagram_iframe_' +
            obj_class +
            '" frameborder="0" scrolling="no" allowtransparency="false" allowfullscreen  style="max-width: 100% !important; max-height: 100% !important; width: 100%; height: 100%; margin:0; vertical-align:middle;">' +
            atob(t) +
            "</div>"),
        (r += l += "</div>");
      break;
    case "EMBED_OEMBED_FACEBOOK_IMAGE":
      var n = "<span ";
      for (attr in a)
        /src/i.test(attr) ||
          ("" != attr &&
            "" != a[attr] &&
            (n += " " + attr + '="' + a[attr] + '"'));
      (n += " >"),
        "" != i &&
          (n +=
            '<img src="' +
            t +
            '" style=" max-width:100% !important; max-height:100% !important; width:auto; height:100%;">'),
        (r += n += "</span>");
      break;
    case "EMBED_OEMBED_FACEBOOK_VIDEO":
      var g = "<div ";
      for (attr in a)
        /src/i.test(attr) ||
          ("" != attr &&
            "" != a[attr] &&
            (g += " " + attr + '="' + a[attr] + '"'));
      (g += " >"),
        "" != i &&
          (g +=
            '<iframe src="//www.facebook.com/video/embed?video_id=' +
            t +
            '&enablejsapi=1&wmode=transparent" style="max-width:100% !important; max-height:100% !important; width:100%; height:100%; margin:0; display:table-cell; vertical-align:middle;"frameborder="0" class="bwg_fb_video" scrolling="no" allowtransparency="false" allowfullscreen></iframe>'),
        (r += g += "</div>");
      break;
    case "EMBED_OEMBED_DAILYMOTION_VIDEO":
      var w = "<iframe ";
      for (attr in ("" != i &&
        (w +=
          ' src="//www.dailymotion.com/embed/video/' + i + '?api=postMessage"'),
      a))
        /src/i.test(attr) ||
          ("" != attr &&
            "" != a[attr] &&
            (w += " " + attr + '="' + a[attr] + '"'));
      r += w += " ></iframe>";
      break;
    case "EMBED_OEMBED_IMGUR":
      var b = "<div ";
      for (attr in a)
        /src/i.test(attr) ||
          ("" != attr &&
            "" != a[attr] &&
            (l += " " + attr + '="' + a[attr] + '"'));
      (b += " >"),
        "" != i &&
          (b +=
            '<img src="' +
            i +
            '" style="max-width:100% !important; max-height:100% !important; width:auto; height:auto !important;">'),
        (r += b += "</div>");
      break;
    case "EMBED_OEMBED_GOOGLE_PHOTO_IMAGE":
      var u = "<div ";
      for (attr in a)
        /src/i.test(attr) ||
          ("" != attr &&
            "" != a[attr] &&
            (u += " " + attr + '="' + a[attr] + '"'));
      (u += " >"),
        "" != i &&
          (u +=
            '<img src="' +
            t +
            '" style=" max-width:100% !important; max-height:100% !important; width:auto; height:auto;">'),
        (r += u += "</div>");
      break;
    default:
      var d = { content: "" };
      jQuery(document).trigger("bwg_display_embed", [d, e, t, i, a]),
        (r = d.content);
  }
  return r;
}
function bwg_add_instagram_gallery(e, s) {
  if (!0 === (s = void 0 !== s && s)) {
    if (bwg_check_instagram_gallery_input(e, s)) return !1;
    var t = "0";
    1 == jQuery("input[name=popup_instagram_post_gallery]:checked").val() &&
      (t = "1");
    var i = encodeURI(jQuery("#popup_instagram_gallery_source").val()),
      a = encodeURI(jQuery("#popup_instagram_image_number").val());
  } else {
    if (bwg_check_instagram_gallery_input(e, s)) return !1;
    if (!bwg_check_gallery_empty(!1, !0)) return !1;
    t = "0";
    1 == jQuery("input[name=instagram_post_gallery]:checked").val() &&
      (t = "1");
    i = encodeURI(jQuery("#gallery_source").val());
    var r = jQuery("input[name=update_flag]:checked").val();
    a = encodeURI(jQuery("#autogallery_image_number").val());
  }
  jQuery("#bulk_embed").hide(), jQuery("#loading_div").show();
  var o = [],
    _ = {
      action: "addInstagramGallery",
      instagram_user: i,
      instagram_access_token: e,
      whole_post: t,
      autogallery_image_number: a,
      update_flag: r,
      async: !0,
    };
  jQuery.post(ajax_url, _, function (e) {
    if (0 == e)
      return (
        alert("Error: cannot get response from the server."),
        jQuery("#loading_div").hide(),
        s && jQuery("#bulk_embed").show(),
        !1
      );
    var t = e.indexOf("WD_delimiter_start"),
      i = e.indexOf("WD_delimiter_end");
    if (-1 == t || -1 == i)
      return (
        jQuery("#loading_div").hide(), s && jQuery("#bulk_embed").show(), !1
      );
    if (
      ((e = e.substring(t + 18, i)),
      (response_JSON = JSON.parse(e)),
      response_JSON)
    ) {
      if ("error" == response_JSON[0])
        return (
          alert("Error: " + JSON.parse(e)[1]),
          jQuery("#loading_div").hide(),
          s && jQuery("#bulk_embed").show(),
          !1
        );
      for (var a = response_JSON.length, r = 1; r <= a; r++)
        if (0 != response_JSON[a - r]) {
          var _ = response_JSON[a - r];
          o.push(_);
        }
      return (
        bwg_add_image(o),
        s ||
          (bwg_gallery_update_flag(),
          jQuery("#tr_instagram_gallery_add_button").hide()),
        jQuery("#loading_div").hide(),
        s && jQuery(".opacity_bulk_embed").hide(),
        "ok"
      );
    }
    return (
      alert("There is some error. Cannot add Instagram gallery."),
      jQuery("#loading_div").hide(),
      s && jQuery("#bulk_embed").show(),
      !1
    );
  });
}
var bwg = 0,
  isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent.toLowerCase()
    ),
  bwg_click = isMobile ? "touchend" : "click",
  bwg_params = [],
  bwg_params_ib = [],
  bwg_params_carousel = [];
function bwg_main_ready() {
  1 == bwg_objectsL10n.lazy_load &&
    jQuery(function () {
      jQuery("img.bwg_lazyload").lazy({
        onFinishedAll: function () {
          jQuery(".lazy_loader").removeClass("lazy_loader");
        },
      });
    }),
    jQuery(".bwg_container").each(function () {
      0 < jQuery(this).find(".wd_error").length &&
        bwg_container_loaded(jQuery(this).data("bwg"));
    }),
    bwg_document_ready(),
    jQuery(
      ".bwg-thumbnails, .bwg-masonry-thumbnails, .bwg-album-thumbnails"
    ).each(function () {
      bwg_all_thumnails_loaded(this);
    }),
    jQuery(".bwg-mosaic-thumbnails").each(function () {
      bwg_thumbnail_mosaic(this);
    }),
    bwg_slideshow_ready(),
    bwg_carousel_ready(),
    bwg_carousel_onload(),
    bwg_image_browser_ready();
}
function bwg_resize_search_line() {
  jQuery(".search_line").each(function () {
    var e = jQuery(this);
    e.width() < 410
      ? e.addClass("bwg-search-line-responsive")
      : e.removeClass("bwg-search-line-responsive");
  });
}
function bwg_slideshow_resize() {
  jQuery(".bwg_slideshow").each(function () {
    (bwg = jQuery(this).attr("data-bwg")),
      jQuery("#bwg_slideshow_image_container_" + bwg).length &&
        ((bwg_params[bwg] = JSON.parse(
          jQuery("#bwg_slideshow_image_container_" + bwg).attr("data-params")
        )),
        (bwg_params[bwg].event_stack = []),
        bwg_popup_resize(bwg));
  });
}
function bwg_blog_style_resize() {
  jQuery(".bwg_blog_style").each(function () {
    (bwg = jQuery(this).attr("data-bwg")),
      jQuery(".bwg_embed_frame_16x9_" + bwg).each(function (e) {
        jQuery(this).width(jQuery(this).parent().width()),
          jQuery(this).height(0.5625 * jQuery(this).width());
      }),
      jQuery(".bwg_embed_frame_instapost_" + bwg).each(function (e) {
        jQuery(this).width(jQuery(this).parent().width()),
          jQuery(this).height(
            ((jQuery(this).width() - 16) * jQuery(this).attr("data-height")) /
              jQuery(this).attr("data-width") +
              96
          );
      });
  });
}
function bwg_blog_style_onload() {
  jQuery(".bwg_blog_style").each(function () {
    bwg = jQuery(this).attr("data-bwg");
    jQuery("#bwg_blog_style_" + bwg);
    jQuery(".bwg_embed_frame_16x9_" + bwg).each(function (e) {
      if (
        jQuery(".bwg_blog_style_image_" + bwg).find(
          ".fluid-width-video-wrapper"
        ).length
      ) {
        jQuery(".fluid-width-video-wrapper").removeAttr("style");
        var t = jQuery(this)
          .parents(".bwg_blog_style_image_" + bwg)
          .find(".fluid-width-video-wrapper")
          .contents();
        jQuery(this).parents(".fluid-width-video-wrapper").replaceWith(t);
      }
      jQuery(this).width(
        jQuery(this)
          .parents(".bwg_blog_style_image_" + bwg)
          .width()
      ),
        jQuery(this).height(0.5625 * jQuery(this).width());
    }),
      jQuery(".bwg_embed_frame_instapost_" + bwg).each(function (e) {
        jQuery(this).width(
          jQuery(this)
            .parents(".bwg_blog_style_image_" + bwg)
            .width()
        ),
          jQuery(this).height(
            ((jQuery(this).width() - 16) * jQuery(this).attr("data-height")) /
              jQuery(this).attr("data-width") +
              96
          );
      }),
      bwg_container_loaded(bwg);
  });
}
function bwg_blog_style_ready() {
  jQuery(".bwg_blog_style").each(function () {
    var e = jQuery(this).attr("data-bwg");
    bwg_container_loaded(e);
    var t = !1;
    jQuery(this)
      .find(".bwg_lightbox_" + e)
      .on("click", function () {
        var e = jQuery(this).attr("data-image-id");
        if (
          (jQuery("#bwg_blog_style_share_buttons_" + e).removeAttr(
            "data-open-comment"
          ),
          !t)
        )
          return (
            (t = !0),
            setTimeout(function () {
              t = !1;
            }, 100),
            bwg_gallery_box(e, jQuery(this).closest(".bwg_container")),
            !1
          );
      }),
      jQuery(".bwg_lightbox_" + e + " .bwg_ecommerce").on(
        "click",
        function (e) {
          if ((e.stopPropagation(), !t))
            return (
              (t = !0),
              setTimeout(function () {
                t = !1;
              }, 100),
              bwg_gallery_box(
                jQuery(this).attr("data-image-id"),
                jQuery(this).closest(".bwg_container"),
                !0
              ),
              !1
            );
        }
      );
    var i = window.location.hash.substring(1);
    i &&
      "-1" != i.indexOf("bwg") &&
      ((bwg_hash_array = i.replace("bwg", "").split("/")),
      "<?php echo $params_array['gallery_id']; ?>" == bwg_hash_array[0] &&
        bwg_gallery_box(bwg_hash_array[1]));
  });
}
function bwg_slideshow_focus() {
  jQuery(".bwg_slideshow").each(function () {
    (bwg = jQuery(this).attr("data-bwg")),
      jQuery("#bwg_slideshow_image_container_" + bwg).length &&
        ((bwg_params[bwg] = JSON.parse(
          jQuery("#bwg_slideshow_image_container_" + bwg).attr("data-params")
        )),
        (bwg_params[bwg].event_stack = []),
        window.clearInterval(window["bwg_playInterval" + bwg]),
        jQuery(".bwg_ctrl_btn_" + bwg).hasClass("bwg-icon-play") ||
          bwg_play(bwg_params[bwg].data, bwg));
  });
}
function bwg_slideshow_blur() {
  jQuery(".bwg_slideshow").each(function () {
    (bwg = jQuery(this).attr("data-bwg")),
      jQuery("#bwg_slideshow_image_container_" + bwg).length &&
        ((bwg_params[bwg] = JSON.parse(
          jQuery("#bwg_slideshow_image_container_" + bwg).attr("data-params")
        )),
        (bwg_params[bwg].event_stack = []),
        window.clearInterval(window["bwg_playInterval" + bwg]));
  });
}
function bwg_carousel_ready() {
  jQuery(".bwg-carousel").each(function () {
    var t = jQuery(this).data("bwg");
    (bwg_params_carousel[t] = []),
      (bwg_params_carousel[t].bwg_currentCenterNum = 1),
      (bwg_params_carousel[t].bwg_currentlyMoving = !1),
      (bwg_params_carousel[t].data = []),
      jQuery("#spider_carousel_left-ico_" + t).on("click", function (e) {
        bwg_params_carousel[t].carousel.prev(),
          e.stopPropagation(),
          e.stopImmediatePropagation();
      }),
      jQuery("#spider_carousel_right-ico_" + t).on("click", function (e) {
        bwg_params_carousel[t].carousel.next(),
          e.stopPropagation(),
          e.stopImmediatePropagation();
      }),
      parseInt(bwg_params_carousel[t].carousel_enable_autoplay) &&
        (jQuery(".bwg_carousel_play_pause_" + t).attr(
          "title",
          bwg_objectsL10n.pause
        ),
        jQuery(".bwg_carousel_play_pause_" + t).attr(
          "class",
          "bwg-icon-pause bwg_ctrl_btn_" + t + " bwg_carousel_play_pause_" + t
        )),
      jQuery(".bwg_carousel_play_pause_" + t).on(bwg_click, function (e) {
        jQuery(".bwg_ctrl_btn_" + t).hasClass("bwg-icon-play")
          ? (jQuery(".bwg_carousel_play_pause_" + t).attr(
              "title",
              bwg_objectsL10n.pause
            ),
            jQuery(".bwg_carousel_play_pause_" + t).attr(
              "class",
              "bwg-icon-pause bwg_ctrl_btn_" +
                t +
                " bwg_carousel_play_pause_" +
                t
            ),
            bwg_params_carousel[t].carousel.start())
          : (jQuery(".bwg_carousel_play_pause_" + t).attr(
              "title",
              bwg_objectsL10n.play
            ),
            jQuery(".bwg_carousel_play_pause_" + t).attr(
              "class",
              "bwg-icon-play bwg_ctrl_btn_" +
                t +
                " bwg_carousel_play_pause_" +
                t
            ),
            bwg_params_carousel[t].carousel.pause()),
          e.stopPropagation(),
          e.stopImmediatePropagation();
      }),
      void 0 !== jQuery().swiperight &&
        jQuery.isFunction(jQuery().swiperight) &&
        jQuery("#bwg_container1_" + t).swiperight(function () {
          bwg_params_carousel[t].carousel.prev();
        }),
      void 0 !== jQuery().swipeleft &&
        jQuery.isFunction(jQuery().swipeleft) &&
        jQuery("#bwg_container1_" + t).swipeleft(function () {
          bwg_params_carousel[t].carousel.next();
        });
  });
}
function bwg_carousel_resize() {
  jQuery(".bwg-carousel").each(function () {
    var e = jQuery(this).data("bwg");
    bwg_carousel_params(e, !0),
      bwg_params_carousel[e].carousel.pause(),
      bwg_carousel_watermark(e),
      jQuery(".bwg_ctrl_btn_" + e).hasClass("bwg-icon-play") ||
        bwg_params_carousel[e].carousel.start();
  });
}
function bwg_carousel_onload() {
  jQuery(".bwg-carousel").each(function () {
    var e = jQuery(this).data("bwg");
    (bwg_params_carousel[e] = jQuery(this).data("params")),
      (bwg_params_carousel[e].parent_width = 0),
      bwg_carousel_watermark(e),
      bwg_carousel_params(e, !1),
      bwg_container_loaded(e);
  });
}
function bwg_carousel_params(t, e) {
  var i = jQuery("#bwg_container1_" + t).parent();
  i.hasClass("elementor-tab-content") &&
    i.width(i.closest(".elementor-widget-wrap").width());
  var a = i.width(),
    r = 1;
  a < bwg_params_carousel[t].carousel_r_width
    ? (r = a / bwg_params_carousel[t].carousel_r_width)
    : (a = bwg_params_carousel[t].carousel_r_width),
    bwg_params_carousel[t].parent_width != a &&
      ((bwg_params_carousel[t].parent_width = a),
      bwg_params_carousel[t].carousel_image_column_number >
        bwg_params_carousel[t].count &&
        (bwg_params_carousel[t].carousel_image_column_number =
          bwg_params_carousel[t].count),
      jQuery(".bwg_carousel_play_pause_" + t).css({
        display: parseInt(bwg_params_carousel[t].carousel_play_pause_butt)
          ? ""
          : "none",
      }),
      parseInt(bwg_params_carousel[t].carousel_prev_next_butt)
        ? (jQuery("#bwg_carousel-right" + t).css({ display: "" }),
          jQuery("#bwg_carousel-left" + t).css({ display: "" }))
        : (jQuery("#bwg_carousel-left" + t).css({ display: "none" }),
          jQuery("#bwg_carousel-right" + t).css({ display: "none" })),
      jQuery(".inner_instagram_iframe_bwg_embed_frame_" + t).each(function () {
        var e = jQuery(this).parent();
        bwg_params_carousel[t].image_height /
          (parseInt(e.attr("data-height")) + 96) <
        bwg_params_carousel[t].image_width / parseInt(e.attr("data-width"))
          ? (e.height(bwg_params_carousel[t].image_height * r),
            e.width(
              ((e.height() - 96) * e.attr("data-width")) /
                e.attr("data-height") +
                16
            ))
          : (e.width(bwg_params_carousel[t].image_width * r),
            e.height(
              ((e.width() - 16) * e.attr("data-height")) /
                e.attr("data-width") +
                96
            ));
      }),
      jQuery(".bwg_carousel_image_container_" + t).css({
        width: bwg_params_carousel[t].image_width * r,
        height: bwg_params_carousel[t].image_height * r,
      }),
      jQuery(
        ".bwg_carousel_watermark_text_" +
          t +
          ", .bwg_carousel_watermark_text_" +
          t +
          ":hover"
      ).css({
        fontSize:
          a *
          (bwg_params_carousel[t].watermark_font_size /
            bwg_params_carousel[t].image_width) *
          r,
      }),
      jQuery(".bwg_carousel-image " + t).css({
        width: bwg_params_carousel[t].image_width * r,
        height: bwg_params_carousel[t].image_height * r,
      }),
      jQuery(".bwg_carousel_watermark_container_" + t).css({
        width: bwg_params_carousel[t].image_width * r,
        height: bwg_params_carousel[t].image_height * r,
      }),
      jQuery(".bwg_carousel_embed_video_" + t).css({
        width: bwg_params_carousel[t].image_width * r,
        height: bwg_params_carousel[t].image_height * r,
      }),
      jQuery(".bwg_carousel_watermark_spun_" + t).css({
        width: bwg_params_carousel[t].image_width * r,
        height: bwg_params_carousel[t].image_height * r,
      }),
      jQuery(".bwg_carousel-container" + t).css({
        width: a,
        height: bwg_params_carousel[t].image_height * r,
      }),
      jQuery(".bwg_video_hide" + t).css({
        width: bwg_params_carousel[t].image_width * r,
        height: bwg_params_carousel[t].image_height * r,
      }),
      (bwg_params_carousel[t].carousel && !e) ||
        (e &&
          bwg_params_carousel[t].carousel &&
          bwg_params_carousel[t].carousel.pause(),
        (bwg_params_carousel[t].carousel = jQuery(
          "#bwg_carousel" + t
        ).featureCarousel({
          containerWidth: a * r,
          containerHeight: bwg_params_carousel[t].image_height * r,
          fit_containerWidth:
            bwg_params_carousel[t].carousel_fit_containerWidth,
          largeFeatureWidth: bwg_params_carousel[t].image_width * r,
          largeFeatureHeight: bwg_params_carousel[t].image_height * r,
          smallFeaturePar: bwg_params_carousel[t].carousel_image_par,
          currentlyMoving: !1,
          startingFeature: bwg_params_carousel[t].bwg_currentCenterNum,
          featuresArray: [],
          timeoutVar: null,
          rotationsRemaining: 0,
          autoPlay: 1e3 * bwg_params_carousel[t].car_inter,
          interval: 1e3 * bwg_params_carousel[t].carousel_interval,
          imagecount: bwg_params_carousel[t].carousel_image_column_number,
          bwg_number: t,
          enable_image_title: bwg_params_carousel[t].enable_image_title,
          borderWidth: 0,
        }))));
}
function bwg_carousel_watermark(e) {
  var t = 1,
    i = jQuery("#bwg_container1_" + e)
      .parent()
      .width();
  if (
    (i < bwg_params_carousel[e].carousel_r_width &&
      (t = i / bwg_params_carousel[e].carousel_r_width),
    i >= bwg_params_carousel[e].image_width)
  )
    bwg_carousel_change_watermark_container(e),
      jQuery("#bwg_carousel_play_pause-ico_" + e).css({
        fontSize: bwg_params_carousel[e].carousel_play_pause_btn_size,
      }),
      jQuery(".bwg_carousel_watermark_image_" + e).css({
        maxWidth: bwg_params_carousel[e].watermark_width * t,
        maxHeight: bwg_params_carousel[e].watermark_height * t,
      }),
      jQuery(
        ".bwg_carousel_watermark_text_" +
          e +
          ", .bwg_carousel_watermark_text_" +
          e +
          ":hover"
      ).css({ fontSize: t * bwg_params_carousel[e].watermark_font_size });
  else {
    var a = bwg_params_carousel[e].image_width / t;
    bwg_carousel_change_watermark_container(e),
      jQuery("#bwg_carousel_play_pause-ico_" + e).css({
        fontSize: (i * bwg_params_carousel[e].carousel_play_pause_btn_size) / a,
      }),
      jQuery(".bwg_carousel_watermark_image_" + e).css({
        maxWidth: (i * bwg_params_carousel[e].watermark_width) / a,
        maxHeight: (i * bwg_params_carousel[e].watermark_height) / a,
      }),
      jQuery(
        ".bwg_carousel_watermark_text_" +
          e +
          ", .bwg_carousel_watermark_text_" +
          e +
          ":hover"
      ).css({ fontSize: (i * bwg_params_carousel[e].watermark_font_size) / a });
  }
}
function bwg_carousel_change_watermark_container(a) {
  jQuery(".bwg_carousel" + a)
    .children()
    .each(function () {
      if (2 == jQuery(this).css("zIndex")) {
        var e = jQuery(this).find("img");
        e.length || (e = jQuery(this).find("iframe"));
        var t = e.width(),
          i = e.height();
        jQuery(".bwg_carousel_watermark_spun_" + a).width(t),
          jQuery(".bwg_carousel_watermark_spun_" + a).height(i),
          jQuery(".bwg_carousel_title_spun_" + a).width(t),
          jQuery(".bwg_carouel_title_spun_" + a).height(i),
          jQuery(".bwg_carousel_watermark_" + a).css({ display: "none" });
      }
    });
}
function bwg_carousel_preload(e, t) {
  var i = jQuery(".bwg_carousel_preload").get();
  t || i.reverse();
  var a = 0;
  jQuery(i).each(function () {
    if (1 < ++a) return !1;
    jQuery(this)
      .parent()
      .hasClass("bwg_carousel_embed_video_" + e) ||
    jQuery(this)
      .parent()
      .hasClass("bwg_embed_frame_" + e) ||
    jQuery(this).parent().hasClass("bwg_carousel_video")
      ? (jQuery(this).attr("src", jQuery(this).attr("data-src")),
        jQuery(this).on("load", function () {
          jQuery(this).removeClass("bwg_carousel_preload");
        }),
        jQuery(this).parent().hasClass("bwg_carousel_video") &&
          (jQuery(".bwg_carousel_video")[0].load(),
          jQuery(this).parent().parent().removeClass("bwg_carousel_preload")),
        jQuery(this).removeAttr("data-src"))
      : (jQuery(this).css({
          "background-image":
            "url('" + jQuery(this).attr("data-background") + "')",
          height: "100%",
        }),
        jQuery(this).removeClass("bwg_carousel_preload"),
        jQuery(this).removeAttr("data-background"));
  });
}
function bwg_slideshow_ready() {
  jQuery(".bwg_slideshow").each(function () {
    var i = jQuery(this).data("bwg");
    if (jQuery("#bwg_slideshow_image_container_" + i).length) {
      (bwg_params[i] = JSON.parse(
        jQuery("#bwg_slideshow_image_container_" + i).attr("data-params")
      )),
        (bwg_params[i].event_stack = []),
        bwg_container_loaded(i);
      var e = bwg_params[i].data;
      void 0 !== jQuery().swiperight &&
        jQuery.isFunction(jQuery().swiperight) &&
        jQuery("#bwg_container1_" + i).swiperight(function () {
          return (
            bwg_change_image(
              parseInt(jQuery("#bwg_current_image_key_" + i).val()),
              0 <=
                parseInt(jQuery("#bwg_current_image_key_" + i).val()) -
                  bwg_iterator(i)
                ? (parseInt(jQuery("#bwg_current_image_key_" + i).val()) -
                    bwg_iterator(i)) %
                    e.length
                : e.length - 1,
              e,
              "",
              i
            ),
            !1
          );
        }),
        void 0 !== jQuery().swipeleft &&
          jQuery.isFunction(jQuery().swipeleft) &&
          jQuery("#bwg_container1_" + i).swipeleft(function () {
            return (
              bwg_change_image(
                parseInt(jQuery("#bwg_current_image_key_" + i).val()),
                parseInt(jQuery("#bwg_current_image_key_" + i).val()) +
                  (bwg_iterator(i) % e.length),
                e,
                "",
                i
              ),
              !1
            );
          });
      var t =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          navigator.userAgent.toLowerCase()
        )
          ? "touchend"
          : "click";
      bwg_popup_resize(i),
        jQuery(".bwg_slideshow_watermark_" + i).css({ display: "none" }),
        jQuery(".bwg_slideshow_title_text_" + i).css({ display: "none" }),
        jQuery(".bwg_slideshow_description_text_" + i).css({ display: "none" }),
        setTimeout(function () {
          bwg_change_watermark_container(i);
        }, 500),
        "horizontal" == bwg_params[i].filmstrip_direction
          ? jQuery(".bwg_slideshow_image_container_" + i).height(
              jQuery(".bwg_slideshow_image_wrap_" + i).height() -
                bwg_params[i].slideshow_filmstrip_height
            )
          : jQuery(".bwg_slideshow_image_container_" + i).width(
              jQuery(".bwg_slideshow_image_wrap_" + i).width() -
                bwg_params[i].slideshow_filmstrip_width
            );
      var a = /Firefox/i.test(navigator.userAgent)
        ? "DOMMouseScroll"
        : "mousewheel";
      jQuery(".bwg_slideshow_filmstrip_" + i).bind(a, function (e) {
        var t = window.event || e;
        return (
          0 <
          ((t = t.originalEvent ? t.originalEvent : t).detail
            ? -40 * t.detail
            : t.wheelDelta)
            ? jQuery(".bwg_slideshow_filmstrip_left_" + i).trigger("click")
            : jQuery(".bwg_slideshow_filmstrip_right_" + i).trigger("click"),
          !1
        );
      }),
        jQuery(".bwg_slideshow_filmstrip_right_" + i).on(t, function () {
          jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).stop(!0, !1),
            "left" == bwg_params[i].left_or_top
              ? "width" == bwg_params[i].width_or_height
                ? (jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                    .left >=
                    -(
                      jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).width() -
                      jQuery(".bwg_slideshow_filmstrip_" + i).width()
                    ) &&
                    (jQuery(".bwg_slideshow_filmstrip_left_" + i).css({
                      opacity: 1,
                    }),
                    jQuery(
                      ".bwg_slideshow_filmstrip_thumbnails_" + i
                    ).position().left <
                    -(
                      jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).width() -
                      jQuery(".bwg_slideshow_filmstrip_" + i).width() -
                      (parseInt(bwg_params[i].filmstrip_thumb_margin_hor) +
                        parseInt(bwg_params[i].slideshow_filmstrip_width))
                    )
                      ? jQuery(
                          ".bwg_slideshow_filmstrip_thumbnails_" + i
                        ).animate(
                          {
                            left: -(
                              jQuery(
                                ".bwg_slideshow_filmstrip_thumbnails_" + i
                              ).width() -
                              jQuery(".bwg_slideshow_filmstrip_" + i).width()
                            ),
                          },
                          500,
                          "linear"
                        )
                      : jQuery(
                          ".bwg_slideshow_filmstrip_thumbnails_" + i
                        ).animate(
                          {
                            left:
                              jQuery(
                                ".bwg_slideshow_filmstrip_thumbnails_" + i
                              ).position().left -
                              (parseInt(
                                bwg_params[i].filmstrip_thumb_margin_hor
                              ) +
                                parseInt(
                                  bwg_params[i].slideshow_filmstrip_width
                                )),
                          },
                          500,
                          "linear"
                        )),
                  window.setTimeout(function () {
                    jQuery(
                      ".bwg_slideshow_filmstrip_thumbnails_" + i
                    ).position().left ==
                      -(
                        jQuery(
                          ".bwg_slideshow_filmstrip_thumbnails_" + i
                        ).width() -
                        jQuery(".bwg_slideshow_filmstrip_" + i).width()
                      ) &&
                      jQuery(".bwg_slideshow_filmstrip_right_" + i).css({
                        opacity: 0.3,
                      });
                  }, 500))
                : (jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                    .left >=
                    -(
                      jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).height() -
                      jQuery(".bwg_slideshow_filmstrip_" + i).height()
                    ) &&
                    (jQuery(".bwg_slideshow_filmstrip_left_" + i).css({
                      opacity: 1,
                    }),
                    jQuery(
                      ".bwg_slideshow_filmstrip_thumbnails_" + i
                    ).position().left <
                    -(
                      jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).height() -
                      jQuery(".bwg_slideshow_filmstrip_" + i).height() -
                      (parseInt(bwg_params[i].filmstrip_thumb_margin_hor) +
                        parseInt(bwg_params[i].slideshow_filmstrip_width))
                    )
                      ? jQuery(
                          ".bwg_slideshow_filmstrip_thumbnails_" + i
                        ).animate(
                          {
                            left: -(
                              jQuery(
                                ".bwg_slideshow_filmstrip_thumbnails_" + i
                              ).height() -
                              jQuery(".bwg_slideshow_filmstrip_" + i).height()
                            ),
                          },
                          500,
                          "linear"
                        )
                      : jQuery(
                          ".bwg_slideshow_filmstrip_thumbnails_" + i
                        ).animate(
                          {
                            left:
                              jQuery(
                                ".bwg_slideshow_filmstrip_thumbnails_" + i
                              ).position().left -
                              (parseInt(
                                bwg_params[i].filmstrip_thumb_margin_hor
                              ) +
                                parseInt(
                                  bwg_params[i].slideshow_filmstrip_width
                                )),
                          },
                          500,
                          "linear"
                        )),
                  window.setTimeout(function () {
                    jQuery(
                      ".bwg_slideshow_filmstrip_thumbnails_" + i
                    ).position().left ==
                      -(
                        jQuery(
                          ".bwg_slideshow_filmstrip_thumbnails_" + i
                        ).height() -
                        jQuery(".bwg_slideshow_filmstrip_" + i).height()
                      ) &&
                      jQuery(".bwg_slideshow_filmstrip_right_" + i).css({
                        opacity: 0.3,
                      });
                  }, 500))
              : "width" == bwg_params[i].width_or_height
              ? (jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                  .top >=
                  -(
                    jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).width() -
                    jQuery(".bwg_slideshow_filmstrip_" + i).width()
                  ) &&
                  (jQuery(".bwg_slideshow_filmstrip_left_" + i).css({
                    opacity: 1,
                  }),
                  jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                    .top <
                  -(
                    jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).width() -
                    jQuery(".bwg_slideshow_filmstrip_" + i).width() -
                    parseInt(bwg_params[i].filmstrip_thumb_margin_hor) +
                    parseInt(bwg_params[i].slideshow_filmstrip_width)
                  )
                    ? jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).animate(
                        {
                          top: -(
                            jQuery(
                              ".bwg_slideshow_filmstrip_thumbnails_" + i
                            ).width() -
                            jQuery(".bwg_slideshow_filmstrip_" + i).width()
                          ),
                        },
                        500,
                        "linear"
                      )
                    : jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).animate(
                        {
                          top:
                            jQuery(
                              ".bwg_slideshow_filmstrip_thumbnails_" + i
                            ).position().top -
                            parseInt(bwg_params[i].filmstrip_thumb_margin_hor) +
                            parseInt(bwg_params[i].slideshow_filmstrip_width),
                        },
                        500,
                        "linear"
                      )),
                window.setTimeout(function () {
                  jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                    .top ==
                    -(
                      jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).width() -
                      jQuery(".bwg_slideshow_filmstrip_" + i).width()
                    ) &&
                    jQuery(".bwg_slideshow_filmstrip_right_" + i).css({
                      opacity: 0.3,
                    });
                }, 500))
              : (jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                  .top >=
                  -(
                    jQuery(
                      ".bwg_slideshow_filmstrip_thumbnails_" + i
                    ).height() -
                    jQuery(".bwg_slideshow_filmstrip_" + i).height()
                  ) &&
                  (jQuery(".bwg_slideshow_filmstrip_left_" + i).css({
                    opacity: 1,
                  }),
                  jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                    .top <
                  -(
                    jQuery(
                      ".bwg_slideshow_filmstrip_thumbnails_" + i
                    ).height() -
                    jQuery(".bwg_slideshow_filmstrip_" + i).height() -
                    (parseInt(bwg_params[i].filmstrip_thumb_margin_hor) +
                      parseInt(bwg_params[i].slideshow_filmstrip_width))
                  )
                    ? jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).animate(
                        {
                          top: -(
                            jQuery(
                              ".bwg_slideshow_filmstrip_thumbnails_" + i
                            ).height() -
                            jQuery(".bwg_slideshow_filmstrip_" + i).height()
                          ),
                        },
                        500,
                        "linear"
                      )
                    : jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).animate(
                        {
                          top:
                            jQuery(
                              ".bwg_slideshow_filmstrip_thumbnails_" + i
                            ).position().top -
                            (parseInt(
                              bwg_params[i].filmstrip_thumb_margin_hor
                            ) +
                              parseInt(
                                bwg_params[i].slideshow_filmstrip_width
                              )),
                        },
                        500,
                        "linear"
                      )),
                window.setTimeout(function () {
                  jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                    .top ==
                    -(
                      jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).height() -
                      jQuery(".bwg_slideshow_filmstrip_" + i).height()
                    ) &&
                    jQuery(".bwg_slideshow_filmstrip_right_" + i).css({
                      opacity: 0.3,
                    });
                }, 500));
        }),
        jQuery(".bwg_slideshow_filmstrip_left_" + i).on(t, function () {
          jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).stop(!0, !1),
            "left" == bwg_params[i].left_or_top
              ? (jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                  .left < 0 &&
                  (jQuery(".bwg_slideshow_filmstrip_right_" + i).css({
                    opacity: 1,
                  }),
                  jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                    .left >
                  -(
                    bwg_params[i].filmstrip_thumb_margin_hor +
                    bwg_params[i].slideshow_filmstrip_width
                  )
                    ? jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).animate({ left: 0 }, 500, "linear")
                    : jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).animate(
                        {
                          left:
                            jQuery(
                              ".bwg_slideshow_filmstrip_thumbnails_" + i
                            ).position().left +
                            parseInt(bwg_params[i].filmstrip_thumb_margin_hor) +
                            parseInt(bwg_params[i].slideshow_filmstrip_width),
                        },
                        500,
                        "linear"
                      )),
                window.setTimeout(function () {
                  0 ==
                    jQuery(
                      ".bwg_slideshow_filmstrip_thumbnails_" + i
                    ).position().left &&
                    jQuery(".bwg_slideshow_filmstrip_left_" + i).css({
                      opacity: 0.3,
                    });
                }, 500))
              : (jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                  .top < 0 &&
                  (jQuery(".bwg_slideshow_filmstrip_right_" + i).css({
                    opacity: 1,
                  }),
                  jQuery(".bwg_slideshow_filmstrip_thumbnails_" + i).position()
                    .top >
                  -(
                    bwg_params[i].filmstrip_thumb_margin_hor +
                    bwg_params[i].slideshow_filmstrip_width
                  )
                    ? jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).animate({ top: 0 }, 500, "linear")
                    : jQuery(
                        ".bwg_slideshow_filmstrip_thumbnails_" + i
                      ).animate(
                        {
                          top:
                            jQuery(
                              ".bwg_slideshow_filmstrip_thumbnails_" + i
                            ).position().top +
                            parseInt(bwg_params[i].filmstrip_thumb_margin_hor) +
                            parseInt(bwg_params[i].slideshow_filmstrip_width),
                        },
                        500,
                        "linear"
                      )),
                window.setTimeout(function () {
                  0 ==
                    jQuery(
                      ".bwg_slideshow_filmstrip_thumbnails_" + i
                    ).position().top &&
                    jQuery(".bwg_slideshow_filmstrip_left_" + i).css({
                      opacity: 0.3,
                    });
                }, 500));
        }),
        "width" == bwg_params[i].width_or_height
          ? bwg_set_filmstrip_pos(
              jQuery(".bwg_slideshow_filmstrip_" + i).width(),
              i
            )
          : bwg_set_filmstrip_pos(
              jQuery(".bwg_slideshow_filmstrip_" + i).height(),
              i
            ),
        jQuery("#bwg_slideshow_play_pause_" + i)
          .off(t)
          .on(t, function () {
            jQuery(".bwg_ctrl_btn_" + i).hasClass("bwg-icon-play")
              ? (bwg_play(bwg_params[i].data, i),
                jQuery(".bwg_slideshow_play_pause_" + i).attr(
                  "title",
                  bwg_objectsL10n.pause
                ),
                jQuery(".bwg_slideshow_play_pause_" + i).attr(
                  "class",
                  "bwg-icon-pause bwg_ctrl_btn_" +
                    i +
                    " bwg_slideshow_play_pause_" +
                    i
                ),
                1 == bwg_params[i].enable_slideshow_music &&
                  document.getElementById("bwg_audio_" + i).play())
              : (window.clearInterval(window["bwg_playInterval" + i]),
                jQuery(".bwg_slideshow_play_pause_" + i).attr("title", "Play"),
                jQuery(".bwg_slideshow_play_pause_" + i).attr(
                  "class",
                  "bwg-icon-play bwg_ctrl_btn_" +
                    i +
                    " bwg_slideshow_play_pause_" +
                    i
                ),
                1 == bwg_params[i].enable_slideshow_music &&
                  document.getElementById("bwg_audio_" + i).pause());
          }),
        0 != bwg_params[i].enable_slideshow_autoplay &&
          (bwg_play(bwg_params[i].data, i),
          jQuery(".bwg_slideshow_play_pause_" + i).attr(
            "title",
            bwg_objectsL10n.pause
          ),
          jQuery(".bwg_slideshow_play_pause_" + i).attr(
            "class",
            "bwg-icon-pause bwg_ctrl_btn_" +
              i +
              " bwg_slideshow_play_pause_" +
              i
          ),
          1 == bwg_params[i].enable_slideshow_music &&
            jQuery("#bwg_audio_" + i).length &&
            document.getElementById("bwg_audio_" + i).play()),
        bwg_params[i].preload_images &&
          bwg_preload_images(
            parseInt(jQuery("#bwg_current_image_key_".$bwg).val()),
            i
          ),
        jQuery(".bwg_slideshow_image_" + i).removeAttr("width"),
        jQuery(".bwg_slideshow_image_" + i).removeAttr("height");
    }
  });
}
function bwg_image_browser_resize() {
  jQuery(".bwg_image_browser").each(function () {
    var e = jQuery(this).attr("data-bwg");
    jQuery(".image_browser_images_conteiner_" + e).length &&
      ((bwg_params_ib[e] = JSON.parse(
        jQuery(
          "#bwg_container1_" + e + " .image_browser_images_conteiner_" + e
        ).attr("data-params")
      )),
      bwg_image_browser(e));
  });
}
function bwg_image_browser_ready() {
  jQuery(".bwg_image_browser").each(function () {
    var e = jQuery(this).attr("data-bwg");
    bwg_container_loaded(e),
      jQuery(".image_browser_images_conteiner_" + e).length &&
        ((bwg_params_ib[e] = JSON.parse(
          jQuery(".image_browser_images_conteiner_" + e).attr("data-params")
        )),
        setTimeout(function () {
          bwg_image_browser(e);
        }, 3));
  });
}
function bwg_search_focus(e) {
  jQuery(e).parent().find(".bwg_search_input").focus(), jQuery(e).hide();
}
function bwg_key_press(e) {
  jQuery(e)
    .parent()
    .find(".bwg_search_reset_container")
    .removeClass("bwg-hidden"),
    jQuery(e)
      .parent()
      .find(".bwg_search_loupe_container1")
      .removeClass("bwg-hidden");
}
function bwg_all_thumnails_loaded(t) {
  var i = 0,
    a = jQuery(t).find("img").length;
  return (
    0 == a
      ? bwg_all_thumbnails_loaded_callback(t)
      : jQuery(t)
          .find("img")
          .each(function () {
            var e = jQuery(this).attr("src");
            jQuery("<img/>")
              .attr("src", e)
              .on("load error", function () {
                ++i >= a && bwg_all_thumbnails_loaded_callback(t);
              });
          }),
    0 == a
  );
}
function bwg_all_thumbnails_loaded_callback(e) {
  jQuery(e).hasClass("bwg-thumbnails") &&
    !jQuery(e).hasClass("bwg-masonry-thumbnails") &&
    bwg_thumbnail(e),
    jQuery(e).hasClass("bwg-masonry-thumbnails") && bwg_thumbnail_masonry(e),
    jQuery(e).hasClass("bwg-album-extended") && bwg_album_extended(e);
}
function bwg_album_thumbnail(e) {
  bwg_container_loaded(jQuery(e).data("bwg"));
}
function bwg_album_extended(e) {
  var t = jQuery(e).width(),
    i = jQuery(e).data("thumbnail-width"),
    a = jQuery(e).data("spacing"),
    r = jQuery(e).data("max-count"),
    _ = parseInt(t / (2 * i));
  _ < 1 && (_ = 1), r < _ && (_ = r);
  var s = 100 / _,
    o = jQuery(e).find(".bwg-extended-item"),
    l = parseInt(o.css("margin-left")),
    n = parseInt(o.css("margin-right"));
  o.css({ width: "calc(" + s + "% - " + (l + n) + "px)" }),
    o.width() < i
      ? o
          .find(".bwg-extended-item0, .bwg-extended-item1")
          .css({ width: "calc(100% - " + a + "px)" })
      : o.width() > 2 * i
      ? (o
          .find(".bwg-extended-item0")
          .css({ width: "calc(50% - " + a + "px)" }),
        o
          .find(".bwg-extended-item1")
          .css({ width: "calc(100% - " + (i + 2 * a) + "px)" }))
      : o
          .find(".bwg-extended-item0, .bwg-extended-item1")
          .css({ width: "calc(50% - " + a + "px)" }),
    jQuery(e)
      .children(".bwg-extended-item")
      .each(function () {
        var e = jQuery(this).find("img"),
          t = jQuery(this).find(".bwg-item0"),
          i = jQuery(this).find(".bwg-item2"),
          a = e.data("width"),
          r = e.data("height");
        ("" != a && "" != r) || ((a = e.width()), (r = e.height()));
        var _ = a / r;
        i.width() / i.height() > a / r
          ? (i.width() > a
              ? e.css({ width: "100%", height: i.width() / _ })
              : e.css({ maxWidth: "100%", height: i.width() / _ }),
            (a = i.width()),
            (r = i.width() / _))
          : (i.height() > r
              ? e.css({
                  height: "100%",
                  width: i.height() * _,
                  maxWidth: "initial",
                })
              : e.css({
                  maxHeight: "100%",
                  width: i.height() * _,
                  maxWidth: "initial",
                }),
            (r = i.height()),
            (a = i.height() * _)),
          jQuery(this)
            .find(".bwg-item2")
            .css({
              marginLeft: (t.width() - a) / 2,
              marginTop: (t.height() - r) / 2,
            });
      }),
    bwg_container_loaded(jQuery(e).data("bwg"));
}
function bwg_thumbnail(e) {
  var t = jQuery(e).width(),
    i = jQuery(e).data("thumbnail-width"),
    a = jQuery(e).data("max-count"),
    r = parseInt(t / i) + 1;
  a < r && (r = a);
  var _ = 100 / r;
  jQuery(e)
    .find(".bwg-item")
    .css({ width: _ + "%" }),
    jQuery(e)
      .children(".bwg-item")
      .each(function () {
        var e = jQuery(this).find("img"),
          t = jQuery(this).find(".bwg-item2"),
          i = jQuery(this).find(".bwg-item1"),
          a = 0 < t.width() ? t.width() : i.width(),
          r = 0 < t.height() ? t.height() : i.height(),
          _ = e.data("width"),
          s = e.data("height");
        ("" != _ && "" != s && void 0 !== _ && void 0 !== s) ||
          ((_ = e.width()), (s = e.height()));
        var o = _ / s;
        e.removeAttr("style"),
          o < a / r
            ? (_ < a
                ? e.css({ width: "100%", height: a / o })
                : e.css({ maxWidth: "100%", height: Math.ceil(a / o) }),
              (s = (_ = a) / o))
            : (r > e.height()
                ? e.css({ height: "100%", width: r * o, maxWidth: "initial" })
                : e.css({
                    maxHeight: "100%",
                    width: r * o,
                    maxWidth: "initial",
                  }),
              (_ = (s = r) * o)),
          jQuery(this)
            .find(".bwg-item2")
            .css({ marginLeft: (a - _) / 2, marginTop: (r - s) / 2 });
      }),
    bwg_container_loaded(jQuery(e).data("bwg"));
}
function bwg_thumbnail_masonry(e) {
  var t = "#bwg_thumbnails_masonry_" + (bwg = jQuery(e).attr("data-bwg"));
  jQuery("#bwg_album_masonry_" + bwg).length &&
    (t = "#bwg_album_masonry_" + bwg),
    0 === jQuery(".bwg-container-temp" + bwg).length &&
      (jQuery(t)
        .clone()
        .appendTo("#bwg_container3_" + bwg)
        .removeAttr("id")
        .removeClass("bwg-container-" + bwg)
        .addClass("bwg-container-temp" + bwg),
      jQuery(".bwg-container-temp" + bwg).empty());
  var a = jQuery(".bwg-container-temp" + bwg),
    r = jQuery(t),
    _ = a;
  if (
    (a.prepend(r.html()),
    _.find(".bwg-empty-item").remove(),
    "horizontal" == _.data("masonry-type"))
  ) {
    var s = _.data("thumbnail-height"),
      o = _.data("max-count"),
      l = [];
    for (i = 0; i < o; i++) l.push(0);
    _.find(".bwg-item").each(function () {
      var e = l.indexOf(Math.min.apply(Math, l));
      jQuery(this).css({ height: s, order: e + 1 }),
        (l[e] += jQuery(this)[0].getBoundingClientRect().width);
    });
    var n = Math.max.apply(Math, l);
    for (_.width(n), i = 0; i < o; i++)
      l[i] < n &&
        _.append(
          jQuery('<div class="bwg-item bwg-empty-item"></div>').css({
            height: s,
            order: i + 1,
            width: n - l[i],
          })
        );
  } else {
    _.removeAttr("style");
    n = _.width();
    var g = _.data("thumbnail-width"),
      w =
        ((o = _.data("max-count")),
        parseInt(n / g) + ("0" == _.data("resizable-thumbnails") ? 0 : 1));
    o < w && (w = o);
    var b = _.find(".bwg-item").length;
    b < w && (w = b);
    var u,
      d,
      h = 100 / w,
      m = [];
    for (i = 0; i < w; i++) m.push(0);
    _.find(".bwg-item").each(function () {
      var e = m.indexOf(Math.min.apply(Math, m));
      if (
        (jQuery(this).css({ width: h + "%", order: e + 1 }),
        0 < jQuery(this).find("img").attr("data-width").length &&
          0 < jQuery(this).find("img").attr("data-height").length)
      ) {
        (d =
          jQuery(this).find("img").data("width") /
          jQuery(this).find("img").data("height")),
          (u = jQuery(this).width() / d);
        var t = +(
          jQuery(this).find("a>.bwg-title1").height() +
          jQuery(this).find("a>.bwg-masonry-thumb-description").height()
        );
        jQuery(this).height(u + t);
      }
      m[e] += jQuery(this)[0].getBoundingClientRect().height;
    });
    var p = Math.max.apply(Math, m);
    for (i = 0; i < w; i++)
      m[i] < p &&
        _.append(
          jQuery('<div class="bwg-item bwg-empty-item"></div>').css({
            width: h + "%",
            order: i + 1,
            height: p - m[i],
          })
        );
    _.outerWidth(w * g), _.height(p);
  }
  if ("" != a.html()) {
    r.outerWidth(w * g),
      "0" != p ? (r.css("opacity", "1"), r.height(p)) : r.css("opacity", "0"),
      r.empty();
    var c = a.html();
    r.append(c),
      r.find(".bwg_lazyload").each(function () {
        null != jQuery(this).attr("data-original") &&
          "" != jQuery(this).attr("data-original") &&
          jQuery(this).attr("src", jQuery(this).attr("data-original"));
      }),
      a.empty().hide();
  }
  bwg_container_loaded(_.data("bwg"));
}
function bwg_container_loaded(e) {
  jQuery("#gal_front_form_" + e).removeClass("bwg-hidden"),
    jQuery("#ajax_loading_" + e).addClass("bwg-hidden");
}
function bwg_thumbnail_mosaic_logic(e) {
  var t = e.attr("data-bwg"),
    i = e.attr("data-block-id"),
    a = parseInt(e.attr("data-thumb-padding")) / 2,
    r = parseInt(e.attr("data-thumb-border")) + a;
  if ("horizontal" == e.attr("data-mosaic-direction")) {
    var _ = parseInt(e.attr("data-height"));
    if ("1" == e.attr("data-resizable"))
      if (1920 <= jQuery(window).width())
        var s = (1 + jQuery(window).width() / 1920) * _;
      else if (jQuery(window).width() <= 640)
        s = (jQuery(window).width() / 640) * _;
      else s = _;
    else s = _;
    (c = jQuery(".bwg_mosaic_thumb_" + t)).each(function (e) {
      var t = jQuery(this).data("width"),
        i = jQuery(this).data("height");
      ("" != t && "" != i && void 0 !== t && void 0 !== i) ||
        ((t = c.get(e).naturalWidth), (i = c.get(e).naturalHeight)),
        (t = (t * s) / i),
        c.eq(e).height(s),
        c.eq(e).width(t);
    });
    var o =
      (jQuery("#bwg_mosaic_thumbnails_div_" + t).width() / 100) *
      parseInt(e.attr("data-total-width"));
    jQuery("#" + i).width(o);
    var l = s + 2 * r,
      n = 0,
      g = [];
    g[0] = 0;
    var w = [],
      b = (w[0] = 0);
    c.each(function (e) {
      (row_cum_width2 = b + c.eq(e).width() + 2 * r),
        row_cum_width2 - o < 0
          ? ((b = row_cum_width2), (g[e] = n), w[n]++)
          : e !== c.length - 1
          ? Math.abs(b - o) > Math.abs(row_cum_width2 - o) ||
            (Math.abs(b - o) <= Math.abs(row_cum_width2 - o) && 0 == w[n])
            ? e !== c.length - 2
              ? ((b = row_cum_width2),
                (g[e] = n),
                w[n]++,
                (w[++n] = 0),
                (b = 0))
              : ((b = row_cum_width2), (g[e] = n), w[n]++)
            : ((w[++n] = 1), (g[e] = n), (b = row_cum_width2 - b))
          : ((b = row_cum_width2), (g[e] = n), w[n]++);
    });
    for (var u = [], d = [], h = 0; h <= n; h++) (u[h] = 1), (d[h] = l);
    for (h = 0; h <= n; h++)
      (b = 0),
        c.each(function (e) {
          g[e] == h && (b += c.eq(e).width());
        }),
        (u[h] = z = (o - 2 * w[h] * r) / b),
        (d[h] = (l - 2 * r) * u[h] + 2 * r);
    (S = [])[0] = 0;
    var m = [],
      p = [];
    (m[0] = 0), (p[0] = 0);
    for (h = 1; h <= n; h++) (m[h] = m[0]), (p[h] = p[h - 1] + d[h - 1]);
    c.each(function (e) {
      var t = c.eq(e).width(),
        i = c.eq(e).height();
      c.eq(e).width(t * u[g[e]]),
        c.eq(e).height(i * u[g[e]]),
        c.eq(e).parent().css({ top: p[g[e]], left: m[g[e]] }),
        (m[g[e]] += t * u[g[e]] + 2 * r),
        (S[g[e]] = e);
    }),
      jQuery("#" + i).height(p[n] + d[n] - p[0]);
  } else {
    var c,
      y = parseInt(e.attr("data-width"));
    if ("1" == e.attr("data-resizable")) {
      if (1920 <= jQuery(window).width())
        var f = (1 + jQuery(window).width() / 1920) * y;
      else if (jQuery(window).width() <= 640)
        f = (jQuery(window).width() / 640) * y;
      else f = y;
      if (0 < jQuery(".header-content-with_tab").length)
        f = jQuery(".header-content-with_tab").width() / 4 - 10;
    } else f = y;
    (c = jQuery(".bwg_mosaic_thumb_" + t)).each(function (e) {
      jQuery(this).removeAttr("style"),
        jQuery(this).parent().removeAttr("style");
      var t = jQuery(this).data("width"),
        i = jQuery(this).data("height");
      ("" != t && "" != i && void 0 !== t && void 0 !== i) ||
        ((t = c.get(e).naturalWidth), (i = c.get(e).naturalHeight)),
        c.eq(e).height((i * f) / t),
        c.eq(e).width(f);
    });
    o =
      (jQuery("#bwg_mosaic_thumbnails_div_" + t).width() / 100) *
      parseInt(e.attr("data-total-width"));
    jQuery("#" + i).width(o);
    var j = f + 2 * r < o ? f : o - 2 * r,
      Q = Math.floor(o / (j + 2 * r)),
      v = [];
    v[0] = 0;
    for (var x = [], k = [], z = 0; z < Q; z++) (k[z] = 0), (x[z] = 0);
    c.each(function (e) {
      for (var t = 0, i = k[0], a = 0; a < Q; a++)
        i > k[a] && ((i = k[a]), (t = a));
      (v[e] = t),
        x[t]++,
        (B = i),
        (T = 0 + t * (j + 2 * r)),
        c.eq(e).parent().css({ top: B, left: T }),
        (k[t] += c.eq(e).height() + 2 * r);
    }),
      ((u = [])[0] = 1);
    var C = 0,
      I = [],
      E = 0,
      O = 0;
    for (z = 0; z < Q; z++)
      (C += j),
        (I[z] = 0),
        c.each(function (e) {
          v[e] == z && (I[z] += c.eq(e).height());
        }),
        0 != I[z] && ((E += j / I[z]), (O += (j * x[z] * 2 * r) / I[z]));
    var M = 0;
    0 != E && (M = (C + O) / E);
    for (z = 0; z < Q; z++) 0 != I[z] && (u[z] = (M - 2 * x[z] * r) / I[z]);
    var S,
      T = [];
    T[0] = 0;
    for (z = 1; z <= Q; z++) T[z] = T[z - 1] + j * u[z - 1] + 2 * r;
    var B = [];
    for (z = 0; z < Q; z++) B[z] = 0;
    ((S = [])[0] = 0),
      c.each(function (e) {
        var t = c.eq(e).width(),
          i = c.eq(e).height();
        c.eq(e).width(t * u[v[e]]),
          c.eq(e).height(i * u[v[e]]),
          c.eq(e).parent().css({ top: B[v[e]], left: T[v[e]] }),
          (B[v[e]] += i * u[v[e]] + 2 * r),
          (S[v[e]] = e);
      }),
      jQuery("#" + i)
        .width(T[Q])
        .height(B[0]);
  }
}
function bwg_thumbnail_mosaic(e) {
  var t = jQuery(e),
    i = jQuery.Deferred();
  if (
    (i.done([bwg_thumbnail_mosaic_logic]).done(function (e) {
      "1" != e.data("mosaic-thumb-transition") &&
        jQuery(".bwg_mosaic_thumb_spun_" + t).css({
          transition: "all 0.3s ease 0s",
          "-webkit-transition": "all 0.3s ease 0s",
        });
      var t = e.data("bwg");
      jQuery(".bwg_mosaic_thumbnails_" + t).css({ visibility: "visible" }),
        jQuery(".tablenav-pages_" + t).css({ visibility: "visible" }),
        bwg_container_loaded(t),
        jQuery(".bwg_mosaic_thumb_" + t).removeClass("bwg-hidden"),
        jQuery("#bwg_mosaic_thumbnails_div_" + t).removeClass("bwg-hidden");
    }),
    i.resolve(t),
    "hover" == t.attr("data-image-title"))
  ) {
    var a = parseInt(t.attr("data-thumb-padding")) / 2,
      r = parseInt(t.attr("data-thumb-border")) + a;
    bwg_mosaic_title_on_hover(t.data("bwg"), t, r);
  }
  "hover" == t.attr("data-ecommerce-icon") &&
    (jQuery(".bwg_mosaic_thumb_spun_" + bwg).on("mouseenter", function () {
      var e = jQuery(this)
          .parents(".bwg-mosaic-thumb-span")
          .children(".bwg_mosaic_thumb_" + bwg)
          .width(),
        t = jQuery(this)
          .parents(".bwg-mosaic-thumb-span")
          .children(".bwg_mosaic_thumb_" + bwg)
          .height();
      jQuery(this)
        .children(".bwg_ecommerce_spun1_" + bwg)
        .width(e);
      var i = jQuery(this)
          .children(".bwg_ecommerce_spun1_" + bwg)
          .width(),
        a = jQuery(this)
          .children(".bwg_ecommerce_spun1_" + bwg)
          .height();
      jQuery(this)
        .children(".bwg_ecommerce_spun1_" + bwg)
        .css({
          top: r + 0.5 * t - 0.5 * a,
          left: r + 0.5 * e - 0.5 * i,
          opacity: 1,
        });
    }),
    jQuery(".bwg_mosaic_thumb_spun_" + bwg).on("mouseleave", function () {
      jQuery(this)
        .children(".bwg_ecommerce_spun1_" + bwg)
        .css({
          top: 0,
          left: -1e4,
          opacity: 0,
          padding: t.attr("data-title-margin"),
        });
    }));
}
function bwg_mosaic_title_on_hover(t, e, i) {
  jQuery(".bwg-mosaic-thumb-span").on("mouseenter", function () {
    var e = jQuery(this)
      .children(".bwg_mosaic_thumb_" + t)
      .width();
    jQuery(this)
      .find(".bwg_mosaic_title_spun1_" + t)
      .width(e),
      jQuery(this)
        .find(".bwg_mosaic_title_spun1_" + t)
        .css({
          opacity: 1,
          "max-height": "calc(100% - " + 2 * i + "px)",
          overflow: "hidden",
        });
  }),
    jQuery(".bwg-mosaic-thumb-span").on("mouseleave", function () {
      jQuery(this)
        .find(".bwg_mosaic_title_spun1_" + t)
        .css({
          opacity: 0,
          padding: e.attr("data-title-margin"),
          "max-height": "calc(100% - " + 2 * i + "px)",
          overflow: "hidden",
        });
    });
}
function bwg_mosaic_ajax(e, t) {
  var i = 0;
  jQuery(".bwg_mosaic_thumb_spun_" + e + " img").on("load", function () {
    ++i >= t &&
      bwg_thumbnail_mosaic(
        jQuery(".bwg-mosaic-thumbnails[data-bwg=" + e + "]")
      );
  }),
    jQuery(".bwg_mosaic_thumb_spun_" + e + " img").on("error", function () {
      jQuery(this).height(100),
        jQuery(this).width(100),
        ++i >= t &&
          bwg_thumbnail_mosaic(
            jQuery(".bwg-mosaic-thumbnails[data-bwg=" + e + "]")
          );
    });
}
function bwg_add_album() {
  var t = !1;
  "1" != bwg_objectsL10n.front_ajax &&
    jQuery(document)
      .off("click", ".bwg-album")
      .on("click", ".bwg-album", function () {
        if (!t) {
          var e = jQuery(this).attr("data-bwg");
          return (
            (t = !0),
            setTimeout(function () {
              t = !1;
            }, 100),
            bwg_ajax(
              "gal_front_form_" + e,
              e,
              jQuery(this).attr("data-container_id"),
              jQuery(this).attr("data-alb_gal_id"),
              jQuery(this).attr("data-album_gallery_id"),
              jQuery(this).attr("data-def_type"),
              "",
              jQuery(this).attr("data-title")
            ),
            !1
          );
        }
      }),
    jQuery(".bwg_description_more").on("click", function () {
      jQuery(this).hasClass("bwg_more")
        ? (jQuery(this).parent().find(".bwg_description_full").show(),
          jQuery(this).addClass("bwg_hide").removeClass("bwg_more"),
          jQuery(this).html(jQuery(this).data("hide-msg")))
        : (jQuery(this).parent().find(".bwg_description_full").hide(),
          jQuery(this).addClass("bwg_more").removeClass("bwg_hide"),
          jQuery(this).html(jQuery(this).data("more-msg")));
    });
}
function bwg_add_lightbox() {
  var i = !1;
  jQuery(document).on(
    "click",
    ".bwg_lightbox .bwg-item0, .bwg_lightbox .bwg_slide, .bwg_lightbox .bwg-carousel-image, .bwg_lightbox .bwg-title1",
    function (e) {
      e.stopPropagation(), e.preventDefault();
      var t = jQuery(this).closest("a");
      if (!i)
        return (
          (i = !0),
          setTimeout(function () {
            i = !1;
          }, 100),
          bwg_gallery_box(
            jQuery(t).attr("data-image-id"),
            jQuery(t).closest(".bwg_container")
          ),
          !1
        );
    }
  ),
    jQuery(".bwg_lightbox .bwg_ecommerce").on("click", function (e) {
      if ((e.stopPropagation(), !i))
        return (
          (i = !0),
          setTimeout(function () {
            i = !1;
          }, 100),
          bwg_gallery_box(
            jQuery(this).closest(".bwg_lightbox").attr("data-image-id"),
            jQuery(this).closest(".bwg_container"),
            !0
          ),
          !1
        );
    });
}
function bwg_filter_by_tag(e) {
  var t = "",
    i = jQuery(e).parent().parent(),
    a = i.find(".current_view").val(),
    r = i.find(".form_id").val(),
    _ = i.find(".cur_gal_id").val(),
    s = i.find(".album_gallery_id").val(),
    o = i.find(".type").val();
  jQuery(e)
    .parent()
    .find(".opt.selected")
    .each(function () {
      t = t + jQuery(e).text() + ",";
    }),
    "" == (t = t.slice(0, -1)) && (t = bwg_objectsL10n.bwg_select_tag),
    jQuery(e).parent().find(".CaptionCont").attr("title", t),
    jQuery(e).parent().find(".CaptionCont .placeholder").html(t),
    jQuery("#bwg_tag_id_" + a).val(jQuery("#bwg_tag_id_" + _).val()),
    bwg_select_tag(a, r, _, s, o, !1);
}
function bwg_document_ready() {
  bwg_add_lightbox(),
    jQuery(".bwg_container img").removeAttr("width").removeAttr("height"),
    jQuery('div[id^="bwg_container1_"]').each(function () {
      var e = jQuery(this);
      e.data("right-click-protection") && bwg_disable_right_click(e),
        jQuery(".SumoSelect > .CaptionCont > label > i").addClass(
          "bwg-icon-angle-down closed"
        );
      var t = e.find(".search_tags");
      if ("1" == bwg_objectsL10n.front_ajax && t.length)
        for (var i = 0; i < t[0].length; i++)
          void 0 === t[0][i].attributes.selected && (t[0][i].selected = !1);
      t.length &&
        (t.SumoSelect({
          triggerChangeCombined: !0,
          placeholder: bwg_objectsL10n.bwg_select_tag,
          search: !0,
          searchText: bwg_objectsL10n.bwg_search,
          forceCustomRendering: !0,
          noMatch: bwg_objectsL10n.bwg_tag_no_match,
          captionFormatAllSelected: bwg_objectsL10n.bwg_all_tags_selected,
          captionFormat: "{0} " + bwg_objectsL10n.bwg_tags_selected,
          okCancelInMulti: !0,
          locale: [
            bwg_objectsL10n.ok,
            bwg_objectsL10n.cancel,
            bwg_objectsL10n.select_all,
          ],
        }),
        t.off("change").on("change", function () {
          bwg_filter_by_tag(this);
        }));
      var a = e.find(".bwg_order");
      a.length &&
        a.SumoSelect({ triggerChangeCombined: !0, forceCustomRendering: !0 }),
        jQuery(this).find("search_placeholder_title").hide(),
        "" == jQuery(this).find(".bwg_search_input").val() &&
          jQuery(this).find("search_placeholder_title").show(),
        jQuery(".bwg_thumbnail .bwg_search_container_2").focusout(function (e) {
          "" == jQuery(this).find(".bwg_search_input").val() &&
            (jQuery(this).find(".search_placeholder_title").show(),
            jQuery(this)
              .find(".bwg_search_loupe_container1")
              .addClass("bwg-hidden"),
            jQuery(this)
              .find(".bwg_search_reset_container")
              .addClass("bwg-hidden"));
        });
    }),
    jQuery(".search_tags").on("sumo:opened", function () {
      0 == jQuery(this).parent().find("ul li").length &&
        (jQuery(".no-match").html(bwg_objectsL10n.bwg_tag_no_match),
        jQuery(".no-match").show());
    }),
    jQuery(".bwg_thumbnail .SumoSelect").on("sumo:closed", function () {
      jQuery(this).find("label i").removeClass("bwg-icon-angle-up opened"),
        jQuery(this).find("label i").addClass("bwg-icon-angle-down closed");
    }),
    jQuery(".bwg_thumbnail .SumoSelect").on("sumo:opened", function () {
      jQuery(this).find("label i").removeClass("bwg-icon-angle-down closed"),
        jQuery(this).find("label i").addClass("bwg-icon-angle-up opened");
    }),
    bwg_add_album();
  var e = window.location.hash.substring(1);
  if (e && "-1" != e.indexOf("bwg")) {
    bwg_hash_array = e.replace("bwg", "").split("/");
    var t = jQuery(".bwg_container");
    t && bwg_gallery_box(bwg_hash_array[1], t, !1, bwg_hash_array[0]);
  }
  bwg_blog_style_ready(), bwg_image_browser_ready(), bwg_resize_search_line();
}
function bwg_clear_search_input(e) {
  if ("1" != bwg_objectsL10n.front_ajax)
    jQuery("#bwg_search_input_" + e).val(""),
      jQuery(
        "#bwg_search_container_1_" + e + " .bwg_search_loupe_container1"
      ).addClass("bwg-hidden"),
      jQuery(
        "#bwg_search_container_1_" + e + " .bwg_search_reset_container"
      ).addClass("bwg-hidden");
  else {
    var t = window.location.href,
      i = bwg_remove_url_parameter("bwg_search_" + e, t, t);
    window.location.replace(i);
  }
}
function bwg_check_search_input_enter(e, t) {
  return (
    "Enter" != t.key ||
    (jQuery(e)
      .closest(".bwg_search_container_1")
      .find(".bwg_search")
      .trigger("click"),
    !1)
  );
}
function bwg_ajax(t, i, a, r, e, _, s, o, l, n, g, w) {
  if ("1" != bwg_objectsL10n.front_ajax || !0 === n) {
    jQuery("#ajax_loading_" + i).removeClass("bwg-hidden"),
      jQuery(".bwg_load_more_ajax_loading").css({
        top:
          jQuery("#bwg_container1_" + bwg).height() -
          jQuery(".bwg_load_more_ajax_loading").height(),
      }),
      "function" == typeof bwg_scroll_load_action &&
        jQuery(window).off("scroll", bwg_scroll_load_action),
      jQuery(".bwg_thumbnail .search_tags").off("sumo:closed");
    var b = jQuery("#" + t).data("ajax-url"),
      u = 0;
    if (void 0 === n) n = !1;
    var d = jQuery("#page_number_" + i).val(),
      h = jQuery("#bwg_search_input_" + i).val(),
      m = {},
      p = jQuery("#bwg_album_breadcrumb_" + i).val();
    if (p && !0 !== n) {
      var c = JSON.parse(p);
      if ("back" == r) {
        c.splice(-1, 1);
        var y = c.slice(-1)[0];
        (r = y.id), (d = y.page), (m["action_" + i] = "back");
      } else
        "numeric" === n || s
          ? (c.splice(-1, 1), c.push({ id: r, page: d, search: h }))
          : (c.push({ id: r, page: 1 }), (d = 1));
      m["bwg_album_breadcrumb_" + i] = JSON.stringify(c);
    }
    if (
      ((m.gallery_type = jQuery("#" + t).data("gallery-type")),
      (m.gallery_id = jQuery("#" + t).data("gallery-id")),
      (m.tag = jQuery("#" + t).data("tag")),
      (m.album_id = jQuery("#" + t).data("album-id")),
      (m.theme_id = jQuery("#" + t).data("theme-id")),
      (m.shortcode_id = jQuery("#" + t).data("shortcode-id")),
      (m.bwg = i),
      (m.current_url = encodeURI(
        jQuery("#bwg_container1_" + i).data("current-url")
      )),
      s && (d = 1),
      void 0 === o || "" == o)
    )
      o = "";
    if (void 0 === g || "" == g) g = "";
    if (void 0 === l || "" == l) l = jQuery(".bwg_order_" + i).val();
    if (void 0 === w) w = !0;
    if (
      (1 == w &&
        jQuery("html, body").animate(
          { scrollTop: jQuery("#" + t).offset().top - 150 },
          500
        ),
      (m["page_number_" + i] = d),
      (m["bwg_load_more_" + i] = jQuery("#bwg_load_more_" + i).val()),
      (m["album_gallery_id_" + i] = r),
      (m["type_" + i] = _),
      (m["title_" + i] = o),
      (m["description_" + i] = g),
      (m["sortImagesByValue_" + i] = l),
      (m["bwg_random_seed_" + i] = jQuery("#bwg_random_seed_" + i).val()),
      0 < jQuery("#bwg_search_input_" + i).length &&
        (m["bwg_search_" + i] = jQuery("#bwg_search_input_" + i).val()),
      void 0 !== m["bwg_album_breadcrumb_" + i])
    ) {
      var f = JSON.parse(m["bwg_album_breadcrumb_" + i]);
      jQuery.each(f, function (e, t) {
        (m["bwg_search_" + i] = ""),
          r == t.id && (m["bwg_search_" + i] = t.search);
      });
    }
    return (
      (m["bwg_tag_id_" + a] = jQuery("#bwg_tag_id_" + a).val()),
      jQuery("#ajax_loading_" + i).removeClass("bwg-hidden"),
      jQuery(".bwg_load_more_ajax_loading").css({
        top:
          jQuery("#bwg_container1_" + bwg).height() -
          jQuery(".bwg_load_more_ajax_loading").height(),
      }),
      jQuery.ajax({
        type: "POST",
        url: b,
        data: m,
        success: function (e) {
          jQuery(e).find(".bwg_masonry_thumb_spun_" + i + " img").length,
            (u = jQuery(e).find(".bwg_mosaic_thumb_spun_" + i + " img").length),
            !0 === n
              ? (a == "bwg_thumbnails_mosaic_" + i
                  ? jQuery("#" + a).append(
                      jQuery(e)
                        .closest(".bwg-container-" + i)
                        .find("#" + a)
                        .html()
                    )
                  : a == "bwg_album_compact_" + i
                  ? jQuery("#" + a).append(
                      jQuery(e).closest(".bwg-album-thumbnails").html()
                    )
                  : a == "bwg_thumbnails_masonry_" + i
                  ? jQuery(".bwg-container-temp" + i).append(
                      jQuery(e)
                        .closest(".bwg-container-" + i)
                        .html()
                    )
                  : jQuery("#" + a).append(
                      jQuery(e)
                        .closest(".bwg-container-" + i)
                        .html()
                    ),
                jQuery(".bwg_nav_cont_" + i).html(
                  jQuery(e)
                    .closest(".bwg_nav_cont_" + i)
                    .html()
                ))
              : jQuery("#bwg_container3_" + i).html(e);
        },
        complete: function () {
          jQuery("div[id^='bwg_container1_'] img").each(function () {
            null != jQuery(this).attr("data-lazy-src") &&
            "" != jQuery(this).attr("data-lazy-src")
              ? jQuery(this).attr("src", jQuery(this).attr("data-lazy-src"))
              : null != jQuery(this).attr("data-original") &&
                "" != jQuery(this).attr("data-original") &&
                jQuery(this).attr("src", jQuery(this).attr("data-original"));
          }),
            jQuery(".blog_style_image_buttons_conteiner_" + i)
              .find(jQuery(".bwg_blog_style_img_" + i))
              .on("load", function () {
                jQuery(".bwg_blog_style_img_" + i)
                  .closest(jQuery(".blog_style_image_buttons_conteiner_" + i))
                  .show();
              }),
            jQuery("#bwg_tags_id_" + a).val(jQuery("#bwg_tag_id_" + a).val()),
            jQuery(".pagination-links_" + i).length &&
              jQuery("html, body").animate(
                { scrollTop: jQuery("#" + t).offset().top - 150 },
                500
              ),
            bwg_document_ready(),
            bwg_carousel_ready(),
            bwg_carousel_onload(),
            bwg_slideshow_ready(),
            bwg_mosaic_ajax(i, u),
            bwg_all_thumnails_loaded(".bwg-container-" + i) &&
              bwg_container_loaded(i),
            jQuery(
              ".blog_style_images_conteiner_" +
                i +
                " .bwg_embed_frame_16x9_" +
                i
            ).each(function (e) {
              jQuery(this).width(jQuery(this).parent().width()),
                jQuery(this).height(0.5625 * jQuery(this).width());
            }),
            jQuery(
              ".blog_style_images_conteiner_" +
                i +
                " .bwg_embed_frame_instapost_" +
                i
            ).each(function (e) {
              jQuery(this).width(jQuery(this).parent().width()),
                jQuery(this).height(
                  ((jQuery(this).width() - 16) *
                    jQuery(this).attr("data-height")) /
                    jQuery(this).attr("data-width") +
                    96
                );
            }),
            jQuery("#bwg_embed_frame_16x9_" + i).width(
              jQuery("#bwg_embed_frame_16x9_" + i)
                .parent()
                .width()
            ),
            jQuery("#bwg_embed_frame_16x9_" + i).height(
              0.5625 * jQuery("#bwg_embed_frame_16x9_" + i).width()
            ),
            jQuery("#bwg_embed_frame_instapost_" + i).width(
              jQuery("#bwg_embed_frame_16x9_" + i)
                .parent()
                .width()
            ),
            jQuery(".bwg_embed_frame_instapost_" + i).height(
              ((jQuery(".bwg_embed_frame_instapost_" + i).width() - 16) *
                jQuery(".bwg_embed_frame_instapost_" + i).attr("data-height")) /
                jQuery(".bwg_embed_frame_instapost_" + i).attr("data-width") +
                96
            ),
            jQuery("#bwg_search_input_" + i).val(m["bwg_search_" + i]),
            "" != jQuery("#bwg_search_input_" + i).val()
              ? (jQuery("#bwg_search_input_" + i)
                  .parent()
                  .find(".search_placeholder_title")
                  .hide(),
                jQuery("#bwg_search_input_" + i)
                  .parent()
                  .parent()
                  .find(".bwg_search_reset_container")
                  .show(),
                jQuery("#bwg_search_input_" + i)
                  .parent()
                  .parent()
                  .find(".bwg_search_loupe_container1")
                  .show())
              : jQuery("#bwg_search_input_" + i)
                  .parent()
                  .find(".search_placeholder_title")
                  .show();
          var e = jQuery("#bwg_container2_" + i + " .cur_gal_id").val();
          jQuery("#bwg_tag_id_" + i).val(jQuery("#bwg_tag_id_" + e).val());
        },
      }),
      !1
    );
  }
  if ("back" === r)
    return -1 == document.referrer.indexOf(window.location.host)
      ? ((str = jQuery(location).attr("href")),
        void window.location.replace(str.substring(0, str.indexOf("type_0"))))
      : void window.history.back();
  var j = jQuery("#bwg_search_input_" + i).val(),
    Q = window.location.href,
    v = "",
    x = jQuery("#bwg_tag_id_" + i).val();
  if (
    ("#" == Q.substr(-1) && (Q = Q.slice(0, -1)),
    "" !== j && void 0 !== j
      ? !1 !==
          (v = bwg_add_url_parameter(
            (v = bwg_remove_url_parameter("page_number_" + i, Q)),
            "bwg_search_" + i,
            j
          )) && (Q = v)
      : !1 !== (v = bwg_remove_url_parameter("bwg_search_" + i, Q)) && (Q = v),
    void 0 !== l &&
      "" !== l &&
      !1 !== (v = bwg_add_url_parameter(Q, "sort_by_" + i, l)) &&
      (Q = v),
    null != x && 0 < x.length)
  ) {
    var k = "",
      z = x.split(",");
    jQuery.each(z, function (e) {
      var t = ",";
      e === z.length - 1 && (t = ""), (k += z[e] + t);
    }),
      "" !== k &&
        !1 !== (v = bwg_add_url_parameter(Q, "filter_tag_" + i, k)) &&
        (Q = v);
  } else !1 !== (v = bwg_remove_url_parameter("filter_tag_" + i, v)) && (Q = v);
  window.location.href = Q;
}
function bwg_add_url_parameter(e, t, i) {
  var a = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
    r = -1 !== e.indexOf("?") ? "&" : "?";
  return e.match(a)
    ? e.replace(a, "$1" + t + "=" + i + "$2")
    : e + r + t + "=" + i;
}
function bwg_remove_url_parameter(e, t) {
  var i = t.split("?"),
    a = i[0] + "?",
    r = "";
  if ((void 0 !== i[1] && (r = i[1]), "" === r)) return t;
  var _,
    s,
    o = decodeURIComponent(r).split("&");
  for (s = 0; s < o.length; s++)
    (_ = o[s].split("="))[0] != e && (a = a + _[0] + "=" + _[1] + "&");
  return a.substring(0, a.length - 1);
}
function bwg_select_tag(e, t, i, a, r, _) {
  _ && jQuery("#bwg_tag_id_" + i).val(""), bwg_ajax(t, e, i, a, "", r, 1, "");
}
function bwg_cube(e, t, i, a, r, _, s, o, l, n, g) {
  var w,
    b = !1,
    u = "";
  if (void 0 !== g && "" !== g) {
    (b = !0),
      (bwg_params[g].bwg_trans_in_progress = !0),
      (u = "_" + g),
      (w = bwg_params[g].bwg_transition_duration);
    bwg_params[g].event_stack;
  } else w = bwg_transition_duration;
  if (!bwg_testBrowser_cssTransitions(g)) return bwg_fallback(o, l, n, g);
  if (!bwg_testBrowser_cssTransforms3d(g)) return bwg_fallback3d(o, l, n, g);
  function d() {
    if (
      (jQuery(o).removeAttr("style"),
      jQuery(l).removeAttr("style"),
      jQuery(".bwg_slider" + u).removeAttr("style"),
      jQuery(o).css({ opacity: 0, "z-index": 1 }),
      jQuery(l).css({ opacity: 1, "z-index": 2 }),
      jQuery(".bwg_image_info").show(),
      jQuery(o).html(""),
      b)
    ) {
      bwg_change_watermark_container(g),
        (bwg_params[g].bwg_trans_in_progress = !1);
      var e = bwg_params[g].data,
        t = bwg_params[g].event_stack;
    } else {
      e = "";
      gallery_box_data.bwg_trans_in_progress = !1;
      t = gallery_box_data.event_stack;
    }
    if (void 0 !== t && 0 < t.length) {
      var i = t[0].split("-");
      t.shift(), bwg_change_image(i[0], i[1], e, !0, g);
    }
    bwg_change_watermark_container();
  }
  b
    ? (jQuery(".bwg_slideshow_filmstrip_thumbnail_" + g)
        .removeClass("bwg_slideshow_thumb_active_" + g)
        .addClass("bwg_slideshow_thumb_deactive_" + g),
      jQuery(
        "#bwg_filmstrip_thumbnail_" + bwg_params[g].bwg_current_key + "_" + g
      )
        .removeClass("bwg_slideshow_thumb_deactive_" + g)
        .addClass("bwg_slideshow_thumb_active_" + g),
      jQuery(".bwg_slideshow_dots_" + g)
        .removeClass("bwg_slideshow_dots_active_" + g)
        .addClass("bwg_slideshow_dots_deactive_" + g),
      jQuery("#bwg_dots_" + bwg_params[g].bwg_current_key + "_" + g)
        .removeClass("bwg_slideshow_dots_deactive_" + g)
        .addClass("bwg_slideshow_dots_active_" + g),
      jQuery(".bwg_slide_bg_" + g).css("perspective", 1e3))
    : ((gallery_box_data.bwg_trans_in_progress = !0),
      jQuery(".bwg_filmstrip_thumbnail")
        .removeClass("bwg_thumb_active")
        .addClass("bwg_thumb_deactive"),
      jQuery("#bwg_filmstrip_thumbnail_" + gallery_box_data.bwg_current_key)
        .removeClass("bwg_thumb_deactive")
        .addClass("bwg_thumb_active"),
      jQuery(".bwg_slide_bg").css("perspective", 1e3)),
    jQuery(o).css({
      transform: "translateZ(" + e + "px)",
      backfaceVisibility: "hidden",
    }),
    jQuery(l).css({
      opacity: 1,
      backfaceVisibility: "hidden",
      transform:
        "translateY(" +
        i +
        "px) translateX(" +
        t +
        "px) rotateY(" +
        r +
        "deg) rotateX(" +
        a +
        "deg)",
    }),
    jQuery(".bwg_slider" + u).css({
      transform: "translateZ(-" + e + "px)",
      transformStyle: "preserve-3d",
    }),
    setTimeout(function () {
      jQuery(".bwg_slider" + u).css({
        transition: "all " + w + "ms ease-in-out",
        transform:
          "translateZ(-" +
          e +
          "px) rotateX(" +
          _ +
          "deg) rotateY(" +
          s +
          "deg)",
      });
    }, 20),
    jQuery(".bwg_slider" + u).one(
      "webkitTransitionEnd transitionend otransitionend oTransitionEnd mstransitionend",
      jQuery.proxy(d)
    ),
    0 == w && d();
}
function bwg_fade(e, t, i, a) {
  var r,
    _ = !1;
  function s() {
    jQuery(".bwg_image_info").show(),
      bwg_change_watermark_container(a),
      _
        ? (bwg_params[a].bwg_trans_in_progress = !1)
        : (gallery_box_data.bwg_trans_in_progress = !1);
  }
  (r =
    void 0 !== a && "" !== a
      ? ((_ = !0),
        (bwg_params[a].bwg_trans_in_progress = !0),
        bwg_params[a].bwg_transition_duration)
      : ((gallery_box_data.bwg_trans_in_progress = !0),
        gallery_box_data.bwg_transition_duration)),
    _
      ? (jQuery(".bwg_slideshow_filmstrip_thumbnail_" + a)
          .removeClass("bwg_slideshow_thumb_active_" + a)
          .addClass("bwg_slideshow_thumb_deactive_" + a),
        jQuery(
          "#bwg_filmstrip_thumbnail_" + bwg_params[a].bwg_current_key + "_" + a
        )
          .removeClass("bwg_slideshow_thumb_deactive_" + a)
          .addClass("bwg_slideshow_thumb_active_" + a),
        jQuery(".bwg_slideshow_dots_" + a)
          .removeClass("bwg_slideshow_dots_active_" + a)
          .addClass("bwg_slideshow_dots_deactive_" + a),
        jQuery("#bwg_dots_" + bwg_params[a].bwg_current_key + "_" + a)
          .removeClass("bwg_slideshow_dots_deactive_" + a)
          .addClass("bwg_slideshow_dots_active_" + a))
      : (jQuery(".bwg_filmstrip_thumbnail")
          .removeClass("bwg_thumb_active")
          .addClass("bwg_thumb_deactive"),
        jQuery("#bwg_filmstrip_thumbnail_" + gallery_box_data.bwg_current_key)
          .removeClass("bwg_thumb_deactive")
          .addClass("bwg_thumb_active")),
    bwg_testBrowser_cssTransitions()
      ? (jQuery(t).css("transition", "opacity " + r + "ms linear"),
        jQuery(e).css("transition", "opacity " + r + "ms linear"),
        jQuery(e).css({ opacity: 0, "z-index": 1 }),
        jQuery(t).css({ opacity: 1, "z-index": 2 }),
        jQuery(t).one(
          "webkitTransitionEnd transitionend otransitionend oTransitionEnd mstransitionend",
          jQuery.proxy(s)
        ))
      : (jQuery(e).animate({ opacity: 0, "z-index": 1 }, r),
        jQuery(t).animate(
          { opacity: 1, "z-index": 2 },
          {
            duration: r,
            complete: function () {
              _
                ? (bwg_params[a].bwg_trans_in_progress = !1)
                : (gallery_box_data.bwg_trans_in_progress = !1),
                jQuery(e).html(""),
                s();
            },
          }
        ),
        jQuery(e).fadeTo(r, 0),
        jQuery(t).fadeTo(r, 1)),
    0 == r && s();
}
function bwg_change_watermark_container(t) {
  jQuery(".bwg_slider" + (void 0 !== t && "" !== t ? "_" + t : ""))
    .children()
    .each(function () {
      if (2 == jQuery(this).css("zIndex")) {
        var e = jQuery(this).find("img");
        if (e.length)
          if (e.prop("complete"))
            bwg_change_each_watermark_container(e.width(), e.height(), t);
          else
            e.on("load", function () {
              bwg_change_each_watermark_container(e.width(), e.height(), t);
            });
        else
          (e = jQuery(this).find("iframe")).length ||
            (e = jQuery(this).find("video")),
            bwg_change_each_watermark_container(e.width(), e.height(), t);
      }
    });
}
function bwg_change_each_watermark_container(e, t, i) {
  var a = void 0 !== i && "" !== i ? "_" + i : "",
    r = void 0 !== i && "" !== i ? "_slideshow" : "";
  if (
    (jQuery(".bwg" + r + "_watermark_spun" + a).width(e),
    jQuery(".bwg" + r + "_watermark_spun" + a).height(t),
    jQuery(".bwg" + r + "_watermark" + a).css({ display: "" }),
    void 0 === i || "" === i)
  ) {
    var _ = 0;
    (jQuery(".bwg_comment_container").hasClass("bwg_open") ||
      jQuery(".bwg_ecommerce_container").hasClass("bwg_open")) &&
      (_ = gallery_box_data.lightbox_comment_width),
      e <= jQuery(window).width() - _ &&
        (jQuery(".bwg_watermark_image").css({
          width:
            ((jQuery(".spider_popup_wrap").width() - _) *
              gallery_box_data.watermark_font_size) /
            gallery_box_data.image_width,
        }),
        jQuery(".bwg_watermark_text, .bwg_watermark_text:hover").css({
          fontSize:
            ((jQuery(".spider_popup_wrap").width() - _) *
              gallery_box_data.watermark_font_size) /
            gallery_box_data.image_width,
        }));
  } else
    jQuery(".bwg" + r + "_title_spun" + a).width(e),
      jQuery(".bwg" + r + "_title_spun" + a).height(t),
      jQuery(".bwg" + r + "_description_spun" + a).width(e),
      jQuery(".bwg" + r + "_description_spun" + a).height(t);
  jQuery.trim(jQuery(".bwg" + r + "_title_text" + a).text()) &&
    jQuery(".bwg_slideshow_title_text" + a).css({ display: "" }),
    jQuery.trim(jQuery(".bwg" + r + "_description_text" + a).text()) &&
      jQuery(".bwg" + r + "_description_text" + a).css({ display: "" });
}
function bwg_set_filmstrip_pos(e, t, i) {
  var a,
    r = void 0 !== t && "" !== t ? "_" + t : "",
    _ = void 0 !== t && "" !== t ? "_slideshow" : "";
  a =
    void 0 !== t && "" !== t
      ? bwg_params[t].left_or_top
      : gallery_box_data.left_or_top;
  var s = parseInt(
      jQuery(".bwg_filmstrip_thumbnails").attr(
        "data-all-images-top-bottom-space"
      )
    ),
    o = parseInt(
      jQuery(".bwg_filmstrip_thumbnails").attr(
        "data-all-images-right-left-space"
      )
    );
  if (void 0 === t || "" === t) {
    if ("outerWidth" == gallery_box_data.outerWidth_or_outerHeight)
      var l =
        -bwg_current_filmstrip_pos -
        jQuery(".bwg_filmstrip_thumbnail").outerWidth(!0) / 2;
    else if ("outerHeight" == gallery_box_data.outerWidth_or_outerHeight)
      l =
        -bwg_current_filmstrip_pos -
        jQuery(".bwg_filmstrip_thumbnail").outerHeight(!0) / 2;
    if ("width" == gallery_box_data.width_or_height)
      var n = Math.min(
        0,
        Math.max(e - jQuery(".bwg_filmstrip_thumbnails").width(), l + e / 2)
      );
    else if ("height" == gallery_box_data.width_or_height)
      n = Math.min(
        0,
        Math.max(e - jQuery(".bwg_filmstrip_thumbnails").height(), l + e / 2)
      );
  } else if ("width" == bwg_params[t].width_or_height)
    (l =
      -bwg_params[t].bwg_current_filmstrip_pos -
      (jQuery(".bwg_slideshow_filmstrip_thumbnail" + r).width() +
        bwg_params[t].filmstrip_thumb_margin_hor) /
        2),
      (n = Math.min(
        0,
        Math.max(
          e - jQuery(".bwg_slideshow_filmstrip_thumbnails" + r).width(),
          l + e / 2
        )
      ));
  else
    (l =
      -bwg_params[t].bwg_current_filmstrip_pos -
      (jQuery(".bwg_slideshow_filmstrip_thumbnail" + r).height() +
        bwg_params[t].filmstrip_thumb_margin_hor) /
        2),
      (n = Math.min(
        0,
        Math.max(
          e - jQuery(".bwg_slideshow_filmstrip_thumbnails" + r).height(),
          l + e / 2
        )
      ));
  0 < n + o && (o = 0),
    0 < n + s && (s = 0),
    "left" == a
      ? jQuery(".bwg" + _ + "_filmstrip_thumbnails" + r).animate(
          { left: n + o },
          {
            duration: 500,
            complete: function () {
              bwg_filmstrip_arrows(t);
            },
          }
        )
      : jQuery(".bwg" + _ + "_filmstrip_thumbnails" + r).animate(
          { top: n + s },
          {
            duration: 500,
            complete: function () {
              bwg_filmstrip_arrows(t);
            },
          }
        );
}
function bwg_filmstrip_arrows(e) {
  var t = void 0 !== e && "" !== e ? "_" + e : "",
    i = void 0 !== e && "" !== e ? "_slideshow" : "";
  if (
    "width" ==
    (void 0 !== e && "" !== e
      ? bwg_params[e].width_or_heigh
      : gallery_box_data.width_or_height)
  )
    var a = jQuery(".bwg" + i + "_filmstrip_thumbnails" + t).width(),
      r = jQuery(".bwg" + i + "_filmstrip" + t).width();
  else
    (a = jQuery(".bwg" + i + "_filmstrip_thumbnails" + t).height()),
      (r = jQuery(".bwg" + i + "_filmstrip" + t).height());
  a < r
    ? (jQuery(".bwg" + i + "_filmstrip_left" + t).hide(),
      jQuery(".bwg" + i + "_filmstrip_right" + t).hide())
    : (jQuery(".bwg" + i + "_filmstrip_left" + t).show(),
      jQuery(".bwg" + i + "_filmstrip_right" + t).show());
}
function bwg_move_filmstrip(e) {
  var t,
    i,
    a,
    r,
    _,
    s,
    o = void 0 !== e && "" !== e ? "_" + e : "",
    l = void 0 !== e && "" !== e ? "_slideshow" : "",
    n =
      void 0 !== e && "" !== e
        ? bwg_params[e].outerWidth_or_outerHeight
        : gallery_box_data.outerWidth_or_outerHeight,
    g =
      void 0 !== e && "" !== e
        ? bwg_params[e].left_or_top
        : gallery_box_data.left_or_top;
  (i =
    "outerWidth" == n
      ? ((t = jQuery(".bwg" + l + "_filmstrip" + o).outerWidth(!0)),
        jQuery(".bwg" + l + "_filmstrip_thumbnails" + o).outerWidth(!0))
      : ((t = jQuery(".bwg" + l + "_filmstrip" + o).outerHeight(!0)),
        jQuery(".bwg" + l + "_filmstrip_thumbnails" + o).outerHeight(!0))),
    (s =
      "left" == g
        ? ((a = jQuery(".bwg" + l + "_thumb_active" + o).position().left),
          (r =
            "outerWidth" == n
              ? jQuery(".bwg" + l + "_thumb_active" + o).position().left +
                jQuery(".bwg" + l + "_thumb_active" + o).outerWidth(!0)
              : jQuery(".bwg" + l + "_thumb_active" + o).position().left +
                jQuery(".bwg" + l + "_thumb_active" + o).outerHeight(!0)),
          (_ = jQuery(".bwg" + l + "_filmstrip_thumbnails" + o).position()
            .left),
          Math.abs(
            jQuery(".bwg" + l + "_filmstrip_thumbnails" + o).position().left
          ) + t)
        : ((a = jQuery(".bwg" + l + "_thumb_active" + o).position().top),
          (r =
            "outerWidth" == n
              ? jQuery(".bwg" + l + "_thumb_active" + o).position().top +
                jQuery(".bwg" + l + "_thumb_active" + o).outerWidth(!0)
              : jQuery(".bwg" + l + "_thumb_active" + o).position().top +
                jQuery(".bwg" + l + "_thumb_active" + o).outerHeight(!0)),
          (_ = jQuery(".bwg" + l + "_filmstrip_thumbnails" + o).position().top),
          Math.abs(
            jQuery(".bwg" + l + "_filmstrip_thumbnails" + o).position().top
          ) + t)),
    i < t ||
      (a < Math.abs(_)
        ? "left" == g
          ? jQuery(".bwg" + l + "_filmstrip_thumbnails" + o).animate(
              { left: -a },
              {
                duration: 500,
                complete: function () {
                  bwg_filmstrip_arrows(e);
                },
              }
            )
          : jQuery(".bwg" + l + "_filmstrip_thumbnails" + o).animate(
              { top: -a },
              {
                duration: 500,
                complete: function () {
                  bwg_filmstrip_arrows(e);
                },
              }
            )
        : s < r &&
          ("left" == g
            ? jQuery(".bwg" + l + "_filmstrip_thumbnails" + o).animate(
                { left: -(r - t) },
                {
                  duration: 500,
                  complete: function () {
                    bwg_filmstrip_arrows(e);
                  },
                }
              )
            : jQuery(".bwg" + l + "_filmstrip_thumbnails" + o).animate(
                { top: -(r - t) },
                {
                  duration: 500,
                  complete: function () {
                    bwg_filmstrip_arrows(e);
                  },
                }
              )));
}
function bwg_move_dots(e) {
  var t = jQuery(".bwg_slideshow_dots_active_" + e).position().left,
    i =
      jQuery(".bwg_slideshow_dots_active_" + e).position().left +
      jQuery(".bwg_slideshow_dots_active_" + e).outerWidth(!0),
    a = jQuery(".bwg_slideshow_dots_container_" + e).outerWidth(!0),
    r = jQuery(".bwg_slideshow_dots_thumbnails_" + e).outerWidth(!1),
    _ = jQuery(".bwg_slideshow_dots_thumbnails_" + e).position().left,
    s =
      Math.abs(jQuery(".bwg_slideshow_dots_thumbnails_" + e).position().left) +
      a;
  r < a ||
    (t < Math.abs(_)
      ? jQuery(".bwg_slideshow_dots_thumbnails_" + e).animate(
          { left: -t },
          { duration: 500, complete: function () {} }
        )
      : s < i &&
        jQuery(".bwg_slideshow_dots_thumbnails_" + e).animate(
          { left: -(i - a) },
          { duration: 500, complete: function () {} }
        ));
}
function bwg_testBrowser_cssTransitions(e) {
  return bwg_testDom("Transition", e);
}
function bwg_testBrowser_cssTransforms3d(e) {
  return bwg_testDom("Perspective", e);
}
function bwg_testDom(e, t) {
  for (var i = ["", "Webkit", "Moz", "ms", "O", "Khtml"], a = i.length; a--; )
    if (void 0 !== document.body.style[i[a] + e]) return !0;
  return !1;
}
function bwg_fallback(e, t, i, a) {
  bwg_fade(e, t, i, a);
}
function bwg_fallback3d(e, t, i, a) {
  bwg_sliceV(e, t, i, a);
}
function bwg_none(e, t, i, a) {
  var r = void 0 !== a && "" !== a ? "_" + a : "";
  if (
    (jQuery(e).css({ opacity: 0, "z-index": 1 }),
    jQuery(t).css({ opacity: 1, "z-index": 2 }),
    void 0 !== a && "" !== a)
  ) {
    var _ = bwg_params[a].bwg_current_key;
    bwg_change_watermark_container(a),
      jQuery(".bwg_slideshow_filmstrip_thumbnail" + r)
        .removeClass("bwg_slideshow_thumb_active" + r)
        .addClass("bwg_slideshow_thumb_deactive" + r),
      jQuery("#bwg_filmstrip_thumbnail_" + _ + r)
        .removeClass("bwg_slideshow_thumb_deactive" + r)
        .addClass("bwg_slideshow_thumb_active" + r),
      jQuery(".bwg_slideshow_dots" + r)
        .removeClass("bwg_slideshow_dots_active" + r)
        .addClass("bwg_slideshow_dots_deactive" + r),
      jQuery("#bwg_dots_" + _ + r)
        .removeClass("bwg_slideshow_dots_deactive" + r)
        .addClass("bwg_slideshow_dots_active" + r);
  } else
    jQuery(".bwg_image_info").show(),
      (gallery_box_data.bwg_trans_in_progress = !1),
      jQuery(e).html(""),
      bwg_change_watermark_container();
}
function bwg_iterator(e) {
  var t = 1;
  return (
    void 0 !== e &&
      "" !== e &&
      void 0 !== bwg_params[e] &&
      1 == bwg_params[e].enable_slideshow_shuffle &&
      (t = Math.floor((bwg_params[e].data.length - 1) * Math.random() + 1)),
    t
  );
}
function bwg_change_image_slideshow(e, t, i, a, r) {
  i = bwg_params[r].data;
  if (
    (jQuery("#bwg_slideshow_image_container_" + r)
      .find("iframe")
      .each(function () {
        jQuery(this)[0].contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        ),
          jQuery(this)[0].contentWindow.postMessage(
            '{ "method": "pause" }',
            "*"
          ),
          jQuery(this)[0].contentWindow.postMessage("pause", "*");
      }),
    jQuery("#image_id_" + r + "_" + i[e].id)
      .find(".bwg_fb_video")
      .each(function () {
        jQuery(this).attr("src", jQuery(this).attr("src"));
      }),
    i[t])
  ) {
    if (
      (jQuery(".bwg_ctrl_btn_" + r).hasClass("bwg-icon-pause") &&
        bwg_play(bwg_params[r].data, r),
      a ||
        (jQuery("#bwg_current_image_key_" + r).val(t),
        "-1" == e
          ? (e = jQuery(".bwg_slideshow_thumb_active_" + r)
              .children("img")
              .attr("image_key"))
          : "-2" == e &&
            (e = jQuery(".bwg_slideshow_dots_active_" + r).attr("image_key"))),
      bwg_params[r].bwg_trans_in_progress)
    )
      return void bwg_params[r].event_stack.push(e + "-" + t);
    var _ = "right";
    if (t < e) _ = "left";
    else if (e == t) return;
    jQuery(".bwg_slideshow_watermark_" + r).css({ display: "none" }),
      jQuery(".bwg_slideshow_title_text_" + r).css({ display: "none" }),
      jQuery(".bwg_slideshow_description_text_" + r).css({ display: "none" }),
      "width" == bwg_params[r].width_or_height
        ? (bwg_params[r].bwg_current_filmstrip_pos =
            t *
            (jQuery(".bwg_slideshow_filmstrip_thumbnail_" + r).width() +
              2 +
              2 * bwg_params[r].lightbox_filmstrip_thumb_border_width))
        : (bwg_params[r].bwg_current_filmstrip_pos =
            t *
            (jQuery(".bwg_slideshow_filmstrip_thumbnail_" + r).height() +
              2 +
              2 * bwg_params[r].lightbox_filmstrip_thumb_border_width)),
      (e = t),
      (bwg_params[r].bwg_current_key = e),
      jQuery("#bwg_slideshow_image_" + r).attr("image_id", i[t].id),
      jQuery(".bwg_slideshow_title_text_" + r).html(
        jQuery('<span style="display: block;" />').html(i[t].alt).text()
      ),
      jQuery(".bwg_slideshow_description_text_" + r).html(
        jQuery('<span style="display: block;" />').html(i[t].description).text()
      );
    var s =
        2 == jQuery(".bwg_slideshow_image_spun_" + r).css("zIndex")
          ? ".bwg_slideshow_image_spun_" + r
          : ".bwg_slideshow_image_second_spun_" + r,
      o =
        s == ".bwg_slideshow_image_second_spun_" + r
          ? ".bwg_slideshow_image_spun_" + r
          : ".bwg_slideshow_image_second_spun_" + r,
      l = -1 < i[t].filetype.indexOf("EMBED_"),
      n = -1 < i[t].filetype.indexOf("INSTAGRAM_POST"),
      g = -1 < i[t].filetype.indexOf("INSTAGRAM_VIDEO"),
      w = jQuery(s).height(),
      b = jQuery(s).width(),
      u =
        '<span class="bwg_slideshow_image_spun1_' +
        r +
        '" style="display:  ' +
        (l ? "block" : "table") +
        ' ;width: inherit; height: inherit;"><span class="bwg_slideshow_image_spun2_' +
        r +
        '" style="display: ' +
        (l ? "block" : "table-cell") +
        '; vertical-align: middle; text-align: center; ">';
    if (l) {
      if (
        ((u +=
          '<span style="height: ' +
          w +
          "px; width: " +
          b +
          'px;" class="bwg_popup_embed bwg_popup_watermark">'),
        g &&
          (u +=
            '<span class="bwg_inst_play_btn_cont" onclick="bwg_play_instagram_video(this)"><span class="bwg_inst_play"></span></span>'),
        n)
      ) {
        var d = 0,
          h = 0;
        w < b + 88 ? (d = (h = w) - 88) : (h = (d = b) + 88),
          (u += spider_display_embed(
            i[t].filetype,
            decodeURIComponent(i[t].image_url),
            i[t].filename,
            {
              class: "bwg_embed_frame",
              "data-width": i[t].image_width,
              "data-height": i[t].image_height,
              frameborder: "0",
              allowfullscreen: "allowfullscreen",
              style:
                "width:" +
                d +
                "px; height:" +
                h +
                "px; vertical-align:middle; display:inline-block; position:relative;",
            }
          ));
      } else
        u += spider_display_embed(
          i[t].filetype,
          decodeURIComponent(i[t].image_url),
          i[t].filename,
          {
            class: "bwg_embed_frame",
            frameborder: "0",
            allowfullscreen: "allowfullscreen",
            style:
              "width:inherit; height:inherit; vertical-align:middle; display:table-cell;",
          }
        );
      u += "</span>";
    } else {
      if ("do_nothing" != bwg_params[r].thumb_click_action) {
        var m = "";
        "open_lightbox" == bwg_params[r].thumb_click_action
          ? (m += ' class="bwg_lightbox" data-image-id="' + i[t].id + '"')
          : "redirect_to_url" == bwg_params[r].thumb_click_action &&
            i[t].redirect_url &&
            (m +=
              'href="' +
              i[t].redirect_url +
              '"' +
              (bwg_params[r].thumb_link_target &&
              1 == bwg_params[r].thumb_link_target
                ? ' target="_blank"'
                : "")),
          (u += "<a " + m + ">");
      }
      (u +=
        '<img style="max-height: ' +
        w +
        "px !important; max-width: " +
        b +
        'px !important; display:inline-block;" '),
        (u += ' class="bwg_slide bwg_slideshow_image_' + r + '" '),
        (u += ' id="bwg_slideshow_image_' + r + '" '),
        (u +=
          ' src="' +
          bwg_params[r].upload_url +
          jQuery("<span style='display: block;' />")
            .html(decodeURIComponent(i[t].image_url))
            .text() +
          '" alt="' +
          i[t].alt +
          '" image_id="' +
          i[t].id +
          '" /></a>');
    }
    (u += "</span></span>"),
      jQuery(o).html(u),
      bwg_params[r].preload_images && bwg_preload_images(t, r),
      window["bwg_" + bwg_params[r].slideshow_effect](s, o, _, r),
      0 < bwg_params[r].enable_slideshow_filmstrip
        ? bwg_move_filmstrip(r)
        : bwg_move_dots(r),
      i[t].is_embed_video
        ? jQuery("#bwg_slideshow_play_pause_" + r).css({ display: "none" })
        : jQuery("#bwg_slideshow_play_pause_" + r).css({ display: "" });
  }
  bwg_add_lightbox();
}
function bwg_preload_images_slideshow(e, t) {
  var i = bwg_params[t].data;
  count = bwg_params[t].preload_images_count / 2;
  var a = i.length;
  if ((a < bwg_params[t].preload_images_count && (count = 0), 0 != count))
    for (var r = e - count; r < e + count; r++) {
      var _ = parseInt((r + a) % a),
        s = -1 < i[_].filetype.indexOf("EMBED_");
      void 0 !== i[_] &&
        (s ||
          jQuery("<img/>").attr(
            "src",
            bwg_params[t].upload_url +
              jQuery('<span style="display: block;" />')
                .html(decodeURIComponent(i[_].image_url))
                .text()
          ));
    }
  else
    for (r = 0; r < i.length; r++) {
      s = -1 < i[r].filetype.indexOf("EMBED_");
      void 0 !== i[r] &&
        (s ||
          jQuery("<img/>").attr(
            "src",
            bwg_params[t].upload_url +
              jQuery('<span style="display: block;" />')
                .html(decodeURIComponent(i[r].image_url))
                .text()
          ));
    }
}
function bwg_preload_images(e, t) {
  void 0 !== t && "" !== t
    ? bwg_preload_images_slideshow(e, t)
    : bwg_preload_images_lightbox(e);
}
function bwg_popup_resize_slidshow(e) {
  var t = jQuery(".bwg_slideshow_image_wrap_" + e)
      .parent()
      .width(),
    i = bwg_params[e].data;
  if (t >= bwg_params[e].image_width) {
    jQuery(".bwg_slideshow_image_wrap_" + e).css({
      width: bwg_params[e].image_width,
    }),
      jQuery(".bwg_slideshow_image_wrap_" + e).css({
        height: bwg_params[e].image_height,
      }),
      jQuery(".bwg_slideshow_image_container_" + e).css({
        width:
          "horizontal" == bwg_params[e].filmstrip_direction
            ? bwg_params[e].image_width
            : bwg_params[e].image_width -
              bwg_params[e].slideshow_filmstrip_width,
      }),
      jQuery(".bwg_slideshow_image_container_" + e).css({
        height:
          "horizontal" == bwg_params[e].filmstrip_direction
            ? bwg_params[e].image_height -
              bwg_params[e].slideshow_filmstrip_height
            : bwg_params[e].image_height,
      }),
      jQuery(".bwg_slideshow_image_" + e).css({
        cssText: (bwg_params[e].filmstrip_direction, bwg_params[e].image_width),
      }),
      jQuery(".bwg_slideshow_embed_" + e).css({
        cssText: (bwg_params[e].filmstrip_direction, bwg_params[e].image_width),
      }),
      bwg_resize_instagram_post(e),
      bwg_change_watermark_container(e);
    var a =
        "horizontal" == bwg_params[e].filmstrip_direction
          ? "width: " + bwg_params[e].image_width
          : "height: " + bwg_params[e].image_height,
      r =
        "horizontal" == bwg_params[e].filmstrip_direction
          ? "width: " + (bwg_params[e].image_width - 40)
          : "height: " + (bwg_params[e].image_height - 40);
    jQuery(".bwg_slideshow_filmstrip_container_" + e).css({ cssText: a }),
      jQuery(".bwg_slideshow_filmstrip_" + e).css({ cssText: r }),
      jQuery(".bwg_slideshow_dots_container_" + e).css({
        width: bwg_params[e].image_width,
      }),
      jQuery("#bwg_slideshow_play_pause-ico_" + e).css({
        fontSize: bwg_params[e].slideshow_play_pause_btn_size,
      }),
      "image" == bwg_params[e].watermark_type &&
        jQuery(".bwg_slideshow_watermark_image_" + e).css({
          maxWidth: bwg_params[e].watermark_width,
          maxHeight: bwg_params[e].watermark_height,
        }),
      "text" == bwg_params[e].watermark_type &&
        jQuery(
          ".bwg_slideshow_watermark_text_" +
            e +
            ", .bwg_slideshow_watermark_text_" +
            e +
            " : hover"
        ).css({ fontSize: bwg_params[e].watermark_font_size }),
      jQuery(".bwg_slideshow_title_text_" + e).css({
        fontSize: 2 * bwg_params[e].slideshow_title_font_size,
      }),
      jQuery(".bwg_slideshow_description_text_" + e).css({
        fontSize: 2 * bwg_params[e].slideshow_description_font_size,
      });
  } else
    jQuery(".bwg_slideshow_image_wrap_" + e).css({ width: t }),
      jQuery(".bwg_slideshow_image_wrap_" + e).css({
        height: (t * bwg_params[e].image_height) / bwg_params[e].image_width,
      }),
      jQuery(".bwg_slideshow_image_container_" + e).css({
        width:
          t -
          ("horizontal" == bwg_params[e].filmstrip_direction
            ? 0
            : bwg_params[e].slideshow_filmstrip_width),
      }),
      jQuery(".bwg_slideshow_image_container_" + e).css({
        height:
          (t * bwg_params[e].image_height) / bwg_params[e].image_width -
          ("horizontal" == bwg_params[e].filmstrip_direction
            ? bwg_params[e].slideshow_filmstrip_height
            : 0),
      }),
      jQuery(".bwg_slideshow_image_" + e).css({
        cssText:
          "max-width: " +
          (t -
            ("horizontal" == bwg_params[e].filmstrip_direction
              ? 0
              : bwg_params[e].slideshow_filmstrip_width)) +
          "px !important; max-height: " +
          (t * (bwg_params[e].image_height / bwg_params[e].image_width) -
            ("horizontal" == bwg_params[e].filmstrip_direction
              ? bwg_params[e].slideshow_filmstrip_height
              : 0) -
            1) +
          "px !important;",
      }),
      jQuery(".bwg_slideshow_embed_" + e).css({
        cssText:
          "width: " +
          (t -
            ("horizontal" == bwg_params[e].filmstrip_direction
              ? 0
              : bwg_params[e].slideshow_filmstrip_width)) +
          "px !important; height: " +
          (t * (bwg_params[e].image_height / bwg_params[e].image_width) -
            ("horizontal" == bwg_params[e].filmstrip_direction
              ? bwg_params[e].slideshow_filmstrip_height
              : 0) -
            1) +
          "px !important;",
      }),
      bwg_resize_instagram_post(e),
      bwg_change_watermark_container(e),
      "horizontal" == bwg_params[e].filmstrip_direction
        ? (jQuery(".bwg_slideshow_filmstrip_container_" + e).css({ width: t }),
          jQuery(".bwg_slideshow_filmstrip_" + e).css({ width: t - 40 }))
        : (jQuery(".bwg_slideshow_filmstrip_container_" + e).css({
            height:
              (t * bwg_params[e].image_height) / bwg_params[e].image_width,
          }),
          jQuery(".bwg_slideshow_filmstrip_" + e).css({
            height:
              (t * bwg_params[e].image_height) / bwg_params[e].image_width - 40,
          })),
      jQuery(".bwg_slideshow_dots_container_" + e).css({ width: t }),
      jQuery("#bwg_slideshow_play_pause-ico_" + e).css({
        fontSize:
          (t * bwg_params[e].slideshow_play_pause_btn_size) /
          bwg_params[e].image_width,
      }),
      jQuery(".bwg_slideshow_watermark_image_" + e).css({
        maxWidth:
          (t * bwg_params[e].watermark_width) / bwg_params[e].image_width,
        maxHeight:
          (t * bwg_params[e].watermark_height) / bwg_params[e].image_width,
      }),
      jQuery(
        ".bwg_slideshow_watermark_text_" +
          e +
          ", .bwg_slideshow_watermark_text_" +
          e +
          ":hover"
      ).css({
        fontSize:
          (t * bwg_params[e].watermark_font_size) / bwg_params[e].image_width,
      }),
      jQuery(".bwg_slideshow_title_text_" + e).css({
        fontSize:
          (2 * t * bwg_params[e].slideshow_title_font_size) /
          bwg_params[e].image_width,
      }),
      jQuery(".bwg_slideshow_description_text_" + e).css({
        fontSize:
          (2 * t * bwg_params[e].slideshow_description_font_size) /
          bwg_params[e].image_width,
      }),
      jQuery(".bwg_slideshow_image_" + e).css({ display: "inline-block" });
  i[parseInt(jQuery("#bwg_current_image_key_" + e).val())].is_embed_video
    ? jQuery("#bwg_slideshow_play_pause_" + e).css({ display: "none" })
    : jQuery("#bwg_slideshow_play_pause_" + e).css({ display: "" });
}
function bwg_popup_resize(e) {
  void 0 !== e && "" !== e
    ? bwg_popup_resize_slidshow(e)
    : bwg_popup_resize_lightbox();
}
function bwg_change_image(e, t, i, a, r) {
  void 0 !== r && "" !== r
    ? bwg_change_image_slideshow(e, t, i, a, r)
    : bwg_change_image_lightbox(e, t, (i = gallery_box_data.data), a);
}
function bwg_resize_instagram_post(e) {
  if (void 0 !== e && "" !== e) {
    if (jQuery(".inner_instagram_iframe_bwg_embed_frame_" + e).length) {
      var t = jQuery(".bwg_slideshow_embed_" + e).width(),
        i = jQuery(".bwg_slideshow_embed_").height();
      jQuery(".inner_instagram_iframe_bwg_embed_frame_" + e).each(function () {
        var e = jQuery(this).parent();
        i / (parseInt(e.attr("data-height")) + 96) <
        t / parseInt(e.attr("data-width"))
          ? (e.height(i),
            e.width(
              ((e.height() - 96) * e.attr("data-width")) /
                e.attr("data-height") +
                16
            ))
          : (e.width(t),
            e.height(
              ((e.width() - 16) * e.attr("data-height")) /
                e.attr("data-width") +
                96
            ));
      }),
        bwg_change_watermark_container(e);
    }
  } else if (jQuery(".inner_instagram_iframe_bwg_embed_frame").length) {
    (t = jQuery(".bwg_image_container").width()),
      (i = jQuery(".bwg_image_container").height());
    jQuery(".inner_instagram_iframe_bwg_embed_frame").each(function () {
      var e = jQuery(this).parent();
      i / (parseInt(e.attr("data-height")) + 176) <
      t / parseInt(e.attr("data-width"))
        ? (e.height(i),
          e.width(
            ((e.height() - 176) * e.attr("data-width")) /
              e.attr("data-height") +
              16
          ))
        : (e.width(t),
          e.height(
            ((e.width() - 16) * e.attr("data-height")) / e.attr("data-width") +
              96
          )),
        e.css({ top: 0.5 * (i - e.height()) });
    }),
      bwg_change_watermark_container();
  }
}
function bwg_play(t, i) {
  if (void 0 !== i && "" !== i) t = bwg_params[i].data;
  void 0 !== i && "" !== i
    ? (window.clearInterval(window["bwg_playInterval" + i]),
      (window["bwg_playInterval" + i] = setInterval(function () {
        var e = 1;
        1 == bwg_params[i].enable_slideshow_shuffle &&
          (e = Math.floor((t.length - 1) * Math.random() + 1)),
          bwg_change_image(
            parseInt(jQuery("#bwg_current_image_key_" + i).val()),
            (parseInt(jQuery("#bwg_current_image_key_" + i).val()) + e) %
              t.length,
            t,
            "",
            i
          );
      }, 1e3 * bwg_params[i].slideshow_interval)))
    : (window.clearInterval(gallery_box_data.bwg_playInterval),
      (gallery_box_data.bwg_playInterval = setInterval(function () {
        jQuery(".bwg_comment_container").hasClass("bwg_open") ||
          (jQuery(".bwg_play_pause").length &&
            jQuery(".bwg_play_pause").hasClass("bwg-icon-play")) ||
          (void 0 === t ||
          void 0 !== t[parseInt(jQuery("#bwg_current_image_key").val()) + 1]
            ? bwg_change_image(
                parseInt(jQuery("#bwg_current_image_key").val()),
                parseInt(jQuery("#bwg_current_image_key").val()) + 1
              )
            : 1 == gallery_box_data.enable_loop &&
              bwg_change_image(
                parseInt(jQuery("#bwg_current_image_key").val()),
                0
              ));
      }, 1e3 * gallery_box_data.slideshow_interval)));
}
function bwg_image_browser(e) {
  if (
    (jQuery("#bwg_embed_frame_16x9_" + e).width(
      jQuery("#bwg_embed_frame_16x9_" + e)
        .parents(".image_browser_image_buttons_" + e)
        .width()
    ),
    jQuery("#bwg_embed_frame_16x9_" + e).height(
      0.5625 * jQuery("#bwg_embed_frame_16x9_" + e).width()
    ),
    jQuery("#bwg_embed_frame_instapost_" + e).width(
      jQuery("#bwg_embed_frame_16x9_" + e)
        .parents(".image_browser_image_buttons_" + e)
        .width()
    ),
    jQuery(".image_browser_images_conteiner_" + e).find(
      ".fluid-width-video-wrapper"
    ).length)
  ) {
    var t = jQuery(".image_browser_images_conteiner_" + e)
      .find(".fluid-width-video-wrapper")
      .contents();
    jQuery(".image_browser_images_conteiner_" + e)
      .find(".fluid-width-video-wrapper")
      .replaceWith(t);
  }
  jQuery(".bwg_embed_frame_instapost_" + e).height(
    ((jQuery(".bwg_embed_frame_instapost_" + e).width() - 16) *
      jQuery(".bwg_embed_frame_instapost_" + e).attr("data-height")) /
      jQuery(".bwg_embed_frame_instapost_" + e).attr("data-width") +
      96
  );
  var i = jQuery(".image_browser_images_" + e).width();
  i <= 108
    ? jQuery(".paging-input_" + e).css("display", "none")
    : (i <= 200
        ? (jQuery(".paging-input_" + e).css("margin", "0% 0% 0% 0%"),
          jQuery(".paging-input_" + e).css("display", "inline"))
        : i <= 580
        ? (jQuery(".paging-input_" + e).css("display", "inline"),
          jQuery(".tablenav-pages_" + e + " a").css("font-size", "13px"),
          jQuery(".paging-input_" + e).css("margin", "0% 7% 0% 7%"))
        : (jQuery(".tablenav-pages_" + e + " a").css("font-size", "15px"),
          jQuery(".paging-input_" + e).css("margin", "0%  14% 0%  14%"),
          jQuery(".paging-input_" + e).css("display", "inline")),
      jQuery(".tablenav-pages_" + e + " .next-page").css(
        "margin",
        "0% 0% 0% 0%"
      ),
      jQuery(".tablenav-pages_" + e + " .prev-page").css(
        "margin",
        "0% 0% 0% 0%"
      ));
}
function bwg_disable_right_click(e) {
  e.bind("contextmenu", function () {
    return !1;
  }),
    e.css("webkitTouchCallout", "none");
}
jQuery(function () {
  jQuery(".bwg_container").each(function () {
    var e = !1;
    if ((0 < jQuery(this).find(".wd_error").length && (e = !0), !e)) {
      var t = 0;
      jQuery(this)
        .on("visibility", function () {
          var e = jQuery(this);
          setInterval(function () {
            e.is(":hidden")
              ? 1 == t && ((t = 0), bwg_slideshow_blur())
              : 0 == t && ((t = 1), bwg_slideshow_focus());
          }, 300);
        })
        .trigger("visibility");
    }
  });
}),
  jQuery(window).on("resize", function () {
    setTimeout(function () {
      var e = !1;
      jQuery(".bwg_container").each(function () {
        0 < jQuery(this).find(".wd_error").length && (e = !0);
      }),
        e ||
          (jQuery(
            ".bwg-thumbnails, .bwg-masonry-thumbnails, .bwg-album-thumbnails"
          ).each(function () {
            bwg_all_thumnails_loaded(this);
          }),
          bwg_slideshow_resize(),
          bwg_image_browser_resize(),
          bwg_carousel_resize(),
          bwg_blog_style_resize(),
          jQuery(".bwg-mosaic-thumbnails").each(function () {
            bwg_thumbnail_mosaic(this);
          })),
        bwg_resize_search_line();
    }, 0);
  }),
  jQuery(window).on("load", function () {
    var e = !1;
    jQuery(".bwg_container").each(function () {
      0 < jQuery(this).find(".wd_error").length && (e = !0);
    }),
      e ||
        (bwg_blog_style_onload(),
        jQuery(".bwg-mosaic-thumbnails").each(function () {
          bwg_thumbnail_mosaic(this);
        }));
  }),
  jQuery(".bwg-masonry-thumb-span img, .bwg-mosaic-thumb-span img").on(
    "error",
    function () {
      jQuery(this).height(100), jQuery(this).width(100);
    }
  );
