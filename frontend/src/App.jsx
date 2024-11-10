import React, { useState } from "react";

import Root from "./routes/Root";
import Gig from "./routes/Gig";

function App() {
  const [page, setPage] = useState('/');
  const [pageData, setPageData] = useState(null);

  if (page == '/') {
    return <Root {...{ page, setPage, pageData, setPageData }} />
  }
  if (page == '/gig') {
    return <Gig {...{ page, setPage, pageData, setPageData }} />
  }
}

export default App;
