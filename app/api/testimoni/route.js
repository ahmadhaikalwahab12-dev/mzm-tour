import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "https://hknyisiwrowgkvucwnue.supabase.co",
  process.env.SUPABASE_SERVICE_KEY || "sb_publishable_OzWp61Vk2mIF3a6hv6970w_ANMcRirP"
);

// ── Anti-spam: rate limit per IP (in-memory)
const submitLog = new Map();

function getClientIP(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 jam

  if (!submitLog.has(ip)) submitLog.set(ip, { timestamps: [] });
  const log = submitLog.get(ip);

  // Hapus timestamp lama
  log.timestamps = log.timestamps.filter(t => now - t < windowMs);

  // Maks 3 submit per IP per jam
  if (log.timestamps.length >= 3) {
    return { allowed: false, message: "Kamu sudah mengirim 3 ulasan dalam 1 jam. Coba lagi nanti." };
  }

  // Cooldown 2 menit antar submit
  if (log.timestamps.length > 0) {
    const last = log.timestamps[log.timestamps.length - 1];
    const sisa = Math.ceil((2 * 60 * 1000 - (now - last)) / 1000);
    if (now - last < 2 * 60 * 1000) {
      return { allowed: false, message: `Tunggu ${sisa} detik sebelum mengirim ulasan lagi.` };
    }
  }

  return { allowed: true };
}

function sanitize(str) {
  if (!str) return "";
  return str
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/https?:\/\/\S+/gi, "")
    .slice(0, 500);
}

function isSpam(text) {
  return [
    /(.)\1{7,}/i,
    /(www\.|http|\.com|\.id\/)/i,
    /[A-Z]{12,}/,
    /\b(promo|bonus|casino|slot|judi|togel|4d|5d|pulsa|gratis|menang|jackpot)\b/i,
  ].some(p => p.test(text));
}

// GET - ambil semua testimoni yang tampil
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("testimoni")
      .select("*")
      .eq("tampil", true)
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// POST - kirim testimoni baru (anti-spam + limit 3)
export async function POST(request) {
  try {
    const ip = getClientIP(request);

    // 1. Rate limit per IP
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, message: rateCheck.message }, { status: 429 });
    }

    const body = await request.json();
    const { nama, lokasi, rating, pesan } = body;

    // 2. Validasi field wajib
    if (!nama?.trim() || !pesan?.trim()) {
      return NextResponse.json({ success: false, message: "Nama dan pesan wajib diisi." }, { status: 400 });
    }

    // 3. Validasi panjang
    if (nama.trim().length < 2 || nama.trim().length > 60) {
      return NextResponse.json({ success: false, message: "Nama harus 2-60 karakter." }, { status: 400 });
    }
    if (pesan.trim().length < 10 || pesan.trim().length > 500) {
      return NextResponse.json({ success: false, message: "Pesan harus 10-500 karakter." }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, message: "Rating harus antara 1-5." }, { status: 400 });
    }

    // 4. Sanitasi
    const cleanNama   = sanitize(nama);
    const cleanLokasi = sanitize(lokasi || "");
    const cleanPesan  = sanitize(pesan);

    // 5. Deteksi spam
    if (isSpam(cleanNama) || isSpam(cleanPesan)) {
      return NextResponse.json({ success: false, message: "Konten terdeteksi sebagai spam." }, { status: 400 });
    }

    // 6. Cek duplikat persis (nama + pesan sama)
    const { data: dup } = await supabase
      .from("testimoni")
      .select("id")
      .eq("nama", cleanNama)
      .eq("pesan", cleanPesan)
      .limit(1);

    if (dup && dup.length > 0) {
      return NextResponse.json({ success: false, message: "Ulasan ini sudah pernah dikirim." }, { status: 400 });
    }

    // 7. Limit 3 ulasan per nama (sepanjang masa)
    const { count } = await supabase
      .from("testimoni")
      .select("id", { count: "exact", head: true })
      .ilike("nama", cleanNama);

    if (count >= 3) {
      return NextResponse.json({
        success: false,
        message: "Maksimal 3 ulasan per orang. Terima kasih sudah berbagi!",
      }, { status: 400 });
    }

    // 8. Simpan
    const { data, error } = await supabase
      .from("testimoni")
      .insert([{
        nama:   cleanNama,
        lokasi: cleanLokasi,
        rating: Number(rating) || 5,
        pesan:  cleanPesan,
        tampil: true,
      }])
      .select()
      .single();

    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    // Catat timestamp
    submitLog.get(ip).timestamps.push(Date.now());

    return NextResponse.json(
      { success: true, message: "Ulasan berhasil dikirim! Terima kasih.", data },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// PATCH - update tampil/sembunyikan (admin)
export async function PATCH(request) {
  try {
    const { id, tampil } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: "ID wajib diisi." }, { status: 400 });

    const { data, error } = await supabase
      .from("testimoni").update({ tampil }).eq("id", id).select().single();

    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

// DELETE - hapus testimoni (admin)
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: "ID wajib diisi." }, { status: 400 });

    const { error } = await supabase.from("testimoni").delete().eq("id", id);
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: "Testimoni berhasil dihapus." }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." }, { status: 500 });
  }
}