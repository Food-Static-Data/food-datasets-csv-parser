import { write, readDir } from '@groceristar/static-data-generator';

/**
 *
 * @param {Array<string>} fileInfo
 * @param {Array} data
 */
const generateJsonFile = async (fileInfo, data) => {
  // stringify data with indent
  const jsonObjects = JSON.stringify(data, null, 2);
  const newFileName = `${fileInfo[0]}/${fileInfo[1]}.json`;
  await write(newFileName, jsonObjects);
};

/**
 *
 * @param {Array<string>} fileInfo
 * @param {Array} dataEntries
 * @param {number} size
 */
const assign = async (fileInfo, dataEntries, size = 1000) => {
  // @TODO add if env.development and use console.log(xxx)
  const maxEntriesPerFile = size;
  const fileCount = Math.ceil(dataEntries.length / maxEntriesPerFile);
  // ********
  let start;
  let stop;
  const tmpFile = fileInfo;
  const savedFileName = fileInfo[1];

  // @TODO it's looking so complex.
  for (let i = 0; i < fileCount; i += 1) {
    start = i * maxEntriesPerFile;
    // ********
    if (i + 1 === fileCount) {
      stop = dataEntries.length - 1;
    } else {
      stop = (i + 1) * maxEntriesPerFile - 1;
    }
    // ********
    const jsonObjects = dataEntries.slice(start, stop);
    tmpFile[1] += `-${i}`; // add i to file name
    generateJsonFile(fileInfo, jsonObjects);
    tmpFile[1] = savedFileName; // delete i from file name so nxt file can have proper i
  }
};

/**
 * @async
 * @param {string} dirPath directory path
 * @param {Array} data
 * @param {boolean} split split data to a serveral json files
 * @returns {Promise<void>} Promise
 */
const csvToJson = async (dirPath, data, split = false) => {
  const files = await readDir(dirPath);

  // find the csv file
  const csvFile = files.find((file) => {
    if (file.split('.')[1] === 'csv') {
      return file;
    }
    return false;
  });

  // => ["dirName", "filename", "csv"]
  const fileInfo = [dirPath, ...csvFile.split('.')];

  if (split) {
    assign(fileInfo, data);
  } else {
    generateJsonFile(fileInfo, data);
  }
};

export default csvToJson;
