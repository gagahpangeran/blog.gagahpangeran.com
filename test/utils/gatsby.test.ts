// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import {
  CreatePageDataArgs,
  CreatePageDataType,
  CreateBlogPageContext,
  createBlogPageData
} from "../../src/utils/gatsby";

const baseContext: Omit<
  CreateBlogPageContext,
  "basePath" | "filterValue" | "type"
> = {
  limit: 5,
  skip: 0,
  page: 1,
  numPages: 1
};

const baseArgs: CreatePageDataArgs = {
  postCount: 1,
  type: "Language",
  slug: "lang",
  filterValue: "en"
};

const context: CreateBlogPageContext = {
  ...baseContext,
  basePath: "/blog/lang/en/",
  filterValue: "en",
  type: "Language"
};

const expectedResult: CreatePageDataType = {
  path: context.basePath,
  context
};

describe("Test createPageData function", () => {
  test("All arguments filled", () => {
    const result = createBlogPageData(baseArgs);

    expect(result).toMatchObject([expectedResult]);
  });

  test("slug argument empty or undefined", () => {
    const result = createBlogPageData({
      ...baseArgs,
      slug: undefined
    });

    const slugExpectedResult: CreatePageDataType = {
      path: "/blog/language/en/",
      context: {
        ...expectedResult.context,
        basePath: "/blog/language/en/"
      }
    };

    expect(result).toMatchObject([slugExpectedResult]);
  });

  test("filterValue (and slug) argument(s) empty or undefined", () => {
    let filterValueArgs: CreatePageDataArgs = {
      ...baseArgs,
      filterValue: undefined
    };

    const errorMessage = `filterValue can not be empty if type is not "Blog"`;

    expect(() => createBlogPageData(filterValueArgs)).toThrow(errorMessage);

    filterValueArgs = {
      ...filterValueArgs,
      slug: undefined
    };

    expect(() => createBlogPageData(filterValueArgs)).toThrow(errorMessage);
  });

  test("Index type argument", () => {
    const result = createBlogPageData({
      postCount: 1,
      type: "Blog"
    });

    const indexTypeExpectedResult: CreatePageDataType = {
      path: "/blog/",
      context: {
        ...baseContext,
        basePath: "/blog/",
        filterValue: "",
        type: "Blog"
      }
    };

    expect(result).toMatchObject([indexTypeExpectedResult]);
  });

  test("Multiple pages", () => {
    const result = createBlogPageData({
      ...baseArgs,
      postCount: 7
    });

    const multiPageExpectedResult: CreatePageDataType[] = [
      {
        path: expectedResult.path,
        context: {
          ...context,
          numPages: 2
        }
      },
      {
        path: `${expectedResult.path}2/`,
        context: {
          ...context,
          numPages: 2,
          skip: 5,
          page: 2
        }
      }
    ];

    expect(result).toMatchObject(multiPageExpectedResult);
  });
});
