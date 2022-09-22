import 'babel-polyfill';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { validateIp, addTileLayer, getAddress, toggleInfo } from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const infoBtn = document.querySelector('.info__close');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);
infoBtn.addEventListener('click', toggleInfo);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

const mapArea = document.querySelector('.map');
const map = L.map(mapArea).setView([51.7087, 39.1519], 13);

addTileLayer(map);

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}

function setInfo(data) {
  const { lat, lng, country, region, timezone } = data.location;
  ipInfo.innerText = data.ip;
  locationInfo.innerText = `${country} ${region}`;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = data.isp;

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);
}

document.addEventListener('DOMContentLoaded', () => {
  getAddress('46.72.198.50').then(setInfo);
});
