"use client";
import React, { useEffect, useState } from "react";
import LeafletMap from "@/components/templates/map/LeafletMap/LeafletMap";
import toast from "react-hot-toast";
import axios from "axios";
import SearchResultBox from "@/components/modules/SearchResultBox/SearchResultBox";
import { SetOriginLocationContext } from "@/contexts/SetOriginLocationContext";
import { SetDestinationLocationContext } from "@/contexts/SetDestinationLocationContext";
import { SetSearchValueContext } from "@/contexts/SetSearchValueContext";
import { SetIsResultShownContext } from "@/contexts/SetIsResultShownContext";
import { stringify } from "querystring";

function page() {
  const [originLocation, setOriginLocation] = useState({
    lat: null,
    lng: null,
  });
  const [destinationLocation, setDestinationLocation] = useState({
    lat: null,
    lng: null,
  });
  const [searchValue, setSeachValue] = useState("");
  const [vehicleResponse, setVehicleResponse] = useState([]);
  const [isResultShown, setIsResultShown] = useState(false);

  ////////////////////////////  Send Searchded value To API And Get Vehicle List  ////////////////////////////

  const searchVehicleHandler = async () => {
    if (searchValue.trim().length >= 2) {
      const response = await axios
        .get("https://exam.pishgamanasia.com/webapi/Request/GetVehicleUsers", {
          params: {
            SearchTerm: searchValue,
            UserToken: localStorage.getItem("user-token"),
          },
        })
        .catch((err) => err);
      setVehicleResponse(response.data.data);
      setIsResultShown(true);
    } else {
      toast.error("عبارت جستجو شده باید حداقل دارای 2 کاراکتر باشد !");
    }
  };

  const changeInputValue: (ev: any) => void = (ev) => {
    setSeachValue(ev.target.value);
  };

  ////////////////////////////  Submit Client Request And Show Tracking Code  //////////////////////////

  const submitRequestHandler = async () => {
    const requestDetails = {
      userToken: localStorage.getItem("user-token"),
      vehicleUserTypeId: 0,
      source: stringify(originLocation),
      destination: stringify(destinationLocation),
    };
    const response: any = await axios
      .post(
        "https://exam.pishgamanasia.com/webapi/Request/SendRequest",
        requestDetails
      )
      .catch((err) => console.log("Error : ", err));
    if (response.status === 200) {
      toast.success(
        `درخواست شما با کد پیگیری "${response.data.data.requestNo}" ثبت شد.`
      );
    }
  };

  ///////////////////////////  Hide Search Result When Input Gets Empty  ////////////////////////////////

  useEffect(() => {
    if (searchValue.length === 0) {
      setIsResultShown(false);
    }
  }, [searchValue]);

  return (
    <div className="flex flex-col gap-y-5 justify-center items-center h-screen bg-gradient-to-br from-[#000000] to-[#454545] font-Dana">
      <SetOriginLocationContext.Provider value={setOriginLocation}>
        <SetDestinationLocationContext.Provider value={setDestinationLocation}>
          <LeafletMap />
        </SetDestinationLocationContext.Provider>
      </SetOriginLocationContext.Provider>
      {/*------------------ Map Inputs Section ------------------*/}
      <div className="w-[75%] md:w-[60%] xl:w-[50%] flex flex-col rounded-2xl bg-white bg-opacity-10 shadow-md p-5">
        <div className="flex flex-col gap-y-2">
          {/* -------------------   Origin  -------------------  */}
          <div className="text-rose-500 text-xs sm:text-sm flex items-center gap-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            مبدا :{" "}
            <span className="location-details">
              {originLocation.lat !== null
                ? `${originLocation.lat} , ${originLocation.lng}`
                : "با کلیک  روی نقشه مبدا را انتخاب کنید."}
            </span>
          </div>

          {/* ------------------   Destination  ---------------- */}
          <div className="text-green-400 text-xs sm:text-sm flex items-center gap-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            مقصد :{" "}
            <span className="location-details">
              {destinationLocation.lat !== null
                ? `${destinationLocation.lat} , ${destinationLocation.lng}`
                : "با کلیک  روی نقشه مقصد را انتخاب کنید."}
            </span>
          </div>
        </div>
        {/* ------------------   Search Bar  ---------------- */}
        <div className="relative flex items-center justify-between px-3 rounded-lg mt-4 bg-gray-200/20">
          <input
            value={searchValue}
            type="text"
            className="search-input"
            onChange={changeInputValue}
            placeholder="جستجو از میان انواع وسایل نقلیه..."
          />
          <button
            className="text-gray-400 hover:text-amber-600 transition-colors"
            onClick={searchVehicleHandler}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </button>
          {/* ------------------   Search Result Box  ---------------- */}
          <SetSearchValueContext.Provider value={setSeachValue}>
            <SetIsResultShownContext.Provider value={setIsResultShown}>
              <SearchResultBox
                isResultShown={isResultShown}
                vehicleResponse={vehicleResponse}
              />
            </SetIsResultShownContext.Provider>
          </SetSearchValueContext.Provider>
        </div>
        <span className="ms-1 mt-[.3rem] text-xs text-gray-400 line-clamp-1">
          موارد قابل جستجو: ون، وانت، کامیون و... (در صورت عدم انتخاب، بصورت
          پیشفرض "وانت" برای شما انتخاب میشود)
        </span>
        {/* ------------------   Submit Button  ---------------- */}
        <button
          disabled={
            originLocation.lat && destinationLocation.lat ? false : true
          }
          className={`${
            originLocation.lat && destinationLocation.lat
              ? `order-btn`
              : `deactive-btn`
          }`}
          onClick={submitRequestHandler}
        >
          ثبت درخواست
        </button>
      </div>
    </div>
  );
}

export default page;
