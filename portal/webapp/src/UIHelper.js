import React from "react";

export function toggleFieldValidHtml(valid, required) {
    if (!required)
        return (null);
    return valid ? (<span className="fas fa-check " style={{fontSize: 12, color: "#5cb85c"}}/>)
        : (<span className="text-danger">*</span>)
}