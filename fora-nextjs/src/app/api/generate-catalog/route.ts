import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { products, POWDER_COATING_PRICE, formatPrice } from '@/data/products';

// Extend jsPDF type for autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

export async function GET() {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Company colors
    const primaryColor: [number, number, number] = [0, 86, 179];
    const grayColor: [number, number, number] = [100, 100, 100];
    const lightGray: [number, number, number] = [240, 240, 240];

    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text('CORNER | PROFILE', 20, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Соединительные элементы для скругляющих профилей', 20, 28);
    doc.text('в чистых помещениях', 20, 34);

    // Catalog date
    doc.setFontSize(9);
    doc.text(`Каталог продукции ${new Date().getFullYear()}`, 150, 20);
    doc.text(`Дата: ${new Date().toLocaleDateString('ru-RU')}`, 150, 26);

    // Introduction section
    let yPos = 55;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('О компании', 20, yPos);

    yPos += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const introText = 'ООО «Фора» — российский производитель алюминиевых соединительных элементов для скругляющих профилей в чистых помещениях. Полный цикл производства: от литья до порошковой окраски.';
    const introLines = doc.splitTextToSize(introText, 170);
    doc.text(introLines, 20, yPos);

    yPos += introLines.length * 5 + 10;

    // Features
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Наши преимущества:', 20, yPos);
    
    yPos += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const features = [
      '• Собственное производство в России',
      '• Материал: алюминий АД31',
      '• Порошковая окраска в любой цвет RAL',
      '• Радиусы: R40, R50, R55, R65, R70',
      '• Срок изготовления: от 7 рабочих дней',
    ];
    features.forEach((feature, index) => {
      doc.text(feature, 25, yPos + index * 5);
    });

    yPos += features.length * 5 + 15;

    // Products Table Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text('Каталог продукции', 20, yPos);

    yPos += 10;

    // Group products by category
    const groupedProducts: Record<string, typeof products> = {};
    products.forEach((product) => {
      if (!groupedProducts[product.category]) {
        groupedProducts[product.category] = [];
      }
      groupedProducts[product.category].push(product);
    });

    // Create table data
    const tableData: any[] = [];
    
    Object.entries(groupedProducts).forEach(([category, categoryProducts]) => {
      // Category header row
      tableData.push([
        { content: category, colSpan: 5, styles: { fillColor: lightGray, fontStyle: 'bold', fontSize: 10 } }
      ]);
      
      // Product rows
      categoryProducts.forEach((product) => {
        tableData.push([
          product.sku,
          product.name,
          `R${product.radiusValue}`,
          product.material,
          formatPrice(product.basePrice),
        ]);
      });
    });

    // Generate table
    doc.autoTable({
      startY: yPos,
      head: [['Артикул', 'Наименование', 'Радиус', 'Материал', 'Цена без НДС']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
      },
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 28 },
        1: { cellWidth: 70 },
        2: { cellWidth: 20 },
        3: { cellWidth: 35 },
        4: { cellWidth: 27 },
      },
      margin: { left: 20, right: 20 },
      didDrawPage: (data: any) => {
        // Footer on each page
        const pageCount = doc.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(...grayColor);
        doc.text(
          `Страница ${data.pageNumber} из ${pageCount}`,
          105,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      },
    });

    // Get last Y position after table
    const finalY = doc.lastAutoTable.finalY + 15;

    // Add new page if needed
    if (finalY > 250) {
      doc.addPage();
      yPos = 20;
    } else {
      yPos = finalY;
    }

    // Pricing note
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Информация о ценах:', 20, yPos);

    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`• Цены указаны без НДС`, 25, yPos);
    yPos += 5;
    doc.text(`• Порошковая окраска: +${POWDER_COATING_PRICE} ₽/шт`, 25, yPos);
    yPos += 5;
    doc.text('• При заказе от 100 шт — скидка 5%', 25, yPos);
    yPos += 5;
    doc.text('• При заказе от 500 шт — скидка 10%', 25, yPos);

    yPos += 15;

    // Contact information
    doc.setFillColor(...lightGray);
    doc.roundedRect(20, yPos, 170, 35, 3, 3, 'F');

    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...primaryColor);
    doc.text('Контактная информация', 25, yPos);

    yPos += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text('Телефон: +7 (909) 297-41-44, +7 (920) 057-10-12', 25, yPos);
    yPos += 5;
    doc.text('Email: zuev720@mail.ru', 25, yPos);
    yPos += 5;
    doc.text('Адрес: 606100, Нижегородская обл., г. Павлово, ул. Коммунистическая, д. 10', 25, yPos);

    // Generate PDF buffer
    const pdfBuffer = doc.output('arraybuffer');

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Corner-Profile-Catalog-2026.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF catalog' },
      { status: 500 }
    );
  }
}
