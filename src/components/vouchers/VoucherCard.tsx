
import { Voucher } from "@/hooks/useVouchers";
import { format } from "date-fns";
import { Edit, Trash2, XCircle, CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type VoucherCardProps = {
  voucher: Voucher;
  onToggleStatus: (id: string, isActive: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

const VoucherCard = ({ voucher, onToggleStatus, onDelete }: VoucherCardProps) => {
  const navigate = useNavigate();
  const status = getVoucherStatus(voucher);
  const statusColor = getStatusColor(status);
  
  return (
    <tr className="border-t hover:bg-muted/50">
      <td className="px-4 py-3">
        <div className="font-medium">{voucher.code}</div>
        <div className="text-xs text-muted-foreground">
          Created {format(new Date(voucher.created_at), 'MMM d, yyyy')}
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="font-medium text-primary">{voucher.discount_percentage}%</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
          <span>
            {format(new Date(voucher.start_date), 'MMM d, yyyy')}
            {voucher.end_date && (
              <> - {format(new Date(voucher.end_date), 'MMM d, yyyy')}</>
            )}
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        {voucher.max_uses ? (
          <span>
            {voucher.current_uses} / {voucher.max_uses}
          </span>
        ) : (
          <span>
            {voucher.current_uses} uses (unlimited)
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className={`flex items-center ${statusColor}`}>
          {status === "Active" && <CheckCircle className="h-3.5 w-3.5 mr-1" />}
          {status === "Inactive" && <XCircle className="h-3.5 w-3.5 mr-1" />}
          {status === "Expired" && <AlertTriangle className="h-3.5 w-3.5 mr-1" />}
          {status === "Fully Redeemed" && <AlertTriangle className="h-3.5 w-3.5 mr-1" />}
          {status}
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleStatus(voucher.id, voucher.is_active)}
            title={voucher.is_active ? "Deactivate voucher" : "Activate voucher"}
          >
            {voucher.is_active ? (
              <XCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/seller-vouchers/edit/${voucher.id}`)}
            title="Edit voucher"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(voucher.id)}
            title="Delete voucher"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

// Helper functions for voucher status
export const isVoucherExpired = (voucher: Voucher) => {
  if (!voucher.end_date) return false;
  return new Date(voucher.end_date) < new Date();
};

export const getVoucherStatus = (voucher: Voucher) => {
  if (!voucher.is_active) return "Inactive";
  if (isVoucherExpired(voucher)) return "Expired";
  if (voucher.max_uses && voucher.current_uses >= voucher.max_uses) return "Fully Redeemed";
  return "Active";
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "text-green-500";
    case "Inactive": return "text-gray-500";
    case "Expired": return "text-red-500";
    case "Fully Redeemed": return "text-amber-500";
    default: return "text-gray-500";
  }
};

export default VoucherCard;
