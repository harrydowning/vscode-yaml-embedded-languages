import fs from "fs";

export class Writable {
  path;
  #absolutePath;

  constructor(path: string) {
    this.path = path;
    this.#absolutePath = `${__dirname}/../${path}`;
  }

  serialize() {
    return Buffer.from(JSON.stringify(this.valueOf(), null, 2));
  }

  write() {
    const data = this.serialize();
    let fileData;

    try {
      fileData = fs.readFileSync(this.#absolutePath);
    } catch {
      fileData = null;
    }

    if (fileData !== null && fileData.equals(data)) {
      return false;
    }

    try {
      fs.writeFileSync(this.#absolutePath, data);
    } catch (err) {
      console.error(err);
      return false;
    }

    console.log(`File '${this.#absolutePath}' saved.`);
    return true;
  }
}
