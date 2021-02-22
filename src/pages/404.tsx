// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="Not found" />
      <h1>Sorry, not found 😢</h1>
      <h3 className="not-found__desc">
        The page doesn&#39;t exist (or maybe I haven&#39;t build it yet 😜)
      </h3>
      <Link className="not-found__link" to="/">
        Back to home
      </Link>
    </Layout>
  );
};

export default NotFoundPage;
