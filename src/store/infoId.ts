import { create } from "zustand";
import { devtools } from "zustand/middleware";
export type info = {
    id: number
    backdrop_path: string
    title?: string
    name?: string
    overview: string
    genres: [{ name: string, id: number }]
    release_date: string
    runtime: number
    poster_path: string
    status: string
    budget: number
    revenue: number
    original_title?: string
    original_name?: string
}
export type Actor = {
    id: number
    profile_path: string
    name: string
}
interface InfoStore {
    infoMovie: null | info,
    infoTv: null | info,
    actors: null | { cast: [Actor] },
    key: string
    active: boolean,
    recommend: null | info[]
    setRecommend: (data: any) => void
    setActive: (data: any) => void
    setKey: (data: any) => void
    setActors: (data: any) => void
    setInfoMovie: (data: any) => void
    setInfoTv: (data: any) => void
}
const infoStore = create<InfoStore>()(devtools(
    (set) => ({
        infoMovie: null,
        infoTv: null,
        actors: null,
        key: '',
        active: false,
        recommend: null,
        setRecommend: (data) => set({ recommend: data }),
        setActive: (data) => set({ active: data }),
        setKey: (data) => set({ key: data }),
        setActors: (data) => set({ actors: data }),
        setInfoMovie: (data) => set({ infoMovie: data }),
        setInfoTv: (data) => set({ infoTv: data }),
    })
))
export default infoStore