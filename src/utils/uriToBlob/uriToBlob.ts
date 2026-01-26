const uriToBlob = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    throw Error('error getting blob');
  }
};
export default uriToBlob;
