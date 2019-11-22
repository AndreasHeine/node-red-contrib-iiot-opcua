/**
 The BSD 3-Clause License

 Copyright 2016,2017,2018,2019 - Klaus Landsdorf (https://bianco-royal.com/)
 Copyright 2015,2016 - Mika Karaila, Valmet Automation Inc. (node-red-contrib-opcua)
 All rights reserved.
 node-red-contrib-iiot-opcua
 */
'use strict'
// SOURCE-MAP-REQUIRED

/**
 * Nested namespace settings.
 *
 * @type {{biancoroyal: {opcua: {iiot: {core: {}}}}}}
 *
 * @Namesapce de.biancoroyal.opcua.iiot.core
 */
var de = de || { biancoroyal: { opcua: { iiot: { core: { basics: {} } } } } } // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.nodeOPCUA = de.biancoroyal.opcua.iiot.core.basics.nodeOPCUA || require('node-opcua') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.nodeOPCUAId = de.biancoroyal.opcua.iiot.core.basics.nodeOPCUAId || require('node-opcua-nodeid') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.internalDebugLog = de.biancoroyal.opcua.iiot.core.basics.internalDebugLog || require('debug')('opcuaIIoT:core') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.detailDebugLog = de.biancoroyal.opcua.iiot.core.basics.detailDebugLog || require('debug')('opcuaIIoT:core:details') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.specialDebugLog = de.biancoroyal.opcua.iiot.core.basics.specialDebugLog || require('debug')('opcuaIIoT:core:special') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.OBJECTS_ROOT = de.biancoroyal.opcua.iiot.core.basics.OBJECTS_ROOT || 'ns=0;i=84' // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.TEN_SECONDS_TIMEOUT = de.biancoroyal.opcua.iiot.core.basics.TEN_SECONDS_TIMEOUT || 10 // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.RUNNING_STATE = de.biancoroyal.opcua.iiot.core.basics.RUNNING_STATE || 'SESSIONACTIVE' // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.os = de.biancoroyal.opcua.iiot.core.basics.os || require('os') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.assert = de.biancoroyal.opcua.iiot.core.basics.assert || require('better-assert') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.underscore = de.biancoroyal.opcua.iiot.core.basics.underscore || require('underscore') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.isWindows = de.biancoroyal.opcua.iiot.core.basics.isWindows || /^win/.test(de.biancoroyal.opcua.iiot.core.basics.os.platform()) // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.FAKTOR_SEC_TO_MSEC = de.biancoroyal.opcua.iiot.core.basics.FAKTOR_SEC_TO_MSEC || 1000 // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.DEFAULT_TIMEOUT = de.biancoroyal.opcua.iiot.core.basics.DEFAULT_TIMEOUT || 1000 // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.basics.internalDebugLog(de.biancoroyal.opcua.iiot.core.basics.os.endianness())
de.biancoroyal.opcua.iiot.core.basics.internalDebugLog(de.biancoroyal.opcua.iiot.core.basics.os.hostname())
de.biancoroyal.opcua.iiot.core.basics.internalDebugLog(de.biancoroyal.opcua.iiot.core.basics.os.platform())
de.biancoroyal.opcua.iiot.core.basics.internalDebugLog(de.biancoroyal.opcua.iiot.core.basics.os.type())
de.biancoroyal.opcua.iiot.core.basics.internalDebugLog(de.biancoroyal.opcua.iiot.core.basics.os.arch())

de.biancoroyal.opcua.iiot.core.basics.getPathFromRequireResolve = function (requireResolve) {
  let pathToNodeOPCUA = ''

  if (this.isWindows) {
    pathToNodeOPCUA = requireResolve.replace('\\index.js', '')
  } else {
    pathToNodeOPCUA = requireResolve.replace('/index.js', '')
  }

  this.internalDebugLog('path to node-opcua: ' + pathToNodeOPCUA)

  return pathToNodeOPCUA
}

de.biancoroyal.opcua.iiot.core.basics.getNodeOPCUAPath = function () {
  return this.getPathFromRequireResolve(require.resolve('node-opcua'))
}

de.biancoroyal.opcua.iiot.core.basics.getNodeOPCUAClientPath = function () {
  return this.getPathFromRequireResolve(require.resolve('node-opcua-client'))
}

de.biancoroyal.opcua.iiot.core.basics.getNodeOPCUAServerPath = function () {
  return this.getPathFromRequireResolve(require.resolve('node-opcua-server'))
}

de.biancoroyal.opcua.iiot.core.basics.getTimeUnitName = function (unit) {
  let unitAbbreviation = ''

  switch (unit) {
    case 'ms':
      unitAbbreviation = 'msec.'
      break
    case 's':
      unitAbbreviation = 'sec.'
      break
    case 'm':
      unitAbbreviation = 'min.'
      break
    case 'h':
      unitAbbreviation = 'h.'
      break
    default:
      break
  }

  return unitAbbreviation
}

de.biancoroyal.opcua.iiot.core.basics.calcMillisecondsByTimeAndUnit = function (time, unit) {
  let convertedTime

  switch (unit) {
    case 'ms':
      convertedTime = time
      break
    case 's':
      convertedTime = time * 1000 // seconds
      break
    case 'm':
      convertedTime = time * 60000 // minutes
      break
    case 'h':
      convertedTime = time * 3600000 // hours
      break
    default:
      convertedTime = 10000 // 10 sec.
      break
  }

  return convertedTime
}

de.biancoroyal.opcua.iiot.core.basics.buildBrowseMessage = function (topic) {
  return {
    topic: topic,
    nodeId: '',
    browseName: '',
    nodeClassType: '',
    typeDefinition: '',
    payload: ''
  }
}

