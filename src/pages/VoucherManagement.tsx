
import { useVouchers } from "@/hooks/useVouchers";
import VouchersHeader from "@/components/vouchers/VouchersHeader";
import VouchersSearch from "@/components/vouchers/VouchersSearch";
import EmptyVouchersState from "@/components/vouchers/EmptyVouchersState";
import VouchersTable from "@/components/vouchers/VouchersTable";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useTranslation } from "@/hooks/useTranslation";

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
  
  return (
    <div className="p-6 pt-20">
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
