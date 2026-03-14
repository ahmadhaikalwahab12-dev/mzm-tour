import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "https://hknyisiwrowgkvucwnue.supabase.co",
  process.env.SUPABASE_SERVICE_KEY || "sb_publishable_OzWp61Vk2mIF3a6hv6970w_ANMcRirP"
);

// GET - ambil jadwal, bisa filter aktif atau riwayat
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status  = searchParams.get("status");
    const jenis   = searchParams.get("jenis");
    const riwayat = searchParams.get("riwayat"); // "true" = tampilkan riwayat

    let query = supabase.from("jadwal").select("*").order("created_at", { ascending: false });

    if (riwayat === "true") {
      // khusus riwayat: is_riwayat = true ATAU status = Selesai/Dibatalkan
      query = query.or("is_riwayat.eq.true,status.eq.Selesai,status.eq.Dibatalkan");
    } else if (riwayat === "false") {
      // hanya jadwal aktif
      query = query.eq("is_riwayat", false).eq("status", "Aktif");
    }

    if (status) query = query.eq("status", status);
    if (jenis)  query = query.eq("jenis", jenis);

    const { data, error } = await query;
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// POST - tambah jadwal baru
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      nama_paket, jenis, tanggal_berangkat, tanggal_pulang,
      maskapai, hotel, kuota, terisi, status, catatan,
      is_riwayat, tanggal_selesai
    } = body;

    if (!nama_paket?.trim() || !tanggal_berangkat?.trim()) {
      return NextResponse.json(
        { success: false, message: "Nama paket dan tanggal berangkat wajib diisi." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("jadwal").insert([{
      nama_paket:        nama_paket.trim(),
      jenis:             jenis || "Umroh",
      tanggal_berangkat: tanggal_berangkat.trim(),
      tanggal_pulang:    tanggal_pulang || "",
      maskapai:          maskapai || "",
      hotel:             hotel || "",
      kuota:             Number(kuota) || 0,
      terisi:            Number(terisi) || 0,
      status:            status || "Aktif",
      catatan:           catatan || "",
      is_riwayat:        is_riwayat || false,
      tanggal_selesai:   tanggal_selesai || "",
    }]).select().single();

    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: "Jadwal berhasil ditambahkan!", data }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// PUT - update jadwal lengkap
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, created_at, ...payload } = body;

    if (!id) return NextResponse.json({ success: false, message: "ID wajib diisi." }, { status: 400 });

    const { data, error } = await supabase.from("jadwal").update(payload).eq("id", id).select().single();
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: "Jadwal berhasil diperbarui!", data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// PATCH - tandai selesai / pindah ke riwayat / update sebagian
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, action, ...fields } = body;

    if (!id) return NextResponse.json({ success: false, message: "ID wajib diisi." }, { status: 400 });

    let updatePayload = {};

    if (action === "selesai") {
      // Tandai perjalanan selesai dan masukkan ke riwayat
      updatePayload = {
        status:          "Selesai",
        is_riwayat:      true,
        tanggal_selesai: fields.tanggal_selesai || new Date().toLocaleDateString("id-ID"),
        catatan:         fields.catatan || "",
      };
    } else if (action === "batalkan") {
      // Tandai dibatalkan dan masukkan ke riwayat
      updatePayload = {
        status:          "Dibatalkan",
        is_riwayat:      true,
        tanggal_selesai: fields.tanggal_selesai || new Date().toLocaleDateString("id-ID"),
        catatan:         fields.catatan || "",
      };
    } else if (action === "aktifkan") {
      // Kembalikan dari riwayat ke jadwal aktif
      updatePayload = {
        status:          "Aktif",
        is_riwayat:      false,
        tanggal_selesai: "",
      };
    } else {
      // Update bebas (status, terisi, catatan, dll)
      if (fields.status          !== undefined) updatePayload.status          = fields.status;
      if (fields.terisi          !== undefined) updatePayload.terisi          = Number(fields.terisi);
      if (fields.catatan         !== undefined) updatePayload.catatan         = fields.catatan;
      if (fields.is_riwayat      !== undefined) updatePayload.is_riwayat      = fields.is_riwayat;
      if (fields.tanggal_selesai !== undefined) updatePayload.tanggal_selesai = fields.tanggal_selesai;
    }

    const { data, error } = await supabase.from("jadwal").update(updatePayload).eq("id", id).select().single();
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    const msg =
      action === "selesai"   ? "Perjalanan ditandai selesai dan masuk riwayat." :
      action === "batalkan"  ? "Perjalanan dibatalkan dan masuk riwayat."       :
      action === "aktifkan"  ? "Jadwal dikembalikan ke aktif."                  :
      "Jadwal berhasil diperbarui.";

    return NextResponse.json({ success: true, message: msg, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// DELETE - hapus jadwal
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: "ID wajib diisi." }, { status: 400 });

    const { error } = await supabase.from("jadwal").delete().eq("id", id);
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: "Jadwal berhasil dihapus." }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}