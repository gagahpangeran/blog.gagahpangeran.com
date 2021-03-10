// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import PostLabel from "../components/PostLabel";
import Layout from "../components/Layout";
import PageNav from "../components/PageNav";
import SEO from "../components/SEO";
import ShareButton from "../components/ShareButton";
import { getPostData } from "../utils/data";

const Post: React.FC<PageProps<GatsbyTypes.PostTemplateQuery>> = ({ data }) => {
  const { post, site } = data;
  const siteUrl = site?.siteMetadata?.siteUrl ?? "";
  const {
    title,
    excerpt,
    date,
    categories,
    tags,
    lang,
    slug,
    imageUrl,
    image,
    html
  } = getPostData(post as GatsbyTypes.PostDetailFragment);

  const newerPost = data.newerPost ? getPostData(data.newerPost) : null;
  const olderPost = data.olderPost ? getPostData(data.olderPost) : null;

  return (
    <Layout mainTitle={title}>
      <SEO title={title} description={excerpt} />
      <article className="post">
        <time className="post__date">
          <FontAwesomeIcon icon={faClock} />
          <span>{date}</span>
        </time>
        <PostLabel categories={categories} tags={tags} lang={lang} />
        <ShareButton link={`${siteUrl}${slug}`} />
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
          <GatsbyImage image={image} alt={title} title={title} />
        </a>
        <main
          className="post__body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      <PageNav newerPost={newerPost} olderPost={olderPost} />
    </Layout>
  );
};

export default Post;

export const pageQuery = graphql`
  query PostTemplate($id: String!, $newerId: String, $olderId: String) {
    post: markdownRemark(id: { eq: $id }) {
      ...PostDetail
    }
    newerPost: markdownRemark(id: { eq: $newerId }) {
      ...PostDetail
    }
    olderPost: markdownRemark(id: { eq: $olderId }) {
      ...PostDetail
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }

  fragment PostDetail on MarkdownRemark {
    id
    excerpt(pruneLength: 160)
    html
    fields {
      slug
    }
    frontmatter {
      title
      description
      date(formatString: "MMMM DD, YYYY")
      categories
      tags
      lang
      featuredImage {
        publicURL
        childImageSharp {
          gatsbyImageData(width: 800, layout: CONSTRAINED)
        }
      }
    }
  }
`;
