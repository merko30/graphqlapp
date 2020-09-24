import React from "react";

import { ThemeProvider } from "styled-components";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import theme from "./theme";

const client = new ApolloClient({
  uri: "http:localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <div></div>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
