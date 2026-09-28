Design a high-fidelity desktop web application prototype for an integrated digital forensics and data sanitization platform called **“ForenSecure”**.

The application combines three major capabilities:

1. Secure Drive Eraser
2. Secure File & Folder Eraser
3. Advanced File Carving & Recovery

The design should look like a professional cybersecurity and digital-forensics tool used by security professionals, forensic investigators, organizations, and system administrators.

### Overall Design

Create a modern, professional cybersecurity dashboard.

Use:

* Dark navy/charcoal sidebar
* White or very light gray main content area
* Blue as the primary action/accent color
* Green for successful operations
* Orange/yellow for warnings
* Red for critical/dangerous operations
* Clean modern typography
* Rounded cards with subtle shadows
* Professional icons
* Clear tables and status indicators
* Desktop-first responsive layout

Do NOT make it look like a generic banking dashboard or social media application.

Application name: **ForenSecure**
Tagline: **Secure Today. Recover Tomorrow.**

Use a shield/security icon as the application logo.

### Global Navigation

Create a fixed left sidebar containing:

* ForenSecure logo
* Dashboard
* Secure Drive Eraser
* File & Folder Eraser
* File Recovery
* Reports & Audit Logs
* Settings
* Help
* Logout

Highlight the currently selected page using a blue background/accent.

---

## SCREEN 1 — Welcome / Login

Create a professional login/welcome screen.

Left side:

* ForenSecure logo
* “Secure Today. Recover Tomorrow.”
* Short description:
  “Integrated Data Erasure and Digital Forensics Platform”

Right side:

* Login card
* Email / Username field
* Password field
* Remember me checkbox
* Sign In button
* Forgot password link

Below the login card show small security indicators:

* Secure Processing
* Audit Logging
* Forensic Integrity

---

## SCREEN 2 — Main Dashboard

Create the main ForenSecure dashboard.

Top:

* Page title: “Dashboard”
* Subtitle: “Overview of your data sanitization and forensic recovery operations”
* Search icon
* Notifications
* User profile

Create four large feature cards:

### Secure Drive Eraser

Icon: storage drive
Text: “Securely sanitize complete storage devices”
Button/arrow: “Open”

### File & Folder Eraser

Icon: folder/trash
Text: “Securely delete selected files and folders”
Button/arrow: “Open”

### Advanced File Recovery

Icon: search/magnifying glass
Text: “Recover deleted files from damaged or formatted media”
Button/arrow: “Open”

### Reports & Audit Logs

Icon: document/report
Text: “View operations and generate forensic reports”
Button/arrow: “Open”

Below these cards create:

### Storage Overview

Show:

* Connected Devices
* Total Storage
* Devices Ready
* Last Operation

Use compact statistics cards.

### Recent Operations

Create a table with:

Date & Time | Operation | Device/File | Status | Details

Example rows:

* Drive Erasure | USB Drive (E:) | Completed
* File Recovery | External HDD | Completed
* File Erasure | Confidential_Files | Completed
* Deep Scan | SSD (D:) | Completed

Use green “Completed” status badges.

---

# SCREEN 3 — Secure Drive Eraser

Create a dedicated Secure Drive Eraser page.

Header:
“Secure Drive Eraser”
Subtitle:
“Securely sanitize an entire storage device and verify the result.”

### Step 1 — Select Device

Create a device table:

Device Name | Type | Capacity | Status | Select

Example:

* Local Disk (C:) | HDD | 500 GB | Ready
* New Volume (D:) | SSD | 256 GB | Ready
* USB Drive (E:) | USB | 32 GB | Ready
* SD Card (F:) | Removable | 64 GB | Ready

Allow one device to be selected.

### Step 2 — Erasure Method

Create radio-button options:

* Quick Erase
* NIST 800-88 Clear/Purge
* DoD 5220.22-M
* Custom Passes

Include a small information tooltip explaining that the selected method determines how sanitization is performed.

Add warning box:

“Warning: Secure erasure permanently destroys data. This operation cannot be undone.”

Bottom:

* Cancel
* Start Secure Erasure

---

