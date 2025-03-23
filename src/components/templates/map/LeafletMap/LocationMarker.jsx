"use client";
import React, { useContext, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { SetOriginLocationContext } from "@/contexts/SetOriginLocationContext";
import { SetDestinationLocationContext } from "@/contexts/SetDestinationLocationContext";

function LocationMarker() {
  const setOriginLocation = useContext(SetOriginLocationContext)
  const setDestinationLocation = useContext(SetDestinationLocationContext)
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const icon = L.icon({ iconUrl: "/images/origin.png" });
  const icon2 = L.icon({ iconUrl: "/images/destination.png" });
  const map = useMapEvents({
    click(ev) {
      if (origin === null) {
        setOrigin(ev.latlng);
        setOriginLocation(ev.latlng);
      } else {
        setDestination(ev.latlng);
        setDestinationLocation(ev.latlng);
      }
    },
  });

  return origin && !destination ? (
    <Marker position={origin} icon={icon}/>
  ) : origin && destination ? (
    <>
      <Marker position={origin} icon={icon}/>
      <Marker position={destination} icon={icon2}/>
    </>
  ) : null;
}

export default LocationMarker;
