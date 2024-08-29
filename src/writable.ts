import fs from "fs";

export class Writable {
  path;
  #absolutePath;

  constructor(path: string) {
    this.path = path;
    this.#absolutePath = `${__dirname}/../${path}`;
  }

  write() {
    const data = JSON.stringify(this.valueOf(), null, 2);
    let fileData;

    try {
      fileData = fs.readFileSync(this.#absolutePath).toString();
    } catch {
      fileData = null;
    }

    if (fileData === data) {
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
