import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionListProps {
  items: { id: string; question: string; answer: string }[];
  isLast?: boolean;
}

export const AccordionList = ({ items, isLast }: AccordionListProps) => {
  return (
    <ul
      className={`flex flex-col w-full lg:border-[1px]  lg:rounded-sm ${
        isLast
          ? "border-[1px] border-t-0 rounded-sm rounded-t-none"
          : "border-[1px] rounded-sm rounded-b-none"
      }`}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={` px-4 ${
            index === items.length - 1 ? "border-b-0" : "border-b-[1px]"
          }`}
        >
          <Accordion type="single" collapsible>
            <AccordionItem value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </li>
      ))}
    </ul>
  );
};
