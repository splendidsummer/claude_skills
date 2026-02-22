import os

import requests


def get_repo_info() -> dict:
    token = os.getenv("GITHUB_TOKEN")
    owner = os.getenv("GITHUB_REPO_OWNER")
    repo = os.getenv("GITHUB_REPO_NAME")

    if not token or not owner or not repo:
        raise RuntimeError(
            "Missing GITHUB_TOKEN / GITHUB_REPO_OWNER / GITHUB_REPO_NAME"
        )

    url = f"https://api.github.com/repos/{owner}/{repo}"
    headers = {"Authorization": f"token {token}"}

    resp = requests.get(url, headers=headers, timeout=10)
    resp.raise_for_status()
    return resp.json()
