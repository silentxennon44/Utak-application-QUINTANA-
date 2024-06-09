'use client';
import { useEffect } from 'react';
 import './error.css'
import { useAppDispatch } from '@/store/hooks/hooks';
import * as NavigationActions from "@/store/actions/navigation";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  const dispatch = useAppDispatch();
  const handleMouseMouve = (event: MouseEvent) => {
  const eye = Array.from(document.querySelectorAll('.eye')) as HTMLDivElement[];

  eye.forEach((element)=>{
    const x = (element.offsetLeft) + (element.offsetWidth / 2);
    const y = (element.offsetTop) + (element.offsetHeight / 2);
    const rad = Math.atan2(event.pageX - x, event.pageY - y);
    const rot = (rad * (180 / Math.PI) * -1) + 180;

    element.style.transform = 'rotate(' + rot + 'deg)';
    })
  }

  useEffect(() => {
    document.body.addEventListener('mousemove', handleMouseMouve)
    dispatch({
      type: NavigationActions.SET_IS_NO_LOC,
      payload: {
        isNoLoc: true,
      },
    });
    return () => document.body.removeEventListener('mousemove', handleMouseMouve)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <html>
      <body>
         <div>
           <span className='error-num'>5</span>
           <div className='eye'></div>
           <div className='eye'></div>
           <p className='sub-text'>{"Oh eyeballs! Something went wrong. We're <i>looking</i> to see what happened."}</p>
           <a href=''>Go back</a>
         </div>
      </body>
    </html>
  );
}