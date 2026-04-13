// Archivo principal que conecta la interfaz con la lógica de la aplicación

import {renderTable, setData} from './table.js';

let data = []; // Almacena los datos cargados

const fileInput = document.getElementById('fileInput');
const loadSampleBtn = document.getElementById('loadSample');
const searchInput = document.getElementById('searchInput');

// Leer archivo JSON cargado por el usuario
fileInput.addEventListener('change', e => {
  const reader = new FileReader();
  reader.onload = ev => {
    data = JSON.parse(ev.target.result);
    setData(data);      // Guardamos datos globalmente
    renderTable();      // Dibujamos la tabla
  };
  reader.readAsText(e.target.files[0]);
});

// Cargar datos de ejemplo
loadSampleBtn.addEventListener('click', async ()=>{
  const res = await fetch('data/sample.json');
  data = await res.json();
  setData(data);
  renderTable();
});

// Filtrado dinámico mientras se escribe
searchInput.addEventListener('input', e => {
  renderTable(e.target.value);
});