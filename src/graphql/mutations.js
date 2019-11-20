/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAudio = `mutation CreateAudio($input: CreateAudioInput!) {
  createAudio(input: $input) {
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
export const updateAudio = `mutation UpdateAudio($input: UpdateAudioInput!) {
  updateAudio(input: $input) {
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
export const deleteAudio = `mutation DeleteAudio($input: DeleteAudioInput!) {
  deleteAudio(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