de.biancoroyal.opcua.iiot.core.basics.toInt32 = function (x) {
  let uintSixteen = x

  if (uintSixteen >= Math.pow(2, 15)) {
    uintSixteen = x - Math.pow(2, 16)
    return uintSixteen
  } else {
    return uintSixteen
  }
}

de.biancoroyal.opcua.iiot.core.basics.getNodeStatus = function (statusValue, statusLog) {
  let fillValue = 'yellow'
  let shapeValue = 'ring'

  switch (statusValue) {
    case 'initialize':
    case 'connecting':
      fillValue = 'yellow'
      break
    case 'connected':
    case 'keepalive':
    case 'subscribe':
    case 'started':
      if (!statusLog) {
        statusValue = 'active'
        shapeValue = 'dot'
      }
      fillValue = 'green'
      break
    case 'active':
    case 'subscribed':
    case 'listening':
      fillValue = 'green'
      shapeValue = 'dot'
      break
    case 'disconnected':
    case 'terminated':
      fillValue = 'red'
      break
    case 'waiting':
      fillValue = 'blue'
      shapeValue = 'dot'
      statusValue = 'waiting ...'
      break
    case 'error':
      fillValue = 'red'
      shapeValue = 'dot'
      break
    default:
      if (!statusValue) {
        fillValue = 'blue'
        statusValue = 'waiting ...'
      }
  }

  return { fill: fillValue, shape: shapeValue, status: statusValue }
}

de.biancoroyal.opcua.iiot.core.basics.buildNewVariant = function (datatype, value, arraytype, dimensions) {
  const opcua = this.nodeOPCUA
  let variantValue = null
  arraytype = arraytype || opcua.VariantArrayType.Scalar

  this.detailDebugLog('buildNewVariant datatype: ' + datatype + ' value:' + value)

  switch (arraytype) {
    case 'Matrix':
    case opcua.VariantArrayType.Matrix:
      variantValue = this.buildNewMatrixVariant(datatype, value, dimensions)
      break
    case 'Array':
    case opcua.VariantArrayType.Array:
      variantValue = this.buildNewArrayVariant(datatype, value)
      break
    default:
      variantValue = this.buildNewScalarVariant(datatype, value)
      break
  }

  this.detailDebugLog('buildNewVariant variantValue: ' + JSON.stringify(variantValue))

  return variantValue
}

de.biancoroyal.opcua.iiot.core.basics.flattenMatrixValue = function (value, dimensions, depth, flattened) {
  flattened = flattened || []
  depth = depth || 0

  if (Array.isArray(value)) {
    if (value.length === 0) {
      throw new Error('Matrix cannot have zero length dimensions')
    }

    if (dimensions.length === depth) {
      dimensions.push(value.length)
    } else if (dimensions[depth] !== value.length) {
      throw new Error('Matrix subtitems need to be of an equal size')
    }

    for (let i = 0; i < value.length; i++) {
      this.flattenMatrixValue(value[i], dimensions, depth + 1, flattened)
    }
  } else {
    flattened.push(value)
  }

  return flattened
}

de.biancoroyal.opcua.iiot.core.basics.buildNewMatrixVariant = function (datatype, value, dimensions) {
  const opcua = this.nodeOPCUA

  if (!Array.isArray(value)) {
    throw new Error('Non array value provided to an matrix type node')
  }

  const inferedDimensions = []
  const flattenedValue = this.flattenMatrixValue(value, inferedDimensions)

  dimensions = dimensions || inferedDimensions
  if (!inferedDimensions.every((e, i) => e === dimensions[i])) {
    // Allow Matrix to be given as flat array
    if (inferedDimensions[0] !== dimensions.reduce((a, b) => a * b)) {
      throw new Error('Given matrix dimensions do not match the number of values')
    }
  }

  const variantValue = de.biancoroyal.opcua.iiot.core.basics.buildNewArrayVariant(datatype, flattenedValue)

  variantValue.arrayType = opcua.VariantArrayType.Matrix
  variantValue.dimensions = dimensions

  return variantValue
}

