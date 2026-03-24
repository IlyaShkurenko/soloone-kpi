globalThis.__timing__.logStart('Load chunks/build/index-CZgoMvLG');import { v as vueExports, s as serverRenderer_cjs_prodExports, a as useAppConfig, b as appConfig, c as useRoute, d as useRuntimeConfig } from './server.mjs';
import { y as defu } from '../nitro/nitro.mjs';
import __nuxt_component_0$2 from './index-BcbQR7S6.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-DQk-5CVN.mjs';
import 'tailwindcss/colors';
import 'node:stream';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'perfect-debounce';

function createContext(providerComponentName, contextName) {
  const symbolDescription = contextName;
  const injectionKey = Symbol(symbolDescription);
  const injectContext = (fallback) => {
    const context = vueExports.inject(injectionKey, fallback);
    if (context) return context;
    if (context === null) return context;
    throw new Error(`Injection \`${injectionKey.toString()}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(", ")}` : `\`${providerComponentName}\``}`);
  };
  const provideContext = (contextValue) => {
    vueExports.provide(injectionKey, contextValue);
    return contextValue;
  };
  return [injectContext, provideContext];
}
function renderSlotFragments(children) {
  if (!children) return [];
  return children.flatMap((child) => {
    if (child.type === vueExports.Fragment) return renderSlotFragments(child.children);
    return [child];
  });
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const isDef = (val) => typeof val !== "undefined";
const noop = () => {
};
function toRef(...args) {
  if (args.length !== 1) return vueExports.toRef(...args);
  const r = args[0];
  return typeof r === "function" ? vueExports.readonly(vueExports.customRef(() => ({
    get: r,
    set: noop
  }))) : vueExports.ref(r);
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), {
        fn,
        thisArg: this,
        args
      })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer$1) => {
    clearTimeout(timer$1);
    lastRejector();
    lastRejector = noop;
  };
  let lastInvoker;
  const filter = (invoke$1) => {
    const duration = vueExports.toValue(ms);
    const maxDuration = vueExports.toValue(options.maxWait);
    if (timer) _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = void 0;
      }
      return Promise.resolve(invoke$1());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      lastInvoker = invoke$1;
      if (maxDuration && !maxTimer) maxTimer = setTimeout(() => {
        if (timer) _clearTimeout(timer);
        maxTimer = void 0;
        resolve(lastInvoker());
      }, maxDuration);
      timer = setTimeout(() => {
        if (maxTimer) _clearTimeout(maxTimer);
        maxTimer = void 0;
        resolve(invoke$1());
      }, duration);
    });
  };
  return filter;
}
function toReactive(objectRef) {
  if (!vueExports.isRef(objectRef)) return vueExports.reactive(objectRef);
  return vueExports.reactive(new Proxy({}, {
    get(_, p, receiver) {
      return vueExports.unref(Reflect.get(objectRef.value, p, receiver));
    },
    set(_, p, value) {
      if (vueExports.isRef(objectRef.value[p]) && !vueExports.isRef(value)) objectRef.value[p].value = value;
      else objectRef.value[p] = value;
      return true;
    },
    deleteProperty(_, p) {
      return Reflect.deleteProperty(objectRef.value, p);
    },
    has(_, p) {
      return Reflect.has(objectRef.value, p);
    },
    ownKeys() {
      return Object.keys(objectRef.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  }));
}
function reactiveComputed(fn) {
  return toReactive(vueExports.computed(fn));
}
function reactiveOmit(obj, ...keys) {
  const flatKeys = keys.flat();
  const predicate = flatKeys[0];
  return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries(vueExports.toRefs(obj)).filter(([k, v]) => !predicate(vueExports.toValue(v), k))) : Object.fromEntries(Object.entries(vueExports.toRefs(obj)).filter((e) => !flatKeys.includes(e[0]))));
}
function reactivePick(obj, ...keys) {
  const flatKeys = keys.flat();
  const predicate = flatKeys[0];
  return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries(vueExports.toRefs(obj)).filter(([k, v]) => predicate(vueExports.toValue(v), k))) : Object.fromEntries(flatKeys.map((k) => [k, toRef(obj, k)])));
}
// @__NO_SIDE_EFFECTS__
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
function cloneFnJSON(source) {
  return JSON.parse(JSON.stringify(source));
}
// @__NO_SIDE_EFFECTS__
function useVModel(props, key, emit, options = {}) {
  var _vm$$emit, _vm$proxy;
  const { clone = false, passive = false, eventName, deep = false, defaultValue, shouldEmit } = options;
  const vm = vueExports.getCurrentInstance();
  const _emit = emit || (vm === null || vm === void 0 ? void 0 : vm.emit) || (vm === null || vm === void 0 || (_vm$$emit = vm.$emit) === null || _vm$$emit === void 0 ? void 0 : _vm$$emit.bind(vm)) || (vm === null || vm === void 0 || (_vm$proxy = vm.proxy) === null || _vm$proxy === void 0 || (_vm$proxy = _vm$proxy.$emit) === null || _vm$proxy === void 0 ? void 0 : _vm$proxy.bind(vm === null || vm === void 0 ? void 0 : vm.proxy));
  let event = eventName;
  event = event || `update:${key.toString()}`;
  const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
  const getValue$1 = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
  const triggerEmit = (value) => {
    if (shouldEmit) {
      if (shouldEmit(value)) _emit(event, value);
    } else _emit(event, value);
  };
  if (passive) {
    const proxy = vueExports.ref(getValue$1());
    let isUpdating = false;
    vueExports.watch(() => props[key], (v) => {
      if (!isUpdating) {
        isUpdating = true;
        proxy.value = cloneFn(v);
        vueExports.nextTick(() => isUpdating = false);
      }
    });
    vueExports.watch(proxy, (v) => {
      if (!isUpdating && (v !== props[key] || deep)) triggerEmit(v);
    }, { deep });
    return proxy;
  } else return vueExports.computed({
    get() {
      return getValue$1();
    },
    set(value) {
      triggerEmit(value);
    }
  });
}
function useForwardProps(props) {
  const vm = vueExports.getCurrentInstance();
  const defaultProps = Object.keys(vm?.type.props ?? {}).reduce((prev, curr) => {
    const defaultValue = (vm?.type.props[curr]).default;
    if (defaultValue !== void 0) prev[curr] = defaultValue;
    return prev;
  }, {});
  const refProps = vueExports.toRef(props);
  return vueExports.computed(() => {
    const preservedProps = {};
    const assignedProps = vm?.vnode.props ?? {};
    Object.keys(assignedProps).forEach((key) => {
      preservedProps[vueExports.camelize(key)] = assignedProps[key];
    });
    return Object.keys({
      ...defaultProps,
      ...preservedProps
    }).reduce((prev, curr) => {
      if (refProps.value[curr] !== void 0) prev[curr] = refProps.value[curr];
      return prev;
    }, {});
  });
}
const Slot = vueExports.defineComponent({
  name: "PrimitiveSlot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      if (!slots.default) return null;
      const children = renderSlotFragments(slots.default());
      const firstNonCommentChildrenIndex = children.findIndex((child) => child.type !== vueExports.Comment);
      if (firstNonCommentChildrenIndex === -1) return children;
      const firstNonCommentChildren = children[firstNonCommentChildrenIndex];
      delete firstNonCommentChildren.props?.ref;
      const mergedProps = firstNonCommentChildren.props ? vueExports.mergeProps(attrs, firstNonCommentChildren.props) : attrs;
      const cloned = vueExports.cloneVNode({
        ...firstNonCommentChildren,
        props: {}
      }, mergedProps);
      if (children.length === 1) return cloned;
      children[firstNonCommentChildrenIndex] = cloned;
      return children;
    };
  }
});
const SELF_CLOSING_TAGS = [
  "area",
  "img",
  "input"
];
const Primitive = vueExports.defineComponent({
  name: "Primitive",
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: false
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(props, { attrs, slots }) {
    const asTag = props.asChild ? "template" : props.as;
    if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag)) return () => vueExports.h(asTag, attrs);
    if (asTag !== "template") return () => vueExports.h(props.as, attrs, { default: slots.default });
    return () => vueExports.h(Slot, attrs, { default: slots.default });
  }
});
function serialize(o) {
  return typeof o == "string" ? `'${o}'` : new c().serialize(o);
}
const c = /* @__PURE__ */ (function() {
  class o {
    #t = /* @__PURE__ */ new Map();
    compare(t, r) {
      const e = typeof t, n = typeof r;
      return e === "string" && n === "string" ? t.localeCompare(r) : e === "number" && n === "number" ? t - r : String.prototype.localeCompare.call(this.serialize(t, true), this.serialize(r, true));
    }
    serialize(t, r) {
      if (t === null) return "null";
      switch (typeof t) {
        case "string":
          return r ? t : `'${t}'`;
        case "bigint":
          return `${t}n`;
        case "object":
          return this.$object(t);
        case "function":
          return this.$function(t);
      }
      return String(t);
    }
    serializeObject(t) {
      const r = Object.prototype.toString.call(t);
      if (r !== "[object Object]") return this.serializeBuiltInType(r.length < 10 ? `unknown:${r}` : r.slice(8, -1), t);
      const e = t.constructor, n = e === Object || e === void 0 ? "" : e.name;
      if (n !== "" && globalThis[n] === e) return this.serializeBuiltInType(n, t);
      if (typeof t.toJSON == "function") {
        const i = t.toJSON();
        return n + (i !== null && typeof i == "object" ? this.$object(i) : `(${this.serialize(i)})`);
      }
      return this.serializeObjectEntries(n, Object.entries(t));
    }
    serializeBuiltInType(t, r) {
      const e = this["$" + t];
      if (e) return e.call(this, r);
      if (typeof r?.entries == "function") return this.serializeObjectEntries(t, r.entries());
      throw new Error(`Cannot serialize ${t}`);
    }
    serializeObjectEntries(t, r) {
      const e = Array.from(r).sort((i, a) => this.compare(i[0], a[0]));
      let n = `${t}{`;
      for (let i = 0; i < e.length; i++) {
        const [a, l] = e[i];
        n += `${this.serialize(a, true)}:${this.serialize(l)}`, i < e.length - 1 && (n += ",");
      }
      return n + "}";
    }
    $object(t) {
      let r = this.#t.get(t);
      return r === void 0 && (this.#t.set(t, `#${this.#t.size}`), r = this.serializeObject(t), this.#t.set(t, r)), r;
    }
    $function(t) {
      const r = Function.prototype.toString.call(t);
      return r.slice(-15) === "[native code] }" ? `${t.name || ""}()[native]` : `${t.name}(${t.length})${r.replace(/\s*\n\s*/g, "")}`;
    }
    $Array(t) {
      let r = "[";
      for (let e = 0; e < t.length; e++) r += this.serialize(t[e]), e < t.length - 1 && (r += ",");
      return r + "]";
    }
    $Date(t) {
      try {
        return `Date(${t.toISOString()})`;
      } catch {
        return "Date(null)";
      }
    }
    $ArrayBuffer(t) {
      return `ArrayBuffer[${new Uint8Array(t).join(",")}]`;
    }
    $Set(t) {
      return `Set${this.$Array(Array.from(t).sort((r, e) => this.compare(r, e)))}`;
    }
    $Map(t) {
      return this.serializeObjectEntries("Map", t.entries());
    }
  }
  for (const s of ["Error", "RegExp", "URL"]) o.prototype["$" + s] = function(t) {
    return `${s}(${t})`;
  };
  for (const s of ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]) o.prototype["$" + s] = function(t) {
    return `${s}[${t.join(",")}]`;
  };
  for (const s of ["BigInt64Array", "BigUint64Array"]) o.prototype["$" + s] = function(t) {
    return `${s}[${t.join("n,")}${t.length > 0 ? "n" : ""}]`;
  };
  return o;
})();
function isEqual$1(object1, object2) {
  if (object1 === object2) {
    return true;
  }
  if (serialize(object1) === serialize(object2)) {
    return true;
  }
  return false;
}
function diff(obj1, obj2) {
  const h1 = _toHashedObject(obj1);
  const h2 = _toHashedObject(obj2);
  return _diff(h1, h2);
}
function _diff(h1, h2) {
  const diffs = [];
  const allProps = /* @__PURE__ */ new Set([
    ...Object.keys(h1.props || {}),
    ...Object.keys(h2.props || {})
  ]);
  if (h1.props && h2.props) {
    for (const prop of allProps) {
      const p1 = h1.props[prop];
      const p2 = h2.props[prop];
      if (p1 && p2) {
        diffs.push(..._diff(h1.props?.[prop], h2.props?.[prop]));
      } else if (p1 || p2) {
        diffs.push(
          new DiffEntry((p2 || p1).key, p1 ? "removed" : "added", p2, p1)
        );
      }
    }
  }
  if (allProps.size === 0 && h1.hash !== h2.hash) {
    diffs.push(new DiffEntry((h2 || h1).key, "changed", h2, h1));
  }
  return diffs;
}
function _toHashedObject(obj, key = "") {
  if (obj && typeof obj !== "object") {
    return new DiffHashedObject(key, obj, serialize(obj));
  }
  const props = {};
  const hashes = [];
  for (const _key in obj) {
    props[_key] = _toHashedObject(obj[_key], key ? `${key}.${_key}` : _key);
    hashes.push(props[_key].hash);
  }
  return new DiffHashedObject(key, obj, `{${hashes.join(":")}}`, props);
}
class DiffEntry {
  constructor(key, type, newValue, oldValue) {
    this.key = key;
    this.type = type;
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
  toString() {
    return this.toJSON();
  }
  toJSON() {
    switch (this.type) {
      case "added": {
        return `Added   \`${this.key}\``;
      }
      case "removed": {
        return `Removed \`${this.key}\``;
      }
      case "changed": {
        return `Changed \`${this.key}\` from \`${this.oldValue?.toString() || "-"}\` to \`${this.newValue.toString()}\``;
      }
    }
  }
}
class DiffHashedObject {
  constructor(key, value, hash, props) {
    this.key = key;
    this.value = value;
    this.hash = hash;
    this.props = props;
  }
  toString() {
    if (this.props) {
      return `{${Object.keys(this.props).join(",")}}`;
    } else {
      return JSON.stringify(this.value);
    }
  }
  toJSON() {
    const k = this.key || ".";
    if (this.props) {
      return `${k}({${Object.keys(this.props).join(",")}})`;
    }
    return `${k}(${this.value})`;
  }
}
function omit(data, keys) {
  const result = { ...data };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}
function get(object, path, defaultValue) {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }
  let result = object;
  for (const key of path) {
    if (result === void 0 || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== void 0 ? result : defaultValue;
}
function looseToNumber(val) {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
}
function mergeClasses(appConfigClass, propClass) {
  if (!appConfigClass && !propClass) {
    return "";
  }
  return [
    ...Array.isArray(appConfigClass) ? appConfigClass : [appConfigClass],
    propClass
  ].filter(Boolean);
}
const [injectThemeContext] = createContext("UTheme", "RootContext");
function useComponentUI(name, props) {
  const { ui } = injectThemeContext({ ui: vueExports.computed(() => ({})) });
  return vueExports.computed(() => {
    const themeOverrides = get(ui.value, name) || {};
    return defu(props.ui ?? {}, themeOverrides);
  });
}
function useComponentIcons(componentProps) {
  const appConfig2 = useAppConfig();
  const props = vueExports.computed(() => vueExports.toValue(componentProps));
  const isLeading = vueExports.computed(() => props.value.icon && props.value.leading || props.value.icon && !props.value.trailing || props.value.loading && !props.value.trailing || !!props.value.leadingIcon);
  const isTrailing = vueExports.computed(() => props.value.icon && props.value.trailing || props.value.loading && props.value.trailing || !!props.value.trailingIcon);
  const leadingIconName = vueExports.computed(() => {
    if (props.value.loading) {
      return props.value.loadingIcon || appConfig2.ui.icons.loading;
    }
    return props.value.leadingIcon || props.value.icon;
  });
  const trailingIconName = vueExports.computed(() => {
    if (props.value.loading && !isLeading.value) {
      return props.value.loadingIcon || appConfig2.ui.icons.loading;
    }
    return props.value.trailingIcon || props.value.icon;
  });
  return {
    isLeading,
    isTrailing,
    leadingIconName,
    trailingIconName
  };
}
const fieldGroupInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.field-group");
function useFieldGroup(props) {
  const fieldGroup = vueExports.inject(fieldGroupInjectionKey, void 0);
  return {
    orientation: vueExports.computed(() => fieldGroup?.value.orientation),
    size: vueExports.computed(() => props?.size ?? fieldGroup?.value.size)
  };
}
const formOptionsInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.form-options");
const formBusInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.form-events");
const formFieldInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.form-field");
const inputIdInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.input-id");
const formLoadingInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.form-loading");
function useFormField(props, opts) {
  const formOptions = vueExports.inject(formOptionsInjectionKey, void 0);
  const formBus = vueExports.inject(formBusInjectionKey, void 0);
  const formField = vueExports.inject(formFieldInjectionKey, void 0);
  const inputId = vueExports.inject(inputIdInjectionKey, void 0);
  vueExports.provide(formFieldInjectionKey, void 0);
  if (formField && inputId) {
    if (opts?.bind === false) {
      inputId.value = void 0;
    } else if (props?.id) {
      inputId.value = props?.id;
    }
  }
  function emitFormEvent(type, name, eager) {
    if (formBus && formField && name) {
      formBus.emit({ type, name, eager });
    }
  }
  function emitFormBlur() {
    emitFormEvent("blur", formField?.value.name);
  }
  function emitFormFocus() {
    emitFormEvent("focus", formField?.value.name);
  }
  function emitFormChange() {
    emitFormEvent("change", formField?.value.name);
  }
  const emitFormInput = /* @__PURE__ */ useDebounceFn(
    () => {
      emitFormEvent("input", formField?.value.name, formField?.value.eagerValidation);
    },
    formField?.value.validateOnInputDelay ?? formOptions?.value.validateOnInputDelay ?? 0
  );
  return {
    id: vueExports.computed(() => props?.id ?? inputId?.value),
    name: vueExports.computed(() => props?.name ?? formField?.value.name),
    size: vueExports.computed(() => props?.size ?? formField?.value.size),
    color: vueExports.computed(() => formField?.value.error ? "error" : props?.color),
    highlight: vueExports.computed(() => formField?.value.error ? true : props?.highlight),
    disabled: vueExports.computed(() => formOptions?.value.disabled || props?.disabled),
    emitFormBlur,
    emitFormInput,
    emitFormChange,
    emitFormFocus,
    ariaAttrs: vueExports.computed(() => {
      if (!formField?.value) return;
      const descriptiveAttrs = ["error", "hint", "description", "help"].filter((type) => formField?.value?.[type]).map((type) => `${formField?.value.ariaId}-${type}`) || [];
      const attrs = {
        "aria-invalid": !!formField?.value.error
      };
      if (descriptiveAttrs.length > 0) {
        attrs["aria-describedby"] = descriptiveAttrs.join(" ");
      }
      return attrs;
    })
  };
}
var SPACE_REGEX = /\s+/g;
var removeExtraSpaces = (str) => {
  if (typeof str !== "string" || !str) return str;
  return str.replace(SPACE_REGEX, " ").trim();
};
var cx = (...classnames) => {
  const classList = [];
  const buildClassString = (input) => {
    if (!input && input !== 0 && input !== 0n) return;
    if (Array.isArray(input)) {
      for (let i = 0, len = input.length; i < len; i++) buildClassString(input[i]);
      return;
    }
    const type = typeof input;
    if (type === "string" || type === "number" || type === "bigint") {
      if (type === "number" && input !== input) return;
      classList.push(String(input));
    } else if (type === "object") {
      const keys = Object.keys(input);
      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];
        if (input[key]) classList.push(key);
      }
    }
  };
  for (let i = 0, len = classnames.length; i < len; i++) {
    const c2 = classnames[i];
    if (c2 !== null && c2 !== void 0) buildClassString(c2);
  }
  return classList.length > 0 ? removeExtraSpaces(classList.join(" ")) : void 0;
};
var falsyToString = (value) => value === false ? "false" : value === true ? "true" : value === 0 ? "0" : value;
var isEmptyObject = (obj) => {
  if (!obj || typeof obj !== "object") return true;
  for (const _ in obj) return false;
  return true;
};
var isEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2) return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (!keys2.includes(key)) return false;
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
};
var joinObjects = (obj1, obj2) => {
  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      const val2 = obj2[key];
      if (key in obj1) {
        obj1[key] = cx(obj1[key], val2);
      } else {
        obj1[key] = val2;
      }
    }
  }
  return obj1;
};
var flat = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (Array.isArray(el)) flat(el, target);
    else if (el) target.push(el);
  }
};
var flatMergeArrays = (...arrays) => {
  const result = [];
  flat(arrays, result);
  const filtered = [];
  for (let i = 0; i < result.length; i++) {
    if (result[i]) filtered.push(result[i]);
  }
  return filtered;
};
var mergeObjects = (obj1, obj2) => {
  const result = {};
  for (const key in obj1) {
    const val1 = obj1[key];
    if (key in obj2) {
      const val2 = obj2[key];
      if (Array.isArray(val1) || Array.isArray(val2)) {
        result[key] = flatMergeArrays(val2, val1);
      } else if (typeof val1 === "object" && typeof val2 === "object" && val1 && val2) {
        result[key] = mergeObjects(val1, val2);
      } else {
        result[key] = val2 + " " + val1;
      }
    } else {
      result[key] = val1;
    }
  }
  for (const key in obj2) {
    if (!(key in obj1)) {
      result[key] = obj2[key];
    }
  }
  return result;
};
var defaultConfig = {
  twMerge: true,
  twMergeConfig: {}
};
function createState() {
  let cachedTwMerge = null;
  let cachedTwMergeConfig = {};
  let didTwMergeConfigChange = false;
  return {
    get cachedTwMerge() {
      return cachedTwMerge;
    },
    set cachedTwMerge(value) {
      cachedTwMerge = value;
    },
    get cachedTwMergeConfig() {
      return cachedTwMergeConfig;
    },
    set cachedTwMergeConfig(value) {
      cachedTwMergeConfig = value;
    },
    get didTwMergeConfigChange() {
      return didTwMergeConfigChange;
    },
    set didTwMergeConfigChange(value) {
      didTwMergeConfigChange = value;
    },
    reset() {
      cachedTwMerge = null;
      cachedTwMergeConfig = {};
      didTwMergeConfigChange = false;
    }
  };
}
var state = createState();
var getTailwindVariants = (cn) => {
  const tv2 = (options, configProp) => {
    const {
      extend = null,
      slots: slotProps = {},
      variants: variantsProps = {},
      compoundVariants: compoundVariantsProps = [],
      compoundSlots = [],
      defaultVariants: defaultVariantsProps = {}
    } = options;
    const config = { ...defaultConfig, ...configProp };
    const base = extend?.base ? cx(extend.base, options?.base) : options?.base;
    const variants = extend?.variants && !isEmptyObject(extend.variants) ? mergeObjects(variantsProps, extend.variants) : variantsProps;
    const defaultVariants = extend?.defaultVariants && !isEmptyObject(extend.defaultVariants) ? { ...extend.defaultVariants, ...defaultVariantsProps } : defaultVariantsProps;
    if (!isEmptyObject(config.twMergeConfig) && !isEqual(config.twMergeConfig, state.cachedTwMergeConfig)) {
      state.didTwMergeConfigChange = true;
      state.cachedTwMergeConfig = config.twMergeConfig;
    }
    const isExtendedSlotsEmpty = isEmptyObject(extend?.slots);
    const componentSlots = !isEmptyObject(slotProps) ? {
      // add "base" to the slots object
      base: cx(options?.base, isExtendedSlotsEmpty && extend?.base),
      ...slotProps
    } : {};
    const slots = isExtendedSlotsEmpty ? componentSlots : joinObjects(
      { ...extend?.slots },
      isEmptyObject(componentSlots) ? { base: options?.base } : componentSlots
    );
    const compoundVariants = isEmptyObject(extend?.compoundVariants) ? compoundVariantsProps : flatMergeArrays(extend?.compoundVariants, compoundVariantsProps);
    const component = (props) => {
      if (isEmptyObject(variants) && isEmptyObject(slotProps) && isExtendedSlotsEmpty) {
        return cn(base, props?.class, props?.className)(config);
      }
      if (compoundVariants && !Array.isArray(compoundVariants)) {
        throw new TypeError(
          `The "compoundVariants" prop must be an array. Received: ${typeof compoundVariants}`
        );
      }
      if (compoundSlots && !Array.isArray(compoundSlots)) {
        throw new TypeError(
          `The "compoundSlots" prop must be an array. Received: ${typeof compoundSlots}`
        );
      }
      const getVariantValue = (variant, vrs = variants, _slotKey = null, slotProps2 = null) => {
        const variantObj = vrs[variant];
        if (!variantObj || isEmptyObject(variantObj)) {
          return null;
        }
        const variantProp = slotProps2?.[variant] ?? props?.[variant];
        if (variantProp === null) return null;
        const variantKey = falsyToString(variantProp);
        if (typeof variantKey === "object") {
          return null;
        }
        const defaultVariantProp = defaultVariants?.[variant];
        const key = variantKey != null ? variantKey : falsyToString(defaultVariantProp);
        const value = variantObj[key || "false"];
        return value;
      };
      const getVariantClassNames = () => {
        if (!variants) return null;
        const keys = Object.keys(variants);
        const result = [];
        for (let i = 0; i < keys.length; i++) {
          const value = getVariantValue(keys[i], variants);
          if (value) result.push(value);
        }
        return result;
      };
      const getVariantClassNamesBySlotKey = (slotKey, slotProps2) => {
        if (!variants || typeof variants !== "object") return null;
        const result = [];
        for (const variant in variants) {
          const variantValue = getVariantValue(variant, variants, slotKey, slotProps2);
          const value = slotKey === "base" && typeof variantValue === "string" ? variantValue : variantValue && variantValue[slotKey];
          if (value) result.push(value);
        }
        return result;
      };
      const propsWithoutUndefined = {};
      for (const prop in props) {
        const value = props[prop];
        if (value !== void 0) propsWithoutUndefined[prop] = value;
      }
      const getCompleteProps = (key, slotProps2) => {
        const initialProp = typeof props?.[key] === "object" ? {
          [key]: props[key]?.initial
        } : {};
        return {
          ...defaultVariants,
          ...propsWithoutUndefined,
          ...initialProp,
          ...slotProps2
        };
      };
      const getCompoundVariantsValue = (cv = [], slotProps2) => {
        const result = [];
        const cvLength = cv.length;
        for (let i = 0; i < cvLength; i++) {
          const { class: tvClass, className: tvClassName, ...compoundVariantOptions } = cv[i];
          let isValid = true;
          const completeProps = getCompleteProps(null, slotProps2);
          for (const key in compoundVariantOptions) {
            const value = compoundVariantOptions[key];
            const completePropsValue = completeProps[key];
            if (Array.isArray(value)) {
              if (!value.includes(completePropsValue)) {
                isValid = false;
                break;
              }
            } else {
              if ((value == null || value === false) && (completePropsValue == null || completePropsValue === false))
                continue;
              if (completePropsValue !== value) {
                isValid = false;
                break;
              }
            }
          }
          if (isValid) {
            if (tvClass) result.push(tvClass);
            if (tvClassName) result.push(tvClassName);
          }
        }
        return result;
      };
      const getCompoundVariantClassNamesBySlot = (slotProps2) => {
        const compoundClassNames = getCompoundVariantsValue(compoundVariants, slotProps2);
        if (!Array.isArray(compoundClassNames)) return compoundClassNames;
        const result = {};
        const cnFn = cn;
        for (let i = 0; i < compoundClassNames.length; i++) {
          const className = compoundClassNames[i];
          if (typeof className === "string") {
            result.base = cnFn(result.base, className)(config);
          } else if (typeof className === "object") {
            for (const slot in className) {
              result[slot] = cnFn(result[slot], className[slot])(config);
            }
          }
        }
        return result;
      };
      const getCompoundSlotClassNameBySlot = (slotProps2) => {
        if (compoundSlots.length < 1) return null;
        const result = {};
        const completeProps = getCompleteProps(null, slotProps2);
        for (let i = 0; i < compoundSlots.length; i++) {
          const {
            slots: slots2 = [],
            class: slotClass,
            className: slotClassName,
            ...slotVariants
          } = compoundSlots[i];
          if (!isEmptyObject(slotVariants)) {
            let isValid = true;
            for (const key in slotVariants) {
              const completePropsValue = completeProps[key];
              const slotVariantValue = slotVariants[key];
              if (completePropsValue === void 0 || (Array.isArray(slotVariantValue) ? !slotVariantValue.includes(completePropsValue) : slotVariantValue !== completePropsValue)) {
                isValid = false;
                break;
              }
            }
            if (!isValid) continue;
          }
          for (let j = 0; j < slots2.length; j++) {
            const slotName = slots2[j];
            if (!result[slotName]) result[slotName] = [];
            result[slotName].push([slotClass, slotClassName]);
          }
        }
        return result;
      };
      if (!isEmptyObject(slotProps) || !isExtendedSlotsEmpty) {
        const slotsFns = {};
        if (typeof slots === "object" && !isEmptyObject(slots)) {
          const cnFn = cn;
          for (const slotKey in slots) {
            slotsFns[slotKey] = (slotProps2) => {
              const compoundVariantClasses = getCompoundVariantClassNamesBySlot(slotProps2);
              const compoundSlotClasses = getCompoundSlotClassNameBySlot(slotProps2);
              return cnFn(
                slots[slotKey],
                getVariantClassNamesBySlotKey(slotKey, slotProps2),
                compoundVariantClasses ? compoundVariantClasses[slotKey] : void 0,
                compoundSlotClasses ? compoundSlotClasses[slotKey] : void 0,
                slotProps2?.class,
                slotProps2?.className
              )(config);
            };
          }
        }
        return slotsFns;
      }
      return cn(
        base,
        getVariantClassNames(),
        getCompoundVariantsValue(compoundVariants),
        props?.class,
        props?.className
      )(config);
    };
    const getVariantKeys = () => {
      if (!variants || typeof variants !== "object") return;
      return Object.keys(variants);
    };
    component.variantKeys = getVariantKeys();
    component.extend = extend;
    component.base = base;
    component.slots = slots;
    component.variants = variants;
    component.defaultVariants = defaultVariants;
    component.compoundSlots = compoundSlots;
    component.compoundVariants = compoundVariants;
    return component;
  };
  const createTV2 = (configProp) => {
    return (options, config) => tv2(options, config ? mergeObjects(configProp, config) : configProp);
  };
  return {
    tv: tv2,
    createTV: createTV2
  };
};
const concatArrays = (array1, array2) => {
  const combinedArray = new Array(array1.length + array2.length);
  for (let i = 0; i < array1.length; i++) {
    combinedArray[i] = array1[i];
  }
  for (let i = 0; i < array2.length; i++) {
    combinedArray[array1.length + i] = array2[i];
  }
  return combinedArray;
};
const createClassValidatorObject = (classGroupId, validator) => ({
  classGroupId,
  validator
});
const createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
  nextPart,
  validators,
  classGroupId
});
const CLASS_PART_SEPARATOR = "-";
const EMPTY_CONFLICTS = [];
const ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
const createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    if (className.startsWith("[") && className.endsWith("]")) {
      return getGroupIdForArbitraryProperty(className);
    }
    const classParts = className.split(CLASS_PART_SEPARATOR);
    const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
    return getGroupRecursive(classParts, startIndex, classMap);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    if (hasPostfixModifier) {
      const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
      const baseConflicts = conflictingClassGroups[classGroupId];
      if (modifierConflicts) {
        if (baseConflicts) {
          return concatArrays(baseConflicts, modifierConflicts);
        }
        return modifierConflicts;
      }
      return baseConflicts || EMPTY_CONFLICTS;
    }
    return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, startIndex, classPartObject) => {
  const classPathsLength = classParts.length - startIndex;
  if (classPathsLength === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[startIndex];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  if (nextClassPartObject) {
    const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
    if (result) return result;
  }
  const validators = classPartObject.validators;
  if (validators === null) {
    return void 0;
  }
  const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
  const validatorsLength = validators.length;
  for (let i = 0; i < validatorsLength; i++) {
    const validatorObj = validators[i];
    if (validatorObj.validator(classRest)) {
      return validatorObj.classGroupId;
    }
  }
  return void 0;
};
const getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const content = className.slice(1, -1);
  const colonIndex = content.indexOf(":");
  const property = content.slice(0, colonIndex);
  return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
const createClassMap = (config) => {
  const {
    theme: theme2,
    classGroups
  } = config;
  return processClassGroups(classGroups, theme2);
};
const processClassGroups = (classGroups, theme2) => {
  const classMap = createClassPartObject();
  for (const classGroupId in classGroups) {
    const group = classGroups[classGroupId];
    processClassesRecursively(group, classMap, classGroupId, theme2);
  }
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme2) => {
  const len = classGroup.length;
  for (let i = 0; i < len; i++) {
    const classDefinition = classGroup[i];
    processClassDefinition(classDefinition, classPartObject, classGroupId, theme2);
  }
};
const processClassDefinition = (classDefinition, classPartObject, classGroupId, theme2) => {
  if (typeof classDefinition === "string") {
    processStringDefinition(classDefinition, classPartObject, classGroupId);
    return;
  }
  if (typeof classDefinition === "function") {
    processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme2);
    return;
  }
  processObjectDefinition(classDefinition, classPartObject, classGroupId, theme2);
};
const processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
  const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
  classPartObjectToEdit.classGroupId = classGroupId;
};
const processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme2) => {
  if (isThemeGetter(classDefinition)) {
    processClassesRecursively(classDefinition(theme2), classPartObject, classGroupId, theme2);
    return;
  }
  if (classPartObject.validators === null) {
    classPartObject.validators = [];
  }
  classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
const processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme2) => {
  const entries = Object.entries(classDefinition);
  const len = entries.length;
  for (let i = 0; i < len; i++) {
    const [key, value] = entries[i];
    processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme2);
  }
};
const getPart = (classPartObject, path) => {
  let current = classPartObject;
  const parts = path.split(CLASS_PART_SEPARATOR);
  const len = parts.length;
  for (let i = 0; i < len; i++) {
    const part = parts[i];
    let next = current.nextPart.get(part);
    if (!next) {
      next = createClassPartObject();
      current.nextPart.set(part, next);
    }
    current = next;
  }
  return current;
};
const isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
const createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ Object.create(null);
  let previousCache = /* @__PURE__ */ Object.create(null);
  const update = (key, value) => {
    cache[key] = value;
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ Object.create(null);
    }
  };
  return {
    get(key) {
      let value = cache[key];
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache[key]) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (key in cache) {
        cache[key] = value;
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = "!";
const MODIFIER_SEPARATOR = ":";
const EMPTY_MODIFIERS = [];
const createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
  isExternal
});
const createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    const len = className.length;
    for (let index = 0; index < len; index++) {
      const currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + 1;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") bracketDepth++;
      else if (currentCharacter === "]") bracketDepth--;
      else if (currentCharacter === "(") parenDepth++;
      else if (currentCharacter === ")") parenDepth--;
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
    let baseClassName = baseClassNameWithImportantModifier;
    let hasImportantModifier = false;
    if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
      baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
      hasImportantModifier = true;
    } else if (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
    ) {
      baseClassName = baseClassNameWithImportantModifier.slice(1);
      hasImportantModifier = true;
    }
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
const createSortModifiers = (config) => {
  const modifierWeights = /* @__PURE__ */ new Map();
  config.orderSensitiveModifiers.forEach((mod, index) => {
    modifierWeights.set(mod, 1e6 + index);
  });
  return (modifiers) => {
    const result = [];
    let currentSegment = [];
    for (let i = 0; i < modifiers.length; i++) {
      const modifier = modifiers[i];
      const isArbitrary = modifier[0] === "[";
      const isOrderSensitive = modifierWeights.has(modifier);
      if (isArbitrary || isOrderSensitive) {
        if (currentSegment.length > 0) {
          currentSegment.sort();
          result.push(...currentSegment);
          currentSegment = [];
        }
        result.push(modifier);
      } else {
        currentSegment.push(modifier);
      }
    }
    if (currentSegment.length > 0) {
      currentSegment.sort();
      result.push(...currentSegment);
    }
    return result;
  };
};
const createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.indexOf(classId) > -1) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
const twJoin = (...classLists) => {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < classLists.length) {
    if (argument = classLists[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
const toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
const createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall;
  const initTailwindMerge = (classList) => {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  };
  const tailwindMerge = (classList) => {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  };
  functionToCall = initTailwindMerge;
  return (...args) => functionToCall(twJoin(...args));
};
const fallbackThemeArr = [];
const fromTheme = (key) => {
  const themeGetter = (theme2) => theme2[key] || fallbackThemeArr;
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = (value) => fractionRegex.test(value);
const isNumber = (value) => !!value && !Number.isNaN(Number(value));
const isInteger = (value) => !!value && Number.isInteger(Number(value));
const isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
const isTshirtSize = (value) => tshirtUnitRegex.test(value);
const isAny = () => true;
const isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
const isNever = () => false;
const isShadow = (value) => shadowRegex.test(value);
const isImage = (value) => imageRegex.test(value);
const isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = (value) => arbitraryValueRegex.test(value);
const isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
const isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
const isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
const isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
const isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
const isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
const getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
const isLabelPosition = (label) => label === "position" || label === "percentage";
const isLabelImage = (label) => label === "image" || label === "url";
const isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
const isLabelLength = (label) => label === "length";
const isLabelNumber = (label) => label === "number";
const isLabelFamilyName = (label) => label === "family-name";
const isLabelWeight = (label) => label === "number" || label === "weight";
const isLabelShadow = (label) => label === "shadow";
const getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeTextShadow = fromTheme("text-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ];
  const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingInline = () => [isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleBgRepeat = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
  const scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber],
      text: [isTshirtSize],
      "text-shadow": [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: scalePositionWithArbitrary()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: scaleInset()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: scaleInset()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": scaleInset()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: scaleMargin()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...scaleSizingInline()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...scaleSizingInline()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...scaleSizingInline()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...scaleSizingBlock()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [isArbitraryValue]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: scaleBgPosition()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: scaleBgRepeat()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: scaleBgSize()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": scaleBorderWidth()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": scaleColor()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: scaleColor()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [isNumber]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": scaleMaskImagePosition()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": scaleMaskImagePosition()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": scaleColor()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": scaleColor()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": scaleMaskImagePosition()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": scaleMaskImagePosition()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": scaleColor()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": scaleColor()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": scaleMaskImagePosition()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": scaleMaskImagePosition()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": scaleColor()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": scaleColor()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": scaleMaskImagePosition()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": scaleMaskImagePosition()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": scaleColor()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": scaleColor()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": scaleMaskImagePosition()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": scaleMaskImagePosition()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": scaleColor()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": scaleColor()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": scaleMaskImagePosition()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": scaleMaskImagePosition()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": scaleColor()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": scaleColor()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": scaleMaskImagePosition()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": scaleMaskImagePosition()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": scaleColor()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": scaleColor()
      }],
      "mask-image-radial": [{
        "mask-radial": [isArbitraryVariable, isArbitraryValue]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": scaleMaskImagePosition()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": scaleMaskImagePosition()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": scaleColor()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": scaleColor()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": scalePosition()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [isNumber]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": scaleMaskImagePosition()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": scaleMaskImagePosition()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": scaleColor()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": scaleColor()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: scaleBgPosition()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: scaleBgRepeat()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: scaleBgSize()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": scaleColor()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scalePositionWithArbitrary()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scalePositionWithArbitrary()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
const mergeConfigs = (baseConfig, {
  cacheSize,
  prefix,
  experimentalParseClassName,
  extend = {},
  override = {}
}) => {
  overrideProperty(baseConfig, "cacheSize", cacheSize);
  overrideProperty(baseConfig, "prefix", prefix);
  overrideProperty(baseConfig, "experimentalParseClassName", experimentalParseClassName);
  overrideConfigProperties(baseConfig.theme, override.theme);
  overrideConfigProperties(baseConfig.classGroups, override.classGroups);
  overrideConfigProperties(baseConfig.conflictingClassGroups, override.conflictingClassGroups);
  overrideConfigProperties(baseConfig.conflictingClassGroupModifiers, override.conflictingClassGroupModifiers);
  overrideProperty(baseConfig, "orderSensitiveModifiers", override.orderSensitiveModifiers);
  mergeConfigProperties(baseConfig.theme, extend.theme);
  mergeConfigProperties(baseConfig.classGroups, extend.classGroups);
  mergeConfigProperties(baseConfig.conflictingClassGroups, extend.conflictingClassGroups);
  mergeConfigProperties(baseConfig.conflictingClassGroupModifiers, extend.conflictingClassGroupModifiers);
  mergeArrayProperties(baseConfig, extend, "orderSensitiveModifiers");
  return baseConfig;
};
const overrideProperty = (baseObject, overrideKey, overrideValue) => {
  if (overrideValue !== void 0) {
    baseObject[overrideKey] = overrideValue;
  }
};
const overrideConfigProperties = (baseObject, overrideObject) => {
  if (overrideObject) {
    for (const key in overrideObject) {
      overrideProperty(baseObject, key, overrideObject[key]);
    }
  }
};
const mergeConfigProperties = (baseObject, mergeObject) => {
  if (mergeObject) {
    for (const key in mergeObject) {
      mergeArrayProperties(baseObject, mergeObject, key);
    }
  }
};
const mergeArrayProperties = (baseObject, mergeObject, key) => {
  const mergeValue = mergeObject[key];
  if (mergeValue !== void 0) {
    baseObject[key] = baseObject[key] ? baseObject[key].concat(mergeValue) : mergeValue;
  }
};
const extendTailwindMerge = (configExtension, ...createConfig) => typeof configExtension === "function" ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(() => mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);
const twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
var createTwMerge = (cachedTwMergeConfig) => {
  return isEmptyObject(cachedTwMergeConfig) ? twMerge : extendTailwindMerge({
    ...cachedTwMergeConfig,
    extend: {
      theme: cachedTwMergeConfig.theme,
      classGroups: cachedTwMergeConfig.classGroups,
      conflictingClassGroupModifiers: cachedTwMergeConfig.conflictingClassGroupModifiers,
      conflictingClassGroups: cachedTwMergeConfig.conflictingClassGroups,
      ...cachedTwMergeConfig.extend
    }
  });
};
var executeMerge = (classnames, config) => {
  const base = cx(classnames);
  if (!base || !(config?.twMerge ?? true)) return base;
  if (!state.cachedTwMerge || state.didTwMergeConfigChange) {
    state.didTwMergeConfigChange = false;
    state.cachedTwMerge = createTwMerge(state.cachedTwMergeConfig);
  }
  return state.cachedTwMerge(base) || void 0;
};
var cnMerge = (...classnames) => {
  return (config) => executeMerge(classnames, config);
};
var { createTV } = getTailwindVariants(cnMerge);
const appConfigTv = appConfig;
const tv = /* @__PURE__ */ createTV(appConfigTv.ui?.tv);
const linkKeys = [
  "active",
  "activeClass",
  "ariaCurrentValue",
  "as",
  "disabled",
  "download",
  "exact",
  "exactActiveClass",
  "exactHash",
  "exactQuery",
  "external",
  "form",
  "formaction",
  "formenctype",
  "formmethod",
  "formnovalidate",
  "formtarget",
  "href",
  "hreflang",
  "inactiveClass",
  "media",
  "noPrefetch",
  "noRel",
  "onClick",
  "ping",
  "prefetch",
  "prefetchOn",
  "prefetchedClass",
  "referrerpolicy",
  "rel",
  "replace",
  "target",
  "title",
  "to",
  "trailingSlash",
  "type",
  "viewTransition"
];
function pickLinkProps(link) {
  const keys = Object.keys(link);
  const ariaKeys = keys.filter((key) => key.startsWith("aria-"));
  const dataKeys = keys.filter((key) => key.startsWith("data-"));
  const propsToInclude = [
    ...linkKeys,
    ...ariaKeys,
    ...dataKeys
  ];
  return reactivePick(link, ...propsToInclude);
}
function isPartiallyEqual(item1, item2) {
  const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
    if (q.type === "added") {
      filtered.add(q.key);
    }
    return filtered;
  }, /* @__PURE__ */ new Set());
  const item1Filtered = Object.fromEntries(Object.entries(item1).filter(([key]) => !diffedKeys.has(key)));
  const item2Filtered = Object.fromEntries(Object.entries(item2).filter(([key]) => !diffedKeys.has(key)));
  return isEqual$1(item1Filtered, item2Filtered);
}
const _sfc_main$9 = {
  __name: "UIcon",
  __ssrInlineRender: true,
  props: {
    name: { type: null, required: true },
    mode: { type: String, required: false },
    size: { type: [String, Number], required: false },
    customize: { type: [Function, Boolean, null], required: false }
  },
  setup(__props) {
    const props = __props;
    const iconProps = useForwardProps(reactivePick(props, "name", "mode", "size", "customize"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      if (typeof __props.name === "string") {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_Icon, vueExports.mergeProps(vueExports.unref(iconProps), _attrs), null, _parent));
      } else {
        serverRenderer_cjs_prodExports.ssrRenderVNode(_push, vueExports.createVNode(vueExports.resolveDynamicComponent(__props.name), _attrs, null), _parent);
      }
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.6.0_@tiptap+extensions@3.20.4_@tiptap+core@3.20.4_@tiptap+pm@3.20.4__@tiptap_5960d897131c88efde171eb4b9fb3871/node_modules/@nuxt/ui/dist/runtime/components/Icon.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const ImageComponent = "img";
const avatarGroupInjectionKey = /* @__PURE__ */ Symbol("nuxt-ui.avatar-group");
function useAvatarGroup(props) {
  const avatarGroup = vueExports.inject(avatarGroupInjectionKey, void 0);
  const size = vueExports.computed(() => props.size ?? avatarGroup?.value.size);
  vueExports.provide(avatarGroupInjectionKey, vueExports.computed(() => ({ size: size.value })));
  return {
    size
  };
}
const theme$4 = {
  "slots": {
    "root": "relative inline-flex items-center justify-center shrink-0",
    "base": "rounded-full ring ring-bg flex items-center justify-center text-inverted font-medium whitespace-nowrap"
  },
  "variants": {
    "color": {
      "primary": "bg-primary",
      "secondary": "bg-secondary",
      "success": "bg-success",
      "info": "bg-info",
      "warning": "bg-warning",
      "error": "bg-error",
      "neutral": "bg-inverted"
    },
    "size": {
      "3xs": "h-[4px] min-w-[4px] text-[4px]",
      "2xs": "h-[5px] min-w-[5px] text-[5px]",
      "xs": "h-[6px] min-w-[6px] text-[6px]",
      "sm": "h-[7px] min-w-[7px] text-[7px]",
      "md": "h-[8px] min-w-[8px] text-[8px]",
      "lg": "h-[9px] min-w-[9px] text-[9px]",
      "xl": "h-[10px] min-w-[10px] text-[10px]",
      "2xl": "h-[11px] min-w-[11px] text-[11px]",
      "3xl": "h-[12px] min-w-[12px] text-[12px]"
    },
    "position": {
      "top-right": "top-0 right-0",
      "bottom-right": "bottom-0 right-0",
      "top-left": "top-0 left-0",
      "bottom-left": "bottom-0 left-0"
    },
    "inset": {
      "false": ""
    },
    "standalone": {
      "false": "absolute"
    }
  },
  "compoundVariants": [
    {
      "position": "top-right",
      "inset": false,
      "class": "-translate-y-1/2 translate-x-1/2 transform"
    },
    {
      "position": "bottom-right",
      "inset": false,
      "class": "translate-y-1/2 translate-x-1/2 transform"
    },
    {
      "position": "top-left",
      "inset": false,
      "class": "-translate-y-1/2 -translate-x-1/2 transform"
    },
    {
      "position": "bottom-left",
      "inset": false,
      "class": "translate-y-1/2 -translate-x-1/2 transform"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "position": "top-right"
  }
};
const _sfc_main$8 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UChip",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    as: { type: null, required: false },
    text: { type: [String, Number], required: false },
    color: { type: null, required: false },
    size: { type: null, required: false },
    position: { type: null, required: false },
    inset: { type: Boolean, required: false, default: false },
    standalone: { type: Boolean, required: false, default: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  }, {
    "show": { type: Boolean, ...{ default: true } },
    "showModifiers": {}
  }),
  emits: ["update:show"],
  setup(__props) {
    const props = __props;
    const show = vueExports.useModel(__props, "show", { type: Boolean, ...{ default: true } });
    const { size } = useAvatarGroup(props);
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("chip", props);
    const ui = vueExports.computed(() => tv({ extend: tv(theme$4), ...appConfig2.ui?.chip || {} })({
      color: props.color,
      size: size.value,
      position: props.position,
      inset: props.inset,
      standalone: props.standalone
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Slot), _ctx.$attrs, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    vueExports.renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (show.value) {
              _push2(`<span data-slot="base" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.base({ class: vueExports.unref(uiProp)?.base }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                _push2(`${serverRenderer_cjs_prodExports.ssrInterpolate(__props.text)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.createVNode(vueExports.unref(Slot), _ctx.$attrs, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16),
              show.value ? (vueExports.openBlock(), vueExports.createBlock("span", {
                key: 0,
                "data-slot": "base",
                class: ui.value.base({ class: vueExports.unref(uiProp)?.base })
              }, [
                vueExports.renderSlot(_ctx.$slots, "content", {}, () => [
                  vueExports.createTextVNode(vueExports.toDisplayString(__props.text), 1)
                ])
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.6.0_@tiptap+extensions@3.20.4_@tiptap+core@3.20.4_@tiptap+pm@3.20.4__@tiptap_5960d897131c88efde171eb4b9fb3871/node_modules/@nuxt/ui/dist/runtime/components/Chip.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const theme$3 = {
  "slots": {
    "root": "inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle bg-elevated",
    "image": "h-full w-full rounded-[inherit] object-cover",
    "fallback": "font-medium leading-none text-muted truncate",
    "icon": "text-muted shrink-0"
  },
  "variants": {
    "size": {
      "3xs": {
        "root": "size-4 text-[8px]"
      },
      "2xs": {
        "root": "size-5 text-[10px]"
      },
      "xs": {
        "root": "size-6 text-xs"
      },
      "sm": {
        "root": "size-7 text-sm"
      },
      "md": {
        "root": "size-8 text-base"
      },
      "lg": {
        "root": "size-9 text-lg"
      },
      "xl": {
        "root": "size-10 text-xl"
      },
      "2xl": {
        "root": "size-11 text-[22px]"
      },
      "3xl": {
        "root": "size-12 text-2xl"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main$7 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UAvatar",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    src: { type: String, required: false },
    alt: { type: String, required: false },
    icon: { type: null, required: false },
    text: { type: String, required: false },
    size: { type: null, required: false },
    chip: { type: [Boolean, Object], required: false },
    class: { type: null, required: false },
    style: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const props = __props;
    const as = vueExports.computed(() => {
      if (typeof props.as === "string" || typeof props.as?.render === "function") {
        return { root: props.as };
      }
      return defu(props.as, { root: "span" });
    });
    const fallback = vueExports.computed(() => props.text || (props.alt || "").split(" ").map((word) => word.charAt(0)).join("").substring(0, 2));
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("avatar", props);
    const { size } = useAvatarGroup(props);
    const ui = vueExports.computed(() => tv({ extend: tv(theme$3), ...appConfig2.ui?.avatar || {} })({
      size: size.value
    }));
    const rootClass = vueExports.computed(() => ui.value.root({ class: [uiProp.value?.root, props.class] }));
    const sizePx = vueExports.computed(() => {
      const sizeClass = rootClass.value.split(" ").find((c2) => /^size-\d+$/.test(c2));
      if (sizeClass) {
        const num = Number.parseFloat(sizeClass.split("-")[1] ?? "");
        if (!Number.isNaN(num)) return num * 4;
      }
      return null;
    });
    const error = vueExports.ref(false);
    vueExports.watch(() => props.src, () => {
      if (error.value) {
        error.value = false;
      }
    });
    function onError() {
      error.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      serverRenderer_cjs_prodExports.ssrRenderVNode(_push, vueExports.createVNode(vueExports.resolveDynamicComponent(props.chip ? _sfc_main$8 : vueExports.unref(Primitive)), vueExports.mergeProps({
        as: as.value.root
      }, props.chip ? typeof props.chip === "object" ? { inset: true, ...props.chip } : { inset: true } : {}, {
        "data-slot": "root",
        class: rootClass.value,
        style: props.style
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.src && !error.value) {
              serverRenderer_cjs_prodExports.ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(as.value.img || vueExports.unref(ImageComponent)), vueExports.mergeProps({
                src: __props.src,
                alt: __props.alt,
                width: sizePx.value,
                height: sizePx.value
              }, _ctx.$attrs, {
                "data-slot": "image",
                class: ui.value.image({ class: vueExports.unref(uiProp)?.image }),
                onError
              }), null), _parent2, _scopeId);
            } else {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Slot), _ctx.$attrs, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                      if (__props.icon) {
                        _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$9, {
                          name: __props.icon,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon })
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<span data-slot="fallback" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.fallback({ class: vueExports.unref(uiProp)?.fallback }))}"${_scopeId2}>${serverRenderer_cjs_prodExports.ssrInterpolate(fallback.value || " ")}</span>`);
                      }
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "default", {}, () => [
                        __props.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, {
                          key: 0,
                          name: __props.icon,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon })
                        }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 1,
                          "data-slot": "fallback",
                          class: ui.value.fallback({ class: vueExports.unref(uiProp)?.fallback })
                        }, vueExports.toDisplayString(fallback.value || " "), 3))
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            }
          } else {
            return [
              __props.src && !error.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(as.value.img || vueExports.unref(ImageComponent)), vueExports.mergeProps({
                key: 0,
                src: __props.src,
                alt: __props.alt,
                width: sizePx.value,
                height: sizePx.value
              }, _ctx.$attrs, {
                "data-slot": "image",
                class: ui.value.image({ class: vueExports.unref(uiProp)?.image }),
                onError
              }), null, 16, ["src", "alt", "width", "height", "class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Slot), vueExports.mergeProps({ key: 1 }, _ctx.$attrs), {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default", {}, () => [
                    __props.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, {
                      key: 0,
                      name: __props.icon,
                      "data-slot": "icon",
                      class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon })
                    }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock("span", {
                      key: 1,
                      "data-slot": "fallback",
                      class: ui.value.fallback({ class: vueExports.unref(uiProp)?.fallback })
                    }, vueExports.toDisplayString(fallback.value || " "), 3))
                  ])
                ]),
                _: 3
              }, 16))
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.6.0_@tiptap+extensions@3.20.4_@tiptap+core@3.20.4_@tiptap+pm@3.20.4__@tiptap_5960d897131c88efde171eb4b9fb3871/node_modules/@nuxt/ui/dist/runtime/components/Avatar.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "ULinkBase",
  __ssrInlineRender: true,
  props: {
    as: { type: String, required: false, default: "button" },
    type: { type: String, required: false, default: "button" },
    disabled: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    href: { type: String, required: false },
    navigate: { type: Function, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    active: { type: Boolean, required: false },
    isExternal: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    function onClickWrapper(e) {
      if (props.disabled) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      if (props.onClick) {
        for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
          onClick(e);
        }
      }
      if (props.href && props.navigate && !props.isExternal) {
        props.navigate(e);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Primitive), vueExports.mergeProps(__props.href ? {
        "as": "a",
        "href": __props.disabled ? void 0 : __props.href,
        "aria-disabled": __props.disabled ? "true" : void 0,
        "role": __props.disabled ? "link" : void 0,
        "tabindex": __props.disabled ? -1 : void 0
      } : __props.as === "button" ? {
        as: __props.as,
        type: __props.type,
        disabled: __props.disabled
      } : {
        as: __props.as
      }, {
        rel: __props.rel,
        target: __props.target,
        onClick: onClickWrapper
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.6.0_@tiptap+extensions@3.20.4_@tiptap+core@3.20.4_@tiptap+pm@3.20.4__@tiptap_5960d897131c88efde171eb4b9fb3871/node_modules/@nuxt/ui/dist/runtime/components/LinkBase.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const theme$2 = {
  "base": "focus-visible:outline-primary",
  "variants": {
    "active": {
      "true": "text-primary",
      "false": "text-muted"
    },
    "disabled": {
      "true": "cursor-not-allowed opacity-75"
    }
  },
  "compoundVariants": [
    {
      "active": false,
      "disabled": false,
      "class": [
        "hover:text-default",
        "transition-colors"
      ]
    }
  ]
};
const _sfc_main$5 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "ULink",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "button" },
    type: { type: null, required: false, default: "button" },
    disabled: { type: Boolean, required: false },
    active: { type: Boolean, required: false, default: void 0 },
    exact: { type: Boolean, required: false },
    exactQuery: { type: [Boolean, String], required: false },
    exactHash: { type: Boolean, required: false },
    inactiveClass: { type: String, required: false },
    custom: { type: Boolean, required: false },
    raw: { type: Boolean, required: false },
    class: { type: null, required: false },
    to: { type: null, required: false },
    href: { type: null, required: false },
    external: { type: Boolean, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    noRel: { type: Boolean, required: false },
    prefetchedClass: { type: String, required: false },
    prefetch: { type: Boolean, required: false },
    prefetchOn: { type: [String, Object], required: false },
    noPrefetch: { type: Boolean, required: false },
    trailingSlash: { type: String, required: false },
    activeClass: { type: String, required: false },
    exactActiveClass: { type: String, required: false },
    ariaCurrentValue: { type: String, required: false, default: "page" },
    viewTransition: { type: Boolean, required: false },
    replace: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const appConfig2 = useAppConfig();
    const nuxtLinkProps = useForwardProps(reactiveOmit(props, "as", "type", "disabled", "active", "exact", "exactQuery", "exactHash", "activeClass", "inactiveClass", "to", "href", "raw", "custom", "class"));
    const ui = vueExports.computed(() => tv({
      extend: tv(theme$2),
      ...defu({
        variants: {
          active: {
            true: mergeClasses(appConfig2.ui?.link?.variants?.active?.true, props.activeClass),
            false: mergeClasses(appConfig2.ui?.link?.variants?.active?.false, props.inactiveClass)
          }
        }
      }, appConfig2.ui?.link || {})
    }));
    const to = vueExports.computed(() => props.to ?? props.href);
    function isLinkActive({ route: linkRoute, isActive, isExactActive }) {
      if (props.active !== void 0) {
        return props.active;
      }
      if (props.exactQuery === "partial") {
        if (!isPartiallyEqual(linkRoute.query, route.query)) return false;
      } else if (props.exactQuery === true) {
        if (!isEqual$1(linkRoute.query, route.query)) return false;
      }
      if (props.exactHash && linkRoute.hash !== route.hash) {
        return false;
      }
      if (props.exact && isExactActive) {
        return true;
      }
      if (!props.exact && isActive) {
        return true;
      }
      return false;
    }
    function resolveLinkClass({ route: route2, isActive, isExactActive }) {
      const active = isLinkActive({ route: route2, isActive, isExactActive });
      if (props.raw) {
        return [props.class, active ? props.activeClass : props.inactiveClass];
      }
      return ui.value({ class: props.class, active, disabled: props.disabled });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, vueExports.mergeProps(vueExports.unref(nuxtLinkProps), {
        to: to.value,
        custom: ""
      }, _attrs), {
        default: vueExports.withCtx(({ href, navigate, route: linkRoute, isActive, isExactActive, ...rest }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.custom) {
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate,
                rel: rest.rel,
                target: rest.target,
                isExternal: rest.isExternal,
                active: isLinkActive({ route: linkRoute, isActive, isExactActive })
              }, null, _push2, _parent2, _scopeId);
            } else {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$6, vueExports.mergeProps({
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate,
                rel: rest.rel,
                target: rest.target,
                isExternal: rest.isExternal
              }, {
                class: resolveLinkClass({ route: linkRoute, isActive, isExactActive })
              }), {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {
                      active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                    }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "default", {
                        active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            }
          } else {
            return [
              __props.custom ? vueExports.renderSlot(_ctx.$slots, "default", vueExports.mergeProps({ key: 0 }, {
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate,
                rel: rest.rel,
                target: rest.target,
                isExternal: rest.isExternal,
                active: isLinkActive({ route: linkRoute, isActive, isExactActive })
              })) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$6, vueExports.mergeProps({ key: 1 }, {
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate,
                rel: rest.rel,
                target: rest.target,
                isExternal: rest.isExternal
              }, {
                class: resolveLinkClass({ route: linkRoute, isActive, isExactActive })
              }), {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default", {
                    active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                  })
                ]),
                _: 2
              }, 1040, ["class"]))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.6.0_@tiptap+extensions@3.20.4_@tiptap+core@3.20.4_@tiptap+pm@3.20.4__@tiptap_5960d897131c88efde171eb4b9fb3871/node_modules/@nuxt/ui/dist/runtime/components/Link.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const theme$1 = {
  "slots": {
    "base": [
      "rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
      "transition-colors"
    ],
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": "",
      "ghost": "",
      "link": ""
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "block": {
      "true": {
        "base": "w-full justify-center",
        "trailingIcon": "ms-auto"
      }
    },
    "square": {
      "true": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "active": {
      "true": {
        "base": ""
      },
      "false": {
        "base": ""
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "text-inverted bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "text-inverted bg-secondary hover:bg-secondary/75 active:bg-secondary/75 disabled:bg-secondary aria-disabled:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "text-inverted bg-success hover:bg-success/75 active:bg-success/75 disabled:bg-success aria-disabled:bg-success focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "text-inverted bg-info hover:bg-info/75 active:bg-info/75 disabled:bg-info aria-disabled:bg-info focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "text-inverted bg-warning hover:bg-warning/75 active:bg-warning/75 disabled:bg-warning aria-disabled:bg-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "text-inverted bg-error hover:bg-error/75 active:bg-error/75 disabled:bg-error aria-disabled:bg-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "ring ring-inset ring-secondary/50 text-secondary hover:bg-secondary/10 active:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "ring ring-inset ring-success/50 text-success hover:bg-success/10 active:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "ring ring-inset ring-info/50 text-info hover:bg-info/10 active:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "ring ring-inset ring-warning/50 text-warning hover:bg-warning/10 active:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "ring ring-inset ring-error/50 text-error hover:bg-error/10 active:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "text-secondary bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 focus:outline-none focus-visible:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "text-success bg-success/10 hover:bg-success/15 active:bg-success/15 focus:outline-none focus-visible:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "text-info bg-info/10 hover:bg-info/15 active:bg-info/15 focus:outline-none focus-visible:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "text-warning bg-warning/10 hover:bg-warning/15 active:bg-warning/15 focus:outline-none focus-visible:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "text-error bg-error/10 hover:bg-error/15 active:bg-error/15 focus:outline-none focus-visible:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "text-success ring ring-inset ring-success/25 bg-success/10 hover:bg-success/15 active:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "text-info ring ring-inset ring-info/25 bg-info/10 hover:bg-info/15 active:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "text-warning ring ring-inset ring-warning/25 bg-warning/10 hover:bg-warning/15 active:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "text-error ring ring-inset ring-error/25 bg-error/10 hover:bg-error/15 active:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": "ghost",
      "class": "text-primary hover:bg-primary/10 active:bg-primary/10 focus:outline-none focus-visible:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "secondary",
      "variant": "ghost",
      "class": "text-secondary hover:bg-secondary/10 active:bg-secondary/10 focus:outline-none focus-visible:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "success",
      "variant": "ghost",
      "class": "text-success hover:bg-success/10 active:bg-success/10 focus:outline-none focus-visible:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "info",
      "variant": "ghost",
      "class": "text-info hover:bg-info/10 active:bg-info/10 focus:outline-none focus-visible:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "warning",
      "variant": "ghost",
      "class": "text-warning hover:bg-warning/10 active:bg-warning/10 focus:outline-none focus-visible:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "error",
      "variant": "ghost",
      "class": "text-error hover:bg-error/10 active:bg-error/10 focus:outline-none focus-visible:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "primary",
      "variant": "link",
      "class": "text-primary hover:text-primary/75 active:text-primary/75 disabled:text-primary aria-disabled:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": "text-secondary hover:text-secondary/75 active:text-secondary/75 disabled:text-secondary aria-disabled:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "link",
      "class": "text-success hover:text-success/75 active:text-success/75 disabled:text-success aria-disabled:text-success focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "link",
      "class": "text-info hover:text-info/75 active:text-info/75 disabled:text-info aria-disabled:text-info focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "link",
      "class": "text-warning hover:text-warning/75 active:text-warning/75 disabled:text-warning aria-disabled:text-warning focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "link",
      "class": "text-error hover:text-error/75 active:text-error/75 disabled:text-error aria-disabled:text-error focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated disabled:bg-default aria-disabled:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 focus:outline-none focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": "ghost",
      "class": "text-default hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent"
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": "text-muted hover:text-default active:text-default disabled:text-muted aria-disabled:text-muted focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-2"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-2"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};
const _sfc_main$4 = {
  __name: "UButton",
  __ssrInlineRender: true,
  props: {
    label: { type: String, required: false },
    color: { type: null, required: false },
    activeColor: { type: null, required: false },
    variant: { type: null, required: false },
    activeVariant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    block: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    as: { type: null, required: false },
    type: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    active: { type: Boolean, required: false },
    exact: { type: Boolean, required: false },
    exactQuery: { type: [Boolean, String], required: false },
    exactHash: { type: Boolean, required: false },
    inactiveClass: { type: String, required: false },
    to: { type: null, required: false },
    href: { type: null, required: false },
    external: { type: Boolean, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    noRel: { type: Boolean, required: false },
    prefetchedClass: { type: String, required: false },
    prefetch: { type: Boolean, required: false },
    prefetchOn: { type: [String, Object], required: false },
    noPrefetch: { type: Boolean, required: false },
    trailingSlash: { type: String, required: false },
    activeClass: { type: String, required: false },
    exactActiveClass: { type: String, required: false },
    ariaCurrentValue: { type: String, required: false },
    viewTransition: { type: Boolean, required: false },
    replace: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = vueExports.useSlots();
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("button", props);
    const { orientation, size: buttonSize } = useFieldGroup(props);
    const linkProps = useForwardProps(pickLinkProps(props));
    const loadingAutoState = vueExports.ref(false);
    const formLoading = vueExports.inject(formLoadingInjectionKey, void 0);
    async function onClickWrapper(event) {
      loadingAutoState.value = true;
      const callbacks = Array.isArray(props.onClick) ? props.onClick : [props.onClick];
      try {
        await Promise.all(callbacks.map((fn) => fn?.(event)));
      } finally {
        loadingAutoState.value = false;
      }
    }
    const isLoading = vueExports.computed(() => {
      return props.loading || props.loadingAuto && (loadingAutoState.value || formLoading?.value && props.type === "submit");
    });
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(
      vueExports.computed(() => ({ ...props, loading: isLoading.value }))
    );
    const ui = vueExports.computed(() => tv({
      extend: tv(theme$1),
      ...defu({
        variants: {
          active: {
            true: {
              base: mergeClasses(appConfig2.ui?.button?.variants?.active?.true?.base, props.activeClass)
            },
            false: {
              base: mergeClasses(appConfig2.ui?.button?.variants?.active?.false?.base, props.inactiveClass)
            }
          }
        }
      }, appConfig2.ui?.button || {})
    })({
      color: props.color,
      variant: props.variant,
      size: buttonSize.value,
      loading: isLoading.value,
      block: props.block,
      square: props.square || !slots.default && !props.label,
      leading: isLeading.value,
      trailing: isTrailing.value,
      fieldGroup: orientation.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$5, vueExports.mergeProps({
        type: __props.type,
        disabled: __props.disabled || isLoading.value
      }, vueExports.unref(omit)(vueExports.unref(linkProps), ["type", "disabled", "onClick"]), { custom: "" }, _attrs), {
        default: vueExports.withCtx(({ active, ...slotProps }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$6, vueExports.mergeProps(slotProps, {
              "data-slot": "base",
              class: ui.value.base({
                class: [vueExports.unref(uiProp)?.base, props.class],
                active,
                ...active && __props.activeVariant ? { variant: __props.activeVariant } : {},
                ...active && __props.activeColor ? { color: __props.activeColor } : {}
              }),
              onClick: onClickWrapper
            }), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
                    if (vueExports.unref(isLeading) && vueExports.unref(leadingIconName)) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$9, {
                        name: vueExports.unref(leadingIconName),
                        "data-slot": "leadingIcon",
                        class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon, active })
                      }, null, _parent3, _scopeId2));
                    } else if (!!__props.avatar) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$7, vueExports.mergeProps({
                        size: vueExports.unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                      }, __props.avatar, {
                        "data-slot": "leadingAvatar",
                        class: ui.value.leadingAvatar({ class: vueExports.unref(uiProp)?.leadingAvatar, active })
                      }), null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, () => {
                    if (__props.label !== void 0 && __props.label !== null) {
                      _push3(`<span data-slot="label" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.label({ class: vueExports.unref(uiProp)?.label, active }))}"${_scopeId2}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.label)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
                    if (vueExports.unref(isTrailing) && vueExports.unref(trailingIconName)) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$9, {
                        name: vueExports.unref(trailingIconName),
                        "data-slot": "trailingIcon",
                        class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon, active })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    vueExports.renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                      vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, {
                        key: 0,
                        name: vueExports.unref(leadingIconName),
                        "data-slot": "leadingIcon",
                        class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon, active })
                      }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$7, vueExports.mergeProps({
                        key: 1,
                        size: vueExports.unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                      }, __props.avatar, {
                        "data-slot": "leadingAvatar",
                        class: ui.value.leadingAvatar({ class: vueExports.unref(uiProp)?.leadingAvatar, active })
                      }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                    ]),
                    vueExports.renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
                      __props.label !== void 0 && __props.label !== null ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 0,
                        "data-slot": "label",
                        class: ui.value.label({ class: vueExports.unref(uiProp)?.label, active })
                      }, vueExports.toDisplayString(__props.label), 3)) : vueExports.createCommentVNode("", true)
                    ]),
                    vueExports.renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                      vueExports.unref(isTrailing) && vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, {
                        key: 0,
                        name: vueExports.unref(trailingIconName),
                        "data-slot": "trailingIcon",
                        class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon, active })
                      }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_sfc_main$6, vueExports.mergeProps(slotProps, {
                "data-slot": "base",
                class: ui.value.base({
                  class: [vueExports.unref(uiProp)?.base, props.class],
                  active,
                  ...active && __props.activeVariant ? { variant: __props.activeVariant } : {},
                  ...active && __props.activeColor ? { color: __props.activeColor } : {}
                }),
                onClick: onClickWrapper
              }), {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                    vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, {
                      key: 0,
                      name: vueExports.unref(leadingIconName),
                      "data-slot": "leadingIcon",
                      class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon, active })
                    }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$7, vueExports.mergeProps({
                      key: 1,
                      size: vueExports.unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                    }, __props.avatar, {
                      "data-slot": "leadingAvatar",
                      class: ui.value.leadingAvatar({ class: vueExports.unref(uiProp)?.leadingAvatar, active })
                    }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                  ]),
                  vueExports.renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
                    __props.label !== void 0 && __props.label !== null ? (vueExports.openBlock(), vueExports.createBlock("span", {
                      key: 0,
                      "data-slot": "label",
                      class: ui.value.label({ class: vueExports.unref(uiProp)?.label, active })
                    }, vueExports.toDisplayString(__props.label), 3)) : vueExports.createCommentVNode("", true)
                  ]),
                  vueExports.renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                    vueExports.unref(isTrailing) && vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, {
                      key: 0,
                      name: vueExports.unref(trailingIconName),
                      "data-slot": "trailingIcon",
                      class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon, active })
                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                  ])
                ]),
                _: 2
              }, 1040, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.6.0_@tiptap+extensions@3.20.4_@tiptap+core@3.20.4_@tiptap+pm@3.20.4__@tiptap_5960d897131c88efde171eb4b9fb3871/node_modules/@nuxt/ui/dist/runtime/components/Button.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-sm/4 gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-sm/4 gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-base/5 gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-base/5 gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    },
    {
      "fixed": false,
      "size": "xs",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "sm",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "md",
      "class": "md:text-sm"
    },
    {
      "fixed": false,
      "size": "lg",
      "class": "md:text-sm"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$3 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UInput",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: null, required: false, default: "text" },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autocomplete: { type: [String, Object], required: false, default: "off" },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    fixed: { type: Boolean, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelModifiers: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const modelValue = /* @__PURE__ */ useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const appConfig2 = useAppConfig();
    const uiProp = useComponentUI("input", props);
    const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField(props, {});
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const inputSize = vueExports.computed(() => fieldGroupSize.value || formGroupSize.value);
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig2.ui?.input || {} })({
      type: props.type,
      color: color.value,
      variant: props.variant,
      size: inputSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      fixed: props.fixed,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value
    }));
    const inputRef = vueExports.useTemplateRef("inputRef");
    function updateInput(value) {
      if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number || props.type === "number") {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullable) {
        value ||= null;
      }
      if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
        value ||= void 0;
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      if (!props.modelModifiers?.lazy) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      const value = event.target.value;
      if (props.modelModifiers?.lazy) {
        updateInput(value);
      }
      if (props.modelModifiers?.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    __expose({
      inputRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({
              id: vueExports.unref(id),
              ref_key: "inputRef",
              ref: inputRef,
              type: __props.type,
              value: vueExports.unref(modelValue),
              name: vueExports.unref(name),
              placeholder: __props.placeholder,
              "data-slot": "base",
              class: ui.value.base({ class: vueExports.unref(uiProp)?.base }),
              disabled: vueExports.unref(disabled),
              required: __props.required,
              autocomplete: __props.autocomplete
            }, { ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }))}${_scopeId}>`);
            serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, null, _push2, _parent2, _scopeId);
            if (vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading) {
              _push2(`<span data-slot="leading" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.leading({ class: vueExports.unref(uiProp)?.leading }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
                if (vueExports.unref(isLeading) && vueExports.unref(leadingIconName)) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$9, {
                    name: vueExports.unref(leadingIconName),
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (!!__props.avatar) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$7, vueExports.mergeProps({
                    size: vueExports.unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: vueExports.unref(uiProp)?.leadingAvatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (vueExports.unref(isTrailing) || !!slots.trailing) {
              _push2(`<span data-slot="trailing" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
                if (vueExports.unref(trailingIconName)) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$9, {
                    name: vueExports.unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.createVNode("input", vueExports.mergeProps({
                id: vueExports.unref(id),
                ref_key: "inputRef",
                ref: inputRef,
                type: __props.type,
                value: vueExports.unref(modelValue),
                name: vueExports.unref(name),
                placeholder: __props.placeholder,
                "data-slot": "base",
                class: ui.value.base({ class: vueExports.unref(uiProp)?.base }),
                disabled: vueExports.unref(disabled),
                required: __props.required,
                autocomplete: __props.autocomplete
              }, { ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }, {
                onInput,
                onBlur,
                onChange,
                onFocus: vueExports.unref(emitFormFocus)
              }), null, 16, ["id", "type", "value", "name", "placeholder", "disabled", "required", "autocomplete", "onFocus"]),
              vueExports.renderSlot(_ctx.$slots, "default", { ui: ui.value }),
              vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                key: 0,
                "data-slot": "leading",
                class: ui.value.leading({ class: vueExports.unref(uiProp)?.leading })
              }, [
                vueExports.renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                  vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, {
                    key: 0,
                    name: vueExports.unref(leadingIconName),
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon })
                  }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$7, vueExports.mergeProps({
                    key: 1,
                    size: vueExports.unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: vueExports.unref(uiProp)?.leadingAvatar })
                  }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                ])
              ], 2)) : vueExports.createCommentVNode("", true),
              vueExports.unref(isTrailing) || !!slots.trailing ? (vueExports.openBlock(), vueExports.createBlock("span", {
                key: 1,
                "data-slot": "trailing",
                class: ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing })
              }, [
                vueExports.renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                  vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, {
                    key: 0,
                    name: vueExports.unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon })
                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                ])
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.6.0_@tiptap+extensions@3.20.4_@tiptap+core@3.20.4_@tiptap+pm@3.20.4__@tiptap_5960d897131c88efde171eb4b9fb3871/node_modules/@nuxt/ui/dist/runtime/components/Input.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const width = 760;
const height = 240;
const _sfc_main$2 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "LineChart",
  __ssrInlineRender: true,
  props: {
    points: {},
    valueFormatter: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const padding = { top: 18, right: 16, bottom: 36, left: 16 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const validPoints = vueExports.computed(
      () => props.points.map((point, index) => ({ ...point, index })).filter((point) => typeof point.value === "number" && Number.isFinite(point.value))
    );
    const minValue = vueExports.computed(() => {
      if (validPoints.value.length === 0) return 0;
      return Math.min(...validPoints.value.map((point) => point.value));
    });
    const maxValue = vueExports.computed(() => {
      if (validPoints.value.length === 0) return 0;
      return Math.max(...validPoints.value.map((point) => point.value));
    });
    const yRange = vueExports.computed(() => {
      const range = maxValue.value - minValue.value;
      return range === 0 ? Math.max(maxValue.value, 1) : range;
    });
    function getX(index) {
      if (props.points.length <= 1) {
        return padding.left + innerWidth / 2;
      }
      return padding.left + index / (props.points.length - 1) * innerWidth;
    }
    function getY(value) {
      if (validPoints.value.length === 0) {
        return padding.top + innerHeight / 2;
      }
      const normalized = (value - minValue.value) / yRange.value;
      return padding.top + innerHeight - normalized * innerHeight;
    }
    const linePath = vueExports.computed(() => {
      if (validPoints.value.length === 0) return "";
      return validPoints.value.map((point, index) => `${index === 0 ? "M" : "L"} ${getX(point.index)} ${getY(point.value)}`).join(" ");
    });
    const areaPath = vueExports.computed(() => {
      if (validPoints.value.length === 0) return "";
      const first = validPoints.value[0];
      const last = validPoints.value[validPoints.value.length - 1];
      const baselineY = padding.top + innerHeight;
      return [
        `M ${getX(first.index)} ${baselineY}`,
        ...validPoints.value.map((point) => `L ${getX(point.index)} ${getY(point.value)}`),
        `L ${getX(last.index)} ${baselineY}`,
        "Z"
      ].join(" ");
    });
    const axisLabels = vueExports.computed(() => {
      if (props.points.length === 0) {
        return [];
      }
      if (props.points.length <= 3) {
        return props.points.map((point, index) => ({ label: point.label, x: getX(index) }));
      }
      const middleIndex = Math.floor((props.points.length - 1) / 2);
      return [
        { label: props.points[0].label, x: getX(0) },
        { label: props.points[middleIndex].label, x: getX(middleIndex) },
        { label: props.points[props.points.length - 1].label, x: getX(props.points.length - 1) }
      ];
    });
    const formatter = vueExports.computed(
      () => props.valueFormatter ?? ((value) => `${Math.round(value * 10) / 10}h`)
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "w-full rounded-2xl border border-black/8 bg-white/70 overflow-hidden" }, _attrs))}>`);
      if (vueExports.unref(validPoints).length === 0) {
        _push(`<div class="h-60 flex items-center justify-center text-sm text-zinc-500"> No data for the selected filters. </div>`);
      } else {
        _push(`<svg${serverRenderer_cjs_prodExports.ssrRenderAttr("viewBox", `0 0 ${width} ${height}`)} class="w-full h-60" preserveAspectRatio="none" role="img" aria-label="Metric trend chart"><defs><linearGradient id="kpi-line-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(15, 118, 110, 0.36)"></stop><stop offset="100%" stop-color="rgba(15, 118, 110, 0.03)"></stop></linearGradient></defs><line${serverRenderer_cjs_prodExports.ssrRenderAttr("x1", padding.left)}${serverRenderer_cjs_prodExports.ssrRenderAttr("x2", width - padding.right)}${serverRenderer_cjs_prodExports.ssrRenderAttr("y1", padding.top + innerHeight)}${serverRenderer_cjs_prodExports.ssrRenderAttr("y2", padding.top + innerHeight)} stroke="rgba(24, 24, 27, 0.12)"></line><line${serverRenderer_cjs_prodExports.ssrRenderAttr("x1", padding.left)}${serverRenderer_cjs_prodExports.ssrRenderAttr("x2", width - padding.right)}${serverRenderer_cjs_prodExports.ssrRenderAttr("y1", padding.top)}${serverRenderer_cjs_prodExports.ssrRenderAttr("y2", padding.top)} stroke="rgba(24, 24, 27, 0.06)"></line><path${serverRenderer_cjs_prodExports.ssrRenderAttr("d", vueExports.unref(areaPath))} fill="url(#kpi-line-fill)"></path><path${serverRenderer_cjs_prodExports.ssrRenderAttr("d", vueExports.unref(linePath))} fill="none" stroke="#0f766e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(validPoints), (point) => {
          _push(`<circle${serverRenderer_cjs_prodExports.ssrRenderAttr("cx", getX(point.index))}${serverRenderer_cjs_prodExports.ssrRenderAttr("cy", getY(point.value))} r="4" fill="#0f766e" stroke="white" stroke-width="2"></circle>`);
        });
        _push(`<!--]--><text${serverRenderer_cjs_prodExports.ssrRenderAttr("x", padding.left)}${serverRenderer_cjs_prodExports.ssrRenderAttr("y", padding.top - 2)} fill="rgba(24, 24, 27, 0.58)" font-size="12">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(formatter)(vueExports.unref(maxValue)))}</text><text${serverRenderer_cjs_prodExports.ssrRenderAttr("x", padding.left)}${serverRenderer_cjs_prodExports.ssrRenderAttr("y", padding.top + innerHeight + 14)} fill="rgba(24, 24, 27, 0.58)" font-size="12">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(formatter)(vueExports.unref(minValue)))}</text><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(axisLabels), (axisLabel) => {
          _push(`<text${serverRenderer_cjs_prodExports.ssrRenderAttr("x", axisLabel.x)}${serverRenderer_cjs_prodExports.ssrRenderAttr("y", height - 10)} fill="rgba(24, 24, 27, 0.58)" font-size="12" text-anchor="middle">${serverRenderer_cjs_prodExports.ssrInterpolate(axisLabel.label)}</text>`);
        });
        _push(`<!--]--></svg>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/kpi/LineChart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "KpiLineChart" });
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MetricWidget",
  __ssrInlineRender: true,
  props: {
    descriptor: {},
    data: {},
    loading: { type: Boolean },
    error: {}
  },
  setup(__props) {
    const props = __props;
    function formatDuration(value) {
      if (value === null || Number.isNaN(value)) {
        return "—";
      }
      if (value >= 48) {
        return `${(value / 24).toFixed(1)}d`;
      }
      return `${value.toFixed(1)}h`;
    }
    function formatPercent(value) {
      return `${(value * 100).toFixed(0)}%`;
    }
    const summaryItems = vueExports.computed(() => {
      if (!props.data) {
        return [];
      }
      return [
        { label: "Average", value: formatDuration(props.data.summary.averageHours) },
        { label: "Median", value: formatDuration(props.data.summary.medianHours) },
        { label: "Min", value: formatDuration(props.data.summary.minHours) },
        { label: "Max", value: formatDuration(props.data.summary.maxHours) },
        { label: "Coverage", value: formatPercent(props.data.summary.coverageRate) },
        { label: "Users", value: `${props.data.summary.usersWithAiInteraction}/${props.data.summary.totalUsers}` }
      ];
    });
    const chartPoints = vueExports.computed(() => {
      if (!props.data) {
        return [];
      }
      return props.data.series.map((point) => ({
        label: formatBucketLabel(point.bucketStart, props.data.granularity),
        value: point.averageHours
      }));
    });
    function formatBucketLabel(value, granularity) {
      const date = /* @__PURE__ */ new Date(`${value}T00:00:00Z`);
      if (granularity === "month") {
        return new Intl.DateTimeFormat("en-GB", { month: "short", year: "2-digit" }).format(date);
      }
      if (granularity === "week") {
        return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(date);
      }
      return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(date);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_KpiLineChart = __nuxt_component_0;
      _push(`<section${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "kpi-panel rounded-[28px] overflow-hidden" }, _attrs))}><div class="px-6 py-5 border-b border-black/8"><div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between"><div><p class="text-xs uppercase tracking-[0.24em] text-zinc-500">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.descriptor.id)}</p><h2 class="text-2xl font-semibold text-zinc-950 mt-2">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.descriptor.label)}</h2><p class="text-sm text-zinc-600 mt-2 max-w-3xl">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.descriptor.description)}</p></div>`);
      if (__props.data) {
        _push(`<div class="rounded-2xl bg-teal-700 text-white px-4 py-3 min-w-52"><p class="text-xs uppercase tracking-[0.2em] text-white/70">Headline</p><p class="text-2xl font-semibold mt-2">${serverRenderer_cjs_prodExports.ssrInterpolate(formatDuration(__props.data.summary.averageHours))}</p><p class="text-sm text-white/72 mt-1">Avg time from estimated onboarding completion to first AI reply</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="px-6 py-6 space-y-6">`);
      if (__props.loading) {
        _push(`<div class="rounded-2xl border border-black/8 bg-white/70 px-4 py-10 text-center text-zinc-500"> Loading metric… </div>`);
      } else if (__props.error) {
        _push(`<div class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-5 text-rose-700">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.error)}</div>`);
      } else if (__props.data) {
        _push(`<!--[--><div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-6"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(summaryItems), (item) => {
          _push(`<div class="rounded-2xl border border-black/8 bg-white/72 px-4 py-4"><p class="text-xs uppercase tracking-[0.18em] text-zinc-500">${serverRenderer_cjs_prodExports.ssrInterpolate(item.label)}</p><p class="text-xl font-semibold text-zinc-950 mt-2">${serverRenderer_cjs_prodExports.ssrInterpolate(item.value)}</p></div>`);
        });
        _push(`<!--]--></div><div class="space-y-3"><div class="flex items-center justify-between gap-3"><div><p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Trend</p><h3 class="text-lg font-semibold text-zinc-950">Average time by signup cohort</h3></div><p class="text-sm text-zinc-500"> Start point = signup + ${serverRenderer_cjs_prodExports.ssrInterpolate(__props.data.onboardingOffsetMinutes)}m estimated onboarding buffer </p></div>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_KpiLineChart, {
          points: vueExports.unref(chartPoints),
          "value-formatter": (value) => formatDuration(value)
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/kpi/MetricWidget.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "KpiMetricWidget" });
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const availableMetrics = [
      {
        id: "first-ai-interaction",
        label: "Time to First AI Interaction",
        description: "Measures the time from estimated onboarding completion to the first successful AI-generated outgoing message."
      }
    ];
    const presetOptions = [
      { id: "30d", label: "30D", days: 30 },
      { id: "90d", label: "90D", days: 90 },
      { id: "180d", label: "180D", days: 180 },
      { id: "365d", label: "1Y", days: 365 },
      { id: "all", label: "All Time", days: null }
    ];
    const users = vueExports.ref([]);
    const userSearch = vueExports.ref("");
    const usersLoading = vueExports.ref(false);
    const usersError = vueExports.ref(null);
    const selectedMetricIds = vueExports.ref(["first-ai-interaction"]);
    const selectedUserIds = vueExports.ref([]);
    const startDate = vueExports.ref("");
    const endDate = vueExports.ref("");
    const activePreset = vueExports.ref("90d");
    const metricStates = vueExports.reactive({
      "first-ai-interaction": {
        loading: false,
        error: null,
        data: null
      }
    });
    let refreshTimeout = null;
    const filteredUsers = vueExports.computed(() => {
      const query = userSearch.value.trim().toLowerCase();
      if (!query) {
        return users.value;
      }
      return users.value.filter((user) => user.label.toLowerCase().includes(query));
    });
    const selectedMetricDescriptors = vueExports.computed(
      () => availableMetrics.filter((metric) => selectedMetricIds.value.includes(metric.id))
    );
    const allUsersSelected = vueExports.computed(
      () => users.value.length > 0 && selectedUserIds.value.length === users.value.length
    );
    function toDateInputValue(date) {
      return date.toISOString().slice(0, 10);
    }
    function applyPreset(days, presetId) {
      activePreset.value = presetId;
      if (days === null) {
        startDate.value = "";
        endDate.value = "";
        return;
      }
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      start.setUTCDate(end.getUTCDate() - (days - 1));
      startDate.value = toDateInputValue(start);
      endDate.value = toDateInputValue(end);
    }
    function selectAllUsers() {
      selectedUserIds.value = users.value.map((user) => user.id);
    }
    function resetUsersToAll() {
      selectedUserIds.value = users.value.map((user) => user.id);
    }
    function buildMetricQuery() {
      const query = {};
      if (startDate.value) {
        query.startDate = startDate.value;
      }
      if (endDate.value) {
        query.endDate = endDate.value;
      }
      if (selectedUserIds.value.length > 0 && selectedUserIds.value.length < users.value.length) {
        query.userIds = selectedUserIds.value.join(",");
      }
      return query;
    }
    async function fetchFirstAiInteractionMetric() {
      const state2 = metricStates["first-ai-interaction"];
      state2.loading = true;
      state2.error = null;
      try {
        state2.data = await $fetch(
          `${config.public.apiBase}/api/kpi/metrics/first-ai-interaction`,
          {
            query: buildMetricQuery()
          }
        );
      } catch (error) {
        state2.error = error?.data?.error || error?.message || "Failed to load metric";
        state2.data = null;
      } finally {
        state2.loading = false;
      }
    }
    async function refreshMetrics() {
      const loaders = selectedMetricIds.value.map(async (metricId) => {
        if (metricId === "first-ai-interaction") {
          await fetchFirstAiInteractionMetric();
        }
      });
      await Promise.all(loaders);
    }
    function queueRefresh() {
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
      refreshTimeout = setTimeout(() => {
        void refreshMetrics();
      }, 180);
    }
    vueExports.watch([startDate, endDate, selectedUserIds, selectedMetricIds], () => {
      if (usersLoading.value || usersError.value) {
        return;
      }
      queueRefresh();
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$4;
      const _component_UInput = _sfc_main$3;
      const _component_KpiMetricWidget = __nuxt_component_2;
      _push(`<main${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "kpi-shell px-4 py-5 md:px-6 lg:px-8" }, _attrs))}><div class="max-w-[1500px] mx-auto space-y-6"><section class="relative overflow-hidden rounded-[32px] kpi-panel"><div class="absolute inset-0 kpi-grid opacity-70"></div><div class="relative px-6 py-8 md:px-8 lg:px-10"><div class="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between"><div class="max-w-3xl"><p class="text-xs uppercase tracking-[0.28em] text-zinc-500">SoloOne KPI</p><h1 class="text-4xl md:text-5xl font-semibold text-zinc-950 mt-3"> KPI Dashboard </h1><p class="text-base md:text-lg text-zinc-600 mt-4 max-w-2xl"> One public page with shared filters, selectable metrics, and progressively added KPI widgets. </p></div><div class="grid gap-3 sm:grid-cols-3 min-w-full xl:min-w-[520px] xl:max-w-[560px]"><div class="rounded-2xl bg-white/72 border border-black/8 px-4 py-4"><p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Metrics Selected</p><p class="text-2xl font-semibold mt-2">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(selectedMetricIds).length)}</p></div><div class="rounded-2xl bg-white/72 border border-black/8 px-4 py-4"><p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Users in Scope</p><p class="text-2xl font-semibold mt-2">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(selectedUserIds).length || vueExports.unref(users).length)}</p></div><div class="rounded-2xl bg-white/72 border border-black/8 px-4 py-4"><p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Range</p><p class="text-base font-semibold mt-2">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(activePreset) === "custom" ? "Custom" : vueExports.unref(activePreset).toUpperCase())}</p></div></div></div></div></section><section class="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]"><aside class="space-y-6"><section class="kpi-panel rounded-[28px] px-5 py-5 space-y-4"><div><p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Global Filters</p><h2 class="text-xl font-semibold text-zinc-950 mt-2">Range</h2></div><div class="flex flex-wrap gap-2"><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(presetOptions, (preset) => {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          key: preset.id,
          variant: vueExports.unref(activePreset) === preset.id ? "solid" : "outline",
          color: "neutral",
          size: "sm",
          onClick: ($event) => applyPreset(preset.days, preset.id)
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${serverRenderer_cjs_prodExports.ssrInterpolate(preset.label)}`);
            } else {
              return [
                vueExports.createTextVNode(vueExports.toDisplayString(preset.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1"><label class="space-y-1.5"><span class="text-xs uppercase tracking-[0.16em] kpi-label">Start Date</span><input${serverRenderer_cjs_prodExports.ssrRenderAttr("value", vueExports.unref(startDate))} type="date" class="w-full rounded-xl border border-black/10 bg-white/78 px-3 py-2.5 outline-none"></label><label class="space-y-1.5"><span class="text-xs uppercase tracking-[0.16em] kpi-label">End Date</span><input${serverRenderer_cjs_prodExports.ssrRenderAttr("value", vueExports.unref(endDate))} type="date" class="w-full rounded-xl border border-black/10 bg-white/78 px-3 py-2.5 outline-none"></label></div></section><section class="kpi-panel rounded-[28px] px-5 py-5 space-y-4"><div class="flex items-start justify-between gap-3"><div><p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Global Filters</p><h2 class="text-xl font-semibold text-zinc-950 mt-2">Users</h2></div><div class="flex gap-2">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        variant: "outline",
        color: "neutral",
        size: "xs",
        onClick: selectAllUsers
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` All `);
          } else {
            return [
              vueExports.createTextVNode(" All ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        variant: "outline",
        color: "neutral",
        size: "xs",
        onClick: resetUsersToAll
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Reset `);
          } else {
            return [
              vueExports.createTextVNode(" Reset ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
        modelValue: vueExports.unref(userSearch),
        "onUpdate:modelValue": ($event) => vueExports.isRef(userSearch) ? userSearch.value = $event : null,
        icon: "i-lucide-search",
        placeholder: "Search users"
      }, null, _parent));
      if (vueExports.unref(usersLoading)) {
        _push(`<div class="rounded-2xl border border-black/8 bg-white/70 px-4 py-6 text-sm text-zinc-500"> Loading users… </div>`);
      } else if (vueExports.unref(usersError)) {
        _push(`<div class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(usersError))}</div>`);
      } else {
        _push(`<div class="rounded-2xl border border-black/8 bg-white/70 overflow-hidden"><div class="flex items-center justify-between px-4 py-3 border-b border-black/8 text-sm"><span class="text-zinc-600">Selected ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(selectedUserIds).length)} of ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(users).length)}</span>`);
        if (vueExports.unref(allUsersSelected)) {
          _push(`<span class="text-teal-700 font-medium"> All active users </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="max-h-72 overflow-y-auto px-3 py-2 space-y-1.5"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(filteredUsers), (user) => {
          _push(`<label class="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-zinc-100/80 cursor-pointer"><input${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(vueExports.unref(selectedUserIds).includes(user.id)) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-black/20"><span class="text-sm text-zinc-800">${serverRenderer_cjs_prodExports.ssrInterpolate(user.label)}</span></label>`);
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</section><section class="kpi-panel rounded-[28px] px-5 py-5 space-y-4"><div><p class="text-xs uppercase tracking-[0.18em] text-zinc-500">Display</p><h2 class="text-xl font-semibold text-zinc-950 mt-2">Metrics</h2></div><div class="space-y-2"><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(availableMetrics, (metric) => {
        _push(`<label class="block rounded-2xl border border-black/8 bg-white/72 px-4 py-3 cursor-pointer"><div class="flex items-start gap-3"><input${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(vueExports.unref(selectedMetricIds).includes(metric.id)) ? " checked" : ""} type="checkbox" class="mt-1 h-4 w-4 rounded border-black/20"><div><p class="font-medium text-zinc-950">${serverRenderer_cjs_prodExports.ssrInterpolate(metric.label)}</p><p class="text-sm text-zinc-600 mt-1">${serverRenderer_cjs_prodExports.ssrInterpolate(metric.description)}</p></div></div></label>`);
      });
      _push(`<!--]--></div></section></aside><div class="space-y-6"><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(selectedMetricDescriptors), (metric) => {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_KpiMetricWidget, {
          key: metric.id,
          descriptor: metric,
          data: vueExports.unref(metricStates)[metric.id]?.data ?? null,
          loading: vueExports.unref(metricStates)[metric.id]?.loading,
          error: vueExports.unref(metricStates)[metric.id]?.error
        }, null, _parent));
      });
      _push(`<!--]--></div></section></div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/index-CZgoMvLG');
//# sourceMappingURL=index-CZgoMvLG.mjs.map
