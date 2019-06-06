import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import getDate from "../utils/time";

const PostSection = styled.section`
  background: #f4f4f4;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 500px) {
    padding: 12px;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: flex-start;

  @media screen and (max-width: 500px) {
    align-items: center;
  }
`;

const PostImg = styled.img`
  border-radius: 16px;

  @media screen and (max-width: 500px) {
    width: 80px;
  }
`;

const PostContent = styled.div`
  margin-left: 20px;

  @media screen and (max-width: 500px) {
    margin-left: 12px;
  }
`;

const PostTitle = styled.h4`
  line-height: 100%;
  margin: -4px 0 8px;

  @media screen and (max-width: 500px) {
    margin-top: 0;
  }
`;

const PostDate = styled.time`
  font-weight: bold;
  margin: 4px 0;
  display: block;

  @media screen and (max-width: 500px) {
    font-size: 14px;
    margin: 0;
  }
`;

const PostSummary = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const PostSummaryMobile = styled.div`
  margin-top: 4px;

  @media screen and (min-width: 501px) {
    display: none;
  }
`;

export default function PostThumbnail({
  title,
  slug,
  date,
  excerpt,
  thumbnail,
}) {
  return (
    <PostSection>
      <PostHeader>
        <Link to={`${slug}/`}>
          <PostImg src={thumbnail} alt={title} />
        </Link>
        <PostContent>
          <Link to={`${slug}/`}>
            <PostTitle>{title}</PostTitle>
          </Link>
          <PostDate>{getDate(date)}</PostDate>
          <PostSummary dangerouslySetInnerHTML={{ __html: excerpt }} />
        </PostContent>
      </PostHeader>
      <PostSummaryMobile dangerouslySetInnerHTML={{ __html: excerpt }} />
    </PostSection>
  );
}
