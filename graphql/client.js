import ApolloClient from "apollo-client";

import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const URI = "https://openapi.radiofrance.fr/v1/graphql?x-token=";

export default new ApolloClient({
  link: createHttpLink({
    uri: `${URI}${process.env.x_token}`,
    headers: {
      "x-token": process.env.x_token,
    },
  }),
  cache: new InMemoryCache(),
});
