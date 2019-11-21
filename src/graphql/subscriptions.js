/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAudio = `subscription OnCreateAudio($owner: String!) {
  onCreateAudio(owner: $owner) {
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
    owner
  }
}
`;
export const onUpdateAudio = `subscription OnUpdateAudio($owner: String!) {
  onUpdateAudio(owner: $owner) {
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
    owner
  }
}
`;
export const onDeleteAudio = `subscription OnDeleteAudio($owner: String!) {
  onDeleteAudio(owner: $owner) {
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
    owner
  }
}
`;
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    username
    recordings {
      nextToken
    }
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    username
    recordings {
      nextToken
    }
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    username
    recordings {
      nextToken
    }
  }
}
`;
