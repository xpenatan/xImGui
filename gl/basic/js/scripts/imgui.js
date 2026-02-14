var imgui = (() => {
    return async function(moduleArg = {}) {
        var Module = moduleArg;

        function assert(condition, text) {
          if (!condition) {
            abort('Assertion failed' + (text ? ': ' + text : ''));
          }
        }

        var libName = "imgui.wasm";
        var isSuccess = await window.idl.loadDynamicLibrary(libName, { loadAsync: true, global: true, nodelete: true});
        var rawExports = window.idl.LDSO.loadedLibsByName[libName].exports;

        const modifiedExports = {};
        for (const [key, value] of Object.entries(rawExports)) {
            modifiedExports['_' + key] = value;  
        }

        let evalCode = '';
        Object.keys(modifiedExports).forEach(key => {
          evalCode += `var ${key} = modifiedExports.${key}; `;
        });
        eval(evalCode);

        var runtimeInitialized = true;

function wrapPointer(ptr, __class__) {
  var cache = window.idl.getCache(__class__);
  var ret = cache[ptr];
  if (ret) return ret;
  ret = Object.create((__class__ || window.idl.WrapperObject).prototype);
  ret.ptr = ptr;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  
  delete window.idl.getCache(obj.__class__)[obj.ptr];
}
Module['destroy'] = destroy;

function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

var ensureCache = {
  buffer: 0,  
  size: 0,   
  pos: 0,    
  temps: [], 
  needed: 0, 

  prepare() {
    if (ensureCache.needed) {
      
      for (var i = 0; i < ensureCache.temps.length; i++) {
        Module['_webidl_free'](ensureCache.temps[i]);
      }
      ensureCache.temps.length = 0;
      
      Module['_webidl_free'](ensureCache.buffer);
      ensureCache.buffer = 0;
      ensureCache.size += ensureCache.needed;
      
      ensureCache.needed = 0;
    }
    if (!ensureCache.buffer) { 
      ensureCache.size += 128; 
      ensureCache.buffer = Module['_webidl_malloc'](ensureCache.size);
      assert(ensureCache.buffer);
    }
    ensureCache.pos = 0;
  },
  alloc(array, view) {
    assert(ensureCache.buffer);
    var bytes = view.BYTES_PER_ELEMENT;
    var len = array.length * bytes;
    len = window.idl.alignMemory(len, 8); 
    var ret;
    if (ensureCache.pos + len >= ensureCache.size) {
      
      assert(len > 0); 
      ensureCache.needed += len;
      ret = Module['_webidl_malloc'](len);
      ensureCache.temps.push(ret);
    } else {
      
      ret = ensureCache.buffer + ensureCache.pos;
      ensureCache.pos += len;
    }
    return ret;
  },
};

function ensureString(value) {
  if (typeof value === 'string') {
    var intArray = window.idl.intArrayFromString(value);
    var offset = ensureCache.alloc(intArray, window.idl.HEAP8);
    for (var i = 0; i < intArray.length; i++) {
      window.idl.HEAP8[offset + i] = intArray[i];
    }
    return offset;
  }
  return value;
}

function ensureInt8(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, window.idl.HEAP8);
    for (var i = 0; i < value.length; i++) {
      window.idl.HEAP8[offset + i] = value[i];
    }
    return offset;
  }
  return value;
}

function ensureInt16(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, window.idl.HEAP16);
    var heapOffset = offset / 2;
    for (var i = 0; i < value.length; i++) {
      window.idl.HEAP16[heapOffset + i] = value[i];
    }
    return offset;
  }
  return value;
}

function ensureInt32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, window.idl.HEAP32);
    var heapOffset = offset / 4;
    for (var i = 0; i < value.length; i++) {
      window.idl.HEAP32[heapOffset + i] = value[i];
    }
    return offset;
  }
  return value;
}

function ensureFloat32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, window.idl.HEAPF32);
    var heapOffset = offset / 4;
    for (var i = 0; i < value.length; i++) {
      window.idl.HEAPF32[heapOffset + i] = value[i];
    }
    return offset;
  }
  return value;
}

function ensureFloat64(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, window.idl.HEAPF64);
    var heapOffset = offset / 8;
    for (var i = 0; i < value.length; i++) {
      window.idl.HEAPF64[heapOffset + i] = value[i];
    }
    return offset;
  }
  return value;
}

function IDLArray() { throw "cannot construct a IDLArray, no constructor in IDL" }
IDLArray.prototype = Object.create(window.idl.WrapperObject.prototype);
IDLArray.prototype.constructor = IDLArray;
IDLArray.prototype.__class__ = IDLArray;
IDLArray.__cache__ = {};
Module['IDLArray'] = IDLArray;

IDLArray.prototype['clear'] = IDLArray.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLArray_clear_0(self);
};

IDLArray.prototype['getSize'] = IDLArray.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLArray_getSize_0(self);
};

IDLArray.prototype['resize'] = IDLArray.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLArray_resize_1(self, size);
};

IDLArray.prototype['ownsDataAddress'] = IDLArray.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLArray_ownsDataAddress_0(self));
};

IDLArray.prototype['getVoidData'] = IDLArray.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLArray_getVoidData_0(self);
};

function ClipboardTextFunction() { throw "cannot construct a ClipboardTextFunction, no constructor in IDL" }
ClipboardTextFunction.prototype = Object.create(window.idl.WrapperObject.prototype);
ClipboardTextFunction.prototype.constructor = ClipboardTextFunction;
ClipboardTextFunction.prototype.__class__ = ClipboardTextFunction;
ClipboardTextFunction.__cache__ = {};
Module['ClipboardTextFunction'] = ClipboardTextFunction;

ClipboardTextFunction.prototype['setClipboardTextFunction'] = ClipboardTextFunction.prototype.setClipboardTextFunction = function(io, clipboardFunction) {
  if (io && typeof io === 'object') io = io.ptr;
  if (clipboardFunction && typeof clipboardFunction === 'object') clipboardFunction = clipboardFunction.ptr;
  _emscripten_bind_ClipboardTextFunction_setClipboardTextFunction_2(io, clipboardFunction);
};

ClipboardTextFunction.prototype['__destroy__'] = ClipboardTextFunction.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ClipboardTextFunction___destroy___0(self);
};

function IDLBoolArray(size) {
  if (size && typeof size === 'object') size = size.ptr;
  this.ptr = _emscripten_bind_IDLBoolArray_IDLBoolArray_1(size);
  window.idl.getCache(IDLBoolArray)[this.ptr] = this;
};

IDLBoolArray.prototype = Object.create(IDLArray.prototype);
IDLBoolArray.prototype.constructor = IDLBoolArray;
IDLBoolArray.prototype.__class__ = IDLBoolArray;
IDLBoolArray.__cache__ = {};
Module['IDLBoolArray'] = IDLBoolArray;

IDLBoolArray.prototype['getValue'] = IDLBoolArray.prototype.getValue = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return !!(_emscripten_bind_IDLBoolArray_getValue_1(self, index));
};

IDLBoolArray.prototype['setValue'] = IDLBoolArray.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLBoolArray_setValue_2(self, index, value);
};

IDLBoolArray.prototype['copy'] = IDLBoolArray.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLBoolArray_copy_4(self, src, srcOffset, destOffset, length);
};

IDLBoolArray.prototype['clear'] = IDLBoolArray.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLBoolArray_clear_0(self);
};

IDLBoolArray.prototype['getSize'] = IDLBoolArray.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLBoolArray_getSize_0(self);
};

IDLBoolArray.prototype['resize'] = IDLBoolArray.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLBoolArray_resize_1(self, size);
};

IDLBoolArray.prototype['ownsDataAddress'] = IDLBoolArray.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLBoolArray_ownsDataAddress_0(self));
};

IDLBoolArray.prototype['getVoidData'] = IDLBoolArray.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLBoolArray_getVoidData_0(self);
};

IDLBoolArray.prototype['__destroy__'] = IDLBoolArray.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLBoolArray___destroy___0(self);
};

function IDLIntArray(size) {
  if (size && typeof size === 'object') size = size.ptr;
  this.ptr = _emscripten_bind_IDLIntArray_IDLIntArray_1(size);
  window.idl.getCache(IDLIntArray)[this.ptr] = this;
};

IDLIntArray.prototype = Object.create(IDLArray.prototype);
IDLIntArray.prototype.constructor = IDLIntArray;
IDLIntArray.prototype.__class__ = IDLIntArray;
IDLIntArray.__cache__ = {};
Module['IDLIntArray'] = IDLIntArray;

IDLIntArray.prototype['getValue'] = IDLIntArray.prototype.getValue = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_IDLIntArray_getValue_1(self, index);
};

IDLIntArray.prototype['setValue'] = IDLIntArray.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLIntArray_setValue_2(self, index, value);
};

IDLIntArray.prototype['copy'] = IDLIntArray.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLIntArray_copy_4(self, src, srcOffset, destOffset, length);
};

IDLIntArray.prototype['clear'] = IDLIntArray.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLIntArray_clear_0(self);
};

IDLIntArray.prototype['getSize'] = IDLIntArray.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLIntArray_getSize_0(self);
};

IDLIntArray.prototype['resize'] = IDLIntArray.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLIntArray_resize_1(self, size);
};

IDLIntArray.prototype['ownsDataAddress'] = IDLIntArray.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLIntArray_ownsDataAddress_0(self));
};

IDLIntArray.prototype['getVoidData'] = IDLIntArray.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLIntArray_getVoidData_0(self);
};

IDLIntArray.prototype['__destroy__'] = IDLIntArray.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLIntArray___destroy___0(self);
};

function IDLLongArray(size) {
  if (size && typeof size === 'object') size = size.ptr;
  this.ptr = _emscripten_bind_IDLLongArray_IDLLongArray_1(size);
  window.idl.getCache(IDLLongArray)[this.ptr] = this;
};

IDLLongArray.prototype = Object.create(IDLArray.prototype);
IDLLongArray.prototype.constructor = IDLLongArray;
IDLLongArray.prototype.__class__ = IDLLongArray;
IDLLongArray.__cache__ = {};
Module['IDLLongArray'] = IDLLongArray;

IDLLongArray.prototype['getValue'] = IDLLongArray.prototype.getValue = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_IDLLongArray_getValue_1(self, index);
};

IDLLongArray.prototype['setValue'] = IDLLongArray.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLLongArray_setValue_2(self, index, value);
};

IDLLongArray.prototype['copy'] = IDLLongArray.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLLongArray_copy_4(self, src, srcOffset, destOffset, length);
};

IDLLongArray.prototype['clear'] = IDLLongArray.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLLongArray_clear_0(self);
};

IDLLongArray.prototype['getSize'] = IDLLongArray.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLongArray_getSize_0(self);
};

IDLLongArray.prototype['resize'] = IDLLongArray.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLLongArray_resize_1(self, size);
};

IDLLongArray.prototype['ownsDataAddress'] = IDLLongArray.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLLongArray_ownsDataAddress_0(self));
};

IDLLongArray.prototype['getVoidData'] = IDLLongArray.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLongArray_getVoidData_0(self);
};

IDLLongArray.prototype['__destroy__'] = IDLLongArray.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLLongArray___destroy___0(self);
};

function IDLFloatArray(size) {
  if (size && typeof size === 'object') size = size.ptr;
  this.ptr = _emscripten_bind_IDLFloatArray_IDLFloatArray_1(size);
  window.idl.getCache(IDLFloatArray)[this.ptr] = this;
};

IDLFloatArray.prototype = Object.create(IDLArray.prototype);
IDLFloatArray.prototype.constructor = IDLFloatArray;
IDLFloatArray.prototype.__class__ = IDLFloatArray;
IDLFloatArray.__cache__ = {};
Module['IDLFloatArray'] = IDLFloatArray;

IDLFloatArray.prototype['getValue'] = IDLFloatArray.prototype.getValue = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_IDLFloatArray_getValue_1(self, index);
};

IDLFloatArray.prototype['setValue'] = IDLFloatArray.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLFloatArray_setValue_2(self, index, value);
};

IDLFloatArray.prototype['copy'] = IDLFloatArray.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLFloatArray_copy_4(self, src, srcOffset, destOffset, length);
};

IDLFloatArray.prototype['clear'] = IDLFloatArray.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLFloatArray_clear_0(self);
};

IDLFloatArray.prototype['getSize'] = IDLFloatArray.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloatArray_getSize_0(self);
};

IDLFloatArray.prototype['resize'] = IDLFloatArray.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLFloatArray_resize_1(self, size);
};

IDLFloatArray.prototype['ownsDataAddress'] = IDLFloatArray.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLFloatArray_ownsDataAddress_0(self));
};

IDLFloatArray.prototype['getVoidData'] = IDLFloatArray.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloatArray_getVoidData_0(self);
};

IDLFloatArray.prototype['__destroy__'] = IDLFloatArray.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLFloatArray___destroy___0(self);
};

function IDLDoubleArray(size) {
  if (size && typeof size === 'object') size = size.ptr;
  this.ptr = _emscripten_bind_IDLDoubleArray_IDLDoubleArray_1(size);
  window.idl.getCache(IDLDoubleArray)[this.ptr] = this;
};

IDLDoubleArray.prototype = Object.create(IDLArray.prototype);
IDLDoubleArray.prototype.constructor = IDLDoubleArray;
IDLDoubleArray.prototype.__class__ = IDLDoubleArray;
IDLDoubleArray.__cache__ = {};
Module['IDLDoubleArray'] = IDLDoubleArray;

IDLDoubleArray.prototype['getValue'] = IDLDoubleArray.prototype.getValue = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_IDLDoubleArray_getValue_1(self, index);
};

IDLDoubleArray.prototype['setValue'] = IDLDoubleArray.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLDoubleArray_setValue_2(self, index, value);
};

IDLDoubleArray.prototype['copy'] = IDLDoubleArray.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLDoubleArray_copy_4(self, src, srcOffset, destOffset, length);
};

IDLDoubleArray.prototype['clear'] = IDLDoubleArray.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLDoubleArray_clear_0(self);
};

IDLDoubleArray.prototype['getSize'] = IDLDoubleArray.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDoubleArray_getSize_0(self);
};

IDLDoubleArray.prototype['resize'] = IDLDoubleArray.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLDoubleArray_resize_1(self, size);
};

IDLDoubleArray.prototype['ownsDataAddress'] = IDLDoubleArray.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLDoubleArray_ownsDataAddress_0(self));
};

IDLDoubleArray.prototype['getVoidData'] = IDLDoubleArray.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDoubleArray_getVoidData_0(self);
};

IDLDoubleArray.prototype['__destroy__'] = IDLDoubleArray.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLDoubleArray___destroy___0(self);
};

function IDLByteArray(size) {
  if (size && typeof size === 'object') size = size.ptr;
  this.ptr = _emscripten_bind_IDLByteArray_IDLByteArray_1(size);
  window.idl.getCache(IDLByteArray)[this.ptr] = this;
};

IDLByteArray.prototype = Object.create(IDLArray.prototype);
IDLByteArray.prototype.constructor = IDLByteArray;
IDLByteArray.prototype.__class__ = IDLByteArray;
IDLByteArray.__cache__ = {};
Module['IDLByteArray'] = IDLByteArray;

IDLByteArray.prototype['getValue'] = IDLByteArray.prototype.getValue = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_IDLByteArray_getValue_1(self, index);
};

IDLByteArray.prototype['setValue'] = IDLByteArray.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLByteArray_setValue_2(self, index, value);
};

IDLByteArray.prototype['copy'] = IDLByteArray.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLByteArray_copy_4(self, src, srcOffset, destOffset, length);
};

IDLByteArray.prototype['clear'] = IDLByteArray.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLByteArray_clear_0(self);
};

IDLByteArray.prototype['getSize'] = IDLByteArray.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLByteArray_getSize_0(self);
};

IDLByteArray.prototype['resize'] = IDLByteArray.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLByteArray_resize_1(self, size);
};

IDLByteArray.prototype['ownsDataAddress'] = IDLByteArray.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLByteArray_ownsDataAddress_0(self));
};

IDLByteArray.prototype['getVoidData'] = IDLByteArray.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLByteArray_getVoidData_0(self);
};

IDLByteArray.prototype['__destroy__'] = IDLByteArray.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLByteArray___destroy___0(self);
};

function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(window.idl.WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

VoidPtr.prototype['__destroy__'] = VoidPtr.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
};

function ImTextureIDRef(value) {
  if (value && typeof value === 'object') value = value.ptr;
  if (value === undefined) { this.ptr = _emscripten_bind_ImTextureIDRef_ImTextureIDRef_0(); window.idl.getCache(ImTextureIDRef)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_ImTextureIDRef_ImTextureIDRef_1(value);
  window.idl.getCache(ImTextureIDRef)[this.ptr] = this;
};

ImTextureIDRef.prototype = Object.create(window.idl.WrapperObject.prototype);
ImTextureIDRef.prototype.constructor = ImTextureIDRef;
ImTextureIDRef.prototype.__class__ = ImTextureIDRef;
ImTextureIDRef.__cache__ = {};
Module['ImTextureIDRef'] = ImTextureIDRef;

ImTextureIDRef.prototype['Get'] = ImTextureIDRef.prototype.Get = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureIDRef_Get_0(self);
};

ImTextureIDRef.prototype['__destroy__'] = ImTextureIDRef.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImTextureIDRef___destroy___0(self);
};

function ImTemp() { throw "cannot construct a ImTemp, no constructor in IDL" }
ImTemp.prototype = Object.create(window.idl.WrapperObject.prototype);
ImTemp.prototype.constructor = ImTemp;
ImTemp.prototype.__class__ = ImTemp;
ImTemp.__cache__ = {};
Module['ImTemp'] = ImTemp;

ImTemp.prototype['ImTextureIDRef_1__0'] = ImTemp.prototype.ImTextureIDRef_1__0 = function(textureId) {
  if (textureId && typeof textureId === 'object') textureId = textureId.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImTextureIDRef_1__0_1(textureId), ImTextureIDRef);
};

ImTemp.prototype['ImTextureRef_1__0'] = ImTemp.prototype.ImTextureRef_1__0 = function(textureId) {
  if (textureId && typeof textureId === 'object') textureId = textureId.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImTextureRef_1__0_1(textureId), ImTextureRef);
};

ImTemp.prototype['ImTextureRef_2__0'] = ImTemp.prototype.ImTextureRef_2__0 = function(textureId) {
  if (textureId && typeof textureId === 'object') textureId = textureId.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImTextureRef_2__0_1(textureId), ImTextureRef);
};

ImTemp.prototype['ImTextureRef_3__0'] = ImTemp.prototype.ImTextureRef_3__0 = function(textureId) {
  if (textureId && typeof textureId === 'object') textureId = textureId.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImTextureRef_3__0_1(textureId), ImTextureRef);
};

ImTemp.prototype['ImVec2_1__0'] = ImTemp.prototype.ImVec2_1__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_1__0_0(), ImVec2);
};

ImTemp.prototype['ImVec2_1__1'] = ImTemp.prototype.ImVec2_1__1 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_1__1_2(x, y), ImVec2);
};

ImTemp.prototype['ImVec2_1__2'] = ImTemp.prototype.ImVec2_1__2 = function(other) {
  if (other && typeof other === 'object') other = other.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_1__2_1(other), ImVec2);
};

ImTemp.prototype['ImVec2_2__0'] = ImTemp.prototype.ImVec2_2__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_2__0_0(), ImVec2);
};

ImTemp.prototype['ImVec2_2__1'] = ImTemp.prototype.ImVec2_2__1 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_2__1_2(x, y), ImVec2);
};

ImTemp.prototype['ImVec2_2__2'] = ImTemp.prototype.ImVec2_2__2 = function(other) {
  if (other && typeof other === 'object') other = other.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_2__2_1(other), ImVec2);
};

ImTemp.prototype['ImVec2_3__0'] = ImTemp.prototype.ImVec2_3__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_3__0_0(), ImVec2);
};

ImTemp.prototype['ImVec2_3__1'] = ImTemp.prototype.ImVec2_3__1 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_3__1_2(x, y), ImVec2);
};

ImTemp.prototype['ImVec2_3__2'] = ImTemp.prototype.ImVec2_3__2 = function(other) {
  if (other && typeof other === 'object') other = other.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_3__2_1(other), ImVec2);
};

ImTemp.prototype['ImVec2_4__0'] = ImTemp.prototype.ImVec2_4__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_4__0_0(), ImVec2);
};

ImTemp.prototype['ImVec2_4__1'] = ImTemp.prototype.ImVec2_4__1 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_4__1_2(x, y), ImVec2);
};

ImTemp.prototype['ImVec2_4__2'] = ImTemp.prototype.ImVec2_4__2 = function(other) {
  if (other && typeof other === 'object') other = other.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec2_4__2_1(other), ImVec2);
};

ImTemp.prototype['ImVec4_1__0'] = ImTemp.prototype.ImVec4_1__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_1__0_0(), ImVec4);
};

ImTemp.prototype['ImVec4_1__1'] = ImTemp.prototype.ImVec4_1__1 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_1__1_4(x, y, z, w), ImVec4);
};

ImTemp.prototype['ImVec4_1__2'] = ImTemp.prototype.ImVec4_1__2 = function(other) {
  if (other && typeof other === 'object') other = other.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_1__2_1(other), ImVec4);
};

ImTemp.prototype['ImVec4_2__0'] = ImTemp.prototype.ImVec4_2__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_2__0_0(), ImVec4);
};

ImTemp.prototype['ImVec4_2__1'] = ImTemp.prototype.ImVec4_2__1 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_2__1_4(x, y, z, w), ImVec4);
};

ImTemp.prototype['ImVec4_2__2'] = ImTemp.prototype.ImVec4_2__2 = function(other) {
  if (other && typeof other === 'object') other = other.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_2__2_1(other), ImVec4);
};

ImTemp.prototype['ImVec4_3__0'] = ImTemp.prototype.ImVec4_3__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_3__0_0(), ImVec4);
};

ImTemp.prototype['ImVec4_3__1'] = ImTemp.prototype.ImVec4_3__1 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_3__1_4(x, y, z, w), ImVec4);
};

ImTemp.prototype['ImVec4_3__2'] = ImTemp.prototype.ImVec4_3__2 = function(other) {
  if (other && typeof other === 'object') other = other.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_3__2_1(other), ImVec4);
};

ImTemp.prototype['ImVec4_4__0'] = ImTemp.prototype.ImVec4_4__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_4__0_0(), ImVec4);
};

ImTemp.prototype['ImVec4_4__1'] = ImTemp.prototype.ImVec4_4__1 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_4__1_4(x, y, z, w), ImVec4);
};

ImTemp.prototype['ImVec4_4__2'] = ImTemp.prototype.ImVec4_4__2 = function(other) {
  if (other && typeof other === 'object') other = other.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImVec4_4__2_1(other), ImVec4);
};

ImTemp.prototype['ImRect_1__0'] = ImTemp.prototype.ImRect_1__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_1__0_0(), ImRect);
};

ImTemp.prototype['ImRect_1__1'] = ImTemp.prototype.ImRect_1__1 = function(minX, minY, maxX, maxY) {
  if (minX && typeof minX === 'object') minX = minX.ptr;
  if (minY && typeof minY === 'object') minY = minY.ptr;
  if (maxX && typeof maxX === 'object') maxX = maxX.ptr;
  if (maxY && typeof maxY === 'object') maxY = maxY.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_1__1_4(minX, minY, maxX, maxY), ImRect);
};

ImTemp.prototype['ImRect_1__2'] = ImTemp.prototype.ImRect_1__2 = function(min, max) {
  if (min && typeof min === 'object') min = min.ptr;
  if (max && typeof max === 'object') max = max.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_1__2_2(min, max), ImRect);
};

ImTemp.prototype['ImRect_2__0'] = ImTemp.prototype.ImRect_2__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_2__0_0(), ImRect);
};

ImTemp.prototype['ImRect_2__1'] = ImTemp.prototype.ImRect_2__1 = function(minX, minY, maxX, maxY) {
  if (minX && typeof minX === 'object') minX = minX.ptr;
  if (minY && typeof minY === 'object') minY = minY.ptr;
  if (maxX && typeof maxX === 'object') maxX = maxX.ptr;
  if (maxY && typeof maxY === 'object') maxY = maxY.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_2__1_4(minX, minY, maxX, maxY), ImRect);
};

ImTemp.prototype['ImRect_2__2'] = ImTemp.prototype.ImRect_2__2 = function(min, max) {
  if (min && typeof min === 'object') min = min.ptr;
  if (max && typeof max === 'object') max = max.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_2__2_2(min, max), ImRect);
};

ImTemp.prototype['ImRect_3__0'] = ImTemp.prototype.ImRect_3__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_3__0_0(), ImRect);
};

ImTemp.prototype['ImRect_3__1'] = ImTemp.prototype.ImRect_3__1 = function(minX, minY, maxX, maxY) {
  if (minX && typeof minX === 'object') minX = minX.ptr;
  if (minY && typeof minY === 'object') minY = minY.ptr;
  if (maxX && typeof maxX === 'object') maxX = maxX.ptr;
  if (maxY && typeof maxY === 'object') maxY = maxY.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_3__1_4(minX, minY, maxX, maxY), ImRect);
};

ImTemp.prototype['ImRect_3__2'] = ImTemp.prototype.ImRect_3__2 = function(min, max) {
  if (min && typeof min === 'object') min = min.ptr;
  if (max && typeof max === 'object') max = max.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_3__2_2(min, max), ImRect);
};

ImTemp.prototype['ImRect_4__0'] = ImTemp.prototype.ImRect_4__0 = function() {
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_4__0_0(), ImRect);
};

ImTemp.prototype['ImRect_4__1'] = ImTemp.prototype.ImRect_4__1 = function(minX, minY, maxX, maxY) {
  if (minX && typeof minX === 'object') minX = minX.ptr;
  if (minY && typeof minY === 'object') minY = minY.ptr;
  if (maxX && typeof maxX === 'object') maxX = maxX.ptr;
  if (maxY && typeof maxY === 'object') maxY = maxY.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_4__1_4(minX, minY, maxX, maxY), ImRect);
};

ImTemp.prototype['ImRect_4__2'] = ImTemp.prototype.ImRect_4__2 = function(min, max) {
  if (min && typeof min === 'object') min = min.ptr;
  if (max && typeof max === 'object') max = max.ptr;
  return wrapPointer(_emscripten_bind_ImTemp_ImRect_4__2_2(min, max), ImRect);
};

function ImGuiInternal() { throw "cannot construct a ImGuiInternal, no constructor in IDL" }
ImGuiInternal.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiInternal.prototype.constructor = ImGuiInternal;
ImGuiInternal.prototype.__class__ = ImGuiInternal;
ImGuiInternal.__cache__ = {};
Module['ImGuiInternal'] = ImGuiInternal;

ImGuiInternal.prototype['ImHashData__0'] = ImGuiInternal.prototype.ImHashData__0 = function(data, data_size, seed) {
  if (data && typeof data === 'object') data = data.ptr;
  if (data_size && typeof data_size === 'object') data_size = data_size.ptr;
  if (seed && typeof seed === 'object') seed = seed.ptr;
  if (seed === undefined) { return _emscripten_bind_ImGuiInternal_ImHashData__0_2(data, data_size) }
  return _emscripten_bind_ImGuiInternal_ImHashData__0_3(data, data_size, seed);
};

ImGuiInternal.prototype['ImHashStr__0'] = ImGuiInternal.prototype.ImHashStr__0 = function(data, data_size, seed) {
  ensureCache.prepare();
  if (data && typeof data === 'object') data = data.ptr;
  else data = ensureString(data);
  if (data_size && typeof data_size === 'object') data_size = data_size.ptr;
  if (seed && typeof seed === 'object') seed = seed.ptr;
  if (data_size === undefined) { return _emscripten_bind_ImGuiInternal_ImHashStr__0_1(data) }
  if (seed === undefined) { return _emscripten_bind_ImGuiInternal_ImHashStr__0_2(data, data_size) }
  return _emscripten_bind_ImGuiInternal_ImHashStr__0_3(data, data_size, seed);
};

ImGuiInternal.prototype['GetCurrentWindowRead'] = ImGuiInternal.prototype.GetCurrentWindowRead = function() {
  return wrapPointer(_emscripten_bind_ImGuiInternal_GetCurrentWindowRead_0(), ImGuiWindow);
};

ImGuiInternal.prototype['GetCurrentWindow'] = ImGuiInternal.prototype.GetCurrentWindow = function() {
  return wrapPointer(_emscripten_bind_ImGuiInternal_GetCurrentWindow_0(), ImGuiWindow);
};

ImGuiInternal.prototype['FindWindowByID'] = ImGuiInternal.prototype.FindWindowByID = function(id) {
  if (id && typeof id === 'object') id = id.ptr;
  return wrapPointer(_emscripten_bind_ImGuiInternal_FindWindowByID_1(id), ImGuiWindow);
};

ImGuiInternal.prototype['FindWindowByName'] = ImGuiInternal.prototype.FindWindowByName = function(name) {
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  return wrapPointer(_emscripten_bind_ImGuiInternal_FindWindowByName_1(name), ImGuiWindow);
};

ImGuiInternal.prototype['UpdateWindowParentAndRootLinks'] = ImGuiInternal.prototype.UpdateWindowParentAndRootLinks = function(window, flags, parent_window) {
  if (window && typeof window === 'object') window = window.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (parent_window && typeof parent_window === 'object') parent_window = parent_window.ptr;
  _emscripten_bind_ImGuiInternal_UpdateWindowParentAndRootLinks_3(window, flags, parent_window);
};

ImGuiInternal.prototype['UpdateWindowSkipRefresh'] = ImGuiInternal.prototype.UpdateWindowSkipRefresh = function(window) {
  if (window && typeof window === 'object') window = window.ptr;
  _emscripten_bind_ImGuiInternal_UpdateWindowSkipRefresh_1(window);
};

ImGuiInternal.prototype['CalcWindowNextAutoFitSize'] = ImGuiInternal.prototype.CalcWindowNextAutoFitSize = function(window) {
  if (window && typeof window === 'object') window = window.ptr;
  return wrapPointer(_emscripten_bind_ImGuiInternal_CalcWindowNextAutoFitSize_1(window), ImVec2);
};

ImGuiInternal.prototype['IsWindowChildOf'] = ImGuiInternal.prototype.IsWindowChildOf = function(window, potential_parent, popup_hierarchy, dock_hierarchy) {
  if (window && typeof window === 'object') window = window.ptr;
  if (potential_parent && typeof potential_parent === 'object') potential_parent = potential_parent.ptr;
  if (popup_hierarchy && typeof popup_hierarchy === 'object') popup_hierarchy = popup_hierarchy.ptr;
  if (dock_hierarchy && typeof dock_hierarchy === 'object') dock_hierarchy = dock_hierarchy.ptr;
  return !!(_emscripten_bind_ImGuiInternal_IsWindowChildOf_4(window, potential_parent, popup_hierarchy, dock_hierarchy));
};

ImGuiInternal.prototype['IsWindowWithinBeginStackOf'] = ImGuiInternal.prototype.IsWindowWithinBeginStackOf = function(window, potential_parent) {
  if (window && typeof window === 'object') window = window.ptr;
  if (potential_parent && typeof potential_parent === 'object') potential_parent = potential_parent.ptr;
  return !!(_emscripten_bind_ImGuiInternal_IsWindowWithinBeginStackOf_2(window, potential_parent));
};

ImGuiInternal.prototype['IsWindowAbove'] = ImGuiInternal.prototype.IsWindowAbove = function(potential_above, potential_below) {
  if (potential_above && typeof potential_above === 'object') potential_above = potential_above.ptr;
  if (potential_below && typeof potential_below === 'object') potential_below = potential_below.ptr;
  return !!(_emscripten_bind_ImGuiInternal_IsWindowAbove_2(potential_above, potential_below));
};

ImGuiInternal.prototype['IsWindowNavFocusable'] = ImGuiInternal.prototype.IsWindowNavFocusable = function(window) {
  if (window && typeof window === 'object') window = window.ptr;
  return !!(_emscripten_bind_ImGuiInternal_IsWindowNavFocusable_1(window));
};

ImGuiInternal.prototype['SetWindowPos'] = ImGuiInternal.prototype.SetWindowPos = function(window, pos, cond) {
  if (window && typeof window === 'object') window = window.ptr;
  if (pos && typeof pos === 'object') pos = pos.ptr;
  if (cond && typeof cond === 'object') cond = cond.ptr;
  if (cond === undefined) { _emscripten_bind_ImGuiInternal_SetWindowPos_2(window, pos); return }
  _emscripten_bind_ImGuiInternal_SetWindowPos_3(window, pos, cond);
};

ImGuiInternal.prototype['SetWindowSize'] = ImGuiInternal.prototype.SetWindowSize = function(window, size, cond) {
  if (window && typeof window === 'object') window = window.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  if (cond && typeof cond === 'object') cond = cond.ptr;
  if (cond === undefined) { _emscripten_bind_ImGuiInternal_SetWindowSize_2(window, size); return }
  _emscripten_bind_ImGuiInternal_SetWindowSize_3(window, size, cond);
};

ImGuiInternal.prototype['SetWindowCollapsed'] = ImGuiInternal.prototype.SetWindowCollapsed = function(window, collapsed, cond) {
  if (window && typeof window === 'object') window = window.ptr;
  if (collapsed && typeof collapsed === 'object') collapsed = collapsed.ptr;
  if (cond && typeof cond === 'object') cond = cond.ptr;
  if (cond === undefined) { _emscripten_bind_ImGuiInternal_SetWindowCollapsed_2(window, collapsed); return }
  _emscripten_bind_ImGuiInternal_SetWindowCollapsed_3(window, collapsed, cond);
};

ImGuiInternal.prototype['SetWindowHitTestHole'] = ImGuiInternal.prototype.SetWindowHitTestHole = function(window, pos, size) {
  if (window && typeof window === 'object') window = window.ptr;
  if (pos && typeof pos === 'object') pos = pos.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_ImGuiInternal_SetWindowHitTestHole_3(window, pos, size);
};

ImGuiInternal.prototype['SetWindowHiddenAndSkipItemsForCurrentFrame'] = ImGuiInternal.prototype.SetWindowHiddenAndSkipItemsForCurrentFrame = function(window) {
  if (window && typeof window === 'object') window = window.ptr;
  _emscripten_bind_ImGuiInternal_SetWindowHiddenAndSkipItemsForCurrentFrame_1(window);
};

ImGuiInternal.prototype['SetWindowParentWindowForFocusRoute'] = ImGuiInternal.prototype.SetWindowParentWindowForFocusRoute = function(window, parent_window) {
  if (window && typeof window === 'object') window = window.ptr;
  if (parent_window && typeof parent_window === 'object') parent_window = parent_window.ptr;
  _emscripten_bind_ImGuiInternal_SetWindowParentWindowForFocusRoute_2(window, parent_window);
};

ImGuiInternal.prototype['WindowRectAbsToRel'] = ImGuiInternal.prototype.WindowRectAbsToRel = function(window, r) {
  if (window && typeof window === 'object') window = window.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  return wrapPointer(_emscripten_bind_ImGuiInternal_WindowRectAbsToRel_2(window, r), ImRect);
};

ImGuiInternal.prototype['WindowRectRelToAbs'] = ImGuiInternal.prototype.WindowRectRelToAbs = function(window, r) {
  if (window && typeof window === 'object') window = window.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  return wrapPointer(_emscripten_bind_ImGuiInternal_WindowRectRelToAbs_2(window, r), ImRect);
};

ImGuiInternal.prototype['WindowPosAbsToRel'] = ImGuiInternal.prototype.WindowPosAbsToRel = function(window, p) {
  if (window && typeof window === 'object') window = window.ptr;
  if (p && typeof p === 'object') p = p.ptr;
  return wrapPointer(_emscripten_bind_ImGuiInternal_WindowPosAbsToRel_2(window, p), ImVec2);
};

ImGuiInternal.prototype['WindowPosRelToAbs'] = ImGuiInternal.prototype.WindowPosRelToAbs = function(window, p) {
  if (window && typeof window === 'object') window = window.ptr;
  if (p && typeof p === 'object') p = p.ptr;
  return wrapPointer(_emscripten_bind_ImGuiInternal_WindowPosRelToAbs_2(window, p), ImVec2);
};

ImGuiInternal.prototype['FocusWindow'] = ImGuiInternal.prototype.FocusWindow = function(window, flags) {
  if (window && typeof window === 'object') window = window.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { _emscripten_bind_ImGuiInternal_FocusWindow_1(window); return }
  _emscripten_bind_ImGuiInternal_FocusWindow_2(window, flags);
};

ImGuiInternal.prototype['FocusTopMostWindowUnderOne'] = ImGuiInternal.prototype.FocusTopMostWindowUnderOne = function(under_this_window, ignore_window, filter_viewport, flags) {
  if (under_this_window && typeof under_this_window === 'object') under_this_window = under_this_window.ptr;
  if (ignore_window && typeof ignore_window === 'object') ignore_window = ignore_window.ptr;
  if (filter_viewport && typeof filter_viewport === 'object') filter_viewport = filter_viewport.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  _emscripten_bind_ImGuiInternal_FocusTopMostWindowUnderOne_4(under_this_window, ignore_window, filter_viewport, flags);
};

ImGuiInternal.prototype['BringWindowToFocusFront'] = ImGuiInternal.prototype.BringWindowToFocusFront = function(window) {
  if (window && typeof window === 'object') window = window.ptr;
  _emscripten_bind_ImGuiInternal_BringWindowToFocusFront_1(window);
};

ImGuiInternal.prototype['BringWindowToDisplayFront'] = ImGuiInternal.prototype.BringWindowToDisplayFront = function(window) {
  if (window && typeof window === 'object') window = window.ptr;
  _emscripten_bind_ImGuiInternal_BringWindowToDisplayFront_1(window);
};

ImGuiInternal.prototype['BringWindowToDisplayBack'] = ImGuiInternal.prototype.BringWindowToDisplayBack = function(window) {
  if (window && typeof window === 'object') window = window.ptr;
  _emscripten_bind_ImGuiInternal_BringWindowToDisplayBack_1(window);
};

ImGuiInternal.prototype['BringWindowToDisplayBehind'] = ImGuiInternal.prototype.BringWindowToDisplayBehind = function(window, above_window) {
  if (window && typeof window === 'object') window = window.ptr;
  if (above_window && typeof above_window === 'object') above_window = above_window.ptr;
  _emscripten_bind_ImGuiInternal_BringWindowToDisplayBehind_2(window, above_window);
};

ImGuiInternal.prototype['FindWindowDisplayIndex'] = ImGuiInternal.prototype.FindWindowDisplayIndex = function(window) {
  if (window && typeof window === 'object') window = window.ptr;
  return _emscripten_bind_ImGuiInternal_FindWindowDisplayIndex_1(window);
};

ImGuiInternal.prototype['FindBottomMostVisibleWindowWithinBeginStack'] = ImGuiInternal.prototype.FindBottomMostVisibleWindowWithinBeginStack = function(window) {
  if (window && typeof window === 'object') window = window.ptr;
  return wrapPointer(_emscripten_bind_ImGuiInternal_FindBottomMostVisibleWindowWithinBeginStack_1(window), ImGuiWindow);
};

ImGuiInternal.prototype['SetNextWindowRefreshPolicy'] = ImGuiInternal.prototype.SetNextWindowRefreshPolicy = function(flags) {
  if (flags && typeof flags === 'object') flags = flags.ptr;
  _emscripten_bind_ImGuiInternal_SetNextWindowRefreshPolicy_1(flags);
};

ImGuiInternal.prototype['RegisterUserTexture'] = ImGuiInternal.prototype.RegisterUserTexture = function(tex) {
  if (tex && typeof tex === 'object') tex = tex.ptr;
  _emscripten_bind_ImGuiInternal_RegisterUserTexture_1(tex);
};

ImGuiInternal.prototype['UnregisterUserTexture'] = ImGuiInternal.prototype.UnregisterUserTexture = function(tex) {
  if (tex && typeof tex === 'object') tex = tex.ptr;
  _emscripten_bind_ImGuiInternal_UnregisterUserTexture_1(tex);
};

ImGuiInternal.prototype['RegisterFontAtlas'] = ImGuiInternal.prototype.RegisterFontAtlas = function(atlas) {
  if (atlas && typeof atlas === 'object') atlas = atlas.ptr;
  _emscripten_bind_ImGuiInternal_RegisterFontAtlas_1(atlas);
};

ImGuiInternal.prototype['UnregisterFontAtlas'] = ImGuiInternal.prototype.UnregisterFontAtlas = function(atlas) {
  if (atlas && typeof atlas === 'object') atlas = atlas.ptr;
  _emscripten_bind_ImGuiInternal_UnregisterFontAtlas_1(atlas);
};

ImGuiInternal.prototype['SetCurrentFont'] = ImGuiInternal.prototype.SetCurrentFont = function(font, font_size_before_scaling, font_size_after_scaling) {
  if (font && typeof font === 'object') font = font.ptr;
  if (font_size_before_scaling && typeof font_size_before_scaling === 'object') font_size_before_scaling = font_size_before_scaling.ptr;
  if (font_size_after_scaling && typeof font_size_after_scaling === 'object') font_size_after_scaling = font_size_after_scaling.ptr;
  _emscripten_bind_ImGuiInternal_SetCurrentFont_3(font, font_size_before_scaling, font_size_after_scaling);
};

ImGuiInternal.prototype['UpdateCurrentFontSize'] = ImGuiInternal.prototype.UpdateCurrentFontSize = function(restore_font_size_after_scaling) {
  if (restore_font_size_after_scaling && typeof restore_font_size_after_scaling === 'object') restore_font_size_after_scaling = restore_font_size_after_scaling.ptr;
  _emscripten_bind_ImGuiInternal_UpdateCurrentFontSize_1(restore_font_size_after_scaling);
};

ImGuiInternal.prototype['SetFontRasterizerDensity'] = ImGuiInternal.prototype.SetFontRasterizerDensity = function(rasterizer_density) {
  if (rasterizer_density && typeof rasterizer_density === 'object') rasterizer_density = rasterizer_density.ptr;
  _emscripten_bind_ImGuiInternal_SetFontRasterizerDensity_1(rasterizer_density);
};

ImGuiInternal.prototype['GetFontRasterizerDensity'] = ImGuiInternal.prototype.GetFontRasterizerDensity = function() {
  return _emscripten_bind_ImGuiInternal_GetFontRasterizerDensity_0();
};

ImGuiInternal.prototype['GetRoundedFontSize'] = ImGuiInternal.prototype.GetRoundedFontSize = function(size) {
  if (size && typeof size === 'object') size = size.ptr;
  return _emscripten_bind_ImGuiInternal_GetRoundedFontSize_1(size);
};

ImGuiInternal.prototype['GetDefaultFont'] = ImGuiInternal.prototype.GetDefaultFont = function() {
  return wrapPointer(_emscripten_bind_ImGuiInternal_GetDefaultFont_0(), ImFont);
};

ImGuiInternal.prototype['PushPasswordFont'] = ImGuiInternal.prototype.PushPasswordFont = function() {
  _emscripten_bind_ImGuiInternal_PushPasswordFont_0();
};

ImGuiInternal.prototype['PopPasswordFont'] = ImGuiInternal.prototype.PopPasswordFont = function() {
  _emscripten_bind_ImGuiInternal_PopPasswordFont_0();
};

ImGuiInternal.prototype['GetForegroundDrawList'] = ImGuiInternal.prototype.GetForegroundDrawList = function(window) {
  if (window && typeof window === 'object') window = window.ptr;
  return wrapPointer(_emscripten_bind_ImGuiInternal_GetForegroundDrawList_1(window), ImDrawList);
};

ImGuiInternal.prototype['Initialize'] = ImGuiInternal.prototype.Initialize = function() {
  _emscripten_bind_ImGuiInternal_Initialize_0();
};

ImGuiInternal.prototype['Shutdown'] = ImGuiInternal.prototype.Shutdown = function() {
  _emscripten_bind_ImGuiInternal_Shutdown_0();
};

ImGuiInternal.prototype['UpdateInputEvents'] = ImGuiInternal.prototype.UpdateInputEvents = function(trickle_fast_inputs) {
  if (trickle_fast_inputs && typeof trickle_fast_inputs === 'object') trickle_fast_inputs = trickle_fast_inputs.ptr;
  _emscripten_bind_ImGuiInternal_UpdateInputEvents_1(trickle_fast_inputs);
};

ImGuiInternal.prototype['UpdateHoveredWindowAndCaptureFlags'] = ImGuiInternal.prototype.UpdateHoveredWindowAndCaptureFlags = function(mouse_pos) {
  if (mouse_pos && typeof mouse_pos === 'object') mouse_pos = mouse_pos.ptr;
  _emscripten_bind_ImGuiInternal_UpdateHoveredWindowAndCaptureFlags_1(mouse_pos);
};

ImGuiInternal.prototype['StartMouseMovingWindow'] = ImGuiInternal.prototype.StartMouseMovingWindow = function(window) {
  if (window && typeof window === 'object') window = window.ptr;
  _emscripten_bind_ImGuiInternal_StartMouseMovingWindow_1(window);
};

ImGuiInternal.prototype['StartMouseMovingWindowOrNode'] = ImGuiInternal.prototype.StartMouseMovingWindowOrNode = function(window, node, undock) {
  if (window && typeof window === 'object') window = window.ptr;
  if (node && typeof node === 'object') node = node.ptr;
  if (undock && typeof undock === 'object') undock = undock.ptr;
  _emscripten_bind_ImGuiInternal_StartMouseMovingWindowOrNode_3(window, node, undock);
};

ImGuiInternal.prototype['StopMouseMovingWindow'] = ImGuiInternal.prototype.StopMouseMovingWindow = function() {
  _emscripten_bind_ImGuiInternal_StopMouseMovingWindow_0();
};

ImGuiInternal.prototype['UpdateMouseMovingWindowNewFrame'] = ImGuiInternal.prototype.UpdateMouseMovingWindowNewFrame = function() {
  _emscripten_bind_ImGuiInternal_UpdateMouseMovingWindowNewFrame_0();
};

ImGuiInternal.prototype['UpdateMouseMovingWindowEndFrame'] = ImGuiInternal.prototype.UpdateMouseMovingWindowEndFrame = function() {
  _emscripten_bind_ImGuiInternal_UpdateMouseMovingWindowEndFrame_0();
};

ImGuiInternal.prototype['GetItemStatusFlags'] = ImGuiInternal.prototype.GetItemStatusFlags = function() {
  return _emscripten_bind_ImGuiInternal_GetItemStatusFlags_0();
};

ImGuiInternal.prototype['GetItemFlags'] = ImGuiInternal.prototype.GetItemFlags = function() {
  return _emscripten_bind_ImGuiInternal_GetItemFlags_0();
};

ImGuiInternal.prototype['GetActiveID'] = ImGuiInternal.prototype.GetActiveID = function() {
  return _emscripten_bind_ImGuiInternal_GetActiveID_0();
};

ImGuiInternal.prototype['GetFocusID'] = ImGuiInternal.prototype.GetFocusID = function() {
  return _emscripten_bind_ImGuiInternal_GetFocusID_0();
};

ImGuiInternal.prototype['SetActiveID'] = ImGuiInternal.prototype.SetActiveID = function(id, window) {
  if (id && typeof id === 'object') id = id.ptr;
  if (window && typeof window === 'object') window = window.ptr;
  _emscripten_bind_ImGuiInternal_SetActiveID_2(id, window);
};

ImGuiInternal.prototype['SetFocusID'] = ImGuiInternal.prototype.SetFocusID = function(id, window) {
  if (id && typeof id === 'object') id = id.ptr;
  if (window && typeof window === 'object') window = window.ptr;
  _emscripten_bind_ImGuiInternal_SetFocusID_2(id, window);
};

ImGuiInternal.prototype['ClearActiveID'] = ImGuiInternal.prototype.ClearActiveID = function() {
  _emscripten_bind_ImGuiInternal_ClearActiveID_0();
};

ImGuiInternal.prototype['GetHoveredID'] = ImGuiInternal.prototype.GetHoveredID = function() {
  return _emscripten_bind_ImGuiInternal_GetHoveredID_0();
};

ImGuiInternal.prototype['SetHoveredID'] = ImGuiInternal.prototype.SetHoveredID = function(id) {
  if (id && typeof id === 'object') id = id.ptr;
  _emscripten_bind_ImGuiInternal_SetHoveredID_1(id);
};

ImGuiInternal.prototype['KeepAliveID'] = ImGuiInternal.prototype.KeepAliveID = function(id) {
  if (id && typeof id === 'object') id = id.ptr;
  _emscripten_bind_ImGuiInternal_KeepAliveID_1(id);
};

ImGuiInternal.prototype['ItemSize__0'] = ImGuiInternal.prototype.ItemSize__0 = function(size, text_baseline_y) {
  if (size && typeof size === 'object') size = size.ptr;
  if (text_baseline_y && typeof text_baseline_y === 'object') text_baseline_y = text_baseline_y.ptr;
  if (text_baseline_y === undefined) { _emscripten_bind_ImGuiInternal_ItemSize__0_1(size); return }
  _emscripten_bind_ImGuiInternal_ItemSize__0_2(size, text_baseline_y);
};

ImGuiInternal.prototype['ItemSize__1'] = ImGuiInternal.prototype.ItemSize__1 = function(bb, text_baseline_y) {
  if (bb && typeof bb === 'object') bb = bb.ptr;
  if (text_baseline_y && typeof text_baseline_y === 'object') text_baseline_y = text_baseline_y.ptr;
  if (text_baseline_y === undefined) { _emscripten_bind_ImGuiInternal_ItemSize__1_1(bb); return }
  _emscripten_bind_ImGuiInternal_ItemSize__1_2(bb, text_baseline_y);
};

ImGuiInternal.prototype['DockBuilderDockWindow'] = ImGuiInternal.prototype.DockBuilderDockWindow = function(window_name, node_id) {
  ensureCache.prepare();
  if (window_name && typeof window_name === 'object') window_name = window_name.ptr;
  else window_name = ensureString(window_name);
  if (node_id && typeof node_id === 'object') node_id = node_id.ptr;
  _emscripten_bind_ImGuiInternal_DockBuilderDockWindow_2(window_name, node_id);
};

ImGuiInternal.prototype['DockBuilderGetNode'] = ImGuiInternal.prototype.DockBuilderGetNode = function(node_id) {
  if (node_id && typeof node_id === 'object') node_id = node_id.ptr;
  return wrapPointer(_emscripten_bind_ImGuiInternal_DockBuilderGetNode_1(node_id), ImGuiDockNode);
};

ImGuiInternal.prototype['DockBuilderGetCentralNode'] = ImGuiInternal.prototype.DockBuilderGetCentralNode = function(node_id) {
  if (node_id && typeof node_id === 'object') node_id = node_id.ptr;
  return wrapPointer(_emscripten_bind_ImGuiInternal_DockBuilderGetCentralNode_1(node_id), ImGuiDockNode);
};

ImGuiInternal.prototype['DockBuilderAddNode'] = ImGuiInternal.prototype.DockBuilderAddNode = function(node_id, flags) {
  if (node_id && typeof node_id === 'object') node_id = node_id.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (node_id === undefined) { return _emscripten_bind_ImGuiInternal_DockBuilderAddNode_0() }
  if (flags === undefined) { return _emscripten_bind_ImGuiInternal_DockBuilderAddNode_1(node_id) }
  return _emscripten_bind_ImGuiInternal_DockBuilderAddNode_2(node_id, flags);
};

ImGuiInternal.prototype['DockBuilderRemoveNode'] = ImGuiInternal.prototype.DockBuilderRemoveNode = function(node_id) {
  if (node_id && typeof node_id === 'object') node_id = node_id.ptr;
  _emscripten_bind_ImGuiInternal_DockBuilderRemoveNode_1(node_id);
};

ImGuiInternal.prototype['DockBuilderRemoveNodeDockedWindows'] = ImGuiInternal.prototype.DockBuilderRemoveNodeDockedWindows = function(node_id, clear_settings_refs) {
  if (node_id && typeof node_id === 'object') node_id = node_id.ptr;
  if (clear_settings_refs && typeof clear_settings_refs === 'object') clear_settings_refs = clear_settings_refs.ptr;
  if (clear_settings_refs === undefined) { _emscripten_bind_ImGuiInternal_DockBuilderRemoveNodeDockedWindows_1(node_id); return }
  _emscripten_bind_ImGuiInternal_DockBuilderRemoveNodeDockedWindows_2(node_id, clear_settings_refs);
};

ImGuiInternal.prototype['DockBuilderRemoveNodeChildNodes'] = ImGuiInternal.prototype.DockBuilderRemoveNodeChildNodes = function(node_id) {
  if (node_id && typeof node_id === 'object') node_id = node_id.ptr;
  _emscripten_bind_ImGuiInternal_DockBuilderRemoveNodeChildNodes_1(node_id);
};

ImGuiInternal.prototype['DockBuilderSetNodePos'] = ImGuiInternal.prototype.DockBuilderSetNodePos = function(node_id, pos) {
  if (node_id && typeof node_id === 'object') node_id = node_id.ptr;
  if (pos && typeof pos === 'object') pos = pos.ptr;
  _emscripten_bind_ImGuiInternal_DockBuilderSetNodePos_2(node_id, pos);
};

ImGuiInternal.prototype['DockBuilderSetNodeSize'] = ImGuiInternal.prototype.DockBuilderSetNodeSize = function(node_id, size) {
  if (node_id && typeof node_id === 'object') node_id = node_id.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_ImGuiInternal_DockBuilderSetNodeSize_2(node_id, size);
};

ImGuiInternal.prototype['DockBuilderSplitNode'] = ImGuiInternal.prototype.DockBuilderSplitNode = function(node_id, split_dir, size_ratio_for_node_at_dir, out_id_at_dir, out_id_at_opposite_dir) {
  ensureCache.prepare();
  if (node_id && typeof node_id === 'object') node_id = node_id.ptr;
  if (split_dir && typeof split_dir === 'object') split_dir = split_dir.ptr;
  if (size_ratio_for_node_at_dir && typeof size_ratio_for_node_at_dir === 'object') size_ratio_for_node_at_dir = size_ratio_for_node_at_dir.ptr;
  if (typeof out_id_at_dir == 'object') { out_id_at_dir = ensureInt32(out_id_at_dir); }
  if (typeof out_id_at_opposite_dir == 'object') { out_id_at_opposite_dir = ensureInt32(out_id_at_opposite_dir); }
  return _emscripten_bind_ImGuiInternal_DockBuilderSplitNode_5(node_id, split_dir, size_ratio_for_node_at_dir, out_id_at_dir, out_id_at_opposite_dir);
};

ImGuiInternal.prototype['DockBuilderCopyDockSpace'] = ImGuiInternal.prototype.DockBuilderCopyDockSpace = function(src_dockspace_id, dst_dockspace_id, in_window_remap_pairs) {
  if (src_dockspace_id && typeof src_dockspace_id === 'object') src_dockspace_id = src_dockspace_id.ptr;
  if (dst_dockspace_id && typeof dst_dockspace_id === 'object') dst_dockspace_id = dst_dockspace_id.ptr;
  if (in_window_remap_pairs && typeof in_window_remap_pairs === 'object') in_window_remap_pairs = in_window_remap_pairs.ptr;
  _emscripten_bind_ImGuiInternal_DockBuilderCopyDockSpace_3(src_dockspace_id, dst_dockspace_id, in_window_remap_pairs);
};

ImGuiInternal.prototype['DockBuilderCopyNode'] = ImGuiInternal.prototype.DockBuilderCopyNode = function(src_node_id, dst_node_id, out_node_remap_pairs) {
  if (src_node_id && typeof src_node_id === 'object') src_node_id = src_node_id.ptr;
  if (dst_node_id && typeof dst_node_id === 'object') dst_node_id = dst_node_id.ptr;
  if (out_node_remap_pairs && typeof out_node_remap_pairs === 'object') out_node_remap_pairs = out_node_remap_pairs.ptr;
  _emscripten_bind_ImGuiInternal_DockBuilderCopyNode_3(src_node_id, dst_node_id, out_node_remap_pairs);
};

ImGuiInternal.prototype['DockBuilderCopyWindowSettings'] = ImGuiInternal.prototype.DockBuilderCopyWindowSettings = function(src_name, dst_name) {
  ensureCache.prepare();
  if (src_name && typeof src_name === 'object') src_name = src_name.ptr;
  else src_name = ensureString(src_name);
  if (dst_name && typeof dst_name === 'object') dst_name = dst_name.ptr;
  else dst_name = ensureString(dst_name);
  _emscripten_bind_ImGuiInternal_DockBuilderCopyWindowSettings_2(src_name, dst_name);
};

ImGuiInternal.prototype['DockBuilderFinish'] = ImGuiInternal.prototype.DockBuilderFinish = function(node_id) {
  if (node_id && typeof node_id === 'object') node_id = node_id.ptr;
  _emscripten_bind_ImGuiInternal_DockBuilderFinish_1(node_id);
};

ImGuiInternal.prototype['IsDragDropActive'] = ImGuiInternal.prototype.IsDragDropActive = function() {
  return !!(_emscripten_bind_ImGuiInternal_IsDragDropActive_0());
};

ImGuiInternal.prototype['BeginDragDropTargetCustom'] = ImGuiInternal.prototype.BeginDragDropTargetCustom = function(bb, id) {
  if (bb && typeof bb === 'object') bb = bb.ptr;
  if (id && typeof id === 'object') id = id.ptr;
  return !!(_emscripten_bind_ImGuiInternal_BeginDragDropTargetCustom_2(bb, id));
};

ImGuiInternal.prototype['BeginDragDropTargetViewport'] = ImGuiInternal.prototype.BeginDragDropTargetViewport = function(viewport, p_bb) {
  if (viewport && typeof viewport === 'object') viewport = viewport.ptr;
  if (p_bb && typeof p_bb === 'object') p_bb = p_bb.ptr;
  if (p_bb === undefined) { return !!(_emscripten_bind_ImGuiInternal_BeginDragDropTargetViewport_1(viewport)) }
  return !!(_emscripten_bind_ImGuiInternal_BeginDragDropTargetViewport_2(viewport, p_bb));
};

ImGuiInternal.prototype['ClearDragDrop'] = ImGuiInternal.prototype.ClearDragDrop = function() {
  _emscripten_bind_ImGuiInternal_ClearDragDrop_0();
};

ImGuiInternal.prototype['IsDragDropPayloadBeingAccepted'] = ImGuiInternal.prototype.IsDragDropPayloadBeingAccepted = function() {
  return !!(_emscripten_bind_ImGuiInternal_IsDragDropPayloadBeingAccepted_0());
};

ImGuiInternal.prototype['RenderDragDropTargetRectForItem'] = ImGuiInternal.prototype.RenderDragDropTargetRectForItem = function(bb) {
  if (bb && typeof bb === 'object') bb = bb.ptr;
  _emscripten_bind_ImGuiInternal_RenderDragDropTargetRectForItem_1(bb);
};

ImGuiInternal.prototype['RenderDragDropTargetRectEx'] = ImGuiInternal.prototype.RenderDragDropTargetRectEx = function(draw_list, bb) {
  if (draw_list && typeof draw_list === 'object') draw_list = draw_list.ptr;
  if (bb && typeof bb === 'object') bb = bb.ptr;
  _emscripten_bind_ImGuiInternal_RenderDragDropTargetRectEx_2(draw_list, bb);
};

ImGuiInternal.prototype['BeginTableEx'] = ImGuiInternal.prototype.BeginTableEx = function(name, id, columns_count, flags, outer_size, inner_width) {
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (id && typeof id === 'object') id = id.ptr;
  if (columns_count && typeof columns_count === 'object') columns_count = columns_count.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (outer_size && typeof outer_size === 'object') outer_size = outer_size.ptr;
  if (inner_width && typeof inner_width === 'object') inner_width = inner_width.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGuiInternal_BeginTableEx_3(name, id, columns_count)) }
  if (outer_size === undefined) { return !!(_emscripten_bind_ImGuiInternal_BeginTableEx_4(name, id, columns_count, flags)) }
  if (inner_width === undefined) { return !!(_emscripten_bind_ImGuiInternal_BeginTableEx_5(name, id, columns_count, flags, outer_size)) }
  return !!(_emscripten_bind_ImGuiInternal_BeginTableEx_6(name, id, columns_count, flags, outer_size, inner_width));
};

ImGuiInternal.prototype['ButtonBehavior'] = ImGuiInternal.prototype.ButtonBehavior = function(bb, id, out_hovered, out_held, ImGuiButtonFlags) {
  ensureCache.prepare();
  if (bb && typeof bb === 'object') bb = bb.ptr;
  if (id && typeof id === 'object') id = id.ptr;
  if (ImGuiButtonFlags && typeof ImGuiButtonFlags === 'object') ImGuiButtonFlags = ImGuiButtonFlags.ptr;
  if (ImGuiButtonFlags === undefined) { return !!(_emscripten_bind_ImGuiInternal_ButtonBehavior_4(bb, id, out_hovered, out_held)) }
  return !!(_emscripten_bind_ImGuiInternal_ButtonBehavior_5(bb, id, out_hovered, out_held, ImGuiButtonFlags));
};

ImGuiInternal.prototype['DragBehavior'] = ImGuiInternal.prototype.DragBehavior = function(id, ImGuiDataType, p_v, v_speed, p_min, p_max, format, ImGuiSliderFlags) {
  ensureCache.prepare();
  if (id && typeof id === 'object') id = id.ptr;
  if (ImGuiDataType && typeof ImGuiDataType === 'object') ImGuiDataType = ImGuiDataType.ptr;
  if (p_v && typeof p_v === 'object') p_v = p_v.ptr;
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (ImGuiSliderFlags && typeof ImGuiSliderFlags === 'object') ImGuiSliderFlags = ImGuiSliderFlags.ptr;
  return !!(_emscripten_bind_ImGuiInternal_DragBehavior_8(id, ImGuiDataType, p_v, v_speed, p_min, p_max, format, ImGuiSliderFlags));
};

ImGuiInternal.prototype['SliderBehavior'] = ImGuiInternal.prototype.SliderBehavior = function(bb, id, ImGuiDataType, p_v, p_min, p_max, format, ImGuiSliderFlags, out_grab_bb) {
  ensureCache.prepare();
  if (bb && typeof bb === 'object') bb = bb.ptr;
  if (id && typeof id === 'object') id = id.ptr;
  if (ImGuiDataType && typeof ImGuiDataType === 'object') ImGuiDataType = ImGuiDataType.ptr;
  if (p_v && typeof p_v === 'object') p_v = p_v.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (ImGuiSliderFlags && typeof ImGuiSliderFlags === 'object') ImGuiSliderFlags = ImGuiSliderFlags.ptr;
  if (out_grab_bb && typeof out_grab_bb === 'object') out_grab_bb = out_grab_bb.ptr;
  return !!(_emscripten_bind_ImGuiInternal_SliderBehavior_9(bb, id, ImGuiDataType, p_v, p_min, p_max, format, ImGuiSliderFlags, out_grab_bb));
};

ImGuiInternal.prototype['SplitterBehavior'] = ImGuiInternal.prototype.SplitterBehavior = function(bb, id, axis, size1, size2, min_size1, min_size2, hover_extend, hover_visibility_delay, bg_col) {
  ensureCache.prepare();
  if (bb && typeof bb === 'object') bb = bb.ptr;
  if (id && typeof id === 'object') id = id.ptr;
  if (axis && typeof axis === 'object') axis = axis.ptr;
  if (typeof size1 == 'object') { size1 = ensureFloat32(size1); }
  if (typeof size2 == 'object') { size2 = ensureFloat32(size2); }
  if (min_size1 && typeof min_size1 === 'object') min_size1 = min_size1.ptr;
  if (min_size2 && typeof min_size2 === 'object') min_size2 = min_size2.ptr;
  if (hover_extend && typeof hover_extend === 'object') hover_extend = hover_extend.ptr;
  if (hover_visibility_delay && typeof hover_visibility_delay === 'object') hover_visibility_delay = hover_visibility_delay.ptr;
  if (bg_col && typeof bg_col === 'object') bg_col = bg_col.ptr;
  if (hover_extend === undefined) { return !!(_emscripten_bind_ImGuiInternal_SplitterBehavior_7(bb, id, axis, size1, size2, min_size1, min_size2)) }
  if (hover_visibility_delay === undefined) { return !!(_emscripten_bind_ImGuiInternal_SplitterBehavior_8(bb, id, axis, size1, size2, min_size1, min_size2, hover_extend)) }
  if (bg_col === undefined) { return !!(_emscripten_bind_ImGuiInternal_SplitterBehavior_9(bb, id, axis, size1, size2, min_size1, min_size2, hover_extend, hover_visibility_delay)) }
  return !!(_emscripten_bind_ImGuiInternal_SplitterBehavior_10(bb, id, axis, size1, size2, min_size1, min_size2, hover_extend, hover_visibility_delay, bg_col));
};

function ImGui() { throw "cannot construct a ImGui, no constructor in IDL" }
ImGui.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGui.prototype.constructor = ImGui;
ImGui.prototype.__class__ = ImGui;
ImGui.__cache__ = {};
Module['ImGui'] = ImGui;

ImGui.prototype['CreateContext'] = ImGui.prototype.CreateContext = function(shared_font_atlas) {
  if (shared_font_atlas && typeof shared_font_atlas === 'object') shared_font_atlas = shared_font_atlas.ptr;
  if (shared_font_atlas === undefined) { return wrapPointer(_emscripten_bind_ImGui_CreateContext_0(), ImGuiContext) }
  return wrapPointer(_emscripten_bind_ImGui_CreateContext_1(shared_font_atlas), ImGuiContext);
};

ImGui.prototype['DestroyContext'] = ImGui.prototype.DestroyContext = function(ctx) {
  if (ctx && typeof ctx === 'object') ctx = ctx.ptr;
  if (ctx === undefined) { _emscripten_bind_ImGui_DestroyContext_0(); return }
  _emscripten_bind_ImGui_DestroyContext_1(ctx);
};

ImGui.prototype['GetCurrentContext'] = ImGui.prototype.GetCurrentContext = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetCurrentContext_0(), ImGuiContext);
};

ImGui.prototype['SetCurrentContext'] = ImGui.prototype.SetCurrentContext = function(ctx) {
  if (ctx && typeof ctx === 'object') ctx = ctx.ptr;
  _emscripten_bind_ImGui_SetCurrentContext_1(ctx);
};

ImGui.prototype['GetIO'] = ImGui.prototype.GetIO = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetIO_0(), ImGuiIO);
};

ImGui.prototype['GetPlatformIO'] = ImGui.prototype.GetPlatformIO = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetPlatformIO_0(), ImGuiPlatformIO);
};

ImGui.prototype['GetStyle'] = ImGui.prototype.GetStyle = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetStyle_0(), ImGuiStyle);
};

ImGui.prototype['NewFrame'] = ImGui.prototype.NewFrame = function() {
  _emscripten_bind_ImGui_NewFrame_0();
};

ImGui.prototype['EndFrame'] = ImGui.prototype.EndFrame = function() {
  _emscripten_bind_ImGui_EndFrame_0();
};

ImGui.prototype['Render'] = ImGui.prototype.Render = function() {
  _emscripten_bind_ImGui_Render_0();
};

ImGui.prototype['GetDrawData'] = ImGui.prototype.GetDrawData = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetDrawData_0(), ImDrawData);
};

ImGui.prototype['ShowDemoWindow'] = ImGui.prototype.ShowDemoWindow = function(p_open) {
  ensureCache.prepare();
  if (p_open === undefined) { _emscripten_bind_ImGui_ShowDemoWindow_0(); return }
  _emscripten_bind_ImGui_ShowDemoWindow_1(p_open);
};

ImGui.prototype['ShowMetricsWindow'] = ImGui.prototype.ShowMetricsWindow = function(p_open) {
  ensureCache.prepare();
  if (p_open === undefined) { _emscripten_bind_ImGui_ShowMetricsWindow_0(); return }
  _emscripten_bind_ImGui_ShowMetricsWindow_1(p_open);
};

ImGui.prototype['ShowDebugLogWindow'] = ImGui.prototype.ShowDebugLogWindow = function(p_open) {
  ensureCache.prepare();
  if (p_open === undefined) { _emscripten_bind_ImGui_ShowDebugLogWindow_0(); return }
  _emscripten_bind_ImGui_ShowDebugLogWindow_1(p_open);
};

ImGui.prototype['ShowIDStackToolWindow'] = ImGui.prototype.ShowIDStackToolWindow = function(p_open) {
  ensureCache.prepare();
  if (p_open === undefined) { _emscripten_bind_ImGui_ShowIDStackToolWindow_0(); return }
  _emscripten_bind_ImGui_ShowIDStackToolWindow_1(p_open);
};

ImGui.prototype['ShowAboutWindow'] = ImGui.prototype.ShowAboutWindow = function(p_open) {
  ensureCache.prepare();
  if (p_open === undefined) { _emscripten_bind_ImGui_ShowAboutWindow_0(); return }
  _emscripten_bind_ImGui_ShowAboutWindow_1(p_open);
};

ImGui.prototype['ShowStyleEditor'] = ImGui.prototype.ShowStyleEditor = function(ref) {
  if (ref && typeof ref === 'object') ref = ref.ptr;
  if (ref === undefined) { _emscripten_bind_ImGui_ShowStyleEditor_0(); return }
  _emscripten_bind_ImGui_ShowStyleEditor_1(ref);
};

ImGui.prototype['ShowStyleSelector'] = ImGui.prototype.ShowStyleSelector = function(label) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_ImGui_ShowStyleSelector_1(label);
};

ImGui.prototype['ShowFontSelector'] = ImGui.prototype.ShowFontSelector = function(label) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_ImGui_ShowFontSelector_1(label);
};

ImGui.prototype['ShowUserGuide'] = ImGui.prototype.ShowUserGuide = function() {
  _emscripten_bind_ImGui_ShowUserGuide_0();
};

ImGui.prototype['GetVersion'] = ImGui.prototype.GetVersion = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetVersion_0(), IDLString);
};

ImGui.prototype['StyleColorsDark'] = ImGui.prototype.StyleColorsDark = function(dst) {
  if (dst && typeof dst === 'object') dst = dst.ptr;
  if (dst === undefined) { _emscripten_bind_ImGui_StyleColorsDark_0(); return }
  _emscripten_bind_ImGui_StyleColorsDark_1(dst);
};

ImGui.prototype['StyleColorsLight'] = ImGui.prototype.StyleColorsLight = function(dst) {
  if (dst && typeof dst === 'object') dst = dst.ptr;
  if (dst === undefined) { _emscripten_bind_ImGui_StyleColorsLight_0(); return }
  _emscripten_bind_ImGui_StyleColorsLight_1(dst);
};

ImGui.prototype['StyleColorsClassic'] = ImGui.prototype.StyleColorsClassic = function(dst) {
  if (dst && typeof dst === 'object') dst = dst.ptr;
  if (dst === undefined) { _emscripten_bind_ImGui_StyleColorsClassic_0(); return }
  _emscripten_bind_ImGui_StyleColorsClassic_1(dst);
};

ImGui.prototype['Begin'] = ImGui.prototype.Begin = function(name, p_open, flags) {
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (p_open === undefined) { return !!(_emscripten_bind_ImGui_Begin_1(name)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_Begin_2(name, p_open)) }
  return !!(_emscripten_bind_ImGui_Begin_3(name, p_open, flags));
};

ImGui.prototype['End'] = ImGui.prototype.End = function() {
  _emscripten_bind_ImGui_End_0();
};

ImGui.prototype['BeginChild__0'] = ImGui.prototype.BeginChild__0 = function(str_id, size, child_flags, window_flags) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (size && typeof size === 'object') size = size.ptr;
  if (child_flags && typeof child_flags === 'object') child_flags = child_flags.ptr;
  if (window_flags && typeof window_flags === 'object') window_flags = window_flags.ptr;
  if (size === undefined) { return !!(_emscripten_bind_ImGui_BeginChild__0_1(str_id)) }
  if (child_flags === undefined) { return !!(_emscripten_bind_ImGui_BeginChild__0_2(str_id, size)) }
  if (window_flags === undefined) { return !!(_emscripten_bind_ImGui_BeginChild__0_3(str_id, size, child_flags)) }
  return !!(_emscripten_bind_ImGui_BeginChild__0_4(str_id, size, child_flags, window_flags));
};

ImGui.prototype['BeginChild__1'] = ImGui.prototype.BeginChild__1 = function(id, size, child_flags, window_flags) {
  if (id && typeof id === 'object') id = id.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  if (child_flags && typeof child_flags === 'object') child_flags = child_flags.ptr;
  if (window_flags && typeof window_flags === 'object') window_flags = window_flags.ptr;
  if (size === undefined) { return !!(_emscripten_bind_ImGui_BeginChild__1_1(id)) }
  if (child_flags === undefined) { return !!(_emscripten_bind_ImGui_BeginChild__1_2(id, size)) }
  if (window_flags === undefined) { return !!(_emscripten_bind_ImGui_BeginChild__1_3(id, size, child_flags)) }
  return !!(_emscripten_bind_ImGui_BeginChild__1_4(id, size, child_flags, window_flags));
};

ImGui.prototype['EndChild'] = ImGui.prototype.EndChild = function() {
  _emscripten_bind_ImGui_EndChild_0();
};

ImGui.prototype['IsWindowAppearing'] = ImGui.prototype.IsWindowAppearing = function() {
  return !!(_emscripten_bind_ImGui_IsWindowAppearing_0());
};

ImGui.prototype['IsWindowCollapsed'] = ImGui.prototype.IsWindowCollapsed = function() {
  return !!(_emscripten_bind_ImGui_IsWindowCollapsed_0());
};

ImGui.prototype['IsWindowFocused'] = ImGui.prototype.IsWindowFocused = function(flags) {
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_IsWindowFocused_0()) }
  return !!(_emscripten_bind_ImGui_IsWindowFocused_1(flags));
};

ImGui.prototype['IsWindowHovered'] = ImGui.prototype.IsWindowHovered = function(flags) {
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_IsWindowHovered_0()) }
  return !!(_emscripten_bind_ImGui_IsWindowHovered_1(flags));
};

ImGui.prototype['GetWindowDrawList'] = ImGui.prototype.GetWindowDrawList = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetWindowDrawList_0(), ImDrawList);
};

ImGui.prototype['GetWindowDpiScale'] = ImGui.prototype.GetWindowDpiScale = function() {
  return _emscripten_bind_ImGui_GetWindowDpiScale_0();
};

ImGui.prototype['GetWindowPos'] = ImGui.prototype.GetWindowPos = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetWindowPos_0(), ImVec2);
};

ImGui.prototype['GetWindowSize'] = ImGui.prototype.GetWindowSize = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetWindowSize_0(), ImVec2);
};

ImGui.prototype['GetWindowWidth'] = ImGui.prototype.GetWindowWidth = function() {
  return _emscripten_bind_ImGui_GetWindowWidth_0();
};

ImGui.prototype['GetWindowHeight'] = ImGui.prototype.GetWindowHeight = function() {
  return _emscripten_bind_ImGui_GetWindowHeight_0();
};

ImGui.prototype['GetWindowViewport'] = ImGui.prototype.GetWindowViewport = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetWindowViewport_0(), ImGuiViewport);
};

ImGui.prototype['SetNextWindowPos'] = ImGui.prototype.SetNextWindowPos = function(pos, ImGuiCond, pivot) {
  if (pos && typeof pos === 'object') pos = pos.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (pivot && typeof pivot === 'object') pivot = pivot.ptr;
  if (ImGuiCond === undefined) { _emscripten_bind_ImGui_SetNextWindowPos_1(pos); return }
  if (pivot === undefined) { _emscripten_bind_ImGui_SetNextWindowPos_2(pos, ImGuiCond); return }
  _emscripten_bind_ImGui_SetNextWindowPos_3(pos, ImGuiCond, pivot);
};

ImGui.prototype['SetNextWindowSize'] = ImGui.prototype.SetNextWindowSize = function(size, ImGuiCond) {
  if (size && typeof size === 'object') size = size.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (ImGuiCond === undefined) { _emscripten_bind_ImGui_SetNextWindowSize_1(size); return }
  _emscripten_bind_ImGui_SetNextWindowSize_2(size, ImGuiCond);
};

ImGui.prototype['SetNextWindowSizeConstraints'] = ImGui.prototype.SetNextWindowSizeConstraints = function(size_min, size_max) {
  if (size_min && typeof size_min === 'object') size_min = size_min.ptr;
  if (size_max && typeof size_max === 'object') size_max = size_max.ptr;
  _emscripten_bind_ImGui_SetNextWindowSizeConstraints_2(size_min, size_max);
};

ImGui.prototype['SetNextWindowContentSize'] = ImGui.prototype.SetNextWindowContentSize = function(size) {
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_ImGui_SetNextWindowContentSize_1(size);
};

ImGui.prototype['SetNextWindowCollapsed'] = ImGui.prototype.SetNextWindowCollapsed = function(collapsed, ImGuiCond) {
  if (collapsed && typeof collapsed === 'object') collapsed = collapsed.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (ImGuiCond === undefined) { _emscripten_bind_ImGui_SetNextWindowCollapsed_1(collapsed); return }
  _emscripten_bind_ImGui_SetNextWindowCollapsed_2(collapsed, ImGuiCond);
};

ImGui.prototype['SetNextWindowFocus'] = ImGui.prototype.SetNextWindowFocus = function() {
  _emscripten_bind_ImGui_SetNextWindowFocus_0();
};

ImGui.prototype['SetNextWindowScroll'] = ImGui.prototype.SetNextWindowScroll = function(scroll) {
  if (scroll && typeof scroll === 'object') scroll = scroll.ptr;
  _emscripten_bind_ImGui_SetNextWindowScroll_1(scroll);
};

ImGui.prototype['SetNextWindowBgAlpha'] = ImGui.prototype.SetNextWindowBgAlpha = function(alpha) {
  if (alpha && typeof alpha === 'object') alpha = alpha.ptr;
  _emscripten_bind_ImGui_SetNextWindowBgAlpha_1(alpha);
};

ImGui.prototype['SetNextWindowViewport'] = ImGui.prototype.SetNextWindowViewport = function(viewport_id) {
  if (viewport_id && typeof viewport_id === 'object') viewport_id = viewport_id.ptr;
  _emscripten_bind_ImGui_SetNextWindowViewport_1(viewport_id);
};

ImGui.prototype['SetWindowPos__0'] = ImGui.prototype.SetWindowPos__0 = function(pos, ImGuiCond) {
  if (pos && typeof pos === 'object') pos = pos.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (ImGuiCond === undefined) { _emscripten_bind_ImGui_SetWindowPos__0_1(pos); return }
  _emscripten_bind_ImGui_SetWindowPos__0_2(pos, ImGuiCond);
};

ImGui.prototype['SetWindowPos__1'] = ImGui.prototype.SetWindowPos__1 = function(name, pos, ImGuiCond) {
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (pos && typeof pos === 'object') pos = pos.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (ImGuiCond === undefined) { _emscripten_bind_ImGui_SetWindowPos__1_2(name, pos); return }
  _emscripten_bind_ImGui_SetWindowPos__1_3(name, pos, ImGuiCond);
};

ImGui.prototype['SetWindowSize__0'] = ImGui.prototype.SetWindowSize__0 = function(size, ImGuiCond) {
  if (size && typeof size === 'object') size = size.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (ImGuiCond === undefined) { _emscripten_bind_ImGui_SetWindowSize__0_1(size); return }
  _emscripten_bind_ImGui_SetWindowSize__0_2(size, ImGuiCond);
};

ImGui.prototype['SetWindowSize__1'] = ImGui.prototype.SetWindowSize__1 = function(name, size, ImGuiCond) {
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (size && typeof size === 'object') size = size.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (ImGuiCond === undefined) { _emscripten_bind_ImGui_SetWindowSize__1_2(name, size); return }
  _emscripten_bind_ImGui_SetWindowSize__1_3(name, size, ImGuiCond);
};

ImGui.prototype['SetWindowCollapsed__0'] = ImGui.prototype.SetWindowCollapsed__0 = function(collapsed, ImGuiCond) {
  if (collapsed && typeof collapsed === 'object') collapsed = collapsed.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (ImGuiCond === undefined) { _emscripten_bind_ImGui_SetWindowCollapsed__0_1(collapsed); return }
  _emscripten_bind_ImGui_SetWindowCollapsed__0_2(collapsed, ImGuiCond);
};

ImGui.prototype['SetWindowCollapsed__1'] = ImGui.prototype.SetWindowCollapsed__1 = function(name, collapsed, ImGuiCond) {
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (collapsed && typeof collapsed === 'object') collapsed = collapsed.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (ImGuiCond === undefined) { _emscripten_bind_ImGui_SetWindowCollapsed__1_2(name, collapsed); return }
  _emscripten_bind_ImGui_SetWindowCollapsed__1_3(name, collapsed, ImGuiCond);
};

ImGui.prototype['SetWindowFocus'] = ImGui.prototype.SetWindowFocus = function(name) {
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (name === undefined) { _emscripten_bind_ImGui_SetWindowFocus_0(); return }
  _emscripten_bind_ImGui_SetWindowFocus_1(name);
};

ImGui.prototype['GetScrollX'] = ImGui.prototype.GetScrollX = function() {
  return _emscripten_bind_ImGui_GetScrollX_0();
};

ImGui.prototype['GetScrollY'] = ImGui.prototype.GetScrollY = function() {
  return _emscripten_bind_ImGui_GetScrollY_0();
};

ImGui.prototype['SetScrollX'] = ImGui.prototype.SetScrollX = function(scroll_x) {
  if (scroll_x && typeof scroll_x === 'object') scroll_x = scroll_x.ptr;
  _emscripten_bind_ImGui_SetScrollX_1(scroll_x);
};

ImGui.prototype['SetScrollY'] = ImGui.prototype.SetScrollY = function(scroll_y) {
  if (scroll_y && typeof scroll_y === 'object') scroll_y = scroll_y.ptr;
  _emscripten_bind_ImGui_SetScrollY_1(scroll_y);
};

ImGui.prototype['GetScrollMaxX'] = ImGui.prototype.GetScrollMaxX = function() {
  return _emscripten_bind_ImGui_GetScrollMaxX_0();
};

ImGui.prototype['GetScrollMaxY'] = ImGui.prototype.GetScrollMaxY = function() {
  return _emscripten_bind_ImGui_GetScrollMaxY_0();
};

ImGui.prototype['SetScrollHereX'] = ImGui.prototype.SetScrollHereX = function(center_x_ratio) {
  if (center_x_ratio && typeof center_x_ratio === 'object') center_x_ratio = center_x_ratio.ptr;
  if (center_x_ratio === undefined) { _emscripten_bind_ImGui_SetScrollHereX_0(); return }
  _emscripten_bind_ImGui_SetScrollHereX_1(center_x_ratio);
};

ImGui.prototype['SetScrollHereY'] = ImGui.prototype.SetScrollHereY = function(center_y_ratio) {
  if (center_y_ratio && typeof center_y_ratio === 'object') center_y_ratio = center_y_ratio.ptr;
  if (center_y_ratio === undefined) { _emscripten_bind_ImGui_SetScrollHereY_0(); return }
  _emscripten_bind_ImGui_SetScrollHereY_1(center_y_ratio);
};

ImGui.prototype['SetScrollFromPosX'] = ImGui.prototype.SetScrollFromPosX = function(local_x, center_x_ratio) {
  if (local_x && typeof local_x === 'object') local_x = local_x.ptr;
  if (center_x_ratio && typeof center_x_ratio === 'object') center_x_ratio = center_x_ratio.ptr;
  if (center_x_ratio === undefined) { _emscripten_bind_ImGui_SetScrollFromPosX_1(local_x); return }
  _emscripten_bind_ImGui_SetScrollFromPosX_2(local_x, center_x_ratio);
};

ImGui.prototype['SetScrollFromPosY'] = ImGui.prototype.SetScrollFromPosY = function(local_y, center_y_ratio) {
  if (local_y && typeof local_y === 'object') local_y = local_y.ptr;
  if (center_y_ratio && typeof center_y_ratio === 'object') center_y_ratio = center_y_ratio.ptr;
  if (center_y_ratio === undefined) { _emscripten_bind_ImGui_SetScrollFromPosY_1(local_y); return }
  _emscripten_bind_ImGui_SetScrollFromPosY_2(local_y, center_y_ratio);
};

ImGui.prototype['PushFont'] = ImGui.prototype.PushFont = function(font, font_size_base_unscaled) {
  if (font && typeof font === 'object') font = font.ptr;
  if (font_size_base_unscaled && typeof font_size_base_unscaled === 'object') font_size_base_unscaled = font_size_base_unscaled.ptr;
  _emscripten_bind_ImGui_PushFont_2(font, font_size_base_unscaled);
};

ImGui.prototype['PopFont'] = ImGui.prototype.PopFont = function() {
  _emscripten_bind_ImGui_PopFont_0();
};

ImGui.prototype['GetFont'] = ImGui.prototype.GetFont = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetFont_0(), ImFont);
};

ImGui.prototype['GetFontSize'] = ImGui.prototype.GetFontSize = function() {
  return _emscripten_bind_ImGui_GetFontSize_0();
};

ImGui.prototype['GetFontBaked'] = ImGui.prototype.GetFontBaked = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetFontBaked_0(), ImFontBaked);
};

ImGui.prototype['PushStyleColor__0'] = ImGui.prototype.PushStyleColor__0 = function(idx, col) {
  if (idx && typeof idx === 'object') idx = idx.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  _emscripten_bind_ImGui_PushStyleColor__0_2(idx, col);
};

ImGui.prototype['PushStyleColor__1'] = ImGui.prototype.PushStyleColor__1 = function(idx, col) {
  if (idx && typeof idx === 'object') idx = idx.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  _emscripten_bind_ImGui_PushStyleColor__1_2(idx, col);
};

ImGui.prototype['PopStyleColor'] = ImGui.prototype.PopStyleColor = function(count) {
  if (count && typeof count === 'object') count = count.ptr;
  if (count === undefined) { _emscripten_bind_ImGui_PopStyleColor_0(); return }
  _emscripten_bind_ImGui_PopStyleColor_1(count);
};

ImGui.prototype['PushStyleVar__0'] = ImGui.prototype.PushStyleVar__0 = function(idx, val) {
  if (idx && typeof idx === 'object') idx = idx.ptr;
  if (val && typeof val === 'object') val = val.ptr;
  _emscripten_bind_ImGui_PushStyleVar__0_2(idx, val);
};

ImGui.prototype['PushStyleVar__1'] = ImGui.prototype.PushStyleVar__1 = function(idx, val) {
  if (idx && typeof idx === 'object') idx = idx.ptr;
  if (val && typeof val === 'object') val = val.ptr;
  _emscripten_bind_ImGui_PushStyleVar__1_2(idx, val);
};

ImGui.prototype['PushStyleVarX'] = ImGui.prototype.PushStyleVarX = function(idx, val_x) {
  if (idx && typeof idx === 'object') idx = idx.ptr;
  if (val_x && typeof val_x === 'object') val_x = val_x.ptr;
  _emscripten_bind_ImGui_PushStyleVarX_2(idx, val_x);
};

ImGui.prototype['PushStyleVarY'] = ImGui.prototype.PushStyleVarY = function(idx, val_y) {
  if (idx && typeof idx === 'object') idx = idx.ptr;
  if (val_y && typeof val_y === 'object') val_y = val_y.ptr;
  _emscripten_bind_ImGui_PushStyleVarY_2(idx, val_y);
};

ImGui.prototype['PopStyleVar'] = ImGui.prototype.PopStyleVar = function(count) {
  if (count && typeof count === 'object') count = count.ptr;
  if (count === undefined) { _emscripten_bind_ImGui_PopStyleVar_0(); return }
  _emscripten_bind_ImGui_PopStyleVar_1(count);
};

ImGui.prototype['PushItemFlag'] = ImGui.prototype.PushItemFlag = function(option, enabled) {
  if (option && typeof option === 'object') option = option.ptr;
  if (enabled && typeof enabled === 'object') enabled = enabled.ptr;
  _emscripten_bind_ImGui_PushItemFlag_2(option, enabled);
};

ImGui.prototype['PopItemFlag'] = ImGui.prototype.PopItemFlag = function() {
  _emscripten_bind_ImGui_PopItemFlag_0();
};

ImGui.prototype['PushItemWidth'] = ImGui.prototype.PushItemWidth = function(item_width) {
  if (item_width && typeof item_width === 'object') item_width = item_width.ptr;
  _emscripten_bind_ImGui_PushItemWidth_1(item_width);
};

ImGui.prototype['PopItemWidth'] = ImGui.prototype.PopItemWidth = function() {
  _emscripten_bind_ImGui_PopItemWidth_0();
};

ImGui.prototype['SetNextItemWidth'] = ImGui.prototype.SetNextItemWidth = function(item_width) {
  if (item_width && typeof item_width === 'object') item_width = item_width.ptr;
  _emscripten_bind_ImGui_SetNextItemWidth_1(item_width);
};

ImGui.prototype['CalcItemWidth'] = ImGui.prototype.CalcItemWidth = function() {
  return _emscripten_bind_ImGui_CalcItemWidth_0();
};

ImGui.prototype['PushTextWrapPos'] = ImGui.prototype.PushTextWrapPos = function(wrap_local_pos_x) {
  if (wrap_local_pos_x && typeof wrap_local_pos_x === 'object') wrap_local_pos_x = wrap_local_pos_x.ptr;
  if (wrap_local_pos_x === undefined) { _emscripten_bind_ImGui_PushTextWrapPos_0(); return }
  _emscripten_bind_ImGui_PushTextWrapPos_1(wrap_local_pos_x);
};

ImGui.prototype['PopTextWrapPos'] = ImGui.prototype.PopTextWrapPos = function() {
  _emscripten_bind_ImGui_PopTextWrapPos_0();
};

ImGui.prototype['GetFontTexUvWhitePixel'] = ImGui.prototype.GetFontTexUvWhitePixel = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetFontTexUvWhitePixel_0(), ImVec2);
};

ImGui.prototype['GetColorU32__0'] = ImGui.prototype.GetColorU32__0 = function(idx, alpha_mul) {
  if (idx && typeof idx === 'object') idx = idx.ptr;
  if (alpha_mul && typeof alpha_mul === 'object') alpha_mul = alpha_mul.ptr;
  if (alpha_mul === undefined) { return _emscripten_bind_ImGui_GetColorU32__0_1(idx) }
  return _emscripten_bind_ImGui_GetColorU32__0_2(idx, alpha_mul);
};

ImGui.prototype['GetColorU32__1'] = ImGui.prototype.GetColorU32__1 = function(col) {
  if (col && typeof col === 'object') col = col.ptr;
  return _emscripten_bind_ImGui_GetColorU32__1_1(col);
};

ImGui.prototype['GetColorU32__2'] = ImGui.prototype.GetColorU32__2 = function(col, alpha_mul) {
  if (col && typeof col === 'object') col = col.ptr;
  if (alpha_mul && typeof alpha_mul === 'object') alpha_mul = alpha_mul.ptr;
  if (alpha_mul === undefined) { return _emscripten_bind_ImGui_GetColorU32__2_1(col) }
  return _emscripten_bind_ImGui_GetColorU32__2_2(col, alpha_mul);
};

ImGui.prototype['GetStyleColorVec4'] = ImGui.prototype.GetStyleColorVec4 = function(idx) {
  if (idx && typeof idx === 'object') idx = idx.ptr;
  return wrapPointer(_emscripten_bind_ImGui_GetStyleColorVec4_1(idx), ImVec4);
};

ImGui.prototype['GetCursorScreenPos'] = ImGui.prototype.GetCursorScreenPos = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetCursorScreenPos_0(), ImVec2);
};

ImGui.prototype['SetCursorScreenPos'] = ImGui.prototype.SetCursorScreenPos = function(pos) {
  if (pos && typeof pos === 'object') pos = pos.ptr;
  _emscripten_bind_ImGui_SetCursorScreenPos_1(pos);
};

ImGui.prototype['GetContentRegionAvail'] = ImGui.prototype.GetContentRegionAvail = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetContentRegionAvail_0(), ImVec2);
};

ImGui.prototype['GetCursorPos'] = ImGui.prototype.GetCursorPos = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetCursorPos_0(), ImVec2);
};

ImGui.prototype['GetCursorPosX'] = ImGui.prototype.GetCursorPosX = function() {
  return _emscripten_bind_ImGui_GetCursorPosX_0();
};

ImGui.prototype['GetCursorPosY'] = ImGui.prototype.GetCursorPosY = function() {
  return _emscripten_bind_ImGui_GetCursorPosY_0();
};

ImGui.prototype['SetCursorPos'] = ImGui.prototype.SetCursorPos = function(local_pos) {
  if (local_pos && typeof local_pos === 'object') local_pos = local_pos.ptr;
  _emscripten_bind_ImGui_SetCursorPos_1(local_pos);
};

ImGui.prototype['SetCursorPosX'] = ImGui.prototype.SetCursorPosX = function(local_x) {
  if (local_x && typeof local_x === 'object') local_x = local_x.ptr;
  _emscripten_bind_ImGui_SetCursorPosX_1(local_x);
};

ImGui.prototype['SetCursorPosY'] = ImGui.prototype.SetCursorPosY = function(local_y) {
  if (local_y && typeof local_y === 'object') local_y = local_y.ptr;
  _emscripten_bind_ImGui_SetCursorPosY_1(local_y);
};

ImGui.prototype['GetCursorStartPos'] = ImGui.prototype.GetCursorStartPos = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetCursorStartPos_0(), ImVec2);
};

ImGui.prototype['Separator'] = ImGui.prototype.Separator = function() {
  _emscripten_bind_ImGui_Separator_0();
};

ImGui.prototype['SameLine'] = ImGui.prototype.SameLine = function(offset_from_start_x, spacing) {
  if (offset_from_start_x && typeof offset_from_start_x === 'object') offset_from_start_x = offset_from_start_x.ptr;
  if (spacing && typeof spacing === 'object') spacing = spacing.ptr;
  if (offset_from_start_x === undefined) { _emscripten_bind_ImGui_SameLine_0(); return }
  if (spacing === undefined) { _emscripten_bind_ImGui_SameLine_1(offset_from_start_x); return }
  _emscripten_bind_ImGui_SameLine_2(offset_from_start_x, spacing);
};

ImGui.prototype['NewLine'] = ImGui.prototype.NewLine = function() {
  _emscripten_bind_ImGui_NewLine_0();
};

ImGui.prototype['Spacing'] = ImGui.prototype.Spacing = function() {
  _emscripten_bind_ImGui_Spacing_0();
};

ImGui.prototype['Dummy'] = ImGui.prototype.Dummy = function(size) {
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_ImGui_Dummy_1(size);
};

ImGui.prototype['Indent'] = ImGui.prototype.Indent = function(indent_w) {
  if (indent_w && typeof indent_w === 'object') indent_w = indent_w.ptr;
  if (indent_w === undefined) { _emscripten_bind_ImGui_Indent_0(); return }
  _emscripten_bind_ImGui_Indent_1(indent_w);
};

ImGui.prototype['Unindent'] = ImGui.prototype.Unindent = function(indent_w) {
  if (indent_w && typeof indent_w === 'object') indent_w = indent_w.ptr;
  if (indent_w === undefined) { _emscripten_bind_ImGui_Unindent_0(); return }
  _emscripten_bind_ImGui_Unindent_1(indent_w);
};

ImGui.prototype['BeginGroup'] = ImGui.prototype.BeginGroup = function() {
  _emscripten_bind_ImGui_BeginGroup_0();
};

ImGui.prototype['EndGroup'] = ImGui.prototype.EndGroup = function() {
  _emscripten_bind_ImGui_EndGroup_0();
};

ImGui.prototype['AlignTextToFramePadding'] = ImGui.prototype.AlignTextToFramePadding = function() {
  _emscripten_bind_ImGui_AlignTextToFramePadding_0();
};

ImGui.prototype['GetTextLineHeight'] = ImGui.prototype.GetTextLineHeight = function() {
  return _emscripten_bind_ImGui_GetTextLineHeight_0();
};

ImGui.prototype['GetTextLineHeightWithSpacing'] = ImGui.prototype.GetTextLineHeightWithSpacing = function() {
  return _emscripten_bind_ImGui_GetTextLineHeightWithSpacing_0();
};

ImGui.prototype['GetFrameHeight'] = ImGui.prototype.GetFrameHeight = function() {
  return _emscripten_bind_ImGui_GetFrameHeight_0();
};

ImGui.prototype['GetFrameHeightWithSpacing'] = ImGui.prototype.GetFrameHeightWithSpacing = function() {
  return _emscripten_bind_ImGui_GetFrameHeightWithSpacing_0();
};

ImGui.prototype['PushID__0'] = ImGui.prototype.PushID__0 = function(str_id) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  _emscripten_bind_ImGui_PushID__0_1(str_id);
};

ImGui.prototype['PushID__1'] = ImGui.prototype.PushID__1 = function(str_id_begin, str_id_end) {
  ensureCache.prepare();
  if (str_id_begin && typeof str_id_begin === 'object') str_id_begin = str_id_begin.ptr;
  else str_id_begin = ensureString(str_id_begin);
  if (str_id_end && typeof str_id_end === 'object') str_id_end = str_id_end.ptr;
  else str_id_end = ensureString(str_id_end);
  _emscripten_bind_ImGui_PushID__1_2(str_id_begin, str_id_end);
};

ImGui.prototype['PushID__2'] = ImGui.prototype.PushID__2 = function(int_id) {
  if (int_id && typeof int_id === 'object') int_id = int_id.ptr;
  _emscripten_bind_ImGui_PushID__2_1(int_id);
};

ImGui.prototype['PushID__3'] = ImGui.prototype.PushID__3 = function(int_id) {
  if (int_id && typeof int_id === 'object') int_id = int_id.ptr;
  _emscripten_bind_ImGui_PushID__3_1(int_id);
};

ImGui.prototype['PopID'] = ImGui.prototype.PopID = function() {
  _emscripten_bind_ImGui_PopID_0();
};

ImGui.prototype['GetID__0'] = ImGui.prototype.GetID__0 = function(str_id) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  return _emscripten_bind_ImGui_GetID__0_1(str_id);
};

ImGui.prototype['GetID__1'] = ImGui.prototype.GetID__1 = function(str_id_begin, str_id_end) {
  ensureCache.prepare();
  if (str_id_begin && typeof str_id_begin === 'object') str_id_begin = str_id_begin.ptr;
  else str_id_begin = ensureString(str_id_begin);
  if (str_id_end && typeof str_id_end === 'object') str_id_end = str_id_end.ptr;
  else str_id_end = ensureString(str_id_end);
  return _emscripten_bind_ImGui_GetID__1_2(str_id_begin, str_id_end);
};

ImGui.prototype['GetID__2'] = ImGui.prototype.GetID__2 = function(ptr_id) {
  if (ptr_id && typeof ptr_id === 'object') ptr_id = ptr_id.ptr;
  return _emscripten_bind_ImGui_GetID__2_1(ptr_id);
};

ImGui.prototype['GetID__3'] = ImGui.prototype.GetID__3 = function(int_id) {
  if (int_id && typeof int_id === 'object') int_id = int_id.ptr;
  return _emscripten_bind_ImGui_GetID__3_1(int_id);
};

ImGui.prototype['TextUnformatted'] = ImGui.prototype.TextUnformatted = function(text, text_end) {
  ensureCache.prepare();
  if (text && typeof text === 'object') text = text.ptr;
  else text = ensureString(text);
  if (text_end && typeof text_end === 'object') text_end = text_end.ptr;
  else text_end = ensureString(text_end);
  if (text_end === undefined) { _emscripten_bind_ImGui_TextUnformatted_1(text); return }
  _emscripten_bind_ImGui_TextUnformatted_2(text, text_end);
};

ImGui.prototype['Text'] = ImGui.prototype.Text = function(fmt) {
  ensureCache.prepare();
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  _emscripten_bind_ImGui_Text_1(fmt);
};

ImGui.prototype['TextColored'] = ImGui.prototype.TextColored = function(col, fmt) {
  ensureCache.prepare();
  if (col && typeof col === 'object') col = col.ptr;
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  _emscripten_bind_ImGui_TextColored_2(col, fmt);
};

ImGui.prototype['TextDisabled'] = ImGui.prototype.TextDisabled = function(fmt) {
  ensureCache.prepare();
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  _emscripten_bind_ImGui_TextDisabled_1(fmt);
};

ImGui.prototype['TextWrapped'] = ImGui.prototype.TextWrapped = function(fmt) {
  ensureCache.prepare();
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  _emscripten_bind_ImGui_TextWrapped_1(fmt);
};

ImGui.prototype['LabelText'] = ImGui.prototype.LabelText = function(label, fmt) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  _emscripten_bind_ImGui_LabelText_2(label, fmt);
};

ImGui.prototype['BulletText'] = ImGui.prototype.BulletText = function(fmt) {
  ensureCache.prepare();
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  _emscripten_bind_ImGui_BulletText_1(fmt);
};

ImGui.prototype['SeparatorText'] = ImGui.prototype.SeparatorText = function(label) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_ImGui_SeparatorText_1(label);
};

ImGui.prototype['Button'] = ImGui.prototype.Button = function(label, size) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (size && typeof size === 'object') size = size.ptr;
  if (size === undefined) { return !!(_emscripten_bind_ImGui_Button_1(label)) }
  return !!(_emscripten_bind_ImGui_Button_2(label, size));
};

ImGui.prototype['SmallButton'] = ImGui.prototype.SmallButton = function(label) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  return !!(_emscripten_bind_ImGui_SmallButton_1(label));
};

ImGui.prototype['InvisibleButton'] = ImGui.prototype.InvisibleButton = function(str_id, size, flags) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (size && typeof size === 'object') size = size.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InvisibleButton_2(str_id, size)) }
  return !!(_emscripten_bind_ImGui_InvisibleButton_3(str_id, size, flags));
};

ImGui.prototype['ArrowButton'] = ImGui.prototype.ArrowButton = function(str_id, dir) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (dir && typeof dir === 'object') dir = dir.ptr;
  return !!(_emscripten_bind_ImGui_ArrowButton_2(str_id, dir));
};

ImGui.prototype['Checkbox'] = ImGui.prototype.Checkbox = function(label, v) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  return !!(_emscripten_bind_ImGui_Checkbox_2(label, v));
};

ImGui.prototype['CheckboxFlags'] = ImGui.prototype.CheckboxFlags = function(label, flags, flags_value) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof flags == 'object') { flags = ensureInt32(flags); }
  if (flags_value && typeof flags_value === 'object') flags_value = flags_value.ptr;
  return !!(_emscripten_bind_ImGui_CheckboxFlags_3(label, flags, flags_value));
};

ImGui.prototype['RadioButton__0'] = ImGui.prototype.RadioButton__0 = function(label, active) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (active && typeof active === 'object') active = active.ptr;
  return !!(_emscripten_bind_ImGui_RadioButton__0_2(label, active));
};

ImGui.prototype['RadioButton__1'] = ImGui.prototype.RadioButton__1 = function(label, v, v_button) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (v_button && typeof v_button === 'object') v_button = v_button.ptr;
  return !!(_emscripten_bind_ImGui_RadioButton__1_3(label, v, v_button));
};

ImGui.prototype['ProgressBar'] = ImGui.prototype.ProgressBar = function(fraction, size_arg, overlay) {
  ensureCache.prepare();
  if (fraction && typeof fraction === 'object') fraction = fraction.ptr;
  if (size_arg && typeof size_arg === 'object') size_arg = size_arg.ptr;
  if (overlay && typeof overlay === 'object') overlay = overlay.ptr;
  else overlay = ensureString(overlay);
  if (size_arg === undefined) { _emscripten_bind_ImGui_ProgressBar_1(fraction); return }
  if (overlay === undefined) { _emscripten_bind_ImGui_ProgressBar_2(fraction, size_arg); return }
  _emscripten_bind_ImGui_ProgressBar_3(fraction, size_arg, overlay);
};

ImGui.prototype['Bullet'] = ImGui.prototype.Bullet = function() {
  _emscripten_bind_ImGui_Bullet_0();
};

ImGui.prototype['TextLink'] = ImGui.prototype.TextLink = function(label) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  return !!(_emscripten_bind_ImGui_TextLink_1(label));
};

ImGui.prototype['TextLinkOpenURL'] = ImGui.prototype.TextLinkOpenURL = function(label, url) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (url && typeof url === 'object') url = url.ptr;
  else url = ensureString(url);
  if (url === undefined) { _emscripten_bind_ImGui_TextLinkOpenURL_1(label); return }
  _emscripten_bind_ImGui_TextLinkOpenURL_2(label, url);
};

ImGui.prototype['Image'] = ImGui.prototype.Image = function(tex_ref, image_size, uv0, uv1) {
  if (tex_ref && typeof tex_ref === 'object') tex_ref = tex_ref.ptr;
  if (image_size && typeof image_size === 'object') image_size = image_size.ptr;
  if (uv0 && typeof uv0 === 'object') uv0 = uv0.ptr;
  if (uv1 && typeof uv1 === 'object') uv1 = uv1.ptr;
  if (uv0 === undefined) { _emscripten_bind_ImGui_Image_2(tex_ref, image_size); return }
  if (uv1 === undefined) { _emscripten_bind_ImGui_Image_3(tex_ref, image_size, uv0); return }
  _emscripten_bind_ImGui_Image_4(tex_ref, image_size, uv0, uv1);
};

ImGui.prototype['ImageWithBg'] = ImGui.prototype.ImageWithBg = function(tex_ref, image_size, uv0, uv1, bg_col, tint_col) {
  if (tex_ref && typeof tex_ref === 'object') tex_ref = tex_ref.ptr;
  if (image_size && typeof image_size === 'object') image_size = image_size.ptr;
  if (uv0 && typeof uv0 === 'object') uv0 = uv0.ptr;
  if (uv1 && typeof uv1 === 'object') uv1 = uv1.ptr;
  if (bg_col && typeof bg_col === 'object') bg_col = bg_col.ptr;
  if (tint_col && typeof tint_col === 'object') tint_col = tint_col.ptr;
  if (uv0 === undefined) { _emscripten_bind_ImGui_ImageWithBg_2(tex_ref, image_size); return }
  if (uv1 === undefined) { _emscripten_bind_ImGui_ImageWithBg_3(tex_ref, image_size, uv0); return }
  if (bg_col === undefined) { _emscripten_bind_ImGui_ImageWithBg_4(tex_ref, image_size, uv0, uv1); return }
  if (tint_col === undefined) { _emscripten_bind_ImGui_ImageWithBg_5(tex_ref, image_size, uv0, uv1, bg_col); return }
  _emscripten_bind_ImGui_ImageWithBg_6(tex_ref, image_size, uv0, uv1, bg_col, tint_col);
};

ImGui.prototype['ImageButton'] = ImGui.prototype.ImageButton = function(str_id, tex_ref, image_size, uv0, uv1, bg_col, tint_col) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (tex_ref && typeof tex_ref === 'object') tex_ref = tex_ref.ptr;
  if (image_size && typeof image_size === 'object') image_size = image_size.ptr;
  if (uv0 && typeof uv0 === 'object') uv0 = uv0.ptr;
  if (uv1 && typeof uv1 === 'object') uv1 = uv1.ptr;
  if (bg_col && typeof bg_col === 'object') bg_col = bg_col.ptr;
  if (tint_col && typeof tint_col === 'object') tint_col = tint_col.ptr;
  if (uv0 === undefined) { return !!(_emscripten_bind_ImGui_ImageButton_3(str_id, tex_ref, image_size)) }
  if (uv1 === undefined) { return !!(_emscripten_bind_ImGui_ImageButton_4(str_id, tex_ref, image_size, uv0)) }
  if (bg_col === undefined) { return !!(_emscripten_bind_ImGui_ImageButton_5(str_id, tex_ref, image_size, uv0, uv1)) }
  if (tint_col === undefined) { return !!(_emscripten_bind_ImGui_ImageButton_6(str_id, tex_ref, image_size, uv0, uv1, bg_col)) }
  return !!(_emscripten_bind_ImGui_ImageButton_7(str_id, tex_ref, image_size, uv0, uv1, bg_col, tint_col));
};

ImGui.prototype['BeginCombo'] = ImGui.prototype.BeginCombo = function(label, preview_value, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (preview_value && typeof preview_value === 'object') preview_value = preview_value.ptr;
  else preview_value = ensureString(preview_value);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_BeginCombo_2(label, preview_value)) }
  return !!(_emscripten_bind_ImGui_BeginCombo_3(label, preview_value, flags));
};

ImGui.prototype['EndCombo'] = ImGui.prototype.EndCombo = function() {
  _emscripten_bind_ImGui_EndCombo_0();
};

ImGui.prototype['Combo'] = ImGui.prototype.Combo = function(label, current_item, items_separated_by_zeros, popup_max_height_in_items) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof current_item == 'object') { current_item = ensureInt32(current_item); }
  if (items_separated_by_zeros && typeof items_separated_by_zeros === 'object') items_separated_by_zeros = items_separated_by_zeros.ptr;
  else items_separated_by_zeros = ensureString(items_separated_by_zeros);
  if (popup_max_height_in_items && typeof popup_max_height_in_items === 'object') popup_max_height_in_items = popup_max_height_in_items.ptr;
  if (popup_max_height_in_items === undefined) { return !!(_emscripten_bind_ImGui_Combo_3(label, current_item, items_separated_by_zeros)) }
  return !!(_emscripten_bind_ImGui_Combo_4(label, current_item, items_separated_by_zeros, popup_max_height_in_items));
};

ImGui.prototype['DragFloat'] = ImGui.prototype.DragFloat = function(label, v, v_speed, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragFloat_2(label, v)) }
  if (v_min === undefined) { return !!(_emscripten_bind_ImGui_DragFloat_3(label, v, v_speed)) }
  if (v_max === undefined) { return !!(_emscripten_bind_ImGui_DragFloat_4(label, v, v_speed, v_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragFloat_5(label, v, v_speed, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragFloat_6(label, v, v_speed, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_DragFloat_7(label, v, v_speed, v_min, v_max, format, flags));
};

ImGui.prototype['DragFloat2'] = ImGui.prototype.DragFloat2 = function(label, v, v_speed, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragFloat2_2(label, v)) }
  if (v_min === undefined) { return !!(_emscripten_bind_ImGui_DragFloat2_3(label, v, v_speed)) }
  if (v_max === undefined) { return !!(_emscripten_bind_ImGui_DragFloat2_4(label, v, v_speed, v_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragFloat2_5(label, v, v_speed, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragFloat2_6(label, v, v_speed, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_DragFloat2_7(label, v, v_speed, v_min, v_max, format, flags));
};

ImGui.prototype['DragFloat3'] = ImGui.prototype.DragFloat3 = function(label, v, v_speed, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragFloat3_2(label, v)) }
  if (v_min === undefined) { return !!(_emscripten_bind_ImGui_DragFloat3_3(label, v, v_speed)) }
  if (v_max === undefined) { return !!(_emscripten_bind_ImGui_DragFloat3_4(label, v, v_speed, v_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragFloat3_5(label, v, v_speed, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragFloat3_6(label, v, v_speed, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_DragFloat3_7(label, v, v_speed, v_min, v_max, format, flags));
};

ImGui.prototype['DragFloat4'] = ImGui.prototype.DragFloat4 = function(label, v, v_speed, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragFloat4_2(label, v)) }
  if (v_min === undefined) { return !!(_emscripten_bind_ImGui_DragFloat4_3(label, v, v_speed)) }
  if (v_max === undefined) { return !!(_emscripten_bind_ImGui_DragFloat4_4(label, v, v_speed, v_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragFloat4_5(label, v, v_speed, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragFloat4_6(label, v, v_speed, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_DragFloat4_7(label, v, v_speed, v_min, v_max, format, flags));
};

ImGui.prototype['DragFloatRange2'] = ImGui.prototype.DragFloatRange2 = function(label, v_current_min, v_current_max, v_speed, v_min, v_max, format, format_max, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v_current_min == 'object') { v_current_min = ensureFloat32(v_current_min); }
  if (typeof v_current_max == 'object') { v_current_max = ensureFloat32(v_current_max); }
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (format_max && typeof format_max === 'object') format_max = format_max.ptr;
  else format_max = ensureString(format_max);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragFloatRange2_3(label, v_current_min, v_current_max)) }
  if (v_min === undefined) { return !!(_emscripten_bind_ImGui_DragFloatRange2_4(label, v_current_min, v_current_max, v_speed)) }
  if (v_max === undefined) { return !!(_emscripten_bind_ImGui_DragFloatRange2_5(label, v_current_min, v_current_max, v_speed, v_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragFloatRange2_6(label, v_current_min, v_current_max, v_speed, v_min, v_max)) }
  if (format_max === undefined) { return !!(_emscripten_bind_ImGui_DragFloatRange2_7(label, v_current_min, v_current_max, v_speed, v_min, v_max, format)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragFloatRange2_8(label, v_current_min, v_current_max, v_speed, v_min, v_max, format, format_max)) }
  return !!(_emscripten_bind_ImGui_DragFloatRange2_9(label, v_current_min, v_current_max, v_speed, v_min, v_max, format, format_max, flags));
};

ImGui.prototype['DragInt'] = ImGui.prototype.DragInt = function(label, v, v_speed, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragInt_2(label, v)) }
  if (v_min === undefined) { return !!(_emscripten_bind_ImGui_DragInt_3(label, v, v_speed)) }
  if (v_max === undefined) { return !!(_emscripten_bind_ImGui_DragInt_4(label, v, v_speed, v_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragInt_5(label, v, v_speed, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragInt_6(label, v, v_speed, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_DragInt_7(label, v, v_speed, v_min, v_max, format, flags));
};

ImGui.prototype['DragInt2'] = ImGui.prototype.DragInt2 = function(label, v, v_speed, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragInt2_2(label, v)) }
  if (v_min === undefined) { return !!(_emscripten_bind_ImGui_DragInt2_3(label, v, v_speed)) }
  if (v_max === undefined) { return !!(_emscripten_bind_ImGui_DragInt2_4(label, v, v_speed, v_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragInt2_5(label, v, v_speed, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragInt2_6(label, v, v_speed, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_DragInt2_7(label, v, v_speed, v_min, v_max, format, flags));
};

ImGui.prototype['DragInt3'] = ImGui.prototype.DragInt3 = function(label, v, v_speed, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragInt3_2(label, v)) }
  if (v_min === undefined) { return !!(_emscripten_bind_ImGui_DragInt3_3(label, v, v_speed)) }
  if (v_max === undefined) { return !!(_emscripten_bind_ImGui_DragInt3_4(label, v, v_speed, v_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragInt3_5(label, v, v_speed, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragInt3_6(label, v, v_speed, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_DragInt3_7(label, v, v_speed, v_min, v_max, format, flags));
};

ImGui.prototype['DragInt4'] = ImGui.prototype.DragInt4 = function(label, v, v_speed, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragInt4_2(label, v)) }
  if (v_min === undefined) { return !!(_emscripten_bind_ImGui_DragInt4_3(label, v, v_speed)) }
  if (v_max === undefined) { return !!(_emscripten_bind_ImGui_DragInt4_4(label, v, v_speed, v_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragInt4_5(label, v, v_speed, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragInt4_6(label, v, v_speed, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_DragInt4_7(label, v, v_speed, v_min, v_max, format, flags));
};

ImGui.prototype['DragIntRange2'] = ImGui.prototype.DragIntRange2 = function(label, v_current_min, v_current_max, v_speed, v_min, v_max, format, format_max, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v_current_min == 'object') { v_current_min = ensureInt32(v_current_min); }
  if (typeof v_current_max == 'object') { v_current_max = ensureInt32(v_current_max); }
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (format_max && typeof format_max === 'object') format_max = format_max.ptr;
  else format_max = ensureString(format_max);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragIntRange2_3(label, v_current_min, v_current_max)) }
  if (v_min === undefined) { return !!(_emscripten_bind_ImGui_DragIntRange2_4(label, v_current_min, v_current_max, v_speed)) }
  if (v_max === undefined) { return !!(_emscripten_bind_ImGui_DragIntRange2_5(label, v_current_min, v_current_max, v_speed, v_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragIntRange2_6(label, v_current_min, v_current_max, v_speed, v_min, v_max)) }
  if (format_max === undefined) { return !!(_emscripten_bind_ImGui_DragIntRange2_7(label, v_current_min, v_current_max, v_speed, v_min, v_max, format)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragIntRange2_8(label, v_current_min, v_current_max, v_speed, v_min, v_max, format, format_max)) }
  return !!(_emscripten_bind_ImGui_DragIntRange2_9(label, v_current_min, v_current_max, v_speed, v_min, v_max, format, format_max, flags));
};

ImGui.prototype['DragScalar'] = ImGui.prototype.DragScalar = function(label, data_type, p_data, v_speed, p_min, p_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (data_type && typeof data_type === 'object') data_type = data_type.ptr;
  if (p_data && typeof p_data === 'object') p_data = p_data.ptr;
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragScalar_3(label, data_type, p_data)) }
  if (p_min === undefined) { return !!(_emscripten_bind_ImGui_DragScalar_4(label, data_type, p_data, v_speed)) }
  if (p_max === undefined) { return !!(_emscripten_bind_ImGui_DragScalar_5(label, data_type, p_data, v_speed, p_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragScalar_6(label, data_type, p_data, v_speed, p_min, p_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragScalar_7(label, data_type, p_data, v_speed, p_min, p_max, format)) }
  return !!(_emscripten_bind_ImGui_DragScalar_8(label, data_type, p_data, v_speed, p_min, p_max, format, flags));
};

ImGui.prototype['DragScalarN'] = ImGui.prototype.DragScalarN = function(label, data_type, p_data, components, v_speed, p_min, p_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (data_type && typeof data_type === 'object') data_type = data_type.ptr;
  if (p_data && typeof p_data === 'object') p_data = p_data.ptr;
  if (components && typeof components === 'object') components = components.ptr;
  if (v_speed && typeof v_speed === 'object') v_speed = v_speed.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_speed === undefined) { return !!(_emscripten_bind_ImGui_DragScalarN_4(label, data_type, p_data, components)) }
  if (p_min === undefined) { return !!(_emscripten_bind_ImGui_DragScalarN_5(label, data_type, p_data, components, v_speed)) }
  if (p_max === undefined) { return !!(_emscripten_bind_ImGui_DragScalarN_6(label, data_type, p_data, components, v_speed, p_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_DragScalarN_7(label, data_type, p_data, components, v_speed, p_min, p_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_DragScalarN_8(label, data_type, p_data, components, v_speed, p_min, p_max, format)) }
  return !!(_emscripten_bind_ImGui_DragScalarN_9(label, data_type, p_data, components, v_speed, p_min, p_max, format, flags));
};

ImGui.prototype['SliderFloat'] = ImGui.prototype.SliderFloat = function(label, v, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_SliderFloat_4(label, v, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_SliderFloat_5(label, v, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_SliderFloat_6(label, v, v_min, v_max, format, flags));
};

ImGui.prototype['SliderFloat2'] = ImGui.prototype.SliderFloat2 = function(label, v, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_SliderFloat2_4(label, v, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_SliderFloat2_5(label, v, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_SliderFloat2_6(label, v, v_min, v_max, format, flags));
};

ImGui.prototype['SliderFloat3'] = ImGui.prototype.SliderFloat3 = function(label, v, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_SliderFloat3_4(label, v, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_SliderFloat3_5(label, v, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_SliderFloat3_6(label, v, v_min, v_max, format, flags));
};

ImGui.prototype['SliderFloat4'] = ImGui.prototype.SliderFloat4 = function(label, v, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_SliderFloat4_4(label, v, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_SliderFloat4_5(label, v, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_SliderFloat4_6(label, v, v_min, v_max, format, flags));
};

ImGui.prototype['SliderAngle'] = ImGui.prototype.SliderAngle = function(label, v_rad, v_degrees_min, v_degrees_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v_rad == 'object') { v_rad = ensureFloat32(v_rad); }
  if (v_degrees_min && typeof v_degrees_min === 'object') v_degrees_min = v_degrees_min.ptr;
  if (v_degrees_max && typeof v_degrees_max === 'object') v_degrees_max = v_degrees_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (v_degrees_min === undefined) { return !!(_emscripten_bind_ImGui_SliderAngle_2(label, v_rad)) }
  if (v_degrees_max === undefined) { return !!(_emscripten_bind_ImGui_SliderAngle_3(label, v_rad, v_degrees_min)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_SliderAngle_4(label, v_rad, v_degrees_min, v_degrees_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_SliderAngle_5(label, v_rad, v_degrees_min, v_degrees_max, format)) }
  return !!(_emscripten_bind_ImGui_SliderAngle_6(label, v_rad, v_degrees_min, v_degrees_max, format, flags));
};

ImGui.prototype['SliderInt'] = ImGui.prototype.SliderInt = function(label, v, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_SliderInt_4(label, v, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_SliderInt_5(label, v, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_SliderInt_6(label, v, v_min, v_max, format, flags));
};

ImGui.prototype['SliderInt2'] = ImGui.prototype.SliderInt2 = function(label, v, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_SliderInt2_4(label, v, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_SliderInt2_5(label, v, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_SliderInt2_6(label, v, v_min, v_max, format, flags));
};

ImGui.prototype['SliderInt3'] = ImGui.prototype.SliderInt3 = function(label, v, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_SliderInt3_4(label, v, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_SliderInt3_5(label, v, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_SliderInt3_6(label, v, v_min, v_max, format, flags));
};

ImGui.prototype['SliderInt4'] = ImGui.prototype.SliderInt4 = function(label, v, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_SliderInt4_4(label, v, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_SliderInt4_5(label, v, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_SliderInt4_6(label, v, v_min, v_max, format, flags));
};

ImGui.prototype['SliderScalar'] = ImGui.prototype.SliderScalar = function(label, data_type, p_data, p_min, p_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (data_type && typeof data_type === 'object') data_type = data_type.ptr;
  if (p_data && typeof p_data === 'object') p_data = p_data.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_SliderScalar_5(label, data_type, p_data, p_min, p_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_SliderScalar_6(label, data_type, p_data, p_min, p_max, format)) }
  return !!(_emscripten_bind_ImGui_SliderScalar_7(label, data_type, p_data, p_min, p_max, format, flags));
};

ImGui.prototype['SliderScalarN'] = ImGui.prototype.SliderScalarN = function(label, data_type, p_data, components, p_min, p_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (data_type && typeof data_type === 'object') data_type = data_type.ptr;
  if (p_data && typeof p_data === 'object') p_data = p_data.ptr;
  if (components && typeof components === 'object') components = components.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_SliderScalarN_6(label, data_type, p_data, components, p_min, p_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_SliderScalarN_7(label, data_type, p_data, components, p_min, p_max, format)) }
  return !!(_emscripten_bind_ImGui_SliderScalarN_8(label, data_type, p_data, components, p_min, p_max, format, flags));
};

ImGui.prototype['VSliderFloat'] = ImGui.prototype.VSliderFloat = function(label, size, v, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (size && typeof size === 'object') size = size.ptr;
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_VSliderFloat_5(label, size, v, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_VSliderFloat_6(label, size, v, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_VSliderFloat_7(label, size, v, v_min, v_max, format, flags));
};

ImGui.prototype['VSliderInt'] = ImGui.prototype.VSliderInt = function(label, size, v, v_min, v_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (size && typeof size === 'object') size = size.ptr;
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (v_min && typeof v_min === 'object') v_min = v_min.ptr;
  if (v_max && typeof v_max === 'object') v_max = v_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_VSliderInt_5(label, size, v, v_min, v_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_VSliderInt_6(label, size, v, v_min, v_max, format)) }
  return !!(_emscripten_bind_ImGui_VSliderInt_7(label, size, v, v_min, v_max, format, flags));
};

ImGui.prototype['VSliderScalar'] = ImGui.prototype.VSliderScalar = function(label, size, data_type, p_data, p_min, p_max, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (size && typeof size === 'object') size = size.ptr;
  if (data_type && typeof data_type === 'object') data_type = data_type.ptr;
  if (p_data && typeof p_data === 'object') p_data = p_data.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_VSliderScalar_6(label, size, data_type, p_data, p_min, p_max)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_VSliderScalar_7(label, size, data_type, p_data, p_min, p_max, format)) }
  return !!(_emscripten_bind_ImGui_VSliderScalar_8(label, size, data_type, p_data, p_min, p_max, format, flags));
};

ImGui.prototype['InputText'] = ImGui.prototype.InputText = function(label, buf, buf_size, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof buf == 'object') { buf = ensureInt8(buf); }
  if (buf_size && typeof buf_size === 'object') buf_size = buf_size.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputText_3(label, buf, buf_size)) }
  return !!(_emscripten_bind_ImGui_InputText_4(label, buf, buf_size, flags));
};

ImGui.prototype['InputTextMultiline'] = ImGui.prototype.InputTextMultiline = function(label, buf, buf_size, size, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof buf == 'object') { buf = ensureInt8(buf); }
  if (buf_size && typeof buf_size === 'object') buf_size = buf_size.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (size === undefined) { return !!(_emscripten_bind_ImGui_InputTextMultiline_3(label, buf, buf_size)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputTextMultiline_4(label, buf, buf_size, size)) }
  return !!(_emscripten_bind_ImGui_InputTextMultiline_5(label, buf, buf_size, size, flags));
};

ImGui.prototype['InputTextWithHint'] = ImGui.prototype.InputTextWithHint = function(label, hint, buf, buf_size, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (hint && typeof hint === 'object') hint = hint.ptr;
  else hint = ensureString(hint);
  if (typeof buf == 'object') { buf = ensureInt8(buf); }
  if (buf_size && typeof buf_size === 'object') buf_size = buf_size.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputTextWithHint_4(label, hint, buf, buf_size)) }
  return !!(_emscripten_bind_ImGui_InputTextWithHint_5(label, hint, buf, buf_size, flags));
};

ImGui.prototype['InputFloat'] = ImGui.prototype.InputFloat = function(label, v, step, step_fast, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (step && typeof step === 'object') step = step.ptr;
  if (step_fast && typeof step_fast === 'object') step_fast = step_fast.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (step === undefined) { return !!(_emscripten_bind_ImGui_InputFloat_2(label, v)) }
  if (step_fast === undefined) { return !!(_emscripten_bind_ImGui_InputFloat_3(label, v, step)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_InputFloat_4(label, v, step, step_fast)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputFloat_5(label, v, step, step_fast, format)) }
  return !!(_emscripten_bind_ImGui_InputFloat_6(label, v, step, step_fast, format, flags));
};

ImGui.prototype['InputFloat2'] = ImGui.prototype.InputFloat2 = function(label, v, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_InputFloat2_2(label, v)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputFloat2_3(label, v, format)) }
  return !!(_emscripten_bind_ImGui_InputFloat2_4(label, v, format, flags));
};

ImGui.prototype['InputFloat3'] = ImGui.prototype.InputFloat3 = function(label, v, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_InputFloat3_2(label, v)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputFloat3_3(label, v, format)) }
  return !!(_emscripten_bind_ImGui_InputFloat3_4(label, v, format, flags));
};

ImGui.prototype['InputFloat4'] = ImGui.prototype.InputFloat4 = function(label, v, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat32(v); }
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (format === undefined) { return !!(_emscripten_bind_ImGui_InputFloat4_2(label, v)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputFloat4_3(label, v, format)) }
  return !!(_emscripten_bind_ImGui_InputFloat4_4(label, v, format, flags));
};

ImGui.prototype['InputInt'] = ImGui.prototype.InputInt = function(label, v, step, step_fast, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (step && typeof step === 'object') step = step.ptr;
  if (step_fast && typeof step_fast === 'object') step_fast = step_fast.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (step === undefined) { return !!(_emscripten_bind_ImGui_InputInt_2(label, v)) }
  if (step_fast === undefined) { return !!(_emscripten_bind_ImGui_InputInt_3(label, v, step)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputInt_4(label, v, step, step_fast)) }
  return !!(_emscripten_bind_ImGui_InputInt_5(label, v, step, step_fast, flags));
};

ImGui.prototype['InputInt2'] = ImGui.prototype.InputInt2 = function(label, v, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputInt2_2(label, v)) }
  return !!(_emscripten_bind_ImGui_InputInt2_3(label, v, flags));
};

ImGui.prototype['InputInt3'] = ImGui.prototype.InputInt3 = function(label, v, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputInt3_2(label, v)) }
  return !!(_emscripten_bind_ImGui_InputInt3_3(label, v, flags));
};

ImGui.prototype['InputInt4'] = ImGui.prototype.InputInt4 = function(label, v, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureInt32(v); }
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputInt4_2(label, v)) }
  return !!(_emscripten_bind_ImGui_InputInt4_3(label, v, flags));
};

ImGui.prototype['InputDouble'] = ImGui.prototype.InputDouble = function(label, v, step, step_fast, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof v == 'object') { v = ensureFloat64(v); }
  if (step && typeof step === 'object') step = step.ptr;
  if (step_fast && typeof step_fast === 'object') step_fast = step_fast.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (step === undefined) { return !!(_emscripten_bind_ImGui_InputDouble_2(label, v)) }
  if (step_fast === undefined) { return !!(_emscripten_bind_ImGui_InputDouble_3(label, v, step)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_InputDouble_4(label, v, step, step_fast)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputDouble_5(label, v, step, step_fast, format)) }
  return !!(_emscripten_bind_ImGui_InputDouble_6(label, v, step, step_fast, format, flags));
};

ImGui.prototype['InputScalar'] = ImGui.prototype.InputScalar = function(label, data_type, p_data, p_step, p_step_fast, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (data_type && typeof data_type === 'object') data_type = data_type.ptr;
  if (p_data && typeof p_data === 'object') p_data = p_data.ptr;
  if (p_step && typeof p_step === 'object') p_step = p_step.ptr;
  if (p_step_fast && typeof p_step_fast === 'object') p_step_fast = p_step_fast.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (p_step === undefined) { return !!(_emscripten_bind_ImGui_InputScalar_3(label, data_type, p_data)) }
  if (p_step_fast === undefined) { return !!(_emscripten_bind_ImGui_InputScalar_4(label, data_type, p_data, p_step)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_InputScalar_5(label, data_type, p_data, p_step, p_step_fast)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputScalar_6(label, data_type, p_data, p_step, p_step_fast, format)) }
  return !!(_emscripten_bind_ImGui_InputScalar_7(label, data_type, p_data, p_step, p_step_fast, format, flags));
};

ImGui.prototype['InputScalarN'] = ImGui.prototype.InputScalarN = function(label, data_type, p_data, components, p_step, p_step_fast, format, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (data_type && typeof data_type === 'object') data_type = data_type.ptr;
  if (p_data && typeof p_data === 'object') p_data = p_data.ptr;
  if (components && typeof components === 'object') components = components.ptr;
  if (p_step && typeof p_step === 'object') p_step = p_step.ptr;
  if (p_step_fast && typeof p_step_fast === 'object') p_step_fast = p_step_fast.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  else format = ensureString(format);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (p_step === undefined) { return !!(_emscripten_bind_ImGui_InputScalarN_4(label, data_type, p_data, components)) }
  if (p_step_fast === undefined) { return !!(_emscripten_bind_ImGui_InputScalarN_5(label, data_type, p_data, components, p_step)) }
  if (format === undefined) { return !!(_emscripten_bind_ImGui_InputScalarN_6(label, data_type, p_data, components, p_step, p_step_fast)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_InputScalarN_7(label, data_type, p_data, components, p_step, p_step_fast, format)) }
  return !!(_emscripten_bind_ImGui_InputScalarN_8(label, data_type, p_data, components, p_step, p_step_fast, format, flags));
};

ImGui.prototype['ColorEdit3'] = ImGui.prototype.ColorEdit3 = function(label, col, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof col == 'object') { col = ensureFloat32(col); }
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_ColorEdit3_2(label, col)) }
  return !!(_emscripten_bind_ImGui_ColorEdit3_3(label, col, flags));
};

ImGui.prototype['ColorEdit4'] = ImGui.prototype.ColorEdit4 = function(label, col, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof col == 'object') { col = ensureFloat32(col); }
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_ColorEdit4_2(label, col)) }
  return !!(_emscripten_bind_ImGui_ColorEdit4_3(label, col, flags));
};

ImGui.prototype['ColorPicker3'] = ImGui.prototype.ColorPicker3 = function(label, col, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof col == 'object') { col = ensureFloat32(col); }
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_ColorPicker3_2(label, col)) }
  return !!(_emscripten_bind_ImGui_ColorPicker3_3(label, col, flags));
};

ImGui.prototype['ColorPicker4'] = ImGui.prototype.ColorPicker4 = function(label, col, flags, ref_col) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof col == 'object') { col = ensureFloat32(col); }
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (typeof ref_col == 'object') { ref_col = ensureFloat32(ref_col); }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_ColorPicker4_2(label, col)) }
  if (ref_col === undefined) { return !!(_emscripten_bind_ImGui_ColorPicker4_3(label, col, flags)) }
  return !!(_emscripten_bind_ImGui_ColorPicker4_4(label, col, flags, ref_col));
};

ImGui.prototype['ColorButton'] = ImGui.prototype.ColorButton = function(desc_id, col, flags, size) {
  ensureCache.prepare();
  if (desc_id && typeof desc_id === 'object') desc_id = desc_id.ptr;
  else desc_id = ensureString(desc_id);
  if (col && typeof col === 'object') col = col.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_ColorButton_2(desc_id, col)) }
  if (size === undefined) { return !!(_emscripten_bind_ImGui_ColorButton_3(desc_id, col, flags)) }
  return !!(_emscripten_bind_ImGui_ColorButton_4(desc_id, col, flags, size));
};

ImGui.prototype['SetColorEditOptions'] = ImGui.prototype.SetColorEditOptions = function(ImGuiColorEditFlags) {
  if (ImGuiColorEditFlags && typeof ImGuiColorEditFlags === 'object') ImGuiColorEditFlags = ImGuiColorEditFlags.ptr;
  _emscripten_bind_ImGui_SetColorEditOptions_1(ImGuiColorEditFlags);
};

ImGui.prototype['TreeNode__0'] = ImGui.prototype.TreeNode__0 = function(label) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  return !!(_emscripten_bind_ImGui_TreeNode__0_1(label));
};

ImGui.prototype['TreeNode__1'] = ImGui.prototype.TreeNode__1 = function(str_id, fmt) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  return !!(_emscripten_bind_ImGui_TreeNode__1_2(str_id, fmt));
};

ImGui.prototype['TreeNode__2'] = ImGui.prototype.TreeNode__2 = function(ptr_id, fmt) {
  ensureCache.prepare();
  if (ptr_id && typeof ptr_id === 'object') ptr_id = ptr_id.ptr;
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  return !!(_emscripten_bind_ImGui_TreeNode__2_2(ptr_id, fmt));
};

ImGui.prototype['TreeNodeEx__0'] = ImGui.prototype.TreeNodeEx__0 = function(label, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_TreeNodeEx__0_1(label)) }
  return !!(_emscripten_bind_ImGui_TreeNodeEx__0_2(label, flags));
};

ImGui.prototype['TreeNodeEx__1'] = ImGui.prototype.TreeNodeEx__1 = function(str_id, flags, fmt) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  return !!(_emscripten_bind_ImGui_TreeNodeEx__1_3(str_id, flags, fmt));
};

ImGui.prototype['TreeNodeEx__2'] = ImGui.prototype.TreeNodeEx__2 = function(ptr_id, flags, fmt) {
  ensureCache.prepare();
  if (ptr_id && typeof ptr_id === 'object') ptr_id = ptr_id.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  return !!(_emscripten_bind_ImGui_TreeNodeEx__2_3(ptr_id, flags, fmt));
};

ImGui.prototype['TreePush__0'] = ImGui.prototype.TreePush__0 = function(str_id) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  _emscripten_bind_ImGui_TreePush__0_1(str_id);
};

ImGui.prototype['TreePush__1'] = ImGui.prototype.TreePush__1 = function(ptr_id) {
  if (ptr_id && typeof ptr_id === 'object') ptr_id = ptr_id.ptr;
  _emscripten_bind_ImGui_TreePush__1_1(ptr_id);
};

ImGui.prototype['TreePop'] = ImGui.prototype.TreePop = function() {
  _emscripten_bind_ImGui_TreePop_0();
};

ImGui.prototype['GetTreeNodeToLabelSpacing'] = ImGui.prototype.GetTreeNodeToLabelSpacing = function() {
  return _emscripten_bind_ImGui_GetTreeNodeToLabelSpacing_0();
};

ImGui.prototype['CollapsingHeader__0'] = ImGui.prototype.CollapsingHeader__0 = function(label, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_CollapsingHeader__0_1(label)) }
  return !!(_emscripten_bind_ImGui_CollapsingHeader__0_2(label, flags));
};

ImGui.prototype['CollapsingHeader__1'] = ImGui.prototype.CollapsingHeader__1 = function(label, p_visible, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_CollapsingHeader__1_2(label, p_visible)) }
  return !!(_emscripten_bind_ImGui_CollapsingHeader__1_3(label, p_visible, flags));
};

ImGui.prototype['SetNextItemOpen'] = ImGui.prototype.SetNextItemOpen = function(is_open, ImGuiCond) {
  if (is_open && typeof is_open === 'object') is_open = is_open.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (ImGuiCond === undefined) { _emscripten_bind_ImGui_SetNextItemOpen_1(is_open); return }
  _emscripten_bind_ImGui_SetNextItemOpen_2(is_open, ImGuiCond);
};

ImGui.prototype['SetNextItemStorageID'] = ImGui.prototype.SetNextItemStorageID = function(storage_id) {
  if (storage_id && typeof storage_id === 'object') storage_id = storage_id.ptr;
  _emscripten_bind_ImGui_SetNextItemStorageID_1(storage_id);
};

ImGui.prototype['Selectable__0'] = ImGui.prototype.Selectable__0 = function(label, selected, flags, size) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (selected && typeof selected === 'object') selected = selected.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  if (selected === undefined) { return !!(_emscripten_bind_ImGui_Selectable__0_1(label)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_Selectable__0_2(label, selected)) }
  if (size === undefined) { return !!(_emscripten_bind_ImGui_Selectable__0_3(label, selected, flags)) }
  return !!(_emscripten_bind_ImGui_Selectable__0_4(label, selected, flags, size));
};

ImGui.prototype['Selectable__1'] = ImGui.prototype.Selectable__1 = function(label, p_selected, flags, size) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_Selectable__1_2(label, p_selected)) }
  if (size === undefined) { return !!(_emscripten_bind_ImGui_Selectable__1_3(label, p_selected, flags)) }
  return !!(_emscripten_bind_ImGui_Selectable__1_4(label, p_selected, flags, size));
};

ImGui.prototype['BeginMultiSelect'] = ImGui.prototype.BeginMultiSelect = function(flags, selection_size, items_count) {
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (selection_size && typeof selection_size === 'object') selection_size = selection_size.ptr;
  if (items_count && typeof items_count === 'object') items_count = items_count.ptr;
  if (selection_size === undefined) { return wrapPointer(_emscripten_bind_ImGui_BeginMultiSelect_1(flags), ImGuiMultiSelectIO) }
  if (items_count === undefined) { return wrapPointer(_emscripten_bind_ImGui_BeginMultiSelect_2(flags, selection_size), ImGuiMultiSelectIO) }
  return wrapPointer(_emscripten_bind_ImGui_BeginMultiSelect_3(flags, selection_size, items_count), ImGuiMultiSelectIO);
};

ImGui.prototype['EndMultiSelect'] = ImGui.prototype.EndMultiSelect = function() {
  return wrapPointer(_emscripten_bind_ImGui_EndMultiSelect_0(), ImGuiMultiSelectIO);
};

ImGui.prototype['SetNextItemSelectionUserData'] = ImGui.prototype.SetNextItemSelectionUserData = function(selection_user_data) {
  if (selection_user_data && typeof selection_user_data === 'object') selection_user_data = selection_user_data.ptr;
  _emscripten_bind_ImGui_SetNextItemSelectionUserData_1(selection_user_data);
};

ImGui.prototype['IsItemToggledSelection'] = ImGui.prototype.IsItemToggledSelection = function() {
  return !!(_emscripten_bind_ImGui_IsItemToggledSelection_0());
};

ImGui.prototype['BeginListBox'] = ImGui.prototype.BeginListBox = function(label, size) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (size && typeof size === 'object') size = size.ptr;
  if (size === undefined) { return !!(_emscripten_bind_ImGui_BeginListBox_1(label)) }
  return !!(_emscripten_bind_ImGui_BeginListBox_2(label, size));
};

ImGui.prototype['EndListBox'] = ImGui.prototype.EndListBox = function() {
  _emscripten_bind_ImGui_EndListBox_0();
};

ImGui.prototype['PlotLines'] = ImGui.prototype.PlotLines = function(label, values, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size, stride) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof values == 'object') { values = ensureFloat32(values); }
  if (values_count && typeof values_count === 'object') values_count = values_count.ptr;
  if (values_offset && typeof values_offset === 'object') values_offset = values_offset.ptr;
  if (overlay_text && typeof overlay_text === 'object') overlay_text = overlay_text.ptr;
  else overlay_text = ensureString(overlay_text);
  if (scale_min && typeof scale_min === 'object') scale_min = scale_min.ptr;
  if (scale_max && typeof scale_max === 'object') scale_max = scale_max.ptr;
  if (graph_size && typeof graph_size === 'object') graph_size = graph_size.ptr;
  if (stride && typeof stride === 'object') stride = stride.ptr;
  if (values_offset === undefined) { _emscripten_bind_ImGui_PlotLines_3(label, values, values_count); return }
  if (overlay_text === undefined) { _emscripten_bind_ImGui_PlotLines_4(label, values, values_count, values_offset); return }
  if (scale_min === undefined) { _emscripten_bind_ImGui_PlotLines_5(label, values, values_count, values_offset, overlay_text); return }
  if (scale_max === undefined) { _emscripten_bind_ImGui_PlotLines_6(label, values, values_count, values_offset, overlay_text, scale_min); return }
  if (graph_size === undefined) { _emscripten_bind_ImGui_PlotLines_7(label, values, values_count, values_offset, overlay_text, scale_min, scale_max); return }
  if (stride === undefined) { _emscripten_bind_ImGui_PlotLines_8(label, values, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size); return }
  _emscripten_bind_ImGui_PlotLines_9(label, values, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size, stride);
};

ImGui.prototype['PlotHistogram'] = ImGui.prototype.PlotHistogram = function(label, values, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size, stride) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (typeof values == 'object') { values = ensureFloat32(values); }
  if (values_count && typeof values_count === 'object') values_count = values_count.ptr;
  if (values_offset && typeof values_offset === 'object') values_offset = values_offset.ptr;
  if (overlay_text && typeof overlay_text === 'object') overlay_text = overlay_text.ptr;
  else overlay_text = ensureString(overlay_text);
  if (scale_min && typeof scale_min === 'object') scale_min = scale_min.ptr;
  if (scale_max && typeof scale_max === 'object') scale_max = scale_max.ptr;
  if (graph_size && typeof graph_size === 'object') graph_size = graph_size.ptr;
  if (stride && typeof stride === 'object') stride = stride.ptr;
  if (values_offset === undefined) { _emscripten_bind_ImGui_PlotHistogram_3(label, values, values_count); return }
  if (overlay_text === undefined) { _emscripten_bind_ImGui_PlotHistogram_4(label, values, values_count, values_offset); return }
  if (scale_min === undefined) { _emscripten_bind_ImGui_PlotHistogram_5(label, values, values_count, values_offset, overlay_text); return }
  if (scale_max === undefined) { _emscripten_bind_ImGui_PlotHistogram_6(label, values, values_count, values_offset, overlay_text, scale_min); return }
  if (graph_size === undefined) { _emscripten_bind_ImGui_PlotHistogram_7(label, values, values_count, values_offset, overlay_text, scale_min, scale_max); return }
  if (stride === undefined) { _emscripten_bind_ImGui_PlotHistogram_8(label, values, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size); return }
  _emscripten_bind_ImGui_PlotHistogram_9(label, values, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size, stride);
};

ImGui.prototype['Value__0'] = ImGui.prototype.Value__0 = function(prefix, b) {
  ensureCache.prepare();
  if (prefix && typeof prefix === 'object') prefix = prefix.ptr;
  else prefix = ensureString(prefix);
  if (b && typeof b === 'object') b = b.ptr;
  _emscripten_bind_ImGui_Value__0_2(prefix, b);
};

ImGui.prototype['Value__1'] = ImGui.prototype.Value__1 = function(prefix, v) {
  ensureCache.prepare();
  if (prefix && typeof prefix === 'object') prefix = prefix.ptr;
  else prefix = ensureString(prefix);
  if (v && typeof v === 'object') v = v.ptr;
  _emscripten_bind_ImGui_Value__1_2(prefix, v);
};

ImGui.prototype['Value__2'] = ImGui.prototype.Value__2 = function(prefix, v, float_format) {
  ensureCache.prepare();
  if (prefix && typeof prefix === 'object') prefix = prefix.ptr;
  else prefix = ensureString(prefix);
  if (v && typeof v === 'object') v = v.ptr;
  if (float_format && typeof float_format === 'object') float_format = float_format.ptr;
  else float_format = ensureString(float_format);
  if (float_format === undefined) { _emscripten_bind_ImGui_Value__2_2(prefix, v); return }
  _emscripten_bind_ImGui_Value__2_3(prefix, v, float_format);
};

ImGui.prototype['BeginMenuBar'] = ImGui.prototype.BeginMenuBar = function() {
  return !!(_emscripten_bind_ImGui_BeginMenuBar_0());
};

ImGui.prototype['EndMenuBar'] = ImGui.prototype.EndMenuBar = function() {
  _emscripten_bind_ImGui_EndMenuBar_0();
};

ImGui.prototype['BeginMainMenuBar'] = ImGui.prototype.BeginMainMenuBar = function() {
  return !!(_emscripten_bind_ImGui_BeginMainMenuBar_0());
};

ImGui.prototype['EndMainMenuBar'] = ImGui.prototype.EndMainMenuBar = function() {
  _emscripten_bind_ImGui_EndMainMenuBar_0();
};

ImGui.prototype['BeginMenu'] = ImGui.prototype.BeginMenu = function(label, enabled) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (enabled && typeof enabled === 'object') enabled = enabled.ptr;
  if (enabled === undefined) { return !!(_emscripten_bind_ImGui_BeginMenu_1(label)) }
  return !!(_emscripten_bind_ImGui_BeginMenu_2(label, enabled));
};

ImGui.prototype['EndMenu'] = ImGui.prototype.EndMenu = function() {
  _emscripten_bind_ImGui_EndMenu_0();
};

ImGui.prototype['MenuItem__0'] = ImGui.prototype.MenuItem__0 = function(label, shortcut, selected, enabled) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (shortcut && typeof shortcut === 'object') shortcut = shortcut.ptr;
  else shortcut = ensureString(shortcut);
  if (selected && typeof selected === 'object') selected = selected.ptr;
  if (enabled && typeof enabled === 'object') enabled = enabled.ptr;
  if (shortcut === undefined) { return !!(_emscripten_bind_ImGui_MenuItem__0_1(label)) }
  if (selected === undefined) { return !!(_emscripten_bind_ImGui_MenuItem__0_2(label, shortcut)) }
  if (enabled === undefined) { return !!(_emscripten_bind_ImGui_MenuItem__0_3(label, shortcut, selected)) }
  return !!(_emscripten_bind_ImGui_MenuItem__0_4(label, shortcut, selected, enabled));
};

ImGui.prototype['MenuItem__1'] = ImGui.prototype.MenuItem__1 = function(label, shortcut, p_selected, enabled) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (shortcut && typeof shortcut === 'object') shortcut = shortcut.ptr;
  else shortcut = ensureString(shortcut);
  if (enabled && typeof enabled === 'object') enabled = enabled.ptr;
  if (enabled === undefined) { return !!(_emscripten_bind_ImGui_MenuItem__1_3(label, shortcut, p_selected)) }
  return !!(_emscripten_bind_ImGui_MenuItem__1_4(label, shortcut, p_selected, enabled));
};

ImGui.prototype['BeginTooltip'] = ImGui.prototype.BeginTooltip = function() {
  return !!(_emscripten_bind_ImGui_BeginTooltip_0());
};

ImGui.prototype['EndTooltip'] = ImGui.prototype.EndTooltip = function() {
  _emscripten_bind_ImGui_EndTooltip_0();
};

ImGui.prototype['SetTooltip'] = ImGui.prototype.SetTooltip = function(fmt) {
  ensureCache.prepare();
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  _emscripten_bind_ImGui_SetTooltip_1(fmt);
};

ImGui.prototype['BeginItemTooltip'] = ImGui.prototype.BeginItemTooltip = function() {
  return !!(_emscripten_bind_ImGui_BeginItemTooltip_0());
};

ImGui.prototype['SetItemTooltip'] = ImGui.prototype.SetItemTooltip = function(fmt) {
  ensureCache.prepare();
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  _emscripten_bind_ImGui_SetItemTooltip_1(fmt);
};

ImGui.prototype['BeginPopup'] = ImGui.prototype.BeginPopup = function(str_id, flags) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_BeginPopup_1(str_id)) }
  return !!(_emscripten_bind_ImGui_BeginPopup_2(str_id, flags));
};

ImGui.prototype['BeginPopupModal'] = ImGui.prototype.BeginPopupModal = function(name, p_open, flags) {
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (p_open === undefined) { return !!(_emscripten_bind_ImGui_BeginPopupModal_1(name)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_BeginPopupModal_2(name, p_open)) }
  return !!(_emscripten_bind_ImGui_BeginPopupModal_3(name, p_open, flags));
};

ImGui.prototype['EndPopup'] = ImGui.prototype.EndPopup = function() {
  _emscripten_bind_ImGui_EndPopup_0();
};

ImGui.prototype['OpenPopup__0'] = ImGui.prototype.OpenPopup__0 = function(str_id, flags) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { _emscripten_bind_ImGui_OpenPopup__0_1(str_id); return }
  _emscripten_bind_ImGui_OpenPopup__0_2(str_id, flags);
};

ImGui.prototype['OpenPopup__1'] = ImGui.prototype.OpenPopup__1 = function(id, flags) {
  if (id && typeof id === 'object') id = id.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { _emscripten_bind_ImGui_OpenPopup__1_1(id); return }
  _emscripten_bind_ImGui_OpenPopup__1_2(id, flags);
};

ImGui.prototype['OpenPopupOnItemClick'] = ImGui.prototype.OpenPopupOnItemClick = function(str_id, flags) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (str_id === undefined) { _emscripten_bind_ImGui_OpenPopupOnItemClick_0(); return }
  if (flags === undefined) { _emscripten_bind_ImGui_OpenPopupOnItemClick_1(str_id); return }
  _emscripten_bind_ImGui_OpenPopupOnItemClick_2(str_id, flags);
};

ImGui.prototype['CloseCurrentPopup'] = ImGui.prototype.CloseCurrentPopup = function() {
  _emscripten_bind_ImGui_CloseCurrentPopup_0();
};

ImGui.prototype['BeginPopupContextItem'] = ImGui.prototype.BeginPopupContextItem = function(str_id, flags) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (str_id === undefined) { return !!(_emscripten_bind_ImGui_BeginPopupContextItem_0()) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_BeginPopupContextItem_1(str_id)) }
  return !!(_emscripten_bind_ImGui_BeginPopupContextItem_2(str_id, flags));
};

ImGui.prototype['BeginPopupContextWindow'] = ImGui.prototype.BeginPopupContextWindow = function(str_id, flags) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (str_id === undefined) { return !!(_emscripten_bind_ImGui_BeginPopupContextWindow_0()) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_BeginPopupContextWindow_1(str_id)) }
  return !!(_emscripten_bind_ImGui_BeginPopupContextWindow_2(str_id, flags));
};

ImGui.prototype['BeginPopupContextVoid'] = ImGui.prototype.BeginPopupContextVoid = function(str_id, flags) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (str_id === undefined) { return !!(_emscripten_bind_ImGui_BeginPopupContextVoid_0()) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_BeginPopupContextVoid_1(str_id)) }
  return !!(_emscripten_bind_ImGui_BeginPopupContextVoid_2(str_id, flags));
};

ImGui.prototype['IsPopupOpen'] = ImGui.prototype.IsPopupOpen = function(str_id, flags) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_IsPopupOpen_1(str_id)) }
  return !!(_emscripten_bind_ImGui_IsPopupOpen_2(str_id, flags));
};

ImGui.prototype['BeginTable'] = ImGui.prototype.BeginTable = function(str_id, column, flags, outer_size, inner_width) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (column && typeof column === 'object') column = column.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (outer_size && typeof outer_size === 'object') outer_size = outer_size.ptr;
  if (inner_width && typeof inner_width === 'object') inner_width = inner_width.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_BeginTable_2(str_id, column)) }
  if (outer_size === undefined) { return !!(_emscripten_bind_ImGui_BeginTable_3(str_id, column, flags)) }
  if (inner_width === undefined) { return !!(_emscripten_bind_ImGui_BeginTable_4(str_id, column, flags, outer_size)) }
  return !!(_emscripten_bind_ImGui_BeginTable_5(str_id, column, flags, outer_size, inner_width));
};

ImGui.prototype['EndTable'] = ImGui.prototype.EndTable = function() {
  _emscripten_bind_ImGui_EndTable_0();
};

ImGui.prototype['TableNextRow'] = ImGui.prototype.TableNextRow = function(row_flags, min_row_height) {
  if (row_flags && typeof row_flags === 'object') row_flags = row_flags.ptr;
  if (min_row_height && typeof min_row_height === 'object') min_row_height = min_row_height.ptr;
  if (row_flags === undefined) { _emscripten_bind_ImGui_TableNextRow_0(); return }
  if (min_row_height === undefined) { _emscripten_bind_ImGui_TableNextRow_1(row_flags); return }
  _emscripten_bind_ImGui_TableNextRow_2(row_flags, min_row_height);
};

ImGui.prototype['TableNextColumn'] = ImGui.prototype.TableNextColumn = function() {
  return !!(_emscripten_bind_ImGui_TableNextColumn_0());
};

ImGui.prototype['TableSetColumnIndex'] = ImGui.prototype.TableSetColumnIndex = function(column_n) {
  if (column_n && typeof column_n === 'object') column_n = column_n.ptr;
  return !!(_emscripten_bind_ImGui_TableSetColumnIndex_1(column_n));
};

ImGui.prototype['TableSetupColumn'] = ImGui.prototype.TableSetupColumn = function(label, flags, init_width_or_weight, user_id) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (init_width_or_weight && typeof init_width_or_weight === 'object') init_width_or_weight = init_width_or_weight.ptr;
  if (user_id && typeof user_id === 'object') user_id = user_id.ptr;
  if (flags === undefined) { _emscripten_bind_ImGui_TableSetupColumn_1(label); return }
  if (init_width_or_weight === undefined) { _emscripten_bind_ImGui_TableSetupColumn_2(label, flags); return }
  if (user_id === undefined) { _emscripten_bind_ImGui_TableSetupColumn_3(label, flags, init_width_or_weight); return }
  _emscripten_bind_ImGui_TableSetupColumn_4(label, flags, init_width_or_weight, user_id);
};

ImGui.prototype['TableSetupScrollFreeze'] = ImGui.prototype.TableSetupScrollFreeze = function(cols, rows) {
  if (cols && typeof cols === 'object') cols = cols.ptr;
  if (rows && typeof rows === 'object') rows = rows.ptr;
  _emscripten_bind_ImGui_TableSetupScrollFreeze_2(cols, rows);
};

ImGui.prototype['TableHeader'] = ImGui.prototype.TableHeader = function(label) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_ImGui_TableHeader_1(label);
};

ImGui.prototype['TableHeadersRow'] = ImGui.prototype.TableHeadersRow = function() {
  _emscripten_bind_ImGui_TableHeadersRow_0();
};

ImGui.prototype['TableAngledHeadersRow'] = ImGui.prototype.TableAngledHeadersRow = function() {
  _emscripten_bind_ImGui_TableAngledHeadersRow_0();
};

ImGui.prototype['TableGetSortSpecs'] = ImGui.prototype.TableGetSortSpecs = function() {
  return wrapPointer(_emscripten_bind_ImGui_TableGetSortSpecs_0(), ImGuiTableSortSpecs);
};

ImGui.prototype['TableGetColumnCount'] = ImGui.prototype.TableGetColumnCount = function() {
  return _emscripten_bind_ImGui_TableGetColumnCount_0();
};

ImGui.prototype['TableGetColumnIndex'] = ImGui.prototype.TableGetColumnIndex = function() {
  return _emscripten_bind_ImGui_TableGetColumnIndex_0();
};

ImGui.prototype['TableGetRowIndex'] = ImGui.prototype.TableGetRowIndex = function() {
  return _emscripten_bind_ImGui_TableGetRowIndex_0();
};

ImGui.prototype['TableGetColumnName'] = ImGui.prototype.TableGetColumnName = function(column_n) {
  if (column_n && typeof column_n === 'object') column_n = column_n.ptr;
  if (column_n === undefined) { return wrapPointer(_emscripten_bind_ImGui_TableGetColumnName_0(), IDLString) }
  return wrapPointer(_emscripten_bind_ImGui_TableGetColumnName_1(column_n), IDLString);
};

ImGui.prototype['TableGetColumnFlags'] = ImGui.prototype.TableGetColumnFlags = function(column_n) {
  if (column_n && typeof column_n === 'object') column_n = column_n.ptr;
  if (column_n === undefined) { return _emscripten_bind_ImGui_TableGetColumnFlags_0() }
  return _emscripten_bind_ImGui_TableGetColumnFlags_1(column_n);
};

ImGui.prototype['TableSetColumnEnabled'] = ImGui.prototype.TableSetColumnEnabled = function(column_n, v) {
  if (column_n && typeof column_n === 'object') column_n = column_n.ptr;
  if (v && typeof v === 'object') v = v.ptr;
  _emscripten_bind_ImGui_TableSetColumnEnabled_2(column_n, v);
};

ImGui.prototype['TableGetHoveredColumn'] = ImGui.prototype.TableGetHoveredColumn = function() {
  return _emscripten_bind_ImGui_TableGetHoveredColumn_0();
};

ImGui.prototype['TableSetBgColor'] = ImGui.prototype.TableSetBgColor = function(target, color, column_n) {
  if (target && typeof target === 'object') target = target.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (column_n && typeof column_n === 'object') column_n = column_n.ptr;
  if (column_n === undefined) { _emscripten_bind_ImGui_TableSetBgColor_2(target, color); return }
  _emscripten_bind_ImGui_TableSetBgColor_3(target, color, column_n);
};

ImGui.prototype['BeginTabBar'] = ImGui.prototype.BeginTabBar = function(str_id, flags) {
  ensureCache.prepare();
  if (str_id && typeof str_id === 'object') str_id = str_id.ptr;
  else str_id = ensureString(str_id);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_BeginTabBar_1(str_id)) }
  return !!(_emscripten_bind_ImGui_BeginTabBar_2(str_id, flags));
};

ImGui.prototype['EndTabBar'] = ImGui.prototype.EndTabBar = function() {
  _emscripten_bind_ImGui_EndTabBar_0();
};

ImGui.prototype['BeginTabItem'] = ImGui.prototype.BeginTabItem = function(label, p_open, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (p_open === undefined) { return !!(_emscripten_bind_ImGui_BeginTabItem_1(label)) }
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_BeginTabItem_2(label, p_open)) }
  return !!(_emscripten_bind_ImGui_BeginTabItem_3(label, p_open, flags));
};

ImGui.prototype['EndTabItem'] = ImGui.prototype.EndTabItem = function() {
  _emscripten_bind_ImGui_EndTabItem_0();
};

ImGui.prototype['TabItemButton'] = ImGui.prototype.TabItemButton = function(label, flags) {
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  return !!(_emscripten_bind_ImGui_TabItemButton_2(label, flags));
};

ImGui.prototype['SetTabItemClosed'] = ImGui.prototype.SetTabItemClosed = function(tab_or_docked_window_label) {
  ensureCache.prepare();
  if (tab_or_docked_window_label && typeof tab_or_docked_window_label === 'object') tab_or_docked_window_label = tab_or_docked_window_label.ptr;
  else tab_or_docked_window_label = ensureString(tab_or_docked_window_label);
  _emscripten_bind_ImGui_SetTabItemClosed_1(tab_or_docked_window_label);
};

ImGui.prototype['DockSpace'] = ImGui.prototype.DockSpace = function(id, size, flags, window_class) {
  if (id && typeof id === 'object') id = id.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (window_class && typeof window_class === 'object') window_class = window_class.ptr;
  if (size === undefined) { return _emscripten_bind_ImGui_DockSpace_1(id) }
  if (flags === undefined) { return _emscripten_bind_ImGui_DockSpace_2(id, size) }
  if (window_class === undefined) { return _emscripten_bind_ImGui_DockSpace_3(id, size, flags) }
  return _emscripten_bind_ImGui_DockSpace_4(id, size, flags, window_class);
};

ImGui.prototype['DockSpaceOverViewport'] = ImGui.prototype.DockSpaceOverViewport = function(dockspace_id, viewport, flags, window_class) {
  if (dockspace_id && typeof dockspace_id === 'object') dockspace_id = dockspace_id.ptr;
  if (viewport && typeof viewport === 'object') viewport = viewport.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (window_class && typeof window_class === 'object') window_class = window_class.ptr;
  if (dockspace_id === undefined) { return _emscripten_bind_ImGui_DockSpaceOverViewport_0() }
  if (viewport === undefined) { return _emscripten_bind_ImGui_DockSpaceOverViewport_1(dockspace_id) }
  if (flags === undefined) { return _emscripten_bind_ImGui_DockSpaceOverViewport_2(dockspace_id, viewport) }
  if (window_class === undefined) { return _emscripten_bind_ImGui_DockSpaceOverViewport_3(dockspace_id, viewport, flags) }
  return _emscripten_bind_ImGui_DockSpaceOverViewport_4(dockspace_id, viewport, flags, window_class);
};

ImGui.prototype['SetNextWindowDockID'] = ImGui.prototype.SetNextWindowDockID = function(dock_id, ImGuiCond) {
  if (dock_id && typeof dock_id === 'object') dock_id = dock_id.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (ImGuiCond === undefined) { _emscripten_bind_ImGui_SetNextWindowDockID_1(dock_id); return }
  _emscripten_bind_ImGui_SetNextWindowDockID_2(dock_id, ImGuiCond);
};

ImGui.prototype['SetNextWindowClass'] = ImGui.prototype.SetNextWindowClass = function(window_class) {
  if (window_class && typeof window_class === 'object') window_class = window_class.ptr;
  _emscripten_bind_ImGui_SetNextWindowClass_1(window_class);
};

ImGui.prototype['GetWindowDockID'] = ImGui.prototype.GetWindowDockID = function() {
  return _emscripten_bind_ImGui_GetWindowDockID_0();
};

ImGui.prototype['IsWindowDocked'] = ImGui.prototype.IsWindowDocked = function() {
  return !!(_emscripten_bind_ImGui_IsWindowDocked_0());
};

ImGui.prototype['LogToTTY'] = ImGui.prototype.LogToTTY = function(auto_open_depth) {
  if (auto_open_depth && typeof auto_open_depth === 'object') auto_open_depth = auto_open_depth.ptr;
  if (auto_open_depth === undefined) { _emscripten_bind_ImGui_LogToTTY_0(); return }
  _emscripten_bind_ImGui_LogToTTY_1(auto_open_depth);
};

ImGui.prototype['LogToFile'] = ImGui.prototype.LogToFile = function(auto_open_depth, filename) {
  ensureCache.prepare();
  if (auto_open_depth && typeof auto_open_depth === 'object') auto_open_depth = auto_open_depth.ptr;
  if (filename && typeof filename === 'object') filename = filename.ptr;
  else filename = ensureString(filename);
  if (auto_open_depth === undefined) { _emscripten_bind_ImGui_LogToFile_0(); return }
  if (filename === undefined) { _emscripten_bind_ImGui_LogToFile_1(auto_open_depth); return }
  _emscripten_bind_ImGui_LogToFile_2(auto_open_depth, filename);
};

ImGui.prototype['LogToClipboard'] = ImGui.prototype.LogToClipboard = function(auto_open_depth) {
  if (auto_open_depth && typeof auto_open_depth === 'object') auto_open_depth = auto_open_depth.ptr;
  if (auto_open_depth === undefined) { _emscripten_bind_ImGui_LogToClipboard_0(); return }
  _emscripten_bind_ImGui_LogToClipboard_1(auto_open_depth);
};

ImGui.prototype['LogFinish'] = ImGui.prototype.LogFinish = function() {
  _emscripten_bind_ImGui_LogFinish_0();
};

ImGui.prototype['LogButtons'] = ImGui.prototype.LogButtons = function() {
  _emscripten_bind_ImGui_LogButtons_0();
};

ImGui.prototype['LogText'] = ImGui.prototype.LogText = function(fmt) {
  ensureCache.prepare();
  if (fmt && typeof fmt === 'object') fmt = fmt.ptr;
  else fmt = ensureString(fmt);
  _emscripten_bind_ImGui_LogText_1(fmt);
};

ImGui.prototype['BeginDragDropSource'] = ImGui.prototype.BeginDragDropSource = function(flags) {
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_BeginDragDropSource_0()) }
  return !!(_emscripten_bind_ImGui_BeginDragDropSource_1(flags));
};

ImGui.prototype['SetDragDropPayload'] = ImGui.prototype.SetDragDropPayload = function(type, data, size_t, ImGuiCond) {
  ensureCache.prepare();
  if (type && typeof type === 'object') type = type.ptr;
  else type = ensureString(type);
  if (data && typeof data === 'object') data = data.ptr;
  if (size_t && typeof size_t === 'object') size_t = size_t.ptr;
  if (ImGuiCond && typeof ImGuiCond === 'object') ImGuiCond = ImGuiCond.ptr;
  if (ImGuiCond === undefined) { return !!(_emscripten_bind_ImGui_SetDragDropPayload_3(type, data, size_t)) }
  return !!(_emscripten_bind_ImGui_SetDragDropPayload_4(type, data, size_t, ImGuiCond));
};

ImGui.prototype['EndDragDropSource'] = ImGui.prototype.EndDragDropSource = function() {
  _emscripten_bind_ImGui_EndDragDropSource_0();
};

ImGui.prototype['BeginDragDropTarget'] = ImGui.prototype.BeginDragDropTarget = function() {
  return !!(_emscripten_bind_ImGui_BeginDragDropTarget_0());
};

ImGui.prototype['AcceptDragDropPayload'] = ImGui.prototype.AcceptDragDropPayload = function(type, flags) {
  ensureCache.prepare();
  if (type && typeof type === 'object') type = type.ptr;
  else type = ensureString(type);
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return wrapPointer(_emscripten_bind_ImGui_AcceptDragDropPayload_1(type), ImGuiPayload) }
  return wrapPointer(_emscripten_bind_ImGui_AcceptDragDropPayload_2(type, flags), ImGuiPayload);
};

ImGui.prototype['EndDragDropTarget'] = ImGui.prototype.EndDragDropTarget = function() {
  _emscripten_bind_ImGui_EndDragDropTarget_0();
};

ImGui.prototype['GetDragDropPayload'] = ImGui.prototype.GetDragDropPayload = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetDragDropPayload_0(), ImGuiPayload);
};

ImGui.prototype['BeginDisabled'] = ImGui.prototype.BeginDisabled = function(disabled) {
  if (disabled && typeof disabled === 'object') disabled = disabled.ptr;
  if (disabled === undefined) { _emscripten_bind_ImGui_BeginDisabled_0(); return }
  _emscripten_bind_ImGui_BeginDisabled_1(disabled);
};

ImGui.prototype['EndDisabled'] = ImGui.prototype.EndDisabled = function() {
  _emscripten_bind_ImGui_EndDisabled_0();
};

ImGui.prototype['PushClipRect'] = ImGui.prototype.PushClipRect = function(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect) {
  if (clip_rect_min && typeof clip_rect_min === 'object') clip_rect_min = clip_rect_min.ptr;
  if (clip_rect_max && typeof clip_rect_max === 'object') clip_rect_max = clip_rect_max.ptr;
  if (intersect_with_current_clip_rect && typeof intersect_with_current_clip_rect === 'object') intersect_with_current_clip_rect = intersect_with_current_clip_rect.ptr;
  _emscripten_bind_ImGui_PushClipRect_3(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
};

ImGui.prototype['PopClipRect'] = ImGui.prototype.PopClipRect = function() {
  _emscripten_bind_ImGui_PopClipRect_0();
};

ImGui.prototype['SetItemDefaultFocus'] = ImGui.prototype.SetItemDefaultFocus = function() {
  _emscripten_bind_ImGui_SetItemDefaultFocus_0();
};

ImGui.prototype['SetKeyboardFocusHere'] = ImGui.prototype.SetKeyboardFocusHere = function(offset) {
  if (offset && typeof offset === 'object') offset = offset.ptr;
  if (offset === undefined) { _emscripten_bind_ImGui_SetKeyboardFocusHere_0(); return }
  _emscripten_bind_ImGui_SetKeyboardFocusHere_1(offset);
};

ImGui.prototype['SetNextItemAllowOverlap'] = ImGui.prototype.SetNextItemAllowOverlap = function() {
  _emscripten_bind_ImGui_SetNextItemAllowOverlap_0();
};

ImGui.prototype['IsItemHovered'] = ImGui.prototype.IsItemHovered = function(flags) {
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_IsItemHovered_0()) }
  return !!(_emscripten_bind_ImGui_IsItemHovered_1(flags));
};

ImGui.prototype['IsItemActive'] = ImGui.prototype.IsItemActive = function() {
  return !!(_emscripten_bind_ImGui_IsItemActive_0());
};

ImGui.prototype['IsItemFocused'] = ImGui.prototype.IsItemFocused = function() {
  return !!(_emscripten_bind_ImGui_IsItemFocused_0());
};

ImGui.prototype['IsItemClicked'] = ImGui.prototype.IsItemClicked = function(ImGuiMouseButton) {
  if (ImGuiMouseButton && typeof ImGuiMouseButton === 'object') ImGuiMouseButton = ImGuiMouseButton.ptr;
  if (ImGuiMouseButton === undefined) { return !!(_emscripten_bind_ImGui_IsItemClicked_0()) }
  return !!(_emscripten_bind_ImGui_IsItemClicked_1(ImGuiMouseButton));
};

ImGui.prototype['IsItemVisible'] = ImGui.prototype.IsItemVisible = function() {
  return !!(_emscripten_bind_ImGui_IsItemVisible_0());
};

ImGui.prototype['IsItemEdited'] = ImGui.prototype.IsItemEdited = function() {
  return !!(_emscripten_bind_ImGui_IsItemEdited_0());
};

ImGui.prototype['IsItemActivated'] = ImGui.prototype.IsItemActivated = function() {
  return !!(_emscripten_bind_ImGui_IsItemActivated_0());
};

ImGui.prototype['IsItemDeactivated'] = ImGui.prototype.IsItemDeactivated = function() {
  return !!(_emscripten_bind_ImGui_IsItemDeactivated_0());
};

ImGui.prototype['IsItemDeactivatedAfterEdit'] = ImGui.prototype.IsItemDeactivatedAfterEdit = function() {
  return !!(_emscripten_bind_ImGui_IsItemDeactivatedAfterEdit_0());
};

ImGui.prototype['IsItemToggledOpen'] = ImGui.prototype.IsItemToggledOpen = function() {
  return !!(_emscripten_bind_ImGui_IsItemToggledOpen_0());
};

ImGui.prototype['IsAnyItemHovered'] = ImGui.prototype.IsAnyItemHovered = function() {
  return !!(_emscripten_bind_ImGui_IsAnyItemHovered_0());
};

ImGui.prototype['IsAnyItemActive'] = ImGui.prototype.IsAnyItemActive = function() {
  return !!(_emscripten_bind_ImGui_IsAnyItemActive_0());
};

ImGui.prototype['IsAnyItemFocused'] = ImGui.prototype.IsAnyItemFocused = function() {
  return !!(_emscripten_bind_ImGui_IsAnyItemFocused_0());
};

ImGui.prototype['GetItemID'] = ImGui.prototype.GetItemID = function() {
  return _emscripten_bind_ImGui_GetItemID_0();
};

ImGui.prototype['GetItemRectMin'] = ImGui.prototype.GetItemRectMin = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetItemRectMin_0(), ImVec2);
};

ImGui.prototype['GetItemRectMax'] = ImGui.prototype.GetItemRectMax = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetItemRectMax_0(), ImVec2);
};

ImGui.prototype['GetItemRectSize'] = ImGui.prototype.GetItemRectSize = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetItemRectSize_0(), ImVec2);
};

ImGui.prototype['GetMainViewport'] = ImGui.prototype.GetMainViewport = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetMainViewport_0(), ImGuiViewport);
};

ImGui.prototype['GetBackgroundDrawList'] = ImGui.prototype.GetBackgroundDrawList = function(viewport) {
  if (viewport && typeof viewport === 'object') viewport = viewport.ptr;
  if (viewport === undefined) { return wrapPointer(_emscripten_bind_ImGui_GetBackgroundDrawList_0(), ImDrawList) }
  return wrapPointer(_emscripten_bind_ImGui_GetBackgroundDrawList_1(viewport), ImDrawList);
};

ImGui.prototype['GetForegroundDrawList'] = ImGui.prototype.GetForegroundDrawList = function(viewport) {
  if (viewport && typeof viewport === 'object') viewport = viewport.ptr;
  if (viewport === undefined) { return wrapPointer(_emscripten_bind_ImGui_GetForegroundDrawList_0(), ImDrawList) }
  return wrapPointer(_emscripten_bind_ImGui_GetForegroundDrawList_1(viewport), ImDrawList);
};

ImGui.prototype['IsRectVisible__0'] = ImGui.prototype.IsRectVisible__0 = function(size) {
  if (size && typeof size === 'object') size = size.ptr;
  return !!(_emscripten_bind_ImGui_IsRectVisible__0_1(size));
};

ImGui.prototype['IsRectVisible__1'] = ImGui.prototype.IsRectVisible__1 = function(rect_min, rect_max) {
  if (rect_min && typeof rect_min === 'object') rect_min = rect_min.ptr;
  if (rect_max && typeof rect_max === 'object') rect_max = rect_max.ptr;
  return !!(_emscripten_bind_ImGui_IsRectVisible__1_2(rect_min, rect_max));
};

ImGui.prototype['GetTime'] = ImGui.prototype.GetTime = function() {
  return _emscripten_bind_ImGui_GetTime_0();
};

ImGui.prototype['GetFrameCount'] = ImGui.prototype.GetFrameCount = function() {
  return _emscripten_bind_ImGui_GetFrameCount_0();
};

ImGui.prototype['GetDrawListSharedData'] = ImGui.prototype.GetDrawListSharedData = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetDrawListSharedData_0(), ImDrawListSharedData);
};

ImGui.prototype['GetStyleColorName'] = ImGui.prototype.GetStyleColorName = function(idx) {
  if (idx && typeof idx === 'object') idx = idx.ptr;
  return wrapPointer(_emscripten_bind_ImGui_GetStyleColorName_1(idx), IDLString);
};

ImGui.prototype['SetStateStorage'] = ImGui.prototype.SetStateStorage = function(storage) {
  if (storage && typeof storage === 'object') storage = storage.ptr;
  _emscripten_bind_ImGui_SetStateStorage_1(storage);
};

ImGui.prototype['GetStateStorage'] = ImGui.prototype.GetStateStorage = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetStateStorage_0(), ImGuiStorage);
};

ImGui.prototype['CalcTextSize'] = ImGui.prototype.CalcTextSize = function(text, text_end, hide_text_after_double_hash, wrap_width) {
  ensureCache.prepare();
  if (text && typeof text === 'object') text = text.ptr;
  else text = ensureString(text);
  if (text_end && typeof text_end === 'object') text_end = text_end.ptr;
  else text_end = ensureString(text_end);
  if (hide_text_after_double_hash && typeof hide_text_after_double_hash === 'object') hide_text_after_double_hash = hide_text_after_double_hash.ptr;
  if (wrap_width && typeof wrap_width === 'object') wrap_width = wrap_width.ptr;
  if (text_end === undefined) { return wrapPointer(_emscripten_bind_ImGui_CalcTextSize_1(text), ImVec2) }
  if (hide_text_after_double_hash === undefined) { return wrapPointer(_emscripten_bind_ImGui_CalcTextSize_2(text, text_end), ImVec2) }
  if (wrap_width === undefined) { return wrapPointer(_emscripten_bind_ImGui_CalcTextSize_3(text, text_end, hide_text_after_double_hash), ImVec2) }
  return wrapPointer(_emscripten_bind_ImGui_CalcTextSize_4(text, text_end, hide_text_after_double_hash, wrap_width), ImVec2);
};

ImGui.prototype['ColorConvertU32ToFloat4'] = ImGui.prototype.ColorConvertU32ToFloat4 = function(col) {
  if (col && typeof col === 'object') col = col.ptr;
  return wrapPointer(_emscripten_bind_ImGui_ColorConvertU32ToFloat4_1(col), ImVec4);
};

ImGui.prototype['ColorConvertFloat4ToU32'] = ImGui.prototype.ColorConvertFloat4ToU32 = function(col) {
  if (col && typeof col === 'object') col = col.ptr;
  return _emscripten_bind_ImGui_ColorConvertFloat4ToU32_1(col);
};

ImGui.prototype['ColorConvertRGBtoHSV'] = ImGui.prototype.ColorConvertRGBtoHSV = function(r, g, b, out_h, out_s, out_v) {
  ensureCache.prepare();
  if (r && typeof r === 'object') r = r.ptr;
  if (g && typeof g === 'object') g = g.ptr;
  if (b && typeof b === 'object') b = b.ptr;
  if (typeof out_h == 'object') { out_h = ensureFloat32(out_h); }
  if (typeof out_s == 'object') { out_s = ensureFloat32(out_s); }
  if (typeof out_v == 'object') { out_v = ensureFloat32(out_v); }
  _emscripten_bind_ImGui_ColorConvertRGBtoHSV_6(r, g, b, out_h, out_s, out_v);
};

ImGui.prototype['ColorConvertHSVtoRGB'] = ImGui.prototype.ColorConvertHSVtoRGB = function(h, s, v, out_r, out_g, out_b) {
  ensureCache.prepare();
  if (h && typeof h === 'object') h = h.ptr;
  if (s && typeof s === 'object') s = s.ptr;
  if (v && typeof v === 'object') v = v.ptr;
  if (typeof out_r == 'object') { out_r = ensureFloat32(out_r); }
  if (typeof out_g == 'object') { out_g = ensureFloat32(out_g); }
  if (typeof out_b == 'object') { out_b = ensureFloat32(out_b); }
  _emscripten_bind_ImGui_ColorConvertHSVtoRGB_6(h, s, v, out_r, out_g, out_b);
};

ImGui.prototype['IsKeyDown'] = ImGui.prototype.IsKeyDown = function(ImGuiKey) {
  if (ImGuiKey && typeof ImGuiKey === 'object') ImGuiKey = ImGuiKey.ptr;
  return !!(_emscripten_bind_ImGui_IsKeyDown_1(ImGuiKey));
};

ImGui.prototype['IsKeyPressed'] = ImGui.prototype.IsKeyPressed = function(ImGuiKey, repeat) {
  if (ImGuiKey && typeof ImGuiKey === 'object') ImGuiKey = ImGuiKey.ptr;
  if (repeat && typeof repeat === 'object') repeat = repeat.ptr;
  if (repeat === undefined) { return !!(_emscripten_bind_ImGui_IsKeyPressed_1(ImGuiKey)) }
  return !!(_emscripten_bind_ImGui_IsKeyPressed_2(ImGuiKey, repeat));
};

ImGui.prototype['IsKeyReleased'] = ImGui.prototype.IsKeyReleased = function(ImGuiKey) {
  if (ImGuiKey && typeof ImGuiKey === 'object') ImGuiKey = ImGuiKey.ptr;
  return !!(_emscripten_bind_ImGui_IsKeyReleased_1(ImGuiKey));
};

ImGui.prototype['IsKeyChordPressed'] = ImGui.prototype.IsKeyChordPressed = function(key_chord) {
  if (key_chord && typeof key_chord === 'object') key_chord = key_chord.ptr;
  return !!(_emscripten_bind_ImGui_IsKeyChordPressed_1(key_chord));
};

ImGui.prototype['GetKeyPressedAmount'] = ImGui.prototype.GetKeyPressedAmount = function(ImGuiKey, repeat_delay, rate) {
  if (ImGuiKey && typeof ImGuiKey === 'object') ImGuiKey = ImGuiKey.ptr;
  if (repeat_delay && typeof repeat_delay === 'object') repeat_delay = repeat_delay.ptr;
  if (rate && typeof rate === 'object') rate = rate.ptr;
  return _emscripten_bind_ImGui_GetKeyPressedAmount_3(ImGuiKey, repeat_delay, rate);
};

ImGui.prototype['GetKeyName'] = ImGui.prototype.GetKeyName = function(key) {
  if (key && typeof key === 'object') key = key.ptr;
  return wrapPointer(_emscripten_bind_ImGui_GetKeyName_1(key), IDLString);
};

ImGui.prototype['SetNextFrameWantCaptureKeyboard'] = ImGui.prototype.SetNextFrameWantCaptureKeyboard = function(want_capture_keyboard) {
  if (want_capture_keyboard && typeof want_capture_keyboard === 'object') want_capture_keyboard = want_capture_keyboard.ptr;
  _emscripten_bind_ImGui_SetNextFrameWantCaptureKeyboard_1(want_capture_keyboard);
};

ImGui.prototype['Shortcut'] = ImGui.prototype.Shortcut = function(key_chord, flags) {
  if (key_chord && typeof key_chord === 'object') key_chord = key_chord.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { return !!(_emscripten_bind_ImGui_Shortcut_1(key_chord)) }
  return !!(_emscripten_bind_ImGui_Shortcut_2(key_chord, flags));
};

ImGui.prototype['SetNextItemShortcut'] = ImGui.prototype.SetNextItemShortcut = function(key_chord, flags) {
  if (key_chord && typeof key_chord === 'object') key_chord = key_chord.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { _emscripten_bind_ImGui_SetNextItemShortcut_1(key_chord); return }
  _emscripten_bind_ImGui_SetNextItemShortcut_2(key_chord, flags);
};

ImGui.prototype['SetItemKeyOwner'] = ImGui.prototype.SetItemKeyOwner = function(key) {
  if (key && typeof key === 'object') key = key.ptr;
  _emscripten_bind_ImGui_SetItemKeyOwner_1(key);
};

ImGui.prototype['IsMouseDown'] = ImGui.prototype.IsMouseDown = function(ImGuiMouseButton) {
  if (ImGuiMouseButton && typeof ImGuiMouseButton === 'object') ImGuiMouseButton = ImGuiMouseButton.ptr;
  return !!(_emscripten_bind_ImGui_IsMouseDown_1(ImGuiMouseButton));
};

ImGui.prototype['IsMouseClicked'] = ImGui.prototype.IsMouseClicked = function(ImGuiMouseButton, repeat) {
  if (ImGuiMouseButton && typeof ImGuiMouseButton === 'object') ImGuiMouseButton = ImGuiMouseButton.ptr;
  if (repeat && typeof repeat === 'object') repeat = repeat.ptr;
  if (repeat === undefined) { return !!(_emscripten_bind_ImGui_IsMouseClicked_1(ImGuiMouseButton)) }
  return !!(_emscripten_bind_ImGui_IsMouseClicked_2(ImGuiMouseButton, repeat));
};

ImGui.prototype['IsMouseReleased'] = ImGui.prototype.IsMouseReleased = function(ImGuiMouseButton) {
  if (ImGuiMouseButton && typeof ImGuiMouseButton === 'object') ImGuiMouseButton = ImGuiMouseButton.ptr;
  return !!(_emscripten_bind_ImGui_IsMouseReleased_1(ImGuiMouseButton));
};

ImGui.prototype['IsMouseDoubleClicked'] = ImGui.prototype.IsMouseDoubleClicked = function(ImGuiMouseButton) {
  if (ImGuiMouseButton && typeof ImGuiMouseButton === 'object') ImGuiMouseButton = ImGuiMouseButton.ptr;
  return !!(_emscripten_bind_ImGui_IsMouseDoubleClicked_1(ImGuiMouseButton));
};

ImGui.prototype['IsMouseReleasedWithDelay'] = ImGui.prototype.IsMouseReleasedWithDelay = function(ImGuiMouseButton, delay) {
  if (ImGuiMouseButton && typeof ImGuiMouseButton === 'object') ImGuiMouseButton = ImGuiMouseButton.ptr;
  if (delay && typeof delay === 'object') delay = delay.ptr;
  return !!(_emscripten_bind_ImGui_IsMouseReleasedWithDelay_2(ImGuiMouseButton, delay));
};

ImGui.prototype['GetMouseClickedCount'] = ImGui.prototype.GetMouseClickedCount = function(ImGuiMouseButton) {
  if (ImGuiMouseButton && typeof ImGuiMouseButton === 'object') ImGuiMouseButton = ImGuiMouseButton.ptr;
  return _emscripten_bind_ImGui_GetMouseClickedCount_1(ImGuiMouseButton);
};

ImGui.prototype['IsMouseHoveringRect'] = ImGui.prototype.IsMouseHoveringRect = function(r_min, r_max, clip) {
  if (r_min && typeof r_min === 'object') r_min = r_min.ptr;
  if (r_max && typeof r_max === 'object') r_max = r_max.ptr;
  if (clip && typeof clip === 'object') clip = clip.ptr;
  if (clip === undefined) { return !!(_emscripten_bind_ImGui_IsMouseHoveringRect_2(r_min, r_max)) }
  return !!(_emscripten_bind_ImGui_IsMouseHoveringRect_3(r_min, r_max, clip));
};

ImGui.prototype['IsMousePosValid'] = ImGui.prototype.IsMousePosValid = function(mouse_pos) {
  if (mouse_pos && typeof mouse_pos === 'object') mouse_pos = mouse_pos.ptr;
  if (mouse_pos === undefined) { return !!(_emscripten_bind_ImGui_IsMousePosValid_0()) }
  return !!(_emscripten_bind_ImGui_IsMousePosValid_1(mouse_pos));
};

ImGui.prototype['IsAnyMouseDown'] = ImGui.prototype.IsAnyMouseDown = function() {
  return !!(_emscripten_bind_ImGui_IsAnyMouseDown_0());
};

ImGui.prototype['GetMousePos'] = ImGui.prototype.GetMousePos = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetMousePos_0(), ImVec2);
};

ImGui.prototype['GetMousePosOnOpeningCurrentPopup'] = ImGui.prototype.GetMousePosOnOpeningCurrentPopup = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetMousePosOnOpeningCurrentPopup_0(), ImVec2);
};

ImGui.prototype['IsMouseDragging'] = ImGui.prototype.IsMouseDragging = function(ImGuiMouseButton, lock_threshold) {
  if (ImGuiMouseButton && typeof ImGuiMouseButton === 'object') ImGuiMouseButton = ImGuiMouseButton.ptr;
  if (lock_threshold && typeof lock_threshold === 'object') lock_threshold = lock_threshold.ptr;
  if (lock_threshold === undefined) { return !!(_emscripten_bind_ImGui_IsMouseDragging_1(ImGuiMouseButton)) }
  return !!(_emscripten_bind_ImGui_IsMouseDragging_2(ImGuiMouseButton, lock_threshold));
};

ImGui.prototype['GetMouseDragDelta'] = ImGui.prototype.GetMouseDragDelta = function(ImGuiMouseButton, lock_threshold) {
  if (ImGuiMouseButton && typeof ImGuiMouseButton === 'object') ImGuiMouseButton = ImGuiMouseButton.ptr;
  if (lock_threshold && typeof lock_threshold === 'object') lock_threshold = lock_threshold.ptr;
  if (ImGuiMouseButton === undefined) { return wrapPointer(_emscripten_bind_ImGui_GetMouseDragDelta_0(), ImVec2) }
  if (lock_threshold === undefined) { return wrapPointer(_emscripten_bind_ImGui_GetMouseDragDelta_1(ImGuiMouseButton), ImVec2) }
  return wrapPointer(_emscripten_bind_ImGui_GetMouseDragDelta_2(ImGuiMouseButton, lock_threshold), ImVec2);
};

ImGui.prototype['ResetMouseDragDelta'] = ImGui.prototype.ResetMouseDragDelta = function(ImGuiMouseButton) {
  if (ImGuiMouseButton && typeof ImGuiMouseButton === 'object') ImGuiMouseButton = ImGuiMouseButton.ptr;
  if (ImGuiMouseButton === undefined) { _emscripten_bind_ImGui_ResetMouseDragDelta_0(); return }
  _emscripten_bind_ImGui_ResetMouseDragDelta_1(ImGuiMouseButton);
};

ImGui.prototype['GetMouseCursor'] = ImGui.prototype.GetMouseCursor = function() {
  return _emscripten_bind_ImGui_GetMouseCursor_0();
};

ImGui.prototype['SetMouseCursor'] = ImGui.prototype.SetMouseCursor = function(cursor_type) {
  if (cursor_type && typeof cursor_type === 'object') cursor_type = cursor_type.ptr;
  _emscripten_bind_ImGui_SetMouseCursor_1(cursor_type);
};

ImGui.prototype['SetNextFrameWantCaptureMouse'] = ImGui.prototype.SetNextFrameWantCaptureMouse = function(want_capture_mouse) {
  if (want_capture_mouse && typeof want_capture_mouse === 'object') want_capture_mouse = want_capture_mouse.ptr;
  _emscripten_bind_ImGui_SetNextFrameWantCaptureMouse_1(want_capture_mouse);
};

ImGui.prototype['GetClipboardText'] = ImGui.prototype.GetClipboardText = function() {
  return wrapPointer(_emscripten_bind_ImGui_GetClipboardText_0(), IDLString);
};

ImGui.prototype['SetClipboardText'] = ImGui.prototype.SetClipboardText = function(text) {
  ensureCache.prepare();
  if (text && typeof text === 'object') text = text.ptr;
  else text = ensureString(text);
  _emscripten_bind_ImGui_SetClipboardText_1(text);
};

ImGui.prototype['LoadIniSettingsFromDisk'] = ImGui.prototype.LoadIniSettingsFromDisk = function(ini_filename) {
  ensureCache.prepare();
  if (ini_filename && typeof ini_filename === 'object') ini_filename = ini_filename.ptr;
  else ini_filename = ensureString(ini_filename);
  _emscripten_bind_ImGui_LoadIniSettingsFromDisk_1(ini_filename);
};

ImGui.prototype['LoadIniSettingsFromMemory'] = ImGui.prototype.LoadIniSettingsFromMemory = function(ini_data, ini_size) {
  ensureCache.prepare();
  if (ini_data && typeof ini_data === 'object') ini_data = ini_data.ptr;
  else ini_data = ensureString(ini_data);
  if (ini_size && typeof ini_size === 'object') ini_size = ini_size.ptr;
  if (ini_size === undefined) { _emscripten_bind_ImGui_LoadIniSettingsFromMemory_1(ini_data); return }
  _emscripten_bind_ImGui_LoadIniSettingsFromMemory_2(ini_data, ini_size);
};

ImGui.prototype['SaveIniSettingsToDisk'] = ImGui.prototype.SaveIniSettingsToDisk = function(ini_filename) {
  ensureCache.prepare();
  if (ini_filename && typeof ini_filename === 'object') ini_filename = ini_filename.ptr;
  else ini_filename = ensureString(ini_filename);
  _emscripten_bind_ImGui_SaveIniSettingsToDisk_1(ini_filename);
};

ImGui.prototype['SaveIniSettingsToMemory'] = ImGui.prototype.SaveIniSettingsToMemory = function() {
  return wrapPointer(_emscripten_bind_ImGui_SaveIniSettingsToMemory_0(), IDLString);
};

ImGui.prototype['DebugTextEncoding'] = ImGui.prototype.DebugTextEncoding = function(text) {
  ensureCache.prepare();
  if (text && typeof text === 'object') text = text.ptr;
  else text = ensureString(text);
  _emscripten_bind_ImGui_DebugTextEncoding_1(text);
};

ImGui.prototype['DebugFlashStyleColor'] = ImGui.prototype.DebugFlashStyleColor = function(idx) {
  if (idx && typeof idx === 'object') idx = idx.ptr;
  _emscripten_bind_ImGui_DebugFlashStyleColor_1(idx);
};

ImGui.prototype['DebugStartItemPicker'] = ImGui.prototype.DebugStartItemPicker = function() {
  _emscripten_bind_ImGui_DebugStartItemPicker_0();
};

ImGui.prototype['DebugCheckVersionAndDataLayout'] = ImGui.prototype.DebugCheckVersionAndDataLayout = function(version_str, sz_io, sz_style, sz_vec2, sz_vec4, sz_drawvert, sz_drawidx) {
  ensureCache.prepare();
  if (version_str && typeof version_str === 'object') version_str = version_str.ptr;
  else version_str = ensureString(version_str);
  if (sz_io && typeof sz_io === 'object') sz_io = sz_io.ptr;
  if (sz_style && typeof sz_style === 'object') sz_style = sz_style.ptr;
  if (sz_vec2 && typeof sz_vec2 === 'object') sz_vec2 = sz_vec2.ptr;
  if (sz_vec4 && typeof sz_vec4 === 'object') sz_vec4 = sz_vec4.ptr;
  if (sz_drawvert && typeof sz_drawvert === 'object') sz_drawvert = sz_drawvert.ptr;
  if (sz_drawidx && typeof sz_drawidx === 'object') sz_drawidx = sz_drawidx.ptr;
  return !!(_emscripten_bind_ImGui_DebugCheckVersionAndDataLayout_7(version_str, sz_io, sz_style, sz_vec2, sz_vec4, sz_drawvert, sz_drawidx));
};

ImGui.prototype['MemAlloc'] = ImGui.prototype.MemAlloc = function(size) {
  if (size && typeof size === 'object') size = size.ptr;
  return _emscripten_bind_ImGui_MemAlloc_1(size);
};

ImGui.prototype['MemFree'] = ImGui.prototype.MemFree = function(ptr) {
  if (ptr && typeof ptr === 'object') ptr = ptr.ptr;
  _emscripten_bind_ImGui_MemFree_1(ptr);
};

ImGui.prototype['UpdatePlatformWindows'] = ImGui.prototype.UpdatePlatformWindows = function() {
  _emscripten_bind_ImGui_UpdatePlatformWindows_0();
};

ImGui.prototype['RenderPlatformWindowsDefault'] = ImGui.prototype.RenderPlatformWindowsDefault = function(platform_render_arg, renderer_render_arg) {
  if (platform_render_arg && typeof platform_render_arg === 'object') platform_render_arg = platform_render_arg.ptr;
  if (renderer_render_arg && typeof renderer_render_arg === 'object') renderer_render_arg = renderer_render_arg.ptr;
  if (platform_render_arg === undefined) { _emscripten_bind_ImGui_RenderPlatformWindowsDefault_0(); return }
  if (renderer_render_arg === undefined) { _emscripten_bind_ImGui_RenderPlatformWindowsDefault_1(platform_render_arg); return }
  _emscripten_bind_ImGui_RenderPlatformWindowsDefault_2(platform_render_arg, renderer_render_arg);
};

ImGui.prototype['DestroyPlatformWindows'] = ImGui.prototype.DestroyPlatformWindows = function() {
  _emscripten_bind_ImGui_DestroyPlatformWindows_0();
};

ImGui.prototype['FindViewportByID'] = ImGui.prototype.FindViewportByID = function(id) {
  if (id && typeof id === 'object') id = id.ptr;
  return wrapPointer(_emscripten_bind_ImGui_FindViewportByID_1(id), ImGuiViewport);
};

ImGui.prototype['FindViewportByPlatformHandle'] = ImGui.prototype.FindViewportByPlatformHandle = function(platform_handle) {
  if (platform_handle && typeof platform_handle === 'object') platform_handle = platform_handle.ptr;
  return wrapPointer(_emscripten_bind_ImGui_FindViewportByPlatformHandle_1(platform_handle), ImGuiViewport);
};

function ImGuiInputTextCallbackData() { throw "cannot construct a ImGuiInputTextCallbackData, no constructor in IDL" }
ImGuiInputTextCallbackData.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiInputTextCallbackData.prototype.constructor = ImGuiInputTextCallbackData;
ImGuiInputTextCallbackData.prototype.__class__ = ImGuiInputTextCallbackData;
ImGuiInputTextCallbackData.__cache__ = {};
Module['ImGuiInputTextCallbackData'] = ImGuiInputTextCallbackData;

ImGuiInputTextCallbackData.prototype['get_BufSize'] = ImGuiInputTextCallbackData.prototype.get_BufSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiInputTextCallbackData_get_BufSize_0(self);
};

ImGuiInputTextCallbackData.prototype['set_BufSize'] = ImGuiInputTextCallbackData.prototype.set_BufSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiInputTextCallbackData_set_BufSize_1(self, arg0);
};

Object.defineProperty(ImGuiInputTextCallbackData.prototype, 'BufSize', { get: ImGuiInputTextCallbackData.prototype.get_BufSize, set: ImGuiInputTextCallbackData.prototype.set_BufSize });

ImGuiInputTextCallbackData.prototype['get_BufDirty'] = ImGuiInputTextCallbackData.prototype.get_BufDirty = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiInputTextCallbackData_get_BufDirty_0(self));
};

ImGuiInputTextCallbackData.prototype['set_BufDirty'] = ImGuiInputTextCallbackData.prototype.set_BufDirty = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiInputTextCallbackData_set_BufDirty_1(self, arg0);
};

Object.defineProperty(ImGuiInputTextCallbackData.prototype, 'BufDirty', { get: ImGuiInputTextCallbackData.prototype.get_BufDirty, set: ImGuiInputTextCallbackData.prototype.set_BufDirty });

ImGuiInputTextCallbackData.prototype['get_BufTextLen'] = ImGuiInputTextCallbackData.prototype.get_BufTextLen = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiInputTextCallbackData_get_BufTextLen_0(self);
};

ImGuiInputTextCallbackData.prototype['set_BufTextLen'] = ImGuiInputTextCallbackData.prototype.set_BufTextLen = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiInputTextCallbackData_set_BufTextLen_1(self, arg0);
};

Object.defineProperty(ImGuiInputTextCallbackData.prototype, 'BufTextLen', { get: ImGuiInputTextCallbackData.prototype.get_BufTextLen, set: ImGuiInputTextCallbackData.prototype.set_BufTextLen });

ImGuiInputTextCallbackData.prototype['get_Flags'] = ImGuiInputTextCallbackData.prototype.get_Flags = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiInputTextCallbackData_get_Flags_0(self);
};

ImGuiInputTextCallbackData.prototype['set_Flags'] = ImGuiInputTextCallbackData.prototype.set_Flags = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiInputTextCallbackData_set_Flags_1(self, arg0);
};

Object.defineProperty(ImGuiInputTextCallbackData.prototype, 'Flags', { get: ImGuiInputTextCallbackData.prototype.get_Flags, set: ImGuiInputTextCallbackData.prototype.set_Flags });

ImGuiInputTextCallbackData.prototype['__destroy__'] = ImGuiInputTextCallbackData.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiInputTextCallbackData___destroy___0(self);
};

function ImVectorImDrawListPtr() { throw "cannot construct a ImVectorImDrawListPtr, no constructor in IDL" }
ImVectorImDrawListPtr.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorImDrawListPtr.prototype.constructor = ImVectorImDrawListPtr;
ImVectorImDrawListPtr.prototype.__class__ = ImVectorImDrawListPtr;
ImVectorImDrawListPtr.__cache__ = {};
Module['ImVectorImDrawListPtr'] = ImVectorImDrawListPtr;

ImVectorImDrawListPtr.prototype['getData'] = ImVectorImDrawListPtr.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return wrapPointer(_emscripten_bind_ImVectorImDrawListPtr_getData_1(self, index), ImDrawList);
};

ImVectorImDrawListPtr.prototype['size'] = ImVectorImDrawListPtr.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImDrawListPtr_size_0(self);
};

ImVectorImDrawListPtr.prototype['__destroy__'] = ImVectorImDrawListPtr.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImDrawListPtr___destroy___0(self);
};

function ImVectorImDrawCmd() { throw "cannot construct a ImVectorImDrawCmd, no constructor in IDL" }
ImVectorImDrawCmd.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorImDrawCmd.prototype.constructor = ImVectorImDrawCmd;
ImVectorImDrawCmd.prototype.__class__ = ImVectorImDrawCmd;
ImVectorImDrawCmd.__cache__ = {};
Module['ImVectorImDrawCmd'] = ImVectorImDrawCmd;

ImVectorImDrawCmd.prototype['getData'] = ImVectorImDrawCmd.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return wrapPointer(_emscripten_bind_ImVectorImDrawCmd_getData_1(self, index), ImDrawCmd);
};

ImVectorImDrawCmd.prototype['size'] = ImVectorImDrawCmd.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImDrawCmd_size_0(self);
};

ImVectorImDrawCmd.prototype['__destroy__'] = ImVectorImDrawCmd.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImDrawCmd___destroy___0(self);
};

function ImVectorImDrawIdx() { throw "cannot construct a ImVectorImDrawIdx, no constructor in IDL" }
ImVectorImDrawIdx.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorImDrawIdx.prototype.constructor = ImVectorImDrawIdx;
ImVectorImDrawIdx.prototype.__class__ = ImVectorImDrawIdx;
ImVectorImDrawIdx.__cache__ = {};
Module['ImVectorImDrawIdx'] = ImVectorImDrawIdx;

ImVectorImDrawIdx.prototype['size'] = ImVectorImDrawIdx.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImDrawIdx_size_0(self);
};

ImVectorImDrawIdx.prototype['getData'] = ImVectorImDrawIdx.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_ImVectorImDrawIdx_getData_1(self, index);
};

ImVectorImDrawIdx.prototype['get_Data'] = ImVectorImDrawIdx.prototype.get_Data = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImDrawIdx_get_Data_0(self);
};

Object.defineProperty(ImVectorImDrawIdx.prototype, 'Data', { get: ImVectorImDrawIdx.prototype.get_Data });

ImVectorImDrawIdx.prototype['__destroy__'] = ImVectorImDrawIdx.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImDrawIdx___destroy___0(self);
};

function ImVectorImDrawVert() { throw "cannot construct a ImVectorImDrawVert, no constructor in IDL" }
ImVectorImDrawVert.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorImDrawVert.prototype.constructor = ImVectorImDrawVert;
ImVectorImDrawVert.prototype.__class__ = ImVectorImDrawVert;
ImVectorImDrawVert.__cache__ = {};
Module['ImVectorImDrawVert'] = ImVectorImDrawVert;

ImVectorImDrawVert.prototype['size'] = ImVectorImDrawVert.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImDrawVert_size_0(self);
};

ImVectorImDrawVert.prototype['getData'] = ImVectorImDrawVert.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return wrapPointer(_emscripten_bind_ImVectorImDrawVert_getData_1(self, index), ImDrawVert);
};

ImVectorImDrawVert.prototype['get_Data'] = ImVectorImDrawVert.prototype.get_Data = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImDrawVert_get_Data_0(self);
};

Object.defineProperty(ImVectorImDrawVert.prototype, 'Data', { get: ImVectorImDrawVert.prototype.get_Data });

ImVectorImDrawVert.prototype['__destroy__'] = ImVectorImDrawVert.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImDrawVert___destroy___0(self);
};

function ImVectorUnsignedInt() { throw "cannot construct a ImVectorUnsignedInt, no constructor in IDL" }
ImVectorUnsignedInt.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorUnsignedInt.prototype.constructor = ImVectorUnsignedInt;
ImVectorUnsignedInt.prototype.__class__ = ImVectorUnsignedInt;
ImVectorUnsignedInt.__cache__ = {};
Module['ImVectorUnsignedInt'] = ImVectorUnsignedInt;

ImVectorUnsignedInt.prototype['getData'] = ImVectorUnsignedInt.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_ImVectorUnsignedInt_getData_1(self, index);
};

ImVectorUnsignedInt.prototype['size'] = ImVectorUnsignedInt.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorUnsignedInt_size_0(self);
};

ImVectorUnsignedInt.prototype['front'] = ImVectorUnsignedInt.prototype.front = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorUnsignedInt_front_0(self);
};

ImVectorUnsignedInt.prototype['back'] = ImVectorUnsignedInt.prototype.back = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorUnsignedInt_back_0(self);
};

ImVectorUnsignedInt.prototype['__destroy__'] = ImVectorUnsignedInt.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorUnsignedInt___destroy___0(self);
};

function ImVectorImGuiWindowPtr() { throw "cannot construct a ImVectorImGuiWindowPtr, no constructor in IDL" }
ImVectorImGuiWindowPtr.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorImGuiWindowPtr.prototype.constructor = ImVectorImGuiWindowPtr;
ImVectorImGuiWindowPtr.prototype.__class__ = ImVectorImGuiWindowPtr;
ImVectorImGuiWindowPtr.__cache__ = {};
Module['ImVectorImGuiWindowPtr'] = ImVectorImGuiWindowPtr;

ImVectorImGuiWindowPtr.prototype['size'] = ImVectorImGuiWindowPtr.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImGuiWindowPtr_size_0(self);
};

ImVectorImGuiWindowPtr.prototype['getData'] = ImVectorImGuiWindowPtr.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return wrapPointer(_emscripten_bind_ImVectorImGuiWindowPtr_getData_1(self, index), ImGuiWindow);
};

ImVectorImGuiWindowPtr.prototype['get_Data'] = ImVectorImGuiWindowPtr.prototype.get_Data = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImGuiWindowPtr_get_Data_0(self);
};

Object.defineProperty(ImVectorImGuiWindowPtr.prototype, 'Data', { get: ImVectorImGuiWindowPtr.prototype.get_Data });

ImVectorImGuiWindowPtr.prototype['__destroy__'] = ImVectorImGuiWindowPtr.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImGuiWindowPtr___destroy___0(self);
};

function ImVectorImTextureDataPtr() { throw "cannot construct a ImVectorImTextureDataPtr, no constructor in IDL" }
ImVectorImTextureDataPtr.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorImTextureDataPtr.prototype.constructor = ImVectorImTextureDataPtr;
ImVectorImTextureDataPtr.prototype.__class__ = ImVectorImTextureDataPtr;
ImVectorImTextureDataPtr.__cache__ = {};
Module['ImVectorImTextureDataPtr'] = ImVectorImTextureDataPtr;

ImVectorImTextureDataPtr.prototype['size'] = ImVectorImTextureDataPtr.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImTextureDataPtr_size_0(self);
};

ImVectorImTextureDataPtr.prototype['getData'] = ImVectorImTextureDataPtr.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return wrapPointer(_emscripten_bind_ImVectorImTextureDataPtr_getData_1(self, index), ImTextureData);
};

ImVectorImTextureDataPtr.prototype['get_Data'] = ImVectorImTextureDataPtr.prototype.get_Data = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImTextureDataPtr_get_Data_0(self);
};

Object.defineProperty(ImVectorImTextureDataPtr.prototype, 'Data', { get: ImVectorImTextureDataPtr.prototype.get_Data });

ImVectorImTextureDataPtr.prototype['__destroy__'] = ImVectorImTextureDataPtr.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImTextureDataPtr___destroy___0(self);
};

function ImVectorImGuiWindowStackData() { throw "cannot construct a ImVectorImGuiWindowStackData, no constructor in IDL" }
ImVectorImGuiWindowStackData.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorImGuiWindowStackData.prototype.constructor = ImVectorImGuiWindowStackData;
ImVectorImGuiWindowStackData.prototype.__class__ = ImVectorImGuiWindowStackData;
ImVectorImGuiWindowStackData.__cache__ = {};
Module['ImVectorImGuiWindowStackData'] = ImVectorImGuiWindowStackData;

ImVectorImGuiWindowStackData.prototype['size'] = ImVectorImGuiWindowStackData.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImGuiWindowStackData_size_0(self);
};

ImVectorImGuiWindowStackData.prototype['getData'] = ImVectorImGuiWindowStackData.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return wrapPointer(_emscripten_bind_ImVectorImGuiWindowStackData_getData_1(self, index), ImGuiWindowStackData);
};

ImVectorImGuiWindowStackData.prototype['get_Data'] = ImVectorImGuiWindowStackData.prototype.get_Data = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImGuiWindowStackData_get_Data_0(self);
};

Object.defineProperty(ImVectorImGuiWindowStackData.prototype, 'Data', { get: ImVectorImGuiWindowStackData.prototype.get_Data });

ImVectorImGuiWindowStackData.prototype['__destroy__'] = ImVectorImGuiWindowStackData.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImGuiWindowStackData___destroy___0(self);
};

function ImVectorImTextureRect() { throw "cannot construct a ImVectorImTextureRect, no constructor in IDL" }
ImVectorImTextureRect.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorImTextureRect.prototype.constructor = ImVectorImTextureRect;
ImVectorImTextureRect.prototype.__class__ = ImVectorImTextureRect;
ImVectorImTextureRect.__cache__ = {};
Module['ImVectorImTextureRect'] = ImVectorImTextureRect;

ImVectorImTextureRect.prototype['size'] = ImVectorImTextureRect.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImTextureRect_size_0(self);
};

ImVectorImTextureRect.prototype['getData'] = ImVectorImTextureRect.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return wrapPointer(_emscripten_bind_ImVectorImTextureRect_getData_1(self, index), ImTextureRect);
};

ImVectorImTextureRect.prototype['get_Data'] = ImVectorImTextureRect.prototype.get_Data = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImTextureRect_get_Data_0(self);
};

Object.defineProperty(ImVectorImTextureRect.prototype, 'Data', { get: ImVectorImTextureRect.prototype.get_Data });

ImVectorImTextureRect.prototype['__destroy__'] = ImVectorImTextureRect.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImTextureRect___destroy___0(self);
};

function ImVectorImGuiStoragePair() { throw "cannot construct a ImVectorImGuiStoragePair, no constructor in IDL" }
ImVectorImGuiStoragePair.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorImGuiStoragePair.prototype.constructor = ImVectorImGuiStoragePair;
ImVectorImGuiStoragePair.prototype.__class__ = ImVectorImGuiStoragePair;
ImVectorImGuiStoragePair.__cache__ = {};
Module['ImVectorImGuiStoragePair'] = ImVectorImGuiStoragePair;

ImVectorImGuiStoragePair.prototype['size'] = ImVectorImGuiStoragePair.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImGuiStoragePair_size_0(self);
};

ImVectorImGuiStoragePair.prototype['getData'] = ImVectorImGuiStoragePair.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return wrapPointer(_emscripten_bind_ImVectorImGuiStoragePair_getData_1(self, index), ImGuiStoragePair);
};

ImVectorImGuiStoragePair.prototype['reserve'] = ImVectorImGuiStoragePair.prototype.reserve = function(new_capacity) {
  var self = this.ptr;
  if (new_capacity && typeof new_capacity === 'object') new_capacity = new_capacity.ptr;
  _emscripten_bind_ImVectorImGuiStoragePair_reserve_1(self, new_capacity);
};

ImVectorImGuiStoragePair.prototype['resize'] = ImVectorImGuiStoragePair.prototype.resize = function(new_size) {
  var self = this.ptr;
  if (new_size && typeof new_size === 'object') new_size = new_size.ptr;
  _emscripten_bind_ImVectorImGuiStoragePair_resize_1(self, new_size);
};

ImVectorImGuiStoragePair.prototype['clear'] = ImVectorImGuiStoragePair.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImGuiStoragePair_clear_0(self);
};

ImVectorImGuiStoragePair.prototype['get_Data'] = ImVectorImGuiStoragePair.prototype.get_Data = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImGuiStoragePair_get_Data_0(self);
};

Object.defineProperty(ImVectorImGuiStoragePair.prototype, 'Data', { get: ImVectorImGuiStoragePair.prototype.get_Data });

ImVectorImGuiStoragePair.prototype['__destroy__'] = ImVectorImGuiStoragePair.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImGuiStoragePair___destroy___0(self);
};

function ImVectorImGuiID() {
  this.ptr = _emscripten_bind_ImVectorImGuiID_ImVectorImGuiID_0();
  window.idl.getCache(ImVectorImGuiID)[this.ptr] = this;
};

ImVectorImGuiID.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorImGuiID.prototype.constructor = ImVectorImGuiID;
ImVectorImGuiID.prototype.__class__ = ImVectorImGuiID;
ImVectorImGuiID.__cache__ = {};
Module['ImVectorImGuiID'] = ImVectorImGuiID;

ImVectorImGuiID.prototype['size'] = ImVectorImGuiID.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImGuiID_size_0(self);
};

ImVectorImGuiID.prototype['getData'] = ImVectorImGuiID.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_ImVectorImGuiID_getData_1(self, index);
};

ImVectorImGuiID.prototype['push_back'] = ImVectorImGuiID.prototype.push_back = function(v) {
  var self = this.ptr;
  if (v && typeof v === 'object') v = v.ptr;
  _emscripten_bind_ImVectorImGuiID_push_back_1(self, v);
};

ImVectorImGuiID.prototype['reserve'] = ImVectorImGuiID.prototype.reserve = function(new_capacity) {
  var self = this.ptr;
  if (new_capacity && typeof new_capacity === 'object') new_capacity = new_capacity.ptr;
  _emscripten_bind_ImVectorImGuiID_reserve_1(self, new_capacity);
};

ImVectorImGuiID.prototype['resize'] = ImVectorImGuiID.prototype.resize = function(new_size) {
  var self = this.ptr;
  if (new_size && typeof new_size === 'object') new_size = new_size.ptr;
  _emscripten_bind_ImVectorImGuiID_resize_1(self, new_size);
};

ImVectorImGuiID.prototype['clear'] = ImVectorImGuiID.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImGuiID_clear_0(self);
};

ImVectorImGuiID.prototype['get_Data'] = ImVectorImGuiID.prototype.get_Data = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorImGuiID_get_Data_0(self);
};

Object.defineProperty(ImVectorImGuiID.prototype, 'Data', { get: ImVectorImGuiID.prototype.get_Data });

ImVectorImGuiID.prototype['__destroy__'] = ImVectorImGuiID.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorImGuiID___destroy___0(self);
};

function ImVectorDOMString() {
  this.ptr = _emscripten_bind_ImVectorDOMString_ImVectorDOMString_0();
  window.idl.getCache(ImVectorDOMString)[this.ptr] = this;
};

ImVectorDOMString.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVectorDOMString.prototype.constructor = ImVectorDOMString;
ImVectorDOMString.prototype.__class__ = ImVectorDOMString;
ImVectorDOMString.__cache__ = {};
Module['ImVectorDOMString'] = ImVectorDOMString;

ImVectorDOMString.prototype['size'] = ImVectorDOMString.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorDOMString_size_0(self);
};

ImVectorDOMString.prototype['getData'] = ImVectorDOMString.prototype.getData = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return wrapPointer(_emscripten_bind_ImVectorDOMString_getData_1(self, index), IDLString);
};

ImVectorDOMString.prototype['push_back'] = ImVectorDOMString.prototype.push_back = function(v) {
  var self = this.ptr;
  ensureCache.prepare();
  if (v && typeof v === 'object') v = v.ptr;
  else v = ensureString(v);
  _emscripten_bind_ImVectorDOMString_push_back_1(self, v);
};

ImVectorDOMString.prototype['reserve'] = ImVectorDOMString.prototype.reserve = function(new_capacity) {
  var self = this.ptr;
  if (new_capacity && typeof new_capacity === 'object') new_capacity = new_capacity.ptr;
  _emscripten_bind_ImVectorDOMString_reserve_1(self, new_capacity);
};

ImVectorDOMString.prototype['resize'] = ImVectorDOMString.prototype.resize = function(new_size) {
  var self = this.ptr;
  if (new_size && typeof new_size === 'object') new_size = new_size.ptr;
  _emscripten_bind_ImVectorDOMString_resize_1(self, new_size);
};

ImVectorDOMString.prototype['clear'] = ImVectorDOMString.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorDOMString_clear_0(self);
};

ImVectorDOMString.prototype['get_Data'] = ImVectorDOMString.prototype.get_Data = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVectorDOMString_get_Data_0(self);
};

Object.defineProperty(ImVectorDOMString.prototype, 'Data', { get: ImVectorDOMString.prototype.get_Data });

ImVectorDOMString.prototype['__destroy__'] = ImVectorDOMString.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVectorDOMString___destroy___0(self);
};

function ImGuiLastItemData() { throw "cannot construct a ImGuiLastItemData, no constructor in IDL" }
ImGuiLastItemData.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiLastItemData.prototype.constructor = ImGuiLastItemData;
ImGuiLastItemData.prototype.__class__ = ImGuiLastItemData;
ImGuiLastItemData.__cache__ = {};
Module['ImGuiLastItemData'] = ImGuiLastItemData;

ImGuiLastItemData.prototype['get_Rect'] = ImGuiLastItemData.prototype.get_Rect = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiLastItemData_get_Rect_0(self), ImRect);
};

Object.defineProperty(ImGuiLastItemData.prototype, 'Rect', { get: ImGuiLastItemData.prototype.get_Rect });

ImGuiLastItemData.prototype['__destroy__'] = ImGuiLastItemData.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiLastItemData___destroy___0(self);
};

function ImGuiDockNode() { throw "cannot construct a ImGuiDockNode, no constructor in IDL" }
ImGuiDockNode.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiDockNode.prototype.constructor = ImGuiDockNode;
ImGuiDockNode.prototype.__class__ = ImGuiDockNode;
ImGuiDockNode.__cache__ = {};
Module['ImGuiDockNode'] = ImGuiDockNode;

ImGuiDockNode.prototype['get_LocalFlags'] = ImGuiDockNode.prototype.get_LocalFlags = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiDockNode_get_LocalFlags_0(self);
};

ImGuiDockNode.prototype['set_LocalFlags'] = ImGuiDockNode.prototype.set_LocalFlags = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiDockNode_set_LocalFlags_1(self, arg0);
};

Object.defineProperty(ImGuiDockNode.prototype, 'LocalFlags', { get: ImGuiDockNode.prototype.get_LocalFlags, set: ImGuiDockNode.prototype.set_LocalFlags });

ImGuiDockNode.prototype['get_SelectedTabId'] = ImGuiDockNode.prototype.get_SelectedTabId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiDockNode_get_SelectedTabId_0(self);
};

ImGuiDockNode.prototype['set_SelectedTabId'] = ImGuiDockNode.prototype.set_SelectedTabId = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiDockNode_set_SelectedTabId_1(self, arg0);
};

Object.defineProperty(ImGuiDockNode.prototype, 'SelectedTabId', { get: ImGuiDockNode.prototype.get_SelectedTabId, set: ImGuiDockNode.prototype.set_SelectedTabId });

ImGuiDockNode.prototype['get_TabBar'] = ImGuiDockNode.prototype.get_TabBar = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiDockNode_get_TabBar_0(self), ImGuiTabBar);
};

ImGuiDockNode.prototype['set_TabBar'] = ImGuiDockNode.prototype.set_TabBar = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiDockNode_set_TabBar_1(self, arg0);
};

Object.defineProperty(ImGuiDockNode.prototype, 'TabBar', { get: ImGuiDockNode.prototype.get_TabBar, set: ImGuiDockNode.prototype.set_TabBar });

ImGuiDockNode.prototype['__destroy__'] = ImGuiDockNode.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiDockNode___destroy___0(self);
};

function ImGuiTabBar() { throw "cannot construct a ImGuiTabBar, no constructor in IDL" }
ImGuiTabBar.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiTabBar.prototype.constructor = ImGuiTabBar;
ImGuiTabBar.prototype.__class__ = ImGuiTabBar;
ImGuiTabBar.__cache__ = {};
Module['ImGuiTabBar'] = ImGuiTabBar;

ImGuiTabBar.prototype['get_SelectedTabId'] = ImGuiTabBar.prototype.get_SelectedTabId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiTabBar_get_SelectedTabId_0(self);
};

ImGuiTabBar.prototype['set_SelectedTabId'] = ImGuiTabBar.prototype.set_SelectedTabId = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiTabBar_set_SelectedTabId_1(self, arg0);
};

Object.defineProperty(ImGuiTabBar.prototype, 'SelectedTabId', { get: ImGuiTabBar.prototype.get_SelectedTabId, set: ImGuiTabBar.prototype.set_SelectedTabId });

ImGuiTabBar.prototype['get_NextSelectedTabId'] = ImGuiTabBar.prototype.get_NextSelectedTabId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiTabBar_get_NextSelectedTabId_0(self);
};

ImGuiTabBar.prototype['set_NextSelectedTabId'] = ImGuiTabBar.prototype.set_NextSelectedTabId = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiTabBar_set_NextSelectedTabId_1(self, arg0);
};

Object.defineProperty(ImGuiTabBar.prototype, 'NextSelectedTabId', { get: ImGuiTabBar.prototype.get_NextSelectedTabId, set: ImGuiTabBar.prototype.set_NextSelectedTabId });

ImGuiTabBar.prototype['__destroy__'] = ImGuiTabBar.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiTabBar___destroy___0(self);
};

function ImGuiWindowTempData() { throw "cannot construct a ImGuiWindowTempData, no constructor in IDL" }
ImGuiWindowTempData.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiWindowTempData.prototype.constructor = ImGuiWindowTempData;
ImGuiWindowTempData.prototype.__class__ = ImGuiWindowTempData;
ImGuiWindowTempData.__cache__ = {};
Module['ImGuiWindowTempData'] = ImGuiWindowTempData;

ImGuiWindowTempData.prototype['get_CursorPos'] = ImGuiWindowTempData.prototype.get_CursorPos = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindowTempData_get_CursorPos_0(self), ImVec2);
};

Object.defineProperty(ImGuiWindowTempData.prototype, 'CursorPos', { get: ImGuiWindowTempData.prototype.get_CursorPos });

ImGuiWindowTempData.prototype['get_TreeDepth'] = ImGuiWindowTempData.prototype.get_TreeDepth = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindowTempData_get_TreeDepth_0(self);
};

ImGuiWindowTempData.prototype['set_TreeDepth'] = ImGuiWindowTempData.prototype.set_TreeDepth = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindowTempData_set_TreeDepth_1(self, arg0);
};

Object.defineProperty(ImGuiWindowTempData.prototype, 'TreeDepth', { get: ImGuiWindowTempData.prototype.get_TreeDepth, set: ImGuiWindowTempData.prototype.set_TreeDepth });

function ImGuiShrinkWidthItem() { throw "cannot construct a ImGuiShrinkWidthItem, no constructor in IDL" }
ImGuiShrinkWidthItem.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiShrinkWidthItem.prototype.constructor = ImGuiShrinkWidthItem;
ImGuiShrinkWidthItem.prototype.__class__ = ImGuiShrinkWidthItem;
ImGuiShrinkWidthItem.__cache__ = {};
Module['ImGuiShrinkWidthItem'] = ImGuiShrinkWidthItem;

ImGuiShrinkWidthItem.prototype['get_Index'] = ImGuiShrinkWidthItem.prototype.get_Index = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiShrinkWidthItem_get_Index_0(self);
};

ImGuiShrinkWidthItem.prototype['set_Index'] = ImGuiShrinkWidthItem.prototype.set_Index = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiShrinkWidthItem_set_Index_1(self, arg0);
};

Object.defineProperty(ImGuiShrinkWidthItem.prototype, 'Index', { get: ImGuiShrinkWidthItem.prototype.get_Index, set: ImGuiShrinkWidthItem.prototype.set_Index });

ImGuiShrinkWidthItem.prototype['get_Width'] = ImGuiShrinkWidthItem.prototype.get_Width = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiShrinkWidthItem_get_Width_0(self);
};

ImGuiShrinkWidthItem.prototype['set_Width'] = ImGuiShrinkWidthItem.prototype.set_Width = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiShrinkWidthItem_set_Width_1(self, arg0);
};

Object.defineProperty(ImGuiShrinkWidthItem.prototype, 'Width', { get: ImGuiShrinkWidthItem.prototype.get_Width, set: ImGuiShrinkWidthItem.prototype.set_Width });

ImGuiShrinkWidthItem.prototype['get_InitialWidth'] = ImGuiShrinkWidthItem.prototype.get_InitialWidth = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiShrinkWidthItem_get_InitialWidth_0(self);
};

ImGuiShrinkWidthItem.prototype['set_InitialWidth'] = ImGuiShrinkWidthItem.prototype.set_InitialWidth = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiShrinkWidthItem_set_InitialWidth_1(self, arg0);
};

Object.defineProperty(ImGuiShrinkWidthItem.prototype, 'InitialWidth', { get: ImGuiShrinkWidthItem.prototype.get_InitialWidth, set: ImGuiShrinkWidthItem.prototype.set_InitialWidth });

ImGuiShrinkWidthItem.prototype['__destroy__'] = ImGuiShrinkWidthItem.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiShrinkWidthItem___destroy___0(self);
};

function ImGuiTabItem() { throw "cannot construct a ImGuiTabItem, no constructor in IDL" }
ImGuiTabItem.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiTabItem.prototype.constructor = ImGuiTabItem;
ImGuiTabItem.prototype.__class__ = ImGuiTabItem;
ImGuiTabItem.__cache__ = {};
Module['ImGuiTabItem'] = ImGuiTabItem;

ImGuiTabItem.prototype['__destroy__'] = ImGuiTabItem.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiTabItem___destroy___0(self);
};

function ImGuiWindowStackData() { throw "cannot construct a ImGuiWindowStackData, no constructor in IDL" }
ImGuiWindowStackData.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiWindowStackData.prototype.constructor = ImGuiWindowStackData;
ImGuiWindowStackData.prototype.__class__ = ImGuiWindowStackData;
ImGuiWindowStackData.__cache__ = {};
Module['ImGuiWindowStackData'] = ImGuiWindowStackData;

ImGuiWindowStackData.prototype['__destroy__'] = ImGuiWindowStackData.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiWindowStackData___destroy___0(self);
};

function ImGuiContext() { throw "cannot construct a ImGuiContext, no constructor in IDL" }
ImGuiContext.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiContext.prototype.constructor = ImGuiContext;
ImGuiContext.prototype.__class__ = ImGuiContext;
ImGuiContext.__cache__ = {};
Module['ImGuiContext'] = ImGuiContext;

ImGuiContext.prototype['get_Time'] = ImGuiContext.prototype.get_Time = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_Time_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'Time', { get: ImGuiContext.prototype.get_Time });

ImGuiContext.prototype['get_NavId'] = ImGuiContext.prototype.get_NavId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_NavId_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'NavId', { get: ImGuiContext.prototype.get_NavId });

ImGuiContext.prototype['get_Windows'] = ImGuiContext.prototype.get_Windows = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_Windows_0(self), ImVectorImGuiWindowPtr);
};

Object.defineProperty(ImGuiContext.prototype, 'Windows', { get: ImGuiContext.prototype.get_Windows });

ImGuiContext.prototype['get_WindowsFocusOrder'] = ImGuiContext.prototype.get_WindowsFocusOrder = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_WindowsFocusOrder_0(self), ImVectorImGuiWindowPtr);
};

Object.defineProperty(ImGuiContext.prototype, 'WindowsFocusOrder', { get: ImGuiContext.prototype.get_WindowsFocusOrder });

ImGuiContext.prototype['get_WindowsTempSortBuffer'] = ImGuiContext.prototype.get_WindowsTempSortBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_WindowsTempSortBuffer_0(self), ImVectorImGuiWindowPtr);
};

Object.defineProperty(ImGuiContext.prototype, 'WindowsTempSortBuffer', { get: ImGuiContext.prototype.get_WindowsTempSortBuffer });

ImGuiContext.prototype['get_CurrentWindowStack'] = ImGuiContext.prototype.get_CurrentWindowStack = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_CurrentWindowStack_0(self), ImVectorImGuiWindowStackData);
};

Object.defineProperty(ImGuiContext.prototype, 'CurrentWindowStack', { get: ImGuiContext.prototype.get_CurrentWindowStack });

ImGuiContext.prototype['get_WindowsById'] = ImGuiContext.prototype.get_WindowsById = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_WindowsById_0(self), ImGuiStorage);
};

Object.defineProperty(ImGuiContext.prototype, 'WindowsById', { get: ImGuiContext.prototype.get_WindowsById });

ImGuiContext.prototype['get_WindowsActiveCount'] = ImGuiContext.prototype.get_WindowsActiveCount = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_WindowsActiveCount_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'WindowsActiveCount', { get: ImGuiContext.prototype.get_WindowsActiveCount });

ImGuiContext.prototype['get_WindowsBorderHoverPadding'] = ImGuiContext.prototype.get_WindowsBorderHoverPadding = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_WindowsBorderHoverPadding_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'WindowsBorderHoverPadding', { get: ImGuiContext.prototype.get_WindowsBorderHoverPadding });

ImGuiContext.prototype['get_DebugBreakInWindow'] = ImGuiContext.prototype.get_DebugBreakInWindow = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_DebugBreakInWindow_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'DebugBreakInWindow', { get: ImGuiContext.prototype.get_DebugBreakInWindow });

ImGuiContext.prototype['get_CurrentWindow'] = ImGuiContext.prototype.get_CurrentWindow = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_CurrentWindow_0(self), ImGuiWindow);
};

Object.defineProperty(ImGuiContext.prototype, 'CurrentWindow', { get: ImGuiContext.prototype.get_CurrentWindow });

ImGuiContext.prototype['get_HoveredWindow'] = ImGuiContext.prototype.get_HoveredWindow = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_HoveredWindow_0(self), ImGuiWindow);
};

Object.defineProperty(ImGuiContext.prototype, 'HoveredWindow', { get: ImGuiContext.prototype.get_HoveredWindow });

ImGuiContext.prototype['get_HoveredWindowUnderMovingWindow'] = ImGuiContext.prototype.get_HoveredWindowUnderMovingWindow = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_HoveredWindowUnderMovingWindow_0(self), ImGuiWindow);
};

Object.defineProperty(ImGuiContext.prototype, 'HoveredWindowUnderMovingWindow', { get: ImGuiContext.prototype.get_HoveredWindowUnderMovingWindow });

ImGuiContext.prototype['get_HoveredWindowBeforeClear'] = ImGuiContext.prototype.get_HoveredWindowBeforeClear = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_HoveredWindowBeforeClear_0(self), ImGuiWindow);
};

Object.defineProperty(ImGuiContext.prototype, 'HoveredWindowBeforeClear', { get: ImGuiContext.prototype.get_HoveredWindowBeforeClear });

ImGuiContext.prototype['get_MovingWindow'] = ImGuiContext.prototype.get_MovingWindow = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_MovingWindow_0(self), ImGuiWindow);
};

Object.defineProperty(ImGuiContext.prototype, 'MovingWindow', { get: ImGuiContext.prototype.get_MovingWindow });

ImGuiContext.prototype['get_WheelingWindow'] = ImGuiContext.prototype.get_WheelingWindow = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_WheelingWindow_0(self), ImGuiWindow);
};

Object.defineProperty(ImGuiContext.prototype, 'WheelingWindow', { get: ImGuiContext.prototype.get_WheelingWindow });

ImGuiContext.prototype['get_WheelingWindowRefMousePos'] = ImGuiContext.prototype.get_WheelingWindowRefMousePos = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_WheelingWindowRefMousePos_0(self), ImVec2);
};

Object.defineProperty(ImGuiContext.prototype, 'WheelingWindowRefMousePos', { get: ImGuiContext.prototype.get_WheelingWindowRefMousePos });

ImGuiContext.prototype['get_WheelingWindowStartFrame'] = ImGuiContext.prototype.get_WheelingWindowStartFrame = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_WheelingWindowStartFrame_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'WheelingWindowStartFrame', { get: ImGuiContext.prototype.get_WheelingWindowStartFrame });

ImGuiContext.prototype['get_WheelingWindowScrolledFrame'] = ImGuiContext.prototype.get_WheelingWindowScrolledFrame = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_WheelingWindowScrolledFrame_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'WheelingWindowScrolledFrame', { get: ImGuiContext.prototype.get_WheelingWindowScrolledFrame });

ImGuiContext.prototype['get_WheelingWindowReleaseTimer'] = ImGuiContext.prototype.get_WheelingWindowReleaseTimer = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_WheelingWindowReleaseTimer_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'WheelingWindowReleaseTimer', { get: ImGuiContext.prototype.get_WheelingWindowReleaseTimer });

ImGuiContext.prototype['get_WheelingWindowWheelRemainder'] = ImGuiContext.prototype.get_WheelingWindowWheelRemainder = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_WheelingWindowWheelRemainder_0(self), ImVec2);
};

Object.defineProperty(ImGuiContext.prototype, 'WheelingWindowWheelRemainder', { get: ImGuiContext.prototype.get_WheelingWindowWheelRemainder });

ImGuiContext.prototype['get_WheelingAxisAvg'] = ImGuiContext.prototype.get_WheelingAxisAvg = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_WheelingAxisAvg_0(self), ImVec2);
};

Object.defineProperty(ImGuiContext.prototype, 'WheelingAxisAvg', { get: ImGuiContext.prototype.get_WheelingAxisAvg });

ImGuiContext.prototype['get_DebugDrawIdConflictsId'] = ImGuiContext.prototype.get_DebugDrawIdConflictsId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_DebugDrawIdConflictsId_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'DebugDrawIdConflictsId', { get: ImGuiContext.prototype.get_DebugDrawIdConflictsId });

ImGuiContext.prototype['get_DebugHookIdInfoId'] = ImGuiContext.prototype.get_DebugHookIdInfoId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_DebugHookIdInfoId_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'DebugHookIdInfoId', { get: ImGuiContext.prototype.get_DebugHookIdInfoId });

ImGuiContext.prototype['get_HoveredId'] = ImGuiContext.prototype.get_HoveredId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_HoveredId_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'HoveredId', { get: ImGuiContext.prototype.get_HoveredId });

ImGuiContext.prototype['get_HoveredIdPreviousFrame'] = ImGuiContext.prototype.get_HoveredIdPreviousFrame = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_HoveredIdPreviousFrame_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'HoveredIdPreviousFrame', { get: ImGuiContext.prototype.get_HoveredIdPreviousFrame });

ImGuiContext.prototype['get_HoveredIdPreviousFrameItemCount'] = ImGuiContext.prototype.get_HoveredIdPreviousFrameItemCount = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_HoveredIdPreviousFrameItemCount_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'HoveredIdPreviousFrameItemCount', { get: ImGuiContext.prototype.get_HoveredIdPreviousFrameItemCount });

ImGuiContext.prototype['get_HoveredIdTimer'] = ImGuiContext.prototype.get_HoveredIdTimer = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_HoveredIdTimer_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'HoveredIdTimer', { get: ImGuiContext.prototype.get_HoveredIdTimer });

ImGuiContext.prototype['get_HoveredIdNotActiveTimer'] = ImGuiContext.prototype.get_HoveredIdNotActiveTimer = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_HoveredIdNotActiveTimer_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'HoveredIdNotActiveTimer', { get: ImGuiContext.prototype.get_HoveredIdNotActiveTimer });

ImGuiContext.prototype['get_HoveredIdAllowOverlap'] = ImGuiContext.prototype.get_HoveredIdAllowOverlap = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiContext_get_HoveredIdAllowOverlap_0(self));
};

Object.defineProperty(ImGuiContext.prototype, 'HoveredIdAllowOverlap', { get: ImGuiContext.prototype.get_HoveredIdAllowOverlap });

ImGuiContext.prototype['get_HoveredIdIsDisabled'] = ImGuiContext.prototype.get_HoveredIdIsDisabled = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiContext_get_HoveredIdIsDisabled_0(self));
};

Object.defineProperty(ImGuiContext.prototype, 'HoveredIdIsDisabled', { get: ImGuiContext.prototype.get_HoveredIdIsDisabled });

ImGuiContext.prototype['get_ItemUnclipByLog'] = ImGuiContext.prototype.get_ItemUnclipByLog = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiContext_get_ItemUnclipByLog_0(self));
};

Object.defineProperty(ImGuiContext.prototype, 'ItemUnclipByLog', { get: ImGuiContext.prototype.get_ItemUnclipByLog });

ImGuiContext.prototype['get_ActiveId'] = ImGuiContext.prototype.get_ActiveId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_ActiveId_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveId', { get: ImGuiContext.prototype.get_ActiveId });

ImGuiContext.prototype['get_ActiveIdIsAlive'] = ImGuiContext.prototype.get_ActiveIdIsAlive = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_ActiveIdIsAlive_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdIsAlive', { get: ImGuiContext.prototype.get_ActiveIdIsAlive });

ImGuiContext.prototype['get_ActiveIdTimer'] = ImGuiContext.prototype.get_ActiveIdTimer = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_ActiveIdTimer_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdTimer', { get: ImGuiContext.prototype.get_ActiveIdTimer });

ImGuiContext.prototype['get_ActiveIdIsJustActivated'] = ImGuiContext.prototype.get_ActiveIdIsJustActivated = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiContext_get_ActiveIdIsJustActivated_0(self));
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdIsJustActivated', { get: ImGuiContext.prototype.get_ActiveIdIsJustActivated });

ImGuiContext.prototype['get_ActiveIdAllowOverlap'] = ImGuiContext.prototype.get_ActiveIdAllowOverlap = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiContext_get_ActiveIdAllowOverlap_0(self));
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdAllowOverlap', { get: ImGuiContext.prototype.get_ActiveIdAllowOverlap });

ImGuiContext.prototype['get_ActiveIdNoClearOnFocusLoss'] = ImGuiContext.prototype.get_ActiveIdNoClearOnFocusLoss = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiContext_get_ActiveIdNoClearOnFocusLoss_0(self));
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdNoClearOnFocusLoss', { get: ImGuiContext.prototype.get_ActiveIdNoClearOnFocusLoss });

ImGuiContext.prototype['get_ActiveIdHasBeenPressedBefore'] = ImGuiContext.prototype.get_ActiveIdHasBeenPressedBefore = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiContext_get_ActiveIdHasBeenPressedBefore_0(self));
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdHasBeenPressedBefore', { get: ImGuiContext.prototype.get_ActiveIdHasBeenPressedBefore });

ImGuiContext.prototype['get_ActiveIdHasBeenEditedBefore'] = ImGuiContext.prototype.get_ActiveIdHasBeenEditedBefore = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiContext_get_ActiveIdHasBeenEditedBefore_0(self));
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdHasBeenEditedBefore', { get: ImGuiContext.prototype.get_ActiveIdHasBeenEditedBefore });

ImGuiContext.prototype['get_ActiveIdHasBeenEditedThisFrame'] = ImGuiContext.prototype.get_ActiveIdHasBeenEditedThisFrame = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiContext_get_ActiveIdHasBeenEditedThisFrame_0(self));
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdHasBeenEditedThisFrame', { get: ImGuiContext.prototype.get_ActiveIdHasBeenEditedThisFrame });

ImGuiContext.prototype['get_ActiveIdFromShortcut'] = ImGuiContext.prototype.get_ActiveIdFromShortcut = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiContext_get_ActiveIdFromShortcut_0(self));
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdFromShortcut', { get: ImGuiContext.prototype.get_ActiveIdFromShortcut });

ImGuiContext.prototype['get_ActiveIdDisabledId'] = ImGuiContext.prototype.get_ActiveIdDisabledId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_ActiveIdDisabledId_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdDisabledId', { get: ImGuiContext.prototype.get_ActiveIdDisabledId });

ImGuiContext.prototype['get_ActiveIdMouseButton'] = ImGuiContext.prototype.get_ActiveIdMouseButton = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_ActiveIdMouseButton_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdMouseButton', { get: ImGuiContext.prototype.get_ActiveIdMouseButton });

ImGuiContext.prototype['get_ActiveIdClickOffset'] = ImGuiContext.prototype.get_ActiveIdClickOffset = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_ActiveIdClickOffset_0(self), ImVec2);
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdClickOffset', { get: ImGuiContext.prototype.get_ActiveIdClickOffset });

ImGuiContext.prototype['get_ActiveIdWindow'] = ImGuiContext.prototype.get_ActiveIdWindow = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_ActiveIdWindow_0(self), ImGuiWindow);
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdWindow', { get: ImGuiContext.prototype.get_ActiveIdWindow });

ImGuiContext.prototype['get_ActiveIdPreviousFrame'] = ImGuiContext.prototype.get_ActiveIdPreviousFrame = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_ActiveIdPreviousFrame_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'ActiveIdPreviousFrame', { get: ImGuiContext.prototype.get_ActiveIdPreviousFrame });

ImGuiContext.prototype['get_LastActiveId'] = ImGuiContext.prototype.get_LastActiveId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_LastActiveId_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'LastActiveId', { get: ImGuiContext.prototype.get_LastActiveId });

ImGuiContext.prototype['get_LastActiveIdTimer'] = ImGuiContext.prototype.get_LastActiveIdTimer = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiContext_get_LastActiveIdTimer_0(self);
};

Object.defineProperty(ImGuiContext.prototype, 'LastActiveIdTimer', { get: ImGuiContext.prototype.get_LastActiveIdTimer });

ImGuiContext.prototype['get_LastItemData'] = ImGuiContext.prototype.get_LastItemData = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiContext_get_LastItemData_0(self), ImGuiLastItemData);
};

Object.defineProperty(ImGuiContext.prototype, 'LastItemData', { get: ImGuiContext.prototype.get_LastItemData });

function ImDrawListSharedData() { throw "cannot construct a ImDrawListSharedData, no constructor in IDL" }
ImDrawListSharedData.prototype = Object.create(window.idl.WrapperObject.prototype);
ImDrawListSharedData.prototype.constructor = ImDrawListSharedData;
ImDrawListSharedData.prototype.__class__ = ImDrawListSharedData;
ImDrawListSharedData.__cache__ = {};
Module['ImDrawListSharedData'] = ImDrawListSharedData;

ImDrawListSharedData.prototype['__destroy__'] = ImDrawListSharedData.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImDrawListSharedData___destroy___0(self);
};

function ImVec2(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (x === undefined) { this.ptr = _emscripten_bind_ImVec2_ImVec2_0(); window.idl.getCache(ImVec2)[this.ptr] = this;return }
  if (y === undefined) { this.ptr = _emscripten_bind_ImVec2_ImVec2_1(x); window.idl.getCache(ImVec2)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_ImVec2_ImVec2_2(x, y);
  window.idl.getCache(ImVec2)[this.ptr] = this;
};

ImVec2.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVec2.prototype.constructor = ImVec2;
ImVec2.prototype.__class__ = ImVec2;
ImVec2.__cache__ = {};
Module['ImVec2'] = ImVec2;

ImVec2.prototype['get_x'] = ImVec2.prototype.get_x = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVec2_get_x_0(self);
};

ImVec2.prototype['set_x'] = ImVec2.prototype.set_x = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImVec2_set_x_1(self, arg0);
};

Object.defineProperty(ImVec2.prototype, 'x', { get: ImVec2.prototype.get_x, set: ImVec2.prototype.set_x });

ImVec2.prototype['get_y'] = ImVec2.prototype.get_y = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVec2_get_y_0(self);
};

ImVec2.prototype['set_y'] = ImVec2.prototype.set_y = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImVec2_set_y_1(self, arg0);
};

Object.defineProperty(ImVec2.prototype, 'y', { get: ImVec2.prototype.get_y, set: ImVec2.prototype.set_y });

ImVec2.prototype['__destroy__'] = ImVec2.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVec2___destroy___0(self);
};

function ImVec4(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (x === undefined) { this.ptr = _emscripten_bind_ImVec4_ImVec4_0(); window.idl.getCache(ImVec4)[this.ptr] = this;return }
  if (y === undefined) { this.ptr = _emscripten_bind_ImVec4_ImVec4_1(x); window.idl.getCache(ImVec4)[this.ptr] = this;return }
  if (z === undefined) { this.ptr = _emscripten_bind_ImVec4_ImVec4_2(x, y); window.idl.getCache(ImVec4)[this.ptr] = this;return }
  if (w === undefined) { this.ptr = _emscripten_bind_ImVec4_ImVec4_3(x, y, z); window.idl.getCache(ImVec4)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_ImVec4_ImVec4_4(x, y, z, w);
  window.idl.getCache(ImVec4)[this.ptr] = this;
};

ImVec4.prototype = Object.create(window.idl.WrapperObject.prototype);
ImVec4.prototype.constructor = ImVec4;
ImVec4.prototype.__class__ = ImVec4;
ImVec4.__cache__ = {};
Module['ImVec4'] = ImVec4;

ImVec4.prototype['copy'] = ImVec4.prototype.copy = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_ImVec4_copy_1(self, value), ImVec4);
};

ImVec4.prototype['get_x'] = ImVec4.prototype.get_x = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVec4_get_x_0(self);
};

ImVec4.prototype['set_x'] = ImVec4.prototype.set_x = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImVec4_set_x_1(self, arg0);
};

Object.defineProperty(ImVec4.prototype, 'x', { get: ImVec4.prototype.get_x, set: ImVec4.prototype.set_x });

ImVec4.prototype['get_y'] = ImVec4.prototype.get_y = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVec4_get_y_0(self);
};

ImVec4.prototype['set_y'] = ImVec4.prototype.set_y = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImVec4_set_y_1(self, arg0);
};

Object.defineProperty(ImVec4.prototype, 'y', { get: ImVec4.prototype.get_y, set: ImVec4.prototype.set_y });

ImVec4.prototype['get_z'] = ImVec4.prototype.get_z = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVec4_get_z_0(self);
};

ImVec4.prototype['set_z'] = ImVec4.prototype.set_z = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImVec4_set_z_1(self, arg0);
};

Object.defineProperty(ImVec4.prototype, 'z', { get: ImVec4.prototype.get_z, set: ImVec4.prototype.set_z });

ImVec4.prototype['get_w'] = ImVec4.prototype.get_w = function() {
  var self = this.ptr;
  return _emscripten_bind_ImVec4_get_w_0(self);
};

ImVec4.prototype['set_w'] = ImVec4.prototype.set_w = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImVec4_set_w_1(self, arg0);
};

Object.defineProperty(ImVec4.prototype, 'w', { get: ImVec4.prototype.get_w, set: ImVec4.prototype.set_w });

ImVec4.prototype['__destroy__'] = ImVec4.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImVec4___destroy___0(self);
};

function ImRect(x1, y1, x2, y2) {
  if (x1 && typeof x1 === 'object') x1 = x1.ptr;
  if (y1 && typeof y1 === 'object') y1 = y1.ptr;
  if (x2 && typeof x2 === 'object') x2 = x2.ptr;
  if (y2 && typeof y2 === 'object') y2 = y2.ptr;
  if (x1 === undefined) { this.ptr = _emscripten_bind_ImRect_ImRect_0(); window.idl.getCache(ImRect)[this.ptr] = this;return }
  if (y1 === undefined) { this.ptr = _emscripten_bind_ImRect_ImRect_1(x1); window.idl.getCache(ImRect)[this.ptr] = this;return }
  if (x2 === undefined) { this.ptr = _emscripten_bind_ImRect_ImRect_2(x1, y1); window.idl.getCache(ImRect)[this.ptr] = this;return }
  if (y2 === undefined) { this.ptr = _emscripten_bind_ImRect_ImRect_3(x1, y1, x2); window.idl.getCache(ImRect)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_ImRect_ImRect_4(x1, y1, x2, y2);
  window.idl.getCache(ImRect)[this.ptr] = this;
};

ImRect.prototype = Object.create(window.idl.WrapperObject.prototype);
ImRect.prototype.constructor = ImRect;
ImRect.prototype.__class__ = ImRect;
ImRect.__cache__ = {};
Module['ImRect'] = ImRect;

ImRect.prototype['GetCenter'] = ImRect.prototype.GetCenter = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImRect_GetCenter_0(self), ImVec2);
};

ImRect.prototype['GetSize'] = ImRect.prototype.GetSize = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImRect_GetSize_0(self), ImVec2);
};

ImRect.prototype['GetWidth'] = ImRect.prototype.GetWidth = function() {
  var self = this.ptr;
  return _emscripten_bind_ImRect_GetWidth_0(self);
};

ImRect.prototype['GetHeight'] = ImRect.prototype.GetHeight = function() {
  var self = this.ptr;
  return _emscripten_bind_ImRect_GetHeight_0(self);
};

ImRect.prototype['GetArea'] = ImRect.prototype.GetArea = function() {
  var self = this.ptr;
  return _emscripten_bind_ImRect_GetArea_0(self);
};

ImRect.prototype['get_Min'] = ImRect.prototype.get_Min = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImRect_get_Min_0(self), ImVec2);
};

ImRect.prototype['set_Min'] = ImRect.prototype.set_Min = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImRect_set_Min_1(self, arg0);
};

Object.defineProperty(ImRect.prototype, 'Min', { get: ImRect.prototype.get_Min, set: ImRect.prototype.set_Min });

ImRect.prototype['get_Max'] = ImRect.prototype.get_Max = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImRect_get_Max_0(self), ImVec2);
};

ImRect.prototype['set_Max'] = ImRect.prototype.set_Max = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImRect_set_Max_1(self, arg0);
};

Object.defineProperty(ImRect.prototype, 'Max', { get: ImRect.prototype.get_Max, set: ImRect.prototype.set_Max });

ImRect.prototype['__destroy__'] = ImRect.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImRect___destroy___0(self);
};

function ImDrawCmd() { throw "cannot construct a ImDrawCmd, no constructor in IDL" }
ImDrawCmd.prototype = Object.create(window.idl.WrapperObject.prototype);
ImDrawCmd.prototype.constructor = ImDrawCmd;
ImDrawCmd.prototype.__class__ = ImDrawCmd;
ImDrawCmd.__cache__ = {};
Module['ImDrawCmd'] = ImDrawCmd;

ImDrawCmd.prototype['GetTexID'] = ImDrawCmd.prototype.GetTexID = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawCmd_GetTexID_0(self), ImTextureIDRef);
};

ImDrawCmd.prototype['get_ClipRect'] = ImDrawCmd.prototype.get_ClipRect = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawCmd_get_ClipRect_0(self), ImVec4);
};

ImDrawCmd.prototype['set_ClipRect'] = ImDrawCmd.prototype.set_ClipRect = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImDrawCmd_set_ClipRect_1(self, arg0);
};

Object.defineProperty(ImDrawCmd.prototype, 'ClipRect', { get: ImDrawCmd.prototype.get_ClipRect, set: ImDrawCmd.prototype.set_ClipRect });

ImDrawCmd.prototype['get_VtxOffset'] = ImDrawCmd.prototype.get_VtxOffset = function() {
  var self = this.ptr;
  return _emscripten_bind_ImDrawCmd_get_VtxOffset_0(self);
};

ImDrawCmd.prototype['set_VtxOffset'] = ImDrawCmd.prototype.set_VtxOffset = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImDrawCmd_set_VtxOffset_1(self, arg0);
};

Object.defineProperty(ImDrawCmd.prototype, 'VtxOffset', { get: ImDrawCmd.prototype.get_VtxOffset, set: ImDrawCmd.prototype.set_VtxOffset });

ImDrawCmd.prototype['get_IdxOffset'] = ImDrawCmd.prototype.get_IdxOffset = function() {
  var self = this.ptr;
  return _emscripten_bind_ImDrawCmd_get_IdxOffset_0(self);
};

ImDrawCmd.prototype['set_IdxOffset'] = ImDrawCmd.prototype.set_IdxOffset = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImDrawCmd_set_IdxOffset_1(self, arg0);
};

Object.defineProperty(ImDrawCmd.prototype, 'IdxOffset', { get: ImDrawCmd.prototype.get_IdxOffset, set: ImDrawCmd.prototype.set_IdxOffset });

ImDrawCmd.prototype['get_ElemCount'] = ImDrawCmd.prototype.get_ElemCount = function() {
  var self = this.ptr;
  return _emscripten_bind_ImDrawCmd_get_ElemCount_0(self);
};

ImDrawCmd.prototype['set_ElemCount'] = ImDrawCmd.prototype.set_ElemCount = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImDrawCmd_set_ElemCount_1(self, arg0);
};

Object.defineProperty(ImDrawCmd.prototype, 'ElemCount', { get: ImDrawCmd.prototype.get_ElemCount, set: ImDrawCmd.prototype.set_ElemCount });

ImDrawCmd.prototype['__destroy__'] = ImDrawCmd.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImDrawCmd___destroy___0(self);
};

function ImDrawVert() { throw "cannot construct a ImDrawVert, no constructor in IDL" }
ImDrawVert.prototype = Object.create(window.idl.WrapperObject.prototype);
ImDrawVert.prototype.constructor = ImDrawVert;
ImDrawVert.prototype.__class__ = ImDrawVert;
ImDrawVert.__cache__ = {};
Module['ImDrawVert'] = ImDrawVert;

ImDrawVert.prototype['get_pos'] = ImDrawVert.prototype.get_pos = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawVert_get_pos_0(self), ImVec2);
};

ImDrawVert.prototype['set_pos'] = ImDrawVert.prototype.set_pos = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImDrawVert_set_pos_1(self, arg0);
};

Object.defineProperty(ImDrawVert.prototype, 'pos', { get: ImDrawVert.prototype.get_pos, set: ImDrawVert.prototype.set_pos });

ImDrawVert.prototype['get_uv'] = ImDrawVert.prototype.get_uv = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawVert_get_uv_0(self), ImVec2);
};

ImDrawVert.prototype['set_uv'] = ImDrawVert.prototype.set_uv = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImDrawVert_set_uv_1(self, arg0);
};

Object.defineProperty(ImDrawVert.prototype, 'uv', { get: ImDrawVert.prototype.get_uv, set: ImDrawVert.prototype.set_uv });

ImDrawVert.prototype['get_col'] = ImDrawVert.prototype.get_col = function() {
  var self = this.ptr;
  return _emscripten_bind_ImDrawVert_get_col_0(self);
};

ImDrawVert.prototype['set_col'] = ImDrawVert.prototype.set_col = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImDrawVert_set_col_1(self, arg0);
};

Object.defineProperty(ImDrawVert.prototype, 'col', { get: ImDrawVert.prototype.get_col, set: ImDrawVert.prototype.set_col });

ImDrawVert.prototype['__destroy__'] = ImDrawVert.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImDrawVert___destroy___0(self);
};

function ImDrawData() { throw "cannot construct a ImDrawData, no constructor in IDL" }
ImDrawData.prototype = Object.create(window.idl.WrapperObject.prototype);
ImDrawData.prototype.constructor = ImDrawData;
ImDrawData.prototype.__class__ = ImDrawData;
ImDrawData.__cache__ = {};
Module['ImDrawData'] = ImDrawData;

ImDrawData.prototype['get_CmdListsCount'] = ImDrawData.prototype.get_CmdListsCount = function() {
  var self = this.ptr;
  return _emscripten_bind_ImDrawData_get_CmdListsCount_0(self);
};

Object.defineProperty(ImDrawData.prototype, 'CmdListsCount', { get: ImDrawData.prototype.get_CmdListsCount });

ImDrawData.prototype['get_TotalIdxCount'] = ImDrawData.prototype.get_TotalIdxCount = function() {
  var self = this.ptr;
  return _emscripten_bind_ImDrawData_get_TotalIdxCount_0(self);
};

Object.defineProperty(ImDrawData.prototype, 'TotalIdxCount', { get: ImDrawData.prototype.get_TotalIdxCount });

ImDrawData.prototype['get_TotalVtxCount'] = ImDrawData.prototype.get_TotalVtxCount = function() {
  var self = this.ptr;
  return _emscripten_bind_ImDrawData_get_TotalVtxCount_0(self);
};

Object.defineProperty(ImDrawData.prototype, 'TotalVtxCount', { get: ImDrawData.prototype.get_TotalVtxCount });

ImDrawData.prototype['get_Valid'] = ImDrawData.prototype.get_Valid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImDrawData_get_Valid_0(self));
};

Object.defineProperty(ImDrawData.prototype, 'Valid', { get: ImDrawData.prototype.get_Valid });

ImDrawData.prototype['get_Textures'] = ImDrawData.prototype.get_Textures = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawData_get_Textures_0(self), ImVectorImTextureDataPtr);
};

Object.defineProperty(ImDrawData.prototype, 'Textures', { get: ImDrawData.prototype.get_Textures });

ImDrawData.prototype['get_CmdLists'] = ImDrawData.prototype.get_CmdLists = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawData_get_CmdLists_0(self), ImVectorImDrawListPtr);
};

Object.defineProperty(ImDrawData.prototype, 'CmdLists', { get: ImDrawData.prototype.get_CmdLists });

ImDrawData.prototype['get_DisplayPos'] = ImDrawData.prototype.get_DisplayPos = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawData_get_DisplayPos_0(self), ImVec2);
};

Object.defineProperty(ImDrawData.prototype, 'DisplayPos', { get: ImDrawData.prototype.get_DisplayPos });

ImDrawData.prototype['get_DisplaySize'] = ImDrawData.prototype.get_DisplaySize = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawData_get_DisplaySize_0(self), ImVec2);
};

Object.defineProperty(ImDrawData.prototype, 'DisplaySize', { get: ImDrawData.prototype.get_DisplaySize });

ImDrawData.prototype['get_FramebufferScale'] = ImDrawData.prototype.get_FramebufferScale = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawData_get_FramebufferScale_0(self), ImVec2);
};

Object.defineProperty(ImDrawData.prototype, 'FramebufferScale', { get: ImDrawData.prototype.get_FramebufferScale });

ImDrawData.prototype['get_OwnerViewport'] = ImDrawData.prototype.get_OwnerViewport = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawData_get_OwnerViewport_0(self), ImGuiViewport);
};

Object.defineProperty(ImDrawData.prototype, 'OwnerViewport', { get: ImDrawData.prototype.get_OwnerViewport });

ImDrawData.prototype['__destroy__'] = ImDrawData.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImDrawData___destroy___0(self);
};

function ImDrawList() { throw "cannot construct a ImDrawList, no constructor in IDL" }
ImDrawList.prototype = Object.create(window.idl.WrapperObject.prototype);
ImDrawList.prototype.constructor = ImDrawList;
ImDrawList.prototype.__class__ = ImDrawList;
ImDrawList.__cache__ = {};
Module['ImDrawList'] = ImDrawList;

ImDrawList.prototype['PushClipRect'] = ImDrawList.prototype.PushClipRect = function(cr_min, cr_max, intersect_with_current_clip_rect) {
  var self = this.ptr;
  if (cr_min && typeof cr_min === 'object') cr_min = cr_min.ptr;
  if (cr_max && typeof cr_max === 'object') cr_max = cr_max.ptr;
  if (intersect_with_current_clip_rect && typeof intersect_with_current_clip_rect === 'object') intersect_with_current_clip_rect = intersect_with_current_clip_rect.ptr;
  if (intersect_with_current_clip_rect === undefined) { _emscripten_bind_ImDrawList_PushClipRect_2(self, cr_min, cr_max); return }
  _emscripten_bind_ImDrawList_PushClipRect_3(self, cr_min, cr_max, intersect_with_current_clip_rect);
};

ImDrawList.prototype['PushClipRectFullScreen'] = ImDrawList.prototype.PushClipRectFullScreen = function() {
  var self = this.ptr;
  _emscripten_bind_ImDrawList_PushClipRectFullScreen_0(self);
};

ImDrawList.prototype['PopClipRect'] = ImDrawList.prototype.PopClipRect = function() {
  var self = this.ptr;
  _emscripten_bind_ImDrawList_PopClipRect_0(self);
};

ImDrawList.prototype['PushTextureID'] = ImDrawList.prototype.PushTextureID = function(tex_ref) {
  var self = this.ptr;
  if (tex_ref && typeof tex_ref === 'object') tex_ref = tex_ref.ptr;
  _emscripten_bind_ImDrawList_PushTextureID_1(self, tex_ref);
};

ImDrawList.prototype['PopTextureID'] = ImDrawList.prototype.PopTextureID = function() {
  var self = this.ptr;
  _emscripten_bind_ImDrawList_PopTextureID_0(self);
};

ImDrawList.prototype['GetClipRectMin'] = ImDrawList.prototype.GetClipRectMin = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawList_GetClipRectMin_0(self), ImVec2);
};

ImDrawList.prototype['GetClipRectMax'] = ImDrawList.prototype.GetClipRectMax = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawList_GetClipRectMax_0(self), ImVec2);
};

ImDrawList.prototype['AddLine'] = ImDrawList.prototype.AddLine = function(p1, p2, col, thickness) {
  var self = this.ptr;
  if (p1 && typeof p1 === 'object') p1 = p1.ptr;
  if (p2 && typeof p2 === 'object') p2 = p2.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (thickness && typeof thickness === 'object') thickness = thickness.ptr;
  if (thickness === undefined) { _emscripten_bind_ImDrawList_AddLine_3(self, p1, p2, col); return }
  _emscripten_bind_ImDrawList_AddLine_4(self, p1, p2, col, thickness);
};

ImDrawList.prototype['AddRect'] = ImDrawList.prototype.AddRect = function(p_min, p_max, col, rounding, flags, thickness) {
  var self = this.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (rounding && typeof rounding === 'object') rounding = rounding.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (thickness && typeof thickness === 'object') thickness = thickness.ptr;
  if (rounding === undefined) { _emscripten_bind_ImDrawList_AddRect_3(self, p_min, p_max, col); return }
  if (flags === undefined) { _emscripten_bind_ImDrawList_AddRect_4(self, p_min, p_max, col, rounding); return }
  if (thickness === undefined) { _emscripten_bind_ImDrawList_AddRect_5(self, p_min, p_max, col, rounding, flags); return }
  _emscripten_bind_ImDrawList_AddRect_6(self, p_min, p_max, col, rounding, flags, thickness);
};

ImDrawList.prototype['AddRectFilled'] = ImDrawList.prototype.AddRectFilled = function(p_min, p_max, col, rounding, flags) {
  var self = this.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (rounding && typeof rounding === 'object') rounding = rounding.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (rounding === undefined) { _emscripten_bind_ImDrawList_AddRectFilled_3(self, p_min, p_max, col); return }
  if (flags === undefined) { _emscripten_bind_ImDrawList_AddRectFilled_4(self, p_min, p_max, col, rounding); return }
  _emscripten_bind_ImDrawList_AddRectFilled_5(self, p_min, p_max, col, rounding, flags);
};

ImDrawList.prototype['AddRectFilledMultiColor'] = ImDrawList.prototype.AddRectFilledMultiColor = function(p_min, p_max, col_upr_left, col_upr_right, col_bot_right, col_bot_left) {
  var self = this.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (col_upr_left && typeof col_upr_left === 'object') col_upr_left = col_upr_left.ptr;
  if (col_upr_right && typeof col_upr_right === 'object') col_upr_right = col_upr_right.ptr;
  if (col_bot_right && typeof col_bot_right === 'object') col_bot_right = col_bot_right.ptr;
  if (col_bot_left && typeof col_bot_left === 'object') col_bot_left = col_bot_left.ptr;
  _emscripten_bind_ImDrawList_AddRectFilledMultiColor_6(self, p_min, p_max, col_upr_left, col_upr_right, col_bot_right, col_bot_left);
};

ImDrawList.prototype['AddQuad'] = ImDrawList.prototype.AddQuad = function(p1, p2, p3, p4, col, thickness) {
  var self = this.ptr;
  if (p1 && typeof p1 === 'object') p1 = p1.ptr;
  if (p2 && typeof p2 === 'object') p2 = p2.ptr;
  if (p3 && typeof p3 === 'object') p3 = p3.ptr;
  if (p4 && typeof p4 === 'object') p4 = p4.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (thickness && typeof thickness === 'object') thickness = thickness.ptr;
  if (thickness === undefined) { _emscripten_bind_ImDrawList_AddQuad_5(self, p1, p2, p3, p4, col); return }
  _emscripten_bind_ImDrawList_AddQuad_6(self, p1, p2, p3, p4, col, thickness);
};

ImDrawList.prototype['AddQuadFilled'] = ImDrawList.prototype.AddQuadFilled = function(p1, p2, p3, p4, col) {
  var self = this.ptr;
  if (p1 && typeof p1 === 'object') p1 = p1.ptr;
  if (p2 && typeof p2 === 'object') p2 = p2.ptr;
  if (p3 && typeof p3 === 'object') p3 = p3.ptr;
  if (p4 && typeof p4 === 'object') p4 = p4.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  _emscripten_bind_ImDrawList_AddQuadFilled_5(self, p1, p2, p3, p4, col);
};

ImDrawList.prototype['AddTriangle'] = ImDrawList.prototype.AddTriangle = function(p1, p2, p3, col, thickness) {
  var self = this.ptr;
  if (p1 && typeof p1 === 'object') p1 = p1.ptr;
  if (p2 && typeof p2 === 'object') p2 = p2.ptr;
  if (p3 && typeof p3 === 'object') p3 = p3.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (thickness && typeof thickness === 'object') thickness = thickness.ptr;
  if (thickness === undefined) { _emscripten_bind_ImDrawList_AddTriangle_4(self, p1, p2, p3, col); return }
  _emscripten_bind_ImDrawList_AddTriangle_5(self, p1, p2, p3, col, thickness);
};

ImDrawList.prototype['AddTriangleFilled'] = ImDrawList.prototype.AddTriangleFilled = function(p1, p2, p3, col) {
  var self = this.ptr;
  if (p1 && typeof p1 === 'object') p1 = p1.ptr;
  if (p2 && typeof p2 === 'object') p2 = p2.ptr;
  if (p3 && typeof p3 === 'object') p3 = p3.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  _emscripten_bind_ImDrawList_AddTriangleFilled_4(self, p1, p2, p3, col);
};

ImDrawList.prototype['AddCircle'] = ImDrawList.prototype.AddCircle = function(center, radius, col, num_segments, thickness) {
  var self = this.ptr;
  if (center && typeof center === 'object') center = center.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (num_segments && typeof num_segments === 'object') num_segments = num_segments.ptr;
  if (thickness && typeof thickness === 'object') thickness = thickness.ptr;
  if (num_segments === undefined) { _emscripten_bind_ImDrawList_AddCircle_3(self, center, radius, col); return }
  if (thickness === undefined) { _emscripten_bind_ImDrawList_AddCircle_4(self, center, radius, col, num_segments); return }
  _emscripten_bind_ImDrawList_AddCircle_5(self, center, radius, col, num_segments, thickness);
};

ImDrawList.prototype['AddCircleFilled'] = ImDrawList.prototype.AddCircleFilled = function(center, radius, col, num_segments) {
  var self = this.ptr;
  if (center && typeof center === 'object') center = center.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (num_segments && typeof num_segments === 'object') num_segments = num_segments.ptr;
  if (num_segments === undefined) { _emscripten_bind_ImDrawList_AddCircleFilled_3(self, center, radius, col); return }
  _emscripten_bind_ImDrawList_AddCircleFilled_4(self, center, radius, col, num_segments);
};

ImDrawList.prototype['AddNgon'] = ImDrawList.prototype.AddNgon = function(center, radius, col, num_segments, thickness) {
  var self = this.ptr;
  if (center && typeof center === 'object') center = center.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (num_segments && typeof num_segments === 'object') num_segments = num_segments.ptr;
  if (thickness && typeof thickness === 'object') thickness = thickness.ptr;
  if (thickness === undefined) { _emscripten_bind_ImDrawList_AddNgon_4(self, center, radius, col, num_segments); return }
  _emscripten_bind_ImDrawList_AddNgon_5(self, center, radius, col, num_segments, thickness);
};

ImDrawList.prototype['AddNgonFilled'] = ImDrawList.prototype.AddNgonFilled = function(center, radius, col, num_segments) {
  var self = this.ptr;
  if (center && typeof center === 'object') center = center.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (num_segments && typeof num_segments === 'object') num_segments = num_segments.ptr;
  _emscripten_bind_ImDrawList_AddNgonFilled_4(self, center, radius, col, num_segments);
};

ImDrawList.prototype['AddEllipse'] = ImDrawList.prototype.AddEllipse = function(center, radius, col, rot, num_segments, thickness) {
  var self = this.ptr;
  if (center && typeof center === 'object') center = center.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (rot && typeof rot === 'object') rot = rot.ptr;
  if (num_segments && typeof num_segments === 'object') num_segments = num_segments.ptr;
  if (thickness && typeof thickness === 'object') thickness = thickness.ptr;
  if (rot === undefined) { _emscripten_bind_ImDrawList_AddEllipse_3(self, center, radius, col); return }
  if (num_segments === undefined) { _emscripten_bind_ImDrawList_AddEllipse_4(self, center, radius, col, rot); return }
  if (thickness === undefined) { _emscripten_bind_ImDrawList_AddEllipse_5(self, center, radius, col, rot, num_segments); return }
  _emscripten_bind_ImDrawList_AddEllipse_6(self, center, radius, col, rot, num_segments, thickness);
};

ImDrawList.prototype['AddEllipseFilled'] = ImDrawList.prototype.AddEllipseFilled = function(center, radius, col, rot, num_segments) {
  var self = this.ptr;
  if (center && typeof center === 'object') center = center.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (rot && typeof rot === 'object') rot = rot.ptr;
  if (num_segments && typeof num_segments === 'object') num_segments = num_segments.ptr;
  if (rot === undefined) { _emscripten_bind_ImDrawList_AddEllipseFilled_3(self, center, radius, col); return }
  if (num_segments === undefined) { _emscripten_bind_ImDrawList_AddEllipseFilled_4(self, center, radius, col, rot); return }
  _emscripten_bind_ImDrawList_AddEllipseFilled_5(self, center, radius, col, rot, num_segments);
};

ImDrawList.prototype['AddText'] = ImDrawList.prototype.AddText = function(pos, col, text_begin, text_end) {
  var self = this.ptr;
  ensureCache.prepare();
  if (pos && typeof pos === 'object') pos = pos.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (text_begin && typeof text_begin === 'object') text_begin = text_begin.ptr;
  else text_begin = ensureString(text_begin);
  if (text_end && typeof text_end === 'object') text_end = text_end.ptr;
  else text_end = ensureString(text_end);
  if (text_end === undefined) { _emscripten_bind_ImDrawList_AddText_3(self, pos, col, text_begin); return }
  _emscripten_bind_ImDrawList_AddText_4(self, pos, col, text_begin, text_end);
};

ImDrawList.prototype['AddBezierCubic'] = ImDrawList.prototype.AddBezierCubic = function(p1, p2, p3, p4, col, thickness, num_segments) {
  var self = this.ptr;
  if (p1 && typeof p1 === 'object') p1 = p1.ptr;
  if (p2 && typeof p2 === 'object') p2 = p2.ptr;
  if (p3 && typeof p3 === 'object') p3 = p3.ptr;
  if (p4 && typeof p4 === 'object') p4 = p4.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (thickness && typeof thickness === 'object') thickness = thickness.ptr;
  if (num_segments && typeof num_segments === 'object') num_segments = num_segments.ptr;
  if (num_segments === undefined) { _emscripten_bind_ImDrawList_AddBezierCubic_6(self, p1, p2, p3, p4, col, thickness); return }
  _emscripten_bind_ImDrawList_AddBezierCubic_7(self, p1, p2, p3, p4, col, thickness, num_segments);
};

ImDrawList.prototype['AddBezierQuadratic'] = ImDrawList.prototype.AddBezierQuadratic = function(p1, p2, p3, col, thickness, num_segments) {
  var self = this.ptr;
  if (p1 && typeof p1 === 'object') p1 = p1.ptr;
  if (p2 && typeof p2 === 'object') p2 = p2.ptr;
  if (p3 && typeof p3 === 'object') p3 = p3.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (thickness && typeof thickness === 'object') thickness = thickness.ptr;
  if (num_segments && typeof num_segments === 'object') num_segments = num_segments.ptr;
  if (num_segments === undefined) { _emscripten_bind_ImDrawList_AddBezierQuadratic_5(self, p1, p2, p3, col, thickness); return }
  _emscripten_bind_ImDrawList_AddBezierQuadratic_6(self, p1, p2, p3, col, thickness, num_segments);
};

ImDrawList.prototype['AddImage'] = ImDrawList.prototype.AddImage = function(tex_ref, p_min, p_max, uv_min, uv_max, col) {
  var self = this.ptr;
  if (tex_ref && typeof tex_ref === 'object') tex_ref = tex_ref.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (uv_min && typeof uv_min === 'object') uv_min = uv_min.ptr;
  if (uv_max && typeof uv_max === 'object') uv_max = uv_max.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (uv_min === undefined) { _emscripten_bind_ImDrawList_AddImage_3(self, tex_ref, p_min, p_max); return }
  if (uv_max === undefined) { _emscripten_bind_ImDrawList_AddImage_4(self, tex_ref, p_min, p_max, uv_min); return }
  if (col === undefined) { _emscripten_bind_ImDrawList_AddImage_5(self, tex_ref, p_min, p_max, uv_min, uv_max); return }
  _emscripten_bind_ImDrawList_AddImage_6(self, tex_ref, p_min, p_max, uv_min, uv_max, col);
};

ImDrawList.prototype['AddImageQuad'] = ImDrawList.prototype.AddImageQuad = function(tex_ref, p1, p2, p3, p4, uv1, uv2, uv3, uv4, col) {
  var self = this.ptr;
  if (tex_ref && typeof tex_ref === 'object') tex_ref = tex_ref.ptr;
  if (p1 && typeof p1 === 'object') p1 = p1.ptr;
  if (p2 && typeof p2 === 'object') p2 = p2.ptr;
  if (p3 && typeof p3 === 'object') p3 = p3.ptr;
  if (p4 && typeof p4 === 'object') p4 = p4.ptr;
  if (uv1 && typeof uv1 === 'object') uv1 = uv1.ptr;
  if (uv2 && typeof uv2 === 'object') uv2 = uv2.ptr;
  if (uv3 && typeof uv3 === 'object') uv3 = uv3.ptr;
  if (uv4 && typeof uv4 === 'object') uv4 = uv4.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (uv1 === undefined) { _emscripten_bind_ImDrawList_AddImageQuad_5(self, tex_ref, p1, p2, p3, p4); return }
  if (uv2 === undefined) { _emscripten_bind_ImDrawList_AddImageQuad_6(self, tex_ref, p1, p2, p3, p4, uv1); return }
  if (uv3 === undefined) { _emscripten_bind_ImDrawList_AddImageQuad_7(self, tex_ref, p1, p2, p3, p4, uv1, uv2); return }
  if (uv4 === undefined) { _emscripten_bind_ImDrawList_AddImageQuad_8(self, tex_ref, p1, p2, p3, p4, uv1, uv2, uv3); return }
  if (col === undefined) { _emscripten_bind_ImDrawList_AddImageQuad_9(self, tex_ref, p1, p2, p3, p4, uv1, uv2, uv3, uv4); return }
  _emscripten_bind_ImDrawList_AddImageQuad_10(self, tex_ref, p1, p2, p3, p4, uv1, uv2, uv3, uv4, col);
};

ImDrawList.prototype['AddImageRounded'] = ImDrawList.prototype.AddImageRounded = function(tex_ref, p_min, p_max, uv_min, uv_max, col, rounding, flags) {
  var self = this.ptr;
  if (tex_ref && typeof tex_ref === 'object') tex_ref = tex_ref.ptr;
  if (p_min && typeof p_min === 'object') p_min = p_min.ptr;
  if (p_max && typeof p_max === 'object') p_max = p_max.ptr;
  if (uv_min && typeof uv_min === 'object') uv_min = uv_min.ptr;
  if (uv_max && typeof uv_max === 'object') uv_max = uv_max.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (rounding && typeof rounding === 'object') rounding = rounding.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (flags === undefined) { _emscripten_bind_ImDrawList_AddImageRounded_7(self, tex_ref, p_min, p_max, uv_min, uv_max, col, rounding); return }
  _emscripten_bind_ImDrawList_AddImageRounded_8(self, tex_ref, p_min, p_max, uv_min, uv_max, col, rounding, flags);
};

ImDrawList.prototype['PathClear'] = ImDrawList.prototype.PathClear = function() {
  var self = this.ptr;
  _emscripten_bind_ImDrawList_PathClear_0(self);
};

ImDrawList.prototype['PathLineTo'] = ImDrawList.prototype.PathLineTo = function(pos) {
  var self = this.ptr;
  if (pos && typeof pos === 'object') pos = pos.ptr;
  _emscripten_bind_ImDrawList_PathLineTo_1(self, pos);
};

ImDrawList.prototype['PathLineToMergeDuplicate'] = ImDrawList.prototype.PathLineToMergeDuplicate = function(pos) {
  var self = this.ptr;
  if (pos && typeof pos === 'object') pos = pos.ptr;
  _emscripten_bind_ImDrawList_PathLineToMergeDuplicate_1(self, pos);
};

ImDrawList.prototype['PathFillConvex'] = ImDrawList.prototype.PathFillConvex = function(col) {
  var self = this.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  _emscripten_bind_ImDrawList_PathFillConvex_1(self, col);
};

ImDrawList.prototype['PathStroke'] = ImDrawList.prototype.PathStroke = function(col, flags, thickness) {
  var self = this.ptr;
  if (col && typeof col === 'object') col = col.ptr;
  if (flags && typeof flags === 'object') flags = flags.ptr;
  if (thickness && typeof thickness === 'object') thickness = thickness.ptr;
  if (flags === undefined) { _emscripten_bind_ImDrawList_PathStroke_1(self, col); return }
  if (thickness === undefined) { _emscripten_bind_ImDrawList_PathStroke_2(self, col, flags); return }
  _emscripten_bind_ImDrawList_PathStroke_3(self, col, flags, thickness);
};

ImDrawList.prototype['ChannelsSplit'] = ImDrawList.prototype.ChannelsSplit = function(count) {
  var self = this.ptr;
  if (count && typeof count === 'object') count = count.ptr;
  _emscripten_bind_ImDrawList_ChannelsSplit_1(self, count);
};

ImDrawList.prototype['ChannelsMerge'] = ImDrawList.prototype.ChannelsMerge = function() {
  var self = this.ptr;
  _emscripten_bind_ImDrawList_ChannelsMerge_0(self);
};

ImDrawList.prototype['ChannelsSetCurrent'] = ImDrawList.prototype.ChannelsSetCurrent = function(n) {
  var self = this.ptr;
  if (n && typeof n === 'object') n = n.ptr;
  _emscripten_bind_ImDrawList_ChannelsSetCurrent_1(self, n);
};

ImDrawList.prototype['get_CmdBuffer'] = ImDrawList.prototype.get_CmdBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawList_get_CmdBuffer_0(self), ImVectorImDrawCmd);
};

ImDrawList.prototype['set_CmdBuffer'] = ImDrawList.prototype.set_CmdBuffer = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImDrawList_set_CmdBuffer_1(self, arg0);
};

Object.defineProperty(ImDrawList.prototype, 'CmdBuffer', { get: ImDrawList.prototype.get_CmdBuffer, set: ImDrawList.prototype.set_CmdBuffer });

ImDrawList.prototype['get_IdxBuffer'] = ImDrawList.prototype.get_IdxBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawList_get_IdxBuffer_0(self), ImVectorImDrawIdx);
};

ImDrawList.prototype['set_IdxBuffer'] = ImDrawList.prototype.set_IdxBuffer = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImDrawList_set_IdxBuffer_1(self, arg0);
};

Object.defineProperty(ImDrawList.prototype, 'IdxBuffer', { get: ImDrawList.prototype.get_IdxBuffer, set: ImDrawList.prototype.set_IdxBuffer });

ImDrawList.prototype['get_VtxBuffer'] = ImDrawList.prototype.get_VtxBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImDrawList_get_VtxBuffer_0(self), ImVectorImDrawVert);
};

ImDrawList.prototype['set_VtxBuffer'] = ImDrawList.prototype.set_VtxBuffer = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImDrawList_set_VtxBuffer_1(self, arg0);
};

Object.defineProperty(ImDrawList.prototype, 'VtxBuffer', { get: ImDrawList.prototype.get_VtxBuffer, set: ImDrawList.prototype.set_VtxBuffer });

ImDrawList.prototype['__destroy__'] = ImDrawList.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImDrawList___destroy___0(self);
};

function ImTextureRect() { throw "cannot construct a ImTextureRect, no constructor in IDL" }
ImTextureRect.prototype = Object.create(window.idl.WrapperObject.prototype);
ImTextureRect.prototype.constructor = ImTextureRect;
ImTextureRect.prototype.__class__ = ImTextureRect;
ImTextureRect.__cache__ = {};
Module['ImTextureRect'] = ImTextureRect;

ImTextureRect.prototype['get_x'] = ImTextureRect.prototype.get_x = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureRect_get_x_0(self);
};

ImTextureRect.prototype['set_x'] = ImTextureRect.prototype.set_x = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureRect_set_x_1(self, arg0);
};

Object.defineProperty(ImTextureRect.prototype, 'x', { get: ImTextureRect.prototype.get_x, set: ImTextureRect.prototype.set_x });

ImTextureRect.prototype['get_y'] = ImTextureRect.prototype.get_y = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureRect_get_y_0(self);
};

ImTextureRect.prototype['set_y'] = ImTextureRect.prototype.set_y = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureRect_set_y_1(self, arg0);
};

Object.defineProperty(ImTextureRect.prototype, 'y', { get: ImTextureRect.prototype.get_y, set: ImTextureRect.prototype.set_y });

ImTextureRect.prototype['get_w'] = ImTextureRect.prototype.get_w = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureRect_get_w_0(self);
};

ImTextureRect.prototype['set_w'] = ImTextureRect.prototype.set_w = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureRect_set_w_1(self, arg0);
};

Object.defineProperty(ImTextureRect.prototype, 'w', { get: ImTextureRect.prototype.get_w, set: ImTextureRect.prototype.set_w });

ImTextureRect.prototype['get_h'] = ImTextureRect.prototype.get_h = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureRect_get_h_0(self);
};

ImTextureRect.prototype['set_h'] = ImTextureRect.prototype.set_h = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureRect_set_h_1(self, arg0);
};

Object.defineProperty(ImTextureRect.prototype, 'h', { get: ImTextureRect.prototype.get_h, set: ImTextureRect.prototype.set_h });

ImTextureRect.prototype['__destroy__'] = ImTextureRect.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImTextureRect___destroy___0(self);
};

function ImTextureData() { throw "cannot construct a ImTextureData, no constructor in IDL" }
ImTextureData.prototype = Object.create(window.idl.WrapperObject.prototype);
ImTextureData.prototype.constructor = ImTextureData;
ImTextureData.prototype.__class__ = ImTextureData;
ImTextureData.__cache__ = {};
Module['ImTextureData'] = ImTextureData;

ImTextureData.prototype['Create'] = ImTextureData.prototype.Create = function(format, w, h) {
  var self = this.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  _emscripten_bind_ImTextureData_Create_3(self, format, w, h);
};

ImTextureData.prototype['DestroyPixels'] = ImTextureData.prototype.DestroyPixels = function() {
  var self = this.ptr;
  _emscripten_bind_ImTextureData_DestroyPixels_0(self);
};

ImTextureData.prototype['GetPixels'] = ImTextureData.prototype.GetPixels = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_GetPixels_0(self);
};

ImTextureData.prototype['GetPixelsAt'] = ImTextureData.prototype.GetPixelsAt = function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return _emscripten_bind_ImTextureData_GetPixelsAt_2(self, x, y);
};

ImTextureData.prototype['GetSizeInBytes'] = ImTextureData.prototype.GetSizeInBytes = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_GetSizeInBytes_0(self);
};

ImTextureData.prototype['GetPitch'] = ImTextureData.prototype.GetPitch = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_GetPitch_0(self);
};

ImTextureData.prototype['GetTexRef'] = ImTextureData.prototype.GetTexRef = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImTextureData_GetTexRef_0(self), ImTextureRef);
};

ImTextureData.prototype['GetTexID'] = ImTextureData.prototype.GetTexID = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImTextureData_GetTexID_0(self), ImTextureIDRef);
};

ImTextureData.prototype['SetTexID'] = ImTextureData.prototype.SetTexID = function(tex_id) {
  var self = this.ptr;
  if (tex_id && typeof tex_id === 'object') tex_id = tex_id.ptr;
  _emscripten_bind_ImTextureData_SetTexID_1(self, tex_id);
};

ImTextureData.prototype['SetStatus'] = ImTextureData.prototype.SetStatus = function(status) {
  var self = this.ptr;
  if (status && typeof status === 'object') status = status.ptr;
  _emscripten_bind_ImTextureData_SetStatus_1(self, status);
};

ImTextureData.prototype['get_UniqueID'] = ImTextureData.prototype.get_UniqueID = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_get_UniqueID_0(self);
};

Object.defineProperty(ImTextureData.prototype, 'UniqueID', { get: ImTextureData.prototype.get_UniqueID });

ImTextureData.prototype['get_Status'] = ImTextureData.prototype.get_Status = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_get_Status_0(self);
};

Object.defineProperty(ImTextureData.prototype, 'Status', { get: ImTextureData.prototype.get_Status });

ImTextureData.prototype['get_BackendUserData'] = ImTextureData.prototype.get_BackendUserData = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_get_BackendUserData_0(self);
};

ImTextureData.prototype['set_BackendUserData'] = ImTextureData.prototype.set_BackendUserData = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_BackendUserData_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'BackendUserData', { get: ImTextureData.prototype.get_BackendUserData, set: ImTextureData.prototype.set_BackendUserData });

ImTextureData.prototype['get_Format'] = ImTextureData.prototype.get_Format = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_get_Format_0(self);
};

ImTextureData.prototype['set_Format'] = ImTextureData.prototype.set_Format = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_Format_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'Format', { get: ImTextureData.prototype.get_Format, set: ImTextureData.prototype.set_Format });

ImTextureData.prototype['get_Width'] = ImTextureData.prototype.get_Width = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_get_Width_0(self);
};

ImTextureData.prototype['set_Width'] = ImTextureData.prototype.set_Width = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_Width_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'Width', { get: ImTextureData.prototype.get_Width, set: ImTextureData.prototype.set_Width });

ImTextureData.prototype['get_Height'] = ImTextureData.prototype.get_Height = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_get_Height_0(self);
};

ImTextureData.prototype['set_Height'] = ImTextureData.prototype.set_Height = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_Height_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'Height', { get: ImTextureData.prototype.get_Height, set: ImTextureData.prototype.set_Height });

ImTextureData.prototype['get_BytesPerPixel'] = ImTextureData.prototype.get_BytesPerPixel = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_get_BytesPerPixel_0(self);
};

ImTextureData.prototype['set_BytesPerPixel'] = ImTextureData.prototype.set_BytesPerPixel = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_BytesPerPixel_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'BytesPerPixel', { get: ImTextureData.prototype.get_BytesPerPixel, set: ImTextureData.prototype.set_BytesPerPixel });

ImTextureData.prototype['get_UsedRect'] = ImTextureData.prototype.get_UsedRect = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImTextureData_get_UsedRect_0(self), ImTextureRect);
};

ImTextureData.prototype['set_UsedRect'] = ImTextureData.prototype.set_UsedRect = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_UsedRect_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'UsedRect', { get: ImTextureData.prototype.get_UsedRect, set: ImTextureData.prototype.set_UsedRect });

ImTextureData.prototype['get_UpdateRect'] = ImTextureData.prototype.get_UpdateRect = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImTextureData_get_UpdateRect_0(self), ImTextureRect);
};

ImTextureData.prototype['set_UpdateRect'] = ImTextureData.prototype.set_UpdateRect = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_UpdateRect_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'UpdateRect', { get: ImTextureData.prototype.get_UpdateRect, set: ImTextureData.prototype.set_UpdateRect });

ImTextureData.prototype['get_Updates'] = ImTextureData.prototype.get_Updates = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImTextureData_get_Updates_0(self), ImVectorImTextureRect);
};

ImTextureData.prototype['set_Updates'] = ImTextureData.prototype.set_Updates = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_Updates_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'Updates', { get: ImTextureData.prototype.get_Updates, set: ImTextureData.prototype.set_Updates });

ImTextureData.prototype['get_UnusedFrames'] = ImTextureData.prototype.get_UnusedFrames = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_get_UnusedFrames_0(self);
};

ImTextureData.prototype['set_UnusedFrames'] = ImTextureData.prototype.set_UnusedFrames = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_UnusedFrames_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'UnusedFrames', { get: ImTextureData.prototype.get_UnusedFrames, set: ImTextureData.prototype.set_UnusedFrames });

ImTextureData.prototype['get_RefCount'] = ImTextureData.prototype.get_RefCount = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureData_get_RefCount_0(self);
};

ImTextureData.prototype['set_RefCount'] = ImTextureData.prototype.set_RefCount = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_RefCount_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'RefCount', { get: ImTextureData.prototype.get_RefCount, set: ImTextureData.prototype.set_RefCount });

ImTextureData.prototype['get_UseColors'] = ImTextureData.prototype.get_UseColors = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImTextureData_get_UseColors_0(self));
};

ImTextureData.prototype['set_UseColors'] = ImTextureData.prototype.set_UseColors = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_UseColors_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'UseColors', { get: ImTextureData.prototype.get_UseColors, set: ImTextureData.prototype.set_UseColors });

ImTextureData.prototype['get_WantDestroyNextFrame'] = ImTextureData.prototype.get_WantDestroyNextFrame = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImTextureData_get_WantDestroyNextFrame_0(self));
};

ImTextureData.prototype['set_WantDestroyNextFrame'] = ImTextureData.prototype.set_WantDestroyNextFrame = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImTextureData_set_WantDestroyNextFrame_1(self, arg0);
};

Object.defineProperty(ImTextureData.prototype, 'WantDestroyNextFrame', { get: ImTextureData.prototype.get_WantDestroyNextFrame, set: ImTextureData.prototype.set_WantDestroyNextFrame });

ImTextureData.prototype['__destroy__'] = ImTextureData.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImTextureData___destroy___0(self);
};

function ImTextureRef(tex_id) {
  if (tex_id && typeof tex_id === 'object') tex_id = tex_id.ptr;
  if (tex_id === undefined) { this.ptr = _emscripten_bind_ImTextureRef_ImTextureRef_0(); window.idl.getCache(ImTextureRef)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_ImTextureRef_ImTextureRef_1(tex_id);
  window.idl.getCache(ImTextureRef)[this.ptr] = this;
};

ImTextureRef.prototype = Object.create(window.idl.WrapperObject.prototype);
ImTextureRef.prototype.constructor = ImTextureRef;
ImTextureRef.prototype.__class__ = ImTextureRef;
ImTextureRef.__cache__ = {};
Module['ImTextureRef'] = ImTextureRef;

ImTextureRef.prototype['GetTexID'] = ImTextureRef.prototype.GetTexID = function() {
  var self = this.ptr;
  return _emscripten_bind_ImTextureRef_GetTexID_0(self);
};

ImTextureRef.prototype['__destroy__'] = ImTextureRef.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImTextureRef___destroy___0(self);
};

function ImFontBaked() { throw "cannot construct a ImFontBaked, no constructor in IDL" }
ImFontBaked.prototype = Object.create(window.idl.WrapperObject.prototype);
ImFontBaked.prototype.constructor = ImFontBaked;
ImFontBaked.prototype.__class__ = ImFontBaked;
ImFontBaked.__cache__ = {};
Module['ImFontBaked'] = ImFontBaked;

ImFontBaked.prototype['__destroy__'] = ImFontBaked.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImFontBaked___destroy___0(self);
};

function ImGuiIO() { throw "cannot construct a ImGuiIO, no constructor in IDL" }
ImGuiIO.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiIO.prototype.constructor = ImGuiIO;
ImGuiIO.prototype.__class__ = ImGuiIO;
ImGuiIO.__cache__ = {};
Module['ImGuiIO'] = ImGuiIO;

ImGuiIO.prototype['AddKeyEvent'] = ImGuiIO.prototype.AddKeyEvent = function(key, down) {
  var self = this.ptr;
  if (key && typeof key === 'object') key = key.ptr;
  if (down && typeof down === 'object') down = down.ptr;
  _emscripten_bind_ImGuiIO_AddKeyEvent_2(self, key, down);
};

ImGuiIO.prototype['AddKeyAnalogEvent'] = ImGuiIO.prototype.AddKeyAnalogEvent = function(key, down, v) {
  var self = this.ptr;
  if (key && typeof key === 'object') key = key.ptr;
  if (down && typeof down === 'object') down = down.ptr;
  if (v && typeof v === 'object') v = v.ptr;
  _emscripten_bind_ImGuiIO_AddKeyAnalogEvent_3(self, key, down, v);
};

ImGuiIO.prototype['AddMousePosEvent'] = ImGuiIO.prototype.AddMousePosEvent = function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  _emscripten_bind_ImGuiIO_AddMousePosEvent_2(self, x, y);
};

ImGuiIO.prototype['AddMouseButtonEvent'] = ImGuiIO.prototype.AddMouseButtonEvent = function(button, down) {
  var self = this.ptr;
  if (button && typeof button === 'object') button = button.ptr;
  if (down && typeof down === 'object') down = down.ptr;
  _emscripten_bind_ImGuiIO_AddMouseButtonEvent_2(self, button, down);
};

ImGuiIO.prototype['AddMouseWheelEvent'] = ImGuiIO.prototype.AddMouseWheelEvent = function(wheel_x, wheel_y) {
  var self = this.ptr;
  if (wheel_x && typeof wheel_x === 'object') wheel_x = wheel_x.ptr;
  if (wheel_y && typeof wheel_y === 'object') wheel_y = wheel_y.ptr;
  _emscripten_bind_ImGuiIO_AddMouseWheelEvent_2(self, wheel_x, wheel_y);
};

ImGuiIO.prototype['AddMouseSourceEvent'] = ImGuiIO.prototype.AddMouseSourceEvent = function(source) {
  var self = this.ptr;
  if (source && typeof source === 'object') source = source.ptr;
  _emscripten_bind_ImGuiIO_AddMouseSourceEvent_1(self, source);
};

ImGuiIO.prototype['AddMouseViewportEvent'] = ImGuiIO.prototype.AddMouseViewportEvent = function(id) {
  var self = this.ptr;
  if (id && typeof id === 'object') id = id.ptr;
  _emscripten_bind_ImGuiIO_AddMouseViewportEvent_1(self, id);
};

ImGuiIO.prototype['AddFocusEvent'] = ImGuiIO.prototype.AddFocusEvent = function(focused) {
  var self = this.ptr;
  if (focused && typeof focused === 'object') focused = focused.ptr;
  _emscripten_bind_ImGuiIO_AddFocusEvent_1(self, focused);
};

ImGuiIO.prototype['AddInputCharacter'] = ImGuiIO.prototype.AddInputCharacter = function(c) {
  var self = this.ptr;
  if (c && typeof c === 'object') c = c.ptr;
  _emscripten_bind_ImGuiIO_AddInputCharacter_1(self, c);
};

ImGuiIO.prototype['AddInputCharacterUTF16'] = ImGuiIO.prototype.AddInputCharacterUTF16 = function(c) {
  var self = this.ptr;
  if (c && typeof c === 'object') c = c.ptr;
  _emscripten_bind_ImGuiIO_AddInputCharacterUTF16_1(self, c);
};

ImGuiIO.prototype['AddInputCharactersUTF8'] = ImGuiIO.prototype.AddInputCharactersUTF8 = function(str) {
  var self = this.ptr;
  ensureCache.prepare();
  if (str && typeof str === 'object') str = str.ptr;
  else str = ensureString(str);
  _emscripten_bind_ImGuiIO_AddInputCharactersUTF8_1(self, str);
};

ImGuiIO.prototype['SetKeyEventNativeData'] = ImGuiIO.prototype.SetKeyEventNativeData = function(key, native_keycode, native_scancode, native_legacy_index) {
  var self = this.ptr;
  if (key && typeof key === 'object') key = key.ptr;
  if (native_keycode && typeof native_keycode === 'object') native_keycode = native_keycode.ptr;
  if (native_scancode && typeof native_scancode === 'object') native_scancode = native_scancode.ptr;
  if (native_legacy_index && typeof native_legacy_index === 'object') native_legacy_index = native_legacy_index.ptr;
  if (native_legacy_index === undefined) { _emscripten_bind_ImGuiIO_SetKeyEventNativeData_3(self, key, native_keycode, native_scancode); return }
  _emscripten_bind_ImGuiIO_SetKeyEventNativeData_4(self, key, native_keycode, native_scancode, native_legacy_index);
};

ImGuiIO.prototype['SetAppAcceptingEvents'] = ImGuiIO.prototype.SetAppAcceptingEvents = function(accepting_events) {
  var self = this.ptr;
  if (accepting_events && typeof accepting_events === 'object') accepting_events = accepting_events.ptr;
  _emscripten_bind_ImGuiIO_SetAppAcceptingEvents_1(self, accepting_events);
};

ImGuiIO.prototype['ClearEventsQueue'] = ImGuiIO.prototype.ClearEventsQueue = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiIO_ClearEventsQueue_0(self);
};

ImGuiIO.prototype['ClearInputKeys'] = ImGuiIO.prototype.ClearInputKeys = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiIO_ClearInputKeys_0(self);
};

ImGuiIO.prototype['ClearInputMouse'] = ImGuiIO.prototype.ClearInputMouse = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiIO_ClearInputMouse_0(self);
};

ImGuiIO.prototype['get_ConfigFlags'] = ImGuiIO.prototype.get_ConfigFlags = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_ConfigFlags_0(self);
};

ImGuiIO.prototype['set_ConfigFlags'] = ImGuiIO.prototype.set_ConfigFlags = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigFlags_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigFlags', { get: ImGuiIO.prototype.get_ConfigFlags, set: ImGuiIO.prototype.set_ConfigFlags });

ImGuiIO.prototype['get_BackendFlags'] = ImGuiIO.prototype.get_BackendFlags = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_BackendFlags_0(self);
};

ImGuiIO.prototype['set_BackendFlags'] = ImGuiIO.prototype.set_BackendFlags = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_BackendFlags_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'BackendFlags', { get: ImGuiIO.prototype.get_BackendFlags, set: ImGuiIO.prototype.set_BackendFlags });

ImGuiIO.prototype['get_DisplaySize'] = ImGuiIO.prototype.get_DisplaySize = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiIO_get_DisplaySize_0(self), ImVec2);
};

ImGuiIO.prototype['set_DisplaySize'] = ImGuiIO.prototype.set_DisplaySize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_DisplaySize_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'DisplaySize', { get: ImGuiIO.prototype.get_DisplaySize, set: ImGuiIO.prototype.set_DisplaySize });

ImGuiIO.prototype['get_DisplayFramebufferScale'] = ImGuiIO.prototype.get_DisplayFramebufferScale = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiIO_get_DisplayFramebufferScale_0(self), ImVec2);
};

ImGuiIO.prototype['set_DisplayFramebufferScale'] = ImGuiIO.prototype.set_DisplayFramebufferScale = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_DisplayFramebufferScale_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'DisplayFramebufferScale', { get: ImGuiIO.prototype.get_DisplayFramebufferScale, set: ImGuiIO.prototype.set_DisplayFramebufferScale });

ImGuiIO.prototype['get_DeltaTime'] = ImGuiIO.prototype.get_DeltaTime = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_DeltaTime_0(self);
};

ImGuiIO.prototype['set_DeltaTime'] = ImGuiIO.prototype.set_DeltaTime = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_DeltaTime_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'DeltaTime', { get: ImGuiIO.prototype.get_DeltaTime, set: ImGuiIO.prototype.set_DeltaTime });

ImGuiIO.prototype['get_IniSavingRate'] = ImGuiIO.prototype.get_IniSavingRate = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_IniSavingRate_0(self);
};

ImGuiIO.prototype['set_IniSavingRate'] = ImGuiIO.prototype.set_IniSavingRate = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_IniSavingRate_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'IniSavingRate', { get: ImGuiIO.prototype.get_IniSavingRate, set: ImGuiIO.prototype.set_IniSavingRate });

ImGuiIO.prototype['get_UserData'] = ImGuiIO.prototype.get_UserData = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_UserData_0(self);
};

ImGuiIO.prototype['set_UserData'] = ImGuiIO.prototype.set_UserData = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_UserData_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'UserData', { get: ImGuiIO.prototype.get_UserData, set: ImGuiIO.prototype.set_UserData });

ImGuiIO.prototype['get_Fonts'] = ImGuiIO.prototype.get_Fonts = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiIO_get_Fonts_0(self), ImFontAtlas);
};

ImGuiIO.prototype['set_Fonts'] = ImGuiIO.prototype.set_Fonts = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_Fonts_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'Fonts', { get: ImGuiIO.prototype.get_Fonts, set: ImGuiIO.prototype.set_Fonts });

ImGuiIO.prototype['get_FontDefault'] = ImGuiIO.prototype.get_FontDefault = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiIO_get_FontDefault_0(self), ImFont);
};

ImGuiIO.prototype['set_FontDefault'] = ImGuiIO.prototype.set_FontDefault = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_FontDefault_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'FontDefault', { get: ImGuiIO.prototype.get_FontDefault, set: ImGuiIO.prototype.set_FontDefault });

ImGuiIO.prototype['get_FontAllowUserScaling'] = ImGuiIO.prototype.get_FontAllowUserScaling = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_FontAllowUserScaling_0(self));
};

ImGuiIO.prototype['set_FontAllowUserScaling'] = ImGuiIO.prototype.set_FontAllowUserScaling = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_FontAllowUserScaling_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'FontAllowUserScaling', { get: ImGuiIO.prototype.get_FontAllowUserScaling, set: ImGuiIO.prototype.set_FontAllowUserScaling });

ImGuiIO.prototype['get_ConfigNavSwapGamepadButtons'] = ImGuiIO.prototype.get_ConfigNavSwapGamepadButtons = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigNavSwapGamepadButtons_0(self));
};

ImGuiIO.prototype['set_ConfigNavSwapGamepadButtons'] = ImGuiIO.prototype.set_ConfigNavSwapGamepadButtons = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigNavSwapGamepadButtons_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigNavSwapGamepadButtons', { get: ImGuiIO.prototype.get_ConfigNavSwapGamepadButtons, set: ImGuiIO.prototype.set_ConfigNavSwapGamepadButtons });

ImGuiIO.prototype['get_ConfigNavMoveSetMousePos'] = ImGuiIO.prototype.get_ConfigNavMoveSetMousePos = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigNavMoveSetMousePos_0(self));
};

ImGuiIO.prototype['set_ConfigNavMoveSetMousePos'] = ImGuiIO.prototype.set_ConfigNavMoveSetMousePos = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigNavMoveSetMousePos_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigNavMoveSetMousePos', { get: ImGuiIO.prototype.get_ConfigNavMoveSetMousePos, set: ImGuiIO.prototype.set_ConfigNavMoveSetMousePos });

ImGuiIO.prototype['get_ConfigNavCaptureKeyboard'] = ImGuiIO.prototype.get_ConfigNavCaptureKeyboard = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigNavCaptureKeyboard_0(self));
};

ImGuiIO.prototype['set_ConfigNavCaptureKeyboard'] = ImGuiIO.prototype.set_ConfigNavCaptureKeyboard = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigNavCaptureKeyboard_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigNavCaptureKeyboard', { get: ImGuiIO.prototype.get_ConfigNavCaptureKeyboard, set: ImGuiIO.prototype.set_ConfigNavCaptureKeyboard });

ImGuiIO.prototype['get_ConfigNavEscapeClearFocusItem'] = ImGuiIO.prototype.get_ConfigNavEscapeClearFocusItem = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigNavEscapeClearFocusItem_0(self));
};

ImGuiIO.prototype['set_ConfigNavEscapeClearFocusItem'] = ImGuiIO.prototype.set_ConfigNavEscapeClearFocusItem = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigNavEscapeClearFocusItem_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigNavEscapeClearFocusItem', { get: ImGuiIO.prototype.get_ConfigNavEscapeClearFocusItem, set: ImGuiIO.prototype.set_ConfigNavEscapeClearFocusItem });

ImGuiIO.prototype['get_ConfigNavEscapeClearFocusWindow'] = ImGuiIO.prototype.get_ConfigNavEscapeClearFocusWindow = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigNavEscapeClearFocusWindow_0(self));
};

ImGuiIO.prototype['set_ConfigNavEscapeClearFocusWindow'] = ImGuiIO.prototype.set_ConfigNavEscapeClearFocusWindow = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigNavEscapeClearFocusWindow_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigNavEscapeClearFocusWindow', { get: ImGuiIO.prototype.get_ConfigNavEscapeClearFocusWindow, set: ImGuiIO.prototype.set_ConfigNavEscapeClearFocusWindow });

ImGuiIO.prototype['get_ConfigNavCursorVisibleAuto'] = ImGuiIO.prototype.get_ConfigNavCursorVisibleAuto = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigNavCursorVisibleAuto_0(self));
};

ImGuiIO.prototype['set_ConfigNavCursorVisibleAuto'] = ImGuiIO.prototype.set_ConfigNavCursorVisibleAuto = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigNavCursorVisibleAuto_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigNavCursorVisibleAuto', { get: ImGuiIO.prototype.get_ConfigNavCursorVisibleAuto, set: ImGuiIO.prototype.set_ConfigNavCursorVisibleAuto });

ImGuiIO.prototype['get_ConfigNavCursorVisibleAlways'] = ImGuiIO.prototype.get_ConfigNavCursorVisibleAlways = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigNavCursorVisibleAlways_0(self));
};

ImGuiIO.prototype['set_ConfigNavCursorVisibleAlways'] = ImGuiIO.prototype.set_ConfigNavCursorVisibleAlways = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigNavCursorVisibleAlways_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigNavCursorVisibleAlways', { get: ImGuiIO.prototype.get_ConfigNavCursorVisibleAlways, set: ImGuiIO.prototype.set_ConfigNavCursorVisibleAlways });

ImGuiIO.prototype['get_ConfigDockingNoSplit'] = ImGuiIO.prototype.get_ConfigDockingNoSplit = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigDockingNoSplit_0(self));
};

ImGuiIO.prototype['set_ConfigDockingNoSplit'] = ImGuiIO.prototype.set_ConfigDockingNoSplit = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigDockingNoSplit_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigDockingNoSplit', { get: ImGuiIO.prototype.get_ConfigDockingNoSplit, set: ImGuiIO.prototype.set_ConfigDockingNoSplit });

ImGuiIO.prototype['get_ConfigDockingWithShift'] = ImGuiIO.prototype.get_ConfigDockingWithShift = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigDockingWithShift_0(self));
};

ImGuiIO.prototype['set_ConfigDockingWithShift'] = ImGuiIO.prototype.set_ConfigDockingWithShift = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigDockingWithShift_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigDockingWithShift', { get: ImGuiIO.prototype.get_ConfigDockingWithShift, set: ImGuiIO.prototype.set_ConfigDockingWithShift });

ImGuiIO.prototype['get_ConfigDockingAlwaysTabBar'] = ImGuiIO.prototype.get_ConfigDockingAlwaysTabBar = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigDockingAlwaysTabBar_0(self));
};

ImGuiIO.prototype['set_ConfigDockingAlwaysTabBar'] = ImGuiIO.prototype.set_ConfigDockingAlwaysTabBar = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigDockingAlwaysTabBar_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigDockingAlwaysTabBar', { get: ImGuiIO.prototype.get_ConfigDockingAlwaysTabBar, set: ImGuiIO.prototype.set_ConfigDockingAlwaysTabBar });

ImGuiIO.prototype['get_ConfigDockingTransparentPayload'] = ImGuiIO.prototype.get_ConfigDockingTransparentPayload = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigDockingTransparentPayload_0(self));
};

ImGuiIO.prototype['set_ConfigDockingTransparentPayload'] = ImGuiIO.prototype.set_ConfigDockingTransparentPayload = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigDockingTransparentPayload_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigDockingTransparentPayload', { get: ImGuiIO.prototype.get_ConfigDockingTransparentPayload, set: ImGuiIO.prototype.set_ConfigDockingTransparentPayload });

ImGuiIO.prototype['get_ConfigViewportsNoAutoMerge'] = ImGuiIO.prototype.get_ConfigViewportsNoAutoMerge = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigViewportsNoAutoMerge_0(self));
};

ImGuiIO.prototype['set_ConfigViewportsNoAutoMerge'] = ImGuiIO.prototype.set_ConfigViewportsNoAutoMerge = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigViewportsNoAutoMerge_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigViewportsNoAutoMerge', { get: ImGuiIO.prototype.get_ConfigViewportsNoAutoMerge, set: ImGuiIO.prototype.set_ConfigViewportsNoAutoMerge });

ImGuiIO.prototype['get_ConfigViewportsNoTaskBarIcon'] = ImGuiIO.prototype.get_ConfigViewportsNoTaskBarIcon = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigViewportsNoTaskBarIcon_0(self));
};

ImGuiIO.prototype['set_ConfigViewportsNoTaskBarIcon'] = ImGuiIO.prototype.set_ConfigViewportsNoTaskBarIcon = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigViewportsNoTaskBarIcon_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigViewportsNoTaskBarIcon', { get: ImGuiIO.prototype.get_ConfigViewportsNoTaskBarIcon, set: ImGuiIO.prototype.set_ConfigViewportsNoTaskBarIcon });

ImGuiIO.prototype['get_ConfigViewportsNoDecoration'] = ImGuiIO.prototype.get_ConfigViewportsNoDecoration = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigViewportsNoDecoration_0(self));
};

ImGuiIO.prototype['set_ConfigViewportsNoDecoration'] = ImGuiIO.prototype.set_ConfigViewportsNoDecoration = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigViewportsNoDecoration_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigViewportsNoDecoration', { get: ImGuiIO.prototype.get_ConfigViewportsNoDecoration, set: ImGuiIO.prototype.set_ConfigViewportsNoDecoration });

ImGuiIO.prototype['get_ConfigViewportsNoDefaultParent'] = ImGuiIO.prototype.get_ConfigViewportsNoDefaultParent = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigViewportsNoDefaultParent_0(self));
};

ImGuiIO.prototype['set_ConfigViewportsNoDefaultParent'] = ImGuiIO.prototype.set_ConfigViewportsNoDefaultParent = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigViewportsNoDefaultParent_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigViewportsNoDefaultParent', { get: ImGuiIO.prototype.get_ConfigViewportsNoDefaultParent, set: ImGuiIO.prototype.set_ConfigViewportsNoDefaultParent });

ImGuiIO.prototype['get_ConfigViewportsPlatformFocusSetsImGuiFocus'] = ImGuiIO.prototype.get_ConfigViewportsPlatformFocusSetsImGuiFocus = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigViewportsPlatformFocusSetsImGuiFocus_0(self));
};

ImGuiIO.prototype['set_ConfigViewportsPlatformFocusSetsImGuiFocus'] = ImGuiIO.prototype.set_ConfigViewportsPlatformFocusSetsImGuiFocus = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigViewportsPlatformFocusSetsImGuiFocus_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigViewportsPlatformFocusSetsImGuiFocus', { get: ImGuiIO.prototype.get_ConfigViewportsPlatformFocusSetsImGuiFocus, set: ImGuiIO.prototype.set_ConfigViewportsPlatformFocusSetsImGuiFocus });

ImGuiIO.prototype['get_ConfigDpiScaleFonts'] = ImGuiIO.prototype.get_ConfigDpiScaleFonts = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigDpiScaleFonts_0(self));
};

ImGuiIO.prototype['set_ConfigDpiScaleFonts'] = ImGuiIO.prototype.set_ConfigDpiScaleFonts = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigDpiScaleFonts_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigDpiScaleFonts', { get: ImGuiIO.prototype.get_ConfigDpiScaleFonts, set: ImGuiIO.prototype.set_ConfigDpiScaleFonts });

ImGuiIO.prototype['get_ConfigDpiScaleViewports'] = ImGuiIO.prototype.get_ConfigDpiScaleViewports = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigDpiScaleViewports_0(self));
};

ImGuiIO.prototype['set_ConfigDpiScaleViewports'] = ImGuiIO.prototype.set_ConfigDpiScaleViewports = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigDpiScaleViewports_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigDpiScaleViewports', { get: ImGuiIO.prototype.get_ConfigDpiScaleViewports, set: ImGuiIO.prototype.set_ConfigDpiScaleViewports });

ImGuiIO.prototype['get_MouseDrawCursor'] = ImGuiIO.prototype.get_MouseDrawCursor = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_MouseDrawCursor_0(self));
};

ImGuiIO.prototype['set_MouseDrawCursor'] = ImGuiIO.prototype.set_MouseDrawCursor = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_MouseDrawCursor_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'MouseDrawCursor', { get: ImGuiIO.prototype.get_MouseDrawCursor, set: ImGuiIO.prototype.set_MouseDrawCursor });

ImGuiIO.prototype['get_ConfigMacOSXBehaviors'] = ImGuiIO.prototype.get_ConfigMacOSXBehaviors = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigMacOSXBehaviors_0(self));
};

ImGuiIO.prototype['set_ConfigMacOSXBehaviors'] = ImGuiIO.prototype.set_ConfigMacOSXBehaviors = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigMacOSXBehaviors_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigMacOSXBehaviors', { get: ImGuiIO.prototype.get_ConfigMacOSXBehaviors, set: ImGuiIO.prototype.set_ConfigMacOSXBehaviors });

ImGuiIO.prototype['get_ConfigInputTrickleEventQueue'] = ImGuiIO.prototype.get_ConfigInputTrickleEventQueue = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigInputTrickleEventQueue_0(self));
};

ImGuiIO.prototype['set_ConfigInputTrickleEventQueue'] = ImGuiIO.prototype.set_ConfigInputTrickleEventQueue = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigInputTrickleEventQueue_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigInputTrickleEventQueue', { get: ImGuiIO.prototype.get_ConfigInputTrickleEventQueue, set: ImGuiIO.prototype.set_ConfigInputTrickleEventQueue });

ImGuiIO.prototype['get_ConfigInputTextCursorBlink'] = ImGuiIO.prototype.get_ConfigInputTextCursorBlink = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigInputTextCursorBlink_0(self));
};

ImGuiIO.prototype['set_ConfigInputTextCursorBlink'] = ImGuiIO.prototype.set_ConfigInputTextCursorBlink = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigInputTextCursorBlink_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigInputTextCursorBlink', { get: ImGuiIO.prototype.get_ConfigInputTextCursorBlink, set: ImGuiIO.prototype.set_ConfigInputTextCursorBlink });

ImGuiIO.prototype['get_ConfigInputTextEnterKeepActive'] = ImGuiIO.prototype.get_ConfigInputTextEnterKeepActive = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigInputTextEnterKeepActive_0(self));
};

ImGuiIO.prototype['set_ConfigInputTextEnterKeepActive'] = ImGuiIO.prototype.set_ConfigInputTextEnterKeepActive = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigInputTextEnterKeepActive_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigInputTextEnterKeepActive', { get: ImGuiIO.prototype.get_ConfigInputTextEnterKeepActive, set: ImGuiIO.prototype.set_ConfigInputTextEnterKeepActive });

ImGuiIO.prototype['get_ConfigDragClickToInputText'] = ImGuiIO.prototype.get_ConfigDragClickToInputText = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigDragClickToInputText_0(self));
};

ImGuiIO.prototype['set_ConfigDragClickToInputText'] = ImGuiIO.prototype.set_ConfigDragClickToInputText = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigDragClickToInputText_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigDragClickToInputText', { get: ImGuiIO.prototype.get_ConfigDragClickToInputText, set: ImGuiIO.prototype.set_ConfigDragClickToInputText });

ImGuiIO.prototype['get_ConfigWindowsResizeFromEdges'] = ImGuiIO.prototype.get_ConfigWindowsResizeFromEdges = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigWindowsResizeFromEdges_0(self));
};

ImGuiIO.prototype['set_ConfigWindowsResizeFromEdges'] = ImGuiIO.prototype.set_ConfigWindowsResizeFromEdges = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigWindowsResizeFromEdges_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigWindowsResizeFromEdges', { get: ImGuiIO.prototype.get_ConfigWindowsResizeFromEdges, set: ImGuiIO.prototype.set_ConfigWindowsResizeFromEdges });

ImGuiIO.prototype['get_ConfigWindowsMoveFromTitleBarOnly'] = ImGuiIO.prototype.get_ConfigWindowsMoveFromTitleBarOnly = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigWindowsMoveFromTitleBarOnly_0(self));
};

ImGuiIO.prototype['set_ConfigWindowsMoveFromTitleBarOnly'] = ImGuiIO.prototype.set_ConfigWindowsMoveFromTitleBarOnly = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigWindowsMoveFromTitleBarOnly_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigWindowsMoveFromTitleBarOnly', { get: ImGuiIO.prototype.get_ConfigWindowsMoveFromTitleBarOnly, set: ImGuiIO.prototype.set_ConfigWindowsMoveFromTitleBarOnly });

ImGuiIO.prototype['get_ConfigWindowsCopyContentsWithCtrlC'] = ImGuiIO.prototype.get_ConfigWindowsCopyContentsWithCtrlC = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigWindowsCopyContentsWithCtrlC_0(self));
};

ImGuiIO.prototype['set_ConfigWindowsCopyContentsWithCtrlC'] = ImGuiIO.prototype.set_ConfigWindowsCopyContentsWithCtrlC = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigWindowsCopyContentsWithCtrlC_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigWindowsCopyContentsWithCtrlC', { get: ImGuiIO.prototype.get_ConfigWindowsCopyContentsWithCtrlC, set: ImGuiIO.prototype.set_ConfigWindowsCopyContentsWithCtrlC });

ImGuiIO.prototype['get_ConfigScrollbarScrollByPage'] = ImGuiIO.prototype.get_ConfigScrollbarScrollByPage = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_ConfigScrollbarScrollByPage_0(self));
};

ImGuiIO.prototype['set_ConfigScrollbarScrollByPage'] = ImGuiIO.prototype.set_ConfigScrollbarScrollByPage = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigScrollbarScrollByPage_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigScrollbarScrollByPage', { get: ImGuiIO.prototype.get_ConfigScrollbarScrollByPage, set: ImGuiIO.prototype.set_ConfigScrollbarScrollByPage });

ImGuiIO.prototype['get_ConfigMemoryCompactTimer'] = ImGuiIO.prototype.get_ConfigMemoryCompactTimer = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_ConfigMemoryCompactTimer_0(self);
};

ImGuiIO.prototype['set_ConfigMemoryCompactTimer'] = ImGuiIO.prototype.set_ConfigMemoryCompactTimer = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_ConfigMemoryCompactTimer_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'ConfigMemoryCompactTimer', { get: ImGuiIO.prototype.get_ConfigMemoryCompactTimer, set: ImGuiIO.prototype.set_ConfigMemoryCompactTimer });

ImGuiIO.prototype['get_MouseDoubleClickTime'] = ImGuiIO.prototype.get_MouseDoubleClickTime = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_MouseDoubleClickTime_0(self);
};

ImGuiIO.prototype['set_MouseDoubleClickTime'] = ImGuiIO.prototype.set_MouseDoubleClickTime = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_MouseDoubleClickTime_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'MouseDoubleClickTime', { get: ImGuiIO.prototype.get_MouseDoubleClickTime, set: ImGuiIO.prototype.set_MouseDoubleClickTime });

ImGuiIO.prototype['get_MouseDoubleClickMaxDist'] = ImGuiIO.prototype.get_MouseDoubleClickMaxDist = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_MouseDoubleClickMaxDist_0(self);
};

ImGuiIO.prototype['set_MouseDoubleClickMaxDist'] = ImGuiIO.prototype.set_MouseDoubleClickMaxDist = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_MouseDoubleClickMaxDist_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'MouseDoubleClickMaxDist', { get: ImGuiIO.prototype.get_MouseDoubleClickMaxDist, set: ImGuiIO.prototype.set_MouseDoubleClickMaxDist });

ImGuiIO.prototype['get_MouseDragThreshold'] = ImGuiIO.prototype.get_MouseDragThreshold = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_MouseDragThreshold_0(self);
};

ImGuiIO.prototype['set_MouseDragThreshold'] = ImGuiIO.prototype.set_MouseDragThreshold = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_MouseDragThreshold_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'MouseDragThreshold', { get: ImGuiIO.prototype.get_MouseDragThreshold, set: ImGuiIO.prototype.set_MouseDragThreshold });

ImGuiIO.prototype['get_KeyRepeatDelay'] = ImGuiIO.prototype.get_KeyRepeatDelay = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_KeyRepeatDelay_0(self);
};

ImGuiIO.prototype['set_KeyRepeatDelay'] = ImGuiIO.prototype.set_KeyRepeatDelay = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_KeyRepeatDelay_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'KeyRepeatDelay', { get: ImGuiIO.prototype.get_KeyRepeatDelay, set: ImGuiIO.prototype.set_KeyRepeatDelay });

ImGuiIO.prototype['get_KeyRepeatRate'] = ImGuiIO.prototype.get_KeyRepeatRate = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_KeyRepeatRate_0(self);
};

ImGuiIO.prototype['set_KeyRepeatRate'] = ImGuiIO.prototype.set_KeyRepeatRate = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_KeyRepeatRate_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'KeyRepeatRate', { get: ImGuiIO.prototype.get_KeyRepeatRate, set: ImGuiIO.prototype.set_KeyRepeatRate });

ImGuiIO.prototype['get_WantCaptureMouse'] = ImGuiIO.prototype.get_WantCaptureMouse = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_WantCaptureMouse_0(self));
};

ImGuiIO.prototype['set_WantCaptureMouse'] = ImGuiIO.prototype.set_WantCaptureMouse = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_WantCaptureMouse_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'WantCaptureMouse', { get: ImGuiIO.prototype.get_WantCaptureMouse, set: ImGuiIO.prototype.set_WantCaptureMouse });

ImGuiIO.prototype['get_WantCaptureKeyboard'] = ImGuiIO.prototype.get_WantCaptureKeyboard = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_WantCaptureKeyboard_0(self));
};

ImGuiIO.prototype['set_WantCaptureKeyboard'] = ImGuiIO.prototype.set_WantCaptureKeyboard = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_WantCaptureKeyboard_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'WantCaptureKeyboard', { get: ImGuiIO.prototype.get_WantCaptureKeyboard, set: ImGuiIO.prototype.set_WantCaptureKeyboard });

ImGuiIO.prototype['get_WantTextInput'] = ImGuiIO.prototype.get_WantTextInput = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_WantTextInput_0(self));
};

ImGuiIO.prototype['set_WantTextInput'] = ImGuiIO.prototype.set_WantTextInput = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_WantTextInput_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'WantTextInput', { get: ImGuiIO.prototype.get_WantTextInput, set: ImGuiIO.prototype.set_WantTextInput });

ImGuiIO.prototype['get_WantSetMousePos'] = ImGuiIO.prototype.get_WantSetMousePos = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_WantSetMousePos_0(self));
};

ImGuiIO.prototype['set_WantSetMousePos'] = ImGuiIO.prototype.set_WantSetMousePos = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_WantSetMousePos_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'WantSetMousePos', { get: ImGuiIO.prototype.get_WantSetMousePos, set: ImGuiIO.prototype.set_WantSetMousePos });

ImGuiIO.prototype['get_WantSaveIniSettings'] = ImGuiIO.prototype.get_WantSaveIniSettings = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_WantSaveIniSettings_0(self));
};

ImGuiIO.prototype['set_WantSaveIniSettings'] = ImGuiIO.prototype.set_WantSaveIniSettings = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_WantSaveIniSettings_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'WantSaveIniSettings', { get: ImGuiIO.prototype.get_WantSaveIniSettings, set: ImGuiIO.prototype.set_WantSaveIniSettings });

ImGuiIO.prototype['get_NavActive'] = ImGuiIO.prototype.get_NavActive = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_NavActive_0(self));
};

ImGuiIO.prototype['set_NavActive'] = ImGuiIO.prototype.set_NavActive = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_NavActive_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'NavActive', { get: ImGuiIO.prototype.get_NavActive, set: ImGuiIO.prototype.set_NavActive });

ImGuiIO.prototype['get_NavVisible'] = ImGuiIO.prototype.get_NavVisible = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiIO_get_NavVisible_0(self));
};

ImGuiIO.prototype['set_NavVisible'] = ImGuiIO.prototype.set_NavVisible = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_NavVisible_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'NavVisible', { get: ImGuiIO.prototype.get_NavVisible, set: ImGuiIO.prototype.set_NavVisible });

ImGuiIO.prototype['get_Framerate'] = ImGuiIO.prototype.get_Framerate = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_Framerate_0(self);
};

ImGuiIO.prototype['set_Framerate'] = ImGuiIO.prototype.set_Framerate = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_Framerate_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'Framerate', { get: ImGuiIO.prototype.get_Framerate, set: ImGuiIO.prototype.set_Framerate });

ImGuiIO.prototype['get_MetricsRenderVertices'] = ImGuiIO.prototype.get_MetricsRenderVertices = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_MetricsRenderVertices_0(self);
};

ImGuiIO.prototype['set_MetricsRenderVertices'] = ImGuiIO.prototype.set_MetricsRenderVertices = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_MetricsRenderVertices_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'MetricsRenderVertices', { get: ImGuiIO.prototype.get_MetricsRenderVertices, set: ImGuiIO.prototype.set_MetricsRenderVertices });

ImGuiIO.prototype['get_MetricsRenderIndices'] = ImGuiIO.prototype.get_MetricsRenderIndices = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_MetricsRenderIndices_0(self);
};

ImGuiIO.prototype['set_MetricsRenderIndices'] = ImGuiIO.prototype.set_MetricsRenderIndices = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_MetricsRenderIndices_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'MetricsRenderIndices', { get: ImGuiIO.prototype.get_MetricsRenderIndices, set: ImGuiIO.prototype.set_MetricsRenderIndices });

ImGuiIO.prototype['get_MetricsRenderWindows'] = ImGuiIO.prototype.get_MetricsRenderWindows = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_MetricsRenderWindows_0(self);
};

ImGuiIO.prototype['set_MetricsRenderWindows'] = ImGuiIO.prototype.set_MetricsRenderWindows = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_MetricsRenderWindows_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'MetricsRenderWindows', { get: ImGuiIO.prototype.get_MetricsRenderWindows, set: ImGuiIO.prototype.set_MetricsRenderWindows });

ImGuiIO.prototype['get_MetricsActiveWindows'] = ImGuiIO.prototype.get_MetricsActiveWindows = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiIO_get_MetricsActiveWindows_0(self);
};

ImGuiIO.prototype['set_MetricsActiveWindows'] = ImGuiIO.prototype.set_MetricsActiveWindows = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_MetricsActiveWindows_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'MetricsActiveWindows', { get: ImGuiIO.prototype.get_MetricsActiveWindows, set: ImGuiIO.prototype.set_MetricsActiveWindows });

ImGuiIO.prototype['get_MouseDelta'] = ImGuiIO.prototype.get_MouseDelta = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiIO_get_MouseDelta_0(self), ImVec2);
};

ImGuiIO.prototype['set_MouseDelta'] = ImGuiIO.prototype.set_MouseDelta = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiIO_set_MouseDelta_1(self, arg0);
};

Object.defineProperty(ImGuiIO.prototype, 'MouseDelta', { get: ImGuiIO.prototype.get_MouseDelta, set: ImGuiIO.prototype.set_MouseDelta });

ImGuiIO.prototype['__destroy__'] = ImGuiIO.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiIO___destroy___0(self);
};

function ImFontAtlas() { throw "cannot construct a ImFontAtlas, no constructor in IDL" }
ImFontAtlas.prototype = Object.create(window.idl.WrapperObject.prototype);
ImFontAtlas.prototype.constructor = ImFontAtlas;
ImFontAtlas.prototype.__class__ = ImFontAtlas;
ImFontAtlas.__cache__ = {};
Module['ImFontAtlas'] = ImFontAtlas;

ImFontAtlas.prototype['AddFont'] = ImFontAtlas.prototype.AddFont = function(font_cfg) {
  var self = this.ptr;
  if (font_cfg && typeof font_cfg === 'object') font_cfg = font_cfg.ptr;
  return wrapPointer(_emscripten_bind_ImFontAtlas_AddFont_1(self, font_cfg), ImFont);
};

ImFontAtlas.prototype['AddFontDefault'] = ImFontAtlas.prototype.AddFontDefault = function(font_cfg) {
  var self = this.ptr;
  if (font_cfg && typeof font_cfg === 'object') font_cfg = font_cfg.ptr;
  if (font_cfg === undefined) { return wrapPointer(_emscripten_bind_ImFontAtlas_AddFontDefault_0(self), ImFont) }
  return wrapPointer(_emscripten_bind_ImFontAtlas_AddFontDefault_1(self, font_cfg), ImFont);
};

ImFontAtlas.prototype['AddFontFromMemoryTTF'] = ImFontAtlas.prototype.AddFontFromMemoryTTF = function(font_data, font_data_size, size_pixels, font_cfg) {
  var self = this.ptr;
  if (font_data && typeof font_data === 'object') font_data = font_data.ptr;
  if (font_data_size && typeof font_data_size === 'object') font_data_size = font_data_size.ptr;
  if (size_pixels && typeof size_pixels === 'object') size_pixels = size_pixels.ptr;
  if (font_cfg && typeof font_cfg === 'object') font_cfg = font_cfg.ptr;
  if (font_cfg === undefined) { return wrapPointer(_emscripten_bind_ImFontAtlas_AddFontFromMemoryTTF_3(self, font_data, font_data_size, size_pixels), ImFont) }
  return wrapPointer(_emscripten_bind_ImFontAtlas_AddFontFromMemoryTTF_4(self, font_data, font_data_size, size_pixels, font_cfg), ImFont);
};

ImFontAtlas.prototype['__destroy__'] = ImFontAtlas.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImFontAtlas___destroy___0(self);
};

function ImFontConfig() {
  this.ptr = _emscripten_bind_ImFontConfig_ImFontConfig_0();
  window.idl.getCache(ImFontConfig)[this.ptr] = this;
};

ImFontConfig.prototype = Object.create(window.idl.WrapperObject.prototype);
ImFontConfig.prototype.constructor = ImFontConfig;
ImFontConfig.prototype.__class__ = ImFontConfig;
ImFontConfig.__cache__ = {};
Module['ImFontConfig'] = ImFontConfig;

ImFontConfig.prototype['get_Name'] = ImFontConfig.prototype.get_Name = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return _emscripten_bind_ImFontConfig_get_Name_1(self, arg0);
};

ImFontConfig.prototype['set_Name'] = ImFontConfig.prototype.set_Name = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ImFontConfig_set_Name_2(self, arg0, arg1);
};

Object.defineProperty(ImFontConfig.prototype, 'Name', { get: ImFontConfig.prototype.get_Name, set: ImFontConfig.prototype.set_Name });

ImFontConfig.prototype['get_FontData'] = ImFontConfig.prototype.get_FontData = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_FontData_0(self);
};

ImFontConfig.prototype['set_FontData'] = ImFontConfig.prototype.set_FontData = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_FontData_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'FontData', { get: ImFontConfig.prototype.get_FontData, set: ImFontConfig.prototype.set_FontData });

ImFontConfig.prototype['get_FontDataSize'] = ImFontConfig.prototype.get_FontDataSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_FontDataSize_0(self);
};

ImFontConfig.prototype['set_FontDataSize'] = ImFontConfig.prototype.set_FontDataSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_FontDataSize_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'FontDataSize', { get: ImFontConfig.prototype.get_FontDataSize, set: ImFontConfig.prototype.set_FontDataSize });

ImFontConfig.prototype['get_FontDataOwnedByAtlas'] = ImFontConfig.prototype.get_FontDataOwnedByAtlas = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImFontConfig_get_FontDataOwnedByAtlas_0(self));
};

ImFontConfig.prototype['set_FontDataOwnedByAtlas'] = ImFontConfig.prototype.set_FontDataOwnedByAtlas = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_FontDataOwnedByAtlas_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'FontDataOwnedByAtlas', { get: ImFontConfig.prototype.get_FontDataOwnedByAtlas, set: ImFontConfig.prototype.set_FontDataOwnedByAtlas });

ImFontConfig.prototype['get_MergeMode'] = ImFontConfig.prototype.get_MergeMode = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImFontConfig_get_MergeMode_0(self));
};

ImFontConfig.prototype['set_MergeMode'] = ImFontConfig.prototype.set_MergeMode = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_MergeMode_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'MergeMode', { get: ImFontConfig.prototype.get_MergeMode, set: ImFontConfig.prototype.set_MergeMode });

ImFontConfig.prototype['get_PixelSnapH'] = ImFontConfig.prototype.get_PixelSnapH = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImFontConfig_get_PixelSnapH_0(self));
};

ImFontConfig.prototype['set_PixelSnapH'] = ImFontConfig.prototype.set_PixelSnapH = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_PixelSnapH_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'PixelSnapH', { get: ImFontConfig.prototype.get_PixelSnapH, set: ImFontConfig.prototype.set_PixelSnapH });

ImFontConfig.prototype['get_PixelSnapV'] = ImFontConfig.prototype.get_PixelSnapV = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImFontConfig_get_PixelSnapV_0(self));
};

ImFontConfig.prototype['set_PixelSnapV'] = ImFontConfig.prototype.set_PixelSnapV = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_PixelSnapV_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'PixelSnapV', { get: ImFontConfig.prototype.get_PixelSnapV, set: ImFontConfig.prototype.set_PixelSnapV });

ImFontConfig.prototype['get_OversampleH'] = ImFontConfig.prototype.get_OversampleH = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_OversampleH_0(self);
};

ImFontConfig.prototype['set_OversampleH'] = ImFontConfig.prototype.set_OversampleH = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_OversampleH_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'OversampleH', { get: ImFontConfig.prototype.get_OversampleH, set: ImFontConfig.prototype.set_OversampleH });

ImFontConfig.prototype['get_OversampleV'] = ImFontConfig.prototype.get_OversampleV = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_OversampleV_0(self);
};

ImFontConfig.prototype['set_OversampleV'] = ImFontConfig.prototype.set_OversampleV = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_OversampleV_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'OversampleV', { get: ImFontConfig.prototype.get_OversampleV, set: ImFontConfig.prototype.set_OversampleV });

ImFontConfig.prototype['get_EllipsisChar'] = ImFontConfig.prototype.get_EllipsisChar = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_EllipsisChar_0(self);
};

ImFontConfig.prototype['set_EllipsisChar'] = ImFontConfig.prototype.set_EllipsisChar = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_EllipsisChar_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'EllipsisChar', { get: ImFontConfig.prototype.get_EllipsisChar, set: ImFontConfig.prototype.set_EllipsisChar });

ImFontConfig.prototype['get_SizePixels'] = ImFontConfig.prototype.get_SizePixels = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_SizePixels_0(self);
};

ImFontConfig.prototype['set_SizePixels'] = ImFontConfig.prototype.set_SizePixels = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_SizePixels_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'SizePixels', { get: ImFontConfig.prototype.get_SizePixels, set: ImFontConfig.prototype.set_SizePixels });

ImFontConfig.prototype['get_GlyphOffset'] = ImFontConfig.prototype.get_GlyphOffset = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImFontConfig_get_GlyphOffset_0(self), ImVec2);
};

ImFontConfig.prototype['set_GlyphOffset'] = ImFontConfig.prototype.set_GlyphOffset = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_GlyphOffset_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'GlyphOffset', { get: ImFontConfig.prototype.get_GlyphOffset, set: ImFontConfig.prototype.set_GlyphOffset });

ImFontConfig.prototype['get_GlyphMinAdvanceX'] = ImFontConfig.prototype.get_GlyphMinAdvanceX = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_GlyphMinAdvanceX_0(self);
};

ImFontConfig.prototype['set_GlyphMinAdvanceX'] = ImFontConfig.prototype.set_GlyphMinAdvanceX = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_GlyphMinAdvanceX_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'GlyphMinAdvanceX', { get: ImFontConfig.prototype.get_GlyphMinAdvanceX, set: ImFontConfig.prototype.set_GlyphMinAdvanceX });

ImFontConfig.prototype['get_GlyphMaxAdvanceX'] = ImFontConfig.prototype.get_GlyphMaxAdvanceX = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_GlyphMaxAdvanceX_0(self);
};

ImFontConfig.prototype['set_GlyphMaxAdvanceX'] = ImFontConfig.prototype.set_GlyphMaxAdvanceX = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_GlyphMaxAdvanceX_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'GlyphMaxAdvanceX', { get: ImFontConfig.prototype.get_GlyphMaxAdvanceX, set: ImFontConfig.prototype.set_GlyphMaxAdvanceX });

ImFontConfig.prototype['get_GlyphExtraAdvanceX'] = ImFontConfig.prototype.get_GlyphExtraAdvanceX = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_GlyphExtraAdvanceX_0(self);
};

ImFontConfig.prototype['set_GlyphExtraAdvanceX'] = ImFontConfig.prototype.set_GlyphExtraAdvanceX = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_GlyphExtraAdvanceX_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'GlyphExtraAdvanceX', { get: ImFontConfig.prototype.get_GlyphExtraAdvanceX, set: ImFontConfig.prototype.set_GlyphExtraAdvanceX });

ImFontConfig.prototype['get_FontNo'] = ImFontConfig.prototype.get_FontNo = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_FontNo_0(self);
};

ImFontConfig.prototype['set_FontNo'] = ImFontConfig.prototype.set_FontNo = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_FontNo_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'FontNo', { get: ImFontConfig.prototype.get_FontNo, set: ImFontConfig.prototype.set_FontNo });

ImFontConfig.prototype['get_FontLoaderFlags'] = ImFontConfig.prototype.get_FontLoaderFlags = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_FontLoaderFlags_0(self);
};

ImFontConfig.prototype['set_FontLoaderFlags'] = ImFontConfig.prototype.set_FontLoaderFlags = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_FontLoaderFlags_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'FontLoaderFlags', { get: ImFontConfig.prototype.get_FontLoaderFlags, set: ImFontConfig.prototype.set_FontLoaderFlags });

ImFontConfig.prototype['get_RasterizerMultiply'] = ImFontConfig.prototype.get_RasterizerMultiply = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_RasterizerMultiply_0(self);
};

ImFontConfig.prototype['set_RasterizerMultiply'] = ImFontConfig.prototype.set_RasterizerMultiply = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_RasterizerMultiply_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'RasterizerMultiply', { get: ImFontConfig.prototype.get_RasterizerMultiply, set: ImFontConfig.prototype.set_RasterizerMultiply });

ImFontConfig.prototype['get_RasterizerDensity'] = ImFontConfig.prototype.get_RasterizerDensity = function() {
  var self = this.ptr;
  return _emscripten_bind_ImFontConfig_get_RasterizerDensity_0(self);
};

ImFontConfig.prototype['set_RasterizerDensity'] = ImFontConfig.prototype.set_RasterizerDensity = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImFontConfig_set_RasterizerDensity_1(self, arg0);
};

Object.defineProperty(ImFontConfig.prototype, 'RasterizerDensity', { get: ImFontConfig.prototype.get_RasterizerDensity, set: ImFontConfig.prototype.set_RasterizerDensity });

ImFontConfig.prototype['__destroy__'] = ImFontConfig.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImFontConfig___destroy___0(self);
};

function ImFont() { throw "cannot construct a ImFont, no constructor in IDL" }
ImFont.prototype = Object.create(window.idl.WrapperObject.prototype);
ImFont.prototype.constructor = ImFont;
ImFont.prototype.__class__ = ImFont;
ImFont.__cache__ = {};
Module['ImFont'] = ImFont;

ImFont.prototype['__destroy__'] = ImFont.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImFont___destroy___0(self);
};

function ImGuiStyle() { throw "cannot construct a ImGuiStyle, no constructor in IDL" }
ImGuiStyle.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiStyle.prototype.constructor = ImGuiStyle;
ImGuiStyle.prototype.__class__ = ImGuiStyle;
ImGuiStyle.__cache__ = {};
Module['ImGuiStyle'] = ImGuiStyle;

ImGuiStyle.prototype['ScaleAllSizes'] = ImGuiStyle.prototype.ScaleAllSizes = function(scale_factor) {
  var self = this.ptr;
  if (scale_factor && typeof scale_factor === 'object') scale_factor = scale_factor.ptr;
  _emscripten_bind_ImGuiStyle_ScaleAllSizes_1(self, scale_factor);
};

ImGuiStyle.prototype['get_Alpha'] = ImGuiStyle.prototype.get_Alpha = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_Alpha_0(self);
};

ImGuiStyle.prototype['set_Alpha'] = ImGuiStyle.prototype.set_Alpha = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_Alpha_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'Alpha', { get: ImGuiStyle.prototype.get_Alpha, set: ImGuiStyle.prototype.set_Alpha });

ImGuiStyle.prototype['get_DisabledAlpha'] = ImGuiStyle.prototype.get_DisabledAlpha = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_DisabledAlpha_0(self);
};

ImGuiStyle.prototype['set_DisabledAlpha'] = ImGuiStyle.prototype.set_DisabledAlpha = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_DisabledAlpha_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'DisabledAlpha', { get: ImGuiStyle.prototype.get_DisabledAlpha, set: ImGuiStyle.prototype.set_DisabledAlpha });

ImGuiStyle.prototype['get_WindowPadding'] = ImGuiStyle.prototype.get_WindowPadding = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_WindowPadding_0(self), ImVec2);
};

ImGuiStyle.prototype['set_WindowPadding'] = ImGuiStyle.prototype.set_WindowPadding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_WindowPadding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'WindowPadding', { get: ImGuiStyle.prototype.get_WindowPadding, set: ImGuiStyle.prototype.set_WindowPadding });

ImGuiStyle.prototype['get_WindowRounding'] = ImGuiStyle.prototype.get_WindowRounding = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_WindowRounding_0(self);
};

ImGuiStyle.prototype['set_WindowRounding'] = ImGuiStyle.prototype.set_WindowRounding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_WindowRounding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'WindowRounding', { get: ImGuiStyle.prototype.get_WindowRounding, set: ImGuiStyle.prototype.set_WindowRounding });

ImGuiStyle.prototype['get_WindowBorderSize'] = ImGuiStyle.prototype.get_WindowBorderSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_WindowBorderSize_0(self);
};

ImGuiStyle.prototype['set_WindowBorderSize'] = ImGuiStyle.prototype.set_WindowBorderSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_WindowBorderSize_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'WindowBorderSize', { get: ImGuiStyle.prototype.get_WindowBorderSize, set: ImGuiStyle.prototype.set_WindowBorderSize });

ImGuiStyle.prototype['get_WindowMinSize'] = ImGuiStyle.prototype.get_WindowMinSize = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_WindowMinSize_0(self), ImVec2);
};

ImGuiStyle.prototype['set_WindowMinSize'] = ImGuiStyle.prototype.set_WindowMinSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_WindowMinSize_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'WindowMinSize', { get: ImGuiStyle.prototype.get_WindowMinSize, set: ImGuiStyle.prototype.set_WindowMinSize });

ImGuiStyle.prototype['get_WindowTitleAlign'] = ImGuiStyle.prototype.get_WindowTitleAlign = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_WindowTitleAlign_0(self), ImVec2);
};

ImGuiStyle.prototype['set_WindowTitleAlign'] = ImGuiStyle.prototype.set_WindowTitleAlign = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_WindowTitleAlign_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'WindowTitleAlign', { get: ImGuiStyle.prototype.get_WindowTitleAlign, set: ImGuiStyle.prototype.set_WindowTitleAlign });

ImGuiStyle.prototype['get_WindowMenuButtonPosition'] = ImGuiStyle.prototype.get_WindowMenuButtonPosition = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_WindowMenuButtonPosition_0(self);
};

ImGuiStyle.prototype['set_WindowMenuButtonPosition'] = ImGuiStyle.prototype.set_WindowMenuButtonPosition = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_WindowMenuButtonPosition_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'WindowMenuButtonPosition', { get: ImGuiStyle.prototype.get_WindowMenuButtonPosition, set: ImGuiStyle.prototype.set_WindowMenuButtonPosition });

ImGuiStyle.prototype['get_ChildRounding'] = ImGuiStyle.prototype.get_ChildRounding = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_ChildRounding_0(self);
};

ImGuiStyle.prototype['set_ChildRounding'] = ImGuiStyle.prototype.set_ChildRounding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_ChildRounding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'ChildRounding', { get: ImGuiStyle.prototype.get_ChildRounding, set: ImGuiStyle.prototype.set_ChildRounding });

ImGuiStyle.prototype['get_ChildBorderSize'] = ImGuiStyle.prototype.get_ChildBorderSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_ChildBorderSize_0(self);
};

ImGuiStyle.prototype['set_ChildBorderSize'] = ImGuiStyle.prototype.set_ChildBorderSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_ChildBorderSize_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'ChildBorderSize', { get: ImGuiStyle.prototype.get_ChildBorderSize, set: ImGuiStyle.prototype.set_ChildBorderSize });

ImGuiStyle.prototype['get_PopupRounding'] = ImGuiStyle.prototype.get_PopupRounding = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_PopupRounding_0(self);
};

ImGuiStyle.prototype['set_PopupRounding'] = ImGuiStyle.prototype.set_PopupRounding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_PopupRounding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'PopupRounding', { get: ImGuiStyle.prototype.get_PopupRounding, set: ImGuiStyle.prototype.set_PopupRounding });

ImGuiStyle.prototype['get_PopupBorderSize'] = ImGuiStyle.prototype.get_PopupBorderSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_PopupBorderSize_0(self);
};

ImGuiStyle.prototype['set_PopupBorderSize'] = ImGuiStyle.prototype.set_PopupBorderSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_PopupBorderSize_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'PopupBorderSize', { get: ImGuiStyle.prototype.get_PopupBorderSize, set: ImGuiStyle.prototype.set_PopupBorderSize });

ImGuiStyle.prototype['get_FramePadding'] = ImGuiStyle.prototype.get_FramePadding = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_FramePadding_0(self), ImVec2);
};

ImGuiStyle.prototype['set_FramePadding'] = ImGuiStyle.prototype.set_FramePadding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_FramePadding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'FramePadding', { get: ImGuiStyle.prototype.get_FramePadding, set: ImGuiStyle.prototype.set_FramePadding });

ImGuiStyle.prototype['get_FrameRounding'] = ImGuiStyle.prototype.get_FrameRounding = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_FrameRounding_0(self);
};

ImGuiStyle.prototype['set_FrameRounding'] = ImGuiStyle.prototype.set_FrameRounding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_FrameRounding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'FrameRounding', { get: ImGuiStyle.prototype.get_FrameRounding, set: ImGuiStyle.prototype.set_FrameRounding });

ImGuiStyle.prototype['get_FrameBorderSize'] = ImGuiStyle.prototype.get_FrameBorderSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_FrameBorderSize_0(self);
};

ImGuiStyle.prototype['set_FrameBorderSize'] = ImGuiStyle.prototype.set_FrameBorderSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_FrameBorderSize_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'FrameBorderSize', { get: ImGuiStyle.prototype.get_FrameBorderSize, set: ImGuiStyle.prototype.set_FrameBorderSize });

ImGuiStyle.prototype['get_ItemSpacing'] = ImGuiStyle.prototype.get_ItemSpacing = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_ItemSpacing_0(self), ImVec2);
};

ImGuiStyle.prototype['set_ItemSpacing'] = ImGuiStyle.prototype.set_ItemSpacing = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_ItemSpacing_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'ItemSpacing', { get: ImGuiStyle.prototype.get_ItemSpacing, set: ImGuiStyle.prototype.set_ItemSpacing });

ImGuiStyle.prototype['get_ItemInnerSpacing'] = ImGuiStyle.prototype.get_ItemInnerSpacing = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_ItemInnerSpacing_0(self), ImVec2);
};

ImGuiStyle.prototype['set_ItemInnerSpacing'] = ImGuiStyle.prototype.set_ItemInnerSpacing = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_ItemInnerSpacing_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'ItemInnerSpacing', { get: ImGuiStyle.prototype.get_ItemInnerSpacing, set: ImGuiStyle.prototype.set_ItemInnerSpacing });

ImGuiStyle.prototype['get_CellPadding'] = ImGuiStyle.prototype.get_CellPadding = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_CellPadding_0(self), ImVec2);
};

ImGuiStyle.prototype['set_CellPadding'] = ImGuiStyle.prototype.set_CellPadding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_CellPadding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'CellPadding', { get: ImGuiStyle.prototype.get_CellPadding, set: ImGuiStyle.prototype.set_CellPadding });

ImGuiStyle.prototype['get_TouchExtraPadding'] = ImGuiStyle.prototype.get_TouchExtraPadding = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_TouchExtraPadding_0(self), ImVec2);
};

ImGuiStyle.prototype['set_TouchExtraPadding'] = ImGuiStyle.prototype.set_TouchExtraPadding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_TouchExtraPadding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'TouchExtraPadding', { get: ImGuiStyle.prototype.get_TouchExtraPadding, set: ImGuiStyle.prototype.set_TouchExtraPadding });

ImGuiStyle.prototype['get_IndentSpacing'] = ImGuiStyle.prototype.get_IndentSpacing = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_IndentSpacing_0(self);
};

ImGuiStyle.prototype['set_IndentSpacing'] = ImGuiStyle.prototype.set_IndentSpacing = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_IndentSpacing_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'IndentSpacing', { get: ImGuiStyle.prototype.get_IndentSpacing, set: ImGuiStyle.prototype.set_IndentSpacing });

ImGuiStyle.prototype['get_ColumnsMinSpacing'] = ImGuiStyle.prototype.get_ColumnsMinSpacing = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_ColumnsMinSpacing_0(self);
};

ImGuiStyle.prototype['set_ColumnsMinSpacing'] = ImGuiStyle.prototype.set_ColumnsMinSpacing = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_ColumnsMinSpacing_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'ColumnsMinSpacing', { get: ImGuiStyle.prototype.get_ColumnsMinSpacing, set: ImGuiStyle.prototype.set_ColumnsMinSpacing });

ImGuiStyle.prototype['get_ScrollbarSize'] = ImGuiStyle.prototype.get_ScrollbarSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_ScrollbarSize_0(self);
};

ImGuiStyle.prototype['set_ScrollbarSize'] = ImGuiStyle.prototype.set_ScrollbarSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_ScrollbarSize_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'ScrollbarSize', { get: ImGuiStyle.prototype.get_ScrollbarSize, set: ImGuiStyle.prototype.set_ScrollbarSize });

ImGuiStyle.prototype['get_ScrollbarRounding'] = ImGuiStyle.prototype.get_ScrollbarRounding = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_ScrollbarRounding_0(self);
};

ImGuiStyle.prototype['set_ScrollbarRounding'] = ImGuiStyle.prototype.set_ScrollbarRounding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_ScrollbarRounding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'ScrollbarRounding', { get: ImGuiStyle.prototype.get_ScrollbarRounding, set: ImGuiStyle.prototype.set_ScrollbarRounding });

ImGuiStyle.prototype['get_GrabMinSize'] = ImGuiStyle.prototype.get_GrabMinSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_GrabMinSize_0(self);
};

ImGuiStyle.prototype['set_GrabMinSize'] = ImGuiStyle.prototype.set_GrabMinSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_GrabMinSize_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'GrabMinSize', { get: ImGuiStyle.prototype.get_GrabMinSize, set: ImGuiStyle.prototype.set_GrabMinSize });

ImGuiStyle.prototype['get_GrabRounding'] = ImGuiStyle.prototype.get_GrabRounding = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_GrabRounding_0(self);
};

ImGuiStyle.prototype['set_GrabRounding'] = ImGuiStyle.prototype.set_GrabRounding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_GrabRounding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'GrabRounding', { get: ImGuiStyle.prototype.get_GrabRounding, set: ImGuiStyle.prototype.set_GrabRounding });

ImGuiStyle.prototype['get_LogSliderDeadzone'] = ImGuiStyle.prototype.get_LogSliderDeadzone = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_LogSliderDeadzone_0(self);
};

ImGuiStyle.prototype['set_LogSliderDeadzone'] = ImGuiStyle.prototype.set_LogSliderDeadzone = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_LogSliderDeadzone_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'LogSliderDeadzone', { get: ImGuiStyle.prototype.get_LogSliderDeadzone, set: ImGuiStyle.prototype.set_LogSliderDeadzone });

ImGuiStyle.prototype['get_TabRounding'] = ImGuiStyle.prototype.get_TabRounding = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_TabRounding_0(self);
};

ImGuiStyle.prototype['set_TabRounding'] = ImGuiStyle.prototype.set_TabRounding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_TabRounding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'TabRounding', { get: ImGuiStyle.prototype.get_TabRounding, set: ImGuiStyle.prototype.set_TabRounding });

ImGuiStyle.prototype['get_TabBorderSize'] = ImGuiStyle.prototype.get_TabBorderSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_TabBorderSize_0(self);
};

ImGuiStyle.prototype['set_TabBorderSize'] = ImGuiStyle.prototype.set_TabBorderSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_TabBorderSize_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'TabBorderSize', { get: ImGuiStyle.prototype.get_TabBorderSize, set: ImGuiStyle.prototype.set_TabBorderSize });

ImGuiStyle.prototype['get_TabBarBorderSize'] = ImGuiStyle.prototype.get_TabBarBorderSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_TabBarBorderSize_0(self);
};

ImGuiStyle.prototype['set_TabBarBorderSize'] = ImGuiStyle.prototype.set_TabBarBorderSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_TabBarBorderSize_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'TabBarBorderSize', { get: ImGuiStyle.prototype.get_TabBarBorderSize, set: ImGuiStyle.prototype.set_TabBarBorderSize });

ImGuiStyle.prototype['get_ColorButtonPosition'] = ImGuiStyle.prototype.get_ColorButtonPosition = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_ColorButtonPosition_0(self);
};

ImGuiStyle.prototype['set_ColorButtonPosition'] = ImGuiStyle.prototype.set_ColorButtonPosition = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_ColorButtonPosition_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'ColorButtonPosition', { get: ImGuiStyle.prototype.get_ColorButtonPosition, set: ImGuiStyle.prototype.set_ColorButtonPosition });

ImGuiStyle.prototype['get_ButtonTextAlign'] = ImGuiStyle.prototype.get_ButtonTextAlign = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_ButtonTextAlign_0(self), ImVec2);
};

ImGuiStyle.prototype['set_ButtonTextAlign'] = ImGuiStyle.prototype.set_ButtonTextAlign = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_ButtonTextAlign_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'ButtonTextAlign', { get: ImGuiStyle.prototype.get_ButtonTextAlign, set: ImGuiStyle.prototype.set_ButtonTextAlign });

ImGuiStyle.prototype['get_SelectableTextAlign'] = ImGuiStyle.prototype.get_SelectableTextAlign = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_SelectableTextAlign_0(self), ImVec2);
};

ImGuiStyle.prototype['set_SelectableTextAlign'] = ImGuiStyle.prototype.set_SelectableTextAlign = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_SelectableTextAlign_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'SelectableTextAlign', { get: ImGuiStyle.prototype.get_SelectableTextAlign, set: ImGuiStyle.prototype.set_SelectableTextAlign });

ImGuiStyle.prototype['get_SeparatorTextBorderSize'] = ImGuiStyle.prototype.get_SeparatorTextBorderSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_SeparatorTextBorderSize_0(self);
};

ImGuiStyle.prototype['set_SeparatorTextBorderSize'] = ImGuiStyle.prototype.set_SeparatorTextBorderSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_SeparatorTextBorderSize_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'SeparatorTextBorderSize', { get: ImGuiStyle.prototype.get_SeparatorTextBorderSize, set: ImGuiStyle.prototype.set_SeparatorTextBorderSize });

ImGuiStyle.prototype['get_SeparatorTextAlign'] = ImGuiStyle.prototype.get_SeparatorTextAlign = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_SeparatorTextAlign_0(self), ImVec2);
};

ImGuiStyle.prototype['set_SeparatorTextAlign'] = ImGuiStyle.prototype.set_SeparatorTextAlign = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_SeparatorTextAlign_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'SeparatorTextAlign', { get: ImGuiStyle.prototype.get_SeparatorTextAlign, set: ImGuiStyle.prototype.set_SeparatorTextAlign });

ImGuiStyle.prototype['get_SeparatorTextPadding'] = ImGuiStyle.prototype.get_SeparatorTextPadding = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_SeparatorTextPadding_0(self), ImVec2);
};

ImGuiStyle.prototype['set_SeparatorTextPadding'] = ImGuiStyle.prototype.set_SeparatorTextPadding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_SeparatorTextPadding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'SeparatorTextPadding', { get: ImGuiStyle.prototype.get_SeparatorTextPadding, set: ImGuiStyle.prototype.set_SeparatorTextPadding });

ImGuiStyle.prototype['get_DisplayWindowPadding'] = ImGuiStyle.prototype.get_DisplayWindowPadding = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_DisplayWindowPadding_0(self), ImVec2);
};

ImGuiStyle.prototype['set_DisplayWindowPadding'] = ImGuiStyle.prototype.set_DisplayWindowPadding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_DisplayWindowPadding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'DisplayWindowPadding', { get: ImGuiStyle.prototype.get_DisplayWindowPadding, set: ImGuiStyle.prototype.set_DisplayWindowPadding });

ImGuiStyle.prototype['get_DisplaySafeAreaPadding'] = ImGuiStyle.prototype.get_DisplaySafeAreaPadding = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_DisplaySafeAreaPadding_0(self), ImVec2);
};

ImGuiStyle.prototype['set_DisplaySafeAreaPadding'] = ImGuiStyle.prototype.set_DisplaySafeAreaPadding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_DisplaySafeAreaPadding_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'DisplaySafeAreaPadding', { get: ImGuiStyle.prototype.get_DisplaySafeAreaPadding, set: ImGuiStyle.prototype.set_DisplaySafeAreaPadding });

ImGuiStyle.prototype['get_DockingSeparatorSize'] = ImGuiStyle.prototype.get_DockingSeparatorSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_DockingSeparatorSize_0(self);
};

ImGuiStyle.prototype['set_DockingSeparatorSize'] = ImGuiStyle.prototype.set_DockingSeparatorSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_DockingSeparatorSize_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'DockingSeparatorSize', { get: ImGuiStyle.prototype.get_DockingSeparatorSize, set: ImGuiStyle.prototype.set_DockingSeparatorSize });

ImGuiStyle.prototype['get_MouseCursorScale'] = ImGuiStyle.prototype.get_MouseCursorScale = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_MouseCursorScale_0(self);
};

ImGuiStyle.prototype['set_MouseCursorScale'] = ImGuiStyle.prototype.set_MouseCursorScale = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_MouseCursorScale_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'MouseCursorScale', { get: ImGuiStyle.prototype.get_MouseCursorScale, set: ImGuiStyle.prototype.set_MouseCursorScale });

ImGuiStyle.prototype['get_AntiAliasedLines'] = ImGuiStyle.prototype.get_AntiAliasedLines = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiStyle_get_AntiAliasedLines_0(self));
};

ImGuiStyle.prototype['set_AntiAliasedLines'] = ImGuiStyle.prototype.set_AntiAliasedLines = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_AntiAliasedLines_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'AntiAliasedLines', { get: ImGuiStyle.prototype.get_AntiAliasedLines, set: ImGuiStyle.prototype.set_AntiAliasedLines });

ImGuiStyle.prototype['get_AntiAliasedLinesUseTex'] = ImGuiStyle.prototype.get_AntiAliasedLinesUseTex = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiStyle_get_AntiAliasedLinesUseTex_0(self));
};

ImGuiStyle.prototype['set_AntiAliasedLinesUseTex'] = ImGuiStyle.prototype.set_AntiAliasedLinesUseTex = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_AntiAliasedLinesUseTex_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'AntiAliasedLinesUseTex', { get: ImGuiStyle.prototype.get_AntiAliasedLinesUseTex, set: ImGuiStyle.prototype.set_AntiAliasedLinesUseTex });

ImGuiStyle.prototype['get_AntiAliasedFill'] = ImGuiStyle.prototype.get_AntiAliasedFill = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiStyle_get_AntiAliasedFill_0(self));
};

ImGuiStyle.prototype['set_AntiAliasedFill'] = ImGuiStyle.prototype.set_AntiAliasedFill = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_AntiAliasedFill_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'AntiAliasedFill', { get: ImGuiStyle.prototype.get_AntiAliasedFill, set: ImGuiStyle.prototype.set_AntiAliasedFill });

ImGuiStyle.prototype['get_CurveTessellationTol'] = ImGuiStyle.prototype.get_CurveTessellationTol = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_CurveTessellationTol_0(self);
};

ImGuiStyle.prototype['set_CurveTessellationTol'] = ImGuiStyle.prototype.set_CurveTessellationTol = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_CurveTessellationTol_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'CurveTessellationTol', { get: ImGuiStyle.prototype.get_CurveTessellationTol, set: ImGuiStyle.prototype.set_CurveTessellationTol });

ImGuiStyle.prototype['get_CircleTessellationMaxError'] = ImGuiStyle.prototype.get_CircleTessellationMaxError = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_CircleTessellationMaxError_0(self);
};

ImGuiStyle.prototype['set_CircleTessellationMaxError'] = ImGuiStyle.prototype.set_CircleTessellationMaxError = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_CircleTessellationMaxError_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'CircleTessellationMaxError', { get: ImGuiStyle.prototype.get_CircleTessellationMaxError, set: ImGuiStyle.prototype.set_CircleTessellationMaxError });

ImGuiStyle.prototype['get_HoverStationaryDelay'] = ImGuiStyle.prototype.get_HoverStationaryDelay = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_HoverStationaryDelay_0(self);
};

ImGuiStyle.prototype['set_HoverStationaryDelay'] = ImGuiStyle.prototype.set_HoverStationaryDelay = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_HoverStationaryDelay_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'HoverStationaryDelay', { get: ImGuiStyle.prototype.get_HoverStationaryDelay, set: ImGuiStyle.prototype.set_HoverStationaryDelay });

ImGuiStyle.prototype['get_HoverDelayShort'] = ImGuiStyle.prototype.get_HoverDelayShort = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_HoverDelayShort_0(self);
};

ImGuiStyle.prototype['set_HoverDelayShort'] = ImGuiStyle.prototype.set_HoverDelayShort = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_HoverDelayShort_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'HoverDelayShort', { get: ImGuiStyle.prototype.get_HoverDelayShort, set: ImGuiStyle.prototype.set_HoverDelayShort });

ImGuiStyle.prototype['get_HoverDelayNormal'] = ImGuiStyle.prototype.get_HoverDelayNormal = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_HoverDelayNormal_0(self);
};

ImGuiStyle.prototype['set_HoverDelayNormal'] = ImGuiStyle.prototype.set_HoverDelayNormal = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_HoverDelayNormal_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'HoverDelayNormal', { get: ImGuiStyle.prototype.get_HoverDelayNormal, set: ImGuiStyle.prototype.set_HoverDelayNormal });

ImGuiStyle.prototype['get_HoverFlagsForTooltipMouse'] = ImGuiStyle.prototype.get_HoverFlagsForTooltipMouse = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_HoverFlagsForTooltipMouse_0(self);
};

ImGuiStyle.prototype['set_HoverFlagsForTooltipMouse'] = ImGuiStyle.prototype.set_HoverFlagsForTooltipMouse = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_HoverFlagsForTooltipMouse_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'HoverFlagsForTooltipMouse', { get: ImGuiStyle.prototype.get_HoverFlagsForTooltipMouse, set: ImGuiStyle.prototype.set_HoverFlagsForTooltipMouse });

ImGuiStyle.prototype['get_HoverFlagsForTooltipNav'] = ImGuiStyle.prototype.get_HoverFlagsForTooltipNav = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStyle_get_HoverFlagsForTooltipNav_0(self);
};

ImGuiStyle.prototype['set_HoverFlagsForTooltipNav'] = ImGuiStyle.prototype.set_HoverFlagsForTooltipNav = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStyle_set_HoverFlagsForTooltipNav_1(self, arg0);
};

Object.defineProperty(ImGuiStyle.prototype, 'HoverFlagsForTooltipNav', { get: ImGuiStyle.prototype.get_HoverFlagsForTooltipNav, set: ImGuiStyle.prototype.set_HoverFlagsForTooltipNav });

ImGuiStyle.prototype['get_Colors'] = ImGuiStyle.prototype.get_Colors = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStyle_get_Colors_1(self, arg0), ImVec4);
};

ImGuiStyle.prototype['set_Colors'] = ImGuiStyle.prototype.set_Colors = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_ImGuiStyle_set_Colors_2(self, arg0, arg1);
};

Object.defineProperty(ImGuiStyle.prototype, 'Colors', { get: ImGuiStyle.prototype.get_Colors, set: ImGuiStyle.prototype.set_Colors });

ImGuiStyle.prototype['__destroy__'] = ImGuiStyle.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiStyle___destroy___0(self);
};

function ImGuiViewport() { throw "cannot construct a ImGuiViewport, no constructor in IDL" }
ImGuiViewport.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiViewport.prototype.constructor = ImGuiViewport;
ImGuiViewport.prototype.__class__ = ImGuiViewport;
ImGuiViewport.__cache__ = {};
Module['ImGuiViewport'] = ImGuiViewport;

ImGuiViewport.prototype['get_ID'] = ImGuiViewport.prototype.get_ID = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiViewport_get_ID_0(self);
};

ImGuiViewport.prototype['set_ID'] = ImGuiViewport.prototype.set_ID = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiViewport_set_ID_1(self, arg0);
};

Object.defineProperty(ImGuiViewport.prototype, 'ID', { get: ImGuiViewport.prototype.get_ID, set: ImGuiViewport.prototype.set_ID });

ImGuiViewport.prototype['get_Flags'] = ImGuiViewport.prototype.get_Flags = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiViewport_get_Flags_0(self);
};

ImGuiViewport.prototype['set_Flags'] = ImGuiViewport.prototype.set_Flags = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiViewport_set_Flags_1(self, arg0);
};

Object.defineProperty(ImGuiViewport.prototype, 'Flags', { get: ImGuiViewport.prototype.get_Flags, set: ImGuiViewport.prototype.set_Flags });

ImGuiViewport.prototype['get_Pos'] = ImGuiViewport.prototype.get_Pos = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiViewport_get_Pos_0(self), ImVec2);
};

ImGuiViewport.prototype['set_Pos'] = ImGuiViewport.prototype.set_Pos = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiViewport_set_Pos_1(self, arg0);
};

Object.defineProperty(ImGuiViewport.prototype, 'Pos', { get: ImGuiViewport.prototype.get_Pos, set: ImGuiViewport.prototype.set_Pos });

ImGuiViewport.prototype['get_Size'] = ImGuiViewport.prototype.get_Size = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiViewport_get_Size_0(self), ImVec2);
};

ImGuiViewport.prototype['set_Size'] = ImGuiViewport.prototype.set_Size = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiViewport_set_Size_1(self, arg0);
};

Object.defineProperty(ImGuiViewport.prototype, 'Size', { get: ImGuiViewport.prototype.get_Size, set: ImGuiViewport.prototype.set_Size });

ImGuiViewport.prototype['get_WorkPos'] = ImGuiViewport.prototype.get_WorkPos = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiViewport_get_WorkPos_0(self), ImVec2);
};

ImGuiViewport.prototype['set_WorkPos'] = ImGuiViewport.prototype.set_WorkPos = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiViewport_set_WorkPos_1(self, arg0);
};

Object.defineProperty(ImGuiViewport.prototype, 'WorkPos', { get: ImGuiViewport.prototype.get_WorkPos, set: ImGuiViewport.prototype.set_WorkPos });

ImGuiViewport.prototype['get_WorkSize'] = ImGuiViewport.prototype.get_WorkSize = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiViewport_get_WorkSize_0(self), ImVec2);
};

ImGuiViewport.prototype['set_WorkSize'] = ImGuiViewport.prototype.set_WorkSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiViewport_set_WorkSize_1(self, arg0);
};

Object.defineProperty(ImGuiViewport.prototype, 'WorkSize', { get: ImGuiViewport.prototype.get_WorkSize, set: ImGuiViewport.prototype.set_WorkSize });

ImGuiViewport.prototype['get_DpiScale'] = ImGuiViewport.prototype.get_DpiScale = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiViewport_get_DpiScale_0(self);
};

ImGuiViewport.prototype['set_DpiScale'] = ImGuiViewport.prototype.set_DpiScale = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiViewport_set_DpiScale_1(self, arg0);
};

Object.defineProperty(ImGuiViewport.prototype, 'DpiScale', { get: ImGuiViewport.prototype.get_DpiScale, set: ImGuiViewport.prototype.set_DpiScale });

ImGuiViewport.prototype['get_ParentViewportId'] = ImGuiViewport.prototype.get_ParentViewportId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiViewport_get_ParentViewportId_0(self);
};

ImGuiViewport.prototype['set_ParentViewportId'] = ImGuiViewport.prototype.set_ParentViewportId = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiViewport_set_ParentViewportId_1(self, arg0);
};

Object.defineProperty(ImGuiViewport.prototype, 'ParentViewportId', { get: ImGuiViewport.prototype.get_ParentViewportId, set: ImGuiViewport.prototype.set_ParentViewportId });

ImGuiViewport.prototype['get_DrawData'] = ImGuiViewport.prototype.get_DrawData = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiViewport_get_DrawData_0(self), ImDrawData);
};

ImGuiViewport.prototype['set_DrawData'] = ImGuiViewport.prototype.set_DrawData = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiViewport_set_DrawData_1(self, arg0);
};

Object.defineProperty(ImGuiViewport.prototype, 'DrawData', { get: ImGuiViewport.prototype.get_DrawData, set: ImGuiViewport.prototype.set_DrawData });

ImGuiViewport.prototype['__destroy__'] = ImGuiViewport.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiViewport___destroy___0(self);
};

function ImGuiTableSortSpecs() { throw "cannot construct a ImGuiTableSortSpecs, no constructor in IDL" }
ImGuiTableSortSpecs.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiTableSortSpecs.prototype.constructor = ImGuiTableSortSpecs;
ImGuiTableSortSpecs.prototype.__class__ = ImGuiTableSortSpecs;
ImGuiTableSortSpecs.__cache__ = {};
Module['ImGuiTableSortSpecs'] = ImGuiTableSortSpecs;

ImGuiTableSortSpecs.prototype['__destroy__'] = ImGuiTableSortSpecs.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiTableSortSpecs___destroy___0(self);
};

function ImGuiWindowClass() {
  this.ptr = _emscripten_bind_ImGuiWindowClass_ImGuiWindowClass_0();
  window.idl.getCache(ImGuiWindowClass)[this.ptr] = this;
};

ImGuiWindowClass.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiWindowClass.prototype.constructor = ImGuiWindowClass;
ImGuiWindowClass.prototype.__class__ = ImGuiWindowClass;
ImGuiWindowClass.__cache__ = {};
Module['ImGuiWindowClass'] = ImGuiWindowClass;

ImGuiWindowClass.prototype['get_ClassId'] = ImGuiWindowClass.prototype.get_ClassId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindowClass_get_ClassId_0(self);
};

ImGuiWindowClass.prototype['set_ClassId'] = ImGuiWindowClass.prototype.set_ClassId = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindowClass_set_ClassId_1(self, arg0);
};

Object.defineProperty(ImGuiWindowClass.prototype, 'ClassId', { get: ImGuiWindowClass.prototype.get_ClassId, set: ImGuiWindowClass.prototype.set_ClassId });

ImGuiWindowClass.prototype['get_ParentViewportId'] = ImGuiWindowClass.prototype.get_ParentViewportId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindowClass_get_ParentViewportId_0(self);
};

ImGuiWindowClass.prototype['set_ParentViewportId'] = ImGuiWindowClass.prototype.set_ParentViewportId = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindowClass_set_ParentViewportId_1(self, arg0);
};

Object.defineProperty(ImGuiWindowClass.prototype, 'ParentViewportId', { get: ImGuiWindowClass.prototype.get_ParentViewportId, set: ImGuiWindowClass.prototype.set_ParentViewportId });

ImGuiWindowClass.prototype['get_FocusRouteParentWindowId'] = ImGuiWindowClass.prototype.get_FocusRouteParentWindowId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindowClass_get_FocusRouteParentWindowId_0(self);
};

ImGuiWindowClass.prototype['set_FocusRouteParentWindowId'] = ImGuiWindowClass.prototype.set_FocusRouteParentWindowId = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindowClass_set_FocusRouteParentWindowId_1(self, arg0);
};

Object.defineProperty(ImGuiWindowClass.prototype, 'FocusRouteParentWindowId', { get: ImGuiWindowClass.prototype.get_FocusRouteParentWindowId, set: ImGuiWindowClass.prototype.set_FocusRouteParentWindowId });

ImGuiWindowClass.prototype['get_ViewportFlagsOverrideSet'] = ImGuiWindowClass.prototype.get_ViewportFlagsOverrideSet = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindowClass_get_ViewportFlagsOverrideSet_0(self);
};

ImGuiWindowClass.prototype['set_ViewportFlagsOverrideSet'] = ImGuiWindowClass.prototype.set_ViewportFlagsOverrideSet = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindowClass_set_ViewportFlagsOverrideSet_1(self, arg0);
};

Object.defineProperty(ImGuiWindowClass.prototype, 'ViewportFlagsOverrideSet', { get: ImGuiWindowClass.prototype.get_ViewportFlagsOverrideSet, set: ImGuiWindowClass.prototype.set_ViewportFlagsOverrideSet });

ImGuiWindowClass.prototype['get_ViewportFlagsOverrideClear'] = ImGuiWindowClass.prototype.get_ViewportFlagsOverrideClear = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindowClass_get_ViewportFlagsOverrideClear_0(self);
};

ImGuiWindowClass.prototype['set_ViewportFlagsOverrideClear'] = ImGuiWindowClass.prototype.set_ViewportFlagsOverrideClear = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindowClass_set_ViewportFlagsOverrideClear_1(self, arg0);
};

Object.defineProperty(ImGuiWindowClass.prototype, 'ViewportFlagsOverrideClear', { get: ImGuiWindowClass.prototype.get_ViewportFlagsOverrideClear, set: ImGuiWindowClass.prototype.set_ViewportFlagsOverrideClear });

ImGuiWindowClass.prototype['get_TabItemFlagsOverrideSet'] = ImGuiWindowClass.prototype.get_TabItemFlagsOverrideSet = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindowClass_get_TabItemFlagsOverrideSet_0(self);
};

ImGuiWindowClass.prototype['set_TabItemFlagsOverrideSet'] = ImGuiWindowClass.prototype.set_TabItemFlagsOverrideSet = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindowClass_set_TabItemFlagsOverrideSet_1(self, arg0);
};

Object.defineProperty(ImGuiWindowClass.prototype, 'TabItemFlagsOverrideSet', { get: ImGuiWindowClass.prototype.get_TabItemFlagsOverrideSet, set: ImGuiWindowClass.prototype.set_TabItemFlagsOverrideSet });

ImGuiWindowClass.prototype['get_DockNodeFlagsOverrideSet'] = ImGuiWindowClass.prototype.get_DockNodeFlagsOverrideSet = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindowClass_get_DockNodeFlagsOverrideSet_0(self);
};

ImGuiWindowClass.prototype['set_DockNodeFlagsOverrideSet'] = ImGuiWindowClass.prototype.set_DockNodeFlagsOverrideSet = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindowClass_set_DockNodeFlagsOverrideSet_1(self, arg0);
};

Object.defineProperty(ImGuiWindowClass.prototype, 'DockNodeFlagsOverrideSet', { get: ImGuiWindowClass.prototype.get_DockNodeFlagsOverrideSet, set: ImGuiWindowClass.prototype.set_DockNodeFlagsOverrideSet });

ImGuiWindowClass.prototype['get_DockingAlwaysTabBar'] = ImGuiWindowClass.prototype.get_DockingAlwaysTabBar = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindowClass_get_DockingAlwaysTabBar_0(self));
};

ImGuiWindowClass.prototype['set_DockingAlwaysTabBar'] = ImGuiWindowClass.prototype.set_DockingAlwaysTabBar = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindowClass_set_DockingAlwaysTabBar_1(self, arg0);
};

Object.defineProperty(ImGuiWindowClass.prototype, 'DockingAlwaysTabBar', { get: ImGuiWindowClass.prototype.get_DockingAlwaysTabBar, set: ImGuiWindowClass.prototype.set_DockingAlwaysTabBar });

ImGuiWindowClass.prototype['get_DockingAllowUnclassed'] = ImGuiWindowClass.prototype.get_DockingAllowUnclassed = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindowClass_get_DockingAllowUnclassed_0(self));
};

ImGuiWindowClass.prototype['set_DockingAllowUnclassed'] = ImGuiWindowClass.prototype.set_DockingAllowUnclassed = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindowClass_set_DockingAllowUnclassed_1(self, arg0);
};

Object.defineProperty(ImGuiWindowClass.prototype, 'DockingAllowUnclassed', { get: ImGuiWindowClass.prototype.get_DockingAllowUnclassed, set: ImGuiWindowClass.prototype.set_DockingAllowUnclassed });

ImGuiWindowClass.prototype['__destroy__'] = ImGuiWindowClass.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiWindowClass___destroy___0(self);
};

function ImGuiWindow() { throw "cannot construct a ImGuiWindow, no constructor in IDL" }
ImGuiWindow.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiWindow.prototype.constructor = ImGuiWindow;
ImGuiWindow.prototype.__class__ = ImGuiWindow;
ImGuiWindow.__cache__ = {};
Module['ImGuiWindow'] = ImGuiWindow;

ImGuiWindow.prototype['GetID'] = ImGuiWindow.prototype.GetID = function(str) {
  var self = this.ptr;
  ensureCache.prepare();
  if (str && typeof str === 'object') str = str.ptr;
  else str = ensureString(str);
  return _emscripten_bind_ImGuiWindow_GetID_1(self, str);
};

ImGuiWindow.prototype['GetIDFromRectangle'] = ImGuiWindow.prototype.GetIDFromRectangle = function(r_abs) {
  var self = this.ptr;
  if (r_abs && typeof r_abs === 'object') r_abs = r_abs.ptr;
  return _emscripten_bind_ImGuiWindow_GetIDFromRectangle_1(self, r_abs);
};

ImGuiWindow.prototype['Rect'] = ImGuiWindow.prototype.Rect = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_Rect_0(self), ImRect);
};

ImGuiWindow.prototype['TitleBarRect'] = ImGuiWindow.prototype.TitleBarRect = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_TitleBarRect_0(self), ImRect);
};

ImGuiWindow.prototype['MenuBarRect'] = ImGuiWindow.prototype.MenuBarRect = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_MenuBarRect_0(self), ImRect);
};

ImGuiWindow.prototype['get_IDStack'] = ImGuiWindow.prototype.get_IDStack = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_IDStack_0(self), ImVectorUnsignedInt);
};

Object.defineProperty(ImGuiWindow.prototype, 'IDStack', { get: ImGuiWindow.prototype.get_IDStack });

ImGuiWindow.prototype['get_DC'] = ImGuiWindow.prototype.get_DC = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_DC_0(self), ImGuiWindowTempData);
};

Object.defineProperty(ImGuiWindow.prototype, 'DC', { get: ImGuiWindow.prototype.get_DC });

ImGuiWindow.prototype['get_ID'] = ImGuiWindow.prototype.get_ID = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_ID_0(self);
};

Object.defineProperty(ImGuiWindow.prototype, 'ID', { get: ImGuiWindow.prototype.get_ID });

ImGuiWindow.prototype['get_Flags'] = ImGuiWindow.prototype.get_Flags = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_Flags_0(self);
};

Object.defineProperty(ImGuiWindow.prototype, 'Flags', { get: ImGuiWindow.prototype.get_Flags });

ImGuiWindow.prototype['get_FlagsPreviousFrame'] = ImGuiWindow.prototype.get_FlagsPreviousFrame = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_FlagsPreviousFrame_0(self);
};

Object.defineProperty(ImGuiWindow.prototype, 'FlagsPreviousFrame', { get: ImGuiWindow.prototype.get_FlagsPreviousFrame });

ImGuiWindow.prototype['get_ViewportId'] = ImGuiWindow.prototype.get_ViewportId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_ViewportId_0(self);
};

Object.defineProperty(ImGuiWindow.prototype, 'ViewportId', { get: ImGuiWindow.prototype.get_ViewportId });

ImGuiWindow.prototype['get_ViewportPos'] = ImGuiWindow.prototype.get_ViewportPos = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_ViewportPos_0(self), ImVec2);
};

ImGuiWindow.prototype['set_ViewportPos'] = ImGuiWindow.prototype.set_ViewportPos = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ViewportPos_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ViewportPos', { get: ImGuiWindow.prototype.get_ViewportPos, set: ImGuiWindow.prototype.set_ViewportPos });

ImGuiWindow.prototype['get_ViewportAllowPlatformMonitorExtend'] = ImGuiWindow.prototype.get_ViewportAllowPlatformMonitorExtend = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_ViewportAllowPlatformMonitorExtend_0(self);
};

ImGuiWindow.prototype['set_ViewportAllowPlatformMonitorExtend'] = ImGuiWindow.prototype.set_ViewportAllowPlatformMonitorExtend = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ViewportAllowPlatformMonitorExtend_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ViewportAllowPlatformMonitorExtend', { get: ImGuiWindow.prototype.get_ViewportAllowPlatformMonitorExtend, set: ImGuiWindow.prototype.set_ViewportAllowPlatformMonitorExtend });

ImGuiWindow.prototype['get_Pos'] = ImGuiWindow.prototype.get_Pos = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_Pos_0(self), ImVec2);
};

ImGuiWindow.prototype['set_Pos'] = ImGuiWindow.prototype.set_Pos = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_Pos_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'Pos', { get: ImGuiWindow.prototype.get_Pos, set: ImGuiWindow.prototype.set_Pos });

ImGuiWindow.prototype['get_Size'] = ImGuiWindow.prototype.get_Size = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_Size_0(self), ImVec2);
};

ImGuiWindow.prototype['set_Size'] = ImGuiWindow.prototype.set_Size = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_Size_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'Size', { get: ImGuiWindow.prototype.get_Size, set: ImGuiWindow.prototype.set_Size });

ImGuiWindow.prototype['get_SizeFull'] = ImGuiWindow.prototype.get_SizeFull = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_SizeFull_0(self), ImVec2);
};

ImGuiWindow.prototype['set_SizeFull'] = ImGuiWindow.prototype.set_SizeFull = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_SizeFull_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'SizeFull', { get: ImGuiWindow.prototype.get_SizeFull, set: ImGuiWindow.prototype.set_SizeFull });

ImGuiWindow.prototype['get_ContentSize'] = ImGuiWindow.prototype.get_ContentSize = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_ContentSize_0(self), ImVec2);
};

ImGuiWindow.prototype['set_ContentSize'] = ImGuiWindow.prototype.set_ContentSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ContentSize_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ContentSize', { get: ImGuiWindow.prototype.get_ContentSize, set: ImGuiWindow.prototype.set_ContentSize });

ImGuiWindow.prototype['get_ContentSizeIdeal'] = ImGuiWindow.prototype.get_ContentSizeIdeal = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_ContentSizeIdeal_0(self), ImVec2);
};

ImGuiWindow.prototype['set_ContentSizeIdeal'] = ImGuiWindow.prototype.set_ContentSizeIdeal = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ContentSizeIdeal_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ContentSizeIdeal', { get: ImGuiWindow.prototype.get_ContentSizeIdeal, set: ImGuiWindow.prototype.set_ContentSizeIdeal });

ImGuiWindow.prototype['get_ContentSizeExplicit'] = ImGuiWindow.prototype.get_ContentSizeExplicit = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_ContentSizeExplicit_0(self), ImVec2);
};

ImGuiWindow.prototype['set_ContentSizeExplicit'] = ImGuiWindow.prototype.set_ContentSizeExplicit = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ContentSizeExplicit_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ContentSizeExplicit', { get: ImGuiWindow.prototype.get_ContentSizeExplicit, set: ImGuiWindow.prototype.set_ContentSizeExplicit });

ImGuiWindow.prototype['get_WindowPadding'] = ImGuiWindow.prototype.get_WindowPadding = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_WindowPadding_0(self), ImVec2);
};

ImGuiWindow.prototype['set_WindowPadding'] = ImGuiWindow.prototype.set_WindowPadding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_WindowPadding_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'WindowPadding', { get: ImGuiWindow.prototype.get_WindowPadding, set: ImGuiWindow.prototype.set_WindowPadding });

ImGuiWindow.prototype['get_WindowRounding'] = ImGuiWindow.prototype.get_WindowRounding = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_WindowRounding_0(self);
};

ImGuiWindow.prototype['set_WindowRounding'] = ImGuiWindow.prototype.set_WindowRounding = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_WindowRounding_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'WindowRounding', { get: ImGuiWindow.prototype.get_WindowRounding, set: ImGuiWindow.prototype.set_WindowRounding });

ImGuiWindow.prototype['get_WindowBorderSize'] = ImGuiWindow.prototype.get_WindowBorderSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_WindowBorderSize_0(self);
};

ImGuiWindow.prototype['set_WindowBorderSize'] = ImGuiWindow.prototype.set_WindowBorderSize = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_WindowBorderSize_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'WindowBorderSize', { get: ImGuiWindow.prototype.get_WindowBorderSize, set: ImGuiWindow.prototype.set_WindowBorderSize });

ImGuiWindow.prototype['get_DecoOuterSizeX1'] = ImGuiWindow.prototype.get_DecoOuterSizeX1 = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_DecoOuterSizeX1_0(self);
};

ImGuiWindow.prototype['set_DecoOuterSizeX1'] = ImGuiWindow.prototype.set_DecoOuterSizeX1 = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DecoOuterSizeX1_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DecoOuterSizeX1', { get: ImGuiWindow.prototype.get_DecoOuterSizeX1, set: ImGuiWindow.prototype.set_DecoOuterSizeX1 });

ImGuiWindow.prototype['get_DecoOuterSizeY1'] = ImGuiWindow.prototype.get_DecoOuterSizeY1 = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_DecoOuterSizeY1_0(self);
};

ImGuiWindow.prototype['set_DecoOuterSizeY1'] = ImGuiWindow.prototype.set_DecoOuterSizeY1 = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DecoOuterSizeY1_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DecoOuterSizeY1', { get: ImGuiWindow.prototype.get_DecoOuterSizeY1, set: ImGuiWindow.prototype.set_DecoOuterSizeY1 });

ImGuiWindow.prototype['get_DecoOuterSizeX2'] = ImGuiWindow.prototype.get_DecoOuterSizeX2 = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_DecoOuterSizeX2_0(self);
};

ImGuiWindow.prototype['set_DecoOuterSizeX2'] = ImGuiWindow.prototype.set_DecoOuterSizeX2 = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DecoOuterSizeX2_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DecoOuterSizeX2', { get: ImGuiWindow.prototype.get_DecoOuterSizeX2, set: ImGuiWindow.prototype.set_DecoOuterSizeX2 });

ImGuiWindow.prototype['get_DecoOuterSizeY2'] = ImGuiWindow.prototype.get_DecoOuterSizeY2 = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_DecoOuterSizeY2_0(self);
};

ImGuiWindow.prototype['set_DecoOuterSizeY2'] = ImGuiWindow.prototype.set_DecoOuterSizeY2 = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DecoOuterSizeY2_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DecoOuterSizeY2', { get: ImGuiWindow.prototype.get_DecoOuterSizeY2, set: ImGuiWindow.prototype.set_DecoOuterSizeY2 });

ImGuiWindow.prototype['get_DecoInnerSizeX1'] = ImGuiWindow.prototype.get_DecoInnerSizeX1 = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_DecoInnerSizeX1_0(self);
};

ImGuiWindow.prototype['set_DecoInnerSizeX1'] = ImGuiWindow.prototype.set_DecoInnerSizeX1 = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DecoInnerSizeX1_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DecoInnerSizeX1', { get: ImGuiWindow.prototype.get_DecoInnerSizeX1, set: ImGuiWindow.prototype.set_DecoInnerSizeX1 });

ImGuiWindow.prototype['get_DecoInnerSizeY1'] = ImGuiWindow.prototype.get_DecoInnerSizeY1 = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_DecoInnerSizeY1_0(self);
};

ImGuiWindow.prototype['set_DecoInnerSizeY1'] = ImGuiWindow.prototype.set_DecoInnerSizeY1 = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DecoInnerSizeY1_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DecoInnerSizeY1', { get: ImGuiWindow.prototype.get_DecoInnerSizeY1, set: ImGuiWindow.prototype.set_DecoInnerSizeY1 });

ImGuiWindow.prototype['get_NameBufLen'] = ImGuiWindow.prototype.get_NameBufLen = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_NameBufLen_0(self);
};

ImGuiWindow.prototype['set_NameBufLen'] = ImGuiWindow.prototype.set_NameBufLen = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_NameBufLen_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'NameBufLen', { get: ImGuiWindow.prototype.get_NameBufLen, set: ImGuiWindow.prototype.set_NameBufLen });

ImGuiWindow.prototype['get_MoveId'] = ImGuiWindow.prototype.get_MoveId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_MoveId_0(self);
};

Object.defineProperty(ImGuiWindow.prototype, 'MoveId', { get: ImGuiWindow.prototype.get_MoveId });

ImGuiWindow.prototype['get_TabId'] = ImGuiWindow.prototype.get_TabId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_TabId_0(self);
};

Object.defineProperty(ImGuiWindow.prototype, 'TabId', { get: ImGuiWindow.prototype.get_TabId });

ImGuiWindow.prototype['get_ChildId'] = ImGuiWindow.prototype.get_ChildId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_ChildId_0(self);
};

Object.defineProperty(ImGuiWindow.prototype, 'ChildId', { get: ImGuiWindow.prototype.get_ChildId });

ImGuiWindow.prototype['get_Scroll'] = ImGuiWindow.prototype.get_Scroll = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_Scroll_0(self), ImVec2);
};

ImGuiWindow.prototype['set_Scroll'] = ImGuiWindow.prototype.set_Scroll = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_Scroll_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'Scroll', { get: ImGuiWindow.prototype.get_Scroll, set: ImGuiWindow.prototype.set_Scroll });

ImGuiWindow.prototype['get_ScrollMax'] = ImGuiWindow.prototype.get_ScrollMax = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_ScrollMax_0(self), ImVec2);
};

ImGuiWindow.prototype['set_ScrollMax'] = ImGuiWindow.prototype.set_ScrollMax = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ScrollMax_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ScrollMax', { get: ImGuiWindow.prototype.get_ScrollMax, set: ImGuiWindow.prototype.set_ScrollMax });

ImGuiWindow.prototype['get_ScrollTarget'] = ImGuiWindow.prototype.get_ScrollTarget = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_ScrollTarget_0(self), ImVec2);
};

ImGuiWindow.prototype['set_ScrollTarget'] = ImGuiWindow.prototype.set_ScrollTarget = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ScrollTarget_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ScrollTarget', { get: ImGuiWindow.prototype.get_ScrollTarget, set: ImGuiWindow.prototype.set_ScrollTarget });

ImGuiWindow.prototype['get_ScrollTargetCenterRatio'] = ImGuiWindow.prototype.get_ScrollTargetCenterRatio = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_ScrollTargetCenterRatio_0(self), ImVec2);
};

ImGuiWindow.prototype['set_ScrollTargetCenterRatio'] = ImGuiWindow.prototype.set_ScrollTargetCenterRatio = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ScrollTargetCenterRatio_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ScrollTargetCenterRatio', { get: ImGuiWindow.prototype.get_ScrollTargetCenterRatio, set: ImGuiWindow.prototype.set_ScrollTargetCenterRatio });

ImGuiWindow.prototype['get_ScrollTargetEdgeSnapDist'] = ImGuiWindow.prototype.get_ScrollTargetEdgeSnapDist = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_ScrollTargetEdgeSnapDist_0(self), ImVec2);
};

ImGuiWindow.prototype['set_ScrollTargetEdgeSnapDist'] = ImGuiWindow.prototype.set_ScrollTargetEdgeSnapDist = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ScrollTargetEdgeSnapDist_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ScrollTargetEdgeSnapDist', { get: ImGuiWindow.prototype.get_ScrollTargetEdgeSnapDist, set: ImGuiWindow.prototype.set_ScrollTargetEdgeSnapDist });

ImGuiWindow.prototype['get_ScrollbarSizes'] = ImGuiWindow.prototype.get_ScrollbarSizes = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_ScrollbarSizes_0(self), ImVec2);
};

ImGuiWindow.prototype['set_ScrollbarSizes'] = ImGuiWindow.prototype.set_ScrollbarSizes = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ScrollbarSizes_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ScrollbarSizes', { get: ImGuiWindow.prototype.get_ScrollbarSizes, set: ImGuiWindow.prototype.set_ScrollbarSizes });

ImGuiWindow.prototype['get_ScrollbarX'] = ImGuiWindow.prototype.get_ScrollbarX = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_ScrollbarX_0(self));
};

ImGuiWindow.prototype['set_ScrollbarX'] = ImGuiWindow.prototype.set_ScrollbarX = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ScrollbarX_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ScrollbarX', { get: ImGuiWindow.prototype.get_ScrollbarX, set: ImGuiWindow.prototype.set_ScrollbarX });

ImGuiWindow.prototype['get_ScrollbarY'] = ImGuiWindow.prototype.get_ScrollbarY = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_ScrollbarY_0(self));
};

ImGuiWindow.prototype['set_ScrollbarY'] = ImGuiWindow.prototype.set_ScrollbarY = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ScrollbarY_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ScrollbarY', { get: ImGuiWindow.prototype.get_ScrollbarY, set: ImGuiWindow.prototype.set_ScrollbarY });

ImGuiWindow.prototype['get_ViewportOwned'] = ImGuiWindow.prototype.get_ViewportOwned = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_ViewportOwned_0(self));
};

ImGuiWindow.prototype['set_ViewportOwned'] = ImGuiWindow.prototype.set_ViewportOwned = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_ViewportOwned_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'ViewportOwned', { get: ImGuiWindow.prototype.get_ViewportOwned, set: ImGuiWindow.prototype.set_ViewportOwned });

ImGuiWindow.prototype['get_Active'] = ImGuiWindow.prototype.get_Active = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_Active_0(self));
};

ImGuiWindow.prototype['set_Active'] = ImGuiWindow.prototype.set_Active = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_Active_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'Active', { get: ImGuiWindow.prototype.get_Active, set: ImGuiWindow.prototype.set_Active });

ImGuiWindow.prototype['get_WasActive'] = ImGuiWindow.prototype.get_WasActive = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_WasActive_0(self));
};

ImGuiWindow.prototype['set_WasActive'] = ImGuiWindow.prototype.set_WasActive = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_WasActive_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'WasActive', { get: ImGuiWindow.prototype.get_WasActive, set: ImGuiWindow.prototype.set_WasActive });

ImGuiWindow.prototype['get_WriteAccessed'] = ImGuiWindow.prototype.get_WriteAccessed = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_WriteAccessed_0(self));
};

ImGuiWindow.prototype['set_WriteAccessed'] = ImGuiWindow.prototype.set_WriteAccessed = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_WriteAccessed_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'WriteAccessed', { get: ImGuiWindow.prototype.get_WriteAccessed, set: ImGuiWindow.prototype.set_WriteAccessed });

ImGuiWindow.prototype['get_Collapsed'] = ImGuiWindow.prototype.get_Collapsed = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_Collapsed_0(self));
};

ImGuiWindow.prototype['set_Collapsed'] = ImGuiWindow.prototype.set_Collapsed = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_Collapsed_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'Collapsed', { get: ImGuiWindow.prototype.get_Collapsed, set: ImGuiWindow.prototype.set_Collapsed });

ImGuiWindow.prototype['get_WantCollapseToggle'] = ImGuiWindow.prototype.get_WantCollapseToggle = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_WantCollapseToggle_0(self));
};

ImGuiWindow.prototype['set_WantCollapseToggle'] = ImGuiWindow.prototype.set_WantCollapseToggle = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_WantCollapseToggle_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'WantCollapseToggle', { get: ImGuiWindow.prototype.get_WantCollapseToggle, set: ImGuiWindow.prototype.set_WantCollapseToggle });

ImGuiWindow.prototype['get_SkipItems'] = ImGuiWindow.prototype.get_SkipItems = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_SkipItems_0(self));
};

ImGuiWindow.prototype['set_SkipItems'] = ImGuiWindow.prototype.set_SkipItems = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_SkipItems_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'SkipItems', { get: ImGuiWindow.prototype.get_SkipItems, set: ImGuiWindow.prototype.set_SkipItems });

ImGuiWindow.prototype['get_Appearing'] = ImGuiWindow.prototype.get_Appearing = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_Appearing_0(self));
};

ImGuiWindow.prototype['set_Appearing'] = ImGuiWindow.prototype.set_Appearing = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_Appearing_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'Appearing', { get: ImGuiWindow.prototype.get_Appearing, set: ImGuiWindow.prototype.set_Appearing });

ImGuiWindow.prototype['get_Hidden'] = ImGuiWindow.prototype.get_Hidden = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_Hidden_0(self));
};

ImGuiWindow.prototype['set_Hidden'] = ImGuiWindow.prototype.set_Hidden = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_Hidden_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'Hidden', { get: ImGuiWindow.prototype.get_Hidden, set: ImGuiWindow.prototype.set_Hidden });

ImGuiWindow.prototype['get_IsFallbackWindow'] = ImGuiWindow.prototype.get_IsFallbackWindow = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_IsFallbackWindow_0(self));
};

ImGuiWindow.prototype['set_IsFallbackWindow'] = ImGuiWindow.prototype.set_IsFallbackWindow = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_IsFallbackWindow_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'IsFallbackWindow', { get: ImGuiWindow.prototype.get_IsFallbackWindow, set: ImGuiWindow.prototype.set_IsFallbackWindow });

ImGuiWindow.prototype['get_IsExplicitChild'] = ImGuiWindow.prototype.get_IsExplicitChild = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_IsExplicitChild_0(self));
};

ImGuiWindow.prototype['set_IsExplicitChild'] = ImGuiWindow.prototype.set_IsExplicitChild = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_IsExplicitChild_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'IsExplicitChild', { get: ImGuiWindow.prototype.get_IsExplicitChild, set: ImGuiWindow.prototype.set_IsExplicitChild });

ImGuiWindow.prototype['get_HasCloseButton'] = ImGuiWindow.prototype.get_HasCloseButton = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_HasCloseButton_0(self));
};

ImGuiWindow.prototype['set_HasCloseButton'] = ImGuiWindow.prototype.set_HasCloseButton = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_HasCloseButton_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'HasCloseButton', { get: ImGuiWindow.prototype.get_HasCloseButton, set: ImGuiWindow.prototype.set_HasCloseButton });

ImGuiWindow.prototype['get_StateStorage'] = ImGuiWindow.prototype.get_StateStorage = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_StateStorage_0(self), ImGuiStorage);
};

ImGuiWindow.prototype['set_StateStorage'] = ImGuiWindow.prototype.set_StateStorage = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_StateStorage_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'StateStorage', { get: ImGuiWindow.prototype.get_StateStorage, set: ImGuiWindow.prototype.set_StateStorage });

ImGuiWindow.prototype['get_DrawList'] = ImGuiWindow.prototype.get_DrawList = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_DrawList_0(self), ImDrawList);
};

ImGuiWindow.prototype['set_DrawList'] = ImGuiWindow.prototype.set_DrawList = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DrawList_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DrawList', { get: ImGuiWindow.prototype.get_DrawList, set: ImGuiWindow.prototype.set_DrawList });

ImGuiWindow.prototype['get_DockIsActive'] = ImGuiWindow.prototype.get_DockIsActive = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_DockIsActive_0(self));
};

ImGuiWindow.prototype['set_DockIsActive'] = ImGuiWindow.prototype.set_DockIsActive = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DockIsActive_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DockIsActive', { get: ImGuiWindow.prototype.get_DockIsActive, set: ImGuiWindow.prototype.set_DockIsActive });

ImGuiWindow.prototype['get_DockNodeIsVisible'] = ImGuiWindow.prototype.get_DockNodeIsVisible = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_DockNodeIsVisible_0(self));
};

ImGuiWindow.prototype['set_DockNodeIsVisible'] = ImGuiWindow.prototype.set_DockNodeIsVisible = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DockNodeIsVisible_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DockNodeIsVisible', { get: ImGuiWindow.prototype.get_DockNodeIsVisible, set: ImGuiWindow.prototype.set_DockNodeIsVisible });

ImGuiWindow.prototype['get_DockTabIsVisible'] = ImGuiWindow.prototype.get_DockTabIsVisible = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_DockTabIsVisible_0(self));
};

ImGuiWindow.prototype['set_DockTabIsVisible'] = ImGuiWindow.prototype.set_DockTabIsVisible = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DockTabIsVisible_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DockTabIsVisible', { get: ImGuiWindow.prototype.get_DockTabIsVisible, set: ImGuiWindow.prototype.set_DockTabIsVisible });

ImGuiWindow.prototype['get_DockTabWantClose'] = ImGuiWindow.prototype.get_DockTabWantClose = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiWindow_get_DockTabWantClose_0(self));
};

ImGuiWindow.prototype['set_DockTabWantClose'] = ImGuiWindow.prototype.set_DockTabWantClose = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DockTabWantClose_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DockTabWantClose', { get: ImGuiWindow.prototype.get_DockTabWantClose, set: ImGuiWindow.prototype.set_DockTabWantClose });

ImGuiWindow.prototype['get_DockNode'] = ImGuiWindow.prototype.get_DockNode = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_DockNode_0(self), ImGuiDockNode);
};

ImGuiWindow.prototype['set_DockNode'] = ImGuiWindow.prototype.set_DockNode = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DockNode_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DockNode', { get: ImGuiWindow.prototype.get_DockNode, set: ImGuiWindow.prototype.set_DockNode });

ImGuiWindow.prototype['get_DockNodeAsHost'] = ImGuiWindow.prototype.get_DockNodeAsHost = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiWindow_get_DockNodeAsHost_0(self), ImGuiDockNode);
};

ImGuiWindow.prototype['set_DockNodeAsHost'] = ImGuiWindow.prototype.set_DockNodeAsHost = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DockNodeAsHost_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DockNodeAsHost', { get: ImGuiWindow.prototype.get_DockNodeAsHost, set: ImGuiWindow.prototype.set_DockNodeAsHost });

ImGuiWindow.prototype['get_DockId'] = ImGuiWindow.prototype.get_DockId = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_DockId_0(self);
};

ImGuiWindow.prototype['set_DockId'] = ImGuiWindow.prototype.set_DockId = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_DockId_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'DockId', { get: ImGuiWindow.prototype.get_DockId, set: ImGuiWindow.prototype.set_DockId });

ImGuiWindow.prototype['get_TitleBarHeight'] = ImGuiWindow.prototype.get_TitleBarHeight = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_TitleBarHeight_0(self);
};

ImGuiWindow.prototype['set_TitleBarHeight'] = ImGuiWindow.prototype.set_TitleBarHeight = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_TitleBarHeight_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'TitleBarHeight', { get: ImGuiWindow.prototype.get_TitleBarHeight, set: ImGuiWindow.prototype.set_TitleBarHeight });

ImGuiWindow.prototype['get_MenuBarHeight'] = ImGuiWindow.prototype.get_MenuBarHeight = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiWindow_get_MenuBarHeight_0(self);
};

ImGuiWindow.prototype['set_MenuBarHeight'] = ImGuiWindow.prototype.set_MenuBarHeight = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiWindow_set_MenuBarHeight_1(self, arg0);
};

Object.defineProperty(ImGuiWindow.prototype, 'MenuBarHeight', { get: ImGuiWindow.prototype.get_MenuBarHeight, set: ImGuiWindow.prototype.set_MenuBarHeight });

function ImGuiPayload() { throw "cannot construct a ImGuiPayload, no constructor in IDL" }
ImGuiPayload.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiPayload.prototype.constructor = ImGuiPayload;
ImGuiPayload.prototype.__class__ = ImGuiPayload;
ImGuiPayload.__cache__ = {};
Module['ImGuiPayload'] = ImGuiPayload;

ImGuiPayload.prototype['Clear'] = ImGuiPayload.prototype.Clear = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiPayload_Clear_0(self);
};

ImGuiPayload.prototype['IsDataType'] = ImGuiPayload.prototype.IsDataType = function(type) {
  var self = this.ptr;
  ensureCache.prepare();
  if (type && typeof type === 'object') type = type.ptr;
  else type = ensureString(type);
  return !!(_emscripten_bind_ImGuiPayload_IsDataType_1(self, type));
};

ImGuiPayload.prototype['IsPreview'] = ImGuiPayload.prototype.IsPreview = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiPayload_IsPreview_0(self));
};

ImGuiPayload.prototype['IsDelivery'] = ImGuiPayload.prototype.IsDelivery = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiPayload_IsDelivery_0(self));
};

ImGuiPayload.prototype['get_Data'] = ImGuiPayload.prototype.get_Data = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiPayload_get_Data_0(self);
};

Object.defineProperty(ImGuiPayload.prototype, 'Data', { get: ImGuiPayload.prototype.get_Data });

ImGuiPayload.prototype['get_DataSize'] = ImGuiPayload.prototype.get_DataSize = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiPayload_get_DataSize_0(self);
};

Object.defineProperty(ImGuiPayload.prototype, 'DataSize', { get: ImGuiPayload.prototype.get_DataSize });

ImGuiPayload.prototype['__destroy__'] = ImGuiPayload.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiPayload___destroy___0(self);
};

function ImGuiStoragePair() { throw "cannot construct a ImGuiStoragePair, no constructor in IDL" }
ImGuiStoragePair.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiStoragePair.prototype.constructor = ImGuiStoragePair;
ImGuiStoragePair.prototype.__class__ = ImGuiStoragePair;
ImGuiStoragePair.__cache__ = {};
Module['ImGuiStoragePair'] = ImGuiStoragePair;

ImGuiStoragePair.prototype['get_val_p'] = ImGuiStoragePair.prototype.get_val_p = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiStoragePair_get_val_p_0(self);
};

ImGuiStoragePair.prototype['set_val_p'] = ImGuiStoragePair.prototype.set_val_p = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiStoragePair_set_val_p_1(self, arg0);
};

Object.defineProperty(ImGuiStoragePair.prototype, 'val_p', { get: ImGuiStoragePair.prototype.get_val_p, set: ImGuiStoragePair.prototype.set_val_p });

ImGuiStoragePair.prototype['__destroy__'] = ImGuiStoragePair.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiStoragePair___destroy___0(self);
};

function ImGuiStorage() {
  this.ptr = _emscripten_bind_ImGuiStorage_ImGuiStorage_0();
  window.idl.getCache(ImGuiStorage)[this.ptr] = this;
};

ImGuiStorage.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiStorage.prototype.constructor = ImGuiStorage;
ImGuiStorage.prototype.__class__ = ImGuiStorage;
ImGuiStorage.__cache__ = {};
Module['ImGuiStorage'] = ImGuiStorage;

ImGuiStorage.prototype['Clear'] = ImGuiStorage.prototype.Clear = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiStorage_Clear_0(self);
};

ImGuiStorage.prototype['GetInt'] = ImGuiStorage.prototype.GetInt = function(key, default_val) {
  var self = this.ptr;
  if (key && typeof key === 'object') key = key.ptr;
  if (default_val && typeof default_val === 'object') default_val = default_val.ptr;
  if (default_val === undefined) { return _emscripten_bind_ImGuiStorage_GetInt_1(self, key) }
  return _emscripten_bind_ImGuiStorage_GetInt_2(self, key, default_val);
};

ImGuiStorage.prototype['SetInt'] = ImGuiStorage.prototype.SetInt = function(key, val) {
  var self = this.ptr;
  if (key && typeof key === 'object') key = key.ptr;
  if (val && typeof val === 'object') val = val.ptr;
  _emscripten_bind_ImGuiStorage_SetInt_2(self, key, val);
};

ImGuiStorage.prototype['GetBool'] = ImGuiStorage.prototype.GetBool = function(key, default_val) {
  var self = this.ptr;
  if (key && typeof key === 'object') key = key.ptr;
  if (default_val && typeof default_val === 'object') default_val = default_val.ptr;
  if (default_val === undefined) { return !!(_emscripten_bind_ImGuiStorage_GetBool_1(self, key)) }
  return !!(_emscripten_bind_ImGuiStorage_GetBool_2(self, key, default_val));
};

ImGuiStorage.prototype['SetBool'] = ImGuiStorage.prototype.SetBool = function(key, val) {
  var self = this.ptr;
  if (key && typeof key === 'object') key = key.ptr;
  if (val && typeof val === 'object') val = val.ptr;
  _emscripten_bind_ImGuiStorage_SetBool_2(self, key, val);
};

ImGuiStorage.prototype['GetFloat'] = ImGuiStorage.prototype.GetFloat = function(key, default_val) {
  var self = this.ptr;
  if (key && typeof key === 'object') key = key.ptr;
  if (default_val && typeof default_val === 'object') default_val = default_val.ptr;
  if (default_val === undefined) { return _emscripten_bind_ImGuiStorage_GetFloat_1(self, key) }
  return _emscripten_bind_ImGuiStorage_GetFloat_2(self, key, default_val);
};

ImGuiStorage.prototype['SetFloat'] = ImGuiStorage.prototype.SetFloat = function(key, val) {
  var self = this.ptr;
  if (key && typeof key === 'object') key = key.ptr;
  if (val && typeof val === 'object') val = val.ptr;
  _emscripten_bind_ImGuiStorage_SetFloat_2(self, key, val);
};

ImGuiStorage.prototype['GetVoidPtr'] = ImGuiStorage.prototype.GetVoidPtr = function(key) {
  var self = this.ptr;
  if (key && typeof key === 'object') key = key.ptr;
  return _emscripten_bind_ImGuiStorage_GetVoidPtr_1(self, key);
};

ImGuiStorage.prototype['SetVoidPtr'] = ImGuiStorage.prototype.SetVoidPtr = function(key, val) {
  var self = this.ptr;
  if (key && typeof key === 'object') key = key.ptr;
  if (val && typeof val === 'object') val = val.ptr;
  _emscripten_bind_ImGuiStorage_SetVoidPtr_2(self, key, val);
};

ImGuiStorage.prototype['get_Data'] = ImGuiStorage.prototype.get_Data = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiStorage_get_Data_0(self), ImVectorImGuiStoragePair);
};

Object.defineProperty(ImGuiStorage.prototype, 'Data', { get: ImGuiStorage.prototype.get_Data });

ImGuiStorage.prototype['__destroy__'] = ImGuiStorage.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiStorage___destroy___0(self);
};

function ImGuiPlatformIO() { throw "cannot construct a ImGuiPlatformIO, no constructor in IDL" }
ImGuiPlatformIO.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiPlatformIO.prototype.constructor = ImGuiPlatformIO;
ImGuiPlatformIO.prototype.__class__ = ImGuiPlatformIO;
ImGuiPlatformIO.__cache__ = {};
Module['ImGuiPlatformIO'] = ImGuiPlatformIO;

ImGuiPlatformIO.prototype['get_Textures'] = ImGuiPlatformIO.prototype.get_Textures = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ImGuiPlatformIO_get_Textures_0(self), ImVectorImTextureDataPtr);
};

ImGuiPlatformIO.prototype['set_Textures'] = ImGuiPlatformIO.prototype.set_Textures = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiPlatformIO_set_Textures_1(self, arg0);
};

Object.defineProperty(ImGuiPlatformIO.prototype, 'Textures', { get: ImGuiPlatformIO.prototype.get_Textures, set: ImGuiPlatformIO.prototype.set_Textures });

ImGuiPlatformIO.prototype['__destroy__'] = ImGuiPlatformIO.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiPlatformIO___destroy___0(self);
};

function ClipboardTextFunctionImpl() {
  this.ptr = _emscripten_bind_ClipboardTextFunctionImpl_ClipboardTextFunctionImpl_0();
  window.idl.getCache(ClipboardTextFunctionImpl)[this.ptr] = this;
};

ClipboardTextFunctionImpl.prototype = Object.create(ClipboardTextFunction.prototype);
ClipboardTextFunctionImpl.prototype.constructor = ClipboardTextFunctionImpl;
ClipboardTextFunctionImpl.prototype.__class__ = ClipboardTextFunctionImpl;
ClipboardTextFunctionImpl.__cache__ = {};
Module['ClipboardTextFunctionImpl'] = ClipboardTextFunctionImpl;

ClipboardTextFunctionImpl.prototype['onGetClipboardText'] = ClipboardTextFunctionImpl.prototype.onGetClipboardText = function(strOut) {
  var self = this.ptr;
  if (strOut && typeof strOut === 'object') strOut = strOut.ptr;
  _emscripten_bind_ClipboardTextFunctionImpl_onGetClipboardText_1(self, strOut);
};

ClipboardTextFunctionImpl.prototype['onSetClipboardText'] = ClipboardTextFunctionImpl.prototype.onSetClipboardText = function(text) {
  var self = this.ptr;
  if (text && typeof text === 'object') text = text.ptr;
  _emscripten_bind_ClipboardTextFunctionImpl_onSetClipboardText_1(self, text);
};

ClipboardTextFunctionImpl.prototype['__destroy__'] = ClipboardTextFunctionImpl.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ClipboardTextFunctionImpl___destroy___0(self);
};

function ImGuiMultiSelectIO() { throw "cannot construct a ImGuiMultiSelectIO, no constructor in IDL" }
ImGuiMultiSelectIO.prototype = Object.create(window.idl.WrapperObject.prototype);
ImGuiMultiSelectIO.prototype.constructor = ImGuiMultiSelectIO;
ImGuiMultiSelectIO.prototype.__class__ = ImGuiMultiSelectIO;
ImGuiMultiSelectIO.__cache__ = {};
Module['ImGuiMultiSelectIO'] = ImGuiMultiSelectIO;

ImGuiMultiSelectIO.prototype['get_NavIdSelected'] = ImGuiMultiSelectIO.prototype.get_NavIdSelected = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiMultiSelectIO_get_NavIdSelected_0(self));
};

ImGuiMultiSelectIO.prototype['set_NavIdSelected'] = ImGuiMultiSelectIO.prototype.set_NavIdSelected = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiMultiSelectIO_set_NavIdSelected_1(self, arg0);
};

Object.defineProperty(ImGuiMultiSelectIO.prototype, 'NavIdSelected', { get: ImGuiMultiSelectIO.prototype.get_NavIdSelected, set: ImGuiMultiSelectIO.prototype.set_NavIdSelected });

ImGuiMultiSelectIO.prototype['get_RangeSrcReset'] = ImGuiMultiSelectIO.prototype.get_RangeSrcReset = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ImGuiMultiSelectIO_get_RangeSrcReset_0(self));
};

ImGuiMultiSelectIO.prototype['set_RangeSrcReset'] = ImGuiMultiSelectIO.prototype.set_RangeSrcReset = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiMultiSelectIO_set_RangeSrcReset_1(self, arg0);
};

Object.defineProperty(ImGuiMultiSelectIO.prototype, 'RangeSrcReset', { get: ImGuiMultiSelectIO.prototype.get_RangeSrcReset, set: ImGuiMultiSelectIO.prototype.set_RangeSrcReset });

ImGuiMultiSelectIO.prototype['get_ItemsCount'] = ImGuiMultiSelectIO.prototype.get_ItemsCount = function() {
  var self = this.ptr;
  return _emscripten_bind_ImGuiMultiSelectIO_get_ItemsCount_0(self);
};

ImGuiMultiSelectIO.prototype['set_ItemsCount'] = ImGuiMultiSelectIO.prototype.set_ItemsCount = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_ImGuiMultiSelectIO_set_ItemsCount_1(self, arg0);
};

Object.defineProperty(ImGuiMultiSelectIO.prototype, 'ItemsCount', { get: ImGuiMultiSelectIO.prototype.get_ItemsCount, set: ImGuiMultiSelectIO.prototype.set_ItemsCount });

ImGuiMultiSelectIO.prototype['__destroy__'] = ImGuiMultiSelectIO.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_ImGuiMultiSelectIO___destroy___0(self);
};

function IDLTemp() { throw "cannot construct a IDLTemp, no constructor in IDL" }
IDLTemp.prototype = Object.create(window.idl.WrapperObject.prototype);
IDLTemp.prototype.constructor = IDLTemp;
IDLTemp.prototype.__class__ = IDLTemp;
IDLTemp.__cache__ = {};
Module['IDLTemp'] = IDLTemp;

IDLTemp.prototype['ByteArray_1'] = IDLTemp.prototype.ByteArray_1 = function(dataAddress, size) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_ByteArray_1_2(dataAddress, size), IDLByteArray);
};

IDLTemp.prototype['BoolArray_1'] = IDLTemp.prototype.BoolArray_1 = function(dataAddress, size) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_BoolArray_1_2(dataAddress, size), IDLBoolArray);
};

IDLTemp.prototype['IntArray_1'] = IDLTemp.prototype.IntArray_1 = function(dataAddress, size) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_IntArray_1_2(dataAddress, size), IDLIntArray);
};

IDLTemp.prototype['LongArray_1'] = IDLTemp.prototype.LongArray_1 = function(dataAddress, size) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_LongArray_1_2(dataAddress, size), IDLLongArray);
};

IDLTemp.prototype['FloatArray_1'] = IDLTemp.prototype.FloatArray_1 = function(dataAddress, size) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_FloatArray_1_2(dataAddress, size), IDLFloatArray);
};

IDLTemp.prototype['DoubleArray_1'] = IDLTemp.prototype.DoubleArray_1 = function(dataAddress, size) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_DoubleArray_1_2(dataAddress, size), IDLDoubleArray);
};

IDLTemp.prototype['Byte_1'] = IDLTemp.prototype.Byte_1 = function(dataAddress) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Byte_1_1(dataAddress), IDLByte);
};

IDLTemp.prototype['Bool_1'] = IDLTemp.prototype.Bool_1 = function(dataAddress) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Bool_1_1(dataAddress), IDLBool);
};

IDLTemp.prototype['Int_1'] = IDLTemp.prototype.Int_1 = function(dataAddress) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Int_1_1(dataAddress), IDLInt);
};

IDLTemp.prototype['Long_1'] = IDLTemp.prototype.Long_1 = function(dataAddress) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Long_1_1(dataAddress), IDLLong);
};

IDLTemp.prototype['Float_1'] = IDLTemp.prototype.Float_1 = function(dataAddress) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Float_1_1(dataAddress), IDLFloat);
};

IDLTemp.prototype['Double_1'] = IDLTemp.prototype.Double_1 = function(dataAddress) {
  if (dataAddress && typeof dataAddress === 'object') dataAddress = dataAddress.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Double_1_1(dataAddress), IDLDouble);
};

IDLTemp.prototype['Bool_1__0'] = IDLTemp.prototype.Bool_1__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Bool_1__0_1(value), IDLBool);
};

IDLTemp.prototype['Bool_2__0'] = IDLTemp.prototype.Bool_2__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Bool_2__0_1(value), IDLBool);
};

IDLTemp.prototype['Bool_3__0'] = IDLTemp.prototype.Bool_3__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Bool_3__0_1(value), IDLBool);
};

IDLTemp.prototype['Bool_4__0'] = IDLTemp.prototype.Bool_4__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Bool_4__0_1(value), IDLBool);
};

IDLTemp.prototype['Int_1__0'] = IDLTemp.prototype.Int_1__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Int_1__0_1(value), IDLInt);
};

IDLTemp.prototype['Int_2__0'] = IDLTemp.prototype.Int_2__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Int_2__0_1(value), IDLInt);
};

IDLTemp.prototype['Int_3__0'] = IDLTemp.prototype.Int_3__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Int_3__0_1(value), IDLInt);
};

IDLTemp.prototype['Int_4__0'] = IDLTemp.prototype.Int_4__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Int_4__0_1(value), IDLInt);
};

IDLTemp.prototype['Long_1__0'] = IDLTemp.prototype.Long_1__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Long_1__0_1(value), IDLLong);
};

IDLTemp.prototype['Long_2__0'] = IDLTemp.prototype.Long_2__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Long_2__0_1(value), IDLLong);
};

IDLTemp.prototype['Long_3__0'] = IDLTemp.prototype.Long_3__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Long_3__0_1(value), IDLLong);
};

IDLTemp.prototype['Long_4__0'] = IDLTemp.prototype.Long_4__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Long_4__0_1(value), IDLLong);
};

IDLTemp.prototype['Float_1__0'] = IDLTemp.prototype.Float_1__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Float_1__0_1(value), IDLFloat);
};

IDLTemp.prototype['Float_2__0'] = IDLTemp.prototype.Float_2__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Float_2__0_1(value), IDLFloat);
};

IDLTemp.prototype['Float_3__0'] = IDLTemp.prototype.Float_3__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Float_3__0_1(value), IDLFloat);
};

IDLTemp.prototype['Float_4__0'] = IDLTemp.prototype.Float_4__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Float_4__0_1(value), IDLFloat);
};

IDLTemp.prototype['Double_1__0'] = IDLTemp.prototype.Double_1__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Double_1__0_1(value), IDLDouble);
};

IDLTemp.prototype['Double_2__0'] = IDLTemp.prototype.Double_2__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Double_2__0_1(value), IDLDouble);
};

IDLTemp.prototype['Double_3__0'] = IDLTemp.prototype.Double_3__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Double_3__0_1(value), IDLDouble);
};

IDLTemp.prototype['Double_4__0'] = IDLTemp.prototype.Double_4__0 = function(value) {
  if (value && typeof value === 'object') value = value.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Double_4__0_1(value), IDLDouble);
};

IDLTemp.prototype['Int2_1__0'] = IDLTemp.prototype.Int2_1__0 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Int2_1__0_2(x, y), IDLInt2);
};

IDLTemp.prototype['Int2_2__0'] = IDLTemp.prototype.Int2_2__0 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Int2_2__0_2(x, y), IDLInt2);
};

IDLTemp.prototype['Int3_1__0'] = IDLTemp.prototype.Int3_1__0 = function(x, y, z) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Int3_1__0_3(x, y, z), IDLInt3);
};

IDLTemp.prototype['Int3_2__0'] = IDLTemp.prototype.Int3_2__0 = function(x, y, z) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Int3_2__0_3(x, y, z), IDLInt3);
};

IDLTemp.prototype['Int4_1__0'] = IDLTemp.prototype.Int4_1__0 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Int4_1__0_4(x, y, z, w), IDLInt4);
};

IDLTemp.prototype['Int4_2__0'] = IDLTemp.prototype.Int4_2__0 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Int4_2__0_4(x, y, z, w), IDLInt4);
};

IDLTemp.prototype['Long2_1__0'] = IDLTemp.prototype.Long2_1__0 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Long2_1__0_2(x, y), IDLLong2);
};

IDLTemp.prototype['Long2_2__0'] = IDLTemp.prototype.Long2_2__0 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Long2_2__0_2(x, y), IDLLong2);
};

IDLTemp.prototype['Long3_1__0'] = IDLTemp.prototype.Long3_1__0 = function(x, y, z) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Long3_1__0_3(x, y, z), IDLLong3);
};

IDLTemp.prototype['Long3_2__0'] = IDLTemp.prototype.Long3_2__0 = function(x, y, z) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Long3_2__0_3(x, y, z), IDLLong3);
};

IDLTemp.prototype['Long4_1__0'] = IDLTemp.prototype.Long4_1__0 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Long4_1__0_4(x, y, z, w), IDLLong4);
};

IDLTemp.prototype['Long4_2__0'] = IDLTemp.prototype.Long4_2__0 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Long4_2__0_4(x, y, z, w), IDLLong4);
};

IDLTemp.prototype['Float2_1__0'] = IDLTemp.prototype.Float2_1__0 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Float2_1__0_2(x, y), IDLFloat2);
};

IDLTemp.prototype['Float2_2__0'] = IDLTemp.prototype.Float2_2__0 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Float2_2__0_2(x, y), IDLFloat2);
};

IDLTemp.prototype['Float3_1__0'] = IDLTemp.prototype.Float3_1__0 = function(x, y, z) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Float3_1__0_3(x, y, z), IDLFloat3);
};

IDLTemp.prototype['Float3_2__0'] = IDLTemp.prototype.Float3_2__0 = function(x, y, z) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Float3_2__0_3(x, y, z), IDLFloat3);
};

IDLTemp.prototype['Float4_1__0'] = IDLTemp.prototype.Float4_1__0 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Float4_1__0_4(x, y, z, w), IDLFloat4);
};

IDLTemp.prototype['Float4_2__0'] = IDLTemp.prototype.Float4_2__0 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Float4_2__0_4(x, y, z, w), IDLFloat4);
};

IDLTemp.prototype['Double2_1__0'] = IDLTemp.prototype.Double2_1__0 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Double2_1__0_2(x, y), IDLDouble2);
};

IDLTemp.prototype['Double2_2__0'] = IDLTemp.prototype.Double2_2__0 = function(x, y) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Double2_2__0_2(x, y), IDLDouble2);
};

IDLTemp.prototype['Double3_1__0'] = IDLTemp.prototype.Double3_1__0 = function(x, y, z) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Double3_1__0_3(x, y, z), IDLDouble3);
};

IDLTemp.prototype['Double3_2__0'] = IDLTemp.prototype.Double3_2__0 = function(x, y, z) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Double3_2__0_3(x, y, z), IDLDouble3);
};

IDLTemp.prototype['Double4_1__0'] = IDLTemp.prototype.Double4_1__0 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Double4_1__0_4(x, y, z, w), IDLDouble4);
};

IDLTemp.prototype['Double4_2__0'] = IDLTemp.prototype.Double4_2__0 = function(x, y, z, w) {
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  return wrapPointer(_emscripten_bind_IDLTemp_Double4_2__0_4(x, y, z, w), IDLDouble4);
};

IDLTemp.prototype['__destroy__'] = IDLTemp.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLTemp___destroy___0(self);
};

function IDLString() {
  this.ptr = _emscripten_bind_IDLString_IDLString_0();
  window.idl.getCache(IDLString)[this.ptr] = this;
};

IDLString.prototype = Object.create(window.idl.WrapperObject.prototype);
IDLString.prototype.constructor = IDLString;
IDLString.prototype.__class__ = IDLString;
IDLString.__cache__ = {};
Module['IDLString'] = IDLString;

IDLString.prototype['clear'] = IDLString.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLString_clear_0(self);
};

IDLString.prototype['append'] = IDLString.prototype.append = function(text, size) {
  var self = this.ptr;
  ensureCache.prepare();
  if (text && typeof text === 'object') text = text.ptr;
  else text = ensureString(text);
  if (size && typeof size === 'object') size = size.ptr;
  if (size === undefined) { _emscripten_bind_IDLString_append_1(self, text); return }
  _emscripten_bind_IDLString_append_2(self, text, size);
};

IDLString.prototype['size'] = IDLString.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLString_size_0(self);
};

IDLString.prototype['at'] = IDLString.prototype.at = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_IDLString_at_1(self, index);
};

IDLString.prototype['data'] = IDLString.prototype.data = function() {
  var self = this.ptr;
  return window.idl.UTF8ToString(_emscripten_bind_IDLString_data_0(self));
};

IDLString.prototype['c_str'] = IDLString.prototype.c_str = function() {
  var self = this.ptr;
  return window.idl.UTF8ToString(_emscripten_bind_IDLString_c_str_0(self));
};

IDLString.prototype['__destroy__'] = IDLString.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLString___destroy___0(self);
};

function IDLBool() {
  this.ptr = _emscripten_bind_IDLBool_IDLBool_0();
  window.idl.getCache(IDLBool)[this.ptr] = this;
};

IDLBool.prototype = Object.create(IDLBoolArray.prototype);
IDLBool.prototype.constructor = IDLBool;
IDLBool.prototype.__class__ = IDLBool;
IDLBool.__cache__ = {};
Module['IDLBool'] = IDLBool;

IDLBool.prototype['getValue'] = IDLBool.prototype.getValue = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLBool_getValue_0(self));
};

IDLBool.prototype['set'] = IDLBool.prototype.set = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLBool_set_1(self, value);
};

IDLBool.prototype['clear'] = IDLBool.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLBool_clear_0(self);
};

IDLBool.prototype['getSize'] = IDLBool.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLBool_getSize_0(self);
};

IDLBool.prototype['resize'] = IDLBool.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLBool_resize_1(self, size);
};

IDLBool.prototype['ownsDataAddress'] = IDLBool.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLBool_ownsDataAddress_0(self));
};

IDLBool.prototype['getVoidData'] = IDLBool.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLBool_getVoidData_0(self);
};

IDLBool.prototype['setValue'] = IDLBool.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLBool_setValue_2(self, index, value);
};

IDLBool.prototype['copy'] = IDLBool.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLBool_copy_4(self, src, srcOffset, destOffset, length);
};

IDLBool.prototype['__destroy__'] = IDLBool.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLBool___destroy___0(self);
};

function IDLByte() {
  this.ptr = _emscripten_bind_IDLByte_IDLByte_0();
  window.idl.getCache(IDLByte)[this.ptr] = this;
};

IDLByte.prototype = Object.create(IDLByteArray.prototype);
IDLByte.prototype.constructor = IDLByte;
IDLByte.prototype.__class__ = IDLByte;
IDLByte.__cache__ = {};
Module['IDLByte'] = IDLByte;

IDLByte.prototype['getValue'] = IDLByte.prototype.getValue = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLByte_getValue_0(self);
};

IDLByte.prototype['set'] = IDLByte.prototype.set = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLByte_set_1(self, value);
};

IDLByte.prototype['clear'] = IDLByte.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLByte_clear_0(self);
};

IDLByte.prototype['getSize'] = IDLByte.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLByte_getSize_0(self);
};

IDLByte.prototype['resize'] = IDLByte.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLByte_resize_1(self, size);
};

IDLByte.prototype['ownsDataAddress'] = IDLByte.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLByte_ownsDataAddress_0(self));
};

IDLByte.prototype['getVoidData'] = IDLByte.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLByte_getVoidData_0(self);
};

IDLByte.prototype['setValue'] = IDLByte.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLByte_setValue_2(self, index, value);
};

IDLByte.prototype['copy'] = IDLByte.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLByte_copy_4(self, src, srcOffset, destOffset, length);
};

IDLByte.prototype['__destroy__'] = IDLByte.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLByte___destroy___0(self);
};

function IDLInt() {
  this.ptr = _emscripten_bind_IDLInt_IDLInt_0();
  window.idl.getCache(IDLInt)[this.ptr] = this;
};

IDLInt.prototype = Object.create(IDLIntArray.prototype);
IDLInt.prototype.constructor = IDLInt;
IDLInt.prototype.__class__ = IDLInt;
IDLInt.__cache__ = {};
Module['IDLInt'] = IDLInt;

IDLInt.prototype['getValue'] = IDLInt.prototype.getValue = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt_getValue_0(self);
};

IDLInt.prototype['set'] = IDLInt.prototype.set = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLInt_set_1(self, value);
};

IDLInt.prototype['clear'] = IDLInt.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLInt_clear_0(self);
};

IDLInt.prototype['getSize'] = IDLInt.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt_getSize_0(self);
};

IDLInt.prototype['resize'] = IDLInt.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLInt_resize_1(self, size);
};

IDLInt.prototype['ownsDataAddress'] = IDLInt.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLInt_ownsDataAddress_0(self));
};

IDLInt.prototype['getVoidData'] = IDLInt.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt_getVoidData_0(self);
};

IDLInt.prototype['setValue'] = IDLInt.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLInt_setValue_2(self, index, value);
};

IDLInt.prototype['copy'] = IDLInt.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLInt_copy_4(self, src, srcOffset, destOffset, length);
};

IDLInt.prototype['__destroy__'] = IDLInt.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLInt___destroy___0(self);
};

function IDLInt2() {
  this.ptr = _emscripten_bind_IDLInt2_IDLInt2_0();
  window.idl.getCache(IDLInt2)[this.ptr] = this;
};

IDLInt2.prototype = Object.create(IDLIntArray.prototype);
IDLInt2.prototype.constructor = IDLInt2;
IDLInt2.prototype.__class__ = IDLInt2;
IDLInt2.__cache__ = {};
Module['IDLInt2'] = IDLInt2;

IDLInt2.prototype['set'] = IDLInt2.prototype.set = function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  _emscripten_bind_IDLInt2_set_2(self, x, y);
};

IDLInt2.prototype['getX'] = IDLInt2.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt2_getX_0(self);
};

IDLInt2.prototype['getY'] = IDLInt2.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt2_getY_0(self);
};

IDLInt2.prototype['clear'] = IDLInt2.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLInt2_clear_0(self);
};

IDLInt2.prototype['getSize'] = IDLInt2.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt2_getSize_0(self);
};

IDLInt2.prototype['resize'] = IDLInt2.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLInt2_resize_1(self, size);
};

IDLInt2.prototype['ownsDataAddress'] = IDLInt2.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLInt2_ownsDataAddress_0(self));
};

IDLInt2.prototype['getVoidData'] = IDLInt2.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt2_getVoidData_0(self);
};

IDLInt2.prototype['setValue'] = IDLInt2.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLInt2_setValue_2(self, index, value);
};

IDLInt2.prototype['copy'] = IDLInt2.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLInt2_copy_4(self, src, srcOffset, destOffset, length);
};

IDLInt2.prototype['__destroy__'] = IDLInt2.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLInt2___destroy___0(self);
};

function IDLInt3() {
  this.ptr = _emscripten_bind_IDLInt3_IDLInt3_0();
  window.idl.getCache(IDLInt3)[this.ptr] = this;
};

IDLInt3.prototype = Object.create(IDLIntArray.prototype);
IDLInt3.prototype.constructor = IDLInt3;
IDLInt3.prototype.__class__ = IDLInt3;
IDLInt3.__cache__ = {};
Module['IDLInt3'] = IDLInt3;

IDLInt3.prototype['set'] = IDLInt3.prototype.set = function(x, y, z) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  _emscripten_bind_IDLInt3_set_3(self, x, y, z);
};

IDLInt3.prototype['getX'] = IDLInt3.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt3_getX_0(self);
};

IDLInt3.prototype['getY'] = IDLInt3.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt3_getY_0(self);
};

IDLInt3.prototype['getZ'] = IDLInt3.prototype.getZ = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt3_getZ_0(self);
};

IDLInt3.prototype['clear'] = IDLInt3.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLInt3_clear_0(self);
};

IDLInt3.prototype['getSize'] = IDLInt3.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt3_getSize_0(self);
};

IDLInt3.prototype['resize'] = IDLInt3.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLInt3_resize_1(self, size);
};

IDLInt3.prototype['ownsDataAddress'] = IDLInt3.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLInt3_ownsDataAddress_0(self));
};

IDLInt3.prototype['getVoidData'] = IDLInt3.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt3_getVoidData_0(self);
};

IDLInt3.prototype['setValue'] = IDLInt3.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLInt3_setValue_2(self, index, value);
};

IDLInt3.prototype['copy'] = IDLInt3.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLInt3_copy_4(self, src, srcOffset, destOffset, length);
};

IDLInt3.prototype['__destroy__'] = IDLInt3.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLInt3___destroy___0(self);
};

function IDLInt4() {
  this.ptr = _emscripten_bind_IDLInt4_IDLInt4_0();
  window.idl.getCache(IDLInt4)[this.ptr] = this;
};

IDLInt4.prototype = Object.create(IDLIntArray.prototype);
IDLInt4.prototype.constructor = IDLInt4;
IDLInt4.prototype.__class__ = IDLInt4;
IDLInt4.__cache__ = {};
Module['IDLInt4'] = IDLInt4;

IDLInt4.prototype['set'] = IDLInt4.prototype.set = function(x, y, z, w) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  _emscripten_bind_IDLInt4_set_4(self, x, y, z, w);
};

IDLInt4.prototype['getX'] = IDLInt4.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt4_getX_0(self);
};

IDLInt4.prototype['getY'] = IDLInt4.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt4_getY_0(self);
};

IDLInt4.prototype['getZ'] = IDLInt4.prototype.getZ = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt4_getZ_0(self);
};

IDLInt4.prototype['getW'] = IDLInt4.prototype.getW = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt4_getW_0(self);
};

IDLInt4.prototype['clear'] = IDLInt4.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLInt4_clear_0(self);
};

IDLInt4.prototype['getSize'] = IDLInt4.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt4_getSize_0(self);
};

IDLInt4.prototype['resize'] = IDLInt4.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLInt4_resize_1(self, size);
};

IDLInt4.prototype['ownsDataAddress'] = IDLInt4.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLInt4_ownsDataAddress_0(self));
};

IDLInt4.prototype['getVoidData'] = IDLInt4.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLInt4_getVoidData_0(self);
};

IDLInt4.prototype['setValue'] = IDLInt4.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLInt4_setValue_2(self, index, value);
};

IDLInt4.prototype['copy'] = IDLInt4.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLInt4_copy_4(self, src, srcOffset, destOffset, length);
};

IDLInt4.prototype['__destroy__'] = IDLInt4.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLInt4___destroy___0(self);
};

function IDLLong() {
  this.ptr = _emscripten_bind_IDLLong_IDLLong_0();
  window.idl.getCache(IDLLong)[this.ptr] = this;
};

IDLLong.prototype = Object.create(IDLLongArray.prototype);
IDLLong.prototype.constructor = IDLLong;
IDLLong.prototype.__class__ = IDLLong;
IDLLong.__cache__ = {};
Module['IDLLong'] = IDLLong;

IDLLong.prototype['getValue'] = IDLLong.prototype.getValue = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong_getValue_0(self);
};

IDLLong.prototype['set'] = IDLLong.prototype.set = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLLong_set_1(self, value);
};

IDLLong.prototype['clear'] = IDLLong.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLLong_clear_0(self);
};

IDLLong.prototype['getSize'] = IDLLong.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong_getSize_0(self);
};

IDLLong.prototype['resize'] = IDLLong.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLLong_resize_1(self, size);
};

IDLLong.prototype['ownsDataAddress'] = IDLLong.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLLong_ownsDataAddress_0(self));
};

IDLLong.prototype['getVoidData'] = IDLLong.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong_getVoidData_0(self);
};

IDLLong.prototype['setValue'] = IDLLong.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLLong_setValue_2(self, index, value);
};

IDLLong.prototype['copy'] = IDLLong.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLLong_copy_4(self, src, srcOffset, destOffset, length);
};

IDLLong.prototype['__destroy__'] = IDLLong.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLLong___destroy___0(self);
};

function IDLLong2() {
  this.ptr = _emscripten_bind_IDLLong2_IDLLong2_0();
  window.idl.getCache(IDLLong2)[this.ptr] = this;
};

IDLLong2.prototype = Object.create(IDLLongArray.prototype);
IDLLong2.prototype.constructor = IDLLong2;
IDLLong2.prototype.__class__ = IDLLong2;
IDLLong2.__cache__ = {};
Module['IDLLong2'] = IDLLong2;

IDLLong2.prototype['set'] = IDLLong2.prototype.set = function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  _emscripten_bind_IDLLong2_set_2(self, x, y);
};

IDLLong2.prototype['getX'] = IDLLong2.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong2_getX_0(self);
};

IDLLong2.prototype['getY'] = IDLLong2.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong2_getY_0(self);
};

IDLLong2.prototype['clear'] = IDLLong2.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLLong2_clear_0(self);
};

IDLLong2.prototype['getSize'] = IDLLong2.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong2_getSize_0(self);
};

IDLLong2.prototype['resize'] = IDLLong2.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLLong2_resize_1(self, size);
};

IDLLong2.prototype['ownsDataAddress'] = IDLLong2.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLLong2_ownsDataAddress_0(self));
};

IDLLong2.prototype['getVoidData'] = IDLLong2.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong2_getVoidData_0(self);
};

IDLLong2.prototype['setValue'] = IDLLong2.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLLong2_setValue_2(self, index, value);
};

IDLLong2.prototype['copy'] = IDLLong2.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLLong2_copy_4(self, src, srcOffset, destOffset, length);
};

IDLLong2.prototype['__destroy__'] = IDLLong2.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLLong2___destroy___0(self);
};

function IDLLong3() {
  this.ptr = _emscripten_bind_IDLLong3_IDLLong3_0();
  window.idl.getCache(IDLLong3)[this.ptr] = this;
};

IDLLong3.prototype = Object.create(IDLLongArray.prototype);
IDLLong3.prototype.constructor = IDLLong3;
IDLLong3.prototype.__class__ = IDLLong3;
IDLLong3.__cache__ = {};
Module['IDLLong3'] = IDLLong3;

IDLLong3.prototype['set'] = IDLLong3.prototype.set = function(x, y, z) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  _emscripten_bind_IDLLong3_set_3(self, x, y, z);
};

IDLLong3.prototype['getX'] = IDLLong3.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong3_getX_0(self);
};

IDLLong3.prototype['getY'] = IDLLong3.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong3_getY_0(self);
};

IDLLong3.prototype['getZ'] = IDLLong3.prototype.getZ = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong3_getZ_0(self);
};

IDLLong3.prototype['clear'] = IDLLong3.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLLong3_clear_0(self);
};

IDLLong3.prototype['getSize'] = IDLLong3.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong3_getSize_0(self);
};

IDLLong3.prototype['resize'] = IDLLong3.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLLong3_resize_1(self, size);
};

IDLLong3.prototype['ownsDataAddress'] = IDLLong3.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLLong3_ownsDataAddress_0(self));
};

IDLLong3.prototype['getVoidData'] = IDLLong3.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong3_getVoidData_0(self);
};

IDLLong3.prototype['setValue'] = IDLLong3.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLLong3_setValue_2(self, index, value);
};

IDLLong3.prototype['copy'] = IDLLong3.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLLong3_copy_4(self, src, srcOffset, destOffset, length);
};

IDLLong3.prototype['__destroy__'] = IDLLong3.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLLong3___destroy___0(self);
};

function IDLLong4() {
  this.ptr = _emscripten_bind_IDLLong4_IDLLong4_0();
  window.idl.getCache(IDLLong4)[this.ptr] = this;
};

IDLLong4.prototype = Object.create(IDLLongArray.prototype);
IDLLong4.prototype.constructor = IDLLong4;
IDLLong4.prototype.__class__ = IDLLong4;
IDLLong4.__cache__ = {};
Module['IDLLong4'] = IDLLong4;

IDLLong4.prototype['set'] = IDLLong4.prototype.set = function(x, y, z, w) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  _emscripten_bind_IDLLong4_set_4(self, x, y, z, w);
};

IDLLong4.prototype['getX'] = IDLLong4.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong4_getX_0(self);
};

IDLLong4.prototype['getY'] = IDLLong4.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong4_getY_0(self);
};

IDLLong4.prototype['getZ'] = IDLLong4.prototype.getZ = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong4_getZ_0(self);
};

IDLLong4.prototype['getW'] = IDLLong4.prototype.getW = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong4_getW_0(self);
};

IDLLong4.prototype['clear'] = IDLLong4.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLLong4_clear_0(self);
};

IDLLong4.prototype['getSize'] = IDLLong4.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong4_getSize_0(self);
};

IDLLong4.prototype['resize'] = IDLLong4.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLLong4_resize_1(self, size);
};

IDLLong4.prototype['ownsDataAddress'] = IDLLong4.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLLong4_ownsDataAddress_0(self));
};

IDLLong4.prototype['getVoidData'] = IDLLong4.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLLong4_getVoidData_0(self);
};

IDLLong4.prototype['setValue'] = IDLLong4.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLLong4_setValue_2(self, index, value);
};

IDLLong4.prototype['copy'] = IDLLong4.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLLong4_copy_4(self, src, srcOffset, destOffset, length);
};

IDLLong4.prototype['__destroy__'] = IDLLong4.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLLong4___destroy___0(self);
};

function IDLFloat() {
  this.ptr = _emscripten_bind_IDLFloat_IDLFloat_0();
  window.idl.getCache(IDLFloat)[this.ptr] = this;
};

IDLFloat.prototype = Object.create(IDLFloatArray.prototype);
IDLFloat.prototype.constructor = IDLFloat;
IDLFloat.prototype.__class__ = IDLFloat;
IDLFloat.__cache__ = {};
Module['IDLFloat'] = IDLFloat;

IDLFloat.prototype['getValue'] = IDLFloat.prototype.getValue = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat_getValue_0(self);
};

IDLFloat.prototype['set'] = IDLFloat.prototype.set = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLFloat_set_1(self, value);
};

IDLFloat.prototype['clear'] = IDLFloat.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLFloat_clear_0(self);
};

IDLFloat.prototype['getSize'] = IDLFloat.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat_getSize_0(self);
};

IDLFloat.prototype['resize'] = IDLFloat.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLFloat_resize_1(self, size);
};

IDLFloat.prototype['ownsDataAddress'] = IDLFloat.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLFloat_ownsDataAddress_0(self));
};

IDLFloat.prototype['getVoidData'] = IDLFloat.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat_getVoidData_0(self);
};

IDLFloat.prototype['setValue'] = IDLFloat.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLFloat_setValue_2(self, index, value);
};

IDLFloat.prototype['copy'] = IDLFloat.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLFloat_copy_4(self, src, srcOffset, destOffset, length);
};

IDLFloat.prototype['__destroy__'] = IDLFloat.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLFloat___destroy___0(self);
};

function IDLFloat2() {
  this.ptr = _emscripten_bind_IDLFloat2_IDLFloat2_0();
  window.idl.getCache(IDLFloat2)[this.ptr] = this;
};

IDLFloat2.prototype = Object.create(IDLFloatArray.prototype);
IDLFloat2.prototype.constructor = IDLFloat2;
IDLFloat2.prototype.__class__ = IDLFloat2;
IDLFloat2.__cache__ = {};
Module['IDLFloat2'] = IDLFloat2;

IDLFloat2.prototype['set'] = IDLFloat2.prototype.set = function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  _emscripten_bind_IDLFloat2_set_2(self, x, y);
};

IDLFloat2.prototype['getX'] = IDLFloat2.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat2_getX_0(self);
};

IDLFloat2.prototype['getY'] = IDLFloat2.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat2_getY_0(self);
};

IDLFloat2.prototype['clear'] = IDLFloat2.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLFloat2_clear_0(self);
};

IDLFloat2.prototype['getSize'] = IDLFloat2.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat2_getSize_0(self);
};

IDLFloat2.prototype['resize'] = IDLFloat2.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLFloat2_resize_1(self, size);
};

IDLFloat2.prototype['ownsDataAddress'] = IDLFloat2.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLFloat2_ownsDataAddress_0(self));
};

IDLFloat2.prototype['getVoidData'] = IDLFloat2.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat2_getVoidData_0(self);
};

IDLFloat2.prototype['setValue'] = IDLFloat2.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLFloat2_setValue_2(self, index, value);
};

IDLFloat2.prototype['copy'] = IDLFloat2.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLFloat2_copy_4(self, src, srcOffset, destOffset, length);
};

IDLFloat2.prototype['__destroy__'] = IDLFloat2.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLFloat2___destroy___0(self);
};

function IDLFloat3() {
  this.ptr = _emscripten_bind_IDLFloat3_IDLFloat3_0();
  window.idl.getCache(IDLFloat3)[this.ptr] = this;
};

IDLFloat3.prototype = Object.create(IDLFloatArray.prototype);
IDLFloat3.prototype.constructor = IDLFloat3;
IDLFloat3.prototype.__class__ = IDLFloat3;
IDLFloat3.__cache__ = {};
Module['IDLFloat3'] = IDLFloat3;

IDLFloat3.prototype['set'] = IDLFloat3.prototype.set = function(x, y, z) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  _emscripten_bind_IDLFloat3_set_3(self, x, y, z);
};

IDLFloat3.prototype['getX'] = IDLFloat3.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat3_getX_0(self);
};

IDLFloat3.prototype['getY'] = IDLFloat3.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat3_getY_0(self);
};

IDLFloat3.prototype['getZ'] = IDLFloat3.prototype.getZ = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat3_getZ_0(self);
};

IDLFloat3.prototype['clear'] = IDLFloat3.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLFloat3_clear_0(self);
};

IDLFloat3.prototype['getSize'] = IDLFloat3.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat3_getSize_0(self);
};

IDLFloat3.prototype['resize'] = IDLFloat3.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLFloat3_resize_1(self, size);
};

IDLFloat3.prototype['ownsDataAddress'] = IDLFloat3.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLFloat3_ownsDataAddress_0(self));
};

IDLFloat3.prototype['getVoidData'] = IDLFloat3.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat3_getVoidData_0(self);
};

IDLFloat3.prototype['setValue'] = IDLFloat3.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLFloat3_setValue_2(self, index, value);
};

IDLFloat3.prototype['copy'] = IDLFloat3.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLFloat3_copy_4(self, src, srcOffset, destOffset, length);
};

IDLFloat3.prototype['__destroy__'] = IDLFloat3.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLFloat3___destroy___0(self);
};

function IDLFloat4() {
  this.ptr = _emscripten_bind_IDLFloat4_IDLFloat4_0();
  window.idl.getCache(IDLFloat4)[this.ptr] = this;
};

IDLFloat4.prototype = Object.create(IDLFloatArray.prototype);
IDLFloat4.prototype.constructor = IDLFloat4;
IDLFloat4.prototype.__class__ = IDLFloat4;
IDLFloat4.__cache__ = {};
Module['IDLFloat4'] = IDLFloat4;

IDLFloat4.prototype['set'] = IDLFloat4.prototype.set = function(x, y, z, w) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  _emscripten_bind_IDLFloat4_set_4(self, x, y, z, w);
};

IDLFloat4.prototype['getX'] = IDLFloat4.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat4_getX_0(self);
};

IDLFloat4.prototype['getY'] = IDLFloat4.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat4_getY_0(self);
};

IDLFloat4.prototype['getZ'] = IDLFloat4.prototype.getZ = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat4_getZ_0(self);
};

IDLFloat4.prototype['getW'] = IDLFloat4.prototype.getW = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat4_getW_0(self);
};

IDLFloat4.prototype['clear'] = IDLFloat4.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLFloat4_clear_0(self);
};

IDLFloat4.prototype['getSize'] = IDLFloat4.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat4_getSize_0(self);
};

IDLFloat4.prototype['resize'] = IDLFloat4.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLFloat4_resize_1(self, size);
};

IDLFloat4.prototype['ownsDataAddress'] = IDLFloat4.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLFloat4_ownsDataAddress_0(self));
};

IDLFloat4.prototype['getVoidData'] = IDLFloat4.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLFloat4_getVoidData_0(self);
};

IDLFloat4.prototype['setValue'] = IDLFloat4.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLFloat4_setValue_2(self, index, value);
};

IDLFloat4.prototype['copy'] = IDLFloat4.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLFloat4_copy_4(self, src, srcOffset, destOffset, length);
};

IDLFloat4.prototype['__destroy__'] = IDLFloat4.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLFloat4___destroy___0(self);
};

function IDLDouble() {
  this.ptr = _emscripten_bind_IDLDouble_IDLDouble_0();
  window.idl.getCache(IDLDouble)[this.ptr] = this;
};

IDLDouble.prototype = Object.create(IDLDoubleArray.prototype);
IDLDouble.prototype.constructor = IDLDouble;
IDLDouble.prototype.__class__ = IDLDouble;
IDLDouble.__cache__ = {};
Module['IDLDouble'] = IDLDouble;

IDLDouble.prototype['getValue'] = IDLDouble.prototype.getValue = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble_getValue_0(self);
};

IDLDouble.prototype['set'] = IDLDouble.prototype.set = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLDouble_set_1(self, value);
};

IDLDouble.prototype['clear'] = IDLDouble.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLDouble_clear_0(self);
};

IDLDouble.prototype['getSize'] = IDLDouble.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble_getSize_0(self);
};

IDLDouble.prototype['resize'] = IDLDouble.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLDouble_resize_1(self, size);
};

IDLDouble.prototype['ownsDataAddress'] = IDLDouble.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLDouble_ownsDataAddress_0(self));
};

IDLDouble.prototype['getVoidData'] = IDLDouble.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble_getVoidData_0(self);
};

IDLDouble.prototype['setValue'] = IDLDouble.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLDouble_setValue_2(self, index, value);
};

IDLDouble.prototype['copy'] = IDLDouble.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLDouble_copy_4(self, src, srcOffset, destOffset, length);
};

IDLDouble.prototype['__destroy__'] = IDLDouble.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLDouble___destroy___0(self);
};

function IDLDouble2() {
  this.ptr = _emscripten_bind_IDLDouble2_IDLDouble2_0();
  window.idl.getCache(IDLDouble2)[this.ptr] = this;
};

IDLDouble2.prototype = Object.create(IDLDoubleArray.prototype);
IDLDouble2.prototype.constructor = IDLDouble2;
IDLDouble2.prototype.__class__ = IDLDouble2;
IDLDouble2.__cache__ = {};
Module['IDLDouble2'] = IDLDouble2;

IDLDouble2.prototype['set'] = IDLDouble2.prototype.set = function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  _emscripten_bind_IDLDouble2_set_2(self, x, y);
};

IDLDouble2.prototype['getX'] = IDLDouble2.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble2_getX_0(self);
};

IDLDouble2.prototype['getY'] = IDLDouble2.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble2_getY_0(self);
};

IDLDouble2.prototype['clear'] = IDLDouble2.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLDouble2_clear_0(self);
};

IDLDouble2.prototype['getSize'] = IDLDouble2.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble2_getSize_0(self);
};

IDLDouble2.prototype['resize'] = IDLDouble2.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLDouble2_resize_1(self, size);
};

IDLDouble2.prototype['ownsDataAddress'] = IDLDouble2.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLDouble2_ownsDataAddress_0(self));
};

IDLDouble2.prototype['getVoidData'] = IDLDouble2.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble2_getVoidData_0(self);
};

IDLDouble2.prototype['setValue'] = IDLDouble2.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLDouble2_setValue_2(self, index, value);
};

IDLDouble2.prototype['copy'] = IDLDouble2.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLDouble2_copy_4(self, src, srcOffset, destOffset, length);
};

IDLDouble2.prototype['__destroy__'] = IDLDouble2.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLDouble2___destroy___0(self);
};

function IDLDouble3() {
  this.ptr = _emscripten_bind_IDLDouble3_IDLDouble3_0();
  window.idl.getCache(IDLDouble3)[this.ptr] = this;
};

IDLDouble3.prototype = Object.create(IDLDoubleArray.prototype);
IDLDouble3.prototype.constructor = IDLDouble3;
IDLDouble3.prototype.__class__ = IDLDouble3;
IDLDouble3.__cache__ = {};
Module['IDLDouble3'] = IDLDouble3;

IDLDouble3.prototype['set'] = IDLDouble3.prototype.set = function(x, y, z) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  _emscripten_bind_IDLDouble3_set_3(self, x, y, z);
};

IDLDouble3.prototype['getX'] = IDLDouble3.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble3_getX_0(self);
};

IDLDouble3.prototype['getY'] = IDLDouble3.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble3_getY_0(self);
};

IDLDouble3.prototype['getZ'] = IDLDouble3.prototype.getZ = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble3_getZ_0(self);
};

IDLDouble3.prototype['clear'] = IDLDouble3.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLDouble3_clear_0(self);
};

IDLDouble3.prototype['getSize'] = IDLDouble3.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble3_getSize_0(self);
};

IDLDouble3.prototype['resize'] = IDLDouble3.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLDouble3_resize_1(self, size);
};

IDLDouble3.prototype['ownsDataAddress'] = IDLDouble3.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLDouble3_ownsDataAddress_0(self));
};

IDLDouble3.prototype['getVoidData'] = IDLDouble3.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble3_getVoidData_0(self);
};

IDLDouble3.prototype['setValue'] = IDLDouble3.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLDouble3_setValue_2(self, index, value);
};

IDLDouble3.prototype['copy'] = IDLDouble3.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLDouble3_copy_4(self, src, srcOffset, destOffset, length);
};

IDLDouble3.prototype['__destroy__'] = IDLDouble3.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLDouble3___destroy___0(self);
};

function IDLDouble4() {
  this.ptr = _emscripten_bind_IDLDouble4_IDLDouble4_0();
  window.idl.getCache(IDLDouble4)[this.ptr] = this;
};

IDLDouble4.prototype = Object.create(IDLDoubleArray.prototype);
IDLDouble4.prototype.constructor = IDLDouble4;
IDLDouble4.prototype.__class__ = IDLDouble4;
IDLDouble4.__cache__ = {};
Module['IDLDouble4'] = IDLDouble4;

IDLDouble4.prototype['set'] = IDLDouble4.prototype.set = function(x, y, z, w) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  _emscripten_bind_IDLDouble4_set_4(self, x, y, z, w);
};

IDLDouble4.prototype['getX'] = IDLDouble4.prototype.getX = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble4_getX_0(self);
};

IDLDouble4.prototype['getY'] = IDLDouble4.prototype.getY = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble4_getY_0(self);
};

IDLDouble4.prototype['getZ'] = IDLDouble4.prototype.getZ = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble4_getZ_0(self);
};

IDLDouble4.prototype['getW'] = IDLDouble4.prototype.getW = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble4_getW_0(self);
};

IDLDouble4.prototype['clear'] = IDLDouble4.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_IDLDouble4_clear_0(self);
};

IDLDouble4.prototype['getSize'] = IDLDouble4.prototype.getSize = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble4_getSize_0(self);
};

IDLDouble4.prototype['resize'] = IDLDouble4.prototype.resize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_IDLDouble4_resize_1(self, size);
};

IDLDouble4.prototype['ownsDataAddress'] = IDLDouble4.prototype.ownsDataAddress = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_IDLDouble4_ownsDataAddress_0(self));
};

IDLDouble4.prototype['getVoidData'] = IDLDouble4.prototype.getVoidData = function() {
  var self = this.ptr;
  return _emscripten_bind_IDLDouble4_getVoidData_0(self);
};

IDLDouble4.prototype['setValue'] = IDLDouble4.prototype.setValue = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_IDLDouble4_setValue_2(self, index, value);
};

IDLDouble4.prototype['copy'] = IDLDouble4.prototype.copy = function(src, srcOffset, destOffset, length) {
  var self = this.ptr;
  if (src && typeof src === 'object') src = src.ptr;
  if (srcOffset && typeof srcOffset === 'object') srcOffset = srcOffset.ptr;
  if (destOffset && typeof destOffset === 'object') destOffset = destOffset.ptr;
  if (length && typeof length === 'object') length = length.ptr;
  _emscripten_bind_IDLDouble4_copy_4(self, src, srcOffset, destOffset, length);
};

IDLDouble4.prototype['__destroy__'] = IDLDouble4.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_IDLDouble4___destroy___0(self);
};

(function() {
  function setupEnums() {
    

    Module['ImGuiWindowFlags_None'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_None();

    Module['ImGuiWindowFlags_NoTitleBar'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoTitleBar();

    Module['ImGuiWindowFlags_NoResize'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoResize();

    Module['ImGuiWindowFlags_NoMove'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoMove();

    Module['ImGuiWindowFlags_NoScrollbar'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoScrollbar();

    Module['ImGuiWindowFlags_NoScrollWithMouse'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoScrollWithMouse();

    Module['ImGuiWindowFlags_NoCollapse'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoCollapse();

    Module['ImGuiWindowFlags_AlwaysAutoResize'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_AlwaysAutoResize();

    Module['ImGuiWindowFlags_NoBackground'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoBackground();

    Module['ImGuiWindowFlags_NoSavedSettings'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoSavedSettings();

    Module['ImGuiWindowFlags_NoMouseInputs'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoMouseInputs();

    Module['ImGuiWindowFlags_MenuBar'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_MenuBar();

    Module['ImGuiWindowFlags_HorizontalScrollbar'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_HorizontalScrollbar();

    Module['ImGuiWindowFlags_NoFocusOnAppearing'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoFocusOnAppearing();

    Module['ImGuiWindowFlags_NoBringToFrontOnFocus'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoBringToFrontOnFocus();

    Module['ImGuiWindowFlags_AlwaysVerticalScrollbar'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_AlwaysVerticalScrollbar();

    Module['ImGuiWindowFlags_AlwaysHorizontalScrollbar'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_AlwaysHorizontalScrollbar();

    Module['ImGuiWindowFlags_NoNavInputs'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoNavInputs();

    Module['ImGuiWindowFlags_NoNavFocus'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoNavFocus();

    Module['ImGuiWindowFlags_UnsavedDocument'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_UnsavedDocument();

    Module['ImGuiWindowFlags_NoDocking'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoDocking();

    Module['ImGuiWindowFlags_NoNav'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoNav();

    Module['ImGuiWindowFlags_NoDecoration'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoDecoration();

    Module['ImGuiWindowFlags_NoInputs'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_NoInputs();

    Module['ImGuiWindowFlags_DockNodeHost'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_DockNodeHost();

    Module['ImGuiWindowFlags_ChildWindow'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_ChildWindow();

    Module['ImGuiWindowFlags_Tooltip'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_Tooltip();

    Module['ImGuiWindowFlags_Popup'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_Popup();

    Module['ImGuiWindowFlags_Modal'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_Modal();

    Module['ImGuiWindowFlags_ChildMenu'] = _emscripten_enum_ImGuiWindowFlags_ImGuiWindowFlags_ChildMenu();

    

    Module['ImGuiChildFlags_None'] = _emscripten_enum_ImGuiChildFlags_ImGuiChildFlags_None();

    Module['ImGuiChildFlags_Borders'] = _emscripten_enum_ImGuiChildFlags_ImGuiChildFlags_Borders();

    Module['ImGuiChildFlags_AlwaysUseWindowPadding'] = _emscripten_enum_ImGuiChildFlags_ImGuiChildFlags_AlwaysUseWindowPadding();

    Module['ImGuiChildFlags_ResizeX'] = _emscripten_enum_ImGuiChildFlags_ImGuiChildFlags_ResizeX();

    Module['ImGuiChildFlags_ResizeY'] = _emscripten_enum_ImGuiChildFlags_ImGuiChildFlags_ResizeY();

    Module['ImGuiChildFlags_AutoResizeX'] = _emscripten_enum_ImGuiChildFlags_ImGuiChildFlags_AutoResizeX();

    Module['ImGuiChildFlags_AutoResizeY'] = _emscripten_enum_ImGuiChildFlags_ImGuiChildFlags_AutoResizeY();

    Module['ImGuiChildFlags_AlwaysAutoResize'] = _emscripten_enum_ImGuiChildFlags_ImGuiChildFlags_AlwaysAutoResize();

    Module['ImGuiChildFlags_FrameStyle'] = _emscripten_enum_ImGuiChildFlags_ImGuiChildFlags_FrameStyle();

    Module['ImGuiChildFlags_NavFlattened'] = _emscripten_enum_ImGuiChildFlags_ImGuiChildFlags_NavFlattened();

    

    Module['ImGuiItemFlags_None'] = _emscripten_enum_ImGuiItemFlags_ImGuiItemFlags_None();

    Module['ImGuiItemFlags_NoTabStop'] = _emscripten_enum_ImGuiItemFlags_ImGuiItemFlags_NoTabStop();

    Module['ImGuiItemFlags_NoNav'] = _emscripten_enum_ImGuiItemFlags_ImGuiItemFlags_NoNav();

    Module['ImGuiItemFlags_NoNavDefaultFocus'] = _emscripten_enum_ImGuiItemFlags_ImGuiItemFlags_NoNavDefaultFocus();

    Module['ImGuiItemFlags_ButtonRepeat'] = _emscripten_enum_ImGuiItemFlags_ImGuiItemFlags_ButtonRepeat();

    Module['ImGuiItemFlags_AutoClosePopups'] = _emscripten_enum_ImGuiItemFlags_ImGuiItemFlags_AutoClosePopups();

    Module['ImGuiItemFlags_AllowDuplicateId'] = _emscripten_enum_ImGuiItemFlags_ImGuiItemFlags_AllowDuplicateId();

    

    Module['ImGuiInputTextFlags_None'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_None();

    Module['ImGuiInputTextFlags_CharsDecimal'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CharsDecimal();

    Module['ImGuiInputTextFlags_CharsHexadecimal'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CharsHexadecimal();

    Module['ImGuiInputTextFlags_CharsScientific'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CharsScientific();

    Module['ImGuiInputTextFlags_CharsUppercase'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CharsUppercase();

    Module['ImGuiInputTextFlags_CharsNoBlank'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CharsNoBlank();

    Module['ImGuiInputTextFlags_AllowTabInput'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_AllowTabInput();

    Module['ImGuiInputTextFlags_EnterReturnsTrue'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_EnterReturnsTrue();

    Module['ImGuiInputTextFlags_EscapeClearsAll'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_EscapeClearsAll();

    Module['ImGuiInputTextFlags_CtrlEnterForNewLine'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CtrlEnterForNewLine();

    Module['ImGuiInputTextFlags_ReadOnly'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_ReadOnly();

    Module['ImGuiInputTextFlags_Password'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_Password();

    Module['ImGuiInputTextFlags_AlwaysOverwrite'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_AlwaysOverwrite();

    Module['ImGuiInputTextFlags_AutoSelectAll'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_AutoSelectAll();

    Module['ImGuiInputTextFlags_ParseEmptyRefVal'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_ParseEmptyRefVal();

    Module['ImGuiInputTextFlags_DisplayEmptyRefVal'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_DisplayEmptyRefVal();

    Module['ImGuiInputTextFlags_NoHorizontalScroll'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_NoHorizontalScroll();

    Module['ImGuiInputTextFlags_NoUndoRedo'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_NoUndoRedo();

    Module['ImGuiInputTextFlags_ElideLeft'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_ElideLeft();

    Module['ImGuiInputTextFlags_CallbackCompletion'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CallbackCompletion();

    Module['ImGuiInputTextFlags_CallbackHistory'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CallbackHistory();

    Module['ImGuiInputTextFlags_CallbackAlways'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CallbackAlways();

    Module['ImGuiInputTextFlags_CallbackCharFilter'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CallbackCharFilter();

    Module['ImGuiInputTextFlags_CallbackResize'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CallbackResize();

    Module['ImGuiInputTextFlags_CallbackEdit'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_CallbackEdit();

    Module['ImGuiInputTextFlags_WordWrap'] = _emscripten_enum_ImGuiInputTextFlags_ImGuiInputTextFlags_WordWrap();

    

    Module['ImGuiTreeNodeFlags_None'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_None();

    Module['ImGuiTreeNodeFlags_Selected'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_Selected();

    Module['ImGuiTreeNodeFlags_Framed'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_Framed();

    Module['ImGuiTreeNodeFlags_AllowOverlap'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_AllowOverlap();

    Module['ImGuiTreeNodeFlags_NoTreePushOnOpen'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_NoTreePushOnOpen();

    Module['ImGuiTreeNodeFlags_NoAutoOpenOnLog'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_NoAutoOpenOnLog();

    Module['ImGuiTreeNodeFlags_DefaultOpen'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_DefaultOpen();

    Module['ImGuiTreeNodeFlags_OpenOnDoubleClick'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_OpenOnDoubleClick();

    Module['ImGuiTreeNodeFlags_OpenOnArrow'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_OpenOnArrow();

    Module['ImGuiTreeNodeFlags_Leaf'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_Leaf();

    Module['ImGuiTreeNodeFlags_Bullet'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_Bullet();

    Module['ImGuiTreeNodeFlags_FramePadding'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_FramePadding();

    Module['ImGuiTreeNodeFlags_SpanAvailWidth'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_SpanAvailWidth();

    Module['ImGuiTreeNodeFlags_SpanFullWidth'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_SpanFullWidth();

    Module['ImGuiTreeNodeFlags_SpanLabelWidth'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_SpanLabelWidth();

    Module['ImGuiTreeNodeFlags_SpanAllColumns'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_SpanAllColumns();

    Module['ImGuiTreeNodeFlags_LabelSpanAllColumns'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_LabelSpanAllColumns();

    Module['ImGuiTreeNodeFlags_NavLeftJumpsToParent'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_NavLeftJumpsToParent();

    Module['ImGuiTreeNodeFlags_CollapsingHeader'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_CollapsingHeader();

    Module['ImGuiTreeNodeFlags_DrawLinesNone'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_DrawLinesNone();

    Module['ImGuiTreeNodeFlags_DrawLinesFull'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_DrawLinesFull();

    Module['ImGuiTreeNodeFlags_DrawLinesToNodes'] = _emscripten_enum_ImGuiTreeNodeFlags_ImGuiTreeNodeFlags_DrawLinesToNodes();

    

    Module['ImGuiPopupFlags_None'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_None();

    Module['ImGuiPopupFlags_MouseButtonLeft'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_MouseButtonLeft();

    Module['ImGuiPopupFlags_MouseButtonRight'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_MouseButtonRight();

    Module['ImGuiPopupFlags_MouseButtonMiddle'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_MouseButtonMiddle();

    Module['ImGuiPopupFlags_MouseButtonMask_'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_MouseButtonMask_();

    Module['ImGuiPopupFlags_MouseButtonDefault_'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_MouseButtonDefault_();

    Module['ImGuiPopupFlags_NoReopen'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_NoReopen();

    Module['ImGuiPopupFlags_NoOpenOverExistingPopup'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_NoOpenOverExistingPopup();

    Module['ImGuiPopupFlags_NoOpenOverItems'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_NoOpenOverItems();

    Module['ImGuiPopupFlags_AnyPopupId'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_AnyPopupId();

    Module['ImGuiPopupFlags_AnyPopupLevel'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_AnyPopupLevel();

    Module['ImGuiPopupFlags_AnyPopup'] = _emscripten_enum_ImGuiPopupFlags_ImGuiPopupFlags_AnyPopup();

    

    Module['ImGuiSelectableFlags_None'] = _emscripten_enum_ImGuiSelectableFlags_ImGuiSelectableFlags_None();

    Module['ImGuiSelectableFlags_NoAutoClosePopups'] = _emscripten_enum_ImGuiSelectableFlags_ImGuiSelectableFlags_NoAutoClosePopups();

    Module['ImGuiSelectableFlags_SpanAllColumns'] = _emscripten_enum_ImGuiSelectableFlags_ImGuiSelectableFlags_SpanAllColumns();

    Module['ImGuiSelectableFlags_AllowDoubleClick'] = _emscripten_enum_ImGuiSelectableFlags_ImGuiSelectableFlags_AllowDoubleClick();

    Module['ImGuiSelectableFlags_Disabled'] = _emscripten_enum_ImGuiSelectableFlags_ImGuiSelectableFlags_Disabled();

    Module['ImGuiSelectableFlags_AllowOverlap'] = _emscripten_enum_ImGuiSelectableFlags_ImGuiSelectableFlags_AllowOverlap();

    Module['ImGuiSelectableFlags_Highlight'] = _emscripten_enum_ImGuiSelectableFlags_ImGuiSelectableFlags_Highlight();

    Module['ImGuiSelectableFlags_SelectOnNav'] = _emscripten_enum_ImGuiSelectableFlags_ImGuiSelectableFlags_SelectOnNav();

    

    Module['ImGuiComboFlags_None'] = _emscripten_enum_ImGuiComboFlags_ImGuiComboFlags_None();

    Module['ImGuiComboFlags_PopupAlignLeft'] = _emscripten_enum_ImGuiComboFlags_ImGuiComboFlags_PopupAlignLeft();

    Module['ImGuiComboFlags_HeightSmall'] = _emscripten_enum_ImGuiComboFlags_ImGuiComboFlags_HeightSmall();

    Module['ImGuiComboFlags_HeightRegular'] = _emscripten_enum_ImGuiComboFlags_ImGuiComboFlags_HeightRegular();

    Module['ImGuiComboFlags_HeightLarge'] = _emscripten_enum_ImGuiComboFlags_ImGuiComboFlags_HeightLarge();

    Module['ImGuiComboFlags_HeightLargest'] = _emscripten_enum_ImGuiComboFlags_ImGuiComboFlags_HeightLargest();

    Module['ImGuiComboFlags_NoArrowButton'] = _emscripten_enum_ImGuiComboFlags_ImGuiComboFlags_NoArrowButton();

    Module['ImGuiComboFlags_NoPreview'] = _emscripten_enum_ImGuiComboFlags_ImGuiComboFlags_NoPreview();

    Module['ImGuiComboFlags_WidthFitPreview'] = _emscripten_enum_ImGuiComboFlags_ImGuiComboFlags_WidthFitPreview();

    Module['ImGuiComboFlags_HeightMask_'] = _emscripten_enum_ImGuiComboFlags_ImGuiComboFlags_HeightMask_();

    

    Module['ImGuiTabBarFlags_None'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_None();

    Module['ImGuiTabBarFlags_Reorderable'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_Reorderable();

    Module['ImGuiTabBarFlags_AutoSelectNewTabs'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_AutoSelectNewTabs();

    Module['ImGuiTabBarFlags_TabListPopupButton'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_TabListPopupButton();

    Module['ImGuiTabBarFlags_NoCloseWithMiddleMouseButton'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_NoCloseWithMiddleMouseButton();

    Module['ImGuiTabBarFlags_NoTabListScrollingButtons'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_NoTabListScrollingButtons();

    Module['ImGuiTabBarFlags_NoTooltip'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_NoTooltip();

    Module['ImGuiTabBarFlags_DrawSelectedOverline'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_DrawSelectedOverline();

    Module['ImGuiTabBarFlags_FittingPolicyMixed'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_FittingPolicyMixed();

    Module['ImGuiTabBarFlags_FittingPolicyShrink'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_FittingPolicyShrink();

    Module['ImGuiTabBarFlags_FittingPolicyScroll'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_FittingPolicyScroll();

    Module['ImGuiTabBarFlags_FittingPolicyMask_'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_FittingPolicyMask_();

    Module['ImGuiTabBarFlags_FittingPolicyDefault_'] = _emscripten_enum_ImGuiTabBarFlags_ImGuiTabBarFlags_FittingPolicyDefault_();

    

    Module['ImGuiTabItemFlags_None'] = _emscripten_enum_ImGuiTabItemFlags_ImGuiTabItemFlags_None();

    Module['ImGuiTabItemFlags_UnsavedDocument'] = _emscripten_enum_ImGuiTabItemFlags_ImGuiTabItemFlags_UnsavedDocument();

    Module['ImGuiTabItemFlags_SetSelected'] = _emscripten_enum_ImGuiTabItemFlags_ImGuiTabItemFlags_SetSelected();

    Module['ImGuiTabItemFlags_NoCloseWithMiddleMouseButton'] = _emscripten_enum_ImGuiTabItemFlags_ImGuiTabItemFlags_NoCloseWithMiddleMouseButton();

    Module['ImGuiTabItemFlags_NoPushId'] = _emscripten_enum_ImGuiTabItemFlags_ImGuiTabItemFlags_NoPushId();

    Module['ImGuiTabItemFlags_NoTooltip'] = _emscripten_enum_ImGuiTabItemFlags_ImGuiTabItemFlags_NoTooltip();

    Module['ImGuiTabItemFlags_NoReorder'] = _emscripten_enum_ImGuiTabItemFlags_ImGuiTabItemFlags_NoReorder();

    Module['ImGuiTabItemFlags_Leading'] = _emscripten_enum_ImGuiTabItemFlags_ImGuiTabItemFlags_Leading();

    Module['ImGuiTabItemFlags_Trailing'] = _emscripten_enum_ImGuiTabItemFlags_ImGuiTabItemFlags_Trailing();

    Module['ImGuiTabItemFlags_NoAssumedClosure'] = _emscripten_enum_ImGuiTabItemFlags_ImGuiTabItemFlags_NoAssumedClosure();

    

    Module['ImGuiFocusedFlags_None'] = _emscripten_enum_ImGuiFocusedFlags_ImGuiFocusedFlags_None();

    Module['ImGuiFocusedFlags_ChildWindows'] = _emscripten_enum_ImGuiFocusedFlags_ImGuiFocusedFlags_ChildWindows();

    Module['ImGuiFocusedFlags_RootWindow'] = _emscripten_enum_ImGuiFocusedFlags_ImGuiFocusedFlags_RootWindow();

    Module['ImGuiFocusedFlags_AnyWindow'] = _emscripten_enum_ImGuiFocusedFlags_ImGuiFocusedFlags_AnyWindow();

    Module['ImGuiFocusedFlags_NoPopupHierarchy'] = _emscripten_enum_ImGuiFocusedFlags_ImGuiFocusedFlags_NoPopupHierarchy();

    Module['ImGuiFocusedFlags_DockHierarchy'] = _emscripten_enum_ImGuiFocusedFlags_ImGuiFocusedFlags_DockHierarchy();

    Module['ImGuiFocusedFlags_RootAndChildWindows'] = _emscripten_enum_ImGuiFocusedFlags_ImGuiFocusedFlags_RootAndChildWindows();

    

    Module['ImGuiHoveredFlags_None'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_None();

    Module['ImGuiHoveredFlags_ChildWindows'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_ChildWindows();

    Module['ImGuiHoveredFlags_RootWindow'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_RootWindow();

    Module['ImGuiHoveredFlags_AnyWindow'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_AnyWindow();

    Module['ImGuiHoveredFlags_NoPopupHierarchy'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_NoPopupHierarchy();

    Module['ImGuiHoveredFlags_DockHierarchy'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_DockHierarchy();

    Module['ImGuiHoveredFlags_AllowWhenBlockedByPopup'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_AllowWhenBlockedByPopup();

    Module['ImGuiHoveredFlags_AllowWhenBlockedByActiveItem'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_AllowWhenBlockedByActiveItem();

    Module['ImGuiHoveredFlags_AllowWhenOverlappedByItem'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_AllowWhenOverlappedByItem();

    Module['ImGuiHoveredFlags_AllowWhenOverlappedByWindow'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_AllowWhenOverlappedByWindow();

    Module['ImGuiHoveredFlags_AllowWhenDisabled'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_AllowWhenDisabled();

    Module['ImGuiHoveredFlags_NoNavOverride'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_NoNavOverride();

    Module['ImGuiHoveredFlags_AllowWhenOverlapped'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_AllowWhenOverlapped();

    Module['ImGuiHoveredFlags_RectOnly'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_RectOnly();

    Module['ImGuiHoveredFlags_RootAndChildWindows'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_RootAndChildWindows();

    Module['ImGuiHoveredFlags_ForTooltip'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_ForTooltip();

    Module['ImGuiHoveredFlags_Stationary'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_Stationary();

    Module['ImGuiHoveredFlags_DelayNone'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_DelayNone();

    Module['ImGuiHoveredFlags_DelayShort'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_DelayShort();

    Module['ImGuiHoveredFlags_DelayNormal'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_DelayNormal();

    Module['ImGuiHoveredFlags_NoSharedDelay'] = _emscripten_enum_ImGuiHoveredFlags_ImGuiHoveredFlags_NoSharedDelay();

    

    Module['ImGuiDockNodeFlags_None'] = _emscripten_enum_ImGuiDockNodeFlags_ImGuiDockNodeFlags_None();

    Module['ImGuiDockNodeFlags_KeepAliveOnly'] = _emscripten_enum_ImGuiDockNodeFlags_ImGuiDockNodeFlags_KeepAliveOnly();

    Module['ImGuiDockNodeFlags_NoDockingOverCentralNode'] = _emscripten_enum_ImGuiDockNodeFlags_ImGuiDockNodeFlags_NoDockingOverCentralNode();

    Module['ImGuiDockNodeFlags_PassthruCentralNode'] = _emscripten_enum_ImGuiDockNodeFlags_ImGuiDockNodeFlags_PassthruCentralNode();

    Module['ImGuiDockNodeFlags_NoDockingSplit'] = _emscripten_enum_ImGuiDockNodeFlags_ImGuiDockNodeFlags_NoDockingSplit();

    Module['ImGuiDockNodeFlags_NoResize'] = _emscripten_enum_ImGuiDockNodeFlags_ImGuiDockNodeFlags_NoResize();

    Module['ImGuiDockNodeFlags_AutoHideTabBar'] = _emscripten_enum_ImGuiDockNodeFlags_ImGuiDockNodeFlags_AutoHideTabBar();

    Module['ImGuiDockNodeFlags_NoUndocking'] = _emscripten_enum_ImGuiDockNodeFlags_ImGuiDockNodeFlags_NoUndocking();

    

    Module['ImGuiDragDropFlags_None'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_None();

    Module['ImGuiDragDropFlags_SourceNoPreviewTooltip'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_SourceNoPreviewTooltip();

    Module['ImGuiDragDropFlags_SourceNoDisableHover'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_SourceNoDisableHover();

    Module['ImGuiDragDropFlags_SourceNoHoldToOpenOthers'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_SourceNoHoldToOpenOthers();

    Module['ImGuiDragDropFlags_SourceAllowNullID'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_SourceAllowNullID();

    Module['ImGuiDragDropFlags_SourceExtern'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_SourceExtern();

    Module['ImGuiDragDropFlags_PayloadAutoExpire'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_PayloadAutoExpire();

    Module['ImGuiDragDropFlags_PayloadNoCrossContext'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_PayloadNoCrossContext();

    Module['ImGuiDragDropFlags_PayloadNoCrossProcess'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_PayloadNoCrossProcess();

    Module['ImGuiDragDropFlags_AcceptBeforeDelivery'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_AcceptBeforeDelivery();

    Module['ImGuiDragDropFlags_AcceptNoDrawDefaultRect'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_AcceptNoDrawDefaultRect();

    Module['ImGuiDragDropFlags_AcceptNoPreviewTooltip'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_AcceptNoPreviewTooltip();

    Module['ImGuiDragDropFlags_AcceptPeekOnly'] = _emscripten_enum_ImGuiDragDropFlags_ImGuiDragDropFlags_AcceptPeekOnly();

    

    Module['ImGuiDataType_S8'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_S8();

    Module['ImGuiDataType_U8'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_U8();

    Module['ImGuiDataType_S16'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_S16();

    Module['ImGuiDataType_U16'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_U16();

    Module['ImGuiDataType_S32'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_S32();

    Module['ImGuiDataType_U32'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_U32();

    Module['ImGuiDataType_S64'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_S64();

    Module['ImGuiDataType_U64'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_U64();

    Module['ImGuiDataType_Float'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_Float();

    Module['ImGuiDataType_Double'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_Double();

    Module['ImGuiDataType_Bool'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_Bool();

    Module['ImGuiDataType_String'] = _emscripten_enum_ImGuiDataType_ImGuiDataType_String();

    

    Module['ImGuiDir_None'] = _emscripten_enum_ImGuiDir_ImGuiDir_None();

    Module['ImGuiDir_Left'] = _emscripten_enum_ImGuiDir_ImGuiDir_Left();

    Module['ImGuiDir_Right'] = _emscripten_enum_ImGuiDir_ImGuiDir_Right();

    Module['ImGuiDir_Up'] = _emscripten_enum_ImGuiDir_ImGuiDir_Up();

    Module['ImGuiDir_Down'] = _emscripten_enum_ImGuiDir_ImGuiDir_Down();

    

    Module['ImGuiSortDirection_None'] = _emscripten_enum_ImGuiSortDirection_ImGuiSortDirection_None();

    Module['ImGuiSortDirection_Ascending'] = _emscripten_enum_ImGuiSortDirection_ImGuiSortDirection_Ascending();

    Module['ImGuiSortDirection_Descending'] = _emscripten_enum_ImGuiSortDirection_ImGuiSortDirection_Descending();

    

    Module['ImGuiKey_None'] = _emscripten_enum_ImGuiKey_ImGuiKey_None();

    Module['ImGuiKey_NamedKey_BEGIN'] = _emscripten_enum_ImGuiKey_ImGuiKey_NamedKey_BEGIN();

    Module['ImGuiKey_Tab'] = _emscripten_enum_ImGuiKey_ImGuiKey_Tab();

    Module['ImGuiKey_LeftArrow'] = _emscripten_enum_ImGuiKey_ImGuiKey_LeftArrow();

    Module['ImGuiKey_RightArrow'] = _emscripten_enum_ImGuiKey_ImGuiKey_RightArrow();

    Module['ImGuiKey_UpArrow'] = _emscripten_enum_ImGuiKey_ImGuiKey_UpArrow();

    Module['ImGuiKey_DownArrow'] = _emscripten_enum_ImGuiKey_ImGuiKey_DownArrow();

    Module['ImGuiKey_PageUp'] = _emscripten_enum_ImGuiKey_ImGuiKey_PageUp();

    Module['ImGuiKey_PageDown'] = _emscripten_enum_ImGuiKey_ImGuiKey_PageDown();

    Module['ImGuiKey_Home'] = _emscripten_enum_ImGuiKey_ImGuiKey_Home();

    Module['ImGuiKey_End'] = _emscripten_enum_ImGuiKey_ImGuiKey_End();

    Module['ImGuiKey_Insert'] = _emscripten_enum_ImGuiKey_ImGuiKey_Insert();

    Module['ImGuiKey_Delete'] = _emscripten_enum_ImGuiKey_ImGuiKey_Delete();

    Module['ImGuiKey_Backspace'] = _emscripten_enum_ImGuiKey_ImGuiKey_Backspace();

    Module['ImGuiKey_Space'] = _emscripten_enum_ImGuiKey_ImGuiKey_Space();

    Module['ImGuiKey_Enter'] = _emscripten_enum_ImGuiKey_ImGuiKey_Enter();

    Module['ImGuiKey_Escape'] = _emscripten_enum_ImGuiKey_ImGuiKey_Escape();

    Module['ImGuiKey_LeftCtrl'] = _emscripten_enum_ImGuiKey_ImGuiKey_LeftCtrl();

    Module['ImGuiKey_LeftShift'] = _emscripten_enum_ImGuiKey_ImGuiKey_LeftShift();

    Module['ImGuiKey_LeftAlt'] = _emscripten_enum_ImGuiKey_ImGuiKey_LeftAlt();

    Module['ImGuiKey_LeftSuper'] = _emscripten_enum_ImGuiKey_ImGuiKey_LeftSuper();

    Module['ImGuiKey_RightCtrl'] = _emscripten_enum_ImGuiKey_ImGuiKey_RightCtrl();

    Module['ImGuiKey_RightShift'] = _emscripten_enum_ImGuiKey_ImGuiKey_RightShift();

    Module['ImGuiKey_RightAlt'] = _emscripten_enum_ImGuiKey_ImGuiKey_RightAlt();

    Module['ImGuiKey_RightSuper'] = _emscripten_enum_ImGuiKey_ImGuiKey_RightSuper();

    Module['ImGuiKey_Menu'] = _emscripten_enum_ImGuiKey_ImGuiKey_Menu();

    Module['ImGuiKey_0'] = _emscripten_enum_ImGuiKey_ImGuiKey_0();

    Module['ImGuiKey_1'] = _emscripten_enum_ImGuiKey_ImGuiKey_1();

    Module['ImGuiKey_2'] = _emscripten_enum_ImGuiKey_ImGuiKey_2();

    Module['ImGuiKey_3'] = _emscripten_enum_ImGuiKey_ImGuiKey_3();

    Module['ImGuiKey_4'] = _emscripten_enum_ImGuiKey_ImGuiKey_4();

    Module['ImGuiKey_5'] = _emscripten_enum_ImGuiKey_ImGuiKey_5();

    Module['ImGuiKey_6'] = _emscripten_enum_ImGuiKey_ImGuiKey_6();

    Module['ImGuiKey_7'] = _emscripten_enum_ImGuiKey_ImGuiKey_7();

    Module['ImGuiKey_8'] = _emscripten_enum_ImGuiKey_ImGuiKey_8();

    Module['ImGuiKey_9'] = _emscripten_enum_ImGuiKey_ImGuiKey_9();

    Module['ImGuiKey_A'] = _emscripten_enum_ImGuiKey_ImGuiKey_A();

    Module['ImGuiKey_B'] = _emscripten_enum_ImGuiKey_ImGuiKey_B();

    Module['ImGuiKey_C'] = _emscripten_enum_ImGuiKey_ImGuiKey_C();

    Module['ImGuiKey_D'] = _emscripten_enum_ImGuiKey_ImGuiKey_D();

    Module['ImGuiKey_E'] = _emscripten_enum_ImGuiKey_ImGuiKey_E();

    Module['ImGuiKey_F'] = _emscripten_enum_ImGuiKey_ImGuiKey_F();

    Module['ImGuiKey_G'] = _emscripten_enum_ImGuiKey_ImGuiKey_G();

    Module['ImGuiKey_H'] = _emscripten_enum_ImGuiKey_ImGuiKey_H();

    Module['ImGuiKey_I'] = _emscripten_enum_ImGuiKey_ImGuiKey_I();

    Module['ImGuiKey_J'] = _emscripten_enum_ImGuiKey_ImGuiKey_J();

    Module['ImGuiKey_K'] = _emscripten_enum_ImGuiKey_ImGuiKey_K();

    Module['ImGuiKey_L'] = _emscripten_enum_ImGuiKey_ImGuiKey_L();

    Module['ImGuiKey_M'] = _emscripten_enum_ImGuiKey_ImGuiKey_M();

    Module['ImGuiKey_N'] = _emscripten_enum_ImGuiKey_ImGuiKey_N();

    Module['ImGuiKey_O'] = _emscripten_enum_ImGuiKey_ImGuiKey_O();

    Module['ImGuiKey_P'] = _emscripten_enum_ImGuiKey_ImGuiKey_P();

    Module['ImGuiKey_Q'] = _emscripten_enum_ImGuiKey_ImGuiKey_Q();

    Module['ImGuiKey_R'] = _emscripten_enum_ImGuiKey_ImGuiKey_R();

    Module['ImGuiKey_S'] = _emscripten_enum_ImGuiKey_ImGuiKey_S();

    Module['ImGuiKey_T'] = _emscripten_enum_ImGuiKey_ImGuiKey_T();

    Module['ImGuiKey_U'] = _emscripten_enum_ImGuiKey_ImGuiKey_U();

    Module['ImGuiKey_V'] = _emscripten_enum_ImGuiKey_ImGuiKey_V();

    Module['ImGuiKey_W'] = _emscripten_enum_ImGuiKey_ImGuiKey_W();

    Module['ImGuiKey_X'] = _emscripten_enum_ImGuiKey_ImGuiKey_X();

    Module['ImGuiKey_Y'] = _emscripten_enum_ImGuiKey_ImGuiKey_Y();

    Module['ImGuiKey_Z'] = _emscripten_enum_ImGuiKey_ImGuiKey_Z();

    Module['ImGuiKey_F1'] = _emscripten_enum_ImGuiKey_ImGuiKey_F1();

    Module['ImGuiKey_F2'] = _emscripten_enum_ImGuiKey_ImGuiKey_F2();

    Module['ImGuiKey_F3'] = _emscripten_enum_ImGuiKey_ImGuiKey_F3();

    Module['ImGuiKey_F4'] = _emscripten_enum_ImGuiKey_ImGuiKey_F4();

    Module['ImGuiKey_F5'] = _emscripten_enum_ImGuiKey_ImGuiKey_F5();

    Module['ImGuiKey_F6'] = _emscripten_enum_ImGuiKey_ImGuiKey_F6();

    Module['ImGuiKey_F7'] = _emscripten_enum_ImGuiKey_ImGuiKey_F7();

    Module['ImGuiKey_F8'] = _emscripten_enum_ImGuiKey_ImGuiKey_F8();

    Module['ImGuiKey_F9'] = _emscripten_enum_ImGuiKey_ImGuiKey_F9();

    Module['ImGuiKey_F10'] = _emscripten_enum_ImGuiKey_ImGuiKey_F10();

    Module['ImGuiKey_F11'] = _emscripten_enum_ImGuiKey_ImGuiKey_F11();

    Module['ImGuiKey_F12'] = _emscripten_enum_ImGuiKey_ImGuiKey_F12();

    Module['ImGuiKey_F13'] = _emscripten_enum_ImGuiKey_ImGuiKey_F13();

    Module['ImGuiKey_F14'] = _emscripten_enum_ImGuiKey_ImGuiKey_F14();

    Module['ImGuiKey_F15'] = _emscripten_enum_ImGuiKey_ImGuiKey_F15();

    Module['ImGuiKey_F16'] = _emscripten_enum_ImGuiKey_ImGuiKey_F16();

    Module['ImGuiKey_F17'] = _emscripten_enum_ImGuiKey_ImGuiKey_F17();

    Module['ImGuiKey_F18'] = _emscripten_enum_ImGuiKey_ImGuiKey_F18();

    Module['ImGuiKey_F19'] = _emscripten_enum_ImGuiKey_ImGuiKey_F19();

    Module['ImGuiKey_F20'] = _emscripten_enum_ImGuiKey_ImGuiKey_F20();

    Module['ImGuiKey_F21'] = _emscripten_enum_ImGuiKey_ImGuiKey_F21();

    Module['ImGuiKey_F22'] = _emscripten_enum_ImGuiKey_ImGuiKey_F22();

    Module['ImGuiKey_F23'] = _emscripten_enum_ImGuiKey_ImGuiKey_F23();

    Module['ImGuiKey_F24'] = _emscripten_enum_ImGuiKey_ImGuiKey_F24();

    Module['ImGuiKey_Apostrophe'] = _emscripten_enum_ImGuiKey_ImGuiKey_Apostrophe();

    Module['ImGuiKey_Comma'] = _emscripten_enum_ImGuiKey_ImGuiKey_Comma();

    Module['ImGuiKey_Minus'] = _emscripten_enum_ImGuiKey_ImGuiKey_Minus();

    Module['ImGuiKey_Period'] = _emscripten_enum_ImGuiKey_ImGuiKey_Period();

    Module['ImGuiKey_Slash'] = _emscripten_enum_ImGuiKey_ImGuiKey_Slash();

    Module['ImGuiKey_Semicolon'] = _emscripten_enum_ImGuiKey_ImGuiKey_Semicolon();

    Module['ImGuiKey_Equal'] = _emscripten_enum_ImGuiKey_ImGuiKey_Equal();

    Module['ImGuiKey_LeftBracket'] = _emscripten_enum_ImGuiKey_ImGuiKey_LeftBracket();

    Module['ImGuiKey_Backslash'] = _emscripten_enum_ImGuiKey_ImGuiKey_Backslash();

    Module['ImGuiKey_RightBracket'] = _emscripten_enum_ImGuiKey_ImGuiKey_RightBracket();

    Module['ImGuiKey_GraveAccent'] = _emscripten_enum_ImGuiKey_ImGuiKey_GraveAccent();

    Module['ImGuiKey_CapsLock'] = _emscripten_enum_ImGuiKey_ImGuiKey_CapsLock();

    Module['ImGuiKey_ScrollLock'] = _emscripten_enum_ImGuiKey_ImGuiKey_ScrollLock();

    Module['ImGuiKey_NumLock'] = _emscripten_enum_ImGuiKey_ImGuiKey_NumLock();

    Module['ImGuiKey_PrintScreen'] = _emscripten_enum_ImGuiKey_ImGuiKey_PrintScreen();

    Module['ImGuiKey_Pause'] = _emscripten_enum_ImGuiKey_ImGuiKey_Pause();

    Module['ImGuiKey_Keypad0'] = _emscripten_enum_ImGuiKey_ImGuiKey_Keypad0();

    Module['ImGuiKey_Keypad1'] = _emscripten_enum_ImGuiKey_ImGuiKey_Keypad1();

    Module['ImGuiKey_Keypad2'] = _emscripten_enum_ImGuiKey_ImGuiKey_Keypad2();

    Module['ImGuiKey_Keypad3'] = _emscripten_enum_ImGuiKey_ImGuiKey_Keypad3();

    Module['ImGuiKey_Keypad4'] = _emscripten_enum_ImGuiKey_ImGuiKey_Keypad4();

    Module['ImGuiKey_Keypad5'] = _emscripten_enum_ImGuiKey_ImGuiKey_Keypad5();

    Module['ImGuiKey_Keypad6'] = _emscripten_enum_ImGuiKey_ImGuiKey_Keypad6();

    Module['ImGuiKey_Keypad7'] = _emscripten_enum_ImGuiKey_ImGuiKey_Keypad7();

    Module['ImGuiKey_Keypad8'] = _emscripten_enum_ImGuiKey_ImGuiKey_Keypad8();

    Module['ImGuiKey_Keypad9'] = _emscripten_enum_ImGuiKey_ImGuiKey_Keypad9();

    Module['ImGuiKey_KeypadDecimal'] = _emscripten_enum_ImGuiKey_ImGuiKey_KeypadDecimal();

    Module['ImGuiKey_KeypadDivide'] = _emscripten_enum_ImGuiKey_ImGuiKey_KeypadDivide();

    Module['ImGuiKey_KeypadMultiply'] = _emscripten_enum_ImGuiKey_ImGuiKey_KeypadMultiply();

    Module['ImGuiKey_KeypadSubtract'] = _emscripten_enum_ImGuiKey_ImGuiKey_KeypadSubtract();

    Module['ImGuiKey_KeypadAdd'] = _emscripten_enum_ImGuiKey_ImGuiKey_KeypadAdd();

    Module['ImGuiKey_KeypadEnter'] = _emscripten_enum_ImGuiKey_ImGuiKey_KeypadEnter();

    Module['ImGuiKey_KeypadEqual'] = _emscripten_enum_ImGuiKey_ImGuiKey_KeypadEqual();

    Module['ImGuiKey_AppBack'] = _emscripten_enum_ImGuiKey_ImGuiKey_AppBack();

    Module['ImGuiKey_AppForward'] = _emscripten_enum_ImGuiKey_ImGuiKey_AppForward();

    Module['ImGuiKey_Oem102'] = _emscripten_enum_ImGuiKey_ImGuiKey_Oem102();

    Module['ImGuiKey_GamepadStart'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadStart();

    Module['ImGuiKey_GamepadBack'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadBack();

    Module['ImGuiKey_GamepadFaceLeft'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadFaceLeft();

    Module['ImGuiKey_GamepadFaceRight'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadFaceRight();

    Module['ImGuiKey_GamepadFaceUp'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadFaceUp();

    Module['ImGuiKey_GamepadFaceDown'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadFaceDown();

    Module['ImGuiKey_GamepadDpadLeft'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadDpadLeft();

    Module['ImGuiKey_GamepadDpadRight'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadDpadRight();

    Module['ImGuiKey_GamepadDpadUp'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadDpadUp();

    Module['ImGuiKey_GamepadDpadDown'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadDpadDown();

    Module['ImGuiKey_GamepadL1'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadL1();

    Module['ImGuiKey_GamepadR1'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadR1();

    Module['ImGuiKey_GamepadL2'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadL2();

    Module['ImGuiKey_GamepadR2'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadR2();

    Module['ImGuiKey_GamepadL3'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadL3();

    Module['ImGuiKey_GamepadR3'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadR3();

    Module['ImGuiKey_GamepadLStickLeft'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadLStickLeft();

    Module['ImGuiKey_GamepadLStickRight'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadLStickRight();

    Module['ImGuiKey_GamepadLStickUp'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadLStickUp();

    Module['ImGuiKey_GamepadLStickDown'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadLStickDown();

    Module['ImGuiKey_GamepadRStickLeft'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadRStickLeft();

    Module['ImGuiKey_GamepadRStickRight'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadRStickRight();

    Module['ImGuiKey_GamepadRStickUp'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadRStickUp();

    Module['ImGuiKey_GamepadRStickDown'] = _emscripten_enum_ImGuiKey_ImGuiKey_GamepadRStickDown();

    Module['ImGuiKey_MouseLeft'] = _emscripten_enum_ImGuiKey_ImGuiKey_MouseLeft();

    Module['ImGuiKey_MouseRight'] = _emscripten_enum_ImGuiKey_ImGuiKey_MouseRight();

    Module['ImGuiKey_MouseMiddle'] = _emscripten_enum_ImGuiKey_ImGuiKey_MouseMiddle();

    Module['ImGuiKey_MouseX1'] = _emscripten_enum_ImGuiKey_ImGuiKey_MouseX1();

    Module['ImGuiKey_MouseX2'] = _emscripten_enum_ImGuiKey_ImGuiKey_MouseX2();

    Module['ImGuiKey_MouseWheelX'] = _emscripten_enum_ImGuiKey_ImGuiKey_MouseWheelX();

    Module['ImGuiKey_MouseWheelY'] = _emscripten_enum_ImGuiKey_ImGuiKey_MouseWheelY();

    Module['ImGuiKey_ReservedForModCtrl'] = _emscripten_enum_ImGuiKey_ImGuiKey_ReservedForModCtrl();

    Module['ImGuiKey_ReservedForModShift'] = _emscripten_enum_ImGuiKey_ImGuiKey_ReservedForModShift();

    Module['ImGuiKey_ReservedForModAlt'] = _emscripten_enum_ImGuiKey_ImGuiKey_ReservedForModAlt();

    Module['ImGuiKey_ReservedForModSuper'] = _emscripten_enum_ImGuiKey_ImGuiKey_ReservedForModSuper();

    Module['ImGuiKey_NamedKey_END'] = _emscripten_enum_ImGuiKey_ImGuiKey_NamedKey_END();

    Module['ImGuiMod_None'] = _emscripten_enum_ImGuiKey_ImGuiMod_None();

    Module['ImGuiMod_Ctrl'] = _emscripten_enum_ImGuiKey_ImGuiMod_Ctrl();

    Module['ImGuiMod_Shift'] = _emscripten_enum_ImGuiKey_ImGuiMod_Shift();

    Module['ImGuiMod_Alt'] = _emscripten_enum_ImGuiKey_ImGuiMod_Alt();

    Module['ImGuiMod_Super'] = _emscripten_enum_ImGuiKey_ImGuiMod_Super();

    Module['ImGuiMod_Mask_'] = _emscripten_enum_ImGuiKey_ImGuiMod_Mask_();

    

    Module['ImGuiInputFlags_None'] = _emscripten_enum_ImGuiInputFlags_ImGuiInputFlags_None();

    Module['ImGuiInputFlags_Repeat'] = _emscripten_enum_ImGuiInputFlags_ImGuiInputFlags_Repeat();

    Module['ImGuiInputFlags_RouteActive'] = _emscripten_enum_ImGuiInputFlags_ImGuiInputFlags_RouteActive();

    Module['ImGuiInputFlags_RouteFocused'] = _emscripten_enum_ImGuiInputFlags_ImGuiInputFlags_RouteFocused();

    Module['ImGuiInputFlags_RouteGlobal'] = _emscripten_enum_ImGuiInputFlags_ImGuiInputFlags_RouteGlobal();

    Module['ImGuiInputFlags_RouteAlways'] = _emscripten_enum_ImGuiInputFlags_ImGuiInputFlags_RouteAlways();

    Module['ImGuiInputFlags_RouteOverFocused'] = _emscripten_enum_ImGuiInputFlags_ImGuiInputFlags_RouteOverFocused();

    Module['ImGuiInputFlags_RouteOverActive'] = _emscripten_enum_ImGuiInputFlags_ImGuiInputFlags_RouteOverActive();

    Module['ImGuiInputFlags_RouteUnlessBgFocused'] = _emscripten_enum_ImGuiInputFlags_ImGuiInputFlags_RouteUnlessBgFocused();

    Module['ImGuiInputFlags_RouteFromRootWindow'] = _emscripten_enum_ImGuiInputFlags_ImGuiInputFlags_RouteFromRootWindow();

    Module['ImGuiInputFlags_Tooltip'] = _emscripten_enum_ImGuiInputFlags_ImGuiInputFlags_Tooltip();

    

    Module['ImGuiConfigFlags_None'] = _emscripten_enum_ImGuiConfigFlags_ImGuiConfigFlags_None();

    Module['ImGuiConfigFlags_NavEnableKeyboard'] = _emscripten_enum_ImGuiConfigFlags_ImGuiConfigFlags_NavEnableKeyboard();

    Module['ImGuiConfigFlags_NavEnableGamepad'] = _emscripten_enum_ImGuiConfigFlags_ImGuiConfigFlags_NavEnableGamepad();

    Module['ImGuiConfigFlags_NoMouse'] = _emscripten_enum_ImGuiConfigFlags_ImGuiConfigFlags_NoMouse();

    Module['ImGuiConfigFlags_NoMouseCursorChange'] = _emscripten_enum_ImGuiConfigFlags_ImGuiConfigFlags_NoMouseCursorChange();

    Module['ImGuiConfigFlags_NoKeyboard'] = _emscripten_enum_ImGuiConfigFlags_ImGuiConfigFlags_NoKeyboard();

    Module['ImGuiConfigFlags_DockingEnable'] = _emscripten_enum_ImGuiConfigFlags_ImGuiConfigFlags_DockingEnable();

    Module['ImGuiConfigFlags_ViewportsEnable'] = _emscripten_enum_ImGuiConfigFlags_ImGuiConfigFlags_ViewportsEnable();

    Module['ImGuiConfigFlags_IsSRGB'] = _emscripten_enum_ImGuiConfigFlags_ImGuiConfigFlags_IsSRGB();

    Module['ImGuiConfigFlags_IsTouchScreen'] = _emscripten_enum_ImGuiConfigFlags_ImGuiConfigFlags_IsTouchScreen();

    

    Module['ImGuiBackendFlags_None'] = _emscripten_enum_ImGuiBackendFlags_ImGuiBackendFlags_None();

    Module['ImGuiBackendFlags_HasGamepad'] = _emscripten_enum_ImGuiBackendFlags_ImGuiBackendFlags_HasGamepad();

    Module['ImGuiBackendFlags_HasMouseCursors'] = _emscripten_enum_ImGuiBackendFlags_ImGuiBackendFlags_HasMouseCursors();

    Module['ImGuiBackendFlags_HasSetMousePos'] = _emscripten_enum_ImGuiBackendFlags_ImGuiBackendFlags_HasSetMousePos();

    Module['ImGuiBackendFlags_RendererHasVtxOffset'] = _emscripten_enum_ImGuiBackendFlags_ImGuiBackendFlags_RendererHasVtxOffset();

    Module['ImGuiBackendFlags_RendererHasTextures'] = _emscripten_enum_ImGuiBackendFlags_ImGuiBackendFlags_RendererHasTextures();

    Module['ImGuiBackendFlags_RendererHasViewports'] = _emscripten_enum_ImGuiBackendFlags_ImGuiBackendFlags_RendererHasViewports();

    Module['ImGuiBackendFlags_PlatformHasViewports'] = _emscripten_enum_ImGuiBackendFlags_ImGuiBackendFlags_PlatformHasViewports();

    Module['ImGuiBackendFlags_HasMouseHoveredViewport'] = _emscripten_enum_ImGuiBackendFlags_ImGuiBackendFlags_HasMouseHoveredViewport();

    Module['ImGuiBackendFlags_HasParentViewport'] = _emscripten_enum_ImGuiBackendFlags_ImGuiBackendFlags_HasParentViewport();

    

    Module['ImGuiCol_Text'] = _emscripten_enum_ImGuiCol_ImGuiCol_Text();

    Module['ImGuiCol_TextDisabled'] = _emscripten_enum_ImGuiCol_ImGuiCol_TextDisabled();

    Module['ImGuiCol_WindowBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_WindowBg();

    Module['ImGuiCol_ChildBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_ChildBg();

    Module['ImGuiCol_PopupBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_PopupBg();

    Module['ImGuiCol_Border'] = _emscripten_enum_ImGuiCol_ImGuiCol_Border();

    Module['ImGuiCol_BorderShadow'] = _emscripten_enum_ImGuiCol_ImGuiCol_BorderShadow();

    Module['ImGuiCol_FrameBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_FrameBg();

    Module['ImGuiCol_FrameBgHovered'] = _emscripten_enum_ImGuiCol_ImGuiCol_FrameBgHovered();

    Module['ImGuiCol_FrameBgActive'] = _emscripten_enum_ImGuiCol_ImGuiCol_FrameBgActive();

    Module['ImGuiCol_TitleBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_TitleBg();

    Module['ImGuiCol_TitleBgActive'] = _emscripten_enum_ImGuiCol_ImGuiCol_TitleBgActive();

    Module['ImGuiCol_TitleBgCollapsed'] = _emscripten_enum_ImGuiCol_ImGuiCol_TitleBgCollapsed();

    Module['ImGuiCol_MenuBarBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_MenuBarBg();

    Module['ImGuiCol_ScrollbarBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_ScrollbarBg();

    Module['ImGuiCol_ScrollbarGrab'] = _emscripten_enum_ImGuiCol_ImGuiCol_ScrollbarGrab();

    Module['ImGuiCol_ScrollbarGrabHovered'] = _emscripten_enum_ImGuiCol_ImGuiCol_ScrollbarGrabHovered();

    Module['ImGuiCol_ScrollbarGrabActive'] = _emscripten_enum_ImGuiCol_ImGuiCol_ScrollbarGrabActive();

    Module['ImGuiCol_CheckMark'] = _emscripten_enum_ImGuiCol_ImGuiCol_CheckMark();

    Module['ImGuiCol_SliderGrab'] = _emscripten_enum_ImGuiCol_ImGuiCol_SliderGrab();

    Module['ImGuiCol_SliderGrabActive'] = _emscripten_enum_ImGuiCol_ImGuiCol_SliderGrabActive();

    Module['ImGuiCol_Button'] = _emscripten_enum_ImGuiCol_ImGuiCol_Button();

    Module['ImGuiCol_ButtonHovered'] = _emscripten_enum_ImGuiCol_ImGuiCol_ButtonHovered();

    Module['ImGuiCol_ButtonActive'] = _emscripten_enum_ImGuiCol_ImGuiCol_ButtonActive();

    Module['ImGuiCol_Header'] = _emscripten_enum_ImGuiCol_ImGuiCol_Header();

    Module['ImGuiCol_HeaderHovered'] = _emscripten_enum_ImGuiCol_ImGuiCol_HeaderHovered();

    Module['ImGuiCol_HeaderActive'] = _emscripten_enum_ImGuiCol_ImGuiCol_HeaderActive();

    Module['ImGuiCol_Separator'] = _emscripten_enum_ImGuiCol_ImGuiCol_Separator();

    Module['ImGuiCol_SeparatorHovered'] = _emscripten_enum_ImGuiCol_ImGuiCol_SeparatorHovered();

    Module['ImGuiCol_SeparatorActive'] = _emscripten_enum_ImGuiCol_ImGuiCol_SeparatorActive();

    Module['ImGuiCol_ResizeGrip'] = _emscripten_enum_ImGuiCol_ImGuiCol_ResizeGrip();

    Module['ImGuiCol_ResizeGripHovered'] = _emscripten_enum_ImGuiCol_ImGuiCol_ResizeGripHovered();

    Module['ImGuiCol_ResizeGripActive'] = _emscripten_enum_ImGuiCol_ImGuiCol_ResizeGripActive();

    Module['ImGuiCol_InputTextCursor'] = _emscripten_enum_ImGuiCol_ImGuiCol_InputTextCursor();

    Module['ImGuiCol_TabHovered'] = _emscripten_enum_ImGuiCol_ImGuiCol_TabHovered();

    Module['ImGuiCol_Tab'] = _emscripten_enum_ImGuiCol_ImGuiCol_Tab();

    Module['ImGuiCol_TabSelected'] = _emscripten_enum_ImGuiCol_ImGuiCol_TabSelected();

    Module['ImGuiCol_TabSelectedOverline'] = _emscripten_enum_ImGuiCol_ImGuiCol_TabSelectedOverline();

    Module['ImGuiCol_TabDimmed'] = _emscripten_enum_ImGuiCol_ImGuiCol_TabDimmed();

    Module['ImGuiCol_TabDimmedSelected'] = _emscripten_enum_ImGuiCol_ImGuiCol_TabDimmedSelected();

    Module['ImGuiCol_TabDimmedSelectedOverline'] = _emscripten_enum_ImGuiCol_ImGuiCol_TabDimmedSelectedOverline();

    Module['ImGuiCol_DockingPreview'] = _emscripten_enum_ImGuiCol_ImGuiCol_DockingPreview();

    Module['ImGuiCol_DockingEmptyBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_DockingEmptyBg();

    Module['ImGuiCol_PlotLines'] = _emscripten_enum_ImGuiCol_ImGuiCol_PlotLines();

    Module['ImGuiCol_PlotLinesHovered'] = _emscripten_enum_ImGuiCol_ImGuiCol_PlotLinesHovered();

    Module['ImGuiCol_PlotHistogram'] = _emscripten_enum_ImGuiCol_ImGuiCol_PlotHistogram();

    Module['ImGuiCol_PlotHistogramHovered'] = _emscripten_enum_ImGuiCol_ImGuiCol_PlotHistogramHovered();

    Module['ImGuiCol_TableHeaderBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_TableHeaderBg();

    Module['ImGuiCol_TableBorderStrong'] = _emscripten_enum_ImGuiCol_ImGuiCol_TableBorderStrong();

    Module['ImGuiCol_TableBorderLight'] = _emscripten_enum_ImGuiCol_ImGuiCol_TableBorderLight();

    Module['ImGuiCol_TableRowBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_TableRowBg();

    Module['ImGuiCol_TableRowBgAlt'] = _emscripten_enum_ImGuiCol_ImGuiCol_TableRowBgAlt();

    Module['ImGuiCol_TextLink'] = _emscripten_enum_ImGuiCol_ImGuiCol_TextLink();

    Module['ImGuiCol_TextSelectedBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_TextSelectedBg();

    Module['ImGuiCol_TreeLines'] = _emscripten_enum_ImGuiCol_ImGuiCol_TreeLines();

    Module['ImGuiCol_DragDropTarget'] = _emscripten_enum_ImGuiCol_ImGuiCol_DragDropTarget();

    Module['ImGuiCol_UnsavedMarker'] = _emscripten_enum_ImGuiCol_ImGuiCol_UnsavedMarker();

    Module['ImGuiCol_NavCursor'] = _emscripten_enum_ImGuiCol_ImGuiCol_NavCursor();

    Module['ImGuiCol_NavWindowingHighlight'] = _emscripten_enum_ImGuiCol_ImGuiCol_NavWindowingHighlight();

    Module['ImGuiCol_NavWindowingDimBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_NavWindowingDimBg();

    Module['ImGuiCol_ModalWindowDimBg'] = _emscripten_enum_ImGuiCol_ImGuiCol_ModalWindowDimBg();

    

    Module['ImGuiStyleVar_Alpha'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_Alpha();

    Module['ImGuiStyleVar_DisabledAlpha'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_DisabledAlpha();

    Module['ImGuiStyleVar_WindowPadding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_WindowPadding();

    Module['ImGuiStyleVar_WindowRounding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_WindowRounding();

    Module['ImGuiStyleVar_WindowBorderSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_WindowBorderSize();

    Module['ImGuiStyleVar_WindowMinSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_WindowMinSize();

    Module['ImGuiStyleVar_WindowTitleAlign'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_WindowTitleAlign();

    Module['ImGuiStyleVar_ChildRounding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_ChildRounding();

    Module['ImGuiStyleVar_ChildBorderSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_ChildBorderSize();

    Module['ImGuiStyleVar_PopupRounding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_PopupRounding();

    Module['ImGuiStyleVar_PopupBorderSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_PopupBorderSize();

    Module['ImGuiStyleVar_FramePadding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_FramePadding();

    Module['ImGuiStyleVar_FrameRounding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_FrameRounding();

    Module['ImGuiStyleVar_FrameBorderSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_FrameBorderSize();

    Module['ImGuiStyleVar_ItemSpacing'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_ItemSpacing();

    Module['ImGuiStyleVar_ItemInnerSpacing'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_ItemInnerSpacing();

    Module['ImGuiStyleVar_IndentSpacing'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_IndentSpacing();

    Module['ImGuiStyleVar_CellPadding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_CellPadding();

    Module['ImGuiStyleVar_ScrollbarSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_ScrollbarSize();

    Module['ImGuiStyleVar_ScrollbarRounding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_ScrollbarRounding();

    Module['ImGuiStyleVar_ScrollbarPadding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_ScrollbarPadding();

    Module['ImGuiStyleVar_GrabMinSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_GrabMinSize();

    Module['ImGuiStyleVar_GrabRounding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_GrabRounding();

    Module['ImGuiStyleVar_ImageBorderSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_ImageBorderSize();

    Module['ImGuiStyleVar_TabRounding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_TabRounding();

    Module['ImGuiStyleVar_TabBorderSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_TabBorderSize();

    Module['ImGuiStyleVar_TabMinWidthBase'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_TabMinWidthBase();

    Module['ImGuiStyleVar_TabMinWidthShrink'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_TabMinWidthShrink();

    Module['ImGuiStyleVar_TabBarBorderSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_TabBarBorderSize();

    Module['ImGuiStyleVar_TabBarOverlineSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_TabBarOverlineSize();

    Module['ImGuiStyleVar_TableAngledHeadersAngle'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_TableAngledHeadersAngle();

    Module['ImGuiStyleVar_TableAngledHeadersTextAlign'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_TableAngledHeadersTextAlign();

    Module['ImGuiStyleVar_TreeLinesSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_TreeLinesSize();

    Module['ImGuiStyleVar_TreeLinesRounding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_TreeLinesRounding();

    Module['ImGuiStyleVar_ButtonTextAlign'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_ButtonTextAlign();

    Module['ImGuiStyleVar_SelectableTextAlign'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_SelectableTextAlign();

    Module['ImGuiStyleVar_SeparatorTextBorderSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_SeparatorTextBorderSize();

    Module['ImGuiStyleVar_SeparatorTextAlign'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_SeparatorTextAlign();

    Module['ImGuiStyleVar_SeparatorTextPadding'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_SeparatorTextPadding();

    Module['ImGuiStyleVar_DockingSeparatorSize'] = _emscripten_enum_ImGuiStyleVar_ImGuiStyleVar_DockingSeparatorSize();

    

    Module['ImGuiButtonFlags_None'] = _emscripten_enum_ImGuiButtonFlags_ImGuiButtonFlags_None();

    Module['ImGuiButtonFlags_MouseButtonLeft'] = _emscripten_enum_ImGuiButtonFlags_ImGuiButtonFlags_MouseButtonLeft();

    Module['ImGuiButtonFlags_MouseButtonRight'] = _emscripten_enum_ImGuiButtonFlags_ImGuiButtonFlags_MouseButtonRight();

    Module['ImGuiButtonFlags_MouseButtonMiddle'] = _emscripten_enum_ImGuiButtonFlags_ImGuiButtonFlags_MouseButtonMiddle();

    Module['ImGuiButtonFlags_MouseButtonMask_'] = _emscripten_enum_ImGuiButtonFlags_ImGuiButtonFlags_MouseButtonMask_();

    Module['ImGuiButtonFlags_EnableNav'] = _emscripten_enum_ImGuiButtonFlags_ImGuiButtonFlags_EnableNav();

    

    Module['ImGuiColorEditFlags_None'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_None();

    Module['ImGuiColorEditFlags_NoAlpha'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_NoAlpha();

    Module['ImGuiColorEditFlags_NoPicker'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_NoPicker();

    Module['ImGuiColorEditFlags_NoOptions'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_NoOptions();

    Module['ImGuiColorEditFlags_NoSmallPreview'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_NoSmallPreview();

    Module['ImGuiColorEditFlags_NoInputs'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_NoInputs();

    Module['ImGuiColorEditFlags_NoTooltip'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_NoTooltip();

    Module['ImGuiColorEditFlags_NoLabel'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_NoLabel();

    Module['ImGuiColorEditFlags_NoSidePreview'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_NoSidePreview();

    Module['ImGuiColorEditFlags_NoDragDrop'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_NoDragDrop();

    Module['ImGuiColorEditFlags_NoBorder'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_NoBorder();

    Module['ImGuiColorEditFlags_AlphaOpaque'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_AlphaOpaque();

    Module['ImGuiColorEditFlags_AlphaNoBg'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_AlphaNoBg();

    Module['ImGuiColorEditFlags_AlphaPreviewHalf'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_AlphaPreviewHalf();

    Module['ImGuiColorEditFlags_AlphaBar'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_AlphaBar();

    Module['ImGuiColorEditFlags_HDR'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_HDR();

    Module['ImGuiColorEditFlags_DisplayRGB'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_DisplayRGB();

    Module['ImGuiColorEditFlags_DisplayHSV'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_DisplayHSV();

    Module['ImGuiColorEditFlags_DisplayHex'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_DisplayHex();

    Module['ImGuiColorEditFlags_Uint8'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_Uint8();

    Module['ImGuiColorEditFlags_Float'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_Float();

    Module['ImGuiColorEditFlags_PickerHueBar'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_PickerHueBar();

    Module['ImGuiColorEditFlags_PickerHueWheel'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_PickerHueWheel();

    Module['ImGuiColorEditFlags_InputRGB'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_InputRGB();

    Module['ImGuiColorEditFlags_InputHSV'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_InputHSV();

    Module['ImGuiColorEditFlags_DefaultOptions_'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_DefaultOptions_();

    Module['ImGuiColorEditFlags_AlphaMask_'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_AlphaMask_();

    Module['ImGuiColorEditFlags_DisplayMask_'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_DisplayMask_();

    Module['ImGuiColorEditFlags_DataTypeMask_'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_DataTypeMask_();

    Module['ImGuiColorEditFlags_PickerMask_'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_PickerMask_();

    Module['ImGuiColorEditFlags_InputMask_'] = _emscripten_enum_ImGuiColorEditFlags_ImGuiColorEditFlags_InputMask_();

    

    Module['ImGuiSliderFlags_None'] = _emscripten_enum_ImGuiSliderFlags_ImGuiSliderFlags_None();

    Module['ImGuiSliderFlags_Logarithmic'] = _emscripten_enum_ImGuiSliderFlags_ImGuiSliderFlags_Logarithmic();

    Module['ImGuiSliderFlags_NoRoundToFormat'] = _emscripten_enum_ImGuiSliderFlags_ImGuiSliderFlags_NoRoundToFormat();

    Module['ImGuiSliderFlags_NoInput'] = _emscripten_enum_ImGuiSliderFlags_ImGuiSliderFlags_NoInput();

    Module['ImGuiSliderFlags_WrapAround'] = _emscripten_enum_ImGuiSliderFlags_ImGuiSliderFlags_WrapAround();

    Module['ImGuiSliderFlags_ClampOnInput'] = _emscripten_enum_ImGuiSliderFlags_ImGuiSliderFlags_ClampOnInput();

    Module['ImGuiSliderFlags_ClampZeroRange'] = _emscripten_enum_ImGuiSliderFlags_ImGuiSliderFlags_ClampZeroRange();

    Module['ImGuiSliderFlags_NoSpeedTweaks'] = _emscripten_enum_ImGuiSliderFlags_ImGuiSliderFlags_NoSpeedTweaks();

    Module['ImGuiSliderFlags_AlwaysClamp'] = _emscripten_enum_ImGuiSliderFlags_ImGuiSliderFlags_AlwaysClamp();

    Module['ImGuiSliderFlags_InvalidMask_'] = _emscripten_enum_ImGuiSliderFlags_ImGuiSliderFlags_InvalidMask_();

    

    Module['ImGuiMouseButton_Left'] = _emscripten_enum_ImGuiMouseButton_ImGuiMouseButton_Left();

    Module['ImGuiMouseButton_Right'] = _emscripten_enum_ImGuiMouseButton_ImGuiMouseButton_Right();

    Module['ImGuiMouseButton_Middle'] = _emscripten_enum_ImGuiMouseButton_ImGuiMouseButton_Middle();

    

    Module['ImGuiMouseCursor_None'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_None();

    Module['ImGuiMouseCursor_Arrow'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_Arrow();

    Module['ImGuiMouseCursor_TextInput'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_TextInput();

    Module['ImGuiMouseCursor_ResizeAll'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_ResizeAll();

    Module['ImGuiMouseCursor_ResizeNS'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_ResizeNS();

    Module['ImGuiMouseCursor_ResizeEW'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_ResizeEW();

    Module['ImGuiMouseCursor_ResizeNESW'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_ResizeNESW();

    Module['ImGuiMouseCursor_ResizeNWSE'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_ResizeNWSE();

    Module['ImGuiMouseCursor_Hand'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_Hand();

    Module['ImGuiMouseCursor_Wait'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_Wait();

    Module['ImGuiMouseCursor_Progress'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_Progress();

    Module['ImGuiMouseCursor_NotAllowed'] = _emscripten_enum_ImGuiMouseCursor_ImGuiMouseCursor_NotAllowed();

    

    Module['ImGuiMouseSource_Mouse'] = _emscripten_enum_ImGuiMouseSource_ImGuiMouseSource_Mouse();

    Module['ImGuiMouseSource_TouchScreen'] = _emscripten_enum_ImGuiMouseSource_ImGuiMouseSource_TouchScreen();

    Module['ImGuiMouseSource_Pen'] = _emscripten_enum_ImGuiMouseSource_ImGuiMouseSource_Pen();

    

    Module['ImGuiCond_None'] = _emscripten_enum_ImGuiCond_ImGuiCond_None();

    Module['ImGuiCond_Always'] = _emscripten_enum_ImGuiCond_ImGuiCond_Always();

    Module['ImGuiCond_Once'] = _emscripten_enum_ImGuiCond_ImGuiCond_Once();

    Module['ImGuiCond_FirstUseEver'] = _emscripten_enum_ImGuiCond_ImGuiCond_FirstUseEver();

    Module['ImGuiCond_Appearing'] = _emscripten_enum_ImGuiCond_ImGuiCond_Appearing();

    

    Module['ImGuiTableFlags_None'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_None();

    Module['ImGuiTableFlags_Resizable'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_Resizable();

    Module['ImGuiTableFlags_Reorderable'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_Reorderable();

    Module['ImGuiTableFlags_Hideable'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_Hideable();

    Module['ImGuiTableFlags_Sortable'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_Sortable();

    Module['ImGuiTableFlags_NoSavedSettings'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_NoSavedSettings();

    Module['ImGuiTableFlags_ContextMenuInBody'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_ContextMenuInBody();

    Module['ImGuiTableFlags_RowBg'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_RowBg();

    Module['ImGuiTableFlags_BordersInnerH'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_BordersInnerH();

    Module['ImGuiTableFlags_BordersOuterH'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_BordersOuterH();

    Module['ImGuiTableFlags_BordersInnerV'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_BordersInnerV();

    Module['ImGuiTableFlags_BordersOuterV'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_BordersOuterV();

    Module['ImGuiTableFlags_BordersH'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_BordersH();

    Module['ImGuiTableFlags_BordersV'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_BordersV();

    Module['ImGuiTableFlags_BordersInner'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_BordersInner();

    Module['ImGuiTableFlags_BordersOuter'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_BordersOuter();

    Module['ImGuiTableFlags_Borders'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_Borders();

    Module['ImGuiTableFlags_NoBordersInBody'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_NoBordersInBody();

    Module['ImGuiTableFlags_NoBordersInBodyUntilResize'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_NoBordersInBodyUntilResize();

    Module['ImGuiTableFlags_SizingFixedFit'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_SizingFixedFit();

    Module['ImGuiTableFlags_SizingFixedSame'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_SizingFixedSame();

    Module['ImGuiTableFlags_SizingStretchProp'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_SizingStretchProp();

    Module['ImGuiTableFlags_SizingStretchSame'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_SizingStretchSame();

    Module['ImGuiTableFlags_NoHostExtendX'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_NoHostExtendX();

    Module['ImGuiTableFlags_NoHostExtendY'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_NoHostExtendY();

    Module['ImGuiTableFlags_NoKeepColumnsVisible'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_NoKeepColumnsVisible();

    Module['ImGuiTableFlags_PreciseWidths'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_PreciseWidths();

    Module['ImGuiTableFlags_NoClip'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_NoClip();

    Module['ImGuiTableFlags_PadOuterX'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_PadOuterX();

    Module['ImGuiTableFlags_NoPadOuterX'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_NoPadOuterX();

    Module['ImGuiTableFlags_NoPadInnerX'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_NoPadInnerX();

    Module['ImGuiTableFlags_ScrollX'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_ScrollX();

    Module['ImGuiTableFlags_ScrollY'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_ScrollY();

    Module['ImGuiTableFlags_SortMulti'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_SortMulti();

    Module['ImGuiTableFlags_SortTristate'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_SortTristate();

    Module['ImGuiTableFlags_HighlightHoveredColumn'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_HighlightHoveredColumn();

    Module['ImGuiTableFlags_SizingMask_'] = _emscripten_enum_ImGuiTableFlags_ImGuiTableFlags_SizingMask_();

    

    Module['ImGuiTableColumnFlags_None'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_None();

    Module['ImGuiTableColumnFlags_Disabled'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_Disabled();

    Module['ImGuiTableColumnFlags_DefaultHide'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_DefaultHide();

    Module['ImGuiTableColumnFlags_DefaultSort'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_DefaultSort();

    Module['ImGuiTableColumnFlags_WidthStretch'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_WidthStretch();

    Module['ImGuiTableColumnFlags_WidthFixed'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_WidthFixed();

    Module['ImGuiTableColumnFlags_NoResize'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_NoResize();

    Module['ImGuiTableColumnFlags_NoReorder'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_NoReorder();

    Module['ImGuiTableColumnFlags_NoHide'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_NoHide();

    Module['ImGuiTableColumnFlags_NoClip'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_NoClip();

    Module['ImGuiTableColumnFlags_NoSort'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_NoSort();

    Module['ImGuiTableColumnFlags_NoSortAscending'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_NoSortAscending();

    Module['ImGuiTableColumnFlags_NoSortDescending'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_NoSortDescending();

    Module['ImGuiTableColumnFlags_NoHeaderLabel'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_NoHeaderLabel();

    Module['ImGuiTableColumnFlags_NoHeaderWidth'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_NoHeaderWidth();

    Module['ImGuiTableColumnFlags_PreferSortAscending'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_PreferSortAscending();

    Module['ImGuiTableColumnFlags_PreferSortDescending'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_PreferSortDescending();

    Module['ImGuiTableColumnFlags_IndentEnable'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_IndentEnable();

    Module['ImGuiTableColumnFlags_IndentDisable'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_IndentDisable();

    Module['ImGuiTableColumnFlags_AngledHeader'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_AngledHeader();

    Module['ImGuiTableColumnFlags_IsEnabled'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_IsEnabled();

    Module['ImGuiTableColumnFlags_IsVisible'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_IsVisible();

    Module['ImGuiTableColumnFlags_IsSorted'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_IsSorted();

    Module['ImGuiTableColumnFlags_IsHovered'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_IsHovered();

    Module['ImGuiTableColumnFlags_WidthMask_'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_WidthMask_();

    Module['ImGuiTableColumnFlags_IndentMask_'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_IndentMask_();

    Module['ImGuiTableColumnFlags_StatusMask_'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_StatusMask_();

    Module['ImGuiTableColumnFlags_NoDirectResize_'] = _emscripten_enum_ImGuiTableColumnFlags_ImGuiTableColumnFlags_NoDirectResize_();

    

    Module['ImGuiTableRowFlags_None'] = _emscripten_enum_ImGuiTableRowFlags_ImGuiTableRowFlags_None();

    Module['ImGuiTableRowFlags_Headers'] = _emscripten_enum_ImGuiTableRowFlags_ImGuiTableRowFlags_Headers();

    

    Module['ImGuiTableBgTarget_None'] = _emscripten_enum_ImGuiTableBgTarget_ImGuiTableBgTarget_None();

    Module['ImGuiTableBgTarget_RowBg0'] = _emscripten_enum_ImGuiTableBgTarget_ImGuiTableBgTarget_RowBg0();

    Module['ImGuiTableBgTarget_RowBg1'] = _emscripten_enum_ImGuiTableBgTarget_ImGuiTableBgTarget_RowBg1();

    Module['ImGuiTableBgTarget_CellBg'] = _emscripten_enum_ImGuiTableBgTarget_ImGuiTableBgTarget_CellBg();

    

    Module['ImGuiMultiSelectFlags_None'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_None();

    Module['ImGuiMultiSelectFlags_SingleSelect'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_SingleSelect();

    Module['ImGuiMultiSelectFlags_NoSelectAll'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_NoSelectAll();

    Module['ImGuiMultiSelectFlags_NoRangeSelect'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_NoRangeSelect();

    Module['ImGuiMultiSelectFlags_NoAutoSelect'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_NoAutoSelect();

    Module['ImGuiMultiSelectFlags_NoAutoClear'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_NoAutoClear();

    Module['ImGuiMultiSelectFlags_NoAutoClearOnReselect'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_NoAutoClearOnReselect();

    Module['ImGuiMultiSelectFlags_BoxSelect1d'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_BoxSelect1d();

    Module['ImGuiMultiSelectFlags_BoxSelect2d'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_BoxSelect2d();

    Module['ImGuiMultiSelectFlags_BoxSelectNoScroll'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_BoxSelectNoScroll();

    Module['ImGuiMultiSelectFlags_ClearOnEscape'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_ClearOnEscape();

    Module['ImGuiMultiSelectFlags_ClearOnClickVoid'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_ClearOnClickVoid();

    Module['ImGuiMultiSelectFlags_ScopeWindow'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_ScopeWindow();

    Module['ImGuiMultiSelectFlags_ScopeRect'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_ScopeRect();

    Module['ImGuiMultiSelectFlags_SelectOnClick'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_SelectOnClick();

    Module['ImGuiMultiSelectFlags_SelectOnClickRelease'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_SelectOnClickRelease();

    Module['ImGuiMultiSelectFlags_NavWrapX'] = _emscripten_enum_ImGuiMultiSelectFlags_ImGuiMultiSelectFlags_NavWrapX();

    

    Module['ImGuiSelectionRequestType_None'] = _emscripten_enum_ImGuiSelectionRequestType_ImGuiSelectionRequestType_None();

    Module['ImGuiSelectionRequestType_SetAll'] = _emscripten_enum_ImGuiSelectionRequestType_ImGuiSelectionRequestType_SetAll();

    Module['ImGuiSelectionRequestType_SetRange'] = _emscripten_enum_ImGuiSelectionRequestType_ImGuiSelectionRequestType_SetRange();

    

    Module['ImTextureFormat_RGBA32'] = _emscripten_enum_ImTextureFormat_ImTextureFormat_RGBA32();

    Module['ImTextureFormat_Alpha8'] = _emscripten_enum_ImTextureFormat_ImTextureFormat_Alpha8();

    

    Module['ImTextureStatus_OK'] = _emscripten_enum_ImTextureStatus_ImTextureStatus_OK();

    Module['ImTextureStatus_Destroyed'] = _emscripten_enum_ImTextureStatus_ImTextureStatus_Destroyed();

    Module['ImTextureStatus_WantCreate'] = _emscripten_enum_ImTextureStatus_ImTextureStatus_WantCreate();

    Module['ImTextureStatus_WantUpdates'] = _emscripten_enum_ImTextureStatus_ImTextureStatus_WantUpdates();

    Module['ImTextureStatus_WantDestroy'] = _emscripten_enum_ImTextureStatus_ImTextureStatus_WantDestroy();

    

    Module['ImFontAtlasFlags_None'] = _emscripten_enum_ImFontAtlasFlags_ImFontAtlasFlags_None();

    Module['ImFontAtlasFlags_NoPowerOfTwoHeight'] = _emscripten_enum_ImFontAtlasFlags_ImFontAtlasFlags_NoPowerOfTwoHeight();

    Module['ImFontAtlasFlags_NoMouseCursors'] = _emscripten_enum_ImFontAtlasFlags_ImFontAtlasFlags_NoMouseCursors();

    Module['ImFontAtlasFlags_NoBakedLines'] = _emscripten_enum_ImFontAtlasFlags_ImFontAtlasFlags_NoBakedLines();

    

    Module['ImFontFlags_None'] = _emscripten_enum_ImFontFlags_ImFontFlags_None();

    Module['ImFontFlags_NoLoadError'] = _emscripten_enum_ImFontFlags_ImFontFlags_NoLoadError();

    Module['ImFontFlags_NoLoadGlyphs'] = _emscripten_enum_ImFontFlags_ImFontFlags_NoLoadGlyphs();

    Module['ImFontFlags_LockBakedSizes'] = _emscripten_enum_ImFontFlags_ImFontFlags_LockBakedSizes();

    

    Module['ImGuiViewportFlags_None'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_None();

    Module['ImGuiViewportFlags_IsPlatformWindow'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_IsPlatformWindow();

    Module['ImGuiViewportFlags_IsPlatformMonitor'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_IsPlatformMonitor();

    Module['ImGuiViewportFlags_OwnedByApp'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_OwnedByApp();

    Module['ImGuiViewportFlags_NoDecoration'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_NoDecoration();

    Module['ImGuiViewportFlags_NoTaskBarIcon'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_NoTaskBarIcon();

    Module['ImGuiViewportFlags_NoFocusOnAppearing'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_NoFocusOnAppearing();

    Module['ImGuiViewportFlags_NoFocusOnClick'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_NoFocusOnClick();

    Module['ImGuiViewportFlags_NoInputs'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_NoInputs();

    Module['ImGuiViewportFlags_NoRendererClear'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_NoRendererClear();

    Module['ImGuiViewportFlags_NoAutoMerge'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_NoAutoMerge();

    Module['ImGuiViewportFlags_TopMost'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_TopMost();

    Module['ImGuiViewportFlags_CanHostOtherWindows'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_CanHostOtherWindows();

    Module['ImGuiViewportFlags_IsMinimized'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_IsMinimized();

    Module['ImGuiViewportFlags_IsFocused'] = _emscripten_enum_ImGuiViewportFlags_ImGuiViewportFlags_IsFocused();

    

    Module['ImDrawFlags_None'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_None();

    Module['ImDrawFlags_Closed'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_Closed();

    Module['ImDrawFlags_RoundCornersTopLeft'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersTopLeft();

    Module['ImDrawFlags_RoundCornersTopRight'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersTopRight();

    Module['ImDrawFlags_RoundCornersBottomLeft'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersBottomLeft();

    Module['ImDrawFlags_RoundCornersBottomRight'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersBottomRight();

    Module['ImDrawFlags_RoundCornersNone'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersNone();

    Module['ImDrawFlags_RoundCornersTop'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersTop();

    Module['ImDrawFlags_RoundCornersBottom'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersBottom();

    Module['ImDrawFlags_RoundCornersLeft'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersLeft();

    Module['ImDrawFlags_RoundCornersRight'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersRight();

    Module['ImDrawFlags_RoundCornersAll'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersAll();

    Module['ImDrawFlags_RoundCornersDefault_'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersDefault_();

    Module['ImDrawFlags_RoundCornersMask_'] = _emscripten_enum_ImDrawFlags_ImDrawFlags_RoundCornersMask_();

    

    Module['ImGuiDataType_Pointer'] = _emscripten_enum_ImGuiDataTypePrivate__ImGuiDataType_Pointer();

    Module['ImGuiDataType_ID'] = _emscripten_enum_ImGuiDataTypePrivate__ImGuiDataType_ID();

    

    Module['ImGuiItemFlags_Disabled'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_Disabled();

    Module['ImGuiItemFlags_ReadOnly'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_ReadOnly();

    Module['ImGuiItemFlags_MixedValue'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_MixedValue();

    Module['ImGuiItemFlags_NoWindowHoverableCheck'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_NoWindowHoverableCheck();

    Module['ImGuiItemFlags_AllowOverlap'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_AllowOverlap();

    Module['ImGuiItemFlags_NoNavDisableMouseHover'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_NoNavDisableMouseHover();

    Module['ImGuiItemFlags_NoMarkEdited'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_NoMarkEdited();

    Module['ImGuiItemFlags_NoFocus'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_NoFocus();

    Module['ImGuiItemFlags_Inputable'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_Inputable();

    Module['ImGuiItemFlags_HasSelectionUserData'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_HasSelectionUserData();

    Module['ImGuiItemFlags_IsMultiSelect'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_IsMultiSelect();

    Module['ImGuiItemFlags_Default_'] = _emscripten_enum_ImGuiItemFlagsPrivate__ImGuiItemFlags_Default_();

    

    Module['ImGuiItemStatusFlags_None'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_None();

    Module['ImGuiItemStatusFlags_HoveredRect'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_HoveredRect();

    Module['ImGuiItemStatusFlags_HasDisplayRect'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_HasDisplayRect();

    Module['ImGuiItemStatusFlags_Edited'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_Edited();

    Module['ImGuiItemStatusFlags_ToggledSelection'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_ToggledSelection();

    Module['ImGuiItemStatusFlags_ToggledOpen'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_ToggledOpen();

    Module['ImGuiItemStatusFlags_HasDeactivated'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_HasDeactivated();

    Module['ImGuiItemStatusFlags_Deactivated'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_Deactivated();

    Module['ImGuiItemStatusFlags_HoveredWindow'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_HoveredWindow();

    Module['ImGuiItemStatusFlags_Visible'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_Visible();

    Module['ImGuiItemStatusFlags_HasClipRect'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_HasClipRect();

    Module['ImGuiItemStatusFlags_HasShortcut'] = _emscripten_enum_ImGuiItemStatusFlags_ImGuiItemStatusFlags_HasShortcut();

    

    Module['ImGuiHoveredFlags_DelayMask_'] = _emscripten_enum_ImGuiHoveredFlagsPrivate__ImGuiHoveredFlags_DelayMask_();

    Module['ImGuiHoveredFlags_AllowedMaskForIsWindowHovered'] = _emscripten_enum_ImGuiHoveredFlagsPrivate__ImGuiHoveredFlags_AllowedMaskForIsWindowHovered();

    Module['ImGuiHoveredFlags_AllowedMaskForIsItemHovered'] = _emscripten_enum_ImGuiHoveredFlagsPrivate__ImGuiHoveredFlags_AllowedMaskForIsItemHovered();

    

    Module['ImGuiInputTextFlags_Multiline'] = _emscripten_enum_ImGuiInputTextFlagsPrivate__ImGuiInputTextFlags_Multiline();

    Module['ImGuiInputTextFlags_MergedItem'] = _emscripten_enum_ImGuiInputTextFlagsPrivate__ImGuiInputTextFlags_MergedItem();

    Module['ImGuiInputTextFlags_LocalizeDecimalPoint'] = _emscripten_enum_ImGuiInputTextFlagsPrivate__ImGuiInputTextFlags_LocalizeDecimalPoint();

    

    Module['ImGuiButtonFlags_PressedOnClick'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_PressedOnClick();

    Module['ImGuiButtonFlags_PressedOnClickRelease'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_PressedOnClickRelease();

    Module['ImGuiButtonFlags_PressedOnClickReleaseAnywhere'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_PressedOnClickReleaseAnywhere();

    Module['ImGuiButtonFlags_PressedOnRelease'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_PressedOnRelease();

    Module['ImGuiButtonFlags_PressedOnDoubleClick'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_PressedOnDoubleClick();

    Module['ImGuiButtonFlags_PressedOnDragDropHold'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_PressedOnDragDropHold();

    Module['ImGuiButtonFlags_FlattenChildren'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_FlattenChildren();

    Module['ImGuiButtonFlags_AllowOverlap'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_AllowOverlap();

    Module['ImGuiButtonFlags_AlignTextBaseLine'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_AlignTextBaseLine();

    Module['ImGuiButtonFlags_NoKeyModsAllowed'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_NoKeyModsAllowed();

    Module['ImGuiButtonFlags_NoHoldingActiveId'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_NoHoldingActiveId();

    Module['ImGuiButtonFlags_NoNavFocus'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_NoNavFocus();

    Module['ImGuiButtonFlags_NoHoveredOnFocus'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_NoHoveredOnFocus();

    Module['ImGuiButtonFlags_NoSetKeyOwner'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_NoSetKeyOwner();

    Module['ImGuiButtonFlags_NoTestKeyOwner'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_NoTestKeyOwner();

    Module['ImGuiButtonFlags_NoFocus'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_NoFocus();

    Module['ImGuiButtonFlags_PressedOnMask_'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_PressedOnMask_();

    Module['ImGuiButtonFlags_PressedOnDefault_'] = _emscripten_enum_ImGuiButtonFlagsPrivate__ImGuiButtonFlags_PressedOnDefault_();

    

    Module['ImGuiComboFlags_CustomPreview'] = _emscripten_enum_ImGuiComboFlagsPrivate__ImGuiComboFlags_CustomPreview();

    

    Module['ImGuiSliderFlags_Vertical'] = _emscripten_enum_ImGuiSliderFlagsPrivate__ImGuiSliderFlags_Vertical();

    Module['ImGuiSliderFlags_ReadOnly'] = _emscripten_enum_ImGuiSliderFlagsPrivate__ImGuiSliderFlags_ReadOnly();

    

    Module['ImGuiSelectableFlags_NoHoldingActiveID'] = _emscripten_enum_ImGuiSelectableFlagsPrivate__ImGuiSelectableFlags_NoHoldingActiveID();

    Module['ImGuiSelectableFlags_SelectOnClick'] = _emscripten_enum_ImGuiSelectableFlagsPrivate__ImGuiSelectableFlags_SelectOnClick();

    Module['ImGuiSelectableFlags_SelectOnRelease'] = _emscripten_enum_ImGuiSelectableFlagsPrivate__ImGuiSelectableFlags_SelectOnRelease();

    Module['ImGuiSelectableFlags_SpanAvailWidth'] = _emscripten_enum_ImGuiSelectableFlagsPrivate__ImGuiSelectableFlags_SpanAvailWidth();

    Module['ImGuiSelectableFlags_SetNavIdOnHover'] = _emscripten_enum_ImGuiSelectableFlagsPrivate__ImGuiSelectableFlags_SetNavIdOnHover();

    Module['ImGuiSelectableFlags_NoPadWithHalfSpacing'] = _emscripten_enum_ImGuiSelectableFlagsPrivate__ImGuiSelectableFlags_NoPadWithHalfSpacing();

    Module['ImGuiSelectableFlags_NoSetKeyOwner'] = _emscripten_enum_ImGuiSelectableFlagsPrivate__ImGuiSelectableFlags_NoSetKeyOwner();

    

    Module['ImGuiTreeNodeFlags_NoNavFocus'] = _emscripten_enum_ImGuiTreeNodeFlagsPrivate__ImGuiTreeNodeFlags_NoNavFocus();

    Module['ImGuiTreeNodeFlags_ClipLabelForTrailingButton'] = _emscripten_enum_ImGuiTreeNodeFlagsPrivate__ImGuiTreeNodeFlags_ClipLabelForTrailingButton();

    Module['ImGuiTreeNodeFlags_UpsideDownArrow'] = _emscripten_enum_ImGuiTreeNodeFlagsPrivate__ImGuiTreeNodeFlags_UpsideDownArrow();

    Module['ImGuiTreeNodeFlags_OpenOnMask_'] = _emscripten_enum_ImGuiTreeNodeFlagsPrivate__ImGuiTreeNodeFlags_OpenOnMask_();

    Module['ImGuiTreeNodeFlags_DrawLinesMask_'] = _emscripten_enum_ImGuiTreeNodeFlagsPrivate__ImGuiTreeNodeFlags_DrawLinesMask_();

    

    Module['ImGuiSeparatorFlags_None'] = _emscripten_enum_ImGuiSeparatorFlags_ImGuiSeparatorFlags_None();

    Module['ImGuiSeparatorFlags_Horizontal'] = _emscripten_enum_ImGuiSeparatorFlags_ImGuiSeparatorFlags_Horizontal();

    Module['ImGuiSeparatorFlags_Vertical'] = _emscripten_enum_ImGuiSeparatorFlags_ImGuiSeparatorFlags_Vertical();

    Module['ImGuiSeparatorFlags_SpanAllColumns'] = _emscripten_enum_ImGuiSeparatorFlags_ImGuiSeparatorFlags_SpanAllColumns();

    

    Module['ImGuiFocusRequestFlags_None'] = _emscripten_enum_ImGuiFocusRequestFlags_ImGuiFocusRequestFlags_None();

    Module['ImGuiFocusRequestFlags_RestoreFocusedChild'] = _emscripten_enum_ImGuiFocusRequestFlags_ImGuiFocusRequestFlags_RestoreFocusedChild();

    Module['ImGuiFocusRequestFlags_UnlessBelowModal'] = _emscripten_enum_ImGuiFocusRequestFlags_ImGuiFocusRequestFlags_UnlessBelowModal();

    

    Module['ImGuiTextFlags_None'] = _emscripten_enum_ImGuiTextFlags_ImGuiTextFlags_None();

    Module['ImGuiTextFlags_NoWidthForLargeClippedText'] = _emscripten_enum_ImGuiTextFlags_ImGuiTextFlags_NoWidthForLargeClippedText();

    

    Module['ImGuiTooltipFlags_None'] = _emscripten_enum_ImGuiTooltipFlags_ImGuiTooltipFlags_None();

    Module['ImGuiTooltipFlags_OverridePrevious'] = _emscripten_enum_ImGuiTooltipFlags_ImGuiTooltipFlags_OverridePrevious();

    

    Module['ImGuiLayoutType_Horizontal'] = _emscripten_enum_ImGuiLayoutType_ImGuiLayoutType_Horizontal();

    Module['ImGuiLayoutType_Vertical'] = _emscripten_enum_ImGuiLayoutType_ImGuiLayoutType_Vertical();

    

    Module['ImGuiLogFlags_None'] = _emscripten_enum_ImGuiLogFlags_ImGuiLogFlags_None();

    Module['ImGuiLogFlags_OutputTTY'] = _emscripten_enum_ImGuiLogFlags_ImGuiLogFlags_OutputTTY();

    Module['ImGuiLogFlags_OutputFile'] = _emscripten_enum_ImGuiLogFlags_ImGuiLogFlags_OutputFile();

    Module['ImGuiLogFlags_OutputBuffer'] = _emscripten_enum_ImGuiLogFlags_ImGuiLogFlags_OutputBuffer();

    Module['ImGuiLogFlags_OutputClipboard'] = _emscripten_enum_ImGuiLogFlags_ImGuiLogFlags_OutputClipboard();

    Module['ImGuiLogFlags_OutputMask_'] = _emscripten_enum_ImGuiLogFlags_ImGuiLogFlags_OutputMask_();

    

    Module['ImGuiAxis_None'] = _emscripten_enum_ImGuiAxis_ImGuiAxis_None();

    Module['ImGuiAxis_X'] = _emscripten_enum_ImGuiAxis_ImGuiAxis_X();

    Module['ImGuiAxis_Y'] = _emscripten_enum_ImGuiAxis_ImGuiAxis_Y();

    

    Module['ImGuiPlotType_Lines'] = _emscripten_enum_ImGuiPlotType_ImGuiPlotType_Lines();

    Module['ImGuiPlotType_Histogram'] = _emscripten_enum_ImGuiPlotType_ImGuiPlotType_Histogram();

    

    Module['ImGuiWindowRefreshFlags_None'] = _emscripten_enum_ImGuiWindowRefreshFlags_ImGuiWindowRefreshFlags_None();

    Module['ImGuiWindowRefreshFlags_TryToAvoidRefresh'] = _emscripten_enum_ImGuiWindowRefreshFlags_ImGuiWindowRefreshFlags_TryToAvoidRefresh();

    Module['ImGuiWindowRefreshFlags_RefreshOnHover'] = _emscripten_enum_ImGuiWindowRefreshFlags_ImGuiWindowRefreshFlags_RefreshOnHover();

    Module['ImGuiWindowRefreshFlags_RefreshOnFocus'] = _emscripten_enum_ImGuiWindowRefreshFlags_ImGuiWindowRefreshFlags_RefreshOnFocus();

    

    Module['ImGuiNextWindowDataFlags_None'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_None();

    Module['ImGuiNextWindowDataFlags_HasPos'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasPos();

    Module['ImGuiNextWindowDataFlags_HasSize'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasSize();

    Module['ImGuiNextWindowDataFlags_HasContentSize'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasContentSize();

    Module['ImGuiNextWindowDataFlags_HasCollapsed'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasCollapsed();

    Module['ImGuiNextWindowDataFlags_HasSizeConstraint'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasSizeConstraint();

    Module['ImGuiNextWindowDataFlags_HasFocus'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasFocus();

    Module['ImGuiNextWindowDataFlags_HasBgAlpha'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasBgAlpha();

    Module['ImGuiNextWindowDataFlags_HasScroll'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasScroll();

    Module['ImGuiNextWindowDataFlags_HasWindowFlags'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasWindowFlags();

    Module['ImGuiNextWindowDataFlags_HasChildFlags'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasChildFlags();

    Module['ImGuiNextWindowDataFlags_HasRefreshPolicy'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasRefreshPolicy();

    Module['ImGuiNextWindowDataFlags_HasViewport'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasViewport();

    Module['ImGuiNextWindowDataFlags_HasDock'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasDock();

    Module['ImGuiNextWindowDataFlags_HasWindowClass'] = _emscripten_enum_ImGuiNextWindowDataFlags_ImGuiNextWindowDataFlags_HasWindowClass();

    

    Module['ImGuiNextItemDataFlags_None'] = _emscripten_enum_ImGuiNextItemDataFlags_ImGuiNextItemDataFlags_None();

    Module['ImGuiNextItemDataFlags_HasWidth'] = _emscripten_enum_ImGuiNextItemDataFlags_ImGuiNextItemDataFlags_HasWidth();

    Module['ImGuiNextItemDataFlags_HasOpen'] = _emscripten_enum_ImGuiNextItemDataFlags_ImGuiNextItemDataFlags_HasOpen();

    Module['ImGuiNextItemDataFlags_HasShortcut'] = _emscripten_enum_ImGuiNextItemDataFlags_ImGuiNextItemDataFlags_HasShortcut();

    Module['ImGuiNextItemDataFlags_HasRefVal'] = _emscripten_enum_ImGuiNextItemDataFlags_ImGuiNextItemDataFlags_HasRefVal();

    Module['ImGuiNextItemDataFlags_HasStorageID'] = _emscripten_enum_ImGuiNextItemDataFlags_ImGuiNextItemDataFlags_HasStorageID();

    

    Module['ImGuiPopupPositionPolicy_Default'] = _emscripten_enum_ImGuiPopupPositionPolicy_ImGuiPopupPositionPolicy_Default();

    Module['ImGuiPopupPositionPolicy_ComboBox'] = _emscripten_enum_ImGuiPopupPositionPolicy_ImGuiPopupPositionPolicy_ComboBox();

    Module['ImGuiPopupPositionPolicy_Tooltip'] = _emscripten_enum_ImGuiPopupPositionPolicy_ImGuiPopupPositionPolicy_Tooltip();

    

    Module['ImGuiInputEventType_None'] = _emscripten_enum_ImGuiInputEventType_ImGuiInputEventType_None();

    Module['ImGuiInputEventType_MousePos'] = _emscripten_enum_ImGuiInputEventType_ImGuiInputEventType_MousePos();

    Module['ImGuiInputEventType_MouseWheel'] = _emscripten_enum_ImGuiInputEventType_ImGuiInputEventType_MouseWheel();

    Module['ImGuiInputEventType_MouseButton'] = _emscripten_enum_ImGuiInputEventType_ImGuiInputEventType_MouseButton();

    Module['ImGuiInputEventType_MouseViewport'] = _emscripten_enum_ImGuiInputEventType_ImGuiInputEventType_MouseViewport();

    Module['ImGuiInputEventType_Key'] = _emscripten_enum_ImGuiInputEventType_ImGuiInputEventType_Key();

    Module['ImGuiInputEventType_Text'] = _emscripten_enum_ImGuiInputEventType_ImGuiInputEventType_Text();

    Module['ImGuiInputEventType_Focus'] = _emscripten_enum_ImGuiInputEventType_ImGuiInputEventType_Focus();

    Module['ImGuiInputEventType_COUNT'] = _emscripten_enum_ImGuiInputEventType_ImGuiInputEventType_COUNT();

    

    Module['ImGuiInputSource_None'] = _emscripten_enum_ImGuiInputSource_ImGuiInputSource_None();

    Module['ImGuiInputSource_Mouse'] = _emscripten_enum_ImGuiInputSource_ImGuiInputSource_Mouse();

    Module['ImGuiInputSource_Keyboard'] = _emscripten_enum_ImGuiInputSource_ImGuiInputSource_Keyboard();

    Module['ImGuiInputSource_Gamepad'] = _emscripten_enum_ImGuiInputSource_ImGuiInputSource_Gamepad();

    Module['ImGuiInputSource_COUNT'] = _emscripten_enum_ImGuiInputSource_ImGuiInputSource_COUNT();

    

    Module['ImGuiInputFlags_RepeatRateDefault'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RepeatRateDefault();

    Module['ImGuiInputFlags_RepeatRateNavMove'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RepeatRateNavMove();

    Module['ImGuiInputFlags_RepeatRateNavTweak'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RepeatRateNavTweak();

    Module['ImGuiInputFlags_RepeatUntilRelease'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RepeatUntilRelease();

    Module['ImGuiInputFlags_RepeatUntilKeyModsChange'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RepeatUntilKeyModsChange();

    Module['ImGuiInputFlags_RepeatUntilKeyModsChangeFromNone'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RepeatUntilKeyModsChangeFromNone();

    Module['ImGuiInputFlags_RepeatUntilOtherKeyPress'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RepeatUntilOtherKeyPress();

    Module['ImGuiInputFlags_LockThisFrame'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_LockThisFrame();

    Module['ImGuiInputFlags_LockUntilRelease'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_LockUntilRelease();

    Module['ImGuiInputFlags_CondHovered'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_CondHovered();

    Module['ImGuiInputFlags_CondActive'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_CondActive();

    Module['ImGuiInputFlags_CondDefault_'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_CondDefault_();

    Module['ImGuiInputFlags_RepeatRateMask_'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RepeatRateMask_();

    Module['ImGuiInputFlags_RepeatUntilMask_'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RepeatUntilMask_();

    Module['ImGuiInputFlags_RepeatMask_'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RepeatMask_();

    Module['ImGuiInputFlags_CondMask_'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_CondMask_();

    Module['ImGuiInputFlags_RouteTypeMask_'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RouteTypeMask_();

    Module['ImGuiInputFlags_RouteOptionsMask_'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_RouteOptionsMask_();

    Module['ImGuiInputFlags_SupportedByIsKeyPressed'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_SupportedByIsKeyPressed();

    Module['ImGuiInputFlags_SupportedByIsMouseClicked'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_SupportedByIsMouseClicked();

    Module['ImGuiInputFlags_SupportedByShortcut'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_SupportedByShortcut();

    Module['ImGuiInputFlags_SupportedBySetNextItemShortcut'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_SupportedBySetNextItemShortcut();

    Module['ImGuiInputFlags_SupportedBySetKeyOwner'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_SupportedBySetKeyOwner();

    Module['ImGuiInputFlags_SupportedBySetItemKeyOwner'] = _emscripten_enum_ImGuiInputFlagsPrivate__ImGuiInputFlags_SupportedBySetItemKeyOwner();

    

    Module['ImGuiActivateFlags_None'] = _emscripten_enum_ImGuiActivateFlags_ImGuiActivateFlags_None();

    Module['ImGuiActivateFlags_PreferInput'] = _emscripten_enum_ImGuiActivateFlags_ImGuiActivateFlags_PreferInput();

    Module['ImGuiActivateFlags_PreferTweak'] = _emscripten_enum_ImGuiActivateFlags_ImGuiActivateFlags_PreferTweak();

    Module['ImGuiActivateFlags_TryToPreserveState'] = _emscripten_enum_ImGuiActivateFlags_ImGuiActivateFlags_TryToPreserveState();

    Module['ImGuiActivateFlags_FromTabbing'] = _emscripten_enum_ImGuiActivateFlags_ImGuiActivateFlags_FromTabbing();

    Module['ImGuiActivateFlags_FromShortcut'] = _emscripten_enum_ImGuiActivateFlags_ImGuiActivateFlags_FromShortcut();

    Module['ImGuiActivateFlags_FromFocusApi'] = _emscripten_enum_ImGuiActivateFlags_ImGuiActivateFlags_FromFocusApi();

    

    Module['ImGuiScrollFlags_None'] = _emscripten_enum_ImGuiScrollFlags_ImGuiScrollFlags_None();

    Module['ImGuiScrollFlags_KeepVisibleEdgeX'] = _emscripten_enum_ImGuiScrollFlags_ImGuiScrollFlags_KeepVisibleEdgeX();

    Module['ImGuiScrollFlags_KeepVisibleEdgeY'] = _emscripten_enum_ImGuiScrollFlags_ImGuiScrollFlags_KeepVisibleEdgeY();

    Module['ImGuiScrollFlags_KeepVisibleCenterX'] = _emscripten_enum_ImGuiScrollFlags_ImGuiScrollFlags_KeepVisibleCenterX();

    Module['ImGuiScrollFlags_KeepVisibleCenterY'] = _emscripten_enum_ImGuiScrollFlags_ImGuiScrollFlags_KeepVisibleCenterY();

    Module['ImGuiScrollFlags_AlwaysCenterX'] = _emscripten_enum_ImGuiScrollFlags_ImGuiScrollFlags_AlwaysCenterX();

    Module['ImGuiScrollFlags_AlwaysCenterY'] = _emscripten_enum_ImGuiScrollFlags_ImGuiScrollFlags_AlwaysCenterY();

    Module['ImGuiScrollFlags_NoScrollParent'] = _emscripten_enum_ImGuiScrollFlags_ImGuiScrollFlags_NoScrollParent();

    Module['ImGuiScrollFlags_MaskX_'] = _emscripten_enum_ImGuiScrollFlags_ImGuiScrollFlags_MaskX_();

    Module['ImGuiScrollFlags_MaskY_'] = _emscripten_enum_ImGuiScrollFlags_ImGuiScrollFlags_MaskY_();

    

    Module['ImGuiNavRenderCursorFlags_None'] = _emscripten_enum_ImGuiNavRenderCursorFlags_ImGuiNavRenderCursorFlags_None();

    Module['ImGuiNavRenderCursorFlags_Compact'] = _emscripten_enum_ImGuiNavRenderCursorFlags_ImGuiNavRenderCursorFlags_Compact();

    Module['ImGuiNavRenderCursorFlags_AlwaysDraw'] = _emscripten_enum_ImGuiNavRenderCursorFlags_ImGuiNavRenderCursorFlags_AlwaysDraw();

    Module['ImGuiNavRenderCursorFlags_NoRounding'] = _emscripten_enum_ImGuiNavRenderCursorFlags_ImGuiNavRenderCursorFlags_NoRounding();

    

    Module['ImGuiNavMoveFlags_None'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_None();

    Module['ImGuiNavMoveFlags_LoopX'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_LoopX();

    Module['ImGuiNavMoveFlags_LoopY'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_LoopY();

    Module['ImGuiNavMoveFlags_WrapX'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_WrapX();

    Module['ImGuiNavMoveFlags_WrapY'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_WrapY();

    Module['ImGuiNavMoveFlags_WrapMask_'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_WrapMask_();

    Module['ImGuiNavMoveFlags_AllowCurrentNavId'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_AllowCurrentNavId();

    Module['ImGuiNavMoveFlags_AlsoScoreVisibleSet'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_AlsoScoreVisibleSet();

    Module['ImGuiNavMoveFlags_ScrollToEdgeY'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_ScrollToEdgeY();

    Module['ImGuiNavMoveFlags_Forwarded'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_Forwarded();

    Module['ImGuiNavMoveFlags_DebugNoResult'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_DebugNoResult();

    Module['ImGuiNavMoveFlags_FocusApi'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_FocusApi();

    Module['ImGuiNavMoveFlags_IsTabbing'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_IsTabbing();

    Module['ImGuiNavMoveFlags_IsPageMove'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_IsPageMove();

    Module['ImGuiNavMoveFlags_Activate'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_Activate();

    Module['ImGuiNavMoveFlags_NoSelect'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_NoSelect();

    Module['ImGuiNavMoveFlags_NoSetNavCursorVisible'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_NoSetNavCursorVisible();

    Module['ImGuiNavMoveFlags_NoClearActiveId'] = _emscripten_enum_ImGuiNavMoveFlags_ImGuiNavMoveFlags_NoClearActiveId();

    

    Module['ImGuiNavLayer_Main'] = _emscripten_enum_ImGuiNavLayer_ImGuiNavLayer_Main();

    Module['ImGuiNavLayer_Menu'] = _emscripten_enum_ImGuiNavLayer_ImGuiNavLayer_Menu();

    Module['ImGuiNavLayer_COUNT'] = _emscripten_enum_ImGuiNavLayer_ImGuiNavLayer_COUNT();

    

    Module['ImGuiTypingSelectFlags_None'] = _emscripten_enum_ImGuiTypingSelectFlags_ImGuiTypingSelectFlags_None();

    Module['ImGuiTypingSelectFlags_AllowBackspace'] = _emscripten_enum_ImGuiTypingSelectFlags_ImGuiTypingSelectFlags_AllowBackspace();

    Module['ImGuiTypingSelectFlags_AllowSingleCharMode'] = _emscripten_enum_ImGuiTypingSelectFlags_ImGuiTypingSelectFlags_AllowSingleCharMode();

    

    Module['ImGuiOldColumnFlags_None'] = _emscripten_enum_ImGuiOldColumnFlags_ImGuiOldColumnFlags_None();

    Module['ImGuiOldColumnFlags_NoBorder'] = _emscripten_enum_ImGuiOldColumnFlags_ImGuiOldColumnFlags_NoBorder();

    Module['ImGuiOldColumnFlags_NoResize'] = _emscripten_enum_ImGuiOldColumnFlags_ImGuiOldColumnFlags_NoResize();

    Module['ImGuiOldColumnFlags_NoPreserveWidths'] = _emscripten_enum_ImGuiOldColumnFlags_ImGuiOldColumnFlags_NoPreserveWidths();

    Module['ImGuiOldColumnFlags_NoForceWithinWindow'] = _emscripten_enum_ImGuiOldColumnFlags_ImGuiOldColumnFlags_NoForceWithinWindow();

    Module['ImGuiOldColumnFlags_GrowParentContentsSize'] = _emscripten_enum_ImGuiOldColumnFlags_ImGuiOldColumnFlags_GrowParentContentsSize();

    

    Module['ImGuiDockNodeFlags_DockSpace'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_DockSpace();

    Module['ImGuiDockNodeFlags_CentralNode'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_CentralNode();

    Module['ImGuiDockNodeFlags_NoTabBar'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_NoTabBar();

    Module['ImGuiDockNodeFlags_HiddenTabBar'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_HiddenTabBar();

    Module['ImGuiDockNodeFlags_NoWindowMenuButton'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_NoWindowMenuButton();

    Module['ImGuiDockNodeFlags_NoCloseButton'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_NoCloseButton();

    Module['ImGuiDockNodeFlags_NoResizeX'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_NoResizeX();

    Module['ImGuiDockNodeFlags_NoResizeY'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_NoResizeY();

    Module['ImGuiDockNodeFlags_DockedWindowsInFocusRoute'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_DockedWindowsInFocusRoute();

    Module['ImGuiDockNodeFlags_NoDockingSplitOther'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_NoDockingSplitOther();

    Module['ImGuiDockNodeFlags_NoDockingOverMe'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_NoDockingOverMe();

    Module['ImGuiDockNodeFlags_NoDockingOverOther'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_NoDockingOverOther();

    Module['ImGuiDockNodeFlags_NoDockingOverEmpty'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_NoDockingOverEmpty();

    Module['ImGuiDockNodeFlags_NoDocking'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_NoDocking();

    Module['ImGuiDockNodeFlags_SharedFlagsInheritMask_'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_SharedFlagsInheritMask_();

    Module['ImGuiDockNodeFlags_NoResizeFlagsMask_'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_NoResizeFlagsMask_();

    Module['ImGuiDockNodeFlags_LocalFlagsTransferMask_'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_LocalFlagsTransferMask_();

    Module['ImGuiDockNodeFlags_SavedFlagsMask_'] = _emscripten_enum_ImGuiDockNodeFlagsPrivate__ImGuiDockNodeFlags_SavedFlagsMask_();

    

    Module['ImGuiDataAuthority_Auto'] = _emscripten_enum_ImGuiDataAuthority_ImGuiDataAuthority_Auto();

    Module['ImGuiDataAuthority_DockNode'] = _emscripten_enum_ImGuiDataAuthority_ImGuiDataAuthority_DockNode();

    Module['ImGuiDataAuthority_Window'] = _emscripten_enum_ImGuiDataAuthority_ImGuiDataAuthority_Window();

    

    Module['ImGuiDockNodeState_Unknown'] = _emscripten_enum_ImGuiDockNodeState_ImGuiDockNodeState_Unknown();

    Module['ImGuiDockNodeState_HostWindowHiddenBecauseSingleWindow'] = _emscripten_enum_ImGuiDockNodeState_ImGuiDockNodeState_HostWindowHiddenBecauseSingleWindow();

    Module['ImGuiDockNodeState_HostWindowHiddenBecauseWindowsAreResizing'] = _emscripten_enum_ImGuiDockNodeState_ImGuiDockNodeState_HostWindowHiddenBecauseWindowsAreResizing();

    Module['ImGuiDockNodeState_HostWindowVisible'] = _emscripten_enum_ImGuiDockNodeState_ImGuiDockNodeState_HostWindowVisible();

    

    Module['ImGuiWindowDockStyleCol_Text'] = _emscripten_enum_ImGuiWindowDockStyleCol_ImGuiWindowDockStyleCol_Text();

    Module['ImGuiWindowDockStyleCol_TabHovered'] = _emscripten_enum_ImGuiWindowDockStyleCol_ImGuiWindowDockStyleCol_TabHovered();

    Module['ImGuiWindowDockStyleCol_TabFocused'] = _emscripten_enum_ImGuiWindowDockStyleCol_ImGuiWindowDockStyleCol_TabFocused();

    Module['ImGuiWindowDockStyleCol_TabSelected'] = _emscripten_enum_ImGuiWindowDockStyleCol_ImGuiWindowDockStyleCol_TabSelected();

    Module['ImGuiWindowDockStyleCol_TabSelectedOverline'] = _emscripten_enum_ImGuiWindowDockStyleCol_ImGuiWindowDockStyleCol_TabSelectedOverline();

    Module['ImGuiWindowDockStyleCol_TabDimmed'] = _emscripten_enum_ImGuiWindowDockStyleCol_ImGuiWindowDockStyleCol_TabDimmed();

    Module['ImGuiWindowDockStyleCol_TabDimmedSelected'] = _emscripten_enum_ImGuiWindowDockStyleCol_ImGuiWindowDockStyleCol_TabDimmedSelected();

    Module['ImGuiWindowDockStyleCol_TabDimmedSelectedOverline'] = _emscripten_enum_ImGuiWindowDockStyleCol_ImGuiWindowDockStyleCol_TabDimmedSelectedOverline();

    Module['ImGuiWindowDockStyleCol_COUNT'] = _emscripten_enum_ImGuiWindowDockStyleCol_ImGuiWindowDockStyleCol_COUNT();

    

    Module['ImGuiLocKey_VersionStr'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_VersionStr();

    Module['ImGuiLocKey_TableSizeOne'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_TableSizeOne();

    Module['ImGuiLocKey_TableSizeAllFit'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_TableSizeAllFit();

    Module['ImGuiLocKey_TableSizeAllDefault'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_TableSizeAllDefault();

    Module['ImGuiLocKey_TableResetOrder'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_TableResetOrder();

    Module['ImGuiLocKey_WindowingMainMenuBar'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_WindowingMainMenuBar();

    Module['ImGuiLocKey_WindowingPopup'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_WindowingPopup();

    Module['ImGuiLocKey_WindowingUntitled'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_WindowingUntitled();

    Module['ImGuiLocKey_OpenLink_s'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_OpenLink_s();

    Module['ImGuiLocKey_CopyLink'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_CopyLink();

    Module['ImGuiLocKey_DockingHideTabBar'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_DockingHideTabBar();

    Module['ImGuiLocKey_DockingHoldShiftToDock'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_DockingHoldShiftToDock();

    Module['ImGuiLocKey_DockingDragToUndockOrMoveNode'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_DockingDragToUndockOrMoveNode();

    Module['ImGuiLocKey_COUNT'] = _emscripten_enum_ImGuiLocKey_ImGuiLocKey_COUNT();

    

    Module['ImGuiDebugLogFlags_None'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_None();

    Module['ImGuiDebugLogFlags_EventError'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventError();

    Module['ImGuiDebugLogFlags_EventActiveId'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventActiveId();

    Module['ImGuiDebugLogFlags_EventFocus'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventFocus();

    Module['ImGuiDebugLogFlags_EventPopup'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventPopup();

    Module['ImGuiDebugLogFlags_EventNav'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventNav();

    Module['ImGuiDebugLogFlags_EventClipper'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventClipper();

    Module['ImGuiDebugLogFlags_EventSelection'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventSelection();

    Module['ImGuiDebugLogFlags_EventIO'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventIO();

    Module['ImGuiDebugLogFlags_EventFont'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventFont();

    Module['ImGuiDebugLogFlags_EventInputRouting'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventInputRouting();

    Module['ImGuiDebugLogFlags_EventDocking'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventDocking();

    Module['ImGuiDebugLogFlags_EventViewport'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventViewport();

    Module['ImGuiDebugLogFlags_EventMask_'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_EventMask_();

    Module['ImGuiDebugLogFlags_OutputToTTY'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_OutputToTTY();

    Module['ImGuiDebugLogFlags_OutputToTestEngine'] = _emscripten_enum_ImGuiDebugLogFlags_ImGuiDebugLogFlags_OutputToTestEngine();

    

    Module['ImGuiTabBarFlags_DockNode'] = _emscripten_enum_ImGuiTabBarFlagsPrivate__ImGuiTabBarFlags_DockNode();

    Module['ImGuiTabBarFlags_IsFocused'] = _emscripten_enum_ImGuiTabBarFlagsPrivate__ImGuiTabBarFlags_IsFocused();

    Module['ImGuiTabBarFlags_SaveSettings'] = _emscripten_enum_ImGuiTabBarFlagsPrivate__ImGuiTabBarFlags_SaveSettings();

    

    Module['ImGuiTabItemFlags_SectionMask_'] = _emscripten_enum_ImGuiTabItemFlagsPrivate__ImGuiTabItemFlags_SectionMask_();

    Module['ImGuiTabItemFlags_NoCloseButton'] = _emscripten_enum_ImGuiTabItemFlagsPrivate__ImGuiTabItemFlags_NoCloseButton();

    Module['ImGuiTabItemFlags_Button'] = _emscripten_enum_ImGuiTabItemFlagsPrivate__ImGuiTabItemFlags_Button();

    Module['ImGuiTabItemFlags_Invisible'] = _emscripten_enum_ImGuiTabItemFlagsPrivate__ImGuiTabItemFlags_Invisible();

    Module['ImGuiTabItemFlags_Unsorted'] = _emscripten_enum_ImGuiTabItemFlagsPrivate__ImGuiTabItemFlags_Unsorted();

  }
  if (runtimeInitialized) setupEnums();
  else addOnInit(setupEnums);
})();

        Object.assign(window.idl, Module);
        Object.assign(Module, modifiedExports);

        return Module;
    };
})();