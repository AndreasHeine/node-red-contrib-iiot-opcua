/*
 The BSD 3-Clause License

 Copyright 2017,2018,2019 - Klaus Landsdorf (https://bianco-royal.com/)
 All rights reserved.
 node-red-contrib-iiot-opcua
 */
'use strict'

jest.setTimeout(5000)

const coreBasics = require('../../src/core/opcua-iiot-core')
const coreConnector = require('../../src/core/opcua-iiot-core-connector')
const events = require('events')

describe('OPC UA Core Connector', function () {
  describe('core functions', function () {
    it('should have IDLE state', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      done()
    })

    it('should change to INITOPCUA state', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.subscribe(state => {
        if (state.matches('initopcua')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to OPEN state', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.subscribe(state => {
        if (state.matches('open')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to CLOSED state', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('CLOSED')
      service.subscribe(state => {
        if (state.matches('close')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to END state from OPEN', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('END')
      service.subscribe(state => {
        if (state.matches('end')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to END state from CLOSE', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('CLOSED')
      service.send('END')
      service.subscribe(state => {
        if (state.matches('end')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to END state from LOCKED', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('LOCKED')
      service.send('END')
      service.subscribe(state => {
        if (state.matches('end')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to LOCKED state from INIT', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('LOCKED')
      service.subscribe(state => {
        if (state.matches('lock')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to LOCKED state from OPEN', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('LOCKED')
      service.subscribe(state => {
        if (state.matches('lock')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to LOCKED state from CLOSE', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('CLOSED')
      service.send('LOCKED')
      service.subscribe(state => {
        if (state.matches('lock')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to UNLOCKED state from CLOSE', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('CLOSED')
      service.send('LOCKED')
      service.send('UNLOCKED')
      service.subscribe(state => {
        if (state.matches('unlock')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to INIT state from UNLOCKED', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('CLOSED')
      service.send('LOCKED')
      service.send('UNLOCKED')
      service.send('IDLE')
      service.send('INITOPCUA')
      service.subscribe(state => {
        if (state.matches('initopcua')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to IDLE state from UNLOCKED', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('CLOSED')
      service.send('LOCKED')
      service.send('UNLOCKED')
      service.send('IDLE')
      service.subscribe(state => {
        if (state.matches('idle')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to OPEN state from UNLOCKED', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('CLOSED')
      service.send('LOCKED')
      service.send('UNLOCKED')
      service.send('OPEN')
      service.subscribe(state => {
        if (state.matches('open')) {
          service.stop()
          done()
        }
      })
    })

    it('should change to LOCKED state on OPC UA event backoff', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      const node = {
        bianco: {
          iiot: {
            opcuaClient: new events.EventEmitter(),
            stateMachine: fsm,
            actualServiceState: fsm.initialState,
            stateService: service
          }
        }
      }
      coreConnector.setListenerToClient(node)
      node.bianco.iiot.opcuaClient.emit('backoff')
      service.subscribe(state => {
        if (state.matches('lock')) {
          node.bianco.iiot.opcuaClient.removeAllListeners()
          done()
        }
      })
    })

    it('should change to UNLOCKED state on OPC UA event connection reestablished', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      const node = {
        bianco: {
          iiot: {
            opcuaClient: new events.EventEmitter(),
            stateMachine: fsm,
            actualServiceState: fsm.initialState,
            stateService: service
          }
        }
      }
      coreConnector.setListenerToClient(node)
      service.send('LOCKED')
      node.bianco.iiot.opcuaClient.emit('connection_reestablished')
      service.subscribe(state => {
        if (state.matches('unlock')) {
          node.bianco.iiot.opcuaClient.removeAllListeners()
          done()
        }
      })
    })

    it('should change to LOCKED state on OPC UA event start reconnection', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      const node = {
        bianco: {
          iiot: {
            opcuaClient: new events.EventEmitter(),
            stateMachine: fsm,
            actualServiceState: fsm.initialState,
            stateService: service
          }
        }
      }
      coreConnector.setListenerToClient(node)
      node.bianco.iiot.opcuaClient.emit('start_reconnection')
      service.subscribe(state => {
        if (state.matches('lock')) {
          node.bianco.iiot.opcuaClient.removeAllListeners()
          done()
        }
      })
    })

    it('should change to OPEN state on OPC UA event timed out request', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      const node = {
        bianco: {
          iiot: {
            opcuaClient: new events.EventEmitter(),
            stateMachine: fsm,
            actualServiceState: fsm.initialState,
            stateService: service
          }
        }
      }
      coreConnector.setListenerToClient(node)
      node.bianco.iiot.opcuaClient.emit('timed_out_request')
      service.subscribe(state => {
        if (state.matches('idle')) {
          node.bianco.iiot.opcuaClient.removeAllListeners()
          done()
        }
      })
    })

    it('should change to SESSIONACTIVE state on OPC UA event security token renewed', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      const node = {
        bianco: {
          iiot: {
            opcuaClient: new events.EventEmitter(),
            stateMachine: fsm,
            actualServiceState: fsm.initialState,
            stateService: service
          }
        }
      }
      coreConnector.setListenerToClient(node)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('SESSIONREQUESTED')
      service.send('SESSIONACTIVE')
      node.bianco.iiot.opcuaClient.emit('security_token_renewed')
      service.subscribe(state => {
        if (state.matches('sessionactive')) {
          node.bianco.iiot.opcuaClient.removeAllListeners()
          done()
        }
      })
    })

    it('should change to UNLOCKED state on OPC UA event after reconnection', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      const node = new events.EventEmitter()
      node.bianco = coreBasics.createBiancoIIoT()
      node.bianco.iiot.opcuaClient = new events.EventEmitter()
      node.bianco.iiot.stateMachine = fsm
      node.bianco.iiot.stateService = service
      coreConnector.setListenerToClient(node)
      service.send('INITOPCUA')
      service.send('OPEN')
      service.send('SESSIONREQUESTED')
      service.send('SESSIONACTIVE')
      service.send('LOCKED')
      node.bianco.iiot.opcuaClient.emit('after_reconnection')
      service.subscribe(state => {
        if (state.matches('unlock')) {
          node.bianco.iiot.opcuaClient.removeAllListeners()
          done()
        }
      })
    })

    it('should be IDLE state on OPC UA log session parameter', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      const node = new events.EventEmitter()
      node.bianco = coreBasics.createBiancoIIoT()
      node.bianco.iiot.opcuaClient = new events.EventEmitter()
      node.endpoint = 'opc.tcp://localhost'
      node.bianco.iiot.opcuaSession = {
        name: 'name',
        sessionId: 1,
        authenticationToken: '23434cc34566',
        serverSignature: 'serverSignature',
        lastRequestSentTime: new Date(),
        lastResponseReceivedTime: new Date()
      }
      node.bianco.iiot.stateMachine = fsm
      node.bianco.iiot.stateService = service
      coreConnector.logSessionInformation(node)
      expect(fsm.initialState.value).toBe('idle')
      expect(node.bianco.iiot.opcuaSession.name).toBe('name')
      node.bianco.iiot.opcuaClient.removeAllListeners()
      done()
    })

    it('should handle OPC UA close event on State Lock', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      const node = new events.EventEmitter()
      node.bianco = coreBasics.createBiancoIIoT()
      node.bianco.iiot.opcuaClient = new events.EventEmitter()
      node.bianco.iiot.stateMachine = fsm
      node.bianco.iiot.stateService = service
      node.bianco.iiot.actualServiceState = fsm.initialState
      node.bianco.iiot.isInactiveOnOPCUA = () => { return false }
      node.bianco.iiot.resetOPCUAConnection = () => { return true }
      coreConnector.setListenerToClient(node)
      service.subscribe(state => {
        node.bianco.iiot.actualServiceState = state
      })
      service.send('LOCKED')
      node.on('server_connection_close', () => {
        expect(node.bianco.iiot.actualServiceState.value).toBe('lock')
        done()
      })
      node.bianco.iiot.opcuaClient.emit('close')
    })

    it('should handle OPC UA close event on State Stopped', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      const node = new events.EventEmitter()
      node.bianco = coreBasics.createBiancoIIoT()
      node.bianco.iiot.opcuaClient = new events.EventEmitter()
      node.bianco.iiot.stateMachine = fsm
      node.bianco.iiot.stateService = service
      node.bianco.iiot.actualServiceState = fsm.initialState
      node.bianco.iiot.isInactiveOnOPCUA = () => { return true }
      node.bianco.iiot.resetOPCUAConnection = () => { return true }
      coreConnector.setListenerToClient(node)
      service.subscribe(state => {
        node.bianco.iiot.actualServiceState = state
      })
      service.send('LOCKED')
      service.send('STOPPED')
      node.on('server_connection_close', () => {
        expect(node.bianco.iiot.actualServiceState.value).toBe('stopopcua')
        node.bianco.iiot.opcuaClient.removeAllListeners()
        node.removeAllListeners()
        done()
      })
      node.bianco.iiot.opcuaClient.emit('close')
    })

    it('should handle OPC UA abort event on State Stopped', function (done) {
      const fsm = coreConnector.createStateMachineService()
      expect(fsm.initialState.value).toBe('idle')
      const service = coreConnector.startStateService(fsm)
      const node = new events.EventEmitter()
      node.bianco = coreBasics.createBiancoIIoT()
      node.bianco.iiot.opcuaClient = new events.EventEmitter()
      node.bianco.iiot.stateMachine = fsm
      node.bianco.iiot.stateService = service
      node.bianco.iiot.actualServiceState = fsm.initialState
      node.bianco.iiot.isInactiveOnOPCUA = () => { return true }
      node.bianco.iiot.resetOPCUAConnection = () => { return true }
      coreConnector.setListenerToClient(node)
      service.subscribe(state => {
        node.bianco.iiot.actualServiceState = state
      })
      service.send('LOCKED')
      service.send('STOPPED')
      node.on('server_connection_abort', () => {
        expect(node.bianco.iiot.actualServiceState.value).toBe('stopopcua')
        node.bianco.iiot.opcuaClient.removeAllListeners()
        node.removeAllListeners()
        done()
      })
      node.bianco.iiot.opcuaClient.emit('abort')
    })

    it('should handle no session on session information log', function (done) {
      const node = new events.EventEmitter()
      node.bianco = coreBasics.createBiancoIIoT()
      node.bianco.iiot.opcuaClient = null
      node.bianco.iiot.opcuaSession = null
      coreConnector.logSessionInformation(node)
      done()
    })
  })
})
