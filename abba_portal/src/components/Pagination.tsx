import { IonGrid, IonRow, IonFabButton } from "@ionic/react";
import "./Pagination.scss"
const Pagination: React.FC<{cbPagination:(cur:number)=>void,numOfPage:number,curPage:number}> = ({cbPagination,numOfPage,curPage}) => {
    
    return (
      <>
        <IonGrid>
            <IonRow>
              <div id="paginateBar">
              
              {Array(numOfPage).fill('').map((_, i) =>{
                if(curPage === i+1){
                  return <span key={i} className="paginateBtn active" onClick={()=>cbPagination(i+1)}>{i+1}</span>
                }else if(i===0){
                  // first
                  return <span key={i} className="paginateBtn" onClick={()=>cbPagination(i+1)}>{i+1}</span>
                }else if(curPage === i+2){
                  // prev
                  return <span key={i} className="paginateBtn" onClick={()=>cbPagination(i+1)}>{i+1}</span>
                }else if(curPage === i){
                  // next
                  return <span key={i} className="paginateBtn" onClick={()=>cbPagination(i+1)}>{i+1}</span>
                }else if(numOfPage === i+1){
                  // last
                  return <span key={i} className="paginateBtn" onClick={()=>cbPagination(i+1)}>{i+1}</span>
                }else if(curPage === i+3){
                  // prev prev
                  return <span key={i} className="paginateDot">...</span>
                }else if(curPage === i-1)
                  // next next
                  return <span key={i} className="paginateDot">...</span>
                })
              }  
              
              
              </div>
            </IonRow>
        </IonGrid>
      </>
    );
  };
  
  export default Pagination;
  
  