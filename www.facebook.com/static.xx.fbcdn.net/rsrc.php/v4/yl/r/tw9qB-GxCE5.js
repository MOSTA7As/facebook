/*FB_PKG_DELIM*/

__d(
  "CometLruCache",
  ["recoverableViolation"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = (function () {
      function a(a, b) {
        (this.$1 = a),
          (this.$2 = b),
          a <= 0 &&
            c("recoverableViolation")(
              "CometLruCache: Unable to create instance of cache with zero or negative capacity.",
              "CometLruCache"
            ),
          (this.$3 = new Map());
      }
      var b = a.prototype;
      b.set = function (a, b) {
        this.$3["delete"](a);
        this.$3.set(a, { timestamp: Date.now(), value: b });
        if (this.$3.size > this.$1) {
          a = this.$3.keys().next();
          a.done || this.$3["delete"](a.value);
        }
      };
      b.get = function (a) {
        var b = this.$3.get(a);
        if (b != null) {
          if (Date.now() > b.timestamp + this.$2) {
            this.$3["delete"](a);
            return null;
          }
          this.$3["delete"](a);
          this.$3.set(a, b);
          return b.value;
        }
        return null;
      };
      b.has = function (a) {
        return this.$3.has(a);
      };
      b["delete"] = function (a) {
        this.$3["delete"](a);
      };
      b.size = function () {
        return this.$3.size;
      };
      b.capacity = function () {
        return this.$1 - this.$3.size;
      };
      b.clear = function () {
        this.$3.clear();
      };
      return a;
    })();
    function a(a, b) {
      b === void 0 && (b = Number.MAX_SAFE_INTEGER);
      return new h(a, b);
    }
    g.create = a;
  },
  98
);
__d(
  "structuredClone",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    b = (a = window) == null ? void 0 : a.structuredClone;
    f["default"] = b;
  },
  66
);
__d(
  "ConstUriUtils",
  [
    "CometLruCache",
    "ExecutionEnvironment",
    "FBLogger",
    "PHPQuerySerializer",
    "PHPQuerySerializerNoEncoding",
    "URIRFC3986",
    "URISchemes",
    "UriNeedRawQuerySVConfig",
    "isSameOrigin",
    "nullthrows",
    "recoverableViolation",
    "structuredClone",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k,
      l = d("CometLruCache").create(5e3),
      m = new RegExp("(^|\\.)facebook\\.com$", "i"),
      n = new RegExp("(^|\\.)messenger\\.com$", "i"),
      o = new RegExp("(^|\\.)instagram\\.com$", "i"),
      p = new RegExp("^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)"),
      q = new RegExp(
        "[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"
      ),
      r = c("UriNeedRawQuerySVConfig").uris.map(function (a) {
        return { domain: a, valid: y(a) };
      }),
      s = [],
      t = [];
    function u(a, b) {
      var d = {};
      if (a != null)
        for (
          var a = a.entries(),
            e = Array.isArray(a),
            f = 0,
            a = e
              ? a
              : a[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var g;
          if (e) {
            if (f >= a.length) break;
            g = a[f++];
          } else {
            f = a.next();
            if (f.done) break;
            g = f.value;
          }
          g = g;
          d[g[0]] = g[1];
        }
      else
        c("FBLogger")("ConstUriUtils").warn(
          "Passed a null query map in, this means poor client side flow coverage or client/server boundary type issue."
        );
      return b.serialize(d);
    }
    function v(a, b, d) {
      var e = k || (k = c("PHPQuerySerializer"));
      if (["http", "https"].includes(b) && w(a)) {
        if (a.includes("doubleclick.net") && d != null && !d.startsWith("http"))
          return e;
        e = c("PHPQuerySerializerNoEncoding");
      }
      return e;
    }
    function w(a) {
      return (
        a != null &&
        r.some(function (b) {
          return b.valid && x(a, b.domain);
        })
      );
    }
    function x(a, b) {
      if (b === "" || a === "") return !1;
      if (a.endsWith(b)) {
        b = a.length - b.length - 1;
        if (b === -1 || a[b] === ".") return !0;
      }
      return !1;
    }
    function y(a) {
      return !q.test(a);
    }
    function z(a, b) {
      var c =
        b.protocol != null && b.protocol !== "" ? b.protocol : a.getProtocol();
      c = b.domain != null ? v(b.domain, c) : a.getSerializer();
      c = {
        domain: a.getDomain(),
        fragment: a.getFragment(),
        fragmentSeparator: a.hasFragmentSeparator(),
        isGeneric: a.isGeneric(),
        originalRawQuery: a.getOriginalRawQuery(),
        path: a.getPath(),
        port: a.getPort(),
        protocol: a.getProtocol(),
        queryParams: a.getQueryParams(),
        serializer: c,
        subdomain: a.getSubdomain(),
      };
      a = babelHelpers["extends"]({}, c, b);
      c = b.queryParams != null && b.queryParams.size !== 0;
      return E.getUribyObject(a, c);
    }
    function A(a, b, c, d) {
      c === void 0 && (c = !1);
      var e =
          a.protocol !== "" ? a.protocol + ":" + (a.isGeneric ? "" : "//") : "",
        f = a.domain !== "" ? a.domain : "",
        g = a.port !== "" ? ":" + a.port : "",
        h =
          a.path !== ""
            ? a.path
            : (e !== "" && e !== "mailto:") || f !== "" || g !== ""
            ? "/"
            : "";
      c = B(
        f,
        a.originalRawQuery,
        a.queryParams,
        b,
        c,
        (b = d) != null ? b : a.serializer
      );
      d = c.length > 0 ? "?" : "";
      b = a.fragment !== "" ? "#" + a.fragment : "";
      a = a.fragment === "" && a.fragmentSeparator ? "#" : "";
      return "" + e + f + g + h + d + c + a + b;
    }
    function B(a, b, c, d, e, f) {
      e === void 0 && (e = !1);
      if (!d && (e || w(a))) {
        return (d = b) != null ? d : "";
      }
      return u(c, f);
    }
    function C(a) {
      var b = a.trim();
      b = (h || (h = d("URIRFC3986"))).parse(b) || {
        fragment: null,
        host: null,
        isGenericURI: !1,
        query: null,
        scheme: null,
        userinfo: null,
      };
      var c = b.host || "",
        e = c.split(".");
      e = e.length >= 3 ? e[0] : "";
      var f = v(c, b.scheme || "", b.query),
        g = f.deserialize(b.query || "") || {};
      g = new Map(Object.entries(g));
      g = D(
        {
          domain: c,
          fragment: b.fragment || "",
          fragmentSeparator: b.fragment === "",
          isGeneric: b.isGenericURI,
          originalRawQuery: b.query,
          path: b.path || "",
          port: b.port != null ? String(b.port) : "",
          protocol: (b.scheme || "").toLowerCase(),
          queryParams: g,
          serializer: f,
          subdomain: e,
          userInfo: (c = b == null ? void 0 : b.userinfo) != null ? c : "",
        },
        a
      );
      return g;
    }
    function D(a, b, c, e) {
      c === void 0 &&
        (c = (j || (j = d("URISchemes"))).Options.INCLUDE_DEFAULTS);
      var f = {
          components: babelHelpers["extends"]({}, a),
          error: "",
          valid: !0,
        },
        g = f.components;
      if (!(j || (j = d("URISchemes"))).isAllowed(a.protocol, c, e)) {
        f.valid = !1;
        f.error =
          'The URI protocol "' + String(a.protocol) + '" is not allowed.';
        return f;
      }
      if (!y(a.domain || "")) {
        f.valid = !1;
        f.error = "This is an unsafe domain " + String(a.domain);
        return f;
      }
      g.port = (a.port != null && String(a.port)) || "";
      if (Boolean(a.userInfo)) {
        f.valid = !1;
        f.error =
          "Invalid URI: (userinfo is not allowed in a URI " +
          String(a.userInfo) +
          ")";
        return f;
      }
      c = b != null && b !== "" ? b : A(g, !1);
      if (g.domain === "" && g.path.indexOf("\\") !== -1) {
        f.valid = !1;
        f.error =
          "Invalid URI: (no domain but multiple back-slashes " + c + ")";
        return f;
      }
      if (!g.protocol && p.test(c)) {
        f.valid = !1;
        f.error = "Invalid URI: (unsafe protocol-relative URI " + c + ")";
        return f;
      }
      if (g.domain !== "" && g.path !== "" && !g.path.startsWith("/")) {
        f.valid = !1;
        f.error =
          "Invalid URI: (domain and pathwhere path lacks leading slash " +
          c +
          ")";
        return f;
      }
      return f;
    }
    var E = (function () {
      function a(a) {
        (this.queryParams = new Map()),
          (this.domain = a.domain),
          (this.fragment = a.fragment),
          (this.fragmentSeparator = Boolean(a.fragmentSeparator)),
          (this.isGenericProtocol = Boolean(a.isGeneric)),
          (this.path = a.path),
          (this.originalRawQuery = a.originalRawQuery),
          (this.port = a.port),
          (this.protocol = a.protocol),
          (this.queryParams = a.queryParams),
          (this.serializer = a.serializer),
          (this.subdomain = a.subdomain);
      }
      var b = a.prototype;
      b.addQueryParam = function (a, b) {
        if (Boolean(a)) {
          var c = this.getQueryParams();
          c.set(a, b);
          return z(this, { queryParams: c });
        }
        return this;
      };
      b.addQueryParams = function (a) {
        if (a.size > 0) {
          var b = this.getQueryParams();
          a.forEach(function (a, c) {
            b.set(c, a);
          });
          return z(this, { queryParams: b });
        }
        return this;
      };
      b.addQueryParamString = function (a) {
        if (Boolean(a)) {
          a = a.startsWith("?") ? a.slice(1) : a;
          var b = this.getQueryParams();
          a.split("&").map(function (a) {
            a = a.split("=");
            var c = a[0];
            a = a[1];
            b.set(c, a);
          });
          return z(this, { queryParams: b });
        }
        return this;
      };
      b.addTrailingSlash = function () {
        var a = this.getPath();
        return a.length > 0 && a[a.length - 1] !== "/"
          ? this.setPath(a + "/")
          : this;
      };
      b.getDomain = function () {
        return this.domain;
      };
      b.getFragment = function () {
        return this.fragment;
      };
      b.getOrigin = function () {
        var a = this.getPort();
        return (
          this.getProtocol() + "://" + this.getDomain() + (a ? ":" + a : "")
        );
      };
      b.getOriginalRawQuery = function () {
        return this.originalRawQuery;
      };
      b.getPath = function () {
        return this.path;
      };
      b.getPort = function () {
        return this.port;
      };
      b.getProtocol = function () {
        return this.protocol.toLowerCase();
      };
      b.getQualifiedUri = function () {
        if (!this.getDomain()) {
          var b;
          b =
            (b = typeof window !== "undefined" ? window : self) == null
              ? void 0
              : (b = b.location) == null
              ? void 0
              : b.href;
          if (b == null) {
            c("FBLogger")("ConstUriUtils")
              .blameToPreviousFile()
              .warn(
                "Cannot get qualified URI for current URI as there is no current location"
              );
            return null;
          }
          (i || (i = c("ExecutionEnvironment"))).isInWorker &&
            b.startsWith("blob:") &&
            (b = b.substring(5, b.length));
          b = b.slice(0, b.indexOf("/", b.indexOf(":") + 3));
          return a.getUri(b + this.toString());
        }
        return this;
      };
      b.getQueryParam = function (a) {
        a = this.queryParams.get(a);
        if (typeof a === "string") return a;
        else {
          a = JSON.stringify(a);
          return a == null ? a : JSON.parse(a);
        }
      };
      b.getQueryData = function () {
        return Object.fromEntries(this.getQueryParams());
      };
      b.getQueryParams = function () {
        if (c("structuredClone") != null)
          return c("structuredClone")(this.queryParams);
        var a = JSON.stringify(Array.from(this.queryParams), function (a, b) {
          return Array.isArray(b)
            ? { __CUUArr: !0, value: babelHelpers["extends"]({}, b) }
            : b;
        });
        a = JSON.parse(a, function (a, b) {
          return b != null && typeof b === "object" && b.__CUUArr
            ? Object.keys(b.value).reduce(function (a, c) {
                a[c] = b.value[c];
                return a;
              }, [])
            : b;
        });
        return new Map(a);
      };
      b.getQueryString = function (a) {
        a === void 0 && (a = !1);
        return B(
          this.domain,
          this.originalRawQuery,
          this.queryParams,
          !1,
          a,
          this.serializer
        );
      };
      b.getRegisteredDomain = function () {
        if (!this.getDomain()) return "";
        if (!this.isFacebookUri()) return null;
        var a = this.getDomain().split("."),
          b = a.indexOf("facebook");
        b === -1 && (b = a.indexOf("workplace"));
        return a.slice(b).join(".");
      };
      b.getSerializer = function () {
        return this.serializer;
      };
      b.getSubdomain = function () {
        return this.subdomain;
      };
      b.getUnqualifiedUri = function () {
        if (this.getDomain()) {
          var b = this.toString();
          return a.getUri(b.slice(b.indexOf("/", b.indexOf(":") + 3)));
        }
        return this;
      };
      a.getUri = function (b) {
        b = b.trim();
        var d = l.get(b);
        if (d == null) {
          var e = C(b);
          if (e.valid) (d = new a(e.components)), l.set(b, d);
          else {
            c("FBLogger")("ConstUriUtils").blameToPreviousFrame().warn(e.error);
            return null;
          }
        }
        return d;
      };
      a.getUriOrThrow = function (b) {
        return c("nullthrows")(a.getUri(b));
      };
      a.getUribyObject = function (b, d) {
        var e = A(b, d),
          f = l.get(e);
        if (f == null) {
          d && (b.originalRawQuery = u(b.queryParams, b.serializer));
          d = D(b);
          if (d.valid) (f = new a(d.components)), l.set(e, f);
          else {
            c("recoverableViolation")(d.error, "ConstUri");
            return null;
          }
        }
        return f;
      };
      b.hasFragmentSeparator = function () {
        return this.fragmentSeparator;
      };
      b.isEmpty = function () {
        return !(
          this.getPath() ||
          this.getProtocol() ||
          this.getDomain() ||
          this.getPort() ||
          this.queryParams.size > 0 ||
          this.getFragment()
        );
      };
      b.isFacebookUri = function () {
        var a = this.toString();
        if (a === "") return !1;
        return !this.getDomain() && !this.getProtocol()
          ? !0
          : ["https", "http"].indexOf(this.getProtocol()) !== -1 &&
              (m.test(this.getDomain()) ||
                n.test(this.getDomain()) ||
                o.test(this.getDomain()));
      };
      b.isGeneric = function () {
        return this.isGenericProtocol;
      };
      b.isSameOrigin = function (a) {
        return c("isSameOrigin")(this, a);
      };
      b.isSubdomainOfDomain = function (b) {
        var c = a.getUri(b);
        return c != null && x(this.domain, b);
      };
      b.isSecure = function () {
        return this.getProtocol() === "https";
      };
      b.removeQueryParams = function (a) {
        if (Array.isArray(a) && a.length > 0) {
          var b = this.getQueryParams();
          a.map(function (a) {
            return b["delete"](a);
          });
          return z(this, { queryParams: b });
        }
        return this;
      };
      b.removeQueryParam = function (a) {
        if (Boolean(a)) {
          var b = this.getQueryParams();
          b["delete"](a);
          return z(this, { queryParams: b });
        }
        return this;
      };
      b.removeSubdomain = function () {
        var a = this.getQualifiedUri();
        if (a == null) return null;
        var b = a.getDomain();
        b = b.split(".");
        b.length >= 3 && (b = b.slice(-2));
        return z(a, { domain: b.join("."), subdomain: "" });
      };
      b.replaceQueryParam = function (a, b) {
        if (Boolean(a)) {
          var c = this.getQueryParams();
          c.set(a, b);
          return z(this, { queryParams: c });
        }
        return this;
      };
      b.replaceQueryParams = function (a) {
        return z(this, { queryParams: a });
      };
      b.replaceQueryParamString = function (a) {
        if (a != null) {
          a = a.startsWith("?") ? a.slice(1) : a;
          var b = this.getQueryParams();
          a.split("&").map(function (a) {
            a = a.split("=");
            var c = a[0];
            a = a[1];
            b.set(c, a);
          });
          return z(this, { queryParams: b });
        }
        return this;
      };
      b.setDomain = function (a) {
        if (Boolean(a)) {
          var b = a.split(".");
          b = b.length >= 3 ? b[0] : "";
          return z(this, { domain: a, subdomain: b });
        }
        return this;
      };
      b.setFragment = function (a) {
        return a === "#"
          ? z(this, { fragment: "", fragmentSeparator: !0 })
          : z(this, { fragment: a, fragmentSeparator: a !== "" });
      };
      b.setPath = function (a) {
        return a != null ? z(this, { path: a }) : this;
      };
      b.setPort = function (a) {
        return Boolean(a) ? z(this, { port: a }) : this;
      };
      b.setProtocol = function (a) {
        return Boolean(a) ? z(this, { protocol: a }) : this;
      };
      b.setSecure = function (a) {
        return this.setProtocol(a ? "https" : "http");
      };
      b.setSubDomain = function (a) {
        if (Boolean(a)) {
          var b = this.getQualifiedUri();
          if (b == null) return null;
          var c = b.getDomain();
          c = c.split(".");
          c.length >= 3 ? (c[0] = a) : c.unshift(a);
          return z(b, { domain: c.join("."), subdomain: a });
        }
        return this;
      };
      b.stripTrailingSlash = function () {
        return this.setPath(this.getPath().replace(/\/$/, ""));
      };
      a.$1 = function (a) {
        a = a;
        for (var b = 0; b < s.length; b++) {
          var c = s[b];
          a = c(a);
        }
        return a;
      };
      a.$2 = function (a, b) {
        b = b;
        for (var c = 0; c < t.length; c++) {
          var d = t[c];
          b = d(a, b);
        }
        return b;
      };
      b.$3 = function (b, c) {
        c === void 0 && (c = !1);
        return A(
          {
            domain: a.$1(this.domain),
            fragment: this.fragment,
            fragmentSeparator: this.fragmentSeparator,
            isGeneric: this.isGenericProtocol,
            originalRawQuery: this.originalRawQuery,
            path: this.path,
            port: this.port,
            protocol: this.protocol,
            queryParams: a.$2(this.domain, this.queryParams),
            serializer: b,
            subdomain: this.subdomain,
            userInfo: "",
          },
          !1,
          c
        );
      };
      b.toStringRawQuery = function () {
        this.rawStringValue == null &&
          (this.rawStringValue = this.$3(c("PHPQuerySerializerNoEncoding")));
        return this.rawStringValue;
      };
      b.toString = function () {
        this.stringValue == null &&
          (this.stringValue = this.$3(this.serializer));
        return this.stringValue;
      };
      b.toStringPreserveQuery = function () {
        return this.$3(this.serializer, !0);
      };
      a.isValidUri = function (b) {
        var c = l.get(b);
        if (c != null) return !0;
        c = C(b);
        if (c.valid) {
          l.set(b, new a(c.components));
          return !0;
        }
        return !1;
      };
      return a;
    })();
    function a(a) {
      if (a instanceof E) return a;
      else return null;
    }
    function b(a) {
      s.push(a);
    }
    function e(a) {
      t.push(a);
    }
    f = E.getUri;
    var F = E.getUriOrThrow,
      G = E.isValidUri;
    g.isSubdomainOfDomain = x;
    g.isConstUri = a;
    g.registerDomainFilter = b;
    g.registerQueryParamsFilter = e;
    g.getUri = f;
    g.getUriOrThrow = F;
    g.isValidUri = G;
  },
  98
);
__d(
  "routeBuilderUtils",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      a = a.split("/");
      return a
        .filter(function (a) {
          return a !== "";
        })
        .map(function (a) {
          var b = a.split(/{|}/);
          if (b.length < 3) return { isToken: !1, part: a };
          else {
            a = b[0];
            var c = b[1];
            b = b[2];
            var d = c[0] === "?",
              e = c[d ? 1 : 0] === "*";
            c = c.substring((d ? 1 : 0) + (e ? 1 : 0));
            return {
              isToken: !0,
              optional: d,
              catchAll: e,
              prefix: a,
              suffix: b,
              token: c,
            };
          }
        });
    }
    f.getPathParts = a;
  },
  66
);
__d(
  "jsRouteBuilder",
  ["ConstUriUtils", "FBLogger", "routeBuilderUtils"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = "#";
    function a(a, b, e, f, g) {
      g === void 0 && (g = !1);
      var i = d("routeBuilderUtils").getPathParts(a);
      function j(j) {
        try {
          var k =
              f != null
                ? babelHelpers["extends"]({}, f, j)
                : (j = j) != null
                ? j
                : {},
            l = {};
          j = "";
          var m = !1;
          j = i.reduce(function (a, c) {
            if (!c.isToken) return a + "/" + c.part;
            else {
              var d,
                e = c.optional,
                f = c.prefix,
                g = c.suffix;
              c = c.token;
              if (e && m) return a;
              d = (d = k[c]) != null ? d : b[c];
              if (d == null && e) {
                m = !0;
                return a;
              }
              if (d == null)
                throw new Error("Missing required template parameter: " + c);
              if (d === "")
                throw new Error(
                  "Required template parameter is an empty string: " + c
                );
              l[c] = !0;
              return a + "/" + f + d + g;
            }
          }, "");
          a.slice(-1) === "/" && (j += "/");
          j === "" && (j = "/");
          var n = d("ConstUriUtils").getUri(j);
          for (var o in k) {
            var p = k[o];
            !l[o] &&
              p != null &&
              n != null &&
              (e != null && e.has(o)
                ? p !== !1 && (n = n.addQueryParam(o, null))
                : (n = n.addQueryParam(o, p)));
          }
          return [n, j];
        } catch (b) {
          p = b == null ? void 0 : b.message;
          o = c("FBLogger")("JSRouteBuilder")
            .blameToPreviousFrame()
            .blameToPreviousFrame();
          g && (o = o.blameToPreviousFrame());
          o.mustfix("Failed building URI for base path: %s message: %s", a, p);
          return [null, h];
        }
      }
      return {
        buildUri: function (a) {
          a = (a = j(a)[0]) != null ? a : d("ConstUriUtils").getUri(h);
          if (a == null)
            throw new Error("Not even the fallback URL parsed validly!");
          return a;
        },
        buildUriNullable: function (a) {
          return j(a)[0];
        },
        buildURL: function (a) {
          a = j(a);
          var b = a[0];
          a = a[1];
          return (b = b == null ? void 0 : b.toString()) != null ? b : a;
        },
        buildURLStringDEPRECATED: function (a) {
          a = j(a);
          var b = a[0];
          a = a[1];
          return (b = b == null ? void 0 : b.toString()) != null ? b : a;
        },
        getPath: function () {
          return a;
        },
      };
    }
    g["default"] = a;
  },
  98
);
__d(
  "ArbiterMixin",
  ["Arbiter", "guid"],
  function (a, b, c, d, e, f, g) {
    var h = "arbiter$" + c("guid")(),
      i = Object.prototype.hasOwnProperty;
    a = {
      _getArbiterInstance: function () {
        return i.call(this, h) ? this[h] : (this[h] = new (c("Arbiter"))());
      },
      inform: function (a, b, c) {
        return this._getArbiterInstance().inform(a, b, c);
      },
      subscribe: function (a, b, c) {
        return this._getArbiterInstance().subscribe(a, b, c);
      },
      subscribeOnce: function (a, b, c) {
        return this._getArbiterInstance().subscribeOnce(a, b, c);
      },
      unsubscribe: function (a) {
        this._getArbiterInstance().unsubscribe(a);
      },
      unsubscribeCurrentSubscription: function () {
        this._getArbiterInstance().unsubscribeCurrentSubscription();
      },
      releaseCurrentPersistentEvent: function () {
        this._getArbiterInstance().releaseCurrentPersistentEvent();
      },
      registerCallback: function (a, b) {
        return this._getArbiterInstance().registerCallback(a, b);
      },
      query: function (a) {
        return this._getArbiterInstance().query(a);
      },
    };
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "FbtResultBase",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    var g = (function () {
      function a(a, b) {
        (this.$1 = a),
          (this.__errorListener = b),
          (this.$3 = !1),
          (this.$2 = null);
      }
      var b = a.prototype;
      b.flattenToArray = function () {
        return a.flattenToArray(this.$1);
      };
      b.getContents = function () {
        return this.$1;
      };
      b.toString = function () {
        if (Object.isFrozen(this)) return this.$4();
        if (this.$3) return "<<Reentering fbt.toString() is forbidden>>";
        this.$3 = !0;
        try {
          return this.$4();
        } finally {
          this.$3 = !1;
        }
      };
      b.$4 = function () {
        if (this.$2 != null) return this.$2;
        var b = "",
          c = this.flattenToArray();
        for (var d = 0; d < c.length; ++d) {
          var e = c[d];
          if (typeof e === "string" || e instanceof a) b += e.toString();
          else {
            var f;
            (f = this.__errorListener) == null
              ? void 0
              : f.onStringSerializationError == null
              ? void 0
              : f.onStringSerializationError(e);
          }
        }
        Object.isFrozen(this) || (this.$2 = b);
        return b;
      };
      b.toJSON = function () {
        return this.toString();
      };
      a.flattenToArray = function (b) {
        var c = [];
        for (var d = 0; d < b.length; ++d) {
          var e = b[d];
          Array.isArray(e)
            ? c.push.apply(c, a.flattenToArray(e))
            : e instanceof a
            ? c.push.apply(c, e.flattenToArray())
            : c.push(e);
        }
        return c;
      };
      return a;
    })();
    [
      "anchor",
      "big",
      "blink",
      "bold",
      "charAt",
      "charCodeAt",
      "codePointAt",
      "contains",
      "endsWith",
      "fixed",
      "fontcolor",
      "fontsize",
      "includes",
      "indexOf",
      "italics",
      "lastIndexOf",
      "link",
      "localeCompare",
      "match",
      "normalize",
      "repeat",
      "replace",
      "search",
      "slice",
      "small",
      "split",
      "startsWith",
      "strike",
      "sub",
      "substr",
      "substring",
      "sup",
      "toLocaleLowerCase",
      "toLocaleUpperCase",
      "toLowerCase",
      "toUpperCase",
      "trim",
      "trimLeft",
      "trimRight",
    ].forEach(function (a) {
      g.prototype[a] = function () {
        var b;
        (b = this.__errorListener) == null
          ? void 0
          : b.onStringMethodUsed == null
          ? void 0
          : b.onStringMethodUsed(a);
        for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++)
          d[e] = arguments[e];
        return String.prototype[a].apply(this, d);
      };
    });
    a = g;
    e.exports = a;
  },
  null
);
__d(
  "TrustedTypesIEFixDOMPolicy",
  ["TrustedTypes"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = {
      createHTML: function (a) {
        return a;
      },
    };
    b = c("TrustedTypes").createPolicy("dom-ie-fix", a);
    d = b;
    g["default"] = d;
  },
  98
);
__d(
  "UserAgent_DEPRECATED",
  [],
  function (a, b, c, d, e, f) {
    var g = !1,
      h,
      i,
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
      u,
      v,
      w;
    function x() {
      if (g) return;
      g = !0;
      var a = navigator.userAgent,
        b =
          /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
            a
          ),
        c = /(Mac OS X)|(Windows)|(Linux)/.exec(a);
      s = /\b(iPhone|iP[ao]d)/.exec(a);
      t = /\b(iP[ao]d)/.exec(a);
      q = /Android/i.exec(a);
      u = /FBAN\/\w+;/i.exec(a);
      v = /FBAN\/mLite;/i.exec(a);
      w = /Mobile/i.exec(a);
      r = !!/Win64/.exec(a);
      if (b) {
        h = b[1] ? parseFloat(b[1]) : b[5] ? parseFloat(b[5]) : NaN;
        h && document && document.documentMode && (h = document.documentMode);
        var d = /(?:Trident\/(\d+.\d+))/.exec(a);
        m = d ? parseFloat(d[1]) + 4 : h;
        i = b[2] ? parseFloat(b[2]) : NaN;
        j = b[3] ? parseFloat(b[3]) : NaN;
        k = b[4] ? parseFloat(b[4]) : NaN;
        k
          ? ((b = /(?:Chrome\/(\d+\.\d+))/.exec(a)),
            (l = b && b[1] ? parseFloat(b[1]) : NaN))
          : (l = NaN);
      } else h = i = j = l = k = NaN;
      if (c) {
        if (c[1]) {
          d = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(a);
          n = d ? parseFloat(d[1].replace("_", ".")) : !0;
        } else n = !1;
        o = !!c[2];
        p = !!c[3];
      } else n = o = p = !1;
    }
    function y() {
      return x() || h;
    }
    function a() {
      return x() || m > h;
    }
    function b() {
      return y() && r;
    }
    function c() {
      return x() || i;
    }
    function d() {
      return x() || j;
    }
    function z() {
      return x() || k;
    }
    function e() {
      return z();
    }
    function A() {
      return x() || l;
    }
    function B() {
      return x() || o;
    }
    function C() {
      return x() || n;
    }
    function D() {
      return x() || p;
    }
    function E() {
      return x() || s;
    }
    function F() {
      return x() || s || t || q || w;
    }
    function G() {
      return x() || v != null ? null : u;
    }
    function H() {
      return x() || q;
    }
    function I() {
      return x() || t;
    }
    f.ie = y;
    f.ieCompatibilityMode = a;
    f.ie64 = b;
    f.firefox = c;
    f.opera = d;
    f.webkit = z;
    f.safari = e;
    f.chrome = A;
    f.windows = B;
    f.osx = C;
    f.linux = D;
    f.iphone = E;
    f.mobile = F;
    f.nativeApp = G;
    f.android = H;
    f.ipad = I;
  },
  66
);
__d(
  "isScalar",
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      return /string|number|boolean/.test(typeof a);
    }
    f["default"] = a;
  },
  66
);
__d(
  "DOM",
  [
    "$",
    "DOMQuery",
    "Event",
    "FBLogger",
    "FbtResultBase",
    "HTML",
    "TrustedTypesIEFixDOMPolicy",
    "UserAgent_DEPRECATED",
    "createArrayFromMixed",
    "fb-error",
    "isNode",
    "isScalar",
    "isTextNode",
  ],
  function (a, b, c, d, e, f, g) {
    a = function (a, b, c) {
      a = document.createElement(a);
      b && h.setAttributes(a, b);
      c != null && h.setContent(a, c);
      return a;
    };
    var h = {
      find: (b = d("DOMQuery")).find,
      findPushSafe: b.findPushSafe,
      scry: b.scry,
      getSelection: b.getSelection,
      contains: b.contains,
      getRootElement: b.getRootElement,
      isNodeOfType: b.isNodeOfType,
      isInputNode: b.isInputNode,
      create: a,
      setAttributes: function (a, b) {
        b.type && (a.type = b.type);
        for (var d in b) {
          var e = b[d],
            f = /^on/i.test(d);
          f &&
            typeof e !== "function" &&
            c("FBLogger")("dom").warn(
              "Handlers passed to DOM.setAttributes must be functions. Handler passed for %s was %s",
              d,
              typeof e
            );
          if (d == "type") continue;
          else
            d == "style"
              ? typeof e === "string"
                ? (a.style.cssText = e)
                : Object.assign(a.style, e)
              : f
              ? c("Event").listen(a, d.substr(2), e)
              : d in a
              ? (a[d] = e)
              : a.setAttribute && a.setAttribute(d, e);
        }
      },
      prependContent: function (a, b) {
        if (!a)
          throw c("fb-error").TAAL.blameToPreviousFile(
            new Error("reference element is not a node")
          );
        return j(b, a, function (b) {
          a.firstChild ? a.insertBefore(b, a.firstChild) : a.appendChild(b);
        });
      },
      insertAfter: function (a, b) {
        if (!a || !a.parentNode)
          throw c("fb-error").TAAL.blameToPreviousFile(
            new Error("reference element does not have a parent")
          );
        var d = a.parentNode;
        return j(b, d, function (b) {
          a.nextSibling ? d.insertBefore(b, a.nextSibling) : d.appendChild(b);
        });
      },
      insertBefore: function (a, b) {
        if (!a || !a.parentNode)
          throw c("fb-error").TAAL.blameToPreviousFile(
            new Error("reference element does not have a parent")
          );
        var d = a.parentNode;
        return j(b, d, function (b) {
          d.insertBefore(b, a);
        });
      },
      setContent: function (a, b) {
        if (!a)
          throw c("fb-error").TAAL.blameToPreviousFile(
            new Error("reference element is not a node")
          );
        while (a.firstChild) i(a.firstChild);
        return h.appendContent(a, b);
      },
      appendContent: function (a, b) {
        if (!a)
          throw c("fb-error").TAAL.blameToPreviousFile(
            new Error("reference element is not a node")
          );
        return j(b, a, function (b) {
          a.appendChild(b);
        });
      },
      replace: function (a, b) {
        if (!a || !a.parentNode)
          throw c("fb-error").TAAL.blameToPreviousFile(
            new Error("reference element does not have a parent")
          );
        var d = a.parentNode;
        return j(b, d, function (b) {
          d.replaceChild(b, a);
        });
      },
      remove: function (a) {
        i(typeof a === "string" ? c("$")(a) : a);
      },
      empty: function (a) {
        a = typeof a === "string" ? c("$")(a) : a;
        while (a.firstChild) i(a.firstChild);
      },
    };
    function i(a) {
      a.parentNode && a.parentNode.removeChild(a);
    }
    function j(a, b, e) {
      a = c("HTML").replaceJSONWrapper(a);
      if (
        a instanceof c("HTML") &&
        b.firstChild === null &&
        -1 === a.toString().indexOf("<script")
      ) {
        var f = d("UserAgent_DEPRECATED").ie();
        if (
          !f ||
          (f > 7 &&
            !d("DOMQuery").isNodeOfType(b, [
              "table",
              "tbody",
              "thead",
              "tfoot",
              "tr",
              "select",
              "fieldset",
            ]))
        ) {
          var g = f ? '<em style="display:none;">&nbsp;</em>' : "";
          b.innerHTML = c("TrustedTypesIEFixDOMPolicy").createHTML(g + a);
          f && b.removeChild(b.firstChild);
          return Array.from(b.childNodes);
        }
      } else if (c("isTextNode")(b)) {
        b.data = a;
        return [a];
      }
      g = document.createDocumentFragment();
      var h;
      f = [];
      b = [];
      var i = !1;
      a = c("createArrayFromMixed")(a);
      a.length === 1 &&
        a[0] instanceof c("FbtResultBase") &&
        (a = a[0].getContents());
      for (var j = 0; j < a.length; j++) {
        h = c("HTML").replaceJSONWrapper(a[j]);
        if (h instanceof c("HTML")) {
          b.push(h.getAction());
          var k = h.getNodes();
          !i &&
            h.hasInlineJs() &&
            (c("FBLogger")("staticresources").warn(
              "DOM: adding HTML which contains inline JS"
            ),
            (i = !0));
          for (var l = 0; l < k.length; l++) f.push(k[l]), g.appendChild(k[l]);
        } else if (c("isScalar")(h) || h instanceof c("FbtResultBase")) {
          l = document.createTextNode(h);
          f.push(l);
          g.appendChild(l);
        } else
          c("isNode")(h)
            ? (f.push(h), g.appendChild(h))
            : (Array.isArray(h) &&
                c("FBLogger")("dom").warn("Nest arrays not supported"),
              h !== null &&
                c("FBLogger")("dom").warn("No way to set content %s", h));
      }
      e(g);
      b.forEach(function (a) {
        a();
      });
      return f;
    }
    e = h;
    g["default"] = e;
  },
  98
);
__d(
  "Deferred",
  ["Promise"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g;
    (g || (g = b("Promise"))).resolve();
    a = (function () {
      function a(a) {
        var c = this;
        a = a || g || (g = b("Promise"));
        this.$1 = !1;
        this.$2 = new a(function (a, b) {
          (c.$3 = a), (c.$4 = b);
        });
      }
      var c = a.prototype;
      c.getPromise = function () {
        return this.$2;
      };
      c.resolve = function (a) {
        (this.$1 = !0), this.$3(a);
      };
      c.reject = function (a) {
        (this.$1 = !0), this.$4(a);
      };
      c.isSettled = function () {
        return this.$1;
      };
      return a;
    })();
    f["default"] = a;
  },
  66
);
__d(
  "mixin",
  [],
  function (a, b, c, d, e, f) {
    function a() {
      var a = function () {},
        b = 0,
        c;
      while (b < 0 || arguments.length <= b ? void 0 : arguments[b]) {
        c = b < 0 || arguments.length <= b ? void 0 : arguments[b];
        for (var d in c)
          Object.prototype.hasOwnProperty.call(c, d) && (a.prototype[d] = c[d]);
        b += 1;
      }
      return a;
    }
    f["default"] = a;
  },
  66
);
__d(
  "getCrossOriginTransport",
  ["invariant", "ExecutionEnvironment", "err"],
  function (a, b, c, d, e, f, g) {
    var h;
    function i() {
      if (!(h || (h = b("ExecutionEnvironment"))).isInBrowser)
        throw b("err")(
          "getCrossOriginTransport: %s",
          "Cross origin transport unavailable in the server environment."
        );
      try {
        var a = new XMLHttpRequest();
        !("withCredentials" in a) &&
          typeof XDomainRequest !== "undefined" &&
          (a = new XDomainRequest());
        return a;
      } catch (a) {
        throw b("err")("getCrossOriginTransport: %s", a.message);
      }
    }
    i.withCredentials = function () {
      var a = i();
      "withCredentials" in a || g(0, 5150);
      var b = a.open;
      a.open = function () {
        b.apply(this, arguments), (this.withCredentials = !0);
      };
      return a;
    };
    e.exports = i;
  },
  null
);
__d(
  "ZeroRewrites",
  [
    "URI",
    "ZeroRewriteRules",
    "getCrossOriginTransport",
    "getSameOriginTransport",
    "isFacebookURI",
  ],
  function (a, b, c, d, e, f) {
    var g,
      h = {
        rewriteURI: function (a) {
          if (!b("isFacebookURI")(a) || h._isWhitelisted(a)) return a;
          var c = h._getRewrittenSubdomain(a);
          c !== null && c !== void 0 && (a = a.setSubdomain(c));
          return a;
        },
        getTransportBuilderForURI: function (a) {
          return h.isRewritten(a)
            ? b("getCrossOriginTransport").withCredentials
            : b("getSameOriginTransport");
        },
        isRewriteSafe: function (a) {
          if (
            Object.keys(b("ZeroRewriteRules").rewrite_rules).length === 0 ||
            !b("isFacebookURI")(a)
          )
            return !1;
          var c = h._getCurrentURI().getDomain(),
            d = new (g || (g = b("URI")))(a).qualify().getDomain();
          return c === d || h.isRewritten(a);
        },
        isRewritten: function (a) {
          a = a.getQualifiedURI();
          if (
            Object.keys(b("ZeroRewriteRules").rewrite_rules).length === 0 ||
            !b("isFacebookURI")(a) ||
            h._isWhitelisted(a)
          )
            return !1;
          var c = a.getSubdomain(),
            d = h._getCurrentURI(),
            e = h._getRewrittenSubdomain(d);
          return a.getDomain() !== d.getDomain() && c === e;
        },
        _isWhitelisted: function (a) {
          a = a.getPath();
          a.endsWith("/") || (a += "/");
          return (
            b("ZeroRewriteRules").whitelist &&
            b("ZeroRewriteRules").whitelist[a] === 1
          );
        },
        _getRewrittenSubdomain: function (a) {
          a = a.getQualifiedURI().getSubdomain();
          return b("ZeroRewriteRules").rewrite_rules[a];
        },
        _getCurrentURI: function () {
          return new (g || (g = b("URI")))("/").qualify();
        },
      };
    e.exports = h;
  },
  null
);
__d(
  "errorCode",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      throw new Error(
        'errorCode("' + a + '"): This should not happen. Oh noes!'
      );
    }
    f["default"] = a;
  },
  66
);
__d(
  "FbtErrorListenerWWW",
  ["FBLogger"],
  function (a, b, c, d, e, f, g) {
    a = (function () {
      function a(a) {
        (this.$1 = a.hash), (this.$2 = a.translation);
      }
      var b = a.prototype;
      b.onStringSerializationError = function (a) {
        var b = "Context not logged.";
        try {
          var d = JSON.stringify(a);
          d != null && (b = d.substr(0, 250));
        } catch (a) {
          b = a.message;
        }
        d =
          (a == null
            ? void 0
            : (d = a.constructor) == null
            ? void 0
            : d.name) || "";
        c("FBLogger")("fbt")
          .blameToPreviousDirectory()
          .blameToPreviousDirectory()
          .mustfix(
            'Converting to a string will drop content data. Hash="%s" Translation="%s" Content="%s" (type=%s,%s)',
            this.$1,
            this.$2,
            b,
            typeof a,
            d
          );
      };
      b.onStringMethodUsed = function (a) {
        c("FBLogger")("fbt")
          .blameToPreviousDirectory()
          .blameToPreviousDirectory()
          .mustfix(
            "Error using fbt string. Used method %s on Fbt string. Fbt string is designed to be immutable and should not be manipulated.",
            a
          );
      };
      b.onMissingParameterError = function (a, b) {
        c("FBLogger")("fbt")
          .blameToPreviousDirectory()
          .blameToPreviousDirectory()
          .mustfix(
            'Expected fbt parameter names (%s) to also contain `%s`. Hash="%s" Translation="%s"',
            a.join(", "),
            b,
            this.$1,
            this.$2
          );
      };
      return a;
    })();
    g["default"] = a;
  },
  98
);
__d(
  "FbtReactUtil",
  [],
  function (a, b, c, d, e, f) {
    a =
      (typeof Symbol === "function" &&
        Symbol["for"] &&
        Symbol["for"]("react.element")) ||
      60103;
    var g = !1;
    b = {
      REACT_ELEMENT_TYPE: a,
      injectReactShim: function (a) {
        var b = { validated: !0 };
        g
          ? Object.defineProperty(a, "_store", {
              configurable: !1,
              enumerable: !1,
              writable: !1,
              value: b,
            })
          : (a._store = b);
      },
    };
    e.exports = b;
  },
  null
);
__d(
  "FbtResult",
  ["FbtReactUtil", "FbtResultBase"],
  function (a, b, c, d, e, f) {
    var g = function (a) {
      return a.content;
    };
    a = (function (a) {
      "use strict";
      babelHelpers.inheritsLoose(c, a);
      function c(c, d) {
        d = a.call(this, c, d) || this;
        d.$$typeof = b("FbtReactUtil").REACT_ELEMENT_TYPE;
        d.key = null;
        d.ref = null;
        d.type = g;
        d.props = { content: c };
        return d;
      }
      c.get = function (a) {
        return new c(a.contents, a.errorListener);
      };
      return c;
    })(b("FbtResultBase"));
    e.exports = a;
  },
  null
);
__d(
  "FbtPureStringResult",
  ["FbtResult"],
  function (a, b, c, d, e, f) {
    a = (function (a) {
      "use strict";
      babelHelpers.inheritsLoose(b, a);
      function b() {
        return a.apply(this, arguments) || this;
      }
      return b;
    })(b("FbtResult"));
    c = a;
    e.exports = c;
  },
  null
);
__d(
  "getFbsResult",
  ["FbtPureStringResult"],
  function (a, b, c, d, e, f) {
    function a(a) {
      return new (b("FbtPureStringResult"))(a.contents, a.errorListener);
    }
    e.exports = a;
  },
  null
);
__d(
  "getTranslatedInput",
  ["Env", "ExecutionEnvironment", "FBLogger", "MakeHasteTranslationsMap"],
  function (a, b, c, d, e, f, g) {
    var h, i;
    b = "JHASH";
    var j = new RegExp("__" + b + "__(.+?)__" + b + "__"),
      k = !!(h || (h = c("Env"))).use_fbt_virtual_modules;
    function a(a) {
      var b = a.table;
      if (k && (i || (i = c("ExecutionEnvironment"))).isInBrowser) {
        if (typeof b === "string") {
          var e = b.match(j);
          if (e != null)
            return babelHelpers["extends"]({}, a, {
              table: d("MakeHasteTranslationsMap").get(e[1]),
            });
        }
        c("FBLogger")("binary_transparency", "inlined_translations").warn(
          "Found inlined translated contents in client_fetch_translations experiment! Input: %s",
          JSON.stringify(b)
        );
      }
      return a;
    }
    g["default"] = a;
  },
  98
);
__d(
  "translationOverrideListener",
  ["requireDeferred"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = c("requireDeferred")("IntlQtEventFalcoEvent").__setRef(
      "translationOverrideListener"
    );
    function a(a) {
      h.onReady(function (b) {
        return b.log(function () {
          return { hash: a };
        });
      });
    }
    g["default"] = a;
  },
  98
);
__d(
  "FbtEnv",
  [
    "FbtErrorListenerWWW",
    "FbtHooks",
    "IntlViewerContext",
    "cr:7730",
    "getFbsResult",
    "getTranslatedInput",
    "justknobx",
    "promiseDone",
    "requireDeferred",
    "translationOverrideListener",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = c("requireDeferred")("FbtLogging").__setRef("FbtEnv");
    d = "JHASH";
    var j = new RegExp("__" + d + "__(.+?)__" + d + "__"),
      k = !1;
    function a() {
      if (k) return;
      k = !0;
      (h || (h = b("FbtHooks"))).register({
        errorListener: function (a) {
          return new (c("FbtErrorListenerWWW"))(a);
        },
        getFbsResult: c("getFbsResult"),
        getFbtResult: b("cr:7730"),
        getTranslatedInput: c("getTranslatedInput"),
        onTranslationOverride: c("translationOverrideListener"),
        getViewerContext: function () {
          return c("IntlViewerContext");
        },
        logImpression: function (a, b) {
          return c("promiseDone")(
            i.load().then(function (d) {
              d.logImpression == null ? void 0 : d.logImpression(a);
              if (!c("justknobx")._("2269")) {
                var e,
                  f = b == null ? void 0 : b.inputTable;
                e = (e = b == null ? void 0 : b.tokens) != null ? e : [];
                if (typeof f === "string") {
                  f = f.match(j);
                  f != null &&
                    (d.logImpressionV2 == null
                      ? void 0
                      : d.logImpressionV2(f[1], e));
                }
              }
            })
          );
        },
      });
    }
    g.setupOnce = a;
  },
  98
);
__d(
  "FbtHooksImpl",
  [],
  function (a, b, c, d, e, f) {
    var g = {};
    a = {
      getErrorListener: function (a) {
        return g.errorListener == null ? void 0 : g.errorListener(a);
      },
      logImpression: function (a, b) {
        g.logImpression == null ? void 0 : g.logImpression(a, b);
      },
      onTranslationOverride: function (a) {
        g.onTranslationOverride == null ? void 0 : g.onTranslationOverride(a);
      },
      getFbsResult: function (a) {
        return g.getFbsResult(a);
      },
      getFbtResult: function (a) {
        return g.getFbtResult(a);
      },
      getTranslatedInput: function (a) {
        var b;
        return (b =
          g.getTranslatedInput == null ? void 0 : g.getTranslatedInput(a)) !=
          null
          ? b
          : a;
      },
      getViewerContext: function () {
        return g.getViewerContext();
      },
      register: function (a) {
        Object.assign(g, a);
      },
    };
    e.exports = a;
  },
  null
);
__d(
  "FbtHooks",
  ["FbtEnv", "FbtHooksImpl"],
  function (a, b, c, d, e, f) {
    (e.exports = b("FbtHooksImpl")), b("FbtEnv").setupOnce();
  },
  null
);
__d(
  "FbtTable",
  ["invariant"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = {
      ARG: { INDEX: 0, SUBSTITUTION: 1 },
      access: function (a, b, c, d) {
        if (c >= b.length) {
          typeof a === "string" ||
            Array.isArray(a) ||
            g(0, 21388, JSON.stringify(a));
          return a;
        }
        var e = b[c];
        e = e[h.ARG.INDEX];
        if (e == null) return h.access(a, b, c + 1, d);
        (typeof a !== "string" && !Array.isArray(a)) || g(0, 20954, typeof a);
        for (var f = 0; f < e.length; ++f) {
          var i = a[e[f]];
          if (i == null) continue;
          d.push(e[f]);
          i = h.access(i, b, c + 1, d);
          if (i != null) return i;
        }
        return null;
      },
    };
    e.exports = h;
  },
  null
);
__d(
  "FbtTableAccessor",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    a = {
      getEnumResult: function (a) {
        return [[a], null];
      },
      getGenderResult: function (a, b, c) {
        return [a, b];
      },
      getNumberResult: function (a, b, c) {
        return [a, b];
      },
      getSubstitution: function (a) {
        return [null, a];
      },
      getPronounResult: function (a) {
        return [[a, "*"], null];
      },
    };
    e.exports = a;
  },
  null
);
__d(
  "GenderConst",
  [],
  function (a, b, c, d, e, f) {
    e.exports = {
      NOT_A_PERSON: 0,
      FEMALE_SINGULAR: 1,
      MALE_SINGULAR: 2,
      FEMALE_SINGULAR_GUESS: 3,
      MALE_SINGULAR_GUESS: 4,
      MIXED_UNKNOWN: 5,
      NEUTER_SINGULAR: 6,
      UNKNOWN_SINGULAR: 7,
      FEMALE_PLURAL: 8,
      MALE_PLURAL: 9,
      NEUTER_PLURAL: 10,
      UNKNOWN_PLURAL: 11,
    };
  },
  null
);
__d(
  "FbtNumberType",
  ["IntlNumberTypeProps"],
  function (a, b, c, d, e, f, g) {
    g["default"] = c("IntlNumberTypeProps").module;
  },
  98
);
__d(
  "IntlNumberType",
  ["FbtNumberType"],
  function (a, b, c, d, e, f, g) {
    a = function (a) {
      return c("FbtNumberType");
    };
    g.get = a;
  },
  98
);
__d(
  "IntlVariations",
  [],
  function (a, b, c, d, e, f) {
    e.exports = {
      BITMASK_NUMBER: 28,
      BITMASK_GENDER: 3,
      NUMBER_ZERO: 16,
      NUMBER_ONE: 4,
      NUMBER_TWO: 8,
      NUMBER_FEW: 20,
      NUMBER_MANY: 12,
      NUMBER_OTHER: 24,
      GENDER_MALE: 1,
      GENDER_FEMALE: 2,
      GENDER_UNKNOWN: 3,
    };
  },
  null
);
__d(
  "IntlVariationResolverImpl",
  ["invariant", "FbtHooks", "IntlNumberType", "IntlVariations"],
  function (a, b, c, d, e, f, g) {
    var h,
      i = "_1";
    a = {
      EXACTLY_ONE: i,
      getNumberVariations: function (a) {
        var c = b("IntlNumberType")
          .get((h || (h = b("FbtHooks"))).getViewerContext().locale)
          .getVariation(a);
        c & b("IntlVariations").BITMASK_NUMBER || g(0, 11647, c, typeof c);
        return a === 1 ? [i, c, "*"] : [c, "*"];
      },
      getGenderVariations: function (a) {
        a & b("IntlVariations").BITMASK_GENDER || g(0, 11648, a, typeof a);
        return [a, "*"];
      },
    };
    e.exports = a;
  },
  null
);
__d(
  "IntlVariationResolver",
  ["IntlVariationHoldout", "IntlVariationResolverImpl"],
  function (a, b, c, d, e, f, g) {
    a = {
      getNumberVariations: function (a) {
        return d("IntlVariationResolverImpl").getNumberVariations(a);
      },
      getGenderVariations: function (a) {
        return d("IntlVariationHoldout").disable_variation
          ? ["*"]
          : d("IntlVariationResolverImpl").getGenderVariations(a);
      },
    };
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "NumberFormatConsts",
  ["NumberFormatConfig"],
  function (a, b, c, d, e, f) {
    a = {
      get: function (a) {
        return b("NumberFormatConfig");
      },
    };
    e.exports = a;
  },
  null
);
__d(
  "escapeRegex",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return a.replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1");
    }
    e.exports = a;
  },
  null
);
__d(
  "intlNumUtils",
  ["FbtHooks", "NumberFormatConsts", "escapeRegex"],
  function (a, b, c, d, e, f) {
    var g,
      h = 3;
    f = [
      "\u0433\u0440\u043d.",
      "\u0434\u0435\u043d.",
      "\u043b\u0432.",
      "\u043c\u0430\u043d.",
      "\u0564\u0580.",
      "\u062c.\u0645.",
      "\u062f.\u0625.",
      "\u062f.\u0627.",
      "\u062f.\u0628.",
      "\u062f.\u062a.",
      "\u062f.\u062c.",
      "\u062f.\u0639.",
      "\u062f.\u0643.",
      "\u062f.\u0644.",
      "\u062f.\u0645.",
      "\u0631.\u0633.",
      "\u0631.\u0639.",
      "\u0631.\u0642.",
      "\u0631.\u064a.",
      "\u0644.\u0633.",
      "\u0644.\u0644.",
      "\u0783.",
      "B/.",
      "Bs.",
      "Fr.",
      "kr.",
      "L.",
      "p.",
      "S/.",
    ];
    var i = {};
    function j(a) {
      i[a] || (i[a] = new RegExp(a, "i"));
      return i[a];
    }
    var k = j(
      f.reduce(function (a, c, d) {
        return a + (d ? "|" : "") + "(" + b("escapeRegex")(c) + ")";
      }, "")
    );
    function l(a, c, d, e, f, g, i) {
      d === void 0 && (d = "");
      e === void 0 && (e = ".");
      f === void 0 && (f = 0);
      g === void 0 && (g = { primaryGroupSize: h, secondaryGroupSize: h });
      var k = g.primaryGroupSize || h;
      g = g.secondaryGroupSize || k;
      i = i && i.digits;
      var l;
      c == null
        ? (l = a.toString())
        : typeof a === "string"
        ? (l = r(a, c))
        : (l = p(a, c));
      a = l.split(".");
      c = a[0];
      l = a[1];
      if (Math.abs(parseInt(c, 10)).toString().length >= f) {
        a = "$1" + d + "$2$3";
        f = "(\\d)(\\d{" + (k - 0) + "})($|\\D)";
        k = c.replace(j(f), a);
        if (k != c) {
          c = k;
          f = "(\\d)(\\d{" + (g - 0) + "})(" + b("escapeRegex")(d) + ")";
          g = j(f);
          while ((k = c.replace(g, a)) != c) c = k;
        }
      }
      i != null && ((c = m(c, i)), (l = l && m(l, i)));
      d = c;
      l && (d += e + l);
      return d;
    }
    function m(a, b) {
      var c = "";
      for (var d = 0; d < a.length; ++d) {
        var e = b[a.charCodeAt(d) - 48];
        c += e !== void 0 ? e : a[d];
      }
      return c;
    }
    function a(a, c) {
      var d = b("NumberFormatConsts").get(
        (g || (g = b("FbtHooks"))).getViewerContext().locale
      );
      return l(
        a,
        c,
        "",
        d.decimalSeparator,
        d.minDigitsForThousandsSeparator,
        d.standardDecimalPatternInfo,
        d.numberingSystemData
      );
    }
    function n(a, c) {
      var d = b("NumberFormatConsts").get(
        (g || (g = b("FbtHooks"))).getViewerContext().locale
      );
      return l(
        a,
        c,
        d.numberDelimiter,
        d.decimalSeparator,
        d.minDigitsForThousandsSeparator,
        d.standardDecimalPatternInfo,
        d.numberingSystemData
      );
    }
    function o(a) {
      return a && Math.floor(Math.log10(Math.abs(a)));
    }
    function c(a, b, c) {
      var d = o(a),
        e = a;
      d < c && (e = a * Math.pow(10, -d + c));
      a = Math.pow(10, o(e) - c + 1);
      e = Math.round(e / a) * a;
      if (d < c) {
        e /= Math.pow(10, -d + c);
        if (b == null) return n(e, c - d - 1);
      }
      return n(e, b);
    }
    function p(a, b) {
      b = b == null ? 0 : b;
      var c = Math.pow(10, b);
      a = (Math.round(a * c) / c).toString();
      if (!b) return a;
      if (a.indexOf("e-") !== -1) return a;
      c = a.indexOf(".");
      var d;
      c === -1 ? ((a += "."), (d = b)) : (d = b - (a.length - c - 1));
      for (b = 0, c = d; b < c; b++) a += "0";
      return a;
    }
    var q = function (a, b) {
      a = a;
      for (var c = 0; c < b; c++) a += "0";
      return a;
    };
    function r(a, b) {
      var c = a.indexOf("."),
        d = c === -1 ? a : a.slice(0, c);
      a = c === -1 ? "" : a.slice(c + 1);
      return b != null ? d + "." + q(a.slice(0, b), b - a.length) : d;
    }
    function s(a, c, d) {
      d === void 0 && (d = "");
      var e = u(),
        f = a;
      e &&
        (f = a
          .split("")
          .map(function (a) {
            return e[a] || a;
          })
          .join("")
          .trim());
      f = f.replace(/^[^\d]*\-/, "\x02");
      f = f.replace(k, "");
      a = b("escapeRegex")(c);
      c = b("escapeRegex")(d);
      d = j("^[^\\d]*\\d.*" + a + ".*\\d[^\\d]*$");
      if (!d.test(f)) {
        d = j("(^[^\\d]*)" + a + "(\\d*[^\\d]*$)");
        if (d.test(f)) {
          f = f.replace(d, "$1\x01$2");
          return t(f);
        }
        d = j("^[^\\d]*[\\d " + b("escapeRegex")(c) + "]*[^\\d]*$");
        d.test(f) || (f = "");
        return t(f);
      }
      d = j("(^[^\\d]*[\\d " + c + "]*)" + a + "(\\d*[^\\d]*$)");
      f = d.test(f) ? f.replace(d, "$1\x01$2") : "";
      return t(f);
    }
    function t(a) {
      a = a
        .replace(/[^0-9\u0001\u0002]/g, "")
        .replace("\x01", ".")
        .replace("\x02", "-");
      var b = Number(a);
      return a === "" || isNaN(b) ? null : b;
    }
    function u() {
      var a = b("NumberFormatConsts").get(
          (g || (g = b("FbtHooks"))).getViewerContext().locale
        ),
        c = {};
      a = a.numberingSystemData && a.numberingSystemData.digits;
      if (a == null) return null;
      for (var d = 0; d < a.length; d++) c[a.charAt(d)] = d.toString();
      return c;
    }
    function d(a) {
      var c = b("NumberFormatConsts").get(
        (g || (g = b("FbtHooks"))).getViewerContext().locale
      );
      return s(a, c.decimalSeparator || ".", c.numberDelimiter);
    }
    var v = {
      formatNumber: a,
      formatNumberRaw: l,
      formatNumberWithThousandDelimiters: n,
      formatNumberWithLimitedSigFig: c,
      parseNumber: d,
      parseNumberRaw: s,
      truncateLongNumber: r,
      getFloatString: function (a, b, c) {
        a = String(a);
        a = a.split(".");
        b = v.getIntegerString(a[0], b);
        return a.length === 1 ? b : b + c + a[1];
      },
      getIntegerString: function (a, b) {
        b = b;
        b === "" && (b = ",");
        a = String(a);
        var c = /(\d+)(\d{3})/;
        while (c.test(a)) a = a.replace(c, "$1" + b + "$2");
        return a;
      },
    };
    e.exports = v;
  },
  null
);
__d(
  "IntlPhonologicalRewrites",
  ["IntlPhonologicalRules"],
  function (a, b, c, d, e, f) {
    "use strict";
    a = {
      get: function (a) {
        return b("IntlPhonologicalRules");
      },
    };
    e.exports = a;
  },
  null
);
__d(
  "IntlRedundantStops",
  [],
  function (a, b, c, d, e, f) {
    a = Object.freeze({
      equivalencies: {
        ".": ["\u0964", "\u104b", "\u3002"],
        "\u2026": ["\u0e2f", "\u0eaf", "\u1801"],
        "!": ["\uff01"],
        "?": ["\uff1f"],
      },
      redundancies: {
        "?": ["?", ".", "!", "\u2026"],
        "!": ["!", "?", "."],
        ".": [".", "!"],
        "\u2026": ["\u2026", ".", "!"],
      },
    });
    f["default"] = a;
  },
  66
);
__d(
  "IntlPunctuation",
  ["FbtHooks", "IntlPhonologicalRewrites", "IntlRedundantStops"],
  function (a, b, c, d, e, f, g) {
    var h;
    d = "[.!?\u3002\uff01\uff1f\u0964\u2026\u0eaf\u1801\u0e2f\uff0e]";
    var i = {};
    function j(a) {
      var b;
      b = (b = a) != null ? b : "";
      var c = i[b];
      c == null && (c = i[b] = k(a));
      return c;
    }
    function k(a) {
      var b = [];
      a = c("IntlPhonologicalRewrites").get(a);
      for (var d in a.patterns) {
        var e = a.patterns[d];
        for (var f in a.meta) {
          var g = new RegExp(f.slice(1, -1), "g"),
            h = a.meta[f];
          d = d.replace(g, h);
          e = e.replace(g, h);
        }
        e === "javascript" &&
          (e = function (a) {
            return a.slice(1).toLowerCase();
          });
        b.push([new RegExp(d.slice(1, -1), "g"), e]);
      }
      return b;
    }
    function a(a) {
      var b = j((h || (h = c("FbtHooks"))).getViewerContext().locale);
      a = a;
      for (var d = 0; d < b.length; d++) {
        var e = b[d],
          f = e[0];
        e = e[1];
        a = a.replace(f, e);
      }
      return a.replace(/\x01/g, "");
    }
    var l = new Map();
    for (e in c("IntlRedundantStops").equivalencies)
      for (
        var f = [e].concat(c("IntlRedundantStops").equivalencies[e]),
          m = Array.isArray(f),
          n = 0,
          f = m
            ? f
            : f[
                typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
              ]();
        ;

      ) {
        var o;
        if (m) {
          if (n >= f.length) break;
          o = f[n++];
        } else {
          n = f.next();
          if (n.done) break;
          o = n.value;
        }
        o = o;
        l.set(o, e);
      }
    var p = new Map();
    for (o in c("IntlRedundantStops").redundancies)
      p.set(o, new Set(c("IntlRedundantStops").redundancies[o]));
    function q(a, b) {
      a = l.get(a);
      b = l.get(b);
      return ((a = p.get(a)) == null ? void 0 : a.has(b)) === !0;
    }
    function b(a, b) {
      return q(a[a.length - 1], b) ? "" : b;
    }
    g.PUNCT_CHAR_CLASS = d;
    g.applyPhonologicalRules = a;
    g.dedupeStops = b;
  },
  98
);
__d(
  "substituteTokens",
  ["invariant", "IntlPunctuation"],
  function (a, b, c, d, e, f, g, h) {
    var i = Object.prototype.hasOwnProperty,
      j = new RegExp(
        "\\{([^}]+)\\}(" + d("IntlPunctuation").PUNCT_CHAR_CLASS + "*)",
        "g"
      );
    function k(a) {
      return a;
    }
    function a(a, b, c) {
      if (b == null) return a;
      typeof b === "object" || h(0, 6041, a);
      var e = [],
        f = [];
      a = a
        .replace(j, function (a, g, h) {
          i.call(b, g) ||
            (c == null
              ? void 0
              : c.onMissingParameterError == null
              ? void 0
              : c.onMissingParameterError(Object.keys(b), g));
          a = b[g];
          if (a != null && typeof a === "object") {
            e.push(a);
            f.push(g);
            return "\x17" + h;
          } else if (a == null) return "";
          return String(a) + d("IntlPunctuation").dedupeStops(String(a), h);
        })
        .split("\x17")
        .map(d("IntlPunctuation").applyPhonologicalRules);
      if (a.length === 1) return a[0];
      var g = a[0] !== "" ? [a[0]] : [];
      for (var l = 0; l < e.length; l++)
        g.push(k(e[l])), a[l + 1] !== "" && g.push(a[l + 1]);
      return g;
    }
    f.exports = a;
  },
  34
);
__d(
  "fbt",
  [
    "invariant",
    "FbtEnv",
    "FbtHooks",
    "FbtQTOverrides",
    "FbtResultBase",
    "FbtTable",
    "FbtTableAccessor",
    "GenderConst",
    "IntlVariationResolver",
    "intlNumUtils",
    "substituteTokens",
  ],
  function (a, b, c, d, e, f, g) {
    var h;
    b("FbtEnv").setupOnce();
    var i = b("FbtQTOverrides").overrides,
      j = b("IntlVariationResolver").getGenderVariations,
      k = b("IntlVariationResolver").getNumberVariations,
      l = Object.prototype.hasOwnProperty,
      m = !1,
      n = b("FbtTable").ARG,
      o = { number: 0, gender: 1 },
      p = { object: 0, possessive: 1, reflexive: 2, subject: 3 },
      q = {};
    function a(a, c, d) {
      if (((d == null ? void 0 : d.hk) || (d == null ? void 0 : d.ehk)) && m)
        return { text: a, fbt: !0, hashKey: d.hk };
      c = (h || (h = b("FbtHooks"))).getTranslatedInput({
        table: a,
        args: c,
        options: d,
      });
      var e = c.args;
      c = c.table;
      var f = {};
      if (c.__vcg != null) {
        e = e || [];
        var k = (h || (h = b("FbtHooks"))).getViewerContext();
        k = k.GENDER;
        var l = j(k);
        e.unshift(b("FbtTableAccessor").getGenderResult(l, null, k));
      }
      l = [];
      e &&
        (typeof c !== "string" && (c = b("FbtTable").access(c, e, 0, l)),
        (f = r(e)),
        c !== null || g(0, 479));
      var n;
      if (Array.isArray(c)) {
        k = c[0];
        n = c[1];
        e = "1_" + n;
        i[e] != null &&
          i[e] !== "" &&
          ((k = i[e]), (h || (h = b("FbtHooks"))).onTranslationOverride(n));
        e = { inputTable: a, tokens: l };
        (h || (h = b("FbtHooks"))).logImpression(n, e);
      } else if (typeof c === "string") k = c;
      else
        throw new Error(
          "Table access did not result in string: " +
            (c === void 0 ? "undefined" : JSON.stringify(c)) +
            ", Type: " +
            typeof c
        );
      a = this.cachedResults[k];
      l = s(f);
      if (a && !l) return a;
      else {
        e = b("substituteTokens")(
          k,
          f,
          (h || (h = b("FbtHooks"))).getErrorListener == null
            ? void 0
            : (h || (h = b("FbtHooks"))).getErrorListener({
                translation: k,
                hash: n,
              })
        );
        c = this._wrapContent(e, k, n, d == null ? void 0 : d.eo);
        l || (this.cachedResults[k] = c);
        return c;
      }
    }
    function r(a) {
      var b = {};
      a.forEach(function (a) {
        a = a[n.SUBSTITUTION];
        if (!a) return;
        for (var c in a)
          l.call(a, c) && (b[c] == null || g(0, 56656, c), (b[c] = a[c]));
      });
      return b;
    }
    function s(a) {
      for (a in a) return !0;
      return !1;
    }
    function c(a, c) {
      return b("FbtTableAccessor").getEnumResult(a);
    }
    function d(a) {
      return b("FbtTableAccessor").getGenderResult(j(a), null, a);
    }
    function f(a, c, d) {
      var e;
      e = ((e = {}), (e[a] = c), e);
      if (d)
        if (d[0] === o.number) {
          var f = d.length > 1 ? d[1] : c;
          typeof f === "number" || g(0, 484);
          var h = k(f);
          typeof c === "number" &&
            (e[a] = b("intlNumUtils").formatNumberWithThousandDelimiters(c));
          return b("FbtTableAccessor").getNumberResult(h, e, f);
        } else if (d[0] === o.gender) {
          a = d[1];
          a != null || g(0, 485);
          return b("FbtTableAccessor").getGenderResult(j(a), e, a);
        } else g(0, 486);
      else return b("FbtTableAccessor").getSubstitution(e);
    }
    function t(a, b, c) {
      return this._param(a, b, c);
    }
    function u(a, c, d) {
      var e = k(a),
        f = {};
      c &&
        (typeof d === "number"
          ? (f[c] = b("intlNumUtils").formatNumberWithThousandDelimiters(d))
          : (f[c] =
              d || b("intlNumUtils").formatNumberWithThousandDelimiters(a)));
      return b("FbtTableAccessor").getNumberResult(e, f, a);
    }
    function v(a, c, d) {
      c !== b("GenderConst").NOT_A_PERSON || !d || !d.human || g(0, 11835);
      d = w(a, c);
      return b("FbtTableAccessor").getPronounResult(d);
    }
    function w(a, c) {
      switch (c) {
        case b("GenderConst").NOT_A_PERSON:
          return a === p.object || a === p.reflexive
            ? b("GenderConst").NOT_A_PERSON
            : b("GenderConst").UNKNOWN_PLURAL;
        case b("GenderConst").FEMALE_SINGULAR:
        case b("GenderConst").FEMALE_SINGULAR_GUESS:
          return b("GenderConst").FEMALE_SINGULAR;
        case b("GenderConst").MALE_SINGULAR:
        case b("GenderConst").MALE_SINGULAR_GUESS:
          return b("GenderConst").MALE_SINGULAR;
        case b("GenderConst").MIXED_UNKNOWN:
        case b("GenderConst").FEMALE_PLURAL:
        case b("GenderConst").MALE_PLURAL:
        case b("GenderConst").NEUTER_PLURAL:
        case b("GenderConst").UNKNOWN_PLURAL:
          return b("GenderConst").UNKNOWN_PLURAL;
        case b("GenderConst").NEUTER_SINGULAR:
        case b("GenderConst").UNKNOWN_SINGULAR:
          return a === p.reflexive
            ? b("GenderConst").NOT_A_PERSON
            : b("GenderConst").UNKNOWN_PLURAL;
      }
      return b("GenderConst").NOT_A_PERSON;
    }
    function x(a, c, d) {
      var e = j(d),
        f = {};
      f[a] = c;
      return b("FbtTableAccessor").getGenderResult(e, f, d);
    }
    function y(a, c, d, e) {
      a = typeof a === "string" ? [a] : a;
      var f = (h || (h = b("FbtHooks"))).getErrorListener({
        translation: c,
        hash: d,
      });
      a = h.getFbtResult({
        contents: a,
        errorListener: f,
        extraOptions: e,
        patternHash: d,
        patternString: c,
      });
      return a;
    }
    function z() {
      m = !0;
    }
    function A() {
      m = !1;
    }
    function B(a) {
      return a instanceof b("FbtResultBase");
    }
    var C = function () {};
    C._ = a;
    C._enum = c;
    C._implicitParam = t;
    C._name = x;
    C._param = f;
    C._plural = u;
    C._pronoun = v;
    C._subject = d;
    C._wrapContent = y;
    C.disableJsonExportMode = A;
    C.enableJsonExportMode = z;
    C.isFbtInstance = B;
    C.cachedResults = q;
    C._getCachedFbt = void 0;
    a = C;
    e.exports = a;
  },
  null
);
__d(
  "BDHeaderConfig",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    a = "129477";
    f.ASBD_ID = a;
  },
  66
);
__d(
  "getAsyncHeaders",
  [
    "BDHeaderConfig",
    "LSD",
    "ZeroCategoryHeader",
    "isFacebookURI",
    "requireWeak",
  ],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      var b = {},
        d = c("isFacebookURI")(a);
      d &&
        c("ZeroCategoryHeader").value &&
        (b[c("ZeroCategoryHeader").header] = c("ZeroCategoryHeader").value);
      d = h(a);
      d && (b["X-FB-LSD"] = d);
      d = i(a);
      d && (b["X-ASBD-ID"] = d);
      c("requireWeak")("MessengerPWAVersionForUserAgent", function (c) {
        c = c();
        c != null && !j(a) && (b["X-FB-PWA"] = "" + c);
      });
      return b;
    }
    function h(a) {
      return j(a) ? null : c("LSD").token;
    }
    function i(a) {
      return j(a) ? null : d("BDHeaderConfig").ASBD_ID;
    }
    function j(a) {
      var b;
      b =
        (b =
          (b = k()) == null
            ? void 0
            : (b = b.location) == null
            ? void 0
            : b.origin) != null
          ? b
          : (b = window) == null
          ? void 0
          : (b = b.location) == null
          ? void 0
          : b.origin;
      return b == null
        ? !0
        : !a.toString().startsWith("/") && a.getOrigin() !== b;
    }
    function k() {
      if (typeof document !== "undefined") return document;
      else return null;
    }
    g["default"] = a;
  },
  98
);
__d(
  "uriIsRelativePath",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return (
        !a.getProtocol() &&
        !a.getDomain() &&
        !a.getPort() &&
        a.toString() !== ""
      );
    }
    f["default"] = a;
  },
  66
);
__d(
  "getContextualParent",
  ["ge"],
  function (a, b, c, d, e, f, g) {
    function a(a, b) {
      b === void 0 && (b = !1);
      var d = !1;
      a = a;
      do {
        if (a instanceof Element) {
          var e = a.getAttribute("data-ownerid");
          if (e) {
            a = c("ge")(e);
            d = !0;
            continue;
          }
        }
        a = a.parentNode;
      } while (b && a && !d);
      return a;
    }
    g["default"] = a;
  },
  98
);
__d(
  "Banzai",
  ["cr:7383"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:7383");
  },
  98
);
__d(
  "DateConsts",
  [],
  function (a, b, c, d, e, f) {
    var g = 1e3;
    c = 60;
    d = 60;
    e = 24;
    var h = 7,
      i = 12,
      j = 1e3,
      k = 30.43,
      l = 4.333,
      m = 365.242,
      n = c * d,
      o = n * e,
      p = o * h,
      q = o * m,
      r = g * c,
      s = r * d,
      t = g * o,
      u = t * h,
      v = t * m,
      w = {
        SUNDAY: 0,
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6,
      };
    Object.freeze(w);
    function a(a, b) {
      return new Date(a, b, 0).getDate();
    }
    function b() {
      return Date.now() / g;
    }
    var x = { instantRange: { since: -864e10, until: 864e10 + 1 } };
    f.MS_PER_SEC = g;
    f.SEC_PER_MIN = c;
    f.MIN_PER_HOUR = d;
    f.HOUR_PER_DAY = e;
    f.DAYS_PER_WEEK = h;
    f.MONTHS_PER_YEAR = i;
    f.US_PER_MS = j;
    f.AVG_DAYS_PER_MONTH = k;
    f.AVG_WEEKS_PER_MONTH = l;
    f.AVG_DAYS_PER_YEAR = m;
    f.SEC_PER_HOUR = n;
    f.SEC_PER_DAY = o;
    f.SEC_PER_WEEK = p;
    f.SEC_PER_YEAR = q;
    f.MS_PER_MIN = r;
    f.MS_PER_HOUR = s;
    f.MS_PER_DAY = t;
    f.MS_PER_WEEK = u;
    f.MS_PER_YEAR = v;
    f.DAYS = w;
    f.getDaysInMonth = a;
    f.getCurrentTimeInSeconds = b;
    f["private"] = x;
  },
  66
);
__d(
  "EventListener",
  ["cr:5695"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = b("cr:5695");
  },
  98
);
__d(
  "isLinkshimURI",
  [
    "LinkshimHandlerConfig",
    "isBarcelonaURI",
    "isFacebookURI",
    "isMessengerDotComURI",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    b = c("LinkshimHandlerConfig").linkshim_host.split(".");
    var h = b[b.length - 1];
    function a(a) {
      var b = a.getPath();
      if (
        (b === "/l.php" ||
          b.indexOf("/si/ajax/l/") === 0 ||
          b.indexOf("/l/") === 0 ||
          b.indexOf("l/") === 0) &&
        (c("isFacebookURI")(a) || c("isMessengerDotComURI")(a))
      )
        return !0;
      if (b === "/linkshim" && c("isBarcelonaURI")(a)) return !0;
      if (
        b === c("LinkshimHandlerConfig").linkshim_path &&
        a.isSubdomainOfDomain(h)
      ) {
        b = a.getQueryData();
        if (
          b[c("LinkshimHandlerConfig").linkshim_enc_param] != null &&
          b[c("LinkshimHandlerConfig").linkshim_url_param] != null
        )
          return !0;
      }
      return !1;
    }
    g["default"] = a;
  },
  98
);
__d(
  "JstlMigrationFalcoEvent",
  ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = c("getFalcoLogPolicy_DO_NOT_USE")("1814852");
    b = d("FalcoLoggerInternal").create("jstl_migration", a);
    e = b;
    g["default"] = e;
  },
  98
);
__d(
  "getDataWithLoggerOptions",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a, b) {
      return babelHelpers["extends"]({}, a, {
        __options: babelHelpers["extends"]({ event_time: Date.now() / 1e3 }, b),
      });
    }
    f["default"] = a;
  },
  66
);
__d(
  "InlineFbtResult",
  ["cr:1183579"],
  function (a, b, c, d, e, f, g) {
    g["default"] = b("cr:1183579");
  },
  98
);
__d(
  "InlineFbtResultImpl",
  ["cx", "FbtHooks", "FbtReactUtil", "FbtResultBase"],
  function (a, b, c, d, e, f, g, h) {
    var i;
    function j(a, b, c, e) {
      var f = "_4qba";
      e != null &&
        e != "" &&
        (b === "TRANSLATION"
          ? (f = "_4qbb")
          : b === "APPROVE"
          ? (f = "_4qbc")
          : b === "REPORT" && (f = "_4qbd"));
      return {
        $$typeof: d("FbtReactUtil").REACT_ELEMENT_TYPE,
        type: "em",
        key: null,
        ref: null,
        props: {
          className: f,
          "data-intl-hash": e,
          "data-intl-translation": c,
          "data-intl-trid": "",
          children: a,
          suppressHydrationWarning: !0,
        },
        _owner: null,
      };
    }
    var k = function (a) {
      return j(a.content, a.inlineMode, a.translation, a.hash);
    };
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b, e, f, g) {
        var h;
        h =
          a.call(
            this,
            b,
            (i || (i = c("FbtHooks"))).getErrorListener({
              translation: f,
              hash: g,
            })
          ) || this;
        h.$$typeof = d("FbtReactUtil").REACT_ELEMENT_TYPE;
        h.key = null;
        h.ref = null;
        h.type = k;
        h.props = { content: b, inlineMode: e, translation: f, hash: g };
        return h;
      }
      return b;
    })(c("FbtResultBase"));
    g["default"] = a;
  },
  98
);
__d(
  "IntlCLDRNumberType01",
  ["IntlVariations"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = {
      getVariation: function (a) {
        return c("IntlVariations").NUMBER_OTHER;
      },
    };
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "IntlCLDRNumberType09",
  ["IntlVariations"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = {
      getVariation: function (a) {
        if (a === 1) return c("IntlVariations").NUMBER_ONE;
        else return c("IntlVariations").NUMBER_OTHER;
      },
    };
    b = a;
    g["default"] = b;
  },
  98
);
__d(
  "Locale",
  ["SiteData"],
  function (a, b, c, d, e, f) {
    function a() {
      return b("SiteData").is_rtl;
    }
    e.exports = { isRTL: a };
  },
  null
);
__d(
  "TransAppInlineMode",
  [],
  function (a, b, c, d, e, f) {
    a = Object.freeze({
      STRING_MANAGER: "STRING_MANAGER",
      TRANSLATION: "TRANSLATION",
      APPROVE: "APPROVE",
      REPORT: "REPORT",
      NO_INLINE: "NO_INLINE",
    });
    f["default"] = a;
  },
  66
);
__d(
  "WebPixelRatio",
  ["SiteData"],
  function (a, b, c, d, e, f, g) {
    function a() {
      return c("SiteData").pr != null && c("SiteData").pr > 0
        ? c("SiteData").pr
        : window.devicePixelRatio || 1;
    }
    g.get = a;
  },
  98
);
__d(
  "normalizeBoundingClientRect",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a, b) {
      a = a.ownerDocument.documentElement;
      var c = a ? a.clientLeft : 0;
      a = a ? a.clientTop : 0;
      var d = Math.round(b.left) - c;
      c = Math.round(b.right) - c;
      var e = Math.round(b.top) - a;
      b = Math.round(b.bottom) - a;
      return {
        left: d,
        right: c,
        top: e,
        bottom: b,
        width: c - d,
        height: b - e,
      };
    }
    f["default"] = a;
  },
  66
);
__d(
  "getElementRect",
  ["containsNode", "normalizeBoundingClientRect"],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      var b;
      b =
        a == null
          ? void 0
          : (b = a.ownerDocument) == null
          ? void 0
          : b.documentElement;
      return !a || !("getBoundingClientRect" in a) || !c("containsNode")(b, a)
        ? { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 }
        : c("normalizeBoundingClientRect")(a, a.getBoundingClientRect());
    }
    g["default"] = a;
  },
  98
);
__d(
  "getElementPosition",
  ["getElementRect"],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      a = c("getElementRect")(a);
      return {
        x: a.left,
        y: a.top,
        width: a.right - a.left,
        height: a.bottom - a.top,
      };
    }
    g["default"] = a;
  },
  98
);
__d(
  "getUnwrappedFbt",
  ["FbtResultGK"],
  function (a, b, c, d, e, f) {
    function a(a) {
      a = a.contents;
      var c = b("FbtResultGK").inlineMode,
        d = b("FbtResultGK").shouldReturnFbtResult;
      if (!d && c !== "REPORT")
        return (a == null ? void 0 : a.length) === 1 && typeof a[0] === "string"
          ? a[0]
          : a;
    }
    e.exports = a;
  },
  null
);
__d(
  "getFbtResult",
  [
    "FbtResult",
    "FbtResultGK",
    "InlineFbtResult",
    "getUnwrappedFbt",
    "gkx",
    "recoverableViolation",
  ],
  function (a, b, c, d, e, f, g) {
    if (c("gkx")("20935") && c("FbtResultGK").inlineMode === "TRANSLATION") {
      c("recoverableViolation")(
        "TransAppInlineMode=TRANSLATION should not happen on Comet yet. " +
          ("[inlineMode=" +
            ((b = c("FbtResultGK").inlineMode) != null ? b : "") +
            "]") +
          ("[runtime_site_is_comet=" + String(c("gkx")("20935")) + "]"),
        "internationalization"
      );
    }
    function a(a) {
      var b = c("getUnwrappedFbt")(a);
      if (b != null) return b;
      b = a.contents;
      var d = a.patternString,
        e = a.patternHash;
      return c("FbtResultGK").inlineMode != null &&
        c("FbtResultGK").inlineMode !== "NO_INLINE"
        ? new (c("InlineFbtResult"))(b, c("FbtResultGK").inlineMode, d, e)
        : c("FbtResult").get(a);
    }
    g["default"] = a;
  },
  98
);
__d(
  "isStringNullOrEmpty",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      return a == null || a === "";
    }
    f["default"] = a;
  },
  66
);
__d(
  "uuidv4",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a() {
      var a;
      a =
        (a = self) == null
          ? void 0
          : (a = a.crypto) == null
          ? void 0
          : a.randomUUID;
      return typeof a === "function"
        ? self.crypto.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
            var b = (Math.random() * 16) | 0;
            a = a === "x" ? b : (b & 3) | 8;
            return a.toString(16);
          });
    }
    f["default"] = a;
  },
  66
);
