

import { json } from "stream/consumers";
import { SearchParams } from "next/dist/server/request/search-params";
import { get } from "http";
import { getCharacters, getCharactersFromFilm,getCharactersImage } from "@/app/api/films";
export default async function Characters(props: any) {
    console.log(props);
    const params= await props.params;
    JSON.stringify(params);


    console.log("Params filmId: ", params.id);

    const charactersUrl = await getCharactersFromFilm(params.id);
    console.log("Characters: ", charactersUrl);

    const characters = await getCharacters(charactersUrl);
    console.log("Character names: ", characters);

  const imagesURL = await Promise.all(characters.map(async (character) => {
    const image = await getCharactersImage([character.url]);
    return image;
  }));


  const charactersNamesAndImages = characters.map((character, index) => ({
    name: character.name,
    image: imagesURL[index] || null,
  }));

  console.log("Characters with images: ", charactersNamesAndImages);
 

    return (
        <>
            <div className="gridCharacters">

              {charactersNamesAndImages.map((character, index) => character.image && (
                <div key={index} className="cardCharacter">
                  <h1 className="characterName">{character.name}</h1>
                  <img className="characterImage" src={character.image} alt={character.name} />
                </div>
              ))}
            </div>
        </>
    )

}
