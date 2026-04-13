// Calcula promedios de columnas numéricas usando reduce()
export function getTotals(data, cols){
  const totals = {};
  cols.forEach(c=>{
    if(typeof data[0][c]==='number'){
      const sum = data.reduce((acc,r)=>acc+Number(r[c]),0);
      totals[c] = (sum/data.length).toFixed(2);
    }
  });
  return totals;
}