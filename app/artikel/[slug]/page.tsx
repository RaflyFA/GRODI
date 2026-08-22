'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'

const articlesData: Record<string, any> = {
  'cegah-ruam': {
    title: 'Cegah Ruam Saat Bayi Aktif Merangkak',
    image: '/bayi merangkak.jpg',
    readTime: '3 mnt',
    date: '20 Agustus 2026',
    content: (
      <>
        <p className="mb-4 leading-relaxed text-ink/90">
          Memasuki usia 8 bulan, si kecil biasanya mulai sangat aktif merangkak untuk mengeksplorasi sekitarnya. Gerakan yang intens ini dapat meningkatkan gesekan antara kulit sensitif bayi dengan popok, yang berisiko memicu ruam.
        </p>
        <h3 className="mb-2 mt-6 text-lg font-bold text-ink">1. Gunakan Material Popok Lembut</h3>
        <p className="mb-4 leading-relaxed text-ink/90">
          Pastikan Anda menggunakan popok kain (clodi) dengan bahan *inner* (lapisan dalam) yang sangat lembut seperti *suede cloth* atau *bamboo fleece*. Bahan ini efektif menyerap cairan dengan cepat sehingga permukaan tetap kering.
        </p>
        <h3 className="mb-2 mt-6 text-lg font-bold text-ink">2. Perhatikan Kelonggaran Ukuran</h3>
        <p className="mb-4 leading-relaxed text-ink/90">
          Popok yang terlalu ketat akan menghambat sirkulasi udara dan memperparah gesekan di area paha. Sisakan ruang selebar dua jari di area perut dan pastikan karet paha tidak mencengkeram terlalu kuat.
        </p>
        <h3 className="mb-2 mt-6 text-lg font-bold text-ink">3. Ganti Popok Secara Rutin</h3>
        <p className="mb-4 leading-relaxed text-ink/90">
          Saat bayi aktif bergerak, produksi keringat akan meningkat. Gantilah popok maksimal 3-4 jam sekali, meskipun popok tersebut belum penuh, untuk menjaga area popok tetap kering dan bebas bakteri.
        </p>
        <h3 className="mb-2 mt-6 text-lg font-bold text-ink">4. Aplikasikan Krim Pelindung</h3>
        <p className="mb-4 leading-relaxed text-ink/90">
          Jika Anda mulai melihat ada tanda-tanda kulit sedikit kemerahan, jangan ragu untuk mengoleskan *diaper rash cream* atau krim pelembap bayi tipis-tipis sebelum mengenakan popok bersih.
        </p>
      </>
    )
  },
  'naik-size': {
    title: 'Kapan Waktu Tepat Naik Size?',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&h=500',
    readTime: '2 mnt',
    date: '18 Agustus 2026',
    content: (
      <>
        <p className="mb-4 leading-relaxed text-ink/90">
          Melihat bayi bertumbuh dengan sehat tentu menjadi kebahagiaan tersendiri. Namun, pertumbuhan ini juga berarti Anda harus rajin memeriksa apakah ukuran popok kain si kecil masih ideal.
        </p>
        <h3 className="mb-2 mt-6 text-lg font-bold text-ink">1. Cek Bekas Karet di Paha</h3>
        <p className="mb-4 leading-relaxed text-ink/90">
          Indikator paling umum adalah ketika Anda melepas popok. Jika terdapat bekas kemerahan yang mencetak jelas di lingkar paha atau perut bayi, itu pertanda popok sudah terlalu sempit.
        </p>
        <h3 className="mb-2 mt-6 text-lg font-bold text-ink">2. Intensitas Kebocoran</h3>
        <p className="mb-4 leading-relaxed text-ink/90">
          Daya tampung popok sangat berkaitan dengan ukurannya. Jika popok bayi sering bocor padahal baru dipakai 1-2 jam dan *insert* belum terlalu jenuh, ukuran popok yang terlalu kecil mungkin menyebabkan celah kendor di sela paha akibat tarikan kain.
        </p>
        <h3 className="mb-2 mt-6 text-lg font-bold text-ink">3. Kancing (Snap) Mulai Mentok</h3>
        <p className="mb-4 leading-relaxed text-ink/90">
          Perhatikan posisi kancing pengaturan. Jika Anda sudah menggunakan kancing pada posisi paling luar (paling longgar) dan popok masih terlihat meregang kencang, sudah saatnya Anda beralih ke *size* (ukuran) yang lebih besar.
        </p>
        <div className="mt-8 rounded-2xl bg-primary/10 p-4 border border-primary/20">
          <p className="text-sm font-semibold text-primary">Tips Ekstra:</p>
          <p className="mt-1 text-sm text-ink/80">
            Gunakan fitur "Tukar Popok" di aplikasi GRODI untuk menukar koleksi popok ukuran lama Anda (yang masih layak pakai) dengan popok ukuran baru secara praktis!
          </p>
        </div>
      </>
    )
  }
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params?.slug as string
  const article = articlesData[slug]

  if (!article) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ink">Artikel tidak ditemukan</h1>
          <Link href="/" className="mt-4 inline-block rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-105 active:scale-95">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-page px-0 text-ink antialiased sm:px-4 sm:py-6">
      <div className="relative mx-auto min-h-screen max-w-md overflow-hidden bg-card shadow-xl sm:min-h-[840px] sm:rounded-[36px] sm:border sm:border-line">
        
        {/* Sticky Header with Back Button */}
        <header className="absolute top-0 z-10 w-full flex items-center justify-between px-6 py-5">
          <Link href="/" className="grid size-11 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur-md transition-transform hover:scale-105 active:scale-95">
            <ArrowLeft className="size-5 text-ink" />
          </Link>
          <button className="grid size-11 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur-md transition-transform hover:scale-105 active:scale-95">
            <Share2 className="size-5 text-ink" />
          </button>
        </header>

        {/* Hero Image */}
        <div className="relative h-[340px] w-full bg-soft">
          <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Article Content Area */}
        <div className="relative -mt-10 rounded-t-[36px] bg-card px-6 pb-20 pt-8">
          
          {/* Meta data */}
          <div className="mb-4 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 text-primary">
              <Clock className="size-3.5" /> {article.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" /> {article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-extrabold leading-snug tracking-tight text-ink">
            {article.title}
          </h1>

          {/* Body */}
          <article className="mt-8">
            {article.content}
          </article>
          
        </div>

      </div>
    </main>
  )
}
