import path from 'path';
import csvToJson from './csvToJson';
import parseCsv from './parseCsv';

/**
* we're using split variable when we need to split dataset into chunks.
* for details check assign method.
*/
const mainWrapper = async (filename, dirPath, split = false) => {
  const rawFilePath = path.join(dirPath, filename);
  const data = await parseCsv(rawFilePath);
  await csvToJson(dirPath, data, split);
};

const mainWrapper2 = async (folderName, split = false) => {
  const csvFilesFolder = path.resolve('./raw');
  const csvFiles = await findCsvFiles(csvFilesFolder);

  csvFiles.forEach(async (file) => {
    const { filename, dirPath } = file;
    const csvFilePath = `${dirPath}/${filename}`;
    const data = await parseCsv(csvFilePath);
    await csvToJson(dirPath, data, split);
  });
};

export default {
  mainWrapper,
  mainWrapper2,
};
