var jWebGPU = (() => {
    return async function(moduleArg = {}) {
        var Module = moduleArg;

        function assert(condition, text) {
          if (!condition) {
            abort('Assertion failed' + (text ? ': ' + text : ''));
          }
        }

        var libName = "jWebGPU.wasm";
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

function WGPUCompilationInfoCallback() { throw "cannot construct a WGPUCompilationInfoCallback, no constructor in IDL" }
WGPUCompilationInfoCallback.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUCompilationInfoCallback.prototype.constructor = WGPUCompilationInfoCallback;
WGPUCompilationInfoCallback.prototype.__class__ = WGPUCompilationInfoCallback;
WGPUCompilationInfoCallback.__cache__ = {};
Module['WGPUCompilationInfoCallback'] = WGPUCompilationInfoCallback;

WGPUCompilationInfoCallback.prototype['__destroy__'] = WGPUCompilationInfoCallback.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUCompilationInfoCallback___destroy___0(self);
};

function WGPURequestAdapterCallback() { throw "cannot construct a WGPURequestAdapterCallback, no constructor in IDL" }
WGPURequestAdapterCallback.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURequestAdapterCallback.prototype.constructor = WGPURequestAdapterCallback;
WGPURequestAdapterCallback.prototype.__class__ = WGPURequestAdapterCallback;
WGPURequestAdapterCallback.__cache__ = {};
Module['WGPURequestAdapterCallback'] = WGPURequestAdapterCallback;

WGPURequestAdapterCallback.prototype['__destroy__'] = WGPURequestAdapterCallback.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURequestAdapterCallback___destroy___0(self);
};

function WGPURequestDeviceCallback() { throw "cannot construct a WGPURequestDeviceCallback, no constructor in IDL" }
WGPURequestDeviceCallback.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURequestDeviceCallback.prototype.constructor = WGPURequestDeviceCallback;
WGPURequestDeviceCallback.prototype.__class__ = WGPURequestDeviceCallback;
WGPURequestDeviceCallback.__cache__ = {};
Module['WGPURequestDeviceCallback'] = WGPURequestDeviceCallback;

WGPURequestDeviceCallback.prototype['__destroy__'] = WGPURequestDeviceCallback.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURequestDeviceCallback___destroy___0(self);
};

function WGPUUncapturedErrorCallback() { throw "cannot construct a WGPUUncapturedErrorCallback, no constructor in IDL" }
WGPUUncapturedErrorCallback.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUUncapturedErrorCallback.prototype.constructor = WGPUUncapturedErrorCallback;
WGPUUncapturedErrorCallback.prototype.__class__ = WGPUUncapturedErrorCallback;
WGPUUncapturedErrorCallback.__cache__ = {};
Module['WGPUUncapturedErrorCallback'] = WGPUUncapturedErrorCallback;

WGPUUncapturedErrorCallback.prototype['__destroy__'] = WGPUUncapturedErrorCallback.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUUncapturedErrorCallback___destroy___0(self);
};

function WGPUBufferMapCallback() { throw "cannot construct a WGPUBufferMapCallback, no constructor in IDL" }
WGPUBufferMapCallback.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBufferMapCallback.prototype.constructor = WGPUBufferMapCallback;
WGPUBufferMapCallback.prototype.__class__ = WGPUBufferMapCallback;
WGPUBufferMapCallback.__cache__ = {};
Module['WGPUBufferMapCallback'] = WGPUBufferMapCallback;

WGPUBufferMapCallback.prototype['__destroy__'] = WGPUBufferMapCallback.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBufferMapCallback___destroy___0(self);
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

function WGPU() { throw "cannot construct a WGPU, no constructor in IDL" }
WGPU.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPU.prototype.constructor = WGPU;
WGPU.prototype.__class__ = WGPU;
WGPU.__cache__ = {};
Module['WGPU'] = WGPU;

WGPU.prototype['GetPlatformType'] = WGPU.prototype.GetPlatformType = function() {
  return _emscripten_bind_WGPU_GetPlatformType_0();
};

WGPU.prototype['SetupInstance'] = WGPU.prototype.SetupInstance = function(descriptor) {
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (descriptor === undefined) { return wrapPointer(_emscripten_bind_WGPU_SetupInstance_0(), WGPUInstance) }
  return wrapPointer(_emscripten_bind_WGPU_SetupInstance_1(descriptor), WGPUInstance);
};

WGPU.prototype['loadImage'] = WGPU.prototype.loadImage = function(buffer, desiredChannels) {
  if (buffer && typeof buffer === 'object') buffer = buffer.ptr;
  if (desiredChannels && typeof desiredChannels === 'object') desiredChannels = desiredChannels.ptr;
  if (desiredChannels === undefined) { return wrapPointer(_emscripten_bind_WGPU_loadImage_1(buffer), STBImage) }
  return wrapPointer(_emscripten_bind_WGPU_loadImage_2(buffer, desiredChannels), STBImage);
};

WGPU.prototype['__destroy__'] = WGPU.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPU___destroy___0(self);
};

function STBImage() { throw "cannot construct a STBImage, no constructor in IDL" }
STBImage.prototype = Object.create(window.idl.WrapperObject.prototype);
STBImage.prototype.constructor = STBImage;
STBImage.prototype.__class__ = STBImage;
STBImage.__cache__ = {};
Module['STBImage'] = STBImage;

STBImage.prototype['GetPixels'] = STBImage.prototype.GetPixels = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_STBImage_GetPixels_0(self), WGPUByteBuffer);
};

STBImage.prototype['GetWidth'] = STBImage.prototype.GetWidth = function() {
  var self = this.ptr;
  return _emscripten_bind_STBImage_GetWidth_0(self);
};

STBImage.prototype['GetHeight'] = STBImage.prototype.GetHeight = function() {
  var self = this.ptr;
  return _emscripten_bind_STBImage_GetHeight_0(self);
};

STBImage.prototype['GetFormat'] = STBImage.prototype.GetFormat = function() {
  var self = this.ptr;
  return _emscripten_bind_STBImage_GetFormat_0(self);
};

STBImage.prototype['__destroy__'] = STBImage.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_STBImage___destroy___0(self);
};

function WGPUAndroidWindow() {
  this.ptr = _emscripten_bind_WGPUAndroidWindow_WGPUAndroidWindow_0();
  window.idl.getCache(WGPUAndroidWindow)[this.ptr] = this;
};

WGPUAndroidWindow.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUAndroidWindow.prototype.constructor = WGPUAndroidWindow;
WGPUAndroidWindow.prototype.__class__ = WGPUAndroidWindow;
WGPUAndroidWindow.__cache__ = {};
Module['WGPUAndroidWindow'] = WGPUAndroidWindow;

WGPUAndroidWindow.prototype['InitLogcat'] = WGPUAndroidWindow.prototype.InitLogcat = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUAndroidWindow_InitLogcat_0(self);
};

WGPUAndroidWindow.prototype['__destroy__'] = WGPUAndroidWindow.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUAndroidWindow___destroy___0(self);
};

function WGPUByteBuffer(capacity) {
  if (capacity && typeof capacity === 'object') capacity = capacity.ptr;
  this.ptr = _emscripten_bind_WGPUByteBuffer_WGPUByteBuffer_1(capacity);
  window.idl.getCache(WGPUByteBuffer)[this.ptr] = this;
};

WGPUByteBuffer.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUByteBuffer.prototype.constructor = WGPUByteBuffer;
WGPUByteBuffer.prototype.__class__ = WGPUByteBuffer;
WGPUByteBuffer.__cache__ = {};
Module['WGPUByteBuffer'] = WGPUByteBuffer;

WGPUByteBuffer.prototype['Obtain'] = WGPUByteBuffer.prototype.Obtain = function(capacity) {
  if (capacity && typeof capacity === 'object') capacity = capacity.ptr;
  return wrapPointer(_emscripten_bind_WGPUByteBuffer_Obtain_1(capacity), WGPUByteBuffer);
};

WGPUByteBuffer.prototype['order'] = WGPUByteBuffer.prototype.order = function(order) {
  var self = this.ptr;
  if (order && typeof order === 'object') order = order.ptr;
  _emscripten_bind_WGPUByteBuffer_order_1(self, order);
};

WGPUByteBuffer.prototype['get'] = WGPUByteBuffer.prototype.get = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (index === undefined) { return _emscripten_bind_WGPUByteBuffer_get_0(self) }
  return _emscripten_bind_WGPUByteBuffer_get_1(self, index);
};

WGPUByteBuffer.prototype['put__0'] = WGPUByteBuffer.prototype.put__0 = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUByteBuffer_put__0_1(self, value);
};

WGPUByteBuffer.prototype['put__1'] = WGPUByteBuffer.prototype.put__1 = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUByteBuffer_put__1_2(self, index, value);
};

WGPUByteBuffer.prototype['putInt'] = WGPUByteBuffer.prototype.putInt = function(byteIndex, value) {
  var self = this.ptr;
  if (byteIndex && typeof byteIndex === 'object') byteIndex = byteIndex.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUByteBuffer_putInt_2(self, byteIndex, value);
};

WGPUByteBuffer.prototype['getInt'] = WGPUByteBuffer.prototype.getInt = function(byteIndex) {
  var self = this.ptr;
  if (byteIndex && typeof byteIndex === 'object') byteIndex = byteIndex.ptr;
  return _emscripten_bind_WGPUByteBuffer_getInt_1(self, byteIndex);
};

WGPUByteBuffer.prototype['putFloat'] = WGPUByteBuffer.prototype.putFloat = function(byteIndex, value) {
  var self = this.ptr;
  if (byteIndex && typeof byteIndex === 'object') byteIndex = byteIndex.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUByteBuffer_putFloat_2(self, byteIndex, value);
};

WGPUByteBuffer.prototype['getFloat'] = WGPUByteBuffer.prototype.getFloat = function(byteIndex) {
  var self = this.ptr;
  if (byteIndex && typeof byteIndex === 'object') byteIndex = byteIndex.ptr;
  return _emscripten_bind_WGPUByteBuffer_getFloat_1(self, byteIndex);
};

WGPUByteBuffer.prototype['remaining'] = WGPUByteBuffer.prototype.remaining = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUByteBuffer_remaining_0(self);
};

WGPUByteBuffer.prototype['getCapacity'] = WGPUByteBuffer.prototype.getCapacity = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUByteBuffer_getCapacity_0(self);
};

WGPUByteBuffer.prototype['position'] = WGPUByteBuffer.prototype.position = function(newPosition) {
  var self = this.ptr;
  if (newPosition && typeof newPosition === 'object') newPosition = newPosition.ptr;
  _emscripten_bind_WGPUByteBuffer_position_1(self, newPosition);
};

WGPUByteBuffer.prototype['getPosition'] = WGPUByteBuffer.prototype.getPosition = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUByteBuffer_getPosition_0(self);
};

WGPUByteBuffer.prototype['limit'] = WGPUByteBuffer.prototype.limit = function(newLimit) {
  var self = this.ptr;
  if (newLimit && typeof newLimit === 'object') newLimit = newLimit.ptr;
  _emscripten_bind_WGPUByteBuffer_limit_1(self, newLimit);
};

WGPUByteBuffer.prototype['getLimit'] = WGPUByteBuffer.prototype.getLimit = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUByteBuffer_getLimit_0(self);
};

WGPUByteBuffer.prototype['clear'] = WGPUByteBuffer.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUByteBuffer_clear_0(self);
};

WGPUByteBuffer.prototype['flip'] = WGPUByteBuffer.prototype.flip = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUByteBuffer_flip_0(self);
};

WGPUByteBuffer.prototype['asFloatBuffer'] = WGPUByteBuffer.prototype.asFloatBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUByteBuffer_asFloatBuffer_0(self), WGPUFloatBuffer);
};

WGPUByteBuffer.prototype['asIntBuffer'] = WGPUByteBuffer.prototype.asIntBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUByteBuffer_asIntBuffer_0(self), WGPUIntBuffer);
};

WGPUByteBuffer.prototype['asLongBuffer'] = WGPUByteBuffer.prototype.asLongBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUByteBuffer_asLongBuffer_0(self), WGPULongBuffer);
};

WGPUByteBuffer.prototype['asShortBuffer'] = WGPUByteBuffer.prototype.asShortBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUByteBuffer_asShortBuffer_0(self), WGPUShortBuffer);
};

WGPUByteBuffer.prototype['__destroy__'] = WGPUByteBuffer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUByteBuffer___destroy___0(self);
};

function WGPUFloatBuffer() { throw "cannot construct a WGPUFloatBuffer, no constructor in IDL" }
WGPUFloatBuffer.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUFloatBuffer.prototype.constructor = WGPUFloatBuffer;
WGPUFloatBuffer.prototype.__class__ = WGPUFloatBuffer;
WGPUFloatBuffer.__cache__ = {};
Module['WGPUFloatBuffer'] = WGPUFloatBuffer;

WGPUFloatBuffer.prototype['getByteBuffer'] = WGPUFloatBuffer.prototype.getByteBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUFloatBuffer_getByteBuffer_0(self), WGPUByteBuffer);
};

WGPUFloatBuffer.prototype['put__0'] = WGPUFloatBuffer.prototype.put__0 = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUFloatBuffer_put__0_1(self, value);
};

WGPUFloatBuffer.prototype['put__1'] = WGPUFloatBuffer.prototype.put__1 = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUFloatBuffer_put__1_2(self, index, value);
};

WGPUFloatBuffer.prototype['put__2'] = WGPUFloatBuffer.prototype.put__2 = function(values, offset, size) {
  var self = this.ptr;
  ensureCache.prepare();
  if (typeof values == 'object') { values = ensureFloat32(values); }
  if (offset && typeof offset === 'object') offset = offset.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_WGPUFloatBuffer_put__2_3(self, values, offset, size);
};

WGPUFloatBuffer.prototype['get'] = WGPUFloatBuffer.prototype.get = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (index === undefined) { return _emscripten_bind_WGPUFloatBuffer_get_0(self) }
  return _emscripten_bind_WGPUFloatBuffer_get_1(self, index);
};

WGPUFloatBuffer.prototype['remaining'] = WGPUFloatBuffer.prototype.remaining = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUFloatBuffer_remaining_0(self);
};

WGPUFloatBuffer.prototype['getCapacity'] = WGPUFloatBuffer.prototype.getCapacity = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUFloatBuffer_getCapacity_0(self);
};

WGPUFloatBuffer.prototype['clear'] = WGPUFloatBuffer.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUFloatBuffer_clear_0(self);
};

WGPUFloatBuffer.prototype['limit'] = WGPUFloatBuffer.prototype.limit = function(newLimit) {
  var self = this.ptr;
  if (newLimit && typeof newLimit === 'object') newLimit = newLimit.ptr;
  _emscripten_bind_WGPUFloatBuffer_limit_1(self, newLimit);
};

WGPUFloatBuffer.prototype['getLimit'] = WGPUFloatBuffer.prototype.getLimit = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUFloatBuffer_getLimit_0(self);
};

WGPUFloatBuffer.prototype['position'] = WGPUFloatBuffer.prototype.position = function(newPosition) {
  var self = this.ptr;
  if (newPosition && typeof newPosition === 'object') newPosition = newPosition.ptr;
  _emscripten_bind_WGPUFloatBuffer_position_1(self, newPosition);
};

WGPUFloatBuffer.prototype['getPosition'] = WGPUFloatBuffer.prototype.getPosition = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUFloatBuffer_getPosition_0(self);
};

WGPUFloatBuffer.prototype['flip'] = WGPUFloatBuffer.prototype.flip = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUFloatBuffer_flip_0(self);
};

WGPUFloatBuffer.prototype['__destroy__'] = WGPUFloatBuffer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUFloatBuffer___destroy___0(self);
};

function WGPUIntBuffer() { throw "cannot construct a WGPUIntBuffer, no constructor in IDL" }
WGPUIntBuffer.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUIntBuffer.prototype.constructor = WGPUIntBuffer;
WGPUIntBuffer.prototype.__class__ = WGPUIntBuffer;
WGPUIntBuffer.__cache__ = {};
Module['WGPUIntBuffer'] = WGPUIntBuffer;

WGPUIntBuffer.prototype['getByteBuffer'] = WGPUIntBuffer.prototype.getByteBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUIntBuffer_getByteBuffer_0(self), WGPUByteBuffer);
};

WGPUIntBuffer.prototype['put__0'] = WGPUIntBuffer.prototype.put__0 = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUIntBuffer_put__0_1(self, value);
};

WGPUIntBuffer.prototype['put__1'] = WGPUIntBuffer.prototype.put__1 = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUIntBuffer_put__1_2(self, index, value);
};

WGPUIntBuffer.prototype['get'] = WGPUIntBuffer.prototype.get = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (index === undefined) { return _emscripten_bind_WGPUIntBuffer_get_0(self) }
  return _emscripten_bind_WGPUIntBuffer_get_1(self, index);
};

WGPUIntBuffer.prototype['remaining'] = WGPUIntBuffer.prototype.remaining = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUIntBuffer_remaining_0(self);
};

WGPUIntBuffer.prototype['getCapacity'] = WGPUIntBuffer.prototype.getCapacity = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUIntBuffer_getCapacity_0(self);
};

WGPUIntBuffer.prototype['clear'] = WGPUIntBuffer.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUIntBuffer_clear_0(self);
};

WGPUIntBuffer.prototype['limit'] = WGPUIntBuffer.prototype.limit = function(newLimit) {
  var self = this.ptr;
  if (newLimit && typeof newLimit === 'object') newLimit = newLimit.ptr;
  _emscripten_bind_WGPUIntBuffer_limit_1(self, newLimit);
};

WGPUIntBuffer.prototype['getLimit'] = WGPUIntBuffer.prototype.getLimit = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUIntBuffer_getLimit_0(self);
};

WGPUIntBuffer.prototype['position'] = WGPUIntBuffer.prototype.position = function(newPosition) {
  var self = this.ptr;
  if (newPosition && typeof newPosition === 'object') newPosition = newPosition.ptr;
  _emscripten_bind_WGPUIntBuffer_position_1(self, newPosition);
};

WGPUIntBuffer.prototype['getPosition'] = WGPUIntBuffer.prototype.getPosition = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUIntBuffer_getPosition_0(self);
};

WGPUIntBuffer.prototype['flip'] = WGPUIntBuffer.prototype.flip = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUIntBuffer_flip_0(self);
};

WGPUIntBuffer.prototype['__destroy__'] = WGPUIntBuffer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUIntBuffer___destroy___0(self);
};

function WGPULongBuffer() { throw "cannot construct a WGPULongBuffer, no constructor in IDL" }
WGPULongBuffer.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPULongBuffer.prototype.constructor = WGPULongBuffer;
WGPULongBuffer.prototype.__class__ = WGPULongBuffer;
WGPULongBuffer.__cache__ = {};
Module['WGPULongBuffer'] = WGPULongBuffer;

WGPULongBuffer.prototype['getByteBuffer'] = WGPULongBuffer.prototype.getByteBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPULongBuffer_getByteBuffer_0(self), WGPUByteBuffer);
};

WGPULongBuffer.prototype['put__0'] = WGPULongBuffer.prototype.put__0 = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULongBuffer_put__0_1(self, value);
};

WGPULongBuffer.prototype['put__1'] = WGPULongBuffer.prototype.put__1 = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULongBuffer_put__1_2(self, index, value);
};

WGPULongBuffer.prototype['get'] = WGPULongBuffer.prototype.get = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (index === undefined) { return _emscripten_bind_WGPULongBuffer_get_0(self) }
  return _emscripten_bind_WGPULongBuffer_get_1(self, index);
};

WGPULongBuffer.prototype['remaining'] = WGPULongBuffer.prototype.remaining = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULongBuffer_remaining_0(self);
};

WGPULongBuffer.prototype['getCapacity'] = WGPULongBuffer.prototype.getCapacity = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULongBuffer_getCapacity_0(self);
};

WGPULongBuffer.prototype['clear'] = WGPULongBuffer.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPULongBuffer_clear_0(self);
};

WGPULongBuffer.prototype['limit'] = WGPULongBuffer.prototype.limit = function(newLimit) {
  var self = this.ptr;
  if (newLimit && typeof newLimit === 'object') newLimit = newLimit.ptr;
  _emscripten_bind_WGPULongBuffer_limit_1(self, newLimit);
};

WGPULongBuffer.prototype['getLimit'] = WGPULongBuffer.prototype.getLimit = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULongBuffer_getLimit_0(self);
};

WGPULongBuffer.prototype['position'] = WGPULongBuffer.prototype.position = function(newPosition) {
  var self = this.ptr;
  if (newPosition && typeof newPosition === 'object') newPosition = newPosition.ptr;
  _emscripten_bind_WGPULongBuffer_position_1(self, newPosition);
};

WGPULongBuffer.prototype['getPosition'] = WGPULongBuffer.prototype.getPosition = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULongBuffer_getPosition_0(self);
};

WGPULongBuffer.prototype['flip'] = WGPULongBuffer.prototype.flip = function() {
  var self = this.ptr;
  _emscripten_bind_WGPULongBuffer_flip_0(self);
};

WGPULongBuffer.prototype['__destroy__'] = WGPULongBuffer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPULongBuffer___destroy___0(self);
};

function WGPUShortBuffer() { throw "cannot construct a WGPUShortBuffer, no constructor in IDL" }
WGPUShortBuffer.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUShortBuffer.prototype.constructor = WGPUShortBuffer;
WGPUShortBuffer.prototype.__class__ = WGPUShortBuffer;
WGPUShortBuffer.__cache__ = {};
Module['WGPUShortBuffer'] = WGPUShortBuffer;

WGPUShortBuffer.prototype['getByteBuffer'] = WGPUShortBuffer.prototype.getByteBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUShortBuffer_getByteBuffer_0(self), WGPUByteBuffer);
};

WGPUShortBuffer.prototype['put__0'] = WGPUShortBuffer.prototype.put__0 = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUShortBuffer_put__0_1(self, value);
};

WGPUShortBuffer.prototype['put__1'] = WGPUShortBuffer.prototype.put__1 = function(index, value) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUShortBuffer_put__1_2(self, index, value);
};

WGPUShortBuffer.prototype['get'] = WGPUShortBuffer.prototype.get = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (index === undefined) { return _emscripten_bind_WGPUShortBuffer_get_0(self) }
  return _emscripten_bind_WGPUShortBuffer_get_1(self, index);
};

WGPUShortBuffer.prototype['remaining'] = WGPUShortBuffer.prototype.remaining = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUShortBuffer_remaining_0(self);
};

WGPUShortBuffer.prototype['getCapacity'] = WGPUShortBuffer.prototype.getCapacity = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUShortBuffer_getCapacity_0(self);
};

WGPUShortBuffer.prototype['clear'] = WGPUShortBuffer.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUShortBuffer_clear_0(self);
};

WGPUShortBuffer.prototype['limit'] = WGPUShortBuffer.prototype.limit = function(newLimit) {
  var self = this.ptr;
  if (newLimit && typeof newLimit === 'object') newLimit = newLimit.ptr;
  _emscripten_bind_WGPUShortBuffer_limit_1(self, newLimit);
};

WGPUShortBuffer.prototype['getLimit'] = WGPUShortBuffer.prototype.getLimit = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUShortBuffer_getLimit_0(self);
};

WGPUShortBuffer.prototype['position'] = WGPUShortBuffer.prototype.position = function(newPosition) {
  var self = this.ptr;
  if (newPosition && typeof newPosition === 'object') newPosition = newPosition.ptr;
  _emscripten_bind_WGPUShortBuffer_position_1(self, newPosition);
};

WGPUShortBuffer.prototype['getPosition'] = WGPUShortBuffer.prototype.getPosition = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUShortBuffer_getPosition_0(self);
};

WGPUShortBuffer.prototype['flip'] = WGPUShortBuffer.prototype.flip = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUShortBuffer_flip_0(self);
};

WGPUShortBuffer.prototype['__destroy__'] = WGPUShortBuffer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUShortBuffer___destroy___0(self);
};

function WGPUVectorCommandBuffer() {
  this.ptr = _emscripten_bind_WGPUVectorCommandBuffer_WGPUVectorCommandBuffer_0();
  window.idl.getCache(WGPUVectorCommandBuffer)[this.ptr] = this;
};

WGPUVectorCommandBuffer.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorCommandBuffer.prototype.constructor = WGPUVectorCommandBuffer;
WGPUVectorCommandBuffer.prototype.__class__ = WGPUVectorCommandBuffer;
WGPUVectorCommandBuffer.__cache__ = {};
Module['WGPUVectorCommandBuffer'] = WGPUVectorCommandBuffer;

WGPUVectorCommandBuffer.prototype['size'] = WGPUVectorCommandBuffer.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorCommandBuffer_size_0(self);
};

WGPUVectorCommandBuffer.prototype['clear'] = WGPUVectorCommandBuffer.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorCommandBuffer_clear_0(self);
};

WGPUVectorCommandBuffer.prototype['push_back'] = WGPUVectorCommandBuffer.prototype.push_back = function(entry) {
  var self = this.ptr;
  if (entry && typeof entry === 'object') entry = entry.ptr;
  _emscripten_bind_WGPUVectorCommandBuffer_push_back_1(self, entry);
};

WGPUVectorCommandBuffer.prototype['Obtain'] = WGPUVectorCommandBuffer.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorCommandBuffer_Obtain_0(), WGPUVectorCommandBuffer);
};

WGPUVectorCommandBuffer.prototype['__destroy__'] = WGPUVectorCommandBuffer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorCommandBuffer___destroy___0(self);
};

function WGPUVectorFutureWaitInfo() {
  this.ptr = _emscripten_bind_WGPUVectorFutureWaitInfo_WGPUVectorFutureWaitInfo_0();
  window.idl.getCache(WGPUVectorFutureWaitInfo)[this.ptr] = this;
};

WGPUVectorFutureWaitInfo.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorFutureWaitInfo.prototype.constructor = WGPUVectorFutureWaitInfo;
WGPUVectorFutureWaitInfo.prototype.__class__ = WGPUVectorFutureWaitInfo;
WGPUVectorFutureWaitInfo.__cache__ = {};
Module['WGPUVectorFutureWaitInfo'] = WGPUVectorFutureWaitInfo;

WGPUVectorFutureWaitInfo.prototype['size'] = WGPUVectorFutureWaitInfo.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorFutureWaitInfo_size_0(self);
};

WGPUVectorFutureWaitInfo.prototype['clear'] = WGPUVectorFutureWaitInfo.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorFutureWaitInfo_clear_0(self);
};

WGPUVectorFutureWaitInfo.prototype['push_back'] = WGPUVectorFutureWaitInfo.prototype.push_back = function(entry) {
  var self = this.ptr;
  if (entry && typeof entry === 'object') entry = entry.ptr;
  _emscripten_bind_WGPUVectorFutureWaitInfo_push_back_1(self, entry);
};

WGPUVectorFutureWaitInfo.prototype['Obtain'] = WGPUVectorFutureWaitInfo.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorFutureWaitInfo_Obtain_0(), WGPUVectorFutureWaitInfo);
};

WGPUVectorFutureWaitInfo.prototype['__destroy__'] = WGPUVectorFutureWaitInfo.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorFutureWaitInfo___destroy___0(self);
};

function WGPUVectorBindGroupEntry() {
  this.ptr = _emscripten_bind_WGPUVectorBindGroupEntry_WGPUVectorBindGroupEntry_0();
  window.idl.getCache(WGPUVectorBindGroupEntry)[this.ptr] = this;
};

WGPUVectorBindGroupEntry.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorBindGroupEntry.prototype.constructor = WGPUVectorBindGroupEntry;
WGPUVectorBindGroupEntry.prototype.__class__ = WGPUVectorBindGroupEntry;
WGPUVectorBindGroupEntry.__cache__ = {};
Module['WGPUVectorBindGroupEntry'] = WGPUVectorBindGroupEntry;

WGPUVectorBindGroupEntry.prototype['size'] = WGPUVectorBindGroupEntry.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorBindGroupEntry_size_0(self);
};

WGPUVectorBindGroupEntry.prototype['clear'] = WGPUVectorBindGroupEntry.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorBindGroupEntry_clear_0(self);
};

WGPUVectorBindGroupEntry.prototype['push_back'] = WGPUVectorBindGroupEntry.prototype.push_back = function(entry) {
  var self = this.ptr;
  if (entry && typeof entry === 'object') entry = entry.ptr;
  _emscripten_bind_WGPUVectorBindGroupEntry_push_back_1(self, entry);
};

WGPUVectorBindGroupEntry.prototype['Obtain'] = WGPUVectorBindGroupEntry.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorBindGroupEntry_Obtain_0(), WGPUVectorBindGroupEntry);
};

WGPUVectorBindGroupEntry.prototype['__destroy__'] = WGPUVectorBindGroupEntry.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorBindGroupEntry___destroy___0(self);
};

function WGPUVectorColorTargetState() {
  this.ptr = _emscripten_bind_WGPUVectorColorTargetState_WGPUVectorColorTargetState_0();
  window.idl.getCache(WGPUVectorColorTargetState)[this.ptr] = this;
};

WGPUVectorColorTargetState.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorColorTargetState.prototype.constructor = WGPUVectorColorTargetState;
WGPUVectorColorTargetState.prototype.__class__ = WGPUVectorColorTargetState;
WGPUVectorColorTargetState.__cache__ = {};
Module['WGPUVectorColorTargetState'] = WGPUVectorColorTargetState;

WGPUVectorColorTargetState.prototype['size'] = WGPUVectorColorTargetState.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorColorTargetState_size_0(self);
};

WGPUVectorColorTargetState.prototype['clear'] = WGPUVectorColorTargetState.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorColorTargetState_clear_0(self);
};

WGPUVectorColorTargetState.prototype['push_back'] = WGPUVectorColorTargetState.prototype.push_back = function(colorTargetState) {
  var self = this.ptr;
  if (colorTargetState && typeof colorTargetState === 'object') colorTargetState = colorTargetState.ptr;
  _emscripten_bind_WGPUVectorColorTargetState_push_back_1(self, colorTargetState);
};

WGPUVectorColorTargetState.prototype['Obtain'] = WGPUVectorColorTargetState.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorColorTargetState_Obtain_0(), WGPUVectorColorTargetState);
};

WGPUVectorColorTargetState.prototype['__destroy__'] = WGPUVectorColorTargetState.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorColorTargetState___destroy___0(self);
};

function WGPUVectorFeatureName() {
  this.ptr = _emscripten_bind_WGPUVectorFeatureName_WGPUVectorFeatureName_0();
  window.idl.getCache(WGPUVectorFeatureName)[this.ptr] = this;
};

WGPUVectorFeatureName.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorFeatureName.prototype.constructor = WGPUVectorFeatureName;
WGPUVectorFeatureName.prototype.__class__ = WGPUVectorFeatureName;
WGPUVectorFeatureName.__cache__ = {};
Module['WGPUVectorFeatureName'] = WGPUVectorFeatureName;

WGPUVectorFeatureName.prototype['size'] = WGPUVectorFeatureName.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorFeatureName_size_0(self);
};

WGPUVectorFeatureName.prototype['clear'] = WGPUVectorFeatureName.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorFeatureName_clear_0(self);
};

WGPUVectorFeatureName.prototype['push_back'] = WGPUVectorFeatureName.prototype.push_back = function(featureName) {
  var self = this.ptr;
  if (featureName && typeof featureName === 'object') featureName = featureName.ptr;
  _emscripten_bind_WGPUVectorFeatureName_push_back_1(self, featureName);
};

WGPUVectorFeatureName.prototype['Obtain'] = WGPUVectorFeatureName.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorFeatureName_Obtain_0(), WGPUVectorFeatureName);
};

WGPUVectorFeatureName.prototype['__destroy__'] = WGPUVectorFeatureName.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorFeatureName___destroy___0(self);
};

function WGPUVectorConstantEntry() {
  this.ptr = _emscripten_bind_WGPUVectorConstantEntry_WGPUVectorConstantEntry_0();
  window.idl.getCache(WGPUVectorConstantEntry)[this.ptr] = this;
};

WGPUVectorConstantEntry.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorConstantEntry.prototype.constructor = WGPUVectorConstantEntry;
WGPUVectorConstantEntry.prototype.__class__ = WGPUVectorConstantEntry;
WGPUVectorConstantEntry.__cache__ = {};
Module['WGPUVectorConstantEntry'] = WGPUVectorConstantEntry;

WGPUVectorConstantEntry.prototype['size'] = WGPUVectorConstantEntry.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorConstantEntry_size_0(self);
};

WGPUVectorConstantEntry.prototype['clear'] = WGPUVectorConstantEntry.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorConstantEntry_clear_0(self);
};

WGPUVectorConstantEntry.prototype['push_back'] = WGPUVectorConstantEntry.prototype.push_back = function(constantEntry) {
  var self = this.ptr;
  if (constantEntry && typeof constantEntry === 'object') constantEntry = constantEntry.ptr;
  _emscripten_bind_WGPUVectorConstantEntry_push_back_1(self, constantEntry);
};

WGPUVectorConstantEntry.prototype['Obtain'] = WGPUVectorConstantEntry.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorConstantEntry_Obtain_0(), WGPUVectorConstantEntry);
};

WGPUVectorConstantEntry.prototype['__destroy__'] = WGPUVectorConstantEntry.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorConstantEntry___destroy___0(self);
};

function WGPUVectorVertexBufferLayout() {
  this.ptr = _emscripten_bind_WGPUVectorVertexBufferLayout_WGPUVectorVertexBufferLayout_0();
  window.idl.getCache(WGPUVectorVertexBufferLayout)[this.ptr] = this;
};

WGPUVectorVertexBufferLayout.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorVertexBufferLayout.prototype.constructor = WGPUVectorVertexBufferLayout;
WGPUVectorVertexBufferLayout.prototype.__class__ = WGPUVectorVertexBufferLayout;
WGPUVectorVertexBufferLayout.__cache__ = {};
Module['WGPUVectorVertexBufferLayout'] = WGPUVectorVertexBufferLayout;

WGPUVectorVertexBufferLayout.prototype['size'] = WGPUVectorVertexBufferLayout.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorVertexBufferLayout_size_0(self);
};

WGPUVectorVertexBufferLayout.prototype['clear'] = WGPUVectorVertexBufferLayout.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorVertexBufferLayout_clear_0(self);
};

WGPUVectorVertexBufferLayout.prototype['push_back'] = WGPUVectorVertexBufferLayout.prototype.push_back = function(vertexBufferLayout) {
  var self = this.ptr;
  if (vertexBufferLayout && typeof vertexBufferLayout === 'object') vertexBufferLayout = vertexBufferLayout.ptr;
  _emscripten_bind_WGPUVectorVertexBufferLayout_push_back_1(self, vertexBufferLayout);
};

WGPUVectorVertexBufferLayout.prototype['Obtain'] = WGPUVectorVertexBufferLayout.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorVertexBufferLayout_Obtain_0(), WGPUVectorVertexBufferLayout);
};

WGPUVectorVertexBufferLayout.prototype['__destroy__'] = WGPUVectorVertexBufferLayout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorVertexBufferLayout___destroy___0(self);
};

function WGPUVectorTextureFormat() {
  this.ptr = _emscripten_bind_WGPUVectorTextureFormat_WGPUVectorTextureFormat_0();
  window.idl.getCache(WGPUVectorTextureFormat)[this.ptr] = this;
};

WGPUVectorTextureFormat.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorTextureFormat.prototype.constructor = WGPUVectorTextureFormat;
WGPUVectorTextureFormat.prototype.__class__ = WGPUVectorTextureFormat;
WGPUVectorTextureFormat.__cache__ = {};
Module['WGPUVectorTextureFormat'] = WGPUVectorTextureFormat;

WGPUVectorTextureFormat.prototype['size'] = WGPUVectorTextureFormat.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorTextureFormat_size_0(self);
};

WGPUVectorTextureFormat.prototype['clear'] = WGPUVectorTextureFormat.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorTextureFormat_clear_0(self);
};

WGPUVectorTextureFormat.prototype['push_back'] = WGPUVectorTextureFormat.prototype.push_back = function(textureFormat) {
  var self = this.ptr;
  if (textureFormat && typeof textureFormat === 'object') textureFormat = textureFormat.ptr;
  _emscripten_bind_WGPUVectorTextureFormat_push_back_1(self, textureFormat);
};

WGPUVectorTextureFormat.prototype['get'] = WGPUVectorTextureFormat.prototype.get = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_WGPUVectorTextureFormat_get_1(self, index);
};

WGPUVectorTextureFormat.prototype['Obtain'] = WGPUVectorTextureFormat.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorTextureFormat_Obtain_0(), WGPUVectorTextureFormat);
};

WGPUVectorTextureFormat.prototype['__destroy__'] = WGPUVectorTextureFormat.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorTextureFormat___destroy___0(self);
};

function WGPUVectorRenderBundle() {
  this.ptr = _emscripten_bind_WGPUVectorRenderBundle_WGPUVectorRenderBundle_0();
  window.idl.getCache(WGPUVectorRenderBundle)[this.ptr] = this;
};

WGPUVectorRenderBundle.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorRenderBundle.prototype.constructor = WGPUVectorRenderBundle;
WGPUVectorRenderBundle.prototype.__class__ = WGPUVectorRenderBundle;
WGPUVectorRenderBundle.__cache__ = {};
Module['WGPUVectorRenderBundle'] = WGPUVectorRenderBundle;

WGPUVectorRenderBundle.prototype['size'] = WGPUVectorRenderBundle.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorRenderBundle_size_0(self);
};

WGPUVectorRenderBundle.prototype['clear'] = WGPUVectorRenderBundle.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorRenderBundle_clear_0(self);
};

WGPUVectorRenderBundle.prototype['push_back'] = WGPUVectorRenderBundle.prototype.push_back = function(renderBundle) {
  var self = this.ptr;
  if (renderBundle && typeof renderBundle === 'object') renderBundle = renderBundle.ptr;
  _emscripten_bind_WGPUVectorRenderBundle_push_back_1(self, renderBundle);
};

WGPUVectorRenderBundle.prototype['Obtain'] = WGPUVectorRenderBundle.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorRenderBundle_Obtain_0(), WGPUVectorRenderBundle);
};

WGPUVectorRenderBundle.prototype['__destroy__'] = WGPUVectorRenderBundle.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorRenderBundle___destroy___0(self);
};

function WGPUVectorRenderPassColorAttachment() {
  this.ptr = _emscripten_bind_WGPUVectorRenderPassColorAttachment_WGPUVectorRenderPassColorAttachment_0();
  window.idl.getCache(WGPUVectorRenderPassColorAttachment)[this.ptr] = this;
};

WGPUVectorRenderPassColorAttachment.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorRenderPassColorAttachment.prototype.constructor = WGPUVectorRenderPassColorAttachment;
WGPUVectorRenderPassColorAttachment.prototype.__class__ = WGPUVectorRenderPassColorAttachment;
WGPUVectorRenderPassColorAttachment.__cache__ = {};
Module['WGPUVectorRenderPassColorAttachment'] = WGPUVectorRenderPassColorAttachment;

WGPUVectorRenderPassColorAttachment.prototype['size'] = WGPUVectorRenderPassColorAttachment.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorRenderPassColorAttachment_size_0(self);
};

WGPUVectorRenderPassColorAttachment.prototype['clear'] = WGPUVectorRenderPassColorAttachment.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorRenderPassColorAttachment_clear_0(self);
};

WGPUVectorRenderPassColorAttachment.prototype['push_back'] = WGPUVectorRenderPassColorAttachment.prototype.push_back = function(colorAttachment) {
  var self = this.ptr;
  if (colorAttachment && typeof colorAttachment === 'object') colorAttachment = colorAttachment.ptr;
  _emscripten_bind_WGPUVectorRenderPassColorAttachment_push_back_1(self, colorAttachment);
};

WGPUVectorRenderPassColorAttachment.prototype['Obtain'] = WGPUVectorRenderPassColorAttachment.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorRenderPassColorAttachment_Obtain_0(), WGPUVectorRenderPassColorAttachment);
};

WGPUVectorRenderPassColorAttachment.prototype['__destroy__'] = WGPUVectorRenderPassColorAttachment.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorRenderPassColorAttachment___destroy___0(self);
};

function WGPUVectorVertexAttribute() {
  this.ptr = _emscripten_bind_WGPUVectorVertexAttribute_WGPUVectorVertexAttribute_0();
  window.idl.getCache(WGPUVectorVertexAttribute)[this.ptr] = this;
};

WGPUVectorVertexAttribute.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorVertexAttribute.prototype.constructor = WGPUVectorVertexAttribute;
WGPUVectorVertexAttribute.prototype.__class__ = WGPUVectorVertexAttribute;
WGPUVectorVertexAttribute.__cache__ = {};
Module['WGPUVectorVertexAttribute'] = WGPUVectorVertexAttribute;

WGPUVectorVertexAttribute.prototype['size'] = WGPUVectorVertexAttribute.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorVertexAttribute_size_0(self);
};

WGPUVectorVertexAttribute.prototype['clear'] = WGPUVectorVertexAttribute.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorVertexAttribute_clear_0(self);
};

WGPUVectorVertexAttribute.prototype['push_back'] = WGPUVectorVertexAttribute.prototype.push_back = function(colorAttachment) {
  var self = this.ptr;
  if (colorAttachment && typeof colorAttachment === 'object') colorAttachment = colorAttachment.ptr;
  _emscripten_bind_WGPUVectorVertexAttribute_push_back_1(self, colorAttachment);
};

WGPUVectorVertexAttribute.prototype['Obtain'] = WGPUVectorVertexAttribute.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorVertexAttribute_Obtain_0(), WGPUVectorVertexAttribute);
};

WGPUVectorVertexAttribute.prototype['__destroy__'] = WGPUVectorVertexAttribute.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorVertexAttribute___destroy___0(self);
};

function WGPUVectorBindGroupLayout() {
  this.ptr = _emscripten_bind_WGPUVectorBindGroupLayout_WGPUVectorBindGroupLayout_0();
  window.idl.getCache(WGPUVectorBindGroupLayout)[this.ptr] = this;
};

WGPUVectorBindGroupLayout.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorBindGroupLayout.prototype.constructor = WGPUVectorBindGroupLayout;
WGPUVectorBindGroupLayout.prototype.__class__ = WGPUVectorBindGroupLayout;
WGPUVectorBindGroupLayout.__cache__ = {};
Module['WGPUVectorBindGroupLayout'] = WGPUVectorBindGroupLayout;

WGPUVectorBindGroupLayout.prototype['size'] = WGPUVectorBindGroupLayout.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorBindGroupLayout_size_0(self);
};

WGPUVectorBindGroupLayout.prototype['clear'] = WGPUVectorBindGroupLayout.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorBindGroupLayout_clear_0(self);
};

WGPUVectorBindGroupLayout.prototype['push_back'] = WGPUVectorBindGroupLayout.prototype.push_back = function(groupLayout) {
  var self = this.ptr;
  if (groupLayout && typeof groupLayout === 'object') groupLayout = groupLayout.ptr;
  _emscripten_bind_WGPUVectorBindGroupLayout_push_back_1(self, groupLayout);
};

WGPUVectorBindGroupLayout.prototype['Obtain'] = WGPUVectorBindGroupLayout.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorBindGroupLayout_Obtain_0(), WGPUVectorBindGroupLayout);
};

WGPUVectorBindGroupLayout.prototype['__destroy__'] = WGPUVectorBindGroupLayout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorBindGroupLayout___destroy___0(self);
};

function WGPUVectorBindGroupLayoutEntry() {
  this.ptr = _emscripten_bind_WGPUVectorBindGroupLayoutEntry_WGPUVectorBindGroupLayoutEntry_0();
  window.idl.getCache(WGPUVectorBindGroupLayoutEntry)[this.ptr] = this;
};

WGPUVectorBindGroupLayoutEntry.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorBindGroupLayoutEntry.prototype.constructor = WGPUVectorBindGroupLayoutEntry;
WGPUVectorBindGroupLayoutEntry.prototype.__class__ = WGPUVectorBindGroupLayoutEntry;
WGPUVectorBindGroupLayoutEntry.__cache__ = {};
Module['WGPUVectorBindGroupLayoutEntry'] = WGPUVectorBindGroupLayoutEntry;

WGPUVectorBindGroupLayoutEntry.prototype['size'] = WGPUVectorBindGroupLayoutEntry.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorBindGroupLayoutEntry_size_0(self);
};

WGPUVectorBindGroupLayoutEntry.prototype['clear'] = WGPUVectorBindGroupLayoutEntry.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorBindGroupLayoutEntry_clear_0(self);
};

WGPUVectorBindGroupLayoutEntry.prototype['push_back'] = WGPUVectorBindGroupLayoutEntry.prototype.push_back = function(groupLayout) {
  var self = this.ptr;
  if (groupLayout && typeof groupLayout === 'object') groupLayout = groupLayout.ptr;
  _emscripten_bind_WGPUVectorBindGroupLayoutEntry_push_back_1(self, groupLayout);
};

WGPUVectorBindGroupLayoutEntry.prototype['Obtain'] = WGPUVectorBindGroupLayoutEntry.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorBindGroupLayoutEntry_Obtain_0(), WGPUVectorBindGroupLayoutEntry);
};

WGPUVectorBindGroupLayoutEntry.prototype['__destroy__'] = WGPUVectorBindGroupLayoutEntry.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorBindGroupLayoutEntry___destroy___0(self);
};

function WGPUVectorInt() {
  this.ptr = _emscripten_bind_WGPUVectorInt_WGPUVectorInt_0();
  window.idl.getCache(WGPUVectorInt)[this.ptr] = this;
};

WGPUVectorInt.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVectorInt.prototype.constructor = WGPUVectorInt;
WGPUVectorInt.prototype.__class__ = WGPUVectorInt;
WGPUVectorInt.__cache__ = {};
Module['WGPUVectorInt'] = WGPUVectorInt;

WGPUVectorInt.prototype['size'] = WGPUVectorInt.prototype.size = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUVectorInt_size_0(self);
};

WGPUVectorInt.prototype['clear'] = WGPUVectorInt.prototype.clear = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorInt_clear_0(self);
};

WGPUVectorInt.prototype['push_back'] = WGPUVectorInt.prototype.push_back = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUVectorInt_push_back_1(self, value);
};

WGPUVectorInt.prototype['get'] = WGPUVectorInt.prototype.get = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_WGPUVectorInt_get_1(self, index);
};

WGPUVectorInt.prototype['Obtain'] = WGPUVectorInt.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVectorInt_Obtain_0(), WGPUVectorInt);
};

WGPUVectorInt.prototype['__destroy__'] = WGPUVectorInt.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVectorInt___destroy___0(self);
};

function WGPUCompilationInfoCallbackImpl() {
  this.ptr = _emscripten_bind_WGPUCompilationInfoCallbackImpl_WGPUCompilationInfoCallbackImpl_0();
  window.idl.getCache(WGPUCompilationInfoCallbackImpl)[this.ptr] = this;
};

WGPUCompilationInfoCallbackImpl.prototype = Object.create(WGPUCompilationInfoCallback.prototype);
WGPUCompilationInfoCallbackImpl.prototype.constructor = WGPUCompilationInfoCallbackImpl;
WGPUCompilationInfoCallbackImpl.prototype.__class__ = WGPUCompilationInfoCallbackImpl;
WGPUCompilationInfoCallbackImpl.__cache__ = {};
Module['WGPUCompilationInfoCallbackImpl'] = WGPUCompilationInfoCallbackImpl;

WGPUCompilationInfoCallbackImpl.prototype['OnCallback'] = WGPUCompilationInfoCallbackImpl.prototype.OnCallback = function(status, compilationInfo) {
  var self = this.ptr;
  if (status && typeof status === 'object') status = status.ptr;
  if (compilationInfo && typeof compilationInfo === 'object') compilationInfo = compilationInfo.ptr;
  _emscripten_bind_WGPUCompilationInfoCallbackImpl_OnCallback_2(self, status, compilationInfo);
};

WGPUCompilationInfoCallbackImpl.prototype['__destroy__'] = WGPUCompilationInfoCallbackImpl.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUCompilationInfoCallbackImpl___destroy___0(self);
};

function WGPURequestAdapterCallbackImpl() {
  this.ptr = _emscripten_bind_WGPURequestAdapterCallbackImpl_WGPURequestAdapterCallbackImpl_0();
  window.idl.getCache(WGPURequestAdapterCallbackImpl)[this.ptr] = this;
};

WGPURequestAdapterCallbackImpl.prototype = Object.create(WGPURequestAdapterCallback.prototype);
WGPURequestAdapterCallbackImpl.prototype.constructor = WGPURequestAdapterCallbackImpl;
WGPURequestAdapterCallbackImpl.prototype.__class__ = WGPURequestAdapterCallbackImpl;
WGPURequestAdapterCallbackImpl.__cache__ = {};
Module['WGPURequestAdapterCallbackImpl'] = WGPURequestAdapterCallbackImpl;

WGPURequestAdapterCallbackImpl.prototype['OnCallback'] = WGPURequestAdapterCallbackImpl.prototype.OnCallback = function(status, adapter, message) {
  var self = this.ptr;
  ensureCache.prepare();
  if (status && typeof status === 'object') status = status.ptr;
  if (adapter && typeof adapter === 'object') adapter = adapter.ptr;
  if (message && typeof message === 'object') message = message.ptr;
  else message = ensureString(message);
  _emscripten_bind_WGPURequestAdapterCallbackImpl_OnCallback_3(self, status, adapter, message);
};

WGPURequestAdapterCallbackImpl.prototype['__destroy__'] = WGPURequestAdapterCallbackImpl.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURequestAdapterCallbackImpl___destroy___0(self);
};

function WGPURequestDeviceCallbackImpl() {
  this.ptr = _emscripten_bind_WGPURequestDeviceCallbackImpl_WGPURequestDeviceCallbackImpl_0();
  window.idl.getCache(WGPURequestDeviceCallbackImpl)[this.ptr] = this;
};

WGPURequestDeviceCallbackImpl.prototype = Object.create(WGPURequestDeviceCallback.prototype);
WGPURequestDeviceCallbackImpl.prototype.constructor = WGPURequestDeviceCallbackImpl;
WGPURequestDeviceCallbackImpl.prototype.__class__ = WGPURequestDeviceCallbackImpl;
WGPURequestDeviceCallbackImpl.__cache__ = {};
Module['WGPURequestDeviceCallbackImpl'] = WGPURequestDeviceCallbackImpl;

WGPURequestDeviceCallbackImpl.prototype['OnCallback'] = WGPURequestDeviceCallbackImpl.prototype.OnCallback = function(status, device, message) {
  var self = this.ptr;
  ensureCache.prepare();
  if (status && typeof status === 'object') status = status.ptr;
  if (device && typeof device === 'object') device = device.ptr;
  if (message && typeof message === 'object') message = message.ptr;
  else message = ensureString(message);
  _emscripten_bind_WGPURequestDeviceCallbackImpl_OnCallback_3(self, status, device, message);
};

WGPURequestDeviceCallbackImpl.prototype['__destroy__'] = WGPURequestDeviceCallbackImpl.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURequestDeviceCallbackImpl___destroy___0(self);
};

function WGPUUncapturedErrorCallbackImpl() {
  this.ptr = _emscripten_bind_WGPUUncapturedErrorCallbackImpl_WGPUUncapturedErrorCallbackImpl_0();
  window.idl.getCache(WGPUUncapturedErrorCallbackImpl)[this.ptr] = this;
};

WGPUUncapturedErrorCallbackImpl.prototype = Object.create(WGPUUncapturedErrorCallback.prototype);
WGPUUncapturedErrorCallbackImpl.prototype.constructor = WGPUUncapturedErrorCallbackImpl;
WGPUUncapturedErrorCallbackImpl.prototype.__class__ = WGPUUncapturedErrorCallbackImpl;
WGPUUncapturedErrorCallbackImpl.__cache__ = {};
Module['WGPUUncapturedErrorCallbackImpl'] = WGPUUncapturedErrorCallbackImpl;

WGPUUncapturedErrorCallbackImpl.prototype['OnCallback'] = WGPUUncapturedErrorCallbackImpl.prototype.OnCallback = function(errorType, message) {
  var self = this.ptr;
  ensureCache.prepare();
  if (errorType && typeof errorType === 'object') errorType = errorType.ptr;
  if (message && typeof message === 'object') message = message.ptr;
  else message = ensureString(message);
  _emscripten_bind_WGPUUncapturedErrorCallbackImpl_OnCallback_2(self, errorType, message);
};

WGPUUncapturedErrorCallbackImpl.prototype['__destroy__'] = WGPUUncapturedErrorCallbackImpl.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUUncapturedErrorCallbackImpl___destroy___0(self);
};

function WGPUBufferMapCallbackImpl() {
  this.ptr = _emscripten_bind_WGPUBufferMapCallbackImpl_WGPUBufferMapCallbackImpl_0();
  window.idl.getCache(WGPUBufferMapCallbackImpl)[this.ptr] = this;
};

WGPUBufferMapCallbackImpl.prototype = Object.create(WGPUBufferMapCallback.prototype);
WGPUBufferMapCallbackImpl.prototype.constructor = WGPUBufferMapCallbackImpl;
WGPUBufferMapCallbackImpl.prototype.__class__ = WGPUBufferMapCallbackImpl;
WGPUBufferMapCallbackImpl.__cache__ = {};
Module['WGPUBufferMapCallbackImpl'] = WGPUBufferMapCallbackImpl;

WGPUBufferMapCallbackImpl.prototype['OnCallback'] = WGPUBufferMapCallbackImpl.prototype.OnCallback = function(status, message) {
  var self = this.ptr;
  ensureCache.prepare();
  if (status && typeof status === 'object') status = status.ptr;
  if (message && typeof message === 'object') message = message.ptr;
  else message = ensureString(message);
  _emscripten_bind_WGPUBufferMapCallbackImpl_OnCallback_2(self, status, message);
};

WGPUBufferMapCallbackImpl.prototype['__destroy__'] = WGPUBufferMapCallbackImpl.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBufferMapCallbackImpl___destroy___0(self);
};

function WGPUFuture() { throw "cannot construct a WGPUFuture, no constructor in IDL" }
WGPUFuture.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUFuture.prototype.constructor = WGPUFuture;
WGPUFuture.prototype.__class__ = WGPUFuture;
WGPUFuture.__cache__ = {};
Module['WGPUFuture'] = WGPUFuture;

WGPUFuture.prototype['__destroy__'] = WGPUFuture.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUFuture___destroy___0(self);
};

function WGPUFutureWaitInfo() { throw "cannot construct a WGPUFutureWaitInfo, no constructor in IDL" }
WGPUFutureWaitInfo.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUFutureWaitInfo.prototype.constructor = WGPUFutureWaitInfo;
WGPUFutureWaitInfo.prototype.__class__ = WGPUFutureWaitInfo;
WGPUFutureWaitInfo.__cache__ = {};
Module['WGPUFutureWaitInfo'] = WGPUFutureWaitInfo;

WGPUFutureWaitInfo.prototype['SetFuture'] = WGPUFutureWaitInfo.prototype.SetFuture = function(future) {
  var self = this.ptr;
  if (future && typeof future === 'object') future = future.ptr;
  _emscripten_bind_WGPUFutureWaitInfo_SetFuture_1(self, future);
};

WGPUFutureWaitInfo.prototype['Obtain'] = WGPUFutureWaitInfo.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUFutureWaitInfo_Obtain_0(), WGPUFutureWaitInfo);
};

WGPUFutureWaitInfo.prototype['__destroy__'] = WGPUFutureWaitInfo.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUFutureWaitInfo___destroy___0(self);
};

function WGPUAdapterInfo() {
  this.ptr = _emscripten_bind_WGPUAdapterInfo_WGPUAdapterInfo_0();
  window.idl.getCache(WGPUAdapterInfo)[this.ptr] = this;
};

WGPUAdapterInfo.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUAdapterInfo.prototype.constructor = WGPUAdapterInfo;
WGPUAdapterInfo.prototype.__class__ = WGPUAdapterInfo;
WGPUAdapterInfo.__cache__ = {};
Module['WGPUAdapterInfo'] = WGPUAdapterInfo;

WGPUAdapterInfo.prototype['GetVendor'] = WGPUAdapterInfo.prototype.GetVendor = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUAdapterInfo_GetVendor_0(self), IDLString);
};

WGPUAdapterInfo.prototype['GetVendorID'] = WGPUAdapterInfo.prototype.GetVendorID = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUAdapterInfo_GetVendorID_0(self);
};

WGPUAdapterInfo.prototype['GetArchitecture'] = WGPUAdapterInfo.prototype.GetArchitecture = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUAdapterInfo_GetArchitecture_0(self), IDLString);
};

WGPUAdapterInfo.prototype['GetDevice'] = WGPUAdapterInfo.prototype.GetDevice = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUAdapterInfo_GetDevice_0(self), IDLString);
};

WGPUAdapterInfo.prototype['GetDeviceID'] = WGPUAdapterInfo.prototype.GetDeviceID = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUAdapterInfo_GetDeviceID_0(self);
};

WGPUAdapterInfo.prototype['GetDescription'] = WGPUAdapterInfo.prototype.GetDescription = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUAdapterInfo_GetDescription_0(self), IDLString);
};

WGPUAdapterInfo.prototype['GetBackendType'] = WGPUAdapterInfo.prototype.GetBackendType = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUAdapterInfo_GetBackendType_0(self);
};

WGPUAdapterInfo.prototype['GetAdapterType'] = WGPUAdapterInfo.prototype.GetAdapterType = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUAdapterInfo_GetAdapterType_0(self);
};

WGPUAdapterInfo.prototype['Obtain'] = WGPUAdapterInfo.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUAdapterInfo_Obtain_0(), WGPUAdapterInfo);
};

WGPUAdapterInfo.prototype['__destroy__'] = WGPUAdapterInfo.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUAdapterInfo___destroy___0(self);
};

function WGPULimits() {
  this.ptr = _emscripten_bind_WGPULimits_WGPULimits_0();
  window.idl.getCache(WGPULimits)[this.ptr] = this;
};

WGPULimits.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPULimits.prototype.constructor = WGPULimits;
WGPULimits.prototype.__class__ = WGPULimits;
WGPULimits.__cache__ = {};
Module['WGPULimits'] = WGPULimits;

WGPULimits.prototype['SetMaxTextureDimension1D'] = WGPULimits.prototype.SetMaxTextureDimension1D = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxTextureDimension1D_1(self, value);
};

WGPULimits.prototype['GetMaxTextureDimension1D'] = WGPULimits.prototype.GetMaxTextureDimension1D = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxTextureDimension1D_0(self);
};

WGPULimits.prototype['SetMaxTextureDimension2D'] = WGPULimits.prototype.SetMaxTextureDimension2D = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxTextureDimension2D_1(self, value);
};

WGPULimits.prototype['GetMaxTextureDimension2D'] = WGPULimits.prototype.GetMaxTextureDimension2D = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxTextureDimension2D_0(self);
};

WGPULimits.prototype['SetMaxTextureDimension3D'] = WGPULimits.prototype.SetMaxTextureDimension3D = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxTextureDimension3D_1(self, value);
};

WGPULimits.prototype['GetMaxTextureDimension3D'] = WGPULimits.prototype.GetMaxTextureDimension3D = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxTextureDimension3D_0(self);
};

WGPULimits.prototype['SetMaxTextureArrayLayers'] = WGPULimits.prototype.SetMaxTextureArrayLayers = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxTextureArrayLayers_1(self, value);
};

WGPULimits.prototype['GetMaxTextureArrayLayers'] = WGPULimits.prototype.GetMaxTextureArrayLayers = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxTextureArrayLayers_0(self);
};

WGPULimits.prototype['SetMaxBindGroups'] = WGPULimits.prototype.SetMaxBindGroups = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxBindGroups_1(self, value);
};

WGPULimits.prototype['GetMaxBindGroups'] = WGPULimits.prototype.GetMaxBindGroups = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxBindGroups_0(self);
};

WGPULimits.prototype['SetMaxBindGroupsPlusVertexBuffers'] = WGPULimits.prototype.SetMaxBindGroupsPlusVertexBuffers = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxBindGroupsPlusVertexBuffers_1(self, value);
};

WGPULimits.prototype['GetMaxBindGroupsPlusVertexBuffers'] = WGPULimits.prototype.GetMaxBindGroupsPlusVertexBuffers = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxBindGroupsPlusVertexBuffers_0(self);
};

WGPULimits.prototype['SetMaxBindingsPerBindGroup'] = WGPULimits.prototype.SetMaxBindingsPerBindGroup = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxBindingsPerBindGroup_1(self, value);
};

WGPULimits.prototype['GetMaxBindingsPerBindGroup'] = WGPULimits.prototype.GetMaxBindingsPerBindGroup = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxBindingsPerBindGroup_0(self);
};

WGPULimits.prototype['SetMaxDynamicUniformBuffersPerPipelineLayout'] = WGPULimits.prototype.SetMaxDynamicUniformBuffersPerPipelineLayout = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxDynamicUniformBuffersPerPipelineLayout_1(self, value);
};

WGPULimits.prototype['GetMaxDynamicUniformBuffersPerPipelineLayout'] = WGPULimits.prototype.GetMaxDynamicUniformBuffersPerPipelineLayout = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxDynamicUniformBuffersPerPipelineLayout_0(self);
};

WGPULimits.prototype['SetMaxDynamicStorageBuffersPerPipelineLayout'] = WGPULimits.prototype.SetMaxDynamicStorageBuffersPerPipelineLayout = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxDynamicStorageBuffersPerPipelineLayout_1(self, value);
};

WGPULimits.prototype['GetMaxDynamicStorageBuffersPerPipelineLayout'] = WGPULimits.prototype.GetMaxDynamicStorageBuffersPerPipelineLayout = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxDynamicStorageBuffersPerPipelineLayout_0(self);
};

WGPULimits.prototype['SetMaxSampledTexturesPerShaderStage'] = WGPULimits.prototype.SetMaxSampledTexturesPerShaderStage = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxSampledTexturesPerShaderStage_1(self, value);
};

WGPULimits.prototype['GetMaxSampledTexturesPerShaderStage'] = WGPULimits.prototype.GetMaxSampledTexturesPerShaderStage = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxSampledTexturesPerShaderStage_0(self);
};

WGPULimits.prototype['SetMaxSamplersPerShaderStage'] = WGPULimits.prototype.SetMaxSamplersPerShaderStage = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxSamplersPerShaderStage_1(self, value);
};

WGPULimits.prototype['GetMaxSamplersPerShaderStage'] = WGPULimits.prototype.GetMaxSamplersPerShaderStage = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxSamplersPerShaderStage_0(self);
};

WGPULimits.prototype['SetMaxStorageBuffersPerShaderStage'] = WGPULimits.prototype.SetMaxStorageBuffersPerShaderStage = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxStorageBuffersPerShaderStage_1(self, value);
};

WGPULimits.prototype['GetMaxStorageBuffersPerShaderStage'] = WGPULimits.prototype.GetMaxStorageBuffersPerShaderStage = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxStorageBuffersPerShaderStage_0(self);
};

WGPULimits.prototype['SetMaxStorageTexturesPerShaderStage'] = WGPULimits.prototype.SetMaxStorageTexturesPerShaderStage = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxStorageTexturesPerShaderStage_1(self, value);
};

WGPULimits.prototype['GetMaxStorageTexturesPerShaderStage'] = WGPULimits.prototype.GetMaxStorageTexturesPerShaderStage = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxStorageTexturesPerShaderStage_0(self);
};

WGPULimits.prototype['SetMaxUniformBuffersPerShaderStage'] = WGPULimits.prototype.SetMaxUniformBuffersPerShaderStage = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxUniformBuffersPerShaderStage_1(self, value);
};

WGPULimits.prototype['GetMaxUniformBuffersPerShaderStage'] = WGPULimits.prototype.GetMaxUniformBuffersPerShaderStage = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxUniformBuffersPerShaderStage_0(self);
};

WGPULimits.prototype['SetMaxUniformBufferBindingSize'] = WGPULimits.prototype.SetMaxUniformBufferBindingSize = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxUniformBufferBindingSize_1(self, value);
};

WGPULimits.prototype['GetMaxUniformBufferBindingSize'] = WGPULimits.prototype.GetMaxUniformBufferBindingSize = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxUniformBufferBindingSize_0(self);
};

WGPULimits.prototype['SetMaxStorageBufferBindingSize'] = WGPULimits.prototype.SetMaxStorageBufferBindingSize = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxStorageBufferBindingSize_1(self, value);
};

WGPULimits.prototype['GetMaxStorageBufferBindingSize'] = WGPULimits.prototype.GetMaxStorageBufferBindingSize = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxStorageBufferBindingSize_0(self);
};

WGPULimits.prototype['SetMinUniformBufferOffsetAlignment'] = WGPULimits.prototype.SetMinUniformBufferOffsetAlignment = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMinUniformBufferOffsetAlignment_1(self, value);
};

WGPULimits.prototype['GetMinUniformBufferOffsetAlignment'] = WGPULimits.prototype.GetMinUniformBufferOffsetAlignment = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMinUniformBufferOffsetAlignment_0(self);
};

WGPULimits.prototype['SetMinStorageBufferOffsetAlignment'] = WGPULimits.prototype.SetMinStorageBufferOffsetAlignment = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMinStorageBufferOffsetAlignment_1(self, value);
};

WGPULimits.prototype['GetMinStorageBufferOffsetAlignment'] = WGPULimits.prototype.GetMinStorageBufferOffsetAlignment = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMinStorageBufferOffsetAlignment_0(self);
};

WGPULimits.prototype['SetMaxVertexBuffers'] = WGPULimits.prototype.SetMaxVertexBuffers = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxVertexBuffers_1(self, value);
};

WGPULimits.prototype['GetMaxVertexBuffers'] = WGPULimits.prototype.GetMaxVertexBuffers = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxVertexBuffers_0(self);
};

WGPULimits.prototype['SetMaxBufferSize'] = WGPULimits.prototype.SetMaxBufferSize = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxBufferSize_1(self, value);
};

WGPULimits.prototype['GetMaxBufferSize'] = WGPULimits.prototype.GetMaxBufferSize = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxBufferSize_0(self);
};

WGPULimits.prototype['SetMaxVertexAttributes'] = WGPULimits.prototype.SetMaxVertexAttributes = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxVertexAttributes_1(self, value);
};

WGPULimits.prototype['GetMaxVertexAttributes'] = WGPULimits.prototype.GetMaxVertexAttributes = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxVertexAttributes_0(self);
};

WGPULimits.prototype['SetMaxVertexBufferArrayStride'] = WGPULimits.prototype.SetMaxVertexBufferArrayStride = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxVertexBufferArrayStride_1(self, value);
};

WGPULimits.prototype['GetMaxVertexBufferArrayStride'] = WGPULimits.prototype.GetMaxVertexBufferArrayStride = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxVertexBufferArrayStride_0(self);
};

WGPULimits.prototype['SetMaxInterStageShaderVariables'] = WGPULimits.prototype.SetMaxInterStageShaderVariables = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxInterStageShaderVariables_1(self, value);
};

WGPULimits.prototype['GetMaxInterStageShaderVariables'] = WGPULimits.prototype.GetMaxInterStageShaderVariables = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxInterStageShaderVariables_0(self);
};

WGPULimits.prototype['SetMaxColorAttachments'] = WGPULimits.prototype.SetMaxColorAttachments = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxColorAttachments_1(self, value);
};

WGPULimits.prototype['GetMaxColorAttachments'] = WGPULimits.prototype.GetMaxColorAttachments = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxColorAttachments_0(self);
};

WGPULimits.prototype['SetMaxColorAttachmentBytesPerSample'] = WGPULimits.prototype.SetMaxColorAttachmentBytesPerSample = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxColorAttachmentBytesPerSample_1(self, value);
};

WGPULimits.prototype['GetMaxColorAttachmentBytesPerSample'] = WGPULimits.prototype.GetMaxColorAttachmentBytesPerSample = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxColorAttachmentBytesPerSample_0(self);
};

WGPULimits.prototype['SetMaxComputeWorkgroupStorageSize'] = WGPULimits.prototype.SetMaxComputeWorkgroupStorageSize = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxComputeWorkgroupStorageSize_1(self, value);
};

WGPULimits.prototype['GetMaxComputeWorkgroupStorageSize'] = WGPULimits.prototype.GetMaxComputeWorkgroupStorageSize = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxComputeWorkgroupStorageSize_0(self);
};

WGPULimits.prototype['SetMaxComputeInvocationsPerWorkgroup'] = WGPULimits.prototype.SetMaxComputeInvocationsPerWorkgroup = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxComputeInvocationsPerWorkgroup_1(self, value);
};

WGPULimits.prototype['GetMaxComputeInvocationsPerWorkgroup'] = WGPULimits.prototype.GetMaxComputeInvocationsPerWorkgroup = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxComputeInvocationsPerWorkgroup_0(self);
};

WGPULimits.prototype['SetMaxComputeWorkgroupSizeX'] = WGPULimits.prototype.SetMaxComputeWorkgroupSizeX = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxComputeWorkgroupSizeX_1(self, value);
};

WGPULimits.prototype['GetMaxComputeWorkgroupSizeX'] = WGPULimits.prototype.GetMaxComputeWorkgroupSizeX = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxComputeWorkgroupSizeX_0(self);
};

WGPULimits.prototype['SetMaxComputeWorkgroupSizeY'] = WGPULimits.prototype.SetMaxComputeWorkgroupSizeY = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxComputeWorkgroupSizeY_1(self, value);
};

WGPULimits.prototype['GetMaxComputeWorkgroupSizeY'] = WGPULimits.prototype.GetMaxComputeWorkgroupSizeY = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxComputeWorkgroupSizeY_0(self);
};

WGPULimits.prototype['SetMaxComputeWorkgroupSizeZ'] = WGPULimits.prototype.SetMaxComputeWorkgroupSizeZ = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxComputeWorkgroupSizeZ_1(self, value);
};

WGPULimits.prototype['GetMaxComputeWorkgroupSizeZ'] = WGPULimits.prototype.GetMaxComputeWorkgroupSizeZ = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxComputeWorkgroupSizeZ_0(self);
};

WGPULimits.prototype['SetMaxComputeWorkgroupsPerDimension'] = WGPULimits.prototype.SetMaxComputeWorkgroupsPerDimension = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPULimits_SetMaxComputeWorkgroupsPerDimension_1(self, value);
};

WGPULimits.prototype['GetMaxComputeWorkgroupsPerDimension'] = WGPULimits.prototype.GetMaxComputeWorkgroupsPerDimension = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPULimits_GetMaxComputeWorkgroupsPerDimension_0(self);
};

WGPULimits.prototype['Obtain'] = WGPULimits.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPULimits_Obtain_0(), WGPULimits);
};

WGPULimits.prototype['__destroy__'] = WGPULimits.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPULimits___destroy___0(self);
};

function WGPURequestAdapterOptions() {
  this.ptr = _emscripten_bind_WGPURequestAdapterOptions_WGPURequestAdapterOptions_0();
  window.idl.getCache(WGPURequestAdapterOptions)[this.ptr] = this;
};

WGPURequestAdapterOptions.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURequestAdapterOptions.prototype.constructor = WGPURequestAdapterOptions;
WGPURequestAdapterOptions.prototype.__class__ = WGPURequestAdapterOptions;
WGPURequestAdapterOptions.__cache__ = {};
Module['WGPURequestAdapterOptions'] = WGPURequestAdapterOptions;

WGPURequestAdapterOptions.prototype['SetNextInChain'] = WGPURequestAdapterOptions.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPURequestAdapterOptions_SetNextInChain_1(self, chainedStruct);
};

WGPURequestAdapterOptions.prototype['SetFeatureLevel'] = WGPURequestAdapterOptions.prototype.SetFeatureLevel = function(featureLevel) {
  var self = this.ptr;
  if (featureLevel && typeof featureLevel === 'object') featureLevel = featureLevel.ptr;
  _emscripten_bind_WGPURequestAdapterOptions_SetFeatureLevel_1(self, featureLevel);
};

WGPURequestAdapterOptions.prototype['SetPowerPreference'] = WGPURequestAdapterOptions.prototype.SetPowerPreference = function(powerPreference) {
  var self = this.ptr;
  if (powerPreference && typeof powerPreference === 'object') powerPreference = powerPreference.ptr;
  _emscripten_bind_WGPURequestAdapterOptions_SetPowerPreference_1(self, powerPreference);
};

WGPURequestAdapterOptions.prototype['SetBackendType'] = WGPURequestAdapterOptions.prototype.SetBackendType = function(backendType) {
  var self = this.ptr;
  if (backendType && typeof backendType === 'object') backendType = backendType.ptr;
  _emscripten_bind_WGPURequestAdapterOptions_SetBackendType_1(self, backendType);
};

WGPURequestAdapterOptions.prototype['SetCompatibleSurface'] = WGPURequestAdapterOptions.prototype.SetCompatibleSurface = function(compatibleSurface) {
  var self = this.ptr;
  if (compatibleSurface && typeof compatibleSurface === 'object') compatibleSurface = compatibleSurface.ptr;
  _emscripten_bind_WGPURequestAdapterOptions_SetCompatibleSurface_1(self, compatibleSurface);
};

WGPURequestAdapterOptions.prototype['Obtain'] = WGPURequestAdapterOptions.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPURequestAdapterOptions_Obtain_0(), WGPURequestAdapterOptions);
};

WGPURequestAdapterOptions.prototype['__destroy__'] = WGPURequestAdapterOptions.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURequestAdapterOptions___destroy___0(self);
};

function WGPUShaderSourceWGSL() {
  this.ptr = _emscripten_bind_WGPUShaderSourceWGSL_WGPUShaderSourceWGSL_0();
  window.idl.getCache(WGPUShaderSourceWGSL)[this.ptr] = this;
};

WGPUShaderSourceWGSL.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUShaderSourceWGSL.prototype.constructor = WGPUShaderSourceWGSL;
WGPUShaderSourceWGSL.prototype.__class__ = WGPUShaderSourceWGSL;
WGPUShaderSourceWGSL.__cache__ = {};
Module['WGPUShaderSourceWGSL'] = WGPUShaderSourceWGSL;

WGPUShaderSourceWGSL.prototype['SetCode'] = WGPUShaderSourceWGSL.prototype.SetCode = function(code) {
  var self = this.ptr;
  ensureCache.prepare();
  if (code && typeof code === 'object') code = code.ptr;
  else code = ensureString(code);
  _emscripten_bind_WGPUShaderSourceWGSL_SetCode_1(self, code);
};

WGPUShaderSourceWGSL.prototype['GetChain'] = WGPUShaderSourceWGSL.prototype.GetChain = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUShaderSourceWGSL_GetChain_0(self), WGPUChainedStruct);
};

WGPUShaderSourceWGSL.prototype['Obtain'] = WGPUShaderSourceWGSL.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUShaderSourceWGSL_Obtain_0(), WGPUShaderSourceWGSL);
};

WGPUShaderSourceWGSL.prototype['__destroy__'] = WGPUShaderSourceWGSL.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUShaderSourceWGSL___destroy___0(self);
};

function WGPUSupportedFeatures() {
  this.ptr = _emscripten_bind_WGPUSupportedFeatures_WGPUSupportedFeatures_0();
  window.idl.getCache(WGPUSupportedFeatures)[this.ptr] = this;
};

WGPUSupportedFeatures.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUSupportedFeatures.prototype.constructor = WGPUSupportedFeatures;
WGPUSupportedFeatures.prototype.__class__ = WGPUSupportedFeatures;
WGPUSupportedFeatures.__cache__ = {};
Module['WGPUSupportedFeatures'] = WGPUSupportedFeatures;

WGPUSupportedFeatures.prototype['GetFeatureCount'] = WGPUSupportedFeatures.prototype.GetFeatureCount = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUSupportedFeatures_GetFeatureCount_0(self);
};

WGPUSupportedFeatures.prototype['GetFeatureAt'] = WGPUSupportedFeatures.prototype.GetFeatureAt = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_WGPUSupportedFeatures_GetFeatureAt_1(self, index);
};

WGPUSupportedFeatures.prototype['Obtain'] = WGPUSupportedFeatures.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUSupportedFeatures_Obtain_0(), WGPUSupportedFeatures);
};

WGPUSupportedFeatures.prototype['__destroy__'] = WGPUSupportedFeatures.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSupportedFeatures___destroy___0(self);
};

function WGPUBlendComponent() { throw "cannot construct a WGPUBlendComponent, no constructor in IDL" }
WGPUBlendComponent.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBlendComponent.prototype.constructor = WGPUBlendComponent;
WGPUBlendComponent.prototype.__class__ = WGPUBlendComponent;
WGPUBlendComponent.__cache__ = {};
Module['WGPUBlendComponent'] = WGPUBlendComponent;

WGPUBlendComponent.prototype['SetOperation'] = WGPUBlendComponent.prototype.SetOperation = function(operation) {
  var self = this.ptr;
  if (operation && typeof operation === 'object') operation = operation.ptr;
  _emscripten_bind_WGPUBlendComponent_SetOperation_1(self, operation);
};

WGPUBlendComponent.prototype['GetOperation'] = WGPUBlendComponent.prototype.GetOperation = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUBlendComponent_GetOperation_0(self);
};

WGPUBlendComponent.prototype['SetSrcFactor'] = WGPUBlendComponent.prototype.SetSrcFactor = function(factor) {
  var self = this.ptr;
  if (factor && typeof factor === 'object') factor = factor.ptr;
  _emscripten_bind_WGPUBlendComponent_SetSrcFactor_1(self, factor);
};

WGPUBlendComponent.prototype['GetSrcFactor'] = WGPUBlendComponent.prototype.GetSrcFactor = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUBlendComponent_GetSrcFactor_0(self);
};

WGPUBlendComponent.prototype['SetDstFactor'] = WGPUBlendComponent.prototype.SetDstFactor = function(factor) {
  var self = this.ptr;
  if (factor && typeof factor === 'object') factor = factor.ptr;
  _emscripten_bind_WGPUBlendComponent_SetDstFactor_1(self, factor);
};

WGPUBlendComponent.prototype['GetDstFactor'] = WGPUBlendComponent.prototype.GetDstFactor = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUBlendComponent_GetDstFactor_0(self);
};

WGPUBlendComponent.prototype['__destroy__'] = WGPUBlendComponent.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBlendComponent___destroy___0(self);
};

function WGPUBlendState() {
  this.ptr = _emscripten_bind_WGPUBlendState_WGPUBlendState_0();
  window.idl.getCache(WGPUBlendState)[this.ptr] = this;
};

WGPUBlendState.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBlendState.prototype.constructor = WGPUBlendState;
WGPUBlendState.prototype.__class__ = WGPUBlendState;
WGPUBlendState.__cache__ = {};
Module['WGPUBlendState'] = WGPUBlendState;

WGPUBlendState.prototype['GetColor'] = WGPUBlendState.prototype.GetColor = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUBlendState_GetColor_0(self), WGPUBlendComponent);
};

WGPUBlendState.prototype['GetAlpha'] = WGPUBlendState.prototype.GetAlpha = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUBlendState_GetAlpha_0(self), WGPUBlendComponent);
};

WGPUBlendState.prototype['Obtain'] = WGPUBlendState.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUBlendState_Obtain_0(), WGPUBlendState);
};

WGPUBlendState.prototype['__destroy__'] = WGPUBlendState.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBlendState___destroy___0(self);
};

function WGPUConstantEntry() {
  this.ptr = _emscripten_bind_WGPUConstantEntry_WGPUConstantEntry_0();
  window.idl.getCache(WGPUConstantEntry)[this.ptr] = this;
};

WGPUConstantEntry.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUConstantEntry.prototype.constructor = WGPUConstantEntry;
WGPUConstantEntry.prototype.__class__ = WGPUConstantEntry;
WGPUConstantEntry.__cache__ = {};
Module['WGPUConstantEntry'] = WGPUConstantEntry;

WGPUConstantEntry.prototype['__destroy__'] = WGPUConstantEntry.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUConstantEntry___destroy___0(self);
};

function WGPUFragmentState() {
  this.ptr = _emscripten_bind_WGPUFragmentState_WGPUFragmentState_0();
  window.idl.getCache(WGPUFragmentState)[this.ptr] = this;
};

WGPUFragmentState.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUFragmentState.prototype.constructor = WGPUFragmentState;
WGPUFragmentState.prototype.__class__ = WGPUFragmentState;
WGPUFragmentState.__cache__ = {};
Module['WGPUFragmentState'] = WGPUFragmentState;

WGPUFragmentState.prototype['SetNextInChain'] = WGPUFragmentState.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUFragmentState_SetNextInChain_1(self, chainedStruct);
};

WGPUFragmentState.prototype['SetEntryPoint'] = WGPUFragmentState.prototype.SetEntryPoint = function(entryPoint) {
  var self = this.ptr;
  ensureCache.prepare();
  if (entryPoint && typeof entryPoint === 'object') entryPoint = entryPoint.ptr;
  else entryPoint = ensureString(entryPoint);
  _emscripten_bind_WGPUFragmentState_SetEntryPoint_1(self, entryPoint);
};

WGPUFragmentState.prototype['SetTargets__0'] = WGPUFragmentState.prototype.SetTargets__0 = function(targets) {
  var self = this.ptr;
  if (targets && typeof targets === 'object') targets = targets.ptr;
  _emscripten_bind_WGPUFragmentState_SetTargets__0_1(self, targets);
};

WGPUFragmentState.prototype['SetTargets__1'] = WGPUFragmentState.prototype.SetTargets__1 = function(target01) {
  var self = this.ptr;
  if (target01 && typeof target01 === 'object') target01 = target01.ptr;
  _emscripten_bind_WGPUFragmentState_SetTargets__1_1(self, target01);
};

WGPUFragmentState.prototype['SetTargets__2'] = WGPUFragmentState.prototype.SetTargets__2 = function(target01, target02) {
  var self = this.ptr;
  if (target01 && typeof target01 === 'object') target01 = target01.ptr;
  if (target02 && typeof target02 === 'object') target02 = target02.ptr;
  _emscripten_bind_WGPUFragmentState_SetTargets__2_2(self, target01, target02);
};

WGPUFragmentState.prototype['SetTargets__3'] = WGPUFragmentState.prototype.SetTargets__3 = function(target01, target02, target03) {
  var self = this.ptr;
  if (target01 && typeof target01 === 'object') target01 = target01.ptr;
  if (target02 && typeof target02 === 'object') target02 = target02.ptr;
  if (target03 && typeof target03 === 'object') target03 = target03.ptr;
  _emscripten_bind_WGPUFragmentState_SetTargets__3_3(self, target01, target02, target03);
};

WGPUFragmentState.prototype['SetTargets__4'] = WGPUFragmentState.prototype.SetTargets__4 = function(target01, target02, target03, target04) {
  var self = this.ptr;
  if (target01 && typeof target01 === 'object') target01 = target01.ptr;
  if (target02 && typeof target02 === 'object') target02 = target02.ptr;
  if (target03 && typeof target03 === 'object') target03 = target03.ptr;
  if (target04 && typeof target04 === 'object') target04 = target04.ptr;
  _emscripten_bind_WGPUFragmentState_SetTargets__4_4(self, target01, target02, target03, target04);
};

WGPUFragmentState.prototype['SetModule'] = WGPUFragmentState.prototype.SetModule = function(shaderModule) {
  var self = this.ptr;
  if (shaderModule && typeof shaderModule === 'object') shaderModule = shaderModule.ptr;
  _emscripten_bind_WGPUFragmentState_SetModule_1(self, shaderModule);
};

WGPUFragmentState.prototype['SetConstants'] = WGPUFragmentState.prototype.SetConstants = function(constants) {
  var self = this.ptr;
  if (constants && typeof constants === 'object') constants = constants.ptr;
  _emscripten_bind_WGPUFragmentState_SetConstants_1(self, constants);
};

WGPUFragmentState.prototype['Obtain'] = WGPUFragmentState.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUFragmentState_Obtain_0(), WGPUFragmentState);
};

WGPUFragmentState.prototype['__destroy__'] = WGPUFragmentState.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUFragmentState___destroy___0(self);
};

function WGPUVertexAttribute() {
  this.ptr = _emscripten_bind_WGPUVertexAttribute_WGPUVertexAttribute_0();
  window.idl.getCache(WGPUVertexAttribute)[this.ptr] = this;
};

WGPUVertexAttribute.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVertexAttribute.prototype.constructor = WGPUVertexAttribute;
WGPUVertexAttribute.prototype.__class__ = WGPUVertexAttribute;
WGPUVertexAttribute.__cache__ = {};
Module['WGPUVertexAttribute'] = WGPUVertexAttribute;

WGPUVertexAttribute.prototype['SetFormat'] = WGPUVertexAttribute.prototype.SetFormat = function(format) {
  var self = this.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  _emscripten_bind_WGPUVertexAttribute_SetFormat_1(self, format);
};

WGPUVertexAttribute.prototype['SetOffset'] = WGPUVertexAttribute.prototype.SetOffset = function(offset) {
  var self = this.ptr;
  if (offset && typeof offset === 'object') offset = offset.ptr;
  _emscripten_bind_WGPUVertexAttribute_SetOffset_1(self, offset);
};

WGPUVertexAttribute.prototype['SetShaderLocation'] = WGPUVertexAttribute.prototype.SetShaderLocation = function(shaderLocation) {
  var self = this.ptr;
  if (shaderLocation && typeof shaderLocation === 'object') shaderLocation = shaderLocation.ptr;
  _emscripten_bind_WGPUVertexAttribute_SetShaderLocation_1(self, shaderLocation);
};

WGPUVertexAttribute.prototype['Obtain'] = WGPUVertexAttribute.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVertexAttribute_Obtain_0(), WGPUVertexAttribute);
};

WGPUVertexAttribute.prototype['__destroy__'] = WGPUVertexAttribute.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVertexAttribute___destroy___0(self);
};

function WGPUVertexBufferLayout() {
  this.ptr = _emscripten_bind_WGPUVertexBufferLayout_WGPUVertexBufferLayout_0();
  window.idl.getCache(WGPUVertexBufferLayout)[this.ptr] = this;
};

WGPUVertexBufferLayout.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVertexBufferLayout.prototype.constructor = WGPUVertexBufferLayout;
WGPUVertexBufferLayout.prototype.__class__ = WGPUVertexBufferLayout;
WGPUVertexBufferLayout.__cache__ = {};
Module['WGPUVertexBufferLayout'] = WGPUVertexBufferLayout;

WGPUVertexBufferLayout.prototype['SetAttributes'] = WGPUVertexBufferLayout.prototype.SetAttributes = function(values) {
  var self = this.ptr;
  if (values && typeof values === 'object') values = values.ptr;
  _emscripten_bind_WGPUVertexBufferLayout_SetAttributes_1(self, values);
};

WGPUVertexBufferLayout.prototype['SetArrayStride'] = WGPUVertexBufferLayout.prototype.SetArrayStride = function(offset) {
  var self = this.ptr;
  if (offset && typeof offset === 'object') offset = offset.ptr;
  _emscripten_bind_WGPUVertexBufferLayout_SetArrayStride_1(self, offset);
};

WGPUVertexBufferLayout.prototype['SetStepMode'] = WGPUVertexBufferLayout.prototype.SetStepMode = function(stepMode) {
  var self = this.ptr;
  if (stepMode && typeof stepMode === 'object') stepMode = stepMode.ptr;
  _emscripten_bind_WGPUVertexBufferLayout_SetStepMode_1(self, stepMode);
};

WGPUVertexBufferLayout.prototype['Obtain'] = WGPUVertexBufferLayout.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUVertexBufferLayout_Obtain_0(), WGPUVertexBufferLayout);
};

WGPUVertexBufferLayout.prototype['__destroy__'] = WGPUVertexBufferLayout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVertexBufferLayout___destroy___0(self);
};

function WGPUVertexState() { throw "cannot construct a WGPUVertexState, no constructor in IDL" }
WGPUVertexState.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUVertexState.prototype.constructor = WGPUVertexState;
WGPUVertexState.prototype.__class__ = WGPUVertexState;
WGPUVertexState.__cache__ = {};
Module['WGPUVertexState'] = WGPUVertexState;

WGPUVertexState.prototype['SetNextInChain'] = WGPUVertexState.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUVertexState_SetNextInChain_1(self, chainedStruct);
};

WGPUVertexState.prototype['SetModule'] = WGPUVertexState.prototype.SetModule = function(shaderModule) {
  var self = this.ptr;
  if (shaderModule && typeof shaderModule === 'object') shaderModule = shaderModule.ptr;
  _emscripten_bind_WGPUVertexState_SetModule_1(self, shaderModule);
};

WGPUVertexState.prototype['SetEntryPoint'] = WGPUVertexState.prototype.SetEntryPoint = function(entryPoint) {
  var self = this.ptr;
  ensureCache.prepare();
  if (entryPoint && typeof entryPoint === 'object') entryPoint = entryPoint.ptr;
  else entryPoint = ensureString(entryPoint);
  _emscripten_bind_WGPUVertexState_SetEntryPoint_1(self, entryPoint);
};

WGPUVertexState.prototype['SetConstants'] = WGPUVertexState.prototype.SetConstants = function(constants) {
  var self = this.ptr;
  if (constants && typeof constants === 'object') constants = constants.ptr;
  _emscripten_bind_WGPUVertexState_SetConstants_1(self, constants);
};

WGPUVertexState.prototype['SetBuffers'] = WGPUVertexState.prototype.SetBuffers = function(buffers) {
  var self = this.ptr;
  if (buffers && typeof buffers === 'object') buffers = buffers.ptr;
  _emscripten_bind_WGPUVertexState_SetBuffers_1(self, buffers);
};

WGPUVertexState.prototype['__destroy__'] = WGPUVertexState.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUVertexState___destroy___0(self);
};

function WGPUColorTargetState() {
  this.ptr = _emscripten_bind_WGPUColorTargetState_WGPUColorTargetState_0();
  window.idl.getCache(WGPUColorTargetState)[this.ptr] = this;
};

WGPUColorTargetState.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUColorTargetState.prototype.constructor = WGPUColorTargetState;
WGPUColorTargetState.prototype.__class__ = WGPUColorTargetState;
WGPUColorTargetState.__cache__ = {};
Module['WGPUColorTargetState'] = WGPUColorTargetState;

WGPUColorTargetState.prototype['SetNextInChain'] = WGPUColorTargetState.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUColorTargetState_SetNextInChain_1(self, chainedStruct);
};

WGPUColorTargetState.prototype['SetFormat'] = WGPUColorTargetState.prototype.SetFormat = function(format) {
  var self = this.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  _emscripten_bind_WGPUColorTargetState_SetFormat_1(self, format);
};

WGPUColorTargetState.prototype['SetBlend'] = WGPUColorTargetState.prototype.SetBlend = function(blendState) {
  var self = this.ptr;
  if (blendState && typeof blendState === 'object') blendState = blendState.ptr;
  _emscripten_bind_WGPUColorTargetState_SetBlend_1(self, blendState);
};

WGPUColorTargetState.prototype['SetWriteMask'] = WGPUColorTargetState.prototype.SetWriteMask = function(writeMask) {
  var self = this.ptr;
  if (writeMask && typeof writeMask === 'object') writeMask = writeMask.ptr;
  _emscripten_bind_WGPUColorTargetState_SetWriteMask_1(self, writeMask);
};

WGPUColorTargetState.prototype['Obtain'] = WGPUColorTargetState.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUColorTargetState_Obtain_0(), WGPUColorTargetState);
};

WGPUColorTargetState.prototype['__destroy__'] = WGPUColorTargetState.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUColorTargetState___destroy___0(self);
};

function WGPUStencilFaceState() { throw "cannot construct a WGPUStencilFaceState, no constructor in IDL" }
WGPUStencilFaceState.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUStencilFaceState.prototype.constructor = WGPUStencilFaceState;
WGPUStencilFaceState.prototype.__class__ = WGPUStencilFaceState;
WGPUStencilFaceState.__cache__ = {};
Module['WGPUStencilFaceState'] = WGPUStencilFaceState;

WGPUStencilFaceState.prototype['SetCompare'] = WGPUStencilFaceState.prototype.SetCompare = function(compare) {
  var self = this.ptr;
  if (compare && typeof compare === 'object') compare = compare.ptr;
  _emscripten_bind_WGPUStencilFaceState_SetCompare_1(self, compare);
};

WGPUStencilFaceState.prototype['SetFailOp'] = WGPUStencilFaceState.prototype.SetFailOp = function(failOp) {
  var self = this.ptr;
  if (failOp && typeof failOp === 'object') failOp = failOp.ptr;
  _emscripten_bind_WGPUStencilFaceState_SetFailOp_1(self, failOp);
};

WGPUStencilFaceState.prototype['SetDepthFailOp'] = WGPUStencilFaceState.prototype.SetDepthFailOp = function(depthFailOp) {
  var self = this.ptr;
  if (depthFailOp && typeof depthFailOp === 'object') depthFailOp = depthFailOp.ptr;
  _emscripten_bind_WGPUStencilFaceState_SetDepthFailOp_1(self, depthFailOp);
};

WGPUStencilFaceState.prototype['SetPassOp'] = WGPUStencilFaceState.prototype.SetPassOp = function(passOp) {
  var self = this.ptr;
  if (passOp && typeof passOp === 'object') passOp = passOp.ptr;
  _emscripten_bind_WGPUStencilFaceState_SetPassOp_1(self, passOp);
};

WGPUStencilFaceState.prototype['__destroy__'] = WGPUStencilFaceState.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUStencilFaceState___destroy___0(self);
};

function WGPUDepthStencilState() {
  this.ptr = _emscripten_bind_WGPUDepthStencilState_WGPUDepthStencilState_0();
  window.idl.getCache(WGPUDepthStencilState)[this.ptr] = this;
};

WGPUDepthStencilState.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUDepthStencilState.prototype.constructor = WGPUDepthStencilState;
WGPUDepthStencilState.prototype.__class__ = WGPUDepthStencilState;
WGPUDepthStencilState.__cache__ = {};
Module['WGPUDepthStencilState'] = WGPUDepthStencilState;

WGPUDepthStencilState.prototype['SetNextInChain'] = WGPUDepthStencilState.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUDepthStencilState_SetNextInChain_1(self, chainedStruct);
};

WGPUDepthStencilState.prototype['SetFormat'] = WGPUDepthStencilState.prototype.SetFormat = function(format) {
  var self = this.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  _emscripten_bind_WGPUDepthStencilState_SetFormat_1(self, format);
};

WGPUDepthStencilState.prototype['SetDepthWriteEnabled'] = WGPUDepthStencilState.prototype.SetDepthWriteEnabled = function(depthWriteEnabled) {
  var self = this.ptr;
  if (depthWriteEnabled && typeof depthWriteEnabled === 'object') depthWriteEnabled = depthWriteEnabled.ptr;
  _emscripten_bind_WGPUDepthStencilState_SetDepthWriteEnabled_1(self, depthWriteEnabled);
};

WGPUDepthStencilState.prototype['SetDepthCompare'] = WGPUDepthStencilState.prototype.SetDepthCompare = function(depthCompare) {
  var self = this.ptr;
  if (depthCompare && typeof depthCompare === 'object') depthCompare = depthCompare.ptr;
  _emscripten_bind_WGPUDepthStencilState_SetDepthCompare_1(self, depthCompare);
};

WGPUDepthStencilState.prototype['SetDepthBiasSlopeScale'] = WGPUDepthStencilState.prototype.SetDepthBiasSlopeScale = function(depthBiasSlopeScale) {
  var self = this.ptr;
  if (depthBiasSlopeScale && typeof depthBiasSlopeScale === 'object') depthBiasSlopeScale = depthBiasSlopeScale.ptr;
  _emscripten_bind_WGPUDepthStencilState_SetDepthBiasSlopeScale_1(self, depthBiasSlopeScale);
};

WGPUDepthStencilState.prototype['SetDepthBiasClamp'] = WGPUDepthStencilState.prototype.SetDepthBiasClamp = function(depthBiasClamp) {
  var self = this.ptr;
  if (depthBiasClamp && typeof depthBiasClamp === 'object') depthBiasClamp = depthBiasClamp.ptr;
  _emscripten_bind_WGPUDepthStencilState_SetDepthBiasClamp_1(self, depthBiasClamp);
};

WGPUDepthStencilState.prototype['SetStencilReadMask'] = WGPUDepthStencilState.prototype.SetStencilReadMask = function(stencilReadMask) {
  var self = this.ptr;
  if (stencilReadMask && typeof stencilReadMask === 'object') stencilReadMask = stencilReadMask.ptr;
  _emscripten_bind_WGPUDepthStencilState_SetStencilReadMask_1(self, stencilReadMask);
};

WGPUDepthStencilState.prototype['SetStencilWriteMask'] = WGPUDepthStencilState.prototype.SetStencilWriteMask = function(stencilWriteMask) {
  var self = this.ptr;
  if (stencilWriteMask && typeof stencilWriteMask === 'object') stencilWriteMask = stencilWriteMask.ptr;
  _emscripten_bind_WGPUDepthStencilState_SetStencilWriteMask_1(self, stencilWriteMask);
};

WGPUDepthStencilState.prototype['SetDepthBias'] = WGPUDepthStencilState.prototype.SetDepthBias = function(depthBias) {
  var self = this.ptr;
  if (depthBias && typeof depthBias === 'object') depthBias = depthBias.ptr;
  _emscripten_bind_WGPUDepthStencilState_SetDepthBias_1(self, depthBias);
};

WGPUDepthStencilState.prototype['GetStencilFront'] = WGPUDepthStencilState.prototype.GetStencilFront = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUDepthStencilState_GetStencilFront_0(self), WGPUStencilFaceState);
};

WGPUDepthStencilState.prototype['GetStencilBack'] = WGPUDepthStencilState.prototype.GetStencilBack = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUDepthStencilState_GetStencilBack_0(self), WGPUStencilFaceState);
};

WGPUDepthStencilState.prototype['Obtain'] = WGPUDepthStencilState.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUDepthStencilState_Obtain_0(), WGPUDepthStencilState);
};

WGPUDepthStencilState.prototype['__destroy__'] = WGPUDepthStencilState.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUDepthStencilState___destroy___0(self);
};

function WGPUMultisampleState() {
  this.ptr = _emscripten_bind_WGPUMultisampleState_WGPUMultisampleState_0();
  window.idl.getCache(WGPUMultisampleState)[this.ptr] = this;
};

WGPUMultisampleState.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUMultisampleState.prototype.constructor = WGPUMultisampleState;
WGPUMultisampleState.prototype.__class__ = WGPUMultisampleState;
WGPUMultisampleState.__cache__ = {};
Module['WGPUMultisampleState'] = WGPUMultisampleState;

WGPUMultisampleState.prototype['SetNextInChain'] = WGPUMultisampleState.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUMultisampleState_SetNextInChain_1(self, chainedStruct);
};

WGPUMultisampleState.prototype['SetCount'] = WGPUMultisampleState.prototype.SetCount = function(count) {
  var self = this.ptr;
  if (count && typeof count === 'object') count = count.ptr;
  _emscripten_bind_WGPUMultisampleState_SetCount_1(self, count);
};

WGPUMultisampleState.prototype['SetMask'] = WGPUMultisampleState.prototype.SetMask = function(mask) {
  var self = this.ptr;
  if (mask && typeof mask === 'object') mask = mask.ptr;
  _emscripten_bind_WGPUMultisampleState_SetMask_1(self, mask);
};

WGPUMultisampleState.prototype['SetAlphaToCoverageEnabled'] = WGPUMultisampleState.prototype.SetAlphaToCoverageEnabled = function(alphaToCoverageEnabled) {
  var self = this.ptr;
  if (alphaToCoverageEnabled && typeof alphaToCoverageEnabled === 'object') alphaToCoverageEnabled = alphaToCoverageEnabled.ptr;
  _emscripten_bind_WGPUMultisampleState_SetAlphaToCoverageEnabled_1(self, alphaToCoverageEnabled);
};

WGPUMultisampleState.prototype['__destroy__'] = WGPUMultisampleState.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUMultisampleState___destroy___0(self);
};

function WGPUPrimitiveState() { throw "cannot construct a WGPUPrimitiveState, no constructor in IDL" }
WGPUPrimitiveState.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUPrimitiveState.prototype.constructor = WGPUPrimitiveState;
WGPUPrimitiveState.prototype.__class__ = WGPUPrimitiveState;
WGPUPrimitiveState.__cache__ = {};
Module['WGPUPrimitiveState'] = WGPUPrimitiveState;

WGPUPrimitiveState.prototype['SetNextInChain'] = WGPUPrimitiveState.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUPrimitiveState_SetNextInChain_1(self, chainedStruct);
};

WGPUPrimitiveState.prototype['SetTopology'] = WGPUPrimitiveState.prototype.SetTopology = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUPrimitiveState_SetTopology_1(self, value);
};

WGPUPrimitiveState.prototype['SetStripIndexFormat'] = WGPUPrimitiveState.prototype.SetStripIndexFormat = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUPrimitiveState_SetStripIndexFormat_1(self, value);
};

WGPUPrimitiveState.prototype['SetFrontFace'] = WGPUPrimitiveState.prototype.SetFrontFace = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUPrimitiveState_SetFrontFace_1(self, value);
};

WGPUPrimitiveState.prototype['SetCullMode'] = WGPUPrimitiveState.prototype.SetCullMode = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUPrimitiveState_SetCullMode_1(self, value);
};

WGPUPrimitiveState.prototype['__destroy__'] = WGPUPrimitiveState.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUPrimitiveState___destroy___0(self);
};

function WGPURenderPassDepthStencilAttachment() {
  this.ptr = _emscripten_bind_WGPURenderPassDepthStencilAttachment_WGPURenderPassDepthStencilAttachment_0();
  window.idl.getCache(WGPURenderPassDepthStencilAttachment)[this.ptr] = this;
};

WGPURenderPassDepthStencilAttachment.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderPassDepthStencilAttachment.prototype.constructor = WGPURenderPassDepthStencilAttachment;
WGPURenderPassDepthStencilAttachment.prototype.__class__ = WGPURenderPassDepthStencilAttachment;
WGPURenderPassDepthStencilAttachment.__cache__ = {};
Module['WGPURenderPassDepthStencilAttachment'] = WGPURenderPassDepthStencilAttachment;

WGPURenderPassDepthStencilAttachment.prototype['SetView'] = WGPURenderPassDepthStencilAttachment.prototype.SetView = function(textureView) {
  var self = this.ptr;
  if (textureView && typeof textureView === 'object') textureView = textureView.ptr;
  _emscripten_bind_WGPURenderPassDepthStencilAttachment_SetView_1(self, textureView);
};

WGPURenderPassDepthStencilAttachment.prototype['SetDepthLoadOp'] = WGPURenderPassDepthStencilAttachment.prototype.SetDepthLoadOp = function(loadOp) {
  var self = this.ptr;
  if (loadOp && typeof loadOp === 'object') loadOp = loadOp.ptr;
  _emscripten_bind_WGPURenderPassDepthStencilAttachment_SetDepthLoadOp_1(self, loadOp);
};

WGPURenderPassDepthStencilAttachment.prototype['SetDepthStoreOp'] = WGPURenderPassDepthStencilAttachment.prototype.SetDepthStoreOp = function(storeOp) {
  var self = this.ptr;
  if (storeOp && typeof storeOp === 'object') storeOp = storeOp.ptr;
  _emscripten_bind_WGPURenderPassDepthStencilAttachment_SetDepthStoreOp_1(self, storeOp);
};

WGPURenderPassDepthStencilAttachment.prototype['SetDepthClearValue'] = WGPURenderPassDepthStencilAttachment.prototype.SetDepthClearValue = function(depthClearValue) {
  var self = this.ptr;
  if (depthClearValue && typeof depthClearValue === 'object') depthClearValue = depthClearValue.ptr;
  _emscripten_bind_WGPURenderPassDepthStencilAttachment_SetDepthClearValue_1(self, depthClearValue);
};

WGPURenderPassDepthStencilAttachment.prototype['SetDepthReadOnly'] = WGPURenderPassDepthStencilAttachment.prototype.SetDepthReadOnly = function(depthReadOnly) {
  var self = this.ptr;
  if (depthReadOnly && typeof depthReadOnly === 'object') depthReadOnly = depthReadOnly.ptr;
  _emscripten_bind_WGPURenderPassDepthStencilAttachment_SetDepthReadOnly_1(self, depthReadOnly);
};

WGPURenderPassDepthStencilAttachment.prototype['SetStencilLoadOp'] = WGPURenderPassDepthStencilAttachment.prototype.SetStencilLoadOp = function(loadOp) {
  var self = this.ptr;
  if (loadOp && typeof loadOp === 'object') loadOp = loadOp.ptr;
  _emscripten_bind_WGPURenderPassDepthStencilAttachment_SetStencilLoadOp_1(self, loadOp);
};

WGPURenderPassDepthStencilAttachment.prototype['SetStencilStoreOp'] = WGPURenderPassDepthStencilAttachment.prototype.SetStencilStoreOp = function(storeOp) {
  var self = this.ptr;
  if (storeOp && typeof storeOp === 'object') storeOp = storeOp.ptr;
  _emscripten_bind_WGPURenderPassDepthStencilAttachment_SetStencilStoreOp_1(self, storeOp);
};

WGPURenderPassDepthStencilAttachment.prototype['SetStencilClearValue'] = WGPURenderPassDepthStencilAttachment.prototype.SetStencilClearValue = function(stencilClearValue) {
  var self = this.ptr;
  if (stencilClearValue && typeof stencilClearValue === 'object') stencilClearValue = stencilClearValue.ptr;
  _emscripten_bind_WGPURenderPassDepthStencilAttachment_SetStencilClearValue_1(self, stencilClearValue);
};

WGPURenderPassDepthStencilAttachment.prototype['SetStencilReadOnly'] = WGPURenderPassDepthStencilAttachment.prototype.SetStencilReadOnly = function(stencilReadOnly) {
  var self = this.ptr;
  if (stencilReadOnly && typeof stencilReadOnly === 'object') stencilReadOnly = stencilReadOnly.ptr;
  _emscripten_bind_WGPURenderPassDepthStencilAttachment_SetStencilReadOnly_1(self, stencilReadOnly);
};

WGPURenderPassDepthStencilAttachment.prototype['Obtain'] = WGPURenderPassDepthStencilAttachment.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPURenderPassDepthStencilAttachment_Obtain_0(), WGPURenderPassDepthStencilAttachment);
};

WGPURenderPassDepthStencilAttachment.prototype['__destroy__'] = WGPURenderPassDepthStencilAttachment.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassDepthStencilAttachment___destroy___0(self);
};

function WGPURenderPassTimestampWrites() {
  this.ptr = _emscripten_bind_WGPURenderPassTimestampWrites_WGPURenderPassTimestampWrites_0();
  window.idl.getCache(WGPURenderPassTimestampWrites)[this.ptr] = this;
};

WGPURenderPassTimestampWrites.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderPassTimestampWrites.prototype.constructor = WGPURenderPassTimestampWrites;
WGPURenderPassTimestampWrites.prototype.__class__ = WGPURenderPassTimestampWrites;
WGPURenderPassTimestampWrites.__cache__ = {};
Module['WGPURenderPassTimestampWrites'] = WGPURenderPassTimestampWrites;

WGPURenderPassTimestampWrites.prototype['SetQuerySet'] = WGPURenderPassTimestampWrites.prototype.SetQuerySet = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPURenderPassTimestampWrites_SetQuerySet_1(self, value);
};

WGPURenderPassTimestampWrites.prototype['SetBeginningOfPassWriteIndex'] = WGPURenderPassTimestampWrites.prototype.SetBeginningOfPassWriteIndex = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPURenderPassTimestampWrites_SetBeginningOfPassWriteIndex_1(self, value);
};

WGPURenderPassTimestampWrites.prototype['SetEndOfPassWriteIndex'] = WGPURenderPassTimestampWrites.prototype.SetEndOfPassWriteIndex = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPURenderPassTimestampWrites_SetEndOfPassWriteIndex_1(self, value);
};

WGPURenderPassTimestampWrites.prototype['Obtain'] = WGPURenderPassTimestampWrites.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPURenderPassTimestampWrites_Obtain_0(), WGPURenderPassTimestampWrites);
};

WGPURenderPassTimestampWrites.prototype['__destroy__'] = WGPURenderPassTimestampWrites.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassTimestampWrites___destroy___0(self);
};

function WGPUComputePassTimestampWrites() { throw "cannot construct a WGPUComputePassTimestampWrites, no constructor in IDL" }
WGPUComputePassTimestampWrites.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUComputePassTimestampWrites.prototype.constructor = WGPUComputePassTimestampWrites;
WGPUComputePassTimestampWrites.prototype.__class__ = WGPUComputePassTimestampWrites;
WGPUComputePassTimestampWrites.__cache__ = {};
Module['WGPUComputePassTimestampWrites'] = WGPUComputePassTimestampWrites;

WGPUComputePassTimestampWrites.prototype['SetQuerySet'] = WGPUComputePassTimestampWrites.prototype.SetQuerySet = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUComputePassTimestampWrites_SetQuerySet_1(self, value);
};

WGPUComputePassTimestampWrites.prototype['SetBeginningOfPassWriteIndex'] = WGPUComputePassTimestampWrites.prototype.SetBeginningOfPassWriteIndex = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUComputePassTimestampWrites_SetBeginningOfPassWriteIndex_1(self, value);
};

WGPUComputePassTimestampWrites.prototype['SetEndOfPassWriteIndex'] = WGPUComputePassTimestampWrites.prototype.SetEndOfPassWriteIndex = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUComputePassTimestampWrites_SetEndOfPassWriteIndex_1(self, value);
};

WGPUComputePassTimestampWrites.prototype['Obtain'] = WGPUComputePassTimestampWrites.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUComputePassTimestampWrites_Obtain_0(), WGPUComputePassTimestampWrites);
};

WGPUComputePassTimestampWrites.prototype['__destroy__'] = WGPUComputePassTimestampWrites.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUComputePassTimestampWrites___destroy___0(self);
};

function WGPUColor() {
  this.ptr = _emscripten_bind_WGPUColor_WGPUColor_0();
  window.idl.getCache(WGPUColor)[this.ptr] = this;
};

WGPUColor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUColor.prototype.constructor = WGPUColor;
WGPUColor.prototype.__class__ = WGPUColor;
WGPUColor.__cache__ = {};
Module['WGPUColor'] = WGPUColor;

WGPUColor.prototype['SetColor'] = WGPUColor.prototype.SetColor = function(r, g, b, a) {
  var self = this.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (g && typeof g === 'object') g = g.ptr;
  if (b && typeof b === 'object') b = b.ptr;
  if (a && typeof a === 'object') a = a.ptr;
  _emscripten_bind_WGPUColor_SetColor_4(self, r, g, b, a);
};

WGPUColor.prototype['SetR'] = WGPUColor.prototype.SetR = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUColor_SetR_1(self, value);
};

WGPUColor.prototype['SetG'] = WGPUColor.prototype.SetG = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUColor_SetG_1(self, value);
};

WGPUColor.prototype['SetB'] = WGPUColor.prototype.SetB = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUColor_SetB_1(self, value);
};

WGPUColor.prototype['SetA'] = WGPUColor.prototype.SetA = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUColor_SetA_1(self, value);
};

WGPUColor.prototype['GetR'] = WGPUColor.prototype.GetR = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUColor_GetR_0(self);
};

WGPUColor.prototype['GetG'] = WGPUColor.prototype.GetG = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUColor_GetG_0(self);
};

WGPUColor.prototype['GetB'] = WGPUColor.prototype.GetB = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUColor_GetB_0(self);
};

WGPUColor.prototype['GetA'] = WGPUColor.prototype.GetA = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUColor_GetA_0(self);
};

WGPUColor.prototype['Obtain'] = WGPUColor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUColor_Obtain_0(), WGPUColor);
};

WGPUColor.prototype['__destroy__'] = WGPUColor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUColor___destroy___0(self);
};

function WGPURenderPassColorAttachment() {
  this.ptr = _emscripten_bind_WGPURenderPassColorAttachment_WGPURenderPassColorAttachment_0();
  window.idl.getCache(WGPURenderPassColorAttachment)[this.ptr] = this;
};

WGPURenderPassColorAttachment.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderPassColorAttachment.prototype.constructor = WGPURenderPassColorAttachment;
WGPURenderPassColorAttachment.prototype.__class__ = WGPURenderPassColorAttachment;
WGPURenderPassColorAttachment.__cache__ = {};
Module['WGPURenderPassColorAttachment'] = WGPURenderPassColorAttachment;

WGPURenderPassColorAttachment.prototype['Reset'] = WGPURenderPassColorAttachment.prototype.Reset = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassColorAttachment_Reset_0(self);
};

WGPURenderPassColorAttachment.prototype['SetNextInChain'] = WGPURenderPassColorAttachment.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPURenderPassColorAttachment_SetNextInChain_1(self, chainedStruct);
};

WGPURenderPassColorAttachment.prototype['SetView'] = WGPURenderPassColorAttachment.prototype.SetView = function(textureView) {
  var self = this.ptr;
  if (textureView && typeof textureView === 'object') textureView = textureView.ptr;
  _emscripten_bind_WGPURenderPassColorAttachment_SetView_1(self, textureView);
};

WGPURenderPassColorAttachment.prototype['SetResolveTarget'] = WGPURenderPassColorAttachment.prototype.SetResolveTarget = function(textureView) {
  var self = this.ptr;
  if (textureView && typeof textureView === 'object') textureView = textureView.ptr;
  _emscripten_bind_WGPURenderPassColorAttachment_SetResolveTarget_1(self, textureView);
};

WGPURenderPassColorAttachment.prototype['SetLoadOp'] = WGPURenderPassColorAttachment.prototype.SetLoadOp = function(loadOp) {
  var self = this.ptr;
  if (loadOp && typeof loadOp === 'object') loadOp = loadOp.ptr;
  _emscripten_bind_WGPURenderPassColorAttachment_SetLoadOp_1(self, loadOp);
};

WGPURenderPassColorAttachment.prototype['SetStoreOp'] = WGPURenderPassColorAttachment.prototype.SetStoreOp = function(storeOp) {
  var self = this.ptr;
  if (storeOp && typeof storeOp === 'object') storeOp = storeOp.ptr;
  _emscripten_bind_WGPURenderPassColorAttachment_SetStoreOp_1(self, storeOp);
};

WGPURenderPassColorAttachment.prototype['GetClearValue'] = WGPURenderPassColorAttachment.prototype.GetClearValue = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPURenderPassColorAttachment_GetClearValue_0(self), WGPUColor);
};

WGPURenderPassColorAttachment.prototype['SetDepthSlice'] = WGPURenderPassColorAttachment.prototype.SetDepthSlice = function(depthSlice) {
  var self = this.ptr;
  if (depthSlice && typeof depthSlice === 'object') depthSlice = depthSlice.ptr;
  _emscripten_bind_WGPURenderPassColorAttachment_SetDepthSlice_1(self, depthSlice);
};

WGPURenderPassColorAttachment.prototype['Obtain'] = WGPURenderPassColorAttachment.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPURenderPassColorAttachment_Obtain_0(), WGPURenderPassColorAttachment);
};

WGPURenderPassColorAttachment.prototype['__destroy__'] = WGPURenderPassColorAttachment.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassColorAttachment___destroy___0(self);
};

function WGPUSurfaceTexture() {
  this.ptr = _emscripten_bind_WGPUSurfaceTexture_WGPUSurfaceTexture_0();
  window.idl.getCache(WGPUSurfaceTexture)[this.ptr] = this;
};

WGPUSurfaceTexture.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUSurfaceTexture.prototype.constructor = WGPUSurfaceTexture;
WGPUSurfaceTexture.prototype.__class__ = WGPUSurfaceTexture;
WGPUSurfaceTexture.__cache__ = {};
Module['WGPUSurfaceTexture'] = WGPUSurfaceTexture;

WGPUSurfaceTexture.prototype['GetTexture'] = WGPUSurfaceTexture.prototype.GetTexture = function(texture) {
  var self = this.ptr;
  if (texture && typeof texture === 'object') texture = texture.ptr;
  _emscripten_bind_WGPUSurfaceTexture_GetTexture_1(self, texture);
};

WGPUSurfaceTexture.prototype['GetStatus'] = WGPUSurfaceTexture.prototype.GetStatus = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUSurfaceTexture_GetStatus_0(self);
};

WGPUSurfaceTexture.prototype['Obtain'] = WGPUSurfaceTexture.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUSurfaceTexture_Obtain_0(), WGPUSurfaceTexture);
};

WGPUSurfaceTexture.prototype['__destroy__'] = WGPUSurfaceTexture.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSurfaceTexture___destroy___0(self);
};

function WGPUSurfaceCapabilities() {
  this.ptr = _emscripten_bind_WGPUSurfaceCapabilities_WGPUSurfaceCapabilities_0();
  window.idl.getCache(WGPUSurfaceCapabilities)[this.ptr] = this;
};

WGPUSurfaceCapabilities.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUSurfaceCapabilities.prototype.constructor = WGPUSurfaceCapabilities;
WGPUSurfaceCapabilities.prototype.__class__ = WGPUSurfaceCapabilities;
WGPUSurfaceCapabilities.__cache__ = {};
Module['WGPUSurfaceCapabilities'] = WGPUSurfaceCapabilities;

WGPUSurfaceCapabilities.prototype['GetFormats'] = WGPUSurfaceCapabilities.prototype.GetFormats = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUSurfaceCapabilities_GetFormats_0(self), WGPUVectorTextureFormat);
};

WGPUSurfaceCapabilities.prototype['Obtain'] = WGPUSurfaceCapabilities.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUSurfaceCapabilities_Obtain_0(), WGPUSurfaceCapabilities);
};

WGPUSurfaceCapabilities.prototype['__destroy__'] = WGPUSurfaceCapabilities.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSurfaceCapabilities___destroy___0(self);
};

function WGPUSurfaceConfiguration() {
  this.ptr = _emscripten_bind_WGPUSurfaceConfiguration_WGPUSurfaceConfiguration_0();
  window.idl.getCache(WGPUSurfaceConfiguration)[this.ptr] = this;
};

WGPUSurfaceConfiguration.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUSurfaceConfiguration.prototype.constructor = WGPUSurfaceConfiguration;
WGPUSurfaceConfiguration.prototype.__class__ = WGPUSurfaceConfiguration;
WGPUSurfaceConfiguration.__cache__ = {};
Module['WGPUSurfaceConfiguration'] = WGPUSurfaceConfiguration;

WGPUSurfaceConfiguration.prototype['SetNextInChain'] = WGPUSurfaceConfiguration.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUSurfaceConfiguration_SetNextInChain_1(self, chainedStruct);
};

WGPUSurfaceConfiguration.prototype['SetWidth'] = WGPUSurfaceConfiguration.prototype.SetWidth = function(width) {
  var self = this.ptr;
  if (width && typeof width === 'object') width = width.ptr;
  _emscripten_bind_WGPUSurfaceConfiguration_SetWidth_1(self, width);
};

WGPUSurfaceConfiguration.prototype['SetHeight'] = WGPUSurfaceConfiguration.prototype.SetHeight = function(height) {
  var self = this.ptr;
  if (height && typeof height === 'object') height = height.ptr;
  _emscripten_bind_WGPUSurfaceConfiguration_SetHeight_1(self, height);
};

WGPUSurfaceConfiguration.prototype['SetFormat'] = WGPUSurfaceConfiguration.prototype.SetFormat = function(format) {
  var self = this.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  _emscripten_bind_WGPUSurfaceConfiguration_SetFormat_1(self, format);
};

WGPUSurfaceConfiguration.prototype['SetViewFormats'] = WGPUSurfaceConfiguration.prototype.SetViewFormats = function(formats) {
  var self = this.ptr;
  if (formats && typeof formats === 'object') formats = formats.ptr;
  _emscripten_bind_WGPUSurfaceConfiguration_SetViewFormats_1(self, formats);
};

WGPUSurfaceConfiguration.prototype['SetUsage'] = WGPUSurfaceConfiguration.prototype.SetUsage = function(usage) {
  var self = this.ptr;
  if (usage && typeof usage === 'object') usage = usage.ptr;
  _emscripten_bind_WGPUSurfaceConfiguration_SetUsage_1(self, usage);
};

WGPUSurfaceConfiguration.prototype['SetDevice'] = WGPUSurfaceConfiguration.prototype.SetDevice = function(device) {
  var self = this.ptr;
  if (device && typeof device === 'object') device = device.ptr;
  _emscripten_bind_WGPUSurfaceConfiguration_SetDevice_1(self, device);
};

WGPUSurfaceConfiguration.prototype['SetPresentMode'] = WGPUSurfaceConfiguration.prototype.SetPresentMode = function(presentMode) {
  var self = this.ptr;
  if (presentMode && typeof presentMode === 'object') presentMode = presentMode.ptr;
  _emscripten_bind_WGPUSurfaceConfiguration_SetPresentMode_1(self, presentMode);
};

WGPUSurfaceConfiguration.prototype['SetAlphaMode'] = WGPUSurfaceConfiguration.prototype.SetAlphaMode = function(alphaMode) {
  var self = this.ptr;
  if (alphaMode && typeof alphaMode === 'object') alphaMode = alphaMode.ptr;
  _emscripten_bind_WGPUSurfaceConfiguration_SetAlphaMode_1(self, alphaMode);
};

WGPUSurfaceConfiguration.prototype['Obtain'] = WGPUSurfaceConfiguration.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUSurfaceConfiguration_Obtain_0(), WGPUSurfaceConfiguration);
};

WGPUSurfaceConfiguration.prototype['__destroy__'] = WGPUSurfaceConfiguration.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSurfaceConfiguration___destroy___0(self);
};

function WGPUChainedStruct() { throw "cannot construct a WGPUChainedStruct, no constructor in IDL" }
WGPUChainedStruct.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUChainedStruct.prototype.constructor = WGPUChainedStruct;
WGPUChainedStruct.prototype.__class__ = WGPUChainedStruct;
WGPUChainedStruct.__cache__ = {};
Module['WGPUChainedStruct'] = WGPUChainedStruct;

WGPUChainedStruct.prototype['SetNext'] = WGPUChainedStruct.prototype.SetNext = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUChainedStruct_SetNext_1(self, value);
};

WGPUChainedStruct.prototype['SetSType'] = WGPUChainedStruct.prototype.SetSType = function(type) {
  var self = this.ptr;
  if (type && typeof type === 'object') type = type.ptr;
  _emscripten_bind_WGPUChainedStruct_SetSType_1(self, type);
};

WGPUChainedStruct.prototype['__destroy__'] = WGPUChainedStruct.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUChainedStruct___destroy___0(self);
};

function WGPUStringView() { throw "cannot construct a WGPUStringView, no constructor in IDL" }
WGPUStringView.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUStringView.prototype.constructor = WGPUStringView;
WGPUStringView.prototype.__class__ = WGPUStringView;
WGPUStringView.__cache__ = {};
Module['WGPUStringView'] = WGPUStringView;

WGPUStringView.prototype['GetString'] = WGPUStringView.prototype.GetString = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUStringView_GetString_0(self), IDLString);
};

WGPUStringView.prototype['__destroy__'] = WGPUStringView.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUStringView___destroy___0(self);
};

function WGPUOrigin3D() {
  this.ptr = _emscripten_bind_WGPUOrigin3D_WGPUOrigin3D_0();
  window.idl.getCache(WGPUOrigin3D)[this.ptr] = this;
};

WGPUOrigin3D.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUOrigin3D.prototype.constructor = WGPUOrigin3D;
WGPUOrigin3D.prototype.__class__ = WGPUOrigin3D;
WGPUOrigin3D.__cache__ = {};
Module['WGPUOrigin3D'] = WGPUOrigin3D;

WGPUOrigin3D.prototype['Set'] = WGPUOrigin3D.prototype.Set = function(x, y, z) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (z && typeof z === 'object') z = z.ptr;
  _emscripten_bind_WGPUOrigin3D_Set_3(self, x, y, z);
};

WGPUOrigin3D.prototype['SetX'] = WGPUOrigin3D.prototype.SetX = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUOrigin3D_SetX_1(self, value);
};

WGPUOrigin3D.prototype['SetY'] = WGPUOrigin3D.prototype.SetY = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUOrigin3D_SetY_1(self, value);
};

WGPUOrigin3D.prototype['SetZ'] = WGPUOrigin3D.prototype.SetZ = function(value) {
  var self = this.ptr;
  if (value && typeof value === 'object') value = value.ptr;
  _emscripten_bind_WGPUOrigin3D_SetZ_1(self, value);
};

WGPUOrigin3D.prototype['Obtain'] = WGPUOrigin3D.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUOrigin3D_Obtain_0(), WGPUOrigin3D);
};

WGPUOrigin3D.prototype['__destroy__'] = WGPUOrigin3D.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUOrigin3D___destroy___0(self);
};

function WGPUTexelCopyTextureInfo() {
  this.ptr = _emscripten_bind_WGPUTexelCopyTextureInfo_WGPUTexelCopyTextureInfo_0();
  window.idl.getCache(WGPUTexelCopyTextureInfo)[this.ptr] = this;
};

WGPUTexelCopyTextureInfo.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUTexelCopyTextureInfo.prototype.constructor = WGPUTexelCopyTextureInfo;
WGPUTexelCopyTextureInfo.prototype.__class__ = WGPUTexelCopyTextureInfo;
WGPUTexelCopyTextureInfo.__cache__ = {};
Module['WGPUTexelCopyTextureInfo'] = WGPUTexelCopyTextureInfo;

WGPUTexelCopyTextureInfo.prototype['GetPtr'] = WGPUTexelCopyTextureInfo.prototype.GetPtr = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUTexelCopyTextureInfo_GetPtr_0(self);
};

WGPUTexelCopyTextureInfo.prototype['SetTexture'] = WGPUTexelCopyTextureInfo.prototype.SetTexture = function(texture) {
  var self = this.ptr;
  if (texture && typeof texture === 'object') texture = texture.ptr;
  _emscripten_bind_WGPUTexelCopyTextureInfo_SetTexture_1(self, texture);
};

WGPUTexelCopyTextureInfo.prototype['SetMipLevel'] = WGPUTexelCopyTextureInfo.prototype.SetMipLevel = function(mipLevel) {
  var self = this.ptr;
  if (mipLevel && typeof mipLevel === 'object') mipLevel = mipLevel.ptr;
  _emscripten_bind_WGPUTexelCopyTextureInfo_SetMipLevel_1(self, mipLevel);
};

WGPUTexelCopyTextureInfo.prototype['GetOrigin'] = WGPUTexelCopyTextureInfo.prototype.GetOrigin = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUTexelCopyTextureInfo_GetOrigin_0(self), WGPUOrigin3D);
};

WGPUTexelCopyTextureInfo.prototype['SetAspect'] = WGPUTexelCopyTextureInfo.prototype.SetAspect = function(aspect) {
  var self = this.ptr;
  if (aspect && typeof aspect === 'object') aspect = aspect.ptr;
  _emscripten_bind_WGPUTexelCopyTextureInfo_SetAspect_1(self, aspect);
};

WGPUTexelCopyTextureInfo.prototype['Obtain'] = WGPUTexelCopyTextureInfo.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUTexelCopyTextureInfo_Obtain_0(), WGPUTexelCopyTextureInfo);
};

WGPUTexelCopyTextureInfo.prototype['__destroy__'] = WGPUTexelCopyTextureInfo.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUTexelCopyTextureInfo___destroy___0(self);
};

function WGPUExtent3D() {
  this.ptr = _emscripten_bind_WGPUExtent3D_WGPUExtent3D_0();
  window.idl.getCache(WGPUExtent3D)[this.ptr] = this;
};

WGPUExtent3D.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUExtent3D.prototype.constructor = WGPUExtent3D;
WGPUExtent3D.prototype.__class__ = WGPUExtent3D;
WGPUExtent3D.__cache__ = {};
Module['WGPUExtent3D'] = WGPUExtent3D;

WGPUExtent3D.prototype['Get'] = WGPUExtent3D.prototype.Get = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUExtent3D_Get_0(self);
};

WGPUExtent3D.prototype['SetWidth'] = WGPUExtent3D.prototype.SetWidth = function(width) {
  var self = this.ptr;
  if (width && typeof width === 'object') width = width.ptr;
  _emscripten_bind_WGPUExtent3D_SetWidth_1(self, width);
};

WGPUExtent3D.prototype['SetHeight'] = WGPUExtent3D.prototype.SetHeight = function(height) {
  var self = this.ptr;
  if (height && typeof height === 'object') height = height.ptr;
  _emscripten_bind_WGPUExtent3D_SetHeight_1(self, height);
};

WGPUExtent3D.prototype['SetDepthOrArrayLayers'] = WGPUExtent3D.prototype.SetDepthOrArrayLayers = function(depthOrArrayLayers) {
  var self = this.ptr;
  if (depthOrArrayLayers && typeof depthOrArrayLayers === 'object') depthOrArrayLayers = depthOrArrayLayers.ptr;
  _emscripten_bind_WGPUExtent3D_SetDepthOrArrayLayers_1(self, depthOrArrayLayers);
};

WGPUExtent3D.prototype['Obtain'] = WGPUExtent3D.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUExtent3D_Obtain_0(), WGPUExtent3D);
};

WGPUExtent3D.prototype['__destroy__'] = WGPUExtent3D.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUExtent3D___destroy___0(self);
};

function WGPUTexelCopyBufferLayout() {
  this.ptr = _emscripten_bind_WGPUTexelCopyBufferLayout_WGPUTexelCopyBufferLayout_0();
  window.idl.getCache(WGPUTexelCopyBufferLayout)[this.ptr] = this;
};

WGPUTexelCopyBufferLayout.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUTexelCopyBufferLayout.prototype.constructor = WGPUTexelCopyBufferLayout;
WGPUTexelCopyBufferLayout.prototype.__class__ = WGPUTexelCopyBufferLayout;
WGPUTexelCopyBufferLayout.__cache__ = {};
Module['WGPUTexelCopyBufferLayout'] = WGPUTexelCopyBufferLayout;

WGPUTexelCopyBufferLayout.prototype['Get'] = WGPUTexelCopyBufferLayout.prototype.Get = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUTexelCopyBufferLayout_Get_0(self);
};

WGPUTexelCopyBufferLayout.prototype['SetOffset'] = WGPUTexelCopyBufferLayout.prototype.SetOffset = function(offset) {
  var self = this.ptr;
  if (offset && typeof offset === 'object') offset = offset.ptr;
  _emscripten_bind_WGPUTexelCopyBufferLayout_SetOffset_1(self, offset);
};

WGPUTexelCopyBufferLayout.prototype['SetBytesPerRow'] = WGPUTexelCopyBufferLayout.prototype.SetBytesPerRow = function(bytesPerRow) {
  var self = this.ptr;
  if (bytesPerRow && typeof bytesPerRow === 'object') bytesPerRow = bytesPerRow.ptr;
  _emscripten_bind_WGPUTexelCopyBufferLayout_SetBytesPerRow_1(self, bytesPerRow);
};

WGPUTexelCopyBufferLayout.prototype['SetRowsPerImage'] = WGPUTexelCopyBufferLayout.prototype.SetRowsPerImage = function(rowsPerImage) {
  var self = this.ptr;
  if (rowsPerImage && typeof rowsPerImage === 'object') rowsPerImage = rowsPerImage.ptr;
  _emscripten_bind_WGPUTexelCopyBufferLayout_SetRowsPerImage_1(self, rowsPerImage);
};

WGPUTexelCopyBufferLayout.prototype['Obtain'] = WGPUTexelCopyBufferLayout.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUTexelCopyBufferLayout_Obtain_0(), WGPUTexelCopyBufferLayout);
};

WGPUTexelCopyBufferLayout.prototype['__destroy__'] = WGPUTexelCopyBufferLayout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUTexelCopyBufferLayout___destroy___0(self);
};

function WGPUTexelCopyBufferInfo() {
  this.ptr = _emscripten_bind_WGPUTexelCopyBufferInfo_WGPUTexelCopyBufferInfo_0();
  window.idl.getCache(WGPUTexelCopyBufferInfo)[this.ptr] = this;
};

WGPUTexelCopyBufferInfo.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUTexelCopyBufferInfo.prototype.constructor = WGPUTexelCopyBufferInfo;
WGPUTexelCopyBufferInfo.prototype.__class__ = WGPUTexelCopyBufferInfo;
WGPUTexelCopyBufferInfo.__cache__ = {};
Module['WGPUTexelCopyBufferInfo'] = WGPUTexelCopyBufferInfo;

WGPUTexelCopyBufferInfo.prototype['GetLayout'] = WGPUTexelCopyBufferInfo.prototype.GetLayout = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUTexelCopyBufferInfo_GetLayout_0(self), WGPUTexelCopyBufferLayout);
};

WGPUTexelCopyBufferInfo.prototype['GetBuffer'] = WGPUTexelCopyBufferInfo.prototype.GetBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUTexelCopyBufferInfo_GetBuffer_0(self), WGPUBuffer);
};

WGPUTexelCopyBufferInfo.prototype['SetBuffer'] = WGPUTexelCopyBufferInfo.prototype.SetBuffer = function(buffer) {
  var self = this.ptr;
  if (buffer && typeof buffer === 'object') buffer = buffer.ptr;
  _emscripten_bind_WGPUTexelCopyBufferInfo_SetBuffer_1(self, buffer);
};

WGPUTexelCopyBufferInfo.prototype['Obtain'] = WGPUTexelCopyBufferInfo.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUTexelCopyBufferInfo_Obtain_0(), WGPUTexelCopyBufferInfo);
};

WGPUTexelCopyBufferInfo.prototype['__destroy__'] = WGPUTexelCopyBufferInfo.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUTexelCopyBufferInfo___destroy___0(self);
};

function WGPUBindGroupLayoutEntry() {
  this.ptr = _emscripten_bind_WGPUBindGroupLayoutEntry_WGPUBindGroupLayoutEntry_0();
  window.idl.getCache(WGPUBindGroupLayoutEntry)[this.ptr] = this;
};

WGPUBindGroupLayoutEntry.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBindGroupLayoutEntry.prototype.constructor = WGPUBindGroupLayoutEntry;
WGPUBindGroupLayoutEntry.prototype.__class__ = WGPUBindGroupLayoutEntry;
WGPUBindGroupLayoutEntry.__cache__ = {};
Module['WGPUBindGroupLayoutEntry'] = WGPUBindGroupLayoutEntry;

WGPUBindGroupLayoutEntry.prototype['SetNextInChain'] = WGPUBindGroupLayoutEntry.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUBindGroupLayoutEntry_SetNextInChain_1(self, chainedStruct);
};

WGPUBindGroupLayoutEntry.prototype['SetBinding'] = WGPUBindGroupLayoutEntry.prototype.SetBinding = function(binding) {
  var self = this.ptr;
  if (binding && typeof binding === 'object') binding = binding.ptr;
  _emscripten_bind_WGPUBindGroupLayoutEntry_SetBinding_1(self, binding);
};

WGPUBindGroupLayoutEntry.prototype['SetVisibility'] = WGPUBindGroupLayoutEntry.prototype.SetVisibility = function(visibility) {
  var self = this.ptr;
  if (visibility && typeof visibility === 'object') visibility = visibility.ptr;
  _emscripten_bind_WGPUBindGroupLayoutEntry_SetVisibility_1(self, visibility);
};

WGPUBindGroupLayoutEntry.prototype['SetBuffer'] = WGPUBindGroupLayoutEntry.prototype.SetBuffer = function(buffer) {
  var self = this.ptr;
  if (buffer && typeof buffer === 'object') buffer = buffer.ptr;
  _emscripten_bind_WGPUBindGroupLayoutEntry_SetBuffer_1(self, buffer);
};

WGPUBindGroupLayoutEntry.prototype['SetSampler'] = WGPUBindGroupLayoutEntry.prototype.SetSampler = function(sampler) {
  var self = this.ptr;
  if (sampler && typeof sampler === 'object') sampler = sampler.ptr;
  _emscripten_bind_WGPUBindGroupLayoutEntry_SetSampler_1(self, sampler);
};

WGPUBindGroupLayoutEntry.prototype['SetTexture'] = WGPUBindGroupLayoutEntry.prototype.SetTexture = function(texture) {
  var self = this.ptr;
  if (texture && typeof texture === 'object') texture = texture.ptr;
  _emscripten_bind_WGPUBindGroupLayoutEntry_SetTexture_1(self, texture);
};

WGPUBindGroupLayoutEntry.prototype['SetStorageTexture'] = WGPUBindGroupLayoutEntry.prototype.SetStorageTexture = function(storageTexture) {
  var self = this.ptr;
  if (storageTexture && typeof storageTexture === 'object') storageTexture = storageTexture.ptr;
  _emscripten_bind_WGPUBindGroupLayoutEntry_SetStorageTexture_1(self, storageTexture);
};

WGPUBindGroupLayoutEntry.prototype['GetBuffer'] = WGPUBindGroupLayoutEntry.prototype.GetBuffer = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUBindGroupLayoutEntry_GetBuffer_0(self), WGPUBufferBindingLayout);
};

WGPUBindGroupLayoutEntry.prototype['GetSampler'] = WGPUBindGroupLayoutEntry.prototype.GetSampler = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUBindGroupLayoutEntry_GetSampler_0(self), WGPUSamplerBindingLayout);
};

WGPUBindGroupLayoutEntry.prototype['GetStorageTexture'] = WGPUBindGroupLayoutEntry.prototype.GetStorageTexture = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUBindGroupLayoutEntry_GetStorageTexture_0(self), WGPUStorageTextureBindingLayout);
};

WGPUBindGroupLayoutEntry.prototype['GetTexture'] = WGPUBindGroupLayoutEntry.prototype.GetTexture = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUBindGroupLayoutEntry_GetTexture_0(self), WGPUTextureBindingLayout);
};

WGPUBindGroupLayoutEntry.prototype['Obtain'] = WGPUBindGroupLayoutEntry.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUBindGroupLayoutEntry_Obtain_0(), WGPUBindGroupLayoutEntry);
};

WGPUBindGroupLayoutEntry.prototype['__destroy__'] = WGPUBindGroupLayoutEntry.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBindGroupLayoutEntry___destroy___0(self);
};

function WGPUBufferBindingLayout() {
  this.ptr = _emscripten_bind_WGPUBufferBindingLayout_WGPUBufferBindingLayout_0();
  window.idl.getCache(WGPUBufferBindingLayout)[this.ptr] = this;
};

WGPUBufferBindingLayout.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBufferBindingLayout.prototype.constructor = WGPUBufferBindingLayout;
WGPUBufferBindingLayout.prototype.__class__ = WGPUBufferBindingLayout;
WGPUBufferBindingLayout.__cache__ = {};
Module['WGPUBufferBindingLayout'] = WGPUBufferBindingLayout;

WGPUBufferBindingLayout.prototype['SetNextInChain'] = WGPUBufferBindingLayout.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUBufferBindingLayout_SetNextInChain_1(self, chainedStruct);
};

WGPUBufferBindingLayout.prototype['SetType'] = WGPUBufferBindingLayout.prototype.SetType = function(type) {
  var self = this.ptr;
  if (type && typeof type === 'object') type = type.ptr;
  _emscripten_bind_WGPUBufferBindingLayout_SetType_1(self, type);
};

WGPUBufferBindingLayout.prototype['SetHasDynamicOffset'] = WGPUBufferBindingLayout.prototype.SetHasDynamicOffset = function(hasDynamicOffset) {
  var self = this.ptr;
  if (hasDynamicOffset && typeof hasDynamicOffset === 'object') hasDynamicOffset = hasDynamicOffset.ptr;
  _emscripten_bind_WGPUBufferBindingLayout_SetHasDynamicOffset_1(self, hasDynamicOffset);
};

WGPUBufferBindingLayout.prototype['SetMinBindingSize'] = WGPUBufferBindingLayout.prototype.SetMinBindingSize = function(minBindingSize) {
  var self = this.ptr;
  if (minBindingSize && typeof minBindingSize === 'object') minBindingSize = minBindingSize.ptr;
  _emscripten_bind_WGPUBufferBindingLayout_SetMinBindingSize_1(self, minBindingSize);
};

WGPUBufferBindingLayout.prototype['Obtain'] = WGPUBufferBindingLayout.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUBufferBindingLayout_Obtain_0(), WGPUBufferBindingLayout);
};

WGPUBufferBindingLayout.prototype['__destroy__'] = WGPUBufferBindingLayout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBufferBindingLayout___destroy___0(self);
};

function WGPUSamplerBindingLayout() {
  this.ptr = _emscripten_bind_WGPUSamplerBindingLayout_WGPUSamplerBindingLayout_0();
  window.idl.getCache(WGPUSamplerBindingLayout)[this.ptr] = this;
};

WGPUSamplerBindingLayout.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUSamplerBindingLayout.prototype.constructor = WGPUSamplerBindingLayout;
WGPUSamplerBindingLayout.prototype.__class__ = WGPUSamplerBindingLayout;
WGPUSamplerBindingLayout.__cache__ = {};
Module['WGPUSamplerBindingLayout'] = WGPUSamplerBindingLayout;

WGPUSamplerBindingLayout.prototype['SetNextInChain'] = WGPUSamplerBindingLayout.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUSamplerBindingLayout_SetNextInChain_1(self, chainedStruct);
};

WGPUSamplerBindingLayout.prototype['SetType'] = WGPUSamplerBindingLayout.prototype.SetType = function(type) {
  var self = this.ptr;
  if (type && typeof type === 'object') type = type.ptr;
  _emscripten_bind_WGPUSamplerBindingLayout_SetType_1(self, type);
};

WGPUSamplerBindingLayout.prototype['Obtain'] = WGPUSamplerBindingLayout.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUSamplerBindingLayout_Obtain_0(), WGPUSamplerBindingLayout);
};

WGPUSamplerBindingLayout.prototype['__destroy__'] = WGPUSamplerBindingLayout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSamplerBindingLayout___destroy___0(self);
};

function WGPUTextureBindingLayout() {
  this.ptr = _emscripten_bind_WGPUTextureBindingLayout_WGPUTextureBindingLayout_0();
  window.idl.getCache(WGPUTextureBindingLayout)[this.ptr] = this;
};

WGPUTextureBindingLayout.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUTextureBindingLayout.prototype.constructor = WGPUTextureBindingLayout;
WGPUTextureBindingLayout.prototype.__class__ = WGPUTextureBindingLayout;
WGPUTextureBindingLayout.__cache__ = {};
Module['WGPUTextureBindingLayout'] = WGPUTextureBindingLayout;

WGPUTextureBindingLayout.prototype['SetNextInChain'] = WGPUTextureBindingLayout.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUTextureBindingLayout_SetNextInChain_1(self, chainedStruct);
};

WGPUTextureBindingLayout.prototype['SetSampleType'] = WGPUTextureBindingLayout.prototype.SetSampleType = function(sampleType) {
  var self = this.ptr;
  if (sampleType && typeof sampleType === 'object') sampleType = sampleType.ptr;
  _emscripten_bind_WGPUTextureBindingLayout_SetSampleType_1(self, sampleType);
};

WGPUTextureBindingLayout.prototype['SetViewDimension'] = WGPUTextureBindingLayout.prototype.SetViewDimension = function(viewDimension) {
  var self = this.ptr;
  if (viewDimension && typeof viewDimension === 'object') viewDimension = viewDimension.ptr;
  _emscripten_bind_WGPUTextureBindingLayout_SetViewDimension_1(self, viewDimension);
};

WGPUTextureBindingLayout.prototype['SetMultisampled'] = WGPUTextureBindingLayout.prototype.SetMultisampled = function(multisampled) {
  var self = this.ptr;
  if (multisampled && typeof multisampled === 'object') multisampled = multisampled.ptr;
  _emscripten_bind_WGPUTextureBindingLayout_SetMultisampled_1(self, multisampled);
};

WGPUTextureBindingLayout.prototype['Obtain'] = WGPUTextureBindingLayout.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUTextureBindingLayout_Obtain_0(), WGPUTextureBindingLayout);
};

WGPUTextureBindingLayout.prototype['__destroy__'] = WGPUTextureBindingLayout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUTextureBindingLayout___destroy___0(self);
};

function WGPUStorageTextureBindingLayout() {
  this.ptr = _emscripten_bind_WGPUStorageTextureBindingLayout_WGPUStorageTextureBindingLayout_0();
  window.idl.getCache(WGPUStorageTextureBindingLayout)[this.ptr] = this;
};

WGPUStorageTextureBindingLayout.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUStorageTextureBindingLayout.prototype.constructor = WGPUStorageTextureBindingLayout;
WGPUStorageTextureBindingLayout.prototype.__class__ = WGPUStorageTextureBindingLayout;
WGPUStorageTextureBindingLayout.__cache__ = {};
Module['WGPUStorageTextureBindingLayout'] = WGPUStorageTextureBindingLayout;

WGPUStorageTextureBindingLayout.prototype['SetNextInChain'] = WGPUStorageTextureBindingLayout.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUStorageTextureBindingLayout_SetNextInChain_1(self, chainedStruct);
};

WGPUStorageTextureBindingLayout.prototype['SetAccess'] = WGPUStorageTextureBindingLayout.prototype.SetAccess = function(access) {
  var self = this.ptr;
  if (access && typeof access === 'object') access = access.ptr;
  _emscripten_bind_WGPUStorageTextureBindingLayout_SetAccess_1(self, access);
};

WGPUStorageTextureBindingLayout.prototype['SetFormat'] = WGPUStorageTextureBindingLayout.prototype.SetFormat = function(format) {
  var self = this.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  _emscripten_bind_WGPUStorageTextureBindingLayout_SetFormat_1(self, format);
};

WGPUStorageTextureBindingLayout.prototype['SetViewDimension'] = WGPUStorageTextureBindingLayout.prototype.SetViewDimension = function(viewDimension) {
  var self = this.ptr;
  if (viewDimension && typeof viewDimension === 'object') viewDimension = viewDimension.ptr;
  _emscripten_bind_WGPUStorageTextureBindingLayout_SetViewDimension_1(self, viewDimension);
};

WGPUStorageTextureBindingLayout.prototype['Obtain'] = WGPUStorageTextureBindingLayout.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUStorageTextureBindingLayout_Obtain_0(), WGPUStorageTextureBindingLayout);
};

WGPUStorageTextureBindingLayout.prototype['__destroy__'] = WGPUStorageTextureBindingLayout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUStorageTextureBindingLayout___destroy___0(self);
};

function WGPUBindGroupEntry() {
  this.ptr = _emscripten_bind_WGPUBindGroupEntry_WGPUBindGroupEntry_0();
  window.idl.getCache(WGPUBindGroupEntry)[this.ptr] = this;
};

WGPUBindGroupEntry.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBindGroupEntry.prototype.constructor = WGPUBindGroupEntry;
WGPUBindGroupEntry.prototype.__class__ = WGPUBindGroupEntry;
WGPUBindGroupEntry.__cache__ = {};
Module['WGPUBindGroupEntry'] = WGPUBindGroupEntry;

WGPUBindGroupEntry.prototype['Reset'] = WGPUBindGroupEntry.prototype.Reset = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBindGroupEntry_Reset_0(self);
};

WGPUBindGroupEntry.prototype['SetNextInChain'] = WGPUBindGroupEntry.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUBindGroupEntry_SetNextInChain_1(self, chainedStruct);
};

WGPUBindGroupEntry.prototype['SetBinding'] = WGPUBindGroupEntry.prototype.SetBinding = function(binding) {
  var self = this.ptr;
  if (binding && typeof binding === 'object') binding = binding.ptr;
  _emscripten_bind_WGPUBindGroupEntry_SetBinding_1(self, binding);
};

WGPUBindGroupEntry.prototype['SetBuffer'] = WGPUBindGroupEntry.prototype.SetBuffer = function(buffer) {
  var self = this.ptr;
  if (buffer && typeof buffer === 'object') buffer = buffer.ptr;
  _emscripten_bind_WGPUBindGroupEntry_SetBuffer_1(self, buffer);
};

WGPUBindGroupEntry.prototype['SetOffset'] = WGPUBindGroupEntry.prototype.SetOffset = function(offset) {
  var self = this.ptr;
  if (offset && typeof offset === 'object') offset = offset.ptr;
  _emscripten_bind_WGPUBindGroupEntry_SetOffset_1(self, offset);
};

WGPUBindGroupEntry.prototype['SetSize'] = WGPUBindGroupEntry.prototype.SetSize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_WGPUBindGroupEntry_SetSize_1(self, size);
};

WGPUBindGroupEntry.prototype['SetSampler'] = WGPUBindGroupEntry.prototype.SetSampler = function(sampler) {
  var self = this.ptr;
  if (sampler && typeof sampler === 'object') sampler = sampler.ptr;
  _emscripten_bind_WGPUBindGroupEntry_SetSampler_1(self, sampler);
};

WGPUBindGroupEntry.prototype['SetTextureView'] = WGPUBindGroupEntry.prototype.SetTextureView = function(textureView) {
  var self = this.ptr;
  if (textureView && typeof textureView === 'object') textureView = textureView.ptr;
  _emscripten_bind_WGPUBindGroupEntry_SetTextureView_1(self, textureView);
};

WGPUBindGroupEntry.prototype['Obtain'] = WGPUBindGroupEntry.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUBindGroupEntry_Obtain_0(), WGPUBindGroupEntry);
};

WGPUBindGroupEntry.prototype['__destroy__'] = WGPUBindGroupEntry.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBindGroupEntry___destroy___0(self);
};

function WGPURenderPassMaxDrawCount() {
  this.ptr = _emscripten_bind_WGPURenderPassMaxDrawCount_WGPURenderPassMaxDrawCount_0();
  window.idl.getCache(WGPURenderPassMaxDrawCount)[this.ptr] = this;
};

WGPURenderPassMaxDrawCount.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderPassMaxDrawCount.prototype.constructor = WGPURenderPassMaxDrawCount;
WGPURenderPassMaxDrawCount.prototype.__class__ = WGPURenderPassMaxDrawCount;
WGPURenderPassMaxDrawCount.__cache__ = {};
Module['WGPURenderPassMaxDrawCount'] = WGPURenderPassMaxDrawCount;

WGPURenderPassMaxDrawCount.prototype['SetMaxDrawCount'] = WGPURenderPassMaxDrawCount.prototype.SetMaxDrawCount = function(maxDrawCount) {
  var self = this.ptr;
  if (maxDrawCount && typeof maxDrawCount === 'object') maxDrawCount = maxDrawCount.ptr;
  _emscripten_bind_WGPURenderPassMaxDrawCount_SetMaxDrawCount_1(self, maxDrawCount);
};

WGPURenderPassMaxDrawCount.prototype['GetMaxDrawCount'] = WGPURenderPassMaxDrawCount.prototype.GetMaxDrawCount = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPURenderPassMaxDrawCount_GetMaxDrawCount_0(self);
};

WGPURenderPassMaxDrawCount.prototype['Obtain'] = WGPURenderPassMaxDrawCount.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPURenderPassMaxDrawCount_Obtain_0(), WGPURenderPassMaxDrawCount);
};

WGPURenderPassMaxDrawCount.prototype['__destroy__'] = WGPURenderPassMaxDrawCount.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassMaxDrawCount___destroy___0(self);
};

function WGPUShaderSourceSPIRV() {
  this.ptr = _emscripten_bind_WGPUShaderSourceSPIRV_WGPUShaderSourceSPIRV_0();
  window.idl.getCache(WGPUShaderSourceSPIRV)[this.ptr] = this;
};

WGPUShaderSourceSPIRV.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUShaderSourceSPIRV.prototype.constructor = WGPUShaderSourceSPIRV;
WGPUShaderSourceSPIRV.prototype.__class__ = WGPUShaderSourceSPIRV;
WGPUShaderSourceSPIRV.__cache__ = {};
Module['WGPUShaderSourceSPIRV'] = WGPUShaderSourceSPIRV;

WGPUShaderSourceSPIRV.prototype['Obtain'] = WGPUShaderSourceSPIRV.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUShaderSourceSPIRV_Obtain_0(), WGPUShaderSourceSPIRV);
};

WGPUShaderSourceSPIRV.prototype['__destroy__'] = WGPUShaderSourceSPIRV.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUShaderSourceSPIRV___destroy___0(self);
};

function WGPUSupportedWGSLLanguageFeatures() {
  this.ptr = _emscripten_bind_WGPUSupportedWGSLLanguageFeatures_WGPUSupportedWGSLLanguageFeatures_0();
  window.idl.getCache(WGPUSupportedWGSLLanguageFeatures)[this.ptr] = this;
};

WGPUSupportedWGSLLanguageFeatures.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUSupportedWGSLLanguageFeatures.prototype.constructor = WGPUSupportedWGSLLanguageFeatures;
WGPUSupportedWGSLLanguageFeatures.prototype.__class__ = WGPUSupportedWGSLLanguageFeatures;
WGPUSupportedWGSLLanguageFeatures.__cache__ = {};
Module['WGPUSupportedWGSLLanguageFeatures'] = WGPUSupportedWGSLLanguageFeatures;

WGPUSupportedWGSLLanguageFeatures.prototype['GetFeatureCount'] = WGPUSupportedWGSLLanguageFeatures.prototype.GetFeatureCount = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUSupportedWGSLLanguageFeatures_GetFeatureCount_0(self);
};

WGPUSupportedWGSLLanguageFeatures.prototype['GetFeatureAt'] = WGPUSupportedWGSLLanguageFeatures.prototype.GetFeatureAt = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_WGPUSupportedWGSLLanguageFeatures_GetFeatureAt_1(self, index);
};

WGPUSupportedWGSLLanguageFeatures.prototype['Obtain'] = WGPUSupportedWGSLLanguageFeatures.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUSupportedWGSLLanguageFeatures_Obtain_0(), WGPUSupportedWGSLLanguageFeatures);
};

WGPUSupportedWGSLLanguageFeatures.prototype['__destroy__'] = WGPUSupportedWGSLLanguageFeatures.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSupportedWGSLLanguageFeatures___destroy___0(self);
};

function WGPUCompilationInfo() {
  this.ptr = _emscripten_bind_WGPUCompilationInfo_WGPUCompilationInfo_0();
  window.idl.getCache(WGPUCompilationInfo)[this.ptr] = this;
};

WGPUCompilationInfo.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUCompilationInfo.prototype.constructor = WGPUCompilationInfo;
WGPUCompilationInfo.prototype.__class__ = WGPUCompilationInfo;
WGPUCompilationInfo.__cache__ = {};
Module['WGPUCompilationInfo'] = WGPUCompilationInfo;

WGPUCompilationInfo.prototype['GetMessageCount'] = WGPUCompilationInfo.prototype.GetMessageCount = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUCompilationInfo_GetMessageCount_0(self);
};

WGPUCompilationInfo.prototype['GetMessage'] = WGPUCompilationInfo.prototype.GetMessage = function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return wrapPointer(_emscripten_bind_WGPUCompilationInfo_GetMessage_1(self, index), WGPUCompilationMessage);
};

WGPUCompilationInfo.prototype['__destroy__'] = WGPUCompilationInfo.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUCompilationInfo___destroy___0(self);
};

function WGPUCompilationMessage() {
  this.ptr = _emscripten_bind_WGPUCompilationMessage_WGPUCompilationMessage_0();
  window.idl.getCache(WGPUCompilationMessage)[this.ptr] = this;
};

WGPUCompilationMessage.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUCompilationMessage.prototype.constructor = WGPUCompilationMessage;
WGPUCompilationMessage.prototype.__class__ = WGPUCompilationMessage;
WGPUCompilationMessage.__cache__ = {};
Module['WGPUCompilationMessage'] = WGPUCompilationMessage;

WGPUCompilationMessage.prototype['GetMessage'] = WGPUCompilationMessage.prototype.GetMessage = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUCompilationMessage_GetMessage_0(self), IDLString);
};

WGPUCompilationMessage.prototype['GetType'] = WGPUCompilationMessage.prototype.GetType = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUCompilationMessage_GetType_0(self);
};

WGPUCompilationMessage.prototype['GetLineNum'] = WGPUCompilationMessage.prototype.GetLineNum = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUCompilationMessage_GetLineNum_0(self);
};

WGPUCompilationMessage.prototype['GetLinePos'] = WGPUCompilationMessage.prototype.GetLinePos = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUCompilationMessage_GetLinePos_0(self);
};

WGPUCompilationMessage.prototype['GetOffset'] = WGPUCompilationMessage.prototype.GetOffset = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUCompilationMessage_GetOffset_0(self);
};

WGPUCompilationMessage.prototype['GetLength'] = WGPUCompilationMessage.prototype.GetLength = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUCompilationMessage_GetLength_0(self);
};

WGPUCompilationMessage.prototype['Obtain'] = WGPUCompilationMessage.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUCompilationMessage_Obtain_0(), WGPUCompilationMessage);
};

WGPUCompilationMessage.prototype['__destroy__'] = WGPUCompilationMessage.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUCompilationMessage___destroy___0(self);
};

function WGPUInstanceDescriptor() {
  this.ptr = _emscripten_bind_WGPUInstanceDescriptor_WGPUInstanceDescriptor_0();
  window.idl.getCache(WGPUInstanceDescriptor)[this.ptr] = this;
};

WGPUInstanceDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUInstanceDescriptor.prototype.constructor = WGPUInstanceDescriptor;
WGPUInstanceDescriptor.prototype.__class__ = WGPUInstanceDescriptor;
WGPUInstanceDescriptor.__cache__ = {};
Module['WGPUInstanceDescriptor'] = WGPUInstanceDescriptor;

WGPUInstanceDescriptor.prototype['SetNextInChain'] = WGPUInstanceDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUInstanceDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUInstanceDescriptor.prototype['Obtain'] = WGPUInstanceDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUInstanceDescriptor_Obtain_0(), WGPUInstanceDescriptor);
};

WGPUInstanceDescriptor.prototype['__destroy__'] = WGPUInstanceDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUInstanceDescriptor___destroy___0(self);
};

function WGPURenderBundleDescriptor() {
  this.ptr = _emscripten_bind_WGPURenderBundleDescriptor_WGPURenderBundleDescriptor_0();
  window.idl.getCache(WGPURenderBundleDescriptor)[this.ptr] = this;
};

WGPURenderBundleDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderBundleDescriptor.prototype.constructor = WGPURenderBundleDescriptor;
WGPURenderBundleDescriptor.prototype.__class__ = WGPURenderBundleDescriptor;
WGPURenderBundleDescriptor.__cache__ = {};
Module['WGPURenderBundleDescriptor'] = WGPURenderBundleDescriptor;

WGPURenderBundleDescriptor.prototype['SetLabel'] = WGPURenderBundleDescriptor.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPURenderBundleDescriptor_SetLabel_1(self, label);
};

WGPURenderBundleDescriptor.prototype['SetNextInChain'] = WGPURenderBundleDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPURenderBundleDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPURenderBundleDescriptor.prototype['Obtain'] = WGPURenderBundleDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPURenderBundleDescriptor_Obtain_0(), WGPURenderBundleDescriptor);
};

WGPURenderBundleDescriptor.prototype['__destroy__'] = WGPURenderBundleDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderBundleDescriptor___destroy___0(self);
};

function WGPURenderBundleEncoderDescriptor() {
  this.ptr = _emscripten_bind_WGPURenderBundleEncoderDescriptor_WGPURenderBundleEncoderDescriptor_0();
  window.idl.getCache(WGPURenderBundleEncoderDescriptor)[this.ptr] = this;
};

WGPURenderBundleEncoderDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderBundleEncoderDescriptor.prototype.constructor = WGPURenderBundleEncoderDescriptor;
WGPURenderBundleEncoderDescriptor.prototype.__class__ = WGPURenderBundleEncoderDescriptor;
WGPURenderBundleEncoderDescriptor.__cache__ = {};
Module['WGPURenderBundleEncoderDescriptor'] = WGPURenderBundleEncoderDescriptor;

WGPURenderBundleEncoderDescriptor.prototype['SetLabel'] = WGPURenderBundleEncoderDescriptor.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPURenderBundleEncoderDescriptor_SetLabel_1(self, label);
};

WGPURenderBundleEncoderDescriptor.prototype['SetNextInChain'] = WGPURenderBundleEncoderDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPURenderBundleEncoderDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPURenderBundleEncoderDescriptor.prototype['SetColorFormats'] = WGPURenderBundleEncoderDescriptor.prototype.SetColorFormats = function(colorFormats) {
  var self = this.ptr;
  if (colorFormats && typeof colorFormats === 'object') colorFormats = colorFormats.ptr;
  _emscripten_bind_WGPURenderBundleEncoderDescriptor_SetColorFormats_1(self, colorFormats);
};

WGPURenderBundleEncoderDescriptor.prototype['SetDepthStencilFormat'] = WGPURenderBundleEncoderDescriptor.prototype.SetDepthStencilFormat = function(depthStencilFormat) {
  var self = this.ptr;
  if (depthStencilFormat && typeof depthStencilFormat === 'object') depthStencilFormat = depthStencilFormat.ptr;
  _emscripten_bind_WGPURenderBundleEncoderDescriptor_SetDepthStencilFormat_1(self, depthStencilFormat);
};

WGPURenderBundleEncoderDescriptor.prototype['SetSampleCount'] = WGPURenderBundleEncoderDescriptor.prototype.SetSampleCount = function(sampleCount) {
  var self = this.ptr;
  if (sampleCount && typeof sampleCount === 'object') sampleCount = sampleCount.ptr;
  _emscripten_bind_WGPURenderBundleEncoderDescriptor_SetSampleCount_1(self, sampleCount);
};

WGPURenderBundleEncoderDescriptor.prototype['SetDepthReadOnly'] = WGPURenderBundleEncoderDescriptor.prototype.SetDepthReadOnly = function(depthReadOnly) {
  var self = this.ptr;
  if (depthReadOnly && typeof depthReadOnly === 'object') depthReadOnly = depthReadOnly.ptr;
  _emscripten_bind_WGPURenderBundleEncoderDescriptor_SetDepthReadOnly_1(self, depthReadOnly);
};

WGPURenderBundleEncoderDescriptor.prototype['SetStencilReadOnly'] = WGPURenderBundleEncoderDescriptor.prototype.SetStencilReadOnly = function(stencilReadOnly) {
  var self = this.ptr;
  if (stencilReadOnly && typeof stencilReadOnly === 'object') stencilReadOnly = stencilReadOnly.ptr;
  _emscripten_bind_WGPURenderBundleEncoderDescriptor_SetStencilReadOnly_1(self, stencilReadOnly);
};

WGPURenderBundleEncoderDescriptor.prototype['Obtain'] = WGPURenderBundleEncoderDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPURenderBundleEncoderDescriptor_Obtain_0(), WGPURenderBundleEncoderDescriptor);
};

WGPURenderBundleEncoderDescriptor.prototype['__destroy__'] = WGPURenderBundleEncoderDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderBundleEncoderDescriptor___destroy___0(self);
};

function WGPUQuerySetDescriptor() {
  this.ptr = _emscripten_bind_WGPUQuerySetDescriptor_WGPUQuerySetDescriptor_0();
  window.idl.getCache(WGPUQuerySetDescriptor)[this.ptr] = this;
};

WGPUQuerySetDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUQuerySetDescriptor.prototype.constructor = WGPUQuerySetDescriptor;
WGPUQuerySetDescriptor.prototype.__class__ = WGPUQuerySetDescriptor;
WGPUQuerySetDescriptor.__cache__ = {};
Module['WGPUQuerySetDescriptor'] = WGPUQuerySetDescriptor;

WGPUQuerySetDescriptor.prototype['SetLabel'] = WGPUQuerySetDescriptor.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUQuerySetDescriptor_SetLabel_1(self, label);
};

WGPUQuerySetDescriptor.prototype['SetNextInChain'] = WGPUQuerySetDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUQuerySetDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUQuerySetDescriptor.prototype['SetType'] = WGPUQuerySetDescriptor.prototype.SetType = function(type) {
  var self = this.ptr;
  if (type && typeof type === 'object') type = type.ptr;
  _emscripten_bind_WGPUQuerySetDescriptor_SetType_1(self, type);
};

WGPUQuerySetDescriptor.prototype['SetCount'] = WGPUQuerySetDescriptor.prototype.SetCount = function(count) {
  var self = this.ptr;
  if (count && typeof count === 'object') count = count.ptr;
  _emscripten_bind_WGPUQuerySetDescriptor_SetCount_1(self, count);
};

WGPUQuerySetDescriptor.prototype['Obtain'] = WGPUQuerySetDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUQuerySetDescriptor_Obtain_0(), WGPUQuerySetDescriptor);
};

WGPUQuerySetDescriptor.prototype['__destroy__'] = WGPUQuerySetDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUQuerySetDescriptor___destroy___0(self);
};

function WGPUSamplerDescriptor() {
  this.ptr = _emscripten_bind_WGPUSamplerDescriptor_WGPUSamplerDescriptor_0();
  window.idl.getCache(WGPUSamplerDescriptor)[this.ptr] = this;
};

WGPUSamplerDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUSamplerDescriptor.prototype.constructor = WGPUSamplerDescriptor;
WGPUSamplerDescriptor.prototype.__class__ = WGPUSamplerDescriptor;
WGPUSamplerDescriptor.__cache__ = {};
Module['WGPUSamplerDescriptor'] = WGPUSamplerDescriptor;

WGPUSamplerDescriptor.prototype['SetLabel'] = WGPUSamplerDescriptor.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUSamplerDescriptor_SetLabel_1(self, label);
};

WGPUSamplerDescriptor.prototype['SetNextInChain'] = WGPUSamplerDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUSamplerDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUSamplerDescriptor.prototype['SetAddressModeU'] = WGPUSamplerDescriptor.prototype.SetAddressModeU = function(addressModeU) {
  var self = this.ptr;
  if (addressModeU && typeof addressModeU === 'object') addressModeU = addressModeU.ptr;
  _emscripten_bind_WGPUSamplerDescriptor_SetAddressModeU_1(self, addressModeU);
};

WGPUSamplerDescriptor.prototype['SetAddressModeV'] = WGPUSamplerDescriptor.prototype.SetAddressModeV = function(addressModeV) {
  var self = this.ptr;
  if (addressModeV && typeof addressModeV === 'object') addressModeV = addressModeV.ptr;
  _emscripten_bind_WGPUSamplerDescriptor_SetAddressModeV_1(self, addressModeV);
};

WGPUSamplerDescriptor.prototype['SetAddressModeW'] = WGPUSamplerDescriptor.prototype.SetAddressModeW = function(addressModeW) {
  var self = this.ptr;
  if (addressModeW && typeof addressModeW === 'object') addressModeW = addressModeW.ptr;
  _emscripten_bind_WGPUSamplerDescriptor_SetAddressModeW_1(self, addressModeW);
};

WGPUSamplerDescriptor.prototype['SetMagFilter'] = WGPUSamplerDescriptor.prototype.SetMagFilter = function(magFilter) {
  var self = this.ptr;
  if (magFilter && typeof magFilter === 'object') magFilter = magFilter.ptr;
  _emscripten_bind_WGPUSamplerDescriptor_SetMagFilter_1(self, magFilter);
};

WGPUSamplerDescriptor.prototype['SetMinFilter'] = WGPUSamplerDescriptor.prototype.SetMinFilter = function(minFilter) {
  var self = this.ptr;
  if (minFilter && typeof minFilter === 'object') minFilter = minFilter.ptr;
  _emscripten_bind_WGPUSamplerDescriptor_SetMinFilter_1(self, minFilter);
};

WGPUSamplerDescriptor.prototype['SetMipmapFilter'] = WGPUSamplerDescriptor.prototype.SetMipmapFilter = function(mipmapFilter) {
  var self = this.ptr;
  if (mipmapFilter && typeof mipmapFilter === 'object') mipmapFilter = mipmapFilter.ptr;
  _emscripten_bind_WGPUSamplerDescriptor_SetMipmapFilter_1(self, mipmapFilter);
};

WGPUSamplerDescriptor.prototype['SetLodMinClamp'] = WGPUSamplerDescriptor.prototype.SetLodMinClamp = function(lodMinClamp) {
  var self = this.ptr;
  if (lodMinClamp && typeof lodMinClamp === 'object') lodMinClamp = lodMinClamp.ptr;
  _emscripten_bind_WGPUSamplerDescriptor_SetLodMinClamp_1(self, lodMinClamp);
};

WGPUSamplerDescriptor.prototype['SetLodMaxClamp'] = WGPUSamplerDescriptor.prototype.SetLodMaxClamp = function(lodMaxClamp) {
  var self = this.ptr;
  if (lodMaxClamp && typeof lodMaxClamp === 'object') lodMaxClamp = lodMaxClamp.ptr;
  _emscripten_bind_WGPUSamplerDescriptor_SetLodMaxClamp_1(self, lodMaxClamp);
};

WGPUSamplerDescriptor.prototype['SetCompare'] = WGPUSamplerDescriptor.prototype.SetCompare = function(compare) {
  var self = this.ptr;
  if (compare && typeof compare === 'object') compare = compare.ptr;
  _emscripten_bind_WGPUSamplerDescriptor_SetCompare_1(self, compare);
};

WGPUSamplerDescriptor.prototype['SetMaxAnisotropy'] = WGPUSamplerDescriptor.prototype.SetMaxAnisotropy = function(maxAnisotropy) {
  var self = this.ptr;
  if (maxAnisotropy && typeof maxAnisotropy === 'object') maxAnisotropy = maxAnisotropy.ptr;
  _emscripten_bind_WGPUSamplerDescriptor_SetMaxAnisotropy_1(self, maxAnisotropy);
};

WGPUSamplerDescriptor.prototype['Obtain'] = WGPUSamplerDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUSamplerDescriptor_Obtain_0(), WGPUSamplerDescriptor);
};

WGPUSamplerDescriptor.prototype['__destroy__'] = WGPUSamplerDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSamplerDescriptor___destroy___0(self);
};

function WGPUBindGroupLayoutDescriptor() {
  this.ptr = _emscripten_bind_WGPUBindGroupLayoutDescriptor_WGPUBindGroupLayoutDescriptor_0();
  window.idl.getCache(WGPUBindGroupLayoutDescriptor)[this.ptr] = this;
};

WGPUBindGroupLayoutDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBindGroupLayoutDescriptor.prototype.constructor = WGPUBindGroupLayoutDescriptor;
WGPUBindGroupLayoutDescriptor.prototype.__class__ = WGPUBindGroupLayoutDescriptor;
WGPUBindGroupLayoutDescriptor.__cache__ = {};
Module['WGPUBindGroupLayoutDescriptor'] = WGPUBindGroupLayoutDescriptor;

WGPUBindGroupLayoutDescriptor.prototype['SetLabel'] = WGPUBindGroupLayoutDescriptor.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUBindGroupLayoutDescriptor_SetLabel_1(self, label);
};

WGPUBindGroupLayoutDescriptor.prototype['SetNextInChain'] = WGPUBindGroupLayoutDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUBindGroupLayoutDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUBindGroupLayoutDescriptor.prototype['SetEntries'] = WGPUBindGroupLayoutDescriptor.prototype.SetEntries = function(entries) {
  var self = this.ptr;
  if (entries && typeof entries === 'object') entries = entries.ptr;
  _emscripten_bind_WGPUBindGroupLayoutDescriptor_SetEntries_1(self, entries);
};

WGPUBindGroupLayoutDescriptor.prototype['Obtain'] = WGPUBindGroupLayoutDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUBindGroupLayoutDescriptor_Obtain_0(), WGPUBindGroupLayoutDescriptor);
};

WGPUBindGroupLayoutDescriptor.prototype['__destroy__'] = WGPUBindGroupLayoutDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBindGroupLayoutDescriptor___destroy___0(self);
};

function WGPUProgrammableStageDescriptor() { throw "cannot construct a WGPUProgrammableStageDescriptor, no constructor in IDL" }
WGPUProgrammableStageDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUProgrammableStageDescriptor.prototype.constructor = WGPUProgrammableStageDescriptor;
WGPUProgrammableStageDescriptor.prototype.__class__ = WGPUProgrammableStageDescriptor;
WGPUProgrammableStageDescriptor.__cache__ = {};
Module['WGPUProgrammableStageDescriptor'] = WGPUProgrammableStageDescriptor;

WGPUProgrammableStageDescriptor.prototype['SetNextInChain'] = WGPUProgrammableStageDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUProgrammableStageDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUProgrammableStageDescriptor.prototype['SetModule'] = WGPUProgrammableStageDescriptor.prototype.SetModule = function(shaderModule) {
  var self = this.ptr;
  if (shaderModule && typeof shaderModule === 'object') shaderModule = shaderModule.ptr;
  _emscripten_bind_WGPUProgrammableStageDescriptor_SetModule_1(self, shaderModule);
};

WGPUProgrammableStageDescriptor.prototype['SetEntryPoint'] = WGPUProgrammableStageDescriptor.prototype.SetEntryPoint = function(entryPoint) {
  var self = this.ptr;
  ensureCache.prepare();
  if (entryPoint && typeof entryPoint === 'object') entryPoint = entryPoint.ptr;
  else entryPoint = ensureString(entryPoint);
  _emscripten_bind_WGPUProgrammableStageDescriptor_SetEntryPoint_1(self, entryPoint);
};

WGPUProgrammableStageDescriptor.prototype['SetConstants'] = WGPUProgrammableStageDescriptor.prototype.SetConstants = function(values) {
  var self = this.ptr;
  if (values && typeof values === 'object') values = values.ptr;
  _emscripten_bind_WGPUProgrammableStageDescriptor_SetConstants_1(self, values);
};

WGPUProgrammableStageDescriptor.prototype['__destroy__'] = WGPUProgrammableStageDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUProgrammableStageDescriptor___destroy___0(self);
};

function WGPUComputePipelineDescriptor() {
  this.ptr = _emscripten_bind_WGPUComputePipelineDescriptor_WGPUComputePipelineDescriptor_0();
  window.idl.getCache(WGPUComputePipelineDescriptor)[this.ptr] = this;
};

WGPUComputePipelineDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUComputePipelineDescriptor.prototype.constructor = WGPUComputePipelineDescriptor;
WGPUComputePipelineDescriptor.prototype.__class__ = WGPUComputePipelineDescriptor;
WGPUComputePipelineDescriptor.__cache__ = {};
Module['WGPUComputePipelineDescriptor'] = WGPUComputePipelineDescriptor;

WGPUComputePipelineDescriptor.prototype['SetLabel'] = WGPUComputePipelineDescriptor.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUComputePipelineDescriptor_SetLabel_1(self, label);
};

WGPUComputePipelineDescriptor.prototype['SetNextInChain'] = WGPUComputePipelineDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUComputePipelineDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUComputePipelineDescriptor.prototype['SetLayout'] = WGPUComputePipelineDescriptor.prototype.SetLayout = function(layout) {
  var self = this.ptr;
  if (layout && typeof layout === 'object') layout = layout.ptr;
  _emscripten_bind_WGPUComputePipelineDescriptor_SetLayout_1(self, layout);
};

WGPUComputePipelineDescriptor.prototype['GetCompute'] = WGPUComputePipelineDescriptor.prototype.GetCompute = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUComputePipelineDescriptor_GetCompute_0(self), WGPUProgrammableStageDescriptor);
};

WGPUComputePipelineDescriptor.prototype['Obtain'] = WGPUComputePipelineDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUComputePipelineDescriptor_Obtain_0(), WGPUComputePipelineDescriptor);
};

WGPUComputePipelineDescriptor.prototype['__destroy__'] = WGPUComputePipelineDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUComputePipelineDescriptor___destroy___0(self);
};

function WGPUQueueDescriptor() { throw "cannot construct a WGPUQueueDescriptor, no constructor in IDL" }
WGPUQueueDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUQueueDescriptor.prototype.constructor = WGPUQueueDescriptor;
WGPUQueueDescriptor.prototype.__class__ = WGPUQueueDescriptor;
WGPUQueueDescriptor.__cache__ = {};
Module['WGPUQueueDescriptor'] = WGPUQueueDescriptor;

WGPUQueueDescriptor.prototype['SetLabel'] = WGPUQueueDescriptor.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUQueueDescriptor_SetLabel_1(self, label);
};

WGPUQueueDescriptor.prototype['SetNextInChain'] = WGPUQueueDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUQueueDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUQueueDescriptor.prototype['__destroy__'] = WGPUQueueDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUQueueDescriptor___destroy___0(self);
};

function WGPUShaderModuleDescriptor() {
  this.ptr = _emscripten_bind_WGPUShaderModuleDescriptor_WGPUShaderModuleDescriptor_0();
  window.idl.getCache(WGPUShaderModuleDescriptor)[this.ptr] = this;
};

WGPUShaderModuleDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUShaderModuleDescriptor.prototype.constructor = WGPUShaderModuleDescriptor;
WGPUShaderModuleDescriptor.prototype.__class__ = WGPUShaderModuleDescriptor;
WGPUShaderModuleDescriptor.__cache__ = {};
Module['WGPUShaderModuleDescriptor'] = WGPUShaderModuleDescriptor;

WGPUShaderModuleDescriptor.prototype['SetLabel'] = WGPUShaderModuleDescriptor.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUShaderModuleDescriptor_SetLabel_1(self, value);
};

WGPUShaderModuleDescriptor.prototype['SetNextInChain'] = WGPUShaderModuleDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUShaderModuleDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUShaderModuleDescriptor.prototype['Obtain'] = WGPUShaderModuleDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUShaderModuleDescriptor_Obtain_0(), WGPUShaderModuleDescriptor);
};

WGPUShaderModuleDescriptor.prototype['__destroy__'] = WGPUShaderModuleDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUShaderModuleDescriptor___destroy___0(self);
};

function WGPUBindGroupDescriptor() {
  this.ptr = _emscripten_bind_WGPUBindGroupDescriptor_WGPUBindGroupDescriptor_0();
  window.idl.getCache(WGPUBindGroupDescriptor)[this.ptr] = this;
};

WGPUBindGroupDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBindGroupDescriptor.prototype.constructor = WGPUBindGroupDescriptor;
WGPUBindGroupDescriptor.prototype.__class__ = WGPUBindGroupDescriptor;
WGPUBindGroupDescriptor.__cache__ = {};
Module['WGPUBindGroupDescriptor'] = WGPUBindGroupDescriptor;

WGPUBindGroupDescriptor.prototype['SetLabel'] = WGPUBindGroupDescriptor.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUBindGroupDescriptor_SetLabel_1(self, value);
};

WGPUBindGroupDescriptor.prototype['SetNextInChain'] = WGPUBindGroupDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUBindGroupDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUBindGroupDescriptor.prototype['SetLayout'] = WGPUBindGroupDescriptor.prototype.SetLayout = function(layout) {
  var self = this.ptr;
  if (layout && typeof layout === 'object') layout = layout.ptr;
  _emscripten_bind_WGPUBindGroupDescriptor_SetLayout_1(self, layout);
};

WGPUBindGroupDescriptor.prototype['SetEntries'] = WGPUBindGroupDescriptor.prototype.SetEntries = function(entries) {
  var self = this.ptr;
  if (entries && typeof entries === 'object') entries = entries.ptr;
  _emscripten_bind_WGPUBindGroupDescriptor_SetEntries_1(self, entries);
};

WGPUBindGroupDescriptor.prototype['Obtain'] = WGPUBindGroupDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUBindGroupDescriptor_Obtain_0(), WGPUBindGroupDescriptor);
};

WGPUBindGroupDescriptor.prototype['__destroy__'] = WGPUBindGroupDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBindGroupDescriptor___destroy___0(self);
};

function WGPUBufferDescriptor() {
  this.ptr = _emscripten_bind_WGPUBufferDescriptor_WGPUBufferDescriptor_0();
  window.idl.getCache(WGPUBufferDescriptor)[this.ptr] = this;
};

WGPUBufferDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBufferDescriptor.prototype.constructor = WGPUBufferDescriptor;
WGPUBufferDescriptor.prototype.__class__ = WGPUBufferDescriptor;
WGPUBufferDescriptor.__cache__ = {};
Module['WGPUBufferDescriptor'] = WGPUBufferDescriptor;

WGPUBufferDescriptor.prototype['SetLabel'] = WGPUBufferDescriptor.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUBufferDescriptor_SetLabel_1(self, label);
};

WGPUBufferDescriptor.prototype['SetNextInChain'] = WGPUBufferDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUBufferDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUBufferDescriptor.prototype['SetUsage'] = WGPUBufferDescriptor.prototype.SetUsage = function(usage) {
  var self = this.ptr;
  if (usage && typeof usage === 'object') usage = usage.ptr;
  _emscripten_bind_WGPUBufferDescriptor_SetUsage_1(self, usage);
};

WGPUBufferDescriptor.prototype['SetSize'] = WGPUBufferDescriptor.prototype.SetSize = function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_WGPUBufferDescriptor_SetSize_1(self, size);
};

WGPUBufferDescriptor.prototype['SetMappedAtCreation'] = WGPUBufferDescriptor.prototype.SetMappedAtCreation = function(mappedAtCreation) {
  var self = this.ptr;
  if (mappedAtCreation && typeof mappedAtCreation === 'object') mappedAtCreation = mappedAtCreation.ptr;
  _emscripten_bind_WGPUBufferDescriptor_SetMappedAtCreation_1(self, mappedAtCreation);
};

WGPUBufferDescriptor.prototype['Obtain'] = WGPUBufferDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUBufferDescriptor_Obtain_0(), WGPUBufferDescriptor);
};

WGPUBufferDescriptor.prototype['__destroy__'] = WGPUBufferDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBufferDescriptor___destroy___0(self);
};

function WGPUPipelineLayoutDescriptor() {
  this.ptr = _emscripten_bind_WGPUPipelineLayoutDescriptor_WGPUPipelineLayoutDescriptor_0();
  window.idl.getCache(WGPUPipelineLayoutDescriptor)[this.ptr] = this;
};

WGPUPipelineLayoutDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUPipelineLayoutDescriptor.prototype.constructor = WGPUPipelineLayoutDescriptor;
WGPUPipelineLayoutDescriptor.prototype.__class__ = WGPUPipelineLayoutDescriptor;
WGPUPipelineLayoutDescriptor.__cache__ = {};
Module['WGPUPipelineLayoutDescriptor'] = WGPUPipelineLayoutDescriptor;

WGPUPipelineLayoutDescriptor.prototype['SetLabel'] = WGPUPipelineLayoutDescriptor.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUPipelineLayoutDescriptor_SetLabel_1(self, label);
};

WGPUPipelineLayoutDescriptor.prototype['SetNextInChain'] = WGPUPipelineLayoutDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUPipelineLayoutDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUPipelineLayoutDescriptor.prototype['SetBindGroupLayouts'] = WGPUPipelineLayoutDescriptor.prototype.SetBindGroupLayouts = function(bindGroupLayouts) {
  var self = this.ptr;
  if (bindGroupLayouts && typeof bindGroupLayouts === 'object') bindGroupLayouts = bindGroupLayouts.ptr;
  _emscripten_bind_WGPUPipelineLayoutDescriptor_SetBindGroupLayouts_1(self, bindGroupLayouts);
};

WGPUPipelineLayoutDescriptor.prototype['Obtain'] = WGPUPipelineLayoutDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUPipelineLayoutDescriptor_Obtain_0(), WGPUPipelineLayoutDescriptor);
};

WGPUPipelineLayoutDescriptor.prototype['__destroy__'] = WGPUPipelineLayoutDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUPipelineLayoutDescriptor___destroy___0(self);
};

function WGPUDeviceDescriptor() {
  this.ptr = _emscripten_bind_WGPUDeviceDescriptor_WGPUDeviceDescriptor_0();
  window.idl.getCache(WGPUDeviceDescriptor)[this.ptr] = this;
};

WGPUDeviceDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUDeviceDescriptor.prototype.constructor = WGPUDeviceDescriptor;
WGPUDeviceDescriptor.prototype.__class__ = WGPUDeviceDescriptor;
WGPUDeviceDescriptor.__cache__ = {};
Module['WGPUDeviceDescriptor'] = WGPUDeviceDescriptor;

WGPUDeviceDescriptor.prototype['SetLabel'] = WGPUDeviceDescriptor.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUDeviceDescriptor_SetLabel_1(self, label);
};

WGPUDeviceDescriptor.prototype['SetNextInChain'] = WGPUDeviceDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUDeviceDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUDeviceDescriptor.prototype['SetRequiredLimits'] = WGPUDeviceDescriptor.prototype.SetRequiredLimits = function(limits) {
  var self = this.ptr;
  if (limits && typeof limits === 'object') limits = limits.ptr;
  _emscripten_bind_WGPUDeviceDescriptor_SetRequiredLimits_1(self, limits);
};

WGPUDeviceDescriptor.prototype['SetRequiredFeatures'] = WGPUDeviceDescriptor.prototype.SetRequiredFeatures = function(features) {
  var self = this.ptr;
  if (features && typeof features === 'object') features = features.ptr;
  _emscripten_bind_WGPUDeviceDescriptor_SetRequiredFeatures_1(self, features);
};

WGPUDeviceDescriptor.prototype['GetDefaultQueue'] = WGPUDeviceDescriptor.prototype.GetDefaultQueue = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUDeviceDescriptor_GetDefaultQueue_0(self), WGPUQueueDescriptor);
};

WGPUDeviceDescriptor.prototype['Obtain'] = WGPUDeviceDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUDeviceDescriptor_Obtain_0(), WGPUDeviceDescriptor);
};

WGPUDeviceDescriptor.prototype['__destroy__'] = WGPUDeviceDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUDeviceDescriptor___destroy___0(self);
};

function WGPURenderPipelineDescriptor() {
  this.ptr = _emscripten_bind_WGPURenderPipelineDescriptor_WGPURenderPipelineDescriptor_0();
  window.idl.getCache(WGPURenderPipelineDescriptor)[this.ptr] = this;
};

WGPURenderPipelineDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderPipelineDescriptor.prototype.constructor = WGPURenderPipelineDescriptor;
WGPURenderPipelineDescriptor.prototype.__class__ = WGPURenderPipelineDescriptor;
WGPURenderPipelineDescriptor.__cache__ = {};
Module['WGPURenderPipelineDescriptor'] = WGPURenderPipelineDescriptor;

WGPURenderPipelineDescriptor.prototype['SetLabel'] = WGPURenderPipelineDescriptor.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPURenderPipelineDescriptor_SetLabel_1(self, value);
};

WGPURenderPipelineDescriptor.prototype['SetNextInChain'] = WGPURenderPipelineDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPURenderPipelineDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPURenderPipelineDescriptor.prototype['GetVertex'] = WGPURenderPipelineDescriptor.prototype.GetVertex = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPURenderPipelineDescriptor_GetVertex_0(self), WGPUVertexState);
};

WGPURenderPipelineDescriptor.prototype['GetPrimitive'] = WGPURenderPipelineDescriptor.prototype.GetPrimitive = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPURenderPipelineDescriptor_GetPrimitive_0(self), WGPUPrimitiveState);
};

WGPURenderPipelineDescriptor.prototype['SetFragment'] = WGPURenderPipelineDescriptor.prototype.SetFragment = function(fragmentState) {
  var self = this.ptr;
  if (fragmentState && typeof fragmentState === 'object') fragmentState = fragmentState.ptr;
  _emscripten_bind_WGPURenderPipelineDescriptor_SetFragment_1(self, fragmentState);
};

WGPURenderPipelineDescriptor.prototype['SetDepthStencil'] = WGPURenderPipelineDescriptor.prototype.SetDepthStencil = function(depthStencilState) {
  var self = this.ptr;
  if (depthStencilState && typeof depthStencilState === 'object') depthStencilState = depthStencilState.ptr;
  _emscripten_bind_WGPURenderPipelineDescriptor_SetDepthStencil_1(self, depthStencilState);
};

WGPURenderPipelineDescriptor.prototype['GetMultisample'] = WGPURenderPipelineDescriptor.prototype.GetMultisample = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPURenderPipelineDescriptor_GetMultisample_0(self), WGPUMultisampleState);
};

WGPURenderPipelineDescriptor.prototype['SetLayout'] = WGPURenderPipelineDescriptor.prototype.SetLayout = function(pipelineLayout) {
  var self = this.ptr;
  if (pipelineLayout && typeof pipelineLayout === 'object') pipelineLayout = pipelineLayout.ptr;
  _emscripten_bind_WGPURenderPipelineDescriptor_SetLayout_1(self, pipelineLayout);
};

WGPURenderPipelineDescriptor.prototype['Obtain'] = WGPURenderPipelineDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPURenderPipelineDescriptor_Obtain_0(), WGPURenderPipelineDescriptor);
};

WGPURenderPipelineDescriptor.prototype['__destroy__'] = WGPURenderPipelineDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPipelineDescriptor___destroy___0(self);
};

function WGPUCommandEncoderDescriptor() {
  this.ptr = _emscripten_bind_WGPUCommandEncoderDescriptor_WGPUCommandEncoderDescriptor_0();
  window.idl.getCache(WGPUCommandEncoderDescriptor)[this.ptr] = this;
};

WGPUCommandEncoderDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUCommandEncoderDescriptor.prototype.constructor = WGPUCommandEncoderDescriptor;
WGPUCommandEncoderDescriptor.prototype.__class__ = WGPUCommandEncoderDescriptor;
WGPUCommandEncoderDescriptor.__cache__ = {};
Module['WGPUCommandEncoderDescriptor'] = WGPUCommandEncoderDescriptor;

WGPUCommandEncoderDescriptor.prototype['SetLabel'] = WGPUCommandEncoderDescriptor.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUCommandEncoderDescriptor_SetLabel_1(self, value);
};

WGPUCommandEncoderDescriptor.prototype['SetNextInChain'] = WGPUCommandEncoderDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUCommandEncoderDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUCommandEncoderDescriptor.prototype['Obtain'] = WGPUCommandEncoderDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUCommandEncoderDescriptor_Obtain_0(), WGPUCommandEncoderDescriptor);
};

WGPUCommandEncoderDescriptor.prototype['__destroy__'] = WGPUCommandEncoderDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUCommandEncoderDescriptor___destroy___0(self);
};

function WGPURenderPassDescriptor() {
  this.ptr = _emscripten_bind_WGPURenderPassDescriptor_WGPURenderPassDescriptor_0();
  window.idl.getCache(WGPURenderPassDescriptor)[this.ptr] = this;
};

WGPURenderPassDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderPassDescriptor.prototype.constructor = WGPURenderPassDescriptor;
WGPURenderPassDescriptor.prototype.__class__ = WGPURenderPassDescriptor;
WGPURenderPassDescriptor.__cache__ = {};
Module['WGPURenderPassDescriptor'] = WGPURenderPassDescriptor;

WGPURenderPassDescriptor.prototype['SetLabel'] = WGPURenderPassDescriptor.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPURenderPassDescriptor_SetLabel_1(self, value);
};

WGPURenderPassDescriptor.prototype['Reset'] = WGPURenderPassDescriptor.prototype.Reset = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassDescriptor_Reset_0(self);
};

WGPURenderPassDescriptor.prototype['SetNextInChain'] = WGPURenderPassDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPURenderPassDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPURenderPassDescriptor.prototype['SetColorAttachments__0'] = WGPURenderPassDescriptor.prototype.SetColorAttachments__0 = function(colorAttachments) {
  var self = this.ptr;
  if (colorAttachments && typeof colorAttachments === 'object') colorAttachments = colorAttachments.ptr;
  _emscripten_bind_WGPURenderPassDescriptor_SetColorAttachments__0_1(self, colorAttachments);
};

WGPURenderPassDescriptor.prototype['SetColorAttachments__1'] = WGPURenderPassDescriptor.prototype.SetColorAttachments__1 = function(colorAttachment01) {
  var self = this.ptr;
  if (colorAttachment01 && typeof colorAttachment01 === 'object') colorAttachment01 = colorAttachment01.ptr;
  _emscripten_bind_WGPURenderPassDescriptor_SetColorAttachments__1_1(self, colorAttachment01);
};

WGPURenderPassDescriptor.prototype['SetColorAttachments__2'] = WGPURenderPassDescriptor.prototype.SetColorAttachments__2 = function(colorAttachment01, colorAttachment02) {
  var self = this.ptr;
  if (colorAttachment01 && typeof colorAttachment01 === 'object') colorAttachment01 = colorAttachment01.ptr;
  if (colorAttachment02 && typeof colorAttachment02 === 'object') colorAttachment02 = colorAttachment02.ptr;
  _emscripten_bind_WGPURenderPassDescriptor_SetColorAttachments__2_2(self, colorAttachment01, colorAttachment02);
};

WGPURenderPassDescriptor.prototype['SetColorAttachments__3'] = WGPURenderPassDescriptor.prototype.SetColorAttachments__3 = function(colorAttachment01, colorAttachment02, colorAttachment03) {
  var self = this.ptr;
  if (colorAttachment01 && typeof colorAttachment01 === 'object') colorAttachment01 = colorAttachment01.ptr;
  if (colorAttachment02 && typeof colorAttachment02 === 'object') colorAttachment02 = colorAttachment02.ptr;
  if (colorAttachment03 && typeof colorAttachment03 === 'object') colorAttachment03 = colorAttachment03.ptr;
  _emscripten_bind_WGPURenderPassDescriptor_SetColorAttachments__3_3(self, colorAttachment01, colorAttachment02, colorAttachment03);
};

WGPURenderPassDescriptor.prototype['SetColorAttachments__4'] = WGPURenderPassDescriptor.prototype.SetColorAttachments__4 = function(colorAttachment01, colorAttachment02, colorAttachment03, colorAttachment04) {
  var self = this.ptr;
  if (colorAttachment01 && typeof colorAttachment01 === 'object') colorAttachment01 = colorAttachment01.ptr;
  if (colorAttachment02 && typeof colorAttachment02 === 'object') colorAttachment02 = colorAttachment02.ptr;
  if (colorAttachment03 && typeof colorAttachment03 === 'object') colorAttachment03 = colorAttachment03.ptr;
  if (colorAttachment04 && typeof colorAttachment04 === 'object') colorAttachment04 = colorAttachment04.ptr;
  _emscripten_bind_WGPURenderPassDescriptor_SetColorAttachments__4_4(self, colorAttachment01, colorAttachment02, colorAttachment03, colorAttachment04);
};

WGPURenderPassDescriptor.prototype['SetDepthStencilAttachment'] = WGPURenderPassDescriptor.prototype.SetDepthStencilAttachment = function(attachment) {
  var self = this.ptr;
  if (attachment && typeof attachment === 'object') attachment = attachment.ptr;
  _emscripten_bind_WGPURenderPassDescriptor_SetDepthStencilAttachment_1(self, attachment);
};

WGPURenderPassDescriptor.prototype['SetOcclusionQuerySet'] = WGPURenderPassDescriptor.prototype.SetOcclusionQuerySet = function(occlusionQuerySet) {
  var self = this.ptr;
  if (occlusionQuerySet && typeof occlusionQuerySet === 'object') occlusionQuerySet = occlusionQuerySet.ptr;
  _emscripten_bind_WGPURenderPassDescriptor_SetOcclusionQuerySet_1(self, occlusionQuerySet);
};

WGPURenderPassDescriptor.prototype['SetTimestampWrites'] = WGPURenderPassDescriptor.prototype.SetTimestampWrites = function(timestampWrites) {
  var self = this.ptr;
  if (timestampWrites && typeof timestampWrites === 'object') timestampWrites = timestampWrites.ptr;
  _emscripten_bind_WGPURenderPassDescriptor_SetTimestampWrites_1(self, timestampWrites);
};

WGPURenderPassDescriptor.prototype['Obtain'] = WGPURenderPassDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPURenderPassDescriptor_Obtain_0(), WGPURenderPassDescriptor);
};

WGPURenderPassDescriptor.prototype['__destroy__'] = WGPURenderPassDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassDescriptor___destroy___0(self);
};

function WGPUCommandBufferDescriptor() {
  this.ptr = _emscripten_bind_WGPUCommandBufferDescriptor_WGPUCommandBufferDescriptor_0();
  window.idl.getCache(WGPUCommandBufferDescriptor)[this.ptr] = this;
};

WGPUCommandBufferDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUCommandBufferDescriptor.prototype.constructor = WGPUCommandBufferDescriptor;
WGPUCommandBufferDescriptor.prototype.__class__ = WGPUCommandBufferDescriptor;
WGPUCommandBufferDescriptor.__cache__ = {};
Module['WGPUCommandBufferDescriptor'] = WGPUCommandBufferDescriptor;

WGPUCommandBufferDescriptor.prototype['SetLabel'] = WGPUCommandBufferDescriptor.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUCommandBufferDescriptor_SetLabel_1(self, value);
};

WGPUCommandBufferDescriptor.prototype['SetNextInChain'] = WGPUCommandBufferDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUCommandBufferDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUCommandBufferDescriptor.prototype['Obtain'] = WGPUCommandBufferDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUCommandBufferDescriptor_Obtain_0(), WGPUCommandBufferDescriptor);
};

WGPUCommandBufferDescriptor.prototype['__destroy__'] = WGPUCommandBufferDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUCommandBufferDescriptor___destroy___0(self);
};

function WGPUComputePassDescriptor() {
  this.ptr = _emscripten_bind_WGPUComputePassDescriptor_WGPUComputePassDescriptor_0();
  window.idl.getCache(WGPUComputePassDescriptor)[this.ptr] = this;
};

WGPUComputePassDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUComputePassDescriptor.prototype.constructor = WGPUComputePassDescriptor;
WGPUComputePassDescriptor.prototype.__class__ = WGPUComputePassDescriptor;
WGPUComputePassDescriptor.__cache__ = {};
Module['WGPUComputePassDescriptor'] = WGPUComputePassDescriptor;

WGPUComputePassDescriptor.prototype['SetLabel'] = WGPUComputePassDescriptor.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUComputePassDescriptor_SetLabel_1(self, value);
};

WGPUComputePassDescriptor.prototype['SetNextInChain'] = WGPUComputePassDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUComputePassDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUComputePassDescriptor.prototype['SetTimestampWrites'] = WGPUComputePassDescriptor.prototype.SetTimestampWrites = function(timestampWrites) {
  var self = this.ptr;
  if (timestampWrites && typeof timestampWrites === 'object') timestampWrites = timestampWrites.ptr;
  _emscripten_bind_WGPUComputePassDescriptor_SetTimestampWrites_1(self, timestampWrites);
};

WGPUComputePassDescriptor.prototype['Obtain'] = WGPUComputePassDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUComputePassDescriptor_Obtain_0(), WGPUComputePassDescriptor);
};

WGPUComputePassDescriptor.prototype['__destroy__'] = WGPUComputePassDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUComputePassDescriptor___destroy___0(self);
};

function WGPUTextureDescriptor() {
  this.ptr = _emscripten_bind_WGPUTextureDescriptor_WGPUTextureDescriptor_0();
  window.idl.getCache(WGPUTextureDescriptor)[this.ptr] = this;
};

WGPUTextureDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUTextureDescriptor.prototype.constructor = WGPUTextureDescriptor;
WGPUTextureDescriptor.prototype.__class__ = WGPUTextureDescriptor;
WGPUTextureDescriptor.__cache__ = {};
Module['WGPUTextureDescriptor'] = WGPUTextureDescriptor;

WGPUTextureDescriptor.prototype['SetLabel'] = WGPUTextureDescriptor.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUTextureDescriptor_SetLabel_1(self, value);
};

WGPUTextureDescriptor.prototype['SetNextInChain'] = WGPUTextureDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUTextureDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUTextureDescriptor.prototype['SetUsage'] = WGPUTextureDescriptor.prototype.SetUsage = function(usage) {
  var self = this.ptr;
  if (usage && typeof usage === 'object') usage = usage.ptr;
  _emscripten_bind_WGPUTextureDescriptor_SetUsage_1(self, usage);
};

WGPUTextureDescriptor.prototype['SetDimension'] = WGPUTextureDescriptor.prototype.SetDimension = function(dimension) {
  var self = this.ptr;
  if (dimension && typeof dimension === 'object') dimension = dimension.ptr;
  _emscripten_bind_WGPUTextureDescriptor_SetDimension_1(self, dimension);
};

WGPUTextureDescriptor.prototype['GetSize'] = WGPUTextureDescriptor.prototype.GetSize = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUTextureDescriptor_GetSize_0(self), WGPUExtent3D);
};

WGPUTextureDescriptor.prototype['SetFormat'] = WGPUTextureDescriptor.prototype.SetFormat = function(format) {
  var self = this.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  _emscripten_bind_WGPUTextureDescriptor_SetFormat_1(self, format);
};

WGPUTextureDescriptor.prototype['SetMipLevelCount'] = WGPUTextureDescriptor.prototype.SetMipLevelCount = function(mipLevelCount) {
  var self = this.ptr;
  if (mipLevelCount && typeof mipLevelCount === 'object') mipLevelCount = mipLevelCount.ptr;
  _emscripten_bind_WGPUTextureDescriptor_SetMipLevelCount_1(self, mipLevelCount);
};

WGPUTextureDescriptor.prototype['SetSampleCount'] = WGPUTextureDescriptor.prototype.SetSampleCount = function(sampleCount) {
  var self = this.ptr;
  if (sampleCount && typeof sampleCount === 'object') sampleCount = sampleCount.ptr;
  _emscripten_bind_WGPUTextureDescriptor_SetSampleCount_1(self, sampleCount);
};

WGPUTextureDescriptor.prototype['SetViewFormats'] = WGPUTextureDescriptor.prototype.SetViewFormats = function(viewFormats) {
  var self = this.ptr;
  if (viewFormats && typeof viewFormats === 'object') viewFormats = viewFormats.ptr;
  _emscripten_bind_WGPUTextureDescriptor_SetViewFormats_1(self, viewFormats);
};

WGPUTextureDescriptor.prototype['Obtain'] = WGPUTextureDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUTextureDescriptor_Obtain_0(), WGPUTextureDescriptor);
};

WGPUTextureDescriptor.prototype['__destroy__'] = WGPUTextureDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUTextureDescriptor___destroy___0(self);
};

function WGPUTextureViewDescriptor() {
  this.ptr = _emscripten_bind_WGPUTextureViewDescriptor_WGPUTextureViewDescriptor_0();
  window.idl.getCache(WGPUTextureViewDescriptor)[this.ptr] = this;
};

WGPUTextureViewDescriptor.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUTextureViewDescriptor.prototype.constructor = WGPUTextureViewDescriptor;
WGPUTextureViewDescriptor.prototype.__class__ = WGPUTextureViewDescriptor;
WGPUTextureViewDescriptor.__cache__ = {};
Module['WGPUTextureViewDescriptor'] = WGPUTextureViewDescriptor;

WGPUTextureViewDescriptor.prototype['SetLabel'] = WGPUTextureViewDescriptor.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUTextureViewDescriptor_SetLabel_1(self, value);
};

WGPUTextureViewDescriptor.prototype['SetNextInChain'] = WGPUTextureViewDescriptor.prototype.SetNextInChain = function(chainedStruct) {
  var self = this.ptr;
  if (chainedStruct && typeof chainedStruct === 'object') chainedStruct = chainedStruct.ptr;
  _emscripten_bind_WGPUTextureViewDescriptor_SetNextInChain_1(self, chainedStruct);
};

WGPUTextureViewDescriptor.prototype['SetFormat'] = WGPUTextureViewDescriptor.prototype.SetFormat = function(format) {
  var self = this.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  _emscripten_bind_WGPUTextureViewDescriptor_SetFormat_1(self, format);
};

WGPUTextureViewDescriptor.prototype['SetDimension'] = WGPUTextureViewDescriptor.prototype.SetDimension = function(dimension) {
  var self = this.ptr;
  if (dimension && typeof dimension === 'object') dimension = dimension.ptr;
  _emscripten_bind_WGPUTextureViewDescriptor_SetDimension_1(self, dimension);
};

WGPUTextureViewDescriptor.prototype['SetBaseMipLevel'] = WGPUTextureViewDescriptor.prototype.SetBaseMipLevel = function(baseMipLevel) {
  var self = this.ptr;
  if (baseMipLevel && typeof baseMipLevel === 'object') baseMipLevel = baseMipLevel.ptr;
  _emscripten_bind_WGPUTextureViewDescriptor_SetBaseMipLevel_1(self, baseMipLevel);
};

WGPUTextureViewDescriptor.prototype['SetMipLevelCount'] = WGPUTextureViewDescriptor.prototype.SetMipLevelCount = function(mipLevelCount) {
  var self = this.ptr;
  if (mipLevelCount && typeof mipLevelCount === 'object') mipLevelCount = mipLevelCount.ptr;
  _emscripten_bind_WGPUTextureViewDescriptor_SetMipLevelCount_1(self, mipLevelCount);
};

WGPUTextureViewDescriptor.prototype['SetBaseArrayLayer'] = WGPUTextureViewDescriptor.prototype.SetBaseArrayLayer = function(baseArrayLayer) {
  var self = this.ptr;
  if (baseArrayLayer && typeof baseArrayLayer === 'object') baseArrayLayer = baseArrayLayer.ptr;
  _emscripten_bind_WGPUTextureViewDescriptor_SetBaseArrayLayer_1(self, baseArrayLayer);
};

WGPUTextureViewDescriptor.prototype['SetArrayLayerCount'] = WGPUTextureViewDescriptor.prototype.SetArrayLayerCount = function(arrayLayerCount) {
  var self = this.ptr;
  if (arrayLayerCount && typeof arrayLayerCount === 'object') arrayLayerCount = arrayLayerCount.ptr;
  _emscripten_bind_WGPUTextureViewDescriptor_SetArrayLayerCount_1(self, arrayLayerCount);
};

WGPUTextureViewDescriptor.prototype['SetAspect'] = WGPUTextureViewDescriptor.prototype.SetAspect = function(aspect) {
  var self = this.ptr;
  if (aspect && typeof aspect === 'object') aspect = aspect.ptr;
  _emscripten_bind_WGPUTextureViewDescriptor_SetAspect_1(self, aspect);
};

WGPUTextureViewDescriptor.prototype['SetUsage'] = WGPUTextureViewDescriptor.prototype.SetUsage = function(usage) {
  var self = this.ptr;
  if (usage && typeof usage === 'object') usage = usage.ptr;
  _emscripten_bind_WGPUTextureViewDescriptor_SetUsage_1(self, usage);
};

WGPUTextureViewDescriptor.prototype['Obtain'] = WGPUTextureViewDescriptor.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUTextureViewDescriptor_Obtain_0(), WGPUTextureViewDescriptor);
};

WGPUTextureViewDescriptor.prototype['__destroy__'] = WGPUTextureViewDescriptor.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUTextureViewDescriptor___destroy___0(self);
};

function WGPUSampler() {
  this.ptr = _emscripten_bind_WGPUSampler_WGPUSampler_0();
  window.idl.getCache(WGPUSampler)[this.ptr] = this;
};

WGPUSampler.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUSampler.prototype.constructor = WGPUSampler;
WGPUSampler.prototype.__class__ = WGPUSampler;
WGPUSampler.__cache__ = {};
Module['WGPUSampler'] = WGPUSampler;

WGPUSampler.prototype['SetLabel'] = WGPUSampler.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUSampler_SetLabel_1(self, label);
};

WGPUSampler.prototype['Release'] = WGPUSampler.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSampler_Release_0(self);
};

WGPUSampler.prototype['IsValid'] = WGPUSampler.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUSampler_IsValid_0(self));
};

WGPUSampler.prototype['__destroy__'] = WGPUSampler.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSampler___destroy___0(self);
};

function WGPURenderBundleEncoder() {
  this.ptr = _emscripten_bind_WGPURenderBundleEncoder_WGPURenderBundleEncoder_0();
  window.idl.getCache(WGPURenderBundleEncoder)[this.ptr] = this;
};

WGPURenderBundleEncoder.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderBundleEncoder.prototype.constructor = WGPURenderBundleEncoder;
WGPURenderBundleEncoder.prototype.__class__ = WGPURenderBundleEncoder;
WGPURenderBundleEncoder.__cache__ = {};
Module['WGPURenderBundleEncoder'] = WGPURenderBundleEncoder;

WGPURenderBundleEncoder.prototype['SetLabel'] = WGPURenderBundleEncoder.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPURenderBundleEncoder_SetLabel_1(self, label);
};

WGPURenderBundleEncoder.prototype['Release'] = WGPURenderBundleEncoder.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderBundleEncoder_Release_0(self);
};

WGPURenderBundleEncoder.prototype['SetPipeline'] = WGPURenderBundleEncoder.prototype.SetPipeline = function(renderPipeline) {
  var self = this.ptr;
  if (renderPipeline && typeof renderPipeline === 'object') renderPipeline = renderPipeline.ptr;
  _emscripten_bind_WGPURenderBundleEncoder_SetPipeline_1(self, renderPipeline);
};

WGPURenderBundleEncoder.prototype['Draw'] = WGPURenderBundleEncoder.prototype.Draw = function(vertexCount, instanceCount, firstVertex, firstInstance) {
  var self = this.ptr;
  if (vertexCount && typeof vertexCount === 'object') vertexCount = vertexCount.ptr;
  if (instanceCount && typeof instanceCount === 'object') instanceCount = instanceCount.ptr;
  if (firstVertex && typeof firstVertex === 'object') firstVertex = firstVertex.ptr;
  if (firstInstance && typeof firstInstance === 'object') firstInstance = firstInstance.ptr;
  _emscripten_bind_WGPURenderBundleEncoder_Draw_4(self, vertexCount, instanceCount, firstVertex, firstInstance);
};

WGPURenderBundleEncoder.prototype['DrawIndexed'] = WGPURenderBundleEncoder.prototype.DrawIndexed = function(indexCount, instanceCount, firstIndex, baseVertex, firstInstance) {
  var self = this.ptr;
  if (indexCount && typeof indexCount === 'object') indexCount = indexCount.ptr;
  if (instanceCount && typeof instanceCount === 'object') instanceCount = instanceCount.ptr;
  if (firstIndex && typeof firstIndex === 'object') firstIndex = firstIndex.ptr;
  if (baseVertex && typeof baseVertex === 'object') baseVertex = baseVertex.ptr;
  if (firstInstance && typeof firstInstance === 'object') firstInstance = firstInstance.ptr;
  _emscripten_bind_WGPURenderBundleEncoder_DrawIndexed_5(self, indexCount, instanceCount, firstIndex, baseVertex, firstInstance);
};

WGPURenderBundleEncoder.prototype['DrawIndirect'] = WGPURenderBundleEncoder.prototype.DrawIndirect = function(indirectBuffer, indirectOffset) {
  var self = this.ptr;
  if (indirectBuffer && typeof indirectBuffer === 'object') indirectBuffer = indirectBuffer.ptr;
  if (indirectOffset && typeof indirectOffset === 'object') indirectOffset = indirectOffset.ptr;
  _emscripten_bind_WGPURenderBundleEncoder_DrawIndirect_2(self, indirectBuffer, indirectOffset);
};

WGPURenderBundleEncoder.prototype['DrawIndexedIndirect'] = WGPURenderBundleEncoder.prototype.DrawIndexedIndirect = function(indirectBuffer, indirectOffset) {
  var self = this.ptr;
  if (indirectBuffer && typeof indirectBuffer === 'object') indirectBuffer = indirectBuffer.ptr;
  if (indirectOffset && typeof indirectOffset === 'object') indirectOffset = indirectOffset.ptr;
  _emscripten_bind_WGPURenderBundleEncoder_DrawIndexedIndirect_2(self, indirectBuffer, indirectOffset);
};

WGPURenderBundleEncoder.prototype['SetBindGroup'] = WGPURenderBundleEncoder.prototype.SetBindGroup = function(groupIndex, group, dynamicOffsets) {
  var self = this.ptr;
  if (groupIndex && typeof groupIndex === 'object') groupIndex = groupIndex.ptr;
  if (group && typeof group === 'object') group = group.ptr;
  if (dynamicOffsets && typeof dynamicOffsets === 'object') dynamicOffsets = dynamicOffsets.ptr;
  if (dynamicOffsets === undefined) { _emscripten_bind_WGPURenderBundleEncoder_SetBindGroup_2(self, groupIndex, group); return }
  _emscripten_bind_WGPURenderBundleEncoder_SetBindGroup_3(self, groupIndex, group, dynamicOffsets);
};

WGPURenderBundleEncoder.prototype['SetVertexBuffer'] = WGPURenderBundleEncoder.prototype.SetVertexBuffer = function(slot, buffer, offset, size) {
  var self = this.ptr;
  if (slot && typeof slot === 'object') slot = slot.ptr;
  if (buffer && typeof buffer === 'object') buffer = buffer.ptr;
  if (offset && typeof offset === 'object') offset = offset.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_WGPURenderBundleEncoder_SetVertexBuffer_4(self, slot, buffer, offset, size);
};

WGPURenderBundleEncoder.prototype['SetIndexBuffer'] = WGPURenderBundleEncoder.prototype.SetIndexBuffer = function(buffer, format, offset, size) {
  var self = this.ptr;
  if (buffer && typeof buffer === 'object') buffer = buffer.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  if (offset && typeof offset === 'object') offset = offset.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_WGPURenderBundleEncoder_SetIndexBuffer_4(self, buffer, format, offset, size);
};

WGPURenderBundleEncoder.prototype['InsertDebugMarker'] = WGPURenderBundleEncoder.prototype.InsertDebugMarker = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPURenderBundleEncoder_InsertDebugMarker_1(self, label);
};

WGPURenderBundleEncoder.prototype['PopDebugGroup'] = WGPURenderBundleEncoder.prototype.PopDebugGroup = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderBundleEncoder_PopDebugGroup_0(self);
};

WGPURenderBundleEncoder.prototype['PushDebugGroup'] = WGPURenderBundleEncoder.prototype.PushDebugGroup = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPURenderBundleEncoder_PushDebugGroup_1(self, label);
};

WGPURenderBundleEncoder.prototype['Finish'] = WGPURenderBundleEncoder.prototype.Finish = function(descriptor, bundleOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (bundleOut && typeof bundleOut === 'object') bundleOut = bundleOut.ptr;
  _emscripten_bind_WGPURenderBundleEncoder_Finish_2(self, descriptor, bundleOut);
};

WGPURenderBundleEncoder.prototype['IsValid'] = WGPURenderBundleEncoder.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPURenderBundleEncoder_IsValid_0(self));
};

WGPURenderBundleEncoder.prototype['__destroy__'] = WGPURenderBundleEncoder.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderBundleEncoder___destroy___0(self);
};

function WGPUTextureView() {
  this.ptr = _emscripten_bind_WGPUTextureView_WGPUTextureView_0();
  window.idl.getCache(WGPUTextureView)[this.ptr] = this;
};

WGPUTextureView.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUTextureView.prototype.constructor = WGPUTextureView;
WGPUTextureView.prototype.__class__ = WGPUTextureView;
WGPUTextureView.__cache__ = {};
Module['WGPUTextureView'] = WGPUTextureView;

WGPUTextureView.prototype['SetLabel'] = WGPUTextureView.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUTextureView_SetLabel_1(self, label);
};

WGPUTextureView.prototype['Release'] = WGPUTextureView.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUTextureView_Release_0(self);
};

WGPUTextureView.prototype['IsValid'] = WGPUTextureView.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUTextureView_IsValid_0(self));
};

WGPUTextureView.prototype['Obtain'] = WGPUTextureView.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUTextureView_Obtain_0(), WGPUTextureView);
};

WGPUTextureView.prototype['__destroy__'] = WGPUTextureView.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUTextureView___destroy___0(self);
};

function WGPUTexture() {
  this.ptr = _emscripten_bind_WGPUTexture_WGPUTexture_0();
  window.idl.getCache(WGPUTexture)[this.ptr] = this;
};

WGPUTexture.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUTexture.prototype.constructor = WGPUTexture;
WGPUTexture.prototype.__class__ = WGPUTexture;
WGPUTexture.__cache__ = {};
Module['WGPUTexture'] = WGPUTexture;

WGPUTexture.prototype['SetLabel'] = WGPUTexture.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUTexture_SetLabel_1(self, label);
};

WGPUTexture.prototype['CreateView'] = WGPUTexture.prototype.CreateView = function(textureViewDescriptor, textureView) {
  var self = this.ptr;
  if (textureViewDescriptor && typeof textureViewDescriptor === 'object') textureViewDescriptor = textureViewDescriptor.ptr;
  if (textureView && typeof textureView === 'object') textureView = textureView.ptr;
  _emscripten_bind_WGPUTexture_CreateView_2(self, textureViewDescriptor, textureView);
};

WGPUTexture.prototype['GetFormat'] = WGPUTexture.prototype.GetFormat = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUTexture_GetFormat_0(self);
};

WGPUTexture.prototype['Release'] = WGPUTexture.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUTexture_Release_0(self);
};

WGPUTexture.prototype['Destroy'] = WGPUTexture.prototype.Destroy = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUTexture_Destroy_0(self);
};

WGPUTexture.prototype['IsValid'] = WGPUTexture.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUTexture_IsValid_0(self));
};

WGPUTexture.prototype['Obtain'] = WGPUTexture.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUTexture_Obtain_0(), WGPUTexture);
};

WGPUTexture.prototype['__destroy__'] = WGPUTexture.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUTexture___destroy___0(self);
};

function WGPUShaderModule() {
  this.ptr = _emscripten_bind_WGPUShaderModule_WGPUShaderModule_0();
  window.idl.getCache(WGPUShaderModule)[this.ptr] = this;
};

WGPUShaderModule.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUShaderModule.prototype.constructor = WGPUShaderModule;
WGPUShaderModule.prototype.__class__ = WGPUShaderModule;
WGPUShaderModule.__cache__ = {};
Module['WGPUShaderModule'] = WGPUShaderModule;

WGPUShaderModule.prototype['SetLabel'] = WGPUShaderModule.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUShaderModule_SetLabel_1(self, label);
};

WGPUShaderModule.prototype['Release'] = WGPUShaderModule.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUShaderModule_Release_0(self);
};

WGPUShaderModule.prototype['IsValid'] = WGPUShaderModule.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUShaderModule_IsValid_0(self));
};

WGPUShaderModule.prototype['SetCallback'] = WGPUShaderModule.prototype.SetCallback = function(callbackMode, callback) {
  var self = this.ptr;
  if (callbackMode && typeof callbackMode === 'object') callbackMode = callbackMode.ptr;
  if (callback && typeof callback === 'object') callback = callback.ptr;
  _emscripten_bind_WGPUShaderModule_SetCallback_2(self, callbackMode, callback);
};

WGPUShaderModule.prototype['Obtain'] = WGPUShaderModule.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUShaderModule_Obtain_0(), WGPUShaderModule);
};

WGPUShaderModule.prototype['__destroy__'] = WGPUShaderModule.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUShaderModule___destroy___0(self);
};

function WGPURenderPipeline() {
  this.ptr = _emscripten_bind_WGPURenderPipeline_WGPURenderPipeline_0();
  window.idl.getCache(WGPURenderPipeline)[this.ptr] = this;
};

WGPURenderPipeline.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderPipeline.prototype.constructor = WGPURenderPipeline;
WGPURenderPipeline.prototype.__class__ = WGPURenderPipeline;
WGPURenderPipeline.__cache__ = {};
Module['WGPURenderPipeline'] = WGPURenderPipeline;

WGPURenderPipeline.prototype['SetLabel'] = WGPURenderPipeline.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPURenderPipeline_SetLabel_1(self, label);
};

WGPURenderPipeline.prototype['Release'] = WGPURenderPipeline.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPipeline_Release_0(self);
};

WGPURenderPipeline.prototype['IsValid'] = WGPURenderPipeline.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPURenderPipeline_IsValid_0(self));
};

WGPURenderPipeline.prototype['__destroy__'] = WGPURenderPipeline.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPipeline___destroy___0(self);
};

function WGPURenderPassEncoder() {
  this.ptr = _emscripten_bind_WGPURenderPassEncoder_WGPURenderPassEncoder_0();
  window.idl.getCache(WGPURenderPassEncoder)[this.ptr] = this;
};

WGPURenderPassEncoder.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderPassEncoder.prototype.constructor = WGPURenderPassEncoder;
WGPURenderPassEncoder.prototype.__class__ = WGPURenderPassEncoder;
WGPURenderPassEncoder.__cache__ = {};
Module['WGPURenderPassEncoder'] = WGPURenderPassEncoder;

WGPURenderPassEncoder.prototype['SetLabel'] = WGPURenderPassEncoder.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPURenderPassEncoder_SetLabel_1(self, value);
};

WGPURenderPassEncoder.prototype['AddRef'] = WGPURenderPassEncoder.prototype.AddRef = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassEncoder_AddRef_0(self);
};

WGPURenderPassEncoder.prototype['Release'] = WGPURenderPassEncoder.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassEncoder_Release_0(self);
};

WGPURenderPassEncoder.prototype['End'] = WGPURenderPassEncoder.prototype.End = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassEncoder_End_0(self);
};

WGPURenderPassEncoder.prototype['SetPipeline'] = WGPURenderPassEncoder.prototype.SetPipeline = function(renderPipeline) {
  var self = this.ptr;
  if (renderPipeline && typeof renderPipeline === 'object') renderPipeline = renderPipeline.ptr;
  _emscripten_bind_WGPURenderPassEncoder_SetPipeline_1(self, renderPipeline);
};

WGPURenderPassEncoder.prototype['BeginOcclusionQuery'] = WGPURenderPassEncoder.prototype.BeginOcclusionQuery = function(queryIndex) {
  var self = this.ptr;
  if (queryIndex && typeof queryIndex === 'object') queryIndex = queryIndex.ptr;
  _emscripten_bind_WGPURenderPassEncoder_BeginOcclusionQuery_1(self, queryIndex);
};

WGPURenderPassEncoder.prototype['Draw'] = WGPURenderPassEncoder.prototype.Draw = function(vertexCount, instanceCount, firstVertex, firstInstance) {
  var self = this.ptr;
  if (vertexCount && typeof vertexCount === 'object') vertexCount = vertexCount.ptr;
  if (instanceCount && typeof instanceCount === 'object') instanceCount = instanceCount.ptr;
  if (firstVertex && typeof firstVertex === 'object') firstVertex = firstVertex.ptr;
  if (firstInstance && typeof firstInstance === 'object') firstInstance = firstInstance.ptr;
  _emscripten_bind_WGPURenderPassEncoder_Draw_4(self, vertexCount, instanceCount, firstVertex, firstInstance);
};

WGPURenderPassEncoder.prototype['DrawIndexed'] = WGPURenderPassEncoder.prototype.DrawIndexed = function(indexCount, instanceCount, firstIndex, baseVertex, firstInstance) {
  var self = this.ptr;
  if (indexCount && typeof indexCount === 'object') indexCount = indexCount.ptr;
  if (instanceCount && typeof instanceCount === 'object') instanceCount = instanceCount.ptr;
  if (firstIndex && typeof firstIndex === 'object') firstIndex = firstIndex.ptr;
  if (baseVertex && typeof baseVertex === 'object') baseVertex = baseVertex.ptr;
  if (firstInstance && typeof firstInstance === 'object') firstInstance = firstInstance.ptr;
  _emscripten_bind_WGPURenderPassEncoder_DrawIndexed_5(self, indexCount, instanceCount, firstIndex, baseVertex, firstInstance);
};

WGPURenderPassEncoder.prototype['DrawIndexedIndirect'] = WGPURenderPassEncoder.prototype.DrawIndexedIndirect = function(indirectBuffer, indirectOffset) {
  var self = this.ptr;
  if (indirectBuffer && typeof indirectBuffer === 'object') indirectBuffer = indirectBuffer.ptr;
  if (indirectOffset && typeof indirectOffset === 'object') indirectOffset = indirectOffset.ptr;
  _emscripten_bind_WGPURenderPassEncoder_DrawIndexedIndirect_2(self, indirectBuffer, indirectOffset);
};

WGPURenderPassEncoder.prototype['DrawIndirect'] = WGPURenderPassEncoder.prototype.DrawIndirect = function(indirectBuffer, indirectOffset) {
  var self = this.ptr;
  if (indirectBuffer && typeof indirectBuffer === 'object') indirectBuffer = indirectBuffer.ptr;
  if (indirectOffset && typeof indirectOffset === 'object') indirectOffset = indirectOffset.ptr;
  _emscripten_bind_WGPURenderPassEncoder_DrawIndirect_2(self, indirectBuffer, indirectOffset);
};

WGPURenderPassEncoder.prototype['EndOcclusionQuery'] = WGPURenderPassEncoder.prototype.EndOcclusionQuery = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassEncoder_EndOcclusionQuery_0(self);
};

WGPURenderPassEncoder.prototype['ExecuteBundles'] = WGPURenderPassEncoder.prototype.ExecuteBundles = function(bundles) {
  var self = this.ptr;
  if (bundles && typeof bundles === 'object') bundles = bundles.ptr;
  _emscripten_bind_WGPURenderPassEncoder_ExecuteBundles_1(self, bundles);
};

WGPURenderPassEncoder.prototype['InsertDebugMarker'] = WGPURenderPassEncoder.prototype.InsertDebugMarker = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPURenderPassEncoder_InsertDebugMarker_1(self, value);
};

WGPURenderPassEncoder.prototype['PopDebugGroup'] = WGPURenderPassEncoder.prototype.PopDebugGroup = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassEncoder_PopDebugGroup_0(self);
};

WGPURenderPassEncoder.prototype['PushDebugGroup'] = WGPURenderPassEncoder.prototype.PushDebugGroup = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPURenderPassEncoder_PushDebugGroup_1(self, value);
};

WGPURenderPassEncoder.prototype['SetBindGroup'] = WGPURenderPassEncoder.prototype.SetBindGroup = function(groupIndex, group, dynamicOffsets) {
  var self = this.ptr;
  if (groupIndex && typeof groupIndex === 'object') groupIndex = groupIndex.ptr;
  if (group && typeof group === 'object') group = group.ptr;
  if (dynamicOffsets && typeof dynamicOffsets === 'object') dynamicOffsets = dynamicOffsets.ptr;
  if (dynamicOffsets === undefined) { _emscripten_bind_WGPURenderPassEncoder_SetBindGroup_2(self, groupIndex, group); return }
  _emscripten_bind_WGPURenderPassEncoder_SetBindGroup_3(self, groupIndex, group, dynamicOffsets);
};

WGPURenderPassEncoder.prototype['SetBlendConstant'] = WGPURenderPassEncoder.prototype.SetBlendConstant = function(color) {
  var self = this.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_WGPURenderPassEncoder_SetBlendConstant_1(self, color);
};

WGPURenderPassEncoder.prototype['SetIndexBuffer'] = WGPURenderPassEncoder.prototype.SetIndexBuffer = function(buffer, format, offset, size) {
  var self = this.ptr;
  if (buffer && typeof buffer === 'object') buffer = buffer.ptr;
  if (format && typeof format === 'object') format = format.ptr;
  if (offset && typeof offset === 'object') offset = offset.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_WGPURenderPassEncoder_SetIndexBuffer_4(self, buffer, format, offset, size);
};

WGPURenderPassEncoder.prototype['SetScissorRect'] = WGPURenderPassEncoder.prototype.SetScissorRect = function(x, y, width, height) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (width && typeof width === 'object') width = width.ptr;
  if (height && typeof height === 'object') height = height.ptr;
  _emscripten_bind_WGPURenderPassEncoder_SetScissorRect_4(self, x, y, width, height);
};

WGPURenderPassEncoder.prototype['SetStencilReference'] = WGPURenderPassEncoder.prototype.SetStencilReference = function(reference) {
  var self = this.ptr;
  if (reference && typeof reference === 'object') reference = reference.ptr;
  _emscripten_bind_WGPURenderPassEncoder_SetStencilReference_1(self, reference);
};

WGPURenderPassEncoder.prototype['SetVertexBuffer'] = WGPURenderPassEncoder.prototype.SetVertexBuffer = function(slot, buffer, offset, size) {
  var self = this.ptr;
  if (slot && typeof slot === 'object') slot = slot.ptr;
  if (buffer && typeof buffer === 'object') buffer = buffer.ptr;
  if (offset && typeof offset === 'object') offset = offset.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_WGPURenderPassEncoder_SetVertexBuffer_4(self, slot, buffer, offset, size);
};

WGPURenderPassEncoder.prototype['SetViewport'] = WGPURenderPassEncoder.prototype.SetViewport = function(x, y, width, height, minDepth, maxDepth) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (width && typeof width === 'object') width = width.ptr;
  if (height && typeof height === 'object') height = height.ptr;
  if (minDepth && typeof minDepth === 'object') minDepth = minDepth.ptr;
  if (maxDepth && typeof maxDepth === 'object') maxDepth = maxDepth.ptr;
  _emscripten_bind_WGPURenderPassEncoder_SetViewport_6(self, x, y, width, height, minDepth, maxDepth);
};

WGPURenderPassEncoder.prototype['IsValid'] = WGPURenderPassEncoder.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPURenderPassEncoder_IsValid_0(self));
};

WGPURenderPassEncoder.prototype['Obtain'] = WGPURenderPassEncoder.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPURenderPassEncoder_Obtain_0(), WGPURenderPassEncoder);
};

WGPURenderPassEncoder.prototype['__destroy__'] = WGPURenderPassEncoder.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderPassEncoder___destroy___0(self);
};

function WGPUQuerySet() {
  this.ptr = _emscripten_bind_WGPUQuerySet_WGPUQuerySet_0();
  window.idl.getCache(WGPUQuerySet)[this.ptr] = this;
};

WGPUQuerySet.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUQuerySet.prototype.constructor = WGPUQuerySet;
WGPUQuerySet.prototype.__class__ = WGPUQuerySet;
WGPUQuerySet.__cache__ = {};
Module['WGPUQuerySet'] = WGPUQuerySet;

WGPUQuerySet.prototype['SetLabel'] = WGPUQuerySet.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUQuerySet_SetLabel_1(self, value);
};

WGPUQuerySet.prototype['AddRef'] = WGPUQuerySet.prototype.AddRef = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUQuerySet_AddRef_0(self);
};

WGPUQuerySet.prototype['Release'] = WGPUQuerySet.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUQuerySet_Release_0(self);
};

WGPUQuerySet.prototype['Destroy'] = WGPUQuerySet.prototype.Destroy = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUQuerySet_Destroy_0(self);
};

WGPUQuerySet.prototype['GetCount'] = WGPUQuerySet.prototype.GetCount = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUQuerySet_GetCount_0(self);
};

WGPUQuerySet.prototype['GetType'] = WGPUQuerySet.prototype.GetType = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUQuerySet_GetType_0(self);
};

WGPUQuerySet.prototype['IsValid'] = WGPUQuerySet.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUQuerySet_IsValid_0(self));
};

WGPUQuerySet.prototype['__destroy__'] = WGPUQuerySet.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUQuerySet___destroy___0(self);
};

function WGPUPipelineLayout() {
  this.ptr = _emscripten_bind_WGPUPipelineLayout_WGPUPipelineLayout_0();
  window.idl.getCache(WGPUPipelineLayout)[this.ptr] = this;
};

WGPUPipelineLayout.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUPipelineLayout.prototype.constructor = WGPUPipelineLayout;
WGPUPipelineLayout.prototype.__class__ = WGPUPipelineLayout;
WGPUPipelineLayout.__cache__ = {};
Module['WGPUPipelineLayout'] = WGPUPipelineLayout;

WGPUPipelineLayout.prototype['SetLabel'] = WGPUPipelineLayout.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUPipelineLayout_SetLabel_1(self, value);
};

WGPUPipelineLayout.prototype['Release'] = WGPUPipelineLayout.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUPipelineLayout_Release_0(self);
};

WGPUPipelineLayout.prototype['IsValid'] = WGPUPipelineLayout.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUPipelineLayout_IsValid_0(self));
};

WGPUPipelineLayout.prototype['__destroy__'] = WGPUPipelineLayout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUPipelineLayout___destroy___0(self);
};

function WGPUComputePassEncoder() {
  this.ptr = _emscripten_bind_WGPUComputePassEncoder_WGPUComputePassEncoder_0();
  window.idl.getCache(WGPUComputePassEncoder)[this.ptr] = this;
};

WGPUComputePassEncoder.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUComputePassEncoder.prototype.constructor = WGPUComputePassEncoder;
WGPUComputePassEncoder.prototype.__class__ = WGPUComputePassEncoder;
WGPUComputePassEncoder.__cache__ = {};
Module['WGPUComputePassEncoder'] = WGPUComputePassEncoder;

WGPUComputePassEncoder.prototype['SetLabel'] = WGPUComputePassEncoder.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUComputePassEncoder_SetLabel_1(self, label);
};

WGPUComputePassEncoder.prototype['Release'] = WGPUComputePassEncoder.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUComputePassEncoder_Release_0(self);
};

WGPUComputePassEncoder.prototype['SetDispatchWorkgroups'] = WGPUComputePassEncoder.prototype.SetDispatchWorkgroups = function(workgroupCountX, workgroupCountY, workgroupCountZ) {
  var self = this.ptr;
  if (workgroupCountX && typeof workgroupCountX === 'object') workgroupCountX = workgroupCountX.ptr;
  if (workgroupCountY && typeof workgroupCountY === 'object') workgroupCountY = workgroupCountY.ptr;
  if (workgroupCountZ && typeof workgroupCountZ === 'object') workgroupCountZ = workgroupCountZ.ptr;
  _emscripten_bind_WGPUComputePassEncoder_SetDispatchWorkgroups_3(self, workgroupCountX, workgroupCountY, workgroupCountZ);
};

WGPUComputePassEncoder.prototype['DispatchWorkgroupsIndirect'] = WGPUComputePassEncoder.prototype.DispatchWorkgroupsIndirect = function(indirectBuffer, indirectOffset) {
  var self = this.ptr;
  if (indirectBuffer && typeof indirectBuffer === 'object') indirectBuffer = indirectBuffer.ptr;
  if (indirectOffset && typeof indirectOffset === 'object') indirectOffset = indirectOffset.ptr;
  _emscripten_bind_WGPUComputePassEncoder_DispatchWorkgroupsIndirect_2(self, indirectBuffer, indirectOffset);
};

WGPUComputePassEncoder.prototype['End'] = WGPUComputePassEncoder.prototype.End = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUComputePassEncoder_End_0(self);
};

WGPUComputePassEncoder.prototype['InsertDebugMarker'] = WGPUComputePassEncoder.prototype.InsertDebugMarker = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUComputePassEncoder_InsertDebugMarker_1(self, value);
};

WGPUComputePassEncoder.prototype['PopDebugGroup'] = WGPUComputePassEncoder.prototype.PopDebugGroup = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUComputePassEncoder_PopDebugGroup_0(self);
};

WGPUComputePassEncoder.prototype['PushDebugGroup'] = WGPUComputePassEncoder.prototype.PushDebugGroup = function(groupLabel) {
  var self = this.ptr;
  ensureCache.prepare();
  if (groupLabel && typeof groupLabel === 'object') groupLabel = groupLabel.ptr;
  else groupLabel = ensureString(groupLabel);
  _emscripten_bind_WGPUComputePassEncoder_PushDebugGroup_1(self, groupLabel);
};

WGPUComputePassEncoder.prototype['SetBindGroup'] = WGPUComputePassEncoder.prototype.SetBindGroup = function(groupIndex, group, offsets) {
  var self = this.ptr;
  if (groupIndex && typeof groupIndex === 'object') groupIndex = groupIndex.ptr;
  if (group && typeof group === 'object') group = group.ptr;
  if (offsets && typeof offsets === 'object') offsets = offsets.ptr;
  if (offsets === undefined) { _emscripten_bind_WGPUComputePassEncoder_SetBindGroup_2(self, groupIndex, group); return }
  _emscripten_bind_WGPUComputePassEncoder_SetBindGroup_3(self, groupIndex, group, offsets);
};

WGPUComputePassEncoder.prototype['SetPipeline'] = WGPUComputePassEncoder.prototype.SetPipeline = function(pipeline) {
  var self = this.ptr;
  if (pipeline && typeof pipeline === 'object') pipeline = pipeline.ptr;
  _emscripten_bind_WGPUComputePassEncoder_SetPipeline_1(self, pipeline);
};

WGPUComputePassEncoder.prototype['IsValid'] = WGPUComputePassEncoder.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUComputePassEncoder_IsValid_0(self));
};

WGPUComputePassEncoder.prototype['Obtain'] = WGPUComputePassEncoder.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUComputePassEncoder_Obtain_0(), WGPUComputePassEncoder);
};

WGPUComputePassEncoder.prototype['__destroy__'] = WGPUComputePassEncoder.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUComputePassEncoder___destroy___0(self);
};

function WGPUCommandBuffer() {
  this.ptr = _emscripten_bind_WGPUCommandBuffer_WGPUCommandBuffer_0();
  window.idl.getCache(WGPUCommandBuffer)[this.ptr] = this;
};

WGPUCommandBuffer.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUCommandBuffer.prototype.constructor = WGPUCommandBuffer;
WGPUCommandBuffer.prototype.__class__ = WGPUCommandBuffer;
WGPUCommandBuffer.__cache__ = {};
Module['WGPUCommandBuffer'] = WGPUCommandBuffer;

WGPUCommandBuffer.prototype['SetLabel'] = WGPUCommandBuffer.prototype.SetLabel = function(label) {
  var self = this.ptr;
  ensureCache.prepare();
  if (label && typeof label === 'object') label = label.ptr;
  else label = ensureString(label);
  _emscripten_bind_WGPUCommandBuffer_SetLabel_1(self, label);
};

WGPUCommandBuffer.prototype['Release'] = WGPUCommandBuffer.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUCommandBuffer_Release_0(self);
};

WGPUCommandBuffer.prototype['IsValid'] = WGPUCommandBuffer.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUCommandBuffer_IsValid_0(self));
};

WGPUCommandBuffer.prototype['Obtain'] = WGPUCommandBuffer.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUCommandBuffer_Obtain_0(), WGPUCommandBuffer);
};

WGPUCommandBuffer.prototype['__destroy__'] = WGPUCommandBuffer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUCommandBuffer___destroy___0(self);
};

function WGPUCommandEncoder() {
  this.ptr = _emscripten_bind_WGPUCommandEncoder_WGPUCommandEncoder_0();
  window.idl.getCache(WGPUCommandEncoder)[this.ptr] = this;
};

WGPUCommandEncoder.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUCommandEncoder.prototype.constructor = WGPUCommandEncoder;
WGPUCommandEncoder.prototype.__class__ = WGPUCommandEncoder;
WGPUCommandEncoder.__cache__ = {};
Module['WGPUCommandEncoder'] = WGPUCommandEncoder;

WGPUCommandEncoder.prototype['SetLabel'] = WGPUCommandEncoder.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUCommandEncoder_SetLabel_1(self, value);
};

WGPUCommandEncoder.prototype['Release'] = WGPUCommandEncoder.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUCommandEncoder_Release_0(self);
};

WGPUCommandEncoder.prototype['BeginComputePass'] = WGPUCommandEncoder.prototype.BeginComputePass = function(descriptor, computePassEncoder) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (computePassEncoder && typeof computePassEncoder === 'object') computePassEncoder = computePassEncoder.ptr;
  _emscripten_bind_WGPUCommandEncoder_BeginComputePass_2(self, descriptor, computePassEncoder);
};

WGPUCommandEncoder.prototype['BeginRenderPass'] = WGPUCommandEncoder.prototype.BeginRenderPass = function(renderPassDescriptor, renderPassEncoder) {
  var self = this.ptr;
  if (renderPassDescriptor && typeof renderPassDescriptor === 'object') renderPassDescriptor = renderPassDescriptor.ptr;
  if (renderPassEncoder && typeof renderPassEncoder === 'object') renderPassEncoder = renderPassEncoder.ptr;
  _emscripten_bind_WGPUCommandEncoder_BeginRenderPass_2(self, renderPassDescriptor, renderPassEncoder);
};

WGPUCommandEncoder.prototype['ClearBuffer'] = WGPUCommandEncoder.prototype.ClearBuffer = function(buffer, offset, size) {
  var self = this.ptr;
  if (buffer && typeof buffer === 'object') buffer = buffer.ptr;
  if (offset && typeof offset === 'object') offset = offset.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_WGPUCommandEncoder_ClearBuffer_3(self, buffer, offset, size);
};

WGPUCommandEncoder.prototype['CopyBufferToBuffer'] = WGPUCommandEncoder.prototype.CopyBufferToBuffer = function(source, sourceOffset, destination, destinationOffset, size) {
  var self = this.ptr;
  if (source && typeof source === 'object') source = source.ptr;
  if (sourceOffset && typeof sourceOffset === 'object') sourceOffset = sourceOffset.ptr;
  if (destination && typeof destination === 'object') destination = destination.ptr;
  if (destinationOffset && typeof destinationOffset === 'object') destinationOffset = destinationOffset.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_WGPUCommandEncoder_CopyBufferToBuffer_5(self, source, sourceOffset, destination, destinationOffset, size);
};

WGPUCommandEncoder.prototype['CopyBufferToTexture'] = WGPUCommandEncoder.prototype.CopyBufferToTexture = function(source, destination, copySize) {
  var self = this.ptr;
  if (source && typeof source === 'object') source = source.ptr;
  if (destination && typeof destination === 'object') destination = destination.ptr;
  if (copySize && typeof copySize === 'object') copySize = copySize.ptr;
  _emscripten_bind_WGPUCommandEncoder_CopyBufferToTexture_3(self, source, destination, copySize);
};

WGPUCommandEncoder.prototype['TextureToBuffer'] = WGPUCommandEncoder.prototype.TextureToBuffer = function(source, destination, copySize) {
  var self = this.ptr;
  if (source && typeof source === 'object') source = source.ptr;
  if (destination && typeof destination === 'object') destination = destination.ptr;
  if (copySize && typeof copySize === 'object') copySize = copySize.ptr;
  _emscripten_bind_WGPUCommandEncoder_TextureToBuffer_3(self, source, destination, copySize);
};

WGPUCommandEncoder.prototype['CopyTextureToTexture'] = WGPUCommandEncoder.prototype.CopyTextureToTexture = function(source, destination, copySize) {
  var self = this.ptr;
  if (source && typeof source === 'object') source = source.ptr;
  if (destination && typeof destination === 'object') destination = destination.ptr;
  if (copySize && typeof copySize === 'object') copySize = copySize.ptr;
  _emscripten_bind_WGPUCommandEncoder_CopyTextureToTexture_3(self, source, destination, copySize);
};

WGPUCommandEncoder.prototype['Finish'] = WGPUCommandEncoder.prototype.Finish = function(descriptor, commandBuffer) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (commandBuffer && typeof commandBuffer === 'object') commandBuffer = commandBuffer.ptr;
  _emscripten_bind_WGPUCommandEncoder_Finish_2(self, descriptor, commandBuffer);
};

WGPUCommandEncoder.prototype['InsertDebugMarker'] = WGPUCommandEncoder.prototype.InsertDebugMarker = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUCommandEncoder_InsertDebugMarker_1(self, value);
};

WGPUCommandEncoder.prototype['PopDebugGroup'] = WGPUCommandEncoder.prototype.PopDebugGroup = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUCommandEncoder_PopDebugGroup_0(self);
};

WGPUCommandEncoder.prototype['PushDebugGroup'] = WGPUCommandEncoder.prototype.PushDebugGroup = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUCommandEncoder_PushDebugGroup_1(self, value);
};

WGPUCommandEncoder.prototype['ResolveQuerySet'] = WGPUCommandEncoder.prototype.ResolveQuerySet = function(querySet, firstQuery, queryCount, destination, destinationOffset) {
  var self = this.ptr;
  if (querySet && typeof querySet === 'object') querySet = querySet.ptr;
  if (firstQuery && typeof firstQuery === 'object') firstQuery = firstQuery.ptr;
  if (queryCount && typeof queryCount === 'object') queryCount = queryCount.ptr;
  if (destination && typeof destination === 'object') destination = destination.ptr;
  if (destinationOffset && typeof destinationOffset === 'object') destinationOffset = destinationOffset.ptr;
  _emscripten_bind_WGPUCommandEncoder_ResolveQuerySet_5(self, querySet, firstQuery, queryCount, destination, destinationOffset);
};

WGPUCommandEncoder.prototype['WriteTimestamp'] = WGPUCommandEncoder.prototype.WriteTimestamp = function(querySet, queryIndex) {
  var self = this.ptr;
  if (querySet && typeof querySet === 'object') querySet = querySet.ptr;
  if (queryIndex && typeof queryIndex === 'object') queryIndex = queryIndex.ptr;
  _emscripten_bind_WGPUCommandEncoder_WriteTimestamp_2(self, querySet, queryIndex);
};

WGPUCommandEncoder.prototype['IsValid'] = WGPUCommandEncoder.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUCommandEncoder_IsValid_0(self));
};

WGPUCommandEncoder.prototype['Obtain'] = WGPUCommandEncoder.prototype.Obtain = function() {
  return wrapPointer(_emscripten_bind_WGPUCommandEncoder_Obtain_0(), WGPUCommandEncoder);
};

WGPUCommandEncoder.prototype['__destroy__'] = WGPUCommandEncoder.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUCommandEncoder___destroy___0(self);
};

function WGPUBuffer() {
  this.ptr = _emscripten_bind_WGPUBuffer_WGPUBuffer_0();
  window.idl.getCache(WGPUBuffer)[this.ptr] = this;
};

WGPUBuffer.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBuffer.prototype.constructor = WGPUBuffer;
WGPUBuffer.prototype.__class__ = WGPUBuffer;
WGPUBuffer.__cache__ = {};
Module['WGPUBuffer'] = WGPUBuffer;

WGPUBuffer.prototype['SetLabel'] = WGPUBuffer.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUBuffer_SetLabel_1(self, value);
};

WGPUBuffer.prototype['Get'] = WGPUBuffer.prototype.Get = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUBuffer_Get_0(self);
};

WGPUBuffer.prototype['Release'] = WGPUBuffer.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBuffer_Release_0(self);
};

WGPUBuffer.prototype['Destroy'] = WGPUBuffer.prototype.Destroy = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBuffer_Destroy_0(self);
};

WGPUBuffer.prototype['MapAsync'] = WGPUBuffer.prototype.MapAsync = function(mode, offset, size, callbackMode, callback) {
  var self = this.ptr;
  if (mode && typeof mode === 'object') mode = mode.ptr;
  if (offset && typeof offset === 'object') offset = offset.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  if (callbackMode && typeof callbackMode === 'object') callbackMode = callbackMode.ptr;
  if (callback && typeof callback === 'object') callback = callback.ptr;
  return wrapPointer(_emscripten_bind_WGPUBuffer_MapAsync_5(self, mode, offset, size, callbackMode, callback), WGPUFuture);
};

WGPUBuffer.prototype['GetConstMappedRange'] = WGPUBuffer.prototype.GetConstMappedRange = function(offset, size, bytes) {
  var self = this.ptr;
  ensureCache.prepare();
  if (offset && typeof offset === 'object') offset = offset.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  if (typeof bytes == 'object') { bytes = ensureInt8(bytes); }
  _emscripten_bind_WGPUBuffer_GetConstMappedRange_3(self, offset, size, bytes);
};

WGPUBuffer.prototype['GetMappedRange'] = WGPUBuffer.prototype.GetMappedRange = function(offset, size) {
  var self = this.ptr;
  if (offset && typeof offset === 'object') offset = offset.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  return wrapPointer(_emscripten_bind_WGPUBuffer_GetMappedRange_2(self, offset, size), WGPUByteBuffer);
};

WGPUBuffer.prototype['Unmap'] = WGPUBuffer.prototype.Unmap = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBuffer_Unmap_0(self);
};

WGPUBuffer.prototype['GetSize'] = WGPUBuffer.prototype.GetSize = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUBuffer_GetSize_0(self);
};

WGPUBuffer.prototype['GetUsage'] = WGPUBuffer.prototype.GetUsage = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUBuffer_GetUsage_0(self);
};

WGPUBuffer.prototype['IsValid'] = WGPUBuffer.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUBuffer_IsValid_0(self));
};

WGPUBuffer.prototype['__destroy__'] = WGPUBuffer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBuffer___destroy___0(self);
};

function WGPUBindGroup() {
  this.ptr = _emscripten_bind_WGPUBindGroup_WGPUBindGroup_0();
  window.idl.getCache(WGPUBindGroup)[this.ptr] = this;
};

WGPUBindGroup.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBindGroup.prototype.constructor = WGPUBindGroup;
WGPUBindGroup.prototype.__class__ = WGPUBindGroup;
WGPUBindGroup.__cache__ = {};
Module['WGPUBindGroup'] = WGPUBindGroup;

WGPUBindGroup.prototype['SetLabel'] = WGPUBindGroup.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUBindGroup_SetLabel_1(self, value);
};

WGPUBindGroup.prototype['Release'] = WGPUBindGroup.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBindGroup_Release_0(self);
};

WGPUBindGroup.prototype['IsValid'] = WGPUBindGroup.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUBindGroup_IsValid_0(self));
};

WGPUBindGroup.prototype['__destroy__'] = WGPUBindGroup.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBindGroup___destroy___0(self);
};

function WGPUBindGroupLayout() {
  this.ptr = _emscripten_bind_WGPUBindGroupLayout_WGPUBindGroupLayout_0();
  window.idl.getCache(WGPUBindGroupLayout)[this.ptr] = this;
};

WGPUBindGroupLayout.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUBindGroupLayout.prototype.constructor = WGPUBindGroupLayout;
WGPUBindGroupLayout.prototype.__class__ = WGPUBindGroupLayout;
WGPUBindGroupLayout.__cache__ = {};
Module['WGPUBindGroupLayout'] = WGPUBindGroupLayout;

WGPUBindGroupLayout.prototype['SetLabel'] = WGPUBindGroupLayout.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUBindGroupLayout_SetLabel_1(self, value);
};

WGPUBindGroupLayout.prototype['Release'] = WGPUBindGroupLayout.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBindGroupLayout_Release_0(self);
};

WGPUBindGroupLayout.prototype['IsValid'] = WGPUBindGroupLayout.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUBindGroupLayout_IsValid_0(self));
};

WGPUBindGroupLayout.prototype['__destroy__'] = WGPUBindGroupLayout.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUBindGroupLayout___destroy___0(self);
};

function WGPUComputePipeline() {
  this.ptr = _emscripten_bind_WGPUComputePipeline_WGPUComputePipeline_0();
  window.idl.getCache(WGPUComputePipeline)[this.ptr] = this;
};

WGPUComputePipeline.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUComputePipeline.prototype.constructor = WGPUComputePipeline;
WGPUComputePipeline.prototype.__class__ = WGPUComputePipeline;
WGPUComputePipeline.__cache__ = {};
Module['WGPUComputePipeline'] = WGPUComputePipeline;

WGPUComputePipeline.prototype['SetLabel'] = WGPUComputePipeline.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUComputePipeline_SetLabel_1(self, value);
};

WGPUComputePipeline.prototype['Release'] = WGPUComputePipeline.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUComputePipeline_Release_0(self);
};

WGPUComputePipeline.prototype['GetBindGroupLayout'] = WGPUComputePipeline.prototype.GetBindGroupLayout = function(groupIndex) {
  var self = this.ptr;
  if (groupIndex && typeof groupIndex === 'object') groupIndex = groupIndex.ptr;
  return wrapPointer(_emscripten_bind_WGPUComputePipeline_GetBindGroupLayout_1(self, groupIndex), WGPUBindGroupLayout);
};

WGPUComputePipeline.prototype['IsValid'] = WGPUComputePipeline.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUComputePipeline_IsValid_0(self));
};

WGPUComputePipeline.prototype['__destroy__'] = WGPUComputePipeline.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUComputePipeline___destroy___0(self);
};

function WGPURenderBundle() {
  this.ptr = _emscripten_bind_WGPURenderBundle_WGPURenderBundle_0();
  window.idl.getCache(WGPURenderBundle)[this.ptr] = this;
};

WGPURenderBundle.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPURenderBundle.prototype.constructor = WGPURenderBundle;
WGPURenderBundle.prototype.__class__ = WGPURenderBundle;
WGPURenderBundle.__cache__ = {};
Module['WGPURenderBundle'] = WGPURenderBundle;

WGPURenderBundle.prototype['SetLabel'] = WGPURenderBundle.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPURenderBundle_SetLabel_1(self, value);
};

WGPURenderBundle.prototype['Release'] = WGPURenderBundle.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderBundle_Release_0(self);
};

WGPURenderBundle.prototype['IsValid'] = WGPURenderBundle.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPURenderBundle_IsValid_0(self));
};

WGPURenderBundle.prototype['__destroy__'] = WGPURenderBundle.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPURenderBundle___destroy___0(self);
};

function WGPUSurface() { throw "cannot construct a WGPUSurface, no constructor in IDL" }
WGPUSurface.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUSurface.prototype.constructor = WGPUSurface;
WGPUSurface.prototype.__class__ = WGPUSurface;
WGPUSurface.__cache__ = {};
Module['WGPUSurface'] = WGPUSurface;

WGPUSurface.prototype['SetLabel'] = WGPUSurface.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUSurface_SetLabel_1(self, value);
};

WGPUSurface.prototype['Unconfigure'] = WGPUSurface.prototype.Unconfigure = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSurface_Unconfigure_0(self);
};

WGPUSurface.prototype['Release'] = WGPUSurface.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSurface_Release_0(self);
};

WGPUSurface.prototype['Configure'] = WGPUSurface.prototype.Configure = function(config) {
  var self = this.ptr;
  if (config && typeof config === 'object') config = config.ptr;
  _emscripten_bind_WGPUSurface_Configure_1(self, config);
};

WGPUSurface.prototype['GetCapabilities'] = WGPUSurface.prototype.GetCapabilities = function(adapter, surfaceCapabilities) {
  var self = this.ptr;
  if (adapter && typeof adapter === 'object') adapter = adapter.ptr;
  if (surfaceCapabilities && typeof surfaceCapabilities === 'object') surfaceCapabilities = surfaceCapabilities.ptr;
  _emscripten_bind_WGPUSurface_GetCapabilities_2(self, adapter, surfaceCapabilities);
};

WGPUSurface.prototype['GetCurrentTexture'] = WGPUSurface.prototype.GetCurrentTexture = function(surfaceTexture) {
  var self = this.ptr;
  if (surfaceTexture && typeof surfaceTexture === 'object') surfaceTexture = surfaceTexture.ptr;
  _emscripten_bind_WGPUSurface_GetCurrentTexture_1(self, surfaceTexture);
};

WGPUSurface.prototype['Present'] = WGPUSurface.prototype.Present = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSurface_Present_0(self);
};

WGPUSurface.prototype['__destroy__'] = WGPUSurface.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUSurface___destroy___0(self);
};

function WGPUQueue() { throw "cannot construct a WGPUQueue, no constructor in IDL" }
WGPUQueue.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUQueue.prototype.constructor = WGPUQueue;
WGPUQueue.prototype.__class__ = WGPUQueue;
WGPUQueue.__cache__ = {};
Module['WGPUQueue'] = WGPUQueue;

WGPUQueue.prototype['Get'] = WGPUQueue.prototype.Get = function() {
  var self = this.ptr;
  return _emscripten_bind_WGPUQueue_Get_0(self);
};

WGPUQueue.prototype['SetLabel'] = WGPUQueue.prototype.SetLabel = function(value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  _emscripten_bind_WGPUQueue_SetLabel_1(self, value);
};

WGPUQueue.prototype['Submit__0'] = WGPUQueue.prototype.Submit__0 = function(commandVector) {
  var self = this.ptr;
  if (commandVector && typeof commandVector === 'object') commandVector = commandVector.ptr;
  _emscripten_bind_WGPUQueue_Submit__0_1(self, commandVector);
};

WGPUQueue.prototype['Submit__1'] = WGPUQueue.prototype.Submit__1 = function(commandBuffer) {
  var self = this.ptr;
  if (commandBuffer && typeof commandBuffer === 'object') commandBuffer = commandBuffer.ptr;
  _emscripten_bind_WGPUQueue_Submit__1_1(self, commandBuffer);
};

WGPUQueue.prototype['Submit__2'] = WGPUQueue.prototype.Submit__2 = function(commandBuffer01, commandBuffer02) {
  var self = this.ptr;
  if (commandBuffer01 && typeof commandBuffer01 === 'object') commandBuffer01 = commandBuffer01.ptr;
  if (commandBuffer02 && typeof commandBuffer02 === 'object') commandBuffer02 = commandBuffer02.ptr;
  _emscripten_bind_WGPUQueue_Submit__2_2(self, commandBuffer01, commandBuffer02);
};

WGPUQueue.prototype['Submit__3'] = WGPUQueue.prototype.Submit__3 = function(commandBuffer01, commandBuffer02, commandBuffer03) {
  var self = this.ptr;
  if (commandBuffer01 && typeof commandBuffer01 === 'object') commandBuffer01 = commandBuffer01.ptr;
  if (commandBuffer02 && typeof commandBuffer02 === 'object') commandBuffer02 = commandBuffer02.ptr;
  if (commandBuffer03 && typeof commandBuffer03 === 'object') commandBuffer03 = commandBuffer03.ptr;
  _emscripten_bind_WGPUQueue_Submit__3_3(self, commandBuffer01, commandBuffer02, commandBuffer03);
};

WGPUQueue.prototype['Submit__4'] = WGPUQueue.prototype.Submit__4 = function(commandBuffer01, commandBuffer02, commandBuffer03, commandBuffer04) {
  var self = this.ptr;
  if (commandBuffer01 && typeof commandBuffer01 === 'object') commandBuffer01 = commandBuffer01.ptr;
  if (commandBuffer02 && typeof commandBuffer02 === 'object') commandBuffer02 = commandBuffer02.ptr;
  if (commandBuffer03 && typeof commandBuffer03 === 'object') commandBuffer03 = commandBuffer03.ptr;
  if (commandBuffer04 && typeof commandBuffer04 === 'object') commandBuffer04 = commandBuffer04.ptr;
  _emscripten_bind_WGPUQueue_Submit__4_4(self, commandBuffer01, commandBuffer02, commandBuffer03, commandBuffer04);
};

WGPUQueue.prototype['Release'] = WGPUQueue.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUQueue_Release_0(self);
};

WGPUQueue.prototype['WriteBuffer__0'] = WGPUQueue.prototype.WriteBuffer__0 = function(buffer, bufferOffset, bytes, dataSize) {
  var self = this.ptr;
  ensureCache.prepare();
  if (buffer && typeof buffer === 'object') buffer = buffer.ptr;
  if (bufferOffset && typeof bufferOffset === 'object') bufferOffset = bufferOffset.ptr;
  if (typeof bytes == 'object') { bytes = ensureInt8(bytes); }
  if (dataSize && typeof dataSize === 'object') dataSize = dataSize.ptr;
  _emscripten_bind_WGPUQueue_WriteBuffer__0_4(self, buffer, bufferOffset, bytes, dataSize);
};

WGPUQueue.prototype['WriteBuffer__1'] = WGPUQueue.prototype.WriteBuffer__1 = function(buffer, bufferOffset, bytes, dataSize) {
  var self = this.ptr;
  if (buffer && typeof buffer === 'object') buffer = buffer.ptr;
  if (bufferOffset && typeof bufferOffset === 'object') bufferOffset = bufferOffset.ptr;
  if (bytes && typeof bytes === 'object') bytes = bytes.ptr;
  if (dataSize && typeof dataSize === 'object') dataSize = dataSize.ptr;
  _emscripten_bind_WGPUQueue_WriteBuffer__1_4(self, buffer, bufferOffset, bytes, dataSize);
};

WGPUQueue.prototype['WriteTexture__1'] = WGPUQueue.prototype.WriteTexture__1 = function(destination, bytes, dataSize, dataLayout, writeSize) {
  var self = this.ptr;
  ensureCache.prepare();
  if (destination && typeof destination === 'object') destination = destination.ptr;
  if (typeof bytes == 'object') { bytes = ensureInt8(bytes); }
  if (dataSize && typeof dataSize === 'object') dataSize = dataSize.ptr;
  if (dataLayout && typeof dataLayout === 'object') dataLayout = dataLayout.ptr;
  if (writeSize && typeof writeSize === 'object') writeSize = writeSize.ptr;
  _emscripten_bind_WGPUQueue_WriteTexture__1_5(self, destination, bytes, dataSize, dataLayout, writeSize);
};

WGPUQueue.prototype['__destroy__'] = WGPUQueue.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUQueue___destroy___0(self);
};

function WGPUInstance() { throw "cannot construct a WGPUInstance, no constructor in IDL" }
WGPUInstance.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUInstance.prototype.constructor = WGPUInstance;
WGPUInstance.prototype.__class__ = WGPUInstance;
WGPUInstance.__cache__ = {};
Module['WGPUInstance'] = WGPUInstance;

WGPUInstance.prototype['IsValid'] = WGPUInstance.prototype.IsValid = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WGPUInstance_IsValid_0(self));
};

WGPUInstance.prototype['Release'] = WGPUInstance.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUInstance_Release_0(self);
};

WGPUInstance.prototype['RequestAdapter'] = WGPUInstance.prototype.RequestAdapter = function(options, mode, callback) {
  var self = this.ptr;
  if (options && typeof options === 'object') options = options.ptr;
  if (mode && typeof mode === 'object') mode = mode.ptr;
  if (callback && typeof callback === 'object') callback = callback.ptr;
  _emscripten_bind_WGPUInstance_RequestAdapter_3(self, options, mode, callback);
};

WGPUInstance.prototype['CreateWebSurface'] = WGPUInstance.prototype.CreateWebSurface = function(canvas) {
  var self = this.ptr;
  ensureCache.prepare();
  if (canvas && typeof canvas === 'object') canvas = canvas.ptr;
  else canvas = ensureString(canvas);
  return wrapPointer(_emscripten_bind_WGPUInstance_CreateWebSurface_1(self, canvas), WGPUSurface);
};

WGPUInstance.prototype['CreateWindowsSurface'] = WGPUInstance.prototype.CreateWindowsSurface = function(hwnd) {
  var self = this.ptr;
  if (hwnd && typeof hwnd === 'object') hwnd = hwnd.ptr;
  return wrapPointer(_emscripten_bind_WGPUInstance_CreateWindowsSurface_1(self, hwnd), WGPUSurface);
};

WGPUInstance.prototype['CreateLinuxSurface'] = WGPUInstance.prototype.CreateLinuxSurface = function(isWayland, windowOrSurface, display) {
  var self = this.ptr;
  if (isWayland && typeof isWayland === 'object') isWayland = isWayland.ptr;
  if (windowOrSurface && typeof windowOrSurface === 'object') windowOrSurface = windowOrSurface.ptr;
  if (display && typeof display === 'object') display = display.ptr;
  return wrapPointer(_emscripten_bind_WGPUInstance_CreateLinuxSurface_3(self, isWayland, windowOrSurface, display), WGPUSurface);
};

WGPUInstance.prototype['CreateMacSurface'] = WGPUInstance.prototype.CreateMacSurface = function(metalLayer) {
  var self = this.ptr;
  if (metalLayer && typeof metalLayer === 'object') metalLayer = metalLayer.ptr;
  return wrapPointer(_emscripten_bind_WGPUInstance_CreateMacSurface_1(self, metalLayer), WGPUSurface);
};

WGPUInstance.prototype['CreateAndroidSurface'] = WGPUInstance.prototype.CreateAndroidSurface = function(surface) {
  var self = this.ptr;
  if (surface && typeof surface === 'object') surface = surface.ptr;
  return wrapPointer(_emscripten_bind_WGPUInstance_CreateAndroidSurface_1(self, surface), WGPUSurface);
};

WGPUInstance.prototype['ProcessEvents'] = WGPUInstance.prototype.ProcessEvents = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUInstance_ProcessEvents_0(self);
};

WGPUInstance.prototype['WaitAny'] = WGPUInstance.prototype.WaitAny = function(futureVector, timeoutNS) {
  var self = this.ptr;
  if (futureVector && typeof futureVector === 'object') futureVector = futureVector.ptr;
  if (timeoutNS && typeof timeoutNS === 'object') timeoutNS = timeoutNS.ptr;
  return _emscripten_bind_WGPUInstance_WaitAny_2(self, futureVector, timeoutNS);
};

WGPUInstance.prototype['__destroy__'] = WGPUInstance.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUInstance___destroy___0(self);
};

function WGPUAdapter() { throw "cannot construct a WGPUAdapter, no constructor in IDL" }
WGPUAdapter.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUAdapter.prototype.constructor = WGPUAdapter;
WGPUAdapter.prototype.__class__ = WGPUAdapter;
WGPUAdapter.__cache__ = {};
Module['WGPUAdapter'] = WGPUAdapter;

WGPUAdapter.prototype['Release'] = WGPUAdapter.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUAdapter_Release_0(self);
};

WGPUAdapter.prototype['RequestDevice'] = WGPUAdapter.prototype.RequestDevice = function(options, mode, callback, errorCallback) {
  var self = this.ptr;
  if (options && typeof options === 'object') options = options.ptr;
  if (mode && typeof mode === 'object') mode = mode.ptr;
  if (callback && typeof callback === 'object') callback = callback.ptr;
  if (errorCallback && typeof errorCallback === 'object') errorCallback = errorCallback.ptr;
  _emscripten_bind_WGPUAdapter_RequestDevice_4(self, options, mode, callback, errorCallback);
};

WGPUAdapter.prototype['GetInfo'] = WGPUAdapter.prototype.GetInfo = function(adapterInfo) {
  var self = this.ptr;
  if (adapterInfo && typeof adapterInfo === 'object') adapterInfo = adapterInfo.ptr;
  return !!(_emscripten_bind_WGPUAdapter_GetInfo_1(self, adapterInfo));
};

WGPUAdapter.prototype['HasFeature'] = WGPUAdapter.prototype.HasFeature = function(featureName) {
  var self = this.ptr;
  if (featureName && typeof featureName === 'object') featureName = featureName.ptr;
  return !!(_emscripten_bind_WGPUAdapter_HasFeature_1(self, featureName));
};

WGPUAdapter.prototype['GetLimits'] = WGPUAdapter.prototype.GetLimits = function(limits) {
  var self = this.ptr;
  if (limits && typeof limits === 'object') limits = limits.ptr;
  return _emscripten_bind_WGPUAdapter_GetLimits_1(self, limits);
};

WGPUAdapter.prototype['__destroy__'] = WGPUAdapter.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUAdapter___destroy___0(self);
};

function WGPUDevice() { throw "cannot construct a WGPUDevice, no constructor in IDL" }
WGPUDevice.prototype = Object.create(window.idl.WrapperObject.prototype);
WGPUDevice.prototype.constructor = WGPUDevice;
WGPUDevice.prototype.__class__ = WGPUDevice;
WGPUDevice.__cache__ = {};
Module['WGPUDevice'] = WGPUDevice;

WGPUDevice.prototype['Release'] = WGPUDevice.prototype.Release = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUDevice_Release_0(self);
};

WGPUDevice.prototype['CreateBindGroup'] = WGPUDevice.prototype.CreateBindGroup = function(descriptor, valueOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (valueOut && typeof valueOut === 'object') valueOut = valueOut.ptr;
  _emscripten_bind_WGPUDevice_CreateBindGroup_2(self, descriptor, valueOut);
};

WGPUDevice.prototype['CreateBindGroupLayout'] = WGPUDevice.prototype.CreateBindGroupLayout = function(descriptor, valueOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (valueOut && typeof valueOut === 'object') valueOut = valueOut.ptr;
  _emscripten_bind_WGPUDevice_CreateBindGroupLayout_2(self, descriptor, valueOut);
};

WGPUDevice.prototype['CreateBuffer__0'] = WGPUDevice.prototype.CreateBuffer__0 = function(descriptor) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  return wrapPointer(_emscripten_bind_WGPUDevice_CreateBuffer__0_1(self, descriptor), WGPUBuffer);
};

WGPUDevice.prototype['CreateBuffer__1'] = WGPUDevice.prototype.CreateBuffer__1 = function(descriptor, valueOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (valueOut && typeof valueOut === 'object') valueOut = valueOut.ptr;
  _emscripten_bind_WGPUDevice_CreateBuffer__1_2(self, descriptor, valueOut);
};

WGPUDevice.prototype['CreateCommandEncoder'] = WGPUDevice.prototype.CreateCommandEncoder = function(descriptor, valueOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (valueOut && typeof valueOut === 'object') valueOut = valueOut.ptr;
  _emscripten_bind_WGPUDevice_CreateCommandEncoder_2(self, descriptor, valueOut);
};

WGPUDevice.prototype['CreateComputePipeline'] = WGPUDevice.prototype.CreateComputePipeline = function(descriptor, valueOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (valueOut && typeof valueOut === 'object') valueOut = valueOut.ptr;
  _emscripten_bind_WGPUDevice_CreateComputePipeline_2(self, descriptor, valueOut);
};

WGPUDevice.prototype['CreatePipelineLayout'] = WGPUDevice.prototype.CreatePipelineLayout = function(descriptor, valueOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (valueOut && typeof valueOut === 'object') valueOut = valueOut.ptr;
  _emscripten_bind_WGPUDevice_CreatePipelineLayout_2(self, descriptor, valueOut);
};

WGPUDevice.prototype['CreateQuerySet'] = WGPUDevice.prototype.CreateQuerySet = function(descriptor, valueOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (valueOut && typeof valueOut === 'object') valueOut = valueOut.ptr;
  _emscripten_bind_WGPUDevice_CreateQuerySet_2(self, descriptor, valueOut);
};

WGPUDevice.prototype['CreateRenderBundleEncoder'] = WGPUDevice.prototype.CreateRenderBundleEncoder = function(descriptor, valueOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (valueOut && typeof valueOut === 'object') valueOut = valueOut.ptr;
  _emscripten_bind_WGPUDevice_CreateRenderBundleEncoder_2(self, descriptor, valueOut);
};

WGPUDevice.prototype['CreateRenderPipeline'] = WGPUDevice.prototype.CreateRenderPipeline = function(descriptor, valueOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (valueOut && typeof valueOut === 'object') valueOut = valueOut.ptr;
  _emscripten_bind_WGPUDevice_CreateRenderPipeline_2(self, descriptor, valueOut);
};

WGPUDevice.prototype['CreateSampler'] = WGPUDevice.prototype.CreateSampler = function(descriptor, valueOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (valueOut && typeof valueOut === 'object') valueOut = valueOut.ptr;
  _emscripten_bind_WGPUDevice_CreateSampler_2(self, descriptor, valueOut);
};

WGPUDevice.prototype['CreateShaderModule'] = WGPUDevice.prototype.CreateShaderModule = function(descriptor, shaderModule) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (shaderModule && typeof shaderModule === 'object') shaderModule = shaderModule.ptr;
  _emscripten_bind_WGPUDevice_CreateShaderModule_2(self, descriptor, shaderModule);
};

WGPUDevice.prototype['CreateTexture'] = WGPUDevice.prototype.CreateTexture = function(descriptor, valueOut) {
  var self = this.ptr;
  if (descriptor && typeof descriptor === 'object') descriptor = descriptor.ptr;
  if (valueOut && typeof valueOut === 'object') valueOut = valueOut.ptr;
  _emscripten_bind_WGPUDevice_CreateTexture_2(self, descriptor, valueOut);
};

WGPUDevice.prototype['Destroy'] = WGPUDevice.prototype.Destroy = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUDevice_Destroy_0(self);
};

WGPUDevice.prototype['GetFeatures'] = WGPUDevice.prototype.GetFeatures = function(features) {
  var self = this.ptr;
  if (features && typeof features === 'object') features = features.ptr;
  _emscripten_bind_WGPUDevice_GetFeatures_1(self, features);
};

WGPUDevice.prototype['HasFeature'] = WGPUDevice.prototype.HasFeature = function(feature) {
  var self = this.ptr;
  if (feature && typeof feature === 'object') feature = feature.ptr;
  return !!(_emscripten_bind_WGPUDevice_HasFeature_1(self, feature));
};

WGPUDevice.prototype['GetLimits'] = WGPUDevice.prototype.GetLimits = function(limits) {
  var self = this.ptr;
  if (limits && typeof limits === 'object') limits = limits.ptr;
  _emscripten_bind_WGPUDevice_GetLimits_1(self, limits);
};

WGPUDevice.prototype['GetQueue'] = WGPUDevice.prototype.GetQueue = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_WGPUDevice_GetQueue_0(self), WGPUQueue);
};

WGPUDevice.prototype['__destroy__'] = WGPUDevice.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_WGPUDevice___destroy___0(self);
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
    

    Module['BigEndian'] = _emscripten_enum_WGPUByteOrder_BigEndian();

    Module['LittleEndian'] = _emscripten_enum_WGPUByteOrder_LittleEndian();

    

    Module['WGPU_Windows'] = _emscripten_enum_WGPUPlatformType_WGPU_Windows();

    Module['WGPU_Mac'] = _emscripten_enum_WGPUPlatformType_WGPU_Mac();

    Module['WGPU_Linux'] = _emscripten_enum_WGPUPlatformType_WGPU_Linux();

    Module['WGPU_iOS'] = _emscripten_enum_WGPUPlatformType_WGPU_iOS();

    Module['WGPU_Android'] = _emscripten_enum_WGPUPlatformType_WGPU_Android();

    Module['WGPU_Web'] = _emscripten_enum_WGPUPlatformType_WGPU_Web();

    Module['WGPU_Unknown'] = _emscripten_enum_WGPUPlatformType_WGPU_Unknown();

    

    Module['WGPUBufferUsage_None'] = _emscripten_enum_WGPUBufferUsage_WGPUBufferUsage_None();

    Module['WGPUBufferUsage_MapRead'] = _emscripten_enum_WGPUBufferUsage_WGPUBufferUsage_MapRead();

    Module['WGPUBufferUsage_MapWrite'] = _emscripten_enum_WGPUBufferUsage_WGPUBufferUsage_MapWrite();

    Module['WGPUBufferUsage_CopySrc'] = _emscripten_enum_WGPUBufferUsage_WGPUBufferUsage_CopySrc();

    Module['WGPUBufferUsage_CopyDst'] = _emscripten_enum_WGPUBufferUsage_WGPUBufferUsage_CopyDst();

    Module['WGPUBufferUsage_Index'] = _emscripten_enum_WGPUBufferUsage_WGPUBufferUsage_Index();

    Module['WGPUBufferUsage_Vertex'] = _emscripten_enum_WGPUBufferUsage_WGPUBufferUsage_Vertex();

    Module['WGPUBufferUsage_Uniform'] = _emscripten_enum_WGPUBufferUsage_WGPUBufferUsage_Uniform();

    Module['WGPUBufferUsage_Storage'] = _emscripten_enum_WGPUBufferUsage_WGPUBufferUsage_Storage();

    Module['WGPUBufferUsage_Indirect'] = _emscripten_enum_WGPUBufferUsage_WGPUBufferUsage_Indirect();

    Module['WGPUBufferUsage_QueryResolve'] = _emscripten_enum_WGPUBufferUsage_WGPUBufferUsage_QueryResolve();

    

    Module['WGPUColorWriteMask_None'] = _emscripten_enum_WGPUColorWriteMask_WGPUColorWriteMask_None();

    Module['WGPUColorWriteMask_Red'] = _emscripten_enum_WGPUColorWriteMask_WGPUColorWriteMask_Red();

    Module['WGPUColorWriteMask_Green'] = _emscripten_enum_WGPUColorWriteMask_WGPUColorWriteMask_Green();

    Module['WGPUColorWriteMask_Blue'] = _emscripten_enum_WGPUColorWriteMask_WGPUColorWriteMask_Blue();

    Module['WGPUColorWriteMask_Alpha'] = _emscripten_enum_WGPUColorWriteMask_WGPUColorWriteMask_Alpha();

    Module['WGPUColorWriteMask_All'] = _emscripten_enum_WGPUColorWriteMask_WGPUColorWriteMask_All();

    

    Module['WGPUMapMode_None'] = _emscripten_enum_WGPUMapMode_WGPUMapMode_None();

    Module['WGPUMapMode_Read'] = _emscripten_enum_WGPUMapMode_WGPUMapMode_Read();

    Module['WGPUMapMode_Write'] = _emscripten_enum_WGPUMapMode_WGPUMapMode_Write();

    

    Module['WGPUShaderStage_None'] = _emscripten_enum_WGPUShaderStage_WGPUShaderStage_None();

    Module['WGPUShaderStage_Vertex'] = _emscripten_enum_WGPUShaderStage_WGPUShaderStage_Vertex();

    Module['WGPUShaderStage_Fragment'] = _emscripten_enum_WGPUShaderStage_WGPUShaderStage_Fragment();

    Module['WGPUShaderStage_Compute'] = _emscripten_enum_WGPUShaderStage_WGPUShaderStage_Compute();

    

    Module['WGPUTextureUsage_None'] = _emscripten_enum_WGPUTextureUsage_WGPUTextureUsage_None();

    Module['WGPUTextureUsage_CopySrc'] = _emscripten_enum_WGPUTextureUsage_WGPUTextureUsage_CopySrc();

    Module['WGPUTextureUsage_CopyDst'] = _emscripten_enum_WGPUTextureUsage_WGPUTextureUsage_CopyDst();

    Module['WGPUTextureUsage_TextureBinding'] = _emscripten_enum_WGPUTextureUsage_WGPUTextureUsage_TextureBinding();

    Module['WGPUTextureUsage_StorageBinding'] = _emscripten_enum_WGPUTextureUsage_WGPUTextureUsage_StorageBinding();

    Module['WGPUTextureUsage_RenderAttachment'] = _emscripten_enum_WGPUTextureUsage_WGPUTextureUsage_RenderAttachment();

    

    Module['WGPUAdapterType_DiscreteGPU'] = _emscripten_enum_WGPUAdapterType_WGPUAdapterType_DiscreteGPU();

    Module['WGPUAdapterType_IntegratedGPU'] = _emscripten_enum_WGPUAdapterType_WGPUAdapterType_IntegratedGPU();

    Module['WGPUAdapterType_CPU'] = _emscripten_enum_WGPUAdapterType_WGPUAdapterType_CPU();

    Module['WGPUAdapterType_Unknown'] = _emscripten_enum_WGPUAdapterType_WGPUAdapterType_Unknown();

    Module['WGPUAdapterType_Force32'] = _emscripten_enum_WGPUAdapterType_WGPUAdapterType_Force32();

    

    Module['WGPUAddressMode_Undefined'] = _emscripten_enum_WGPUAddressMode_WGPUAddressMode_Undefined();

    Module['WGPUAddressMode_ClampToEdge'] = _emscripten_enum_WGPUAddressMode_WGPUAddressMode_ClampToEdge();

    Module['WGPUAddressMode_Repeat'] = _emscripten_enum_WGPUAddressMode_WGPUAddressMode_Repeat();

    Module['WGPUAddressMode_MirrorRepeat'] = _emscripten_enum_WGPUAddressMode_WGPUAddressMode_MirrorRepeat();

    Module['WGPUAddressMode_Force32'] = _emscripten_enum_WGPUAddressMode_WGPUAddressMode_Force32();

    

    Module['WGPUBackendType_Undefined'] = _emscripten_enum_WGPUBackendType_WGPUBackendType_Undefined();

    Module['WGPUBackendType_Null'] = _emscripten_enum_WGPUBackendType_WGPUBackendType_Null();

    Module['WGPUBackendType_WebGPU'] = _emscripten_enum_WGPUBackendType_WGPUBackendType_WebGPU();

    Module['WGPUBackendType_D3D11'] = _emscripten_enum_WGPUBackendType_WGPUBackendType_D3D11();

    Module['WGPUBackendType_D3D12'] = _emscripten_enum_WGPUBackendType_WGPUBackendType_D3D12();

    Module['WGPUBackendType_Metal'] = _emscripten_enum_WGPUBackendType_WGPUBackendType_Metal();

    Module['WGPUBackendType_Vulkan'] = _emscripten_enum_WGPUBackendType_WGPUBackendType_Vulkan();

    Module['WGPUBackendType_OpenGL'] = _emscripten_enum_WGPUBackendType_WGPUBackendType_OpenGL();

    Module['WGPUBackendType_OpenGLES'] = _emscripten_enum_WGPUBackendType_WGPUBackendType_OpenGLES();

    Module['WGPUBackendType_Force32'] = _emscripten_enum_WGPUBackendType_WGPUBackendType_Force32();

    

    Module['WGPUBlendFactor_Undefined'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_Undefined();

    Module['WGPUBlendFactor_Zero'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_Zero();

    Module['WGPUBlendFactor_One'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_One();

    Module['WGPUBlendFactor_Src'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_Src();

    Module['WGPUBlendFactor_OneMinusSrc'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_OneMinusSrc();

    Module['WGPUBlendFactor_SrcAlpha'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_SrcAlpha();

    Module['WGPUBlendFactor_OneMinusSrcAlpha'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_OneMinusSrcAlpha();

    Module['WGPUBlendFactor_Dst'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_Dst();

    Module['WGPUBlendFactor_OneMinusDst'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_OneMinusDst();

    Module['WGPUBlendFactor_DstAlpha'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_DstAlpha();

    Module['WGPUBlendFactor_OneMinusDstAlpha'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_OneMinusDstAlpha();

    Module['WGPUBlendFactor_SrcAlphaSaturated'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_SrcAlphaSaturated();

    Module['WGPUBlendFactor_Constant'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_Constant();

    Module['WGPUBlendFactor_OneMinusConstant'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_OneMinusConstant();

    Module['WGPUBlendFactor_Src1'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_Src1();

    Module['WGPUBlendFactor_OneMinusSrc1'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_OneMinusSrc1();

    Module['WGPUBlendFactor_Src1Alpha'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_Src1Alpha();

    Module['WGPUBlendFactor_OneMinusSrc1Alpha'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_OneMinusSrc1Alpha();

    Module['WGPUBlendFactor_Force32'] = _emscripten_enum_WGPUBlendFactor_WGPUBlendFactor_Force32();

    

    Module['WGPUBlendOperation_Undefined'] = _emscripten_enum_WGPUBlendOperation_WGPUBlendOperation_Undefined();

    Module['WGPUBlendOperation_Add'] = _emscripten_enum_WGPUBlendOperation_WGPUBlendOperation_Add();

    Module['WGPUBlendOperation_Subtract'] = _emscripten_enum_WGPUBlendOperation_WGPUBlendOperation_Subtract();

    Module['WGPUBlendOperation_ReverseSubtract'] = _emscripten_enum_WGPUBlendOperation_WGPUBlendOperation_ReverseSubtract();

    Module['WGPUBlendOperation_Min'] = _emscripten_enum_WGPUBlendOperation_WGPUBlendOperation_Min();

    Module['WGPUBlendOperation_Max'] = _emscripten_enum_WGPUBlendOperation_WGPUBlendOperation_Max();

    Module['WGPUBlendOperation_Force32'] = _emscripten_enum_WGPUBlendOperation_WGPUBlendOperation_Force32();

    

    Module['WGPUBufferBindingType_BindingNotUsed'] = _emscripten_enum_WGPUBufferBindingType_WGPUBufferBindingType_BindingNotUsed();

    Module['WGPUBufferBindingType_Undefined'] = _emscripten_enum_WGPUBufferBindingType_WGPUBufferBindingType_Undefined();

    Module['WGPUBufferBindingType_Uniform'] = _emscripten_enum_WGPUBufferBindingType_WGPUBufferBindingType_Uniform();

    Module['WGPUBufferBindingType_Storage'] = _emscripten_enum_WGPUBufferBindingType_WGPUBufferBindingType_Storage();

    Module['WGPUBufferBindingType_ReadOnlyStorage'] = _emscripten_enum_WGPUBufferBindingType_WGPUBufferBindingType_ReadOnlyStorage();

    Module['WGPUBufferBindingType_Force32'] = _emscripten_enum_WGPUBufferBindingType_WGPUBufferBindingType_Force32();

    

    Module['WGPUBufferMapState_Unmapped'] = _emscripten_enum_WGPUBufferMapState_WGPUBufferMapState_Unmapped();

    Module['WGPUBufferMapState_Pending'] = _emscripten_enum_WGPUBufferMapState_WGPUBufferMapState_Pending();

    Module['WGPUBufferMapState_Mapped'] = _emscripten_enum_WGPUBufferMapState_WGPUBufferMapState_Mapped();

    Module['WGPUBufferMapState_Force32'] = _emscripten_enum_WGPUBufferMapState_WGPUBufferMapState_Force32();

    

    Module['WGPUCallbackMode_WaitAnyOnly'] = _emscripten_enum_WGPUCallbackMode_WGPUCallbackMode_WaitAnyOnly();

    Module['WGPUCallbackMode_AllowProcessEvents'] = _emscripten_enum_WGPUCallbackMode_WGPUCallbackMode_AllowProcessEvents();

    Module['WGPUCallbackMode_AllowSpontaneous'] = _emscripten_enum_WGPUCallbackMode_WGPUCallbackMode_AllowSpontaneous();

    Module['WGPUCallbackMode_Force32'] = _emscripten_enum_WGPUCallbackMode_WGPUCallbackMode_Force32();

    

    Module['WGPUCompareFunction_Undefined'] = _emscripten_enum_WGPUCompareFunction_WGPUCompareFunction_Undefined();

    Module['WGPUCompareFunction_Never'] = _emscripten_enum_WGPUCompareFunction_WGPUCompareFunction_Never();

    Module['WGPUCompareFunction_Less'] = _emscripten_enum_WGPUCompareFunction_WGPUCompareFunction_Less();

    Module['WGPUCompareFunction_Equal'] = _emscripten_enum_WGPUCompareFunction_WGPUCompareFunction_Equal();

    Module['WGPUCompareFunction_LessEqual'] = _emscripten_enum_WGPUCompareFunction_WGPUCompareFunction_LessEqual();

    Module['WGPUCompareFunction_Greater'] = _emscripten_enum_WGPUCompareFunction_WGPUCompareFunction_Greater();

    Module['WGPUCompareFunction_NotEqual'] = _emscripten_enum_WGPUCompareFunction_WGPUCompareFunction_NotEqual();

    Module['WGPUCompareFunction_GreaterEqual'] = _emscripten_enum_WGPUCompareFunction_WGPUCompareFunction_GreaterEqual();

    Module['WGPUCompareFunction_Always'] = _emscripten_enum_WGPUCompareFunction_WGPUCompareFunction_Always();

    Module['WGPUCompareFunction_Force32'] = _emscripten_enum_WGPUCompareFunction_WGPUCompareFunction_Force32();

    

    Module['WGPUCompilationInfoRequestStatus_Success'] = _emscripten_enum_WGPUCompilationInfoRequestStatus_WGPUCompilationInfoRequestStatus_Success();

    Module['WGPUCompilationInfoRequestStatus_Force32'] = _emscripten_enum_WGPUCompilationInfoRequestStatus_WGPUCompilationInfoRequestStatus_Force32();

    

    Module['WGPUCompilationMessageType_Error'] = _emscripten_enum_WGPUCompilationMessageType_WGPUCompilationMessageType_Error();

    Module['WGPUCompilationMessageType_Warning'] = _emscripten_enum_WGPUCompilationMessageType_WGPUCompilationMessageType_Warning();

    Module['WGPUCompilationMessageType_Info'] = _emscripten_enum_WGPUCompilationMessageType_WGPUCompilationMessageType_Info();

    Module['WGPUCompilationMessageType_Force32'] = _emscripten_enum_WGPUCompilationMessageType_WGPUCompilationMessageType_Force32();

    

    Module['WGPUCompositeAlphaMode_Auto'] = _emscripten_enum_WGPUCompositeAlphaMode_WGPUCompositeAlphaMode_Auto();

    Module['WGPUCompositeAlphaMode_Opaque'] = _emscripten_enum_WGPUCompositeAlphaMode_WGPUCompositeAlphaMode_Opaque();

    Module['WGPUCompositeAlphaMode_Premultiplied'] = _emscripten_enum_WGPUCompositeAlphaMode_WGPUCompositeAlphaMode_Premultiplied();

    Module['WGPUCompositeAlphaMode_Unpremultiplied'] = _emscripten_enum_WGPUCompositeAlphaMode_WGPUCompositeAlphaMode_Unpremultiplied();

    Module['WGPUCompositeAlphaMode_Inherit'] = _emscripten_enum_WGPUCompositeAlphaMode_WGPUCompositeAlphaMode_Inherit();

    Module['WGPUCompositeAlphaMode_Force32'] = _emscripten_enum_WGPUCompositeAlphaMode_WGPUCompositeAlphaMode_Force32();

    

    Module['WGPUCreatePipelineAsyncStatus_Success'] = _emscripten_enum_WGPUCreatePipelineAsyncStatus_WGPUCreatePipelineAsyncStatus_Success();

    Module['WGPUCreatePipelineAsyncStatus_ValidationError'] = _emscripten_enum_WGPUCreatePipelineAsyncStatus_WGPUCreatePipelineAsyncStatus_ValidationError();

    Module['WGPUCreatePipelineAsyncStatus_InternalError'] = _emscripten_enum_WGPUCreatePipelineAsyncStatus_WGPUCreatePipelineAsyncStatus_InternalError();

    Module['WGPUCreatePipelineAsyncStatus_Force32'] = _emscripten_enum_WGPUCreatePipelineAsyncStatus_WGPUCreatePipelineAsyncStatus_Force32();

    

    Module['WGPUCullMode_Undefined'] = _emscripten_enum_WGPUCullMode_WGPUCullMode_Undefined();

    Module['WGPUCullMode_None'] = _emscripten_enum_WGPUCullMode_WGPUCullMode_None();

    Module['WGPUCullMode_Front'] = _emscripten_enum_WGPUCullMode_WGPUCullMode_Front();

    Module['WGPUCullMode_Back'] = _emscripten_enum_WGPUCullMode_WGPUCullMode_Back();

    Module['WGPUCullMode_Force32'] = _emscripten_enum_WGPUCullMode_WGPUCullMode_Force32();

    

    Module['WGPUDeviceLostReason_Unknown'] = _emscripten_enum_WGPUDeviceLostReason_WGPUDeviceLostReason_Unknown();

    Module['WGPUDeviceLostReason_Destroyed'] = _emscripten_enum_WGPUDeviceLostReason_WGPUDeviceLostReason_Destroyed();

    Module['WGPUDeviceLostReason_FailedCreation'] = _emscripten_enum_WGPUDeviceLostReason_WGPUDeviceLostReason_FailedCreation();

    Module['WGPUDeviceLostReason_Force32'] = _emscripten_enum_WGPUDeviceLostReason_WGPUDeviceLostReason_Force32();

    

    Module['WGPUErrorFilter_Validation'] = _emscripten_enum_WGPUErrorFilter_WGPUErrorFilter_Validation();

    Module['WGPUErrorFilter_OutOfMemory'] = _emscripten_enum_WGPUErrorFilter_WGPUErrorFilter_OutOfMemory();

    Module['WGPUErrorFilter_Internal'] = _emscripten_enum_WGPUErrorFilter_WGPUErrorFilter_Internal();

    Module['WGPUErrorFilter_Force32'] = _emscripten_enum_WGPUErrorFilter_WGPUErrorFilter_Force32();

    

    Module['WGPUErrorType_NoError'] = _emscripten_enum_WGPUErrorType_WGPUErrorType_NoError();

    Module['WGPUErrorType_Validation'] = _emscripten_enum_WGPUErrorType_WGPUErrorType_Validation();

    Module['WGPUErrorType_OutOfMemory'] = _emscripten_enum_WGPUErrorType_WGPUErrorType_OutOfMemory();

    Module['WGPUErrorType_Internal'] = _emscripten_enum_WGPUErrorType_WGPUErrorType_Internal();

    Module['WGPUErrorType_Unknown'] = _emscripten_enum_WGPUErrorType_WGPUErrorType_Unknown();

    Module['WGPUErrorType_Force32'] = _emscripten_enum_WGPUErrorType_WGPUErrorType_Force32();

    

    Module['WGPUFeatureLevel_Compatibility'] = _emscripten_enum_WGPUFeatureLevel_WGPUFeatureLevel_Compatibility();

    Module['WGPUFeatureLevel_Core'] = _emscripten_enum_WGPUFeatureLevel_WGPUFeatureLevel_Core();

    Module['WGPUFeatureLevel_Force32'] = _emscripten_enum_WGPUFeatureLevel_WGPUFeatureLevel_Force32();

    

    Module['WGPUFeatureName_DepthClipControl'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_DepthClipControl();

    Module['WGPUFeatureName_Depth32FloatStencil8'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_Depth32FloatStencil8();

    Module['WGPUFeatureName_TimestampQuery'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_TimestampQuery();

    Module['WGPUFeatureName_TextureCompressionBC'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_TextureCompressionBC();

    Module['WGPUFeatureName_TextureCompressionBCSliced3D'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_TextureCompressionBCSliced3D();

    Module['WGPUFeatureName_TextureCompressionETC2'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_TextureCompressionETC2();

    Module['WGPUFeatureName_TextureCompressionASTC'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_TextureCompressionASTC();

    Module['WGPUFeatureName_TextureCompressionASTCSliced3D'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_TextureCompressionASTCSliced3D();

    Module['WGPUFeatureName_IndirectFirstInstance'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_IndirectFirstInstance();

    Module['WGPUFeatureName_ShaderF16'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_ShaderF16();

    Module['WGPUFeatureName_RG11B10UfloatRenderable'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_RG11B10UfloatRenderable();

    Module['WGPUFeatureName_BGRA8UnormStorage'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_BGRA8UnormStorage();

    Module['WGPUFeatureName_Float32Filterable'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_Float32Filterable();

    Module['WGPUFeatureName_Float32Blendable'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_Float32Blendable();

    Module['WGPUFeatureName_ClipDistances'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_ClipDistances();

    Module['WGPUFeatureName_DualSourceBlending'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_DualSourceBlending();

    Module['WGPUFeatureName_Force32'] = _emscripten_enum_WGPUFeatureName_WGPUFeatureName_Force32();

    

    Module['WGPUFilterMode_Undefined'] = _emscripten_enum_WGPUFilterMode_WGPUFilterMode_Undefined();

    Module['WGPUFilterMode_Nearest'] = _emscripten_enum_WGPUFilterMode_WGPUFilterMode_Nearest();

    Module['WGPUFilterMode_Linear'] = _emscripten_enum_WGPUFilterMode_WGPUFilterMode_Linear();

    Module['WGPUFilterMode_Force32'] = _emscripten_enum_WGPUFilterMode_WGPUFilterMode_Force32();

    

    Module['WGPUFrontFace_Undefined'] = _emscripten_enum_WGPUFrontFace_WGPUFrontFace_Undefined();

    Module['WGPUFrontFace_CCW'] = _emscripten_enum_WGPUFrontFace_WGPUFrontFace_CCW();

    Module['WGPUFrontFace_CW'] = _emscripten_enum_WGPUFrontFace_WGPUFrontFace_CW();

    Module['WGPUFrontFace_Force32'] = _emscripten_enum_WGPUFrontFace_WGPUFrontFace_Force32();

    

    Module['WGPUIndexFormat_Undefined'] = _emscripten_enum_WGPUIndexFormat_WGPUIndexFormat_Undefined();

    Module['WGPUIndexFormat_Uint16'] = _emscripten_enum_WGPUIndexFormat_WGPUIndexFormat_Uint16();

    Module['WGPUIndexFormat_Uint32'] = _emscripten_enum_WGPUIndexFormat_WGPUIndexFormat_Uint32();

    Module['WGPUIndexFormat_Force32'] = _emscripten_enum_WGPUIndexFormat_WGPUIndexFormat_Force32();

    

    Module['WGPULoadOp_Undefined'] = _emscripten_enum_WGPULoadOp_WGPULoadOp_Undefined();

    Module['WGPULoadOp_Load'] = _emscripten_enum_WGPULoadOp_WGPULoadOp_Load();

    Module['WGPULoadOp_Clear'] = _emscripten_enum_WGPULoadOp_WGPULoadOp_Clear();

    Module['WGPULoadOp_Force32'] = _emscripten_enum_WGPULoadOp_WGPULoadOp_Force32();

    

    Module['WGPUMapAsyncStatus_Success'] = _emscripten_enum_WGPUMapAsyncStatus_WGPUMapAsyncStatus_Success();

    Module['WGPUMapAsyncStatus_Error'] = _emscripten_enum_WGPUMapAsyncStatus_WGPUMapAsyncStatus_Error();

    Module['WGPUMapAsyncStatus_Aborted'] = _emscripten_enum_WGPUMapAsyncStatus_WGPUMapAsyncStatus_Aborted();

    Module['WGPUMapAsyncStatus_Force32'] = _emscripten_enum_WGPUMapAsyncStatus_WGPUMapAsyncStatus_Force32();

    

    Module['WGPUMipmapFilterMode_Undefined'] = _emscripten_enum_WGPUMipmapFilterMode_WGPUMipmapFilterMode_Undefined();

    Module['WGPUMipmapFilterMode_Nearest'] = _emscripten_enum_WGPUMipmapFilterMode_WGPUMipmapFilterMode_Nearest();

    Module['WGPUMipmapFilterMode_Linear'] = _emscripten_enum_WGPUMipmapFilterMode_WGPUMipmapFilterMode_Linear();

    Module['WGPUMipmapFilterMode_Force32'] = _emscripten_enum_WGPUMipmapFilterMode_WGPUMipmapFilterMode_Force32();

    

    Module['WGPUOptionalBool_False'] = _emscripten_enum_WGPUOptionalBool_WGPUOptionalBool_False();

    Module['WGPUOptionalBool_True'] = _emscripten_enum_WGPUOptionalBool_WGPUOptionalBool_True();

    Module['WGPUOptionalBool_Undefined'] = _emscripten_enum_WGPUOptionalBool_WGPUOptionalBool_Undefined();

    Module['WGPUOptionalBool_Force32'] = _emscripten_enum_WGPUOptionalBool_WGPUOptionalBool_Force32();

    

    Module['WGPUPopErrorScopeStatus_Success'] = _emscripten_enum_WGPUPopErrorScopeStatus_WGPUPopErrorScopeStatus_Success();

    Module['WGPUPopErrorScopeStatus_Force32'] = _emscripten_enum_WGPUPopErrorScopeStatus_WGPUPopErrorScopeStatus_Force32();

    

    Module['WGPUPowerPreference_Undefined'] = _emscripten_enum_WGPUPowerPreference_WGPUPowerPreference_Undefined();

    Module['WGPUPowerPreference_LowPower'] = _emscripten_enum_WGPUPowerPreference_WGPUPowerPreference_LowPower();

    Module['WGPUPowerPreference_HighPerformance'] = _emscripten_enum_WGPUPowerPreference_WGPUPowerPreference_HighPerformance();

    Module['WGPUPowerPreference_Force32'] = _emscripten_enum_WGPUPowerPreference_WGPUPowerPreference_Force32();

    

    Module['WGPUPresentMode_Undefined'] = _emscripten_enum_WGPUPresentMode_WGPUPresentMode_Undefined();

    Module['WGPUPresentMode_Fifo'] = _emscripten_enum_WGPUPresentMode_WGPUPresentMode_Fifo();

    Module['WGPUPresentMode_FifoRelaxed'] = _emscripten_enum_WGPUPresentMode_WGPUPresentMode_FifoRelaxed();

    Module['WGPUPresentMode_Immediate'] = _emscripten_enum_WGPUPresentMode_WGPUPresentMode_Immediate();

    Module['WGPUPresentMode_Mailbox'] = _emscripten_enum_WGPUPresentMode_WGPUPresentMode_Mailbox();

    Module['WGPUPresentMode_Force32'] = _emscripten_enum_WGPUPresentMode_WGPUPresentMode_Force32();

    

    Module['WGPUPrimitiveTopology_Undefined'] = _emscripten_enum_WGPUPrimitiveTopology_WGPUPrimitiveTopology_Undefined();

    Module['WGPUPrimitiveTopology_PointList'] = _emscripten_enum_WGPUPrimitiveTopology_WGPUPrimitiveTopology_PointList();

    Module['WGPUPrimitiveTopology_LineList'] = _emscripten_enum_WGPUPrimitiveTopology_WGPUPrimitiveTopology_LineList();

    Module['WGPUPrimitiveTopology_LineStrip'] = _emscripten_enum_WGPUPrimitiveTopology_WGPUPrimitiveTopology_LineStrip();

    Module['WGPUPrimitiveTopology_TriangleList'] = _emscripten_enum_WGPUPrimitiveTopology_WGPUPrimitiveTopology_TriangleList();

    Module['WGPUPrimitiveTopology_TriangleStrip'] = _emscripten_enum_WGPUPrimitiveTopology_WGPUPrimitiveTopology_TriangleStrip();

    Module['WGPUPrimitiveTopology_Force32'] = _emscripten_enum_WGPUPrimitiveTopology_WGPUPrimitiveTopology_Force32();

    

    Module['WGPUQueryType_Occlusion'] = _emscripten_enum_WGPUQueryType_WGPUQueryType_Occlusion();

    Module['WGPUQueryType_Timestamp'] = _emscripten_enum_WGPUQueryType_WGPUQueryType_Timestamp();

    Module['WGPUQueryType_Force32'] = _emscripten_enum_WGPUQueryType_WGPUQueryType_Force32();

    

    Module['WGPUQueueWorkDoneStatus_Success'] = _emscripten_enum_WGPUQueueWorkDoneStatus_WGPUQueueWorkDoneStatus_Success();

    Module['WGPUQueueWorkDoneStatus_Error'] = _emscripten_enum_WGPUQueueWorkDoneStatus_WGPUQueueWorkDoneStatus_Error();

    Module['WGPUQueueWorkDoneStatus_Force32'] = _emscripten_enum_WGPUQueueWorkDoneStatus_WGPUQueueWorkDoneStatus_Force32();

    

    Module['WGPURequestAdapterStatus_Success'] = _emscripten_enum_WGPURequestAdapterStatus_WGPURequestAdapterStatus_Success();

    Module['WGPURequestAdapterStatus_Unavailable'] = _emscripten_enum_WGPURequestAdapterStatus_WGPURequestAdapterStatus_Unavailable();

    Module['WGPURequestAdapterStatus_Error'] = _emscripten_enum_WGPURequestAdapterStatus_WGPURequestAdapterStatus_Error();

    Module['WGPURequestAdapterStatus_Force32'] = _emscripten_enum_WGPURequestAdapterStatus_WGPURequestAdapterStatus_Force32();

    

    Module['WGPURequestDeviceStatus_Success'] = _emscripten_enum_WGPURequestDeviceStatus_WGPURequestDeviceStatus_Success();

    Module['WGPURequestDeviceStatus_Error'] = _emscripten_enum_WGPURequestDeviceStatus_WGPURequestDeviceStatus_Error();

    Module['WGPURequestDeviceStatus_Force32'] = _emscripten_enum_WGPURequestDeviceStatus_WGPURequestDeviceStatus_Force32();

    

    Module['WGPUSamplerBindingType_BindingNotUsed'] = _emscripten_enum_WGPUSamplerBindingType_WGPUSamplerBindingType_BindingNotUsed();

    Module['WGPUSamplerBindingType_Undefined'] = _emscripten_enum_WGPUSamplerBindingType_WGPUSamplerBindingType_Undefined();

    Module['WGPUSamplerBindingType_Filtering'] = _emscripten_enum_WGPUSamplerBindingType_WGPUSamplerBindingType_Filtering();

    Module['WGPUSamplerBindingType_NonFiltering'] = _emscripten_enum_WGPUSamplerBindingType_WGPUSamplerBindingType_NonFiltering();

    Module['WGPUSamplerBindingType_Comparison'] = _emscripten_enum_WGPUSamplerBindingType_WGPUSamplerBindingType_Comparison();

    Module['WGPUSamplerBindingType_Force32'] = _emscripten_enum_WGPUSamplerBindingType_WGPUSamplerBindingType_Force32();

    

    Module['WGPUStatus_Success'] = _emscripten_enum_WGPUStatus_WGPUStatus_Success();

    Module['WGPUStatus_Error'] = _emscripten_enum_WGPUStatus_WGPUStatus_Error();

    Module['WGPUStatus_Force32'] = _emscripten_enum_WGPUStatus_WGPUStatus_Force32();

    

    Module['WGPUStencilOperation_Undefined'] = _emscripten_enum_WGPUStencilOperation_WGPUStencilOperation_Undefined();

    Module['WGPUStencilOperation_Keep'] = _emscripten_enum_WGPUStencilOperation_WGPUStencilOperation_Keep();

    Module['WGPUStencilOperation_Zero'] = _emscripten_enum_WGPUStencilOperation_WGPUStencilOperation_Zero();

    Module['WGPUStencilOperation_Replace'] = _emscripten_enum_WGPUStencilOperation_WGPUStencilOperation_Replace();

    Module['WGPUStencilOperation_Invert'] = _emscripten_enum_WGPUStencilOperation_WGPUStencilOperation_Invert();

    Module['WGPUStencilOperation_IncrementClamp'] = _emscripten_enum_WGPUStencilOperation_WGPUStencilOperation_IncrementClamp();

    Module['WGPUStencilOperation_DecrementClamp'] = _emscripten_enum_WGPUStencilOperation_WGPUStencilOperation_DecrementClamp();

    Module['WGPUStencilOperation_IncrementWrap'] = _emscripten_enum_WGPUStencilOperation_WGPUStencilOperation_IncrementWrap();

    Module['WGPUStencilOperation_DecrementWrap'] = _emscripten_enum_WGPUStencilOperation_WGPUStencilOperation_DecrementWrap();

    Module['WGPUStencilOperation_Force32'] = _emscripten_enum_WGPUStencilOperation_WGPUStencilOperation_Force32();

    

    Module['WGPUStorageTextureAccess_BindingNotUsed'] = _emscripten_enum_WGPUStorageTextureAccess_WGPUStorageTextureAccess_BindingNotUsed();

    Module['WGPUStorageTextureAccess_Undefined'] = _emscripten_enum_WGPUStorageTextureAccess_WGPUStorageTextureAccess_Undefined();

    Module['WGPUStorageTextureAccess_WriteOnly'] = _emscripten_enum_WGPUStorageTextureAccess_WGPUStorageTextureAccess_WriteOnly();

    Module['WGPUStorageTextureAccess_ReadOnly'] = _emscripten_enum_WGPUStorageTextureAccess_WGPUStorageTextureAccess_ReadOnly();

    Module['WGPUStorageTextureAccess_ReadWrite'] = _emscripten_enum_WGPUStorageTextureAccess_WGPUStorageTextureAccess_ReadWrite();

    Module['WGPUStorageTextureAccess_Force32'] = _emscripten_enum_WGPUStorageTextureAccess_WGPUStorageTextureAccess_Force32();

    

    Module['WGPUStoreOp_Undefined'] = _emscripten_enum_WGPUStoreOp_WGPUStoreOp_Undefined();

    Module['WGPUStoreOp_Store'] = _emscripten_enum_WGPUStoreOp_WGPUStoreOp_Store();

    Module['WGPUStoreOp_Discard'] = _emscripten_enum_WGPUStoreOp_WGPUStoreOp_Discard();

    Module['WGPUStoreOp_Force32'] = _emscripten_enum_WGPUStoreOp_WGPUStoreOp_Force32();

    

    Module['WGPUSType_ShaderSourceSPIRV'] = _emscripten_enum_WGPUSType_WGPUSType_ShaderSourceSPIRV();

    Module['WGPUSType_ShaderSourceWGSL'] = _emscripten_enum_WGPUSType_WGPUSType_ShaderSourceWGSL();

    Module['WGPUSType_RenderPassMaxDrawCount'] = _emscripten_enum_WGPUSType_WGPUSType_RenderPassMaxDrawCount();

    Module['WGPUSType_SurfaceSourceMetalLayer'] = _emscripten_enum_WGPUSType_WGPUSType_SurfaceSourceMetalLayer();

    Module['WGPUSType_SurfaceSourceWindowsHWND'] = _emscripten_enum_WGPUSType_WGPUSType_SurfaceSourceWindowsHWND();

    Module['WGPUSType_SurfaceSourceXlibWindow'] = _emscripten_enum_WGPUSType_WGPUSType_SurfaceSourceXlibWindow();

    Module['WGPUSType_SurfaceSourceWaylandSurface'] = _emscripten_enum_WGPUSType_WGPUSType_SurfaceSourceWaylandSurface();

    Module['WGPUSType_SurfaceSourceAndroidNativeWindow'] = _emscripten_enum_WGPUSType_WGPUSType_SurfaceSourceAndroidNativeWindow();

    Module['WGPUSType_SurfaceSourceXCBWindow'] = _emscripten_enum_WGPUSType_WGPUSType_SurfaceSourceXCBWindow();

    Module['WGPUSType_Force32'] = _emscripten_enum_WGPUSType_WGPUSType_Force32();

    

    Module['WGPUSurfaceGetCurrentTextureStatus_SuccessOptimal'] = _emscripten_enum_WGPUSurfaceGetCurrentTextureStatus_WGPUSurfaceGetCurrentTextureStatus_SuccessOptimal();

    Module['WGPUSurfaceGetCurrentTextureStatus_SuccessSuboptimal'] = _emscripten_enum_WGPUSurfaceGetCurrentTextureStatus_WGPUSurfaceGetCurrentTextureStatus_SuccessSuboptimal();

    Module['WGPUSurfaceGetCurrentTextureStatus_Timeout'] = _emscripten_enum_WGPUSurfaceGetCurrentTextureStatus_WGPUSurfaceGetCurrentTextureStatus_Timeout();

    Module['WGPUSurfaceGetCurrentTextureStatus_Outdated'] = _emscripten_enum_WGPUSurfaceGetCurrentTextureStatus_WGPUSurfaceGetCurrentTextureStatus_Outdated();

    Module['WGPUSurfaceGetCurrentTextureStatus_Lost'] = _emscripten_enum_WGPUSurfaceGetCurrentTextureStatus_WGPUSurfaceGetCurrentTextureStatus_Lost();

    Module['WGPUSurfaceGetCurrentTextureStatus_Error'] = _emscripten_enum_WGPUSurfaceGetCurrentTextureStatus_WGPUSurfaceGetCurrentTextureStatus_Error();

    Module['WGPUSurfaceGetCurrentTextureStatus_Force32'] = _emscripten_enum_WGPUSurfaceGetCurrentTextureStatus_WGPUSurfaceGetCurrentTextureStatus_Force32();

    

    Module['WGPUTextureAspect_Undefined'] = _emscripten_enum_WGPUTextureAspect_WGPUTextureAspect_Undefined();

    Module['WGPUTextureAspect_All'] = _emscripten_enum_WGPUTextureAspect_WGPUTextureAspect_All();

    Module['WGPUTextureAspect_StencilOnly'] = _emscripten_enum_WGPUTextureAspect_WGPUTextureAspect_StencilOnly();

    Module['WGPUTextureAspect_DepthOnly'] = _emscripten_enum_WGPUTextureAspect_WGPUTextureAspect_DepthOnly();

    Module['WGPUTextureAspect_Force32'] = _emscripten_enum_WGPUTextureAspect_WGPUTextureAspect_Force32();

    

    Module['WGPUTextureDimension_Undefined'] = _emscripten_enum_WGPUTextureDimension_WGPUTextureDimension_Undefined();

    Module['WGPUTextureDimension_1D'] = _emscripten_enum_WGPUTextureDimension_WGPUTextureDimension_1D();

    Module['WGPUTextureDimension_2D'] = _emscripten_enum_WGPUTextureDimension_WGPUTextureDimension_2D();

    Module['WGPUTextureDimension_3D'] = _emscripten_enum_WGPUTextureDimension_WGPUTextureDimension_3D();

    Module['WGPUTextureDimension_Force32'] = _emscripten_enum_WGPUTextureDimension_WGPUTextureDimension_Force32();

    

    Module['WGPUTextureFormat_Undefined'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_Undefined();

    Module['WGPUTextureFormat_R8Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_R8Unorm();

    Module['WGPUTextureFormat_R8Snorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_R8Snorm();

    Module['WGPUTextureFormat_R8Uint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_R8Uint();

    Module['WGPUTextureFormat_R8Sint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_R8Sint();

    Module['WGPUTextureFormat_R16Uint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_R16Uint();

    Module['WGPUTextureFormat_R16Sint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_R16Sint();

    Module['WGPUTextureFormat_R16Float'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_R16Float();

    Module['WGPUTextureFormat_RG8Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RG8Unorm();

    Module['WGPUTextureFormat_RG8Snorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RG8Snorm();

    Module['WGPUTextureFormat_RG8Uint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RG8Uint();

    Module['WGPUTextureFormat_RG8Sint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RG8Sint();

    Module['WGPUTextureFormat_R32Float'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_R32Float();

    Module['WGPUTextureFormat_R32Uint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_R32Uint();

    Module['WGPUTextureFormat_R32Sint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_R32Sint();

    Module['WGPUTextureFormat_RG16Uint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RG16Uint();

    Module['WGPUTextureFormat_RG16Sint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RG16Sint();

    Module['WGPUTextureFormat_RG16Float'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RG16Float();

    Module['WGPUTextureFormat_RGBA8Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGBA8Unorm();

    Module['WGPUTextureFormat_RGBA8UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGBA8UnormSrgb();

    Module['WGPUTextureFormat_RGBA8Snorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGBA8Snorm();

    Module['WGPUTextureFormat_RGBA8Uint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGBA8Uint();

    Module['WGPUTextureFormat_RGBA8Sint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGBA8Sint();

    Module['WGPUTextureFormat_BGRA8Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BGRA8Unorm();

    Module['WGPUTextureFormat_BGRA8UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BGRA8UnormSrgb();

    Module['WGPUTextureFormat_RGB10A2Uint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGB10A2Uint();

    Module['WGPUTextureFormat_RGB10A2Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGB10A2Unorm();

    Module['WGPUTextureFormat_RG11B10Ufloat'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RG11B10Ufloat();

    Module['WGPUTextureFormat_RGB9E5Ufloat'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGB9E5Ufloat();

    Module['WGPUTextureFormat_RG32Float'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RG32Float();

    Module['WGPUTextureFormat_RG32Uint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RG32Uint();

    Module['WGPUTextureFormat_RG32Sint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RG32Sint();

    Module['WGPUTextureFormat_RGBA16Uint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGBA16Uint();

    Module['WGPUTextureFormat_RGBA16Sint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGBA16Sint();

    Module['WGPUTextureFormat_RGBA16Float'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGBA16Float();

    Module['WGPUTextureFormat_RGBA32Float'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGBA32Float();

    Module['WGPUTextureFormat_RGBA32Uint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGBA32Uint();

    Module['WGPUTextureFormat_RGBA32Sint'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_RGBA32Sint();

    Module['WGPUTextureFormat_Stencil8'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_Stencil8();

    Module['WGPUTextureFormat_Depth16Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_Depth16Unorm();

    Module['WGPUTextureFormat_Depth24Plus'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_Depth24Plus();

    Module['WGPUTextureFormat_Depth24PlusStencil8'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_Depth24PlusStencil8();

    Module['WGPUTextureFormat_Depth32Float'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_Depth32Float();

    Module['WGPUTextureFormat_Depth32FloatStencil8'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_Depth32FloatStencil8();

    Module['WGPUTextureFormat_BC1RGBAUnorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC1RGBAUnorm();

    Module['WGPUTextureFormat_BC1RGBAUnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC1RGBAUnormSrgb();

    Module['WGPUTextureFormat_BC2RGBAUnorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC2RGBAUnorm();

    Module['WGPUTextureFormat_BC2RGBAUnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC2RGBAUnormSrgb();

    Module['WGPUTextureFormat_BC3RGBAUnorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC3RGBAUnorm();

    Module['WGPUTextureFormat_BC3RGBAUnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC3RGBAUnormSrgb();

    Module['WGPUTextureFormat_BC4RUnorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC4RUnorm();

    Module['WGPUTextureFormat_BC4RSnorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC4RSnorm();

    Module['WGPUTextureFormat_BC5RGUnorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC5RGUnorm();

    Module['WGPUTextureFormat_BC5RGSnorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC5RGSnorm();

    Module['WGPUTextureFormat_BC6HRGBUfloat'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC6HRGBUfloat();

    Module['WGPUTextureFormat_BC6HRGBFloat'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC6HRGBFloat();

    Module['WGPUTextureFormat_BC7RGBAUnorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC7RGBAUnorm();

    Module['WGPUTextureFormat_BC7RGBAUnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_BC7RGBAUnormSrgb();

    Module['WGPUTextureFormat_ETC2RGB8Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ETC2RGB8Unorm();

    Module['WGPUTextureFormat_ETC2RGB8UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ETC2RGB8UnormSrgb();

    Module['WGPUTextureFormat_ETC2RGB8A1Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ETC2RGB8A1Unorm();

    Module['WGPUTextureFormat_ETC2RGB8A1UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ETC2RGB8A1UnormSrgb();

    Module['WGPUTextureFormat_ETC2RGBA8Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ETC2RGBA8Unorm();

    Module['WGPUTextureFormat_ETC2RGBA8UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ETC2RGBA8UnormSrgb();

    Module['WGPUTextureFormat_EACR11Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_EACR11Unorm();

    Module['WGPUTextureFormat_EACR11Snorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_EACR11Snorm();

    Module['WGPUTextureFormat_EACRG11Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_EACRG11Unorm();

    Module['WGPUTextureFormat_EACRG11Snorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_EACRG11Snorm();

    Module['WGPUTextureFormat_ASTC4x4Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC4x4Unorm();

    Module['WGPUTextureFormat_ASTC4x4UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC4x4UnormSrgb();

    Module['WGPUTextureFormat_ASTC5x4Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC5x4Unorm();

    Module['WGPUTextureFormat_ASTC5x4UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC5x4UnormSrgb();

    Module['WGPUTextureFormat_ASTC5x5Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC5x5Unorm();

    Module['WGPUTextureFormat_ASTC5x5UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC5x5UnormSrgb();

    Module['WGPUTextureFormat_ASTC6x5Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC6x5Unorm();

    Module['WGPUTextureFormat_ASTC6x5UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC6x5UnormSrgb();

    Module['WGPUTextureFormat_ASTC6x6Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC6x6Unorm();

    Module['WGPUTextureFormat_ASTC6x6UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC6x6UnormSrgb();

    Module['WGPUTextureFormat_ASTC8x5Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC8x5Unorm();

    Module['WGPUTextureFormat_ASTC8x5UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC8x5UnormSrgb();

    Module['WGPUTextureFormat_ASTC8x6Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC8x6Unorm();

    Module['WGPUTextureFormat_ASTC8x6UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC8x6UnormSrgb();

    Module['WGPUTextureFormat_ASTC8x8Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC8x8Unorm();

    Module['WGPUTextureFormat_ASTC8x8UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC8x8UnormSrgb();

    Module['WGPUTextureFormat_ASTC10x5Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC10x5Unorm();

    Module['WGPUTextureFormat_ASTC10x5UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC10x5UnormSrgb();

    Module['WGPUTextureFormat_ASTC10x6Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC10x6Unorm();

    Module['WGPUTextureFormat_ASTC10x6UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC10x6UnormSrgb();

    Module['WGPUTextureFormat_ASTC10x8Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC10x8Unorm();

    Module['WGPUTextureFormat_ASTC10x8UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC10x8UnormSrgb();

    Module['WGPUTextureFormat_ASTC10x10Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC10x10Unorm();

    Module['WGPUTextureFormat_ASTC10x10UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC10x10UnormSrgb();

    Module['WGPUTextureFormat_ASTC12x10Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC12x10Unorm();

    Module['WGPUTextureFormat_ASTC12x10UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC12x10UnormSrgb();

    Module['WGPUTextureFormat_ASTC12x12Unorm'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC12x12Unorm();

    Module['WGPUTextureFormat_ASTC12x12UnormSrgb'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_ASTC12x12UnormSrgb();

    Module['WGPUTextureFormat_Force32'] = _emscripten_enum_WGPUTextureFormat_WGPUTextureFormat_Force32();

    

    Module['WGPUTextureSampleType_BindingNotUsed'] = _emscripten_enum_WGPUTextureSampleType_WGPUTextureSampleType_BindingNotUsed();

    Module['WGPUTextureSampleType_Undefined'] = _emscripten_enum_WGPUTextureSampleType_WGPUTextureSampleType_Undefined();

    Module['WGPUTextureSampleType_Float'] = _emscripten_enum_WGPUTextureSampleType_WGPUTextureSampleType_Float();

    Module['WGPUTextureSampleType_UnfilterableFloat'] = _emscripten_enum_WGPUTextureSampleType_WGPUTextureSampleType_UnfilterableFloat();

    Module['WGPUTextureSampleType_Depth'] = _emscripten_enum_WGPUTextureSampleType_WGPUTextureSampleType_Depth();

    Module['WGPUTextureSampleType_Sint'] = _emscripten_enum_WGPUTextureSampleType_WGPUTextureSampleType_Sint();

    Module['WGPUTextureSampleType_Uint'] = _emscripten_enum_WGPUTextureSampleType_WGPUTextureSampleType_Uint();

    Module['WGPUTextureSampleType_Force32'] = _emscripten_enum_WGPUTextureSampleType_WGPUTextureSampleType_Force32();

    

    Module['WGPUTextureViewDimension_Undefined'] = _emscripten_enum_WGPUTextureViewDimension_WGPUTextureViewDimension_Undefined();

    Module['WGPUTextureViewDimension_1D'] = _emscripten_enum_WGPUTextureViewDimension_WGPUTextureViewDimension_1D();

    Module['WGPUTextureViewDimension_2D'] = _emscripten_enum_WGPUTextureViewDimension_WGPUTextureViewDimension_2D();

    Module['WGPUTextureViewDimension_2DArray'] = _emscripten_enum_WGPUTextureViewDimension_WGPUTextureViewDimension_2DArray();

    Module['WGPUTextureViewDimension_Cube'] = _emscripten_enum_WGPUTextureViewDimension_WGPUTextureViewDimension_Cube();

    Module['WGPUTextureViewDimension_CubeArray'] = _emscripten_enum_WGPUTextureViewDimension_WGPUTextureViewDimension_CubeArray();

    Module['WGPUTextureViewDimension_3D'] = _emscripten_enum_WGPUTextureViewDimension_WGPUTextureViewDimension_3D();

    Module['WGPUTextureViewDimension_Force32'] = _emscripten_enum_WGPUTextureViewDimension_WGPUTextureViewDimension_Force32();

    

    Module['WGPUVertexFormat_Uint8'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Uint8();

    Module['WGPUVertexFormat_Uint8x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Uint8x2();

    Module['WGPUVertexFormat_Uint8x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Uint8x4();

    Module['WGPUVertexFormat_Sint8'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Sint8();

    Module['WGPUVertexFormat_Sint8x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Sint8x2();

    Module['WGPUVertexFormat_Sint8x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Sint8x4();

    Module['WGPUVertexFormat_Unorm8'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Unorm8();

    Module['WGPUVertexFormat_Unorm8x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Unorm8x2();

    Module['WGPUVertexFormat_Unorm8x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Unorm8x4();

    Module['WGPUVertexFormat_Snorm8'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Snorm8();

    Module['WGPUVertexFormat_Snorm8x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Snorm8x2();

    Module['WGPUVertexFormat_Snorm8x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Snorm8x4();

    Module['WGPUVertexFormat_Uint16'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Uint16();

    Module['WGPUVertexFormat_Uint16x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Uint16x2();

    Module['WGPUVertexFormat_Uint16x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Uint16x4();

    Module['WGPUVertexFormat_Sint16'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Sint16();

    Module['WGPUVertexFormat_Sint16x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Sint16x2();

    Module['WGPUVertexFormat_Sint16x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Sint16x4();

    Module['WGPUVertexFormat_Unorm16'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Unorm16();

    Module['WGPUVertexFormat_Unorm16x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Unorm16x2();

    Module['WGPUVertexFormat_Unorm16x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Unorm16x4();

    Module['WGPUVertexFormat_Snorm16'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Snorm16();

    Module['WGPUVertexFormat_Snorm16x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Snorm16x2();

    Module['WGPUVertexFormat_Snorm16x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Snorm16x4();

    Module['WGPUVertexFormat_Float16'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Float16();

    Module['WGPUVertexFormat_Float16x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Float16x2();

    Module['WGPUVertexFormat_Float16x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Float16x4();

    Module['WGPUVertexFormat_Float32'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Float32();

    Module['WGPUVertexFormat_Float32x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Float32x2();

    Module['WGPUVertexFormat_Float32x3'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Float32x3();

    Module['WGPUVertexFormat_Float32x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Float32x4();

    Module['WGPUVertexFormat_Uint32'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Uint32();

    Module['WGPUVertexFormat_Uint32x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Uint32x2();

    Module['WGPUVertexFormat_Uint32x3'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Uint32x3();

    Module['WGPUVertexFormat_Uint32x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Uint32x4();

    Module['WGPUVertexFormat_Sint32'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Sint32();

    Module['WGPUVertexFormat_Sint32x2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Sint32x2();

    Module['WGPUVertexFormat_Sint32x3'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Sint32x3();

    Module['WGPUVertexFormat_Sint32x4'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Sint32x4();

    Module['WGPUVertexFormat_Unorm10_10_10_2'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Unorm10_10_10_2();

    Module['WGPUVertexFormat_Unorm8x4BGRA'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Unorm8x4BGRA();

    Module['WGPUVertexFormat_Force32'] = _emscripten_enum_WGPUVertexFormat_WGPUVertexFormat_Force32();

    

    Module['WGPUVertexStepMode_Undefined'] = _emscripten_enum_WGPUVertexStepMode_WGPUVertexStepMode_Undefined();

    Module['WGPUVertexStepMode_Vertex'] = _emscripten_enum_WGPUVertexStepMode_WGPUVertexStepMode_Vertex();

    Module['WGPUVertexStepMode_Instance'] = _emscripten_enum_WGPUVertexStepMode_WGPUVertexStepMode_Instance();

    Module['WGPUVertexStepMode_Force32'] = _emscripten_enum_WGPUVertexStepMode_WGPUVertexStepMode_Force32();

    

    Module['WGPUWaitStatus_Success'] = _emscripten_enum_WGPUWaitStatus_WGPUWaitStatus_Success();

    Module['WGPUWaitStatus_TimedOut'] = _emscripten_enum_WGPUWaitStatus_WGPUWaitStatus_TimedOut();

    Module['WGPUWaitStatus_Force32'] = _emscripten_enum_WGPUWaitStatus_WGPUWaitStatus_Force32();

    

    Module['WGPUWGSLLanguageFeatureName_ReadonlyAndReadwriteStorageTextures'] = _emscripten_enum_WGPUWGSLLanguageFeatureName_WGPUWGSLLanguageFeatureName_ReadonlyAndReadwriteStorageTextures();

    Module['WGPUWGSLLanguageFeatureName_Packed4x8IntegerDotProduct'] = _emscripten_enum_WGPUWGSLLanguageFeatureName_WGPUWGSLLanguageFeatureName_Packed4x8IntegerDotProduct();

    Module['WGPUWGSLLanguageFeatureName_UnrestrictedPointerParameters'] = _emscripten_enum_WGPUWGSLLanguageFeatureName_WGPUWGSLLanguageFeatureName_UnrestrictedPointerParameters();

    Module['WGPUWGSLLanguageFeatureName_PointerCompositeAccess'] = _emscripten_enum_WGPUWGSLLanguageFeatureName_WGPUWGSLLanguageFeatureName_PointerCompositeAccess();

    Module['WGPUWGSLLanguageFeatureName_Force32'] = _emscripten_enum_WGPUWGSLLanguageFeatureName_WGPUWGSLLanguageFeatureName_Force32();

  }
  if (runtimeInitialized) setupEnums();
  else addOnInit(setupEnums);
})();

        Object.assign(window.idl, Module);
        Object.assign(Module, modifiedExports);

        return Module;
    };
})();