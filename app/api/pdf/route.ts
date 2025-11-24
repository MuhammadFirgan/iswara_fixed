import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET() {
  // buat dokumen PDF baru
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { height } = page.getSize();
  let y = height - 50; // posisi teks dari atas
  const fontSize = 12;

  function drawText(text: string, gap = 20) {
    y -= gap;
    page.drawText(text, { x: 50, y, size: fontSize, font, color: rgb(0, 0, 0) });
  }

  // Judul
  page.drawText("Template Soal Cerita Rakyat (Untuk Anak SD)", {
    x: 120,
    y,
    size: 16,
    font,
    color: rgb(0, 0, 0),
  });

  y -= 40;
  drawText("Judul Cerita: __________________________");
  drawText("Nama: _________________________________");
  drawText("Kelas: _________ ");

  y -= 30;
  drawText("1. Siapa nama tokoh utama dalam cerita yang kamu dengar?");
  drawText("2. Siapa saja teman atau musuh tokoh utama?");
  drawText("3. Dimana tempat kejadian cerita itu?");
  drawText("4. Kapan cerita itu terjadi?");
  drawText("5. Apa masalah yang dialami tokoh utama");
  drawText("6. Bagaimana cara tokoh utama menyelesaikan masalahnya");
  drawText("7. Apa pesan yang dapat dipetik dari cerita tersebut");
  drawText("8. Coba ceritakan kembali isi cerita dengan kata-katamu sendiri");

  const pdfBytes = await pdfDoc.save();

  // --- PERBAIKAN: Bungkus Uint8Array dengan Buffer ---
  // NextResponse dapat menginterpretasikan Buffer sebagai badan respons biner yang valid.
  const buffer = Buffer.from(pdfBytes);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=worksheet.pdf",
    },
  });
}
