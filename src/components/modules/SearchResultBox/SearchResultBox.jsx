import React from "react";
import SearchResultItem from "../SearchResultItem/SearchResultItem";

function SearchResultBox({ isResultShown, vehicleResponse }) {
  return (
    <div
      className={`${
        isResultShown ? `block` : `hidden`
      } absolute shadow-inner shadow-white/30 top-9 right-0 bg-[#606060] w-[15rem] rounded-lg`}
    >
      {vehicleResponse.length > 0 ? (
        vehicleResponse.map((item) => (
          <SearchResultItem name={item.name} key={item.id} />
        ))
      ) : (
        <div className="p-3 font-semibold text-gray-300">موردی یافت نشد...</div>
      )}
    </div>
  );
}

export default SearchResultBox;
