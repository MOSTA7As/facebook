/*FB_PKG_DELIM*/

__d(
  "GeneratedLoggerUtils",
  [
    "invariant",
    "Banzai",
    "JstlMigrationFalcoEvent",
    "getDataWithLoggerOptions",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = window.location.search.indexOf("showlog") > -1;
    function a(a, c, d, e) {
      var f = b("getDataWithLoggerOptions")(c, e);
      c = a.split(":")[0];
      var g = a.split(":")[1];
      c == "logger"
        ? b("JstlMigrationFalcoEvent").log(function () {
            return { logger_config_name: g, payload: f };
          })
        : b("Banzai").post(a, f, d);
      h;
    }
    c = {
      log: a,
      serializeVector: function (a) {
        if (!a) return a;
        if (Array.isArray(a)) return a;
        if (a.toArray) {
          var b = a;
          return b.toArray();
        }
        if (
          typeof a === "object" &&
          a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]
        )
          return Array.from(a);
        g(0, 3874, a);
      },
      serializeMap: function (a) {
        if (!a) return a;
        if (a.toJS) {
          var b = a;
          return b.toJS();
        }
        if (
          typeof a === "object" &&
          a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]
        ) {
          b = a;
          var c = {};
          for (
            var b = b,
              d = Array.isArray(b),
              e = 0,
              b = d
                ? b
                : b[
                    typeof Symbol === "function"
                      ? Symbol.iterator
                      : "@@iterator"
                  ]();
            ;

          ) {
            var f;
            if (d) {
              if (e >= b.length) break;
              f = b[e++];
            } else {
              e = b.next();
              if (e.done) break;
              f = e.value;
            }
            f = f;
            c[f[0]] = f[1];
          }
          return c;
        }
        if (Object.prototype.toString.call(a) === "[object Object]") return a;
        g(0, 3875, a);
      },
      checkExtraDataFieldNames: function (a, b) {
        Object.keys(a).forEach(function (a) {
          Object.prototype.hasOwnProperty.call(b, a) && g(0, 3876, a);
        });
      },
      warnForInvalidFieldNames: function (a, b, c, d) {},
      throwIfNull: function (a, b) {
        a || g(0, 3877, b);
        return a;
      },
    };
    e.exports = c;
  },
  null
);
