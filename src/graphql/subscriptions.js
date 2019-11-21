/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAudio = `subscription OnCreateAudio {
  onCreateAudio {
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
`;
export const onUpdateAudio = `subscription OnUpdateAudio {
  onUpdateAudio {
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
`;
export const onDeleteAudio = `subscription OnDeleteAudio {
  onDeleteAudio {
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
