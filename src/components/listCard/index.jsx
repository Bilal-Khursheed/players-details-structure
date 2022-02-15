import React from "react";

const ListCard = (props) => {
    const {playerName, realName, asset} = props.data;
  return (
    <div>
      ListCard
      <ul>
        <li>playerName : {playerName}</li>
        <li>realName : {realName}</li>
        <li>asset : {asset}</li>
      </ul>
    </div>
  );
};

export default ListCard;
