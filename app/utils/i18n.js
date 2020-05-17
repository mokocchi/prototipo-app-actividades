import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";

import en from "../translations/en";
import es from "../translations/es";
import ja from "../translations/ja";

I18n.fallbacks = true;
I18n.translations = {
  es,
  en,
  ja
};

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageCode;
}

export default I18n;