export function formatDateString(dateString: string): string {
  if (dateString === "") {
    return;
  }

  const dateObject: Date = new Date(dateString);

  if (isNaN(dateObject)) {
    throw new Error("Недопустимая дата.");
  }

  const formattedDate = dateObject.toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return formattedDate;
}
