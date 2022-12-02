import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "../styles/form.module.css";
import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import style from "../styles/Home.module.css";
import Map from "./Map";
function LocationAdd(props) {
  const { item, onChangeLocation, addLocation } = props;
  const [name, setName] = useState("");
  const [type, setType] = useState("Home");
  const DEFAULT_CENTER = [38.907132, -77.036546];

  const [location, setLocation] = useState({
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  });
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(DEFAULT_CENTER);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log(marker.getLatLng());
        }
      },
    }),
    []
  );

  const circleMode = {
    banner: false,
  };
  return (
    <>
      <div className={styles.locationSec}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const marker = markerRef.current;
            addLocation({
              value: {
                name: name,
                type: type,
                lat: marker.getLatLng().lat,
                lng: marker.getLatLng().lng,
              },
            });
          }}
        >
          <div className={styles.container}>
            <p>Share Location</p>
            <div className={styles.name}>
              <div className={styles.label}>Location name:</div>
              <div className={styles.first}>
                <input
                  type="text"
                  value={name}
                  onChange={
                    (e) => setName(e.target.value)
                    // onChangeLocation({
                    //   value: e.target.value,
                    // })
                  }
                ></input>
              </div>
            </div>
            <div className={styles.name}>
              <div className={styles.label}>Location on map:</div>
              <div className={styles.map}>
                <Map
                  className={style.homeMap}
                  center={DEFAULT_CENTER}
                  zoom={12}
                >
                  {({ TileLayer, Marker, Popup }) => (
                    <>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      />

                      <Marker
                        draggable={draggable}
                        eventHandlers={eventHandlers}
                        position={position}
                        ref={markerRef}
                      >
                        <Popup>
                          {item.value.name} {item.value.type}
                        </Popup>
                      </Marker>
                    </>
                  )}
                </Map>
              </div>
            </div>
            <div className={styles.name}>
              <div className={styles.label}>Location type:</div>
              <div className={styles.first}>
                <select
                  className={styles.dropdown}
                  onChange={(item) => {
                    item.preventDefault();
                    setType(item.target.value);
                  }}
                >
                  <option value="home">Home</option>
                  <option value="office">Office</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>
            <div className={styles.name}>
              <div className={styles.label}>Logo:</div>
              <div className={styles.first}>
                <input type="file"></input>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <button className={styles.cancelBtn}>Cancel</button>
            <input className={styles.saveBtn} type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}

export default LocationAdd;
