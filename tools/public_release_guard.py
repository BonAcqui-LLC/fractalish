from __future__ import annotations

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]

TEXT_EXTENSIONS = {
    ".c",
    ".cc",
    ".cff",
    ".css",
    ".csv",
    ".html",
    ".js",
    ".json",
    ".md",
    ".py",
    ".svg",
    ".txt",
    ".xml",
    ".yaml",
    ".yml",
}

MOJIBAKE_PATTERNS = ("Ã", "â€", "â€”", "Â·")
TEXT_PATTERNS = {
    "local_windows_path": ("C:\\Users\\", "Local Windows paths must not ship publicly."),
    "local_windows_path_alt": ("C:/Users/", "Local Windows paths must not ship publicly."),
    "local_username": ("moop", "Local usernames must not ship publicly."),
    "aligned_builders": ("aligned builders", "Replace vague audience language with concrete reviewer/developer wording."),
}


def should_scan_text(path: Path) -> bool:
    return path.suffix.lower() in TEXT_EXTENSIONS


def main() -> int:
    failures: list[str] = []

    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        rel = path.relative_to(ROOT).as_posix()

        if rel == "tools/public_release_guard.py":
            continue

        if rel == "CITATION.cff":
            text = path.read_text(encoding="utf-8")
            if "given-names:" in text or "family-names:" in text:
                failures.append("CITATION.cff must use entity-level attribution only.")

        if rel == "fractalish-ai_v4.zip":
            failures.append("fractalish-ai_v4.zip must not be present in the public tree.")

        if rel.startswith("assets/docs/") and path.suffix.lower() == ".docx":
            failures.append(f"{rel} is a DOCX file in the public tree and should be withheld or sanitized.")

        if should_scan_text(path):
            try:
                text = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                failures.append(f"{rel} is not valid UTF-8.")
                continue

            for _, (needle, message) in TEXT_PATTERNS.items():
                if needle in text:
                    failures.append(f"{rel}: {message}")

            for pattern in MOJIBAKE_PATTERNS:
                if pattern in text:
                    failures.append(f"{rel}: mojibake pattern '{pattern}' detected.")

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1

    print("Public release guard passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