de.biancoroyal.opcua.iiot.core.basics.buildNewArrayVariant = function (datatype, value) {
  const opcua = this.nodeOPCUA
  let variantValue = null

  if (!Array.isArray(value)) {
    throw new Error('Non array value provided to an array type node')
  }

  switch (datatype) {
    case 'Float':
    case opcua.DataType.Float:
      variantValue = {
        dataType: opcua.DataType.Float,
        arrayType: opcua.VariantArrayType.Array,
        value: []
      }
      for (let i = 0; i < value.length; i++) {
        variantValue.value.push(parseFloat(value[i]))
      }
      break
    case 'Double':
    case opcua.DataType.Double:
      variantValue = {
        dataType: opcua.DataType.Double,
        arrayType: opcua.VariantArrayType.Array,
        value: []
      }
      for (let i = 0; i < value.length; i++) {
        variantValue.value.push(parseFloat(value[i]))
      }
      break
    case 'UInt16':
    case opcua.DataType.UInt16:
      variantValue = {
        dataType: opcua.DataType.UInt16,
        arrayType: opcua.VariantArrayType.Array,
        value: new Uint16Array(value)
      }
      break
    case 'UInt32':
    case opcua.DataType.UInt32:
      variantValue = {
        dataType: opcua.DataType.UInt32,
        arrayType: opcua.VariantArrayType.Array,
        value: new Uint32Array(value)
      }
      break
    case 'Int32':
    case opcua.DataType.Int32:
      variantValue = {
        dataType: opcua.DataType.Int32,
        arrayType: opcua.VariantArrayType.Array,
        value: []
      }
      for (let i = 0; i < value.length; i++) {
        variantValue.value.push(parseInt(value[i]))
      }
      break
    case 'Int16':
    case opcua.DataType.Int16:
      variantValue = {
        dataType: opcua.DataType.Int16,
        arrayType: opcua.VariantArrayType.Array,
        value: []
      }
      for (let i = 0; i < value.length; i++) {
        variantValue.value.push(parseInt(value[i]))
      }
      break
    case 'Int64':
    case opcua.DataType.Int64:
      variantValue = {
        dataType: opcua.DataType.Int64,
        arrayType: opcua.VariantArrayType.Array,
        value: []
      }
      for (let i = 0; i < value.length; i++) {
        variantValue.value.push(parseInt(value[i]))
      }
      break
    case 'Boolean':
    case opcua.DataType.Boolean:
      variantValue = {
        dataType: opcua.DataType.Boolean,
        arrayType: opcua.VariantArrayType.Array,
        value: []
      }
      for (let i = 0; i < value.length; i++) {
        if (value[i] && value[i] !== 'false' && value[i] !== '0') {
          variantValue.value.push(true)
        } else {
          variantValue.value.push(false)
        }
      }
      break
    case 'LocalizedText':
    case opcua.DataType.LocalizedText:
      variantValue = {
        dataType: opcua.DataType.LocalizedText,
        arrayType: opcua.VariantArrayType.Array,
        value: []
      }
      for (let i = 0; i < value.length; i++) {
        variantValue.value.push(JSON.parse(value[i])) /* [{text:'Hello', locale:'en'}, {text:'Hallo', locale:'de'} ... ] */
      }
      break
    case 'DateTime':
    case opcua.DataType.DateTime:
      variantValue = {
        dataType: opcua.DataType.DateTime,
        arrayType: opcua.VariantArrayType.Array,
        value: []
      }
      for (let i = 0; i < value.length; i++) {
        variantValue.value.push(new Date(value[i]))
      }
      break
    default:
      if (datatype !== '') {
        const datatypeList = this.getBasicDataTypes()
        datatypeList.forEach((item) => {
          if (item.name === datatype || item.dataType === datatype) {
            variantValue = {
              dataType: item.dataType,
              arrayType: opcua.VariantArrayType.Array,
              value: value
            }
          }
        })
      } else {
        variantValue = {
          dataType: opcua.DataType.String,
          arrayType: opcua.VariantArrayType.Array,
          value: value
        }
      }
      break
  }

  return variantValue
}

de.biancoroyal.opcua.iiot.core.basics.buildNewScalarVariant = function (datatype, value) {
  const opcua = this.nodeOPCUA
  let variantValue = null

  switch (datatype) {
    case 'Float':
    case opcua.DataType.Float:
      variantValue = {
        dataType: opcua.DataType.Float,
        value: parseFloat(value)
      }
      break
    case 'Double':
    case opcua.DataType.Double:
      variantValue = {
        dataType: opcua.DataType.Double,
        value: parseFloat(value)
      }
      break
    case 'UInt16':
    case opcua.DataType.UInt16:
      variantValue = {
        dataType: opcua.DataType.UInt16,
        value: new Uint16Array([value])[0]
      }
      break
    case 'UInt32':
    case opcua.DataType.UInt32:
      variantValue = {
        dataType: opcua.DataType.UInt32,
        value: new Uint32Array([value])[0]
      }
      break
    case 'Int32':
    case opcua.DataType.Int32:
      variantValue = {
        dataType: opcua.DataType.Int32,
        value: parseInt(value)
      }
      break
    case 'Int16':
    case opcua.DataType.Int16:
      variantValue = {
        dataType: opcua.DataType.Int16,
        value: parseInt(value)
      }
      break
    case 'Int64':
    case opcua.DataType.Int64:
      variantValue = {
        dataType: opcua.DataType.Int64,
        value: parseInt(value)
      }
      break
    case 'Boolean':
    case opcua.DataType.Boolean:
      if (value && value !== 'false') {
        variantValue = {
          dataType: opcua.DataType.Boolean,
          value: true
        }
      } else {
        variantValue = {
          dataType: opcua.DataType.Boolean,
          value: false
        }
      }
      break
    case 'LocalizedText':
    case opcua.DataType.LocalizedText:
      variantValue = {
        dataType: opcua.DataType.LocalizedText,
        value: JSON.parse(value) /* [{text:'Hello', locale:'en'}, {text:'Hallo', locale:'de'} ... ] */
      }
      break
    case 'DateTime':
    case opcua.DataType.DateTime:
      variantValue = {
        dataType: opcua.DataType.DateTime,
        value: new Date(value)
      }
      break
    default:
      if (datatype !== '') {
        const datatypeList = this.getBasicDataTypes()
        datatypeList.forEach((item) => {
          if (item.name === datatype || item.dataType === datatype) {
            variantValue = {
              dataType: item.dataType,
              value: value
            }
          }
        })
      } else {
        variantValue = {
          dataType: opcua.DataType.String,
          value: value
        }
      }
      break
  }

  return variantValue
}

de.biancoroyal.opcua.iiot.core.basics.getVariantValue = function (datatype, value) {
  const opcua = this.nodeOPCUA

  switch (datatype) {
    case 'Float':
    case 'Double':
    case opcua.DataType.Double:
      return parseFloat(value)
    case 'UInt16':
    case opcua.DataType.UInt16:
      return new Uint16Array([value])[0]
    case 'UInt32':
    case opcua.DataType.UInt32:
      return new Uint32Array([value])[0]
    case 'Int16':
    case opcua.DataType.Int16:
    case 'Int32':
    case 'Integer':
    case opcua.DataType.Int32:
    case 'Int64':
    case opcua.DataType.Int64:
      return parseInt(value)
    case 'Boolean':
    case opcua.DataType.Boolean:
      return (value && value !== 'false')
    case 'DateTime':
    case opcua.DataType.DateTime:
      return new Date(value)
    case 'String':
    case opcua.DataType.String:
      return (typeof value !== 'string') ? value.toString() : value
    default:
      return value
  }
}

