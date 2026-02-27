import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";

type VolumeContextType = [number, Dispatch<SetStateAction<number>>];
const Volume = createContext<VolumeContextType|null>(null);
Volume.displayName = 'Volume';

export const VolumeProvider = (props:any) => {
  const [volume, setVolume] = useState<number>(Number(localStorage.getItem('volume')))
  useEffect(() => {
    localStorage.setItem('volume', JSON.stringify(volume));
  }, [volume]);

  return (
    <Volume.Provider value={[volume, setVolume]} {...props}/>
  )
}

export const useVolumeContext = () => {
    const context = useContext(Volume);
    if(context === undefined || context === null) throw new Error('VolumeContext cannot be used outside of the <VolumeProvider />');
    return context;
}