// import React, { useEffect, useState, useRef } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Leaflet icon fix
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const defaultCenter = [23.8103, 90.4125]; // Dhaka

// const FlyToDistrict = ({ position, popup }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (position && popup) {
//       map.flyTo(position, 11, {
//         animate: true,
//         duration: 1.5,
//       });

//       setTimeout(() => {
//         popup.openOn(map); // ✅ open the popup after flying
//       }, 1500);
//     }
//   }, [position, popup, map]);

//   return null;
// };

// const Coverage = () => {
//   const [districts, setDistricts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [flyTo, setFlyTo] = useState(null);
//   const [popupToOpen, setPopupToOpen] = useState(null);

//   const popupRefs = useRef({}); // ✅ holds all popup refs by key

//   useEffect(() => {
//     fetch("/public/serviceCenter.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setDistricts(data);
//         setLoading(false);
//       });
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();

//     const term = searchTerm.trim().toLowerCase();
//     if (!term) return;

//     const found = districts.find((d) =>
//       d.district.toLowerCase().includes(term)
//     );

//     if (found) {
//       const key = `${found.latitude}-${found.longitude}`;
//       const popupRef = popupRefs.current[key];

//       if (popupRef) {
//         setFlyTo([found.latitude, found.longitude]);
//         setPopupToOpen(popupRef);
//       }
//     } else {
//       alert("District not found");
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-4">
//         We are available in 64 districts
//       </h1>

//       {/* Search box */}
//       <form onSubmit={handleSearch} className="mb-6 text-center">
//         <input
//           type="text"
//           placeholder="Search districts..."
//           className="input input-bordered w-full max-w-md"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button type="submit" className="btn btn-neutral ml-2 mt-2 sm:mt-0">
//           Search
//         </button>
//       </form>

//       <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
//         <MapContainer
//           center={defaultCenter}
//           zoom={7}
//           scrollWheelZoom={true}
//           className="h-full w-full"
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
//           />

//           {/* ✅ Trigger fly + popup open */}
//           {flyTo && popupToOpen && (
//             <FlyToDistrict position={flyTo} popup={popupToOpen} />
//           )}

//           {!loading &&
//             districts.map((district, idx) => {
//               const key = `${district.latitude}-${district.longitude}`;
//               return (
//                 <Marker
//                   key={idx}
//                   position={[district.latitude, district.longitude]}
//                 >
//                   <Popup
//                     ref={(ref) => {
//                       if (ref) popupRefs.current[key] = ref;
//                     }}
//                   >
//                     <div className="text-sm">
//                       <h2 className="font-bold">{district.district}</h2>
//                       <p>Region: {district.region}</p>
//                       <p>City: {district.city}</p>
//                       <p className="text-xs text-gray-500">
//                         Areas: {district.covered_area.join(", ")}
//                       </p>
//                       <img
//                         src={district.flowchart}
//                         alt="Flowchart"
//                         className="mt-2 rounded-md"
//                         style={{ width: "100px", height: "auto" }}
//                       />
//                     </div>
//                   </Popup>
//                 </Marker>
//               );
//             })}
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default Coverage;
