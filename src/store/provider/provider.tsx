"use client";

import { Provider } from "react-redux";
import store from "../store";
import images from "@/assets";
import { useEffect } from "react";
import { getLeafNodes } from "@/utils/helpers";

interface NavigationType {
  [key: string]: NavigationType | ImageType | any;
}
export default function Providers({ children }: any) {

  function declareCss(params: NavigationType){
    const headTag = document.getElementsByTagName('head')[0]
    const styleTag = document.createElement("style")
    styleTag.innerHTML = `
      :root {
      `
    getLeafNodes(params).forEach((item: string)=>{
      // console.log(item)
      // Extract the last segment after the last slash
      const segments = item.split('/');
      const lastSegment = segments.pop();

      // Extract the filename before the first dot
      const filename = lastSegment!.split('.')[0];

      styleTag.innerHTML += `--${filename} : url(${item});
      `
    })

    styleTag.innerHTML += `}`
    headTag.appendChild(styleTag);

    window['images'] = images

    return () => {
      headTag.removeChild(styleTag)
      delete window.images

    }
  }

  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const remove = declareCss(images)
      return () => {
        //  cleanup
        remove()
      }
    }
  }, []);
  return (<>
        <Provider store={store}>{children}</Provider>
  </>);
}
