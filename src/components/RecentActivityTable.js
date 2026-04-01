// We keep the badge helper function
function StatusBadge({ status }) {
  const styles = {
    Completed: 'bg-emerald-100 text-emerald-800',
    Pending: 'bg-amber-100 text-amber-800',
    Failed: 'bg-rose-100 text-rose-800',
    Approved: 'bg-blue-100 text-blue-800',
    Rejected: 'bg-red-100 text-red-800',
  };

  // Default to a gray badge if the status doesn't match the above
  const currentStyle = styles[status] || 'bg-slate-100 text-slate-800';

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentStyle}`}>
      {status}
    </span>
  );
}

// NOTICE: We added { transactions } here as a "prop". 
// This tells the table to accept data from the main dashboard!
export default function RecentActivityTable({ transactions }) {
  
  // THE EMPTY STATE: If the user has no loans yet, show this friendly message
  if (!transactions || transactions.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-4xl mb-4">📭</div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No Activity Yet</h3>
        <p className="text-slate-500">You haven't requested any loans. Click "+ New Application" to get started.</p>
      </div>
    );
  }

  // If they DO have loans, render the table normally
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 text-sm text-slate-400 uppercase tracking-wider">
            <th className="pb-4 font-semibold">Transaction ID</th>
            <th className="pb-4 font-semibold">Date</th>
            <th className="pb-4 font-semibold">Purpose</th>
            <th className="pb-4 font-semibold text-right">Amount</th>
            <th className="pb-4 font-semibold text-center">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {transactions.map((trx) => (
            <tr key={trx.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
              <td className="py-4 font-medium text-slate-900">{trx.id}</td>
              <td className="py-4 text-slate-500">{trx.date}</td>
              <td className="py-4 text-slate-700">{trx.purpose}</td>
              <td className="py-4 text-right font-bold text-slate-900">
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