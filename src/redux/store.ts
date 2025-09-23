import { configureStore } from "@reduxjs/toolkit";
import { countReduser } from "./sliceCounter";


export const store = configureStore({
    reducer: {
        counter: countReduser,

    }
})

