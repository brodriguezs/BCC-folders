const ROOT_DIR = "root";

export class Folder {
  parent;
  children = new Map();
  name;

  __printableTree = "";

  constructor(parent, name) {
    this.parent = parent || "";
    this.name = name || ROOT_DIR;
  }

  /**
   * CREATE a new folder
   * @param {string} path folders path
   */
  create(path) {
    let foldersPath = path.split("/");

    let currentFolder = this;

    let folderToCreate = foldersPath.pop();
    let pathToCreate = foldersPath.join("/");

    if (this.exists(pathToCreate)) {
      currentFolder = this.get(pathToCreate);
      if (!currentFolder.children.has(folderToCreate)) {
        currentFolder.children.set(
          folderToCreate,
          new Folder(currentFolder.name, folderToCreate)
        );
        return `CREATE ${path}`;
      }
    }
    return `CREATE ${path}\n${path} already exists`;
  }

  /**
   *
   * Check if a folder has a sub folder inside
   *
   * @param {string} path
   * @returns {false} if the path does not exists or {Folder} the current folder found
   */
  exists(path) {
    if (!path.match(/[\w]/)) {
      return true;
    }

    let tempPath = path.split("/");
    let currentFolder = this;
    while (tempPath.length >= 2) {
      if (currentFolder.children.has(tempPath[0])) {
        currentFolder = currentFolder.children.get(tempPath[0]);
        tempPath.shift();
      } else {
        return false;
      }
    }

    if (tempPath.length === 1 && currentFolder.children.has(tempPath[0])) {
      return true;
    } else {
      return false;
    }
  }

  get(path) {
    if (!path.match(/[\w]/)) {
      return this;
    }
    let foldersPath = path.split("/");
    let currentFolder = currentFolder || this;
    while (foldersPath.length >= 2) {
      if (currentFolder.children.has(foldersPath[0])) {
        currentFolder = currentFolder.children.get(foldersPath[0]);
        foldersPath.shift();
      } else {
        throw new Error("No folder found");
      }
    }

    if (currentFolder.name === foldersPath[0]) {
      return currentFolder;
    } else if (
      foldersPath.length === 1 &&
      currentFolder.children.has(foldersPath[0])
    ) {
      return currentFolder.children.get(foldersPath[0]);
    } else {
      throw new Error("No folder found");
    }
  }
  
  /**
   * MOVE a folder
   * @param {string} path folder path to move
   * @param {string} destination destination path
   */
  move(path, destination) {
    if (!this.exists(path))
      throw new Error(`Cannot move ${path} - ${path} folder does not exist`);
    if (!this.exists(destination))
      throw new Error(
        `Cannot move to ${destination} - ${destination} does not exist`
      );

    let originFolder = this.get(path);
    let destinationFolder = this.get(destination);
    this.delete(path);
    destinationFolder.children.set(originFolder.name, originFolder);
    return `MOVE ${path} ${destination}`;
  }

  /**
   * LIST a folders tree
   * @return {string} directory tree
   */
  list() {
    this.printableTree = "LIST";

    this.printChildren(this.children);

    return this.printableTree;
  }

  printChildren(children, identation) {
    identation = identation || 0;
    children.forEach((folder) => {
      this.printableTree = this.printableTree.concat(
        `\n`,
        `${" ".repeat(identation)}${folder.name}`
      );
      if (folder.children.size > 0) {
        this.printChildren(folder.children, identation + 2);
      }
      if (folder.children.size === 0) return;
    });
  }

  /**
   * DELETE a folder
   * @param {string} folder path
   */
  delete(path) {
    let foldersPath = path.split("/");
    let currentFolder = this;

    let folderToDelete = foldersPath.pop();
    let pathToCreate = foldersPath.join("/");
    if (this.exists(pathToCreate)) {
      currentFolder = this.get(pathToCreate);
      if (currentFolder.children.has(folderToDelete)) {
        currentFolder.children.delete(folderToDelete);
        return `DELETE ${path}`;
      } else {
        return `DELETE ${path}\nCannot delete ${path} - ${folderToDelete} does not exist`;
      }
    } else {
      return `DELETE ${path}\nCannot delete ${path} - ${foldersPath[0]} does not exist`;
    }
  }
}
