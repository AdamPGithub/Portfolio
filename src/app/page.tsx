import ContactForm from './components/ContactForm'
import Category from './components/Home/Category'
import Hero from './components/Home/Hero'
import Pricing from './components/Home/Pricing'
import Project from './components/Home/Project'
import Records from './components/Home/Records'
import Review from './components/Home/Review'
import Specialize from './components/Home/Specialize'

export default function Home() {
  return (
    <main>
      <Hero />
      <Project />
      <Records />
      <Review />
      <Specialize />
      <Pricing />
      <Category />
      <ContactForm />
    </main>
  )
}
