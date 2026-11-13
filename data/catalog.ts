export type Code={code:string;reward:string;verifiedAt:string;expiresAt?:string;status:'active'|'expired'};
export type Entry={id:number;name:string;category:string;description:string;guide:string;codes:Code[]};
// Universe IDs are resolved at runtime from Roblox. These initial records are editorial seed candidates.
// Never mark unverified codes active. Add only independently checked codes.
export const catalog:Entry[]=[
{id:2753915549,name:'Blox Fruits',category:'Adventure',description:'Explore islands, train abilities and battle bosses in this anime-inspired adventure.',guide:'Open the game, find the gift/code icon, enter a code exactly as written and press Redeem.',codes:[]},
{id:2440500124,name:'DOORS',category:'Horror',description:'Explore mysterious rooms, cooperate and survive a series of unexpected encounters.',guide:'Open the in-game shop or code entry menu when available, then enter the code.',codes:[]},
{id:920587237,name:'Adopt Me!',category:'Roleplay',description:'Collect pets, decorate homes and trade with other players.',guide:'Check the game’s official announcements for whether code redemption is currently supported.',codes:[]},
{id:1686885941,name:'Brookhaven RP',category:'Roleplay',description:'Roleplay in an open town with houses, vehicles and social activities.',guide:'Check official game information for currently supported redemption methods.',codes:[]},
{id:2316994223,name:'Pet Simulator X!',category:'Simulator',description:'Collect pets, unlock new worlds and earn coins.',guide:'Check the official game interface and developer announcements for code availability.',codes:[]},
{id:994732206,name:'Royale High',category:'Roleplay',description:'Dress up, explore magical settings and participate in roleplay.',guide:'Only redeem codes using officially provided in-game tools.',codes:[]},
{id:111958650,name:'Arsenal',category:'Shooter',description:'Fast-paced competitive shooter with rotating weapons.',guide:'Check the in-game codes menu if enabled and follow official developer instructions.',codes:[]},
{id:142823291,name:'Murder Mystery 2',category:'Horror',description:'A social deduction mystery where players take different roles.',guide:'Look for the inventory code field if supported and confirm codes with official sources.',codes:[]}
];
