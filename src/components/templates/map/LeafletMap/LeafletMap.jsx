"use client";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "@/components/templates/map/LeafletMap/LocationMarker";
import "leaflet/dist/leaflet.css";

function LeafletMap() {
  const position = [29.630342466043516, 52.50879335669569];
  return (
    <MapContainer
      className="h-[18rem] md:h-[25rem] xl:h-[28rem] w-[90%] md:w-[80%] xl:w-[70%] rounded-2xl shadow-md"
      center={position}
      zoom={16}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker/>
    </MapContainer>
  );
}

export default LeafletMap;
