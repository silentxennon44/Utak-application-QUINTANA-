

export function getLeafNodes(nestedObj: { [s: string]: any; }) {
  // Initialize an array to store the leaf nodes
  let leafNodes:any = [];

  // Recursive function to traverse the nested object
  function traverse(obj: { [s: string]: any; }) {
      // Check if the current object has any nested objects as values
      const hasNested = Object.values(obj).some(value => typeof value === 'object' && value !== null);
      
      // If no nested objects, add all keys to leafNodes
      if (!hasNested) {
        // console.log(obj.src)
        // leafNodes.push(...Object.keys(obj));
        if (typeof obj.src === 'string'){
          leafNodes.push(obj.src);
        }
      } else {
          // Otherwise, recurse into nested objects
          for (let key in obj) {
              if (typeof obj[key] === 'object' && obj[key] !== null) {
                  traverse(obj[key]);
              }
          }
      }
  }

  // Start traversal from the root object
  traverse(nestedObj);
  return leafNodes;
}