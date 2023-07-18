"use client";
import { useClipboard } from "@mantine/hooks";
import { useEffect, useState } from "react";

export default function AddressBtn({ address }: { address: any }) {
  const [addressInput, setAddressInput] = useState();
  const [isCopied, setIsCopied] = useState(false);
  const clipboard = useClipboard({ timeout: 4000 });

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className="tooltip" data-tip={addressInput}>
      <button
        onClick={() =>
          clipboard.copied ? clipboard.reset : clipboard.copy(addressInput)
        }
        className={
          clipboard.copied
            ? "btn btn-success btn-outline btn-xs"
            : "btn btn-outline btn-xs"
        }
      >
        {clipboard.copied ? "copied" : "show"}
      </button>
    </div>
  );
}
