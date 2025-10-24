'use client'
import { use, useState } from 'react'
import Image from 'next/image'
import { getCharactersFromFilm } from '@/app/api/films';
export default function Characters(
  { 
  params 
}: { 
  params: { filmId: string } 
}
) {

  

  console.log(params);

  return (
    <div className='gridContainer'
    >
     Hola
    
    </div>
  )
}