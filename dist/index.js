var gt = Object.defineProperty;
var vt = (_, t, i) => t in _ ? gt(_, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : _[t] = i;
var ke = (_, t, i) => vt(_, typeof t != "symbol" ? t + "" : t, i);
import Le, { forwardRef as yt, useRef as De, useCallback as K, useImperativeHandle as bt } from "react";
import { createShapeId as Oe, getIndexBetween as je, createBindingId as Me, Tldraw as Et } from "tldraw";
var ie = { exports: {} }, Y = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $e;
function wt() {
  if ($e) return Y;
  $e = 1;
  var _ = Le, t = Symbol.for("react.element"), i = Symbol.for("react.fragment"), h = Object.prototype.hasOwnProperty, p = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function r(c, n, u) {
    var s, d = {}, y = null, l = null;
    u !== void 0 && (y = "" + u), n.key !== void 0 && (y = "" + n.key), n.ref !== void 0 && (l = n.ref);
    for (s in n) h.call(n, s) && !a.hasOwnProperty(s) && (d[s] = n[s]);
    if (c && c.defaultProps) for (s in n = c.defaultProps, n) d[s] === void 0 && (d[s] = n[s]);
    return { $$typeof: t, type: c, key: y, ref: l, props: d, _owner: p.current };
  }
  return Y.Fragment = i, Y.jsx = r, Y.jsxs = r, Y;
}
var G = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fe;
function xt() {
  return Fe || (Fe = 1, process.env.NODE_ENV !== "production" && function() {
    var _ = Le, t = Symbol.for("react.element"), i = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), r = Symbol.for("react.provider"), c = Symbol.for("react.context"), n = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), l = Symbol.for("react.offscreen"), v = Symbol.iterator, R = "@@iterator";
    function m(e) {
      if (e === null || typeof e != "object")
        return null;
      var o = v && e[v] || e[R];
      return typeof o == "function" ? o : null;
    }
    var b = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(e) {
      {
        for (var o = arguments.length, f = new Array(o > 1 ? o - 1 : 0), g = 1; g < o; g++)
          f[g - 1] = arguments[g];
        j("error", e, f);
      }
    }
    function j(e, o, f) {
      {
        var g = b.ReactDebugCurrentFrame, x = g.getStackAddendum();
        x !== "" && (o += "%s", f = f.concat([x]));
        var I = f.map(function(w) {
          return String(w);
        });
        I.unshift("Warning: " + o), Function.prototype.apply.call(console[e], console, I);
      }
    }
    var F = !1, U = !1, V = !1, B = !1, z = !1, se;
    se = Symbol.for("react.module.reference");
    function Ye(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === h || e === a || z || e === p || e === u || e === s || B || e === l || F || U || V || typeof e == "object" && e !== null && (e.$$typeof === y || e.$$typeof === d || e.$$typeof === r || e.$$typeof === c || e.$$typeof === n || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === se || e.getModuleId !== void 0));
    }
    function Ge(e, o, f) {
      var g = e.displayName;
      if (g)
        return g;
      var x = o.displayName || o.name || "";
      return x !== "" ? f + "(" + x + ")" : f;
    }
    function ce(e) {
      return e.displayName || "Context";
    }
    function k(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case h:
          return "Fragment";
        case i:
          return "Portal";
        case a:
          return "Profiler";
        case p:
          return "StrictMode";
        case u:
          return "Suspense";
        case s:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case c:
            var o = e;
            return ce(o) + ".Consumer";
          case r:
            var f = e;
            return ce(f._context) + ".Provider";
          case n:
            return Ge(e, e.render, "ForwardRef");
          case d:
            var g = e.displayName || null;
            return g !== null ? g : k(e.type) || "Memo";
          case y: {
            var x = e, I = x._payload, w = x._init;
            try {
              return k(w(I));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, W = 0, le, fe, ue, de, he, pe, me;
    function ge() {
    }
    ge.__reactDisabledLog = !0;
    function Ue() {
      {
        if (W === 0) {
          le = console.log, fe = console.info, ue = console.warn, de = console.error, he = console.group, pe = console.groupCollapsed, me = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ge,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        W++;
      }
    }
    function Ve() {
      {
        if (W--, W === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: D({}, e, {
              value: le
            }),
            info: D({}, e, {
              value: fe
            }),
            warn: D({}, e, {
              value: ue
            }),
            error: D({}, e, {
              value: de
            }),
            group: D({}, e, {
              value: he
            }),
            groupCollapsed: D({}, e, {
              value: pe
            }),
            groupEnd: D({}, e, {
              value: me
            })
          });
        }
        W < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Z = b.ReactCurrentDispatcher, Q;
    function X(e, o, f) {
      {
        if (Q === void 0)
          try {
            throw Error();
          } catch (x) {
            var g = x.stack.trim().match(/\n( *(at )?)/);
            Q = g && g[1] || "";
          }
        return `
` + Q + e;
      }
    }
    var ee = !1, q;
    {
      var Be = typeof WeakMap == "function" ? WeakMap : Map;
      q = new Be();
    }
    function ve(e, o) {
      if (!e || ee)
        return "";
      {
        var f = q.get(e);
        if (f !== void 0)
          return f;
      }
      var g;
      ee = !0;
      var x = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var I;
      I = Z.current, Z.current = null, Ue();
      try {
        if (o) {
          var w = function() {
            throw Error();
          };
          if (Object.defineProperty(w.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(w, []);
            } catch (A) {
              g = A;
            }
            Reflect.construct(e, [], w);
          } else {
            try {
              w.call();
            } catch (A) {
              g = A;
            }
            e.call(w.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (A) {
            g = A;
          }
          e();
        }
      } catch (A) {
        if (A && g && typeof A.stack == "string") {
          for (var E = A.stack.split(`
`), T = g.stack.split(`
`), N = E.length - 1, S = T.length - 1; N >= 1 && S >= 0 && E[N] !== T[S]; )
            S--;
          for (; N >= 1 && S >= 0; N--, S--)
            if (E[N] !== T[S]) {
              if (N !== 1 || S !== 1)
                do
                  if (N--, S--, S < 0 || E[N] !== T[S]) {
                    var P = `
` + E[N].replace(" at new ", " at ");
                    return e.displayName && P.includes("<anonymous>") && (P = P.replace("<anonymous>", e.displayName)), typeof e == "function" && q.set(e, P), P;
                  }
                while (N >= 1 && S >= 0);
              break;
            }
        }
      } finally {
        ee = !1, Z.current = I, Ve(), Error.prepareStackTrace = x;
      }
      var $ = e ? e.displayName || e.name : "", O = $ ? X($) : "";
      return typeof e == "function" && q.set(e, O), O;
    }
    function ze(e, o, f) {
      return ve(e, !1);
    }
    function Xe(e) {
      var o = e.prototype;
      return !!(o && o.isReactComponent);
    }
    function J(e, o, f) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ve(e, Xe(e));
      if (typeof e == "string")
        return X(e);
      switch (e) {
        case u:
          return X("Suspense");
        case s:
          return X("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case n:
            return ze(e.render);
          case d:
            return J(e.type, o, f);
          case y: {
            var g = e, x = g._payload, I = g._init;
            try {
              return J(I(x), o, f);
            } catch {
            }
          }
        }
      return "";
    }
    var L = Object.prototype.hasOwnProperty, ye = {}, be = b.ReactDebugCurrentFrame;
    function H(e) {
      if (e) {
        var o = e._owner, f = J(e.type, e._source, o ? o.type : null);
        be.setExtraStackFrame(f);
      } else
        be.setExtraStackFrame(null);
    }
    function qe(e, o, f, g, x) {
      {
        var I = Function.call.bind(L);
        for (var w in e)
          if (I(e, w)) {
            var E = void 0;
            try {
              if (typeof e[w] != "function") {
                var T = Error((g || "React class") + ": " + f + " type `" + w + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[w] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw T.name = "Invariant Violation", T;
              }
              E = e[w](o, w, g, f, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (N) {
              E = N;
            }
            E && !(E instanceof Error) && (H(x), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", g || "React class", f, w, typeof E), H(null)), E instanceof Error && !(E.message in ye) && (ye[E.message] = !0, H(x), C("Failed %s type: %s", f, E.message), H(null));
          }
      }
    }
    var Je = Array.isArray;
    function te(e) {
      return Je(e);
    }
    function He(e) {
      {
        var o = typeof Symbol == "function" && Symbol.toStringTag, f = o && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return f;
      }
    }
    function Ke(e) {
      try {
        return Ee(e), !1;
      } catch {
        return !0;
      }
    }
    function Ee(e) {
      return "" + e;
    }
    function we(e) {
      if (Ke(e))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", He(e)), Ee(e);
    }
    var xe = b.ReactCurrentOwner, Ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ie, Re;
    function Qe(e) {
      if (L.call(e, "ref")) {
        var o = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (o && o.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function et(e) {
      if (L.call(e, "key")) {
        var o = Object.getOwnPropertyDescriptor(e, "key").get;
        if (o && o.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function tt(e, o) {
      typeof e.ref == "string" && xe.current;
    }
    function rt(e, o) {
      {
        var f = function() {
          Ie || (Ie = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", o));
        };
        f.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: f,
          configurable: !0
        });
      }
    }
    function ot(e, o) {
      {
        var f = function() {
          Re || (Re = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", o));
        };
        f.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: f,
          configurable: !0
        });
      }
    }
    var nt = function(e, o, f, g, x, I, w) {
      var E = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: e,
        key: o,
        ref: f,
        props: w,
        // Record the component responsible for creating this element.
        _owner: I
      };
      return E._store = {}, Object.defineProperty(E._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(E, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: g
      }), Object.defineProperty(E, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: x
      }), Object.freeze && (Object.freeze(E.props), Object.freeze(E)), E;
    };
    function at(e, o, f, g, x) {
      {
        var I, w = {}, E = null, T = null;
        f !== void 0 && (we(f), E = "" + f), et(o) && (we(o.key), E = "" + o.key), Qe(o) && (T = o.ref, tt(o, x));
        for (I in o)
          L.call(o, I) && !Ze.hasOwnProperty(I) && (w[I] = o[I]);
        if (e && e.defaultProps) {
          var N = e.defaultProps;
          for (I in N)
            w[I] === void 0 && (w[I] = N[I]);
        }
        if (E || T) {
          var S = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          E && rt(w, S), T && ot(w, S);
        }
        return nt(e, E, T, x, g, xe.current, w);
      }
    }
    var re = b.ReactCurrentOwner, _e = b.ReactDebugCurrentFrame;
    function M(e) {
      if (e) {
        var o = e._owner, f = J(e.type, e._source, o ? o.type : null);
        _e.setExtraStackFrame(f);
      } else
        _e.setExtraStackFrame(null);
    }
    var oe;
    oe = !1;
    function ne(e) {
      return typeof e == "object" && e !== null && e.$$typeof === t;
    }
    function Ce() {
      {
        if (re.current) {
          var e = k(re.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function it(e) {
      return "";
    }
    var Ne = {};
    function st(e) {
      {
        var o = Ce();
        if (!o) {
          var f = typeof e == "string" ? e : e.displayName || e.name;
          f && (o = `

Check the top-level render call using <` + f + ">.");
        }
        return o;
      }
    }
    function Se(e, o) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var f = st(o);
        if (Ne[f])
          return;
        Ne[f] = !0;
        var g = "";
        e && e._owner && e._owner !== re.current && (g = " It was passed a child from " + k(e._owner.type) + "."), M(e), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', f, g), M(null);
      }
    }
    function Te(e, o) {
      {
        if (typeof e != "object")
          return;
        if (te(e))
          for (var f = 0; f < e.length; f++) {
            var g = e[f];
            ne(g) && Se(g, o);
          }
        else if (ne(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var x = m(e);
          if (typeof x == "function" && x !== e.entries)
            for (var I = x.call(e), w; !(w = I.next()).done; )
              ne(w.value) && Se(w.value, o);
        }
      }
    }
    function ct(e) {
      {
        var o = e.type;
        if (o == null || typeof o == "string")
          return;
        var f;
        if (typeof o == "function")
          f = o.propTypes;
        else if (typeof o == "object" && (o.$$typeof === n || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        o.$$typeof === d))
          f = o.propTypes;
        else
          return;
        if (f) {
          var g = k(o);
          qe(f, e.props, "prop", g, e);
        } else if (o.PropTypes !== void 0 && !oe) {
          oe = !0;
          var x = k(o);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", x || "Unknown");
        }
        typeof o.getDefaultProps == "function" && !o.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function lt(e) {
      {
        for (var o = Object.keys(e.props), f = 0; f < o.length; f++) {
          var g = o[f];
          if (g !== "children" && g !== "key") {
            M(e), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", g), M(null);
            break;
          }
        }
        e.ref !== null && (M(e), C("Invalid attribute `ref` supplied to `React.Fragment`."), M(null));
      }
    }
    var Ae = {};
    function Pe(e, o, f, g, x, I) {
      {
        var w = Ye(e);
        if (!w) {
          var E = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var T = it();
          T ? E += T : E += Ce();
          var N;
          e === null ? N = "null" : te(e) ? N = "array" : e !== void 0 && e.$$typeof === t ? (N = "<" + (k(e.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : N = typeof e, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", N, E);
        }
        var S = at(e, o, f, x, I);
        if (S == null)
          return S;
        if (w) {
          var P = o.children;
          if (P !== void 0)
            if (g)
              if (te(P)) {
                for (var $ = 0; $ < P.length; $++)
                  Te(P[$], e);
                Object.freeze && Object.freeze(P);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Te(P, e);
        }
        if (L.call(o, "key")) {
          var O = k(e), A = Object.keys(o).filter(function(mt) {
            return mt !== "key";
          }), ae = A.length > 0 ? "{key: someKey, " + A.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ae[O + ae]) {
            var pt = A.length > 0 ? "{" + A.join(": ..., ") + ": ...}" : "{}";
            C(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ae, O, pt, O), Ae[O + ae] = !0;
          }
        }
        return e === h ? lt(S) : ct(S), S;
      }
    }
    function ft(e, o, f) {
      return Pe(e, o, f, !0);
    }
    function ut(e, o, f) {
      return Pe(e, o, f, !1);
    }
    var dt = ut, ht = ft;
    G.Fragment = h, G.jsx = dt, G.jsxs = ht;
  }()), G;
}
process.env.NODE_ENV === "production" ? ie.exports = wt() : ie.exports = xt();
var We = ie.exports;
function It(_) {
  const t = _.trim().split(`
`).filter((r) => r.trim()), i = [];
  for (const r of t) {
    const c = r.match(/^(.+?)\s*->\s*(.+?)\s*\((.+?):(\d+)\)$/);
    if (c) {
      const [, n, u, s, d] = c;
      n && u && s && d && i.push({
        from: n.trim(),
        to: u.trim(),
        skill: s.trim(),
        maxAssignees: parseInt(d, 10)
      });
    } else {
      const n = r.match(/^(.+?)\s*->\s*(.+?)$/);
      if (n) {
        const [, u, s] = n;
        u && s && i.push({
          from: u.trim(),
          to: s.trim()
        });
      }
    }
  }
  const h = /* @__PURE__ */ new Set();
  i.forEach((r) => {
    h.add(r.from), h.add(r.to);
  });
  const p = Array.from(h).map((r) => ({
    id: `node-${r.toLowerCase().replace(/\s+/g, "-")}`,
    label: r
  })), a = i.map((r, c) => {
    const n = p.find((d) => d.label === r.from), u = p.find((d) => d.label === r.to), s = {
      id: `edge-${c}`,
      fromNodeId: n.id,
      toNodeId: u.id
    };
    return r.skill !== void 0 && (s.skill = r.skill), r.maxAssignees !== void 0 && (s.maxAssignees = r.maxAssignees), s;
  });
  return { nodes: p, edges: a };
}
function Rt(_) {
  const t = new Map(_.nodes.map((h) => [h.id, h.label]));
  return _t(_.edges, t).map((h) => {
    const p = t.get(h.fromNodeId) || "Unknown", a = t.get(h.toNodeId) || "Unknown";
    return h.skill !== void 0 && h.maxAssignees !== void 0 ? `${p} -> ${a} (${h.skill}:${h.maxAssignees})` : `${p} -> ${a}`;
  }).join(`
`);
}
function _t(_, t) {
  const i = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set();
  _.forEach((u) => {
    p.add(u.fromNodeId), p.add(u.toNodeId), i.has(u.fromNodeId) || i.set(u.fromNodeId, []), h.has(u.toNodeId) || h.set(u.toNodeId, []), i.get(u.fromNodeId).push(u), h.get(u.toNodeId).push(u);
  });
  const a = Array.from(p).filter((u) => !h.has(u)), r = [], c = /* @__PURE__ */ new Set(), n = [...a];
  for (; n.length > 0; ) {
    const u = [...n];
    n.length = 0, u.sort((s, d) => {
      const y = t.get(s) || "", l = t.get(d) || "";
      return y.toLowerCase().includes("start") ? -1 : l.toLowerCase().includes("start") || y.toLowerCase().includes("end") ? 1 : l.toLowerCase().includes("end") ? -1 : y.localeCompare(l);
    }), u.forEach((s) => {
      if (c.has(s)) return;
      c.add(s);
      const d = i.get(s) || [];
      d.sort((y, l) => {
        const v = t.get(y.toNodeId) || "", R = t.get(l.toNodeId) || "";
        return v.localeCompare(R);
      }), r.push(...d), d.forEach((y) => {
        c.has(y.toNodeId) || n.push(y.toNodeId);
      });
    });
  }
  return r;
}
class Ct {
  constructor(t) {
    ke(this, "editor");
    this.editor = t;
  }
  /**
   * Import DAG text format and create visual representation in tldraw
   * @throws Error when DAG text format is invalid
   */
  import(t) {
    try {
      const i = It(t);
      this.clearCanvas(), this.createVisualDAG(i);
    } catch (i) {
      throw new Error(`Failed to import DAG: ${i instanceof Error ? i.message : "Unknown error"}`);
    }
  }
  /**
   * Export current tldraw shapes back to DAG text format
   * @throws Error when shapes cannot be converted to valid DAG
   */
  export() {
    try {
      const t = this.extractDAGFromCanvas();
      return Rt(t);
    } catch (t) {
      throw new Error(`Failed to export DAG: ${t instanceof Error ? t.message : "Unknown error"}`);
    }
  }
  clearCanvas() {
    const t = this.editor.getCurrentPageShapes();
    t.length > 0 && this.editor.deleteShapes(t.map((i) => i.id));
  }
  createVisualDAG(t) {
    try {
      const i = this.calculateLayout(t), h = /* @__PURE__ */ new Map(), p = [];
      let a = "a1";
      i.nodes.forEach((r) => {
        const c = Oe();
        h.set(r.id, c), p.push({
          id: c,
          type: "geo",
          x: r.x || 0,
          y: r.y || 0,
          index: a,
          // Use proper tldraw index
          props: {
            geo: "rectangle",
            w: Math.max(240, r.label.length * 16 + 64),
            h: 60,
            text: r.label,
            color: this.getNodeColor(r.label),
            fill: "solid",
            dash: "solid",
            size: "m"
          },
          meta: {
            dagNodeId: r.id,
            isDagNode: !0
          }
        }), a = je(a, void 0);
      }), i.edges.forEach((r) => {
        try {
          const c = h.get(r.fromNodeId), n = h.get(r.toNodeId), u = i.nodes.find((d) => d.id === r.fromNodeId), s = i.nodes.find((d) => d.id === r.toNodeId);
          if (c && n && u && s) {
            const d = Oe(), y = Me(), l = Me(), v = (u.x || 0) + 120, R = (u.y || 0) + 30, m = (s.x || 0) + 120, b = (s.y || 0) + 30;
            p.push({
              id: d,
              type: "arrow",
              x: Math.min(v, m),
              y: Math.min(R, b),
              index: a,
              // Use proper tldraw index
              props: {
                start: {
                  x: v - Math.min(v, m),
                  y: R - Math.min(R, b)
                },
                end: {
                  x: m - Math.min(v, m),
                  y: b - Math.min(R, b)
                },
                text: r.skill && r.maxAssignees ? `${r.skill}:${r.maxAssignees}` : "",
                color: "black",
                fill: "none",
                dash: "solid",
                size: "m",
                arrowheadStart: "none",
                arrowheadEnd: "arrow",
                font: "draw",
                bend: 0
              },
              meta: {
                dagEdgeId: r.id,
                isDagArrow: !0
              }
            }), a = je(a, void 0), p.push({
              type: "_binding",
              id: y,
              bindingType: "arrow",
              fromId: d,
              toId: c,
              props: {
                terminal: "start",
                isPrecise: !1,
                isExact: !1,
                normalizedAnchor: { x: 0.5, y: 0.5 }
              }
            }), p.push({
              type: "_binding",
              id: l,
              bindingType: "arrow",
              fromId: d,
              toId: n,
              props: {
                terminal: "end",
                isPrecise: !1,
                isExact: !1,
                normalizedAnchor: { x: 0.5, y: 0.5 }
              }
            });
          }
        } catch (c) {
          console.error(`Error preparing edge ${r.id}:`, c);
        }
      }), this.editor.batch(() => {
        const r = p.filter((n) => n.type !== "_binding"), c = p.filter((n) => n.type === "_binding");
        r.length > 0 && this.editor.createShapes(r), c.forEach((n) => {
          try {
            this.editor.createBinding({
              id: n.id,
              type: n.bindingType,
              fromId: n.fromId,
              toId: n.toId,
              props: n.props
            });
          } catch (u) {
            console.error("Error creating binding:", u);
          }
        });
      });
      try {
        this.editor.zoomToFit({ animation: { duration: 500 } });
      } catch (r) {
        console.error("Error fitting view:", r);
      }
    } catch (i) {
      throw console.error("Error creating visual DAG:", i), i;
    }
  }
  calculateLayout(t) {
    const i = { nodes: [...t.nodes], edges: [...t.edges] }, h = new Set(t.edges.map((l) => l.toNodeId)), p = t.nodes.filter((l) => !h.has(l.id)), a = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    t.edges.forEach((l) => {
      a.has(l.fromNodeId) || a.set(l.fromNodeId, []), r.has(l.toNodeId) || r.set(l.toNodeId, []), a.get(l.fromNodeId).push(l.toNodeId), r.get(l.toNodeId).push(l.fromNodeId);
    });
    const c = /* @__PURE__ */ new Map(), n = [];
    for (p.forEach((l) => {
      c.set(l.id, 0), n.push({ nodeId: l.id, level: 0 });
    }); n.length > 0; ) {
      const { nodeId: l, level: v } = n.shift();
      (a.get(l) || []).forEach((m) => {
        const b = c.get(m) ?? -1;
        v + 1 > b && (c.set(m, v + 1), n.push({ nodeId: m, level: v + 1 }));
      });
    }
    const u = /* @__PURE__ */ new Map();
    i.nodes.forEach((l) => {
      const v = c.get(l.id) ?? 0;
      u.has(v) || u.set(v, []), u.get(v).push(l);
    }), this.reduceCrossings(u, t.edges);
    const s = 280, d = s + 100, y = 250;
    return u.forEach((l, v) => {
      if (l.length === 0) return;
      const R = Math.max(d, 1200 / Math.max(l.length - 1, 1)), b = -((l.length - 1) * R) / 2;
      l.forEach((C, j) => {
        C.x = b + j * R, C.y = v * y;
      }), this.resolveNodeCollisions(l, s);
    }), this.centerDAG(i.nodes), this.adjustForEdgeMinimization(i, t.edges, c), this.resolveNodeEdgeCollisions(i, t.edges), i;
  }
  reduceCrossings(t, i) {
    var p, a;
    for (let r = 0; r < 5; r++) {
      for (let c = 1; c <= Math.max(...t.keys()); c++) {
        const n = t.get(c);
        if (!n || n.length <= 1) continue;
        const u = /* @__PURE__ */ new Map();
        (p = t.get(c - 1)) == null || p.forEach((s, d) => {
          u.set(s.id, d);
        }), n.sort((s, d) => {
          const y = i.filter((m) => m.toNodeId === s.id).map((m) => u.get(m.fromNodeId) ?? 0), l = i.filter((m) => m.toNodeId === d.id).map((m) => u.get(m.fromNodeId) ?? 0), v = y.length > 0 ? y.reduce((m, b) => m + b, 0) / y.length : 0, R = l.length > 0 ? l.reduce((m, b) => m + b, 0) / l.length : 0;
          return v - R;
        });
      }
      for (let c = Math.max(...t.keys()) - 1; c >= 0; c--) {
        const n = t.get(c);
        if (!n || n.length <= 1) continue;
        const u = /* @__PURE__ */ new Map();
        (a = t.get(c + 1)) == null || a.forEach((s, d) => {
          u.set(s.id, d);
        }), n.sort((s, d) => {
          const y = i.filter((m) => m.fromNodeId === s.id).map((m) => u.get(m.toNodeId) ?? 0), l = i.filter((m) => m.fromNodeId === d.id).map((m) => u.get(m.toNodeId) ?? 0), v = y.length > 0 ? y.reduce((m, b) => m + b, 0) / y.length : 0, R = l.length > 0 ? l.reduce((m, b) => m + b, 0) / l.length : 0;
          return v - R;
        });
      }
    }
  }
  resolveNodeCollisions(t, i) {
    for (let h = 0; h < t.length - 1; h++) {
      const p = t[h], a = t[h + 1];
      if (!(p != null && p.x) || !(a != null && a.x)) continue;
      const r = i + 50, c = a.x - p.x;
      if (c < r) {
        const n = (r - c) / 2;
        p.x -= n, a.x += n;
      }
    }
  }
  centerDAG(t) {
    if (t.length === 0) return;
    const i = Math.min(...t.map((r) => r.x || 0)), a = -(Math.max(...t.map((r) => r.x || 0)) - i) / 2 - i;
    t.forEach((r) => {
      r.x = (r.x || 0) + a;
    });
  }
  adjustForEdgeMinimization(t, i, h) {
    const p = /* @__PURE__ */ new Map();
    t.nodes.forEach((a) => {
      p.set(a.id, { x: a.x || 0, y: a.y || 0 });
    }), i.forEach((a) => {
      const r = p.get(a.fromNodeId), c = p.get(a.toNodeId), n = h.get(a.fromNodeId) ?? 0, u = h.get(a.toNodeId) ?? 0;
      if (r && c && Math.abs(u - n) === 1) {
        const s = Math.abs(r.x - c.x);
        if (s > 200) {
          const d = Math.min(30, (s - 200) / 10);
          r.x > c.x ? (r.x -= d, c.x += d) : (r.x += d, c.x -= d);
        }
      }
    }), t.nodes.forEach((a) => {
      const r = p.get(a.id);
      r && (a.x = r.x, a.y = r.y);
    });
  }
  resolveNodeEdgeCollisions(t, i) {
    t.nodes.forEach((r) => {
      const c = r.x || 0, n = r.y || 0, u = {
        left: c - 280 / 2 - 20,
        right: c + 280 / 2 + 20,
        top: n - 60 / 2 - 20,
        bottom: n + 60 / 2 + 20
      };
      i.forEach((s) => {
        if (s.fromNodeId === r.id || s.toNodeId === r.id) return;
        const d = t.nodes.find((b) => b.id === s.fromNodeId), y = t.nodes.find((b) => b.id === s.toNodeId);
        if (!d || !y) return;
        const l = (d.x || 0) + 120, v = (d.y || 0) + 30, R = (y.x || 0) + 120, m = (y.y || 0) + 30;
        if (this.lineIntersectsRect(l, v, R, m, u)) {
          console.log(`Node ${r.label} collides with edge ${s.fromNodeId} -> ${s.toNodeId}`);
          const b = (l + R) / 2, C = c;
          Math.abs(C - b) < 280 / 2 + 20 && (C < b ? r.x = b - 210 : r.x = b + 210, console.log(`Moved ${r.label} to x=${r.x} to avoid edge collision`));
        }
      });
    });
  }
  lineIntersectsRect(t, i, h, p, a) {
    return t >= a.left && t <= a.right && i >= a.top && i <= a.bottom || h >= a.left && h <= a.right && p >= a.top && p <= a.bottom ? !0 : this.linesIntersect(t, i, h, p, a.left, a.top, a.right, a.top) || // Top edge
    this.linesIntersect(t, i, h, p, a.right, a.top, a.right, a.bottom) || // Right edge
    this.linesIntersect(t, i, h, p, a.right, a.bottom, a.left, a.bottom) || // Bottom edge
    this.linesIntersect(t, i, h, p, a.left, a.bottom, a.left, a.top);
  }
  linesIntersect(t, i, h, p, a, r, c, n) {
    const u = (t - h) * (r - n) - (i - p) * (a - c);
    if (Math.abs(u) < 1e-10) return !1;
    const s = ((t - a) * (r - n) - (i - r) * (a - c)) / u, d = -((t - h) * (i - r) - (i - p) * (t - a)) / u;
    return s >= 0 && s <= 1 && d >= 0 && d <= 1;
  }
  extractDAGFromCanvas() {
    try {
      const t = this.editor.getCurrentPageShapes(), i = t.filter(
        (n) => n.type === "geo" && n.props.geo === "rectangle"
      ), h = t.filter((n) => n.type === "arrow");
      if (i.length === 0)
        throw new Error("No DAG nodes found on canvas");
      const p = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
      i.forEach((n) => {
        var u;
        n.id && ((u = n.props) == null ? void 0 : u.text) !== void 0 && (p.set(n.id, n.props.text || "Untitled"), a.add(n.id));
      });
      const r = i.filter((n) => n.id && n.props).map((n) => ({
        id: n.id,
        label: n.props.text || "Untitled",
        x: n.x || 0,
        y: n.y || 0
      })), c = [];
      try {
        const u = this.editor.store.allRecords().filter((s) => {
          try {
            return s && s.typeName === "binding";
          } catch {
            return !1;
          }
        });
        h.forEach((s, d) => {
          var y;
          try {
            if (!s || !s.id || !((y = s.props) != null && y.text)) return;
            const l = u.filter((m) => {
              try {
                return m && m.fromId === s.id;
              } catch {
                return !1;
              }
            }), v = l.find((m) => {
              try {
                return m && m.props && m.props.terminal === "start";
              } catch {
                return !1;
              }
            }), R = l.find((m) => {
              try {
                return m && m.props && m.props.terminal === "end";
              } catch {
                return !1;
              }
            });
            if (v && R) {
              const m = v.toId, b = R.toId;
              if (!a.has(m) || !a.has(b)) {
                console.warn(`Skipping arrow ${s.id}: references non-existent nodes`);
                return;
              }
              const C = p.get(m), j = p.get(b);
              if (C && j) {
                const F = {
                  id: `edge-${d}`,
                  fromNodeId: m,
                  toNodeId: b
                }, U = s.props.text.trim();
                if (U) {
                  const V = U.match(/^(.+):(\d+)$/);
                  if (V) {
                    const [, B, z] = V;
                    B && z && (F.skill = B.trim(), F.maxAssignees = parseInt(z, 10));
                  }
                }
                c.push(F);
              }
            }
          } catch (l) {
            console.warn(`Error processing arrow ${s.id}:`, l);
          }
        });
      } catch (n) {
        console.warn("Error processing bindings:", n);
      }
      return { nodes: r, edges: c };
    } catch (t) {
      throw console.error("Error extracting DAG from canvas:", t), t;
    }
  }
  getNodeColor(t) {
    const i = t.toLowerCase();
    return i.includes("start") ? "green" : i.includes("end") ? "violet" : "blue";
  }
}
function Nt(_) {
  return new Ct(_);
}
const St = yt(
  ({ onMount: _, onError: t, persistenceKey: i, className: h, style: p, autoImport: a }, r) => {
    const c = De(null), n = De(null), u = K((l) => {
      if (n.current = l, c.current = Nt(l), a && c.current)
        try {
          c.current.import(a);
        } catch (v) {
          const R = v instanceof Error ? v.message : "Failed to auto-import DAG";
          t == null || t(R);
        }
      _ == null || _(l);
    }, [_, t, a]), s = K((l) => {
      if (!c.current) {
        const v = "DAG adaptor not initialized. Make sure tldraw has mounted.";
        throw t == null || t(v), new Error(v);
      }
      try {
        c.current.import(l);
      } catch (v) {
        const R = v instanceof Error ? v.message : "Failed to import DAG";
        throw t == null || t(R), v;
      }
    }, [t]), d = K(() => {
      if (!c.current) {
        const l = "DAG adaptor not initialized. Make sure tldraw has mounted.";
        throw t == null || t(l), new Error(l);
      }
      try {
        return c.current.export();
      } catch (l) {
        const v = l instanceof Error ? l.message : "Failed to export DAG";
        throw t == null || t(v), l;
      }
    }, [t]), y = K(() => n.current, []);
    return bt(r, () => ({
      importDAG: s,
      exportDAG: d,
      getEditor: y
    }), [s, d, y]), /* @__PURE__ */ We.jsx("div", { className: h, style: { width: "100%", height: "100%", ...p }, children: /* @__PURE__ */ We.jsx(
      Et,
      {
        onMount: u,
        persistenceKey: i
      }
    ) });
  }
);
St.displayName = "DagTldraw";
export {
  Ct as DagAdaptor,
  St as DagTldraw,
  Nt as createDagAdaptor,
  Rt as dagToText,
  It as parseDAGText
};
