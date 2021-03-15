// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import {
  CreatePageDataArgs,
  CreatePageDataType,
  CreateBlogPageContext,
  createPageData
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

const path = "/lang/en/";

const context: CreateBlogPageContext = {
  ...baseContext,
  basePath: path,
  filterValue: "en",
  type: "Language"
};

const expectedResult: CreatePageDataType = {
  path,
  context
};

describe("Test createPageData function", () => {
  test("All arguments filled", () => {
    const result = createPageData(baseArgs);

    expect(result).toMatchObject([expectedResult]);
  });

  test("slug argument empty or undefined", () => {
    const slugArgs: CreatePageDataArgs = { ...baseArgs, slug: undefined };

    const slugPath = "/language/en/";
    const slugExpectedResult: CreatePageDataType = {
      path: slugPath,
      context: {
        ...expectedResult.context,
        basePath: slugPath
      }
    };

    const result = createPageData(slugArgs);
    expect(result).toMatchObject([slugExpectedResult]);
  });

  test("filterValue (and slug) argument(s) empty or undefined", () => {
    let filterValueArgs: CreatePageDataArgs = {
      ...baseArgs,
      filterValue: undefined
    };

    const errorMessage = `filterValue can not be empty if type is not "Index"`;

    expect(() => createPageData(filterValueArgs)).toThrow(errorMessage);

    filterValueArgs = {
      ...filterValueArgs,
      slug: undefined
    };

    expect(() => createPageData(filterValueArgs)).toThrow(errorMessage);
  });

  test("Index type argument", () => {
    const indexTypeArgs: CreatePageDataArgs = {
      postCount: 1,
      type: "Index"
    };

    const indexTypeExpectedResult: CreatePageDataType = {
      path: "/",
      context: {
        ...baseContext,
        basePath: "/",
        filterValue: "",
        type: "Index"
      }
    };

    const result = createPageData(indexTypeArgs);

    expect(result).toMatchObject([indexTypeExpectedResult]);
  });

  test("Multiple pages", () => {
    const multiPageArgs: CreatePageDataArgs = {
      ...baseArgs,
      postCount: 7
    };

    const multiPageExpectedResult: CreatePageDataType[] = [
      {
        path: path,
        context: {
          ...context,
          numPages: 2
        }
      },
      {
        path: `${path}2/`,
        context: {
          ...context,
          numPages: 2,
          skip: 5,
          page: 2
        }
      }
    ];

    const result = createPageData(multiPageArgs);

    expect(result).toMatchObject(multiPageExpectedResult);
  });
});
