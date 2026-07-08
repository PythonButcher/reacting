import React, { useState, useRef } from "react";
import axios from "axios";
import { FaTrash, FaCloudUploadAlt, FaLink, FaSpinner } from "react-icons/fa";
import "./DataInventoryPanel.css";

const DataInventoryPanel = ({ assets, isLoading, onRefresh }) => {

    // STATE & REFS
    // ==========================================
    const [apiName, setApiName] = useState("");
    const [apiUrl, setApiUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const fileInputRef = useRef(null);


    // HANDLERS
    // ==========================================
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://127.0.0.1:8000/api/inventory/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            onRefresh(); // Trigger parent to reload the list of assets
        } catch (err) {
            console.error("UPLOAD_FAILED:", err);
            alert("Failed to upload dataset file.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = ""; // Clear the input
        }
    };

    const handleRegisterApi = async (e) => {
        e.preventDefault(); // Prevent page reload
        if (!apiName || !apiUrl) return;

        setIsRegistering(true);
        try {
            await axios.post("http://127.0.0.1:8000/api/inventory/register-api", {
                name: apiName,
                url: apiUrl,
            });
            // Clear the form fields upon success
            setApiName("");
            setApiUrl("");
            onRefresh();
        } catch (err) {
            console.error("REGISTER_API_FAILED:", err);
            alert("Failed to register API source.");
        } finally {
            setIsRegistering(false);
        }
    };

    const handleDeleteAsset = async (assetId) => {
        if (!window.confirm("Are you sure you want to purge this data asset?")) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/inventory/${assetId}`);
            onRefresh();
        } catch (err) {
            console.error("DELETE_FAILED:", err);
            alert("Failed to delete asset.");
        }
    };


    // ==========================================

    return (
        <div className="inventory-panel-container">
            {/* SECTION A: Ingestion Controls */}
            <div className="journal-panel space-y-4">
                <span className="section-label">DATA_INGESTION // LOCAL_FILE</span>
                <div
                    className="inventory-dropzone"
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    style={{ pointerEvents: isUploading ? "none" : "auto", opacity: isUploading ? 0.7 : 1 }}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".csv,.json"
                        className="hidden"
                    />
                    <div className="flex flex-col items-center gap-2">
                        {isUploading ? (
                            <FaSpinner className="animate-spin text-xl text-accent-secondary" />
                        ) : (
                            <FaCloudUploadAlt className="text-xl text-accent-primary" />
                        )}
                        <span className="text-[10px] tracking-wider font-bold">
                            {isUploading ? "UPLOADING_DATASET..." : "BROWSE_CSV_OR_JSON_DATASET"}
                        </span>
                    </div>
                </div>

                <div className="border-t border-border/20 my-2" />

                <span className="section-label">DATA_INGESTION // REMOTE_API</span>
                <form onSubmit={handleRegisterApi} className="space-y-3">
                    <div className="inventory-form-group">
                        <label htmlFor="api-name">Endpoint Label</label>
                        <input
                            id="api-name"
                            type="text"
                            placeholder="e.g. CORE_TELEMETRY"
                            className="journal-select text-xs w-full"
                            value={apiName}
                            onChange={(e) => setApiName(e.target.value)}
                            disabled={isRegistering}
                        />
                    </div>
                    <div className="inventory-form-group">
                        <label htmlFor="api-url">REST Endpoint URL</label>
                        <input
                            id="api-url"
                            type="url"
                            placeholder="https://api.example.com/data"
                            className="journal-select text-xs w-full"
                            value={apiUrl}
                            onChange={(e) => setApiUrl(e.target.value)}
                            disabled={isRegistering}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isRegistering}
                        className="journal-button w-full text-accent-primary font-bold text-xs flex justify-center items-center gap-2"
                    >
                        {isRegistering ? (
                            <FaSpinner className="animate-spin text-accent-primary" />
                        ) : (
                            <FaLink />
                        )}
                        {isRegistering ? "REGISTERING..." : "REGISTER_API_SOURCE"}
                    </button>
                </form>
            </div>

            {/* SECTION B: Inventory Registry */}
            <div className="journal-panel flex-1">
                <div className="flex justify-between items-center mb-3">
                    <span className="section-label">INVENTORY_REGISTRY</span>
                    <span className="text-[9px] font-mono text-accent-secondary">
                        {isLoading ? "REFRESHING..." : `TOTAL: ${assets?.length || 0}`}
                    </span>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-2 text-text-dim text-xs">
                        <FaSpinner className="animate-spin text-accent-secondary" />
                        <span>RETRIEVING_VAULT_REGISTRY...</span>
                    </div>
                ) : !assets || assets.length === 0 ? (
                    <div className="text-center py-12 text-text-dim text-xs border border-dashed border-border/10 rounded-sm">
                        NO_ASSETS_REGISTERED
                    </div>
                ) : (
                    <div className="inventory-asset-list">
                        {assets.map((asset) => (
                            <div key={asset.id} className="inventory-asset-card">
                                <div className="inventory-asset-header">
                                    <span className="inventory-asset-title" title={asset.name}>
                                        {asset.type === "api" && (
                                            <span className="api-connection-indicator api-online" />
                                        )}
                                        {asset.name}
                                    </span>
                                    <span className="inventory-asset-badge">
                                        {asset.format}
                                    </span>
                                </div>
                                <div className="inventory-asset-stats">
                                    <div>
                                        <span className="inventory-stat-label">SIZE:</span>{" "}
                                        {asset.size_bytes ? (asset.size_bytes / 1024).toFixed(2) : 0} KB
                                    </div>
                                    <div>
                                        <span className="inventory-stat-label">ROWS:</span>{" "}
                                        {asset.row_count}
                                    </div>
                                    <div>
                                        <span className="inventory-stat-label">COLS:</span>{" "}
                                        {asset.columns?.length || 0}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/10">
                                    <span className="text-[8px] text-text-dim">
                                        REG: {new Date(asset.registered_at).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => handleDeleteAsset(asset.id)}
                                        className="text-[9px] text-accent-primary hover:underline cursor-pointer flex items-center gap-1"
                                        title="Purge from vault"
                                    >
                                        <FaTrash /> PURGE
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default DataInventoryPanel;  
