interface GuidesLayoutProps {
  children: React.ReactNode
}

export default function GuidesLayout({ children }: GuidesLayoutProps) {
  return <div className='max-w-5xl mx-auto'>{children}</div>
}
