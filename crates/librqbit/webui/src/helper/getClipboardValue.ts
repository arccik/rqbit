export const getClipboardValue = async () => {
  try {
    // Request permission to access the clipboard
    const permission = await navigator.permissions.query({
      name: "persistent-storage",
    });

    // If permission is granted, read the text from the clipboard
    if (permission.state === "granted" || permission.state === "prompt") {
      const clipboardText = await navigator.clipboard.readText();
      return clipboardText;
    } else {
      console.error("Permission to access the clipboard was denied.");
    }
  } catch (error) {
    console.error("Error reading from clipboard:", error);
  }
};
