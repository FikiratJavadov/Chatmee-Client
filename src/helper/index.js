export const showChatName = (me, users) => {
  const friend = users?.find((user) => user?._id !== me?._id);
  return friend;
};

export const amISender = (me, message) => {
  if (me?._id === message?.sender?._id) return true;
  return false;
};
