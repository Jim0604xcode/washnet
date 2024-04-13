import { IonPage, IonContent, IonSplitPane, IonCol, IonGrid, IonRow, IonButton } from "@ionic/react";
import React from "react";
import AdminMenu from "../../components/AdminMenu";

import { useRecoilValue } from "recoil";
import Header from "../../components/Header";
import { languageState } from "../../service/Recoil";

// import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
// DocumentEditorContainerComponent.Inject(Toolbar);
// import { createReactEditorJS } from 'react-editor-js'
import "../../components/ThemeSystem.scss"
import EditorJs from '@natterstefan/react-editor-js'
import EditorHeader from '@editorjs/header'
// @ts-ignore
import EditorList from '@editorjs/list';
// @ts-ignore
import EditorChecklist from '@editorjs/checklist'

const A_themeSystem: React.FC = () => {
    const getLanguage = useRecoilValue(languageState);
    // const ReactEditorJS = createReactEditorJS()
    let editor:any = null
   
    const data: any = {
      time: new Date().getTime(),
      blocks: [
        {
          type: 'header',
          data: {
            text: '磅洗',
            level: 2,
          },
        },
        
        {
          type: 'list',
          data: {
            style: 'unordered',
            items: [
              '自選時間上門收衫送衫',
              '只需兩天送達',
              '另設加急服務',
            ],
          },
        },
        
      ],
      version: '2.15.0',
    }
    // const editor = null
    const onSave = async () => {
      // https://editorjs.io/saving-data
      try {
        const outputData = await editor.save()
        console.log('Article data: ', outputData)
      } catch (e) {
        console.log('Saving failed: ', e)
      }
    }
    
    return (
      <>
        <IonPage>
        <IonContent fullscreen className="ion-padding">

          <IonSplitPane when="md" contentId="main">
            <AdminMenu />

            <div className="ion-page" id="main">
            <Header name={getLanguage.language.as.header} />
            
              <div id="editorContainer">
            <EditorJs
            // holder="editorContainer"
            editorInstance={editorInstance => {
              editor = editorInstance
            }} 
            data={data} tools={{ header: EditorHeader,checklist: {
              class: EditorChecklist,
              inlineToolbar: true,
            },
            list: {
              class: EditorList,
              inlineToolbar: true,
              config: {
                defaultStyle: 'unordered'
              }
            }, 
            }}/>
            </div>
            <IonGrid>
            
                <IonRow>
                  <IonCol size="12">
                  <IonButton onClick={onSave}>{getLanguage.language.aos.resetBtn}</IonButton>
                  
                  </IonCol>
                </IonRow>
            </IonGrid>
            
            </div>
          </IonSplitPane>
          
        </IonContent>
      </IonPage>
      </>
    );
  };
  
  export default React.memo(A_themeSystem);
  