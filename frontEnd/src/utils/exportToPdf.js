import XLSX from 'xlsx';



// Fonction pour exporter les données en fichier Excel


export function exportToExcel(data) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(excelBlob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'products.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}