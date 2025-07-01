import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

export async function GET(request: NextRequest) {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    try {
        const authClient = await auth.getClient() as OAuth2Client;
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const range = 'Sheet1!A1:D10';

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        return new Response("Error fetching data", { status: 500 });
    }
}