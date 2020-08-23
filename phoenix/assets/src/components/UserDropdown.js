import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/browser";

import UserContext from "src/contexts/UserContext";
import { axios } from "src/utils/utils";
import Logout from "src/components/Logout";
import Dropdown from "./Dropdown";

export default function UserDropdown(props) {
  const { user } = useContext(UserContext);

  return (
    <Dropdown
      type="click"
      animate={false}
      hoverPlace="bottom"
      hoverElement={
        <div className="mt-9 border border-gray-200 rounded bg-pureWhite shadow-md">
          <div className="px-4 py-3">
            <p className="text-sm leading-5 font-medium text-gray-900">
              {user.name}
            </p>
            <p className="text-sm leading-5 font-medium text-gray-500">
              {user.email}
            </p>
          </div>
          <div className="border-t border-gray-100"></div>
          <div className="py-1">
            <Logout className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
              Sign out
            </Logout>
          </div>
        </div>
      }
    >
      <div className="flex items-center cursor-pointer">
        <img src={user.picture} className="rounded-full w-9 h-9 border" />
      </div>
    </Dropdown>
  );
}
