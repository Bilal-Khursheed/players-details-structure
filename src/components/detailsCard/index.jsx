import React from "react";

const DetailCard = ({ playerName, realName, asset}) => {
  return (
    <div>
      DetailCard
      <ul>
        <li>playerName : {playerName}</li>
        <li>realName : {realName}</li>
        <li>asset : {asset}</li>
      </ul>
    </div>
  );
};

export default DetailCard;
