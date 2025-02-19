/*FB_PKG_DELIM*/

__d(
  "BanzaiAdapter",
  ["cr:5866"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:5866");
  },
  98
);
__d(
  "BanzaiConsts",
  [],
  function (a, b, c, d, e, f) {
    a = {
      SEND: "Banzai:SEND",
      OK: "Banzai:OK",
      ERROR: "Banzai:ERROR",
      SHUTDOWN: "Banzai:SHUTDOWN",
      BASIC: "basic",
      VITAL: "vital",
      BASIC_WAIT: 6e4,
      BASIC_WAIT_COMET: 2e3,
      VITAL_WAIT: 1e3,
      BATCH_SIZE_LIMIT: 64e3,
      EXPIRY: 864e5,
      BATCH_TIMEOUT: 1e4,
      LAST_STORAGE_FLUSH: "banzai:last_storage_flush",
      STORAGE_FLUSH_INTERVAL: 12 * 60 * 6e4,
      POST_READY: 0,
      POST_INFLIGHT: 1,
      POST_SENT: 2,
    };
    b = a;
    f["default"] = b;
  },
  66
);
__d(
  "BanzaiUtils",
  ["BanzaiConsts", "FBLogger", "cr:1172", "cr:9985", "cr:9986"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g,
      h = {
        canSend: function (a) {
          return a[2] >= b("cr:9985")() - (g || (g = b("BanzaiConsts"))).EXPIRY;
        },
        filterPost: function (a, c, d, e) {
          if (e.overlimit) return !0;
          if (
            !e.sendMinimumOnePost &&
            a[4] + e.currentSize >
              (g || (g = b("BanzaiConsts"))).BATCH_SIZE_LIMIT
          )
            return !0;
          var f = a.__meta;
          if (
            (f.status != null &&
              f.status >= (g || (g = b("BanzaiConsts"))).POST_SENT) ||
            !h.canSend(a)
          )
            return !1;
          if (
            f.status != null &&
            f.status >= (g || (g = b("BanzaiConsts"))).POST_INFLIGHT
          )
            return !0;
          var i = f.compress != null ? f.compress : !0,
            j =
              (f.webSessionId != null ? f.webSessionId : "null") +
              (f.userID != null ? f.userID : "null") +
              (f.appID != null ? f.appID : "null") +
              (i ? "compress" : ""),
            k = e.wadMap.get(j);
          k ||
            ((k = {
              app_id: f.appID,
              needs_compression: i,
              posts: [],
              user: f.userID,
              webSessionId: f.webSessionId,
            }),
            e.wadMap.set(j, k),
            c.push(k));
          f.status = (g || (g = b("BanzaiConsts"))).POST_INFLIGHT;
          Array.isArray(k.posts)
            ? k.posts.push(a)
            : b("FBLogger")("banzai").mustfix(
                "Posts were a string instead of array"
              );
          d.push(a);
          e.currentSize += a[4];
          e.currentSize >= (g || (g = b("BanzaiConsts"))).BATCH_SIZE_LIMIT &&
            (e.overlimit = !0);
          return e.keepRetryable && Boolean(f.retry);
        },
        resetPostStatus: function (a) {
          a.__meta.status = (g || (g = b("BanzaiConsts"))).POST_READY;
        },
        retryPost: function (a, c, d) {
          var e = a;
          e.__meta.status = (g || (g = b("BanzaiConsts"))).POST_READY;
          e[3] = (e[3] || 0) + 1;
          e.__meta.retry !== !0 && c >= 400 && c < 600 && d.push(a);
        },
        wrapData: function (a, c, d, e, f) {
          d = [
            a,
            c,
            d,
            0,
            (a = f) != null ? a : c ? JSON.stringify(c).length : 0,
          ];
          d.__meta = {
            appID: b("cr:9986").getAppID(),
            retry: e === !0,
            status: (g || (g = b("BanzaiConsts"))).POST_READY,
            userID: b("cr:9986").getPossiblyNonFacebookUserID(),
            webSessionId: b("cr:1172").getId(),
          };
          return d;
        },
      };
    e.exports = h;
  },
  null
);
__d(
  "CurrentUser",
  ["Cookie", "CurrentUserInitialData"],
  function (a, b, c, d, e, f) {
    var g,
      h = {
        getID: function () {
          return (g || (g = b("CurrentUserInitialData"))).USER_ID;
        },
        getAccountID: function () {
          return (g || (g = b("CurrentUserInitialData"))).ACCOUNT_ID;
        },
        getPossiblyNonFacebookUserID: function () {
          var a;
          return (a = (g || (g = b("CurrentUserInitialData")))
            .NON_FACEBOOK_USER_ID) != null
            ? a
            : this.getID();
        },
        getEIMU: function () {
          var a;
          return (a = (g || (g = b("CurrentUserInitialData"))).IG_USER_EIMU) !=
            null
            ? a
            : "0";
        },
        getEmployeeWorkUserID: function () {
          return (g || (g = b("CurrentUserInitialData"))).WORK_USER_ID;
        },
        getName: function () {
          return (g || (g = b("CurrentUserInitialData"))).NAME;
        },
        getShortName: function () {
          return (g || (g = b("CurrentUserInitialData"))).SHORT_NAME;
        },
        getEPOU: function () {
          var a;
          return (a = (g || (g = b("CurrentUserInitialData"))).EPOU_ID) != null
            ? a
            : "0";
        },
        getEOCPU: function () {
          var a;
          return (a = (g || (g = b("CurrentUserInitialData"))).EOCPU_ID) != null
            ? a
            : "0";
        },
        isLoggedIn: function () {
          return h.getPossiblyNonFacebookUserID() !== "0";
        },
        isLoggedInNow: function () {
          var a;
          if (!h.isLoggedIn()) return !1;
          if ((g || (g = b("CurrentUserInitialData"))).IS_INTERN_SITE)
            return !0;
          if (
            (g || (g = b("CurrentUserInitialData"))).IS_ABRA_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_ENTERPRISE_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_IMAGINE_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_INSTAGRAM_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_META_SPARK_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_OCULUS_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_TOGETHER_APP_USER ||
            (g || (g = b("CurrentUserInitialData")))
              .IS_WORK_MESSENGER_CALL_GUEST_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_WORK_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_WORKROOMS_USER ||
            (g || (g = b("CurrentUserInitialData"))).IS_ANONYMOUS_CASTING_USER
          )
            return !0;
          if (
            (g || (g = b("CurrentUserInitialData"))).ORIGINAL_USER_ID != null &&
            (g || (g = b("CurrentUserInitialData"))).ORIGINAL_USER_ID != ""
          )
            return (
              (g || (g = b("CurrentUserInitialData"))).ORIGINAL_USER_ID ===
              b("Cookie").get("c_user")
            );
          return (g || (g = b("CurrentUserInitialData"))).IS_BUSINESS_DOMAIN ===
            !0
            ? (g || (g = b("CurrentUserInitialData"))).USER_ID ==
                b("Cookie").get("c_user")
            : (g || (g = b("CurrentUserInitialData"))).USER_ID ===
                ((a = b("Cookie").get("i_user")) != null
                  ? a
                  : b("Cookie").get("c_user"));
        },
        isEmployee: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_EMPLOYEE;
        },
        isContingentWorker: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_CONTINGENT;
        },
        isTestUser: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_TEST_USER;
        },
        hasWorkUser: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).HAS_WORK_USER;
        },
        isWorkUser: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_WORK_USER;
        },
        isWorkroomsUser: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_WORKROOMS_USER;
        },
        isGray: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_GRAY;
        },
        isUnderage: function () {
          return !!(g || (g = b("CurrentUserInitialData"))).IS_UNDERAGE;
        },
        isMessengerOnlyUser: function () {
          return !!(g || (g = b("CurrentUserInitialData")))
            .IS_MESSENGER_ONLY_USER;
        },
        isDeactivatedAllowedOnMessenger: function () {
          return !!(g || (g = b("CurrentUserInitialData")))
            .IS_DEACTIVATED_ALLOWED_ON_MESSENGER;
        },
        isMessengerCallGuestUser: function () {
          return !!(g || (g = b("CurrentUserInitialData")))
            .IS_MESSENGER_CALL_GUEST_USER;
        },
        isBusinessPersonAccount: function () {
          return (g || (g = b("CurrentUserInitialData")))
            .IS_BUSINESS_PERSON_ACCOUNT;
        },
        hasSecondaryBusinessPerson: function () {
          return (g || (g = b("CurrentUserInitialData")))
            .HAS_SECONDARY_BUSINESS_PERSON;
        },
        getAppID: function () {
          return (g || (g = b("CurrentUserInitialData"))).APP_ID;
        },
        isFacebookWorkAccount: function () {
          return (g || (g = b("CurrentUserInitialData")))
            .IS_FACEBOOK_WORK_ACCOUNT;
        },
        isInstagramBusinessPerson: function () {
          return (g || (g = b("CurrentUserInitialData")))
            .IS_INSTAGRAM_BUSINESS_PERSON;
        },
        getPageMessagingMailboxId: function () {
          var a;
          return String(
            (a = (g || (g = b("CurrentUserInitialData")))
              .PAGE_MESSAGING_MAILBOX_ID) != null
              ? a
              : "0"
          );
        },
      };
    e.exports = h;
  },
  null
);
__d(
  "cancelIdleCallback",
  ["cr:7384"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:7384");
  },
  98
);
__d(
  "IdleCallbackImplementation",
  ["performanceNow", "requestAnimationFramePolyfill"],
  function (a, b, c, d, e, f, g) {
    var h,
      i = [],
      j = 0,
      k = 0,
      l = -1,
      m = !1,
      n = 1e3 / 60,
      o = 2;
    function p(a) {
      return a;
    }
    function q(a) {
      return a;
    }
    function b(b, c) {
      var d = k++;
      i[d] = b;
      s();
      if (c != null && c.timeout > 0) {
        var e = p(d);
        a.setTimeout(function () {
          return y(e);
        }, c.timeout);
      }
      return p(d);
    }
    function r(a) {
      a = q(a);
      i[a] = null;
    }
    function s() {
      m ||
        ((m = !0),
        c("requestAnimationFramePolyfill")(function (a) {
          (m = !1), u((h || (h = c("performanceNow")))() - a);
        }));
    }
    function t(a) {
      var b = n - o;
      if (a < b) return b - a;
      a = a % n;
      if (a > b || a < o) return 0;
      else return b - a;
    }
    function u(a) {
      var b = (h || (h = c("performanceNow")))();
      if (b > l) {
        a = t(a);
        if (a > 0) {
          b = b + a;
          x(b);
          l = b;
        }
      }
      v() && s();
    }
    function v() {
      return j < i.length;
    }
    function w() {
      while (v()) {
        var a = i[j];
        j++;
        if (a) return a;
      }
      return null;
    }
    function x(a) {
      var b;
      while ((h || (h = c("performanceNow")))() < a && (b = w())) b(new z(a));
    }
    function y(a) {
      var b = q(a);
      b = i[b];
      b && (r(a), b(new z(null)));
    }
    var z = (function () {
      function a(a) {
        (this.didTimeout = a == null), (this.$1 = a);
      }
      var b = a.prototype;
      b.timeRemaining = function () {
        var a = this.$1;
        if (a != null) {
          var b = (h || (h = c("performanceNow")))();
          if (b < a) return a - b;
        }
        return 0;
      };
      return a;
    })();
    g.requestIdleCallback = b;
    g.cancelIdleCallback = r;
  },
  98
);
__d(
  "requestIdleCallbackAcrossTransitions",
  ["IdleCallbackImplementation", "TimeSlice"],
  function (a, b, c, d, e, f, g) {
    var h =
      a.requestIdleCallback ||
      d("IdleCallbackImplementation").requestIdleCallback;
    function b(b, d) {
      b = c("TimeSlice").guard(b, "requestIdleCallback", {
        propagationType: c("TimeSlice").PropagationType.CONTINUATION,
        registerCallStack: !0,
      });
      return h.call(a, b, d);
    }
    g["default"] = b;
  },
  98
);
__d(
  "SetIdleTimeoutAcrossTransitions",
  [
    "NavigationMetrics",
    "cancelIdleCallback",
    "clearTimeout",
    "nullthrows",
    "requestIdleCallbackAcrossTransitions",
    "setTimeoutAcrossTransitions",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = !1,
      i = new Map();
    function b(a, b) {
      if (h) {
        var d = c("setTimeoutAcrossTransitions")(function () {
          var b = c("requestIdleCallbackAcrossTransitions")(function () {
            a(), i["delete"](b);
          });
          i.set(d, b);
        }, b);
        return d;
      } else return c("setTimeoutAcrossTransitions")(a, b);
    }
    function d(a) {
      c("clearTimeout")(a),
        i.has(a) &&
          (c("cancelIdleCallback")(c("nullthrows")(i.get(a))), i["delete"](a));
    }
    c("NavigationMetrics").addRetroactiveListener(
      c("NavigationMetrics").Events.EVENT_OCCURRED,
      function (b, c) {
        c.event === "all_pagelets_loaded" && (h = !!a.requestIdleCallback);
      }
    );
    g.start = b;
    g.clear = d;
  },
  98
);
__d(
  "BanzaiStorage",
  [
    "BanzaiConsts",
    "BanzaiUtils",
    "CurrentUser",
    "SetIdleTimeoutAcrossTransitions",
    "WebSession",
    "WebStorage",
    "WebStorageMutex",
    "cr:8958",
    "isInIframe",
    "performanceAbsoluteNow",
  ],
  function (a, b, c, d, e, f) {
    "use strict";
    var g,
      h,
      i,
      j = "bz:",
      k = b("isInIframe")(),
      l,
      m = !1,
      n = null;
    function o() {
      var a = "check_quota";
      try {
        var b = p();
        if (!b) return !1;
        b.setItem(a, a);
        b.removeItem(a);
        return !0;
      } catch (a) {
        return !1;
      }
    }
    function p() {
      m || ((m = !0), (l = (g || (g = b("WebStorage"))).getLocalStorage()));
      return l;
    }
    a = {
      flush: function (a) {
        if (k) return;
        var c = p();
        if (c) {
          n == null &&
            (n = parseInt(
              c.getItem((h || (h = b("BanzaiConsts"))).LAST_STORAGE_FLUSH),
              10
            ));
          var d =
            n &&
            (i || (i = b("performanceAbsoluteNow")))() - n >=
              (h || (h = b("BanzaiConsts"))).STORAGE_FLUSH_INTERVAL;
          d && a();
          (d || !n) &&
            ((n = (i || (i = b("performanceAbsoluteNow")))()),
            (g || (g = b("WebStorage"))).setItemGuarded(
              c,
              (h || (h = b("BanzaiConsts"))).LAST_STORAGE_FLUSH,
              n.toString()
            ));
        }
      },
      restore: function (a) {
        if (k) return;
        var c = p();
        if (!c) return;
        var d = function (d) {
          var e = [];
          for (var f = 0; f < c.length; f++) {
            var g = c.key(f);
            typeof g === "string" &&
              g.indexOf(j) === 0 &&
              g.indexOf("bz:__") !== 0 &&
              e.push(g);
          }
          e.forEach(function (d) {
            var e = c.getItem(d);
            c.removeItem(d);
            if (e == null || e === "") return;
            d = b("cr:8958").parse(e);
            d.forEach(function (c) {
              if (!c) return;
              var d = (c.__meta = c.pop()),
                e = b("BanzaiUtils").canSend(c);
              if (!e) return;
              e = b("CurrentUser").getPossiblyNonFacebookUserID();
              (d.userID === e || e === "0") &&
                (b("BanzaiUtils").resetPostStatus(c), a(c));
            });
          });
          d && d.unlock();
        };
        o()
          ? new (b("WebStorageMutex"))("banzai").lock(d)
          : b("SetIdleTimeoutAcrossTransitions").start(d, 0);
      },
      store: function (a) {
        if (k) return;
        var c = p(),
          d = a.filter(function (a) {
            return a.__meta.status !== (h || (h = b("BanzaiConsts"))).POST_SENT;
          });
        if (!c || d.length <= 0) return;
        d = d.map(function (a) {
          return [a[0], a[1], a[2], a[3] || 0, a[4], a.__meta];
        });
        a.splice(0, a.length);
        (g || (g = b("WebStorage"))).setItemGuarded(
          c,
          j +
            b("WebSession").getId() +
            "." +
            (i || (i = b("performanceAbsoluteNow")))(),
          b("cr:8958").stringify(d)
        );
      },
    };
    e.exports = a;
  },
  null
);
__d(
  "QueryString",
  [],
  function (a, b, c, d, e, f) {
    function g(a) {
      var b = [];
      Object.keys(a)
        .sort()
        .forEach(function (c) {
          var d = a[c];
          if (d === void 0) return;
          if (d === null) {
            b.push(c);
            return;
          }
          b.push(encodeURIComponent(c) + "=" + encodeURIComponent(String(d)));
        });
      return b.join("&");
    }
    function a(a, b) {
      b === void 0 && (b = !1);
      var c = {};
      if (a === "") return c;
      a = a.split("&");
      for (var d = 0; d < a.length; d++) {
        var e = a[d].split("=", 2),
          f = decodeURIComponent(e[0]);
        if (b && Object.prototype.hasOwnProperty.call(c, f))
          throw new URIError("Duplicate key: " + f);
        c[f] = e.length === 2 ? decodeURIComponent(e[1]) : null;
      }
      return c;
    }
    function b(a, b) {
      return (
        a +
        (a.indexOf("?") !== -1 ? "&" : "?") +
        (typeof b === "string" ? b : g(b))
      );
    }
    c = { encode: g, decode: a, appendToUrl: b };
    f["default"] = c;
  },
  66
);
__d(
  "BanzaiAdapterWWW",
  [
    "invariant",
    "Arbiter",
    "BanzaiConfig",
    "BanzaiConsts",
    "BanzaiStorage",
    "QueryString",
    "Run",
    "StaticSiteData",
    "TimeSlice",
    "URI",
    "UserAgent",
    "ZeroRewrites",
    "getAsyncHeaders",
    "getAsyncParams",
    "justknobx",
    "once",
  ],
  function (a, b, c, d, e, f, g, h) {
    var i,
      j,
      k = [],
      l = new (c("Arbiter"))(),
      m = "/ajax/bz",
      n = "POST",
      o = {
        config: c("BanzaiConfig"),
        useBeacon: !0,
        getEndPointUrl: function (a) {
          a = c("getAsyncParams")(n);
          delete a[c("StaticSiteData").csr_key];
          a = c("QueryString").appendToUrl(m, a);
          a.length <= 2e3 || h(0, 21850, a);
          return a;
        },
        getStorage: function () {
          return c("BanzaiStorage");
        },
        inform: function (a) {
          l.inform(a);
        },
        subscribe: function (a, b) {
          return l.subscribe(a, b);
        },
        wrapInTimeSlice: function (a, b) {
          return c("TimeSlice").guard(
            function () {
              a();
            },
            b,
            { propagationType: c("TimeSlice").PropagationType.ORPHAN }
          );
        },
        cleanup: function () {
          var a = k;
          k = [];
          a.forEach(function (a) {
            a.readyState < 4 && a.abort();
          });
        },
        preferredCompressionMethod: c("once")(function () {
          return "snappy_base64";
        }),
        readyToSend: function () {
          return c("UserAgent").isBrowser("IE <= 8") || navigator.onLine;
        },
        send: function (a, b, e, f) {
          var g = o.getEndPointUrl(!1);
          g = d("ZeroRewrites").rewriteURI(new (i || (i = c("URI")))(g));
          var h = d("ZeroRewrites").getTransportBuilderForURI(g)();
          h.open(n, g.toString(), !0);
          c("justknobx")._("2233") &&
            Object.entries(c("getAsyncHeaders")(g)).forEach(function (a) {
              var b = a[0];
              a = a[1];
              h.setRequestHeader(b, a);
            });
          h.onreadystatechange = function () {
            if (h.readyState >= 4) {
              var a = k.indexOf(h);
              a >= 0 && k.splice(a, 1);
              try {
                a = h.status;
              } catch (b) {
                a = 0;
              }
              a == 200
                ? (b && b(), f || o.inform((j || (j = c("BanzaiConsts"))).OK))
                : (e && e(a),
                  f || o.inform((j || (j = c("BanzaiConsts"))).ERROR));
            }
          };
          k.push(h);
          h.send(a, !1);
        },
        setHooks: function (a) {},
        setUnloadHook: function (a) {
          d("Run").onAfterUnload(a._unload);
        },
        onUnload: function (a) {
          d("Run").onAfterUnload(a);
        },
        isOkToSendViaBeacon: function () {
          return !0;
        },
      };
    a = o;
    g["default"] = a;
  },
  98
);
/**
 * License: https://www.facebook.com/legal/license/WRsJ32R7YJG/
 */
