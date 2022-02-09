import { api } from "../api";
import axios from "axios";
export const yaziListesiGetir=()=>dispatch=>{
    api()
      .get("/posts")
      .then((response) => {
    dispatch({type:"YAZI_LISTESI_GETIR",payload:response.data})
      })
      .catch(()=>{
          dispatch({type:"YAZI_LISTESI_GETIR_HATA",payload:"Yazilar yuklenirken bir hata olustu!"})
      })
}

//dispatch methodu parametre olarak aliniyor ve fonksiyon donduren bir fonksiyon dur
export const yaziGetir=(id)=>dispatch=>{
    axios
    .all([api().get(`/posts/${id}`), api().get(`/posts/${id}/comments`)])
    .then((responses) => {
        const payload={
            ...responses[0].data,
            yorumlar:responses[1].data
        }
      dispatch({type:"YAZI_GETIR",payload})
    })
    .catch((error) => {
      dispatch({type:"YAZI_GETIR_HATA",payload:"Yazi yuklenirken hata olustu!"})
    });
}
/*
Simdi burda dikkat edelim 2 tane api request ayni anda yapiliyor ve bize dizi icinde yazilar ve o yaziya ait yorumlar geliyor ama biz burdan bunu reducer da bir tane case icine gonderecegiz bizde bunu reducer a su sekilde gonderecegiz yazinin icinde bir yorumlar degeri olusturup yorum listesini o degerin altina atamak istiyoruz.Zaten burda biz gonderdigimiz id ye ait yaziyi tek bir yaziyi ve o yaziya ait olan birden fazla yorumlari almak istiyoruz get request ile yani gelecek yazi obje olarak gelir, yorumlar ise dizi icinde gelecek bende ondan dolayi gelecek yorumlari obje  yazisinin icerisine alarak reducer a gondermek istiyorum
Onun icin payload degerini biz kendimiz olusturacagiz ve onu reducer a gonderecegiz
*/

export const YorumEkle=(id,yorum)=>dispatch=>{
    api()
    .post(`posts/${id}/comments`,yorum)
    .then((response)=>{
 
    //  setYorumlar([...yorumlar, response.data])//...yorumlari redux tan once bu sekilde koruyorduk ama yorumlar i biz yaziDetayinda aldik ve store da old icin o zaten elimzde var onu korumamiza gerek yok.Ve biz normalde eski yorumlari koruyup yanina da form icinden veritabanina kaydedilen yorumu da mevcut yorumlarin uzerine eklemistikki aninda degisikligi gorebilelim diye...Bu arada bizim bu sekilde veritabaninda kaydettigmiz yorumu bir de burdaki verimize ekleyip burdaki verimizide korumaya calisma sebebimiz ise biz herzaman api den verileri almiyoruz ki surekli apiye bagli olup anlik ordaki degisklikligi alamayabiliriz o tarz durumlarda da biz burdan kendimiz de ekleyerek veri degismesini anlik gorebiliriz
dispatch({type:"YORUM_EKLE",payload:response.data})
    })
    .catch((error)=>{
        
        dispatch({type:"YORUM_EKLE_HATA",payload:"Yorum eklerken hata olustu!"})
    })
}
//Burda simdi kritik bir durum var ince bir durum ona bakalim simdi.Biz burda ne yapiyoruz, yorum ekliyoruz degil mi, peki yorumlarimiz bizim veri olarak nerde tutuluyordu, ana state icinde yaziDetay isminde bir obje icinde yorumlar dizisinde tutuluyordu, yani bizim simdi ekleyecegimiz veri de nereye eklenecek yaziDetayi objesinin icindeki yorumlar dizisi icerisine eklenecek 
//Simdi burda soyle bir ihtimal uzerine de bir konuyu konusalim normalde bize yorumlar direk yazi listesi icinde gelmiyor bu apide bize yaziDetayi ile birlikte geliyor ve dolayisi ile yaziDetayinda zaten bir tane uniq yazi old icin bizim yaziId sine redicer da suanda ihiyacimiz yok ancak baska baska uygulamalarda genellikle yorumlar dizi icinde gelen yaziListeleri ile her bir yazi obje olarak dizi icinde gelir ve her bir yazi icinde de yorumlari da bir property olarak gelir aslinda bu sekilde gelir genellikle, iste bu sekilde geldigi durumlarda biz yeni bir yorum ekleyecek isek bize eklenecek yorumu response.data dan aip payload a almamizin yanissira birde bu yorum hangi yaziya ait bunuda bilmemiz gerekecegi icin bizim reducer a boyle durumlarda yazi id sini de gondermemiz gerekecek.Bunu unutmayalim...bu onemli bir bestpractise dir
export const YaziSil=(id,close,push)=>dispatch=>{
    api()
    .delete(`/posts/${id}`)
    .then(() => {
    //  setHata("");
      close();
      push(`/`);
     dispatch({type:"YAZI_SIL", payload:id})//silme isleminde payload olarak yazinin id sini gondeririz ki o yaziyi biz yazi listesinden bulupda silebilelim
    })
    .catch(() => {
      //setHata("Yazıyı silerken hata oluştu.");
      dispatch({type:"YAZI_SIL_HATA",payload:"Yaziyi silerken hata olustu!"})
    });
}


export const yaziDuzenle=(id,yazi,push)=>dispatch=>{
    console.log("yaziDuzenle: ",yazi)
    api()
    .put(`/posts/${id}`, yazi)
    .then((response) => {
      dispatch({type:"YAZI_DUZENLE", payload:response.data})
      push(`/posts/${id}`);
    })
    .catch((error) => {
        console.log("yazi duzenle catch e girdi")
      //setHata("Başlık ve yazı içeriği alanları zorunludur.");
      dispatch({type:"YAZI_DUZENLE_HATA",payload:"Başlık ve yazı içeriği alanları duzeltmede bir problem ortaya cikti."})
    });
}

export const yaziEkle=(yazi,push)=>dispatch=>{
    api()
    .post("/posts", yazi)
    .then((response) => {
        dispatch({type:"YAZI_EKLE",payload:response.data})
     push("/");
   
    })
    .catch((error) => {
      //setHata("Başlık ve yazı içeriği alanları zorunludur.");
      dispatch({type:"YAZI_EKLE_HATA",payload:"Başlık ve yazı içeriği alanları zorunludur."})
    });
}