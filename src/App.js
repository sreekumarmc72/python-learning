import React from "react";
import { useImmer } from "use-immer";
import "./assets/styles/styles.css";
import "./App.css";
import Answer from "./Answer";

export const App = () => {
  const [activeTab, setActiveTab] = useImmer("question");
  const handleTabClick = (tab) => {
    setActiveTab((draft) => {
      draft = tab;
      return draft;
    });
  };

  const QnData = [
    {
        "url": "https://onedrive.live.com/embed?resid=82C0DFA8B525C25F%21343&authkey=%21ALAk6GouNyrWkwo&em=2&wdAllowInteractivity=False&AllowTyping=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
        "fields": [
          {
            "label": "E5 Total value",
            "value": "1400"
          },
          {
            "label": "E6 Total value",
            "value": "1020"
          },
          {
            "label": "E7 Total value",
            "value": "1908"
          },
          {
            "label": "Grant Total value",
            "value": "10039"
          }
        ],
        "cells": [
          {
            "name": "E5",
            "value": "A5+B5"
          },
          {
            "name": "E6",
            "value": "A6+B6"
          },
          {
            "name": "E7",
            "value": "A7+B7+C7"
          },
          {
            "name": "E8",
            "value": "A8+B8+C8"
          },
          {
            "name": "E9",
            "value": "A9+B9+C9+D9"
          },
          {
            "name": "E10",
            "value": "A10+B10+C10+D10"
          },
          {
            "name": "E11",
            "value": "E5+E6+E7+E8+E9+E10"
          }
        ]
      }     
  ];

 const qn = QnData[0];

 console.log('qn', qn);

  return (
    <>
      <div className="col-lg-8 mb-4 mb-lg-0 main-content">
        <div className="card tab-view-wrapper">
          <div className="card-header border-0">
            <div className="tab-header">
              <div className="tabs d-flex align-items-center">
                <div
                  className={`tab ${activeTab === "question" ? "active" : ""}`}
                  onClick={() => handleTabClick("question")}
                >
                  Question
                </div>

                <div
                  className={`tab ${activeTab === "answer" ? "active" : ""}`}
                  onClick={() => handleTabClick("answer")}
                >
                  Answer
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="tab-content-block">
              <div
                className="tab-content"
                style={{ display: activeTab === "question" ? "block" : "none" }}
              >
                <div>
                  <iframe
                    width="1202"
                    height="670"
                    style={{ marginLeft: "20px" }}
                    frameBorder="0"
                    scrolling="no"
                    src={qn.url}
                  ></iframe>
                </div>
              </div>
              <div
                className="tab-content"
                style={{ display: activeTab === "answer" ? "block" : "none" }}
              >
                <section className="tabele-layout">
                  <Answer  qn={qn}/>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
