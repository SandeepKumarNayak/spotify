

import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef();
    const seekBar = useRef();
    const seekBg = useRef();

    const [track, setTrack] = useState(songsData[0]);  
    const [playStatus, setPlayStatus] = useState(false);  
    const [time, setTime] = useState({
        currentTime:{
            second:0,
            minute: 0
        },
        totalTime:{
            second:0,
            minute: 0
        }   
    })  

    const play = ()=> {
        audioRef.current.play();
        setPlayStatus(true);
    }
    const pause = ()=> {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previousSong = async () => {
        if(track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const nextSong = async () => {
        if(track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const seekSong = (e) => {
        const offeset = e.nativeEvent.offsetX;
        const width = seekBg.current.offsetWidth;
        const percent = offeset / width;
        audioRef.current.currentTime = percent * audioRef.current.duration;
    }

    useEffect(()=>{
        setTimeout(() => {
            audioRef.current.ontimeupdate = () =>{
                seekBar.current.style.width =  `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%`;
                setTime({
                    currentTime:{
                        second:Math.floor(audioRef.current.currentTime % 60),
                        minute:Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime:{
                        second:Math.floor(audioRef.current.duration % 60),
                        minute:Math.floor(audioRef.current.duration / 60)
                    }
                }
                )
                // if(time.currentTime.second == time.totalTime.second && time.currentTime.minute == time.totalTime.minute) {
                //     nextSong();
                // }
            }
        }, 1000);
    }, [audioRef])
    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,  
        playStatus,
        setPlayStatus,
        time,
        setTime,
        setTrack,
        play,
        pause,
        playWithId,
        previousSong,
        nextSong,
        seekSong
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;