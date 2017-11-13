export const updateToken = (accessToken, tokenType) => {
  return {
    type: 'UPDATE_TOKEN',
    payload: {
      accessToken,
      tokenType,
    }
  };
};
