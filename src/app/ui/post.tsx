'use client'
import { use, useState } from 'react'
import Image from 'next/image'

export default function Posts({
  posts,
}: {
  posts: Promise<{ id: string; title: string, body: string, image: string }[]>
}) {

  const [activeFilm, setActivePost] = useState<string | null>(null);


  const allPosts = use(posts)

  return (
    <div className='gridContainer'
    >
      {allPosts.map(post => (
        <div
          key={post.id}
          className="card"
          style={{
            backgroundImage: `url(${post.image})`
          }}
        ><div className='cardContent'>
            <h3 className='cardTitle'>{post.title}</h3>

            <p className='cardText'>{post.body}</p>

          </div>

        </div>
      ))}
    </div>
  )
}