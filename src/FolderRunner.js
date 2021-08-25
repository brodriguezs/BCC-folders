import { Folder } from "./Folder";

export class FolderRunner {
  folder;

  constructor() {
    this.folder = new Folder();
  }

  /**
   * This read a string with the commands per line and return the output
   *
   * @param {string} script string with commands to be executed line per line
   *
   */
  execute(script) {
    let output = script
      .split("\n")
      .filter((v) => v !== "")
      .map((line) => {
        return line.split(" ");
      });

    return output.reduce((acum, current) => {
      try {
        let fn = this.folderCommander(`${current[0]}`);
        acum = acum.concat(`\n`, fn(...current.slice(1)));
        return acum;
      } catch (e) {
        console.log(e);
      }
    }, "");
  }

  folderCommander(command) {
    const functions = {
      CREATE: (params) => this.folder.create(params),
      LIST: (...params) => this.folder.list(...params),
      MOVE: (...params) => this.folder.move(...params),
      DELETE: (params) => this.folder.delete(params),
    };

    const fn = functions[command];
    if (!fn) throw new Error(`Command ${command} not found`);
    return fn;
  }
}