de.biancoroyal.opcua.iiot.core.basics.getBasicDataTypes = function () {
  const opcua = this.nodeOPCUA

  return [
    { name: 'Null', dataType: opcua.DataType.Null },
    { name: 'Boolean', dataType: opcua.DataType.Boolean },
    { name: 'SByte', dataType: opcua.DataType.SByte },
    { name: 'Byte', dataType: opcua.DataType.Byte },
    { name: 'Int16', dataType: opcua.DataType.Int16 },
    { name: 'UInt16', dataType: opcua.DataType.UInt16 },
    { name: 'Int32', dataType: opcua.DataType.Int32 },
    { name: 'UInt32', dataType: opcua.DataType.UInt32 },
    { name: 'Int64', dataType: opcua.DataType.Int64 },
    { name: 'UInt64', dataType: opcua.DataType.UInt64 },
    { name: 'Float', dataType: opcua.DataType.Float },
    { name: 'Double', dataType: opcua.DataType.Double },
    { name: 'DateTime', dataType: opcua.DataType.DateTime },
    { name: 'String', dataType: opcua.DataType.String },
    { name: 'Guid', dataType: opcua.DataType.Guid },
    { name: 'ByteString', dataType: opcua.DataType.ByteString },
    { name: 'XmlElement', dataType: opcua.DataType.XmlElement },
    { name: 'NodeId', dataType: opcua.DataType.NodeId },
    { name: 'ExpandedNodeId', dataType: opcua.DataType.ExpandedNodeId },
    { name: 'StatusCode', dataType: opcua.DataType.StatusCode },
    { name: 'LocalizedText', dataType: opcua.DataType.LocalizedText },
    { name: 'ExtensionObject', dataType: opcua.DataType.ExtensionObject },
    { name: 'DataValue', dataType: opcua.DataType.DataValue },
    { name: 'Variant', dataType: opcua.DataType.Variant },
    { name: 'DiagnosticInfo', dataType: opcua.DataType.DiagnosticInfo }
  ]
}

de.biancoroyal.opcua.iiot.core.basics.convertDataValue = function (value) {
  return de.biancoroyal.opcua.iiot.core.basics.convertDataValueByDataType(value, value.dataType)
}

de.biancoroyal.opcua.iiot.core.basics.convertDataValueByDataType = function (value, dataType) {
  const opcua = this.nodeOPCUA
  let convertedValue = null

  if (!{}.hasOwnProperty.call(value, 'value')) {
    this.specialDebugLog('value has no value and that is not allowed ' + JSON.stringify(value))
    return value
  }

  const valueType = typeof value.value

  this.detailDebugLog('convertDataValue: ' + JSON.stringify(value) +
    ' value origin type ' + valueType + ' convert to' + ' ' + dataType)

  try {
    switch (dataType) {
      case 'NodeId':
      case opcua.DataType.NodeId:
        convertedValue = value.value.toString()
        break
      case 'NodeIdType':
      case opcua.DataType.NodeIdType:
        if (value.value instanceof Buffer) {
          convertedValue = value.value.toString()
        } else {
          convertedValue = value.value
        }
        break
      case 'ByteString':
      case opcua.DataType.ByteString:
        convertedValue = value.value
        break
      case 'Byte':
      case opcua.DataType.Byte:
        if (valueType === 'boolean') {
          convertedValue = value.value ? 1 : 0
        } else {
          convertedValue = parseInt(value.value)
        }
        break
      case opcua.DataType.QualifiedName:
        convertedValue = value.value.toString()
        break
      case 'LocalizedText':
      case opcua.DataType.LocalizedText:
        convertedValue = value.value
        break
      case 'Float':
      case opcua.DataType.Float:
        if (isNaN(value.value)) {
          convertedValue = value.value
        } else {
          convertedValue = parseFloat(value.value)
        }
        break
      case 'Double':
      case opcua.DataType.Double:
        if (isNaN(value.value)) {
          convertedValue = value.value
        } else {
          convertedValue = parseFloat(value.value)
        }
        break
      case 'UInt16':
      case opcua.DataType.UInt16:
        convertedValue = new Uint16Array([value.value])[0]
        break
      case 'UInt32':
      case opcua.DataType.UInt32:
        convertedValue = new Uint32Array([value.value])[0]
        break
      case 'Int16':
      case opcua.DataType.Int16:
      case 'Int32':
      case opcua.DataType.Int32:
      case 'Int64':
      case opcua.DataType.Int64:
        if (valueType === 'boolean') {
          convertedValue = value.value ? 1 : 0
        } else {
          if (isNaN(value.value)) {
            convertedValue = value.value
          } else {
            convertedValue = parseInt(value.value)
          }
        }
        break
      case 'Boolean':
      case opcua.DataType.Boolean:
        convertedValue = value.value
        break
      case 'String':
      case opcua.DataType.String:
        if (valueType !== 'string') {
          convertedValue = value.value.toString()
        } else {
          convertedValue = value.value
        }
        break
      case 'Null':
      case opcua.DataType.Null:
        convertedValue = null
        break
      default:
        this.internalDebugLog('convertDataValue unused DataType: ' + dataType)
        if ({}.hasOwnProperty.call(value, 'value')) {
          convertedValue = value.value
        } else {
          convertedValue = null
        }
        break
    }
  } catch (err) {
    this.detailDebugLog('convertDataValue ' + err)
  }

  this.detailDebugLog('convertDataValue is: ' + convertedValue)

  return convertedValue
}

