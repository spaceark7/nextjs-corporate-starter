import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Email from '../components/Email'
import HeroGroup from '../components/HeroGroup'
import RowBlock from '../components/RowBlock'
import ServiceGroup from '../components/ServiceGroup'
import HeroRoute from '../components/HeroRoute'
import ServiceCardGroup from '../components/ServiceCardGroup'
import RowGroupWithCardList from '../components/RowGroupWithCardList'
import ContentBlock from '../components/ContentBlock'
import BentoGridWithCollapsible from '../components/BentoGridWithCollapse'
import ServiceDetail from '../components/ServiceDetail'
import NewsPostDetail from '../components/news/NewsDetail'
import FormSubmit from '../components/form/FormSubmit'

export function sectionRenderer(section: any, index: number, lang?: string) {
  switch (section.__component) {
    case 'sections.hero':
      return <Hero key={index} data={section} />
    case 'sections.hero-group':
      return <HeroGroup key={index} data={section} />
    case 'sections.row-block':
      return <RowBlock key={index} data={section} />
    case 'sections.service-group':
      return <ServiceGroup key={index} data={section} lang={lang} />
    case 'sections.service-card-group':
      return <ServiceCardGroup key={index} data={section} lang={lang} />
    case 'sections.service-card-group':
      return <ServiceCardGroup key={index} data={section} lang={lang} />
    case 'service-detail':
      return <ServiceDetail key={index} data={section} lang={lang} />
    case 'sections.content-block':
      return <ContentBlock key={index} data={section} lang={lang} />
    case 'sections.bento-grid-with-collapsible':
      return <BentoGridWithCollapsible key={index} data={section} lang={lang} />
    case 'sections.hero-route':
      return <HeroRoute key={index} data={section} />
    case 'news-post-detail':
      return <NewsPostDetail key={index} data={section} lang={lang} />
    case 'sections.row-group-card-list':
      return <RowGroupWithCardList key={index} data={section} lang={lang} />
    case 'sections.features':
      return <Features key={index} data={section} />
    case 'sections.testimonials-group':
      return <Testimonials key={index} data={section} />
    case 'sections.pricing':
      return <Pricing key={index} data={section} />
    case 'sections.lead-form':
      return <Email key={index} data={section} />
    case 'sections.form-submit':
      return <FormSubmit key={index} data={section} />
    default:
      return null
  }
}
