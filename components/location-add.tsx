import React, { useState } from "react";
import styles from "../styles/form.module.css";
import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import style from "../styles/Home.module.css";
function LocationAdd(props) {
  const { item, onChangeLocation, addLocation } = props;
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [location, setLocation] = useState({
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  });
  const position = [location.lat, location.lng];

  const setMarkerPosition = (e) => {
    setLocation({ ...e.latlng, zoom: 19 });
    console.log(`My location is: ${JSON.stringify(e.latlng, null, 3)}`);
  };
  const circleMode = {
    banner: false,
  };
  return (
    <>
      <div className={styles.locationSec}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addLocation({
              value: {
                name: name,
                type: type,
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
                {/* <input type="text"></input> */}
                {/* <Mapping /> */}
                {/* <MapContainer className={style.homeMap}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer> */}
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
