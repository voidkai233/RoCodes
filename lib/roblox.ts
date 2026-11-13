import {catalog} from '../data/catalog';
export type Game={id:number;placeId:number;name:string;playing:number;visits:number;genre:string;description:string;icon:string;updated:string;source:'live'|'unavailable'};
export async function getGames():Promise<Game[]>{
 return catalog.map(g=>({id:g.id,placeId:0,name:g.name,playing:0,visits:0,genre:g.category,description:g.description,icon:'',updated:'',source:'unavailable' as const}));
}
export const formatNumber=(n:number)=>new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(n);
