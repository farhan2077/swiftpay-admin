import React, { useEffect, useState } from "react";
import { Table, Tag, Badge, Tooltip, message } from "antd";

import { getTransactions } from "../../client/transactions.client";

const copyIdSuccessful = () => {
  message.success("Id has been copied to the clipboard", 2);
};

export default function Transactions() {
  const [transactionsData, setTransactionsData] = useState([]);

  function fetchTransactions() {
    getTransactions()
      .then((res) => res.json())
      .then(({ data }) => {
        setTransactionsData(data);
      });
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      ellipsis: true,
      render: (id) => (
        <Tooltip title="Click to copy id">
          <span
            onClick={() => {
              navigator.clipboard.writeText(id).then(copyIdSuccessful());
            }}
          >
            {id}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Name",
      dataIndex: "user",
      key: "user",
      render: (user) => {
        if (user) {
          return <span>{user.name}</span>;
        }
      },
    },
    {
      title: "Vehicle Id",
      dataIndex: "user",
      key: "vehicleId",
      render: (user) => {
        if (user) {
          return <span>{user.vehicleId}</span>;
        }
      },
    },
    {
      title: "Transaction time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Payment status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus) => {
        if (paymentStatus === "paid") {
          return (
            <Tag color="success">
              <Badge status="success" text={paymentStatus} />
            </Tag>
          );
        } else {
          return (
            <Tag color="error">
              <Badge status="error" text={paymentStatus} />
            </Tag>
          );
        }
      },
    },
    {
      title: "Toll rate",
      dataIndex: "user",
      key: "tollRate",
      render: (user) => {
        if (user) {
          return <span>{user.tollRate}</span>;
        }
      },
    },
  ];

  return (
    <>
      <div>
        {console.log(process.env.NODE_ENV)}
        <Table
          style={{
            marginBottom: "1.5rem",
          }}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={transactionsData}
          bordered
          pagination={{
            position: ["bottomCenter"],
            defaultCurrent: 1,
          }}
        />
      </div>
    </>
  );
}
