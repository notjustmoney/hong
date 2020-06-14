/*global kakao*/
import React, { useEffect } from "react";
import styled from "styled-components";

const MapContents = styled.div`
  width: 1100px;
  height: 500px;
`;

const Kakaomap = () => {
  const API_KEY = "6ff12dbd63ad008d7f9f0975cf264724";
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("Mymap");
        let options = {
          center: new kakao.maps.LatLng(37.55089, 127.075482),
          level: 3,
        };
        let map = new window.kakao.maps.Map(container, options);

        let markerPosition = new kakao.maps.LatLng(37.55089, 127.075482);
        let marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);

        let iwContent =
          "<div style='letter-spacing: 1px; font-weight: 600; box-sizing: border-box; width: 150px; height: 30px; padding: 10px; padding-left: -30px; display: flex; justify-content: center; align-items: center;'>홍대병 아지트 🥰</div>";
        let iwPosition = new kakao.maps.LatLng(37.55089, 127.075482);

        let infoWindow = new kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent,
        });
        infoWindow.open(map, marker);
      });
    };
  }, []);
  return <MapContents id="Mymap"></MapContents>;
};

export default Kakaomap;
