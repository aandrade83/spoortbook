import Navbar from '@/components/landings/1/Navbar'
import Hero from '@/components/landings/1/Hero'
import Stats from '@/components/landings/1/Stats'
import SportsGrid from '@/components/landings/1/SportsGrid'
import Features from '@/components/landings/1/Features'
import CTA from '@/components/landings/1/CTA'
import Footer from '@/components/landings/1/Footer'

export default function Landing1() {
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
