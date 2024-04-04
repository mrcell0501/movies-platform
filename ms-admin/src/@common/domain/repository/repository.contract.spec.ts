import { SearchParams } from "./repository.contract";

describe("RepositoryContract SearchParams", () => {
  it("should initialize page property correctly", () => {
    const params = new SearchParams();
    expect(params.page).toBe(1);

    const arrange = [
      { page: undefined, expected: 1 },
      { page: null, expected: 1 },
      { page: "", expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5, expected: 5 },
      { page: {}, expected: 1 },
      { page: [], expected: 1 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
    ] as any;

    for (const { page, expected } of arrange) {
      expect(new SearchParams({ page }).page).toBe(expected);
    }
  });

  it("should initialize per_page property correctly", () => {
    const params = new SearchParams();
    expect(params.per_page).toBe(15);

    const arrange = [
      { per_page: undefined, expected: 15 },
      { per_page: null, expected: 15 },
      { per_page: "", expected: 15 },
      { per_page: 0, expected: 15 },
      { per_page: -1, expected: 15 },
      { per_page: 5, expected: 5 },
      { per_page: {}, expected: 15 },
      { per_page: [], expected: 15 },
      { per_page: true, expected: 15 },
      { per_page: false, expected: 15 },
    ] as any;

    for (const { per_page, expected } of arrange) {
      expect(new SearchParams({ per_page }).per_page).toBe(expected);
    }
  });

  it("should initialize sort property correctly", () => {
    const params = new SearchParams();
    expect(params.sort).toBe(null);

    const arrange = [
      { sort: undefined, expected: null },
      { sort: null, expected: null },
      { sort: "", expected: null },
      { sort: "created_at", expected: "created_at" },
      { sort: 0, expected: "0" },
      { sort: -1, expected: "-1" },
      { sort: 5, expected: "5" },
      { sort: {}, expected: "[object Object]" },
      { sort: true, expected: "true" },
      { sort: false, expected: "false" },
    ] as any;

    for (const { sort, expected } of arrange) {
      expect(new SearchParams({ sort }).sort).toBe(expected);
    }
  });

  it("should initialize sort_dir property correctly", () => {
    const emptyValues = [undefined, null, ""];
    for (const emptyValue of emptyValues) {
      expect(new SearchParams({ sort: emptyValue }).sort_dir).toBe(null);
    }

    const arrange = [
      { sort_dir: undefined, expected: "asc" },
      { sort_dir: null, expected: "asc" },
      { sort_dir: "", expected: "asc" },
      { sort_dir: "invalid-value", expected: "asc" },
      { sort_dir: 0, expected: "asc" },
      { sort_dir: -1, expected: "asc" },
      { sort_dir: 5, expected: "asc" },
      { sort_dir: {}, expected: "asc" },
      { sort_dir: [], expected: "asc" },
      { sort_dir: true, expected: "asc" },
      { sort_dir: false, expected: "asc" },
      { sort_dir: "asc", expected: "asc" },
      { sort_dir: "ASC", expected: "asc" },
      { sort_dir: "desc", expected: "desc" },
      { sort_dir: "DESC", expected: "desc" },
    ] as any;

    for (const { sort_dir, expected } of arrange) {
      expect(new SearchParams({ sort: "created_at", sort_dir }).sort_dir).toBe(
        expected
      );
    }
  });

  it("should initialize filter property correctly", () => {
    const params = new SearchParams();
    expect(params.filter).toBe(null);

    const arrange = [
      { filter: undefined, expected: null },
      { filter: null, expected: null },
      { filter: "", expected: null },
      { filter: "created_at", expected: "created_at" },
      { filter: 0, expected: "0" },
      { filter: -1, expected: "-1" },
      { filter: 5, expected: "5" },
      { filter: {}, expected: "[object Object]" },
      { filter: [], expected: "" },
      { filter: true, expected: "true" },
      { filter: false, expected: "false" },
    ] as any;

    for (const { filter, expected } of arrange) {
      expect(new SearchParams({ filter }).filter).toBe(expected);
    }
  });
});
