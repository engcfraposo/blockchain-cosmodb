const Block = require("../models/Block");

module.exports = {
   getAllBlocks: async () => {
        const blocks = await Block.find();
        return blocks
   },
   insertNewBlock: (data) => {
        const block = new Block(data);
        return block.save();
   }
}