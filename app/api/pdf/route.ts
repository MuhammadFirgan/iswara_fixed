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
  drawText("1. Siapa tokoh utama dalam cerita ini?");
  drawText("2. Apa yang dilakukan tokoh utama?");
  drawText("3. Apa masalah yang terjadi dalam cerita?");
  drawText("4. Bagaimana cerita ini berakhir?");

  y -= 30;
  drawText("5. Menurutmu, apakah tokoh utama orang baik? Mengapa?");
  drawText("6. Apa yang bisa kamu pelajari dari cerita ini?");
  drawText("7. Kalau kamu ada di cerita ini, kamu mau jadi siapa? Kenapa?");

  y -= 30;

  drawText("8. Kalau cerita ini terjadi di zaman sekarang, seperti apa ya?");
  drawText("9. Coba ubah akhir cerita dengan versi kamu sendiri!");
  drawText("10. Tulis pesan atau surat pendek untuk tokoh utama!");

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
