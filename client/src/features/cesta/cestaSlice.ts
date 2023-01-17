import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import utils from "../../app/api/utils";
import { Cesta } from "../../app/models/cesta";

interface CestaState {
    cesta: Cesta | null;
    status: string;
}

const initialState: CestaState = {
    cesta: null,
    status: 'idle'
}

export const addItemCestaAsync = createAsyncThunk<Cesta, { produtoId: number, quantidade?: number }>(
    'cesta/addItemCestaAsync',
    async ({ produtoId, quantidade = 1 }, thunkAPI) => {
        try {
            return await utils.Cesta.addItem(produtoId, quantidade)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    })

export const removeItemCestaAsync = createAsyncThunk<void, { produtoId: number, quantidade: number, name: string}>(
    'cesta/removeItemCestaAsync',
    async ({ produtoId, quantidade}, thunkAPI) => {
        try {
            await utils.Cesta.removeItem(produtoId, quantidade);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const cestaSlice = createSlice({
    name: 'cesta',
    initialState,
    reducers: {
        setCesta: (state, action) => {
            state.cesta = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(addItemCestaAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.produtoId;
        });
        builder.addCase(addItemCestaAsync.fulfilled, (state, action) => {
            state.cesta = action.payload
            state.status = 'idle';
        });
        builder.addCase(addItemCestaAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = 'idle';
        });
        builder.addCase(removeItemCestaAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.produtoId + action.meta.arg.name;
        });
        builder.addCase(removeItemCestaAsync.fulfilled, (state, action) => {
            const { produtoId, quantidade, name } = action.meta.arg;
            const itemIndex = state.cesta?.items.findIndex(i => i.produtoId === produtoId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.cesta!.items[itemIndex].quantidade -= quantidade!;
            if (state.cesta?.items[itemIndex].quantidade === 0)
                state.cesta.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeItemCestaAsync.rejected, (state, action) => {
            console.log(action)
            state.status = 'idle';
        })
    })
})

export const { setCesta } = cestaSlice.actions;