import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { hasCookie } from 'cookies-next'
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (hasCookie('authorization') === false){
      router.push('/')
    }
  })

  return (
    <body className="w-full h-full min-h-screen bg-gray-100">
      <aside>
        <Sidebar/>
      </aside>
      <header>
        <Navbar/>
      </header>
      <main>

      </main>
    </body>
  )
}

export default Home