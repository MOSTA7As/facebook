/*FB_PKG_DELIM*/

__d(
  "E2EEMessagingLinkContext.react",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || (h = d("react"));
    c = h;
    e = c.createContext;
    var j = c.useContext,
      k = e(!1);
    function a(a) {
      var b = a.children;
      a = a.isSecure;
      return i.jsx(k.Provider, { value: a, children: b });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    function b() {
      return j(k);
    }
    g.E2EEMessagingLinkProvider = a;
    g.useE2EEMessagingLink = b;
  },
  98
);
__d(
  "LoginFormRedirect",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = /c_user=(.+?)(;|$)/;
    function a(a) {
      var b = window.setInterval(function () {
        g.test(document.cookie) &&
          (window.clearInterval(b), (window.location.href = a));
      }, 5e3);
      window.addEventListener("beforeunload", function () {
        window.clearInterval(b);
      });
    }
    f.initCookiePolling = a;
  },
  66
);
__d(
  "MWXLink.react",
  ["E2EEMessagingLinkContext.react", "cr:269", "cr:820", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    c = i.forwardRef(a);
    function a(a, c) {
      var e = a.encryptedLink;
      a = babelHelpers.objectWithoutPropertiesLoose(a, ["encryptedLink"]);
      var f = d("E2EEMessagingLinkContext.react").useE2EEMessagingLink();
      f =
        f || e === !0
          ? {
              disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV:
                !0,
              disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV:
                !0,
              rel: ["noreferrer", "noopener", "nofollow"],
            }
          : {};
      if (b("cr:269"))
        return i.jsx(
          b("cr:269"),
          babelHelpers["extends"]({}, a, f, { ref: c })
        );
      return b("cr:820")
        ? i.jsx(b("cr:820"), babelHelpers["extends"]({}, a, f, { ref: c }))
        : null;
    }
    a.displayName = a.name + " [from " + f.id + "]";
    e = c;
    g["default"] = e;
  },
  98
);
__d(
  "TopLevelKeyCommandListener.react",
  ["BaseKeyCommandListener.react", "CometGlobalKeyCommandWidget", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      a = a.children;
      return i.jsx(c("CometGlobalKeyCommandWidget").Wrapper, {
        debugName: "global",
        children: i.jsx(c("BaseKeyCommandListener.react"), {
          observersEnabled: !0,
          children: a,
        }),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);
__d(
  "MWXDialogLoadingState.react",
  ["cr:9909", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    h || d("react");
    g["default"] = b("cr:9909");
  },
  98
);
__d(
  "useMWXLazyDialog",
  [
    "MWXDialogLoadingState.react",
    "react",
    "tracePolicyFromResource",
    "useBaseLazyDialog",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || c("react"),
      j = function (a) {
        return i.jsx(c("MWXDialogLoadingState.react"), { onClose: a });
      };
    function a(a, b, d) {
      var e = c("tracePolicyFromResource")("mwp.dialog", a);
      return c("useBaseLazyDialog")(a, (a = b) != null ? a : j, e, d);
    }
    g["default"] = a;
  },
  98
);
__d(
  "MWForgotPasswordLoginErrorLink.react",
  [
    "fbt",
    "CometTransientDialogProvider.react",
    "JSResourceForInteraction",
    "MWXLink.react",
    "TopLevelKeyCommandListener.react",
    "react",
    "useMWXLazyDialog",
  ],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i,
      j = i || (i = d("react")),
      k = i.useCallback,
      l = c("JSResourceForInteraction")(
        "MWForgotPasswordDialog.react"
      ).__setRef("MWForgotPasswordLoginErrorLink.react"),
      m = { link: { textDecoration: "x1bvjpef", $$css: !0 } };
    function n(a) {
      var b = a.recoverUri;
      a = c("useMWXLazyDialog")(l);
      var d = a[0];
      a = a[1];
      var e = h._(
          /*BTDS*/ "\u0647\u0644 \u0646\u0633\u064a\u062a \u0643\u0644\u0645\u0629 \u0627\u0644\u0633\u0631\u061f"
        ),
        f = k(
          function () {
            d({ label: e, recoverUri: b });
          },
          [d, b, e]
        );
      return j.jsx(c("MWXLink.react"), {
        onClick: f,
        ref: a,
        role: "button",
        xstyle_DEPRECATED: m.link,
        children: j.jsx("span", { children: e }),
      });
    }
    n.displayName = n.name + " [from " + f.id + "]";
    function a(a) {
      a = a.recoverUri;
      return j.jsx(c("TopLevelKeyCommandListener.react"), {
        children: j.jsx(c("CometTransientDialogProvider.react"), {
          children: j.jsx(n, { recoverUri: a }),
        }),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  226
);
__d(
  "QPLE2ESessionMarkers",
  ["$InternalEnum"],
  function (a, b, c, d, e, f) {
    a = b("$InternalEnum")({ NONE: "none", START: "start", END: "end" });
    c = a;
    f["default"] = c;
  },
  66
);
__d(
  "QPLE2E",
  ["QuickPerformanceLogger"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = (function () {
      function a() {}
      var b = a.prototype;
      b.logPointDeprecated = function (a, b, d, e) {
        var f, g;
        e === void 0 && (e = {});
        f =
          (f = e.timestamp) != null
            ? f
            : (h || (h = c("QuickPerformanceLogger"))).currentTimestamp();
        var i = babelHelpers["extends"]({}, e.pointData);
        g = (g = e.action) != null ? g : 12524;
        e.secondaryOrder != void 0 &&
          (i.string || (i.string = {}),
          (i.string.qpl_e2e__secondary_order = e.secondaryOrder));
        if (e.sessionMarker && e.sessionMarker !== "none") {
          var j;
          i.bool || (i.bool = {});
          i.bool = babelHelpers["extends"](
            {},
            i.bool,
            ((j = {}),
            (j.qpl_e2e__session_marker_start_point =
              e.sessionMarker === "start"),
            (j.qpl_e2e__session_marker_end_point = e.sessionMarker === "end"),
            j)
          );
        }
        (h || (h = c("QuickPerformanceLogger"))).markerStart(a, void 0, f, {
          samplingBasis: d,
        });
        h.markerPoint(a, b, { data: i, timestamp: f * 2 });
        e.annotations &&
          (h || (h = c("QuickPerformanceLogger"))).markerAnnotate(
            a,
            e.annotations
          );
        h.markerAnnotate(a, {
          string: ((j = {}), (j.join_id = d), (j.qpl__source = "client"), j),
          bool: ((b = {}), (b.qpl_e2e__align_points = !0), b),
        });
        h.markerEnd(a, g, void 0, f);
      };
      return a;
    })();
    b = new a();
    g["default"] = b;
  },
  98
);
__d(
  "PlatformOAuthDialogLoginFunnelLogger",
  ["FBLogger", "QPLE2E", "URI", "qpl"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = 1;
    a = function (a, b, d, e, f, g) {
      e === void 0 && (e = !0);
      if (d == null || d === "" || (e && j(b))) {
        c("FBLogger")("platform_login_web_funnel_client_js").mustfix(
          "\nerror: null_required_field\naction: " +
            a +
            "\nloggerId: " +
            String(d) +
            "\ncbt: " +
            String(b) +
            "\n        "
        );
        return;
      }
      e = "number" !== typeof b ? parseInt(b, 10) : b;
      b = Date.now() - (isNaN(e) ? 0 : e);
      var h = k(),
        n = l();
      h = {
        string: { logger_id: d },
        int: { first_paint_time: h, response_start_time: n, cbt_delta: b },
      };
      n = {
        int: { client_funnel_version: i, cbt: e },
        string: {},
        bool: { duo_like_passwordless_user: g },
      };
      n.string.gdp_type = f;
      if (a === "client_logged_out_init_impression") {
        b = m();
        n.string.login_uri = b;
      }
      c("QPLE2E").logPointDeprecated(c("qpl")._(195562276, "891"), a, d, {
        pointData: h,
        annotations: n,
      });
    };
    var j = function (a) {
        return a == null || a === "" || a === 0;
      },
      k = function () {
        if (n()) {
          var a = window.performance
            .getEntriesByType("paint")
            .filter(function (a) {
              return "first-paint" === a.name;
            });
          if (a.length <= 0) return null;
          a = a[0].startTime + a[0].duration;
          return a;
        }
        return null;
      },
      l = function () {
        if (n()) {
          var a = window.performance.getEntriesByType("navigation");
          return a.length <= 0 ? null : a[0].startTime;
        }
        return null;
      },
      m = function () {
        return (h || (h = c("URI")))
          .getRequestURI()
          .setQueryString("")
          .toString();
      },
      n = function () {
        return (
          window.performance &&
          typeof window.performance.getEntriesByType === "function"
        );
      };
    g.CLIENT_FUNNEL_VERSION = i;
    g.log = a;
  },
  98
);
__d(
  "XOauthDialogController",
  ["XController"],
  function (a, b, c, d, e, f) {
    e.exports = b("XController").create("/dialog/oauth/", {
      display: { type: "Enum", enumType: 1 },
      auth_type: { type: "String" },
      logger_id: { type: "String" },
      redirect_uri: { type: "String" },
      sso_device: { type: "Enum", enumType: 1 },
      sdk: { type: "String" },
      ref: { type: "String" },
      ret: { type: "String" },
      scope: { type: "StringVector" },
      app_id: { type: "Int" },
      auth_method: { type: "Enum", enumType: 1 },
      facebook_sdk_version: { type: "String" },
      calling_package_key: { type: "String" },
      context_uri: { type: "String" },
      default_audience: { type: "Enum", enumType: 1 },
      domain: { type: "String" },
      encoded_state: { type: "String" },
      fallback_redirect_uri: { type: "String" },
      force_confirmation: { type: "Bool", defaultValue: !1 },
      kid_directed_site: { type: "Bool", defaultValue: !1 },
      install_nonce: { type: "String" },
      legacy_override: { type: "String" },
      loyalty_program_id: { type: "Int" },
      shop_id: { type: "Int" },
      native_login_button: { type: "Bool", defaultValue: !1 },
      original_redirect_uri: { type: "String" },
      privacyx: { type: "String" },
      return_format: { type: "EnumVector", enumType: { member: 1 } },
      return_scopes: { type: "Bool", defaultValue: !1 },
      scope_objects: { type: "String" },
      scope_objects_count: { type: "String" },
      sdk_version: { type: "String" },
      seen_scopes: { type: "String" },
      sheet_name: { type: "String" },
      singular_selected_asset_id: { type: "Int" },
      state: { type: "String" },
      user_mobile_phone: { type: "String" },
      android_key: { type: "String" },
      sso: { type: "String" },
      sso_key: { type: "String" },
      nonce: { type: "String" },
      user_code: { type: "String" },
      auth_nonce: { type: "String" },
      fbs: { type: "Int" },
      fbapp_pres: { type: "Bool", defaultValue: !1 },
      is_comet_compat: { type: "Bool", defaultValue: !1 },
      response_type: { type: "String" },
      ignore_reentry: { type: "Bool", defaultValue: !1 },
      type: { type: "Enum", enumType: 1 },
      cbt: { type: "Int" },
      ies: { type: "Bool", defaultValue: !1 },
      cct_over_app_switch: { type: "Bool", defaultValue: !1 },
      cct_prefetching: { type: "Bool", defaultValue: !1 },
      messenger_page_id: { type: "Int" },
      reset_messenger_state: { type: "Bool", defaultValue: !1 },
      extras: { type: "String" },
      add_email_reauth_nonce: { type: "String" },
      tp: { type: "Enum", enumType: 1 },
      encrypted_query_string: { type: "String" },
      account_type: { type: "Enum", enumType: 0 },
      is_promote_auth: { type: "Bool", defaultValue: !1 },
      window_width: { type: "Int" },
      window_height: { type: "Int" },
      code_challenge: { type: "String" },
      code_challenge_method: { type: "Enum", enumType: 1 },
      config_id: { type: "String" },
      token_type: { type: "Enum", enumType: 1 },
      steps: { type: "EnumVector", enumType: { member: 1 } },
      dialog_source: { type: "String" },
      cui_gk: { type: "String" },
      gdp_cookie_result: { type: "String" },
      is_limited_login_shim: { type: "Bool", defaultValue: !1 },
      user_token_nonce: { type: "String" },
      loyalty_ad_id: { type: "String" },
      loyalty_referrer: { type: "Enum", enumType: 1 },
      privacy_mutation_token: { type: "String" },
    });
  },
  null
);
__d(
  "PlatformDialogCBTSetter",
  [
    "PlatformOAuthDialogLoginFunnelLogger",
    "URI",
    "XOauthDialogController",
    "uuidv4",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    function a(a, b, c, e) {
      if (a.value === "") {
        var f = Date.now();
        a.value = f.toString();
      }
      d("PlatformOAuthDialogLoginFunnelLogger").log(b, a.value, c, !0, e);
    }
    function b(a, b, e) {
      var f = new (h || (h = c("URI")))(a.action),
        g = f.getQueryData().next;
      if (!g) return;
      g = new h(g);
      var i = c("XOauthDialogController")
        .getURIBuilder()
        .getURI()
        .getPath()
        .toString();
      i.endsWith("/") && (i = i.substr(0, i.length - 1));
      if (!g.getPath().includes(i)) return;
      i = g.getQueryData().cbt;
      var j = g.getQueryData().logger_id;
      i ||
        ((i = Date.now()),
        g.addQueryData("cbt", i),
        f.addQueryData("next", g.toString()),
        (a.action = f.toString()));
      j ||
        ((j = c("uuidv4")()),
        g.addQueryData("logger_id", j),
        f.addQueryData("next", g.toString()),
        (a.action = f.toString()));
      d("PlatformOAuthDialogLoginFunnelLogger").log(b, i, j, !0, null, e);
    }
    g.setCBTInFieldAndLog = a;
    g.setCBTInFormAndLog = b;
  },
  98
);
