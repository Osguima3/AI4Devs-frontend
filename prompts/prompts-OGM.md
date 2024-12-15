## Herramienta: Github Copilot

@workspace Create a new (blank for now) page that will be shown when clicking on the "Ver proceso" button in #file:Positions.tsx. Create the new page with the same structure as the previous one.

Said page should have as context the data for the specific position from the following backend endpoints:

- GET /position/:id/interviewFlow
- GET /position/:id/candidates

Both are implemented in #file:positionService.ts

The visual components will be defined later.

---

## Herramienta: Lovable.dev

Create a kanban-style page for an ATS which will manage the state of candidates within an hiring process for a specific position. Use the picture as a reference.

- It must show the position name as the title, to give context. 
- To the left of the title there should be an arrow to allow users to move to the previous screen (menu).
- Position flows can have a dynamic number of steps. Show a "kanban" column for each step of the process, with a header that has the name of the step.
- Candidate cards should be drawn in one of the columns, depending on which step each candidate is currently at. These cards should show their name and their average score.
- The design should be responsive and be usable from mobile.

Some other notes:

- The menu leading to this page is already created, as is the header and footer. Create only the main content of this page.
- Use react and bootstrap for the visual components.

---

The mock data should have the following structure. Update the code acordingly:

### Steps:

`<contenido de GET /position/1/interviewFlow>`

### Candidates:

`<contenido de GET /position/1/candidates>`

---

<código de Lovable.dev añadido al proyecto>

---

## Herramienta: Github Copilot

The back button should lead back to the positions screen

---

Update #file:PositionProcess.tsx #file:KanbanBoard.tsx and #file:CandidateCard.tsx to have a similar style to #file:Positions.tsx

---

The score is not visible, the size of the divs is reduced to 0

---

The candidates should be draggable between columns. Doing so should do make a call to the following endpoint:

PUT /candidates/:id/stage

With the payload being:

```json
{ 
    "applicationId": "1", // id of the candidate's application
    "currentInterviewStep": "3" // id of the new step 
}
```