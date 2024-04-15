import { IonPage, IonContent, IonSplitPane, IonCol, IonGrid, IonRow, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonItem, IonRippleEffect } from "@ionic/react";
import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";

import { useRecoilValue } from "recoil";
import Header from "../../components/Header";
import { languageState } from "../../service/Recoil";
import "../../components/ThemeSystem.scss"
import EditorJs from '@natterstefan/react-editor-js'
import EditorHeader from '@editorjs/header'
// @ts-ignore
import EditorList from '@editorjs/list';
// @ts-ignore
import EditorChecklist from '@editorjs/checklist'
// @ts-ignore
import ColorPlugin from 'editorjs-text-color-plugin'

import { useParams } from 'react-router-dom';
import { cbEditBannerByAdmin } from "../../service/api";


const A_themeSystem_editor: React.FC = () => {

    const getLanguage = useRecoilValue(languageState);
    const { id }: { id: string } = useParams();
    const [data, setData] = useState<any>(null);
    let editor: any = null

    useEffect(() => {
        if (id === "1") {
            setData(
                {
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
            )
        }
        if (id === "2") {
            setData(
                {
                    time: new Date().getTime(),
                    blocks: [
                        {
                            type: 'header',
                            data: {
                                text: '乾洗',
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
            )
        }

        if (id === "3") {
            setData(
                {
                    time: new Date().getTime(),
                    blocks: [
                        {
                            type: 'header',
                            data: {
                                text: '洗鞋',
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
            )
        }

        if (id === "4") {
            setData(
                {
                    time: new Date().getTime(),
                    blocks: [
                        {
                            type: 'header',
                            data: {
                                text: '洗袋',
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
            )
        }
        if (id === "5") {
            setData(
                {
                    time: new Date().getTime(),
                    blocks: [
                        {
                            type: 'header',
                            data: {
                                text: '改衣',
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
            )
        }
        if (id === "6") {
            setData(
                {
                    time: new Date().getTime(),
                    blocks: [
                        {
                            type: 'header',
                            data: {
                                text: '家居用品',
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
            )
        }
    }, [])

    // const editor = null
    const onSave = async () => {
        // https://editorjs.io/saving-data
        
        const outputData = await editor.save()
        console.log('Banner data: ', outputData)
        await cbEditBannerByAdmin(id,outputData)
        
    }

    return (
        <>
            <IonPage>
                <IonContent fullscreen className="ion-padding">

                    <IonSplitPane when="md" contentId="main_wrapper">
                        <AdminMenu />

                        <div className="ion-page" id="main_wrapper">
                            <Header name={getLanguage.language.as.header} />

                            <div id="editorContainer">
                                {data !== null &&
                                    <EditorJs
                                        // holder="editorContainer"
                                        editorInstance={editorInstance => {
                                            editor = editorInstance
                                        }}
                                        data={data} tools={{
                                            Color: {
                                                class: ColorPlugin,
                                                config: {
                                                    colorCollections: ['#EC7878', '#9C27B0', '#673AB7', '#3F51B5', '#0070FF', '#03A9F4', '#00BCD4', '#4CAF50', '#8BC34A', '#CDDC39', '#FFF'],
                                                    defaultColor: '#FF1300',
                                                    type: 'text',
                                                    customPicker: false // add a button to allow selecting any colour
                                                }
                                            },
                                            Marker: {
                                                class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
                                                config: {
                                                   defaultColor: '#FFBF00',
                                                   type: 'marker',
                                                   icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
                                                  }       
                                            }, 
                                            header: EditorHeader, checklist: {
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
                                        }} />
                                }

                            </div>
                            <IonGrid>

                                <IonRow>
                                    <IonCol size="12">
                                        <IonButton onClick={onSave}>{getLanguage.language.aos.addBtn}</IonButton>

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

export default React.memo(A_themeSystem_editor);
