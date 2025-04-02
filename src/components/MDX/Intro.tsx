import React from "react";/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */



export interface IntroProps {
  children?: React.ReactNode;
}

function Intro({children}: IntroProps) {
  return (
    <div className="font-display text-xl text-primary dark:text-primary-dark leading-relaxed">
      {children}
    </div>
  );
}

export default Intro;
