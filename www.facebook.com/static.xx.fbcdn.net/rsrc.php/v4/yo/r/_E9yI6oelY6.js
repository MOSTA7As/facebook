/*FB_PKG_DELIM*/

__d(
  "CurrentLocale",
  ["IntlCurrentLocale"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = {
      get: function () {
        return c("IntlCurrentLocale").code;
      },
    };
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "PerfFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1744178");
    b = d("FalcoLoggerInternal").create("perf", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "PerfXSharedFields",
  ["CurrentLocale", "Locale", "SiteData"],
  function (a, b, c, d, e, f, g) {
    var h = typeof window !== "undefined" ? window : self,
      i = {
        addCommonValues: function (a) {
          var b = h == null ? void 0 : h.navigator;
          try {
            b &&
              typeof b.hardwareConcurrency === "number" &&
              (a.num_cores = Math.floor(b.hardwareConcurrency)),
              b && b.deviceMemory && (a.ram_gb = b.deviceMemory),
              b &&
                b.connection &&
                (typeof b.connection.downlink === "number" &&
                  (a.downlink_megabits = b.connection.downlink),
                typeof b.connection.effectiveType === "string" &&
                  (a.effective_connection_type = b.connection.effectiveType),
                typeof b.connection.rtt === "number" &&
                  (a.rtt_ms = b.connection.rtt));
          } catch (a) {
            if (a.message !== "can't access dead object") throw a;
          }
          a.client_push_phase = c("SiteData").push_phase;
          a.client_revision = c("SiteData").client_revision;
          c("SiteData").server_revision != null &&
            (a.server_revision = c("SiteData").server_revision);
          a.locale = c("CurrentLocale").get();
          a.isRTL = Number(c("Locale").isRTL());
          return a;
        },
        getCommonData: function () {
          var a = {};
          i.addCommonValues(a);
          return a;
        },
      };
    a = i;
    g["default"] = a;
  },
  98
);
__d(
  "QPLEvent",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return a.i;
    }
    function b(a) {
      return (a = a.r) != null ? a : 0;
    }
    function c(a) {
      return (a = a.m) != null ? a : 1;
    }
    f.getMarkerId = a;
    f.getSampleRate = b;
    f.getSamplingMethod = c;
  },
  66
);
__d(
  "QPLTimestamp",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function g(a) {
      if (a === 0) return "0";
      a = a.toFixed(6).split(".", 2);
      var b = a[0];
      a = a[1];
      return b === "0" ? a.replace(/^0+/, "") : b + a;
    }
    function a(a, b) {
      b = b - a;
      return g(b);
    }
    f.timestampToSerializedNanoseconds = g;
    f.calculateDurationAsNanoseconds = a;
  },
  66
);
__d(
  "crc32",
  [],
  function (a, b, c, d, e, f) {
    function b(a) {
      var b = -1;
      for (var c = 0, d = a.length; c < d; c++)
        b = (b >>> 8) ^ g[(b ^ a.charCodeAt(c)) & 255];
      return ~b;
    }
    var g = [
      0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685,
      2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995,
      2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648,
      2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990,
      1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755,
      2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145,
      1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
      2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980,
      1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
      3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527,
      1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772,
      4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290,
      251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719,
      3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
      453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202,
      4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960,
      984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733,
      3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467,
      855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048,
      3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
      702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
      3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945,
      2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430,
      2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580,
      2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225,
      1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143,
      2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732,
      1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
      2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135,
      1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109,
      3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
      1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920,
      3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877,
      83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603,
      3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
      534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934,
      4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795,
      376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105,
      3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
      936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108,
      3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449,
      601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
      3272380065, 1510334235, 755167117,
    ];
    a.Int32Array !== void 0 && (g = new Int32Array(g));
    f["default"] = b;
  },
  66
);
__d(
  "QPLUtils",
  ["crc32"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function h(a) {
      return c("crc32")(a) >>> 0;
    }
    function a(a) {
      return a != null ? h(a) : 0;
    }
    g.unsignedCrc32 = h;
    g.deriveInstanceKey = a;
  },
  98
);
__d(
  "QuickPerformanceLoggerTypes",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    a = 1;
    b = 3;
    f.EVENT_BASED_SAMPLING = a;
    f.USER_BASED_SAMPLING = b;
  },
  66
);
__d(
  "QPLCore",
  [
    "QPLEvent",
    "QPLTimestamp",
    "QPLUtils",
    "QuickPerformanceLoggerTypes",
    "gkx",
    "uuidv4",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    function i(a, b, c, d) {
      var e = b[a];
      if (!e || Object.entries(e).length === 0) return null;
      var f = {};
      Object.keys(e).forEach(function (a) {
        var b = e[a];
        b == null || b.length === 0
          ? delete e[a]
          : d
          ? (f[a] = d(b))
          : (f[a] = b);
      });
      return (b = {}), (b[a] = babelHelpers["extends"]({}, c && c[a], f)), b;
    }
    function j(a, b) {
      if (a == null) return b;
      var c = babelHelpers["extends"](
        {},
        b,
        i("string", a, b),
        i("int", a, b, Math.trunc),
        i("double", a, b),
        i("bool", a, b),
        i("string_array", a, b),
        i("int_array", a, b, function (a) {
          return a.map(Math.trunc);
        }),
        i("double_array", a, b),
        i("bool_array", a, b)
      );
      Object.keys(c).forEach(function (a) {
        var b = c[a];
        (b == null || Object.entries(b).length === 0) && delete c[a];
      });
      return Object.entries(c).length !== 0 ? c : null;
    }
    function k(a, b) {
      var c = {};
      o.isMarkerTracked(b) && (c.tracked_for_loss = !0);
      typeof b.absoluteTimeOrigin === "number" &&
        (c.absolute_time_origin_ns = d(
          "QPLTimestamp"
        ).timestampToSerializedNanoseconds(b.absoluteTimeOrigin));
      b = babelHelpers["extends"]({}, a, c);
      return b;
    }
    function l(a, b) {
      if (!b) return a;
      var c = {};
      b.string && (c.annotations = b.string);
      b["int"] && (c.annotations_int = b["int"]);
      b["double"] && (c.annotations_double = b["double"]);
      b.bool && (c.annotations_bool = b.bool);
      b.string_array && (c.annotations_string_array = b.string_array);
      b.int_array && (c.annotations_int_array = b.int_array);
      b.double_array && (c.annotations_double_array = b.double_array);
      b.bool_array && (c.annotations_bool_array = b.bool_array);
      return babelHelpers["extends"]({}, a, c);
    }
    var m = new Map([
      [
        d("QuickPerformanceLoggerTypes").EVENT_BASED_SAMPLING,
        "random_sampling",
      ],
      [d("QuickPerformanceLoggerTypes").USER_BASED_SAMPLING, "per_user"],
    ]);
    function n(a, b) {
      if (a === 0) return !1;
      if (a <= 1) return !0;
      return typeof b === "string"
        ? d("QPLUtils").unsignedCrc32(b) % a === 0
        : Math.random() * a <= 1;
    }
    var o = (function () {
      function a(a) {
        this.$2 = 1;
        this.$3 = 100;
        this.$4 = new Map();
        this.$5 = new Map();
        this.$6 = null;
        this.$8 = new Map();
        this.activeMarkers = new Map();
        this.$1 = a;
        this.$7 = a.logger;
        this.$5 = (a = a.listenersWithMarker) != null ? a : new Map();
        this.$9 = new Map();
      }
      var b = a.prototype;
      b.getMarker = function (a, b) {
        a = this.$10((h || (h = d("QPLEvent"))).getMarkerId(a));
        if (!a) return null;
        a = a.get(b);
        return !a ? null : a;
      };
      b.isMarkerOn = function (a, b) {
        b === void 0 && (b = 0);
        a = this.$10((h || (h = d("QPLEvent"))).getMarkerId(a));
        if (!a) return !1;
        a = a.get(b);
        return !!a;
      };
      a.isMarkerTracked = function (a) {
        return a.trackedForLoss === !0 || a.type === 2;
      };
      b.$10 = function (a) {
        return this.activeMarkers.get(a);
      };
      b.addMarker = function (a, b, c) {
        var d = this.activeMarkers.get(a);
        d || ((d = new Map()), this.activeMarkers.set(a, d));
        d.set(b, c);
      };
      b.deleteMarker = function (a, b) {
        var c;
        (c = this.activeMarkers.get(a)) == null ? void 0 : c["delete"](b);
        this.$11(a, b);
      };
      b.markerStart = function (b, c, e, f) {
        c === void 0 && (c = 0);
        e === void 0 && (e = this.currentTimestamp());
        f = f === void 0 ? {} : f;
        var g = f.cancelExisting;
        g = g === void 0 ? !1 : g;
        var i = f.cancelOnUnload;
        i = i === void 0 ? !1 : i;
        var j = f.trackedForLoss;
        j = j === void 0 ? !1 : j;
        var k = f.type;
        k = k === void 0 ? 1 : k;
        var l = f.samplingBasis;
        l = l === void 0 ? null : l;
        var m = f.qplInternalDoNotUseAbsoluteTimeOrigin,
          n = f.timeoutMS;
        n = n === void 0 ? null : n;
        f = f.onMarkerTimeout__DoNotUse;
        f = f === void 0 ? null : f;
        var o = this.getMarker(b, c);
        if (o) {
          o = Math.round(e - o.timestamp);
          g &&
            (this.markerAnnotate(
              b,
              {
                string: { cancelType: "DUPLICATE_EVENT" },
                int: { time_between_markers_ms: o },
              },
              { instanceKey: c }
            ),
            this.markerEnd(b, 4, c, e));
        }
        g = this.$12(b, l);
        o = g[0];
        l = g[1];
        g = g[2];
        var p = this.$1.adsManagerInstanceIDGenerator
            ? this.$1.adsManagerInstanceIDGenerator(b)
            : null,
          q = {
            event: b,
            passesSampling: o,
            timestamp: e,
            sampleRate: l,
            samplingMethod: g,
            points: [],
            cancelOnUnload: i,
            trackedForLoss: j,
            type: k,
            timeoutMS: n,
            adsManagerInstanceID: p,
          };
        typeof m === "number" && (q.absoluteTimeOrigin = m);
        this.$4.forEach(function (a) {
          a.onMarkerStart && a.onMarkerStart(b, c, e);
        });
        this.$5.forEach(function (a) {
          a.onMarkerStartWithMarker(b, c, e, q);
        });
        o &&
          (this.addMarker((h || (h = d("QPLEvent"))).getMarkerId(b), c, q),
          n != null && this.$13(b, c, n, f));
        o &&
          a.isMarkerTracked(q) &&
          this.$14({
            marker_id: 27787271,
            action_id: 51,
            sample_rate: 1,
            annotations_int: {
              tracked_marker_id: (h || (h = d("QPLEvent"))).getMarkerId(b),
            },
            marker_type: 1,
          });
        o &&
          this.$4.forEach(function (a) {
            a.onMarkerStarted && a.onMarkerStarted(b, c, e);
          });
      };
      b.$15 = function (a, b) {
        var c = this.$9.get(a);
        c == null ? void 0 : c["delete"](b);
        (c == null ? void 0 : c.size) === 0 && this.$9["delete"](a);
      };
      b.$16 = function (a, b, c) {
        this.$9.has(a) || this.$9.set(a, new Map());
        a = this.$9.get(a);
        a == null ? void 0 : a.set(b, c);
      };
      b.$11 = function (a, b) {
        var c, d;
        c = (c = this.$9.get(a)) == null ? void 0 : c.get(b);
        if (!c) return;
        if (
          !((d = this.$1.runtimeAbstractionLayer) == null
            ? void 0
            : d.clearTimeout)
        )
          return;
        this.$1.runtimeAbstractionLayer.clearTimeout(c);
        this.$15(a, b);
      };
      b.$13 = function (a, b, c, e) {
        var f = this,
          g = (h || (h = d("QPLEvent"))).getMarkerId(a);
        try {
          var i;
          this.$11(g, b);
          if (
            !((i = this.$1.runtimeAbstractionLayer) == null
              ? void 0
              : i.setTimeout)
          )
            return;
          i =
            (i = this.$1.runtimeAbstractionLayer) == null
              ? void 0
              : i.setTimeout(function () {
                  e != null && e(a, b),
                    f.$4.forEach(function (c) {
                      c.onTimeoutEvent != null &&
                        c.onTimeoutEvent({ event: a, instanceKey: b });
                    }),
                    f.$15(g, b),
                    f.markerEnd(a, 113, b);
                }, c);
          this.$16(g, b, i);
        } catch (a) {}
      };
      b.markerAnnotate = function (a, b, c) {
        c = c === void 0 ? {} : c;
        c = c.instanceKey;
        var d = c === void 0 ? 0 : c;
        this.$4.forEach(function (c) {
          Object.keys(b).forEach(function (e) {
            var f = b[e];
            if (!f) return;
            Object.keys(f).forEach(function (b) {
              c.onAnnotation && c.onAnnotation(a, d, b, f[b]);
            });
          });
        });
        c = this.getMarker(a, d);
        if (!c) return;
        c.annotations = j(b, c.annotations);
      };
      b.markerPoint = function (a, b, c) {
        c = c === void 0 ? {} : c;
        var d = c.instanceKey,
          e = d === void 0 ? 0 : d,
          f = c.data;
        d = c.timestamp;
        var g = d === void 0 ? this.currentTimestamp() : d;
        this.$4.forEach(function (c) {
          c.onMarkerPoint && c.onMarkerPoint(a, e, b, f, g);
        });
        c = this.getMarker(a, e);
        if (!c) return;
        d = { name: b, timeSinceStart: Math.trunc(g - c.timestamp) };
        var h = j(f);
        h && (d.data = h);
        c.points.push(d);
      };
      b.markerEnd = function (a, b, e, f) {
        e === void 0 && (e = 0);
        f === void 0 && (f = this.currentTimestamp());
        var g = this.getMarker(a, e);
        if (!g) {
          this.$4.forEach(function (c) {
            var d = { durationMs: 0 };
            c.onMarkerEnd && c.onMarkerEnd(b, a, e, f, d);
          });
          return;
        }
        var i = b;
        if (c("gkx")("7541")) {
          var j = this.$17(g, g.timestamp, f);
          j && b === 2 && (i = 5947);
        }
        j = {
          marker_id: (h || (h = d("QPLEvent"))).getMarkerId(a),
          action_id: i,
          instance_id: e,
          sample_rate: g.sampleRate,
          method: m.get(g.samplingMethod),
          duration_ns: d("QPLTimestamp").calculateDurationAsNanoseconds(
            g.timestamp,
            f
          ),
          points: g.points,
          metadata: {
            application_analytics: {
              time_since_qpl_module_init: f - this.$1.moduleLoadTimestamp,
            },
          },
          marker_type: g.type,
          flags: 1,
          unique_marker_id_debug_only: g.uniqueMarkerDebugId,
        };
        j = l(j, g.annotations);
        var n = k(j, g);
        this.$4.forEach(function (b) {
          var c = { durationMs: g ? f - g.timestamp : 0, logData: n };
          b.onMarkerEnd && b.onMarkerEnd(i, a, e, f, c);
        });
        g.passesSampling &&
          (g.timestampIsApproximate !== !0 && this.$14(n),
          this.$6 === (h || (h = d("QPLEvent"))).getMarkerId(a) &&
            this.$1.onDebuggingIdEnded &&
            this.$1.onDebuggingIdEnded());
        this.deleteMarker(h.getMarkerId(a), e);
      };
      b.markerDrop = function (a, b) {
        b === void 0 && (b = 0);
        this.deleteMarker((h || (h = d("QPLEvent"))).getMarkerId(a), b);
        var c = this.currentTimestamp();
        this.$4.forEach(function (d) {
          d.onMarkerDrop && d.onMarkerDrop(a, b, c);
        });
      };
      b.markEvent = function (a, b, c, e) {
        e = e === void 0 ? {} : e;
        var f = e.timestamp,
          g = f === void 0 ? this.currentTimestamp() : f,
          i = e.annotations;
        this.$4.forEach(function (b) {
          b.onMarkEvent &&
            b.onMarkEvent({ event: a, timestamp: g, annotations: i });
        });
        if (
          (f = this.$1.quickLogConfigHelper) == null
            ? void 0
            : f.isKillswitchOn()
        )
          return;
        e = this.$12(a);
        f = e[0];
        var k = e[1];
        e = e[2];
        if (!f) return;
        f = j(typeof i === "function" ? i() : i);
        k = {
          marker_id: (h || (h = d("QPLEvent"))).getMarkerId(a),
          action_id: 51,
          instance_id: 0,
          sample_rate: k,
          method: m.get(e),
          da_type: b,
          da_level: c,
          metadata: {
            application_analytics: {
              time_since_qpl_module_init: g - this.$1.moduleLoadTimestamp,
            },
          },
          marker_type: 1,
          flags: 1,
        };
        this.$14(l(k, f));
      };
      b.markerStartForJoin = function (a, b, c) {
        c = c === void 0 ? {} : c;
        var d = c.instanceKey;
        d = d === void 0 ? 0 : d;
        var e = c.cancelExisting;
        e = e === void 0 ? !1 : e;
        var f = c.cancelOnUnload;
        f = f === void 0 ? !1 : f;
        var g = c.trackedForLoss;
        g = g === void 0 ? !1 : g;
        var h = c.type;
        h = h === void 0 ? 1 : h;
        var i = c.qplInternalDoNotUseAbsoluteTimeOrigin;
        i = i === void 0 ? null : i;
        var j = c.timeoutMS;
        j = j === void 0 ? null : j;
        var k = c.monotonicTimestamp;
        k = k === void 0 ? this.currentTimestamp() : k;
        var l = c.absoluteTimeOriginMs;
        l = l === void 0 ? this.currentUnixTimestamp() : l;
        var m = c.sourceIsPrimary;
        m = m === void 0 ? !1 : m;
        var n = c.closeSession,
          o = c.onMarkerTimeout__DoNotUse;
        c = c.unreliableSourceClockProcessId;
        this.markerStart(a, d, k, {
          cancelExisting: e,
          cancelOnUnload: f,
          trackedForLoss: g,
          type: h,
          samplingBasis: b,
          qplInternalDoNotUseAbsoluteTimeOrigin: i,
          timeoutMS: j,
          onMarkerTimeout__DoNotUse: o,
        });
        k = "unreliable";
        c != null && (k += "_" + c);
        this.markerAnnotate(
          a,
          {
            string:
              ((e = {}),
              (e.join_id = b),
              (e.qpl_join__source_clock = k),
              (e.qpl__source = "client_js"),
              e),
            int: ((f = {}), (f.qpl_join__absolute_time_origin_ms = l), f),
            bool: ((g = {}), (g.qpl_join__source_is_primary = m), g),
          },
          { instanceKey: d }
        );
        if (n != null) {
          this.markerAnnotate(
            a,
            {
              int: ((h = {}), (h.qpl_join__close_session_after_seconds = n), h),
            },
            { instanceKey: d }
          );
        }
      };
      b.addAlignmentPointForJoin = function (a, b, c) {
        c = c === void 0 ? {} : c;
        var d = c.instanceKey;
        d = d === void 0 ? 0 : d;
        var e = c.requestId;
        e = e === void 0 ? "default_id" : e;
        c = c.timestamp;
        c = c === void 0 ? this.currentTimestamp() : c;
        b = this.$18(b);
        if (b == null) return;
        b = b + e;
        this.markerPoint(a, b, { instanceKey: d, timestamp: c });
      };
      b.setAlwaysOnSampleRate = function (a, b) {
        this.$8.set(a, b);
      };
      b.setDefaultSampleRate = function (a) {
        this.$3 = a;
      };
      b.currentTimestamp = function () {
        return this.$1.monotonicNowMs();
      };
      b.currentUnixTimestamp = function () {
        return this.$1.unixNowMs();
      };
      b.enableDebug = function (a) {
        this.$6 = a;
      };
      b.disableDebug = function () {
        this.$6 = null;
      };
      b.addListener = function (a) {
        var b = this,
          c = this.$2++;
        this.$4.set(c, a);
        return {
          dispose: function () {
            b.$4["delete"](c);
          },
        };
      };
      b.$12 = function (a, b) {
        if (
          (this.$1.unsampleAllEvents && this.$1.unsampleAllEvents()) ||
          this.$6 === (h || (h = d("QPLEvent"))).getMarkerId(a)
        )
          return [!0, 1, d("QuickPerformanceLoggerTypes").EVENT_BASED_SAMPLING];
        var c = (h || (h = d("QPLEvent"))).getSampleRate(a),
          e = h.getSamplingMethod(a);
        if (
          this.$8.get(a) == null &&
          c !== 0 &&
          e === d("QuickPerformanceLoggerTypes").USER_BASED_SAMPLING
        ) {
          var f;
          return [
            !0,
            (f = c) != null ? f : 1,
            d("QuickPerformanceLoggerTypes").USER_BASED_SAMPLING,
          ];
        }
        f = (a = (f = this.$8.get(a)) != null ? f : c) != null ? a : this.$3;
        a =
          (c = e) != null
            ? c
            : d("QuickPerformanceLoggerTypes").EVENT_BASED_SAMPLING;
        e = n(f, b);
        return [e, f, a];
      };
      b.$14 = function (a) {
        this.$4.forEach(function (b) {
          b.onUploadEvent && b.onUploadEvent(a);
        });
        var b = this.$1.decorateEventBeforeUpload
          ? this.$1.decorateEventBeforeUpload(a)
          : a;
        this.$1.sendEvent(a, b);
      };
      b.$17 = function (a, b, c) {
        if (a.timeoutMS == null) return !1;
        c = c - b;
        return c >= a.timeoutMS;
      };
      b.getActiveMarkerIds = function (a) {
        var b = a.type,
          c = new Set();
        this.activeMarkers.forEach(function (a, d) {
          a.forEach(function (a) {
            if (a.type === b) {
              c.add(d);
              return;
            }
          });
        });
        return Array.from(c);
      };
      b.getActiveAdsManagerInstanceIds = function () {
        var a = new Map();
        this.activeMarkers.forEach(function (b, c) {
          var d = new Map();
          b.forEach(function (a, b) {
            a.adsManagerInstanceID != null &&
              d.set(b, {
                instanceId: a.adsManagerInstanceID,
                qplEvent: a.event,
              });
          });
          d.size > 0 && a.set(c, d);
        });
        return a;
      };
      b.forEachMarkerInstance = function (a, b) {
        a = this.$10(a);
        if (!a) return;
        for (
          var a = a.entries(),
            c = Array.isArray(a),
            d = 0,
            a = c
              ? a
              : a[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var e;
          if (c) {
            if (d >= a.length) break;
            e = a[d++];
          } else {
            d = a.next();
            if (d.done) break;
            e = d.value;
          }
          e = e;
          var f = e[0];
          e = e[1];
          b(f, e.event);
        }
      };
      b.getMarkerStartTs = function (a, b) {
        b = b === void 0 ? {} : b;
        b = b.instanceKey;
        b = b === void 0 ? 0 : b;
        a = this.getMarker(a, b);
        if (!a) return;
        return a.timestamp;
      };
      b.markerLogDebugPoints = function (a, b) {
        b = b === void 0 ? {} : b;
        b = b.instanceKey;
        b = b === void 0 ? 0 : b;
        var e = (h || (h = d("QPLEvent"))).getMarkerId(a);
        e = this.getMarker(a, b);
        if (!e) return;
        a = c("uuidv4")();
        e.uniqueMarkerDebugId = a;
      };
      b.$18 = function (a) {
        switch (a) {
          case 1:
            return "join_request_";
          case 0:
            return "join_request_";
          case 3:
            return "join_response_";
          case 2:
            return "join_response_";
          default:
            return null;
        }
      };
      return a;
    })();
    o.normalizeAnnotations = j;
    g["default"] = o;
  },
  98
);
__d(
  "QPLInspector",
  [],
  function (a, b, c, d, e, f) {
    a = (function () {
      function a() {
        (this.$1 = []), (this.$2 = {});
      }
      var b = a.prototype;
      b.appendLog = function (a) {
        for (var b in this.$2) {
          if (
            !Object.prototype.hasOwnProperty.call(this.$2, b) ||
            a.marker_id !== b
          )
            continue;
          this.$2[a.marker_id].forEach(function (b) {
            return b(a);
          });
        }
        this.$1.push(a);
      };
      b.dumpLogs = function () {
        return this.$1;
      };
      b.addListener = function (a, b) {
        Object.prototype.hasOwnProperty.call(this.$2, a) || (this.$2[a] = []),
          this.$2[a].push(b),
          this.$1.forEach(function (c) {
            c.marker_id === a && b(c);
          });
      };
      b.removeListener = function (a, b) {
        b = this.$2[a].indexOf(b);
        b !== -1 && this.$2[a].splice(b, 1);
      };
      return a;
    })();
    b = new a();
    f["default"] = b;
  },
  66
);
__d(
  "QuickLogActionType",
  [],
  function (a, b, c, d, e, f) {
    a = Object.freeze({
      START: 1,
      SUCCESS: 2,
      FAIL: 3,
      CANCEL: 4,
      DRAW_COMPLETE: 5,
      ON_RESUME: 6,
      ACTIVITY_CREATED: 7,
      CONSISTENCY_MODEL_UPDATER: 8,
      SEND_MESSAGE: 9,
      SUCCESS_COLD: 10,
      SUCCESS_WARM: 11,
      UI_IDLE: 12,
      PHASE_ONE: 13,
      PHASE_TWO: 14,
      DEQUEUE: 15,
      NETWORK_COMPLETE: 16,
      MEMORY_CACHE_VISIT: 17,
      DISK_CACHE_VISIT: 18,
      CONSISTENCY_UPDATE: 19,
      RETURN_TO_CALLER: 20,
      PHOTO_UPLOAD_COMPLETE: 21,
      USER_NAVIGATION_CANCELLATION: 22,
      DB_FETCH: 23,
      SERVER_FETCH: 24,
      SUCCESS_CACHE: 25,
      SUCCESS_DB: 26,
      SUCCESS_NETWORK: 27,
      SUCCESS_LOCAL_UNSPECIFIED: 28,
      CACHE_UPDATED: 29,
      DB_UPDATED: 30,
      DATA_RECEIVED: 31,
      DRAW_VIEW: 32,
      DATA_EMPTY: 33,
      CACHE_FETCH: 34,
      PREPARE_BEGIN: 35,
      PREPARE_END: 36,
      ASYNC_BEGIN: 37,
      ASYNC_END: 38,
      REMOVE_BEGIN: 39,
      REMOVE_END: 40,
      BROADCAST_DONE: 41,
      ON_RESUME_END: 42,
      ON_ATTACH_END: 43,
      ON_FRAGMENT_CREATE_END: 44,
      ON_CREATE_VIEW_END: 45,
      ON_ACTIVITY_CREATED_END: 46,
      ON_START_END: 47,
      QUEUED: 48,
      IN_PROGRESS: 49,
      INIT: 50,
      UNKNOWN: 51,
      RETRY_AFTER_FAILURE: 52,
      RETRY_AFTER_RECONNECT: 53,
      QUEUEING_BEGIN: 54,
      QUEUEING_SUCCESS: 55,
      QUEUEING_FAIL: 56,
      MESSAGE_UPDATE_START: 57,
      MESSAGE_UPDATE_END: 58,
      PHOTO_CAPTURED: 59,
      MEDIA_PREVIEW_VISIBLE: 60,
      COUNTER: 61,
      INTERACTION_LOAD_TIMELINE_HEADER: 62,
      INTERACTION_LOAD_EVENT_PERMALINK: 63,
      INTERACTION_LOAD_GROUPS_FEED: 64,
      INTERACTION_LOAD_PAGE_HEADER: 65,
      INTERACTION_LOAD_PAGE_HEADER_ADMIN: 66,
      INTERACTION_LOAD_PERMALINK: 67,
      INTERACTION_OPEN_COMPOSER: 68,
      INTERACTION_OPEN_MEDIA_PICKER: 69,
      INTERACTION_OPEN_PHOTO_GALLERY: 70,
      INTERACTION_OPEN_CHECK_IN: 71,
      INTERACTION_LOAD_WEB_VIEW: 72,
      INTENT_MAPPED: 73,
      ACTIVITY_LAUNCHED: 74,
      ACTIVITY_PAUSED: 75,
      ACTIVITY_STARTED: 76,
      ACTIVITY_RESUMED: 77,
      FRAGMENT_CREATED: 78,
      FRAGMENT_RESUMED: 79,
      ACTIVITY_ON_CREATE: 80,
      INTENT_MAPPING_BEGIN: 81,
      FRAGMENT_ON_CREATE: 82,
      FRAGMENT_NEW_INSTANCE: 83,
      MARKER_SWAPPED: 84,
      FRAGMENT_INSTANCE_CREATED: 85,
      PREV_ACTIVITY_PAUSED: 86,
      ERROR: 87,
      METHOD_INVOKE: 88,
      FINALLY: 89,
      PHOTO_DOWNLOAD_COMPLETE: 90,
      MINIPREVIEW_COMPLETE: 91,
      SEARCH_TYPEAHEAD: 92,
      ANIMATION_END: 93,
      UDP_REQUEST_SEND: 94,
      MAIN_COMPLETE: 95,
      INTERRUPTED: 96,
      NETWORK_FAILED: 97,
      NETWORK_RESPONSE: 98,
      EDGE_PROCESSING_BEGIN: 99,
      NEWSFEED_PROCESS_RESPONSE: 100,
      ON_VIEW_CREATED_END: 101,
      DATA_LOAD_START: 102,
      LEGACY_MARKER: 103,
      ACTION_BAR_COMPLETE: 104,
      ABORTED: 105,
      QUERY_READY: 106,
      RTMP_PACKET_RECEIVED: 107,
      REQUESTED_PLAYING: 108,
      RTMP_CONNECTION_REQUESTED: 109,
      RTMP_CONNECTION_RELEASE: 110,
      NEW_START_FOUND: 111,
      MISSED_EVENT: 112,
      TIMEOUT: 113,
      CONTROLLER_INITIATED: 114,
      RTMP_STREAM_PREPARED: 115,
      VIDEO_PLAYING: 116,
      RTMP_CONNECTION_CONNECTED: 117,
      RTMP_CONNECTION_FAILED: 118,
      RTMP_CONNECTION_INTERCEPTED: 119,
      VIDEO_SET_RENDERER_CONTEXT: 120,
      HEADER_DATA_LOADED: 121,
      CARD_DATA_LOADED: 122,
      VIEW_WILL_APPEAR_BEGIN: 123,
      VIEW_DID_LOAD_BEGIN: 124,
      COMPONENTS_DATA_SOURCE_WILL_BEGIN_UPDATES: 125,
      COMPONENTS_DATA_SOURCE_DID_END_UPDATES: 126,
      LOAD_VIEW_BEGIN: 127,
      RTMP_FIRST_KEY_FRAME_RECEIVED: 128,
      MESSENGER_QUEUE_CREATION: 129,
      APP_DID_FINISH_LAUNCHING: 130,
      APP_DID_BECOME_ACTIVE: 131,
      APP_WILL_ENTER_FOREGROUND: 132,
      APP_DID_ENTER_BACKGROUND: 133,
      APP_MAIN: 134,
      MQTT_CONNECTING: 135,
      MQTT_CONNECTED: 136,
      MQTT_DISCONNECTED: 137,
      MESSENGER_DELTA_REQUEST: 138,
      APP_FIRST_VIEW_CONTROLLER: 139,
      MESSENGER_THREAD_LIST_LOADED: 140,
      MESSENGER_THREAD_LIST_DISPLAYED: 141,
      PREV_ACTIVITY_PAUSE: 142,
      ACTIVITY_RESUME: 143,
      ACTIVITY_START: 144,
      BEGIN_START_ACTIVITY: 145,
      END_START_ACTIVITY: 146,
      FILE_SYSTEM_FAIL: 147,
      FORMAT_ERROR: 148,
      PRIVACY_VIOLATION: 149,
      NETWORK_RESPONSE_INITIAL_SCAN: 150,
      POPULATE_CONSISTENCY_MEMORY_CACHE: 151,
      APPLY_OPTIMISTICS: 152,
      APPLY_FINISHED_LIST: 153,
      APPLY_FINISHED_LIST_AGAIN: 154,
      FUTURE_LISTENERS_COMPLETE: 155,
      SERVICE_ON_START_COMMAND: 156,
      WAIT_FOR_BLOCKERS: 157,
      NOTIFY_SUBSCRIBERS: 158,
      FAIL_FILE_TOO_LARGE: 159,
      OFFLINE: 160,
      ASNYC_FAILED: 161,
      ASYNC_FAIL: 162,
      ON_ATTACH_FRAGMENT: 163,
      VIEW_DID_APPEAR_BEGIN: 164,
      DISPLAYED: 165,
      DISPLAYED_ON_SCREEN: 166,
      ASYNC_ACTION_SUCCESS: 167,
      ASYNC_ACTION_FAIL: 168,
      CONNECTIVITY_CHANGED: 169,
      VIDEO_DISPLAYED: 170,
      VIDEO_REQUESTED_PLAYING: 171,
      LOADED_AUDIO_SESSION: 172,
      LOADED_CAMERA_SESSION: 173,
      SUCCESS_OPTIMISTIC: 174,
      OUT_OF_ORDER: 175,
      NOT_READY: 176,
      JSON_PARSE: 177,
      FILE_NOT_FOUND: 178,
      METABOX_COMPLETE: 179,
      CALL_TO_ACTION_COMPLETE: 180,
      HEADER_DRAW_COMPLETE: 181,
      COVER_PHOTO_COMPLETE: 182,
      COMPONENT_WILL_CREATE: 183,
      COMPONENT_DID_CREATE: 184,
      COMPONENT_WILL_LAYOUT: 185,
      COMPONENT_DID_LAYOUT: 186,
      COMPONENT_WILL_MOUNT: 187,
      COMPONENT_DID_MOUNT: 188,
      PRECALCULATE_EDGES: 189,
      UI_THREAD_DEQUEUE: 190,
      CALLBACKS_COMPLETE: 191,
      CALLBACKS_DISPATCHED: 192,
      NETWORK_PARSE_COMPLETE: 193,
      START_LOADING_JS_BUNDLE: 194,
      FINISH_LOADING_JS_BUNDLE: 195,
      START_EXECUTING_JS_BUNDLE: 196,
      FINISH_EXECUTING_JS_BUNDLE: 197,
      START_CALLING_JS_FUNCTION: 198,
      FINISH_CALLING_JS_FUNCTION: 199,
      CREATED_MODEL_FILE: 200,
      DB_SUPPLIER_GET: 201,
      BEGIN_TRANSACTION: 202,
      FILE_FLUSHED: 203,
      OPTIMISTIC_UPDATES_APPLIED: 204,
      FRAGMENT_VISIBLE: 205,
      STALE: 206,
      SUCCESS_GET_MODEL: 207,
      FAIL_GET_MODEL: 208,
      ALREADY_SEEN: 209,
      UNKNOWN_SEEN_STATE: 210,
      CREATED_INTENT: 211,
      INVALID_INTENT: 212,
      SHOW_NOTIFICATION: 213,
      SUCCESS_FETCH_IMAGE: 214,
      FAIL_FETCH_IMAGE: 215,
      DROPPED: 216,
      QUERY_CHUNKS: 217,
      QUERY_ROWS: 218,
      COMPUTE_CHUNKS: 219,
      SCROLL_COMPLETE: 220,
      USE_INSTANCE_STATE: 221,
      USE_ARGUMENTS: 222,
      OFFSCREEN: 223,
      LOG_READ: 224,
      LOG_COMPACTED: 225,
      LOG_WRITER_OPENED: 226,
      TAB_SWITCH: 227,
      EXIT_VIEW_CONTROLLER: 228,
      TAGS_PREPARED: 229,
      VIEW_DID_APPEAR: 230,
      MEDIA_TOO_SMALL: 231,
      ITEM_SELECTED: 232,
      REPOSITIONED: 233,
      PHOTO_UPLOAD_START: 234,
      MEDIA_EDIT: 235,
      MEDIA_EDIT_COMPLETE: 236,
      VIDEO_PAUSE: 237,
      VIDEO_COMPLETE: 238,
      VIDEO_PLAYING_TIMEOUT: 239,
      VIDEO_PLAYING_QPL_TIMEOUT: 240,
      SESSION_OPEN: 241,
      SCHEMA_HASH_MISMATCH: 242,
      OVERRIDES_EXIST: 243,
      DI_DONE: 244,
      FLATBUFFER_SCHEMA_ABSENT: 245,
      SUCCESS_NONEXISTENCE: 246,
      VIDEO_CANCELLED: 247,
      MESSENGER_QUEUE_CREATION_FAILURE: 248,
      MESSENGER_DELTA_REQUEST_FAILURE: 249,
      RETURN_EXCEPTION_TO_CALLER: 250,
      SURFACE_TEXTURE_AVAILABLE: 251,
      NEWS_FEED_FRAGMENT: 252,
      HEADER_CACHE_FETCH_STARTED: 253,
      CHANGESET_ENQUEUED: 258,
      RTC_BROADCAST_INITIALIZED: 259,
      RTC_STREAMING_INITIALIZED: 260,
      RTC_STREAMING_STARTED: 261,
      CAMERA_VIDEO_OUTPUT_SWITCHED: 262,
      RTMP_STREAM_STOPPED: 263,
      LOCATION_FETCH_BEGIN: 264,
      LOCATION_FETCH_SUCCESS: 265,
      LOCATION_FETCH_FAILED: 266,
      FIRST_UPDATE_SUCCESS: 267,
      FIRST_UPDATE_FAILURE: 268,
      RTMP_STREAMING_HANDLED_FRAME: 269,
      RTMP_DVR_HANDLED_FRAME: 274,
      LIVE_RTMP_STREAMING_HANDLED_FRAME: 275,
      LIVE_RTMP_DVR_HANDLED_FRAME: 276,
      PASS_QE_CHECK: 277,
      PASS_AD_CHECK: 278,
      PASS_SAMPLE_RATE_CHECK: 279,
      HAS_VALID_HTML: 280,
      FOUND_IMAGES: 281,
      TIGON_REQUEST_BEGIN: 282,
      TIGON_REQUEST_END: 283,
      TIGON_RESPONSE_BEGIN: 284,
      TIGON_RESPONSE_END: 285,
      TIGON_PARSE_BEGIN: 286,
      TIGON_PARSE_END: 287,
      GRAPHQL_CACHE_FETCH_START: 288,
      GRAPHQL_CACHE_FETCH_END: 289,
      VIDEO_START_STALL: 290,
      VIDEO_END_STALL: 291,
      MERGE_LOCAL_FIELDS: 292,
      LOAD_QUERY_STRING: 293,
      CONFIG_TABLE_SCHEMA_HASH_MISMATCH: 294,
      CONFIG_TABLE_SCHEMA_ABSENT: 295,
      CONFIG_TABLE_MAGIC_MISMATCH: 296,
      OBJSEL_FETCH: 297,
      GO_TO_AD_ACTIVITY: 298,
      SAVE_AD: 299,
      UNSAVE_AD: 300,
      SAVE_MODE: 301,
      GO_AD_ACTIVITY_MODE: 302,
      ACCESSIBILITY_ACTIVATE: 303,
      ACCESSIBILITY_CUSTOM: 304,
      ACCESSIBILITY_MAGIC_TAP: 305,
      FINAL_IMAGE_SET: 306,
      INTERMEDIATE_IMAGE_SET: 307,
      INTERMEDIATE_IMAGE_FAIL: 308,
      INTERMEDIATE_IMAGE_GOOD_ENOUGH_SET: 309,
      APP_BACKGROUND: 310,
      APP_FOREGROUND: 311,
      RECEIVED_HARDWARE_FRAME: 312,
      CAMERA_COMPONENT_MOUNTED: 313,
      MQTT_CONNECTION_ATTEMPTED: 314,
      DELTA_APPLICATION_COMPLETED: 325,
      DELTAS_RECEIVED_AFTER_CONNECT: 326,
      MESSENGER_DAY_UNIT_DISPLAYED: 327,
      DATA_LOAD_END: 328,
      VIEW_DID_BECOME_VISIBLE: 329,
      DELTA_APPLICATION_INTERRUPTED: 330,
      DELTA_BATCH_APPLICATION_COMPLETED: 331,
      MESSAGE_LIST_DID_UPDATE: 332,
      MESSAGE_LIST_WILL_UPDATE: 333,
      SUCCESS_ZERO_WAIT_TIME: 334,
      USER_SCROLLED: 335,
      SPINNER_APPEARED: 336,
      MODEL_ENQUEUED: 337,
      VIEW_MODEL_APPLIED: 338,
      PRESENTED: 339,
      VIEW_DID_BECOME_VISIBLE_END: 340,
      MESSENGER_DELTA_REQUEST_INIT: 341,
      FEED_REQUEST_STARTED: 342,
      FEED_REQUEST_FAILED: 343,
      FEED_REQUEST_SUCCEEDED: 344,
      FEED_LOAD_FROM_DISK_FINISHED: 345,
      STORIES_REQUEST_STARTED: 346,
      STORIES_REQUEST_FAILED: 392,
      STORIES_REQUEST_SUCCEEDED: 393,
      STORIES_LOAD_FROM_DISK_FINISHED: 394,
      USER_INFO_LOADED: 395,
      APP_CREATED: 396,
      INIT_TO_USABLE: 397,
      INIT_TO_NETWORK_CONTENT: 398,
      TOTAL: 399,
      HEAD: 400,
      TAIL: 401,
      INITIAL: 402,
      OTHER: 403,
      ANR_START_DATA_CAPTURE: 404,
      ANR_ENQUEUE: 405,
      NOTIF_NOT_ALERTED: 406,
      NOTIF_DUPLICATE: 407,
      NOTIF_MUTED: 408,
      NOTIF_BUZZED: 409,
      FEED_RESPONSE_PROCESSED: 410,
      STORIES_RESPONSE_PROCESSED: 411,
      APP_DID_FINISH_LAUNCHING_ENDED: 412,
      ASYNC_BEGIN_DB: 413,
      DELTA_APPLICATION_STARTED: 414,
      ASYNC_SUCCESS_DB: 415,
      ASYNC_FAIL_DB: 416,
      ASYNC_BEGIN_SERVER: 417,
      ASYNC_SUCCESS_SERVER: 418,
      ASYNC_FAIL_SERVER: 419,
      LEAVE: 420,
      ASYNC_SUCCESS_DB_NO_DATA: 429,
      ASYNC_FAIL_SERVER_NO_DATA: 430,
      SUCCESS_MEMORY: 431,
      SUCCESS_SERVER: 432,
      FAIL_NO_DATA: 433,
      ACTIVITY_NEW_INTENT: 434,
      GRID_MEDIA_LOADED: 435,
      STORY_TRAY_MEDIA_LOADED: 436,
      INTERACTION_OPEN_QRCODE_SCANNER: 437,
      MEDIA_LOAD_CACHE: 438,
      MEDIA_LOAD_NETWORK: 439,
      COMMENTS_LOAD_START: 440,
      COMMENTS_LOAD_COMPLETE: 441,
      MEDIA_LOAD_START: 442,
      SCROLL_START: 443,
      QRCODE_SCANNER_SCAN_SUCCESS: 444,
      QRCODE_SCANNER_SCAN_FAILURE: 445,
      APP_CREATED_MAIN_PROCESS: 446,
      FINISH_REGISTERING_JS_NATIVE_MODULES: 447,
      NON_ANR: 448,
      FINISH_INITIALIZING_JS_BRIDGE: 449,
      FINISH_INJECTING_JS_HOOKS: 450,
      FINISH_RUNNING_JS_INITIALIZER: 451,
      UI_RESPONSIVE: 452,
      PHASE_ONE_COMPLETE: 453,
      PHASE_TWO_COMPLETE: 454,
      LS_HEADER_START: 455,
      LS_HEADER_LOAD: 456,
      LS_BODY_START: 457,
      LS_BODY_LOAD: 458,
      APP_ONCREATE: 459,
      START_FETCH_IMAGE: 460,
      LOGGED_OUT: 461,
      LS_HEADER_LAYOUT_SUCCESS: 462,
      STARTED_CAPTURE_SESSION: 463,
      CAMERA_VIEW_READY: 464,
      CAMERA_FIRST_FRAME: 465,
      PHOTO_BITMAP_READY: 466,
      END: 467,
      FRAME_RENDERED: 468,
      LS_MAP_LIST_START: 469,
      LS_MAP_LIST_LOADED: 470,
      LS_MAP_LIST_SUCCESS: 471,
      FETCH_THREAD_STARTED: 472,
      FETCH_THREAD_SUCCEEDED: 473,
      FETCH_THREAD_FAILED: 474,
      STRUCTURE_FETCH_COMPLETE: 475,
      FOLLOWED_SHOWS_FETCHED: 476,
      ABANDONED: 477,
      ENTERED: 478,
      LS_FILTER_START: 479,
      LS_FILTER_LOAD: 480,
      LS_FILTER_SUCCESS: 481,
      LS_SEARCH_RESULT_START: 482,
      LS_SEARCH_RESULT_LOAD: 483,
      NETWORK_PARSE_START: 484,
      NETWORK_REQUEST_SENT: 485,
      COMPONENT_DATA_MODEL_UPDATE_START: 486,
      COMPONENT_DATA_MODEL_UPDATE_COMPLETE: 487,
      HIGH_RES_PHOTO_FILE_READY: 488,
      NATIVE_PHOTO_BITMAP_READY: 489,
      REEL_JSON_RECEIVED: 490,
      REEL_MEDIA_RECEIVED: 491,
      STORY_VIEWER_APPEAR: 492,
      FETCH_INBOX_STARTED: 493,
      FETCH_INBOX_SUCCEEDED: 494,
      FETCH_INBOX_FAILED: 495,
      REQUEST_ADDED: 496,
      INIT_QE_START: 497,
      INIT_QE_END: 498,
      MULTIDEX_INSTALLED: 499,
      PREPARE_CAMERA_SESSION: 500,
      START_CAMERA_SESSION: 501,
      DID_START_CAMERA_SESSION: 502,
      FIRST_HARDWARE_FRAME: 503,
      START_RENDERING_FIRST_USER_FRAME: 504,
      FIRST_MEDIA_RENDERED: 505,
      FIRST_CACHED_MEDIA_RENDERED: 506,
      CAMERA_INITIALIZED: 507,
      HTTP_TRANSACTION_STARTED: 508,
      REMOTE_PROCESS: 509,
      PRE_REQUEST_SEND_CALLED: 510,
      BRIDGE_STARTUP_WILL_START: 511,
      BRIDGE_STARTUP_DID_FINISH: 512,
      COVER_PHOTO_LOW_RES: 513,
      COVER_PHOTO_HIGH_RES: 514,
      PROFILE_PIC_LOW_RES: 515,
      PROFILE_PIC_HIGH_RES: 516,
      CONTEXT_ITEMS: 517,
      MEDIA_LOADED: 518,
      STATE_UPDATE: 519,
      ON_SHOW_LOGIN: 520,
      EMPTY_REQUEST: 521,
      METERED_CONNECTION: 522,
      VIDEO_DOWNSTREAM_FORMAT_CHANGED: 523,
      DISABLED: 524,
      NO_METADATA: 525,
      INCOMPLETE_METADATA: 526,
      PHOTO_CAPTURE_READY: 527,
      CAMERA_START_READY: 528,
      DELAY_START: 529,
      DELAY_STOP: 530,
      RANK_START: 531,
      RANK_STOP: 532,
      DB_WRITE_START: 533,
      DB_WRITE_STOP: 534,
      ADD_STORY_TO_UI: 535,
      WEBVIEW_URI_REDIRECTOR_CONSTRUCTION: 536,
      UNINTERRUPTED: 537,
      VIDEO_TOGGLE_FULL_SCREEN: 538,
      CONFIGURE_START: 539,
      CONFIGURE_END: 540,
      BROWSER_OPEN: 541,
      FIRST_DATA_RECEIVED: 542,
      RVP_WILL_LOAD: 543,
      RVP_DID_LOAD: 544,
      CACHE_WRITE_START: 545,
      CACHE_WRITE_SUCCESS: 546,
      CACHE_WRITE_FAIL: 547,
      RVP_WILL_PAUSE: 548,
      RVP_DID_PAUSE: 549,
      RVP_WILL_PLAY: 550,
      RVP_DID_PLAY: 551,
      RVP_WILL_PREPARE: 552,
      RVP_DID_PREPARE: 553,
      RVP_WILL_RELOAD: 554,
      RVP_DID_RELOAD: 555,
      RVP_WILL_CREATE: 556,
      RVP_DID_CREATE: 557,
      RVP_WILL_FINISH_INFLATE: 558,
      RVP_DID_FINISH_INFLATE: 559,
      RVP_WILL_MOUNT: 560,
      RVP_DID_MOUNT: 561,
      START_COMPRESSING_MESSAGE: 562,
      MESSAGE_COMPRESSED: 563,
      START_DECOMPRESSING_MESSAGE: 564,
      MESSAGE_DECOMPRESSED: 565,
      START_SENDING_MESSAGE: 566,
      CAMERA_PREVIEW_FROZEN: 567,
      VC_INIT_START: 569,
      VC_INIT_BEGIN: 570,
      VC_INIT_END: 571,
      VC_VIEW_DID_LOAD_BEGIN: 572,
      VC_VIEW_DID_LOAD_END: 573,
      ROOT_QUERY_START: 574,
      ROOT_QUERY_SUCCESS: 575,
      ROOT_QUERY_FAIL: 576,
      CACHE_INITIALIZED: 577,
      FETCH_BEGIN: 578,
      FETCH_FINISHED: 579,
      PARSING_FINISHED: 580,
      LOAD_VIEW_END: 581,
      LOAD_URL_BEGIN: 582,
      LOAD_URL_END: 583,
      SHOULD_LOAD_URL_BEGIN: 598,
      SHOULD_LOAD_URL_END: 599,
      BLOCKING_RESOURCES_LOADED: 600,
      WEB_PAGE_LOADED: 601,
      JS_TEARDOWN: 603,
      JS_SETUP: 604,
      PREP_STATE: 605,
      PREP_FORMS: 606,
      RUN_FUNCTION: 610,
      LOAD_MODULES: 613,
      VIDEO_READY_TO_PLAY: 614,
      CANCEL_NAVIGATION: 615,
      BEGIN_HANDLE_EVENT: 626,
      END_HANDLE_EVENT: 627,
      BEGIN_PROCESS_EVENT: 628,
      END_PROCESS_EVENT: 629,
      CANCEL_BACKGROUND: 630,
      SC_TRACKER_SETUP_BEGIN: 631,
      SC_TRACKER_SETUP_END: 632,
      PROFILE_TOOLBOX_SETUP_BEGIN: 633,
      PROFILE_TOOLBOX_SETUP_END: 634,
      FEED_TOOLBOX_SETUP_BEGIN: 635,
      FEED_TOOLBOX_SETUP_END: 636,
      SCREEN_PART_RECEIVED: 637,
      RVP_DID_FAIL_AUTOPLAY: 638,
      VIEW_WILL_APPEAR_END: 639,
      VIDEO_RENDERED: 640,
      VIEW_DID_APPEAR_END: 641,
      SHARE_FLOW_LOADED: 642,
      START_DOWNLOAD_FACE_DETECTION_EFFECT: 643,
      APPLY_FACE_DETECTION_EFFECT: 644,
      INTERACTION_SWIPE_UP: 645,
      LOOM_PROVIDER_FAILURE: 646,
      ADS_SELECT_POST_VIEW: 647,
      ADS_SELECT_IMAGE_VIEW: 648,
      ADS_SELECT_BUDGET_VIEW: 649,
      ADS_SELECT_AUDIENCE_VIEW: 650,
      ADS_SELECT_CREATIVE_VIEW: 651,
      VIDEO_FETCH_REQUEST_START: 652,
      VIDEO_FETCH_REQUEST_RECEIVED: 653,
      VIDEO_FETCH_REQUEST_ENTER_NETWORK_QUEUE: 654,
      VIDEO_FETCH_REQUEST_NETWORK_REQUEST_START: 655,
      VIDEO_FETCH_REQUEST_NETWORK_RESPONSE_RECEIVED: 656,
      VIDEO_FETCH_REQUEST_NETWORK_FIRST_BYTE_ARRIVED: 657,
      VIDEO_FETCH_REQUEST_NETWORK_TRANSFER_COMPLETE: 658,
      VIDEO_FETCH_REQUEST_SATISFIED_BY_CACHE: 659,
      VIDEO_FETCH_REQUEST_COMPLETE: 660,
      VIDEO_FETCH_REQUEST_CACHE_CHECK_START: 661,
      VIDEO_FETCH_REQUEST_CACHE_CHECK_END: 662,
      VIDEO_FETCH_REQUEST_DID_ATTACH_TO_NETWORK_REQUEST: 663,
      SELECT_PHOTOS_FAILED_SCORE: 664,
      SELECT_PHOTOS_FAILED_TIMESTAMP: 665,
      INTERACTION_CLICK: 666,
      VIDEO_SCRUBBER_FIRST_THUMBNAIL_SHOWN: 667,
      VIDEO_SCRUBBER_THUMBNAIL_SHOWN: 668,
      COLD_START_BEGIN: 669,
      COLD_START_END: 670,
      COLD_START_LOAD_APP_JS: 671,
      COLD_START_QUERY_SEND: 672,
      COLD_START_APP_SHELL_COMPONENT_DID_MOUNT: 673,
      VIDEO_RECORDING_START_CALLED: 674,
      VIDEO_RECORDING_STOP_CALLED: 675,
      WIKTORK_TEST: 676,
      WIKTORK_TEST_TWO: 677,
      ON_VIDEO_RECORDING_FINISHED: 678,
      MEASURE_IMAGE: 679,
      PDP_RENDER_LOADING: 680,
      PDP_RENDER_FETCHED: 681,
      VIDEO_FETCH_REQUEST_FAILED: 682,
      LOGIN_FLOW_STARTED: 683,
      LOGIN_FLOW_COMPLETED: 684,
      VIDEO_DOWNLOAD_STARTED: 685,
      VIDEO_DOWNLOAD_READY_TO_PLAY: 686,
      VIDEO_DOWNLOAD_FAILED: 687,
      FBLITE_SCREEN_RECEIVED: 688,
      FBLITE_SERVER_START: 689,
      FBLITE_SERVER_END: 690,
      FBLITE_INCOMPLETE: 691,
      BACKGROUND_THREAD: 692,
      MAIN_THREAD: 693,
      BWE_ESTIMATE_COMPLETE: 694,
      WIKTORK_TEST_THREE: 695,
      FBLITE_UNEXPECTED: 696,
      THREAD_ASYNC_BEGIN_SERVER: 697,
      THREAD_ASYNC_SUCCESS_SERVER: 698,
      CARD_ASYNC_BEGIN_SERVER: 699,
      CARD_ASYNC_SUCCESS_SERVER: 700,
      FBLITE_INSTANT_TRANSITION_FAILED: 701,
      BB_TRACE_REQUESTED: 702,
      CANCEL_PSP: 703,
      AGGREGATED: 704,
      UNINSTRUMENTED: 705,
      CANCEL_UNLOAD: 706,
      DOWNLOAD_FAILED: 707,
      UNZIP_FAILED: 708,
      NO_ACTIVE_TRACE: 709,
      LOOM_MMAP_TRACE_NOT_RECOVERED: 710,
      PLUGIN_LOAD_END: 711,
      UNPACKER_CHECK_START: 712,
      PLUGIN_LOAD_START: 713,
      UNPACKER_CHECK_END: 714,
      UNPACKING_END: 715,
      CREATE_UI_MANAGER_MODULE_START: 716,
      CREATE_UI_MANAGER_MODULE_END: 717,
      TEST_NUBBEL: 718,
      CONDITION_NOT_MET: 719,
      FAIL_FALSE_POSITIVE: 720,
      FAIL_FALSE_NEGATIVE: 721,
      APP_CRASH: 722,
      TEST_GINDI: 723,
      TTTT: 724,
      BUG_BASH_ACTION: 725,
      BUG_BASH_TEST: 726,
      INIT_MOBILE_CONFIG: 727,
      SUCCESS_WITH_VC_DISABLED: 1008,
      DELETE_RECORD: 1115,
      NORMAL_SEARCH_LEAVE: 1171,
      MAW_SHIM_INDEXEDDB_SETUP: 1332,
      MAW_FTS_INDEXEDDB_SETUP: 1333,
      UPLOAD_FILE_CANCELLED: 1428,
      SAVE_RECORD: 1492,
      SUCCESS_TEST: 1902,
      APP_EXIT: 2001,
      CREATE_ATTACHMENT: 2266,
      NEW_RECORD_FAILED: 2394,
      START_SEND_MAILBOX_CALL: 2414,
      USER_UNDO_SEND: 2832,
      USER_LEFT_SURFACE: 2833,
      TOGGLE_MODE: 3077,
      FILE_WRITER_ERROR: 3270,
      SKIP: 3376,
      ACQUIRED: 3377,
      PHILLIP_TEST_ACTION_BLAH: 3391,
      REFUSED: 3473,
      SAVE_RECORD_CANCELLED: 3563,
      NEW_ACCOUNT_CREATED: 3599,
      CURRENCY_CHANGE: 3600,
      SUCCESS_PYTORCH: 3653,
      INITIAL_LOAD: 3921,
      NAVIGATION: 3922,
      CREATE_ATTACHMENT_FAILED: 3955,
      INVALID: 4158,
      CANCEL_ACCOUNT_SWITCH: 4340,
      PAUSED_GROUP: 5218,
      CANNOT_SEE_CHANNEL: 5317,
      DELETED_CHANNEL: 5318,
      SUCCESS_PAST_TIMEOUT: 5947,
      DISPLAY_RECORD_FAILED: 6050,
      SAVE_RECORD_FAILED: 6087,
      SET_SOURCE: 6596,
      FRX_FLOW_END: 6646,
      NORMAL_SEARCH: 7381,
      EDIT_RECORD: 7420,
      CREATE_ATTACHMENT_SUCCEEDED: 7618,
      CTWA_REQUEST_NO_WELCOME_MESSAGE: 7809,
      FAIL_VALIDATION: 7952,
      LIGHT_MODE_ENABLED: 8101,
      OPEN_ATTACHMENT_SUCCEEDED: 8213,
      CHANNEL_FULL: 8321,
      UPLOAD_FILE_SUCCEEDED: 8511,
      GENERATE_SHAREABLE_LINK: 8759,
      HORIZON_MM_SERVER_SUCCESS: 8765,
      HORIZON_MM_SERVER_FAIL: 8766,
      BATCHED: 8895,
      SAVE_RECORD_SUCCEEDED: 8902,
      UNACKED_BY_INFRA: 8964,
      UNACKED_BY_UI: 8965,
      NEW_RECORD_SUCCEEDED: 9099,
      DELETE_RECORD_FAILED: 9234,
      STORY_DELETION_AND_LOAD_SUCCESS: 9280,
      STORY_DELETION_WITH_LOAD_FAIL: 9281,
      UPLOAD_FILE: 9473,
      RESTART: 10086,
      INVALID_ANNOTATE_MISSING_START: 10087,
      INVALID_POINT_MISSING_START: 10088,
      AIS_CTA_CLICK: 10126,
      AIS_CLOSED: 10127,
      AIS_REQUESTED: 10128,
      AIS_IMPRESSION: 10129,
      AIS_DOWNLOAD_SUCCESS: 10130,
      AIS_INSTALL_STARTED: 10131,
      AIS_INSTALL_SUCCESS: 10132,
      AIS_AD_CTA_CLICK: 10133,
      DISPLAY: 10283,
      INVALID_END_MISSING_START: 10294,
      AVATAR_EFFECT_MANIFEST_LOADED: 10305,
      AVATAR_EFFECT_RENDER_SET: 10306,
      AVATAR_EFFECT_FIRST_FRAME_RENDERED: 10307,
      AVATAR_EFFECT_RENDER_STARTED: 10308,
      EFFECT_CONFIG_SET: 10309,
      SET_SEARCH_KEYWORD_SUCCEEDED: 10326,
      SET_REGION_SUCCEEDED: 10609,
      NEW_RECORD: 10618,
      SEEN_BY_UI: 10680,
      SEEN_BY_INFRA: 10681,
      ACKED_BY_INFRA: 10682,
      ACKED_BY_UI: 10683,
      ICE_BREAKER_PREVIEW_FAIL: 11079,
      PHILLIP_TEST_FOUR: 11103,
      NEW_RECORD_CANCELLED: 11146,
      TELEMETRY_UNEXPECTED_EVENT: 11289,
      FALLBACK_RENDERED: 11306,
      TOGGLE_SEARCH: 11313,
      QPL_END_TO_END: 11445,
      FACT_GATHERING_SHORT_TEXT_RESPONSE_SUCCESS: 11468,
      SET_SEARCH_KEYWORD: 11787,
      PHP_FATAL: 11866,
      SET_POWER_SEARCH_FIELD_SUCCEEDED: 11893,
      PROMOTE_AUTH_BUAT_ELIGIBLITY_START: 11927,
      PROMOTE_AUTH_BUAT_ELIGIBLE: 11928,
      PROMOTE_AUTH_BUAT_NOT_ELIGIBLE: 11929,
      PROMOTE_AUTH_FB_ELIGIBLITY_START: 11930,
      PROMOTE_AUTH_BUAT_FETCH_SUCCESS: 11931,
      PROMOTE_AUTH_BUAT_FETCH_FAIL: 11932,
      PROMOTE_AUTH_FB_VALID_THIRD_PARTY_TOKEN_FETCHED: 11933,
      PROMOTE_AUTH_FB_LOGIN_START: 11934,
      PROMOTE_AUTH_FB_LOGIN_SUCCESS: 11935,
      PROMOTE_AUTH_FB_LOGIN_FAIL: 11936,
      PROMOTE_AUTH_SUCCESS: 11937,
      PROMOTE_AUTH_FAIL: 11938,
      SUCCESS_CACHE_NOT_MODIFIED: 11947,
      INELIGIBLE: 11969,
      OUTCOME_NOTIFY: 11970,
      OPEN__ATTACHMENT: 12040,
      DELETE_RECORD_CONFIRMED: 12147,
      DARK_MODE_ENABLED: 12223,
      PARTIAL_SUCCESS: 12238,
      SUCCESS_CONTROL: 12434,
      DISPLAY_RECORD: 12456,
      DUMMY: 12524,
      SET_SOURCE_SUCCEEDED: 12560,
      QP_MOBILE_ERROR: 12633,
      CANCEL_MIXVM_NAVIGATION: 12993,
      PERMISSION_DIALOG_SHOWN: 13061,
      NO_EMAIL_FETCHED: 13062,
      HAVE_EXACTLY_ONE_GMAIL: 13063,
      NUMBER_OF_GMAILS: 13064,
      HAVE_ONE_GMAIL_MATCHED_CP: 13065,
      NO_GMAIL_MATCHED: 13066,
      OAUTH_DIALOG_SHOWN: 13067,
      OAUTH_DIALOG_ACCEPT: 13068,
      OAUTH_DIALOG_DENY: 13069,
      OAUTH_TOKEN_FETCHED: 13070,
      OAUTH_TOKEN_FAILURE: 13071,
      OAUTH_SUCCESS: 13072,
      OAUTH_FAIL_TIMEOUT: 13073,
      OAUTH_FAIL_OTHER: 13074,
      SUCCESS_NOTPRESENTED: 13170,
      REMOVE_ATTACHMENT_CANCELLED: 13176,
      DISPLAY_RECORD_SUCCEEDED: 13246,
      DARK_MODE: 13325,
      SET_REGION: 13504,
      HORIZON_MM_REJECTED: 13513,
      POWER_SEARCH_LEAVE: 13551,
      UPLOAD_FILE_FAILED: 13557,
      HAAS_EXECJS_REQUEST: 13638,
      LIGHT_MODE: 13744,
      REMOVE_ATTACHMENT: 13825,
      TEST_ACTION_TEST: 13933,
      PROCESS_PHOTO: 14030,
      OPEN_ATTACHMENT_FAILED: 14290,
      TOGGELE_SEARCH: 14341,
      LAZAR_TEST: 14397,
      POWER_SEARCH: 14472,
      REMOVE_ATTACHMENT_SUCCEEDED: 14513,
      POWER_SEARCH_ENTERED: 14634,
      UGC_EVENT_CREATE: 14654,
      PHILLIP_TEST: 14768,
      GENERATE_SHAREABLE_LINK_FAILED: 14817,
      REMOVE_ATTACHMENT_FAILED: 15262,
      SET_POWER_SEARCH_FIELD: 15268,
      GENERATE_SHAREABLE_LINK_SUCCEEDED: 15431,
      DELETE_RECORD_SUCCEEDED: 15465,
      IG_PROMOTE_DEFAULT_AD_ACCOUNT_NULL: 15469,
      IG_PROMOTE_DEFAULT_AD_ACCOUNT_NON_NULL: 15470,
      DISPLAY_RECORD_COLLAPSED: 15554,
      LAZAR_TEST_A: 15579,
      OPEN_ATTACHMENT: 15957,
      NORMAL_SEARCH_ENTERED: 15969,
      REMOVE_ATTACHMENT_CONFIRMED: 16034,
      LAZAR_TEST_B: 16208,
      DELETE_RECORD_CANCELLED: 16296,
      TEST_ACTION_FOR_CALLER_CONTEXT_TWO: 29998,
      GINANDI_TEST: 32339,
    });
    f["default"] = a;
  },
  66
);
__d(
  "USIDFlag",
  ["$InternalEnum"],
  function (a, b, c, d, e, f) {
    a = b("$InternalEnum")({
      HTTP_HEADER_SESSION: "HH",
      LOCAL_STORAGE_FAILURE: "LSF",
      SERVER_GENERATED_SESSION: "SGS",
      SERVER_PARSE_FAILURE: "SPF",
      SESSION_STORAGE_FAILURE: "SSF",
      UNKNOWN_VERSION_FAILURE: "UVF",
      UNKOWN_DATA_FAILURE: "UDF",
    });
    c = a;
    f["default"] = c;
  },
  66
);
__d(
  "USIDUtils",
  ["Cookie", "Random", "WebStorage"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = 4294967295,
      j = 36,
      k = "usidt",
      l = "usida",
      m = 1,
      n = 6;
    function a() {
      var a = [];
      (h || (h = c("WebStorage"))).isLocalStorageQuotaExceeded() &&
        a.push("LSF");
      (h || (h = c("WebStorage"))).isSessionStorageQuotaExceeded() &&
        a.push("SSF");
      return a;
    }
    function o(a) {
      var b = Math.floor(Date.now() / 1e3),
        c = Math.floor(d("Random").random() * i);
      a = a + Number(b & i).toString(j) + c.toString(j);
      return a;
    }
    function p(a, b, c) {
      if (a == null) return { ver: m, id: o(c) };
      a = a.getItem(b);
      if (a == null) return { ver: m, id: o(c) };
      b = JSON.parse(a);
      return b.ver !== m ? { ver: m, id: o(c) } : b;
    }
    function q(a, b, d) {
      if (a == null) return;
      (h || (h = c("WebStorage"))).setItemGuarded(a, b, JSON.stringify(d));
    }
    function r(a, b) {
      if (c("Cookie") == null) return { ver: m, id: o(b) };
      a = c("Cookie").get(a);
      if (a == null || a == "") return { ver: m, id: o(b) };
      var d;
      try {
        d = JSON.parse(a);
      } catch (b) {
        d = JSON.parse(atob(a));
      }
      return d.ver !== m ? { ver: m, id: o(b) } : d;
    }
    function s(a, b) {
      if (c("Cookie") == null) return;
      c("Cookie").set(a, btoa(JSON.stringify(b)));
    }
    function b() {
      var a = p(
        (h || (h = c("WebStorage"))).getSessionStorageForRead(),
        k,
        "T"
      );
      return a.id;
    }
    function e(a) {
      q((h || (h = c("WebStorage"))).getSessionStorage(), k, { ver: m, id: a });
    }
    function t() {
      var a,
        b = r(l, "A");
      return {
        id: b.id,
        time: (a = b.time) != null ? a : 0,
        startTime: (a = b.startTime) != null ? a : 0,
      };
    }
    function f(a) {
      s(l, { ver: m, id: a.id, time: a.time });
      var b = t();
      return b.id === a.id && b.time === a.time;
    }
    g.VERSION = n;
    g.getFlags = a;
    g.generateId = o;
    g.getExistingTabId = b;
    g.writeTabId = e;
    g.getExistingActivityInfo = t;
    g.writeActivityInfo = f;
  },
  98
);
__d(
  "USIDCore",
  ["DateConsts", "USIDUtils", "asyncParams"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = 30,
      i = d("DateConsts").MIN_PER_HOUR * 5,
      j = 2,
      k = "__usid";
    function l() {
      return Math.floor(Date.now() / d("DateConsts").MS_PER_SEC);
    }
    a = (function () {
      function a(a, b, c, e, f, g) {
        this.$1 = a;
        this.$2 = b;
        this.$3 = c;
        this.$8 = e;
        this.$9 = f;
        this.$4 = g.activityTrigger;
        this.$5 = ((b = g.activityTimeoutInMin) != null ? b : h) * 60;
        this.$6 = ((c = g.activityMaxTimeInMin) != null ? c : i) * 60;
        this.$7 = ((e = g.activityCacheTimeoutInMin) != null ? e : j) * 60;
        this.$10 = 0;
        d("USIDUtils").writeTabId(a);
        this.triggerActivity();
      }
      var b = a.prototype;
      b.getFlags = function () {
        return this.$9;
      };
      b.getRequestVersion = function () {
        return this.$8;
      };
      b.getSessionVersion = function () {
        return d("USIDUtils").VERSION;
      };
      b.getTabId = function () {
        return this.$1;
      };
      b.getPageId = function () {
        return this.$2;
      };
      b.getTransitionId = function () {
        return this.$3;
      };
      b.getActivityId = function () {
        var a = this.$11();
        return a.id;
      };
      b.getActivityTimeOut = function () {
        var a = d("USIDUtils").getExistingActivityInfo(),
          b = l();
        return this.$5 - (b - a.time);
      };
      b.getActivityMaxTime = function () {
        var a = d("USIDUtils").getExistingActivityInfo(),
          b = l();
        return this.$6 - (b - a.startTime);
      };
      b.getSessionID = function () {
        return (
          this.getTabId() +
          ":" +
          this.getPageId() +
          ":" +
          this.getTransitionId() +
          "-" +
          this.getActivityId()
        );
      };
      b.serializeForRequest = function () {
        this.$4 === "request" && this.triggerActivity();
        return this.$12();
      };
      b.$12 = function () {
        var a = this.getSessionVersion(),
          b = this.getSessionID(),
          c = this.getRequestVersion(),
          d = this.getFlags().join(",");
        return a + "-" + b + "-RV=" + c + ":F=" + d;
      };
      b.contextData = function () {
        return { usid_override: "" };
      };
      b.$11 = function () {
        var a = d("USIDUtils").getExistingActivityInfo(),
          b = this.$13(a);
        b && this.$14(a);
        return a;
      };
      b.$14 = function (a) {
        a = d("USIDUtils").writeActivityInfo(a);
        a && d("asyncParams").add(k, this.$12());
      };
      b.$13 = function (a) {
        var b = l();
        if (b - a.time > this.$5) {
          a.id = d("USIDUtils").generateId("A");
          a.time = b;
          a.startTime = b;
          return !0;
        }
        return !1;
      };
      b.triggerActivity = function () {
        var a = l();
        if (a - this.$10 > this.$7) {
          var b = this.$11();
          b.time = a;
          this.$14(b);
          this.$10 = a;
        }
      };
      b.nextTransition = function () {
        this.triggerActivity(), this.$3++;
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "USID",
  ["USIDCore", "USIDMetadata", "USIDUtils"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = null,
      i = function (a) {
        if (h != null) return h;
        var b = d("USIDUtils").getExistingTabId(),
          e = c("USIDMetadata").page_id,
          f = c("USIDMetadata").transition_id,
          g = c("USIDMetadata").version,
          i = d("USIDUtils").getFlags();
        h = new (c("USIDCore"))(b, e, f, g, i, a);
        return h;
      };
    a = function () {
      return i({ activityTrigger: "request" });
    };
    b = { init: i, get: a };
    g["default"] = b;
  },
  98
);
__d(
  "QuickPerformanceLogger",
  [
    "Arbiter",
    "Env",
    "FBLogger",
    "ODS",
    "PerfFalcoEvent",
    "PerfXSharedFields",
    "Promise",
    "QPLCore",
    "QPLEvent",
    "QPLInspector",
    "Run",
    "USID",
    "WebStorage",
    "clearTimeout",
    "cr:1984081",
    "cr:686",
    "gkx",
    "guid",
    "performanceAbsoluteNow",
    "performanceNavigationStart",
    "performanceNow",
    "setTimeout",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k,
      l,
      m,
      n,
      o = [270220746, 270206071, 270210288, 270212866],
      p = typeof window !== "undefined" ? window : self;
    function q(a) {
      var b = c("PerfXSharedFields").getCommonData();
      b = {
        memory_stats: {
          total_mem: b.ram_gb != null ? b.ram_gb * 1073741824 : null,
        },
        network_stats: {
          downlink_megabits: b.downlink_megabits,
          network_subtype: b.effective_connection_type,
          rtt_ms: b.rtt_ms,
        },
        sitedata_info: {
          client_push_phase: b.client_push_phase,
          client_revision: b.client_revision,
          server_revision: b.server_revision,
        },
        locale_info: { locale: b.locale, isRTL: b.isRTL },
      };
      c("gkx")("20836") &&
        (b.workplace_info = { is_gemini: c("gkx")("21050") });
      if (
        c("gkx")("21051") &&
        typeof p.__sapienzMetadataCallback__ === "function"
      ) {
        var d = p.__sapienzMetadataCallback__();
        b.sapienz = {
          request_id: String(d.requestId),
          config_name: String(d.configName),
        };
      }
      c("gkx")("21052") &&
        (b.usid = { usid_override: c("USID").get().serializeForRequest() });
      return babelHelpers["extends"]({}, a, {
        metadata: babelHelpers["extends"]({}, a.metadata, b),
      });
    }
    function r(a, b, c) {
      return { i: a, m: c, r: b };
    }
    function s(a, d) {
      return new (n || (n = b("Promise")))(function () {
        var b = d || a;
        typeof p.__je2e_recordQPLMarker === "function" &&
          p.__je2e_recordQPLMarker(b);
        (m || (m = c("Env"))).enable_qplinspector === !0 &&
          c("QPLInspector").appendLog(b);
        c("gkx")("21053") ||
        c("gkx")("20935") ||
        c("gkx")("21054") ||
        c("gkx")("5679")
          ? c("PerfFalcoEvent").logImmediately(function () {
              return b;
            })
          : c("gkx")("2160") || c("gkx")("21055") || c("gkx")("1624")
          ? c("PerfFalcoEvent").logCritical(function () {
              return b;
            })
          : c("PerfFalcoEvent").log(function () {
              return b;
            });
      });
    }
    function t(a) {
      a = (h || (h = d("QPLEvent"))).getMarkerId(a);
      if (o.includes(a)) {
        var b = a + "_" + c("guid")();
        (l || (l = d("ODS"))).bumpEntityKey(
          2401,
          "obc.www.all",
          "qpl.adsmanager.instance_id_generated." + a
        );
        return b;
      }
      return null;
    }
    function u(a) {
      a = babelHelpers["extends"]({}, a, {
        config_type: c("gkx")("21056") ? "alpha_beta" : "prod",
      });
      return q(a);
    }
    function v() {
      return (
        (m || (m = c("Env"))).enable_qplinspector === !0 ||
        typeof p.__je2e_recordQPLMarker === "function" ||
        c("gkx")("21057")
      );
    }
    function w() {
      c("Arbiter").inform("qpl_debugger_finished");
    }
    var x = (i || (i = c("performanceAbsoluteNow")))();
    typeof p.__je2e_felabsTracePlugin_setQplInit === "function" &&
      p.__je2e_felabsTracePlugin_setQplInit((j || (j = c("performanceNow")))());
    var y = {
        debug: function (a, b, c) {},
        warn: function (a) {
          c("FBLogger")("qpl").blameToPreviousDirectory().warn(a);
        },
      },
      z = "qpl";
    a = (function (a) {
      babelHelpers.inheritsLoose(e, a);
      function e() {
        var b;
        b =
          a.call(this, {
            decorateEventBeforeUpload: u,
            unsampleAllEvents: v,
            onDebuggingIdEnded: w,
            monotonicNowMs: i || (i = c("performanceAbsoluteNow")),
            unixNowMs: i || (i = c("performanceAbsoluteNow")),
            moduleLoadTimestamp: x,
            logger: y,
            sendEvent: s,
            adsManagerInstanceIDGenerator: t,
            runtimeAbstractionLayer: {
              setTimeout: c("setTimeout"),
              clearTimeout: c("clearTimeout"),
            },
            debugLoggingEnabled: (m || (m = c("Env"))).qpl_debug_logging,
          }) || this;
        var e = c("gkx")("21055")
          ? c("gkx")("21058")
            ? function (a) {
                return d("Run").onBeforeUnload(a, !1);
              }
            : d("Run").onBeforeUnload
          : d("Run").onUnload;
        e(function () {
          b.$QuickPerformanceLogger$p_1(),
            b.$QuickPerformanceLogger$p_2(706, {
              respectUnloadPolicy: !0,
              timestamp: b.currentTimestamp(),
            });
        });
        b.$QuickPerformanceLogger$p_3();
        b.initQplFlipperPlugin();
        b.initQplSapienzPlugin();
        return b;
      }
      var f = e.prototype;
      f.$QuickPerformanceLogger$p_3 = function () {
        var a = this,
          b = (k || (k = c("WebStorage"))).getSessionStorageForRead();
        if (!b) {
          this.$QuickPerformanceLogger$p_4(
            "#loadSavedState",
            "sessionStorage is not available"
          );
          return;
        }
        var d = b.getItem(z);
        if (d == null) return;
        b.removeItem(z);
        b = JSON.parse(d);
        if (b == null) {
          this.$QuickPerformanceLogger$p_4(
            "#loadSavedState",
            "Saved state failed to deserialize"
          );
          return;
        }
        if (b.markers == null || b.markers.length === 0) {
          this.$QuickPerformanceLogger$p_4(
            "#loadSavedState",
            "No saved markers found"
          );
          return;
        }
        b.markers.forEach(function (b) {
          var c = b[0],
            d = b[1];
          b = b[2];
          a.addMarker(c, d, b);
          a.$QuickPerformanceLogger$p_4(
            "#loadSavedState",
            "Marker " + c + " (instanceKey: " + d + ") resumed"
          );
        });
      };
      f.$QuickPerformanceLogger$p_1 = function () {
        var a = this,
          b = [];
        this.activeMarkers.forEach(function (a, c) {
          a.forEach(function (a, d) {
            a.resumeAfterNavigation === !0 &&
              (delete a.resumeAfterNavigation, b.push([c, d, a]));
          });
        });
        if (b.length > 0) {
          var d = { markers: b },
            e = (k || (k = c("WebStorage"))).getSessionStorage();
          e = k.setItemGuarded(e, z, JSON.stringify(d));
          e &&
            (b.forEach(function (b) {
              var c = b[0],
                d = b[1];
              b = b[2];
              c = r(c, b.sampleRate, b.samplingMethod);
              a.markerEnd(c, 96, d);
            }),
            this.$QuickPerformanceLogger$p_4(
              "#storeSavedState",
              "Failed to store saved state: " + e.message
            ),
            c("FBLogger")("qpl")
              .catching(e)
              .warn(
                "Failed to store QPL state: " + JSON.stringify(d, null, 2)
              ));
          b.forEach(function (b) {
            var c = b[0];
            b = b[1];
            a.deleteMarker(c, b);
          });
        }
      };
      f.markerStoreBeforeNavigation = function (a, b) {
        b = b === void 0 ? {} : b;
        b = b.instanceKey;
        b = b === void 0 ? 0 : b;
        var c = (h || (h = d("QPLEvent"))).getMarkerId(a);
        a = this.getMarker(a, b);
        if (!a) {
          this.$QuickPerformanceLogger$p_4(
            "markerStoreBeforeNavigation",
            "Failed to set marker to store on page unload. Could not find marker " +
              c +
              ", instancekey=" +
              b
          );
          return;
        }
        a.resumeAfterNavigation = !0;
        this.$QuickPerformanceLogger$p_4(
          "markerStoreBeforeNavigation",
          "Set marker " + c + " to store on page unload, instancekey=" + b
        );
      };
      f.markerStartFromNavStart = function (a, b, d) {
        b === void 0 && (b = 0);
        d = d === void 0 ? {} : d;
        var e = d.cancelExisting;
        e = e === void 0 ? !1 : e;
        var f = d.cancelOnUnload;
        f = f === void 0 ? !1 : f;
        var g = d.trackedForLoss;
        g = g === void 0 ? !1 : g;
        var h = d.type;
        h = h === void 0 ? 1 : h;
        var i = d.qplInternalDoNotUseConvertToTimeOnServer,
          j = d.onMarkerTimeout__DoNotUse;
        d = d.timeoutMS;
        d = d === void 0 ? null : d;
        var k = c("performanceNavigationStart")();
        i = typeof i === "function" ? i(k) : void 0;
        this.markerStart(a, b, k, {
          cancelExisting: e,
          cancelOnUnload: f,
          trackedForLoss: g,
          type: h,
          qplInternalDoNotUseAbsoluteTimeOrigin: i,
          onMarkerTimeout__DoNotUse: j,
          timeoutMS: d,
        });
        if (c("performanceNavigationStart").isPolyfilled) {
          k = this.getMarker(a, b);
          k && (k.timestampIsApproximate = !0);
        }
      };
      f.markerStartForJoinFromNavStart = function (a, b, d) {
        d = d === void 0 ? {} : d;
        var e = d.instanceKey;
        e = e === void 0 ? 0 : e;
        var f = d.cancelExisting;
        f = f === void 0 ? !1 : f;
        var g = d.cancelOnUnload;
        g = g === void 0 ? !1 : g;
        var h = d.trackedForLoss;
        h = h === void 0 ? !1 : h;
        var i = d.type;
        i = i === void 0 ? 1 : i;
        var j = d.qplInternalDoNotUseConvertToTimeOnServer,
          k = d.absoluteTimeOriginMs,
          l = d.sourceIsPrimary;
        l = l === void 0 ? !1 : l;
        var m = d.closeSession,
          n = d.unreliableSourceClockProcessId,
          o = d.onMarkerTimeout__DoNotUse;
        d = d.timeoutMS;
        var p = c("performanceNavigationStart")();
        j = typeof j === "function" ? j(p) : void 0;
        this.markerStartForJoin(a, b, {
          instanceKey: e,
          cancelExisting: f,
          cancelOnUnload: g,
          trackedForLoss: h,
          type: i,
          qplInternalDoNotUseAbsoluteTimeOrigin: j,
          monotonicTimestamp: p,
          absoluteTimeOriginMs: k,
          sourceIsPrimary: l,
          closeSession: m,
          unreliableSourceClockProcessId: n,
          timeoutMS: d,
          onMarkerTimeout__DoNotUse: o,
        });
        if (c("performanceNavigationStart").isPolyfilled) {
          b = this.getMarker(a, e);
          b && (b.timestampIsApproximate = !0);
        }
      };
      f.$QuickPerformanceLogger$p_2 = function (a, b) {
        var c = this;
        b = b === void 0 ? {} : b;
        var d = b.timestamp,
          e = b.respectUnloadPolicy;
        this.activeMarkers.forEach(function (b, f) {
          b.forEach(function (b, g) {
            if (!e || b.cancelOnUnload === !0) {
              b = r(f, b.sampleRate, b.samplingMethod);
              c.markerEnd(b, a, g, d);
            }
          });
        });
      };
      f.$QuickPerformanceLogger$p_4 = function (a, b, c) {
        y.debug(a, b, c);
      };
      f.initQplFlipperPlugin = function () {
        b("cr:686") != null &&
          this.addListener(b("cr:686").qplFlipperPlugin.listener());
      };
      f.initQplSapienzPlugin = function () {
        b("cr:1984081") != null &&
          this.addListener(b("cr:1984081").getQplSapienzListener());
      };
      return e;
    })(c("QPLCore"));
    e = new a();
    f.exports = e;
  },
  34
);
__d(
  "qpl",
  ["QPLHasteSupportDataStorage", "recoverableViolation"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = {};
    a = {
      _: function (a, b) {
        var d = h[b];
        if (d == null) {
          var e = c("QPLHasteSupportDataStorage").get(b);
          e == null
            ? (c("recoverableViolation")(
                "Failed to find a Haste-supplied config for the QPL event " +
                  ("identified by token `" + b + "`."),
                "staticresources"
              ),
              (d = { i: a }))
            : (d = babelHelpers["extends"]({ i: a }, e));
          h[b] = d;
        }
        return d;
      },
    };
    b = a;
    g["default"] = b;
  },
  98
);
