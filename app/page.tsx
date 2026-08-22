'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Home,
  Image as ImageIcon,
  LogOut,
  MapPin,
  MessageCircle,
  Minus,
  Package,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Trash2,
  Truck,
  User,
  WashingMachine,
  Wallet,
  X,
  Settings,
} from 'lucide-react'

const products = [
  { name: 'Starter Kit', price: 'Rp 150.000', rawPrice: 150000, category: 'Starter Kit', tone: 'sage', desc: 'Lengkap untuk awal mencoba popok kain', badge: 'Hemat 15%', badgeType: 'amber', image: '/popok 1.webp' },
  { name: 'Outer Sage', price: 'Rp 75.000', rawPrice: 75000, category: 'Outer', tone: 'leaf', desc: 'Lapisan luar tahan air dan sirkulasi baik', badge: 'Size M', badgeType: 'gray', image: '/popok 2.jpg' },
  { name: 'Insert Reguler', price: 'Rp 45.000', rawPrice: 45000, category: 'Insert', tone: 'sand', desc: 'Bantalan penyerap daya tampung optimal', badge: 'Best Seller', badgeType: 'primary', image: '/popok 3.jpg' },
  { name: 'Outer Motif Pastel', price: 'Rp 80.000', rawPrice: 80000, category: 'Outer', tone: 'sage', desc: 'Motif ceria berbahan lembut & breathable', badge: 'Terbaru', badgeType: 'primary', image: '/popok 4.webp' },
  { name: 'Insert Bamboo', price: 'Rp 50.000', rawPrice: 50000, category: 'Insert', tone: 'leaf', desc: 'Serat bambu alami anti-bakteri', badge: 'Organik', badgeType: 'gray', image: '/popok 5.webp' },
  { name: 'Starter Kit Premium', price: 'Rp 210.000', rawPrice: 210000, category: 'Starter Kit', tone: 'sage', desc: 'Paket isi 4 outer + 8 insert bamboo', badge: 'Hemat 20%', badgeType: 'amber', image: '/popok 6.webp' },
  { name: 'Outer Waterproof Pro', price: 'Rp 85.000', rawPrice: 85000, category: 'Outer', tone: 'leaf', desc: 'Perlindungan ganda anti bocor samping', badge: 'Favorit', badgeType: 'primary', image: '/popok 7.webp' },
]

const tabs = [
  { id: 'home', label: 'Beranda', icon: Home },
  { id: 'shop', label: 'Belanja', icon: ShoppingBag },
  { id: 'trade', label: 'Tukar', icon: RefreshCw },
  { id: 'stash', label: 'Simpanan', icon: Archive },
] as const

