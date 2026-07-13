import { useRef, useState } from "react";
import "./UploadBox.css";

function UploadBox({
  label,
  required = false,
  accept = "image/*",
  disabled = false,
  error = "",
  onChange,
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    if (file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }

    if (onChange) {
      onChange(file);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current.click();
    }
  };

  return (
    <div className="upload-box">
      {label && (
        <label className="upload-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div
        className={`upload-container ${
          disabled ? "upload-disabled" : ""
        }`}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="upload-input"
          onChange={handleFileChange}
          disabled={disabled}
        />

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="upload-preview"
          />
        ) : (
          <div className="upload-content">
            <div className="upload-icon">📁</div>

            <div className="upload-title">
              Click to Upload
            </div>

            <div className="upload-subtitle">
              PNG, JPG, JPEG or PDF
            </div>

            {fileName && (
              <div className="upload-file-name">
                {fileName}
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="upload-error">
          {error}
        </div>
      )}
    </div>
  );
}

export default UploadBox;