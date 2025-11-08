import { useState } from "react";
import ConfirmDialog from "../ConfirmDialog";
import { Button } from "@/components/ui/button";

export default function ConfirmDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)} variant="destructive">
        Delete Item
      </Button>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          console.log("Confirmed!");
          setOpen(false);
        }}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the course."
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}
