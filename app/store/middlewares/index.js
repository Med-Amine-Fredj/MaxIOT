import { testMiddleware } from "./testMiddleware";

const middlewares = [testMiddleware];

const getMiddlewaresArray =
  (middlewares) =>
  (slices = {}) => {
    return middlewares.map((middleware) => {
      return middleware(slices);
    });
  };

export default getMiddlewaresArray(middlewares);
