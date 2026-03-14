"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hknyisiwrowgkvucwnue.supabase.co";
const SUPABASE_KEY = "sb_publishable_OzWp61Vk2mIF3a6hv6970w_ANMcRirP";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const ADMIN_USER = "admin";
const ADMIN_PASS = "mzmtour2026";

const WHATSAPP_URL = `https://wa.me/+6282311000853?text=${encodeURIComponent("Halo, saya tertarik dengan layanan MZM Tour.")}`;

const emptyPaket = { nama:"", jenis:"Umroh", kategori:"Reguler", durasi:"", maskapai:"", hotel:"Bintang 4", harga:"", berangkat:"", keberangkatan:"JAKARTA (CGK)", gambar:"", status:"Tersedia" };
const emptyJadwal = { nama_paket:"", jenis:"Umroh", tanggal_berangkat:"", tanggal_pulang:"", maskapai:"", hotel:"", kuota:"", terisi:"0", status:"Aktif", catatan:"", is_riwayat:false, tanggal_selesai:"" };
const emptyTestimoni = { nama:"", lokasi:"", rating:5, pesan:"", tampil:true };

// Navbar Layanan (sama seperti halaman layanan)
function NavbarAdmin({ onLogout }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Umroh",   href: "/paket-umroh" },
    { label: "Haji",    href: "/paket-haji" },
    { label: "Wisata",  href: "/paket-wisata" },
  ];

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/">
          <Image src="/icon/logo.png" width={82} height={56} alt="MZM Tour" priority />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8 font-semibold text-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link href={item.href}
                  className={`relative pb-1 transition-colors duration-200 ${isActive ? "text-[#008080]" : "text-[#0F172A] hover:text-[#008080]"}`}>
                  {item.label}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008080] rounded-full" />}
                </Link>
              </li>
            );
          })}
          <li className="ml-4 flex items-center gap-3">
            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 py-2.5 px-5 bg-[#008080] hover:bg-[#006666] text-white rounded-md transition-colors duration-200">
              <Image src="/icon/wa.png" width={18} height={18} alt="WhatsApp" />
              WhatsApp
            </Link>
            <button onClick={onLogout}
              className="text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-red-50">
              Keluar
            </button>
          </li>
        </ul>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="py-2 px-3 bg-[#008080] text-white text-sm font-semibold rounded-md">
            WhatsApp
          </Link>
          <button onClick={() => setOpen(!open)} className="p-2 text-gray-800 rounded-md hover:bg-gray-100 text-xl">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <ul className="flex flex-col font-semibold text-sm p-4 gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={() => setOpen(false)}
                  className="block py-3 px-3 rounded-xl text-[#0F172A] hover:bg-gray-50 hover:text-[#008080] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button onClick={onLogout} className="w-full text-left py-3 px-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-sm font-semibold">
                Keluar
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

//  Icon components 
const IconEdit = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IconTrash = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user:"", pass:"" });
  const [loginError, setLoginError] = useState("");
  const [menu, setMenu] = useState("paket");

  const [paketList, setPaketList] = useState([]);
  const [jadwalList, setJadwalList] = useState([]);
  const [testimoniList, setTestimoniList] = useState([]);
  const [filterPaket, setFilterPaket] = useState("Semua");
  const [expandedPaket, setExpandedPaket] = useState(null); // id paket yang dibuka riwayatnya
  const [showRiwayat, setShowRiwayat] = useState(false);
  const [selesaiModal, setSelesaiModal] = useState(null);
  const [selesaiForm, setSelesaiForm] = useState({ catatan:"", tanggal_selesai:"" });

  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => { if (loggedIn) fetchAll(); }, [loggedIn]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  async function fetchAll() {
    const [p, j, t] = await Promise.all([
      supabase.from("paket").select("*").order("created_at", { ascending: false }),
      supabase.from("jadwal").select("*").order("created_at", { ascending: false }),
      supabase.from("testimoni").select("*").order("created_at", { ascending: false }),
    ]);
    if (p.data) setPaketList(p.data);
    if (j.data) setJadwalList(j.data);
    if (t.data) setTestimoniList(t.data);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.user === ADMIN_USER && loginForm.pass === ADMIN_PASS) {
      setLoggedIn(true); setLoginError("");
    } else {
      setLoginError("Username atau password salah.");
    }
  };

  const openAdd = (type) => {
    const empty = type==="paket" ? emptyPaket : type==="jadwal" ? emptyJadwal : emptyTestimoni;
    setForm(empty); setModal({ type, mode:"add" });
  };
  const openEdit = (type, data) => { setForm({...data}); setModal({ type, mode:"edit" }); };
  const closeModal = () => setModal(null);

  const handleSave = async () => {
    setLoading(true);
    const table = modal.type;
    const { id, created_at, ...payload } = form;
    try {
      const isEdit = modal.mode === "edit";
      const endpoint = `/api/${table}`;
      const res = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEdit ? { id, ...payload } : payload),
      });
      const json = await res.json();
      setLoading(false);
      if (!json.success) { alert("Error: " + json.message); return; }
      showToast(isEdit ? "Berhasil diperbarui!" : "Berhasil ditambahkan!");
      closeModal(); fetchAll();
    } catch {
      setLoading(false);
      alert("Terjadi kesalahan jaringan.");
    }
  };

  const handleDelete = async () => {
    const { table, id } = deleteConfirm;
    try {
      const res = await fetch(`/api/${table}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      setDeleteConfirm(null);
      if (!json.success) { alert("Error: " + json.message); return; }
      showToast("Berhasil dihapus!"); fetchAll();
    } catch {
      setDeleteConfirm(null);
      alert("Terjadi kesalahan jaringan.");
    }
  };

  const handleSelesai = async () => {
    try {
      const res = await fetch("/api/jadwal", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selesaiModal.id,
          action: "selesai",
          catatan: selesaiForm.catatan,
          tanggal_selesai: selesaiForm.tanggal_selesai || new Date().toLocaleDateString("id-ID"),
        }),
      });
      const json = await res.json();
      setSelesaiModal(null);
      setSelesaiForm({ catatan:"", tanggal_selesai:"" });
      if (!json.success) { alert("Error: " + json.message); return; }
      showToast("Perjalanan ditandai selesai dan masuk riwayat!"); fetchAll();
    } catch {
      alert("Terjadi kesalahan jaringan.");
    }
  };

  const handleAktifkan = async (id) => {
    await fetch("/api/jadwal", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "aktifkan" }),
    });
    showToast("Jadwal dikembalikan ke aktif!"); fetchAll();
  };

  const toggleTampil = async (item) => {
    await fetch("/api/testimoni", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, tampil: !item.tampil }),
    });
    fetchAll();
  };

  // Upload gambar ke Supabase Storage (bucket: paket-gambar)
  const handleUploadGambar = async (file) => {
    if (!file) return;
    // Validasi ukuran maks 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB."); return;
    }
    // Validasi tipe
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar."); return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `paket_${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage
        .from("paket-gambar")
        .upload(fileName, file, { upsert: true });
      if (error) { alert("Upload gagal: " + error.message); return; }
      const { data: urlData } = supabase.storage
        .from("paket-gambar")
        .getPublicUrl(data.path);
      setForm(f => ({ ...f, gambar: urlData.publicUrl }));
    } catch {
      alert("Terjadi kesalahan saat upload.");
    } finally {
      setUploading(false);
    }
  };

  const filteredPaket = filterPaket === "Semua" ? paketList : paketList.filter(p => p.jenis === filterPaket);

  //  LOGIN PAGE 
  if (!loggedIn) return (
    <div className="fixed inset-0 bg-white z-[200] flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/icon/logo.png" width={90} height={62} alt="logo" className="mx-auto mb-5" />
          <h1 className="text-xl font-extrabold text-gray-900">Selamat Datang</h1>
          <p className="text-gray-400 text-sm mt-1">Masuk ke Admin Panel MZM Tour</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Username</label>
            <input value={loginForm.user} onChange={e=>setLoginForm({...loginForm,user:e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#008080] transition-colors bg-gray-50"
              placeholder="admin" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Password</label>
            <input type="password" value={loginForm.pass} onChange={e=>setLoginForm({...loginForm,pass:e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#008080] transition-colors bg-gray-50"
              placeholder="••••••••" />
          </div>
          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2.5 rounded-xl">
              {loginError}
            </div>
          )}
          <button type="submit" className="w-full bg-[#008080] hover:bg-[#006666] text-white font-bold py-3 rounded-xl transition-colors mt-2">
            Masuk
          </button>
        </form>
        <p className="text-center text-gray-300 text-xs mt-8">© 2026 MZM Tour & Travel</p>
      </div>
    </div>
  );

  // DASHBOARD 
  const menuItems = [
    { key:"paket",     icon: <Image src="/icon/pembimbing.png" alt="" width={16} height={16} className="object-contain brightness-0 invert" />, label:"Paket Perjalanan" },
    { key:"jadwal",    icon: <Image src="/icon/calender1.png" alt="" width={16} height={16} className="object-contain brightness-0 invert" />,  label:"Jadwal Keberangkatan" },
    { key:"testimoni", icon: "⭐", label:"Testimoni" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar layanan */}
      <NavbarAdmin onLogout={() => setLoggedIn(false)} />

      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-6 z-[100] bg-[#008080] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2">
          <span className="text-base">✓</span> {toast}
        </div>
      )}

      {/* Sub-header admin */}
      <div className="bg-gradient-to-r from-[#042f2f] to-[#008080] text-white px-6 pt-24 pb-5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2.5 rounded-xl">
                <Image src="/icon/pembimbing.png" alt="" width={24} height={24} className="object-contain brightness-0 invert" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg">Admin Panel</h1>
                <p className="text-white/60 text-xs">Kelola paket perjalanan, jadwal & testimoni</p>
              </div>
            </div>
            <button onClick={() => openAdd(menu === "jadwal" ? "jadwal" : menu === "testimoni" ? "testimoni" : "paket")}
              className="hidden sm:flex items-center gap-2 border border-white/30 hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
              ＋ Tambah {menu === "jadwal" ? "Jadwal" : menu === "testimoni" ? "Testimoni" : "Paket"}
            </button>
          </div>

          {/* Tab menu */}
          <div className="flex gap-2 flex-wrap">
            {menuItems.map(m => (
              <button key={m.key} onClick={() => setMenu(m.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  menu === m.key ? "bg-white text-[#008080]" : "text-white/70 hover:bg-white/10"
                }`}>
                {m.icon} {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">

        {/*  PAKET  */}
        {menu === "paket" && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="font-extrabold text-gray-800 flex items-center gap-2">
                <Image src="/icon/mail.png" alt="" width={16} height={16} className="object-contain opacity-60" />
                Daftar Paket
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">{filteredPaket.length}</span>
              </h2>
              <div className="flex gap-2 flex-wrap">
                {["Semua","Umroh","Haji","Wisata Islam"].map(f => (
                  <button key={f} onClick={() => setFilterPaket(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${filterPaket===f ? "bg-[#008080] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#008080]"}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 shadow-sm">
              {filteredPaket.length === 0 ? (
                <div className="py-16 text-center text-gray-400 text-sm">Belum ada paket</div>
              ) : filteredPaket.map(p => {
                // riwayat jadwal yang terkait paket ini (cocokkan nama)
                const riwayatPaket = jadwalList.filter(j =>
                  (j.is_riwayat || j.status === "Selesai" || j.status === "Dibatalkan") &&
                  j.nama_paket?.toLowerCase().includes(p.nama?.toLowerCase().split(" ")[0])
                );
                const isExpanded = expandedPaket === p.id;

                return (
                  <div key={p.id}>
                    {/* Baris paket */}
                    <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                        {p.gambar
                          ? <img src={p.gambar} alt="" className="w-full h-full object-cover" />
                          : <Image src="/icon/mail.png" alt="" width={24} height={24} className="object-contain opacity-30" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.jenis==="Umroh"?"bg-teal-100 text-teal-700":p.jenis==="Haji"?"bg-amber-100 text-amber-700":"bg-blue-100 text-blue-700"}`}>
                            {p.jenis?.toUpperCase()}
                          </span>
                          {p.kategori && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{p.kategori?.toUpperCase()}</span>}
                        </div>
                        <p className="font-bold text-gray-900 text-sm truncate">{p.nama}</p>
                        <p className="text-gray-400 text-xs mt-0.5">Rp {p.harga} · {p.durasi} · {p.berangkat}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Tombol riwayat */}
                        {riwayatPaket.length > 0 && (
                          <button
                            onClick={() => setExpandedPaket(isExpanded ? null : p.id)}
                            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Image src="/icon/calender.png" alt="" width={12} height={12} className="object-contain opacity-60" />
                            Riwayat ({riwayatPaket.length})
                            <span className="text-xs">{isExpanded ? "∨" : "›"}</span>
                          </button>
                        )}
                        <select value={p.status} onChange={async e => {
                          await fetch("/api/paket", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: p.id, status: e.target.value }),
                          });
                          fetchAll();
                        }}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border outline-none cursor-pointer ${p.status==="Tersedia"?"bg-green-50 border-green-200 text-green-700":"bg-red-50 border-red-200 text-red-600"}`}>
                          <option>Tersedia</option>
                          <option>Penuh</option>
                          <option>Tutup</option>
                        </select>
                        <button onClick={() => openEdit("paket", p)}
                          className="p-2 text-gray-400 hover:text-[#008080] hover:bg-teal-50 rounded-lg transition-colors">
                          <IconEdit />
                        </button>
                        <button onClick={() => setDeleteConfirm({table:"paket",id:p.id,nama:p.nama})}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <IconTrash />
                        </button>
                      </div>
                    </div>

                    {/* Riwayat keberangkatan per paket */}
                    {isExpanded && (
                      <div className="bg-gray-50 border-t border-gray-100 px-5 py-4">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Image src="/icon/calender.png" alt="" width={12} height={12} className="object-contain opacity-50" />
                          Riwayat Keberangkatan — {p.nama}
                        </p>
                        <div className="space-y-2">
                          {riwayatPaket.map(j => (
                            <div key={j.id} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-4">
                              <div className="shrink-0 text-center w-10">
                                <p className="text-gray-400 text-[9px] font-bold uppercase">{j.tanggal_berangkat?.split(" ")?.[1]}</p>
                                <p className="text-gray-600 text-lg font-extrabold leading-none">{j.tanggal_berangkat?.split(" ")?.[0]}</p>
                                <p className="text-gray-400 text-[9px]">{j.tanggal_berangkat?.split(" ")?.[2]}</p>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${j.status==="Selesai"?"bg-green-100 text-green-700":"bg-red-100 text-red-600"}`}>
                                    {j.status}
                                  </span>
                                  <span className="text-gray-400 text-[10px]">{j.maskapai}</span>
                                </div>
                                <p className="text-gray-700 text-xs font-semibold">{j.nama_paket}</p>
                                <div className="flex items-center gap-3 text-gray-400 text-[10px] mt-0.5 flex-wrap">
                                  <span>{j.terisi}/{j.kuota} jamaah</span>
                                  {j.tanggal_selesai && <span>Selesai: {j.tanggal_selesai}</span>}
                                  {j.catatan && <span className="italic">"{j.catatan}"</span>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button onClick={() => openAdd("paket")} className="sm:hidden fixed bottom-6 right-6 bg-[#008080] text-white w-14 h-14 rounded-full text-2xl shadow-xl flex items-center justify-center">＋</button>

            {/* Preview links */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-1.5">
               <Image src="/icon/fasilitas.png" alt="" width={14} height={14} className="object-contain brightness-0 invert" />
                Preview Halaman
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/paket-umroh" target="_blank"
                  className="flex items-center gap-2 bg-[#008080] hover:bg-[#006666] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors">
                  <Image src="/icon/wa.png" alt="" width={14} height={14} className="object-contain brightness-0 invert" />
                  Umroh 
                </Link>
                <Link href="/paket-haji" target="_blank"
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors">
                  <Image src="/icon/izin.png" alt="" width={14} height={14} className="object-contain brightness-0 invert" />
                  Haji 
                </Link>
                <Link href="/paket-wisata" target="_blank"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors">
                  <Image src="/icon/jejaring.png" alt="" width={14} height={14} className="object-contain brightness-0 invert" />
                  Wisata 
                </Link>
                <Link href="/cek-jadwal" target="_blank"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors">
                  <Image src="/icon/calender1.png" alt="" width={14} height={14} className="object-contain brightness-0 invert" />
                  Jadwal 
                </Link>
              </div>
            </div>
          </div>
        )}

        {/*  JADWAL  */}
        {menu === "jadwal" && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="font-extrabold text-gray-800 flex items-center gap-2">
                <Image src="/icon/calender.png" alt="" width={16} height={16} className="object-contain opacity-60" />
                {showRiwayat ? "Riwayat Keberangkatan" : "Jadwal Keberangkatan"}
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                  {showRiwayat
                    ? jadwalList.filter(j => j.is_riwayat || j.status === "Selesai" || j.status === "Dibatalkan").length
                    : jadwalList.filter(j => !j.is_riwayat && j.status === "Aktif").length}
                </span>
              </h2>
              <div className="flex gap-2 flex-wrap">
                {/* Toggle aktif / riwayat */}
                <button onClick={() => setShowRiwayat(false)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${!showRiwayat ? "bg-[#008080] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#008080]"}`}>
                  Aktif
                </button>
                <button onClick={() => setShowRiwayat(true)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${showRiwayat ? "bg-gray-700 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"}`}>
                  Riwayat
                </button>
                <button onClick={() => openAdd("jadwal")} className="hidden sm:flex items-center gap-2 bg-[#008080] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#006666] transition-colors">
                  ＋ Tambah Jadwal
                </button>
              </div>
            </div>

            {/* List jadwal aktif */}
            {!showRiwayat && (
              <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 shadow-sm">
                {jadwalList.filter(j => !j.is_riwayat && j.status === "Aktif").length === 0 ? (
                  <div className="py-16 text-center text-gray-400 text-sm">Belum ada jadwal aktif</div>
                ) : jadwalList.filter(j => !j.is_riwayat && j.status === "Aktif").map(j => (
                  <div key={j.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                      <Image src="/icon/calender.png" alt="" width={24} height={24} className="object-contain opacity-70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${j.jenis==="Umroh"?"bg-teal-100 text-teal-700":j.jenis==="Haji"?"bg-amber-100 text-amber-700":"bg-blue-100 text-blue-700"}`}>
                          {j.jenis?.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Aktif</span>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">{j.nama_paket}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{j.tanggal_berangkat} → {j.tanggal_pulang} · Kuota: {j.terisi}/{j.kuota}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Tandai selesai */}
                      <button
                        onClick={() => { setSelesaiModal({id:j.id, nama_paket:j.nama_paket}); setSelesaiForm({catatan:"", tanggal_selesai:""}); }}
                        className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors">
                        ✓ Tandai Selesai
                      </button>
                      <button onClick={() => openEdit("jadwal", j)} className="p-2 text-gray-400 hover:text-[#008080] hover:bg-teal-50 rounded-lg transition-colors"><IconEdit /></button>
                      <button onClick={() => setDeleteConfirm({table:"jadwal",id:j.id,nama:j.nama_paket})} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><IconTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List riwayat */}
            {showRiwayat && (
              <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 shadow-sm">
                {jadwalList.filter(j => j.is_riwayat || j.status === "Selesai" || j.status === "Dibatalkan").length === 0 ? (
                  <div className="py-16 text-center text-gray-400 text-sm">Belum ada riwayat keberangkatan</div>
                ) : jadwalList.filter(j => j.is_riwayat || j.status === "Selesai" || j.status === "Dibatalkan").map(j => (
                  <div key={j.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors opacity-80">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                      <Image src="/icon/calender.png" alt="" width={24} height={24} className="object-contain opacity-40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${j.jenis==="Umroh"?"bg-teal-100 text-teal-700":j.jenis==="Haji"?"bg-amber-100 text-amber-700":"bg-blue-100 text-blue-700"}`}>
                          {j.jenis?.toUpperCase()}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${j.status==="Selesai"?"bg-green-100 text-green-700":"bg-red-100 text-red-600"}`}>
                          {j.status}
                        </span>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">{j.nama_paket}</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {j.tanggal_berangkat} → {j.tanggal_pulang} · Kuota: {j.terisi}/{j.kuota}
                        {j.tanggal_selesai && <span className="ml-2 text-gray-500">· Selesai: {j.tanggal_selesai}</span>}
                      </p>
                      {j.catatan && <p className="text-gray-400 text-xs mt-0.5 italic">"{j.catatan}"</p>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => handleAktifkan(j.id)}
                        className="hidden sm:flex text-xs font-semibold px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 rounded-lg transition-colors">
                        Aktifkan
                      </button>
                      <button onClick={() => setDeleteConfirm({table:"jadwal",id:j.id,nama:j.nama_paket})} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><IconTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => openAdd("jadwal")} className="sm:hidden fixed bottom-6 right-6 bg-[#008080] text-white w-14 h-14 rounded-full text-2xl shadow-xl flex items-center justify-center">＋</button>
          </div>
        )}

        {/*  TESTIMONI  */}
        {menu === "testimoni" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-extrabold text-gray-800 flex items-center gap-2">
                ⭐ Testimoni
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">{testimoniList.length}</span>
              </h2>
              <button onClick={() => openAdd("testimoni")} className="hidden sm:flex items-center gap-2 bg-[#008080] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#006666] transition-colors">
                ＋ Tambah Testimoni
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 shadow-sm">
              {testimoniList.length === 0 ? (
                <div className="py-16 text-center text-gray-400 text-sm">Belum ada testimoni</div>
              ) : testimoniList.map(t => (
                <div key={t.id} className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${!t.tampil?"opacity-50":""}`}>
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-teal-700">
                    {t.nama?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-gray-900 text-sm">{t.nama}</p>
                      <span className="text-gray-400 text-xs">· {t.lokasi}</span>
                    </div>
                    <div className="flex mb-1">
                      {[...Array(5)].map((_,i) => <span key={i} className={i < t.rating ? "text-amber-400 text-xs" : "text-gray-200 text-xs"}>★</span>)}
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{t.pesan}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => toggleTampil(t)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${t.tampil?"bg-green-50 border-green-200 text-green-700":"bg-gray-100 border-gray-200 text-gray-500"}`}>
                      {t.tampil ? "Tampil" : "Disembunyikan"}
                    </button>
                    <button onClick={() => openEdit("testimoni", t)} className="p-2 text-gray-400 hover:text-[#008080] hover:bg-teal-50 rounded-lg transition-colors"><IconEdit /></button>
                    <button onClick={() => setDeleteConfirm({table:"testimoni",id:t.id,nama:t.nama})} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><IconTrash /></button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => openAdd("testimoni")} className="sm:hidden fixed bottom-6 right-6 bg-[#008080] text-white w-14 h-14 rounded-full text-2xl shadow-xl flex items-center justify-center">＋</button>
          </div>
        )}
      </main>

      {/*  MODAL  */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-extrabold text-gray-900">
                {modal.mode==="add" ? "Tambah" : "Edit"} {modal.type==="paket"?"Paket":modal.type==="jadwal"?"Jadwal":"Testimoni"}
              </h3>
              <button onClick={closeModal} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200">✕</button>
            </div>

            <div className="p-6 space-y-4">
              {modal.type === "paket" && <>
                <Field label="Nama Paket" value={form.nama} onChange={v=>setForm({...form,nama:v})} />
                <div className="grid grid-cols-2 gap-3">
                  <SelectField label="Jenis" value={form.jenis} onChange={v=>setForm({...form,jenis:v})} options={["Umroh","Haji","Wisata Islam"]} />
                  <SelectField label="Kategori" value={form.kategori} onChange={v=>setForm({...form,kategori:v})} options={["Reguler","Plus","Khusus"]} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Durasi" value={form.durasi} onChange={v=>setForm({...form,durasi:v})} placeholder="9 Hari" />
                  <Field label="Harga (tanpa Rp)" value={form.harga} onChange={v=>setForm({...form,harga:v})} placeholder="29.500.000" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Maskapai" value={form.maskapai} onChange={v=>setForm({...form,maskapai:v})} placeholder="Garuda Indonesia" />
                  <SelectField label="Hotel" value={form.hotel} onChange={v=>setForm({...form,hotel:v})} options={["Bintang 3","Bintang 4","Bintang 5"]} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Jadwal Berangkat" value={form.berangkat} onChange={v=>setForm({...form,berangkat:v})} placeholder="Juli 2026" />
                  <Field label="Keberangkatan" value={form.keberangkatan} onChange={v=>setForm({...form,keberangkatan:v})} placeholder="JAKARTA (CGK)" />
                </div>
                {/* Upload Gambar Poster (rasio 1080x1350 = 4:5, ukuran IG) */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">
                    Poster Paket
                    <span className="ml-1 text-gray-400 font-normal">(rasio 4:5 · 1080×1350px · maks 5MB)</span>
                  </label>

                  {/* Area upload */}
                  <label className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${uploading ? "border-gray-200 bg-gray-50" : "border-gray-200 hover:border-[#008080] hover:bg-teal-50/30"}`}>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={e => handleUploadGambar(e.target.files?.[0])}
                    />
                    {uploading ? (
                      <div className="py-8 flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-2 border-[#008080]/30 border-t-[#008080] rounded-full animate-spin" />
                        <p className="text-xs text-gray-400">Mengupload...</p>
                      </div>
                    ) : form.gambar ? (
                      <div className="relative w-full">
                        {/* Preview gambar dengan rasio 4:5 */}
                        <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                          <img
                            src={form.gambar}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-2xl"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                            <p className="text-white text-xs font-semibold">Klik untuk ganti gambar</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-10 flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">🖼️</div>
                        <p className="text-sm font-semibold text-gray-600">Klik untuk upload poster</p>
                        <p className="text-xs text-gray-400">PNG, JPG, WEBP · Ukuran ideal 1080×1350px</p>
                      </div>
                    )}
                  </label>

                  {/* Input URL manual sebagai alternatif */}
                  <div className="mt-2">
                    <input
                      type="text"
                      value={form.gambar || ""}
                      onChange={e => setForm({...form, gambar: e.target.value})}
                      placeholder="Atau tempel URL gambar langsung..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#008080] transition-colors text-gray-500"
                    />
                  </div>
                </div>
                <SelectField label="Status" value={form.status} onChange={v=>setForm({...form,status:v})} options={["Tersedia","Penuh","Tutup"]} />
              </>}

              {modal.type === "jadwal" && <>
                <Field label="Nama Paket" value={form.nama_paket} onChange={v=>setForm({...form,nama_paket:v})} />
                <SelectField label="Jenis" value={form.jenis} onChange={v=>setForm({...form,jenis:v})} options={["Umroh","Haji","Wisata Islam"]} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Tanggal Berangkat" value={form.tanggal_berangkat} onChange={v=>setForm({...form,tanggal_berangkat:v})} placeholder="07 Mar 2026" />
                  <Field label="Tanggal Pulang" value={form.tanggal_pulang} onChange={v=>setForm({...form,tanggal_pulang:v})} placeholder="16 Mar 2026" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Maskapai" value={form.maskapai} onChange={v=>setForm({...form,maskapai:v})} />
                  <Field label="Hotel" value={form.hotel} onChange={v=>setForm({...form,hotel:v})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Kuota" value={form.kuota} onChange={v=>setForm({...form,kuota:v})} placeholder="30" type="number" />
                  <Field label="Sudah Terisi" value={form.terisi} onChange={v=>setForm({...form,terisi:v})} placeholder="0" type="number" />
                </div>
                <SelectField label="Status" value={form.status} onChange={v=>setForm({...form,status:v})} options={["Aktif","Selesai","Dibatalkan"]} />
                <Field label="Catatan (opsional)" value={form.catatan} onChange={v=>setForm({...form,catatan:v})} placeholder="Catatan perjalanan..." />
              </>}

              {modal.type === "testimoni" && <>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Nama" value={form.nama} onChange={v=>setForm({...form,nama:v})} />
                  <Field label="Lokasi" value={form.lokasi} onChange={v=>setForm({...form,lokasi:v})} placeholder="Jakarta" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Rating</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} onClick={() => setForm({...form,rating:n})}
                        className={`text-2xl transition-transform hover:scale-110 ${n <= form.rating ? "text-amber-400" : "text-gray-200"}`}>★</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Pesan</label>
                  <textarea value={form.pesan} onChange={e=>setForm({...form,pesan:e.target.value})}
                    rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#008080] transition-colors resize-none" />
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setForm({...form,tampil:!form.tampil})}
                    className={`w-10 h-6 rounded-full transition-colors relative ${form.tampil?"bg-[#008080]":"bg-gray-300"}`}>
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.tampil?"left-4":"left-0.5"}`} />
                  </button>
                  <span className="text-sm text-gray-600">{form.tampil ? "Ditampilkan di website" : "Disembunyikan"}</span>
                </div>
              </>}
            </div>

            <div className="flex gap-3 p-6 pt-0">
              <button onClick={closeModal} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
              <button onClick={handleSave} disabled={loading}
                className="flex-1 py-3 bg-[#008080] hover:bg-[#006666] text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60">
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE  */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconTrash />
            </div>
            <h3 className="font-extrabold text-gray-900 mb-2">Hapus Data?</h3>
            <p className="text-gray-500 text-sm mb-6">Data <strong>{deleteConfirm.nama}</strong> akan dihapus permanen.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Batal</button>
              <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-colors">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/*MODAL TANDAI SELESAI  */}
      {selesaiModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">✓</div>
            <h3 className="font-extrabold text-gray-900 text-center mb-1">Tandai Selesai</h3>
            <p className="text-gray-400 text-sm text-center mb-5">
              Perjalanan <strong className="text-gray-700">{selesaiModal.nama_paket}</strong> akan dipindahkan ke riwayat.
            </p>
            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Tanggal Selesai</label>
                <input type="text" value={selesaiForm.tanggal_selesai}
                  onChange={e => setSelesaiForm({...selesaiForm, tanggal_selesai: e.target.value})}
                  placeholder={new Date().toLocaleDateString("id-ID")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#008080] transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Catatan (opsional)</label>
                <textarea value={selesaiForm.catatan}
                  onChange={e => setSelesaiForm({...selesaiForm, catatan: e.target.value})}
                  rows={3} placeholder="Contoh: Perjalanan berjalan lancar, 28 jamaah..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#008080] transition-colors resize-none" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelesaiModal(null)}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Batal</button>
              <button onClick={handleSelesai}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold transition-colors">
                Tandai Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder="", type="text" }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 block mb-1.5">{label}</label>
      <input type={type} value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#008080] transition-colors" />
    </div>
  );
}
function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 block mb-1.5">{label}</label>
      <select value={value||""} onChange={e=>onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#008080] transition-colors bg-white">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}