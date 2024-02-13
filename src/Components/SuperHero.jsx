import React, { useState } from 'react';
import { marvelCharactersData } from '../DB/data';

const SuperHero = () => {
  const [marvelCharacters, setMarvelCharacters] = useState(
    JSON.parse(JSON.stringify(marvelCharactersData))
  );
  const [heros, setHeros] = useState([]);
  const [antiHeros, setAntiHeros] = useState([]);
  const [villains, setVillains] = useState([]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const h2HeadingClass = 'text-lg text-white font-bold mb-2 text-center';
  const scrollDiv = 'h-[90%] w-full overflow-auto';
  const draggableDiv = 'border border-gray-200 rounded p-2 m-2 text-center';
  const draggableEmptyDiv =
    'bg-white border border-dotted border-gray-200 text-gray-400 rounded p-2 m-2 text-center';
  const dynamicTextColor = (category = null) =>
    category === 'Hero'
      ? 'text-green-400'
      : category === 'Anti-Hero'
      ? 'text-yellow-400'
      : category === 'Villain'
      ? 'text-red-400'
      : 'text-black';

  const onDragStart = (data, from) => {
    console.log('OnDragStart : ', data, from);
    setDraggedItem(data);
    setFrom(from);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragEnter = (to) => {
    console.log('onDragEnter : ', to);
    setTo(to);
  };

  const onDragEnd = () => {
    if (from === to) {
      setDraggedItem(null);
      setFrom('');
      setTo('');
      return;
    }

    if (from === 'heros') {
      let newHeros = heros?.filter((item) => item.id !== draggedItem?.id);
      setHeros(newHeros);
    } else if (from === 'antiHeros') {
      let newAntiHeros = antiHeros?.filter((item) => item.id !== draggedItem?.id);
      setAntiHeros(newAntiHeros);
    } else if (from === 'villains') {
      let newVillains = villains?.filter((item) => item.id !== draggedItem?.id);
      setVillains(newVillains);
    } else if (from === 'all') {
      let updatedMarvelCharacter = marvelCharacters?.filter((item) => item.id !== draggedItem?.id);
      setMarvelCharacters(updatedMarvelCharacter);
    }

    if (to === 'heros') {
      let newHeros = heros;
      newHeros.push(draggedItem);
      setHeros(newHeros);
    } else if (to === 'antiHeros') {
      let newAntiHeros = antiHeros;
      newAntiHeros.push(draggedItem);
      setAntiHeros(newAntiHeros);
    } else if (to === 'villains') {
      let newVillains = villains;
      newVillains.push(draggedItem);
      setVillains(newVillains);
    } else if (to === 'all') {
      let newMarvelCharacters = marvelCharacters;
      newMarvelCharacters.push(draggedItem);
      setMarvelCharacters(newMarvelCharacters);
    }

    setDraggedItem(null);
    setFrom('');
    setTo('');
  };

  return (
    <div className='container mx-auto mt-8 mb-12'>
      {/* First card - Marvel Characters */}
      <div className='flex justify-center'>
        <div className='w-1/3 h-80 bg-blue-400 p-4 rounded mb-4'>
          <h2 className={h2HeadingClass}>Marvel Characters</h2>
          <div
            className={scrollDiv}
            onDragEnter={() => {
              onDragEnter('all');
            }}
            onDragEnd={onDragEnd}
            onDragOver={(e) => onDragOver(e)}
          >
            {marvelCharacters && marvelCharacters.length ? (
              marvelCharacters?.map((character, index) => (
                <div
                  key={index}
                  className={`${draggableDiv} ${
                    character.id === draggedItem?.id ? 'bg-gray-200' : 'bg-white'
                  }`}
                  draggable
                  onDragStart={() => onDragStart(character, 'all')}
                  onDragOver={(e) => onDragOver(e)}
                >
                  <span className='font-semibold'>{character.name}</span>({character.category})
                </div>
              ))
            ) : (
              <div className={draggableEmptyDiv}>Drop Here</div>
            )}
          </div>
        </div>
      </div>

      {/* Second card - Heroes */}
      <div className='flex justify-between mb-4 gap-2'>
        <div className='w-1/3 h-80 bg-green-400 p-4 rounded'>
          <h2 className={h2HeadingClass}>Heroes</h2>
          <div
            className={scrollDiv}
            onDragEnter={() => {
              onDragEnter('heros');
            }}
            onDragEnd={onDragEnd}
            onDragOver={(e) => onDragOver(e)}
          >
            {heros && heros.length ? (
              heros?.map((hero, index) => (
                <div
                  key={index}
                  className={`${draggableDiv} bg-white ${dynamicTextColor(hero.category)}`}
                  draggable
                  onDragStart={() => onDragStart(hero, 'heros')}
                  onDragOver={(e) => onDragOver(e)}
                >
                  <span className='font-semibold'>{hero.name}</span>({hero.category})
                </div>
              ))
            ) : (
              <div className={draggableEmptyDiv}>Drop Here</div>
            )}
          </div>
        </div>

        {/* Third card - Anti-Heroes */}
        <div className='w-1/3 h-80 bg-yellow-400 p-4 rounded'>
          <h2 className={h2HeadingClass}>Anti-Heroes</h2>
          <div
            className={scrollDiv}
            onDragEnter={() => {
              onDragEnter('antiHeros');
            }}
            onDragEnd={onDragEnd}
            onDragOver={(e) => onDragOver(e)}
          >
            {antiHeros && antiHeros.length ? (
              antiHeros?.map((antiHero, index) => (
                <div
                  key={index}
                  className={`${draggableDiv} bg-white ${dynamicTextColor(antiHero.category)}`}
                  draggable
                  onDragStart={() => onDragStart(antiHero, 'antiHeros')}
                  onDragOver={(e) => onDragOver(e)}
                >
                  <span className='font-semibold'>{antiHero.name}</span>({antiHero.category})
                </div>
              ))
            ) : (
              <div className={draggableEmptyDiv}>Drop Here</div>
            )}
          </div>
        </div>

        {/* Fourth card - Villains */}
        <div className='w-1/3 h-80 bg-red-400 p-4 rounded'>
          <h2 className={h2HeadingClass}>Villains</h2>
          <div
            className={scrollDiv}
            onDragEnter={() => {
              onDragEnter('villains');
            }}
            onDragEnd={onDragEnd}
            onDragOver={(e) => onDragOver(e)}
          >
            {villains && villains.length ? (
              villains?.map((villain, index) => (
                <div
                  key={index}
                  className={`${draggableDiv} bg-white ${dynamicTextColor(villain.category)}`}
                  draggable
                  onDragStart={() => onDragStart(villain, 'villains')}
                  onDragOver={(e) => onDragOver(e)}
                >
                  <span className='font-semibold'>{villain.name}</span>({villain.category})
                </div>
              ))
            ) : (
              <div className={draggableEmptyDiv}>Drop Here</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperHero;
