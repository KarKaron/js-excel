import { createStore } from "./createStore";

const initialState = {
  count: 0
}

const reducer = (state = initialState, action) => {
  if (action.type === "ADD") {
    return {...state, count: state.count +1}
  }
  return state;
}

describe("createStore:", () => {
  let store,
    handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test("return object", () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined();
  });

  test("return objesct state", () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test("return default state", () => {
    expect(store.getState()).toEqual(initialState);
  });

  test("return state action", () => {
    expect(store.dispatch({type: "ADD"}));
    expect(store.getState().count).toBe(1);
  });

  test("return state dont action", () => {
    expect(store.dispatch({type: "NOT_EXISTING_ACTION"}));
    expect(store.getState().count).toBe(0);
  });

  test("call subscriber", () => {
    store.subscribe(handler);
    store.dispatch({type: "ADD"});
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());    
  });

  test("not call subscriber if unsubscribe", () => {
    const sub = store.subscribe(handler);
    sub.unsubscribe();
    store.dispatch({type: "ADD"});
    expect(handler).not.toHaveBeenCalled();
  });

  test("dispatch async", () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: "ADD"});
      }, 500);

      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});