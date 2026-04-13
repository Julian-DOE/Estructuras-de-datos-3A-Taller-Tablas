// Se encarga de dibujar y actualizar la tabla

import {filterData} from './filters.js';
import {getTotals} from './reducers.js';

let data = [];        // Datos en memoria
let sortKey = null;   // Columna usada para ordenar
let asc = true;       // Orden ascendente o descendente

// Guarda los datos recibidos desde main.js
export function setData(d){ data = d; }

// Renderiza la tabla según filtros y orden
export function renderTable(filter=''){
  if(!data.length) return;

  const table = document.getElementById('table');
  const cols = Object.keys(data[0]);

  // Aplica filtro de búsqueda
  let filtered = filterData(data, filter);

  // Ordenamiento si hay columna seleccionada
  if(sortKey){
    filtered.sort((a,b)=>{
      if(a[sortKey]>b[sortKey]) return asc?1:-1;
      if(a[sortKey]<b[sortKey]) return asc?-1:1;
      return 0;
    });
  }

  // Crear encabezados de columnas
  table.querySelector('thead').innerHTML = '<tr>'+cols.map(c=>
    `<th data-key="${c}">${c}</th>`
  ).join('')+'</tr>';

  // Permitir ordenamiento al hacer clic en columna
  table.querySelectorAll('th').forEach(th=>{
    th.onclick = ()=>{
      if(sortKey===th.dataset.key) asc=!asc;
      else{ sortKey=th.dataset.key; asc=true; }
      renderTable(filter);
    };
  });

  // Construir filas con edición inline
  table.querySelector('tbody').innerHTML = filtered.map((row,i)=>
    '<tr>'+cols.map(c=>
      `<td contenteditable data-i="${i}" data-k="${c}">${row[c]}</td>`
    ).join('')+'</tr>'
  ).join('');

    // Guardar cambios al editar una celda
  table.querySelectorAll('td[contenteditable]').forEach(td=>{
    td.oninput = ()=>{
      const i = td.dataset.i;
      const k = td.dataset.k;
      let v = td.innerText;
      if(!isNaN(v) && v.trim()!=='') v = Number(v);
      data[i][k] = v;
    };
  });

  // Calcular y mostrar totales/promedios
  const totals = getTotals(filtered, cols);
  table.querySelector('tfoot').innerHTML = '<tr>'+cols.map(c=>`<td>${totals[c]??'—'}</td>`).join('')+'</tr>';}