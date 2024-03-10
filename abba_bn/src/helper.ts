export let orderItemsEncode = (p:number,d:number,w:number,l:number,t:number):string => {
    return "p" + p + "d" + d + "w" + w + "l" + l + "t" + t
}
export type Items = {
    poundWash:number
    dryCleaning:number
    washShoes:number
    leatherWashBag:number
    totalPic:number
}
export let orderItemsDecode = (str:string):Items => {
        let items = {
            poundWash:0,
            dryCleaning:0,
            washShoes:0,
            leatherWashBag:0,
            totalPic:0,
        }
        str.replace(/(\w)(\d+)/g,function(m,n,d){
        console.log(n,d)
        if(n==="p"){
            items.poundWash = Number(d)
        }else if(n==="d"){
            items.dryCleaning= Number(d)
        }else if(n==="w"){
            items.washShoes= Number(d)
        }else if(n==="l"){
            items.leatherWashBag= Number(d)
        }else if(n==="t"){
            items.totalPic= Number(d)
        }
        return ""
        });
        
        return items
    }
    
    


// let test = orderItemsDecode("p2d45w3l12t62")
// console.log(test)