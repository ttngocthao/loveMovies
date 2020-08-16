import React, { useState, useEffect } from "react";

const MovieList = ({ listData, filterCondition }) => {
  const [filterList, setFilterList] = useState({
    isListReady: false,
    filterListData: null,
  });
  const { isListReady, filterListData } = filterList;
  useEffect(() => {
    if (listData) {
      setFilterList({
        ...filterList,
        isListReady: true,
        filterListData: listData,
      });
    }
    if (filterCondition && filterCondition.adminApproved === true) {
      const result = listData.filter((item) => {
        return item.adminApproved === true;
      });

      setFilterList({
        ...filterList,
        isListReady: true,
        filterListData: result,
      });
    }
  }, []);

  return (
    <ul>
      {isListReady && filterListData && filterListData.length > 0 ? (
        filterListData.map((item, index) => {
          return <li key={index}>{item.movieName}</li>;
        })
      ) : (
        <li>Nothing to show</li>
      )}
    </ul>
  );
};

export default MovieList;
