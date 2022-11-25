import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
  public async savefile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.directory, file),
    );

    return file;
  }

  public async deletefile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      fs.promises.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
