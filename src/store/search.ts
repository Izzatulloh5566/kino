import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IData } from "../api/getData";

interface searchStore {
    search: string
    movies: IData[] | null
    setSearch: (data: string) => void
    setMovies: (data: IData[]) => void

}
const searchStore = create<searchStore>()(devtools(
    (set) => ({
        movies: null,
        search: '',
        setSearch: (data) => set({ search: data }),
        setMovies: (data) => set({ movies: data }),
    })
))
export default searchStore