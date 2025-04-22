import { MockedResponse } from "@apollo/client/testing";
import graphqlString from "../../../../Utils/staticData";
import { gql } from "@apollo/client";

const GET_DATA_QUERY = gql`
  ${graphqlString}
`;

export const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_DATA_QUERY,
    },
    result: {
      data: {
        getData: {
          data: {
            id: "123",
            type: "exampleType",
            attributes: {
              description: "This is a sample description",
              lastUpdate: "2025-04-21T10:00:00Z",
            },
          },
          _id: "abcdef123456",
          included: [
            {
              type: "includedType",
              id: "included123",
              attributes: {
                title: "Sample Title",
                content: [
                  {
                    type: "contentType",
                    attributes: {
                      color: "blue",
                      total: 42,
                    },
                  },
                  {
                    type: "contentType",
                    attributes: {
                      color: "red",
                      total: 18,
                    },
                  },
                ],
              },
            },
          ],
          createdAt: "2025-04-20T08:30:00Z",
          updatedAt: "2025-04-21T09:45:00Z",
        },
      },
    },
  },
];

export const errorMock = [
  {
    request: {
      query: GET_DATA_QUERY,
    },
    error: new Error("An error occurred"),
  },
];
