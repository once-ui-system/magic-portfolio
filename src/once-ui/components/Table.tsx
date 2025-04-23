"use client";

import { Row } from "./Row";
import { IconButton } from "./IconButton";
import { useState, ReactNode } from "react";

type TableProps = {
  data: {
    headers: {
      content: ReactNode;
      key: string;
      sortable?: boolean;
    }[];
    rows: ReactNode[][];
  };
  onRowClick?: (rowIndex: number) => void;
};

function Table({ data, onRowClick }: TableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";

    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === "ascending" ? "descending" : "ascending";
    }

    setSortConfig({ key, direction });
  };

  const sortedRows = [...data.rows].sort((a, b) => {
    if (!sortConfig) return 0;

    const headerIndex = data.headers.findIndex((header) => header.key === sortConfig.key);
    if (headerIndex === -1) return 0;

    const aValue = String(a[headerIndex]);
    const bValue = String(b[headerIndex]);

    if (sortConfig.direction === "ascending") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const headers = data.headers.map((header, index) => (
    <th
      style={{ textAlign: "left", borderBottom: "1px solid var(--neutral-alpha-medium)" }}
      className="px-16 py-12 font-label font-default font-s"
      key={index}
    >
      <Row gap="8" vertical="center">
        {header.content}
        {header.sortable && (
          <IconButton
            icon={
              sortConfig?.key === header.key
                ? sortConfig.direction === "ascending"
                  ? "chevronUp"
                  : "chevronDown"
                : "chevronDown"
            }
            size="s"
            variant="ghost"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleSort(header.key);
            }}
            style={{
              opacity: sortConfig?.key === header.key ? 1 : 0.6,
            }}
          />
        )}
      </Row>
    </th>
  ));

  const rows = (sortConfig ? sortedRows : data.rows).map((row, index) => (
    <tr
      key={index}
      onClick={onRowClick ? () => onRowClick(index) : undefined}
      className={onRowClick ? "cursor-interactive hover-row" : ""}
      style={onRowClick ? { transition: "background-color 0.2s ease" } : undefined}
    >
      {row.map((cell, cellIndex) => (
        <td className="px-16 py-12 font-body font-default font-s" key={cellIndex}>
          {cell}
        </td>
      ))}
    </tr>
  ));

  return (
    <Row
      fillWidth
      radius="m"
      overflowY="hidden"
      border="neutral-alpha-medium"
      overflowX="auto"
      marginTop="8"
      marginBottom="16"
    >
      <style jsx>{`
        .hover-row:hover {
          background-color: var(--neutral-alpha-weak);
        }
      `}</style>
      <table
        className="fill-width surface-background"
        style={{ borderSpacing: 0, borderCollapse: "collapse", minWidth: "32rem" }}
      >
        <thead className="neutral-on-background-strong">
          <tr>{headers}</tr>
        </thead>
        <tbody className="neutral-on-background-medium">
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-24 py-12 font-body font-default font-s">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Row>
  );
}

export { Table };
