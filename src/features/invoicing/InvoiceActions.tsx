import { useState, useEffect, useLayoutEffect, useRef } from "react";

import { download, dollar, email, trash } from "assets/media";
import { useAppSelector } from "store/hooks";
import { selectUserRole } from "store/slices/authSlice";
import HoverTooltip from "components/utils/HoverTooltip";

type Props = {
  invoiceId: string;
  handleUpdate: (invoiceId: string, invoiceStatus: string) => void;
  handleDelete: (invoiceId: string) => void;
};

const InvoiceActions = ({ invoiceId, handleUpdate, handleDelete }: Props) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [actionLabel, setActionLabel] = useState("");
  const [actionDescription, setActionDescription] = useState("");
  const [showActionDescription, setShowActionDescription] = useState(false);

  const userRole = useAppSelector(selectUserRole);

  useEffect(() => {
    if (actionDescription) setShowActionDescription(true);
    else setShowActionDescription(false);
  }, [actionDescription]);

  useLayoutEffect(() => {
    setContainerWidth(ref.current?.offsetWidth ?? 0);
    setContainerHeight(ref.current?.offsetHeight ?? 0);
  }, []);

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            ref={ref}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey"
            onMouseEnter={() => {
              setActionLabel("download");
              setActionDescription("Download as PDF");
            }}
            onMouseLeave={() => {
              setActionLabel("");
              setActionDescription("");
            }}
          >
            <img src={download} alt="Download icon" />
          </button>
          {showActionDescription && actionLabel === "download" && (
            <HoverTooltip
              content={actionDescription}
              position={{ containerWidth, containerHeight }}
            />
          )}
        </div>
        {userRole === "Admin" && (
          <>
            <div className="relative">
              <button
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey"
                onMouseEnter={() => {
                  setActionLabel("dollar");
                  setActionDescription("Mark as Paid");
                }}
                onMouseLeave={() => {
                  setActionLabel("");
                  setActionDescription("");
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  handleUpdate(invoiceId, "Paid");
                }}
              >
                <img src={dollar} alt="Dollar icon" />
              </button>
              {showActionDescription && actionLabel === "dollar" && (
                <HoverTooltip
                  content={actionDescription}
                  position={{ containerWidth, containerHeight }}
                />
              )}
            </div>
            <div className="relative">
              <button
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey"
                onMouseEnter={() => {
                  setActionLabel("email");
                  setActionDescription("Mark as Sent");
                }}
                onMouseLeave={() => {
                  setActionLabel("");
                  setActionDescription("");
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  handleUpdate(invoiceId, "Sent");
                }}
              >
                <img src={email} alt="Email icon" />
              </button>
              {showActionDescription && actionLabel === "email" && (
                <HoverTooltip
                  content={actionDescription}
                  position={{ containerWidth, containerHeight }}
                />
              )}
            </div>
            <div className="relative">
              <button
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey"
                onMouseEnter={() => {
                  setActionLabel("trash");
                  setActionDescription("Delete invoice");
                }}
                onMouseLeave={() => {
                  setActionLabel("");
                  setActionDescription("");
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(invoiceId);
                }}
              >
                <img src={trash} alt="Trash icon" />
              </button>
              {showActionDescription && actionLabel === "trash" && (
                <HoverTooltip
                  content={actionDescription}
                  position={{ containerWidth, containerHeight }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InvoiceActions;
