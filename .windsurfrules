# SMOOTHDEV AI ASSISTANT PROTOCOL & RULES

You are an AI coding assistant (Cursor, Claude, Copilot, Windsurf, ChatGPT, Antigravity, etc.) working on a SmoothDev team repository.
You MUST strictly obey the following deployment and branching protocol.

> **v1.1 — AI-Assisted Deployment Authorization:** Effective immediately, the AI assistant **MAY execute deployments to Staging or Production under explicit authorization from the responsible Gatekeeper** (Kevin / Mas Dayu). See Section 3 and `DEPLOYMENT_PROTOCOL.md` Section 5.

## 1. Branching & Workflow Rules
- **DEFAULT BRANCH FOR DEVELOPMENT / EXPERIMENTS:** Always work on branch `explore`.
- **NEVER** push, commit, or merge directly to branch `dev` or branch `main` — **EXCEPT** as an authorized deployment execution explicitly permitted by the responsible Gatekeeper (Section 3).

## 2. Gatekeeper Roles & Responsibilities
- **`explore` Branch:** Managed by Pak Yahya & Staf for vibe coding & feature implementation on local machines.
- **`dev` Branch (Staging - VM Kantor HKU via Proxmox):** Strictly guarded by Gatekeeper **Kevin**. Only Kevin may approve changes from `explore` into `dev`.
- **`main` Branch (Production - VPS Contabo):** Strictly guarded by Gatekeeper **Mas Dayu**. Only Mas Dayu may approve changes from `dev` into `main`.

## 3. AI-Assisted Deployment — Authorization Rules
The AI assistant **MAY execute deployment operations** (git merge/push to `dev`/`main`, build, database migration, PM2 reload/restart, SSH/SFTP access, health checks) **ONLY with explicit authorization from the responsible Gatekeeper**:

| Target Environment | Authorization MUST come from |
| :--- | :--- |
| **Staging** — VM Kantor HKU (branch `dev`) | **Kevin** (Gatekeeper 1) |
| **Production** — VPS Contabo (branch `main`) | **Mas Dayu** (Gatekeeper 2) |

Mandatory conditions:
1. **Explicit & Scoped** — Authorization must be stated directly by Kevin or Mas Dayu (e.g., within the working session), naming the project, target environment, and scope of the action. Authorization is **per deployment action**; blanket or standing permission is NOT valid.
2. **Ambiguous → Ask Again** — If the source of authorization, target environment, or scope is unclear, the AI MUST stop and ask for confirmation before executing anything.
3. **Gatekeeper owns the decision, AI executes** — The Three-Tier Gatekeeping flow (`explore` → `dev` → `main`) still applies. The AI acts only as the delegated executor, never as the release decision-maker.
4. **Log & Verify (mandatory)** — Every AI-executed deployment MUST be logged (who authorized it, when, what was deployed, result) and followed by a health check / smoke test. Report results back to the authorizing Gatekeeper. If deployment fails: roll back to the last known-good state, then report.
5. **Credentials Hygiene** — Credentials must only be provided via environment variables or local-only files that are never committed. Writing credentials inside the repository is strictly forbidden.

## 4. Instructions to AI Assistant
- When the user finishes developing a feature or fixing a bug, instruct them to:
  1. Commit and push to branch `explore`.
  2. Contact **Kevin** to request review and staging deployment to VM Kantor.
- If the user asks for a deployment **without** authorization from Kevin or Mas Dayu: politely explain the SmoothDev Three-Tier Gatekeeping Protocol and guide them to push to `explore` and request permission first.
- If **Kevin or Mas Dayu explicitly authorizes** a deployment: execute it following `DEPLOYMENT_PROTOCOL.md` Section 5, then log and verify as per Section 3.
