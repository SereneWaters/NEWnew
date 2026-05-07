import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface CheckInModalProps {
  goalTitle: string;
  onCheckIn: (date: Date, status: "Done" | "Fail") => void;
  onClose: () => void;
}

export function CheckInModal({ goalTitle, onCheckIn, onClose }: CheckInModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDone = () => {
    onCheckIn(selectedDate, "Done");
  };

  const handleSkip = () => {
    onCheckIn(selectedDate, "Fail");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="glass-card p-6 rounded-3xl max-w-sm w-full mx-4 shadow-2xl animate-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif text-foreground">Log for {goalTitle}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              disabled={(date) => date > new Date()}
              className="bg-transparent"
            />
            <p className="text-sm text-muted-foreground mt-4">
              Selected: <span className="font-semibold text-foreground">{format(selectedDate, "MMMM dd, yyyy")}</span>
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSkip}
              variant="outline"
              className="flex-1 rounded-xl border-destructive/30 hover:bg-destructive/10 text-destructive"
            >
              Skip
            </Button>
            <Button
              onClick={handleDone}
              className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Done
            </Button>
          </div>

          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full rounded-xl text-muted-foreground hover:bg-white/50"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}
