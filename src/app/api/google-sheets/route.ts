// import { google } from "googleapis";
// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//     const sheets = google.sheets("v4");
//     const auth = new google.auth.GoogleAuth({
//         scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//     });

//     const CLIENT_ID = '100075218231073797163';
//     const API_KEY = '<YOUR_API_KEY>';

//     try {
//         const authClient = await auth.getClient();
//         const spreadsheetId = process.env.GOOGLE_SHEET_ID;
//         const range = "Sheet1!A1:E10"; // Adjust the range as needed

//         const response = await sheets.spreadsheets.values.get({
//             auth: authClient,
//             spreadsheetId,
//             range,
//         });

//         return new Response(JSON.stringify(response.data.values), {
//             headers: { "Content-Type": "application/json" },
//         });
//     } catch (error) {
//         console.error("Error fetching data from Google Sheets:", error);
//         return new Response("Error fetching data", { status: 500 });
//     }
// }