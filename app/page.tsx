import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import SportsGrid from '@/components/SportsGrid'
import Features from '@/components/Features'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <SportsGrid />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
