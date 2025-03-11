
import VoucherCard from "./VoucherCard";
import { Voucher } from "@/hooks/useVouchers";

interface VouchersTableProps {
  vouchers: Voucher[];
  onToggleStatus: (id: string, isActive: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const VouchersTable = ({ vouchers, onToggleStatus, onDelete }: VouchersTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border shadow">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Code</th>
            <th className="px-4 py-3 text-left font-medium">Discount</th>
            <th className="px-4 py-3 text-left font-medium">Validity</th>
            <th className="px-4 py-3 text-left font-medium">Usage</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map(voucher => (
            <VoucherCard 
              key={voucher.id} 
              voucher={voucher} 
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VouchersTable;
