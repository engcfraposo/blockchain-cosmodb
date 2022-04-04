const Blockchain = require("../../services/blockchain");

module.exports = {
    find: async (_request, response) => {
        const blockchain = new Blockchain();
        await blockchain.getAllBlocks();
        return response
        .status(200)
        .json(blockchain);
    },    
    insert: async (request, response) => {
        try {
            const { from, to, value } = request.body;
            const blockchain = new Blockchain();
            await blockchain.getAllBlocks();
            await blockchain.addBlock({from, to, value});
            const currentBlock = blockchain.chain[blockchain.chain.length - 1];
            return response
            .status(200)
            .json(currentBlock);
        } catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    }    
}