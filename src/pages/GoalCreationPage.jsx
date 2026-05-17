import { useMemo, useState } from "react";
import DataTable from "../components/DataTable";

const statusOptions = ["Not Started", "In Progress", "At Risk", "Completed"];

const initialForm = {
  title: "",
  target: "",
  weightage: "",
  status: "Not Started",
};

const statusTone = {
  draft: "border-slate-600/50 bg-slate-800/50 text-slate-300",
  submitted: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  approved: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  rejected: "border-rose-500/40 bg-rose-500/10 text-rose-200",
};

function nextGoalId(index) {
  return `EG-${String(index + 1).padStart(3, "0")}`;
}

function EmployeeGoalEditor({ goals, submissionStatus, setGoalWorkflow }) {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState({ type: "", text: "" });

  const totalWeightage = useMemo(
    () => goals.reduce((sum, goal) => sum + goal.weightage, 0),
    [goals],
  );

  const remainingWeightage = 100 - totalWeightage;
  const isLocked = submissionStatus === "approved";

  const updateForm = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const validateGoal = () => {
    if (goals.length >= 8) {
      return "You have reached the maximum of 8 goals for this cycle. Please edit existing goals before adding new ones.";
    }

    if (!form.title.trim()) {
      return "Goal title is required. Please provide a clear and specific goal title.";
    }

    if (!form.target.trim()) {
      return "Target is required. Please define an outcome that can be measured at quarter end.";
    }

    const weightage = Number(form.weightage);

    if (Number.isNaN(weightage) || form.weightage === "") {
      return "Weightage is required. Please enter a numeric percentage value.";
    }

    if (weightage < 10) {
      return "Each goal must carry a minimum weightage of 10%. Please revise the value.";
    }

    if (weightage > remainingWeightage) {
      return `This weightage exceeds the available allocation. Remaining allowable weightage is ${remainingWeightage}%.`;
    }

    return "";
  };

  const handleAddGoal = () => {
    if (isLocked) {
      setMessage({
        type: "error",
        text: "This goal plan has already been approved by your manager and is now locked for editing.",
      });
      return;
    }

    const validationError = validateGoal();

    if (validationError) {
      setMessage({ type: "error", text: validationError });
      return;
    }

    const newGoal = {
      id: nextGoalId(goals.length),
      title: form.title.trim(),
      target: form.target.trim(),
      weightage: Number(form.weightage),
      status: form.status,
      managerComment: "",
    };

    setGoalWorkflow((previous) => ({
      ...previous,
      submissionStatus: "draft",
      goals: [...previous.goals, newGoal],
    }));
    setForm(initialForm);
    setMessage({ type: "success", text: "Goal added successfully. Continue until total weightage reaches 100%." });
  };

  const handleSubmitForApproval = () => {
    if (isLocked) {
      setMessage({
        type: "error",
        text: "Approved goals are locked. Contact your manager if a formal revision is required.",
      });
      return;
    }

    if (goals.length === 0) {
      setMessage({ type: "error", text: "No goals found. Please add at least one goal before submitting for approval." });
      return;
    }

    if (totalWeightage !== 100) {
      setMessage({
        type: "error",
        text: `Submission blocked: total goal weightage must equal 100%. Current total is ${totalWeightage}%.`,
      });
      return;
    }

    setGoalWorkflow((previous) => ({
      ...previous,
      submissionStatus: "submitted",
    }));

    setMessage({
      type: "success",
      text: "Goals submitted for manager approval. You will be notified once review is completed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="panel p-5">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-white">Employee Goal Creation Workflow</h2>
          <span className={`rounded-md border px-3 py-1 text-xs font-medium uppercase tracking-wide ${statusTone[submissionStatus]}`}>
            {submissionStatus}
          </span>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
          <label className="text-sm text-slate-300">
            Goal Title
            <input
              disabled={isLocked}
              className="input mt-1 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.title}
              onChange={(event) => updateForm("title", event.target.value)}
              placeholder="Example: Improve onboarding conversion"
            />
          </label>

          <label className="text-sm text-slate-300">
            Target
            <input
              disabled={isLocked}
              className="input mt-1 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.target}
              onChange={(event) => updateForm("target", event.target.value)}
              placeholder="Example: Increase activation from 42% to 55%"
            />
          </label>

          <label className="text-sm text-slate-300">
            Weightage (%)
            <input
              disabled={isLocked}
              type="number"
              min="10"
              className="input mt-1 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.weightage}
              onChange={(event) => updateForm("weightage", event.target.value)}
              placeholder="Minimum 10"
            />
          </label>

          <label className="text-sm text-slate-300">
            Status
            <select
              disabled={isLocked}
              className="select mt-1 w-full disabled:cursor-not-allowed disabled:opacity-50"
              value={form.status}
              onChange={(event) => updateForm("status", event.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <button type="button" onClick={handleAddGoal} className="button-primary" disabled={isLocked}>
              Add Goal
            </button>
            <button type="button" onClick={handleSubmitForApproval} className="button-secondary" disabled={isLocked}>
              Submit for Approval
            </button>
            <p className="text-xs text-slate-400">
              Goals: {goals.length}/8 | Total Weightage: {totalWeightage}% | Remaining: {remainingWeightage}%
            </p>
          </div>
        </form>

        {message.text ? (
          <div
            className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
              message.type === "error"
                ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
                : "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
            }`}
          >
            {message.text}
          </div>
        ) : null}
      </div>

      <DataTable
        columns={["Goal ID", "Goal Title", "Target", "Weightage", "Status", "Manager Comment"]}
        rows={goals}
        renderCell={(goal) => (
          <>
            <td className="px-4 py-3 text-slate-100">{goal.id}</td>
            <td className="px-4 py-3 text-slate-200">{goal.title}</td>
            <td className="px-4 py-3 text-slate-300">{goal.target}</td>
            <td className="px-4 py-3 text-slate-300">{goal.weightage}%</td>
            <td className="px-4 py-3 text-slate-300">{goal.status}</td>
            <td className="px-4 py-3 text-slate-400">{goal.managerComment || "-"}</td>
          </>
        )}
      />

      {goals.length === 0 ? (
        <p className="text-sm text-slate-400">No goals added yet. Start by adding your first goal.</p>
      ) : null}
    </div>
  );
}

function ManagerApprovalPanel({ goals, submissionStatus, setGoalWorkflow }) {
  const [message, setMessage] = useState({ type: "", text: "" });

  const totalWeightage = useMemo(
    () => goals.reduce((sum, goal) => sum + Number(goal.weightage), 0),
    [goals],
  );

  const updateGoalField = (goalId, key, value) => {
    setGoalWorkflow((previous) => ({
      ...previous,
      goals: previous.goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              [key]: key === "weightage" ? Number(value) || 0 : value,
            }
          : goal,
      ),
    }));
  };

  const approve = () => {
    if (submissionStatus !== "submitted" && submissionStatus !== "rejected") {
      setMessage({ type: "error", text: "No pending submission is available for approval." });
      return;
    }

    if (goals.length === 0) {
      setMessage({ type: "error", text: "No employee goals were submitted for review." });
      return;
    }

    const invalidWeight = goals.find((goal) => goal.weightage < 10);
    if (invalidWeight) {
      setMessage({
        type: "error",
        text: `Approval blocked: ${invalidWeight.id} has weightage below 10%. Please adjust before approving.`,
      });
      return;
    }

    if (totalWeightage !== 100) {
      setMessage({
        type: "error",
        text: `Approval blocked: total weightage must equal 100%. Current total is ${totalWeightage}%.`,
      });
      return;
    }

    setGoalWorkflow((previous) => ({ ...previous, submissionStatus: "approved" }));
    setMessage({ type: "success", text: "Goals approved successfully. Employee editing is now locked." });
  };

  const reject = () => {
    if (submissionStatus !== "submitted") {
      setMessage({ type: "error", text: "Only submitted goal plans can be rejected." });
      return;
    }

    setGoalWorkflow((previous) => ({ ...previous, submissionStatus: "rejected" }));
    setMessage({ type: "success", text: "Goals rejected. Employee can revise and resubmit the plan." });
  };

  const locked = submissionStatus === "approved";

  return (
    <div className="space-y-5">
      <div className="panel p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Manager Approval Workflow</h2>
          <span className={`rounded-md border px-3 py-1 text-xs font-medium uppercase tracking-wide ${statusTone[submissionStatus]}`}>
            {submissionStatus}
          </span>
        </div>
        <p className="text-sm text-slate-400">
          Review submitted employee goals, update target and weightage inline, add comments, and complete approval.
        </p>
      </div>

      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700/70 text-sm">
            <thead className="bg-slate-900/80">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-400">Goal ID</th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">Title</th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">Target (Inline Edit)</th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">Weightage % (Inline Edit)</th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">Status</th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">Manager Comment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {goals.map((goal) => (
                <tr key={goal.id} className="hover:bg-slate-800/45">
                  <td className="px-4 py-3 text-slate-100">{goal.id}</td>
                  <td className="px-4 py-3 text-slate-200">{goal.title}</td>
                  <td className="px-4 py-3">
                    <input
                      disabled={locked}
                      className="input"
                      value={goal.target}
                      onChange={(event) => updateGoalField(goal.id, "target", event.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      disabled={locked}
                      type="number"
                      min="10"
                      className="input"
                      value={goal.weightage}
                      onChange={(event) => updateGoalField(goal.id, "weightage", event.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3 text-slate-300">{goal.status}</td>
                  <td className="px-4 py-3">
                    <textarea
                      disabled={locked}
                      className="input min-h-16"
                      value={goal.managerComment || ""}
                      onChange={(event) => updateGoalField(goal.id, "managerComment", event.target.value)}
                      placeholder="Add review comments"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {goals.length === 0 ? <p className="text-sm text-slate-400">No submitted employee goals available to review.</p> : null}

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="button-primary" onClick={approve} disabled={locked}>
          Approve
        </button>
        <button type="button" className="button-secondary" onClick={reject} disabled={locked}>
          Reject
        </button>
        <p className="text-xs text-slate-400">Current total weightage: {totalWeightage}%</p>
      </div>

      {message.text ? (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            message.type === "error"
              ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
          }`}
        >
          {message.text}
        </div>
      ) : null}
    </div>
  );
}

export default function GoalCreationPage({ role, goals, submissionStatus, setGoalWorkflow }) {
  if (role === "Manager") {
    return (
      <ManagerApprovalPanel
        goals={goals}
        submissionStatus={submissionStatus}
        setGoalWorkflow={setGoalWorkflow}
      />
    );
  }

  return (
    <EmployeeGoalEditor
      goals={goals}
      submissionStatus={submissionStatus}
      setGoalWorkflow={setGoalWorkflow}
    />
  );
}
