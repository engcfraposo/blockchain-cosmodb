const Block = require("./block");
const BlockchainRepository = require("../repositories/BlockChainRepository");
const { isValidBlock, audit } = require('../validators');

module.exports = class Blockchain {
    constructor(){
        this.chain = [];
        this.nextIndex = 0;
        this.hasInconsistency = false;
        this.auditDate = new Date();
    }

    async getAllBlocks(){
        const result = await BlockchainRepository.getAllBlocks();
        if(result.length<1){
            const genesisBlock = await BlockchainRepository.insertNewBlock(new Block());
            this.chain.push(genesisBlock);
            audit();
            return; 
        }
        this.chain = result;
        this.nextIndex = this.chain.length;
    }

    getLastHash(){
        return this.chain[this.chain.length - 1].hash;
    }

    async addBlock(data){
            const oldHash = this.getLastHash();
            const newBlock = new Block(this.chain.length, oldHash, data);
            const validBlock = this.isValid(newBlock);
            if(validBlock){
                const result = await BlockchainRepository.insertNewBlock(new Block(this.nextIndex++, oldHash, data));
                this.chain.push(result);
            }
    }
    
    isValid(block){
        return isValidBlock(block, this.chain[this.chain.length - 1]);       
    }

    audit(){
        const result = audit(this.chain);
        this.hasInconsistency = result;
    }
}