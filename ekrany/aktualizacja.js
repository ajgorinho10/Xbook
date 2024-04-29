import React, { createContext, useContext, useState,useEffect } from 'react';
import { LightSensor } from 'expo-sensors';

const AktContext = createContext();

export const AktProvider = ({ children }) => {
  const [akt, setakt] = useState(0);
  const [link,setlink] = useState('http://192.168.1.14:3004');
  const [isDark,setIsDark] = useState('white');
  const [isOn,setIsOn] = useState(false);
  const [{ illuminance }, setData] = useState({ illuminance: 0 });

  const wlacz = ()=>{
    LightSensor.setUpdateInterval(4000);
    LightSensor.addListener(newmotyw);
  }

  const wylacz = ()=>{
    LightSensor.removeAllListeners();
  }

  const newmotyw = ({illuminance}) =>{
    console.log('jasnosc:'+illuminance);
    if(illuminance<20){
      setIsDark('grey')
    }
    else{
      setIsDark('white')
    }
  }

  const newakt = () => {
    setakt(akt+1);
  };
  return (
    <AktContext.Provider value={{ akt,link,newakt,isDark,wlacz,wylacz}}>
      {children}
    </AktContext.Provider>
  );
};

export const useAkt = () => {
  const context = useContext(AktContext);
  if (!context) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
};