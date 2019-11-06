/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAudio = `query GetAudio($id: ID!) {
  getAudio(id: $id) {
    id
    title
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
