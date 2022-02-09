import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import { YaziSil } from "../actions";
import { useSelector,useDispatch } from "react-redux";

const SilModal = ({ yazi }) => {
  const [open, setOpen] = useState(false);
  //const [hata, setHata] = useState(""); hata yi artik state den alacagiz
  const hata=useSelector(state=>state.yaziSilHata)
  const show = () => setOpen(true);
  const close = () => setOpen(false);
  const {push}=useHistory()
   const dispatch=useDispatch();

  const handleDelete = (id) => {
  dispatch(YaziSil(id,close,push))
  };

  return (
    <React.Fragment>
      <Button color="red" onClick={show}>
        Sil
      </Button>
      <Modal size="mini" open={open} onClose={close}>
        <Modal.Header>Yazıyı Sil</Modal.Header>
        <Modal.Content>
          <p>
            <b>{yazi.title}</b> başlıklı yazıyı silmek istediğinizden emin
            misiniz?
          </p>
          {hata && <p>{hata}</p>}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={close}>
            İptal Et
          </Button>
          <Button
            positive
            icon="delete"
            labelPosition="right"
            content="Evet, Sil!"
            onClick={() => handleDelete(yazi.id)}
          />
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default SilModal;
