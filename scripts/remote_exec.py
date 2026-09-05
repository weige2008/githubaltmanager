#!/usr/bin/env python3
"""Run a command on the GAM server via SSH (password auth, no interactive prompt).

Usage:
    GAM_SSH_HOST=... GAM_SSH_USER=... GAM_SSH_PW=... python scripts/remote_exec.py "command1" "command2" ...

Credentials are read from environment variables only — never hardcode them here.
This file is safe to commit; the secret lives in env/HANDOFF.md (untracked).
"""
import os
import sys

import paramiko


def main() -> int:
    host = os.environ.get("GAM_SSH_HOST")
    user = os.environ.get("GAM_SSH_USER")
    pw = os.environ.get("GAM_SSH_PW")
    if not (host and user and pw):
        print("error: set GAM_SSH_HOST / GAM_SSH_USER / GAM_SSH_PW", file=sys.stderr)
        return 2

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(host, port=22, username=user, password=pw, timeout=20)

    rc = 0
    for cmd in sys.argv[1:]:
        print(f"$ {cmd}")
        _, stdout, stderr = client.exec_command(cmd, timeout=120)
        out = stdout.read().decode(errors="replace").strip()
        err = stderr.read().decode(errors="replace").strip()
        code = stdout.channel.recv_exit_status()
        if out:
            print(out)
        if err:
            print(f"[stderr] {err}")
        print(f"[exit {code}]")
        rc = rc or code

    client.close()
    return rc


if __name__ == "__main__":
    sys.exit(main())
