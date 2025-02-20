import React, { useRef } from "react";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@mui/material";
import { FaDownload } from "react-icons/fa";
import profile from "../assets/images/icon.png"


const EmployeeIDCard = ({ employee }) => {
    const cardRef = useRef(null);

    const generateBarcode = (id) => {
        const canvas = document.createElement("canvas");
        JsBarcode(canvas, id, { format: "CODE128" });
        return canvas.toDataURL("image/png");
    };

    const downloadPDF = () => {
        html2canvas(cardRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 20, 20, 100, 60);
            pdf.save(`${employee.name}_ID_Card.pdf`);
        });
    };

    return (
        <div className="flex flex-row mt-5 mb-5 items-center gap-4">
            <div ref={cardRef} className="bg-white text-black w-96 shadow-md">
                <p className="bg-gray-800 px-4 text-center text-gray-300 font-bold py-2">Employee ID card</p>
                <div className="flex flex-row items-center mt-4 px-2 gap-4">
                    <div>
                        <img src={employee.image===undefined ? profile : employee.image} className="size-20 rounded-full"/>
                    </div>
                    <div>
                        <h3 className="font-medium px-4 text-sm">{employee.name}</h3>
                        <p className="font-medium px-4 text-sm">ID: {employee.id}</p>
                        <p className="font-medium px-4 text-sm">Department: {employee.department}</p>
                        <p className="font-medium mb-2 px-4 text-sm">Position: {employee.designation}</p>
                    </div>
                </div>
                
                <img src={generateBarcode(employee.id)} alt="Barcode" />
            </div>
            <div>
            <Button variant="contained" startIcon={<FaDownload/>} onClick={downloadPDF}>Download ID Card</Button>
            </div>
        </div>
    );
};

export default EmployeeIDCard;
