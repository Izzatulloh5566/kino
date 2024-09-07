import { QueryFunction, UseQueryResult, useQuery } from "@tanstack/react-query"
import { axiosClient } from "./axiosClinets"
export interface IData {
    id: number
    backdrop_path: string
    original_title: string
    title?: string
    poster_path: string
    release_date: string
    overview: string
    name?:string
}
interface IRes {
    results: IData[]
}
const getInfo: QueryFunction = async ({queryKey}) => {
    const type =queryKey[1]
    const info =queryKey[2]
    const page =queryKey[3]
    const response:IRes= await axiosClient.get(`${type}/${info}?page=${page}`)
    return response.results
}

export const getData = function (type: string, info: string,page:number): UseQueryResult<IData[], Error> {
    return useQuery({ queryKey: ['getData', type, info,page], queryFn: getInfo })
}



