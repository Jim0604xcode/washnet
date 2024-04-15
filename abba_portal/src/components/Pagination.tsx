import { IonGrid, IonRow, IonCol, IonFab, IonFabButton } from "@ionic/react";
import "./Pagination.scss"
const Pagination: React.FC<{cbPagination:(cur:number)=>void,numOfPage:number,curPage:number}> = ({cbPagination,numOfPage,curPage}) => {
    
    return (
      <>
        <IonGrid>
            <IonRow>
              <div id="paginateBar">
              
              {Array(numOfPage).fill('').map((_, i) =><IonFabButton key={i} onClick={()=>cbPagination(i+1)}>{i+1}</IonFabButton>)}  
              </div>
            </IonRow>
        </IonGrid>
      </>
    );
  };
  
  export default Pagination;
  
  