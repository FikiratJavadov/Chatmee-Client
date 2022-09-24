import React, { useEffect, useState } from "react";
import { useChat } from "../store/chat";
import useDebounce from "../hooks/useDebounce";
import SignleUser from "./SignleUser";

import { AnimatePresence } from "framer-motion";

const UserList = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);
  const users = useChat((state) => state.users);
  const searchMode = useChat((state) => state.searchMode);
  const searchUsers = useChat((state) => state.searchUsers);

  useEffect(() => {
    //* Serach for users...
    if (searchMode) {
      searchUsers(debouncedValue);
    }
  }, [debouncedValue, searchUsers, searchMode]);

  return (
    <div className="flex flex-col h-[600px] ">
      <form className="flex items-center justify-between text-sm border-b border-gray-200">
        <input
          onChange={(e) => setValue(e.target.value)}
          className="w-full  p-3 font-semibold select-none h-full focus:outline-none border-b"
          placeholder="Search..."
        />
      </form>

      <ul className="py-1 overflow-auto h-full">
        <AnimatePresence>
          {users.map((user) => (
            <SignleUser key={user._id} user={user} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default UserList;
