import { Button } from "@/components/ui/button";

import { ReactElement } from "react";

export function ButtonOutline({
  children,
}: {
  children: string | ReactElement;
}) {
  return <Button variant="secondary" className=" bg-none">{children}</Button>;
}

export function ButtonDestructive({
  children,
}: {
  children: string | ReactElement;
}) {

  return <Button variant="destructive">{children}</Button>;
}

export function ButtonFilled({ children }: { children: string }) {
  return <Button>{children}</Button>;
}

import { ReloadIcon } from "@radix-ui/react-icons";

export function ButtonLoading() {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin bg-blue-600" />
      Please wait
    </Button>
  );
}

