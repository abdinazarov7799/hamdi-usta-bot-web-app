import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import config from "../../config";
import storage from "../storage";
import uz from '../../assets/lang/uz.json'
import ru from '../../assets/lang/ru.json'


const resources = {
    UZ: {
        translation: uz
    },
    RU: {
        translation: ru
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: storage.get("lang") || config.DEFAULT_APP_LANG,
        fallbackLng: storage.get("lang") || config.DEFAULT_APP_LANG,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;


// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import I18NextHttpBackend from "i18next-http-backend";
// import config from "../../config";
// import storage from "../storage";
// const i18config = i18n
//     .use(initReactI18next)
//     .use(LanguageDetector)
//     .use(I18NextHttpBackend)
//     .init({
//         lng: storage.get("lang") || config.DEFAULT_APP_LANG,
//         fallbackLng: storage.get("lang") || config.DEFAULT_APP_LANG,
//         saveMissing: true,
//         detection: {
//             order: ["localStorage"],
//             lookupLocalStorage: "lang",
//         },
//         react: {
//             useSuspense: true,
//             wait: true,
//         },
//         backend: {
//             loadPath: `${config.API_ROOT}/api/lang/by-lang?language={{lng}}`,
//             addPath: `${config.API_ROOT}/api/lang/create-key`,
//         },
//     });
//
// export default i18config;
