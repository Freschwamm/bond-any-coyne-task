import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character | undefined;
}

export const CharacterModalCard = ({
  character,
}: CharacterCardProps) => {
    const [episodes, setEpisodes] = useState<{ id: number; name: string }[]>([]);
    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
            if(!character) return null
            const episodeAppearances = character.episode.map((episode) => parseInt(episode.slice(-1))).filter((episode, index) => index < 3)
            const response = await fetch(`/api/episode/${episodeAppearances}`);
            if (!response.ok) {
              throw new Error('Failed to fetch episode');
            }
            const data = await response.json();
            setEpisodes(Array.isArray(data) ? data : [data]);
          } catch (error) {
            console.error('Error fetching episodes:', error);
          }
        };
        fetchEpisodes()
    },[character]);
        if(!character) return null
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="relative w-full  flex-1">
        <Image  
            src={character.image}
            alt={character.name}
            width={300}
            height={200}
            className="object-cover h-full rounded-2xl"
        />
      </div>
      <div className="p-4 flex-1 text-black">
        <h2 className="text-xl font-bold mb-2 border-b border-gray-00">{character.name}</h2>
        <p className="mb-2">About: {character.name}</p>
        <p className="text-gray-400">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
        <h3 className="text-s font-bold mb-2 mt-2">Episodes:</h3>
        <ul>{episodes.map((episode) => (
              <li className="text-gray-400" key={episode.id}>Episode {episode.id} - {episode.name}</li>
            ))}</ul>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition-colors text-xs mt-2"
        >
          Find out more info about {character.name}
        </button>
      </div>
    </div>
  );
};
