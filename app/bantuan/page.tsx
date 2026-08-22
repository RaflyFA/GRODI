'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, Mail, MessageCircle, Phone, Search } from 'lucide-react'

const faqs = [
  {
    question: 'Bagaimana cara menukar popok kotor?',
    answer: 'Kumpulkan popok kotor dalam wadah yang kedap. Buka tab "Tukar" di aplikasi ini lalu klik "Cetak Resi Otomatis". Kurir rekanan kami akan datang menjemput ke alamat Anda sesuai jadwal penjemputan terdekat.'
  },
  {
    question: 'Berapa lama estimasi kurir menjemput popok?',
    answer: 'Jika permintaan penjemputan dilakukan sebelum pukul 14:00 WIB, kurir akan menjemput di hari yang sama. Permintaan setelah pukul 14:00 WIB akan diproses keesokan harinya (pukul 09:00 - 12:00 WIB).'
  },
  {
    question: 'Apakah popok yang rusak masih bisa ditukar tambah?',
    answer: 'Popok dengan kerusakan wajar akibat pemakaian (seperti sedikit berbulu atau noda samar) masih bisa ditukar dengan nilai penuh. Namun, popok yang robek besar, kancing lepas, atau hilang insert-nya akan dikenakan pemotongan nilai estimasi.'
  },
  {
    question: 'Kapan saya harus menaikkan ukuran popok bayi (naik size)?',
    answer: 'Perhatikan indikator berat badan dan lingkar pinggang bayi. Jika terdapat bekas karet yang membekas merah di paha bayi, atau popok sering bocor meski durasi pakai masih wajar (di bawah 4 jam), segera pertimbangkan untuk upgrade ukuran.'
  },
  {
    question: 'Bagaimana jika stok popok bersih habis sebelum kurir datang?',
    answer: 'Anda dapat menggunakan fitur "Beli Stok" di menu Quick Actions pada halaman Beranda untuk memesan popok tambahan secara instan. Pesanan instan akan dikirimkan maksimal 2 jam setelah pembayaran.'
  }
]

export default function HelpPage() {
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(search.toLowerCase()) || 
    faq.answer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-page px-0 text-ink antialiased sm:px-4 sm:py-6">
      <div className="relative mx-auto min-h-screen max-w-md overflow-hidden bg-page pb-12 shadow-xl sm:min-h-[840px] sm:rounded-[36px] sm:border sm:border-line">
        
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-line/50 bg-page/90 px-6 py-5 backdrop-blur-md">
          <Link href="/" className="grid size-10 place-items-center rounded-full bg-card shadow-xs transition-colors hover:bg-soft">
            <ArrowLeft className="size-5 text-ink" />
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-ink">Pusat Bantuan</h1>
        </header>

        <div className="px-6 pt-6">
          {/* Search */}
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3.5 shadow-xs">
            <Search className="size-4.5 text-muted-foreground" />
            <input 
              aria-label="Cari bantuan" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Cari topik bantuan..." 
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted-foreground outline-none" 
            />
          </div>

          {/* Contact Section */}
          <section className="mt-8">
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-muted-foreground">Hubungi Kami</h2>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-4 rounded-[24px] border border-line bg-card p-4 shadow-xs transition-shadow hover:shadow-sm">
                <div className="grid size-12 place-items-center rounded-2xl bg-[#25D366]/15 text-[#25D366]">
                  <MessageCircle className="size-6" />
                </div>
                <div>
                  <p className="font-bold text-ink">WhatsApp</p>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground">0812-3456-7890 (Respon Cepat)</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-4 rounded-[24px] border border-line bg-card p-4 shadow-xs transition-shadow hover:shadow-sm">
                <div className="grid size-12 place-items-center rounded-2xl bg-ink/5 text-ink">
                  <Mail className="size-6" />
                </div>
                <div>
                  <p className="font-bold text-ink">Email Support</p>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground">bantuan@grodi.id</p>
                </div>
              </a>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-8">
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-muted-foreground">Pertanyaan Umum (FAQ)</h2>
            <div className="flex flex-col gap-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => (
                  <div key={idx} className="overflow-hidden rounded-[24px] border border-line bg-card shadow-xs">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-soft/50"
                    >
                      <span className="text-sm font-bold leading-snug text-ink">{faq.question}</span>
                      <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="border-t border-line/50 bg-page/30 p-5 pt-4">
                        <p className="text-sm leading-relaxed text-ink/80">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="rounded-[24px] border border-dashed border-line bg-transparent p-8 text-center text-sm font-medium text-muted-foreground">
                  Maaf, topik tidak ditemukan.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
