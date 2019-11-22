/*
 The BSD 3-Clause License

 Copyright 2018,2019 - Klaus Landsdorf (https://bianco-royal.com/)
 All rights reserved.
 node-red-contrib-iiot-opcua
 */
'use strict'

/**
 * Event Node-RED node.
 *
 * @param RED
 */
module.exports = function (RED) {
  // SOURCE-MAP-REQUIRED
  const coreBasics = require('./core/opcua-iiot-core')
  const coreConnector = require('./core/opcua-iiot-core-connector')

  function OPCUAIIoTFlexConnector (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name
    this.showStatusActivities = config.showStatusActivities
    this.showErrors = config.showErrors
    this.connector = RED.nodes.getNode(config.connector)

    const node = this
    node.bianco = coreBasics.createBiancoIIoT()
    coreBasics.assert(node.bianco.iiot)

    node.status({ fill: 'blue', shape: 'ring', text: 'new' })

    node.on('input', function (msg) {
      coreConnector.internalDebugLog('connector change request input')

      if (node.connector) {
        if (msg.payload.endpoint && msg.payload.endpoint.includes('opc.tcp:')) {
          coreConnector.internalDebugLog('connector change possible')
          coreConnector.internalDebugLog(msg.payload)
          node.connector.bianco.iiot.restartWithNewSettings(msg.payload, () => {
            coreConnector.internalDebugLog('connector change injected')
            node.send(msg)
          })
        } else {
          coreConnector.internalDebugLog('Connector Change Not Possible - Wrong Endpoint')
          node.error(new Error('Connector Change Not Possible - Wrong Endpoint'), msg)
        }
      } else {
        coreConnector.internalDebugLog('Connector Change Not Possible - No Connector')
        node.error(new Error('Connector Change Not Possible - No Connector'), msg)
      }
    })

    coreBasics.registerToConnector(node)

    node.on('close', (done) => {
      coreBasics.deregisterToConnector(node, () => {
        coreBasics.resetBiancoNode(node)
        done()
      })
    })
  }

  RED.nodes.registerType('OPCUA-IIoT-Flex-Connector', OPCUAIIoTFlexConnector)
}
