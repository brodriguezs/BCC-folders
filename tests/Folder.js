import { Folder } from "../src/Folder";

describe("Folder tests", () => {
  let foldersTree;
  beforeEach(() => {
    foldersTree = new Folder();
  });

  it("Should CREATE a root level folder", () => {
    expect(foldersTree.create("fruits")).toBe("CREATE fruits");
  });

  it("Should CREATE a sub folder", () => {
    foldersTree.create("fruits");
    expect(foldersTree.create("fruits/apples")).toBe("CREATE fruits/apples");
    expect(foldersTree.create("fruits/apples/green")).toBe(
      "CREATE fruits/apples/green"
    );
  });

  it("Should LIST the folders", () => {
    foldersTree.create("fruits");
    expect(foldersTree.create("fruits/apples")).toBe("CREATE fruits/apples");
    expect(foldersTree.create("fruits/apples/fuji")).toBe(
      "CREATE fruits/apples/fuji"
    );
    expect(foldersTree.list()).toBe(`LIST
fruits
  apples
    fuji`);
    expect(foldersTree.create("vegetables")).toBe("CREATE vegetables");
    expect(foldersTree.list()).toBe(`LIST
fruits
  apples
    fuji
vegetables`);
  });

  it("Should check if a folder exists for a given path", () => {
    foldersTree.create("fruits");
    expect(foldersTree.exists("fruits")).toBe(true);
    foldersTree.create("fruits/apples");
    expect(foldersTree.exists("fruits/apples")).toBe(true);
    expect(foldersTree.exists("fruits/mango")).toBe(false);
  });

  it("Should DELETE a folder", () => {
    foldersTree.create("fruits");
    foldersTree.create("fruits/apples");
    foldersTree.create("vegetables");
    foldersTree.create("meats");
    expect(foldersTree.delete("meats")).toBe("DELETE meats");
    expect(foldersTree.list()).toBe(`LIST
fruits
  apples
vegetables`);
  });

  it("Should not DELETE a folder that does not exists", () => {
    foldersTree.create("fruits");
    foldersTree.create("fruits/apples");
    foldersTree.create("vegetables");
    expect(foldersTree.delete("fruits/apples/green")).toBe(
      "DELETE fruits/apples/green\nCannot delete fruits/apples/green - green does not exist"
    );
    foldersTree.create("fruits/apples/green");
    expect(foldersTree.list()).toBe(`LIST
fruits
  apples
    green
vegetables`);
  });

  it("Should MOVE a folder", () => {
    foldersTree.create("fruits");
    foldersTree.create("fruits/apples");
    foldersTree.create("vegetables");
    foldersTree.move("vegetables", "fruits");
    foldersTree.create("fruits/vegetables/carrots");
    expect(foldersTree.list()).toBe(`LIST
fruits
  apples
  vegetables
    carrots`);
    foldersTree.create("grains");
    foldersTree.create("grains/squash");
    foldersTree.move("grains/squash", "fruits/vegetables");
    expect(foldersTree.list()).toBe(`LIST
fruits
  apples
  vegetables
    carrots
    squash
grains`);
  });
});
