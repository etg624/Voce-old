import { Storage } from "aws-amplify";
import uuid from "uuid";

export const postRecordingToS3 = async (title, recording, privacyLevel) => {
  const localUri = recording._uri;
  const uriParts = localUri.split(".");
  const extension = uriParts[uriParts.length - 1];
  const response = await fetch(localUri);
  const blob = await response.blob();
  const formattedFile = `${title.trim()}_${uuid()}.${extension}`;

  const { key } = await Storage.put(formattedFile, blob, {
    level: privacyLevel,
    contentType: `audio/x-${extension}`
  });
  return { key, localUri, extension };
};
