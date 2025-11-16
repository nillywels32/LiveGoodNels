/**
 * Utility types for GoodLifeNels application
 */

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Omit timestamps from database entities
 */
export type WithoutTimestamps<T> = Omit<T, 'created_at' | 'updated_at'>;

/**
 * Create type - omit ID and timestamps
 */
export type CreateInput<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;

/**
 * Update type - partial fields except ID
 */
export type UpdateInput<T> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>;

/**
 * Deep partial - make all nested properties optional
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * Sort parameters
 */
export interface SortParams<T> {
  field: keyof T;
  order: 'asc' | 'desc';
}

/**
 * Date range filter
 */
export interface DateRange {
  start: string;
  end: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors?: ValidationError[];
}

/**
 * Validation error
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Async operation state
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Filter operators
 */
export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'contains'
  | 'startsWith'
  | 'endsWith';

/**
 * Filter condition
 */
export interface FilterCondition<T> {
  field: keyof T;
  operator: FilterOperator;
  value: unknown;
}

/**
 * Query options for list endpoints
 */
export interface QueryOptions<T> {
  pagination?: PaginationParams;
  sort?: SortParams<T>;
  filters?: FilterCondition<T>[];
}
