import { MockedResponse } from "@apollo/client/testing";
import graphqlString from "../../../../Utils/staticData";
import { gql } from "@apollo/client";

const GET_DATA_QUERY = gql`
  ${graphqlString}
`;

export const MocksData: MockedResponse[] = [
  {
    request: {
      query: GET_DATA_QUERY,
    },
    result: {
      data: {
        getData: [
          {
            data: {
              id: "001",
              type: "userProfile",
              attributes: {
                description: "User profile information",
                lastUpdate: "2025-05-01T12:00:00Z",
              },
            },
            _id: "user001",
            included: [
              {
                type: "activityLog",
                id: "activity001",
                attributes: {
                  title: "Login History",
                  content: [
                    {
                      type: "login",
                      attributes: {
                        color: "green",
                        total: 10,
                      },
                    },
                    {
                      type: "login",
                      attributes: {
                        color: null,
                        total: 5,
                      },
                    },
                  ],
                },
              },
            ],
            createdAt: "2025-04-30T08:00:00Z",
            updatedAt: "2025-05-01T11:45:00Z",
          },
          {
            data: {
              id: "002",
              type: "order",
              attributes: {
                description: "Order details",
                lastUpdate: "2025-05-02T14:30:00Z",
              },
            },
            _id: "order002",
            included: [
              {
                type: "productList",
                id: "product001",
                attributes: {
                  title: "Order Items",
                  content: [
                    {
                      type: "product",
                      attributes: {
                        color: "blue",
                        total: 3,
                      },
                    },
                    {
                      type: "product",
                      attributes: {
                        color: "green",
                        total: 7,
                      },
                    },
                  ],
                },
              },
            ],
            createdAt: "2025-05-02T10:15:00Z",
            updatedAt: "2025-05-02T14:00:00Z",
          },
          {
            data: {
              id: "003",
              type: "transaction",
              attributes: {
                description: "Payment transaction details",
                lastUpdate: "2025-05-03T10:00:00Z",
              },
            },
            _id: "trans003",
            included: [
              {
                type: "paymentMethod",
                id: "pay001",
                attributes: {
                  title: "Credit Card Transactions",
                  content: [
                    {
                      type: "transaction",
                      attributes: {
                        color: "silver",
                        total: 150,
                      },
                    },
                    {
                      type: "transaction",
                      attributes: {
                        color: "gold",
                        total: 200,
                      },
                    },
                  ],
                },
              },
            ],
            createdAt: "2025-05-02T18:00:00Z",
            updatedAt: "2025-05-03T09:30:00Z",
          },
          {
            data: {
              id: "004",
              type: "shipment",
              attributes: {
                description: "Shipment tracking information",
                lastUpdate: "2025-05-04T16:00:00Z",
              },
            },
            _id: "ship004",
            included: [
              {
                type: "trackingDetails",
                id: "track001",
                attributes: {
                  title: "Package Status",
                  content: [
                    {
                      type: "status",
                      attributes: {
                        color: "orange",
                        total: 1,
                      },
                    },
                    {
                      type: "status",
                      attributes: {
                        color: "green",
                        total: 2,
                      },
                    },
                  ],
                },
              },
            ],
            createdAt: "2025-05-04T12:00:00Z",
            updatedAt: "2025-05-04T15:45:00Z",
          },
          {
            data: {
              id: "005",
              type: "report",
              attributes: {
                description: "Monthly performance report",
                lastUpdate: "2025-05-05T08:30:00Z",
              },
            },
            _id: "report005",
            included: [],
            createdAt: "2025-05-05T07:00:00Z",
            updatedAt: "2025-05-05T08:15:00Z",
          },
          {
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
        ],
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
