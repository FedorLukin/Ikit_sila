import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export default function SupportPage() {
    return (
        <section className="space-y-6 max-w-2xl">
            <h1 className="text-3xl font-bold">Поддержка</h1>
            <p className="opacity-80 text-sm">Часто задаваемые вопросы</p>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Как начать пользоваться сервисом?</AccordionTrigger>
                    <AccordionContent>
                    Просто зарегистрируйтесь, перейдите в профиль и начните взаимодействовать с функционалом.
                    </AccordionContent>
                </AccordionItem>


                <AccordionItem value="item-2">
                    <AccordionTrigger>Как изменить данные профиля?</AccordionTrigger>
                    <AccordionContent>
                    В вашем личном профиле будет доступен раздел для изменения личной информации и настроек.
                    </AccordionContent>
                </AccordionItem>


                <AccordionItem value="item-3">
                    <AccordionTrigger>К кому обратиться при возникновении ошибки?</AccordionTrigger>
                    <AccordionContent>
                    Напишите в нашу службу поддержки — мы постараемся помочь вам в кратчайшие сроки.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
}