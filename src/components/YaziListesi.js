import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yaziListesiGetir } from "../actions";
const YaziListesi = (props) => {
  //const [yaziListesi, setYaziListesi] = useState([]);
  const yaziListesi=useSelector((state)=>state.yaziListesi);
  console.log(yaziListesi);
  const dispatch=useDispatch();//useDispatch sayesinde biz olusturdugumuz actions methodlari cagiriyoruz,burda useEffect icerisinde tetiklenme islemini yapacagiz
  useEffect(() => {
    dispatch(yaziListesiGetir());//Kullanima dikkat edelim dispatch icerisinde fonksiyonu cagirmamiz gerekiyor
  }, []);
  return (
    <div className="ui relaxed divided list">
      <Link to="/yaziekle" className="ui primary button">
        Yazı Ekle
      </Link>
      {yaziListesi.map((yazi,index) => {
        return (
          <div className="item" key={yazi.id}>
            <i className="large github middle aligned icon"></i>
            <div className="content">
              <Link to={`/posts/${yazi.id}`} className="header">
                {yazi.title}
              </Link>
              <div className="description">{yazi.created_at}</div>
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
};


export default YaziListesi;
