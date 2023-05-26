import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import sponsor1 from '@/assets/sponsor1.png'
import sponsor2 from '@/assets/sponsor2.png'
import sponsor3 from '@/assets/sponsor3.png'
import sponsor4 from '@/assets/sponsor4.png'
import sponsor5 from '@/assets/sponsor5.png'
import sponsor6 from '@/assets/sponsor6.png'
import Image from 'next/image'
import Card from '@/components/Card'
import { card } from '@/data/card'

export default async function IndexPage() {
  return (
    <>
      <section className='pt-6 pb-8 space-y-6 md:pb-12 md:pt-10 lg:py-32'>
        <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
          <Link
            href={siteConfig.links.twitter}
            className='rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium'
            target='_blank'
          >
            Fountain Valley, CA
          </Link>
          <h1 className='text-4xl font-heading sm:text-5xl md:text-6xl lg:text-7xl'>
            Welcome to Flow State Swim
          </h1>
          <p className='max-w-[42rem] leading-normal text-muted-foreground  sm:leading-8'>
            Fountain Valley&apos;s number one swim school for kids and adults. We offer swim lessons
            for all ages and skill levels.
          </p>
          <div className='space-x-4'>
            <Link href='/login' className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section
        id='features'
        className='container py-8 space-y-6 bg-slate-50 dark:bg-transparent md:py-12 lg:py-24'
      >
        <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
          <h2 className='font-heading text-lg leading-[1.5] sm:text-3xl md:text-6xl'>
            Immerse Yourself in the State of Flow
          </h2>
          <p className='max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
            Whether you&apos;re a beginner looking to improve your form, or a seasoned swimmer
            aiming to enhance your speed and endurance, unlock your full potential with personalized
            swim coaching.
          </p>
        </div>

        <div className='py-10 sponsors'>
          <h2 className='my-6 font-semibold text-center uppercase'>
            flow state swim connects the community
          </h2>
          <div className='grid justify-center grid-cols-6 gap-4 place-items-center'>
            <div className='relative w-24 h-24 p-2 bg-gray-200 border rounded-lg'>
              <Image src={sponsor1} alt='sponsor1' fill />
            </div>
            <div className='relative w-24 h-24 p-2 border rounded-lg bg-background'>
              <Image src={sponsor2} alt='sponsor2' fill />
            </div>
            <div className='relative w-24 h-24 p-2 bg-gray-200 border rounded-lg'>
              <Image src={sponsor3} alt='sponsor3' fill />
            </div>
            <div className='relative w-24 h-24 p-2 border rounded-lg bg-background'>
              <Image src={sponsor4} alt='sponsor4' fill />
            </div>
            <div className='relative w-24 h-24 p-2 border rounded-lg bg-background'>
              <Image src={sponsor5} alt='sponsor5' fill />
            </div>
            <div className='relative w-24 h-24 p-2 bg-gray-200 border rounded-lg'>
              <Image src={sponsor6} alt='sponsor6' className='' />
            </div>
          </div>
        </div>

        <div className='mx-auto text-center md:max-w-[58rem]'>
          <h3 className=''>Unlock Your Potential</h3>
          <p className='leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
            Flow State Swimming is a powerful tool for promoting physical and mental well-being,
            unlocking the potential of people of all ages, abilities, and disabilities.
          </p>
        </div>
      </section>
      <section id='open-source' className='container py-8 md:py-12 lg:py-24'>
        <div className='mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center'>
          <h2 className='font-heading text-lg leading-[1.1] sm:text-3xl md:text-6xl'>
            Proudly Serving Fountain Valley and Orange County areas
          </h2>
        </div>
      </section>
      <section id='open-source' className='container py-8 md:py-12 lg:py-24'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {card &&
            card.map((item) => (
              <Card
                key={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
              />
            ))}
        </div>
      </section>
    </>
  )
}
