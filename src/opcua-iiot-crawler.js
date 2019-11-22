/*
 The BSD 3-Clause License

 Copyright 2016,2017,2018,2019 - Klaus Landsdorf (https://bianco-royal.com/)
 Copyright 2015,2016 - Mika Karaila, Valmet Automation Inc. (node-red-contrib-opcua)
 All rights reserved.
 node-red-contrib-iiot-opcua
 */
'use strict'

/**
 * Crawler Node-RED node.
 *
 * @param RED
 */
module.exports = function (RED) {
  // SOURCE-MAP-REQUIRED
  const coreBasics = require('./core/opcua-iiot-core')
  const coreBrowser = require('./core/opcua-iiot-core-browser')

  function OPCUAIIoTCrawler (config) {
    RED.nodes.createNode(this, config)

    this.name = config.name
    this.justValue = config.justValue
    this.singleResult = config.singleResult
    this.showStatusActivities = config.showStatusActivities
    this.showErrors = config.showErrors
    this.activateUnsetFilter = config.activateUnsetFilter
    this.activateFilters = config.activateFilters
    this.negateFilter = config.negateFilter
    this.filters = config.filters
    this.delayPerMessage = config.delayPerMessage || 0.2

    this.connector = RED.nodes.getNode(config.connector)

    const node = coreBrowser.initBrowserNode(this)
    coreBasics.assert(node.bianco.iiot)
    node.bianco.iiot.delayMessageTimer = []

    node.bianco.iiot.filterCrawlerResults = function (crawlerResultToFilter) {
      let crawlerResult = crawlerResultToFilter || []
      const filteredEntries = []

      if (node.activateFilters && node.filters && node.filters.length > 0) {
        crawlerResult.forEach(function (item) {
          if (node.bianco.iiot.itemIsNotToFilter(item)) {
            filteredEntries.push(item)
          }
        })
        crawlerResult = filteredEntries
      }

      if (node.justValue) {
        crawlerResult.forEach(function (item) {
          if (item.references) {
            delete item.references
          }
        })
      }

      return crawlerResult
    }

    node.bianco.iiot.itemIsNotToFilter = function (item) {
      let result = coreBasics.checkItemForUnsetState(node, item)

      if (result) {
        node.filters.forEach(function (element) {
          result = coreBasics.checkCrawlerItemIsNotToFilter(node, item, element, result)
        })
      }

      return (node.negateFilter) ? !result : result
    }

    node.bianco.iiot.crawl = function (session, msg) {
      if (coreBasics.checkSessionNotValid(node.bianco.iiot.opcuaSession, 'Crawler')) {
        return
      }

      coreBrowser.internalDebugLog('Browse Topic To Call Crawler ' + node.browseTopic)

      if (node.showStatusActivities) {
        coreBasics.setNodeStatusTo(node, 'crawling')
      }

      coreBrowser.crawl(session, node.browseTopic, msg)
        .then(function (result) {
          coreBrowser.internalDebugLog(result.rootNodeId + ' Crawler Results ' + result.crawlerResult.length)
          node.bianco.iiot.sendMessage(result.message, node.bianco.iiot.filterCrawlerResults(result.message, result.crawlerResult))
        }).catch(function (err) {
          coreBrowser.browseErrorHandling(node, err, msg)
        })
    }

    node.bianco.iiot.crawlForSingleResult = function (session, msg) {
      coreBrowser.crawlAddressSpaceItems(session, msg)
        .then(function (result) {
          coreBrowser.internalDebugLog(result.rootNodeId + ' Crawler Results ' + result.crawlerResult.length)
          node.bianco.iiot.sendMessage(result.message, node.bianco.iiot.filterCrawlerResults(result.crawlerResult))
        }).catch(function (err) {
          coreBrowser.browseErrorHandling(node, err, msg)
        })
    }

    node.bianco.iiot.crawlForResults = function (session, msg) {
      msg.addressSpaceItems.map((entry) => {
        coreBrowser.crawl(session, entry.nodeId)
          .then(function (result) {
            coreBrowser.internalDebugLog(result.rootNodeId + ' Crawler Results ' + result.crawlerResult.length)
            node.bianco.iiot.sendMessage(result.message, node.bianco.iiot.filterCrawlerResults(result.crawlerResult))
          }).catch(function (err) {
            coreBrowser.browseErrorHandling(node, err, msg)
          })
      })
    }

    node.bianco.iiot.crawlNodeList = function (session, msg) {
      if (node.showStatusActivities) {
        coreBasics.setNodeStatusTo(node, 'crawling')
      }

      if (node.singleResult) {
        node.bianco.iiot.crawlForSingleResult(session, msg)
      } else {
        node.bianco.iiot.crawlForResults(session, msg)
      }
    }

    node.bianco.iiot.sendMessage = function (originMessage, crawlerResult) {
      const msg = Object.assign({}, originMessage)
      msg.nodetype = 'crawl'

      const results = {
        crawlerResults: crawlerResult
      }

      try {
        RED.util.setMessageProperty(msg, 'payload', JSON.parse(JSON.stringify(results, null, 2)))
      } catch (err) {
        coreBrowser.writeDebugLog(err)
        if (node.showErrors) {
          node.error(err, msg)
        }
        msg.resultsConverted = JSON.stringify(results, null, 2)
        msg.error = err.message
      }

      if (node.browseTopic && node.browseTopic !== '') {
        msg.payload.browseTopic = node.browseTopic
      }

      if (!node.justValue) {
        msg.payload.crawlerResultsCount = crawlerResult.length
        if (node.connector) {
          msg.payload.endpoint = node.connector.endpoint
        }
        msg.payload.session = node.bianco.iiot.opcuaSession.name || 'none'
      }

      node.bianco.iiot.messageList.push(msg)

      if (node.showStatusActivities) {
        coreBasics.setNodeStatusTo(node, 'active')
      }

      // TODO: maybe here RED.util.set ...

      node.bianco.iiot.delayMessageTimer.push(setTimeout(() => {
        node.send(node.bianco.iiot.messageList.shift())
      }, node.delayPerMessage * coreBasics.FAKTOR_SEC_TO_MSEC))
    }

    node.bianco.iiot.resetAllTimer = function () {
      node.bianco.iiot.delayMessageTimer.forEach((timerId) => {
        clearTimeout(timerId)
        timerId = null
      })
    }

    node.bianco.iiot.startCrawling = function (msg) {
      if (node.browseTopic && node.browseTopic !== '') {
        node.bianco.iiot.crawl(node.bianco.iiot.opcuaSession, msg)
      } else {
        if (msg.addressItemsToBrowse) {
          msg.addressSpaceItems = msg.addressItemsToBrowse
        }

        if (msg.addressSpaceItems && msg.addressSpaceItems.length) {
          coreBrowser.internalDebugLog('Start Crawling On AddressSpace Items')
          node.bianco.iiot.crawlNodeList(node.bianco.iiot.opcuaSession, msg)
        } else {
          node.error(new Error('No AddressSpace Items Or Root To Crawl'), msg)
        }
      }
    }

    node.on('input', function (msg) {
      if (!coreBasics.checkConnectorState(node, msg, 'Crawler')) {
        return
      }

      node.browseTopic = coreBrowser.extractNodeIdFromTopic(msg, node)
      node.bianco.iiot.startCrawling(msg)
    })

    coreBasics.registerToConnector(node)

    node.on('close', (done) => {
      coreBasics.deregisterToConnector(node, () => {
        coreBasics.resetBiancoNode(node)
        done()
      })
    })
  }

  RED.nodes.registerType('OPCUA-IIoT-Crawler', OPCUAIIoTCrawler)
}
