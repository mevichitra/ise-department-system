import { Student } from '@/types/students';

/**
 * Convert an array of objects to CSV string
 */
export function objectsToCSV(data: any[]): string {
  if (data.length === 0) return '';
  
  // Extract headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV header row
  const headerRow = headers.join(',');
  
  // Create rows for each data object
  const rows = data.map(obj => {
    return headers.map(header => {
      // Handle empty values, quotes, and commas in the data
      const value = obj[header] !== undefined && obj[header] !== null 
        ? String(obj[header]) 
        : '';
      
      // Escape quotes and wrap in quotes if the value contains a comma or quote
      const escapedValue = value.replace(/"/g, '""');
      return `"${escapedValue}"`;
    }).join(',');
  });
  
  // Combine header and data rows
  return [headerRow, ...rows].join('\n');
}

/**
 * Export student data to CSV and trigger download
 */
export function exportStudentsToCSV(students: Student[]): void {
  // Convert students to CSV format
  const csv = objectsToCSV(students);
  
  // Create a Blob containing the CSV data
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element to trigger the download
  const link = document.createElement('a');
  link.href = url;
  
  // Set filename with current date
  const date = new Date().toISOString().split('T')[0];
  link.download = `students-export-${date}.csv`;
  
  // Append to body, click to trigger download, and clean up
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Release the URL object
  URL.revokeObjectURL(url);
}
