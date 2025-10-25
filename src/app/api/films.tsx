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

interface Character {
  name: string;
  url: string;
}

async function getCharacters(urls: string[]): Promise<Character[]> {
  const characters = await Promise.all(urls.map(async (url) => {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error('Failed to fetch characters')
    const data = await res.json()

    return data
  }))
  return characters
}

function extractIdFromUrl(url: string): number | null {
  try {
    const match = url.match(/\/(\d+)\/?$/);
    if (!match) {
      return null;
    }
    return parseInt(match[1], 10);
  } catch {
    return null;
  }
}

async function getCharactersImage(character:string[]): Promise<string | null> {

  const charactersImage = await Promise.all(character.map(async (char) => {
    const id = extractIdFromUrl(char);
    if (id === null) {
      return null;
    }
    const res = await fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error('Fail to fetch character image')
    const data = await res.json()
    return data.image
  }));

  return charactersImage[0] || null;
}

export { getFilms, getCharactersFromFilm,getCharacters,getCharactersImage };