"use client";

import { useAppDispatch } from "@/store/hooks/hooks";
import { useEffect, useRef } from "react";
import * as NavigationActions from "@/store/actions/navigation";
import styles from './not-found.module.scss'
import Parallax from 'parallax-js'
import '@/styles/not-found.scss'
import { useRouter } from 'next/navigation'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const dispatch = useAppDispatch();
  const sceneRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    dispatch({
      type: NavigationActions.SET_IS_NO_LOC,
      payload: {
        isNoLoc: true,
      },
    });
    if (!sceneRef.current) return;
    new Parallax(sceneRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div ref={sceneRef} id="scene" className={styles.scene} data-hover-only="false">
          <div className={styles.circle} data-depth="1.2"></div>

          <div className={styles.one} data-depth="0.9">
            <div className={styles.content}>
              <span className={styles.piece}></span>
              <span className={styles.piece}></span>
              <span className={styles.piece}></span>
            </div>
          </div>

          <div className={styles.two} data-depth="0.60">
            <div className={styles.content}>
              <span className={styles.piece}></span>
              <span className={styles.piece}></span>
              <span className={styles.piece}></span>
            </div>
          </div>

          <div className={styles.three} data-depth="0.40">
            <div className={styles.content}>
              <span className={styles.piece}></span>
              <span className={styles.piece}></span>
              <span className={styles.piece}></span>
            </div>
          </div>

          <p className={styles.p404} data-depth="0.50">
            404
          </p>
          <p className={styles.p404} data-depth="0.10">
            404
          </p>
        </div>

        <div className={styles.text}>
          <article>
            <p>
              Uh oh! Looks like you got lost. <br />
              Go back to the previous page.
            </p>
            <button onClick={() => router.back()}>Go Back</button>
          </article>
        </div>
      </div>
    </section>
  );
}
