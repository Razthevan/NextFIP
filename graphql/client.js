import ApolloClient from "apollo-client";

import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const URI = "https://openapi.radiofrance.fr/v1/graphql?x-token=";
const TOKEN = "1e17d8b8-afaa-4ba2-ba5c-dddf695fa642";

export default new ApolloClient({
  link: createHttpLink({
    uri: `${URI}${TOKEN}`,
    headers: {
      "x-token": TOKEN,
    },
  }),
  cache: new InMemoryCache(),
});
