import ApolloClient from "apollo-client";

import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const URI = "https://spotifip.herokuapp.com/";

const httpLink = createHttpLink({
  uri: URI,
  fetchOptions: {
    credentials: "include",
  },
});

const errorLink = onError(({ response, operation }) => {
  if (operation.operationName === "getCurrentlyPlaying") {
    response.errors = null;
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