de.biancoroyal.opcua.iiot.core.basics.regex_ns_i = /ns=([0-9]+);i=([0-9]+)/
de.biancoroyal.opcua.iiot.core.basics.regex_ns_s = /ns=([0-9]+);s=(.*)/
de.biancoroyal.opcua.iiot.core.basics.regex_ns_b = /ns=([0-9]+);b=(.*)/
de.biancoroyal.opcua.iiot.core.basics.regex_ns_g = /ns=([0-9]+);g=(.*)/

de.biancoroyal.opcua.iiot.core.basics.parseNamspaceFromMsgTopic = function (msg) {
  let nodeNamespace = null

  if (msg && msg.topic) {
    // TODO: real parsing instead of string operations
    // TODO: which type are relevant here? (String, Integer ...)
    nodeNamespace = msg.topic.substring(3, msg.topic.indexOf(';'))
  }

  return nodeNamespace
}

de.biancoroyal.opcua.iiot.core.basics.parseNamspaceFromItemNodeId = function (item) {
  let nodeNamespace = null
  const nodeItem = item.nodeId || item

  if (nodeItem) {
    // TODO: real parsing instead of string operations
    // TODO: which type are relevant here? (String, Integer ...)
    nodeNamespace = nodeItem.substring(3, nodeItem.indexOf(';'))
  }

  return nodeNamespace
}

de.biancoroyal.opcua.iiot.core.basics.parseForNodeIdentifier = function (nodeItem) {
  let nodeIdentifier = null

  if (nodeItem) {
    // TODO: real parsing instead of string operations
    if (nodeItem.includes(';i=')) {
      nodeIdentifier = {
        identifier: parseInt(nodeItem.substring(nodeItem.indexOf(';i=') + 3)),
        type: de.biancoroyal.opcua.iiot.core.basics.nodeOPCUAId.NodeIdType.NUMERIC
      }
    } else if (nodeItem.includes(';g=')) {
      nodeIdentifier = {
        identifier: nodeItem.substring(nodeItem.indexOf(';g=') + 3),
        type: de.biancoroyal.opcua.iiot.core.basics.nodeOPCUAId.NodeIdType.GUID
      }
    } else {
      if (nodeItem.includes(';b=')) {
        nodeIdentifier = {
          identifier: nodeItem.substring(nodeItem.indexOf(';b=') + 3),
          type: de.biancoroyal.opcua.iiot.core.basics.nodeOPCUAId.NodeIdType.BYTESTRING
        }
      } else {
        nodeIdentifier = {
          identifier: nodeItem.substring(nodeItem.indexOf(';s=') + 3),
          type: de.biancoroyal.opcua.iiot.core.basics.nodeOPCUAId.NodeIdType.STRING
        }
      }
    }
  }
  return nodeIdentifier
}

de.biancoroyal.opcua.iiot.core.basics.parseIdentifierFromMsgTopic = function (msg) {
  return this.parseForNodeIdentifier(msg.topic)
}

de.biancoroyal.opcua.iiot.core.basics.parseIdentifierFromItemNodeId = function (item) {
  return this.parseForNodeIdentifier(item.nodeId || item)
}

de.biancoroyal.opcua.iiot.core.basics.newOPCUANodeIdFromItemNodeId = function (item) {
  const namespace = this.parseNamspaceFromItemNodeId(item)
  const nodeIdentifier = this.parseIdentifierFromItemNodeId(item)

  this.internalDebugLog('newOPCUANodeIdFromItemNodeId: ' + JSON.stringify(item) + ' -> ' + JSON.stringify(nodeIdentifier) + ' namespace:' + namespace)
  return new de.biancoroyal.opcua.iiot.core.basics.nodeOPCUAId.NodeId(nodeIdentifier.type, nodeIdentifier.identifier, namespace)
}

de.biancoroyal.opcua.iiot.core.basics.newOPCUANodeIdFromMsgTopic = function (msg) {
  const namespace = this.parseNamspaceFromMsgTopic(msg)
  const nodeIdentifier = this.parseIdentifierFromMsgTopic(msg)

  this.internalDebugLog('newOPCUANodeIdFromMsgTopic: ' + JSON.stringify(nodeIdentifier))
  return new de.biancoroyal.opcua.iiot.core.basics.nodeOPCUAId.NodeId(nodeIdentifier.type, nodeIdentifier.identifier, namespace)
}

de.biancoroyal.opcua.iiot.core.basics.pushItemToWriteList = function (msg, nodesToWrite, item, value) {
  const opcua = this.nodeOPCUA

  nodesToWrite.push({
    nodeId: this.newOPCUANodeIdFromItemNodeId(item),
    attributeId: opcua.AttributeIds.Value,
    indexRange: null,
    value
  })
}
de.biancoroyal.opcua.iiot.core.basics.buildNodesToWrite = function (msg) {
  const core = this
  const nodesToWrite = []

  this.detailDebugLog('buildNodesToWrite input: ' + JSON.stringify(msg))
  let item = null

  // compatible mode to nodesToWrite of node-opcua
  if (!msg.addressSpaceItems || !msg.addressSpaceItems.length) {
    const itemList = msg.payload.nodesToWrite || msg.nodesToWrite
    if (itemList && itemList.length) {
      msg.addressSpaceItems = itemList
    }
  }

  if (msg.addressSpaceItems) {
    let index = 0
    if (msg.valuesToWrite) {
      for (item of msg.addressSpaceItems) {
        core.pushItemToWriteList(msg, nodesToWrite, item, { value: this.buildNewVariant(item.datatypeName, msg.valuesToWrite[index++], item.arraytypeName, item.dimensions) })
      }
    } else {
      for (item of msg.addressSpaceItems) {
        if (item.value) {
          core.pushItemToWriteList(msg, nodesToWrite, item, { value: this.buildNewVariant(item.datatypeName, item.value, item.arraytypeName, item.dimensions) })
        } else {
          core.pushItemToWriteList(msg, nodesToWrite, item, { value: this.buildNewVariant(item.datatypeName, (msg.payload.length && msg.payload.length === msg.addressSpaceItems.length) ? msg.payload[index++] : msg.payload, item.arraytypeName, item.dimensions) })
        }
      }
    }
  }

  this.internalDebugLog('buildNodesToWrite output: ' + JSON.stringify(nodesToWrite))

  return nodesToWrite
}