# SCREEN 4 — Drive Erasure Progress

Create an active erasure progress screen.

Show:

“Secure Erasure in Progress”

Large circular progress indicator:
63%

Information panel:

* Device: USB Drive (E:)
* Capacity: 32 GB
* Method: Selected erasure method
* Current Pass: Pass 2 of 3
* Time Elapsed
* Estimated Time Remaining

Show horizontal progress bar.

Status:
“Writing sanitization data…”

Buttons:

* Cancel Operation

Make this screen visually communicate that the system is actively processing the storage device.

---

# SCREEN 5 — Erasure Verification / Success

Create a successful completion screen.

Large green check icon.

Title:
“Erasure Completed Successfully”

Show:

Device: USB Drive (E:)
Method: Selected Method
Total Time: 00:20:14
Verification: Completed
Status: Data successfully erased

Add a verification summary:

✓ Device processed
✓ Erasure completed
✓ Verification completed
✓ Audit log created

Buttons:

* View Verification Report
* Back to Dashboard

---

# SCREEN 6 — Secure File & Folder Eraser

Create the File & Folder Eraser page.

Header:
“File & Folder Eraser”
Subtitle:
“Securely remove selected files and folders.”

Create two tabs:

* Select Files / Folders
* Batch Erase

Left panel:
A Windows-style file tree:

This PC
Desktop
Documents
Downloads
Pictures
Videos

Allow checkboxes for files/folders.

Right panel:
“Selected Items”

Show example:

* Confidential_Documents
* Password_Backups
* Old_Project_Files

### Erasure Options

Checkboxes:

* Remove metadata where applicable
* Remove traces where applicable
* Verify erasure
* Create audit log

Bottom:
Red/danger button:
“Secure Delete”

Before deletion show a confirmation modal:

“Are you sure you want to permanently erase these selected files?”

Buttons:
Cancel
Confirm Secure Delete

---

# SCREEN 7 — File Recovery Setup

Create the Advanced File Recovery page.

Header:
“Advanced File Carving & Recovery”
Subtitle:
“Recover deleted files from formatted, damaged, or corrupted storage media.”

Create a three-step progress indicator:

1. Select Device
2. Scan
3. Preview & Recover

### Select Storage Device

Table:

Device | Type | Size | Status

Example:

* Local Disk (C:) | HDD | 500 GB | Ready
* External HDD | HDD | 1 TB | Ready
* USB Drive (E:) | USB | 32 GB | Ready

### Scan Options

Radio buttons:

* Quick Scan
* Deep Scan
* Raw File Carving

Checkbox:
“Recover fragmented files where possible”

File type filter dropdown:
“All File Types”

Primary button:
“Start Recovery Scan”

---

# SCREEN 8 — Recovery Scan Progress

Create a scan progress screen.

Title:
“Scanning Storage Device”

Show:

* Large circular progress indicator
* 72% complete
* Files discovered: 1,248
* Recoverable files: 937
* Scan sectors processed
* Elapsed time
* Estimated remaining time

Show categories being detected:

* Images
* Documents
* Videos
* Archives
* Audio
* Other

Add a live activity area showing:
“JPEG signature detected”
“PDF structure identified”
“Fragmented DOCX detected”

Button:
“Pause Scan”

---

# SCREEN 9 — Recovery Results

Create a professional forensic recovery results page.

Header:
“Scan Results”
Text:
“1,248 potential files identified”

Create filters:

* File Type
* Recovery Status
* Confidence
* Size
* Search

Create results table:

File Name | Type | Size | Recovery Status | Confidence | Select

Example:
photo001.jpg | JPG | 2.4 MB | Recoverable | High
document01.pdf | PDF | 1.1 MB | Recoverable | High
report.docx | DOCX | 856 KB | Recoverable | Medium
video.mp4 | MP4 | 25 MB | Fragmented | Medium
archive.zip | ZIP | 4.8 MB | Recoverable | High
data.xlsx | XLSX | 642 KB | Partial | Low

Use visual confidence indicators:
High / Medium / Low.

Allow users to select recovered files.

Bottom buttons:

* Preview
* Recover Selected

---

