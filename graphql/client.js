import ApolloClient from "apollo-client";

import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const URI = "https://openapi.radiofrance.fr/v1/graphql?x-token=";

export default new ApolloClient({
  link: createHttpLink({
    uri: `${URI}${process.env.NEXT_PUBLIC_TOKEN}`,
    headers: {
      "x-token": process.env.NEXT_PUBLIC_TOKEN,
    },
  }),
  cache: new InMemoryCache(),
});
