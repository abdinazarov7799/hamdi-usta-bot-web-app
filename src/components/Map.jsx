import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const polygon = [
    69.2860199, 41.2874521, 69.2843677, 41.2875327,
    69.28293, 41.2869361, 69.2810417, 41.2859687,
    69.2810417, 41.2850013, 69.2800117, 41.2833243,
    69.2787672, 41.2819376, 69.2836598, 41.2800673,
    69.2865243, 41.2789466, 69.2890134, 41.2810913, 69.2910412,
    41.2803011, 69.292157, 41.2810429, 69.2894211, 41.285582,
    69.2880908, 41.2866622, 69.2860199, 41.2874521
]

const Map = () => {
  return(
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
              <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
          </Marker>
      </MapContainer>
  )
}
export default Map
