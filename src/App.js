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
                                    className={`tab ${activeTab === "ref" ? "active" : ""}`}
                                    onClick={() => handleTabClick("ref")}
                                >
                                    Reference Image
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
                                    <h1>Scenario</h1>
                                    <p>
                                        You are a Business Analyst at Superstore Inc., and you have been given the task of analyzing sales performance
                                        across different regions and sales managers. Additionally, the company wants to track sales returns using
                                        cross-reporting techniques and understand how much each sales manager is responsible for in terms of returns.
                                    </p>

                                    <h1>Your task</h1>
                                    <p>Using the Superstore Sales dataset, perform the following analyses in Power BI:</p>

                                    <h2>1. Region-wise Sales Analysis</h2>
                                    <ul>
                                        <li>Create a report showing total sales per region using appropriate visualizations.</li>
                                        <li>Identify which region has the highest and lowest sales.</li>
                                    </ul>

                                    <h2>2. Sales Manager-wise Sales</h2>
                                    <ul>
                                        <li>Identify the top-performing sales managers based on total sales.</li>
                                        <li>Create a table showing sales figures grouped by sales manager.</li>
                                    </ul>

                                    <h2>3. Finding Sales Returns Using Cross Reporting</h2>
                                    <ul>
                                        <li>Implement cross-reporting techniques to track the total value of returned sales.</li>
                                        <li>Use a separate dataset or table containing return information and link it appropriately.</li>
                                    </ul>

                                    <h2>4. Sales Return Per Manager</h2>
                                    <ul>
                                        <li>Find the total returns handled by each sales manager.</li>
                                        <li>Compare sales vs. returns per manager to identify trends.</li>
                                    </ul>

                                </div>
                            </div>
                            <div
                                className="tab-content"
                                style={{ display: activeTab === "ref" ? "block" : "none" }}
                            >
                                <div>
                                    <img src={require('./assets/img/Image-ref.png')} alt="Success" style={{ width: "550px", marginBottom: "20px" }} />
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
