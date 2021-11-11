import React from "react";
import { BackgroundCanvasAnimation } from "./BackgroundCanvasAnimation.js";

export default function Background(props: { className?: string }) {
  React.useEffect(() => {
    var animation = new BackgroundCanvasAnimation();
    animation.start();
  });

  return <canvas className={props.className} id="c" />;
}
