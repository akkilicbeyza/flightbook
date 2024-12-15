"use client";

import { Button } from "@/components/ui/button";

interface TimeoutDialogProps {
  onContinue: () => void;
  onCancel: () => void;
}

export default function TimeoutDialog({ onContinue, onCancel }: TimeoutDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h3 className="text-xl font-bold mb-4">İşleme devam etmek istiyor musunuz?</h3>
        <div className="flex gap-4">
          <Button onClick={onContinue}>Evet</Button>
          <Button onClick={onCancel} variant="destructive">
            Hayır
          </Button>
        </div>
      </div>
    </div>
  );
}