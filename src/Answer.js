import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomView.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button, Table } from "react-bootstrap";

// Authorization token stored in one place
const AUTH_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpETmFfNGk0cjdGZ2lnTDNzSElsSTN4Vi1JVSIsImtpZCI6IkpETmFfNGk0cjdGZ2lnTDNzSElsSTN4Vi1JVSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTI5NDU0ODYtMTYwNi00MmM1LWJmZWMtMTcwNDU5MDQyMjViLyIsImlhdCI6MTc0MjI3OTQ0MSwibmJmIjoxNzQyMjc5NDQxLCJleHAiOjE3NDIyODQzNDQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WkFBQUFaWlFiNDFKR0JKRGppbStydzZaMVVUVkJ3YlVwQnFMamVrcEtsa0RkTXlsSklWbUJsTTVlV2x3OGFSSEJVVzU2SmdkMkNxMXREYUJQU0NrS2dENVVKUktMT3BRVzkrclNVTG9hRXpBeVZJYz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMThmYmNhMTYtMjIyNC00NWY2LTg1YjAtZjdiZjJiMzliM2YzIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJCSSIsImdpdmVuX25hbWUiOiJQb3dlciIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjExMS45Mi43OC4xNDAiLCJuYW1lIjoiUG93ZXIgQkkiLCJvaWQiOiJmMTJlNGQ4MS05Y2UwLTQzNDAtYmFiMC02YTIzZmZiNjdiODAiLCJwdWlkIjoiMTAwMzIwMDQ0NDU1M0NBQyIsInJoIjoiMS5BVlVBaGxTVW9nWVd4VUtfN0JjRVdRUWlXd2tBQUFBQUFBQUF3QUFBQUFBQUFBQ0lBTlZWQUEuIiwic2NwIjoiQXBwLlJlYWQuQWxsIENhcGFjaXR5LlJlYWQuQWxsIENhcGFjaXR5LlJlYWRXcml0ZS5BbGwgQ29ubmVjdGlvbi5SZWFkLkFsbCBDb25uZWN0aW9uLlJlYWRXcml0ZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLlJlYWQuQWxsIERhc2hib2FyZC5SZWFkV3JpdGUuQWxsIERhdGFmbG93LlJlYWQuQWxsIERhdGFmbG93LlJlYWRXcml0ZS5BbGwgRGF0YXNldC5SZWFkLkFsbCBEYXRhc2V0LlJlYWRXcml0ZS5BbGwgR2F0ZXdheS5SZWFkLkFsbCBHYXRld2F5LlJlYWRXcml0ZS5BbGwgSXRlbS5FeGVjdXRlLkFsbCBJdGVtLkV4dGVybmFsRGF0YVNoYXJlLkFsbCBJdGVtLlJlYWRXcml0ZS5BbGwgSXRlbS5SZXNoYXJlLkFsbCBPbmVMYWtlLlJlYWQuQWxsIE9uZUxha2UuUmVhZFdyaXRlLkFsbCBQaXBlbGluZS5EZXBsb3kgUGlwZWxpbmUuUmVhZC5BbGwgUGlwZWxpbmUuUmVhZFdyaXRlLkFsbCBSZXBvcnQuUmVhZFdyaXRlLkFsbCBSZXBydC5SZWFkLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkV3JpdGUuQWxsIFRlbmFudC5SZWFkLkFsbCBUZW5hbnQuUmVhZFdyaXRlLkFsbCBVc2VyU3RhdGUuUmVhZFdyaXRlLkFsbCBXb3Jrc3BhY2UuR2l0Q29tbWl0LkFsbCBXb3Jrc3BhY2UuR2l0VXBkYXRlLkFsbCBXb3Jrc3BhY2UuUmVhZC5BbGwgV29ya3NwYWNlLlJlYWRXcml0ZS5BbGwiLCJzaWQiOiIwMDIwMTMwOS1kZDA4LTg3OGEtMzM4OC02NDZlNzA5NmI5MmQiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJwaWFUUG51TXVORVd2cmh3dUtqMGdWdGhqUEFVd1hHMkhNaW1TU3l4UmFrIiwidGlkIjoiYTI5NDU0ODYtMTYwNi00MmM1LWJmZWMtMTcwNDU5MDQyMjViIiwidW5pcXVlX25hbWUiOiJwb3dlcmJpQG5lcmd5aW5kaWEuY29tIiwidXBuIjoicG93ZXJiaUBuZXJneWluZGlhLmNvbSIsInV0aSI6Im96MkN3blJaOGt1dHNqRzM0MEcxQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiI4IDEifQ.Lou2_6Ala-iRNzgiw2EOv9kiwTNRm2tm3tjNuZbtRQcBhjmAacXTQcz8Z7i87j9zrVnRW-vlvsBpUOK7Pu7mq8YqeTcerX9ooZM3Uq9eSXV5y4CknojMRAs_yw2IHall1aei3eF2UrpGNU2EqqXiKPeYWjSKd-XfFUeK9tOcm-1OGRKMZCXEFOq0tHwMtjWOTvnAZEN1AdUJgTbii_xyLGB1k6R2mJgZBK60mE-OVMovhoWuks_P4JyZQRJBWe6glB3HsdGR_1TVm_9lEm9BLRrFfzAE_CA7qaQo8W-W2a7h20ZOWXjngje8Og9aelOfmj_wb2w5bnrx_aEGK6hLnw';

