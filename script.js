const search = () => {
  const ip = document.querySelector('#searchbox').value
  fetch(`https://geo.ipify.org/api/v1?apiKey=at_2GhwRXUb92nsUDXiQl5E6cG2vFJ3i&ipAddress=${ip}`)
    .then(res => res.json())
    .then(data => {
      updateInfo(data)
      console.log(data)
    })
}

const updateInfo = ({ ip, location, isp}) => {
  const { city, region, postalCode, timezone } = location
  
  document.querySelector('#ip').innerText = ip
  
  document.querySelector('#location')
    .innerText = `${city}, ${region} ${postalCode}`
  
  document.querySelector('#timezone').innerText = `UTC${timezone}`

  document.querySelector('#isp').innerText = isp

  map.setView([location.lat, location.lng], 11.5)

  L.marker([location.lat, location.lng], {icon: customMarker}).addTo(map)

}

const mapOptions = {
  attributionControl: false,
  zoomControl: false,
  dragging: false,
  doubleClickZoom: false,
  scrollWheelZoom: false
}

const map = L.map('map', mapOptions).setView([51.505, -0.09], 13)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYTd4aGVybmFuZG8iLCJhIjoiY2tpdGk5N284Mm45MzJzcGRjYnJrY2V3MCJ9.FCkcoNesT6of-RcgrtsTvw'
}).addTo(map);

const customMarker = L.icon({
  iconUrl: './images/icon-location.svg',

  iconSize:     [38, 45], // size of the icon
  iconAnchor:   [19, 45], // point of the icon which will correspond to marker's location
});

window.addEventListener('DOMContentLoaded', () => search())

document.querySelector('#searchbox').addEventListener('keyup', e => {
  if (e.keyCode === 13) search()
})