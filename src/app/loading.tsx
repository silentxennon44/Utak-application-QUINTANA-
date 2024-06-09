// import Spinner from '@/components/loading'
"use client";
import { useAppDispatch } from "@/store/hooks/hooks";
import { useEffect } from "react";
import * as NavigationActions from "@/store/actions/navigation";
import './loading.scss'

export default function Loading() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: NavigationActions.SET_IS_NO_LOC,
      payload: {
        // isNoLoc: true,
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Or a custom loading skeleton component
  return (
    <main className="loading">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </main>
  );
  // return (<Spinner />)
}