de.biancoroyal.opcua.iiot.core.basics.buildNodesToRead = function (msg) {
  const nodesToRead = []
  let item = null

  this.detailDebugLog('buildNodesToRead input: ' + JSON.stringify(msg))

  const nodePayloadList = msg.payload.nodesToRead || msg.payload.nodesToWrite
  if (nodePayloadList && nodePayloadList.length) {
    // read to read
    for (item of nodePayloadList) {
      item = item.nodeId || item
      nodesToRead.push(item.toString())
    }
  } else {
    const nodeList = msg.nodesToRead || msg.nodesToWrite
    if (nodeList && nodeList.length) {
      // legacy
      for (item of nodeList) {
        item = item.nodeId || item
        nodesToRead.push(item.toString())
      }
    } else {
      // new structure
      if (msg.payload.addressSpaceItems && msg.payload.addressSpaceItems.length) {
        for (item of msg.payload.addressSpaceItems) {
          nodesToRead.push(item.nodeId)
        }
      } else {
        if (msg.addressSpaceItems && msg.addressSpaceItems.length) {
          for (item of msg.addressSpaceItems) {
            nodesToRead.push(item.nodeId)
          }
        }
      }
    }
  }

  this.internalDebugLog('buildNodesToRead output: ' + JSON.stringify(nodesToRead))

  return nodesToRead
}

de.biancoroyal.opcua.iiot.core.basics.buildNodesToListen = function (msg) {
  return msg.addressItemsToRead || msg.addressSpaceItems
}

de.biancoroyal.opcua.iiot.core.basics.buildNodesFromBrowser = function (msg) {
  return msg.payload.browserResults || msg.addressSpaceItems
}

de.biancoroyal.opcua.iiot.core.basics.buildNodesFromCrawler = function (msg) {
  return msg.payload.crawlerResults || msg.addressSpaceItems
}

de.biancoroyal.opcua.iiot.core.basics.buildNodeListFromClient = function (msg) {
  switch (msg.nodetype) {
    case 'read':
    case 'write':
      return this.buildNodesToRead(msg)
    case 'listen':
      return this.buildNodesToListen(msg)
    case 'browse':
      return this.buildNodesFromBrowser(msg)
    case 'crawl':
      return this.buildNodesFromCrawler(msg)
    default:
      this.internalDebugLog('unknown node type injected to filter for ' + msg.nodetype)
      return []
  }
}

de.biancoroyal.opcua.iiot.core.basics.availableMemory = function () {
  return this.os.freemem() / this.os.totalmem() * 100.0
}

de.biancoroyal.opcua.iiot.core.basics.isSessionBad = function (err) {
  return (err.toString().includes('Session') ||
    err.toString().includes('Channel') ||
    err.toString().includes('Transaction') ||
    err.toString().includes('timeout') ||
    err.toString().includes('Connection'))
}

de.biancoroyal.opcua.iiot.core.basics.setNodeInitalState = function (nodeState, node) {
  switch (nodeState) {
    case 'INITOPCUA':
    case 'SESSIONREQUESTED':
      this.setNodeStatusTo(node, 'connecting')
      break
    case 'OPEN':
    case 'SESSIONCLOSED':
      node.bianco.iiot.opcuaClient = node.connector.bianco.iiot.opcuaClient
      this.setNodeStatusTo(node, 'connected')
      break
    case 'SESSIONACTIVE':
      node.bianco.iiot.opcuaSession = node.connector.bianco.iiot.opcuaSession
      this.setNodeStatusTo(node, 'active')
      break
    case 'LOCKED':
      this.setNodeStatusTo(node, 'locked')
      break
    case 'UNLOCKED':
      this.setNodeStatusTo(node, 'unlocked')
      break
    case 'STOPPED':
      this.setNodeStatusTo(node, 'stopped')
      break
    case 'END':
      this.setNodeStatusTo(node, 'end')
      break
    default:
      this.setNodeStatusTo(node, 'waiting')
  }
}

de.biancoroyal.opcua.iiot.core.basics.isNodeId = function (nodeId) {
  if (!nodeId || !nodeId.identifierType) {
    return false
  }

  switch (nodeId.identifierType) {
    case this.nodeOPCUA.NodeIdType.NUMERIC:
    case this.nodeOPCUA.NodeIdType.STRING:
    case this.nodeOPCUA.NodeIdType.GUID:
      return true
    default:
      return false
  }
}

