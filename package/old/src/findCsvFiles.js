import { readDir } from '@groceristar/static-data-generator';

// eslint-disable-next-line no-shadow
async function helper(dirPath, csvFiles) {
  if (dirPath.includes('.json') || dirPath.includes('.md')) return;

  const folders = await readDir(dirPath);
  let newDirPath = '';

  folders.forEach((name) => {
    if (name.includes('.csv')) {
      csvFiles.push({
        filename: name,
        dirPath,
      });
    }
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const name of folders) {
    newDirPath = dirPath.concat(`/${name}`);

    if (!newDirPath.includes('.csv')) {
      // eslint-disable-next-line no-await-in-loop
      await helper(newDirPath);
    }
  }
}

/**
 * @async
 * @param {string} dirPath directory path (must be absloute)
 * @returns {Promise<Array>} Promise<Array>
 */

async function findCsvFiles(dirPath) {
  const csvFiles = [];

  await helper(dirPath);

  return csvFiles;
}

export default findCsvFiles;
