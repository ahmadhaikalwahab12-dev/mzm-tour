import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "https://hknyisiwrowgkvucwnue.supabase.co",
  process.env.SUPABASE_SERVICE_KEY || "sb_publishable_OzWp61Vk2mIF3a6hv6970w_ANMcRirP"
);

// GET - ambil semua testimoni yang tampil
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("testimoni")
      .select("*")
      .eq("tampil", true)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

// POST - kirim testimoni baru
export async function POST(request) {
  try {
    const body = await request.json();
    const { nama, lokasi, rating, pesan } = body;

    if (!nama?.trim() || !pesan?.trim()) {
      return NextResponse.json(
        { success: false, message: "Nama dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating harus antara 1-5." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("testimoni")
      .insert([{
        nama: nama.trim(),
        lokasi: lokasi?.trim() || "",
        rating: Number(rating) || 5,
        pesan: pesan.trim(),
        tampil: true,
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Testimoni berhasil dikirim!", data },
      { status: 201 }
    );

  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

// PATCH - update tampil/sembunyikan (admin)
export async function PATCH(request) {
  try {
    const { id, tampil } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID wajib diisi." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("testimoni")
      .update({ tampil })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

// DELETE - hapus testimoni (admin)
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID wajib diisi." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("testimoni")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Testimoni berhasil dihapus." },
      { status: 200 }
    );

  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}