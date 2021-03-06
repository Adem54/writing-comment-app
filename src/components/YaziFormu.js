import React, { useState, useEffect } from "react";
import { api } from "../api";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { yaziDuzenle } from "../actions";

const YaziFormu = (props) => {
  const [yazi, setYazi] = useState({
    title: "",
    content: "",
  });

  const [hata, setHata] = useState("");
  const { id } = useParams();
  const {push} = useHistory();
  const dispatch=useDispatch();
  const onInputChange = (event) =>
    setYazi({ ...yazi, [event.target.name]: event.target.value });
  const onFormSubmit = (event) => {
    event.preventDefault();
    setHata("");
    if (props.yazi?.title) {
     dispatch(yaziDuzenle(id,yazi,push))
    } else {
      api()
        .post("/posts", yazi)
        .then((response) => {
          push("/");
        })
        .catch((error) => {
          setHata("Başlık ve yazı içeriği alanları zorunludur.");
        });
    }
  };

  useEffect(() => {
    if (props.yazi?.title && props.yazi?.content) setYazi({title:props.yazi.title,content:props.yazi.content});
  }, [props.yazi]);

  return (
    <React.Fragment>
      {hata && (
        <div className="ui error message">
          <div className="header">Hata</div>
          <p>{hata}</p>
        </div>
      )}
      <div className="ui form">
        <div className="field">
          <label>Yazı Başlığı</label>

          <input
            value={yazi.title}
            type="text"
            name="title"
            onChange={onInputChange}
          />
        </div>
        <div className="field">
          <label>Yazı İçeriği</label>
          <textarea
            value={yazi.content}
            rows="3"
            name="content"
            onChange={onInputChange}
          ></textarea>
        </div>
        <button className="ui primary button" onClick={onFormSubmit}>
          Gönder
        </button>
        <button className="ui button">İptal Et</button>
      </div>
    </React.Fragment>
  );
};

export default YaziFormu;
