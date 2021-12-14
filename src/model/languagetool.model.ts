export interface LanguagetoolParams {
  text: string;
  data?: string;
  language: string;
  username?: string;
  apiKey?: string;
  dicts?: string;
  motherTongue: string;
  preferredVariants?: string;
  enabledRules?: string;
  disabledRules?:string;
  enabledCategories?: string;
  disabledCategories?: string;
  enabledOnly?: string;
  level: string;
}