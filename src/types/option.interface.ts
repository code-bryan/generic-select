export interface OptionInterface<Content = string, Config = any> {
  value: string | number;
  content: Content;
  config?: Config;
}