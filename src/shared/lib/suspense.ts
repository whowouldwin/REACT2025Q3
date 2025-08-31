export function createResource<T>(promise: Promise<T>) {
  type ResourceState =
    | { status: 'pending'; suspender: Promise<void> }
    | { status: 'success'; result: T }
    | { status: 'error'; error: unknown };

  let state: ResourceState = {
    status: 'pending',
    suspender: promise.then(
      (data) => {
        state = { status: 'success', result: data };
      },
      (err) => {
        state = { status: 'error', error: err };
      }
    ),
  };

  return {
    read(): T {
      if (state.status === 'pending') {
        throw state.suspender;
      } else if (state.status === 'error') {
        throw state.error;
      } else {
        return state.result;
      }
    },
  };
}
