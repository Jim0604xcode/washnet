import { IonGrid, IonRow, IonCol, IonFab, IonFabButton } from "@ionic/react";

const Pagination: React.FC<{cbPagination:(cur:number)=>void,numOfPage:number,curPage:number}> = ({cbPagination,numOfPage,curPage}) => {
    
    return (
      <>
        <IonGrid>
            <IonRow>
                {Array(numOfPage).fill('').map((_, i) => <IonCol key={i} size="auto"><IonFabButton color={curPage===i+1?"success":"dark"} onClick={()=>cbPagination(i+1)}>{i+1}</IonFabButton></IonCol>)}
            </IonRow>
        </IonGrid>
      </>
    );
  };
  
  export default Pagination;
  
  