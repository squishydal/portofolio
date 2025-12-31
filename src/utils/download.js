import { jsPDF } from 'jspdf';
import { resumeText, contact, neofetchData } from '../config/resume.js';

export function downloadTXT() {
  const content = `
${neofetchData.name.toUpperCase()} - ${neofetchData.title.toUpperCase()}
${'='.repeat(60)}

${resumeText}

${'='.repeat(60)}
CONTACT INFORMATION
${'='.repeat(60)}

Email: ${contact.email}
Phone: ${contact.phone}
LinkedIn: ${contact.linkedin}
GitHub: ${contact.github}
Website: ${contact.website}
Location: ${contact.location}

Generated: ${new Date().toLocaleString()}
`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${neofetchData.name.replace(/\s+/g, '_')}_Resume.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadPDF() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let y = 20;

  // Helper to add text with wrapping
  function addText(text, fontSize = 11, isBold = false) {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach(line => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += fontSize * 0.5;
    });
  }

  // Header
  doc.setFillColor(18, 10, 31);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(216, 180, 254);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(neofetchData.name, margin, 25);
  doc.setFontSize(14);
  doc.text(neofetchData.title, margin, 33);

  // Reset colors
  doc.setTextColor(0, 0, 0);
  y = 50;

  // Contact Info
  addText(`Email: ${contact.email} | Phone: ${contact.phone}`, 10);
  addText(`LinkedIn: ${contact.linkedin} | GitHub: ${contact.github}`, 10);
  addText(`Location: ${contact.location}`, 10);
  y += 5;

  // Resume content
  const sections = resumeText.split('\n\n');
  sections.forEach(section => {
    const lines = section.split('\n');
    const title = lines[0];
    
    // Section title
    if (title && !title.startsWith('•') && !title.startsWith('─')) {
      y += 3;
      addText(title, 14, true);
      y += 2;
    }
    
    // Section content
    lines.slice(1).forEach(line => {
      if (line.trim()) {
        addText(line, 11);
      }
    });
    
    y += 3;
  });

  // Footer
  y += 10;
  doc.setFontSize(9);
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, y);

  doc.save(`${neofetchData.name.replace(/\s+/g, '_')}_Resume.pdf`);
}