__d(
  "SnappyCompress",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function g() {
      return typeof process === "object" &&
        typeof process.versions === "object" &&
        typeof process.versions.node !== "undefined"
        ? !0
        : !1;
    }
    function h(a) {
      return a instanceof Uint8Array && (!g() || !Buffer.isBuffer(a));
    }
    function i(a) {
      return a instanceof ArrayBuffer;
    }
    function j(a) {
      return !g() ? !1 : Buffer.isBuffer(a);
    }
    var k =
      "Argument compressed must be type of ArrayBuffer, Buffer, or Uint8Array";
    function a(a) {
      if (!h(a) && !i(a) && !j(a)) throw new TypeError(k);
      var b = !1,
        c = !1;
      h(a) ? (b = !0) : i(a) && ((c = !0), (a = new Uint8Array(a)));
      a = new A(a);
      var d = a.readUncompressedLength();
      if (d === -1) throw new Error("Invalid Snappy bitstream");
      if (b) {
        b = new Uint8Array(d);
        if (!a.uncompressToBuffer(b))
          throw new Error("Invalid Snappy bitstream");
      } else if (c) {
        b = new ArrayBuffer(d);
        c = new Uint8Array(b);
        if (!a.uncompressToBuffer(c))
          throw new Error("Invalid Snappy bitstream");
      } else {
        b = Buffer.alloc(d);
        if (!a.uncompressToBuffer(b))
          throw new Error("Invalid Snappy bitstream");
      }
      return b;
    }
    function b(a) {
      if (!h(a) && !i(a) && !j(a)) throw new TypeError(k);
      var b = !1,
        c = !1;
      h(a) ? (b = !0) : i(a) && ((c = !0), (a = new Uint8Array(a)));
      a = new x(a);
      var d = a.maxCompressedLength(),
        e,
        f,
        g;
      b
        ? ((e = new Uint8Array(d)), (g = a.compressToBuffer(e)))
        : c
        ? ((e = new ArrayBuffer(d)),
          (f = new Uint8Array(e)),
          (g = a.compressToBuffer(f)))
        : ((e = Buffer.alloc(d)), (g = a.compressToBuffer(e)));
      if (!e.slice) {
        f = new Uint8Array(Array.prototype.slice.call(e, 0, g));
        if (b) return f;
        else if (c) return f.buffer;
        else throw new Error("not implemented");
      }
      return e.slice(0, g);
    }
    c = 16;
    var l = 1 << c,
      m = 14,
      n = new Array(m + 1);
    function o(a, b) {
      return (a * 506832829) >>> b;
    }
    function p(a, b) {
      return a[b] + (a[b + 1] << 8) + (a[b + 2] << 16) + (a[b + 3] << 24);
    }
    function q(a, b, c) {
      return (
        a[b] === a[c] &&
        a[b + 1] === a[c + 1] &&
        a[b + 2] === a[c + 2] &&
        a[b + 3] === a[c + 3]
      );
    }
    function r(a, b, c, d, e) {
      var f;
      for (f = 0; f < e; f++) c[d + f] = a[b + f];
    }
    function s(a, b, c, d, e) {
      c <= 60
        ? ((d[e] = (c - 1) << 2), (e += 1))
        : c < 256
        ? ((d[e] = 60 << 2), (d[e + 1] = c - 1), (e += 2))
        : ((d[e] = 61 << 2),
          (d[e + 1] = (c - 1) & 255),
          (d[e + 2] = (c - 1) >>> 8),
          (e += 3));
      r(a, b, d, e, c);
      return e + c;
    }
    function t(a, b, c, d) {
      if (d < 12 && c < 2048) {
        a[b] = 1 + ((d - 4) << 2) + ((c >>> 8) << 5);
        a[b + 1] = c & 255;
        return b + 2;
      } else {
        a[b] = 2 + ((d - 1) << 2);
        a[b + 1] = c & 255;
        a[b + 2] = c >>> 8;
        return b + 3;
      }
    }
    function u(a, b, c, d) {
      while (d >= 68) (b = t(a, b, c, 64)), (d -= 64);
      d > 64 && ((b = t(a, b, c, 60)), (d -= 60));
      return t(a, b, c, d);
    }
    function v(a, b, c, d, e) {
      var f = 1;
      while (1 << f <= c && f <= m) f += 1;
      f -= 1;
      var g = 32 - f;
      typeof n[f] === "undefined" && (n[f] = new Uint16Array(1 << f));
      f = n[f];
      var h;
      for (h = 0; h < f.length; h++) f[h] = 0;
      h = b + c;
      var i = b,
        j = b,
        k,
        l,
        r,
        t,
        v,
        w = !0,
        x = 15;
      if (c >= x) {
        c = h - x;
        b += 1;
        x = o(p(a, b), g);
        while (w) {
          t = 32;
          l = b;
          do {
            b = l;
            k = x;
            v = t >>> 5;
            t += 1;
            l = b + v;
            if (b > c) {
              w = !1;
              break;
            }
            x = o(p(a, l), g);
            r = i + f[k];
            f[k] = b - i;
          } while (!q(a, b, r));
          if (!w) break;
          e = s(a, j, b - j, d, e);
          do {
            v = b;
            k = 4;
            while (b + k < h && a[b + k] === a[r + k]) k += 1;
            b += k;
            l = v - r;
            e = u(d, e, l, k);
            j = b;
            if (b >= c) {
              w = !1;
              break;
            }
            t = o(p(a, b - 1), g);
            f[t] = b - 1 - i;
            v = o(p(a, b), g);
            r = i + f[v];
            f[v] = b - i;
          } while (q(a, b, r));
          if (!w) break;
          b += 1;
          x = o(p(a, b), g);
        }
      }
      j < h && (e = s(a, j, h - j, d, e));
      return e;
    }
    function w(a, b, c) {
      do (b[c] = a & 127), (a = a >>> 7), a > 0 && (b[c] += 128), (c += 1);
      while (a > 0);
      return c;
    }
    function x(a) {
      this.array = a;
    }
    x.prototype.maxCompressedLength = function () {
      var a = this.array.length;
      return 32 + a + Math.floor(a / 6);
    };
    x.prototype.compressToBuffer = function (a) {
      var b = this.array,
        c = b.length,
        d = 0,
        e = 0,
        f;
      e = w(c, a, e);
      while (d < c) (f = Math.min(c - d, l)), (e = v(b, d, f, a, e)), (d += f);
      return e;
    };
    var y = [0, 255, 65535, 16777215, 4294967295];
    function r(a, b, c, d, e) {
      var f;
      for (f = 0; f < e; f++) c[d + f] = a[b + f];
    }
    function z(a, b, c, d) {
      var e;
      for (e = 0; e < d; e++) a[b + e] = a[b - c + e];
    }
    function A(a) {
      (this.array = a), (this.pos = 0);
    }
    A.prototype.readUncompressedLength = function () {
      var a = 0,
        b = 0,
        c,
        d;
      while (b < 32 && this.pos < this.array.length) {
        c = this.array[this.pos];
        this.pos += 1;
        d = c & 127;
        if ((d << b) >>> b !== d) return -1;
        a |= d << b;
        if (c < 128) return a;
        b += 7;
      }
      return -1;
    };
    A.prototype.uncompressToBuffer = function (a) {
      var b = this.array,
        c = b.length,
        d = this.pos,
        e = 0,
        f,
        g,
        h,
        i;
      while (d < b.length) {
        f = b[d];
        d += 1;
        if ((f & 3) === 0) {
          g = (f >>> 2) + 1;
          if (g > 60) {
            if (d + 3 >= c) return !1;
            h = g - 60;
            g = b[d] + (b[d + 1] << 8) + (b[d + 2] << 16) + (b[d + 3] << 24);
            g = (g & y[h]) + 1;
            d += h;
          }
          if (d + g > c) return !1;
          r(b, d, a, e, g);
          d += g;
          e += g;
        } else {
          switch (f & 3) {
            case 1:
              g = ((f >>> 2) & 7) + 4;
              i = b[d] + ((f >>> 5) << 8);
              d += 1;
              break;
            case 2:
              if (d + 1 >= c) return !1;
              g = (f >>> 2) + 1;
              i = b[d] + (b[d + 1] << 8);
              d += 2;
              break;
            case 3:
              if (d + 3 >= c) return !1;
              g = (f >>> 2) + 1;
              i = b[d] + (b[d + 1] << 8) + (b[d + 2] << 16) + (b[d + 3] << 24);
              d += 4;
              break;
            default:
              break;
          }
          if (i === 0 || i > e) return !1;
          z(a, e, i, g);
          e += g;
        }
      }
      return !0;
    };
    e.exports.uncompress = a;
    e.exports.compress = b;
  },
  null
);
__d(
  "SnappyCompressUtil",
  ["SnappyCompress"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = a.Uint8Array,
      h = a.btoa,
      i = a.TextEncoder,
      j = {
        compressUint8ArrayToSnappy: function (a) {
          if (a == null || h == null) return null;
          var c = null;
          try {
            c = b("SnappyCompress").compress(a);
          } catch (a) {
            return null;
          }
          a = "";
          for (var d = 0; d < c.length; d++) a += String.fromCharCode(c[d]);
          return h(a);
        },
        compressStringToSnappy: function (b) {
          if (g == null || h == null) return null;
          var c = new a.Uint8Array(b.length);
          for (var d = 0; d < b.length; d++) {
            var e = b.charCodeAt(d);
            if (e > 127) return null;
            c[d] = e;
          }
          return j.compressUint8ArrayToSnappy(c);
        },
        compressStringToSnappyBinary: function (a) {
          if (g == null) return null;
          var c = null;
          if (i != null) c = new i().encode(a);
          else {
            c = new g(a.length);
            for (var d = 0; d < a.length; d++) {
              var e = a.charCodeAt(d);
              if (e > 127) return null;
              c[d] = e;
            }
          }
          e = null;
          try {
            e = b("SnappyCompress").compress(c);
          } catch (a) {
            return null;
          }
          return e;
        },
      };
    e.exports = j;
  },
  null
);
__d(
  "BanzaiCompressionUtils",
  ["FBLogger", "Promise", "SnappyCompressUtil", "once", "performanceNow"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g,
      h,
      i = b("once")(function () {
        if (a.CompressionStream == null) return !1;
        if (a.Response == null) return !1;
        try {
          new a.CompressionStream("deflate");
        } catch (a) {
          return !1;
        }
        return !0;
      }),
      j = {
        compressWad: function (a, c) {
          if (a.needs_compression !== !0) {
            delete a.needs_compression;
            return;
          }
          if (c === "deflate") {
            j.compressWad(a, "snappy");
            return;
          }
          var d = (g || (g = b("performanceNow")))(),
            e = JSON.stringify(a.posts),
            f;
          switch (c) {
            case "snappy":
              f = b("SnappyCompressUtil").compressStringToSnappyBinary(e);
              break;
            case "snappy_base64":
              f = b("SnappyCompressUtil").compressStringToSnappy(e);
              break;
            default:
              break;
          }
          f != null && f.length < e.length
            ? ((a.posts = f),
              (a.compression = c),
              (a.snappy_ms = Math.ceil((g || (g = b("performanceNow")))() - d)),
              a.snappy_ms < 0 &&
                b("FBLogger")("BanzaiCompressionUtils").warn(
                  "Expected positive snappy_ms but got %s",
                  a.snappy_ms
                ))
            : (a.compression = "");
          delete a.needs_compression;
        },
        compressWadAsync: function (c, d) {
          if (d !== "deflate") {
            j.compressWad(c, "snappy");
            return (h || (h = b("Promise"))).resolve();
          }
          if (!i()) return j.compressWadAsync(c, "snappy");
          var e = (g || (g = b("performanceNow")))(),
            f = JSON.stringify(c.posts),
            k = new Response(f).body;
          if (!k) {
            c.compression = "";
            delete c.needs_compression;
            return (h || (h = b("Promise"))).resolve();
          }
          k = k.pipeThrough(new a.CompressionStream("deflate"));
          return new Response(k)
            .arrayBuffer()
            .then(function (a) {
              a.byteLength < f.length
                ? ((c.posts = new Uint8Array(a)),
                  (c.compression = d),
                  (c.snappy_ms = Math.ceil(
                    (g || (g = b("performanceNow")))() - e
                  )),
                  c.snappy_ms < 0 &&
                    b("FBLogger")("BanzaiCompressionUtils").warn(
                      "Expected positive snappy_ms but got %s",
                      c.snappy_ms
                    ))
                : (c.compression = ""),
                delete c.needs_compression;
            })
            ["catch"](function () {
              (c.compression = ""), delete c.needs_compression;
            });
        },
        outOfBandsPosts: function (a) {
          var b = 0,
            c = {};
          for (var d = 0; d < a.length; d++) {
            var e = a[d],
              f = e.compression === "snappy" || e.compression === "deflate";
            if (f) {
              f = new Blob([e.posts], { type: "application/octet-stream" });
              e.posts = String(b);
              c["post_" + String(b)] = f;
              b++;
            }
          }
          return c;
        },
      };
    e.exports = j;
  },
  null
);
__d(
  "BanzaiBase",
  [
    "BanzaiCompressionUtils",
    "BanzaiConsts",
    "BanzaiLazyQueue",
    "BanzaiUtils",
    "ErrorGuard",
    "ExecutionEnvironment",
    "FBLogger",
    "cr:1172",
    "cr:2037",
    "cr:3724",
    "cr:9985",
    "cr:9986",
    "cr:9987",
    "cr:9988",
  ],
  function (a, b, c, d, e, f) {
    var g,
      h,
      i,
      j,
      k,
      l = [],
      m = null,
      n = {
        _clearPostBuffer: function () {
          l = [];
        },
        _flushLazyQueue: function () {
          b("BanzaiLazyQueue")
            .flushQueue()
            .forEach(function (a) {
              return n.post.apply(n, a);
            });
        },
        _gatherWadsAndPostsFromBuffer: function (a, c, d, e, f) {
          var g = {
            currentSize: 0,
            keepRetryable: d,
            overlimit: !1,
            sendMinimumOnePost: f,
            wadMap: new Map(),
          };
          d = e.filter(function (d, e) {
            return b("BanzaiUtils").filterPost(d, a, c, g);
          });
          g.overlimit && d.length && n._schedule(0);
          return d;
        },
        _getEventTime: function () {
          return b("cr:9985")();
        },
        _getWebSessionId: function () {
          return b("cr:1172").getId();
        },
        _getPostBuffer: function () {
          return l;
        },
        _getUserId: function () {
          return b("cr:9986").getPossiblyNonFacebookUserID();
        },
        _getAppId: function () {
          return b("cr:9986").getAppID();
        },
        _initialize: function () {
          (g || (g = b("ExecutionEnvironment"))).canUseDOM &&
            (n.adapter.useBeacon && b("cr:9988").isSupported()
              ? (b("cr:9988").addListener(b("cr:9988").HIDDEN, function () {
                  n._getPostBuffer().length > 0 &&
                    (n._tryToSendViaBeacon() || n._store());
                }),
                n.isEnabled("enable_client_logging_clear_on_visible") &&
                  b("cr:9988").addListener(b("cr:9988").VISIBLE, function () {
                    n._tryToSendViaBeacon() || n._restore();
                  }))
              : n.adapter.setHooks(n),
            n.adapter.setUnloadHook(n),
            b("cr:9987").addListener(
              b("cr:9987").Events.NAVIGATION_DONE,
              function (a, c) {
                if (c.pageType !== "normal") return;
                n._restore();
                b("cr:9987").removeCurrentListener();
              }
            ));
        },
        _sendBeacon: function (b, c) {
          return a.navigator.sendBeacon(b, c);
        },
        _prepForTransit: function (a) {
          var c = new FormData();
          c.append("ts", String(Date.now()));
          var d = b("BanzaiCompressionUtils").outOfBandsPosts(a);
          Object.keys(d).forEach(function (a) {
            c.append(a, d[a]);
          });
          c.append("q", JSON.stringify(a));
          return c;
        },
        _prepWadForTransit: function (a) {
          b("BanzaiCompressionUtils").compressWad(
            a,
            b("cr:2037").preferredCompressionMethod()
          );
        },
        _processCallbacksAndSendViaBeacon: function () {
          var a = [],
            c = [],
            d = [];
          n._gatherWadsAndPostsFromBuffer(c, d, !0, a, !1);
          if (c.length > 0) {
            c[0].send_method = "beacon";
            c.map(n._prepWadForTransit);
            d = n._prepForTransit(c);
            a = b("cr:2037").getEndPointUrl(!0);
            c = n._sendBeacon(a, d);
            c || b("FBLogger")("banzai").warn("Error sending beacon");
          }
        },
        _restore: function () {
          var a = b("cr:2037").getStorage(),
            c = function (a) {
              l.push(a);
            };
          (h || (h = b("ErrorGuard"))).applyWithGuard(a.restore, a, [c]);
          n._schedule(
            b("cr:2037").config.RESTORE_WAIT ||
              (i || (i = b("BanzaiConsts"))).VITAL_WAIT
          );
        },
        _schedule: function (a) {
          var c = n._getEventTime() + a;
          if (!k || c < k) {
            k = c;
            b("cr:3724").clear(j);
            j = b("cr:3724").start(
              b("cr:2037").wrapInTimeSlice(n._sendWithCallbacks, "Banzai.send"),
              a
            );
            return !0;
          }
          return !1;
        },
        _sendWithCallbacks: function (a, c) {
          k = null;
          n._schedule(n.BASIC.delay);
          if (!b("cr:2037").readyToSend()) {
            c && c();
            return;
          }
          if (n.isEnabled("flush_storage_periodically")) {
            var d = b("cr:2037").getStorage(),
              e = function () {
                n._restore();
              };
            (h || (h = b("ErrorGuard"))).applyWithGuard(d.flush, d, [e]);
          }
          b("cr:2037").inform((i || (i = b("BanzaiConsts"))).SEND);
          d = [];
          var f = [];
          l = n._gatherWadsAndPostsFromBuffer(d, f, !0, l, !0);
          if (d.length <= 0) {
            b("cr:2037").inform((i || (i = b("BanzaiConsts"))).OK);
            a && a();
            return;
          }
          d[0].trigger = m;
          m = null;
          d[0].send_method = "ajax";
          d.map(n._prepWadForTransit);
          b("cr:2037").send(
            n._prepForTransit(d),
            function () {
              f.forEach(function (a) {
                a = a;
                a.__meta.status = (i || (i = b("BanzaiConsts"))).POST_SENT;
                a.__meta.callback && a.__meta.callback();
              }),
                a && a();
            },
            function (a) {
              f.forEach(function (c) {
                b("BanzaiUtils").retryPost(c, a, l);
              }),
                c && c();
            }
          );
        },
        _store: function () {
          var a = b("cr:2037").getStorage();
          (h || (h = b("ErrorGuard"))).applyWithGuard(a.store, a, [l]);
        },
        _testState: function () {
          return { postBuffer: l, triggerRoute: m };
        },
        _tryToSendViaBeacon: function () {
          if (
            !(
              navigator &&
              navigator.sendBeacon &&
              b("cr:2037").isOkToSendViaBeacon()
            )
          )
            return !1;
          var a = [],
            c = [];
          l = n._gatherWadsAndPostsFromBuffer(a, c, !1, l, !1);
          if (a.length <= 0) return !1;
          a[0].send_method = "beacon";
          a.map(n._prepWadForTransit);
          a = n._prepForTransit(a);
          var d = b("cr:2037").getEndPointUrl(!0);
          d = n._sendBeacon(d, a);
          if (!d) {
            c.forEach(function (a) {
              l.push(a);
            });
            return !1;
          }
          return !0;
        },
        _unload: function () {
          if (b("cr:2037").config.disabled) return;
          n._flushLazyQueue();
          navigator &&
            navigator.sendBeacon &&
            b("cr:2037").isOkToSendViaBeacon() &&
            n._processCallbacksAndSendViaBeacon();
          b("cr:2037").cleanup();
          b("cr:2037").inform((i || (i = b("BanzaiConsts"))).SHUTDOWN);
          l.length > 0 &&
            (!n.adapter.useBeacon || !n._tryToSendViaBeacon()) &&
            n._store();
        },
        BASIC: {
          delay:
            b("cr:2037").config.MAX_WAIT ||
            (i || (i = b("BanzaiConsts"))).BASIC_WAIT,
        },
        BASIC_WAIT: (i || (i = b("BanzaiConsts"))).BASIC_WAIT,
        ERROR: i.ERROR,
        OK: i.OK,
        SEND: i.SEND,
        SHUTDOWN: i.SHUTDOWN,
        VITAL: {
          delay:
            b("cr:2037").config.MIN_WAIT ||
            (i || (i = b("BanzaiConsts"))).VITAL_WAIT,
        },
        VITAL_WAIT: i.VITAL_WAIT,
        adapter: b("cr:2037"),
        canUseNavigatorBeacon: function () {
          return Boolean(
            navigator &&
              navigator.sendBeacon &&
              b("cr:2037").isOkToSendViaBeacon()
          );
        },
        flush: function (a, c) {
          b("cr:3724").clear(j), n._sendWithCallbacks(a, c);
        },
        isEnabled: function (a) {
          return Boolean(
            b("cr:2037").config.gks &&
              b("cr:2037").config.gks[a] &&
              !b("cr:2037").config.disabled
          );
        },
        post: function (a, c, d) {
          a ||
            b("FBLogger")("banzai").mustfix(
              "Banzai.post called without specifying a route"
            );
          n._flushLazyQueue();
          var e = a.split(":");
          if ((b("cr:2037").config.known_routes || []).indexOf(e[0]) === -1) {
            b("cr:2037").config.should_log_unknown_routes === !0 &&
              b("FBLogger")("banzai")
                .blameToPreviousFrame()
                .mustfix(
                  "Attempted to post to invalid Banzai route '" +
                    a +
                    "'. This call site should be cleaned up."
                );
            if (b("cr:2037").config.should_drop_unknown_routes === !0) return;
          }
          e = "";
          try {
            var f;
            e = (f = JSON.stringify(c)) != null ? f : "";
          } catch (c) {
            b("FBLogger")("banzai")
              .catching(c)
              .addToCategoryKey(a)
              .mustfix("Could not JSON.stringify banzai data for route %s", a);
            return;
          }
          f = d == null ? void 0 : d.retry;
          if (b("cr:2037").config.disabled) return;
          if (
            !(g || (g = b("ExecutionEnvironment"))).canUseDOM &&
            !(g || (g = b("ExecutionEnvironment"))).isInWorker
          )
            return;
          var h = b("cr:2037").config.blacklist;
          if (
            h &&
            h.indexOf &&
            typeof h.indexOf == "function" &&
            h.indexOf(a) != -1
          )
            return;
          h = e.length;
          var j = b("BanzaiUtils").wrapData(a, c, n._getEventTime(), f, h),
            k = j;
          (d == null ? void 0 : d.callback) &&
            (k.__meta.callback = d == null ? void 0 : d.callback);
          (d == null ? void 0 : d.compress) != null &&
            (k.__meta.compress = d == null ? void 0 : d.compress);
          e = d == null ? void 0 : d.delay;
          e == null && (e = (i || (i = b("BanzaiConsts"))).BASIC_WAIT);
          if (d == null ? void 0 : d.signal) {
            k.__meta.status = (i || (i = b("BanzaiConsts"))).POST_INFLIGHT;
            c = [
              {
                user: n._getUserId(),
                webSessionId: n._getWebSessionId(),
                app_id: n._getAppId(),
                posts: [j],
                trigger: a,
              },
            ];
            b("cr:2037").send(
              n._prepForTransit(c),
              function () {
                (k.__meta.status = (i || (i = b("BanzaiConsts"))).POST_SENT),
                  k.__meta.callback && k.__meta.callback();
              },
              function (a) {
                b("BanzaiUtils").retryPost(j, a, l);
              },
              !0
            );
            if (!f) return;
          }
          l.push(j);
          (n._schedule(e) || !m) && (m = a);
        },
        subscribe: b("cr:2037").subscribe,
      };
    n._initialize();
    e.exports = n;
  },
  null
);
__d(
  "BanzaiWWW",
  ["cr:1642797"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:1642797");
  },
  98
);
__d(
  "getOrCreateDOMID",
  ["uniqueID"],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      a.id || (a.id = c("uniqueID")());
      return a.id;
    }
    g["default"] = a;
  },
  98
);
__d(
  "FocusEvent",
  ["Event", "Run", "ge", "getOrCreateDOMID"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = {},
      i = !1;
    function j(a, b) {
      if (h[a]) {
        b = h[a].indexOf(b);
        b >= 0 && h[a].splice(b, 1);
        h[a].length === 0 && delete h[a];
      }
    }
    function k(a) {
      var b = a.getTarget();
      if (h[b.id] && h[b.id].length > 0) {
        var c = a.type === "focusin" || a.type === "focus";
        h[b.id].forEach(function (a) {
          a(c);
        });
      }
    }
    function l() {
      if (i) return;
      c("Event").listen(document.documentElement, "focusout", k);
      c("Event").listen(document.documentElement, "focusin", k);
      i = !0;
    }
    function a(a, b, e) {
      e === void 0 && (e = { cleanupOnLeave: !0 });
      l();
      var f = c("getOrCreateDOMID")(a);
      h[f] || (h[f] = []);
      h[f].push(b);
      var g = !1;
      function i() {
        g || (j(f, b), k && (k.remove(), (k = null)), (g = !0));
      }
      var k =
        ((a = e) == null ? void 0 : a.cleanupOnLeave) === !0
          ? d("Run").onLeave(function () {
              c("ge")(f) || i();
            })
          : null;
      return {
        remove: function () {
          i();
        },
      };
    }
    g.listen = a;
  },
  98
);
__d(
  "KeyStatus",
  ["Event", "ExecutionEnvironment"],
  function (a, b, c, d, e, f, g) {
    var h,
      i = null,
      j = null;
    function k() {
      j ||
        (j = c("Event").listen(window, "blur", function () {
          (i = null), l();
        }));
    }
    function l() {
      j && (j.remove(), (j = null));
    }
    function a(a) {
      (i = c("Event").getKeyCode(a)), k();
    }
    function b() {
      (i = null), l();
    }
    if ((h || c("ExecutionEnvironment")).canUseDOM) {
      f = document.documentElement;
      if (f)
        if (f.addEventListener)
          f.addEventListener("keydown", a, !0),
            f.addEventListener("keyup", b, !0);
        else if (f.attachEvent) {
          f = f.attachEvent;
          f("onkeydown", a);
          f("onkeyup", b);
        }
    }
    function d() {
      return !!i;
    }
    function e() {
      return i;
    }
    g.isKeyDown = d;
    g.getKeyDownCode = e;
  },
  98
);
__d(
  "getElementText",
  ["isElementNode", "isTextNode"],
  function (a, b, c, d, e, f, g) {
    var h = null;
    function a(a) {
      if (c("isTextNode")(a)) return a.data;
      else if (c("isElementNode")(a)) {
        if (h === null) {
          var b = document.createElement("div");
          h = b.textContent != null ? "textContent" : "innerText";
        }
        return a[h];
      } else return "";
    }
    g["default"] = a;
  },
  98
);
__d(
  "tooltipPropsFor",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a, b, c) {
      if (!a) return {};
      a = { "data-tooltip-content": a, "data-hover": "tooltip" };
      b && (a["data-tooltip-position"] = b);
      c && (a["data-tooltip-alignh"] = c);
      return a;
    }
    f["default"] = a;
  },
  66
);
__d(
  "TooltipData",
  [
    "DOM",
    "DataStore",
    "FBLogger",
    "URI",
    "getElementText",
    "ifRequired",
    "isStringNullOrEmpty",
    "isTextNode",
    "tooltipPropsFor",
  ],
  function (a, b, c, d, e, f, g) {
    var h;
    function i(a) {
      var b,
        d = a.getAttribute("data-tooltip-delay");
      d = d ? parseInt(d, 10) || 1e3 : 250;
      b = (b = c("DataStore").get(a, "tooltip")) != null ? b : {};
      var e = b.content;
      b = babelHelpers.objectWithoutPropertiesLoose(b, ["content"]);
      var f = a.getAttribute("data-tooltip-content");
      !c("isStringNullOrEmpty")(e) &&
        !c("isStringNullOrEmpty")(f) &&
        c("FBLogger")("tooltip").warn(
          'Getting DataStore tooltip content on an element that has both a "data-tooltip-content" attribute value (set to %s) and a value coming from the DataStore',
          a.getAttribute("data-tooltip-content")
        );
      return babelHelpers["extends"](
        {
          className: a.getAttribute("data-tooltip-root-class"),
          delay: d,
          position: a.getAttribute("data-tooltip-position") || "above",
          alignH: a.getAttribute("data-tooltip-alignh") || "left",
          offsetY: a.getAttribute("data-tooltip-offsety") || 0,
          suppress: !1,
          overflowDisplay:
            a.getAttribute("data-tooltip-display") === "overflow",
          persistOnClick: a.getAttribute("data-pitloot-persistonclick"),
          textDirection: a.getAttribute("data-tooltip-text-direction"),
          content: (a = (d = f) != null ? d : e) != null ? a : null,
        },
        b
      );
    }
    function j(a, b) {
      var d = i(a);
      (typeof b.content !== "string" || !c("isStringNullOrEmpty")(b.content)) &&
        !c("isStringNullOrEmpty")(a.getAttribute("data-tooltip-content")) &&
        c("FBLogger")("tooltip").warn(
          'Setting DataStore tooltip content on an element that already has the "data-tooltip-content" attribute (set to %s) is invalid',
          a.getAttribute("data-tooltip-content")
        );
      c("DataStore").set(a, "tooltip", {
        content:
          b.content ||
          ((a = c("DataStore").get(a, "tooltip")) != null ? a : {}).content,
        position: b.position || d.position,
        alignH: b.alignH || d.alignH,
        suppress: b.suppress !== void 0 ? b.suppress : d.suppress,
        overflowDisplay: b.overflowDisplay || d.overflowDisplay,
        persistOnClick: b.persistOnClick || d.persistOnClick,
      });
    }
    function k(a, b) {
      j(a, b), a.setAttribute("data-hover", "tooltip");
    }
    function l(a, b) {}
    var m = {
      remove: function (a, b) {
        b = b === void 0 ? {} : b;
        b = b.onlyCleanupDataStore;
        b = b === void 0 ? !1 : b;
        c("DataStore").remove(a, "tooltip");
        b ||
          (a.removeAttribute("data-hover"),
          a.removeAttribute("data-tooltip-position"),
          a.removeAttribute("data-tooltip-alignh"),
          c("ifRequired")("Tooltip", function (b) {
            b.isActive(a) && b.hide();
          }));
      },
      set: function (a, b, d, e) {
        l(a, b),
          b instanceof (h || (h = c("URI")))
            ? (a.setAttribute("data-tooltip-uri", b.toString()),
              c("ifRequired")("Tooltip", function (b) {
                b.isActive(a) && b.fetchIfNecessary(a);
              }))
            : (a.removeAttribute("data-tooltip-content"),
              m._store({ context: a, content: b, position: d, alignH: e }),
              m.refreshIfActive(a));
      },
      refreshIfActive: function (a) {
        c("ifRequired")("Tooltip", function (b) {
          b.isActive(a) && b.show(a);
        });
      },
      _store: function (a) {
        var b = a.context,
          d = a.content,
          e = a.position;
        a = a.alignH;
        d = d;
        l(b, d);
        c("isTextNode")(d) &&
          d instanceof Element &&
          (d = c("getElementText")(d));
        var f = !1;
        typeof d !== "string"
          ? (d = c("DOM").create("div", {}, d))
          : (f = d === "");
        a = { alignH: a, content: d, position: e, suppress: f };
        k(b, a);
        return a;
      },
      propsFor: c("tooltipPropsFor"),
      enableDisplayOnOverflow: function (a) {
        a.removeAttribute("data-tooltip-display"),
          k(a, { overflowDisplay: !0 });
      },
      enablePersistOnClick: function (a) {
        a.removeAttribute("data-pitloot-persistOnClick"),
          k(a, { persistOnClick: !0 });
      },
      suppress: function (a, b) {
        j(a, { suppress: b });
      },
      _get: i,
    };
    f.exports = m;
  },
  34
);
__d(
  "Focus",
  [
    "cx",
    "CSS",
    "Event",
    "FocusEvent",
    "KeyStatus",
    "TooltipData",
    "ifRequired",
  ],
  function (a, b, c, d, e, f, g, h) {
    function a(a, b) {
      b === void 0 && (b = !1);
      if (a) {
        var e = c("ifRequired")(
          "VirtualCursorStatus",
          function (a) {
            return a.isVirtualCursorTriggered();
          },
          function () {
            return !1;
          }
        );
        b || d("KeyStatus").isKeyDown() || e ? k(a) : i(a);
      }
    }
    function i(a) {
      if (a) {
        d("CSS").addClass(a, "_5f0v");
        var b = c("Event").listen(a, "blur", function () {
          a && d("CSS").removeClass(a, "_5f0v"), b.remove();
        });
        d("TooltipData").suppress(a, !0);
        k(a);
        d("TooltipData").suppress(a, !1);
      }
    }
    function b(a, b, c) {
      c === void 0 && (c = { cleanupOnLeave: !0 });
      d("CSS").addClass(a, "_5f0v");
      return d("FocusEvent").listen(
        a,
        function () {
          for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++)
            d[e] = arguments[e];
          return j.apply(void 0, [a, b].concat(d));
        },
        c
      );
    }
    function j(a, b, e) {
      d("CSS").addClass(a, "_5f0v");
      a = c("ifRequired")(
        "FocusRing",
        function (a) {
          return a.usingKeyboardNavigation();
        },
        function () {
          return !0;
        }
      );
      e = e && a;
      d("CSS").conditionClass(b, "_3oxt", e);
      d("CSS").conditionClass(b, "_16jm", e);
    }
    function k(a) {
      try {
        (a.tabIndex = a.tabIndex), a.focus();
      } catch (a) {}
    }
    g.set = a;
    g.setWithoutOutline = i;
    g.relocate = b;
    g.performRelocation = j;
  },
  98
);
__d(
  "isContentEditable",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      a = a;
      while (a instanceof HTMLElement) {
        if (
          a.contentEditable === "true" ||
          a.contentEditable === "plaintext-only"
        )
          return !0;
        a = a.parentElement;
      }
      return !1;
    }
    f["default"] = a;
  },
  66
);
__d(
  "isElementInteractive",
  ["isContentEditable"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = new Set(["EMBED", "INPUT", "OBJECT", "SELECT", "TEXTAREA"]),
      i = new Set(["button", "checkbox", "radio", "submit"]);
    function a(a) {
      if (!a instanceof HTMLElement) return !1;
      var b = c("isContentEditable")(a),
        d = h.has(a.nodeName);
      a = a instanceof HTMLInputElement && i.has(a.type);
      return (b || d) && !a;
    }
    g["default"] = a;
  },
  98
);
__d(
  "KeyEventController",
  [
    "Bootloader",
    "DOMQuery",
    "Event",
    "Run",
    "emptyFunction",
    "getElementText",
    "isContentEditable",
    "isElementInteractive",
    "isEmpty",
  ],
  function (a, b, c, d, e, f, g) {
    var h,
      i = null,
      j = {
        BACKSPACE: [8],
        TAB: [9],
        RETURN: [13],
        ALT: [18],
        ESCAPE: [27],
        LEFT: [37, 63234],
        UP: [38, 63232],
        RIGHT: [39, 63235],
        DOWN: [40, 63233],
        NUMPAD_ADD: [43],
        NUMPAD_SUBSTRACT: [45],
        DELETE: [46],
        COMMA: [188],
        PERIOD: [190],
        SLASH: [191],
        "`": [192],
        "[": [219],
        "]": [221],
        PAGE_UP: [33],
        PAGE_DOWN: [34],
        END: [35],
        HOME: [36],
        SPACE: [32],
        KP_DOT: [46, 110],
        "-": [189],
        "=": [187],
        FORWARD_SLASH: [191],
      },
      k =
        ((a = {}),
        (a[8] = 1),
        (a[9] = 1),
        (a[13] = 1),
        (a[27] = 1),
        (a[32] = 1),
        (a[37] = 1),
        (a[63234] = 1),
        (a[38] = 1),
        (a[63232] = 1),
        (a[39] = 1),
        (a[63235] = 1),
        (a[40] = 1),
        (a[63233] = 1),
        (a[46] = 1),
        a);
    b = (function () {
      function a() {
        var a = this;
        this.handlers = {};
        ["keyup", "keydown", "keypress"].forEach(function (b) {
          return document.addEventListener(b, a.onkeyevent.bind(a, "on" + b));
        });
      }
      var b = a.prototype;
      b.mapKey = function (a) {
        a = a;
        if (/^[0-9]$/.test(a + "")) {
          typeof a !== "number" && (a = a.charCodeAt(0) - 48);
          return [48 + a, 96 + a];
        }
        a += "";
        var b = j[a.toUpperCase()];
        return b ? b : [a.toUpperCase().charCodeAt(0)];
      };
      b.onkeyevent = function (a, b) {
        var d = b;
        d = c("Event").$E(d);
        b = this.handlers[d.keyCode] || this.handlers[d.which];
        if (b)
          for (var e = 0; e < b.length; e++) {
            var f = b[e].callback,
              g = b[e].filter;
            try {
              if (!g || g(d, a)) {
                g = (function () {
                  var b = f(d, a),
                    e = d.which || d.keyCode;
                  c("Bootloader").loadModules(
                    ["KeyEventTypedLogger"],
                    function (a) {
                      new a()
                        .setAction("key_shortcut")
                        .setKey(d.key || "")
                        .setKeyChar(String.fromCharCode(e))
                        .setKeyCode(e)
                        .addToExtraData("is_trusted", d.isTrusted)
                        .log();
                    },
                    "KeyEventController"
                  );
                  if (b === !1) return { v: c("Event").kill(d) };
                })();
                if (typeof g === "object") return g.v;
              }
            } catch (a) {}
          }
        return !0;
      };
      b.resetHandlers = function () {
        for (var a in this.handlers)
          if (Object.prototype.hasOwnProperty.call(this.handlers, a)) {
            var b = this.handlers[a].filter(function (a) {
              return a.preserve();
            });
            b.length ? (this.handlers[a] = b) : delete this.handlers[a];
          }
      };
      a.getInstance = function () {
        return i || (i = new a());
      };
      a.defaultFilter = function (b, d) {
        b = c("Event").$E(b);
        return (
          a.filterEventTypes(b, d) &&
          a.filterEventTargets(b, d) &&
          a.filterEventModifiers(b, d)
        );
      };
      a.filterEventTypes = function (a, b) {
        return b === "onkeydown" ? !0 : !1;
      };
      a.filterEventTargets = function (a, b) {
        b = a.getTarget();
        return (
          !c("isElementInteractive")(b) ||
          (a.keyCode in k &&
            ((d("DOMQuery").isNodeOfType(b, ["input", "textarea"]) &&
              b.value.length === 0) ||
              (c("isContentEditable")(b) &&
                c("getElementText")(b).length === 0)))
        );
      };
      a.filterEventModifiers = function (a, b) {
        return a.ctrlKey || a.altKey || a.metaKey || a.repeat ? !1 : !0;
      };
      a.registerKeyAcrossTransitions = function (b, d, e, f) {
        e === void 0 && (e = a.defaultFilter);
        f === void 0 && (f = !1);
        return a.registerKey(b, d, e, f, c("emptyFunction").thatReturnsTrue);
      };
      a.registerKey = function (b, e, f, g, i) {
        f === void 0 && (f = a.defaultFilter);
        g === void 0 && (g = !1);
        i === void 0 && (i = c("emptyFunction").thatReturnsFalse);
        b = b;
        var j = a.getInstance(),
          k = b == null ? [] : j.mapKey(b);
        (h || (h = c("isEmpty")))(j.handlers) &&
          d("Run").onLeave(j.resetHandlers.bind(j));
        var l = {};
        for (var m = 0; m < k.length; m++) {
          b = "" + k[m];
          (!j.handlers[b] || g) && (j.handlers[b] = []);
          var n = { callback: e, filter: f, preserve: i };
          l[b] = n;
          j.handlers[b].push(n);
        }
        return {
          remove: function () {
            for (var a in l) {
              if (j.handlers[a] && j.handlers[a].length) {
                var b = j.handlers[a].indexOf(l[a]);
                b >= 0 && j.handlers[a].splice(b, 1);
              }
              delete l[a];
            }
          },
        };
      };
      a.registerKeyForButtonCallback = function (b, c) {
        return a.registerKey(b, function () {
          c.click();
          return !1;
        });
      };
      return a;
    })();
    g["default"] = b;
  },
  98
);
__d(
  "Keys",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    a = Object.freeze({
      BACKSPACE: 8,
      TAB: 9,
      RETURN: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      PAUSE_BREAK: 19,
      CAPS_LOCK: 20,
      ESC: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      INSERT: 45,
      DELETE: 46,
      ZERO: 48,
      ONE: 49,
      TWO: 50,
      THREE: 51,
      FOUR: 52,
      FIVE: 53,
      SIX: 54,
      SEVEN: 55,
      EIGHT: 56,
      NINE: 57,
      A: 65,
      B: 66,
      C: 67,
      D: 68,
      E: 69,
      F: 70,
      G: 71,
      H: 72,
      I: 73,
      J: 74,
      K: 75,
      L: 76,
      M: 77,
      N: 78,
      O: 79,
      P: 80,
      Q: 81,
      R: 82,
      S: 83,
      T: 84,
      U: 85,
      V: 86,
      W: 87,
      X: 88,
      Y: 89,
      Z: 90,
      LEFT_WINDOW_KEY: 91,
      RIGHT_WINDOW_KEY: 92,
      SELECT_KEY: 93,
      NUMPAD_0: 96,
      NUMPAD_1: 97,
      NUMPAD_2: 98,
      NUMPAD_3: 99,
      NUMPAD_4: 100,
      NUMPAD_5: 101,
      NUMPAD_6: 102,
      NUMPAD_7: 103,
      NUMPAD_8: 104,
      NUMPAD_9: 105,
      MULTIPLY: 106,
      ADD: 107,
      SUBTRACT: 109,
      DECIMAL_POINT: 110,
      DIVIDE: 111,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      NUM_LOCK: 144,
      SCROLL_LOCK: 145,
      SEMI_COLON: 186,
      EQUAL_SIGN: 187,
      COMMA: 188,
      DASH: 189,
      PERIOD: 190,
      FORWARD_SLASH: 191,
      GRAVE_ACCENT: 192,
      OPEN_BRACKET: 219,
      BACK_SLASH: 220,
      CLOSE_BRAKET: 221,
      SINGLE_QUOTE: 222,
    });
    f["default"] = a;
  },
  66
);
__d(
  "camelize",
  [],
  function (a, b, c, d, e, f) {
    var g = /-(.)/g;
    function a(a) {
      return a.replace(g, function (a, b) {
        return b.toUpperCase();
      });
    }
    f["default"] = a;
  },
  66
);
__d(
  "getOpacityStyleName",
  [],
  function (a, b, c, d, e, f) {
    var g = !1,
      h = null;
    function a() {
      if (!g) {
        if (document.body && "opacity" in document.body.style) h = "opacity";
        else {
          var a = document.createElement("div");
          a.style.filter = "alpha(opacity=100)";
          a.style.filter && (h = "filter");
        }
        g = !0;
      }
      return h;
    }
    f["default"] = a;
  },
  66
);
__d(
  "hyphenate",
  [],
  function (a, b, c, d, e, f) {
    var g = /([A-Z])/g;
    function a(a) {
      return a.replace(g, "-$1").toLowerCase();
    }
    f["default"] = a;
  },
  66
);
__d(
  "getStyleProperty",
  ["camelize", "hyphenate"],
  function (a, b, c, d, e, f, g) {
    function h(a) {
      return a == null ? "" : String(a);
    }
    function a(a, b) {
      var d;
      if (window.getComputedStyle) {
        d = window.getComputedStyle(a, null);
        if (d) return h(d.getPropertyValue(c("hyphenate")(b)));
      }
      if (document.defaultView && document.defaultView.getComputedStyle) {
        d = document.defaultView.getComputedStyle(a, null);
        if (d) return h(d.getPropertyValue(c("hyphenate")(b)));
        if (b === "display") return "none";
      }
      return a.currentStyle
        ? b === "float"
          ? h(a.currentStyle.cssFloat || a.currentStyle.styleFloat)
          : h(a.currentStyle[c("camelize")(b)])
        : h(a.style && a.style[c("camelize")(b)]);
    }
    g["default"] = a;
  },
  98
);
__d(
  "StyleCore",
  [
    "invariant",
    "camelize",
    "containsNode",
    "err",
    "getOpacityStyleName",
    "getStyleProperty",
    "hyphenate",
  ],
  function (a, b, c, d, e, f, g, h) {
    function i(a, b) {
      a = o.get(a, b);
      return a === "auto" || a === "scroll";
    }
    var j = new RegExp(
      "\\s*([^\\s:]+)\\s*:\\s*([^;('\"]*(?:(?:\\([^)]*\\)|\"[^\"]*\"|'[^']*')[^;(?:'\"]*)*)(?:;|$)",
      "g"
    );
    function k(a) {
      var b = {};
      a.replace(j, function (a, c, d) {
        b[c] = d;
        return d;
      });
      return b;
    }
    function l(a) {
      var b = "";
      for (var c in a) a[c] && (b += c + ":" + a[c] + ";");
      return b;
    }
    function m(a) {
      return a !== "" ? "alpha(opacity=" + a * 100 + ")" : "";
    }
    function n(a, b, d) {
      switch (c("hyphenate")(b)) {
        case "font-weight":
        case "line-height":
        case "opacity":
        case "z-index":
        case "animation-iteration-count":
        case "-webkit-animation-iteration-count":
          break;
        case "width":
        case "height":
          var e = parseInt(d, 10) < 0;
          e && h(0, 11849, a, b, d);
        default:
          isNaN(d) || !d || d === "0" || h(0, 11850, a, b, d, d + "px");
          break;
      }
    }
    var o = {
      set: function (a, b, d) {
        n("Style.set", b, d);
        if (a == null) return;
        a = a.style;
        switch (b) {
          case "opacity":
            c("getOpacityStyleName")() === "filter"
              ? (a.filter = m(d))
              : (a.opacity = d);
            break;
          case "float":
            a.cssFloat = a.styleFloat = d || "";
            break;
          default:
            try {
              a[c("camelize")(b)] = d;
            } catch (a) {
              throw c("err")('Style.set: "%s" argument is invalid: %s', b, d);
            }
        }
      },
      apply: function (a, b) {
        var d;
        for (d in b) n("Style.apply", d, b[d]);
        "opacity" in b &&
          c("getOpacityStyleName")() === "filter" &&
          ((b.filter = m(b.opacity)), delete b.opacity);
        var e = k(a.style.cssText);
        for (d in b) {
          var f = b[d];
          delete b[d];
          var g = c("hyphenate")(d);
          for (var h in e) (h === g || h.indexOf(g + "-") === 0) && delete e[h];
          b[g] = f;
        }
        Object.assign(e, b);
        a.style.cssText = l(e);
      },
      get: c("getStyleProperty"),
      getFloat: function (a, b) {
        return parseFloat(o.get(a, b), 10);
      },
      getOpacity: function (a) {
        if (c("getOpacityStyleName")() === "filter") {
          var b = o.get(a, "filter");
          if (b) {
            b = /(\d+(?:\.\d+)?)/.exec(b);
            if (b) return parseFloat(b.pop()) / 100;
          }
        }
        return o.getFloat(a, "opacity") || 1;
      },
      isFixed: function (a) {
        while (c("containsNode")(document.body, a)) {
          if (o.get(a, "position") === "fixed") return !0;
          a = a.parentNode;
        }
        return !1;
      },
      getScrollParent: function (a) {
        if (!a) return null;
        while (a && a !== document.body) {
          if (i(a, "overflow") || i(a, "overflowY") || i(a, "overflowX"))
            return a;
          a = a.parentNode;
        }
        return window;
      },
    };
    a = o;
    g["default"] = a;
  },
  98
);
__d(
  "Style",
  ["$", "StyleCore"],
  function (a, b, c, d, e, f, g) {
    a = babelHelpers["extends"]({}, c("StyleCore"), {
      get: function (a, b) {
        typeof a === "string" && (a = c("$")(a));
        return c("StyleCore").get(a, b);
      },
      getFloat: function (a, b) {
        typeof a === "string" && (a = c("$")(a));
        return c("StyleCore").getFloat(a, b);
      },
    });
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "SubscriptionsHandler",
  ["invariant"],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    function i(a) {
      return a.remove || a.reset || a.unsubscribe || a.cancel || a.dispose;
    }
    function j(a) {
      i(a).call(a);
    }
    a = (function () {
      function a() {
        this.$1 = [];
      }
      var b = a.prototype;
      b.addSubscriptions = function () {
        for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++)
          b[c] = arguments[c];
        b.every(i) || h(0, 3659);
        this.$1 != null ? (this.$1 = this.$1.concat(b)) : b.forEach(j);
      };
      b.engage = function () {
        this.$1 == null && (this.$1 = []);
      };
      b.release = function () {
        this.$1 != null && (this.$1.forEach(j), (this.$1 = null));
      };
      b.releaseOne = function (a) {
        var b = this.$1;
        if (b == null) return;
        var c = b.indexOf(a);
        c !== -1 && (j(a), b.splice(c, 1), b.length === 0 && (this.$1 = null));
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "cancelIdleCallbackBlue",
  ["IdleCallbackImplementation"],
  function (a, b, c, d, e, f, g) {
    var h =
      (c = a.cancelIdleCallback) != null
        ? c
        : d("IdleCallbackImplementation").cancelIdleCallback;
    function b(a) {
      h(a);
    }
    g["default"] = b;
  },
  98
);
__d(
  "cancelIdleCallbackWWW",
  ["cr:692209"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:692209");
  },
  98
);
__d(
  "cssVar",
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      throw new Error('cssVar("' + a + '"): Unexpected class transformation.');
    }
    f["default"] = a;
  },
  66
);
__d(
  "csx",
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      throw new Error("csx: Unexpected class selector transformation.");
    }
    f["default"] = a;
  },
  66
);
__d(
  "getReferrerURI",
  ["ErrorGuard", "URI", "isFacebookURI"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h, i;
    function b() {
      if (a.PageTransitions && a.PageTransitions.isInitialized())
        return a.PageTransitions.getReferrerURI();
      else {
        var b = (h || (h = c("ErrorGuard"))).applyWithGuard(
          function (a) {
            return (i || (i = c("URI"))).tryParseURI(a);
          },
          null,
          [document.referrer]
        );
        return b && c("isFacebookURI")(b) ? b : null;
      }
    }
    g["default"] = b;
  },
  98
);
__d(
  "setImmediate",
  ["TimeSlice", "TimerStorage", "setImmediateAcrossTransitions"],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      var b,
        d = function () {
          c("TimerStorage").unset(c("TimerStorage").IMMEDIATE, b);
          for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++)
            e[f] = arguments[f];
          Function.prototype.apply.call(a, this, e);
        };
      c("TimeSlice").copyGuardForWrapper(a, d);
      for (
        var e = arguments.length, f = new Array(e > 1 ? e - 1 : 0), g = 1;
        g < e;
        g++
      )
        f[g - 1] = arguments[g];
      b = c("setImmediateAcrossTransitions").apply(void 0, [d].concat(f));
      c("TimerStorage").set(c("TimerStorage").IMMEDIATE, b);
      return b;
    }
    g["default"] = a;
  },
  98
);
__d(
  "throttle",
  [
    "TimeSlice",
    "TimeSliceInteractionSV",
    "setTimeout",
    "setTimeoutAcrossTransitions",
  ],
  function (a, b, c, d, e, f, g) {
    function a(a, b, d) {
      return h(a, b, d, c("setTimeout"), !1);
    }
    Object.assign(a, {
      acrossTransitions: function (a, b, d) {
        return h(a, b, d, c("setTimeoutAcrossTransitions"), !1);
      },
      withBlocking: function (a, b, d) {
        return h(a, b, d, c("setTimeout"), !0);
      },
      acrossTransitionsWithBlocking: function (a, b, d) {
        return h(a, b, d, c("setTimeoutAcrossTransitions"), !0);
      },
    });
    function h(a, b, d, e, f) {
      var g = b == null ? 100 : b,
        h,
        i = null,
        j = 0,
        k = null,
        l = [],
        m = c("TimeSlice").guard(
          function () {
            j = Date.now();
            if (i) {
              var b = function (b) {
                  a.apply(h, b);
                }.bind(null, i),
                c = l.length;
              while (--c >= 0) b = l[c].bind(null, b);
              l = [];
              b();
              i = null;
              k = e(m, g);
            } else k = null;
          },
          "throttle_" + g + "_ms",
          {
            propagationType: c("TimeSlice").PropagationType.EXECUTION,
            registerCallStack: !0,
          }
        );
      m.__SMmeta = a.__SMmeta;
      return function () {
        c("TimeSliceInteractionSV").ref_counting_fix &&
          l.push(
            c("TimeSlice").getGuardedContinuation("throttleWithContinuation")
          );
        for (var a = arguments.length, b = new Array(a), n = 0; n < a; n++)
          b[n] = arguments[n];
        i = b;
        h = this;
        d !== void 0 && (h = d);
        (k === null || Date.now() - j > g) && (f === !0 ? m() : (k = e(m, 0)));
      };
    }
    b = a;
    g["default"] = b;
  },
  98
);
