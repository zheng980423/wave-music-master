import React from 'react';
import { LibrarySong } from './LibrarySong';
export const Library = ({
  audioRef,
  songs,
  setCurrentSong,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong
            audioRef={audioRef}
            setCurrentSong={setCurrentSong}
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            songs={songs}
            setSongs={setSongs}
            id={song.id}
          />
        ))}
      </div>
    </div>
  );
};
