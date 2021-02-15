import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

export const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  currentSong,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const activeLibraryHandler = nextPrev => {
    //添加active state
    const newSongs = songs.map(song => {
      if (song.id === nextPrev.id) {
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
  };

  //play and pause
  const playsongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = time => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = e => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackerHandler = async diretion => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    if (diretion === 'skip-forward') {
      //设置循环的牛逼的方法
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (diretion === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };
  //添加样式
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackerHandler('skip-back')}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playsongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackerHandler('skip-forward')}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};
