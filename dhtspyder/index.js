'use strict'

const bencode = require('bencode')
const crypto = require('crypto')
const dgram = require('dgram')


const conf = require('./config')

const utils = require('./utils/index')

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
        setInterval(() => {
            // if (this.routingTable.isEmpty()) {

            //     return this.joinDHTNetWork()
            // }
            this.joinDHTNetWork()
            this.makeNeighbours();
        }, 1000);


    }

    joinDHTNetWork() {
        conf.BOOTSTRAP_NODES.forEach((node) => {
            this.findNode({
                address: node[0],
                port: node[1]
            });

        });
    }
    findNode(node, nid) {
        const _nid = nid != undefined ? utils.genNeighborID(nid, this.id) : this.id
        const msg = {
            t: crypto.randomBytes(2),
            y: 'q',
            q: 'find_node',
            a: {
                id: _nid,
                target: utils.randomId()
            }
        }
        this.sendKRPC(msg, node)
    }
    sendKRPC(msg, node) {
        const address = node.address
        const port = node.port
        const packet = bencode.encode(msg)
        const len = packet.length
        this.udp.send(packet, 0, len, port, address)
    }
    makeNeighbours() {
        this.routingTable.nodes.forEach((node) => {
            this.findNode({
                address: node.address,
                port: node.port
            }, node.nid);
        });
        this.routingTable.nodes = [];
    }
    _onMessageHandle(packet, res) {
        console.log(res)
        try {
            let msg = bencode.decode(packet)
            if (msg.y == 'r' && msg.r.nodes) {
                this._onFindNodeResponse(msg.r.nodes);
            } else if (msg.y == 'q' && msg.q == 'get_peers') {
                this._onGetPeersRequest(msg, node);
            } else if (msg.y == 'q' && msg.q == 'announce_peer') {
                this._onAnnouncePeerRequest(msg, node);
            }
        } catch (e) {

        }
    }
    _onFindNodeResponse(nodes) {
        let decodedNodes = utils.decodeNode(nodes)
        decodedNodes.forEach((node) => {
            node.address != this.address &&
                node.nid != this.nid &&
                node.port < 65536 &&
                node.port > 0 && this.routingTable.addNode(node)
        })
    }
    _onGetPeersRequest(msg, node) {
        try {
            var infohash = msg.a.info_hash;
            var tid = msg.t;
            var nid = msg.a.id;
            var token = infohash.slice(0, TOKEN_LENGTH);

            if (tid === undefined || infohash.length != 20 || nid.length != 20) {
                throw new Error;
            }
        } catch (err) {
            return;
        }
        this.sendKRPC({
            t: tid,
            y: 'r',
            r: {
                id: utils.genNeighborID(infohash, this.ktable.nid),
                nodes: '',
                token: token
            }
        }, node);


    }
    _onAnnouncePeerRequest(msg, node) {
        var port;

        try {
            var infohash = msg.a.info_hash;
            var token = msg.a.token;
            var nid = msg.a.id;
            var tid = msg.t;

            if (tid == undefined) {
                throw new Error;
            }
        } catch (err) {
            return;
        }

        if (infohash.slice(0, TOKEN_LENGTH).toString() != token.toString()) {
            return;
        }

        if (msg.a.implied_port != undefined && msg.a.implied_port != 0) {
            port = node.port;
        } else {
            port = msg.a.port || 0;
        }

        if (port >= 65536 || port <= 0) {
            return;
        }

        this.sendKRPC({
            t: tid,
            y: 'r',
            r: {
                id: genNeighborID(nid, this.ktable.nid)
            }
        }, node);

        console.log("magnet:?xt=urn:btih:%s from %s:%s", infohash.toString("hex"), node.address, node.port);
    }
    _onErrorHandle(e) {
        console.log(e)
    }
}


var a = new DHT(3000, '0.0.0.0')

a.setUp()