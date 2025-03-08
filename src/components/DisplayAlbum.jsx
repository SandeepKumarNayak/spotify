import { useParams } from "react-router-dom"
import Navbar from "./Navbar"
import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"
import { albumsData, assets, songsData } from "../assets/assets";

const DisplayAlbum = () => {
    const {id} = useParams();
    const albumData = albumsData[id];
    const {playWithId} = useContext(PlayerContext)
    // console.log(albumData);
  return (
    <>
      <Navbar />
      <div className="mt-10 gap-8 flex flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
            <p>Playlist</p>
            <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
            <h4>{albumData.desc}</h4>
            <div className="mt-1 flex items-center gap-1">
                <img className="w-5" src={assets.spotify_logo} alt="" />
                <b>Spotify</b>
                •13,234,567 likes •<b>50 songs,</b> about 3 hours 20 minutes
            </div>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#7a7a7a]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="w-4 m-auto" src={assets.clock_icon} alt=""/>
      </div>
      <hr />
      {
        songsData.map((item, index) => (
          <div onClick = {()=>playWithId(item.id)} key={index} className="grid grid-cols-3 sm:grid-cols-4 items-center mt-5 mb-4 p-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
            <p className="text-white">
                <b className="text-[#a7a7a7] mr-4">{index + 1}</b>
                <img className="inline w-10 mr-5" src={item.image} alt="" />
                {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>

            </div>
        ))
      }
    </>
  )
}

export default DisplayAlbum
