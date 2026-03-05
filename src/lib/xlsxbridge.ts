import * as xlsx from "xlsx";
import path from "path";
import fs from "fs";

export async function findSantriInExcel(stambukInput: string) {
  try {
    const filePath = path.join(process.cwd(), "src/data/database_master.xlsx");

    if (!fs.existsSync(filePath)) {
      console.error(`[XLSX-BRIDGE] ❌ File TIDAK ditemukan.`);
      return null;
    }

    const fileBuffer = fs.readFileSync(filePath); 
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const cleanInput = String(stambukInput).replace(/\./g, "").trim();

    return data.find((row: any) => {
      const stambukKey = Object.keys(row).find(k => k.toLowerCase().includes("stambuk"));
      if (!stambukKey) return false;
      const cleanExcel = String(row[stambukKey]).replace(/\./g, "").trim();
      return cleanExcel === cleanInput;
    });

  } catch (error: any) {
    console.error("🚨 XLSX-BRIDGE Fatal Error:", error.message);
    return null;
  }
}