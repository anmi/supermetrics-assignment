export interface Success<T> {
  status: "success";
  value: T;
}

export function isSuccess<T, F>(
  loadable: Loadable<T, F>
): loadable is Success<T> {
  return loadable.status === "success";
}

export function success<T>(value: T): Success<T> {
  return {
    status: "success",
    value,
  };
}

export interface Failure<T> {
  status: "failure";
  error: T;
}

export function failure<T>(error: T): Failure<T> {
  return {
    status: "failure",
    error,
  };
}

export function isFailure<T, F>(value: Loadable<T, F>): value is Failure<F> {
  return value.status === "failure";
}

export type Result<T, F> = Success<T> | Failure<F>;

export interface Loading {
  status: "loading";
}

export const loading: Loading = { status: "loading" };

export function isLoading<T, F>(value: Loadable<T, F>): value is Loading {
  return value.status === "loading";
}

export interface Initial {
  status: "initial";
}

export function isInitial<T, F>(value: Loadable<T, F>): value is Initial {
  return value.status === "initial";
}

export const initialLoadable: Initial = {
  status: "initial",
};

export type Loadable<T = null, F = null> = Result<T, F> | Loading | Initial;

export function mapLoadable<T1, T2, F>(
  value: Loadable<T1, F>,
  fn: (value: T1) => T2
): Loadable<T2, F> {
  if (isSuccess(value)) {
    return success(fn(value.value));
  }

  return value;
}
