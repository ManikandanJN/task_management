export const getColor = (taskId: string) => {
  switch (taskId) {
    case "TODO":
      return "bg-toDo";
    case "IN-PROGRESS":
      return "bg-inProgress";
    case "COMPLETED":
      return "bg-completed";
  }
};
