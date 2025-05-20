import React from "react"; 
import { createRoot } from "react-dom/client";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const Map = () => (
    <APIProvider apiKey={process.env.MAP_API_KEY}>
        <Map
            style={{ width: "100%", height: "100%" }}
            defaultZoom={10}
            disableDefaultUI={true}
        /> 
    </APIProvider>
);

const root = createRoot(document.getElementById("map"));
root.render(<Map />);

export default Map;