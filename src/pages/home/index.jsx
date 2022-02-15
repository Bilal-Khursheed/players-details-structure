import React from "react";
import useDataApi from "../../library/hooks/useDataApi";
import ListCard from "../../components/listCard";

const Home = () => {
  let { data, loading, sort } = useDataApi("/data/cards.json"); //public/data/cards.json
  console.log("here is the dataaaa", data);
  return (
    <div>
      Home
      <button onClick={() => sort(1)}>ASC sort</button>
      <button onClick={() => sort(2)}>DESC sort</button>
      <>
        {data &&
          data.length > 0 &&
          data.map((item, index) => <ListCard key={index} data={item} />)}
      </>
    </div>
  );
};
export default Home;
