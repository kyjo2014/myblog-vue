'use strict'

const bencode = require('bencode')
const crypto = require('crypto')
const dgram = require('dgram')


const conf = require('./config')

// const utils = r

class RoutingTable {
    constructor(maxsize) {
        this.nodes = []
        this.maxsize = maxsize
    }
    addNode(node) {
        //防止不断新增node导致内存溢出
        if (this.nodes.length >= this.maxsize) {
            return
        }
        this.nodes.push(node)
    }
    isEmpty() {
        return this.nodes.length == 0
    }
}


class DHT {
    constructor(port, address) {
        this.address = address
        this.port = port
        this.id = utils.randomId()
        this.udp = dgram.createSocket('udp4')
        this.routingTable = new RoutingTable(100)
    }
    addEvent() {
        this.udp.on('error', this._onErrorHandle)
        this.udp.on('message', this._onMessageHandle)
        this.udp.once('listening', () => {
            console.log(`爬虫开始运行，监听:${this.address} ${this.port}`)
        })
        process.on('exit', code => `爬虫已退出 错误码${code}`)

    }
    setUp() {
        this.addEvent()
        //启动udp监听器
        let activeUdp = () => {
            if (this.address) {
                this.udp.bind(this.port, this.address)
            } else {
                this.udp.bind(this.port)
            }
        }
        activeUdp()
        if (this.routingTable.isEmpty()) {
            //当前无保存的活动节点,需要向超级节点寻求加入网络
            this.joinDHTNetWork()
        } else {
            const BOOTSTRAP_NODES = conf.BOOTSTRAP_NODES
            BOOTSTRAP_NODES.forEach((node) => {
                this.findNode(node)
            })
        }


    }

    ping() {

    }
    findNode(node, nid) {
        const _nid = nid != undefined ? utils.genNeighborID(nid, this.id) : this.id
        const msg = {
            t: crypto.randomBytes(2),
            y: 'p',
            q: 'find_node',
            a: {
                id,
                target: utils.randomId()
            }
        }
        this.sendKRPC(msg, node)
    }
    sendKRPC(msg, node) {
        const address = node.address
        const port = target.port
        const packet = bencode.encode(msg)
        const len = packet.length
        this.udp.send(packet, 0, len, port, address)
    }
    getPeers() {

    }
    announcePeer() {

    }
    _onMessageHandle(packet, res) {
        try {
            let msg = bencode.decode(packet)
            if (msg.y == 'r' && msg.r.nodes) {
                this.onFindNodeResponse(msg.r.nodes);
            } else if (msg.y == 'q' && msg.q == 'get_peers') {
                this.onGetPeersRequest(msg, rinfo);
            } else if (msg.y == 'q' && msg.q == 'announce_peer') {
                this.onAnnouncePeerRequest(msg, rinfo);
            }
        } catch (e) {
            
        }
    }
}