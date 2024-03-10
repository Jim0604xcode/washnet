import { Preferences } from '@capacitor/preferences';

export const setValue = async (key:string,value:any) => {
    await Preferences.set({
      key: key,
      value: value,
    });
    
};

export const getValue = async (key:string) => {
    const { value } = await Preferences.get({ key: key });
  
    return value
};

export const removeValue = async(key:string) => {
    await Preferences.remove({key})
}