const questions = [
    {
        question: "What is the Total of Sales Return for the Period ?",
        answer: "30"
    },
    {
        question: "How much sales did the Northern branches make for the period ?", 
        answer: "40"
    }
];

const Answer = () => {
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [fieldValues, setFieldValues] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [uploadStatus, setUploadStatus] = useState('');
    const [importDetails, setImportDetails] = useState(null);
    const [measureCheckStatus, setMeasureCheckStatus] = useState('');
    const [relationshipStatus, setRelationshipStatus] = useState('');
    const [errors, setErrors] = useState([]);
    const [invalidAnswers, setInvalidAnswers] = useState([]);

    const handleFileDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            console.log('droppedFile', droppedFile);
            if (!droppedFile.name.toLowerCase().endsWith('.pbix')) {
                setErrorMessage("Please upload a valid .pbix file.");
                return;
            }
            setFile(droppedFile);
        }
    };

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setErrorMessage("");
        if (uploadedFile) {
            if (!uploadedFile.name.toLowerCase().endsWith('.pbix')) {
                setErrorMessage("Please upload a valid .pbix file.");
                return;
            }
            setFile(uploadedFile);
        }
    };

    const checkRelationship = async (datasetId) => {
        try {
            const response = await fetch(`https://api.powerbi.com/v1.0/myorg/datasets/${datasetId}/executeQueries`, {
                method: 'POST',
                headers: {
                    'Authorization': AUTH_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    queries: [
                        {
                            query: "EVALUATE ROW(\"RelationshipExists\", IF(COUNTROWS(INTERSECT(SELECTCOLUMNS(Orders, \"Region\", Orders[Region]), SELECTCOLUMNS(People, \"Region\", People[Region]))) > 0, \"YES\", \"NO\"))"
                        }
                    ],
                    serializerSettings: {
                        includeNulls: true
                    }
                })
            });

            if (response.ok) {
                const data = await response.json();
                const relationshipExists = data.results[0].tables[0].rows[0]["[RelationshipExists]"];
                setRelationshipStatus(relationshipExists === "YES" ? 
                    "Required relationship exists between Orders and People" : 
                    "Required relationship is missing between Orders and People");
                
                if (relationshipExists !== "YES") {
                    setErrors(prev => [...prev, {
                        mistake: "Missing Relationship",
                        description: "Required relationship is missing between Orders and People tables"
                    }]);
                    return false;
                }
                return true;
            } else {
                setRelationshipStatus('Error checking relationship');
                setErrors(prev => [...prev, {
                    mistake: "Relationship Check Error",
                    description: "Failed to verify relationships between tables"
                }]);
                return false;
            }
        } catch (error) {
            console.error('Error checking relationship:', error);
            setRelationshipStatus(`Error checking relationship: ${error.message}`);
            setErrors(prev => [...prev, {
                mistake: "Relationship Check Error",
                description: error.message
            }]);
            return false;
        }
    };

    const checkMeasures = async (datasetId) => {
        try {
            const response = await fetch(`https://api.powerbi.com/v1.0/myorg/datasets/${datasetId}/executeQueries`, {
                method: 'POST',
                headers: {
                    'Authorization': AUTH_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    queries: [
                        {
                            query: "EVALUATE ADDCOLUMNS(Orders, \"Sales Return\", [Sales Return], \"Sales Ret Rate\", [Sales Ret Rate])"
                        }
                    ],
                    serializerSettings: {
                        includeNulls: true
                    }
                })
            });

            if (response.ok) {
                setMeasureCheckStatus('Required measures exist in the dataset');
                return true;
            } else {
                setMeasureCheckStatus('Required measures are missing in the dataset');
                setErrors(prev => [...prev, {
                    mistake: "Missing Measures",
                    description: "Required measures 'Sales Return' or 'Sales Ret Rate' are missing in the dataset"
                }]);
                return false;
            }
        } catch (error) {
            console.error('Error checking measures:', error);
            setMeasureCheckStatus(`Error checking measures: ${error.message}`);
            setErrors(prev => [...prev, {
                mistake: "Measure Check Error",
                description: error.message
            }]);
            return false;
        }
    };

    const getImportDetails = async (importId) => {
        try {
            const response = await fetch(`https://api.powerbi.com/v1.0/myorg/imports/${importId}`, {
                method: 'GET',
                headers: {
                    'Authorization': AUTH_TOKEN
                }
            });

            if (response.ok) {
                const details = await response.json();
                setImportDetails(details);
                setErrors([]); // Clear previous errors
                
                if (details.datasets && details.datasets.length > 0) {
                    console.log('Dataset ID:', details.datasets[0].id);
                    
                    // Check measures and relationships
                    const measuresExist = await checkMeasures(details.datasets[0].id);
                    const relationshipExists = await checkRelationship(details.datasets[0].id);
                    
                    // Only show success modal if both checks pass and answers are correct
                    if (measuresExist && relationshipExists && invalidAnswers.length === 0) {
                        setShowModal(true);
                    }
                }
                if (details.reports && details.reports.length > 0) {
                    console.log('Report1 ID:', details.reports[0].id);
                }
                return details;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to get import details');
            }
        } catch (error) {
            console.error('Error getting import details:', error);
            throw error;
        }
    };

    const validateAnswers = () => {
        const invalid = [];
        questions.forEach((question, index) => {
            if (!fieldValues[index] || fieldValues[index].trim() === '') {
                invalid.push(index);
            } else if (fieldValues[index] !== question.answer) {
                invalid.push(index);
            }
        });
        setInvalidAnswers(invalid);
        return invalid.length === 0;
    };

    const handleValidateButton = async () => {
        // Check for empty input fields first
        const emptyFields = questions.some((_, index) => !fieldValues[index] || fieldValues[index].trim() === '');
        if (emptyFields) {
            setErrorMessage("Please fill input field values");
            return;
        }

        if (!file) {
            setErrorMessage("Please upload a Power BI file.");
            return;
        }

        // Validate answers
        const answersValid = validateAnswers();
        if (!answersValid) {
            setErrorMessage("Some answers are incorrect. Please check highlighted fields.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        const datasetDisplayName = file.name;
        const url = `https://api.powerbi.com/v1.0/myorg/imports?datasetDisplayName=${encodeURIComponent(datasetDisplayName)}`;

        try {
            setUploadStatus('Uploading...');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': AUTH_TOKEN
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                setUploadStatus(`Upload successful! Import ID: ${data.id}`);
                
                setUploadStatus('Processing the Power BI file...');
                setTimeout(async () => {
                    const details = await getImportDetails(data.id);
                    setUploadStatus('Processing complete');
                }, 5000);
            } else {
                const errorData = await response.json();
                setErrorMessage(`Upload failed: ${errorData.error?.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setErrorMessage(`Upload failed: ${error.message}`);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFile(null);
        setFieldValues({});
        setErrorMessage("");
        setUploadStatus("");
        setImportDetails(null);
        setMeasureCheckStatus("");
        setRelationshipStatus("");
        setErrors([]);
        setInvalidAnswers([]);
    };

    const handleInputChange = (index, value) => {
        setFieldValues((prevValues) => ({
            ...prevValues,
            [index]: value,
        }));
        setInvalidAnswers(prev => prev.filter(i => i !== index));
        setErrorMessage(""); // Clear error message when user starts typing
    };

    return (
        <div>
            <div className="container answer-block">
                <div className="row mb-4" >
                    {questions.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className="col-md-6" style={{ textAlign: "left", marginTop: index > 0 ? "20px" : "0" }}>
                                <label className="form-label qn-label">{item.question}</label>
                            </div>
                            <div className="col-md-6" style={{ textAlign: "right", marginTop: index > 0 ? "20px" : "0" }}>
                                <input
                                    className="input-field"
                                    placeholder="Enter the Value"
                                    value={fieldValues[index] || ""}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    style={{
                                        backgroundColor: invalidAnswers.includes(index) ? '#B52556' : 'white',
                                        color: invalidAnswers.includes(index) ? 'white' : 'black'
                                    }}
                                />
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                {/* Drag-and-Drop Section */}
                <div className="upload-area text-center">
                    <div
                        className="drag-drop-area rounded text-center p-4 pb-5 pt-4"
                        onDrop={handleFileDrop}
                        onDragOver={(e) => e.preventDefault()}
                        style={{ backgroundColor: errorMessage ? '#FCE8F1' : (file ? '#F4FCF6' : 'white') }}
                    >
                        <div className="upload-icon mb-1">
                            <i className={`bi bi-cloud-arrow-up-fill text-4xl ${file ? 'text-success' : 'text-primary'}`}></i>
                        </div>

                        {/* Uploaded File Name */}
                        {file && (
                            <div>
                                <div className="replace-file" onClick={() => document.getElementById('file-upload').click()}>Replace file</div>
                                <div className="file-name" style={{ display: "flex", alignItems: "center", borderBottom: file ? "6px solid green" : "none" }}>
                                    <i className="bi bi-file-earmark" style={{ padding: "5px", "paddingRight": "10px" }}></i>
                                    <div style={{ textAlign: "left", marginLeft: "10px" }}>
                                        <span>{file.name}</span> <br />
                                        <span style={{ color: "grey", fontWeight: "lighter" }}>{(file.size / 1024).toFixed(2)} KB</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <input
                            type="file"
                            id="file-upload"
                            onChange={handleFileUpload}
                            accept=".pbix"
                            hidden
                        />
                        <div>
                            <p className="mb-1" style={{ fontSize: "19px" }}>
                                Drag your Power BI file or{" "}
                                <label htmlFor="file-upload" className="text-primary cursor-pointer underline" style={{ fontWeight: "bolder" }}>
                                    browse
                                </label>
                            </p>
                            <div className="text-muted">Supported file: .pbix</div>
                        </div>
                    </div>
                </div>
                <div className="row error-area">
                    {uploadStatus && <div>{uploadStatus}</div>}
                </div>

                <div className="row error-area">
                    {errorMessage && <div>{errorMessage}</div>}
                    {errors.length > 0 && (
                        <Table bordered className="mt-3 rounded" style={{ borderRadius: "10px", overflow: "hidden", marginBottom: "200px" }}>
                            <thead style={{ backgroundColor: "#808080", color: "black" }}>
                                <tr>
                                    <th style={{ padding: "10px" }}>Mistakes</th>
                                    <th style={{ padding: "10px" }}>Descriptions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {errors.map((error, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: "10px" }}>{error.mistake}</td>
                                        <td style={{ padding: "10px" }}>{error.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </div>

            {/* Bottom Section with Validate Button */}
            <div className="bottom-section" style={{ backgroundColor: errorMessage ? '#FCE8F1' : '#fff' }}>
                <div className="errors-found">
                    {errorMessage && (
                        <div>
                            <img src={require('./error.png')} alt="Warning" style={{ width: "30px", marginRight: "13px" }} />
                            <span>Errors found!</span>
                        </div>
                    )}
                </div>
                <div className="col text-right">
                    <button
                        className="validate-btn"
                        onClick={handleValidateButton}
                    >
                        {errorMessage ? "Retry" : "Validate"}
                    </button>
                </div>
            </div>

            {/* Success Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body style={{ background: "linear-gradient(to bottom, #e0f7fa 0%, #fff 100%)" }}>
                    <div className="text-center" style={{ margin: "20px 20px", fontSize: "21px" }}>
                        <img src={require('./degree.png')} alt="Success" style={{ width: "250px", marginBottom: "20px" }} />
                        <p style={{ fontWeight: "bold", fontSize: "30px" }}>Congratulations!</p>
                        <p>You have completed the task successfully.</p>
                        {/* {importDetails && (
                            <div className="import-details">
                                <h4>Import Details</h4>
                                <p>Import ID: {importDetails.id}</p>
                                <p>Status: {importDetails.importState}</p>
                                <p>Created: {new Date(importDetails.createdDateTime).toLocaleString()}</p>
                                <p>Updated: {new Date(importDetails.updatedDateTime).toLocaleString()}</p>
                                {measureCheckStatus && (
                                    <p>Measure Check: {measureCheckStatus}</p>
                                )}
                                {relationshipStatus && (
                                    <p>Relationship Check: {relationshipStatus}</p>
                                )}
                            </div>
                        )} */}
                        <Button className="done-btn mt-3 mb-3" onClick={handleCloseModal}>
                            Done
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Answer;
