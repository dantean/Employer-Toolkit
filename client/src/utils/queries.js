// Implement the getSingleUser query
import { gql } from"@apollo/client"
export const QUERY_ME = gql`
query SavedBooks {
    getSingleUser {
      savedBooks {
        _id
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`