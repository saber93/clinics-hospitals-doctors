import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Zames</span>
            </Link>
            <p className="mt-4 text-muted-foreground">{t("home.subtitle")}</p>
            <div className={cn("flex mt-6 space-x-4", isRTL && "space-x-reverse")}>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t("common.services")}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  {t("clinics.services")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  {t("home.ourServices")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  {t("common.specialOffers")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  {t("clinics.services")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  {t("offers.specialOffers")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t("about.aboutCompany")}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  {t("common.about")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  {t("about.joinUs")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  {t("about.ourBusinessModel")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  {t("about.strategicPartnerships")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  {t("about.contactPartner")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t("common.contact")}</h3>
            <ul className="space-y-3">
              <li className={cn("flex items-center text-muted-foreground", isRTL && "flex-row-reverse")}>
                <Mail size={18} className={cn(isRTL ? "mr-0 ml-2" : "mr-2")} />
                <span>info@agenticsys.ai</span>
              </li>
              <li className={cn("flex items-center text-muted-foreground", isRTL && "flex-row-reverse")}>
                <Phone size={18} className={cn(isRTL ? "mr-0 ml-2" : "mr-2")} />
                <span>+971 54 476 7690</span>
              </li>
              <li className="mt-4">
                <Link to="/contact" className="text-primary hover:underline">
                  {t("contact.title")}
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-primary hover:underline">
                  {t("contact.helpCenter")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="border-t mt-12 pt-8">
          <div className={cn("flex flex-col md:flex-row justify-between items-center", isRTL && "flex-row-reverse")}>
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Zames. {t("footer.allRightsReserved")}
            </p>
            <div className={cn("flex space-x-6 mt-4 md:mt-0", isRTL && "space-x-reverse")}>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                {t("footer.terms")}
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                {t("footer.privacy")}
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary">
                {t("footer.cookies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
