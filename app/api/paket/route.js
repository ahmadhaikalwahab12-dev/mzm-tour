import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "https://hknyisiwrowgkvucwnue.supabase.co",
  process.env.SUPABASE_SERVICE_KEY || "sb_publishable_OzWp61Vk2mIF3a6hv6970w_ANMcRirP"
);

// GET - ambil semua paket
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jenis = searchParams.get("jenis");

    let query = supabase.from("paket").select("*").order("created_at", { ascending: false });
    if (jenis && jenis !== "Semua") query = query.eq("jenis", jenis);

    const { data, error } = await query;
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// POST - tambah paket baru
export async function POST(request) {
  try {
    const body = await request.json();
    const { nama, jenis, kategori, durasi, maskapai, hotel, harga, berangkat, keberangkatan, gambar, status } = body;

    if (!nama?.trim() || !jenis?.trim()) {
      return NextResponse.json({ success: false, message: "Nama dan jenis paket wajib diisi." }, { status: 400 });
    }

    const { data, error } = await supabase.from("paket").insert([{
      nama: nama.trim(),
      jenis,
      kategori: kategori || "Reguler",
      durasi: durasi || "",
      maskapai: maskapai || "",
      hotel: hotel || "Bintang 4",
      harga: harga || "",
      berangkat: berangkat || "",
      keberangkatan: keberangkatan || "JAKARTA (CGK)",
      gambar: gambar || "",
      status: status || "Tersedia",
    }]).select().single();

    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: "Paket berhasil ditambahkan!", data }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// PUT - update paket
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, created_at, ...payload } = body;

    if (!id) return NextResponse.json({ success: false, message: "ID wajib diisi." }, { status: 400 });

    const { data, error } = await supabase.from("paket").update(payload).eq("id", id).select().single();
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: "Paket berhasil diperbarui!", data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// PATCH - update status saja
export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: "ID wajib diisi." }, { status: 400 });

    const { data, error } = await supabase.from("paket").update({ status }).eq("id", id).select().single();
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// DELETE - hapus paket
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: "ID wajib diisi." }, { status: 400 });

    const { error } = await supabase.from("paket").delete().eq("id", id);
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: "Paket berhasil dihapus." }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}