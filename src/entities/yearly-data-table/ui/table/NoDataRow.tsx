export function NoDataRow({
  colSpan,
  text = 'No data available',
}: {
  colSpan: number;
  text?: string;
}) {
  return (
    <tr>
      <td
        colSpan={Math.max(1, colSpan)}
        className="px-6 py-4 text-center text-sm text-gray-500"
      >
        {text}
      </td>
    </tr>
  );
}
