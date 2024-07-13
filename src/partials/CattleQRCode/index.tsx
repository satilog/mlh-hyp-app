import { useEffect, useState } from "react";
import Layout from "@/containers/Layout";

const CattleQRCode = ({ cattleId }: any) => {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/cattle/${cattleId}/generate_qr`);
        if (!response.ok) {
          throw new Error("Failed to fetch QR code");
        }
        const data = await response.json();
        setQrCode(data.qr_code);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQrCode();
  }, [cattleId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center w-full">
        <h2>QR Code for Cattle with ID: {cattleId}</h2>
        {qrCode && <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />}
      </div>
    </Layout>
  );
};

export default CattleQRCode;
