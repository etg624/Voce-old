/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAudio = `query GetAudio($id: ID!) {
  getAudio(id: $id) {
    id
    title
    durationInMillis
    createdBy {
      id
      username
      recordings {
        id
        title
        durationInMillis
      }
    }
    file {
      bucket
      key
      region
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
      recordings {
        id
        title
        durationInMillis
      }
    }
    nextToken
  }
}
`;
