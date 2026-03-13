import { NextResponse } from "next/server";

const ADMIN_USER = "admin";
const ADMIN_PASS = "mzmtour2026";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      return NextResponse.json(
        { success: true, message: "Login berhasil.", token: "mzm-admin-token-2026" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Username atau password salah." },
      { status: 401 }
    );

  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}