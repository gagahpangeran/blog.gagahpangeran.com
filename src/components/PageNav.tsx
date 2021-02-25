// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { getPostData } from "../utils/data";

type PostData = ReturnType<typeof getPostData> | null;

interface NavLinkProps {
  type: "Newer" | "Older";
  data: PostData;
}

const PageNavLink = ({ type, data }: NavLinkProps) => {
  if (data === null) {
    return null;
  }

  const { slug, image, title } = data;

  return (
    <Link to={slug} className={`page-nav__link ${type.toLowerCase()}`}>
      <Img
        className="page-nav__link__image"
        fluid={image}
        alt={title}
        title={title}
      />
      <div className="page-nav__link__title">
        <strong>
          {type === "Newer" && <FontAwesomeIcon icon={faCaretLeft} />}
          <span>{`${type} Post`}</span>
          {type === "Older" && <FontAwesomeIcon icon={faCaretRight} />}
        </strong>
        <h5>{title}</h5>
      </div>
    </Link>
  );
};

interface Props {
  newerPost: PostData;
  olderPost: PostData;
}

const PageNav = ({ newerPost, olderPost }: Props) => {
  return (
    <div className="page-nav">
      <PageNavLink type="Newer" data={newerPost} />
      <PageNavLink type="Older" data={olderPost} />
    </div>
  );
};

export default PageNav;
