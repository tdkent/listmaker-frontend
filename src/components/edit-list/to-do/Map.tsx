import { useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Map = () => {
  const googlemap = useRef();
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
      version: "weekly",
    });

    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 8;

    let map;

    loader.load().then(() => {
      map = new google.maps.Map(googlemap.current, {
        center,
        zoom,
      });
    });
  }, []);
  // const loader = new Loader({
  //   apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY as string,
  //   version: "weekly",
  // });

  // loader.load().then(async () => {
  //   const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
  //   new Map(document.getElementById("google-map") as HTMLElement, {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // });
  // return <div id="google-map" />;
};

export default Map;

// const googlemap = useRef()
//   useEffect(() => {
//     const loader = new Loader({
//       apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
//       version: "weekly",
//     })
//     const center = { lat: marker_coordinates_lat, lng: marker_coordinates_lng }
//     let map
//     loader.load().then(() => {
//       map = new google.maps.Map(googlemap.current, {
//         center,
//         zoom: 18,
//       })
//       const infoWindow = new google.maps.InfoWindow({
//         content: `<div style="padding:0 3px 6px 3px"><p>${title}</p><p style="padding: 4px 0">Number: ${number}, Group: ${group}</p><p>Address: ${marker_address}</div>`,
//         ariaLabel: title,
//       })
//       const marker = new google.maps.Marker({ position: center, map, title })
//       marker.addListener("click", () => {
//         infoWindow.open({
//           anchor: marker,
//           map,
//         })
//       })
//     })
//   }, [
//     marker_coordinates_lat,
//     marker_coordinates_lng,
//     marker_address,
//     title,
//     title_short,
//     number,
//     group,
//   ])
//   return <div className={`${styles.map}`} ref={googlemap} />
