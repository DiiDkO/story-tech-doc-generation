import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const generateXLSXFile = async (techDocDataObj) => {
  const testCaseData = techDocDataObj.testCaseData || {
    storyNumber: "",
    shortDescription: "",
    description: "",
    acceptanceCriteria: "",
  };
  
  const storyNumber = testCaseData.storyNumber ;
  const cellBackgroundColor = "FF70AD47";
  const cellTextColor = "FFFFFFFF";

  const workbook = new ExcelJS.Workbook();

  //1. How to Use This Document Sheet
  const sheet1 = workbook.addWorksheet("How to Use This Document");
  sheet1.getCell("A1").value =
    "You must save a local copy before editing the file";
  sheet1.mergeCells("A1:X1");
  sheet1.addRow();
  sheet1.getCell(
    "A3"
  ).value = `This spreadsheet is used to document the Test Cases, the Solution Design and Deployment Instructions of a story.

This workbook should be attached to all Stories. Document should be named in the following format:
<Story Number>_Technical Documentation_<Version (if there are multiple)>
Examples:
STRY00001_Technical Documentation
STRY00234_Technical Documentation_V2

The document is comprised of multiple sheets and the definitions of each are below:

1. Test Cases - Contains Description, Acceptance Criteria and the Test Steps that need to be performed with Expected and Actual results

2. Solution Design - Contains the Technical Details of the created/updated Configuration Records

3. Deployment Instructions - Contains instructions that need to be followed when deploying the Update Set to other environments.`;

  sheet1.mergeCells(3, 1, 27, 11);

  ["A1", "A3"].forEach((addr) => {
    sheet1.getCell(addr).font = {
      bold: true,
      color: { argb: cellTextColor },
    };
    sheet1.getCell(addr).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: cellBackgroundColor }, // Light Green
    };
    sheet1.getCell(addr).alignment = {
      vertical: "top",
      horizontal: addr == "A1" ? "center" : "left",
      wrapText: true,
    };
  });

  // 2. Test Cases Sheet
  const sheet2 = workbook.addWorksheet("Test Cases");
  sheet2.getCell("A1").value = "Decription";
  sheet2.getCell("E1").value = "Acceptance Criteria";
  sheet2.mergeCells("A1:C1");
  sheet2.mergeCells("E1:F1");

  ["A1", "E1"].forEach((addr) => {
    sheet2.getCell(addr).font = {
      bold: true,
      color: { argb: cellTextColor },
    };
    sheet2.getCell(addr).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: cellBackgroundColor }, 
    };
  });

  sheet2.mergeCells(2, 1, 4, 3);
  sheet2.mergeCells(2, 5, 4, 6);
  sheet2.getRow(2).width = 50;
  sheet2.getRow(2).height = 150;
  sheet2.getRow(3).height = 150;
  sheet2.getRow(4).height = 150;
  sheet2.getCell("A2").value = testCaseData.description || "";
  sheet2.getCell("E2").value= testCaseData.acceptanceCriteria || "" ;

  ["A2", "E2"].forEach((addr) => {
    sheet2.getCell(addr).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
  });
  
  const testHeaders = [
    "Title",
    "Prerequisites",
    "Number",
    "Steps",
    "Expected Result",
    "Actual Result",
    "Attachments",
  ];

  sheet2.addRow();
  const headerRow6 = sheet2.addRow(testHeaders);
  const row7 = sheet2.addRow("", "", "", "", "", "", "", "");

  headerRow6.eachCell((cell, colNum) => {
    const startCol = colNum;
    const nextRowNum = row7.number;

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: cellBackgroundColor }, // Light Yellow
    };

    cell.font = { bold: true, color: { argb: cellTextColor } };
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    cell.get;

    if ([1, 2].includes(startCol)) {
      const mergeStart = nextRowNum;
      const mergeEnd = nextRowNum + 17;

      sheet2.mergeCells(mergeStart, startCol, mergeEnd, startCol);

      for (var i = mergeStart; i <= mergeEnd; i++) {
        sheet2.getRow(i).height = 22;
      }
    } else if (startCol === 4) {
      sheet2.mergeCells(nextRowNum, startCol, nextRowNum, startCol + 2);
      sheet2.getRow(nextRowNum).height = 40;
    }

    const merged = sheet2.getCell(nextRowNum, startCol);
    if (startCol == 1) {
      merged.value = testCaseData.shortDescription || "No Title Provided";
    } else if (startCol == 2) {
      merged.value = `1. Tester must have ServiceNow foundation training.
2. Tester must have access on ServiceNow DEV/Test environment. 
3. Test accounts are already created for the purpose of this test.`;
    } else if (startCol == 3) {
      merged.value = "1";
    } else if (startCol == 4) {
      merged.value = "To execute test steps please refer to video attached to " + storyNumber;
      merged.font = { bold: true, color: { argb: "FFFF0000" }, size: 20 };
    }
    merged.alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };
  });

  sheet2.columns.forEach((col) => (col.width = col.number == 5 ? 50 : 30));

  // 3. Solution Design Sheet
  const sheet3 = workbook.addWorksheet("Solution Design");

  const solutionHeaders = [
    { header: "Table", key: "table", width: 40 },
    { header: "Object", key: "object", width: 40 },
    { header: "Name", key: "name", width: 40 },
    { header: "Description", key: "description", width: 40 },
    { header: "Comments", key: "comments", width: 40 },
  ];

  sheet3.columns = solutionHeaders;
  const headerRow3 = sheet3.getRow(1);

  headerRow3.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: cellBackgroundColor }, 
    };
    cell.font = { bold: true, color: { argb: cellTextColor } };
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
  });

  sheet3.addRows(techDocDataObj.customerUpdates || []);

  sheet3.columns.forEach((col) => {
     var key = col.key;
     if(key == "table") {
      col.width = 70;
     } else if(key == "name"){
      col.width = 70;
     } else {
      col.width = 40;
     }
        
  });

  // 4. Deployment Instructions Sheet
  const sheet4 = workbook.addWorksheet("Deployment Instructions");
  const deploymentInstructionsData = techDocDataObj.updateSetsNames || [];
    
  sheet4.getCell("A1").value =
    "Actions to be performed before migration of Update Sets";
  sheet4.getCell("A4").value = "Migrate the Update Sets in the following order";
  deploymentInstructionsData.forEach((updateSetValue) => {
    sheet4.addRow([updateSetValue]);
  });
  sheet4.addRow([]);

  const lastRow = sheet4.addRow([
    "Actions to be performed after migration of Update Sets",
  ]);
  const lastCol = ("A" + lastRow.number);

  ["A1", "A4", lastCol].forEach((addr) => {
    sheet4.getCell(addr).font = {
      bold: true,
      color: { argb: cellTextColor },
    };
    sheet4.getCell(addr).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: cellBackgroundColor }, 
    };
  });

  sheet4.getColumn(1).width = 80;

  //  Export file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, (storyNumber +"-Technical_Documentation_Template.xlsx"));
};
