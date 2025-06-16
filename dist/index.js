var gt = Object.defineProperty;
var vt = (C, t, i) => t in C ? gt(C, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : C[t] = i;
var ke = (C, t, i) => vt(C, typeof t != "symbol" ? t + "" : t, i);
import Le, { forwardRef as yt, useRef as De, useCallback as K, useImperativeHandle as bt } from "react";
import { createShapeId as Oe, getIndexBetween as je, createBindingId as Me, Tldraw as Et } from "tldraw";
var se = { exports: {} }, G = {};
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
  if ($e) return G;
  $e = 1;
  var C = Le, t = Symbol.for("react.element"), i = Symbol.for("react.fragment"), d = Object.prototype.hasOwnProperty, h = C.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function r(f, o, l) {
    var s, u = {}, b = null, p = null;
    l !== void 0 && (b = "" + l), o.key !== void 0 && (b = "" + o.key), o.ref !== void 0 && (p = o.ref);
    for (s in o) d.call(o, s) && !a.hasOwnProperty(s) && (u[s] = o[s]);
    if (f && f.defaultProps) for (s in o = f.defaultProps, o) u[s] === void 0 && (u[s] = o[s]);
    return { $$typeof: t, type: f, key: b, ref: p, props: u, _owner: h.current };
  }
  return G.Fragment = i, G.jsx = r, G.jsxs = r, G;
}
var U = {};
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
    var C = Le, t = Symbol.for("react.element"), i = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), r = Symbol.for("react.provider"), f = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), u = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), y = Symbol.iterator, w = "@@iterator";
    function v(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = y && e[y] || e[w];
      return typeof n == "function" ? n : null;
    }
    var m = C.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(e) {
      {
        for (var n = arguments.length, c = new Array(n > 1 ? n - 1 : 0), g = 1; g < n; g++)
          c[g - 1] = arguments[g];
        j("error", e, c);
      }
    }
    function j(e, n, c) {
      {
        var g = m.ReactDebugCurrentFrame, I = g.getStackAddendum();
        I !== "" && (n += "%s", c = c.concat([I]));
        var R = c.map(function(x) {
          return String(x);
        });
        R.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, R);
      }
    }
    var Z = !1, F = !1, V = !1, B = !1, z = !1, W;
    W = Symbol.for("react.module.reference");
    function Ye(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === d || e === a || z || e === h || e === l || e === s || B || e === p || Z || F || V || typeof e == "object" && e !== null && (e.$$typeof === b || e.$$typeof === u || e.$$typeof === r || e.$$typeof === f || e.$$typeof === o || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === W || e.getModuleId !== void 0));
    }
    function Ge(e, n, c) {
      var g = e.displayName;
      if (g)
        return g;
      var I = n.displayName || n.name || "";
      return I !== "" ? c + "(" + I + ")" : c;
    }
    function ce(e) {
      return e.displayName || "Context";
    }
    function k(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case d:
          return "Fragment";
        case i:
          return "Portal";
        case a:
          return "Profiler";
        case h:
          return "StrictMode";
        case l:
          return "Suspense";
        case s:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            var n = e;
            return ce(n) + ".Consumer";
          case r:
            var c = e;
            return ce(c._context) + ".Provider";
          case o:
            return Ge(e, e.render, "ForwardRef");
          case u:
            var g = e.displayName || null;
            return g !== null ? g : k(e.type) || "Memo";
          case b: {
            var I = e, R = I._payload, x = I._init;
            try {
              return k(x(R));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, L = 0, le, fe, ue, de, he, pe, me;
    function ge() {
    }
    ge.__reactDisabledLog = !0;
    function Ue() {
      {
        if (L === 0) {
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
        L++;
      }
    }
    function Ve() {
      {
        if (L--, L === 0) {
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
        L < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Q = m.ReactCurrentDispatcher, ee;
    function X(e, n, c) {
      {
        if (ee === void 0)
          try {
            throw Error();
          } catch (I) {
            var g = I.stack.trim().match(/\n( *(at )?)/);
            ee = g && g[1] || "";
          }
        return `
` + ee + e;
      }
    }
    var te = !1, q;
    {
      var Be = typeof WeakMap == "function" ? WeakMap : Map;
      q = new Be();
    }
    function ve(e, n) {
      if (!e || te)
        return "";
      {
        var c = q.get(e);
        if (c !== void 0)
          return c;
      }
      var g;
      te = !0;
      var I = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var R;
      R = Q.current, Q.current = null, Ue();
      try {
        if (n) {
          var x = function() {
            throw Error();
          };
          if (Object.defineProperty(x.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(x, []);
            } catch (A) {
              g = A;
            }
            Reflect.construct(e, [], x);
          } else {
            try {
              x.call();
            } catch (A) {
              g = A;
            }
            e.call(x.prototype);
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
        te = !1, Q.current = R, Ve(), Error.prepareStackTrace = I;
      }
      var $ = e ? e.displayName || e.name : "", O = $ ? X($) : "";
      return typeof e == "function" && q.set(e, O), O;
    }
    function ze(e, n, c) {
      return ve(e, !1);
    }
    function Xe(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function J(e, n, c) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ve(e, Xe(e));
      if (typeof e == "string")
        return X(e);
      switch (e) {
        case l:
          return X("Suspense");
        case s:
          return X("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case o:
            return ze(e.render);
          case u:
            return J(e.type, n, c);
          case b: {
            var g = e, I = g._payload, R = g._init;
            try {
              return J(R(I), n, c);
            } catch {
            }
          }
        }
      return "";
    }
    var Y = Object.prototype.hasOwnProperty, ye = {}, be = m.ReactDebugCurrentFrame;
    function H(e) {
      if (e) {
        var n = e._owner, c = J(e.type, e._source, n ? n.type : null);
        be.setExtraStackFrame(c);
      } else
        be.setExtraStackFrame(null);
    }
    function qe(e, n, c, g, I) {
      {
        var R = Function.call.bind(Y);
        for (var x in e)
          if (R(e, x)) {
            var E = void 0;
            try {
              if (typeof e[x] != "function") {
                var T = Error((g || "React class") + ": " + c + " type `" + x + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[x] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw T.name = "Invariant Violation", T;
              }
              E = e[x](n, x, g, c, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (N) {
              E = N;
            }
            E && !(E instanceof Error) && (H(I), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", g || "React class", c, x, typeof E), H(null)), E instanceof Error && !(E.message in ye) && (ye[E.message] = !0, H(I), _("Failed %s type: %s", c, E.message), H(null));
          }
      }
    }
    var Je = Array.isArray;
    function re(e) {
      return Je(e);
    }
    function He(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, c = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return c;
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
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", He(e)), Ee(e);
    }
    var xe = m.ReactCurrentOwner, Ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ie, Re;
    function Qe(e) {
      if (Y.call(e, "ref")) {
        var n = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function et(e) {
      if (Y.call(e, "key")) {
        var n = Object.getOwnPropertyDescriptor(e, "key").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function tt(e, n) {
      typeof e.ref == "string" && xe.current;
    }
    function rt(e, n) {
      {
        var c = function() {
          Ie || (Ie = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        c.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: c,
          configurable: !0
        });
      }
    }
    function ot(e, n) {
      {
        var c = function() {
          Re || (Re = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        c.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: c,
          configurable: !0
        });
      }
    }
    var nt = function(e, n, c, g, I, R, x) {
      var E = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: e,
        key: n,
        ref: c,
        props: x,
        // Record the component responsible for creating this element.
        _owner: R
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
        value: I
      }), Object.freeze && (Object.freeze(E.props), Object.freeze(E)), E;
    };
    function at(e, n, c, g, I) {
      {
        var R, x = {}, E = null, T = null;
        c !== void 0 && (we(c), E = "" + c), et(n) && (we(n.key), E = "" + n.key), Qe(n) && (T = n.ref, tt(n, I));
        for (R in n)
          Y.call(n, R) && !Ze.hasOwnProperty(R) && (x[R] = n[R]);
        if (e && e.defaultProps) {
          var N = e.defaultProps;
          for (R in N)
            x[R] === void 0 && (x[R] = N[R]);
        }
        if (E || T) {
          var S = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          E && rt(x, S), T && ot(x, S);
        }
        return nt(e, E, T, I, g, xe.current, x);
      }
    }
    var oe = m.ReactCurrentOwner, _e = m.ReactDebugCurrentFrame;
    function M(e) {
      if (e) {
        var n = e._owner, c = J(e.type, e._source, n ? n.type : null);
        _e.setExtraStackFrame(c);
      } else
        _e.setExtraStackFrame(null);
    }
    var ne;
    ne = !1;
    function ae(e) {
      return typeof e == "object" && e !== null && e.$$typeof === t;
    }
    function Ce() {
      {
        if (oe.current) {
          var e = k(oe.current.type);
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
        var n = Ce();
        if (!n) {
          var c = typeof e == "string" ? e : e.displayName || e.name;
          c && (n = `

Check the top-level render call using <` + c + ">.");
        }
        return n;
      }
    }
    function Se(e, n) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var c = st(n);
        if (Ne[c])
          return;
        Ne[c] = !0;
        var g = "";
        e && e._owner && e._owner !== oe.current && (g = " It was passed a child from " + k(e._owner.type) + "."), M(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', c, g), M(null);
      }
    }
    function Te(e, n) {
      {
        if (typeof e != "object")
          return;
        if (re(e))
          for (var c = 0; c < e.length; c++) {
            var g = e[c];
            ae(g) && Se(g, n);
          }
        else if (ae(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var I = v(e);
          if (typeof I == "function" && I !== e.entries)
            for (var R = I.call(e), x; !(x = R.next()).done; )
              ae(x.value) && Se(x.value, n);
        }
      }
    }
    function ct(e) {
      {
        var n = e.type;
        if (n == null || typeof n == "string")
          return;
        var c;
        if (typeof n == "function")
          c = n.propTypes;
        else if (typeof n == "object" && (n.$$typeof === o || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        n.$$typeof === u))
          c = n.propTypes;
        else
          return;
        if (c) {
          var g = k(n);
          qe(c, e.props, "prop", g, e);
        } else if (n.PropTypes !== void 0 && !ne) {
          ne = !0;
          var I = k(n);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", I || "Unknown");
        }
        typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function lt(e) {
      {
        for (var n = Object.keys(e.props), c = 0; c < n.length; c++) {
          var g = n[c];
          if (g !== "children" && g !== "key") {
            M(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", g), M(null);
            break;
          }
        }
        e.ref !== null && (M(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), M(null));
      }
    }
    var Ae = {};
    function Pe(e, n, c, g, I, R) {
      {
        var x = Ye(e);
        if (!x) {
          var E = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var T = it();
          T ? E += T : E += Ce();
          var N;
          e === null ? N = "null" : re(e) ? N = "array" : e !== void 0 && e.$$typeof === t ? (N = "<" + (k(e.type) || "Unknown") + " />", E = " Did you accidentally export a JSX literal instead of a component?") : N = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", N, E);
        }
        var S = at(e, n, c, I, R);
        if (S == null)
          return S;
        if (x) {
          var P = n.children;
          if (P !== void 0)
            if (g)
              if (re(P)) {
                for (var $ = 0; $ < P.length; $++)
                  Te(P[$], e);
                Object.freeze && Object.freeze(P);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Te(P, e);
        }
        if (Y.call(n, "key")) {
          var O = k(e), A = Object.keys(n).filter(function(mt) {
            return mt !== "key";
          }), ie = A.length > 0 ? "{key: someKey, " + A.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ae[O + ie]) {
            var pt = A.length > 0 ? "{" + A.join(": ..., ") + ": ...}" : "{}";
            _(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ie, O, pt, O), Ae[O + ie] = !0;
          }
        }
        return e === d ? lt(S) : ct(S), S;
      }
    }
    function ft(e, n, c) {
      return Pe(e, n, c, !0);
    }
    function ut(e, n, c) {
      return Pe(e, n, c, !1);
    }
    var dt = ut, ht = ft;
    U.Fragment = d, U.jsx = dt, U.jsxs = ht;
  }()), U;
}
process.env.NODE_ENV === "production" ? se.exports = wt() : se.exports = xt();
var We = se.exports;
function It(C) {
  const t = C.trim().split(`
`).filter((r) => r.trim()), i = [];
  for (const r of t) {
    const f = r.match(/^(.+?)\s*->\s*(.+?)\s*\((.+?):(\d+)\)$/);
    if (f) {
      const [, o, l, s, u] = f;
      o && l && s && u && i.push({
        from: o.trim(),
        to: l.trim(),
        skill: s.trim(),
        maxAssignees: parseInt(u, 10)
      });
    } else {
      const o = r.match(/^(.+?)\s*->\s*(.+?)$/);
      if (o) {
        const [, l, s] = o;
        l && s && i.push({
          from: l.trim(),
          to: s.trim()
        });
      }
    }
  }
  const d = /* @__PURE__ */ new Set();
  i.forEach((r) => {
    d.add(r.from), d.add(r.to);
  });
  const h = Array.from(d).map((r) => ({
    id: `node-${r.toLowerCase().replace(/\s+/g, "-")}`,
    label: r
  })), a = i.map((r, f) => {
    const o = h.find((u) => u.label === r.from), l = h.find((u) => u.label === r.to), s = {
      id: `edge-${f}`,
      fromNodeId: o.id,
      toNodeId: l.id
    };
    return r.skill !== void 0 && (s.skill = r.skill), r.maxAssignees !== void 0 && (s.maxAssignees = r.maxAssignees), s;
  });
  return { nodes: h, edges: a };
}
function Rt(C) {
  const t = new Map(C.nodes.map((d) => [d.id, d.label]));
  return _t(C.edges, t).map((d) => {
    const h = t.get(d.fromNodeId) || "Unknown", a = t.get(d.toNodeId) || "Unknown";
    return d.skill !== void 0 && d.maxAssignees !== void 0 ? `${h} -> ${a} (${d.skill}:${d.maxAssignees})` : `${h} -> ${a}`;
  }).join(`
`);
}
function _t(C, t) {
  const i = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set();
  C.forEach((l) => {
    h.add(l.fromNodeId), h.add(l.toNodeId), i.has(l.fromNodeId) || i.set(l.fromNodeId, []), d.has(l.toNodeId) || d.set(l.toNodeId, []), i.get(l.fromNodeId).push(l), d.get(l.toNodeId).push(l);
  });
  const a = Array.from(h).filter((l) => !d.has(l)), r = [], f = /* @__PURE__ */ new Set(), o = [...a];
  for (; o.length > 0; ) {
    const l = [...o];
    o.length = 0, l.sort((s, u) => {
      const b = t.get(s) || "", p = t.get(u) || "";
      return b.toLowerCase().includes("start") ? -1 : p.toLowerCase().includes("start") || b.toLowerCase().includes("end") ? 1 : p.toLowerCase().includes("end") ? -1 : b.localeCompare(p);
    }), l.forEach((s) => {
      if (f.has(s)) return;
      f.add(s);
      const u = i.get(s) || [];
      u.sort((b, p) => {
        const y = t.get(b.toNodeId) || "", w = t.get(p.toNodeId) || "";
        return y.localeCompare(w);
      }), r.push(...u), u.forEach((b) => {
        f.has(b.toNodeId) || o.push(b.toNodeId);
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
      const i = this.calculateLayout(t), d = /* @__PURE__ */ new Map(), h = [];
      let a = "a1";
      i.nodes.forEach((r) => {
        const f = Oe();
        d.set(r.id, f), h.push({
          id: f,
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
          const f = d.get(r.fromNodeId), o = d.get(r.toNodeId), l = i.nodes.find((u) => u.id === r.fromNodeId), s = i.nodes.find((u) => u.id === r.toNodeId);
          if (f && o && l && s) {
            const u = Oe(), b = Me(), p = Me(), y = (l.x || 0) + 120, w = (l.y || 0) + 30, v = (s.x || 0) + 120, m = (s.y || 0) + 30;
            h.push({
              id: u,
              type: "arrow",
              x: Math.min(y, v),
              y: Math.min(w, m),
              index: a,
              // Use proper tldraw index
              props: {
                start: {
                  x: y - Math.min(y, v),
                  y: w - Math.min(w, m)
                },
                end: {
                  x: v - Math.min(y, v),
                  y: m - Math.min(w, m)
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
            }), a = je(a, void 0), h.push({
              type: "_binding",
              id: b,
              bindingType: "arrow",
              fromId: u,
              toId: f,
              props: {
                terminal: "start",
                isPrecise: !1,
                isExact: !1,
                normalizedAnchor: { x: 0.5, y: 0.5 }
              }
            }), h.push({
              type: "_binding",
              id: p,
              bindingType: "arrow",
              fromId: u,
              toId: o,
              props: {
                terminal: "end",
                isPrecise: !1,
                isExact: !1,
                normalizedAnchor: { x: 0.5, y: 0.5 }
              }
            });
          }
        } catch (f) {
          console.error(`Error preparing edge ${r.id}:`, f);
        }
      }), this.editor.batch(() => {
        const r = h.filter((o) => o.type !== "_binding"), f = h.filter((o) => o.type === "_binding");
        r.length > 0 && this.editor.createShapes(r), f.forEach((o) => {
          try {
            this.editor.createBinding({
              id: o.id,
              type: o.bindingType,
              fromId: o.fromId,
              toId: o.toId,
              props: o.props
            });
          } catch (l) {
            console.error("Error creating binding:", l);
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
    const i = { nodes: [...t.nodes], edges: [...t.edges] }, d = new Set(t.edges.map((p) => p.toNodeId)), h = t.nodes.filter((p) => !d.has(p.id)), a = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    t.edges.forEach((p) => {
      a.has(p.fromNodeId) || a.set(p.fromNodeId, []), r.has(p.toNodeId) || r.set(p.toNodeId, []), a.get(p.fromNodeId).push(p.toNodeId), r.get(p.toNodeId).push(p.fromNodeId);
    });
    const f = /* @__PURE__ */ new Map(), o = [];
    for (h.forEach((p) => {
      f.set(p.id, 0), o.push({ nodeId: p.id, level: 0 });
    }); o.length > 0; ) {
      const { nodeId: p, level: y } = o.shift();
      (a.get(p) || []).forEach((v) => {
        const m = f.get(v) ?? -1;
        y + 1 > m && (f.set(v, y + 1), o.push({ nodeId: v, level: y + 1 }));
      });
    }
    const l = /* @__PURE__ */ new Map();
    i.nodes.forEach((p) => {
      const y = f.get(p.id) ?? 0;
      l.has(y) || l.set(y, []), l.get(y).push(p);
    }), this.reduceCrossings(l, t.edges);
    const s = 280, u = s + 100, b = 250;
    return l.forEach((p, y) => {
      if (p.length === 0) return;
      const w = Math.max(u, 1200 / Math.max(p.length - 1, 1)), m = -((p.length - 1) * w) / 2;
      p.forEach((_, j) => {
        _.x = m + j * w, _.y = y * b;
      }), this.resolveNodeCollisions(p, s);
    }), this.centerDAG(i.nodes), this.adjustForEdgeMinimization(i, t.edges, f), this.resolveNodeEdgeCollisions(i, t.edges), i;
  }
  reduceCrossings(t, i) {
    var h, a;
    for (let r = 0; r < 5; r++) {
      for (let f = 1; f <= Math.max(...t.keys()); f++) {
        const o = t.get(f);
        if (!o || o.length <= 1) continue;
        const l = /* @__PURE__ */ new Map();
        (h = t.get(f - 1)) == null || h.forEach((s, u) => {
          l.set(s.id, u);
        }), o.sort((s, u) => {
          const b = i.filter((v) => v.toNodeId === s.id).map((v) => l.get(v.fromNodeId) ?? 0), p = i.filter((v) => v.toNodeId === u.id).map((v) => l.get(v.fromNodeId) ?? 0), y = b.length > 0 ? b.reduce((v, m) => v + m, 0) / b.length : 0, w = p.length > 0 ? p.reduce((v, m) => v + m, 0) / p.length : 0;
          return y - w;
        });
      }
      for (let f = Math.max(...t.keys()) - 1; f >= 0; f--) {
        const o = t.get(f);
        if (!o || o.length <= 1) continue;
        const l = /* @__PURE__ */ new Map();
        (a = t.get(f + 1)) == null || a.forEach((s, u) => {
          l.set(s.id, u);
        }), o.sort((s, u) => {
          const b = i.filter((v) => v.fromNodeId === s.id).map((v) => l.get(v.toNodeId) ?? 0), p = i.filter((v) => v.fromNodeId === u.id).map((v) => l.get(v.toNodeId) ?? 0), y = b.length > 0 ? b.reduce((v, m) => v + m, 0) / b.length : 0, w = p.length > 0 ? p.reduce((v, m) => v + m, 0) / p.length : 0;
          return y - w;
        });
      }
    }
  }
  resolveNodeCollisions(t, i) {
    for (let d = 0; d < t.length - 1; d++) {
      const h = t[d], a = t[d + 1];
      if (!(h != null && h.x) || !(a != null && a.x)) continue;
      const r = i + 50, f = a.x - h.x;
      if (f < r) {
        const o = (r - f) / 2;
        h.x -= o, a.x += o;
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
  adjustForEdgeMinimization(t, i, d) {
    const h = /* @__PURE__ */ new Map();
    t.nodes.forEach((a) => {
      h.set(a.id, { x: a.x || 0, y: a.y || 0 });
    }), i.forEach((a) => {
      const r = h.get(a.fromNodeId), f = h.get(a.toNodeId), o = d.get(a.fromNodeId) ?? 0, l = d.get(a.toNodeId) ?? 0;
      if (r && f && Math.abs(l - o) === 1) {
        const s = Math.abs(r.x - f.x);
        if (s > 200) {
          const u = Math.min(30, (s - 200) / 10);
          r.x > f.x ? (r.x -= u, f.x += u) : (r.x += u, f.x -= u);
        }
      }
    }), t.nodes.forEach((a) => {
      const r = h.get(a.id);
      r && (a.x = r.x, a.y = r.y);
    });
  }
  resolveNodeEdgeCollisions(t, i) {
    t.nodes.forEach((r) => {
      const f = r.x || 0, o = r.y || 0, l = {
        left: f - 280 / 2 - 20,
        right: f + 280 / 2 + 20,
        top: o - 60 / 2 - 20,
        bottom: o + 60 / 2 + 20
      };
      i.forEach((s) => {
        if (s.fromNodeId === r.id || s.toNodeId === r.id) return;
        const u = t.nodes.find((m) => m.id === s.fromNodeId), b = t.nodes.find((m) => m.id === s.toNodeId);
        if (!u || !b) return;
        const p = (u.x || 0) + 120, y = (u.y || 0) + 30, w = (b.x || 0) + 120, v = (b.y || 0) + 30;
        if (this.lineIntersectsRect(p, y, w, v, l)) {
          console.log(`Node ${r.label} collides with edge ${s.fromNodeId} -> ${s.toNodeId}`);
          const m = (p + w) / 2, _ = f;
          Math.abs(_ - m) < 280 / 2 + 20 && (_ < m ? r.x = m - 210 : r.x = m + 210, console.log(`Moved ${r.label} to x=${r.x} to avoid edge collision`));
        }
      });
    });
  }
  lineIntersectsRect(t, i, d, h, a) {
    return t >= a.left && t <= a.right && i >= a.top && i <= a.bottom || d >= a.left && d <= a.right && h >= a.top && h <= a.bottom ? !0 : this.linesIntersect(t, i, d, h, a.left, a.top, a.right, a.top) || // Top edge
    this.linesIntersect(t, i, d, h, a.right, a.top, a.right, a.bottom) || // Right edge
    this.linesIntersect(t, i, d, h, a.right, a.bottom, a.left, a.bottom) || // Bottom edge
    this.linesIntersect(t, i, d, h, a.left, a.bottom, a.left, a.top);
  }
  linesIntersect(t, i, d, h, a, r, f, o) {
    const l = (t - d) * (r - o) - (i - h) * (a - f);
    if (Math.abs(l) < 1e-10) return !1;
    const s = ((t - a) * (r - o) - (i - r) * (a - f)) / l, u = -((t - d) * (i - r) - (i - h) * (t - a)) / l;
    return s >= 0 && s <= 1 && u >= 0 && u <= 1;
  }
  extractDAGFromCanvas() {
    try {
      const t = this.editor.getCurrentPageShapes(), i = t.filter(
        (o) => o.type === "geo" && o.props.geo === "rectangle"
      ), d = t.filter((o) => o.type === "arrow");
      if (i.length === 0)
        throw new Error("No DAG nodes found on canvas");
      const h = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
      i.forEach((o) => {
        var l;
        o.id && ((l = o.props) == null ? void 0 : l.text) !== void 0 && (h.set(o.id, o.props.text || "Untitled"), a.add(o.id));
      });
      const r = i.filter((o) => o.id && o.props).map((o) => ({
        id: o.id,
        label: o.props.text || "Untitled",
        x: o.x || 0,
        y: o.y || 0
      })), f = [];
      try {
        const l = this.editor.store.allRecords().filter((s) => {
          try {
            return s && s.typeName === "binding";
          } catch {
            return !1;
          }
        });
        d.forEach((s, u) => {
          var b, p;
          try {
            if (!s || !s.id) return;
            const y = l.filter((m) => {
              try {
                return m && m.fromId === s.id;
              } catch {
                return !1;
              }
            }), w = y.find((m) => {
              try {
                return m && m.props && m.props.terminal === "start";
              } catch {
                return !1;
              }
            }), v = y.find((m) => {
              try {
                return m && m.props && m.props.terminal === "end";
              } catch {
                return !1;
              }
            });
            if (w && v) {
              const m = w.toId, _ = v.toId;
              if (!a.has(m) || !a.has(_)) {
                console.warn(`Skipping arrow ${s.id}: references non-existent nodes`);
                return;
              }
              const j = h.get(m), Z = h.get(_);
              if (j && Z) {
                const F = {
                  id: `edge-${u}`,
                  fromNodeId: m,
                  toNodeId: _
                }, V = ((p = (b = s.props) == null ? void 0 : b.text) == null ? void 0 : p.trim()) || "";
                if (V) {
                  const B = V.match(/^(.+):(\d+)$/);
                  if (B) {
                    const [, z, W] = B;
                    z && W && (F.skill = z.trim(), F.maxAssignees = parseInt(W, 10));
                  }
                }
                f.push(F);
              }
            }
          } catch (y) {
            console.warn(`Error processing arrow ${s.id}:`, y);
          }
        });
      } catch (o) {
        console.warn("Error processing bindings:", o);
      }
      return { nodes: r, edges: f };
    } catch (t) {
      throw console.error("Error extracting DAG from canvas:", t), t;
    }
  }
  getNodeColor(t) {
    const i = t.toLowerCase();
    return i.includes("start") ? "green" : i.includes("end") ? "violet" : "blue";
  }
}
function Nt(C) {
  return new Ct(C);
}
const St = yt(
  ({ onMount: C, onError: t, persistenceKey: i, className: d, style: h, autoImport: a, licenseKey: r }, f) => {
    const o = De(null), l = De(null), s = K((y) => {
      if (l.current = y, o.current = Nt(y), a && o.current)
        try {
          o.current.import(a);
        } catch (w) {
          const v = w instanceof Error ? w.message : "Failed to auto-import DAG";
          t == null || t(v);
        }
      C == null || C(y);
    }, [C, t, a]), u = K((y) => {
      if (!o.current) {
        const w = "DAG adaptor not initialized. Make sure tldraw has mounted.";
        throw t == null || t(w), new Error(w);
      }
      try {
        o.current.import(y);
      } catch (w) {
        const v = w instanceof Error ? w.message : "Failed to import DAG";
        throw t == null || t(v), w;
      }
    }, [t]), b = K(() => {
      if (!o.current) {
        const y = "DAG adaptor not initialized. Make sure tldraw has mounted.";
        throw t == null || t(y), new Error(y);
      }
      try {
        return o.current.export();
      } catch (y) {
        const w = y instanceof Error ? y.message : "Failed to export DAG";
        throw t == null || t(w), y;
      }
    }, [t]), p = K(() => l.current, []);
    return bt(f, () => ({
      importDAG: u,
      exportDAG: b,
      getEditor: p
    }), [u, b, p]), /* @__PURE__ */ We.jsx("div", { className: d, style: { width: "100%", height: "100%", ...h }, children: /* @__PURE__ */ We.jsx(
      Et,
      {
        onMount: s,
        persistenceKey: i,
        licenseKey: r
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
