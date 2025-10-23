import Posts from '@/app/ui/post'
import { Suspense } from 'react'
 import {getFilms} from '@/app/api/films'
export default function Page() {
  // Don't await the data fetching function
  const posts = getFilms()
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}

