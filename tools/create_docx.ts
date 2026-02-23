import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as path from "path";
import libre from 'libreoffice-convert';
import { promisify } from 'util';

const convertAsync = promisify(libre.convert);

const generate = async () => {
    // Create document
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun("Hello "),
                            new TextRun({
                                text: "World",
                                bold: true,
                            }),
                        ],
                    }),
                ],
            },
        ],
    });

    // Used to export the file into a .docx file
    const buffer = await Packer.toBuffer(doc);

    // Save the file in the root directory
    const filePath = path.resolve(process.cwd(), "hello.docx");
    fs.writeFileSync(filePath, buffer);
    console.log("Document created successfully at: " + filePath);

    // ----------------------------
    // PDF Conversion
    // ----------------------------
    try {
        const ext = '.pdf';
        const pdfPath = path.resolve(process.cwd(), `hello${ext}`);
        
        // Read the file we just created
        const file = fs.readFileSync(filePath);
        
        // Convert it to pdf format with undefined filter (see Libreoffice docs)
        const pdfBuf = await convertAsync(file, ext, undefined);
        
        // Write the converted file
        fs.writeFileSync(pdfPath, pdfBuf);
        console.log("PDF created successfully at: " + pdfPath);
    } catch (err: any) {
        console.error("Error converting to PDF:", err.message);
        if (err.message.includes("Could not find soffice binary")) {
            console.error("\nTo fix this, please install LibreOffice:");
            console.error("  - macOS: brew install --cask libreoffice");
            console.error("  - Ubuntu: sudo apt-get install libreoffice");
            console.error("  - Windows: Download from https://www.libreoffice.org/download/download-libreoffice/");
        }
    }
};

generate();
