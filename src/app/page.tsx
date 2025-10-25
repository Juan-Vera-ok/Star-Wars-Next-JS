import Films from '@/app/ui/films'
import { Suspense } from 'react'
import { getCharactersFromFilm, getFilms } from '@/app/api/films'
import MusicPrompt from '@/app/ui/music' // Ajusta la ruta

export default function Page() {
  const films = getFilms()
  const characters = getCharactersFromFilm("1")
  
  return (
    <>
      <MusicPrompt />
      <Suspense fallback={<div>Loading...</div>}>
        <Films films={films} />
      </Suspense>
    </>
  )
}