de.biancoroyal.opcua.iiot.core.basics.checkConnectorState = function (node, msg, callerType) {
  this.internalDebugLog('Check Connector State ' + node.connector.bianco.iiot.stateMachine.getMachineState() + ' By ' + callerType)

  if (node.connector && node.connector.bianco.iiot.stateMachine && node.connector.bianco.iiot.stateMachine.getMachineState() !== this.RUNNING_STATE) {
    this.internalDebugLog('Wrong Client State ' + node.connector.bianco.iiot.stateMachine.getMachineState() + ' By ' + callerType)
    if (node.showErrors) {
      node.error(new Error('Client Not ' + this.RUNNING_STATE + ' On ' + callerType), msg)
    }
    this.setNodeStatusTo(node, 'not running')
    node.emit('opcua_client_not_ready')
    return false
  } else {
    return true
  }
}

de.biancoroyal.opcua.iiot.core.basics.setNodeOPCUAConnected = function (node, opcuaClient) {
  if (this.isInitializedBiancoIIoTNode(node)) {
    node.bianco.iiot.opcuaClient = opcuaClient
  }
  this.setNodeStatusTo(node, 'connecting')
}

de.biancoroyal.opcua.iiot.core.basics.setNodeOPCUAClosed = function (node) {
  if (this.isInitializedBiancoIIoTNode(node)) {
    node.bianco.iiot.opcuaClient = null
  }
  this.setNodeStatusTo(node, 'disconnected')
}

de.biancoroyal.opcua.iiot.core.basics.setNodeOPCUALost = function (node) {
  this.setNodeStatusTo(node, 'lost')
}

de.biancoroyal.opcua.iiot.core.basics.setNodeOPCUASessionStarted = function (node, opcuaSession) {
  if (this.isInitializedBiancoIIoTNode(node)) {
    node.bianco.iiot.opcuaSession = opcuaSession
  }
  this.setNodeStatusTo(node, 'active')
}

de.biancoroyal.opcua.iiot.core.basics.setNodeOPCUASessionClosed = function (node) {
  if (this.isInitializedBiancoIIoTNode(node)) {
    node.bianco.iiot.opcuaSession = null
  }
  this.setNodeStatusTo(node, 'connecting')
}

de.biancoroyal.opcua.iiot.core.basics.setNodeOPCUASessionRestart = function (node) {
  this.setNodeStatusTo(node, 'restart')
}

de.biancoroyal.opcua.iiot.core.basics.setNodeOPCUASessionError = function (node) {
  if (this.isInitializedBiancoIIoTNode(node)) {
    node.bianco.iiot.opcuaSession = null
  }
  this.setNodeStatusTo(node, 'connecting')
}

de.biancoroyal.opcua.iiot.core.basics.setNodeOPCUARestart = function (node, opcuaClient) {
  this.internalDebugLog('Connector Restart')
  if (opcuaClient && this.isInitializedBiancoIIoTNode(node)) {
    node.bianco.iiot.opcuaClient = opcuaClient
  }
  this.setNodeStatusTo(node, 'connecting')
}

de.biancoroyal.opcua.iiot.core.basics.registerToConnector = function (node) {
  const core = this

  if (!node) {
    core.internalDebugLog('Node Not Valid On Register To Connector')
    return
  }

  if (!node.connector) {
    node.error(new Error('Connector Config Node Not Valid On Registering Client Node ' + node.id), { payload: 'No Connector Configured' })
    return
  }

  node.connector.bianco.iiot.registerForOPCUA(node)

  node.connector.on('connector_init', () => {
    if (node.bianco.iiot.opcuaClient) {
      node.bianco.iiot.opcuaClient = null
    }

    if (node.bianco.iiot.opcuaSession) {
      node.bianco.iiot.opcuaSession = null
    }
  })

  node.connector.on('connection_started', (opcuaClient) => {
    core.setNodeOPCUAConnected(node, opcuaClient)
  })

  node.connector.on('server_connection_close', () => {
    core.setNodeOPCUAClosed(node)
  })

  node.connector.on('server_connection_abort', () => {
    core.setNodeOPCUAClosed(node)
  })

  node.connector.on('connection_closed', () => {
    core.setNodeOPCUAClosed(node)
  })

  node.connector.on('server_connection_lost', () => {
    core.setNodeOPCUALost(node)
  })

  node.connector.on('reset_opcua_connection', () => {
    core.setNodeOPCUASessionClosed(node)
  })

  node.connector.on('session_started', (opcuaSession) => {
    core.setNodeOPCUASessionStarted(node, opcuaSession)
  })

  node.connector.on('session_closed', () => {
    core.setNodeOPCUASessionClosed(node)
  })

  node.connector.on('session_restart', () => {
    core.setNodeOPCUAClosed(node)
  })

  node.connector.on('session_error', () => {
    core.setNodeOPCUASessionError(node)
  })

  node.connector.on('after_reconnection', () => {
    core.setNodeOPCUARestart(node)
  })

  core.setNodeInitalState(node.connector.bianco.iiot.stateMachine.getMachineState(), node)
}

de.biancoroyal.opcua.iiot.core.basics.deregisterToConnector = function (node, done) {
  const core = this
  if (!node) {
    core.internalDebugLog('Node Not Valid On Register To Connector')
    done()
    return
  }

  if (!node.connector) {
    node.error(new Error('Connector Not Valid On Register To Connector'), { payload: 'No Connector Configured' })
    done()
    return
  }

  node.connector.removeAllListeners()
  if (this.isInitializedBiancoIIoTNode(node.connector)) {
    node.connector.bianco.iiot.deregisterForOPCUA(node, done)
  }
}

de.biancoroyal.opcua.iiot.core.basics.checkSessionNotValid = function (session, callerType) {
  if (!session) {
    this.internalDebugLog('Session Not Valid On Check For ' + callerType)
    return true
  }

  if (session.sessionId === 'terminated') {
    this.internalDebugLog('Session Is Valid But Terminated On Check For ' + callerType)
    return true
  }

  return false
}

