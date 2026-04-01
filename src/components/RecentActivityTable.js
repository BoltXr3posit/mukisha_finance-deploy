// 1. MOCK DATA: In a real app, this comes from your database
const transactions = [
  { id: 'TRX-8472', date: 'Apr 1, 2026', description: 'Loan Disbursement (Personal)', amount: '+K5,000.00', type: 'credit', status: 'Completed' },
  { id: 'TRX-8471', date: 'Apr 1, 2026', description: 'Origination Fee', amount: '-K500.00', type: 'debit', status: 'Completed' },
  { id: 'TRX-8309', date: 'Mar 15, 2026', description: 'Monthly Repayment', amount: '-K958.33', type: 'debit', status: 'Pending' },
  { id: 'TRX-8102', date: 'Feb 15, 2026', description: 'Monthly Repayment', amount: '-K958.33', type: 'debit', status: 'Completed' },
  { id: 'TRX-7994', date: 'Jan 15, 2026', description: 'Late Fee Penalty', amount: '-K150.00', type: 'debit', status: 'Failed' },
];

// 2. HELPER FUNCTION: This generates the correct colored badge based on the status word
function StatusBadge({ status }) {
  const styles = {
    Completed: 'bg-emerald-100 text-emerald-800',
    Pending: 'bg-amber-100 text-amber-800',
    Failed: 'bg-rose-100 text-rose-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function RecentActivityTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        
        {/* Table Headers */}
        <thead>
          <tr className="border-b border-slate-100 text-sm text-slate-400 uppercase tracking-wider">
            <th className="pb-4 font-semibold">Transaction ID</th>
            <th className="pb-4 font-semibold">Date</th>
            <th className="pb-4 font-semibold">Description</th>
            <th className="pb-4 font-semibold text-right">Amount</th>
            <th className="pb-4 font-semibold text-center">Status</th>
          </tr>
        </thead>
        
        {/* Table Body */}
        <tbody className="text-sm">
          {transactions.map((trx) => (
            <tr key={trx.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
              <td className="py-4 font-medium text-slate-900">{trx.id}</td>
              <td className="py-4 text-slate-500">{trx.date}</td>
              <td className="py-4 text-slate-700">{trx.description}</td>
              <td className={`py-4 text-right font-bold ${trx.type === 'credit' ? 'text-[#60CF38]' : 'text-slate-900'}`}>
                {trx.amount}
              </td>
              <td className="py-4 text-center">
                <StatusBadge status={trx.status} />
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
}