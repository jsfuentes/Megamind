import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { presence } from "src/socket.js";
const debug = require("debug")("app:components:Presence");

function PresenceList(props) {
  const [pList, setPList] = useState([]);
  useEffect(() => {
    function updatePList(presence) {
      debug("Updating pList");
      const newPList = presence.list((id, { metas }) => {
        return { id, metas };
      });
      setPList(newPList);
    }
    presence.onSync(() => updatePList(presence));
  }, []);

  const pListUI = pList.map((p) => {
    const [first, ...rest] = p.metas;
    const l = rest.length + 1;
    return (
      <div key={p.id} className="px-4 border-solid border-black border-1">
        <div> {`${p.id} - count ${l}`}</div>
      </div>
    );
  });
  return <div className="w-1/4">{pListUI}</div>;
}

PresenceList.propTypes = {};
export default PresenceList;
