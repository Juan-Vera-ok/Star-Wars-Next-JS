import Films from '@/app/ui/films'
import { Suspense } from 'react'
 import {getCharactersFromFilm, getFilms} from '@/app/api/films'
export default function Page() {
  // Don't await the data fetching function
  const films = getFilms()
  const characters = getCharactersFromFilm("1");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Films films={films} />
    </Suspense>
  )
}

