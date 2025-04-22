const graphqlString = `
  {
    getData {
      data {
        id
        type
        attributes {
          description
          lastUpdate
        }
      }
      _id
      included {
        type
        id
        attributes {
          title
          content {
            type
            attributes {
              color
              total
            }
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export default graphqlString;
