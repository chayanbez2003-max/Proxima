import fs from "fs";

/**
 * deleteFile
 * Safely deletes a file from the filesystem.
 * Does NOT throw if the file does not exist — logs a warning instead.
 *
 * @param {string} filePath - Absolute path to the file
 */
const deleteFile = (filePath) => {
  if (!filePath) return;

  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") {
      // ENOENT = file not found — safe to ignore
      console.error(`[fileHelper] Failed to delete file: ${filePath}`, err.message);
    } else {
      console.log(`[fileHelper] Temp file deleted: ${filePath}`);
    }
  });
};

/**
 * fileExists
 * Returns true if the given path resolves to an existing file.
 *
 * @param {string} filePath
 * @returns {boolean}
 */
const fileExists = (filePath) => {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
};

export { deleteFile, fileExists };
