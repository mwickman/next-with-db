import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: "root",
      password: process.env.DB_PASSWORD,
      database: "mysql",
      port: 20084,
      // port: 20090, // working one
      ssl: {
        ca: fs.readFileSync(path.join(process.cwd(), "src/app/testdb/ca-cert.pem")),
      },
    });

    const [rows] = await connection.execute("SHOW DATABASES");
    return NextResponse.json({ databases: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err: err });
  } finally {
    await connection?.end();
  }
}
