import os
from collections import defaultdict


def scan_project_stats(root_path: str):
    """
    Collects general project statistics from a filesystem path.

    This function performs a single pass through the directory tree
    and extracts structural statistics useful for dashboards.
    """

    total_files = 0
    total_dirs = 0
    total_size = 0

    # Track file extensions (.py, .js, etc)
    file_types = defaultdict(int)

    # Track largest files
    largest_files = []

    # Track directory depth
    max_depth = 0

    # Ignore heavy directories
    ignored = {
    "node_modules",
    ".git",
    "__pycache__",
    ".venv",
    "dist",
    "build",
    ".next",
    ".cache",
    ".json"
}

    for root, dirs, files in os.walk(root_path):

        # Remove ignored directories from traversal
        dirs[:] = [d for d in dirs if d not in ignored]

        total_dirs += len(dirs)

        # Calculate depth relative to root
        rel_path = os.path.relpath(root, root_path)
        depth = 0 if rel_path == "." else rel_path.count(os.sep) + 1
        max_depth = max(max_depth, depth)

        for file in files:

            total_files += 1

            file_path = os.path.join(root, file)

            try:
                size = os.path.getsize(file_path)
                total_size += size

                # Track extension
                _, ext = os.path.splitext(file)
                ext = ext.lower() if ext else "no_ext"
                file_types[ext] += 1

                # Track largest files
                largest_files.append((size, file_path))

            except Exception:
                continue

    # Keep only top 10 largest files
    largest_files.sort(reverse=True)
    largest_files = largest_files[:10]

    largest_files_formatted = [
        {
            "path": os.path.relpath(path, root_path),
            "size_bytes": size
        }
        for size, path in largest_files
    ]

    avg_file_size = total_size / total_files if total_files else 0

    return {
        "total_files": total_files,
        "total_directories": total_dirs,
        "total_size_bytes": total_size,
        "average_file_size": avg_file_size,
        "max_directory_depth": max_depth,
        "file_type_distribution": dict(file_types),
        "largest_files": largest_files_formatted
    }