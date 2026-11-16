/**
 * Edit this file in GitHub to manage codes, hero covers and redemption guides.
 * Codes are never automatically promoted to active. Only add verified working codes.
 * Images should be your own, licensed, or official assets you have permission to use.
 */
export type ManualCode = {code:string; reward?:string};
export type TutorialStep = {text:string; image?:string; imageAlt?:string};
export type ManualGame = {
  coverImage?:string;
  officialDescription?:string;
  lastChecked?:string; // YYYY-MM-DD; only set after a real manual check
  activeCodes:ManualCode[];
  expiredCodes:string[];
  tutorial:TutorialStep[];
};
export const manualContent:Record<number,ManualGame> = {
  2753915549: {
    coverImage:'',
    officialDescription:'',
    lastChecked:'',
    activeCodes:[],
    expiredCodes:[],
    tutorial:[
      {text:'Launch Blox Fruits on Roblox.'},
      {text:'Open the in-game code redemption menu.'},
      {text:'Enter a working code exactly as shown and confirm.'}
    ]
  }
};
// For another game, add its Roblox place ID as a key, e.g.:
// 2440500124: {coverImage:'', officialDescription:'', lastChecked:'', activeCodes:[], expiredCodes:[], tutorial:[]}
