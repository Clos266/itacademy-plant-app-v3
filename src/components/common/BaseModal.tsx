import { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  onConfirm,
  confirmLabel = "save",
  cancelLabel = "cancel",
}: BaseModalProps) {
  if (!isOpen) return null; // no renderiza nada si está cerrado

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-lg border border-border">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>

        <CardContent>{children}</CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            {cancelLabel}
          </Button>
          {onConfirm && <Button onClick={onConfirm}>{confirmLabel}</Button>}
        </CardFooter>
      </Card>
    </div>
  );
}
