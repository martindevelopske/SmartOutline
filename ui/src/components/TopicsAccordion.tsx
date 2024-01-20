import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function TopicsAccordion({ topic, Description }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{topic}</AccordionTrigger>
        <AccordionContent>{Description}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
