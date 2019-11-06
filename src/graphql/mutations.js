/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAudio = `mutation CreateAudio($input: CreateAudioInput!) {
  createAudio(input: $input) {
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
export const updateAudio = `mutation UpdateAudio($input: UpdateAudioInput!) {
  updateAudio(input: $input) {
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
export const deleteAudio = `mutation DeleteAudio($input: DeleteAudioInput!) {
  deleteAudio(input: $input) {
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
