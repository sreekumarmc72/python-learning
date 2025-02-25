import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomView.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button, Table } from "react-bootstrap";
import PizZip from 'pizzip';
import { DOMParser } from '@xmldom/xmldom';

const Answer = ({ qn }) => {
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [fieldValues, setFieldValues] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [mismatchCells, setMismatchCells] = useState([]);
    const [unmatchedFields, setUnmatchedFields] = useState([]);
    const [mismatches, setMismatches] = useState([]);

    const validatorArr = [
        { "text": "INDEPENDENT AUDITOR’S REPORT", "bold": true, "italic": false, "underline": false, "color": "215E99" },
        { "text": "To the Members of TechNova Ltd.", "bold": true, "italic": false, "underline": false, "color": "124F1A" },
        { "text": "Report on the Audit of the Financial Statements", "bold": true, "italic": false, "underline": false, "color": "000000" },
        { "text": "Auditor’s Responsibility", "bold": true, "italic": false, "underline": false, "color": "000000" },
        { "text": "Key Audit Matters", "bold": true, "italic": false, "underline": false, "color": "000000" },
        { "text": "The key audit matters are as follows:", "bold": false, "italic": false, "underline": true, "color": "000000" },
        { "text": "Opinion", "bold": true, "italic": false, "underline": false, "color": "000000" }
    ];


    const handleFileDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            console.log('droppedFile', droppedFile);
            if (droppedFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                setErrorMessage("Please upload a valid .docx file.");
                return;
            }
            setFile(droppedFile);
        }
    };

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setErrorMessage("");
        setMismatchCells([]);
        setUnmatchedFields([]);
        setMismatches([]);
        if (uploadedFile) {
            if (uploadedFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                setErrorMessage("Please upload a valid .docx file.");
                return;
            }
            setFile(uploadedFile);
        }
    };

    const handleUploadButton = () => {
        if (file) {
            alert(`File "${file.name}" uploaded successfully!`);
        } else {
            alert("Please upload a file first!");
        }
    };

    const handleValidateButton = () => {

        console.log('validate button clicked');
        setErrorMessage("");
        setUnmatchedFields([]);

        if (!file) {
            setErrorMessage("Please upload a Word file first.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const zip = new PizZip(event.target.result);
                const xml = zip.file("word/document.xml").asText();
                const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

                const paragraphs = xmlDoc.getElementsByTagName("w:p");
                let extractedTexts = [];

                for (let p of paragraphs) {
                    const texts = p.getElementsByTagName('w:t');
                    let paragraphText = '';
                    let paragraphBold = false;
                    let paragraphItalic = false;
                    let paragraphUnderline = false;
                    let paragraphColor = '000000';

                    for (let t of texts) {
                        const run = t.parentNode;
                        const style = run.getElementsByTagName("w:rPr")[0];
                        paragraphText += t.textContent.replace(/\n/g, '');
                        if (style) {
                            if (style.getElementsByTagName("w:b")[0]) paragraphBold = true;
                            if (style.getElementsByTagName("w:i")[0]) paragraphItalic = true;
                            if (style.getElementsByTagName("w:u")[0]) paragraphUnderline = true;
                            const colorNode = style.getElementsByTagName("w:color")[0];
                            if (colorNode) paragraphColor = colorNode.getAttribute("w:val") || "000000";
                        }
                    }

                    extractedTexts.push({
                        text: paragraphText,
                        bold: paragraphBold,
                        italic: paragraphItalic,
                        underline: paragraphUnderline,
                        color: paragraphColor
                    });
                }
                console.log('extractedTexts: ', extractedTexts);
                validateDocument(extractedTexts);
            } catch (error) {
                if (error.message.includes("processing instruction at position 1 is an xml declaration which is only at the start of the document")) {
                    setErrorMessage("Document is empty. Please upload again!");
                } else {
                    setErrorMessage("Error parsing the document. Ensure it is a valid .docx file.");
                }

                console.error(error);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const validateDocument = (extractedTexts) => {
        let errors = [];

        console.log('validateDocument');

        validatorArr.forEach((validator) => {
            console.log('validator : ', validator);
            extractedTexts.forEach((item, index) => {
                console.log(`extractedTexts[${index}]:${item.text.trim()}`);
            });
            console.log('validator.text.trim():' + validator.text.trim());
            console.log('extractedTexts.find(item => item.text.trim() === validator.text.trim()) : ', extractedTexts.find(item => item.text.trim() == validator.text.trim()));
            const match = extractedTexts.find(item => item.text.trim() == validator.text.trim());
            if (!match) {
                errors.push({ content: validator.text, issue: "Text not found" });
            } else {
                console.log('match : ', match);

                if (match.bold !== validator.bold) errors.push({ content: validator.text, issue: "Font is not Bold" });
                if (match.italic !== validator.italic) errors.push({ content: validator.text, issue: "Font is not Italic" });
                if (match.underline !== validator.underline) errors.push({ content: validator.text, issue: "Font is not Underlined" });
                if (match.color.toUpperCase() !== validator.color.toUpperCase()) errors.push({ content: validator.text, issue: "Font Color is Incorrect" });
            }
        });

        if (errors.length === 0) {
            setErrorMessage("");
            setMismatches([]);
            setShowModal(true);
        } else {

            console.log('errors : ', errors);
            setMismatches(errors);
            setErrorMessage("Word validation : Shown input are invalid");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFile(null);
        setFieldValues({});
        setErrorMessage("");
        setMismatchCells([]);
        setUnmatchedFields([]);
    };

    const handleInputChange = (index, value) => {
        setFieldValues((prevValues) => ({
            ...prevValues,
            [index]: value,
        }));
    };

    return (
        <div>
            <div className="container answer-block">
                {/* {qn.fields.map((field, index) => ( */}
                <div className="row mb-4" >
                    <iframe src="https://1drv.ms/w/c/82c0dfa8b525c25f/IQRsXnxK5TFzR7MsEzDqzVYKASYKM1134PjvRWeshtyGEoM?em=2&amp;wdStartOn=1" width="1202" height="470" frameborder="0">This is an embedded <a target="_blank" href="https://office.com">Microsoft Office</a> document, powered by <a target="_blank" href="https://office.com/webapps">Office</a>.</iframe>
                </div>
                {/* ))} */}

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
                            hidden
                        />
                        <div>
                            <p className="mb-1" style={{ fontSize: "19px" }}>
                                Drag your word file or{" "}
                                <label htmlFor="file-upload" className="text-primary cursor-pointer underline" style={{ fontWeight: "bolder" }}>
                                    browse
                                </label>
                            </p>
                            <div className="text-muted">Supported file: .docx</div>
                        </div>
                    </div>

                    {/* Upload Button */}
                    {/* <button
                        className="upload-btn mt-5 mb-2"
                        onClick={handleUploadButton}
                    >
                        Upload
                    </button> */}
                </div>
                <div className="row error-area">
                    {errorMessage && <div >{errorMessage}</div>}
                    {mismatches.length > 0 && (
                        <Table bordered className="mt-3 rounded" style={{ borderRadius: "10px", overflow: "hidden", marginBottom: "200px" }}>
                            <tbody>
                                {mismatches.reduce((acc, error) => {
                                    const existingContent = acc.find(item => item.content === error.content);
                                    if (existingContent) {
                                        existingContent.issues.push(error.issue);
                                    } else {
                                        acc.push({ content: error.content, issues: [error.issue] });
                                    }
                                    return acc;
                                }, []).map((groupedError, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: "20px" }}>
                                            <div>
                                                <span style={{ fontSize: "15px", color: "grey" }}>Content :</span>
                                                <div className="" style={{ fontSize: "15px" }}>{groupedError.content}</div>
                                            </div>
                                            <div style={{ fontSize: "15px" }}>
                                                <span style={{ fontSize: "15px", color: "grey" }}>Errors Found :</span>
                                                {groupedError.issues.map((issue, issueIndex) => (
                                                    <div key={issueIndex} style={{ color: "#AB0F3E", fontSize: "15px", paddingLeft: "50px" }}>{issue}</div>
                                                ))}
                                            </div>
                                        </td>
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
