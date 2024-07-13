import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type AppContextType = {
  farmerId: string | null;
  setFarmerId: Dispatch<SetStateAction<string | null>>;
};

const defaultState: AppContextType = {
  farmerId: null,
  setFarmerId: () => {},
};

const AppContext = createContext<AppContextType>(defaultState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [farmerId, setFarmerId] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        farmerId,
        setFarmerId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
