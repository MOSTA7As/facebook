/*FB_PKG_DELIM*/

__d(
  "ArtillerySegment",
  ["invariant", "cr:9985"],
  function (a, b, c, d, e, f, g, h) {
    var i = 0;
    a = (function () {
      function a(a) {
        a || h(0, 1496),
          ("category" in a && "description" in a) ||
            h(0, 3138, JSON.stringify(a)),
          (this.$1 = !1),
          (this.$2 = babelHelpers["extends"]({}, a, {
            id: (i++).toString(36),
          })),
          (this.$3 = []);
      }
      var c = a.prototype;
      c.getID = function () {
        return this.$2.id;
      };
      c.begin = function () {
        this.$2.begin = b("cr:9985")();
        return this;
      };
      c.end = function () {
        this.$2.end = b("cr:9985")();
        return this;
      };
      c.appendChild = function () {
        var a = this;
        this.$1 && h(0, 37302, this.$2.description);
        for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++)
          c[d] = arguments[d];
        c.forEach(function (b) {
          a.$3.push(b.getID());
        });
        return this;
      };
      c.setPosted = function () {
        this.$1 = !0;
        return this;
      };
      c.getPostData = function () {
        return babelHelpers["extends"]({}, this.$2, {
          id: this.$2.id,
          children: this.$3.slice(),
        });
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "ArtillerySequence",
  ["invariant"],
  function (a, b, c, d, e, f, g, h) {
    var i = 0;
    a = (function () {
      function a(a) {
        a || h(0, 1496),
          "description" in a || h(0, 1497, JSON.stringify(a)),
          (this.$1 = !1),
          (this.$2 = babelHelpers["extends"]({}, a, {
            id: (i++).toString(36),
          })),
          (this.$3 = []);
      }
      var b = a.prototype;
      b.getID = function () {
        return this.$2.id;
      };
      b.addSegment = function () {
        var a = this;
        this.$1 && h(0, 37342, this.$2.description);
        for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++)
          c[d] = arguments[d];
        c.forEach(function (b) {
          a.$3.push(b.getID());
        });
        return this;
      };
      b.setPosted = function () {
        this.$1 = !0;
        return this;
      };
      b.getPostData = function () {
        return babelHelpers["extends"]({}, this.$2, {
          id: this.$2.id,
          segments: this.$3.slice(),
        });
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "ArtilleryTrace",
  ["invariant", "ArtillerySegment", "ArtillerySequence"],
  function (a, b, c, d, e, f, g, h) {
    a = (function () {
      function a() {
        (this.$1 = !1),
          (this.$3 = void 0),
          (this.$4 = {}),
          (this.$5 = {}),
          (this.$6 = []),
          (this.$7 = []),
          (this.$8 = {}),
          (this.$9 = []),
          (this.$10 = null);
      }
      var b = a.prototype;
      b.createSequence = function (a) {
        this.$1 && h(0, 4917);
        a = new (c("ArtillerySequence"))(a);
        this.$6.push(a);
        return a;
      };
      b.createSegment = function (a) {
        this.$1 && h(0, 4918);
        a = new (c("ArtillerySegment"))(a);
        this.$7.push(a);
        return a;
      };
      b.markSegment = function (a, b) {
        this.$1 && h(0, 4919);
        this.$8[b] = a.getID();
        return this;
      };
      b.connectTrace = function (a, b) {
        this.$1 && h(0, 4919);
        b = b || this.$2;
        b || h(0, 4920);
        this.$9.push({ segment: a.getID(), trace: b });
        return this;
      };
      b.setID = function (a, b) {
        (!this.$2 && !this.$3) || h(0, 4921);
        this.$2 = a;
        this.$3 = b;
        return this;
      };
      b.getID = function () {
        return this.$2;
      };
      b.getArtillery2ID = function () {
        return this.$3;
      };
      b.addProperty = function (a, b) {
        this.$4[a] = b;
        return this;
      };
      b.addTagset = function (a, b) {
        this.$5[a] = b;
        return this;
      };
      b.addActivePolicies = function (a) {
        this.addTagset("active_policies", a);
        this.addTagset("policy", a);
        return this;
      };
      b.getProperty = function (a) {
        return this.$4[a];
      };
      b.getTagset = function (a) {
        return this.$5[a];
      };
      b.getActivePolicies = function () {
        return this.getTagset("active_policies");
      };
      b.post = function () {
        this.$1 && h(0, 37290, this.$2);
        this.$1 = !0;
        var a = this.$10;
        a &&
          a({
            id: this.$2,
            artillery2Id: this.$3,
            properties: this.$4,
            tagsets: this.$5,
            sequences: this.$6.map(function (a) {
              return a.setPosted().getPostData();
            }),
            segments: this.$7.map(function (a) {
              return a.setPosted().getPostData();
            }),
            marks: babelHelpers["extends"]({}, this.$8),
            connections: this.$9.slice(),
          });
      };
      b.setOnPost = function (a) {
        this.$10 && h(0, 4923);
        this.$10 = a;
        return this;
      };
      b.isPosted = function () {
        return this.$1;
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "ServiceWorkerRegistration",
  [
    "ClientServiceWorkerMessage",
    "EventListener",
    "Promise",
    "Run",
    "promiseDone",
  ],
  function (a, b, c, d, e, f) {
    var g,
      h = !!navigator.serviceWorker,
      i = {};
    function j() {
      var a = navigator.serviceWorker;
      if (!h || !a)
        throw new Error("serviceWorker is not supported in this browser");
      return a;
    }
    var k = {
      isSupported: function () {
        return h;
      },
      registerWorkerIfUnregisteredAfterDD: function (a) {
        b("Run").onAfterLoad(function () {
          k.registerWorkerIfUnregistered(a);
        });
      },
      registerWorkerIfUnregistered: function (a) {
        if (i[a]) return i[a];
        var c = j(),
          d = (i[a] = new (g || (g = b("Promise")))(function (d, e) {
            b("promiseDone")(k.getWorkerRegistration(a), function (f) {
              if (!f) {
                var h = b("EventListener").listen(
                  window,
                  "message",
                  function (a) {
                    (a == null
                      ? void 0
                      : (a = a.data) == null
                      ? void 0
                      : a.command) === "ServiceWorkerInstallError" && e();
                  }
                );
                b("promiseDone")(
                  (g || (g = b("Promise"))).resolve(
                    c.register(a, { updateViaCache: "all" })
                  ),
                  function () {
                    h.remove(),
                      b("promiseDone")(
                        (g || (g = b("Promise"))).resolve(c.ready),
                        d
                      );
                  }
                );
              } else d(f);
            });
          }));
        return d;
      },
      unregisterControllingWorker: function () {
        return new (g || (g = b("Promise")))(function (a, c) {
          c = new (b("ClientServiceWorkerMessage"))(
            "unregister",
            {},
            function () {
              a(!0);
            }
          );
          c.sendViaController();
        });
      },
      getWorkerRegistration: function (a) {
        var b = j();
        return b.getRegistration(a);
      },
      isAWorkerActivated: function () {
        return !navigator.serviceWorker ||
          !navigator.serviceWorker.getRegistration
          ? (g || (g = b("Promise"))).resolve(!1)
          : navigator.serviceWorker.getRegistration().then(function (a) {
              return !!(a && a.active);
            });
      },
    };
    e.exports = k;
  },
  null
);
__d(
  "Artillery",
  [
    "invariant",
    "ArtilleryTrace",
    "Banzai",
    "ClientServiceWorkerMessage",
    "Run",
    "ServiceWorkerRegistration",
    "forEachObject",
    "mixInEventEmitter",
    "performance",
  ],
  function (a, b, c, d, e, f, g, h) {
    var i,
      j = !1,
      k = !1,
      l = [],
      m,
      n,
      o,
      p = {},
      q = {},
      r = !1,
      s = !1;
    function t() {
      if (j) return;
      j = !0;
      c("Banzai").subscribe(c("Banzai").SHUTDOWN, function () {
        v._postAll();
      });
    }
    function u() {
      (n = null), (m = null), (q = {}), (p = {}), (o = null), (s = !1);
    }
    var v = {
      isEnabled: function () {
        return k;
      },
      createTrace: function () {
        t();
        var a = new (c("ArtilleryTrace"))();
        a.setOnPost(function (a) {
          v.emitAndHold("posttrace", a);
        });
        l.push(a);
        return a;
      },
      getPageTrace: function () {
        m || h(0, 4261);
        if (o) return o;
        var a = v.createTrace().setID(m, n);
        c("forEachObject")(p, function (b, c, d) {
          a.addProperty(c, b);
        });
        c("forEachObject")(q, function (b, c, d) {
          a.addTagset(c, b);
        });
        o = a;
        return a;
      },
      setPageProperties: function (a) {
        p = a;
      },
      addPageTagset: function (a, b) {
        o == null ? (q[a] = b) : o.addTagset(a, b);
      },
      setActivePolicies: function (a) {
        v.addPageTagset("active_policies", a), v.addPageTagset("policy", a);
      },
      getPageActivePolicies: function () {
        return v.getPageTagset("active_policies");
      },
      enableLogServiceWorker: function () {
        c("ServiceWorkerRegistration").isSupported() && (r = !0);
      },
      getPageProperty: function (a) {
        if (o == null) return p[a];
        else return o.getProperty(a);
      },
      getPageTagset: function (a) {
        if (o == null) return q[a];
        else return o.getTagset(a);
      },
      enable: function () {
        (k = !0), s || (d("Run").onLeave(u), (s = !0));
      },
      disable: function () {
        k = !1;
      },
      setPageTraceID: function (a, b) {
        if (m === a && n === b) return;
        (!m && !n) || h(0, 4262);
        m = a;
        n = b;
        if (
          r &&
          (i || (i = c("performance"))) &&
          (i || (i = c("performance"))).timing &&
          (i || (i = c("performance"))).timing.navigationStart
        ) {
          a = new (c("ClientServiceWorkerMessage"))(
            "asw-sendStartupData",
            {
              traceID: n,
              windowStart: (i || (i = c("performance"))).timing.navigationStart,
            },
            null
          );
          a.sendViaController();
        }
      },
      _postAll: function () {
        l.forEach(function (a) {
          return !a.isPosted() && a.post();
        });
      },
    };
    c("mixInEventEmitter")(v, { posttrace: !0 });
    a = v;
    g["default"] = a;
  },
  98
);
__d(
  "Chromedome",
  ["fbt"],
  function (a, b, c, d, e, f, g, h) {
    function i() {
      if (document.domain == null) return null;
      var a = document.domain,
        b = /^intern\./.test(a);
      if (b) return null;
      b = /(^|\.)facebook\.(com|sg)$/.test(a);
      if (b) return "facebook";
      b = /(^|\.)instagram\.com$/.test(a);
      if (b) return "instagram";
      b = /(^|\.)threads\.(com|net)$/.test(a);
      if (b) return "threads";
      b = /(^|\.)messenger\.com$/.test(a);
      return b ? "messenger" : null;
    }
    function j(a) {
      if (a === "instagram")
        return h._(
          /*BTDS*/ '\u0645\u064a\u0632\u0629 \u0627\u0644\u0645\u062a\u0635\u0641\u062d \u0647\u0630\u0647 \u0645\u0648\u062c\u0647\u0629 \u0644\u0644\u0645\u0637\u0648\u0631\u064a\u0646. \u0625\u0630\u0627 \u0637\u0644\u0628 \u0645\u0646\u0643 \u0634\u062e\u0635 \u0645\u0627 \u0646\u0633\u062e \u0648\u0644\u0635\u0642 \u0623\u064a \u0634\u064a\u0621 \u0647\u0646\u0627 \u0644\u062a\u0645\u0643\u064a\u0646 \u0645\u064a\u0632\u0629 \u0639\u0644\u0649 Instagram \u0623\u0648 "\u0627\u062e\u062a\u0631\u0627\u0642" \u062d\u0633\u0627\u0628 \u0634\u062e\u0635 \u0622\u062e\u0631\u060c \u0641\u0625\u0646 \u0647\u0630\u0647 \u0645\u062d\u0627\u0648\u0644\u0629 \u0627\u062d\u062a\u064a\u0627\u0644\u064a\u0629 \u0648\u0633\u062a\u062a\u064a\u062d \u0644\u0647 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062d\u0633\u0627\u0628 Instagram \u0627\u0644\u062e\u0627\u0635 \u0628\u0643.'
        );
      return a === "threads"
        ? h._(
            /*BTDS*/ '\u0645\u064a\u0632\u0629 \u0627\u0644\u0645\u062a\u0635\u0641\u062d \u0647\u0630\u0647 \u0645\u0648\u062c\u0647\u0629 \u0644\u0644\u0645\u0637\u0648\u0631\u064a\u0646. \u0625\u0630\u0627 \u0637\u0644\u0628 \u0645\u0646\u0643 \u0634\u062e\u0635 \u0645\u0627 \u0646\u0633\u062e \u0648\u0644\u0635\u0642 \u0623\u064a \u0634\u064a\u0621 \u0647\u0646\u0627 \u0644\u062a\u0645\u0643\u064a\u0646 \u0645\u064a\u0632\u0629 \u0639\u0644\u0649 Threads \u0623\u0648 "\u0627\u062e\u062a\u0631\u0627\u0642" \u062d\u0633\u0627\u0628 \u0634\u062e\u0635 \u0622\u062e\u0631\u060c \u0641\u0625\u0646 \u0647\u0630\u0647 \u0645\u062d\u0627\u0648\u0644\u0629 \u0627\u062d\u062a\u064a\u0627\u0644\u064a\u0629 \u0648\u0633\u062a\u062a\u064a\u062d \u0644\u0647 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062d\u0633\u0627\u0628 Threads \u0627\u0644\u062e\u0627\u0635 \u0628\u0643.'
          )
        : h._(
            /*BTDS*/ '\u0645\u064a\u0632\u0629 \u0627\u0644\u0645\u062a\u0635\u0641\u062d \u0647\u0630\u0647 \u0645\u0648\u062c\u0647\u0629 \u0644\u0644\u0645\u0637\u0648\u0631\u064a\u0646. \u0625\u0630\u0627 \u0637\u0644\u0628 \u0645\u0646\u0643 \u0634\u062e\u0635 \u0645\u0627 \u0646\u0633\u062e \u0648\u0644\u0635\u0642 \u0623\u064a \u0634\u064a\u0621 \u0647\u0646\u0627 \u0644\u062a\u0645\u0643\u064a\u0646 \u0645\u064a\u0632\u0629 \u0639\u0644\u0649 \u0641\u064a\u0633\u0628\u0648\u0643 \u0623\u0648 "\u0627\u062e\u062a\u0631\u0627\u0642" \u062d\u0633\u0627\u0628 \u0634\u062e\u0635 \u0622\u062e\u0631\u060c \u0641\u0625\u0646 \u0647\u0630\u0647 \u0645\u062d\u0627\u0648\u0644\u0629 \u0627\u062d\u062a\u064a\u0627\u0644\u064a\u0629 \u0648\u0633\u062a\u062a\u064a\u062d \u0644\u0647 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062d\u0633\u0627\u0628 \u0641\u064a\u0633\u0628\u0648\u0643 \u0627\u0644\u062e\u0627\u0635 \u0628\u0643.'
          );
    }
    function a(a) {
      if (top !== window) return;
      a = i();
      if (a == null) return;
      var b = h._(/*BTDS*/ "\u0627\u0646\u062a\u0628\u0647!");
      a = j(a);
      var c = h._(
          /*BTDS*/ "\u0631\u0627\u062c\u0639 {url} \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0645\u0632\u064a\u062f \u0645\u0646 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a",
          [h._param("url", "https://www.facebook.com/selfxss")]
        ),
        d = "font-family:helvetica; font-size:20px; ";
      [
        [
          b,
          d +
            "font-size:50px; font-weight:bold; color:red; -webkit-text-stroke:1px black;",
        ],
        [a, d],
        [c, d],
        ["", ""],
      ].map(function (a) {
        window.setTimeout(
          console.log.bind(console, "\n%c" + a[0].toString(), a[1])
        );
      });
    }
    g.start = a;
  },
  226
);
__d(
  "ClickRefUtils",
  ["DataAttributeUtils"],
  function (a, b, c, d, e, f) {
    var g = {
      get_intern_ref: function (a) {
        if (a) {
          var b = {
            profile_minifeed: 1,
            gb_content_and_toolbar: 1,
            gb_muffin_area: 1,
            ego: 1,
            bookmarks_menu: 1,
            jewelBoxNotif: 1,
            jewelNotif: 1,
            BeeperBox: 1,
            searchBarClickRef: 1,
          };
          for (a = a; a && a != document.body; a = a.parentNode) {
            if (!a.id || typeof a.id !== "string") continue;
            if (a.id.substr(0, 8) == "pagelet_") return a.id.substr(8);
            if (a.id.substr(0, 8) == "box_app_") return a.id;
            if (b[a.id]) return a.id;
          }
        }
        return "-";
      },
      get_href: function (a) {
        a =
          (a.getAttribute &&
            (a.getAttribute("ajaxify") || a.getAttribute("data-endpoint"))) ||
          a.action ||
          a.href ||
          a.name;
        return typeof a === "string" ? a : null;
      },
      should_report: function (a, c) {
        if (c == "FORCE") return !0;
        return c == "INDIRECT"
          ? !1
          : a &&
              (g.get_href(a) ||
                (a.getAttribute && b("DataAttributeUtils").getDataFt(a)));
      },
    };
    e.exports = g;
  },
  null
);
__d(
  "ClickRefLogger",
  [
    "Arbiter",
    "Banzai",
    "ClickRefUtils",
    "ScriptPath",
    "SessionName",
    "Vector",
    "collectDataAttributes",
    "ge",
    "pageID",
  ],
  function (a, b, c, d, e, f) {
    var g = { delay: 0, retry: !0 };
    function h(a) {
      if (!b("ge")("content")) return [0, 0, 0, 0];
      a = b("Vector").getEventPosition(a);
      return [a.x, a.y, 0, 0];
    }
    function i(c, d, e, f) {
      var g = "r",
        i = [0, 0, 0, 0],
        j,
        k;
      if (e) {
        j = e.type;
        j == "click" && b("ge")("content") && (i = h(e));
        var l = 0;
        e.ctrlKey && (l += 1);
        e.shiftKey && (l += 2);
        e.altKey && (l += 4);
        e.metaKey && (l += 8);
        l && (j += l);
      }
      d && (k = b("ClickRefUtils").get_href(d));
      l = b("collectDataAttributes")(e ? e.target || e.srcElement : d, [
        "ft",
        "gt",
      ]);
      Object.assign(l.ft, f.ft);
      Object.assign(l.gt, f.gt);
      typeof l.ft.ei === "string" && delete l.ft.ei;
      e &&
        e.which &&
        (l.ft.click_type =
          e.which === 1 ? "left" : e.which === 2 ? "middle" : "right");
      return [
        c.ue_ts,
        c.ue_count,
        k || "-",
        c.context,
        j || "-",
        b("ClickRefUtils").get_intern_ref(d),
        g,
        a.URI
          ? a.URI.getRequestURI(!0, !0).getUnqualifiedURI().toString()
          : location.pathname + location.search + location.hash,
        l,
      ]
        .concat(i)
        .concat(b("pageID"))
        .concat(b("ScriptPath").getTopViewEndpoint());
    }
    b("Arbiter").subscribe("ClickRefAction/new", function (a, c) {
      if (b("ClickRefUtils").should_report(c.node, c.mode)) {
        a = i(c.cfa, c.node, c.event, c.extra_data);
        c = [b("SessionName").getName(), Date.now(), "act"];
        b("Banzai").post("click_ref_logger", Array.prototype.concat(c, a), g);
      }
    });
    b("Arbiter").subscribe("ClickRefAction/contextmenu", function (a, c) {
      if (b("ClickRefUtils").should_report(c.node, c.mode)) {
        a = i(c.cfa, c.node, c.event, c.extra_data);
        c = [b("SessionName").getName(), Date.now(), "act"];
        b("Banzai").post("click_ref_logger", Array.prototype.concat(c, a), g);
      }
    });
  },
  null
);
__d(
  "DimensionTracking",
  ["Cookie", "Event", "debounce", "getViewportDimensions", "isInIframe"],
  function (a, b, c, d, e, f, g) {
    function a() {
      var a = c("getViewportDimensions")();
      c("Cookie").set("wd", a.width + "x" + a.height);
    }
    c("isInIframe")() ||
      (setTimeout(a, 100),
      c("Event").listen(window, "resize", c("debounce")(a, 250)),
      c("Event").listen(window, "focus", a));
  },
  34
);
__d(
  "ErrorSetup",
  ["fb-error"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("fb-error").ErrorSetup;
  },
  98
);
__d(
  "ErrorLogging",
  [
    "ClientConsistency",
    "Env",
    "ErrorGuard",
    "ErrorSetup",
    "ErrorTransport",
    "JSErrorLoggingConfig",
    "ScriptPath",
    "SiteData",
    "WebSession",
    "setTimeout",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h, i;
    (h || c("ErrorGuard")).skipGuardGlobal((i || (i = c("Env"))).nocatch);
    d("JSErrorLoggingConfig").sampleWeight != null &&
      c("setTimeout")(function () {
        c("ErrorSetup").setup(
          {
            additional_client_revisions:
              c("ClientConsistency").getAdditionalRevisions(),
            appId: d("JSErrorLoggingConfig").appId,
            client_revision: c("SiteData").client_revision,
            extra: d("JSErrorLoggingConfig").extra,
            loggingFramework:
              c("SiteData").is_legacy_msite == !0 ? "mobile" : "blue",
            server_revision: c("SiteData").server_revision,
            spin: c("SiteData").spin,
            projectBlocklist: d("JSErrorLoggingConfig").projectBlocklist,
            push_phase: c("SiteData").push_phase,
            report_source: d("JSErrorLoggingConfig").report_source,
            report_source_ref: d("JSErrorLoggingConfig").report_source_ref,
            sample_weight: d("JSErrorLoggingConfig").sampleWeight,
            script_path: c("ScriptPath").getScriptPath(),
            web_session_id: d("WebSession").getId(),
          },
          d("ErrorTransport").log
        );
      }, 0);
    c("ErrorSetup").preSetup();
  },
  34
);
__d(
  "FalcoAppUniverse",
  ["$InternalEnum"],
  function (a, b, c, d, e, f) {
    a = b("$InternalEnum")({ FACEBOOK: 1, INSTAGRAM: 2, OCULUS: 3 });
    c = a;
    f["default"] = c;
  },
  66
);
__d(
  "Queue",
  [],
  function (a, b, c, d, e, f) {
    var g = {};
    a = (function () {
      function a(a) {
        (this._timeout = null),
          (this._interval = (a == null ? void 0 : a.interval) || 0),
          (this._processor = a == null ? void 0 : a.processor),
          (this._queue = []),
          (this._stopped = !0);
      }
      var b = a.prototype;
      b._dispatch = function (a) {
        var b = this;
        a === void 0;
        if (this._stopped || this._queue.length === 0) return;
        a = this._processor;
        if (a == null) {
          this._stopped = !0;
          throw new Error("No processor available");
        }
        var c = this._interval;
        if (c != null)
          a.call(this, this._queue.shift()),
            (this._timeout = setTimeout(function () {
              return b._dispatch();
            }, c));
        else while (this._queue.length) a.call(this, this._queue.shift());
      };
      b.enqueue = function (a) {
        this._processor && !this._stopped
          ? this._processor(a)
          : this._queue.push(a);
        return this;
      };
      b.start = function (a) {
        a && (this._processor = a);
        this._stopped = !1;
        this._dispatch();
        return this;
      };
      b.isStarted = function () {
        return !this._stopped;
      };
      b.dispatch = function () {
        this._dispatch(!0);
      };
      b.stop = function (a) {
        this._stopped = !0;
        a && this._timeout != null && clearTimeout(this._timeout);
        return this;
      };
      b.merge = function (a, b) {
        if (b) {
          (b = this._queue).unshift.apply(b, a._queue);
        } else {
          (b = this._queue).push.apply(b, a._queue);
        }
        a._queue = [];
        this._dispatch();
        return this;
      };
      b.getLength = function () {
        return this._queue.length;
      };
      a.get = function (b, c) {
        var d;
        b in g ? (d = g[b]) : (d = g[b] = new a(c));
        return d;
      };
      a.exists = function (a) {
        return a in g;
      };
      a.remove = function (a) {
        return delete g[a];
      };
      return a;
    })();
    f["default"] = a;
  },
  66
);
__d(
  "FalcoLoggerTransports",
  [
    "AnalyticsCoreData",
    "Banzai",
    "ExecutionEnvironment",
    "FalcoAppUniverse",
    "FalcoUtils",
    "ODS",
    "PersistedQueue",
    "Queue",
    "WebSession",
    "performanceAbsoluteNow",
    "promiseDone",
    "requireDeferredForDisplay",
    "uuidv4",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k,
      l = c("requireDeferredForDisplay")(
        "TransportSelectingClientSingletonConditional"
      ).__setRef("FalcoLoggerTransports"),
      m = 5 * 1024,
      n =
        (b = (i || (i = c("AnalyticsCoreData"))).max_delay_br_queue) != null
          ? b
          : 60 * 1e3,
      o =
        (e = (i || (i = c("AnalyticsCoreData")))
          .max_delay_br_queue_immediate) != null
          ? e
          : 1e3;
    b =
      (f = (i || (i = c("AnalyticsCoreData")))
        .max_delay_br_init_not_complete) != null
        ? f
        : 1e3;
    var p = "falco:",
      q = new (c("Queue"))(),
      r = 5e3,
      s = 6e4,
      aa = c("uuidv4")(),
      ba = "ods_web_batch",
      t = new Map(),
      u = new Set(),
      v = new Set(),
      w = d("FalcoUtils").getTaggedBitmap(38),
      x =
        (e = c("FalcoAppUniverse").cast(
          (i || (i = c("AnalyticsCoreData"))).app_universe
        )) != null
          ? e
          : 1,
      y = [],
      z = 0,
      A = null,
      B = !1,
      C = !1,
      D = !1,
      E = !0,
      F = !1,
      G = Date.now() - s,
      H = 1,
      I = b > n ? b : n,
      J = b;
    Y();
    for (
      e =
        (f = (i || (i = c("AnalyticsCoreData"))).stateful_events_list_for_br) !=
        null
          ? f
          : [],
        b = Array.isArray(e),
        f = 0,
        e = b
          ? e
          : e[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
      ;

    ) {
      var K;
      if (b) {
        if (f >= e.length) break;
        K = e[f++];
      } else {
        f = e.next();
        if (f.done) break;
        K = f.value;
      }
      K = K;
      u.add(K);
    }
    for (
      f =
        (K = (i || (i = c("AnalyticsCoreData")))
          .stateless_non_fb_events_for_br) != null
          ? K
          : [],
        b = Array.isArray(f),
        e = 0,
        f = b
          ? f
          : f[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
      ;

    ) {
      if (b) {
        if (e >= f.length) break;
        K = f[e++];
      } else {
        e = f.next();
        if (e.done) break;
        K = e.value;
      }
      K = K;
      v.add(K);
    }
    function L() {
      return (
        (i || (i = c("AnalyticsCoreData"))).enable_bladerunner &&
        !(k || (k = c("ExecutionEnvironment"))).isInWorker
      );
    }
    function M(a, b) {
      d("FalcoUtils").bumpODSMetrics(
        b.item.name,
        "event.info.streaming.batched",
        1
      );
      var c = b.item.extra.length;
      z + c > m && (clearTimeout(A), N());
      y.push([a, b]);
      z += c;
    }
    function N() {
      A = null;
      B = !1;
      var a = y;
      S(
        "event.info.streaming.batch_processing",
        a.map(function (a) {
          return a[1].item;
        })
      );
      !F
        ? O(a, "event.non_critical_failure.streaming_init_not_complete")
        : q.enqueue(function (b) {
            return b.log(
              a.map(function (a) {
                return a[1].item;
              }),
              function (b) {
                if (!b) {
                  O(a, "event.info.banzai_fallback");
                  return;
                }
                P(a, b, "event.info.streaming.enqueued");
              }
            );
          });
      y = [];
      z = 0;
    }
    function O(a, b) {
      var c = function () {
        var c,
          f = a[e],
          g = f[0],
          h = f[1];
        f = h.item;
        d("FalcoUtils").bumpODSMetrics(f.name, b, 1);
        if ((c = f.logCritical) != null ? c : !1)
          U.logCritical([f], function (a) {
            return g.markItem(h, a);
          });
        else {
          ((c = f.logImmediate) != null ? c : !1)
            ? U.logImmediately([f], function (a) {
                return g.markItem(h, a);
              })
            : U.log([f], function (a) {
                return g.markItem(h, a);
              });
        }
      };
      for (var e = 0; e < a.length; e++) c();
      return;
    }
    function P(a, b, c) {
      for (var e = 0; e < a.length; e++) {
        var f = a[e],
          g = f[0];
        f = f[1];
        d("FalcoUtils").bumpODSMetrics(f.item.name, c, 1);
        g.markItem(f, b);
      }
    }
    function ca(a) {
      return {
        events: a.map(function (a) {
          return {
            name: a.name,
            extra: a.extra,
            rate: a.policy.r,
            time: a.time / 1e3,
            tag: 0,
            tags: a.tags,
            shouldAddState: a.shouldAddState,
            identity: Q(a.identity),
            expTags: a.exptTags,
            sessionID: a.sessionId,
            deviceID: a.deviceId,
          };
        }),
      };
    }
    function da(a) {
      var b;
      a = {
        deviceId: (i || (i = c("AnalyticsCoreData"))).device_id,
        familyDeviceId: null,
        osBuildNumber: null,
        sessionId: a,
        appId: i.app_id,
        appVersion:
          (a = (i || (i = c("AnalyticsCoreData"))).app_version) != null
            ? a
            : null,
        bundleId: null,
        consentState: null,
        identity: null,
        pushPhase: i.push_phase,
      };
      ((b =
        (b = (i || (i = c("AnalyticsCoreData"))).stateful_events_list_for_br) ==
        null
          ? void 0
          : b.length) != null
        ? b
        : 0) > 0 &&
        (a.ambientState = (i || (i = c("AnalyticsCoreData"))).state_for_br);
      a.identity = Q(i.identity);
      return Object.freeze(a);
    }
    function Q(a) {
      if (x === 2 || x === 3) {
        var b = a == null ? void 0 : a.appScopedIdentity;
        if (b !== void 0)
          return { appScopedIdentity: { uid: b, identifier: b, claims: [] } };
      } else {
        b = a == null ? void 0 : a.fbIdentity;
        if (b !== void 0)
          return {
            facebookIdentity: {
              actorId: b.actorId,
              accountId: b.accountId,
              claims: [],
            },
          };
      }
      return null;
    }
    function R(a, b) {
      for (var e = 0; e < a.length; e++) {
        var f,
          g,
          h = a[e];
        f =
          ((g = {}),
          (g.e = h.extra),
          (g.r = h.policy.r),
          (g.d =
            (f = h.deviceId) != null
              ? f
              : (i || (i = c("AnalyticsCoreData"))).device_id),
          (g.s = (f = h.sessionId) != null ? f : d("WebSession").getId()),
          (g.t = h.time),
          g);
        h.privacyContext && (f.p = h.privacyContext);
        h.tags != null && (f.b = h.tags);
        g = h.identity;
        g && (f.id = g);
        c("Banzai").post(p + h.name, f, b);
      }
      S("event.uploaded", a);
    }
    function S(a, b) {
      for (var c = 0; c < b.length; c++) {
        var e = b[c];
        e.name !== ba && d("FalcoUtils").bumpODSMetrics(e.name, a, 1);
      }
    }
    function T(a, b) {
      var e =
        "falco.fabric.www." + (i || (i = c("AnalyticsCoreData"))).push_phase;
      (h || (h = d("ODS"))).bumpEntityKey(1344, e, a, b);
    }
    var U = {
      log: function (a, b) {
        S("event.info.banzai.log.upload_processing", a),
          R(a, c("Banzai").BASIC),
          b(!0);
      },
      logImmediately: function (a, b) {
        S("event.info.banzai.log_immediately.upload_processing", a),
          R(a, c("Banzai").VITAL),
          b(!0);
      },
      logCritical: function (a, b) {
        S("event.info.banzai.log_critical.upload_processing", a),
          R(a, { signal: !0, retry: !0 }),
          b(!0);
      },
    };
    function ea(a) {
      Y();
      var b = V(a, "banzai_data_loss", "log"),
        d = V(a, "banzai_data_loss", "logImmediately"),
        e = V(a, "banzai_data_loss", "logCritical"),
        f = V(a, "bladerunner_data_loss", ""),
        g = V(a, "bladerunner_data_loss", "logCritical");
      T("js.br_data_loss.posted." + a, 1);
      if (F && E)
        try {
          q.enqueue(function (b) {
            return b.log([f], function (b) {
              if (!b) {
                T("js.br.transport_failure." + a, 1);
                U.logCritical([g], function (b) {
                  T("js.br.failure_fallback_success_callback." + a, 1);
                });
                return;
              }
              T("js.br.success_callback." + a, 1);
            });
          });
        } catch (b) {
          T("js.br.error_enqueueing." + a, 1),
            U.logCritical([g], function (b) {
              T("js.br.enqueuing_fallback_success_callback." + a, 1);
            });
        }
      else
        E || T("js.br.failed." + a, 1),
          F || T("js.br.init_not_complete." + a, 1),
          U.logCritical([g], function (b) {
            T("js.br.init_fallback_success_callback." + a, 1);
          });
      R([b], c("Banzai").BASIC);
      R([d], c("Banzai").VITAL);
      R([e], { signal: !0, retry: !0 });
    }
    function V(a, b, d) {
      return {
        name: b,
        time: (j || (j = c("performanceAbsoluteNow")))(),
        policy: { r: 1 },
        extra: JSON.stringify({
          event_index: a,
          falco_js_connection_id: aa,
          logging_mode: d,
          logging_flow_flag: "original_flow",
        }),
      };
    }
    function W() {
      G + r < Date.now() && (ea(H), (G = Date.now()), H++);
    }
    function X() {
      window.setTimeout(function () {
        W(), H <= 40 && X();
      }, s);
    }
    function fa(a) {
      q.start(function (b) {
        return b({
          log: function (d, b) {
            S("event.info.streaming.queue_processing", d);
            var e = JSON.stringify(ca(d));
            a
              ? (i || (i = c("AnalyticsCoreData"))).enable_ack
                ? c("promiseDone")(
                    a.amendWithAck(e),
                    function (a) {
                      a
                        ? (S("event.streamed.with_ack", d),
                          S("event.uploaded", d))
                        : S(
                            "event.non_critical_failure.streaming.ack_failed",
                            d
                          ),
                        b(a);
                    },
                    function () {
                      S("event.non_critical_failure.streaming.ack_rejected", d),
                        b(!1);
                    }
                  )
                : (a.amendWithoutAck(e),
                  S("event.streamed.without_ack", d),
                  S("event.uploaded", d))
              : (S(
                  "event.non_critical_error.streaming.stream_not_available",
                  d
                ),
                b(!1));
          },
          logImmediately: function (b, a) {
            this.log(b, a);
          },
          logCritical: function (b, a) {
            this.log(b, a);
          },
        });
      });
    }
    function Y() {
      if (C) return;
      F = !1;
      if (!L()) return;
      l.onReady(function (a) {
        if (!a) {
          E = !1;
          q.start(function (a) {
            return a(U);
          });
          return;
        }
        a = a;
        var b = {
          onTermination: function (a) {
            a.message === "Stream closed"
              ? (q.stop(!0), (C = !1))
              : (d("FalcoUtils").bumpODSMetrics(
                  "",
                  "streaming.non_critical_failure.rejected",
                  1
                ),
                (E = !1),
                q.start(function (a) {
                  return a(U);
                }));
          },
          onFlowStatus: function () {},
        };
        c("promiseDone")(
          a
            .requestStream(
              { method: "Falco" },
              JSON.stringify(da(d("WebSession").getId())),
              b,
              { requestId: "" }
            )
            .then(function (b) {
              (a = b), fa(a), (F = !0), (I = n), (J = o);
            })
            ["catch"](function (a) {
              d("FalcoUtils").bumpODSMetrics(
                "",
                "streaming.non_critical_failure.failed",
                1
              ),
                q.stop(!0),
                (C = !1);
            })
        );
      });
      C = !0;
    }
    function Z(a) {
      var b,
        e = a.name;
      if (!L() || !E) return !1;
      if (
        u.has(e) ||
        (a.policy.s !== 1 &&
          ((b = (i || (i = c("AnalyticsCoreData"))).br_stateful_migration_on) !=
          null
            ? b
            : !1))
      ) {
        a.shouldAddState = !0;
        a.tags = d("FalcoUtils").xorBitmap(
          (b = a.tags) != null ? b : [0, 0],
          w
        );
        return !0;
      }
      if (
        x !== 1 &&
        (i || (i = c("AnalyticsCoreData")))
          .enable_non_fb_br_stateless_by_default !== !0 &&
        !v.has(e)
      )
        return !1;
      if (a.policy.s === 1) {
        a.tags = d("FalcoUtils").xorBitmap(
          (b = a.tags) != null ? b : [0, 0],
          w
        );
        return !0;
      }
      return !1;
    }
    function $(a) {
      if (a === "") return null;
      if (t.has(a)) return t.get(a);
      else {
        var b = { claim: "" },
          c = a.split("^#");
        if (c.length >= 4) {
          var d = c[0],
            e = c[1],
            f = c[2];
          c = c[3];
          f !== ""
            ? (b = { appScopedIdentity: f, claim: c })
            : d !== "" &&
              (b = { fbIdentity: { accountId: d, actorId: e }, claim: c });
          t.set(a, b);
        }
        return b;
      }
    }
    function a() {
      if (D) return;
      D = !0;
      c("PersistedQueue").setHandler("falco_queue_log", function (b) {
        var c,
          e = b.getQueueNameSuffix(),
          f = $(e);
        while ((c = b.dequeueItem()))
          (function (c) {
            Z(c.item)
              ? (d("FalcoUtils").bumpODSMetrics(
                  c.item.name,
                  "event.info.upload_method.streaming.log",
                  1
                ),
                Y(),
                A == null && (A = setTimeout(N, I)),
                f && !a(e) && (c.item.identity = f),
                M(b, c))
              : (f && (c.item.identity = f),
                U.log([c.item], function (a) {
                  return b.markItem(c, a);
                }));
          })(c);
      });
      c("PersistedQueue").setHandler("falco_queue_immediately", function (b) {
        var e,
          f = b.getQueueNameSuffix(),
          g = $(f);
        while ((e = b.dequeueItem()))
          (function (e) {
            Z(e.item)
              ? (d("FalcoUtils").bumpODSMetrics(
                  e.item.name,
                  "event.info.upload_method.streaming.log_immediately",
                  1
                ),
                Y(),
                (A == null || !B) &&
                  (clearTimeout(A), (A = setTimeout(N, J)), (B = !0)),
                (e.item.logImmediate = !0),
                g && !a(f) && (e.item.identity = g),
                M(b, e),
                c("PersistedQueue").isPersistenceAllowed() ||
                  (d("FalcoUtils").bumpODSMetrics(
                    e.item.name,
                    "event.info.streaming_no_persistence.log_immediately",
                    1
                  ),
                  N()))
              : (d("FalcoUtils").bumpODSMetrics(
                  e.item.name,
                  "event.info.upload_method.banzai.log_immediately",
                  1
                ),
                g && (e.item.identity = g),
                U.logImmediately([e.item], function (a) {
                  return b.markItem(e, a);
                }));
          })(e);
      });
      c("PersistedQueue").setHandler("falco_queue_critical", function (b) {
        var c,
          e = b.getQueueNameSuffix(),
          f = $(e);
        while ((c = b.dequeueItem()))
          (function (c) {
            var g = c.item;
            Z(g)
              ? (d("FalcoUtils").bumpODSMetrics(
                  c.item.name,
                  "event.info.upload_method.streaming.log_critical",
                  1
                ),
                Y(),
                (g.logCritical = !0),
                !F
                  ? (f && (g.identity = f),
                    O(
                      [[b, c]],
                      "event.non_critical_failure.streaming_init_not_complete.log_critical"
                    ))
                  : (f && !a(e) && (g.identity = f),
                    q.enqueue(function (a) {
                      return a.logCritical([g], function (a) {
                        if (!a) {
                          !g.identity && f && (g.identity = f);
                          O(
                            [[b, c]],
                            "event.info.banzai_fallback.log_critical"
                          );
                          return;
                        }
                        P([[b, c]], a, "event.uploaded");
                      });
                    })))
              : (f && (g.identity = f),
                d("FalcoUtils").bumpODSMetrics(
                  c.item.name,
                  "event.info.upload_method.banzai.log_critical",
                  1
                ),
                U.logCritical([g], function (a) {
                  return b.markItem(c, a);
                }));
          })(c);
      });
      (i || (i = c("AnalyticsCoreData"))).enable_dataloss_timer &&
        (Y(), W(), X());
      function a(a) {
        try {
          var b = d("FalcoUtils").identityToString(
            (i || (i = c("AnalyticsCoreData"))).identity
          );
          return a === b;
        } catch (a) {
          (h || (h = d("ODS"))).bumpEntityKey(
            1344,
            "js.br.identity.check",
            "exception.when.comparing.with.current.user.identity",
            1
          );
          return !0;
        }
      }
    }
    g.attach = a;
  },
  98
);
__d(
  "NavigationClickPointHandler",
  ["Event", "ScriptPath", "collectDataAttributes"],
  function (a, b, c, d, e, f, g) {
    function h(a) {
      var b = null,
        d = c("collectDataAttributes")(a, ["ft"], ["href", "data-click"]),
        e = d.normal.href;
      if (!e || e === "#") return !1;
      e = d.normal["data-click"];
      b === null && e && (b = { click: e });
      e = d.ft.tn;
      b === null && e && (b = { tn: e });
      if (b === null && a.getAttribute) {
        d = a.getAttribute("class");
        d != null && (b = { class: d });
      }
      return b;
    }
    function a(a) {
      a = a.target || a.srcElement;
      a = h(a);
      typeof a != "boolean" && d("ScriptPath").setClickPointInfo(a);
    }
    document.documentElement !== null &&
      c("Event").listen(document.documentElement, { click: a });
    g.getClickPointInfo = h;
  },
  98
);
__d(
  "NoscriptOverride",
  ["Cookie", "goURI"],
  function (a, b, c, d, e, f) {
    a = {
      redirectToJSPage: function (a) {
        b("Cookie").clear("noscript"), b("goURI")(a);
      },
    };
    e.exports = a;
  },
  null
);
__d(
  "QuickMarkersBlue",
  ["QuickMarkersSrcFalcoEvent", "performanceNow"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h, i, j, k;
    function a(a) {
      (i = a.event_id), (j = a.script_path), (k = a.weight), l("ClientInit");
    }
    function l(a) {
      if (i == null) return;
      var b = {
        event_id: i,
        marker_id: a,
        script_path: j,
        marker_page_time: (h || (h = c("performanceNow")))(),
        weight: k,
      };
      c("QuickMarkersSrcFalcoEvent").logImmediately(function () {
        return b;
      });
    }
    g.startNewEvent = a;
    g.mark = l;
  },
  98
);
__d(
  "WebBlueTimeSpentNavigationFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1829319");
    b = d("FalcoLoggerInternal").create("web_blue_time_spent_navigation", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "ScriptPathLogger",
  [
    "Banzai",
    "LogHistory",
    "ScriptPath",
    "URI",
    "WebBlueTimeSpentNavigationFalcoEvent",
    "WebSession",
    "isInIframe",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    f = "script_path_change";
    var i = { scriptPath: null, categoryToken: null, extraData: {} },
      j = !1,
      k = "imp_id";
    function l(a) {
      var b = (h || (h = c("URI"))).getNextURI
          ? (h || (h = c("URI"))).getNextURI()
          : new (h || (h = c("URI")))(window.location.href),
        d = b.getQueryData();
      b = b.getPath();
      b.endsWith("/") && (b = b.substr(0, b.length - 1));
      d.comment_id &&
        (a.extra_data = babelHelpers["extends"]({}, a.extra_data, {
          graphql_comment_id: d.comment_id,
        }));
      var e = m(b, d);
      if (e) {
        a.content_id = e;
        return;
      }
      e = n(b);
      if (e !== "") {
        a.dest_topic_feed = e;
        return;
      }
      if (o(b)) {
        e = d.queue_id;
        e && (a.dest_srt_queue_id = e);
        b = d.job_in_review;
        b && (a.dest_srt_reviewing_job_id = b);
        return;
      }
    }
    function m(a, b) {
      if (b.story_fbid) return b.story_fbid;
      if (b.fbid) return b.fbid;
      if (b.view === "permalink" && b.id) return b.id;
      b = /\/(posts|videos|notes|groups\/.*\/permalink)\//;
      var c = /^[0-9]+$/;
      if (b.test(a)) {
        b = a.split("/");
        a = b[b.length - 1];
        if (c.test(a)) return a;
      }
      return "";
    }
    function n(a) {
      if (!a || a.search("/feed/topics/") == -1) return "";
      a = a.split("/");
      return a[a.length - 1];
    }
    function o(a) {
      return !!a && a.search("/intern/review/") !== -1;
    }
    function p(a, b, e, f) {
      d("WebSession").extend();
      if (!j || c("isInIframe")()) return;
      var g = {
        source_path: a.scriptPath,
        source_token: a.categoryToken,
        dest_path: b.scriptPath,
        dest_token: b.categoryToken,
        impression_id: b.extraData ? b.extraData.imp_id : null,
        cause: e,
        sid_raw: d("WebSession").getId(),
      };
      e = e === "unload";
      e || l(g);
      if (f != null) {
        var h = f.snowlift_content_id;
        !e && h != null && ((g.content_id = h), delete f.snowlift_content_id);
        g.extra_data = babelHelpers["extends"]({}, g.extra_data, f);
      }
      a.scriptPath === null && (g.referrer = document.referrer);
      e = d("ScriptPath").getClickPointInfo();
      e && (g.click_point_info = e);
      if (a.extraData)
        for (h in a.extraData) h != k && (g["source_" + h] = a.extraData[h]);
      if (b.extraData)
        for (f in b.extraData) f != k && (g["dest_" + f] = b.extraData[f]);
      a.topViewEndpoint && (g.source_endpoint = a.topViewEndpoint);
      b.topViewEndpoint && (g.dest_endpoint = b.topViewEndpoint);
      a.restored && (g.source_restored = !0);
      c("WebBlueTimeSpentNavigationFalcoEvent").logImmediately(function () {
        return { json_data: JSON.stringify(g) };
      });
      d("ScriptPath").setClickPointInfo(null);
    }
    function q() {
      p(
        d("ScriptPath").getSourcePageInfo() || i,
        d("ScriptPath").getPageInfo() || i,
        "load"
      );
    }
    function r(a, b, c) {
      p(a, b, "transition", c);
    }
    function a() {
      p(d("ScriptPath").getPageInfo() || i, i, "unload"),
        d("ScriptPath").shutdown();
    }
    var s = d("ScriptPath").subscribe(function (a) {
      if (j) {
        var b = a.source,
          c = a.dest,
          d = a.cause;
        a = a.extraData;
        d ? p(b || i, c || i, d, a) : b ? r(b, c || i, a) : q();
      }
    });
    c("Banzai").subscribe(c("Banzai").SHUTDOWN, a);
    function b() {
      (j = !0), d("ScriptPath").getPageInfo() && q();
    }
    function e() {
      (j = !1), s.remove();
    }
    g.BANZAI_LOGGING_ROUTE = f;
    g.startLogging = b;
    g.stopLogging = e;
  },
  98
);
__d(
  "ServiceWorkerURLCleaner",
  [],
  function (a, b, c, d, e, f) {
    var g = /sw_fnr_id=\d+&?/,
      h = /fnr_t=\d+&?/,
      i = !1,
      j = !1;
    function a() {
      if (i) return j;
      i = !0;
      if (location.search && g.test(location.search)) {
        j = !0;
        if (history !== void 0 && typeof history.replaceState === "function") {
          var a = location
            .toString()
            .replace(g, "")
            .replace(h, "")
            .replace(/\?$/, "");
          history.replaceState({}, document.title, a);
        }
      }
      return j;
    }
    f.removeRedirectID = a;
  },
  66
);
__d(
  "StringTransformations",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    a = {
      unicodeEscape: function (a) {
        return a.replace(/[^A-Za-z0-9\-\.\:\_\$\/\+\=]/g, function (a) {
          a = a.charCodeAt(0).toString(16);
          return "\\u" + ("0000" + a.toUpperCase()).slice(-4);
        });
      },
      unicodeUnescape: function (a) {
        return a.replace(/(\\u[0-9A-Fa-f]{4})/g, function (a) {
          return String.fromCharCode(parseInt(a.slice(2), 16));
        });
      },
    };
    f["default"] = a;
  },
  66
);
__d(
  "TimeSpentArray",
  [
    "Banzai",
    "TimeSlice",
    "clearTimeout",
    "pageID",
    "setTimeoutAcrossTransitions",
  ],
  function (a, b, c, d, e, f, g) {
    var h = 2,
      i = h * 32,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u = {},
      v,
      w = null;
    function x() {
      return { timeoutDelayMap: u, nextDelay: v, timeoutInSeconds: n };
    }
    function y() {
      if (j) {
        var a = Date.now();
        a > p && (r = Math.min(i, Math.ceil(a / 1e3 - o)));
        a = D();
        a && j(a, v);
      }
      C();
    }
    function z() {
      A(),
        (m = c("setTimeoutAcrossTransitions")(
          c("TimeSlice").guard(y, "TimeSpentArray Timeout", {
            propagationType: c("TimeSlice").PropagationType.ORPHAN,
          }),
          n * 1e3
        ));
    }
    function A() {
      m && (c("clearTimeout")(m), (m = null));
    }
    function B(a) {
      o = a;
      p = o * 1e3;
      q = [1];
      for (a = 1; a < h; a++) q.push(0);
      r = 1;
      s += 1;
      t += 1;
      a = t.toString() + "_delay";
      v = u[a];
      v === void 0 && (v = u.delay);
      a = t.toString() + "_timeout";
      a = u[a];
      a === void 0 && (a = u.timeout);
      a = Math.min(a, i);
      n = a || i;
      w = l ? l() : null;
      z();
    }
    function C() {
      A(), (q = null);
    }
    function D() {
      return !q
        ? null
        : {
            tos_id: c("pageID"),
            start_time: o,
            tos_array: q.slice(0),
            tos_len: r,
            tos_seq: t,
            tos_cum: s,
            start_endpoint: w,
          };
    }
    function E(a) {
      if (a >= p && a - p < 1e3) return;
      k && k(a);
      F(Math.floor(a / 1e3));
    }
    function F(a) {
      var b = a - o;
      (b < 0 || b >= i) && y();
      !q
        ? B(a)
        : ((q[b >> 5] |= 1 << (b & 31)), (r = b + 1), (s += 1), (p = a * 1e3));
    }
    function a(a, b, d, e, f) {
      (s = 0),
        (t = -1),
        (j = a),
        (k = e),
        (l = f),
        typeof b === "object" && b !== null ? (u = b) : (u = {}),
        B(
          Math.floor(
            (d === void 0 || d === null || d === 0 ? Date.now() : d) / 1e3
          )
        ),
        c("Banzai").subscribe(c("Banzai").SHUTDOWN, y);
    }
    function b(a) {
      E(a);
    }
    function d() {
      return D();
    }
    function e() {
      y();
    }
    function f() {
      C();
    }
    function G() {
      return x();
    }
    g.init = a;
    g.update = b;
    g.get = d;
    g.ship = e;
    g.reset = f;
    g.testState = G;
  },
  98
);
__d(
  "TimeSpentImmediateActiveSecondsLogger",
  ["cr:844180"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = b("cr:844180");
  },
  98
);
__d(
  "WebTimeSpentBitArrayFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1829320");
    b = d("FalcoLoggerInternal").create("web_time_spent_bit_array", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "TimeSpentBitArrayLogger",
  [
    "Arbiter",
    "Env",
    "LogHistory",
    "ODS",
    "TimeSpentArray",
    "TimeSpentConfig",
    "TimeSpentImmediateActiveSecondsLogger",
    "UserActivity",
    "WebSession",
    "WebTimeSpentBitArrayFalcoEvent",
    "cr:1187159",
    "isInIframe",
  ],
  function (a, b, c, d, e, f, g) {
    var h,
      i,
      j = "";
    function k(a) {
      a = l();
      a !== j && (b("TimeSpentArray").ship(), (j = a));
    }
    function l() {
      b("WebSession").extend();
      return b("WebSession").getId();
    }
    function m(a, d) {
      (a.sid_raw = j),
        b("Arbiter").inform(
          "timespent/tosbitdataposted",
          babelHelpers["extends"]({}, a)
        ),
        c("WebTimeSpentBitArrayFalcoEvent").logImmediately(function () {
          return {
            sid_raw: a.sid_raw,
            start_time: a.start_time,
            tos_array: a.tos_array,
            tos_cum: a.tos_cum,
            tos_id: a.tos_id,
            tos_len: a.tos_len,
            tos_seq: a.tos_seq,
          };
        });
    }
    f.exports = {
      init: function (a) {
        if (b("isInIframe")() && !(h || (h = b("Env"))).isCQuick) return;
        if ((h || (h = b("Env"))).isCQuick) {
          b("cr:1187159") != null
            ? b("UserActivity").subscribe(function (a, c) {
                b("cr:1187159").sendMessage({
                  compatAction: "update_time_spent_bit_array_from_boc",
                  eventTimeInMs: c.last_inform,
                });
              })
            : (i || (i = b("ODS"))).bumpEntityKey(
                223,
                "core_metrics.time_spent.www",
                "blue_on_comet_without_compat_broker"
              );
          return;
        }
        j = l();
        b("UserActivity").subscribe(function (a, c) {
          a = c.last_inform;
          b("TimeSpentArray").update(a);
          b("TimeSpentImmediateActiveSecondsLogger").maybeReportActiveSecond(a);
        });
        a = Date.now();
        b("TimeSpentArray").init(m, b("TimeSpentConfig"), a, k);
        b("TimeSpentImmediateActiveSecondsLogger").maybeReportActiveSecond(a);
        (i || (i = b("ODS"))).bumpEntityKey(
          2966,
          "ms.time_spent.qa.www",
          "time_spent.bits.js_initialized"
        );
      },
    };
  },
  34
);
__d(
  "WebImmediateActiveSecondsFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1843988");
    b = d("FalcoLoggerInternal").create("web_immediate_active_seconds", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "TimeSpentImmediateActiveSecondsLoggerBlue",
  [
    "ImmediateActiveSecondsConfig",
    "ScriptPath",
    "WebImmediateActiveSecondsFalcoEvent",
  ],
  function (a, b, c, d, e, f, g) {
    var h = 0;
    function i(a) {
      if (c("ImmediateActiveSecondsConfig").sampling_rate <= 0) return !1;
      a = Math.floor(a / 1e3) % c("ImmediateActiveSecondsConfig").sampling_rate;
      return a === c("ImmediateActiveSecondsConfig").ias_bucket;
    }
    function a(a) {
      if (a >= h && a - h < 1e3) return;
      i(a) &&
        c("WebImmediateActiveSecondsFalcoEvent").logImmediately(function () {
          return {
            activity_time_ms: a,
            last_activity_time_ms: h,
            script_path: c("ScriptPath").getTopViewEndpoint(),
          };
        });
      h = Math.floor(a / 1e3) * 1e3;
    }
    f.exports = { maybeReportActiveSecond: a };
  },
  34
);
__d(
  "TransportSelectingClientSingletonConditional",
  ["cr:710"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = b("cr:710");
  },
  98
);
__d(
  "WebPerfDeviceInfoLogFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1871697");
    b = d("FalcoLoggerInternal").create("web_perf_device_info_log", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "XDeviceClassRealtimeControllerRouteBuilder",
  ["jsRouteBuilder"],
  function (a, b, c, d, e, f, g) {
    a = c("jsRouteBuilder")(
      "/web_perf/get_perf_level/",
      Object.freeze({}),
      void 0
    );
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "WebDevicePerfInfoLogging",
  [
    "AsyncTypedRequest",
    "JSScheduler",
    "Promise",
    "WebDevicePerfInfoData",
    "WebPerfDeviceInfoLogFalcoEvent",
    "XDeviceClassRealtimeControllerRouteBuilder",
    "asyncToGeneratorRuntime",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h, i;
    function j(a) {
      var b = document.createElement("canvas");
      b = b.getContext("webgl") || b.getContext("experimental-webgl");
      if (!b) return;
      var c = b.getExtension("WEBGL_debug_renderer_info");
      if (!c) return;
      var d = b.getParameter(c.UNMASKED_RENDERER_WEBGL);
      b = b.getParameter(c.UNMASKED_VENDOR_WEBGL);
      a.gpu_vendor = b;
      a.gpu_renderer = d;
    }
    function k() {
      var a = window.navigator,
        b = {};
      a &&
        a.hardwareConcurrency !== void 0 &&
        (b.cpu_cores = a.hardwareConcurrency);
      a && a.deviceMemory !== void 0 && (b.ram = a.deviceMemory);
      c("WebDevicePerfInfoData").needsFullUpdate && j(b);
      return b;
    }
    function l() {
      var a = k();
      c("WebPerfDeviceInfoLogFalcoEvent").log(function () {
        var b;
        return {
          cpu_cores: (b = a.cpu_cores) != null ? b : null,
          ram: (b = a.ram) != null ? b : null,
          gpu_renderer: (b = a.gpu_renderer) != null ? b : null,
          gpu_vendor: (b = a.gpu_vendor) != null ? b : null,
        };
      });
    }
    function m() {
      return n.apply(this, arguments);
    }
    function n() {
      n = b("asyncToGeneratorRuntime").asyncToGenerator(function* () {
        var a = k();
        a = yield new (c("AsyncTypedRequest"))(
          c("XDeviceClassRealtimeControllerRouteBuilder").buildURL({})
        )
          .setData(a)
          .promisePayload();
        return a.devicePerfClassLevel;
      });
      return n.apply(this, arguments);
    }
    function a() {
      (c("WebDevicePerfInfoData").needsFullUpdate ||
        c("WebDevicePerfInfoData").needsPartialUpdate) &&
        (i || (i = d("JSScheduler"))).scheduleSpeculativeCallback(l);
    }
    function e() {
      return new (h || (h = b("Promise")))(function (a, b) {
        c("WebDevicePerfInfoData").needsFullUpdate ||
        c("WebDevicePerfInfoData").needsPartialUpdate
          ? (i || (i = d("JSScheduler"))).scheduleSpeculativeCallback(
              function () {
                m().then(a)["catch"](b);
              }
            )
          : a();
      });
    }
    g.doLog = a;
    g.doLogPromise = e;
  },
  98
);
__d(
  "WebStorageCleanupReason",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = null;
    function a() {
      return g;
    }
    function b(a) {
      g = a;
    }
    f.getLastCleanupReason = a;
    f.setLastCleanupReason = b;
  },
  66
);
__d(
  "WebStorageMonster",
  [
    "AsyncRequest",
    "CacheStorage",
    "Event",
    "ExecutionEnvironment",
    "NetworkStatus",
    "StringTransformations",
    "UserActivity",
    "WebStorage",
    "WebStorageCleanupReason",
    "WebStorageMonsterLoggingURI",
    "ifRequired",
    "isEmpty",
    "setTimeoutAcrossTransitions",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k = 1e4,
      l = 5,
      m = !1;
    function n(a) {
      var b = {};
      for (var d in a) {
        var e = a.getItem(d),
          f = c("StringTransformations").unicodeEscape(d);
        typeof e === "string" && (b[f] = e.length);
      }
      return b;
    }
    function o(a) {
      var b = (h || (h = c("WebStorage"))).getLocalStorage();
      if (!b || a == null || !a.keys) return;
      r._getLocalStorageKeys().forEach(function (c) {
        a.keys.includes(c) && b.removeItem(c);
      });
    }
    function p(a) {
      var b = (h || (h = c("WebStorage"))).getLocalStorage();
      b &&
        r._getLocalStorageKeys().forEach(function (c) {
          a.some(function (a) {
            return new RegExp(a).test(c);
          }) || b.removeItem(c);
        });
    }
    function q(a, b) {
      a === void 0 && (a = !1);
      b === void 0 && (b = k);
      if (c("UserActivity").isActive(b)) {
        var d = Math.max(k, Math.floor(b / l));
        c("setTimeoutAcrossTransitions")(function () {
          q(a, d);
        }, d);
      } else {
        r.cleanNow(a);
        var e = b * l;
        c("setTimeoutAcrossTransitions")(function () {
          q(a, e);
        }, e);
      }
    }
    var r = {
      _getLocalStorageKeys: function () {
        var a = (h || (h = c("WebStorage"))).getLocalStorage();
        return a ? Object.keys(a) : [];
      },
      cleanNow: function (a) {
        a === void 0 && (a = !1);
        var b = Date.now(),
          d = {},
          e = (h || (h = c("WebStorage"))).getLocalStorage();
        e && (d.local_storage = n(e));
        e = h.getSessionStorage();
        e && (d.session_storage = n(e));
        e = !(i || (i = c("isEmpty")))(d);
        var f = Date.now();
        d.logtime = f - b;
        if (e) {
          var g,
            j = c("WebStorageMonsterLoggingURI").uri;
          if (j === null) return null;
          var k = function () {
            new (c("AsyncRequest"))(j)
              .setData(d)
              .setHandler(function (b) {
                b = b.getPayload();
                b &&
                  b.keys &&
                  (b.keys = b.keys.map(
                    c("StringTransformations").unicodeUnescape
                  ));
                a || o(b);
                c("NetworkStatus").reportSuccess();
              })
              .setErrorHandler(function () {
                c("NetworkStatus").reportError();
              })
              .setOption("retries", 2)
              .send();
          };
          if (c("NetworkStatus").isOnline()) k();
          else {
            f = function (a) {
              a = a.online;
              a && (k(), g.remove());
            };
            g = c("NetworkStatus").onChange(f);
          }
        }
      },
      cleanOnLogout: function (a, b) {
        d("WebStorageCleanupReason").setLastCleanupReason(b);
        c("CacheStorage").disablePersistentWrites();
        c("ifRequired")("WebAsyncStorage", function (a) {
          a.disablePersistentWrites();
        });
        a ? p(a) : p([]);
        b = (h || (h = c("WebStorage"))).getSessionStorage();
        b && b.clear();
        c("ifRequired")("WebAsyncStorage", function (a) {
          a.clear(function () {});
        });
      },
      registerLogoutForm: function (a, b) {
        c("Event").listen(a, "submit", function (a) {
          r.cleanOnLogout(b, "WebStorageMonster.registerLogoutForm");
        });
      },
      schedule: function (a) {
        a === void 0 && (a = !1);
        if (m || !(j || (j = c("ExecutionEnvironment"))).isInBrowser) return;
        m = !0;
        q(a);
      },
    };
    a = r;
    g["default"] = a;
  },
  98
);
