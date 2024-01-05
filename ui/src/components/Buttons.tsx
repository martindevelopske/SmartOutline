import { Button } from "@/components/ui/button";

export function ButtonOutline({ children }: { children: string }) {
  return <Button variant="outline">{children}</Button>;
}

export function ButtonDestructive({ children }: { children: string }) {
  return <Button variant="destructive">{children}</Button>;
}

export function ButtonFilled({ children }: { children: string }) {
  return <Button>{children}</Button>;
}
