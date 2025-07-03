import React, { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
export interface SuggestionData extends RefData {
    title: string;
    items: string[];
}

export interface RefData {
    msg?: string;
}

export const useSuggestionContext = (): IContextType => {
    const context = useContext(SuggestionContext);
    if (!context) {
        throw new Error('useSuggestionContext must be used within a SuggestionStore');
    }
    return context;
};

const SuggestionStore: React.FC<PropsWithChildren> = ({ children }) => {
    const [suggestionData, setSuggestionData] = useState({} as SuggestionData);
    const [refData, setRefData] = useState({} as SuggestionData);

    const contextData = useMemo(
        () => ({ refData, setRefData, suggestionData, setSuggestionData }),
        [refData, setRefData, suggestionData, setSuggestionData]
    );

    return <SuggestionContext.Provider value={contextData}>{children}</SuggestionContext.Provider>;
};

interface IContextType {
    suggestionData: SuggestionData;
    refData: SuggestionData;
    setSuggestionData: React.Dispatch<React.SetStateAction<SuggestionData>>;
    setRefData: React.Dispatch<React.SetStateAction<SuggestionData>>;
}

export const SuggestionContext = createContext({} as IContextType);
export default SuggestionStore;
