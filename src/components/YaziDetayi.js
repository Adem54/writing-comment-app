import React, { useEffect } from "react";
import YaziYorumlari from "./YaziYorumlari";
import { Link, useParams, useHistory } from "react-router-dom";
import SilModal from "./SilModal";
import { useDispatch, useSelector } from "react-redux";
import { yaziGetir, YorumEkle } from "../actions";
  const YaziDetayi = () => {
  const { id } = useParams();
  const history = useHistory();//bu reeact eski surum old icin useHistory calisiyor yoksa yeni surumlerde useHistorya yerine useNavigate calisiyor
  const dispatch=useDispatch();
  const yaziDetayi= useSelector((state)=>state.yaziDetayi);

  const handleCommentSubmit = (yorum,event) => {
    dispatch(YorumEkle(id,yorum))
  };

  useEffect(() => {
  dispatch(yaziGetir(id))
  },[])
  return (
    <React.Fragment>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>
      <div className="ui buttons">
        <Link className="ui blue button" to={`/posts/${yaziDetayi.id}/edit`}>
          Düzenle
        </Link>
        <SilModal yazi={yaziDetayi}  />
      </div>
      <p>{yaziDetayi.content}</p>
      <YaziYorumlari yorumlar={yaziDetayi.yorumlar} handleSubmit={handleCommentSubmit} />
    </React.Fragment>
  );
};

export default YaziDetayi
