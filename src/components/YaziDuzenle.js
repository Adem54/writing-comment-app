import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import YaziFormu from "./YaziFormu";


const YaziDuzenle = (props) => {
  //const [yazi, setYazi] = useState({});
  const { id } =useParams();

  const yazi=useSelector(state=>state.yaziDetayi)
  //Bizim store umuzda yazi detayi bulundugu icin artik yaziDetayini ordan alabiliriz tekrar useEffect ile apiye get request gondermemize gerek yok
  /*
   useEffect(() => {
    api()
      .get(`/posts/${id}`)
      .then((response) => {
        setYazi({ title: response.data.title, content: response.data.content });
      });
  }, []);
  */
  return (
    <div>
      <h1>Yazi Duzenleme Formu</h1>
      <YaziFormu yazi={yazi} />
    </div>
  );
};

export default YaziDuzenle;
