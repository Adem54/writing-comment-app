
const INITIAL_STATE={
    yaziListesi:[],
    yaziListesiHata:"",
    yaziDetayi:{
        id:"",
        title:"",
        content:"",
        created_at:"",
        yorumlar:[]
    },
    yaziDetayiHata:"",
    yorumEkleHata:"",
    yaziSilHata:"",
    yaziDuzenleHata:""
};
//Obje olustururken baslangic degeri olarak objelerin property lerine de bos degerler vermek gerekiyor ki biz bu degerleri apiden getirdgimiz icin apiden verilerin gelmesi de biraz zaman aliyor dolayisi ile, undefined hatasi alabiliriz eger propertysilere baslangic degeri hicbirsey vermezsek ondan dolayi en azindan bos degerler veririz
export const reducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "YAZI_LISTESI_GETIR":
            return {...state,yaziListesi:action.payload,yaziListesiHata:""}
          case  "YAZI_LISTESI_GETIR_HATA":
              return {...state,yaziListesiHata:action.payload}  
              case "YAZI_GETIR":
                  return {...state,yaziDetayi:action.payload, yaziDetayiHata:""}
               case "YAZI_GETIR_HATA":
                   return {...state,yaziDetayiHata:action.payload}  
                case "YORUM_EKLE":
                    return {...state, yaziDetayi:{...state.yaziDetayi,
                        yorumlar:[...state.yaziDetayi.yorumlar,action.payload]},yorumEkleHata:""}   
                 case "YORUM_EKLE_HATA":
                     return {...state,yorumEkleHata:action.payload}   
                 case "YAZI_SIL":
                     return {...state,yaziListesi:state.yaziListesi.filter(y=>y.id!==action.payload), yaziSilHata:""}     
                     case "YAZI_SIL_HATA":
                         return {...state,yaziSilHata:action.payload}
                         case "YAZI_DUZENLE":
                             return {...state, yaziDetayi:{...state.yaziDetayi,...action.payload},yaziDuzenleHata:""}
                             case "YAZI_DUZENLE_HATA":
                                 return {...state,yaziDuzenleHata:action.payload}

              default:
            return state;
    }
}