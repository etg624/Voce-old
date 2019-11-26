/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAudio = `query GetAudio($id: ID!) {
  getAudio(id: $id) {
    id
    title
    durationInMillis
    file {
      bucket
      key
      region
    }
    createdBy {
      id
      username
    }
    
  }
}
`;
export const listAudios = `query ListAudios(
  $filter: ModelAudioFilterInput
  $limit: Int
  $nextToken: String
) {
  listAudios(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      durationInMillis
      
      createdBy {
        id
        username
      }
      file {
        bucket
        key
        region
      }
    }
   
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    recordings {
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username 
      recordings{
        items {
          title
          file { key }
          id
          createdBy {id username}
          durationInMillis
        }
      }
    }
    nextToken
  }
}
`;
