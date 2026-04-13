// Filtra filas que coincidan con texto buscado
export function filterData(data, term){
  term = term.toLowerCase();
  return data.filter(row =>
    Object.values(row).some(v => String(v).toLowerCase().includes(term))
  );
}