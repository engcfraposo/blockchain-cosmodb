const sha256 =require("crypto-js/sha256");
const { v4: uuid } = require('uuid');

module.exports = class Block {
    constructor(index=0, previousHash = null, data = "Genesis Block", difficulty = 3) {
        this.index = index;
        this.transactionId = uuid();
        this.previousHash = previousHash;
        this.data = JSON.stringify(data);
        this.timestamp = new Date();
        this.nonce = 0;
 
        const prefix = new Array(difficulty + 1).join("0");
        const postfix = new Array(difficulty).join("9");
        this.mine(prefix, postfix);
    }

    mine(prefix, postfix) {
        do {
            this.nonce++;
            this.hash = this.generateHash();
        }
        while (!(this.hash.startsWith(prefix) && this.hash.endsWith(postfix)));
    }

    generateHash() {
        return sha256(this.index + this.previousHash + JSON.stringify(this.data) + this.timestamp + this.nonce + this.transactionId).toString();
    }
}