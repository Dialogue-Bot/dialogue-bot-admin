import {
  Hero,
  Integrations,
  JoinNewsletter,
  Prices,
  Reviews,
} from '@/components/pages/landing-page'
import { useDocumentTitle } from 'usehooks-ts'

const LandingPage = () => {
  useDocumentTitle('DialogueBot')

  return (
    <div
      style={{
        backgroundImage:
          'url(https://assets-global.website-files.com/635c4eeb78332f7971255095/651bdf2facbfbfa3724aa5eb_hero_dot_grid.webp),linear-gradient(#fff,#faf9f7)',
        backgroundSize: '90%, auto',
      }}
    >
      <Hero />
      <Integrations />
      <Prices />
      <Reviews />
      <JoinNewsletter />
    </div>
  )
}

export default LandingPage
