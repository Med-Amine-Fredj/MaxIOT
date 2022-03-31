export const testMiddleware = (slices) => (store) => (next) => (action) => {
  let result = null;
  result = next(action);
  if (action && action.type === "testStore") {
    try {
      console.log("Test MiddlewareCalled");
    } catch (error) {
      console.error("error in testMiddleware ======>", error);
    }
  }

  return result;
};
