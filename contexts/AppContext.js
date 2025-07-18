import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [productDataCtx, setProductDataCtx] = useState({
    dataPassedColorId: null,
    dataPassedthiknessId: null,
    dataPassedstandardSizeid: null,
    SlabsdataPassedSizeId: null,
    StandarddataPassedSizeId: null,
  });

  return (
    <AppContext.Provider value={{ productDataCtx, setProductDataCtx }}>
      {children}
    </AppContext.Provider>
  );
};
