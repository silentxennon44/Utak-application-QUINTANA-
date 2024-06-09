declare namespace React {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    name?: string
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_APP_PASSWORD : string;
      OPEN_AI_KEY : string;
      OPEN_AI_ORG_ID : string;
    }
  }
  interface Window { images: any; }
}

type ImageType = {
  src: string;
  height: number;
  width: number;
  blurDataURL: string;
  blurWidth: number;
  blurHeight: number;
  desc: string
};

interface NavigationType {
  [key: string]: NavigationType | ImageType | any;
}

interface Window { images?: NavigationType; }
