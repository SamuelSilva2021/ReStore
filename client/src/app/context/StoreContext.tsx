import { createContext, PropsWithChildren, useState } from "react";
import { Cesta } from "../models/cesta";
import {useContext} from "react"

interface StoreContextValue {
    cesta: Cesta | null;
    setCesta: (cesta : Cesta) => void;
    removeItem: (produtoId: number, quantidade: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined)

export function useStoreContext(){
    const context = useContext(StoreContext);

    if(context === undefined){
        throw Error('Ops - não parece que estamos dentro de um servidor');
    }

    return context;
}

export function StoreProvider({children}: PropsWithChildren<any>){
    const [cesta, setCesta] = useState<Cesta | null>(null);

    function removeItem(produtoId: number, quantidade: number){
        if(!cesta) return;
        const items = [...cesta.items];
        const itemIndex = items.findIndex(i => i.produtoId === produtoId);
        if(itemIndex >= 0){
            items[itemIndex].quantidade -= quantidade;
            if(items[itemIndex].quantidade === 0) items.splice(itemIndex, 1);
            setCesta(prevState => {
                return {...prevState!, items}
            })
        }
    }

    return(
        <StoreContext.Provider value={{cesta, setCesta, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}