# SCREEN 10 — Recovered File Preview

Create a forensic file preview page.

Left side:
File information:

* Filename
* File type
* File size
* Original location if available
* Recovery method
* Recovery confidence
* Fragmentation status

Center:
Large file preview area.

For an image, show image preview.
For documents, show document preview.
For unsupported files, show metadata/hex preview.

Right side:
“Recovery Analysis”

Show:
✓ File signature valid
✓ File structure valid
✓ Metadata detected
⚠ Fragment detected
✓ Recoverable content identified

Show:
“Recovery Confidence: 87%”

Buttons:

* Recover File
* Back to Results

---

# SCREEN 11 — Reports & Audit Logs

Create a Reports and Audit Logs page.

Header:
“Reports & Audit Logs”

Create tabs:

* Operation Logs
* Recovery Reports
* Erasure Reports

Operation table:

Date & Time | Operation | Target | Status | Details

Example:
12 Sep 2026 10:21 | Drive Erasure | USB Drive (E:) | Success | View
11 Sep 2026 16:45 | File Recovery | External HDD | Success | View
11 Sep 2026 14:10 | File Erasure | Confidential Files | Success | View

Create a report preview panel.

Show:

* Case ID
* Operation
* Device
* Date
* Method
* Verification
* Results
* Evidence information

Primary button:
“Generate PDF Report”

Secondary button:
“Export Audit Log”

---

# SCREEN 12 — Settings

Create a Settings page.

Sections:

### General

* Application preferences
* Theme
* Language

### Security

* Authentication
* Session timeout
* Access control

### Forensic Settings

* Evidence handling preferences
* Hash verification
* Recovery output location

### Audit

* Enable audit logging
* Log retention
* Export settings

Use toggles and dropdowns.

---

# SCREEN 13 — Confirmation / Safety Modals

Create reusable modal components for dangerous operations.

### Secure Erasure Confirmation

Title:
“Permanent Data Destruction”

Message:
“This operation will permanently erase the selected storage device. Data may not be recoverable after completion.”

Show:
Device
Capacity
Erasure Method

Require checkbox:
“I understand that this operation is irreversible.”

Button:
“Proceed with Secure Erasure”

### File Deletion Confirmation

Similar confirmation modal for selected files/folders.

---

# DESIGN SYSTEM

Create reusable components for:

* Sidebar
* Top navigation
* Buttons
* Primary button
* Secondary button
* Danger button
* Cards
* Tables
* Tabs
* Dropdowns
* Checkboxes
* Radio buttons
* Progress bars
* Circular progress indicators
* Status badges
* Warning boxes
* Confirmation modals
* Toast notifications
* File type icons
* Device icons

Use consistent spacing, typography, iconography, and component states.

### Important UX Requirement

The application must clearly distinguish between:

**ERASURE OPERATIONS**
→ destructive and irreversible

and

**RECOVERY OPERATIONS**
→ forensic analysis and evidence preservation

The user should never accidentally start an erasure operation.

Use strong confirmation dialogs before destructive operations.

### Prototype Interactions

Make the prototype interactive.

Dashboard → Secure Drive Eraser

Secure Drive Eraser:
Select Device → Select Method → Start Erasure → Progress → Verification Success → Report

Dashboard → File & Folder Eraser

File & Folder Eraser:
Select Files → Configure Options → Confirmation → Erasing → Success → Audit Log

Dashboard → File Recovery

File Recovery:
Select Device → Scan Options → Start Scan → Scan Progress → Recovery Results → File Preview → Recover Selected

Dashboard → Reports

Reports → Operation Details → Generate Report

Use realistic transitions between screens.

### Visual Style

The final prototype should look like a **real enterprise cybersecurity/forensic product**, suitable for demonstrating to judges, professors, cybersecurity professionals, or government/law-enforcement stakeholders.

Prioritize:

* Professional appearance
* Clear workflow
* Trust and security
* Evidence integrity
* Easy navigation
* Data visualization
* Strong destructive-action warnings
* Forensic-style reporting

Do not overcrowd the interface. Keep the UI clean, structured, and presentation-ready.
