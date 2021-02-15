import React from 'react';

export const LibrarySong = ({
  songs,
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  id,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    //添加active state
    const newSongs = songs.map(song => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    //检查当前歌曲是否播放
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
