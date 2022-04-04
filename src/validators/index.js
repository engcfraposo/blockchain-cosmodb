const {validate} = require("uuid");

module.exports = {
    isValidBlock: (currentBlock, previousBlock) => {
        if(currentBlock.hash !== currentBlock.generateHash()){
            return new Error("Invalid hash");
        }
        if(currentBlock.index !== previousBlock.index + 1){
            throw new Error("Invalid index");
        }
        if(currentBlock.previousHash !== previousBlock.hash){
            throw new Error("Invalid previous hash");
        }
        if(!validate(currentBlock.transactionId) && !validate(previousBlock.transactionId)){
            throw new Error("Invalid transaction id");
        }
        return true;
    },
    audit: (chain) =>{
        if(Array.isArray(chain) && chain.length > 0){
            for(let i = chain.length -1; i>0; i--){
                const currentBlock = chain[i];
                const previousBlock = chain[i-1];
                if(currentBlock.hash !== currentBlock.generateHash()){
                    return false;
                }
                if(currentBlock.index === previousBlock.nextIndex){
                    return false;
                }
                if(currentBlock.previousHash !== previousBlock.hash){
                    return false;
                }
                if(!validate(currentBlock.transactionId) && !validate(previousBlock.transactionId)){
                    return false;
                }
                if(currentBlock.transactionId === previousBlock.transactionId){
                    return false;
                }
            }
        }
        return true;
    }
}