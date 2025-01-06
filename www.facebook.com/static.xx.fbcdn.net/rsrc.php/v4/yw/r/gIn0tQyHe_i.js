/*FB_PKG_DELIM*/

__d(
  "UserActivity",
  ["cr:1634616"],
  function (a, b, c, d, e, f) {
    e.exports = b("cr:1634616");
  },
  null
);
__d(
  "UserActivityBlue",
  ["Arbiter", "Event", "isTruthy"],
  function (a, b, c, d, e, f) {
    var g = 5e3,
      h = 500,
      i = -5,
      j = Date.now(),
      k = j,
      l = !1,
      m = Date.now(),
      n = document.hasFocus ? document.hasFocus() : !0,
      o = 0,
      p = Date.now(),
      q = -1,
      r = -1,
      s = !1,
      t = !1,
      u = {
        EVENT_INTERVAL_MS: h,
        subscribeOnce: function (a) {
          var b = u.subscribe(function (c, d) {
            u.unsubscribe(b), a(d);
          });
          return b;
        },
        subscribe: function (a) {
          return b("Arbiter").subscribe("useractivity/activity", a);
        },
        unsubscribe: function (a) {
          a.unsubscribe();
        },
        isActive: function (a) {
          return new Date().getTime() - j < (b("isTruthy")(a) ? a : g);
        },
        isOnTab: function () {
          return n;
        },
        hasBeenInactive: function () {
          return l;
        },
        resetActiveStatus: function () {
          (n = !0), (l = !1);
        },
        getLastInActiveEnds: function () {
          return m;
        },
        getLastActive: function () {
          return j;
        },
        setIdleTime: function (a) {
          o = a;
        },
        getLastLeaveTime: function () {
          return p;
        },
        getLastInformTime: function () {
          return k;
        },
        hasClicked: function () {
          return s;
        },
        hasInteractedWithKeyboard: function () {
          return t;
        },
        reset: function () {
          (j = Date.now()),
            (k = j),
            (l = !1),
            (m = Date.now()),
            (n = document.hasFocus ? document.hasFocus() : !0),
            (o = 0),
            (p = Date.now()),
            (q = -1),
            (r = -1),
            (s = !1),
            (t = !1);
        },
      };
    function v(a) {
      x(a, h);
    }
    function w(a) {
      x(a, 0);
    }
    function x(c, d) {
      d === void 0 && (d = 0);
      var e = a.KeyboardEvent,
        f = a.MouseEvent;
      if (f && c instanceof f) {
        if (
          /^mouse(enter|leave|move|out|over)$/.test(c.type) &&
          c.pageX == q &&
          c.pageY == r
        )
          return;
        q = c.pageX;
        r = c.pageY;
      } else e && c instanceof e && (t = !0);
      (c.type === "click" ||
        c.type === "dblclick" ||
        c.type === "contextmenu") &&
        (s = !0);
      j = Date.now();
      f = j - k;
      f > d
        ? ((k = j),
          n || (p = j),
          f >= (o || g) && ((l = !0), (m = j)),
          b("Arbiter").inform("useractivity/activity", {
            event: c,
            idleness: f,
            last_inform: k,
          }))
        : f < i && (k = j);
    }
    function c(a) {
      (n = !0), (m = Date.now()), w(a);
    }
    function d(a) {
      (n = !1), (l = !0), (p = Date.now());
    }
    b("Event").listen(window, "scroll", v);
    b("Event").listen(window, "focus", c);
    b("Event").listen(window, "blur", d);
    b("Event").listen(
      document.documentElement,
      { keydown: v, mouseover: v, mousemove: v, click: v },
      void 0,
      void 0,
      { passive: !0 }
    );
    b("Arbiter").subscribe("Event/stop", function (a, b) {
      v(b.event);
    });
    e.exports = u;
  },
  null
);
