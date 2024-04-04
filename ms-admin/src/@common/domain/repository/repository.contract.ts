import { Entity } from "../entities/entity";
import { UniqueEntityId } from "../value-objects/unique-entity.id.vo";

export interface Repository<E extends Entity> {
  insert(entity: E): Promise<void>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
}

type SortDir = "asc" | "desc";

export type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDir;
  filter?: Filter;
};

export class SearchParams {
  private _page?: number;
  private _per_page?: number;
  private _sort?: string;
  private _sort_dir?: SortDir;
  private _filter?: string;

  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.filter = props.filter;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    const parsed = +value;
    this._page =
      !value || Number.isNaN(parsed) || parsed <= 0 || !Number.isInteger(parsed)
        ? 1
        : parsed;
  }

  get per_page() {
    return this._per_page;
  }

  private set per_page(value: number) {
    const parsed = value === (true as any) ? this.per_page : +value;
    this._per_page =
      Number.isNaN(parsed) || parsed <= 0 || !Number.isInteger(parsed)
        ? 15
        : parsed;
  }

  get sort() {
    return this._sort;
  }

  set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === "" ? null : `${value}`;
  }

  get sort_dir() {
    return this._sort_dir;
  }

  set sort_dir(value: string | null) {
    if (!this.sort) {
      this._sort_dir = null;
    } else {
      const dir = String(value).toLowerCase();
      this._sort_dir = dir !== "asc" && dir !== "desc" ? "asc" : dir;
    }
  }

  get filter() {
    return this._filter;
  }

  set filter(value: string | null) {
    this._filter =
      value === null || value === undefined || value === "" ? null : `${value}`;
  }
}

type SearchResultProps<E extends Entity, Filter> = {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly sort?: string;
  readonly sort_dir?: SortDir;
  readonly filter?: Filter;
};

class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort?: string;
  readonly sort_dir?: SortDir;
  readonly filter?: Filter;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = Math.ceil(this.total / this.per_page);
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page,
      sort: this.sort,
      sort_dir: this.sort_dir,
      filter: this.filter,
    };
  }
}

export interface SearchableRepository<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>
> extends Repository<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
