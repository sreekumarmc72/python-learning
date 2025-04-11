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
                            <div>
                                <div
                                    className="tab-content tab-content-wrapper"
                                    style={{ display: activeTab === "question" ? "block" : "none" }}
                                >


                                    <h4><b>Scenario</b></h4>
                                    <p>
                                        You are learning Python and have been tasked with understanding the concept of tuples. Specifically, you need to write a Python code snippet that demonstrates the basic operations on tuples.
                                    </p>

                                    <h4><b>Question</b></h4>
                                    <p style={{ fontWeight: "600" }}>Using the code editor, create a Python script that performs the following operations on tuples:</p>

                                    <ol style={{ marginTop: "15px" }}>
                                        <li style={{ marginBottom: "15px" }}>Define a tuple with the elements 'apple', 'banana', and 'cherry'.</li>
                                        <li style={{ marginBottom: "15px" }}>Access and print the first item of the tuple.</li>
                                        <li style={{ marginBottom: "15px" }}>Find the length of the tuple.</li>
                                        <li style={{ marginBottom: "15px" }}>Check if the item 'banana' exists in the tuple.</li>
                                        <li>Attempt to modify the first item of the tuple to 'orange'.</li>
                                    </ol>

                        

                                </div>
                            </div>
                            <div
                                className="tab-content"
                                style={{ display: activeTab === "ref" ? "block" : "none" }}
                            >
                                <div style={{ textAlign: "center" }}>
                                    <img src={require('./assets/img/Image-ref.png')} alt="Success" style={{ width: "550px", marginBottom: "40px", marginTop: "40px" }} />
                                </div>
                            </div>
                            <div
                                className="tab-content"
                                style={{ display: activeTab === "answer" ? "block" : "none" }}
                            >
                                <section className="tabele-layout">
                                    <Answer />
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
