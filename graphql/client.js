import ApolloClient from "apollo-client";

import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export default new ApolloClient({
  link: createHttpLink({
    uri: `${URI}${process.env.x_token}`,
    headers: {
      "x-token": TOKEN,
    },
  }),
  cache: new InMemoryCache(),
});