type Tab = (typeof tabs)[number]['id']

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [category, setCategory] = useState('Semua')
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState(true)

  // Cart & Checkout State
  const [cart, setCart] = useState<{ [key: string]: { name: string; price: number; image: string; quantity: number } }>({
    'Outer Sage': { name: 'Outer Sage', price: 75000, image: '/popok 2.jpg', quantity: 1 }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart')
  const [useTradeBalance, setUseTradeBalance] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'cod' | 'ewallet'>('qris')
  const [hasActiveOrder, setHasActiveOrder] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const cartList = Object.values(cart)
  const cartCount = cartList.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartList.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tradeDiscount = useTradeBalance && cartCount > 0 ? 50000 : 0
  const finalTotal = Math.max(0, subtotal - tradeDiscount)

  const addToCart = (product: { name: string; price: string; rawPrice?: number; image: string }) => {
    const rawPrice = product.rawPrice || parseInt(product.price.replace(/[^0-9]/g, '')) || 75000
    setCart((prev) => {
      const existing = prev[product.name]
      if (existing) {
        return { ...prev, [product.name]: { ...existing, quantity: existing.quantity + 1 } }
      }
      return { ...prev, [product.name]: { name: product.name, price: rawPrice, image: product.image, quantity: 1 } }
    })
  }

  const updateQuantity = (name: string, delta: number) => {
    setCart((prev) => {
      const item = prev[name]
      if (!item) return prev
      const newQty = item.quantity + delta
      if (newQty <= 0) {
        const next = { ...prev }
        delete next[name]
        return next
      }
      return { ...prev, [name]: { ...item, quantity: newQty } }
    })
  }

  const removeFromCart = (name: string) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const openCart = () => {
    setCheckoutStep('cart')
    setIsCartOpen(true)
  }

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'Semua' || product.category === category
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  }), [category, search])

  return (
    <main className="min-h-screen bg-page px-0 text-ink antialiased sm:px-4 sm:py-6">
      <div className="relative mx-auto min-h-screen max-w-md overflow-hidden bg-page pb-28 shadow-xl sm:min-h-[840px] sm:rounded-[36px] sm:border sm:border-line">
        {/* Header */}
        <header className="flex items-center justify-between px-6 pb-4 pt-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">GRODI / 2026</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">
              {activeTab === 'home' ? 'Halo, Bunda Nabila!' : tabs.find((tab) => tab.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <button 
              onClick={openCart}
              aria-label="Buka keranjang belanja" 
              className="relative grid size-11 place-items-center rounded-2xl border border-line bg-card text-primary shadow-xs transition-transform active:scale-95 hover:bg-soft"
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsProfileOpen(true)}
              aria-label="Buka profil Bunda Nabila" 
              className="grid size-11 place-items-center rounded-2xl border-2 border-primary/20 bg-soft text-xl shadow-xs transition-all hover:scale-105 active:scale-95"
            >
              👶
            </button>
          </div>
        </header>

        {/* Tab 1: Home */}
        {activeTab === 'home' && (
          <section className="flex flex-col gap-6 px-6 pb-12 pt-2">
            {/* 1. Baby Profile Card & Multi-Profile Indicator */}
            <div className="relative overflow-hidden rounded-[28px] bg-primary p-6 text-white shadow-md shadow-primary/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-4">
                  <img src="/profile bayi.webp" alt="Foto Bayi" className="size-16 shrink-0 rounded-full border-2 border-white/20 object-cover shadow-sm" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Profil si kecil</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <h2 className="text-2xl font-extrabold tracking-tight">Bayi A</h2>
                      <ChevronRight className="size-5 text-white/60" />
                    </div>
                    <p className="mt-1 text-sm font-medium text-white/90">
                      Usia 8 Bulan <span className="mx-1 opacity-60">•</span> 8.5 kg
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/15 p-2.5 backdrop-blur-sm">
                  <Sparkles aria-hidden="true" className="size-5 text-white" />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/20 px-4 py-3 backdrop-blur-sm">
                <span className="text-xs font-medium text-white/90">Ukuran aktif saat ini</span>
                <span className="rounded-full bg-soft px-3.5 py-1 text-xs font-bold text-ink shadow-xs">
                  Medium (M)
                </span>
              </div>

              {/* Pagination Dots */}
              <div className="mt-4 flex justify-center gap-1.5">
                <div className="h-1.5 w-4 rounded-full bg-white"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
              </div>
            </div>

            {/* 2. Quick Actions */}
            <div className="flex items-center justify-between px-2">
              <button className="group flex flex-col items-center gap-2" onClick={() => setActiveTab('trade')}>
                <div className="grid size-14 place-items-center rounded-full bg-soft text-primary shadow-sm transition-transform group-hover:scale-105 group-active:scale-95">
                  <RefreshCw className="size-6" />
                </div>
                <span className="text-xs font-semibold text-ink">Tukar Popok</span>
              </button>
              <button className="group flex flex-col items-center gap-2" onClick={() => setActiveTab('shop')}>
                <div className="grid size-14 place-items-center rounded-full bg-soft text-primary shadow-sm transition-transform group-hover:scale-105 group-active:scale-95">
                  <ShoppingCart className="size-6" />
                </div>
                <span className="text-xs font-semibold text-ink">Beli Stok</span>
              </button>
              <Link href="/bantuan" className="group flex flex-col items-center gap-2">
                <div className="grid size-14 place-items-center rounded-full bg-soft text-primary shadow-sm transition-transform group-hover:scale-105 group-active:scale-95">
                  <MessageCircle className="size-6" />
                </div>
                <span className="text-xs font-semibold text-ink">Bantuan</span>
              </Link>
            </div>

            {/* Growth Notice */}
            {notice && (
              <div className="relative flex items-start gap-3.5 rounded-[24px] border border-alert-strong bg-alert p-5 text-ink shadow-xs">
                <button 
                  onClick={() => setNotice(false)} 
                  aria-label="Tutup notifikasi" 
                  className="absolute right-3.5 top-3.5 rounded-full p-1 text-ink/40 transition-colors hover:bg-black/5 hover:text-ink"
                >
                  <X className="size-4" />
                </button>
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-alert-strong text-ink shadow-xs">
                  <Bell className="size-5" />
                </div>
                <div className="pr-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/70">Notifikasi Pertumbuhan</p>
                  <p className="mt-1 text-sm font-semibold leading-snug">Saatnya bersiap upgrade ke Ukuran L!</p>
                  <button 
                    onClick={() => setActiveTab('shop')} 
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-all hover:underline"
                  >
                    Lihat Rekomendasi <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 3. Core Service Status */}
            <div className="rounded-[24px] border border-line bg-card p-5 shadow-xs">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Status Layanan</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 divide-x divide-line">
                <div className="flex flex-col pr-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-ink/70">
                    <Package className="size-3.5 text-primary" />
                    <span>Sisa Stok Popok</span>
                  </div>
                  <div className="mt-2 text-xl font-extrabold tracking-tight text-ink">
                    12 <span className="text-sm font-semibold text-primary">Bersih</span>
                  </div>
                  <div className="mt-0.5 text-sm font-semibold text-muted-foreground">
                    3 <span className="text-xs">Kotor</span>
                  </div>
                </div>
                <div className="flex flex-col pl-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-ink/70">
                    <Truck className="size-3.5 text-primary" />
                    <span>Jadwal Kurir</span>
                  </div>
                  <div className="mt-2 text-base font-bold leading-tight text-ink">
                    Besok,<br />09:00 WIB
                  </div>
                </div>
              </div>
            </div>

            {/* Active Order Card */}
            {hasActiveOrder && (
              <div className="relative rounded-[24px] border border-primary/20 bg-primary/5 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="grid size-8 place-items-center rounded-full bg-primary/20 text-primary">
                      <Truck className="size-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink">Pesanan Berjalan</h3>
                      <p className="text-[10px] font-semibold text-primary">#GRD-20260822-001</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-primary shadow-xs">
                    Sedang Dikemas
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="relative flex items-center justify-between px-1">
                  <div className="absolute left-1 right-1 top-1/2 -z-10 h-1 -translate-y-1/2 rounded-full bg-line" />
                  <div className="absolute left-1 top-1/2 -z-10 h-1 w-1/2 -translate-y-1/2 rounded-full bg-primary" />
                  
                  <div className="grid size-5 place-items-center rounded-full bg-primary text-white shadow-xs">
                    <Check className="size-3" />
                  </div>
                  <div className="grid size-5 place-items-center rounded-full bg-primary text-white shadow-xs ring-4 ring-primary/20">
                    <Package className="size-3" />
                  </div>
                  <div className="grid size-5 place-items-center rounded-full bg-line text-muted-foreground">
                    <Truck className="size-3" />
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-ink text-center">
                  Estimasi kurir tiba: <span className="font-bold">Besok, 09:00 WIB</span>
                </div>
              </div>
            )}

            {/* Impact / Milestone Card */}
            <div className="rounded-[24px] border border-line bg-card p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dampak baikmu</p>
                  <p className="mt-1.5 max-w-[240px] text-sm font-medium leading-relaxed text-ink">
                    Bulan ini kamu menyelamatkan <span className="font-bold text-primary">45 popok</span> dari tempat sampah!
                  </p>
                </div>
                <div className="grid size-12 place-items-center rounded-2xl bg-soft text-2xl">
                  🌱
                </div>
              </div>
              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-soft">
                <div className="h-full w-[68%] rounded-full bg-primary transition-all duration-500" />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Target: 65 popok</span>
                <span className="font-semibold text-primary">68% tercapai</span>
              </div>
            </div>

            {/* 4. Personalized Education */}
            <div className="mt-2">
              <h2 className="px-1 mb-4 text-lg font-bold text-ink">Tips Seputar Bayi 8 Bulan</h2>
              <div className="no-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 pb-2">
                {/* Card 1 */}
                <Link href="/artikel/cegah-ruam" className="flex w-64 shrink-0 flex-col overflow-hidden rounded-[20px] border border-line bg-card shadow-xs transition-shadow hover:shadow-sm">
                  <div className="relative h-32 w-full bg-soft">
                     <img src="/bayi merangkak.jpg" alt="Bayi merangkak" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-ink">
                      Cegah Ruam Saat Bayi Aktif Merangkak
                    </h3>
                    <p className="mt-2 text-[11px] font-medium text-muted-foreground">
                      Baca 3 mnt
                    </p>
                  </div>
                </Link>

                {/* Card 2 */}
                <Link href="/artikel/naik-size" className="flex w-64 shrink-0 flex-col overflow-hidden rounded-[20px] border border-line bg-card shadow-xs transition-shadow hover:shadow-sm">
                  <div className="relative h-32 w-full bg-soft">
                     <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&h=250" alt="Bayi senyum" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-ink">
                      Kapan Waktu Tepat Naik Size?
                    </h3>
                    <p className="mt-2 text-[11px] font-medium text-muted-foreground">
                      Baca 2 mnt
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Shop */}
        {activeTab === 'shop' && (
          <section className="flex flex-col gap-4 px-6 pb-12 pt-2">
            {/* Search and Cart */}
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-xs">
              <Search className="size-4.5 text-muted-foreground" />
              <input 
                aria-label="Cari produk" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Cari popok, insert, outer..." 
                className="w-full bg-transparent text-sm text-ink placeholder:text-muted-foreground outline-none" 
              />
              <button 
                onClick={openCart}
                aria-label="Keranjang" 
                className="relative grid size-9 place-items-center rounded-xl bg-soft text-primary transition-transform active:scale-95"
              >
                <ShoppingCart className="size-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-white shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* 1. TRADE-IN BALANCE BANNER */}
            <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/10 p-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="grid size-8 place-items-center rounded-lg bg-primary/20 text-primary">
                  <Wallet className="size-4" />
                </div>
                <span className="text-xs font-medium text-primary">
                  Saldo Tukar-Tambah: <strong className="font-bold">Rp 50.000</strong>
                </span>
              </div>
              <button 
                onClick={() => setActiveTab('trade')}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary transition-all hover:underline"
              >
                Gunakan <ArrowRight className="size-3.5" />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1">
              {['Semua', 'Starter Kit', 'Outer', 'Insert', 'Booster'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => setCategory(item)} 
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    category === item 
                      ? 'bg-primary text-white shadow-xs shadow-primary/20' 
                      : 'border border-line bg-card text-ink/70 hover:border-primary/40 hover:text-ink'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* 2. SMART RECOMMENDATION SECTION */}
            <div className="mt-1 flex flex-col gap-2.5">
              <h2 className="text-sm font-bold text-ink">Rekomendasi untuk Bayi A (Size M)</h2>
              <div className="no-scrollbar -mx-6 flex gap-3.5 overflow-x-auto px-6 pb-1">
                {/* Rec Card 1 */}
                <article className="flex w-44 shrink-0 flex-col justify-between rounded-[22px] border border-line bg-card p-3 shadow-xs transition-shadow hover:shadow-md">
                  <div>
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-soft">
                      <img src="/popok 2.jpg" alt="Outer Size M" className="h-full w-full object-cover" />
                      <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-ink backdrop-blur-sm">
                        Size M
                      </span>
                    </div>
                    <h3 className="mt-2 text-xs font-bold text-ink">Outer Size M - Sage</h3>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">Sesuai paha bayi</p>
                  </div>
                    <div className="mt-3">
                    <p className="text-xs font-bold text-primary">Rp 75.000</p>
                    <button 
                      onClick={() => addToCart({ name: 'Outer Size M - Sage', price: 'Rp 75.000', rawPrice: 75000, image: '/popok 2.jpg' })} 
                      className="mt-2 w-full rounded-lg bg-primary py-1.5 text-[11px] font-bold text-white shadow-xs transition-all hover:bg-primary/90 active:scale-95"
                    >
                      + Tambah
                    </button>
                  </div>
                </article>

                {/* Rec Card 2 */}
                <article className="flex w-44 shrink-0 flex-col justify-between rounded-[22px] border border-line bg-card p-3 shadow-xs transition-shadow hover:shadow-md">
                  <div>
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-soft">
                      <img src="/popok 1.webp" alt="Starter Kit M" className="h-full w-full object-cover" />
                      <span className="absolute left-2 top-2 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        Hemat 15%
                      </span>
                    </div>
                    <h3 className="mt-2 text-xs font-bold text-ink">Starter Kit M</h3>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">Paket hemat lengkap</p>
                  </div>
                    <div className="mt-3">
                    <p className="text-xs font-bold text-primary">Rp 150.000</p>
                    <button 
                      onClick={() => addToCart({ name: 'Starter Kit M', price: 'Rp 150.000', rawPrice: 150000, image: '/popok 1.webp' })} 
                      className="mt-2 w-full rounded-lg bg-primary py-1.5 text-[11px] font-bold text-white shadow-xs transition-all hover:bg-primary/90 active:scale-95"
                    >
                      + Tambah
                    </button>
                  </div>
                </article>
              </div>
            </div>

            {/* 3. Main Products Grid with Badges */}
            <div className="mt-1 flex flex-col gap-2.5">
              <h2 className="text-sm font-bold text-ink">Semua Produk</h2>
              <div className="grid grid-cols-2 gap-3.5">
                {filteredProducts.map((product) => (
                  <article key={product.name} className="flex flex-col justify-between rounded-[24px] border border-line bg-card p-3.5 shadow-xs transition-shadow hover:shadow-md">
                    <div>
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-soft">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                        {product.badge && (
                          <span className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                            product.badgeType === 'amber' 
                              ? 'bg-amber-100 text-amber-800' 
                              : product.badgeType === 'gray' 
                              ? 'bg-white/90 text-ink backdrop-blur-sm' 
                              : 'bg-primary text-white'
                          }`}>
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-sm font-bold text-ink">{product.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{product.desc}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-bold text-primary">{product.price}</p>
                      <button 
                        onClick={() => addToCart(product)} 
                        className="mt-2.5 w-full rounded-xl bg-primary py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-primary/90 active:scale-95"
                      >
                        + Tambah
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Trade */}
        {activeTab === 'trade' && (
          <section className="flex flex-col gap-4 px-6 pt-2">
            {/* Value Card */}
            <div className="rounded-[28px] bg-primary p-6 text-center text-white shadow-md shadow-primary/20">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Nilai popok ukuran M</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight">Rp 50.000</p>
              <p className="mt-1 text-xs text-white/90">Estimasi saldo tukar tambah kamu</p>
            </div>

            {/* Steps Container */}
            <div className="rounded-[24px] border border-line bg-card p-5 shadow-xs">
              <h2 className="text-base font-bold text-ink">Semudah 1—2—3</h2>
              <div className="mt-4 flex flex-col gap-4">
                {[
                  [WashingMachine, 'Cuci Bersih', 'Pastikan popok sudah dicuci bersih dan kering.'],
                  [Package, 'Kemas Rapi', 'Masukkan ke dalam paket dengan aman.'],
                  [Truck, 'Serahkan ke Kurir', 'Kurir jemput langsung ke depan pintu rumah.'],
                ].map(([Icon, title, detail], index) => {
                  const StepIcon = Icon as typeof WashingMachine
                  return (
                    <div className="flex items-center gap-3.5" key={title as string}>
                      <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-soft text-primary shadow-xs">
                        <StepIcon className="size-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-ink">{index + 1}. {title as string}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{detail as string}</p>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground/60" />
                    </div>
                  )
                })}
              </div>
            </div>

            <button className="mt-2 w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary/90 active:scale-98">
              Cetak Resi Otomatis
            </button>
          </section>
        )}

        {/* Tab 4: Stash */}
        {activeTab === 'stash' && (
          <section className="flex flex-col gap-4 px-6 pt-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pantau kondisi dan siklus popok kainmu saat ini.</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Outer Item */}
              <article className="rounded-[24px] border border-line bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-ink">4x Outer Size M</p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-primary">
                      <Check className="size-3.5" /> Sangat Baik
                    </p>
                  </div>
                  <button className="rounded-xl border border-line bg-page px-3.5 py-1.5 text-xs font-semibold text-ink/80 transition-colors hover:bg-soft hover:text-ink">
                    Edit
                  </button>
                </div>
              </article>

              {/* Insert Item */}
              <article className="rounded-[24px] border border-line bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-ink">12x Insert Reguler</p>
                    <p className="mt-0.5 text-xs font-medium text-muted-foreground">Kondisi pemakaian</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('trade')} 
                    className="rounded-xl bg-soft px-3.5 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white"
                  >
                    Tukar
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-soft">
                    <div className="h-full w-[80%] rounded-full bg-primary" />
                  </div>
                  <span className="text-xs font-bold text-ink">80%</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Batas pemakaian optimal masih aman</p>
              </article>
            </div>
          </section>
        )}

        {/* Bottom Navigation */}
        <nav 
          aria-label="Navigasi utama" 
          className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 justify-around border-t border-line/80 bg-white/95 px-3 py-2.5 backdrop-blur-md sm:rounded-b-[36px]"
        >
          <div className="flex w-full justify-around">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button 
                key={id} 
                onClick={() => setActiveTab(id)} 
                aria-current={activeTab === id ? 'page' : undefined} 
                className={`flex min-w-[72px] flex-col items-center gap-1 rounded-2xl py-1.5 text-xs font-semibold transition-all ${
                  activeTab === id 
                    ? 'bg-soft font-bold text-primary' 
                    : 'text-muted-foreground hover:text-ink'
                }`}
              >
                <Icon className={`size-5 ${activeTab === id ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>
        {/* Cart Bottom Sheet & Checkout Modal */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs transition-opacity sm:items-center">
            {/* Sheet Container */}
            <div className={`relative w-full max-w-md bg-card transition-all duration-300 shadow-2xl ${
              checkoutStep === 'success' 
                ? 'm-4 rounded-[32px] p-6 text-center animate-in fade-in zoom-in-95' 
                : 'rounded-t-[32px] max-h-[85vh] flex flex-col sm:rounded-[32px]'
            }`}>

              {/* STEP 1: CART VIEW */}
              {checkoutStep === 'cart' && (
                <div className="flex flex-col max-h-[80vh]">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-line px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="size-5 text-primary" />
                      <h2 className="text-base font-bold text-ink">Keranjang Belanja ({cartCount})</h2>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="grid size-8 place-items-center rounded-full bg-soft text-ink/60 hover:text-ink transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  {/* Cart Body */}
                  <div className="no-scrollbar overflow-y-auto px-6 py-4 flex-1 flex flex-col gap-3">
                    {cartList.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="grid size-16 place-items-center rounded-full bg-soft text-primary/60">
                          <ShoppingBag className="size-8" />
                        </div>
                        <p className="mt-4 text-base font-bold text-ink">Keranjangmu Masih Kosong</p>
                        <p className="mt-1 text-xs text-muted-foreground">Yuk tambah popok kain ramah lingkungan untuk si kecil!</p>
                        <button 
                          onClick={() => { setIsCartOpen(false); setActiveTab('shop'); }}
                          className="mt-6 rounded-2xl bg-primary px-6 py-3 text-xs font-bold text-white shadow-sm transition-transform active:scale-95"
                        >
                          Mulai Belanja
                        </button>
                      </div>
                    ) : (
                      cartList.map((item) => (
                        <div key={item.name} className="flex items-center gap-3.5 rounded-2xl border border-line bg-page p-3 shadow-xs">
                          <img src={item.image} alt={item.name} className="size-16 shrink-0 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <h3 className="truncate text-xs font-bold text-ink">{item.name}</h3>
                            <p className="mt-0.5 text-xs font-extrabold text-primary">Rp {(item.price).toLocaleString('id-ID')}</p>
                            
                            {/* Quantity Controls */}
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center gap-2 rounded-lg border border-line bg-card px-2 py-1">
                                <button 
                                  onClick={() => updateQuantity(item.name, -1)}
                                  className="text-ink/60 hover:text-ink transition-colors"
                                >
                                  <Minus className="size-3.5" />
                                </button>
                                <span className="text-xs font-bold text-ink px-1">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.name, 1)}
                                  className="text-ink/60 hover:text-ink transition-colors"
                                >
                                  <Plus className="size-3.5" />
                                </button>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.name)}
                                className="p-1 text-red-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Cart Footer */}
                  {cartList.length > 0 && (
                    <div className="border-t border-line bg-card p-6 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-base font-extrabold text-ink">Rp {subtotal.toLocaleString('id-ID')}</span>
                      </div>
                      <button 
                        onClick={() => setCheckoutStep('checkout')}
                        className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 active:scale-98"
                      >
                        Lanjut ke Pembayaran <ArrowRight className="inline-block size-4 ml-1" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: CHECKOUT VIEW */}
              {checkoutStep === 'checkout' && (
                <div className="flex flex-col max-h-[82vh]">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-line px-6 py-4">
                    <button 
                      onClick={() => setCheckoutStep('cart')}
                      className="grid size-8 place-items-center rounded-full bg-soft text-ink hover:bg-line transition-colors"
                    >
                      <ArrowLeft className="size-4" />
                    </button>
                    <h2 className="text-base font-bold text-ink">Ringkasan Pembayaran</h2>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="grid size-8 place-items-center rounded-full bg-soft text-ink/60 hover:text-ink transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="no-scrollbar overflow-y-auto px-6 py-4 flex flex-col gap-4">
                    
                    {/* Alamat Pengiriman */}
                    <div className="rounded-2xl border border-line bg-page p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="size-3.5 text-primary" /> Alamat Pengiriman
                        </span>
                        <span className="text-xs font-semibold text-primary cursor-pointer hover:underline">Ubah</span>
                      </div>
                      <p className="text-xs font-bold text-ink">Bunda Nabila (0812-3456-7890)</p>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                        Jl. Cempaka Indah No. 45, Kebayoran Baru, Jakarta Selatan, 12150
                      </p>
                    </div>

                    {/* Metode Pembayaran */}
                    <div>
                      <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Metode Pembayaran</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'qris', label: 'QRIS / BCA', icon: QrCode },
                          { id: 'cod', label: 'COD (Bayar)', icon: Truck },
                          { id: 'ewallet', label: 'GoPay / OVO', icon: Wallet },
                        ].map((m) => {
                          const IconComp = m.icon
                          return (
                            <button
                              key={m.id}
                              onClick={() => setPaymentMethod(m.id as any)}
                              className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                                paymentMethod === m.id
                                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                                  : 'border-line bg-page text-ink/70 hover:border-primary/40'
                              }`}
                            >
                              <IconComp className="size-5 mb-1.5" />
                              <span className="text-[10px] leading-tight font-semibold">{m.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Toggle Saldo Tukar */}
                    <div className="flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/10 p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="grid size-8 place-items-center rounded-lg bg-primary/20 text-primary">
                          <Wallet className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-ink">Gunakan Saldo Tukar-Tambah</p>
                          <p className="text-[11px] font-semibold text-primary">Hemat Rp 50.000</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox"
                        checked={useTradeBalance}
                        onChange={(e) => setUseTradeBalance(e.target.checked)}
                        className="size-5 accent-primary cursor-pointer"
                      />
                    </div>

                    {/* Rincian Tagihan */}
                    <div className="rounded-2xl border border-line bg-page p-4 flex flex-col gap-2 text-xs">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Rincian Biaya</h3>
                      <div className="flex justify-between text-ink/80">
                        <span>Subtotal Produk</span>
                        <span className="font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
                      </div>
                      {useTradeBalance && (
                        <div className="flex justify-between text-primary font-medium">
                          <span>Diskon Saldo Tukar</span>
                          <span className="font-bold">-Rp 50.000</span>
                        </div>
                      )}
                      <div className="flex justify-between text-ink/80">
                        <span>Ongkos Kirim</span>
                        <span className="font-semibold text-green-600">Gratis (Promo)</span>
                      </div>
                      <div className="mt-2 border-t border-line pt-2 flex justify-between items-center text-sm font-bold text-ink">
                        <span>Total Pembayaran</span>
                        <span className="text-base font-extrabold text-primary">Rp {finalTotal.toLocaleString('id-ID')}</span>
                      </div>
                    </div>

                  </div>

                  {/* Footer */}
                  <div className="border-t border-line bg-card p-6">
                    <button 
                      onClick={() => {
                        setHasActiveOrder(true)
                        setCheckoutStep('success')
                        setCart({})
                      }}
                      className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 active:scale-98"
                    >
                      Pesan Sekarang (Rp {finalTotal.toLocaleString('id-ID')})
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUCCESS POPUP */}
              {checkoutStep === 'success' && (
                <div className="flex flex-col items-center justify-center py-4 px-2">
                  <div className="grid size-20 place-items-center rounded-full bg-primary/15 text-primary">
                    <CheckCircle2 className="size-12" />
                  </div>
                  <h2 className="mt-4 text-xl font-extrabold text-ink">Pesanan Berhasil!</h2>
                  <p className="mt-1 text-xs font-semibold text-primary">No. Pesanan: #GRD-20260822-001</p>
                  
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed max-w-xs">
                    Terima kasih Bunda Nabila! Pesananmu sedang dikemas dan kurir kami akan segera mengantarkannya.
                  </p>

                  <div className="mt-6 w-full rounded-2xl border border-line bg-page p-3.5 text-left text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Estimasi Pengiriman:</span>
                      <span className="font-bold text-ink">Besok, 09:00 WIB</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setIsCartOpen(false)
                      setActiveTab('home')
                    }}
                    className="mt-6 w-full rounded-2xl bg-primary py-3.5 text-xs font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
                  >
                    Kembali ke Beranda
                  </button>
                </div>
              )}

            </div>
          </div>
        )}
        {/* Profile Overlay Modal */}
        {isProfileOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-page sm:items-center sm:justify-center sm:bg-black/50 sm:backdrop-blur-xs">
            <div className="flex h-full w-full max-w-md flex-col bg-page sm:h-[80vh] sm:rounded-[36px] sm:shadow-2xl animate-in slide-in-from-right-full duration-300">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-line px-6 py-4 bg-card sm:rounded-t-[36px]">
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="grid size-8 place-items-center rounded-full bg-soft text-ink hover:bg-line transition-colors"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <h2 className="text-base font-bold text-ink">Akun Saya</h2>
                <div className="size-8" /> {/* Spacer for centering */}
              </div>

              {/* Body */}
              <div className="no-scrollbar overflow-y-auto pb-8">
                {/* User Info */}
                <div className="bg-primary px-6 py-8 text-white">
                  <div className="flex items-center gap-4">
                    <div className="size-16 overflow-hidden rounded-full border-2 border-white/20 bg-white shadow-sm">
                      <img src="/profile bayi.webp" alt="Foto Bayi" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight">Bunda Nabila</h3>
                      <p className="mt-0.5 text-xs text-white/80">0812-3456-7890</p>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-sm">
                        <Sparkles className="size-3" /> Member Grodi Premium
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-6 flex flex-col gap-6">
                  {/* Riwayat Pesanan Section */}
                  <div>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Package className="size-4 text-primary" /> Riwayat Pesanan
                    </h3>
                    
                    <div className="flex flex-col gap-3">
                      {/* Active Order Item (If exists) */}
                      {hasActiveOrder && (
                        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 shadow-xs">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-ink/60">#GRD-20260822-001</span>
                            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-primary shadow-xs flex items-center gap-1">
                              <Clock className="size-3" /> Sedang Dikemas
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                              <ShoppingBag className="size-6" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-ink">Pesanan Belanja</p>
                              <p className="text-[11px] font-medium text-muted-foreground">Total: Rp 175.000 (2 Produk)</p>
                            </div>
                          </div>
                          <button className="mt-3 w-full rounded-xl border border-primary/20 bg-white py-2 text-[11px] font-bold text-primary transition-all hover:bg-soft">
                            Lacak Pesanan
                          </button>
                        </div>
                      )}

                      {/* Completed Order Item */}
                      <div className="rounded-2xl border border-line bg-card p-4 shadow-xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-ink/60">#GRD-20260710-045</span>
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 flex items-center gap-1">
                            <CheckCircle2 className="size-3" /> Selesai
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="grid size-12 place-items-center rounded-xl bg-soft text-primary">
                            <ShoppingBag className="size-6" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-ink">Starter Kit M</p>
                            <p className="text-[11px] font-medium text-muted-foreground">Total: Rp 150.000</p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className="flex-1 rounded-xl border border-line bg-page py-2 text-[11px] font-bold text-ink/80 transition-all hover:bg-soft">
                            Lihat Invoice
                          </button>
                          <button className="flex-1 rounded-xl bg-soft py-2 text-[11px] font-bold text-primary transition-all hover:bg-primary/20">
                            Beli Lagi
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pengaturan Akun */}
                  <div>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Settings className="size-4 text-primary" /> Pengaturan Akun
                    </h3>
                    
                    <div className="flex flex-col rounded-2xl border border-line bg-card shadow-xs">
                      {[
                        { icon: MapPin, label: 'Daftar Alamat' },
                        { icon: User, label: 'Profil Bayi' },
                        { icon: CreditCard, label: 'Metode Pembayaran' },
                      ].map((item, i) => {
                        const Icon = item.icon
                        return (
                          <button key={item.label} className={`flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-soft ${i !== 0 ? 'border-t border-line' : ''}`}>
                            <div className="flex items-center gap-3 text-ink">
                              <Icon className="size-4 text-primary" />
                              <span className="text-xs font-semibold">{item.label}</span>
                            </div>
                            <ChevronRight className="size-4 text-muted-foreground/50" />
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Keluar */}
                  <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-100">
                    <LogOut className="size-4" /> Keluar Akun
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
