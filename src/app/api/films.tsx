const images = ["/img/films/film1.jpg", "/img/films/film2.jpg", "/img/films/film3.jpg", "/img/films/film4.jpg", "/img/films/film5.jpg", "/img/films/film6.jpg"];
type Film = { id: string; title: string; body: string; image: string };



async function getFilms(): Promise<Film[]> {
  const res = await fetch('https://swapi.dev/api/films/', { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to fetch posts')
  const data = await res.json()
  return (data.results || []).map((f: any, index: number) => ({
    id: String(f.episode_id),
    title: f.title,
    body: f.opening_crawl,
    image: images[index] || null,
  }))
}


async function getCharactersFromFilm(filmId: string): Promise<any[]> {
  const res = await fetch(`https://swapi.dev/api/films/${filmId}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to fetch characters')
  const data = await res.json()
  return data.characters || []
}

export { getFilms, getCharactersFromFilm };