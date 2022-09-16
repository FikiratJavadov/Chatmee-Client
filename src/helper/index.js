export const showChatName = (me, users) => {
  const friend = users?.find((user) => user?._id !== me?._id);
  return friend;
};
