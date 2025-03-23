import React, { useContext } from "react";
import {SetSearchValueContext} from "@/contexts/SetSearchValueContext"
import {SetIsResultShownContext} from "@/contexts/SetIsResultShownContext"

function SearchResultItem({ name }) {
  const setSeachValue = useContext(SetSearchValueContext)
  const setIsResultShown = useContext(SetIsResultShownContext)
  const selectVehicleHandler = () => {
    setSeachValue(name);
    setIsResultShown(false)
  };
  return (
    <button
      className="w-full text-start p-3 text-gray-300 border-b border-gray-500 font-semibold rounded-lg hover:bg-[#555555] hover:cursor-pointer transition-colors"
      onClick={selectVehicleHandler}
    >
      ارسال مرسوله با <span className="ms-1 text-amber-600">{name}</span>
    </button>
  );
}

export default SearchResultItem;
