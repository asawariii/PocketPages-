export function getInitials (name) {
    if (!name) return ""; // Check if name is undefined or null
    const words = name.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.join(" ").toUpperCase();
};