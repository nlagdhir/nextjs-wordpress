import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocksJSON) => {

    // Required this as we are using inMemoryCache so if we need to modify result of 
    // Graphql data then we will need to create new object. 
    const blocks = JSON.parse(JSON.stringify(blocksJSON));

    // Assign unique ID as wordpress is not providing that
    const assignIds = (b) => {
        b.forEach(block => {
            block.id = uuid();
            if(block.innerBlocks?.length){
                // recursion use here
                assignIds(block.innerBlocks);
            }
        })
    }

    assignIds(blocks);

    return blocks;

}