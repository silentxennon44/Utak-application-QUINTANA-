// import { helpers } from '@/utils';
/**
 * Extracts the filename without the leading dot and file extension.
 *
 * @param {string} filename - The original filename.
 * @return {string} The extracted filename without the leading dot and file extension.
 */
function processFilename(filename: string): string {
  // Use a regular expression to capture the filename without the leading dot and file extension
  const match = filename.match(/^(.*?)\.(png|jpg|jpeg|gif|svg)$/);

  // If a match is found, return the captured part; otherwise, return the original filename
  return match ? match[1] : filename;
}

/**
 * Generates an object from an array of strings.
 *
 * @param {Array<string>} strings - The array of strings to process.
 * @param {__WebpackModuleApi.RequireContext} context - The context object to use for processing.
 * @return {NavigationType} - The resulting object.
 */
function createObjectFromStrings(strings: Array<string>, context:  __WebpackModuleApi.RequireContext): NavigationType {
  const resultObject: NavigationType = {};

  for (const string of strings) {
    const values = string.split("/");
    values.shift();
    let currentObject = resultObject;

    for (const value of values) {
      const formattedValue = processFilename(value);
      if (!currentObject[formattedValue]) {
        currentObject[formattedValue] = {};
      }
      if (value === formattedValue + value.substring(value.indexOf("."))) {
        const segments = context(string).default.src.split('/');
        const lastSegment = segments.pop();

        // Extract the filename before the first dot
        const filename = lastSegment!.split('.')[0];
        currentObject[formattedValue] = {...context(string).default, "desc":filename};
      }
      currentObject = currentObject[formattedValue] as any as NavigationType;
    }
  }
  return resultObject;
}

const imagesContext = require.context("./", true, /\.(png|jpg|jpeg|gif|svg)$/);

const imageKeys = imagesContext
  .keys()
  .filter((str) => /^\.\/.*\.(png|jpg|jpeg|gif|svg)$/gm.test(str));

const images: NavigationType = createObjectFromStrings(imageKeys, imagesContext);

export default images;