de.biancoroyal.opcua.iiot.core.basics.setNodeStatusTo = function (node, statusValue) {
  const statusParameter = this.getNodeStatus(statusValue, node.showStatusActivities)
  if (!this.underscore.isEqual(node.oldStatusParameter, statusParameter)) {
    this.detailDebugLog('Node ' + node.id + ' Status To ' + statusValue)
    node.oldStatusParameter = statusParameter
    node.status({ fill: statusParameter.fill, shape: statusParameter.shape, text: statusParameter.status })
  }
}

de.biancoroyal.opcua.iiot.core.basics.createBiancoIIoT = function () {
  return { iiot: {} }
}

de.biancoroyal.opcua.iiot.core.basics.initClientNode = function (node) {
  node.bianco = this.createBiancoIIoT()
  node.bianco.iiot.reconnectTimeout = this.DEFAULT_TIMEOUT
  node.bianco.iiot.sessionTimeout = null
  node.bianco.iiot.opcuaSession = null
  node.bianco.iiot.opcuaClient = null
  return node
}

de.biancoroyal.opcua.iiot.core.basics.initCoreServerNode = function (node) {
  node.bianco = this.createBiancoIIoT()
  node.bianco.iiot.initialized = false
  node.bianco.iiot.opcuaServer = null
  return node
}

de.biancoroyal.opcua.iiot.core.basics.getItemFilterValueWithElement = function (item, element) {
  let filterValue = null

  switch (element.name) {
    case 'browseName':
    case 'statusCode':
      filterValue = item[element.name].name
      break
    case 'displayName':
      filterValue = item[element.name].text
      break
    case 'value':
    case 'dataType':
      if (item.value && {}.hasOwnProperty.call(item.value, 'value')) {
        filterValue = item.value[element.name]
      } else {
        filterValue = item[element.name]
      }
      break
    default:
      filterValue = item[element.name]
  }

  return filterValue
}

de.biancoroyal.opcua.iiot.core.basics.handleErrorInsideNode = function (node, err) {
  this.internalDebugLog(typeof node + ' ' + err.message)
  if (node.showErrors) {
    node.error(err, { payload: err.message })
  }
}

de.biancoroyal.opcua.iiot.core.basics.checkCrawlerItemIsNotToFilter = function (node, item, element, result) {
  try {
    let filterValue = this.getItemFilterValueWithElement(item, element)

    if (filterValue && filterValue.key && filterValue.key.match) {
      if (filterValue.key.match(element.value)) {
        result &= false
      }
    } else {
      if (filterValue && filterValue.match) {
        if (filterValue.match(element.value)) {
          result &= false
        }
      } else {
        if (filterValue && filterValue.toString) {
          filterValue = filterValue.toString()
          if (filterValue && filterValue.match) {
            if (filterValue.match(element.value)) {
              result &= false
            }
          }
        }
      }
    }
  } catch (err) {
    this.handleErrorInsideNode(node, err)
  }

  return result
}

de.biancoroyal.opcua.iiot.core.basics.checkResponseItemIsNotToFilter = function (node, item, element, result) {
  try {
    let filterValue = this.getItemFilterValueWithElement(item, element)

    if (filterValue) {
      if (filterValue.key && filterValue.key.match) {
        result &= filterValue.key.match(element.value) !== null
      } else {
        if (filterValue.match) {
          result &= filterValue.match(element.value) !== null
        } else {
          if (filterValue.toString) {
            filterValue = filterValue.toString()
            if (filterValue.match) {
              result &= filterValue.match(element.value) !== null
            }
          }
        }
      }
    } else {
      result &= false // undefined items
    }
  } catch (err) {
    this.handleErrorInsideNode(node, err)
  }

  return result
}

de.biancoroyal.opcua.iiot.core.basics.checkItemForUnsetState = function (node, item) {
  let result = true

  if (node.activateUnsetFilter) {
    result &= item !== null

    if (item && {}.hasOwnProperty.call(item, 'value')) {
      if (item.value && {}.hasOwnProperty.call(item.value, 'value')) {
        result &= item.value.value !== null
      } else {
        result &= item.value !== null
      }
    }
  }

  return result
}

de.biancoroyal.opcua.iiot.core.basics.resetBiancoNode = function (node) {
  if (this.isInitializedBiancoIIoTNode(node) && node.bianco.iiot.resetAllTimer) {
    node.bianco.iiot.resetAllTimer()
  }
  if (this.isInitializedBiancoIIoTNode(node)) {
    node.bianco.iiot = null
  }
  node.bianco = null
}

de.biancoroyal.opcua.iiot.core.basics.filterListEntryByNodeId = function (nodeId, list) {
  const result = []

  if (list && list.length) {
    list.forEach((item) => {
      if (item === nodeId) {
        result.push(item)
      }
    })
  }

  return result
}

de.biancoroyal.opcua.iiot.core.basics.filterListByNodeId = function (nodeId, list) {
  const result = []

  if (list && list.length) {
    list.forEach((item) => {
      if (item.nodeId === nodeId) {
        result.push(item)
      }
    })
  }

  return result
}

de.biancoroyal.opcua.iiot.core.basics.isNodeTypeToFilterResponse = function (msg) {
  return msg.nodetype === 'read' || msg.nodetype === 'browse' || msg.nodetype === 'crawl' || msg.nodetype === 'method'
}

de.biancoroyal.opcua.iiot.core.basics.isInitializedBiancoIIoTNode = function (node) {
  return node && node.bianco && node.bianco.iiot
}

module.exports = de.biancoroyal.opcua.iiot.core.basics
