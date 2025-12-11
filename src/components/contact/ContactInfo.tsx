import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const ContactInfo = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <Card className="shadow-md border-none mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">{t("contact.officeAddress")}</h3>

        <div className="space-y-4">
          <div className={cn("flex items-start", isRTL && "flex-row-reverse text-right")}>
            <MapPin className={cn("h-5 w-5 text-gray-500 flex-shrink-0", isRTL ? "ml-3" : "mr-3")} />
            <span>UAE - 15h Street, Office 478 - Dubai, B.O. 81566</span>
          </div>

          <div className={cn("flex items-start", isRTL && "flex-row-reverse text-right")}>
            <Mail className={cn("h-5 w-5 text-gray-500 flex-shrink-0", isRTL ? "ml-3" : "mr-3")} />
            <div>
              <p className="font-semibold mb-1">{t("contact.emailUs")}</p>
              <a href="mailto:info@zames.marketing" className="text-blue-600 hover:underline">
                info@zames.marketing
              </a>
            </div>
          </div>

          <div className={cn("flex items-start", isRTL && "flex-row-reverse text-right")}>
            <Phone className={cn("h-5 w-5 text-gray-500 flex-shrink-0", isRTL ? "ml-3" : "mr-3")} />
            <div>
              <p className="font-semibold mb-1">{t("contact.callUs")}</p>
              <a href="tel:+971544767690" className="text-blue-600 hover:underline">
                +971 54 476 7690
              </a>
            </div>
          </div>

          <div className={cn("flex items-start", isRTL && "flex-row-reverse text-right")}>
            <Clock className={cn("h-5 w-5 text-gray-500 flex-shrink-0", isRTL ? "ml-3" : "mr-3")} />
            <div>
              <p className="font-semibold mb-1">{t("contact.hours")}</p>
              <p>
                {t("contact.weekdays")}: {t("contact.weekdayHours")}
              </p>
              <p>
                {t("contact.weekends")}: {t("contact.weekendHours")}
              </p>
              <p>{t("contact.closed")}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
