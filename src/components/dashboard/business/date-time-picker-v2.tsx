import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormSchema } from "@/lib/zodSchemas";
import { compareTimes } from "@/lib/utils";

// Props tipi tanımı
type Props = {
  onSubmit: (values: { startTime: string; endTime: string }) => Promise<void>;
};

// Yardımcı saat karşılaştırma fonksiyonu

// Form doğrulama şeması

// Ana bileşen
export function DateTimePickerV2({ onSubmit }: Props) {
  const [currentStartTime, setCurrentStartTime] = useState<string>("09:00");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startTime: "09:00",
      endTime: "17:00",
    },
  });

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    await onSubmit(values); // Prop olarak gelen fonksiyonu çağır
  };

  const generateTimeSlots = () => {
    const timeSlots: string[] = [];
    for (let i = 0; i < 96; i++) {
      const hour = Math.floor(i / 4)
        .toString()
        .padStart(2, "0");
      const minute = ((i % 4) * 15).toString().padStart(2, "0");
      timeSlots.push(`${hour}:${minute}`);
    }
    return timeSlots;
  };

  const allTimeSlots = generateTimeSlots();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="flex gap-4">
          {/* Start Time */}
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Başlangıç Zamanı</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      setCurrentStartTime(val);

                      const currentEnd = form.getValues("endTime");
                      if (compareTimes(currentEnd, val) <= 0) {
                        const nextIndex = allTimeSlots.indexOf(val) + 1;
                        const next =
                          allTimeSlots[nextIndex] || allTimeSlots.at(-1)!;
                        form.setValue("endTime", next);
                      }
                    }}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Başlangıç" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="h-[240px]">
                        {allTimeSlots.map((t, i) => (
                          <SelectItem key={`s-${i}`} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Randevunun başlangıç saati.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Time */}
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bitiş Zamanı</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Bitiş" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="h-[240px]">
                        {allTimeSlots
                          .filter((t) => compareTimes(t, currentStartTime) > 0)
                          .map((t, i) => (
                            <SelectItem key={`e-${i}`} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Randevunun bitiş saati.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Kaydet</Button>
      </form>
    </Form>
  );
}
