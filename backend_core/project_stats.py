import os
import time

def scan_workspace_health(root_path: str):
    """
    Scans workspace to estimate health based on number of files or other metrics.
    """
    total_files = 0
    score = 100
    for root, _, files in os.walk(root_path):
        if "node_modules" in root or ".git" in root:
            continue
        total_files += len(files)
        
    return {
        "score": score,
        "total_files": total_files,
        "status": "Healthy" if score > 75 else "Needs Attention"
    }

def scan_technical_debt(root_path: str):
    """
    Scans for 'TODO' or 'FIXME' comments to estimate technical debt.
    """
    todo_count = 0
    for root, _, files in os.walk(root_path):
        if "node_modules" in root or ".git" in root:
            continue
        for file in files:
            if file.endswith((".py", ".js", ".ts", ".tsx")):
                try:
                    with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                        content = f.read()
                        todo_count += content.upper().count("TODO")
                        todo_count += content.upper().count("FIXME")
                except Exception:
                    continue
    
    return {
        "todo_count": todo_count,
        "debt_level": "Low" if todo_count < 5 else "Medium" if todo_count < 15 else "High"
    }

def scan_recent_edits(root_path: str, max_items: int = 20, max_days: int = 7):
    """
    Scans for recently edited files.
    """
    recent_files = []
    now = time.time()
    for root, _, files in os.walk(root_path):
        if "node_modules" in root or ".git" in root:
            continue
        for file in files:
            file_path = os.path.join(root, file)
            try:
                mtime = os.path.getmtime(file_path)
                days_old = (now - mtime) / (24 * 3600)
                if days_old <= max_days:
                    # Provide relative path for nicer output
                    rel_path = os.path.relpath(file_path, root_path)
                    recent_files.append({"path": rel_path, "mtime": mtime})
            except Exception:
                continue
                
    recent_files.sort(key=lambda x: x["mtime"], reverse=True)
    return recent_files[:max_items]
