import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="Not found" />
    <h1>NOT FOUND</h1>
    <p>Sorry, the page doesn't exist (or maybe I haven't build it yet :P )</p>
    <Link to="/">Back to home</Link>
  </Layout>
);

export default NotFoundPage;
