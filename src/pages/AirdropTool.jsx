import { useState } from "react";
import Papa from "papaparse";
import ConnectButton from "../components/ConnectButton";
import algosdk from "algosdk";
import { toast } from "react-toastify";
import { createAirdropTransactions } from "../utils";

export function AirdropTool(props) {
  const [csvData, setCsvData] = useState(null);
  const [isTransactionsFinished, setIsTransactionsFinished] = useState(false);
  const [txSendingInProgress, setTxSendingInProgress] = useState(false);

  async function getAssetDecimals(assetId) {
    try {
      const nodeURL =
        props.selectNetwork == "mainnet"
          ? "https://node.algoexplorerapi.io/"
          : "https://node.testnet.algoexplorerapi.io/";
      const algodClient = new algosdk.Algodv2("", nodeURL, {
        "User-Agent": "evil-tools",
      });
      const assetInfo = await algodClient.getAssetByID(assetId).do();
      return assetInfo.params.decimals;
    } catch (error) {
      toast.error(
        "Something went wrong! Please check your file and network type."
      );
    }
  }

  const handleFileData = async () => {
    let headers;
    let data = [];
    for (let i = 0; i < csvData.length; i++) {
      if (csvData[i].length == 1) continue;
      if (i === 0) {
        headers = csvData[i];
      } else {
        let obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = csvData[i][j];
        }
        data.push(obj);
      }
    }
    let assetIds = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].asset_id) {
        assetIds[data[i].asset_id] = true;
      }
    }
    assetIds = Object.keys(assetIds);
    let assetDecimals = {};
    for (let i = 0; i < assetIds.length; i++) {
      if (assetIds[i] == 1) continue;
      assetDecimals[assetIds[i]] = await getAssetDecimals(assetIds[i]);
    }
    if (
      localStorage.getItem("wallet") === null ||
      localStorage.getItem("wallet") === undefined
    ) {
      toast.error("Wallet not found!");
      return;
    }

    try {
      const nodeURL =
        props.selectNetwork == "mainnet"
          ? "https://node.algoexplorerapi.io/"
          : "https://node.testnet.algoexplorerapi.io/";
      const algodClient = new algosdk.Algodv2("", nodeURL, {
        "User-Agent": "evil-tools",
      });
      try {
        toast.info("Please sign the transactions!");
        const signedTransactions = await createAirdropTransactions(
          data,
          nodeURL,
          assetDecimals
        );
        setTxSendingInProgress(true);
        for (let i = 0; i < signedTransactions.length; i++) {
          try {
            const { txId } = await algodClient
              .sendRawTransaction(signedTransactions[i])
              .do();
            await algosdk.waitForConfirmation(algodClient, txId, 3);
            toast.success(
              `Transaction ${i + 1} of ${signedTransactions.length} confirmed!`,
              {
                autoClose: 1000,
              }
            );
          } catch (error) {
            toast.error(
              `Transaction ${i + 1} of ${signedTransactions.length} failed!`
            );
          }
        }
        setIsTransactionsFinished(true);
        setTxSendingInProgress(false);
        toast.success("All transactions confirmed!");
        toast.info("You can support by donating :)");
      } catch (error) {
        setTxSendingInProgress(false);
        toast.error("Something went wrong! Please check your file!");
        return;
      }
    } catch (error) {
      toast.error(error.message);
      setTxSendingInProgress(false);
    }
  };

  return (
    <div className="mb-4 text-center flex flex-col items-center max-w-[40rem] gap-y-2">
      <p className="text-center text-lg text-pink-200 mt-2">
        <a
          className="hover:text-pink-400 transition"
          href="https://loafpickle.medium.com/evil-tools-custom-mass-airdrop-3d5902dd1c94"
          target="_blank"
          rel="noopener noreferrer"
        >
          INSTRUCTIONS
          <br /> (Click here)
        </a>
      </p>
      <p className="text-center text-lg text-red-400 mt-2">WARNING</p>
      <p className="text-center text-sm text-slate-200 -mt-2">
        {/* * Airdrop tool is limited to 1000 transactions per airdrop sheet because
        of MyAlgo constraints. */}
        *Airdrop tool is limited to 128 transactions per airdrop sheet because
        of Pera constraints.
      </p>
      <p>1- Connect Sender Wallet</p>
      <ConnectButton />
      <p>2- Upload CSV file</p>
      {csvData == null ? (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col justify-center items-center w-[16rem] h-[8rem] px-4  rounded-lg border-2  border-dashed cursor-pointer hover:bg-bray-800 bg-gray-700  border-gray-600 hover:border-gray-500 hover:bg-gray-600"
        >
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            <p className="mb-1 text-sm text-gray-400 font-bold">
              Click to upload file
            </p>
            <p className="text-xs text-gray-400">(CSV,XLS,XLSX)</p>
            <p className="text-xs text-gray-300">
              To be sure there is no empty row at the end of the file
            </p>
          </div>
          <input
            className="hidden"
            id="dropzone-file"
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => {
              const file = e.target.files[0];
              Papa.parse(file, {
                complete: function (results) {
                  const filteredData = results.data.filter(
                    (row) => row[0].length > 1
                  );
                  setCsvData(filteredData);
                },
                skipEmptyLines: true,
              });
            }}
          />
        </label>
      ) : (
        <div className="flex flex-col justify-center items-center w-[16rem]">
          {isTransactionsFinished ? (
            <>
              <p className="pt-4 text-green-500 animate-pulse text-sm">
                All transactions completed!
                <br />
              </p>
              <p className="pb-2 text-slate-400 text-xs">
                You can reload the page if you want to use another tool.
              </p>
            </>
          ) : (
            <>
              <p className="mb-1 text-sm font-bold">File uploaded</p>
              <p className="text-sm text-gray-400">
                {csvData.length - 1} transactions found!
              </p>
              <p>3- Sign Your Transactions</p>
              {!txSendingInProgress ? (
                <button
                  id="approve-send"
                  className="mb-2 bg-green-500 hover:bg-green-700 text-black text-base font-semibold rounded py-2 w-fit px-2 mx-auto mt-1 hover:scale-95 duration-700"
                  onClick={handleFileData}
                >
                  Approve & Send
                </button>
              ) : (
                <div className="mx-auto flex flex-col">
                  <div
                    className="spinner-border animate-spin inline-block mx-auto w-8 h-8 border-4 rounded-full"
                    role="status"
                  ></div>
                  Please wait... Transactions are sending to the network.
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
