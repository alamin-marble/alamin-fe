import React, { useEffect } from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";

function Fancybox(props) {
  const delegate = props.delegate || "[data-fancybox]";

  useEffect(() => {
    const opts = props.options || { Thumbs: { autoStart: false } };

    NativeFancybox.bind(delegate, opts);

    return () => {
      NativeFancybox.destroy();
    };
  });

  return <>{props.children}</>;
}

export default Fancybox;
