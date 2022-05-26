import type { FC } from 'react';

interface TableProps {
  columns: {
    header: string;
    accessor: string;
  }[];
  data: any[];
}

const Table: FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map(({ header, accessor }) => (
                    <th
                      key={header + accessor}
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? undefined : 'bg-gray-50'}>
                    {columns.map(({ accessor }) => (
                      <td
                        key={accessor}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item[accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
