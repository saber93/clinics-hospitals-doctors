
import { useVouchers } from "@/hooks/useVouchers";
import VouchersHeader from "@/components/vouchers/VouchersHeader";
import VouchersSearch from "@/components/vouchers/VouchersSearch";
import EmptyVouchersState from "@/components/vouchers/EmptyVouchersState";
import VouchersTable from "@/components/vouchers/VouchersTable";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const VoucherManagement = () => {
  const { 
    vouchers, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    toggleVoucherStatus, 
    deleteVoucher 
  } = useVouchers();
  
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <div className={cn("p-6 pt-20", isRTL && "rtl-content")}>
      <VouchersHeader />
      
      <VouchersSearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      {loading ? (
        <LoadingSpinner />
      ) : vouchers.length === 0 ? (
        <EmptyVouchersState searchTerm={searchTerm} />
      ) : (
        <VouchersTable 
          vouchers={vouchers}
          onToggleStatus={toggleVoucherStatus}
          onDelete={deleteVoucher}
        />
      )}
    </div>
  );
};

export default VoucherManagement;
