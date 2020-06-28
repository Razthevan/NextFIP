import ApolloClient from "apollo-client";

import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const URI = "https://spotifip.herokuapp.com/";
// const URI = "http://localhost:4000/graphql";

export default new ApolloClient({
  link: createHttpLink({
    uri: URI,
    fetchOptions: {
      credentials: "include",
    },
  }),
  cache: new InMemoryCache(),
});
