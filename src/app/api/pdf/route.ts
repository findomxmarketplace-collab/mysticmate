import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// Mapping for images in filesystem
const IMAGE_DIR = path.join(process.cwd(), 'public/images/tarot');
const CARD_IMAGE_MAP: Record<string, string> = {
  'the hermit': 'hermit.png',
  'the star': 'star.png',
  'the sun': 'sun.png',
  'the moon': 'moon.png',
  'the tower': 'tower.png',
  'wheel of fortune': 'wheel.png',
};
const CARD_BACK = 'card-back.png';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reading, title, name, starSign, mood, type } = body;

    if (!reading || !title || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: reading, title, name' },
        { status: 400 }
      );
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Embed standard fonts
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

    const pageWidth = 612; // US Letter width
    const pageHeight = 792; // US Letter height
    const margin = 50;
    const contentWidth = pageWidth - 2 * margin;
    const lineHeight = 14;

    // Colors
    const darkBg = rgb(0.06, 0.02, 0.11);      // #0f051d
    const gold = rgb(0.72, 0.53, 0.04);         // #b8860b
    const white = rgb(1, 1, 1);
    const textColor = rgb(0.85, 0.82, 0.9);
    const mutedColor = rgb(0.5, 0.45, 0.6);

    // Helper to add a new page
    const addNewPage = () => {
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      page.drawRectangle({
        x: 0, y: 0, width: pageWidth, height: pageHeight, color: darkBg,
      });
      return page;
    };

    let currentPage = addNewPage();
    let y = pageHeight - margin;

    // Helper to draw text and handle page breaks
    const drawText = (text: string, options: any = {}) => {
      const { 
        fontSize = 11, 
        fontObj = font, 
        color = textColor, 
        indent = 0,
        lineSpacing = lineHeight + 3
      } = options;

      const cleanText = text.replace(/[^\x00-\x7F]/g, " ").trim();
      if (!cleanText && text.trim()) return y;

      const words = cleanText.split(/\s+/);
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const width = fontObj.widthOfTextAtSize(testLine, fontSize);

        if (width > (contentWidth - indent)) {
          if (y < margin + lineSpacing) {
            currentPage = addNewPage();
            y = pageHeight - margin;
          }
          currentPage.drawText(currentLine, {
            x: margin + indent, y, size: fontSize, font: fontObj, color
          });
          y -= lineSpacing;
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        if (y < margin + lineSpacing) {
          currentPage = addNewPage();
          y = pageHeight - margin;
        }
        currentPage.drawText(currentLine, {
          x: margin + indent, y, size: fontSize, font: fontObj, color
        });
        y -= lineSpacing;
      }

      return y;
    };

    // Header
    currentPage.drawText("MYSTICMATE - SACRED SCROLL", {
      x: margin, y: pageHeight - margin, size: 22, font: fontBold, color: gold
    });
    y -= 30;
    currentPage.drawText(`PREPARED FOR ${name.toUpperCase()} | ${starSign.toUpperCase()}`, {
      x: margin, y, size: 10, font: fontBold, color: white
    });
    y -= 20;
    currentPage.drawText("AI Generated Spiritual Guidance - Confidential & Sacred", {
      x: margin, y, size: 8, font: fontItalic, color: mutedColor
    });
    y -= 40;

    // Content Parsing
    const lines = reading.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        y -= 10;
        continue;
      }

      if (y < 100) {
        currentPage = addNewPage();
        y = pageHeight - margin;
      }

      if (line.startsWith('# ')) {
        y -= 15;
        y = drawText(line.replace('# ', '').toUpperCase(), { fontSize: 20, fontObj: fontBold, color: gold });
        y -= 15;
      } else if (line.startsWith('## [CARD')) {
        const cardMatch = line.match(/\[CARD \d+\] (.*?): (.*?)(\*\*|$)/i);
        const cardTitle = cardMatch ? cardMatch[1].trim().toLowerCase() : "";
        const cardNameText = cardMatch ? (cardMatch[1].trim() + " " + cardMatch[2].trim()) : "Tarot Card";
        
        y -= 20;
        
        // Try to embed card image
        const imgFile = CARD_IMAGE_MAP[cardTitle] || CARD_BACK;
        const imgPath = path.join(IMAGE_DIR, imgFile);
        
        try {
          if (fs.existsSync(imgPath)) {
            const imgData = fs.readFileSync(imgPath);
            const embeddedImg = await pdfDoc.embedPng(imgData);
            const imgDims = embeddedImg.scale(0.35); // Scale down to fit
            
            // Check if image fits on page
            if (y < margin + imgDims.height + 20) {
              currentPage = addNewPage();
              y = pageHeight - margin;
            }
            
            currentPage.drawImage(embeddedImg, {
              x: margin + (contentWidth - imgDims.width) / 2,
              y: y - imgDims.height,
              width: imgDims.width,
              height: imgDims.height,
            });
            y -= (imgDims.height + 20);
          }
        } catch (imgErr) {
          console.error(`Failed to embed image ${imgFile}:`, imgErr);
        }

        y = drawText(cardNameText.toUpperCase(), { fontSize: 16, fontObj: fontBold, color: white });
        y -= 10;
      } else if (line.startsWith('## ')) {
        y -= 15;
        y = drawText(line.replace('## ', ''), { fontSize: 15, fontObj: fontBold, color: white });
        y -= 10;
      } else if (line.startsWith('### ')) {
        y -= 10;
        y = drawText(line.replace('### ', ''), { fontSize: 13, fontObj: fontBold, color: gold });
      } else if (trimmed === '---') {
        y -= 10;
        currentPage.drawLine({
          start: { x: margin, y: y + 5 },
          end: { x: pageWidth - margin, y: y + 5 },
          thickness: 1,
          color: gold,
          opacity: 0.2
        });
        y -= 30;
      } else {
        y = drawText(line, { fontSize: 11, fontObj: font, color: textColor });
      }
    }

    // Footer
    const pages = pdfDoc.getPages();
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      p.drawText(`Page ${i + 1} of ${pages.length} - MysticMate Spiritual Guidance`, {
        x: margin, y: 30, size: 7, font: fontItalic, color: mutedColor
      });
      p.drawText(`Licensed to ${name}`, {
        x: pageWidth - margin - 100, y: 30, size: 7, font: fontItalic, color: mutedColor
      });
    }

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="MysticMate-Sacred-Reading.pdf"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('PDF route error:', error);
    return NextResponse.json({ error: 'The cosmic channel was interrupted. Please try again or use the print option.' }, { status: 500 });
  }
}
