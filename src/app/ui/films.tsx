'use client'
import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

export default function films({
  films,
}: {
  films: Promise<{ id: string; title: string, body: string, image: string }[]>
}) {

  const [activeFilm, setActivePost] = useState<string | null>(null);


  const allfilms = use(films)

  return (
    <div className='gridContainer'
    >
      {allfilms.map(films => (
        <Link key={films.id} className="link" href={`/characters/${films.id}`}>
          <div
            key={films.id}
            className="card"
          >
          <Image className='image' src={films.image} alt={films.title}  fill objectFit='cover' />
          <div className='cardContentContainer'>
            <div className='cardContent'>
            <h3 className='cardTitle'>{films.title}</h3>

            <p className='cardText'>{films.body}</p>

          </div>
          </div>

        </div>
        </Link>
      ))}
    </div>
  )
}