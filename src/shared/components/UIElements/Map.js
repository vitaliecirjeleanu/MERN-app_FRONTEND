import React, { useRef, useEffect } from 'react';

import classes from './Map.module.css';

const Map = props => {
  const mapRef = useRef();
  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      className={`${classes.map} ${props.className}`}
      style={props.style}
      ref={mapRef}
    ></div>
  );
};

export default Map;
