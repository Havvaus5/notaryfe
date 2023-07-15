export const REAL_ESTATE_EKLE = 'real-estate-ekle';
export const REAL_ESTATE_SORGULA = 'real-estate-sorgula';

export const YAYINDA_DEGIL = "0";
export const YAYINDA = "1";
export const ALICI_ICIN_KILITLENDI = "2";
export const YAYINDAN_KALDIRILDI = "3";
export const DEVIR_ISLEMI_TAMAMLANDI = "4";
export const ALICI_ONAYI_ILE_KILIT_KALDIRMA = "5";

export const PROP_STATE_EMPTY = "0";
export const PROP_STATE_KABUL = "1";
export const PROP_STATE_RED = "2";
export const PROP_STATE_BEKLEMEDE = "3";

export function getIlanDurum(state) {
   let result;
   switch (state) {
      case YAYINDA_DEGIL:
         result = 'Yayında değil';
         break;
      case YAYINDA:
         result = 'Yayında';
         break;
      case ALICI_ICIN_KILITLENDI:
         result = 'Alıcı için kilitlendi';
         break;
      case YAYINDAN_KALDIRILDI:
         result = 'Yayından kaldırıldı';
         break;
      case DEVIR_ISLEMI_TAMAMLANDI:
         result = 'Devir işlemi tamamlandı';
         break;
      case ALICI_ONAYI_ILE_KILIT_KALDIRMA:
         result = 'Alıcı onayı ile kilit kaldırma';
         break;
      default:
         result = 'İlan Durum Hata';
   }
   return result;
}


export function getRealEstateAdres(item) {
   let str = `${item.mahalle} mahallesi `;
   if (item.cadde != '') {
      const cadde = `${item.cadde} cadde `;
      str += cadde;
   }
   if (item.daireNo != '') {
      str += item.daireNo;
   }
   return str;
}

export function getPayPayda(item) {
   return `${item.hisse.pay}/${item.realEstateData.payda} `;
}

export function getIlIlce(item) {
   
   return `${item.ilce.toUpperCase()} / ${item.il.toUpperCase()} `;
}

export function getTasinmazTipNitelik(item) {
   return `${item.tasinmazTip}/${item.nitelik} `;;
}