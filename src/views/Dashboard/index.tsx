import {FC} from "react";
import Card from "../../components/Card";
import { getNasaPhotos } from "../../services/nasa";
import Header from "../../components/Header";


const Welcome : FC =  () => {

   getNasaPhotos()
   return (
      <Header />
   )
   
}

export default Welcome;
