import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as path from "path";

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
};

generate();
